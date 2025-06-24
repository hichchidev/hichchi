/**
 * Authentication Success Response Codes Enum
 *
 * This enum defines success response codes specific to authentication operations.
 * Each code represents a specific successful outcome from an authentication-related action.
 * The naming convention includes HTTP status codes (e.g., 200, 201) for clarity.
 *
 * Enum Values:
 * - `AUTH_201_ACCOUNT_CREATED_REQUIRE_VERIFY`: Account created but requires email verification.
 * - `AUTH_201_ACCOUNT_CREATED`: Account successfully created without verification requirement.
 * - `AUTH_201_EMAIL_VERIFIED`: Email address successfully verified.
 * - `AUTH_200_EMAIL_VERIFICATION_SENT`: Email verification message sent successfully.
 */
export enum AuthSuccessResponseCode {
    /**
     * Account created but requires email verification
     *
     * Indicates a new user account was successfully created, but the user
     * must verify their email address before they can fully access the system.
     */
    AUTH_201_ACCOUNT_CREATED_REQUIRE_VERIFY = "AUTH_201_ACCOUNT_CREATED_REQUIRE_VERIFY",

    /**
     * Account successfully created without verification requirement
     *
     * Indicates a new user account was successfully created and is immediately
     * active without requiring additional verification steps.
     */
    AUTH_201_ACCOUNT_CREATED = "AUTH_201_ACCOUNT_CREATED",

    /**
     * Email address successfully verified
     *
     * Indicates that a user's email address has been successfully verified,
     * enabling full access to account features that require verification.
     */
    AUTH_201_EMAIL_VERIFIED = "AUTH_201_EMAIL_VERIFIED",

    /**
     * Email verification message sent successfully
     *
     * Indicates that an email containing verification instructions has been
     * successfully sent to the user's email address.
     */
    AUTH_200_EMAIL_VERIFICATION_SENT = "AUTH_200_EMAIL_VERIFICATION_SENT",
}
