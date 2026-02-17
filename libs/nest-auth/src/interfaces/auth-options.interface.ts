import { SignUpDto, ViewUserDto } from "../dtos";
import { HttpException, Type } from "@nestjs/common";
import { RedisOptions } from "@hichchi/nest-core";
import { ValidationError } from "@nestjs/common/interfaces/external/validation-error.interface";
import { AuthField, AuthMethod } from "@hichchi/nest-connector/auth";

/**
 * JWT authentication configuration options
 *
 * This interface defines the configuration for JWT-based authentication,
 * including secrets and expiration times for both access and refresh tokens.
 * JWT (JSON Web Token) is a compact, URL-safe means of representing claims
 * to be transferred between two parties.
 *
 * @example
 * ```typescript
 * // Example JWT configuration
 * const jwtOptions: JwtOptions = {
 *   secret: 'your-secret-key-for-access-tokens',
 *   expiresIn: 3600, // 1 hour in seconds
 *   refreshSecret: 'your-secret-key-for-refresh-tokens',
 *   refreshExpiresIn: 604800 // 7 days in seconds
 * };
 * ```
 */
export interface JwtOptions {
    /** Secret key used to sign JWT access tokens */
    secret: string;
    /** Expiration time for access tokens in seconds */
    expiresIn: number;
    /** Secret key used to sign JWT refresh tokens */
    refreshSecret: string;
    /** Expiration time for refresh tokens in seconds */
    refreshExpiresIn: number;
}

/**
 * Google OAuth authentication configuration options
 *
 * This interface defines the configuration required for Google OAuth authentication,
 * including client credentials and callback URL. Google OAuth allows users to sign in
 * to your application using their Google accounts, providing a secure and convenient
 * authentication method without requiring users to create new credentials.
 *
 * To use Google OAuth, you need to create a project in the Google Developer Console
 * and configure OAuth credentials.
 *
 * @example
 * ```typescript
 * // Example Google OAuth configuration
 * const googleAuthOptions: GoogleAuthOptions = {
 *   clientId: 'your-google-client-id.apps.googleusercontent.com',
 *   clientSecret: 'your-google-client-secret',
 *   callbackUrl: 'https://your-app.com/api/auth/google/callback'
 * };
 * ```
 *
 * @see {@link https://console.developers.google.com/} Google Developer Console
 */
export interface GoogleAuthOptions {
    /** Google OAuth client ID from Google Developer Console */
    clientId: string;
    /** Google OAuth client secret from Google Developer Console */
    clientSecret: string;
    /** URL where Google will redirect after authentication */
    callbackUrl: string;
}

/**
 * Cookie configuration options
 *
 * This interface defines the configuration for cookies used in authentication,
 * including security settings. Cookies are used to store authentication tokens
 * in the user's browser, providing a seamless authentication experience across
 * page refreshes and browser sessions.
 *
 * Properly configured cookie settings are essential for security. In production
 * environments, it's recommended to set `secure: true` and use appropriate
 * `sameSite` settings to protect against CSRF and other attacks.
 *
 * @example
 * ```typescript
 * // Example cookie configuration for development
 * const devCookieOptions: CookiesOptions = {
 *   secret: 'your-cookie-signing-secret',
 *   sameSite: 'lax',
 *   secure: false // Set to true in production
 * };
 *
 * // Example cookie configuration for production
 * const prodCookieOptions: CookiesOptions = {
 *   secret: process.env.COOKIE_SECRET,
 *   sameSite: 'strict',
 *   secure: true
 * };
 * ```
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies} MDN Web Docs: HTTP cookies
 */
export interface CookiesOptions {
    /** Secret key used for signing cookies */
    secret?: string;
    /** Controls how cookies are sent with cross-site requests */
    sameSite?: boolean | "lax" | "strict" | "none";
    /** Whether cookies should only be sent over HTTPS */
    secure?: boolean;
}

