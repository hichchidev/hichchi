// noinspection JSUnusedGlobalSymbols

/**
 * Authentication Strategy Enum
 *
 * This enum represents the different authentication strategies supported by the application.
 * It is used with Passport.js to configure and identify various authentication methods.
 * Each strategy handles a different authentication flow (local credentials, JWT tokens, OAuth providers).
 */
export enum AuthStrategy {
    /**
     * Local authentication strategy
     *
     * Used for authenticating users with username/email and password.
     * This strategy verifies credentials against the application's database.
     */
    LOCAL = "local",

    /**
     * JWT authentication strategy
     *
     * Used for authenticating users with JSON Web Tokens.
     * This strategy verifies the token signature and expiration.
     */
    JWT = "jwt",

    /**
     * Google OAuth authentication strategy
     *
     * Used for authenticating users through Google's OAuth 2.0 service.
     * This strategy handles the OAuth flow and user profile retrieval.
     */
    GOOGLE = "google",

    /**
     * Facebook OAuth authentication strategy
     *
     * Used for authenticating users through Facebook's OAuth service.
     * This strategy handles the OAuth flow and user profile retrieval.
     */
    FACEBOOK = "facebook",
}
