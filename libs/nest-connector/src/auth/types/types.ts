// noinspection JSUnusedGlobalSymbols

/**
 * Represents a JSON Web Token (JWT) with a branded string type for type safety.
 *
 * This type is a string that is branded with a unique symbol to differentiate it
 * from plain strings, ensuring that it is explicitly treated as a JWT token within
 * the type system. This branding enforces stricter type checking to prevent
 * accidentally passing or assigning plain strings where a JWT token is required.
 *
 * JWTs typically contain encoded user information and are used for authentication
 * and authorization throughout the application.
 *
 * @remarks
 * To convert a regular string to this branded type, you must use type assertion:
 * ```typescript
 * function validateAndCreateJWT(token: string): JWT {
 *   // Validation logic here
 *   return token as JWT;
 * }
 * ```
 *
 * @example
 * ```typescript
 * // Function that only accepts JWT tokens
 * function decodeUserFromToken(token: JWT): UserInfo {
 *   // Decode and extract user info from the token
 * }
 *
 * // This won't compile - type safety prevents passing a string
 * // decodeUserFromToken("some-random-string"); // Error
 *
 * // Must use a properly created JWT
 * const validToken = validateAndCreateJWT(rawTokenString);
 * const user = decodeUserFromToken(validToken); // Works correctly
 * ```
 */
export type JWT = string & { readonly __brand: unique symbol };

/**
 * Represents an OAuth2/OpenID Connect access token with type safety.
 *
 * The `AccessToken` type is a branded string that ensures only valid access tokens
 * can be used where this type is expected. Access tokens are typically short-lived
 * credentials used to access protected resources like APIs.
 *
 * This branded type prevents accidental use of arbitrary strings in places where
 * a validated access token is required, improving type safety throughout the
 * authentication flow.
 *
 * Common sources of access tokens include:
 * - OAuth2 authorization code flow
 * - Social sign-in providers (Google, Facebook, etc.)
 * - Custom authentication services
 *
 * @remarks
 * Access tokens are typically shorter-lived than refresh tokens and should be
 * used for API calls and resource access.
 *
 * @example
 * ```typescript
 * // In an authentication service
 * async function authenticateWithGoogle(code: string): Promise<AccessToken> {
 *   const response = await oauth2Client.getToken(code);
 *   return response.tokens.access_token as AccessToken;
 * }
 *
 * // Using the access token to make authenticated requests
 * async function fetchUserProfile(token: AccessToken): Promise<UserProfile> {
 *   return axios.get('https://api.example.com/user/profile', {
 *     headers: { Authorization: `Bearer ${token}` }
 *   });
 * }
 * ```
 */
export type AccessToken = string & { readonly __brand: unique symbol };

/**
 * Represents a refresh token with type safety through branding.
 *
 * The `RefreshToken` type is a branded string specifically for refresh tokens,
 * which are long-lived credentials used to obtain new access tokens without
 * requiring the user to re-authenticate.
 *
 * This type ensures that only properly validated refresh tokens can be used
 * where this type is expected, preventing misuse of arbitrary strings in
 * security-sensitive contexts.
 *
 * Key characteristics of refresh tokens:
 * - Typically longer-lived than access tokens
 * - Used exclusively to obtain new access tokens
 * - Should be stored securely (HTTP-only cookies, secure storage)
 * - Can be revoked to terminate user sessions
 *
 * @remarks
 * Refresh tokens require careful handling as they represent long-term
 * authentication capabilities. They should never be exposed to client-side
 * JavaScript or insecure storage.
 *
 * @example
 * ```typescript
 * // In a token service
 * class TokenService {
 *   async refreshAccessToken(token: RefreshToken): Promise<{
 *     accessToken: AccessToken,
 *     refreshToken: RefreshToken
 *   }> {
 *     // Exchange refresh token for new tokens
 *     const response = await this.authClient.refreshToken(token);
 *
 *     return {
 *       accessToken: response.access_token as AccessToken,
 *       refreshToken: response.refresh_token as RefreshToken
 *     };
 *   }
 * }
 * ```
 */
export type RefreshToken = string & { readonly __brand: unique symbol };

/**
 * Represents a cryptographically verified token string with type safety.
 *
 * The `VerifyToken` type is a branded string that can only be created through
 * specific verification logic that confirms the validity of a token. This might
 * include signature verification, expiration checking, or other security validations.
 *
 * The branding (`__brand`) ensures that this type is not interchangeable with ordinary
 * strings, providing additional type safety and preventing misuse in the application.
 *
 * Common use cases include:
 * - Email verification tokens
 * - Password reset tokens
 * - Account activation tokens
 * - Single-use authentication codes
 *
 * @remarks
 * This type should only be created after performing appropriate cryptographic
 * verification, typically using libraries like `jsonwebtoken` or similar.
 *
 * @example
 * ```typescript
 * // In a token verification service
 * class TokenVerifier {
 *   verifyEmailToken(token: string): VerifyToken | null {
 *     try {
 *       // Verify the token cryptographically
 *       const payload = jwt.verify(token, this.secretKey);
 *
 *       // Additional validation logic
 *       if (this.isValidEmailToken(payload)) {
 *         return token as VerifyToken;
 *       }
 *       return null;
 *     } catch {
 *       return null;
 *     }
 *   }
 *
 *   // Use the verified token in a secure operation
 *   confirmEmailAddress(token: VerifyToken, userId: string): Promise<boolean> {
 *     // We can trust this token has been verified
 *     return this.userService.confirmEmail(userId);
 *   }
 * }
 * ```
 */
export type VerifyToken = string & { readonly __brand: unique symbol };