// TODO: v2.0 Revisit when working on socket
// export interface SocketOptions {
//     idKey: string;
// }

/**
 * Main authentication configuration options
 *
 * This interface defines the complete configuration for the authentication system,
 * including JWT settings, OAuth providers, cookie settings, and various authentication behaviors.
 * The `AuthOptions` interface is the primary configuration point for the @hichchi/nest-auth module.
 *
 * When setting up authentication for your NestJS application, you'll need to provide
 * an instance of this interface to the `AuthModule.register()` method.
 *
 * The only required property is `jwt`, which configures the JWT authentication strategy.
 * Other properties are optional and can be used to customize the authentication behavior
 * according to your application's needs.
 *
 * @example
 * ```typescript
 * // Basic authentication configuration
 * const authOptions: AuthOptions = {
 *   isProd: process.env.NODE_ENV === 'production',
 *   jwt: {
 *     secret: 'your-access-token-secret',
 *     expiresIn: 3600, // 1 hour
 *     refreshSecret: 'your-refresh-token-secret',
 *     refreshExpiresIn: 604800 // 7 days
 *   },
 *   authMethod: AuthMethod.JWT,
 *   authField: AuthField.EMAIL,
 *   checkEmailVerified: true
 * };
 *
 * // Register the AuthModule with the configuration
 * @Module({
 *   imports: [
 *     AuthModule.register(authOptions)
 *   ],
 *   // ...
 * })
 * export class AppModule {}
 * ```
 *
 * @example
 * ```typescript
 * // Advanced authentication configuration with Google OAuth and Redis caching
 * const authOptions: AuthOptions = {
 *   isProd: process.env.NODE_ENV === 'production',
 *   redis: {
 *     host: 'localhost',
 *     port: 6379,
 *     ttl: 86400 // 1 day
 *   },
 *   sessionSecret: 'your-session-encryption-secret',
 *   jwt: {
 *     secret: process.env.JWT_SECRET,
 *     expiresIn: 3600, // 1 hour
 *     refreshSecret: process.env.JWT_REFRESH_SECRET,
 *     refreshExpiresIn: 604800 // 7 days
 *   },
 *   googleAuth: {
 *     clientId: process.env.GOOGLE_CLIENT_ID,
 *     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
 *     callbackUrl: 'https://your-app.com/api/auth/google/callback'
 *   },
 *   cookies: {
 *     secret: process.env.COOKIE_SECRET,
 *     sameSite: 'strict',
 *     secure: true
 *   },
 *   checkEmailVerified: true,
 *   emailVerifyRedirect: 'https://your-app.com/email-verified',
 *   passwordResetExp: 3600, // 1 hour
 *   authMethod: AuthMethod.JWT,
 *   authField: AuthField.EMAIL,
 *   disableSignUp: false
 * };
 * ```
 *
 * @see {@link HichchiAuthModule} The module that uses this configuration
 */
export interface AuthOptions {
    /**
     * Whether the application is running in production mode
     *
     * When set to true, certain security features are enforced and development-only
     * features are disabled. It's recommended to set this based on your environment
     * variables, e.g., `process.env.NODE_ENV === 'production'`.
     *
     * @default false
     */
    isProd?: boolean;

    /**
     * Redis configuration for caching user sessions
     *
     * When provided, user sessions will be stored in Redis, which improves
     * performance and enables horizontal scaling of your application. This is
     * highly recommended for production environments.
     *
     * @see {@link RedisOptions} from @hichchi/nest-core
     */
    redis?: RedisOptions;

    /**
     * Secret key used for encrypting user sessions in cache
     *
     * This key is used to encrypt sensitive user data before storing it in the cache.
     * It should be a strong, unique secret and should be kept secure.
     *
     * Required when using Redis caching with sensitive user data.
     *
     * @see {@link CacheUser} User interface with encrypted session capabilities
     */
    sessionSecret?: string;

