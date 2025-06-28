// noinspection JSUnusedGlobalSymbols

import { HttpClient } from "@angular/common/http";
import { Inject, inject, Injectable } from "@angular/core";
import { map, Observable, take } from "rxjs";
import {
    AccessToken,
    AuthEndpoint,
    AuthResponse,
    RefreshToken,
    SignInBody,
    SignUpBody,
    TokenResponse,
    User,
} from "@hichchi/nest-connector/auth";
import { Endpoint, SuccessResponse } from "@hichchi/nest-connector";
import { AUTH_CONFIG } from "../tokens";
import { AuthConfig } from "../interfaces";
import { GOOGLE_AUTH_POPUP_HEIGHT, GOOGLE_AUTH_POPUP_WIDTH, POPUP_POLLING_INTERVAL_MS } from "../constants";

/**
 * Angular authentication service for client-side authentication operations
 *
 * This service provides methods for handling authentication operations in Angular applications,
 * including user sign-in, sign-up, Google OAuth authentication, token management, and sign-out.
 * It communicates with the backend authentication API and handles the client-side aspects
 * of the authentication flow.
 *
 * The service is configured through the AuthConfig interface and automatically handles
 * token expiration date parsing and HTTP request management. It integrates seamlessly
 * with the @hichchi/nest-auth backend module.
 *
 * Key features:
 * - Local authentication (email/username and password)
 * - Google OAuth authentication with popup flow
 * - Token refresh functionality
 * - User registration
 * - Automatic token expiration handling
 * - RESTful API communication
 *
 * @example
 * ```typescript
 * // In a component
 * export class LoginComponent {
 *   constructor(private authService: AuthService) {}
 *
 *   async signIn() {
 *     try {
 *       const response = await this.authService.signIn({
 *         email: 'user@example.com',
 *         password: 'password123'
 *       }).toPromise();
 *       console.log('Signed in:', response.user);
 *     } catch (error) {
 *       console.error('Sign in failed:', error);
 *     }
 *   }
 * }
 * ```
 *
 * @see {@link AuthConfig} Configuration interface for the authentication service
 * @see {@link NgxHichchiAuthModule} Module that provides this service
 * @see {@link AuthState} State management service for authentication
 * @see {@link AuthResponse} Response interface for authentication operations
 */
@Injectable({
    providedIn: "root",
})
export class AuthService {
    http = inject(HttpClient);

    /**
     * Creates an instance of AuthService
     *
     * @param config - The authentication configuration injected from AUTH_CONFIG token
     *
     * @see {@link AUTH_CONFIG} Injection token for authentication configuration
     * @see {@link AuthConfig} Interface defining the configuration structure
     */
    constructor(@Inject(AUTH_CONFIG) private readonly config: AuthConfig) {}

