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
 * - `AUTH_200_PASSWORD_RESET_EMAIL_SENT`: Password reset email sent successfully.
 * - `AUTH_200_PASSWORD_RESET_TOKEN_VALID`: Password reset token validated successfully.
 * - `AUTH_200_PASSWORD_RESET_SUCCESS`: Password reset completed successfully.
 * - `AUTH_200_SIGNED_OUT`: User successfully signed out of the system.
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

    /**
     * Password reset email sent successfully
     *
     * Indicates that an email containing password reset instructions has been
     * successfully sent to the user's email address.
     */
    AUTH_200_PASSWORD_RESET_EMAIL_SENT = "AUTH_200_PASSWORD_RESET_EMAIL_SENT",

    /**
     * Password reset token validated successfully
     *
     * Indicates that a password reset token provided by the user has been
     * verified and is valid for proceeding with the password reset process.
     */
    AUTH_200_PASSWORD_RESET_TOKEN_VALID = "AUTH_200_PASSWORD_RESET_TOKEN_VALID",

    /**
     * Password reset completed successfully
     *
     * Indicates that a user's password has been successfully reset and updated
     * in the system. The user can now login with their new password.
     */
    AUTH_200_PASSWORD_RESET_SUCCESS = "AUTH_200_PASSWORD_RESET_SUCCESS",

    /**
     * User signed out successfully
     *
     * Indicates that a user has been successfully signed out of the system,
     * their session has been terminated, and authentication tokens have been
     * invalidated. Any authentication cookies would also be cleared.
     */
    AUTH_200_SIGNED_OUT = "AUTH_200_SIGNED_OUT",
}
