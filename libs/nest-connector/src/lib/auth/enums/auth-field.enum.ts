/**
 * Enum representing authentication fields used for user identification.
 *
 * This enum is used to specify the type of identifier required
 * for authentication processes. Each value represents a different
 * approach to identifying users during authentication.
 *
 * Enum Values:
 * - `USERNAME`: Authentication using the user's unique username.
 * - `EMAIL`: Authentication using the user's email address.
 * - `BOTH`: Authentication using either username or email address.
 */
export enum AuthField {
    /**
     * Username-based authentication
     *
     * Users authenticate using their unique username.
     * This is useful for applications where email addresses are not required
     * or where users prefer to sign in with a chosen identifier.
     */
    USERNAME = "username",

    /**
     * Email-based authentication
     *
     * Users authenticate using their email address.
     * This is the most common approach as email addresses are unique
     * and provide a way to contact users for account verification and recovery.
     */
    EMAIL = "email",

    /**
     * Combined username/email authentication
     *
     * Users can authenticate using either their username or email address.
     * This provides flexibility for users to sign in with whichever identifier they remember.
     * Implementation requires checking both fields when authenticating.
     */
    BOTH = "both",
}