    /**
     * Authenticates a user with email/username and password
     *
     * This method sends a sign-in request to the backend authentication API with the provided
     * credentials. It automatically converts the token expiration timestamps from the response
     * into JavaScript Date objects for easier handling in the client application.
     *
     * @param dto - The sign-in data containing user credentials
     * @returns Observable that emits the authentication response with user data and tokens
     *
     * @example
     * ```typescript
     * // Sign in with email and password
     * this.authService.signIn({
     *   email: 'user@example.com',
     *   password: 'password123'
     * }).subscribe({
     *   next: (response) => {
     *     console.log('User signed in:', response.user);
     *     console.log('Access token expires:', response.accessTokenExpiresOn);
     *   },
     *   error: (error) => {
     *     console.error('Sign in failed:', error);
     *   }
     * });
     * ```
     *
     * @see {@link SignInBody} Interface for sign-in request data
     * @see {@link AuthResponse} Interface for authentication response
     * @see {@link AuthEndpoint.SIGN_IN} Backend endpoint for user authentication
     */
    signIn(dto: SignInBody): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${Endpoint.AUTH}/${AuthEndpoint.SIGN_IN}`, dto).pipe(
            take(1),
            map(res => ({
                ...res,
                accessTokenExpiresOn: new Date(res.accessTokenExpiresOn),
                refreshTokenExpiresOn: new Date(res.refreshTokenExpiresOn),
            })),
        );
    }

    /**
     * Initiates Google OAuth authentication using a popup window
     *
     * This method opens a popup window that navigates to the Google OAuth authentication
     * endpoint. It handles the OAuth flow by monitoring the popup window and extracting
     * the access token from the callback URL when authentication is successful.
     *
     * The popup is automatically positioned in the center of the screen and has predefined
     * dimensions for optimal user experience. The method polls the popup window to detect
     * when authentication is complete or if the user closes the popup.
     *
     * @returns Promise that resolves with the access token when authentication succeeds
     *
     * @throws {Error} If authentication fails or the popup is blocked
     *
     * @example
     * ```typescript
     * // Initiate Google sign-in
     * try {
     *   const accessToken = await this.authService.googleSignIn();
     *   console.log('Google authentication successful:', accessToken);
     *
     *   // Use the token to get full auth response
     *   const authResponse = await this.authService.getAuthResponse(accessToken).toPromise();
     *   console.log('User data:', authResponse.user);
     * } catch (error) {
     *   console.error('Google authentication failed:', error);
     * }
     * ```
     *
     * @example
     * ```typescript
     * // In a component with error handling
     * async signInWithGoogle() {
     *   try {
     *     const token = await this.authService.googleSignIn();
     *     // Handle successful authentication
     *     this.router.navigate(['/dashboard']);
     *   } catch (error) {
     *     if (error.message.includes('popup')) {
     *       this.showError('Please allow popups for Google sign-in');
     *     } else {
     *       this.showError('Google sign-in failed. Please try again.');
     *     }
     *   }
     * }
     * ```
     *
     * @see {@link getAuthResponse} Method to get full authentication response using the access token
     * @see {@link AuthEndpoint.GOOGLE_SIGN_IN} Backend endpoint for Google OAuth initiation
     * @see {@link GOOGLE_AUTH_POPUP_WIDTH} Constant defining popup window width
     * @see {@link GOOGLE_AUTH_POPUP_HEIGHT} Constant defining popup window height
     * @see {@link POPUP_POLLING_INTERVAL_MS} Constant defining popup polling interval
     */
    googleSignIn(): Promise<AccessToken> {
        return new Promise((resolve: (token: AccessToken) => void, reject: (error: unknown) => void): void => {
            // eslint-disable-next-line @typescript-eslint/no-magic-numbers
            const left = (window.screen.width - GOOGLE_AUTH_POPUP_WIDTH) / 2;
            // eslint-disable-next-line @typescript-eslint/no-magic-numbers
            const top = (window.screen.height - GOOGLE_AUTH_POPUP_HEIGHT) / 2;

            const popup = window.open(
                `${this.config.apiBaseURL}/${Endpoint.AUTH}/${AuthEndpoint.GOOGLE_SIGN_IN}?redirectUrl=${window.location.origin}`,
                "google-login-popup",
                // eslint-disable-next-line prefer-template
                "resizable=no, location=no, toolbar=false, width=" +
                    GOOGLE_AUTH_POPUP_WIDTH +
                    ", height=" +
                    GOOGLE_AUTH_POPUP_HEIGHT +
                    ", top=" +
                    top +
                    ", left=" +
                    left,
            );

            const interval = setInterval(() => {
                if (popup?.closed) {
                    clearInterval(interval);
                }

                try {
                    if (popup?.location.href !== "about:blank" && popup?.location?.search?.includes("?token=e")) {
                        const token = popup.location.search.split("=")[1] as AccessToken;
                        clearInterval(interval);
                        popup.close();
                        resolve(token);
                    }
                } catch (error) {
                    if (!String(error).includes("SecurityError")) {
                        clearInterval(interval);
                        reject(error);
                    }
                }
            }, POPUP_POLLING_INTERVAL_MS);
        });
    }

    /**
     * Retrieves the complete authentication response using an access token
     *
     * This method exchanges an access token for a complete authentication response
     * containing user information and token details. It's typically used after
     * Google OAuth authentication to get the full user profile and session data.
     *
     * The method automatically converts token expiration timestamps to JavaScript
     * Date objects for easier handling in the client application.
     *
     * @param accessToken - The access token to exchange for authentication response
     * @returns Observable that emits the complete authentication response
     *
     * @example
     * ```typescript
     * // Get auth response after Google sign-in
     * const accessToken = await this.authService.googleSignIn();
     * this.authService.getAuthResponse(accessToken).subscribe({
     *   next: (response) => {
     *     console.log('User:', response.user);
     *     console.log('Tokens:', {
     *       access: response.accessToken,
     *       refresh: response.refreshToken
     *     });
     *   },
     *   error: (error) => {
     *     console.error('Failed to get auth response:', error);
     *   }
     * });
     * ```
     *
     * @see {@link AccessToken} Type representing access tokens
     * @see {@link AuthResponse} Interface for complete authentication response
     * @see {@link AuthEndpoint.GET_AUTH_RESPONSE} Backend endpoint for token exchange
     * @see {@link googleSignIn} Method that provides access tokens for this operation
     */
    getAuthResponse(accessToken: AccessToken): Observable<AuthResponse> {
        return this.http
            .post<AuthResponse>(`${Endpoint.AUTH}/${AuthEndpoint.GET_AUTH_RESPONSE}`, {
                accessToken,
            })
            .pipe(
                take(1),
                map(res => ({
                    ...res,
                    accessTokenExpiresOn: new Date(res.accessTokenExpiresOn),
                    refreshTokenExpiresOn: new Date(res.refreshTokenExpiresOn),
                })),
            );
    }

    /**
     * Registers a new user account
     *
     * This method sends a registration request to the backend API with the provided
     * user information. It creates a new user account and returns the user data
     * upon successful registration.
     *
     * Note that this method only creates the user account and does not automatically
     * sign the user in. After successful registration, you may need to call signIn
     * or handle email verification depending on your application's configuration.
     *
     * @param dto - The sign-up data containing user registration information
     * @returns Observable that emits the newly created user data
     *
     * @example
     * ```typescript
     * // Register a new user
     * this.authService.signUp({
     *   email: 'newuser@example.com',
     *   password: 'securePassword123',
     *   firstName: 'John',
     *   lastName: 'Doe'
     * }).subscribe({
     *   next: (user) => {
     *     console.log('User registered successfully:', user);
     *     // Optionally redirect to sign-in or email verification page
     *     this.router.navigate(['/verify-email']);
     *   },
     *   error: (error) => {
     *     console.error('Registration failed:', error);
     *     // Handle registration errors (email already exists, etc.)
     *   }
     * });
     * ```
     *
     * @see {@link SignUpBody} Interface for user registration data
     * @see {@link User} Interface for user data returned after registration
     * @see {@link AuthEndpoint.SIGN_UP} Backend endpoint for user registration
     * @see {@link signIn} Method to authenticate user after registration
     */
    signUp(dto: SignUpBody): Observable<User> {
        return this.http.post<User>(`${Endpoint.AUTH}/${AuthEndpoint.SIGN_UP}`, dto).pipe(take(1));
    }

    /**
     * Refreshes an expired access token using a refresh token
     *
     * This method exchanges a valid refresh token for a new set of access and refresh tokens.
     * It's typically used when the current access token has expired but the refresh token
     * is still valid, allowing the user to maintain their session without re-authenticating.
     *
     * The refresh token mechanism provides a secure way to maintain long-lived sessions
     * while keeping access tokens short-lived for better security.
     *
     * @param refreshToken - The refresh token to exchange for new tokens
     * @returns Observable that emits the new token response
     *
     * @example
     * ```typescript
     * // Refresh tokens when access token expires
     * const storedRefreshToken = localStorage.getItem('refreshToken');
     * if (storedRefreshToken) {
     *   this.authService.refreshToken(storedRefreshToken).subscribe({
     *     next: (tokenResponse) => {
     *       console.log('Tokens refreshed successfully');
     *       // Store new tokens
     *       localStorage.setItem('accessToken', tokenResponse.accessToken);
     *       localStorage.setItem('refreshToken', tokenResponse.refreshToken);
     *     },
     *     error: (error) => {
     *       console.error('Token refresh failed:', error);
     *       // Redirect to login page
     *       this.router.navigate(['/login']);
     *     }
     *   });
     * }
     * ```
     *
     * @see {@link RefreshToken} Type representing refresh tokens
     * @see {@link TokenResponse} Interface for token refresh response
     * @see {@link AuthEndpoint.REFRESH_TOKEN} Backend endpoint for token refresh
     * @see {@link signIn} Method to get initial tokens through authentication
     */
    refreshToken(refreshToken: RefreshToken): Observable<TokenResponse> {
        return this.http
            .post<AuthResponse>(`${Endpoint.AUTH}/${AuthEndpoint.REFRESH_TOKEN}`, {
                refreshToken,
            })
            .pipe(take(1));
    }

    /**
     * Signs out the current user and invalidates their session
     *
     * This method sends a sign-out request to the backend API to invalidate the user's
     * current session and tokens. It effectively logs the user out of the application
     * and clears their authentication state on the server.
     *
     * After calling this method, you should also clear any client-side authentication
     * data such as tokens stored in localStorage, sessionStorage, or application state.
     *
     * @returns Observable that emits a success response when sign-out is complete
     *
     * @example
     * ```typescript
     * // Sign out the current user
     * this.authService.signOut().subscribe({
     *   next: (response) => {
     *     console.log('User signed out successfully');
     *     // Clear client-side authentication data
     *     localStorage.removeItem('accessToken');
     *     localStorage.removeItem('refreshToken');
     *     // Redirect to login page
     *     this.router.navigate(['/login']);
     *   },
     *   error: (error) => {
     *     console.error('Sign out failed:', error);
     *     // Even if server sign-out fails, clear local data
     *     localStorage.clear();
     *     this.router.navigate(['/login']);
     *   }
     * });
     * ```
     *
     * @example
     * ```typescript
     * // Sign out with state management
     * async signOut() {
     *   try {
     *     await this.authService.signOut().toPromise();
     *     // Clear authentication state
     *     this.authState.clearUser();
     *     this.notificationService.showSuccess('Signed out successfully');
     *   } catch (error) {
     *     console.error('Sign out error:', error);
     *   } finally {
     *     // Always redirect to login
     *     this.router.navigate(['/login']);
     *   }
     * }
     * ```
     *
     * @see {@link SuccessResponse} Interface for success response
     * @see {@link AuthEndpoint.SIGN_OUT} Backend endpoint for user sign-out
     * @see {@link signIn} Method to authenticate user after sign-out
     */
    signOut(): Observable<SuccessResponse | null> {
        // this.app.startSpinner();
        return this.http.post<SuccessResponse>(`${Endpoint.AUTH}/${AuthEndpoint.SIGN_OUT}`, {}).pipe(take(1));
    }
}
