import { AccessToken, RefreshToken } from "../types";

/**
 * Interface representing the core authentication tokens.
 *
 * The `Tokens` interface defines the fundamental structure for authentication tokens
 * in the system, containing both the access token and refresh token. This interface
 * provides the bare minimum token information needed for authentication flows.
 *
 * This interface is the foundation for more comprehensive token-related interfaces
 * like `TokenResponse`, which extends it with additional metadata such as expiration times.
 *
 * In a typical JWT-based authentication system:
 * - The access token is short-lived and used for authenticating API requests
 * - The refresh token is longer-lived and used to obtain new access tokens without re-authentication
 *
 * @interface Tokens
 *
 * @see {@link AccessToken} Branded type for access tokens
 * @see {@link RefreshToken} Branded type for refresh tokens
 * @see {@link TokenResponse} Extended interface with token expiration information
 * @see {@link AuthResponse} Complete authentication response that includes tokens
 */
export interface Tokens {
    /**
     * The access token used for authenticating API requests.
     *
     * Access tokens are typically short-lived (minutes to hours) JWT tokens that
     * contain encoded user information and permissions. They should be included
     * in API requests to protected endpoints, usually in an Authorization header.
     *
     * The token is a string branded as `AccessToken` for type safety.
     *
     * @see {@link AccessToken} Branded type for access tokens
     */
    accessToken: AccessToken;

    /**
     * The refresh token used to obtain new access tokens.
     *
     * Refresh tokens are typically longer-lived (days to weeks) tokens that enable
     * clients to obtain new access tokens when the current one expires, without
     * requiring the user to re-authenticate. These tokens should be handled with
     * extra security precautions as they represent longer-term authentication power.
     *
     * The token is a string branded as `RefreshToken` for type safety.
     *
     * @see {@link RefreshToken} Branded type for refresh tokens
     */
    refreshToken: RefreshToken;
}
