/**
 * Cookie name for storing the access token
 *
 * This constant defines the name of the cookie used to store the JWT access token
 * in cookie-based authentication. The access token is used for authenticating
 * requests to protected resources.
 *
 * The default value is "Authorization", which is a common convention for
 * authentication tokens. This cookie is typically set as HttpOnly, secure,
 * and signed to enhance security.
 *
 * @example
 * ```typescript
 * // Setting the access token cookie
 * response.cookie(ACCESS_TOKEN_COOKIE_NAME, accessToken, {
 *   httpOnly: true,
 *   secure: true,
 *   signed: true,
 *   maxAge: 15 * 60 * 1000 // 15 minutes
 * });
 * ```
 *
 * @example
 * ```typescript
 * // Retrieving the access token from cookies
 * const accessToken = request.signedCookies[ACCESS_TOKEN_COOKIE_NAME];
 * ```
 *
 * @see {@link AuthService.setAuthCookies} Method that sets authentication cookies
 * @see {@link JwtAuthGuard} Guard that uses this cookie for authentication
 * @see {@link cookieExtractor} Function that extracts this cookie from requests
 * @see {@link AuthMethod.COOKIE} Authentication method that uses cookies
 * @see {@link REFRESH_TOKEN_COOKIE_NAME} Related cookie for refresh tokens
 */
export const ACCESS_TOKEN_COOKIE_NAME = "Authorization";

/**
 * Cookie name for storing the refresh token
 *
 * This constant defines the name of the cookie used to store the JWT refresh token
 * in cookie-based authentication. The refresh token is used to obtain a new access
 * token when the current one expires.
 *
 * The default value is "Refresh". This cookie is typically set as HttpOnly, secure,
 * and signed to enhance security, with a longer expiration time than the access token.
 *
 * @example
 * ```typescript
 * // Setting the refresh token cookie
 * response.cookie(REFRESH_TOKEN_COOKIE_NAME, refreshToken, {
 *   httpOnly: true,
 *   secure: true,
 *   signed: true,
 *   maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
 * });
 * ```
 *
 * @example
 * ```typescript
 * // Retrieving the refresh token from cookies
 * const refreshToken = request.signedCookies[REFRESH_TOKEN_COOKIE_NAME];
 * ```
 *
 * @see {@link AuthService.setAuthCookies} Method that sets authentication cookies
 * @see {@link JwtAuthGuard} Guard that uses this cookie for token refresh
 * @see {@link AuthService.refreshTokens} Method that uses refresh tokens to generate new access tokens
 * @see {@link AuthMethod.COOKIE} Authentication method that uses cookies
 * @see {@link ACCESS_TOKEN_COOKIE_NAME} Related cookie for access tokens
 */
export const REFRESH_TOKEN_COOKIE_NAME = "Refresh";

/**
 * Field key for email identification in authentication
 *
 * This constant defines the field name used for email-based authentication.
 * It's used in authentication strategies to identify which field in the request
 * contains the email address.
 *
 * The default value is "email", which is the standard field name for email addresses
 * in authentication requests.
 *
 * @example
 * ```typescript
 * // Configuring a local strategy for email-based authentication
 * new LocalStrategy({
 *   usernameField: EMAIL_KEY,
 *   passwordField: 'password'
 * })
 * ```
 *
 * @example
 * ```typescript
 * // Using the email key in an authentication service
 * const email = request.body[EMAIL_KEY];
 * const user = await this.userService.findByEmail(email);
 * ```
 *
 * @see {@link LocalStrategy} Strategy that uses this key for authentication configuration
 * @see {@link AuthField} Enum that defines authentication field types
 * @see {@link AuthField.EMAIL} Email-based authentication field type
 * @see {@link SignInDto} DTO that uses this field for sign-in
 * @see {@link USERNAME_KEY} Alternative authentication field
 */
export const EMAIL_KEY = "email";

/**
 * Field key for username identification in authentication
 *
 * This constant defines the field name used for username-based authentication.
 * It's used in authentication strategies to identify which field in the request
 * contains the username.
 *
 * The default value is "username", which is the standard field name for usernames
 * in authentication requests.
 *
 * @example
 * ```typescript
 * // Configuring a local strategy for username-based authentication
 * new LocalStrategy({
 *   usernameField: USERNAME_KEY,
 *   passwordField: 'password'
 * })
 * ```
 *
 * @example
 * ```typescript
 * // Using the username key in an authentication service
 * const username = request.body[USERNAME_KEY];
 * const user = await this.userService.findByUsername(username);
 * ```
 *
 * @see {@link LocalStrategy} Strategy that uses this key for authentication configuration
 * @see {@link AuthField} Enum that defines authentication field types
 * @see {@link AuthField.USERNAME} Username-based authentication field type
 * @see {@link SignInDto} DTO that uses this field for sign-in
 * @see {@link EMAIL_KEY} Alternative authentication field
 */
export const USERNAME_KEY = "username";
