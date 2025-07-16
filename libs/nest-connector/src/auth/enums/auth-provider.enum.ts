// noinspection JSUnusedGlobalSymbols

/**
 * Sign Up Type Enum
 *
 * This enum represents the different methods by which a user can sign up in the application.
 * It is used to track how a user account was created and to apply different business rules
 * based on the sign up method (e.g., email verification requirements).
 */
export enum AuthProvider {
    /**
     * Local Sign Up with email and password
     *
     * Users who sign up directly on the application with an email and password.
     * These users typically need to verify their email address.
     */
    LOCAL = "local",

    /**
     * Google OAuth Sign Up
     *
     * Users who sign up by authenticating through their Google account.
     * These users typically have pre-verified email addresses.
     */
    GOOGLE = "google",

    /**
     * Facebook OAuth Sign Up
     *
     * Users who sign up by authenticating through their Facebook account.
     * These users typically have pre-verified email addresses.
     */
    FACEBOOK = "facebook",
}
