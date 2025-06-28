/* eslint-disable */
// noinspection JSUnusedGlobalSymbols

import { computed, inject } from "@angular/core";
import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";
import { withStorageSync } from "@angular-architects/ngrx-toolkit";
import { catchError, EMPTY, Observable, tap } from "rxjs";
import { AccessToken, AuthResponse, RefreshToken, SignInBody, TokenResponse, User } from "@hichchi/nest-connector/auth";
import { SuccessResponse } from "@hichchi/nest-connector";
import { AuthService } from "../services";
import { Router } from "@angular/router";

/**
 * Interface defining the authentication state model
 *
 * This interface represents the complete authentication state structure used
 * throughout the Angular application. It contains user information, authentication
 * tokens, and session data that persists across browser sessions.
 *
 * The state is automatically synchronized with browser storage to maintain
 * authentication across page refreshes and browser restarts.
 *
 * @example
 * ```typescript
 * // Accessing state in a component
 * export class HeaderComponent {
 *   private authState = inject(AuthState)
 *
 *   get isSignedIn() {
 *     return this.authState.signedIn();
 *   }
 *
 *   get currentUser() {
 *     return this.authState.user();
 *   }
 * }
 * ```
 *
 * @see {@link AuthState} The signal store that manages this state
 * @see {@link User} Interface for user data
 * @see {@link AccessToken} Type for access tokens
 * @see {@link RefreshToken} Type for refresh tokens
 */
export interface AuthStateModel {
    /** Whether the user is currently signed in */
    signedIn: boolean;
    /** Unique identifier for the current session */
    sessionId: string | null;
    /** Current authenticated user information */
    user: User | null;
    /** JWT access token for API authentication */
    accessToken: AccessToken | null;
    /** JWT refresh token for obtaining new access tokens */
    refreshToken: RefreshToken | null;
    /** Expiration date of the access token */
    accessTokenExpiresOn: Date | null;
    /** Expiration date of the refresh token */
    refreshTokenExpiresOn: Date | null;
}

const initialState: AuthStateModel = {
    signedIn: false,
    sessionId: null,
    user: null,
    accessToken: null,
    refreshToken: null,
    accessTokenExpiresOn: null,
    refreshTokenExpiresOn: null,
};

/**
 * Authentication state management store using NgRx Signals
 *
 * This signal store provides centralized state management for authentication in Angular applications.
 * It manages user authentication state, tokens, and provides methods for authentication operations.
 * The store automatically persists state to browser storage and provides reactive computed values.
 *
 * Key features:
 * - Automatic state persistence with browser storage sync
 * - Reactive computed properties for common authentication checks
 * - Built-in methods for sign-in, sign-out, and token management
 * - Integration with Angular Router for navigation after authentication
 * - Type-safe state management with TypeScript
 *
 * The store is provided at the root level and can be injected into any component or service.
 * It uses NgRx Signals for reactive state management and provides a modern alternative
 * to traditional NgRx store patterns.
 *
 * @example
 * ```typescript
 * // In a component
 * export class AppComponent {
 *   private authState = inject(AuthState)
 *
 *   // Access reactive state
 *   isSignedIn = this.authState.signedIn;
 *   currentUser = this.authState.user;
 *   hasAccessToken = this.authState.hasAccessToken;
 *
 *   // Sign in user
 *   async signIn() {
 *     this.authState.signIn({
 *       email: 'user@example.com',
 *       password: 'password123'
 *     }, '/dashboard').subscribe({
 *       next: (response) => console.log('Signed in:', response.user),
 *       error: (error) => console.error('Sign in failed:', error)
 *     });
 *   }
 *
 *   // Sign out user
 *   signOut() {
 *     this.authState.signOut('/login').subscribe();
 *   }
 * }
 * ```
 *
 * @example
 * ```typescript
 * // In a guard
 * export class AuthGuard {
 *   private authState = inject(AuthState)
 *
 *   canActivate(): boolean {
 *     return this.authState.signedIn() && this.authState.hasAccessToken();
 *   }
 * }
 * ```
 *
 * @example
 * ```typescript
 * // Using computed properties
 * export class HeaderComponent {
 *   private authState = inject(AuthState)
 *
 *   // Reactive computed values
 *   userRole = this.authState.role;
 *   isEmailVerified = this.authState.emailVerified;
 *   hasValidToken = this.authState.hasAccessToken;
 * }
 * ```
 *
 * @see {@link AuthStateModel} Interface defining the state structure
 * @see {@link AuthService} Service used for authentication operations
 * @see {@link signalStore} NgRx Signals store factory function
 * @see {@link withStorageSync} Storage synchronization feature
 */
export const AuthState = signalStore(
    { providedIn: "root" },
    withState<AuthStateModel>(initialState),
    withStorageSync({ key: "auth" }),
    withComputed(({ accessToken, user }) => ({
        hasAccessToken: computed(() => Boolean(accessToken())),
        role: computed(() => user()?.role),
        emailVerified: computed((): boolean => Boolean(user()?.emailVerified)),
    })),
    withMethods((store, router = inject(Router), authService = inject(AuthService)) => ({
        reset(): void {
            patchState(store, initialState);
        },
        setTokens(tokenResponse: TokenResponse): void {
            const { accessToken, refreshToken, accessTokenExpiresOn, refreshTokenExpiresOn } = tokenResponse;
            patchState(store, state => ({
                ...state,
                accessToken,
                refreshToken,
                accessTokenExpiresOn,
                refreshTokenExpiresOn,
            }));
        },
        signIn(signInBody: SignInBody, redirect?: string | ((res: AuthResponse) => string)): Observable<AuthResponse> {
            return authService.signIn(signInBody).pipe(
                tap((res: AuthResponse): void => {
                    patchState(store, { ...res, signedIn: true });
                    if (redirect) {
                        void router.navigateByUrl(typeof redirect === "string" ? redirect : redirect(res));
                    }
                }),
            );
        },
        authenticateWithToken: (
            accessToken: AccessToken,
            redirect?: string | ((res: AuthResponse) => string),
        ): Observable<AuthResponse> => {
            return authService.getAuthResponse(accessToken).pipe(
                tap((res: AuthResponse): void => {
                    patchState(store, { ...res, signedIn: Boolean(res.user.role) });
                    if (redirect) {
                        void router.navigateByUrl(typeof redirect === "string" ? redirect: redirect(res));
                    }
                }),
                catchError(() => EMPTY),
            );
        },
        signOut: (redirect?: string): Observable<SuccessResponse | null> => {
            return authService.signOut().pipe(
                tap({
                    next: (): void => {
                        patchState(store, initialState);
                        if (redirect) {
                            void router.navigateByUrl(redirect);
                        }
                    },
                }),
                catchError(() => EMPTY),
            );
        },
    })),
);
