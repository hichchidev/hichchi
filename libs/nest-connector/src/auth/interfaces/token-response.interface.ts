import { Tokens } from "./tokens.interface";

/**
 * Interface representing the authentication tokens with their expiration times.
 *
 * The `TokenResponse` interface extends the base `Tokens` interface by adding
 * expiration timestamps for both access and refresh tokens. This information
 * allows client applications to preemptively refresh tokens before they expire,
 * improving user experience by avoiding authentication failures.
 *
 * This interface is typically used in authentication responses and token refresh
 * operations to provide clients with complete token lifecycle information.
 *
 * @interface TokenResponse
 * @extends Tokens Base interface containing the actual token strings
 *
 * @see {@link Tokens} Base interface with token string properties
 * @see {@link AuthResponse} Complete authentication response that includes this data
 * @see {@link AccessToken} Branded type for access tokens
 * @see {@link RefreshToken} Branded type for refresh tokens
 */
export interface TokenResponse extends Tokens {
    /**
     * The date and time when the access token expires.
     *
     * Clients can use this information to schedule token refreshes before
     * the access token expires, preventing authentication failures during
     * active user sessions.
     *
     * The expiration time is determined by the JWT token's 'exp' claim and
     * configured through the authentication service options.
     */
    accessTokenExpiresOn: Date;

    /**
     * The date and time when the refresh token expires.
     *
     * Refresh tokens typically have a longer lifespan than access tokens.
     * When a refresh token expires, the user will need to re-authenticate
     * with their credentials.
     *
     * The expiration time is configured through the authentication service options
     * and represents the maximum duration of a user's session without re-authentication.
     */
    refreshTokenExpiresOn: Date;
}