    /**
     * JWT configuration options
     *
     * This is the only required property in AuthOptions. It configures the JWT
     * authentication strategy, including secrets and expiration times for both
     * access and refresh tokens.
     *
     * @see {@link JwtOptions}
     */
    jwt: JwtOptions;

    /**
     * Google OAuth configuration options
     *
     * When provided, enables Google OAuth authentication in your application.
     * Users will be able to sign in using their Google accounts.
     *
     * @see {@link GoogleAuthOptions}
     */
    googleAuth?: GoogleAuthOptions;

    /**
     * Cookie configuration options
     *
     * When provided, configures how authentication cookies are stored and transmitted.
     * This is used when authMethod is set to AuthMethod.COOKIE.
     *
     * @see {@link CookiesOptions}
     */
    cookies?: CookiesOptions;

    // TODO: v2.0 Revisit when working on socket
    // socket?: SocketOptions;

    /**
     * Whether to verify user email before allowing authentication
     *
     * When set to true, users must verify their email address before they can
     * sign in. This adds an extra layer of security and verification.
     *
     * @default false
     */
    checkEmailVerified?: boolean;

    /**
     * URL to redirect to after email verification
     *
     * When a user verifies their email address, they will be redirected to this URL.
     * This should be a frontend URL that can handle the verification success state.
     *
     * Required when checkEmailVerified is true.
     */
    emailVerifyRedirect?: string;

    /**
     * Password reset token expiration time in seconds
     *
     * Determines how long a password reset token is valid. After this time,
     * the user will need to request a new password reset token.
     *
     * @default 3600 (1 hour)
     */
    passwordResetExp?: number;

    /**
     * Authentication method (JWT, Cookie, etc.)
     *
     * Determines how authentication tokens are stored and transmitted.
     * - JWT: Tokens are sent in the Authorization header
     * - COOKIE: Tokens are stored in HTTP-only cookies
     *
     * @default AuthMethod.JWT
     * @see {@link AuthMethod}
     */
    authMethod?: AuthMethod;

    /**
     * Field used for authentication (email, username, etc.)
     *
     * Determines which field is used as the identifier during authentication.
     * This can be a value from the AuthField enum or a custom string.
     *
     * @default AuthField.EMAIL
     * @see {@link AuthField}
     */
    authField?: AuthField | string;

    /**
     * Custom DTO class for sign-up requests
     *
     * When provided, this DTO class will be used to validate sign-up requests
     * instead of the default SignUpDto. This allows you to customize the
     * sign-up process with additional fields or validation rules.
     *
     * @see {@link SignUpDto}
     */
    signUpDto?: typeof SignUpDto;

    /**
     * Custom DTO class for user views
     *
     * When provided, this DTO class will be used to transform user entities
     * before returning them in responses. This allows you to customize the
     * user data that is exposed to clients.
     *
     * @see {@link ViewUserDto}
     */
    viewDto?: Type<ViewUserDto>;

    /**
     * Custom validation exception factory
     *
     * When provided, this function will be used to create exceptions for validation
     * errors. This allows you to customize the format of validation error responses.
     *
     * Set to true to use the default NestJS validation exception factory.
     *
     * @default false
     */
    validationExceptionFactory?: boolean | ((errors: ValidationError[]) => HttpException);

    /**
     * Whether to disable sign-up functionality
     *
     * When set to true, the sign-up endpoints will be disabled, and users will
     * not be able to create new accounts. This is useful for applications where
     * user accounts are created through an admin interface or another system.
     *
     * @default false
     */
    disableSignUp?: boolean;

    /**
     * List of allowed domains for redirect URLs.
     *
     * These domains are used to validate redirect URLs provided by the frontend
     * to prevent open redirect vulnerabilities. URLs with domains not in this list
     * will be rejected, and the fallback URL will be used instead.
     *
     * Example: ['myapp.com', 'staging-myapp.com']
     * This would allow redirects to any subdomain of myapp.com or staging-myapp.com
     */
    allowedRedirectDomains?: string[];
}
