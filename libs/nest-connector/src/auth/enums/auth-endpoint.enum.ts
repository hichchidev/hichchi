/**
 * Authentication Endpoints Enum
 *
 * This enum defines all authentication-related endpoints used in the application.
 * Each value represents a specific API endpoint path segment for authentication operations.
 *
 * Enum Values:
 * - `SIGN_UP`: User registration endpoint.
 * - `SIGN_IN`: Local authentication endpoint.
 * - `GOOGLE_SIGN_IN`: Initiates Google OAuth flow.
 * - `GOOGLE_CALLBACK`: Callback endpoint for Google OAuth.
 * - `AUTHENTICATE_SOCIAL`: Process social authentication data.
 * - `REFRESH_TOKEN`: Obtain a new access token using refresh token.
 * - `REQUEST_PASSWORD_RESET`: Request password reset link/code.
 * - `RESET_PASSWORD_VERIFY`: Verify password reset token/code.
 * - `RESEND_EMAIL_VERIFICATION`: Send verification email again.
 * - `VERIFY_EMAIL`: Confirm email verification.
 * - `RESET_PASSWORD`: Set new password after verification.
 * - `ME`: Get current authenticated user info.
 * - `CHANGE_PASSWORD`: Update user's password.
 * - `SIGN_OUT`: End user session/invalidate tokens.
 */
export enum AuthEndpoint {
    /**
     * User registration endpoint
     *
     * Handles new user account creation with provided credentials and profile information.
     * This endpoint accepts user registration data including email, password, and optional
     * profile details, then creates a new account in the system.
     *
     * The endpoint may also trigger email verification, depending on configuration.
     */
    SIGN_UP = "sign-up",

    /**
     * Local authentication endpoint
     *
     * Authenticates users with username/email and password, returning authentication tokens.
     * This endpoint validates the provided credentials against stored user data and,
     * if valid, generates and returns access and refresh tokens for the authenticated session.
     *
     * The endpoint also sets authentication cookies if configured to do so.
     */
    SIGN_IN = "sign-in",

    /**
     * Initiates Google OAuth flow
     *
     * Redirects users to Google's authentication page to begin the OAuth process.
     * This endpoint starts the OAuth 2.0 flow with Google by redirecting the user
     * to Google's authentication page. It accepts a redirectUrl parameter that
     * specifies where to redirect after successful authentication.
     *
     * The URL is stored in the OAuth state parameter to be used by the callback endpoint.
     *
     * @see {@link GOOGLE_CALLBACK} - The endpoint that handles the OAuth callback
     */
    GOOGLE_SIGN_IN = "google-sign-in",

    /**
     * Callback endpoint for Google OAuth
     *
     * Receives and processes authentication data after successful Google authentication.
     * This endpoint is called by Google's OAuth service after the user has successfully
     * authenticated. It extracts the authentication code, exchanges it for tokens,
     * and redirects the user to the original redirectUrl specified in the initial request,
     * passing the access token as a query parameter.
     *
     * @see {@link GOOGLE_SIGN_IN} - The endpoint that initiates the OAuth flow
     */
    GOOGLE_CALLBACK = "google-callback",

    /**
     * Get authentication response from an existing token
     *
     * This endpoint allows clients to retrieve a complete authentication response
     * using a previously issued JWT access token. It verifies the token,
     * retrieves the associated user information, generates new tokens,
     * and returns comprehensive authentication data.
     *
     * This is useful for clients that need to exchange an existing token
     * for a complete authentication response containing user details and session information.
     */
    GET_AUTH_RESPONSE = "get-auth-response",

    /**
     * Obtain a new access token using refresh token
     *
     * Allows clients to get a new access token without requiring re-authentication.
     * This endpoint accepts a valid refresh token and, if the token is valid and
     * not expired, issues new access and refresh tokens for continued authentication.
     *
     * This enables longer user sessions without requiring frequent logins while still
     * maintaining security by using short-lived access tokens.
     */
    REFRESH_TOKEN = "refresh-token",

    /**
     * Request password reset link/code
     *
     * Initiates the password recovery process by sending reset instructions.
     * This endpoint accepts an email address, validates that it belongs to a registered
     * user, and sends a password reset link or code to that email address. For security,
     * it typically returns a success response regardless of whether the email exists
     * in the system to prevent email enumeration attacks.
     */
    REQUEST_PASSWORD_RESET = "request-password-reset",

    /**
     * Verify password reset token/code
     *
     * Validates the reset token before allowing password change.
     * This endpoint accepts a password reset token and verifies its validity without
     * actually resetting the password. This allows client applications to verify
     * a token before showing the password reset form to the user, improving user experience
     * by providing immediate feedback about expired or invalid tokens.
     */
    RESET_PASSWORD_VERIFY = "reset-password-verify",

    /**
     * Send verification email again
     *
     * Allows users to request a new verification email if the original expired or was lost.
     * This endpoint accepts an email address and, if it belongs to an unverified user,
     * generates a new verification token and sends a verification email to that address.
     * For security reasons, it typically returns a success response regardless of whether
     * the email exists or is already verified.
     */
    RESEND_EMAIL_VERIFICATION = "resend-email-verification",

    /**
     * Confirm email verification
     *
     * Processes the verification link clicked from email to confirm user's email address.
     * This endpoint is typically accessed via a link in the verification email sent to users.
     * It accepts a verification token, validates it, marks the user's email as verified if
     * the token is valid, and redirects the user to a configured URL with a query parameter
     * indicating whether the verification was successful.
     */
    VERIFY_EMAIL = "verify-email",

    /**
     * Set new password after verification
     *
     * Allows users to create a new password after identity verification.
     * This endpoint accepts a valid password reset token and a new password, then
     * updates the user's password if the token is valid. It should typically be called
     * after the token has been verified using the RESET_PASSWORD_VERIFY endpoint.
     * The endpoint invalidates the reset token after successful password reset to
     * prevent reuse.
     */
    RESET_PASSWORD = "reset-password",

    /**
     * Get current authenticated user info
     *
     * Returns the profile and relevant information for the currently authenticated user.
     * This endpoint requires a valid JWT token and returns the user information associated
     * with that token. It allows client applications to retrieve up-to-date user data
     * for displaying profile information, checking permissions, or verifying authentication
     * status.
     */
    ME = "me",

    /**
     * Update user's password
     *
     * Allows authenticated users to change their password (requires current password).
     * This endpoint requires a valid JWT token and accepts both the current password
     * (for verification) and the new password. It validates the current password against
     * the stored credentials, and if valid, updates the user's password to the new value.
     * This endpoint is used for routine password changes by authenticated users, not for
     * password reset after forgetting credentials.
     */
    CHANGE_PASSWORD = "change-password",

    /**
     * End user session/invalidate tokens
     *
     * Handles user logout by invalidating active authentication tokens.
     * This endpoint requires a valid JWT token and invalidates the current authentication
     * session by blacklisting or removing the refresh token, clearing authentication cookies
     * if they're being used, and performing any other cleanup necessary to terminate the
     * user session securely. After calling this endpoint, client applications should also
     * remove any locally stored tokens.
     */
    SIGN_OUT = "sign-out",
}
