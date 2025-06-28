import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { catchError, filter, Observable, ReplaySubject, switchMap, take, throwError } from "rxjs";
import { AccessToken, AuthEndpoint, AuthErrorResponseCode, TokenResponse } from "@hichchi/nest-connector/auth";
import { Endpoint, ErrorResponseCode, HttpClientErrorStatus } from "@hichchi/nest-connector";
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { HttpError } from "@hichchi/ngx-utils";
import { AuthState } from "../state";
import { AuthService } from "../services";

/**
 * Array of authentication error codes that should trigger token refresh instead of immediate redirect
 *
 * These error codes indicate authentication issues that can potentially be resolved
 * by refreshing the access token. When these errors are encountered, the interceptor
 * will attempt to refresh the token before redirecting the user to the login page.
 *
 * @example
 * ```typescript
 * // The interceptor checks if the error code is in this array
 * if (SKIPPED_ERRORS.includes(error.error?.code)) {
 *   // Attempt token refresh instead of immediate redirect
 *   return refreshToken(req, next);
 * }
 * ```
 *
 * @see {@link AuthErrorResponseCode} Enum containing all authentication error codes
 * @see {@link authInterceptor} Function that uses this array for error handling
 */
export const SKIPPED_ERRORS: ErrorResponseCode[] = [
    AuthErrorResponseCode.AUTH_401_EXPIRED_TOKEN,
    AuthErrorResponseCode.AUTH_401_INVALID_TOKEN,
    AuthErrorResponseCode.AUTH_401_NOT_LOGGED_IN,
];

/**
 * Flag to prevent multiple simultaneous token refresh operations
 *
 * This global flag ensures that only one token refresh operation can be in progress
 * at any given time. This prevents race conditions and duplicate refresh requests
 * when multiple HTTP requests fail simultaneously due to expired tokens.
 *
 * @private
 */
let refreshingInProgress = false;

/**
 * Checks if an HTTP request is a token refresh request
 *
 * This utility function determines whether the given HTTP request is attempting
 * to refresh authentication tokens. This is important to avoid intercepting
 * and modifying token refresh requests themselves, which could cause infinite loops.
 *
 * @param req - The HTTP request to check
 * @returns True if the request is a token refresh request, false otherwise
 *
 * @example
 * ```typescript
 * // Used in the interceptor to avoid processing refresh token requests
 * if (!isRefreshTokenReq(req)) {
 *   // Apply authentication logic
 * }
 * ```
 *
 * @private
 * @see {@link AuthEndpoint.REFRESH_TOKEN} Endpoint constant for token refresh
 * @see {@link Endpoint.AUTH} Base authentication endpoint
 */
const isRefreshTokenReq = (req: HttpRequest<unknown>): boolean =>
    req.url.includes(`${Endpoint.AUTH}/${AuthEndpoint.REFRESH_TOKEN}`);

/**
 * Subject for coordinating token refresh operations across multiple HTTP requests
 *
 * This ReplaySubject is used to coordinate token refresh operations when multiple
 * HTTP requests fail simultaneously due to expired tokens. It ensures that all
 * waiting requests receive the new token once the refresh operation completes.
 *
 * The subject emits the new access token when refresh succeeds, or an error when
 * refresh fails. It uses ReplaySubject to ensure late subscribers still receive
 * the last emitted value.
 *
 * @private
 * @see {@link ReplaySubject} RxJS subject type used for token coordination
 * @see {@link AccessToken} Type representing access tokens
 */
let tokenSubject: ReplaySubject<AccessToken | null> = new ReplaySubject<AccessToken | null>(1);

