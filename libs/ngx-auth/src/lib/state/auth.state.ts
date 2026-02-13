/* eslint-disable */
// noinspection JSUnusedGlobalSymbols

import { computed, inject, Signal } from "@angular/core";
import {
    patchState,
    signalStore,
    withComputed,
    withMethods,
    withState
} from "@ngrx/signals";
import { withStorageSync } from "@angular-architects/ngrx-toolkit";
import { catchError, EMPTY, firstValueFrom, Observable, tap } from "rxjs";
import {
    AccessToken,
    AuthResponse, isRoleObject,
    RefreshToken,
    SignInBody,
    TokenResponse,
    User
} from "@hichchi/nest-connector/auth";
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
export interface AuthStateModel<Data extends object= object> {
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

    data: Data
}

const initialState: AuthStateModel = {
    signedIn: false,
    sessionId: null,
    user: null,
    accessToken: null,
    refreshToken: null,
    accessTokenExpiresOn: null,
    refreshTokenExpiresOn: null,
    data: {}
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
        /**
         * Computed signal that indicates whether a valid access token is available
         *
         * This computed property returns true if an access token exists in the state,
         * false otherwise. It's useful for checking authentication status and
         * protecting routes or UI elements.
         *
         * @returns Boolean indicating if access token exists
         *
         * @example
         * ```typescript
         * // In a component
         * export class HeaderComponent {
         *   private authState = inject(AuthState)
         *
         *   get showUserMenu() {
         *     return this.authState.hasAccessToken();
         *   }
         * }
         * ```
         */
        hasAccessToken: computed(() => Boolean(accessToken())),

        /**
         * Computed signal that returns the current user's role object
         *
         * This computed property extracts the role from the current user object.
         * The role can be either a string or an object depending on the backend
         * implementation. Use roleName() for a consistent string representation.
         *
         * @returns The user's role object or string, or undefined if no user
         *
         * @example
         * ```typescript
         * // In a component
         * export class AdminComponent {
         *   private authState = inject(AuthState)
         *
         *   get userRole() {
         *     return this.authState.role();
         *   }
         * }
         * ```
         */
        role: computed(() => user()?.role),

        permissions: computed(() => {
            const role = user()?.role;
            return role && isRoleObject(role) ? role.permissions || [] : []
        }),

        /**
         * Computed signal that returns the current user's role name as a string
         *
         * This computed property extracts the role name from the current user,
         * handling both string roles and object roles with a 'name' property.
         * It provides a consistent string representation of the user's role.
         *
         * @returns The user's role name as a string, or undefined if no user/role
         *
         * @example
         * ```typescript
         * // In a guard
         * export class AdminGuard {
         *   private authState = inject(AuthState)
         *
         *   canActivate(): boolean {
         *     return this.authState.roleName() === 'admin';
         *   }
         * }
         * ```
         *
         * @example
         * ```typescript
         * // In a component
         * export class UserProfileComponent {
         *   private authState = inject(AuthState)
         *
         *   get displayRole() {
         *     const roleName = this.authState.roleName();
         *     return roleName ? roleName.charAt(0).toUpperCase() + roleName.slice(1) : 'Guest';
         *   }
         * }
         * ```
         */
        roleName: computed(() => {
            const role = user()?.role
            return role && typeof role === "object" ? role.name : role
        }),

        /**
         * Computed signal that indicates whether the current user's email is verified
         *
         * This computed property returns true if the current user has verified their
         * email address, false otherwise. It's useful for conditional UI rendering
         * and access control based on email verification status.
         *
         * @returns Boolean indicating if user's email is verified
         *
         * @example
         * ```typescript
         * // In a component
         * export class DashboardComponent {
         *   private authState = inject(AuthState)
         *
         *   get showVerificationBanner() {
         *     return this.authState.signedIn() && !this.authState.emailVerified();
         *   }
         * }
         * ```
         */
        emailVerified: computed((): boolean => Boolean(user()?.emailVerified)),
    })),
    withMethods((state, router = inject(Router), authService = inject(AuthService)) => ({
        /**
         * Resets the authentication state to its initial values
         *
         * This method clears all authentication data including user information,
         * tokens, and session data. It effectively signs out the user and resets
         * the state to the same condition as when the application first loads.
         *
         * @example
         * ```typescript
         * // In a component
         * export class SettingsComponent {
         *   private authState = inject(AuthState)
         *
         *   clearAllData() {
         *     this.authState.reset();
         *     console.log('Authentication state cleared');
         *   }
         * }
         * ```
         *
         * @example
         * ```typescript
         * // In an error handler
         * export class ErrorHandler {
         *   private authState = inject(AuthState)
         *
         *   handleCriticalError() {
         *     // Clear auth state on critical errors
         *     this.authState.reset();
         *     this.router.navigate(['/login']);
         *   }
         * }
         * ```
         */
        reset(): void {
            patchState(state, initialState);
        },

        /**
         * Updates the authentication state with new token information
         *
         * This method updates the current authentication state with new access and
         * refresh tokens along with their expiration dates. It's typically used
         * after token refresh operations or when receiving new tokens from the server.
         *
         * @param tokenResponse - The token response containing new token information
         *
         * @example
         * ```typescript
         * // After token refresh
         * export class TokenService {
         *   private authState = inject(AuthState)
         *
         *   async refreshTokens() {
         *     const tokenResponse = await this.authService.refreshToken(currentRefreshToken);
         *     this.authState.setTokens(tokenResponse);
         *     console.log('Tokens updated successfully');
         *   }
         * }
         * ```
         *
         * @example
         * ```typescript
         * // In an interceptor
         * export class AuthInterceptor {
         *   private authState = inject(AuthState)
         *
         *   handleTokenRefresh(tokenResponse: TokenResponse) {
         *     this.authState.setTokens(tokenResponse);
         *     // Continue with the original request
         *   }
         * }
         * ```
         */
        setTokens(tokenResponse: TokenResponse): void {
            const {
                accessToken,
                refreshToken,
                accessTokenExpiresOn,
                refreshTokenExpiresOn
            } = tokenResponse;
            patchState(state, data => ({
                ...data,
                accessToken,
                refreshToken,
                accessTokenExpiresOn,
                refreshTokenExpiresOn,
            }));
        },

        /**
         * Authenticates a user with email/username and password
         *
         * This method handles user sign-in by calling the AuthService and updating
         * the authentication state with the response. It supports both Observable
         * and Promise return types based on the asPromise parameter, and can
         * automatically redirect users after successful authentication.
         *
         * The method integrates with the error notification system and can
         * optionally suppress error notifications for custom error handling.
         *
         * @param signInBody - The sign-in credentials containing email/username and password
         * @param redirect - Optional redirect path or function that returns a path after successful sign-in
         * @param asPromise - Optional flag to return a Promise instead of an Observable (defaults to false)
         * @param showError - Optional flag to control error notification display (defaults to true for Promise mode, false for Observable mode)
         * @returns Promise<AuthResponse> if asPromise is true, otherwise Observable<AuthResponse>
         *
         * @example
         * ```typescript
         * // Basic sign-in with Promise (default behavior)
         * export class LoginComponent {
         *   private authState = inject(AuthState)
         *
         *   async signIn() {
         *     try {
         *       await this.authState.signIn({
         *         email: 'user@example.com',
         *         password: 'password123'
         *       }, '/dashboard');
         *       console.log('Sign-in successful');
         *     } catch (error) {
         *       console.error('Sign-in failed:', error);
         *     }
         *   }
         * }
         * ```
         *
         * @example
         * ```typescript
         * // Sign-in with Observable for reactive handling
         * export class AuthComponent {
         *   private authState = inject(AuthState)
         *
         *   signIn() {
         *     this.authState.signIn({
         *       email: 'user@example.com',
         *       password: 'password123'
         *     }, '/dashboard', true).subscribe({
         *       next: (response) => {
         *         console.log('User signed in:', response.user);
         *         this.handleSuccessfulSignIn(response);
         *       },
         *       error: (error) => {
         *         console.error('Sign-in failed:', error);
         *         this.handleSignInError(error);
         *       }
         *     });
         *   }
         * }
         * ```
         *
         * @example
         * ```typescript
         * // Dynamic redirect based on user role
         * export class LoginComponent {
         *   private authState = inject(AuthState)
         *
         *   signIn() {
         *     this.authState.signIn({
         *       email: 'user@example.com',
         *       password: 'password123'
         *     }, (response) => {
         *       return response.user.role === 'admin' ? '/admin' : '/dashboard';
         *     });
         *   }
         * }
         * ```
         *
         * @example
         * ```typescript
         * // Sign-in with custom error handling
         * export class LoginComponent {
         *   private authState = inject(AuthState)
         *
         *   signIn() {
         *     this.authState.signIn({
         *       email: 'user@example.com',
         *       password: 'password123'
         *     }, '/dashboard', true, false).subscribe({
         *       next: (response) => console.log('Success:', response),
         *       error: (error) => this.showCustomError(error)
         *     });
         *   }
         * }
         * ```
         *
         * @see {@link AuthService.signIn} The underlying service method for authentication
         * @see {@link SignInBody} Interface for sign-in request data
         * @see {@link AuthResponse} Interface for authentication response
         */
        signIn: <AsPromise extends boolean = false>(
            signInBody: SignInBody,
            redirect?: string | ((res: AuthResponse) => string),
            asPromise?: AsPromise,
            showError?: boolean
        ): AsPromise extends true ? Promise<AuthResponse> : Observable<AuthResponse> => {
            const sub = authService.signIn(signInBody, !(showError || asPromise && showError === undefined)).pipe(
                tap((res: AuthResponse): void => {
                    patchState(state, { ...res, signedIn: true });
                    if (redirect) {
                        void router.navigateByUrl(typeof redirect === "string" ? redirect : redirect(res));
                    }
                }),
            );

            if (asPromise) {
                return firstValueFrom(sub) as AsPromise extends true ? Promise<AuthResponse> : Observable<AuthResponse>
            }

            return sub as AsPromise extends true ? Promise<AuthResponse> : Observable<AuthResponse>;
        },

        /**
         * Authenticates a user using an existing access token
         *
         * This method exchanges an access token for a complete authentication response
         * and updates the authentication state. It's typically used after OAuth flows
         * (like Google sign-in) or when resuming sessions with stored tokens. The method
         * supports both Observable and Promise return types and can automatically redirect
         * users after successful authentication.
         *
         * The method integrates with the error notification system and includes error
         * handling that gracefully handles token validation failures.
         *
         * @param accessToken - The access token to authenticate with
         * @param redirect - Optional redirect path or function that returns a path after successful authentication
         * @param asPromise - Optional flag to return a Promise instead of an Observable (defaults to false)
         * @param showError - Optional flag to control error notification display (defaults to true for Promise mode, false for Observable mode)
         * @returns Promise<AuthResponse> if asPromise is true, otherwise Observable<AuthResponse>
         *
         * @example
         * ```typescript
         * // Basic token authentication with Promise (default behavior)
         * export class OAuthCallbackComponent {
         *   private authState = inject(AuthState)
         *
         *   async handleCallback(token: string) {
         *     try {
         *       await this.authState.authenticateWithToken(token, '/dashboard');
         *       console.log('Token authentication successful');
         *     } catch (error) {
         *       console.error('Token authentication failed:', error);
         *     }
         *   }
         * }
         * ```
         *
         * @example
         * ```typescript
         * // Token authentication with Observable for reactive handling
         * export class AuthComponent {
         *   private authState = inject(AuthState)
         *
         *   authenticateWithToken(token: AccessToken) {
         *     this.authState.authenticateWithToken(token, '/dashboard', true).subscribe({
         *       next: (response) => {
         *         console.log('User authenticated:', response.user);
         *         this.handleSuccessfulAuth(response);
         *       },
         *       error: (error) => {
         *         console.error('Token authentication failed:', error);
         *         this.handleAuthError(error);
         *       }
         *     });
         *   }
         * }
         * ```
         *
         * @example
         * ```typescript
         * // Google OAuth integration
         * export class GoogleAuthComponent {
         *   private authState = inject(AuthState)
         *   private authService = inject(AuthService)
         *
         *   async signInWithGoogle() {
         *     try {
         *       const accessToken = await this.authService.googleSignIn();
         *       await this.authState.authenticateWithToken(accessToken, (response) => {
         *         return response.user.role === 'admin' ? '/admin' : '/dashboard';
         *       });
         *     } catch (error) {
         *       console.error('Google sign-in failed:', error);
         *     }
         *   }
         * }
         * ```
         *
         * @example
         * ```typescript
         * // Token authentication with custom error handling
         * export class TokenAuthComponent {
         *   private authState = inject(AuthState)
         *
         *   authenticateWithStoredToken(token: AccessToken) {
         *     this.authState.authenticateWithToken(token, '/dashboard', true, false).subscribe({
         *       next: (response) => console.log('Success:', response),
         *       error: (error) => this.handleCustomTokenError(error)
         *     });
         *   }
         * }
         * ```
         *
         * @see {@link AuthService.getAuthResponse} The underlying service method for token authentication
         * @see {@link AccessToken} Type representing access tokens
         * @see {@link AuthResponse} Interface for authentication response
         */
        authenticateWithToken: <AsPromise extends boolean = false>(
            accessToken: AccessToken,
            redirect?: string | ((res: AuthResponse) => string),
            asPromise?: AsPromise,
            showError?: boolean
        ): AsPromise extends true ? Promise<AuthResponse> : Observable<AuthResponse> => {
            const sub = authService.getAuthResponse(accessToken, !(showError || asPromise && showError === undefined)).pipe(
                tap((res: AuthResponse): void => {
                    patchState(state, {
                        ...res,
                        signedIn: Boolean(res.user.role)
                    });
                    if (redirect) {
                        void router.navigateByUrl(typeof redirect === "string" ? redirect : redirect(res));
                    }
                }),
                catchError(() => EMPTY),
            );

            if (asPromise) {
                return firstValueFrom(sub) as AsPromise extends true ? Promise<AuthResponse> : Observable<AuthResponse>
            }

            return sub as AsPromise extends true ? Promise<AuthResponse> : Observable<AuthResponse>;
        },

        /**
         * Signs out the current user and clears authentication state
         *
         * This method handles user sign-out by calling the AuthService to invalidate
         * the session on the server and then clearing all authentication data from
         * the local state. It supports both Observable and Promise return types and
         * can automatically redirect users after successful sign-out.
         *
         * The method integrates with the error notification system and includes error
         * handling that ensures local state is cleared even if server sign-out fails.
         *
         * @param redirect - Optional redirect path after successful sign-out
         * @param asPromise - Optional flag to return a Promise instead of an Observable (defaults to false)
         * @param showError - Optional flag to control error notification display (defaults to true for Promise mode, false for Observable mode)
         * @returns Promise<SuccessResponse | null> if asPromise is true, otherwise Observable<SuccessResponse | null>
         *
         * @example
         * ```typescript
         * // Basic sign-out with Promise (default behavior)
         * export class HeaderComponent {
         *   private authState = inject(AuthState)
         *
         *   async signOut() {
         *     try {
         *       await this.authState.signOut('/login');
         *       console.log('Sign-out successful');
         *     } catch (error) {
         *       console.error('Sign-out failed:', error);
         *     }
         *   }
         * }
         * ```
         *
         * @example
         * ```typescript
         * // Sign-out with Observable for reactive handling
         * export class AuthComponent {
         *   private authState = inject(AuthState)
         *
         *   signOut() {
         *     this.authState.signOut('/login', true).subscribe({
         *       next: (response) => {
         *         console.log('Sign-out successful:', response);
         *         this.handleSuccessfulSignOut();
         *       },
         *       error: (error) => {
         *         console.error('Sign-out failed:', error);
         *         this.handleSignOutError(error);
         *       }
         *     });
         *   }
         * }
         * ```
         *
         * @example
         * ```typescript
         * // Sign-out without redirect
         * export class SettingsComponent {
         *   private authState = inject(AuthState)
         *
         *   async signOut() {
         *     await this.authState.signOut(); // No redirect
         *     this.showSignOutMessage();
         *   }
         * }
         * ```
         *
         * @example
         * ```typescript
         * // Sign-out with custom error handling
         * export class AuthComponent {
         *   private authState = inject(AuthState)
         *
         *   signOut() {
         *     this.authState.signOut('/login', true, false).subscribe({
         *       next: (response) => console.log('Success:', response),
         *       error: (error) => this.handleCustomSignOutError(error)
         *     });
         *   }
         * }
         * ```
         *
         * @example
         * ```typescript
         * // Emergency sign-out (clear local state immediately)
         * export class SecurityComponent {
         *   private authState = inject(AuthState)
         *
         *   emergencySignOut() {
         *     // Clear local state first
         *     this.authState.reset();
         *     // Then attempt server sign-out
         *     this.authState.signOut('/login').catch(() => {
         *       // Ignore server errors in emergency situations
         *       console.log('Local state cleared, server sign-out may have failed');
         *     });
         *   }
         * }
         * ```
         *
         * @see {@link AuthService.signOut} The underlying service method for server sign-out
         * @see {@link SuccessResponse} Interface for success response
         * @see {@link reset} Method to manually clear authentication state
         */
        signOut: <AsPromise extends boolean = false>(
            redirect?: string,
            asPromise?: AsPromise,
            showError?: boolean
        ): AsPromise extends true ? Promise<SuccessResponse | null> : Observable<SuccessResponse | null> => {
            const sub = authService.signOut(!(showError || asPromise && showError === undefined)).pipe(
                tap({
                    next: (): void => {
                        patchState(state, initialState);
                        if (redirect) {
                            void router.navigateByUrl(redirect);
                        }
                    },
                }),
                catchError(() => EMPTY),
            );

            if (asPromise) {
                return firstValueFrom(sub) as AsPromise extends true ? Promise<SuccessResponse | null> : Observable<SuccessResponse | null>;
            }

            return sub as AsPromise extends true ? Promise<SuccessResponse | null> : Observable<SuccessResponse | null>;
        },

        setData(stateData: object): void {
            patchState(state, data => ({
                ...data,
                data: { ...data.data, ...stateData },
            }));
        }
    })),
);

