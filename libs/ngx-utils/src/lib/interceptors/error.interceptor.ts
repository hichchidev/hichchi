import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { catchError, Observable, throwError } from "rxjs";
import { HttpError } from "../interfaces";
import { AuthErrorResponseCode } from "@hichchi/nest-connector/auth";
import { HttpClientErrorStatus } from "@hichchi/nest-connector";
import { NOTIFY_ERRORS } from "../tokens";
import { inject, Type } from "@angular/core";

/**
 * Creates an HTTP error response interceptor for Angular applications
 *
 * This function creates an HTTP interceptor that handles error responses from API calls.
 * It provides centralized error handling with support for authentication error detection,
 * automatic user sign-out on unauthorized access, and configurable error notifications.
 * The interceptor integrates with notification services and authentication services to
 * provide a seamless error handling experience.
 *
 * The interceptor distinguishes between different types of errors and handles them
 * appropriately. It can detect known authentication errors, handle unauthorized access
 * by automatically signing out users, and show error notifications based on request
 * context configuration.
 *
 * Key features:
 * - Centralized HTTP error handling for all API requests
 * - Authentication error detection and handling
 * - Automatic user sign-out on unauthorized access
 * - Configurable error notifications per request
 * - Integration with notification and authentication services
 * - Support for both client-side and server-side errors
 * - Context-aware error handling based on request configuration
 *
 * @param providerWithNotify - Service provider type that implements error notification functionality
 * @param providerWithSignOut - Service provider type that implements user sign-out functionality
 * @returns HttpInterceptorFn that can be used in Angular HTTP interceptor configuration
 *
 * @example
 * ```typescript
 * // Basic usage in app configuration
 * import { provideHttpClient, withInterceptors } from '@angular/common/http';
 * import { NotificationService } from './services/notification.service';
 * import { AuthService } from './services/auth.service';
 *
 * export const appConfig: ApplicationConfig = {
 *   providers: [
 *     provideHttpClient(
 *       withInterceptors([
 *         errorResponseInterceptor(NotificationService, AuthService)
 *       ])
 *     )
 *   ]
 * };
 * ```
 *
 * @example
 * ```typescript
 * // Using with custom notification and auth services
 * import { ToastService } from './services/toast.service';
 * import { UserAuthService } from './services/user-auth.service';
 *
 * const errorInterceptor = errorResponseInterceptor(
 *   ToastService,
 *   UserAuthService
 * );
 *
 * export const appConfig: ApplicationConfig = {
 *   providers: [
 *     provideHttpClient(withInterceptors([errorInterceptor]))
 *   ]
 * };
 * ```
 *
 * @example
 * ```typescript
 * // Service implementations that work with the interceptor
 * @Injectable()
 * export class NotificationService {
 *   error(message: string): void {
 *     // Show error notification to user
 *     this.toastr.error(message);
 *   }
 * }
 *
 * @Injectable()
 * export class AuthService {
 *   signOut(): void {
 *     // Clear user session and redirect to login
 *     this.clearTokens();
 *     this.router.navigate(['/login']);
 *   }
 * }
 * ```
 *
 * @example
 * ```typescript
 * // Making HTTP requests with error notification control
 * import { HttpClient } from '@angular/common/http';
 * import { skipNotifyContext } from '@hichchi/ngx-utils';
 *
 * @Injectable()
 * export class DataService {
 *   constructor(private http: HttpClient) {}
 *
 *   // Request with error notifications enabled (default)
 *   getData() {
 *     return this.http.get('/api/data');
 *   }
 *
 *   // Request with error notifications disabled
 *   getDataSilently() {
 *     return this.http.get('/api/data', skipNotifyContext(true));
 *   }
 * }
 * ```
 *
 * @example
 * ```typescript
 * // Advanced usage with multiple interceptors
 * import { AuthInterceptor } from './interceptors/auth.interceptor';
 * import { LoadingInterceptor } from './interceptors/loading.interceptor';
 *
 * export const appConfig: ApplicationConfig = {
 *   providers: [
 *     provideHttpClient(
 *       withInterceptors([
 *         AuthInterceptor,
 *         LoadingInterceptor,
 *         errorResponseInterceptor(NotificationService, AuthService)
 *       ])
 *     )
 *   ]
 * };
 * ```
 *
 * @see {@link HttpInterceptorFn} Angular HTTP interceptor function type
 * @see {@link HttpError} Interface for HTTP error objects
 * @see {@link NOTIFY_ERRORS} Token for controlling error notification context
 * @see {@link AuthErrorResponseCode} Enum of known authentication error codes
 * @see {@link HttpClientErrorStatus} Enum of HTTP client error status codes
 */
export function errorResponseInterceptor(
    providerWithNotify: Type<{ error: (message: string) => void }>,
    providerWithSignOut: Type<{ signOut: () => void }>,
): HttpInterceptorFn {
    return (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
        const showNotification = req.context.get(NOTIFY_ERRORS);

        const serviceWithNotify = inject(providerWithNotify);
        const serviceWithSignOut = inject(providerWithSignOut);

        return next(req).pipe(
            catchError((error: HttpError) => {
                const { error: err } = error;

                if (err && !(err instanceof ErrorEvent)) {
                    const isKnownAuthError = Object.values(AuthErrorResponseCode).includes(
                        err.code as AuthErrorResponseCode,
                    );

                    if (err?.statusCode === HttpClientErrorStatus.UNAUTHORIZED && !isKnownAuthError) {
                        if (showNotification) serviceWithNotify.error(err?.message || "Something went wrong");
                        serviceWithSignOut.signOut();
                    } else if (showNotification) serviceWithNotify.error(err?.message || "Something went wrong");
                } else if (showNotification) serviceWithNotify.error(err?.message || "Something went wrong");

                return throwError(() => error);
            }),
        );
    };
}
