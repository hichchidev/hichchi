import { RefreshToken } from "../../types";

/**
 * Interface defining the body structure for token refresh requests.
 *
 * This interface specifies the required properties for refreshing an expired
 * access token using a valid refresh token. The refresh token mechanism allows
 * users to maintain their session without re-authenticating when their access
 * token expires.
 *
 * This is a critical part of the JWT authentication flow that provides a balance
 * between security (short-lived access tokens) and user experience (no frequent
 * re-authentication required).
 *
 * @example
 * ```typescript
 * // Refresh token request
 * const refreshRequest: RefreshTokenBody = {
 *   refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
 * };
 * ```
 *
 * @example
 * ```typescript
 * // Using in a service
 * async refreshUserTokens(refreshToken: RefreshToken): Promise<TokenResponse> {
 *   const body: RefreshTokenBody = { refreshToken };
 *   return this.authService.refreshToken(body);
 * }
 * ```
 *
 * @see {@link refreshToken} Endpoint that uses this interface
 * @see {@link TokenResponse} Interface for the response containing new tokens
 * @see {@link RefreshToken} Type representing refresh token strings
 */
export interface RefreshTokenBody {
    /**
     * A valid JWT refresh token previously issued by this system.
     *
     * This token will be verified, and if valid and not expired, will be used
     * to generate a new access token and refresh token pair. The refresh token
     * should have a longer expiration time than access tokens.
     */
    refreshToken: RefreshToken;
}
