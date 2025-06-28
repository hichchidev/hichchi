import { AccessToken } from "../../types";

/**
 * Interface defining the body structure for the Get Auth Response endpoint.
 *
 * This interface specifies the required properties for retrieving a complete
 * authentication response using a previously issued access token. This endpoint
 * is typically used after OAuth authentication flows (like Google sign-in) to
 * exchange an access token for full user information and session data.
 *
 * The endpoint validates the provided access token and returns comprehensive
 * authentication information including user details, new tokens, and session data.
 * This is particularly useful for client applications that need to obtain complete
 * user context after receiving an access token from external authentication providers.
 *
 * @example
 * ```typescript
 * // Get auth response using access token
 * const authRequest: GetAuthResponseBody = {
 *   accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
 * };
 * ```
 *
 * @example
 * ```typescript
 * // Using after Google OAuth authentication
 * async getCompleteAuthResponse(token: AccessToken): Promise<AuthResponse> {
 *   const body: GetAuthResponseBody = { accessToken: token };
 *   return this.authService.getAuthResponse(body);
 * }
 * ```
 *
 * @example
 * ```typescript
 * // In a service handling OAuth callback
 * async handleOAuthCallback(accessToken: AccessToken) {
 *   const request: GetAuthResponseBody = { accessToken };
 *   const authResponse = await this.authController.getAuthResponse(request);
 *
 *   // Now you have complete user info and session tokens
 *   console.log('User:', authResponse.user);
 *   console.log('New tokens:', authResponse.accessToken, authResponse.refreshToken);
 * }
 * ```
 *
 * @see {@link AuthResponse} Interface for the complete authentication response
 * @see {@link AccessToken} Type representing access token strings
 * @see {@link AuthEndpoint.GET_AUTH_RESPONSE} Endpoint constant for this operation
 */
export interface GetAuthResponseBody {
    /**
     * A valid JWT access token previously issued by this system.
     *
     * This token will be verified, and if valid, will be used to retrieve
     * the associated user information and generate a complete authentication response.
     * The token is typically obtained from OAuth flows or other authentication processes
     * where only an access token is initially provided.
     *
     * The access token must be:
     * - Valid and not expired
     * - Issued by this authentication system
     * - Associated with an existing user account
     */
    accessToken: AccessToken;
}