/**
 * Creates an HTTP interceptor for handling authentication tokens and automatic token refresh
 *
 * This interceptor automatically adds authentication tokens to outgoing HTTP requests
 * and handles token refresh when requests fail due to expired tokens. It provides
 * seamless authentication management for Angular applications using JWT tokens.
 *
 * Key features:
 * - Automatic token attachment to HTTP requests
 * - Automatic token refresh on authentication errors
 * - Prevention of multiple simultaneous refresh operations
 * - Coordinated handling of multiple failed requests during token refresh
 * - Automatic redirect to login page when refresh fails
 * - Configurable redirect behavior with optional callback
 *
 * The interceptor works by:
 * 1. Adding the current access token to outgoing requests
 * 2. Monitoring responses for authentication errors
 * 3. Attempting token refresh when authentication errors occur
 * 4. Retrying failed requests with the new token
 * 5. Redirecting to login when refresh fails or no refresh token is available
 *
 * @param redirect - The path to redirect to when authentication fails completely
 * @param onRedirect - Optional callback function to execute before redirecting
 * @returns An HttpInterceptorFn that can be used in Angular HTTP interceptor configuration
 *
 * @example
 * ```typescript
 * // Basic usage in app configuration
 * export const appConfig: ApplicationConfig = {
 *   providers: [
 *     provideHttpClient(
 *       withInterceptors([
 *         authInterceptor('/login')
 *       ])
 *     )
 *   ]
 * };
 * ```
 *
 * @example
 * ```typescript
 * // With custom redirect callback
 * export const appConfig: ApplicationConfig = {
 *   providers: [
 *     provideHttpClient(
 *       withInterceptors([
 *         authInterceptor('/login', () => {
 *           console.log('Redirecting to login due to authentication failure');
 *           // Clear any cached data
 *           localStorage.clear();
 *         })
 *       ])
 *     )
 *   ]
 * };
 * ```
 *
 * @example
 * ```typescript
 * // In a module-based application
 * @NgModule({
 *   providers: [
 *     {
 *       provide: HTTP_INTERCEPTORS,
 *       useValue: authInterceptor('/auth/login'),
 *       multi: true
 *     }
 *   ]
 * })
 * export class AppModule {}
 * ```
 *
 * @see {@link AuthState} Service that provides authentication state and tokens
 * @see {@link AuthService} Service that handles token refresh operations
 * @see {@link HttpInterceptorFn} Angular HTTP interceptor function type
 * @see {@link SKIPPED_ERRORS} Array of error codes that trigger token refresh
 */
export function authInterceptor(redirect: string, onRedirect?: () => void): HttpInterceptorFn {
    return (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
        const authState = inject(AuthState);
        const authService = inject(AuthService);
        const router = inject(Router);

        const setAccessToken = (req: HttpRequest<unknown>, accessToken: AccessToken): HttpRequest<unknown> => {
            return req.clone({
                headers: req.headers.set("Authorization", `Bearer ${accessToken}`),
            });
        };

        const gotoSignIn = (): void => {
            onRedirect?.();
            authState.reset();
            // eslint-disable-next-line no-void
            void router.navigateByUrl(redirect);
        };

        const refreshToken = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
            if (!refreshingInProgress) {
                refreshingInProgress = true;
                tokenSubject.next(null);

                const refreshToken = authState.refreshToken();

                if (!refreshToken) {
                    refreshingInProgress = false;
                    gotoSignIn();
                    return throwError(() => new Error("Refresh token not found."));
                }

                return authService.refreshToken(refreshToken).pipe(
                    switchMap((tokenResponse: TokenResponse) => {
                        authState.setTokens(tokenResponse);
                        tokenSubject.next(tokenResponse.accessToken);
                        tokenSubject.complete();
                        tokenSubject = new ReplaySubject<AccessToken | null>(1);
                        refreshingInProgress = false;
                        return next(setAccessToken(req, tokenResponse.accessToken));
                    }),
                    catchError((error: HttpError) => {
                        refreshingInProgress = false;
                        tokenSubject.error(error);
                        tokenSubject.complete();
                        tokenSubject = new ReplaySubject<AccessToken | null>(1);
                        gotoSignIn();
                        return throwError(() => error);
                    }),
                );
            }

            return tokenSubject.pipe(
                filter(result => result !== null),
                take(1),
                switchMap(token => {
                    return next(setAccessToken(req, token));
                }),
            );
        };

        const handleRequest = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
            return next(req).pipe(
                catchError((error: HttpError) => {
                    if (
                        error.status === HttpClientErrorStatus.UNAUTHORIZED &&
                        error.error?.code &&
                        SKIPPED_ERRORS.includes(error.error?.code) &&
                        !isRefreshTokenReq(req)
                    ) {
                        if (authState.signedIn()) {
                            return refreshToken(req, next);
                        }
                    }
                    return throwError(() => error);
                }),
            );
        };

        if (authState.accessToken()) {
            const tokenizedRequest = req.clone({
                headers: req.headers.set("Authorization", `Bearer ${authState.accessToken()}`),
            });
            return handleRequest(tokenizedRequest, next);
        }
        return handleRequest(req, next);
    };
}