/**
 * Public typed shape of the `AuthState` signal store.
 */
export type AuthState<D = unknown, R extends string = string, P extends string = string, U extends User<R, P> = User<R, P>, > = {
    signedIn: Signal<boolean>;
    sessionId: Signal<string | null>;
    user: Signal<U | null>;
    accessToken: Signal<AccessToken | null>;
    refreshToken: Signal<RefreshToken | null>;
    accessTokenExpiresOn: Signal<Date | null>;
    refreshTokenExpiresOn: Signal<Date | null>;
    data: Signal<D>;

    hasAccessToken: Signal<boolean>;
    role: Signal<U["role"] | null | undefined>;
    roleName: Signal<R | null | undefined>;
    permissions: Signal<P[]>;
    emailVerified: Signal<boolean>;

    reset: () => void;
    setTokens: (tokenResponse: TokenResponse) => void;
    signIn: <AsPromise extends boolean = false>(
        signInBody: SignInBody,
        redirect?: string | ((res: AuthResponse) => string),
        asPromise?: AsPromise,
        showError?: boolean
    ) => AsPromise extends true ? Promise<AuthResponse> : Observable<AuthResponse>;
    authenticateWithToken: <AsPromise extends boolean = false>(
        accessToken: AccessToken,
        redirect?: string | ((res: AuthResponse) => string),
        asPromise?: AsPromise,
        showError?: boolean
    ) => AsPromise extends true ? Promise<AuthResponse> : Observable<AuthResponse>;
    signOut: <AsPromise extends boolean = false>(
        redirect?: string,
        asPromise?: AsPromise,
        showError?: boolean
    ) => AsPromise extends true ? Promise<SuccessResponse | null> : Observable<SuccessResponse | null>;
    setData: (stateData: { [K in keyof D]?: D[K] }) => void
}
