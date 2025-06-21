// noinspection JSUnusedGlobalSymbols

/**
 * Registration Type Enum
 *
 * This enum represents the different methods by which a user can register in the application.
 * It is used to track how a user account was created and to apply different business rules
 * based on the registration method (e.g., email verification requirements).
 */
export enum RegType {
    /**
     * Local registration with email and password
     *
     * Users who register directly on the application with an email and password.
     * These users typically need to verify their email address.
     */
    LOCAL = "local",

    /**
     * Google OAuth registration
     *
     * Users who register by authenticating through their Google account.
     * These users typically have pre-verified email addresses.
     */
    GOOGLE = "google",

    /**
     * Facebook OAuth registration
     *
     * Users who register by authenticating through their Facebook account.
     * These users typically have pre-verified email addresses.
     */
    FACEBOOK = "facebook",
}
