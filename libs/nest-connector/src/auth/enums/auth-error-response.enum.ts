/**
 * Authentication Error Response Codes Enum
 *
 * This enum defines all error response codes related to authentication operations.
 * Each code represents a specific error condition that can occur during authentication
 * processes. The naming convention includes HTTP status codes (e.g., 400, 401, 403)
 * followed by a descriptive identifier.
 *
 * The codes are organized by HTTP status categories:
 * - `400` series: Client errors (Bad Request, Unauthorized, Forbidden, Not Found, Conflict)
 * - `500` series: Server errors (Internal Server Error, Not Implemented)
 *
 * Each prefix (`AUTH_` or `USER_`) indicates the domain of the error:
 * - `AUTH_`: Authentication service errors
 * - `USER_`: User management errors
 *
 * Enum Values:
 * - `AUTH_400_EMAIL_ALREADY_VERIFIED`: Email already verified error.
 * - `AUTH_400_REDIRECT_URL_REQUIRED`: Redirect URL required error.
 * - `AUTH_401_CORS`: CORS error.
 * - `AUTH_401_INVALID_USERNAME_PASSWORD`: Invalid username/password combination.
 * - `AUTH_401_INVALID_EMAIL_PASSWORD`: Invalid email/password combination.
 * - `AUTH_401_INVALID_PASSWORD`: Invalid password.
 * - `AUTH_401_NOT_LOGGED_IN`: User not logged in.
 * - `AUTH_401_NOT_LOCAL`: Non-local authentication attempt.
 * - `AUTH_401_SOCIAL_SIGN_IN`: Social sign-in error.
 * - `AUTH_401_EMAIL_NOT_VERIFIED`: Email not verified.
 * - `AUTH_401_NOT_ACTIVE`: Account not active.
 * - `AUTH_401_TOKEN_NOT_SET`: Authentication token not set.
 * - `AUTH_401_REFRESH_TOKEN_NOT_SET`: Refresh token not set.
 * - `AUTH_401_INVALID_TOKEN`: Invalid authentication token.
 * - `AUTH_401_EXPIRED_TOKEN`: Expired authentication token.
 * - `AUTH_401_INVALID_VERIFICATION_TOKEN`: Invalid email verification token.
 * - `AUTH_401_INVALID_PASSWORD_RESET_TOKEN`: Invalid password reset token.
 * - `AUTH_401_INVALID_REFRESH_TOKEN`: Invalid refresh token.
 * - `AUTH_401_EXPIRED_REFRESH_TOKEN`: Expired refresh token.
 * - `AUTH_401_EXPIRED_OR_INVALID_PASSWORD_RESET_TOKEN`: Expired or invalid password reset token.
 * - `AUTH_401_UNKNOWN`: Unknown authentication error.
 * - `AUTH_403_PENDING`: Pending account approval.
 * - `AUTH_403_ACCOUNT_DISABLED`: Account disabled.
 * - `AUTH_403_ROLE_FORBIDDEN`: Insufficient role.
 * - `AUTH_403_PERMISSION_FORBIDDEN`: Insufficient role permissions.
 * - `AUTH_404_EMAIL`: Email not found.
 * - `AUTH_500_SIGN_UP`: Sign up error.
 * - `AUTH_500_SOCIAL_SIGN_UP`: Social sign up error.
 * - `AUTH_500_SIGN_IN`: Sign in error.
 * - `AUTH_500_SOCIAL_SIGN_IN`: Social sign in error.
 * - `AUTH_500_SOCIAL_SIGN_IN_CALLBACK`: Social sign in callback error.
 * - `AUTH_500_SIGN_OUT`: Sign out error.
 * - `AUTH_500_SEND_EMAIL_VERIFICATION`: Email verification sending error.
 * - `AUTH_500_VERIFY_EMAIL`: Email verification error.
 * - `AUTH_500_REQUEST_PASSWORD_RESET`: Password reset request error.
 * - `AUTH_500_PASSWORD_RESET`: Password reset error.
 * - `AUTH_500`: Generic authentication error.
 * - `AUTH_501_NOT_IMPLEMENTED`: Feature not implemented.
 * - `USER_400_EMPTY_EMAIL`: Empty email field.
 * - `USER_400_EMPTY_FNAME`: Empty first name field.
 * - `USER_400_EMPTY_LNAME`: Empty last name field.
 * - `USER_400_EMPTY_UNAME`: Empty username field.
 * - `USER_400_EMPTY_PASSWORD`: Empty password field.
 * - `USER_400_INVALID_EMAIL`: Invalid email format.
 * - `USER_400_NOT_EMPTY_UNAME`: Username should not be empty.
 * - `USER_400_NOT_EMPTY_PASSWORD`: Password should not be empty.
 * - `USER_400_NOT_EMPTY_SALT`: Salt should not be empty.
 * - `USER_403_SIGN_UP`: Sign up forbidden.
 * - `USER_404_ID`: User not found.
 * - `USER_409_EXIST_UNAME`: Username already exists.
 * - `USER_500_CREATE`: User creation error.
 */
export enum AuthErrorResponseCode {
    /**
     * Email already verified error (400 Bad Request)
     *
     * Occurs when attempting to verify an email that has already been verified.
     */
    AUTH_400_EMAIL_ALREADY_VERIFIED = "AUTH_400_EMAIL_ALREADY_VERIFIED",

    /**
     * Redirect URL required error (400 Bad Request)
     *
     * Occurs when a redirect URL is required for an operation but not provided.
     */
    AUTH_400_REDIRECT_URL_REQUIRED = "AUTH_400_REDIRECT_URL_REQUIRED",

    /**
     * CORS error (401 Unauthorized)
     *
     * Occurs when a cross-origin request is not allowed due to security restrictions.
     */
    AUTH_401_CORS = "AUTH_401_CORS",

    /**
     * Invalid username/password combination (401 Unauthorized)
     *
     * Occurs when authentication fails due to incorrect username and password combination.
     */
    AUTH_401_INVALID_USERNAME_PASSWORD = "AUTH_401_INVALID_USERNAME_PASSWORD",

    /**
     * Invalid email/password combination (401 Unauthorized)
     *
     * Occurs when authentication fails due to incorrect email and password combination.
     */
    AUTH_401_INVALID_EMAIL_PASSWORD = "AUTH_401_INVALID_EMAIL_PASSWORD",

    /**
     * Invalid password (401 Unauthorized)
     *
     * Occurs when authentication fails due to incorrect password.
     */
    AUTH_401_INVALID_PASSWORD = "AUTH_401_INVALID_PASSWORD",

    /**
     * User not logged in (401 Unauthorized)
     *
     * Occurs when accessing a protected resource without authentication.
     */
    AUTH_401_NOT_LOGGED_IN = "AUTH_401_NOT_LOGGED_IN",

    /**
     * Non-local authentication attempt (401 Unauthorized)
     *
     * Occurs when attempting to use local authentication methods for an account
     * that was created using social authentication.
     */
    AUTH_401_NOT_LOCAL = "AUTH_401_NOT_LOCAL",

    /**
     * Social sign-in error (401 Unauthorized)
     *
     * Occurs when there is an issue with social authentication process.
     */
    AUTH_401_SOCIAL_SIGN_IN = "AUTH_401_SOCIAL_SIGN_IN",

    /**
     * Email not verified (401 Unauthorized)
     *
     * Occurs when attempting to access resources that require email verification
     * before the user has verified their email address.
     */
    AUTH_401_EMAIL_NOT_VERIFIED = "AUTH_401_EMAIL_NOT_VERIFIED",

    /**
     * Account not active (401 Unauthorized)
     *
     * Occurs when attempting to authenticate with an inactive account.
     */
    AUTH_401_NOT_ACTIVE = "AUTH_401_NOT_ACTIVE",

    /**
     * Authentication token not set (401 Unauthorized)
     *
     * Occurs when no authentication token is provided for a protected resource.
     */
    AUTH_401_TOKEN_NOT_SET = "AUTH_401_TOKEN_NOT_SET",

    /**
     * Refresh token not set (401 Unauthorized)
     *
     * Occurs when attempting to refresh an access token without providing a refresh token.
     */
    AUTH_401_REFRESH_TOKEN_NOT_SET = "AUTH_401_REFRESH_TOKEN_NOT_SET",

    /**
     * Invalid authentication token (401 Unauthorized)
     *
     * Occurs when the provided authentication token is malformed or invalid.
     */
    AUTH_401_INVALID_TOKEN = "AUTH_401_INVALID_TOKEN",

    /**
     * Expired authentication token (401 Unauthorized)
     *
     * Occurs when the provided authentication token has expired.
     */
    AUTH_401_EXPIRED_TOKEN = "AUTH_401_EXPIRED_TOKEN",

    /**
     * Invalid email verification token (401 Unauthorized)
     *
     * Occurs when attempting to verify an email with an invalid token.
     */
    AUTH_401_INVALID_VERIFICATION_TOKEN = "AUTH_401_INVALID_VERIFICATION_TOKEN",

    /**
     * Invalid password reset token (401 Unauthorized)
     *
     * Occurs when attempting to reset a password with an invalid token.
     */
    AUTH_401_INVALID_PASSWORD_RESET_TOKEN = "AUTH_401_INVALID_PASSWORD_RESET_TOKEN",

    /**
     * Invalid refresh token (401 Unauthorized)
     *
     * Occurs when attempting to refresh an access token with an invalid refresh token.
     */
    AUTH_401_INVALID_REFRESH_TOKEN = "AUTH_401_INVALID_REFRESH_TOKEN",

    /**
     * Expired refresh token (401 Unauthorized)
     *
     * Occurs when attempting to refresh an access token with an expired refresh token.
     */
    AUTH_401_EXPIRED_REFRESH_TOKEN = "AUTH_401_EXPIRED_REFRESH_TOKEN",

    /**
     * Expired or invalid password reset token (401 Unauthorized)
     *
     * Occurs when attempting to reset a password with a token that is either invalid or expired.
     */
    AUTH_401_EXPIRED_OR_INVALID_PASSWORD_RESET_TOKEN = "AUTH_401_EXPIRED_OR_INVALID_PASSWORD_RESET_TOKEN",

    /**
     * Unknown authentication error (401 Unauthorized)
     *
     * Generic authentication error when the specific cause cannot be determined.
     */
    AUTH_401_UNKNOWN = "AUTH_401_UNKNOWN",

    /**
     * Pending account approval (403 Forbidden)
     *
     * Occurs when attempting to access resources with an account that is still pending approval.
     */
    AUTH_403_PENDING = "AUTH_403_PENDING",

    /**
     * Account disabled (403 Forbidden)
     *
     * Occurs when attempting to authenticate with a disabled account.
     */
    AUTH_403_ACCOUNT_DISABLED = "AUTH_403_ACCOUNT_DISABLED",

    /**
     * Insufficient role (403 Forbidden)
     *
     * Occurs when a user attempts to access a resource that requires higher privileges.
     */
    AUTH_403_ROLE_FORBIDDEN = "AUTH_403_ROLE_FORBIDDEN",

    /**
     * Insufficient role permissions (403 Forbidden)
     *
     * Occurs when a user attempts to access a resource that requires higher privileges.
     */
    AUTH_403_PERMISSION_FORBIDDEN = "AUTH_403_PERMISSION_FORBIDDEN",

    AUTH_403_SUB_DOMAIN_NOT_ALLOWED = "AUTH_403_SUB_DOMAIN_NOT_ALLOWED",

    /**
     * Email not found (404 Not Found)
     *
     * Occurs when attempting operations on an email address that doesn't exist in the system.
     */
    AUTH_404_EMAIL = "AUTH_404_EMAIL",

    /**
     * Sign up error (500 Internal Server Error)
     *
     * Occurs when there is a server-side error during the registration process.
     */
    AUTH_500_SIGN_UP = "AUTH_500_SIGN_UP",

    /**
     * Social sign up error (500 Internal Server Error)
     *
     * Occurs when there is a server-side error during social registration.
     */
    AUTH_500_SOCIAL_SIGN_UP = "AUTH_500_SOCIAL_SIGN_UP",

    /**
     * Sign in error (500 Internal Server Error)
     *
     * Occurs when there is a server-side error during the authentication process.
     */
    AUTH_500_SIGN_IN = "AUTH_500_SIGN_IN",

    /**
     * Social sign in error (500 Internal Server Error)
     *
     * Occurs when there is a server-side error during social authentication.
     */
    AUTH_500_SOCIAL_SIGN_IN = "AUTH_500_SOCIAL_SIGN_IN",

    /**
     * Social sign in callback error (500 Internal Server Error)
     *
     * Occurs when there is a server-side error processing the social authentication callback.
     */
    AUTH_500_SOCIAL_SIGN_IN_CALLBACK = "AUTH_500_SOCIAL_SIGN_IN_CALLBACK",

    /**
     * Sign out error (500 Internal Server Error)
     *
     * Occurs when there is a server-side error during the sign-out process,
     * such as failure to clear sessions, tokens, or other authentication data.
     */
    AUTH_500_SIGN_OUT = "AUTH_500_SIGN_OUT",

    /**
     * Email verification sending error (500 Internal Server Error)
     *
     * Occurs when there is a server-side error sending the verification email.
     */
    AUTH_500_SEND_EMAIL_VERIFICATION = "AUTH_500_SEND_EMAIL_VERIFICATION",

    /**
     * Email verification error (500 Internal Server Error)
     *
     * Occurs when there is a server-side error processing the email verification.
     */
    AUTH_500_VERIFY_EMAIL = "AUTH_500_VERIFY_EMAIL",

    /**
     * Password reset request error (500 Internal Server Error)
     *
     * Occurs when there is a server-side error processing a password reset request.
     */
    AUTH_500_REQUEST_PASSWORD_RESET = "AUTH_500_REQUEST_PASSWORD_RESET",

    /**
     * Password reset error (500 Internal Server Error)
     *
     * Occurs when there is a server-side error processing a password reset.
     */
    AUTH_500_PASSWORD_RESET = "AUTH_500_PASSWORD_RESET",

    /**
     * Generic authentication error (500 Internal Server Error)
     *
     * Generic server-side error in the authentication service.
     */
    AUTH_500 = "AUTH_500",

    /**
     * Feature not implemented (501 Not Implemented)
     *
     * Occurs when attempting to use an authentication feature that is not yet implemented.
     */
    AUTH_501_NOT_IMPLEMENTED = "AUTH_501_NOT_IMPLEMENTED",

    /**
     * Empty email field (400 Bad Request)
     *
     * Occurs when the email field is required but not provided.
     */
    USER_400_EMPTY_EMAIL = "USER_400_EMPTY_EMAIL",

    /**
     * Empty first name field (400 Bad Request)
     *
     * Occurs when the first name field is required but not provided.
     */
    USER_400_EMPTY_FNAME = "USER_400_EMPTY_FNAME",

    /**
     * Empty last name field (400 Bad Request)
     *
     * Occurs when the last name field is required but not provided.
     */
    USER_400_EMPTY_LNAME = "USER_400_EMPTY_LNAME",

    /**
     * Empty username field (400 Bad Request)
     *
     * Occurs when the username field is required but not provided.
     */
    USER_400_EMPTY_UNAME = "USER_400_EMPTY_UNAME",

    /**
     * Empty password field (400 Bad Request)
     *
     * Occurs when the password field is required but not provided.
     */
    USER_400_EMPTY_PASSWORD = "USER_400_EMPTY_PASSWORD",

    /**
     * Invalid email format (400 Bad Request)
     *
     * Occurs when the provided email address doesn't match a valid email format.
     */
    USER_400_INVALID_EMAIL = "USER_400_INVALID_EMAIL",

    /**
     * Username should not be empty (400 Bad Request)
     *
     * Validation error when username is expected to have a value.
     */
    USER_400_NOT_EMPTY_UNAME = "USER_400_NOT_EMPTY_UNAME",

    /**
     * Password should not be empty (400 Bad Request)
     *
     * Validation error when password is expected to have a value.
     */
    USER_400_NOT_EMPTY_PASSWORD = "USER_400_NOT_EMPTY_PASSWORD",

    /**
     * Salt should not be empty (400 Bad Request)
     *
     * Validation error when password salt is expected to have a value.
     */
    USER_400_NOT_EMPTY_SALT = "USER_400_NOT_EMPTY_SALT",

    /**
     * Sign up forbidden (403 Forbidden)
     *
     * Occurs when registration is currently not allowed or restricted.
     */
    USER_403_SIGN_UP = "USER_403_SIGN_UP",

    /**
     * User not found (404 Not Found)
     *
     * Occurs when attempting operations on a user that doesn't exist.
     */
    USER_404_ID = "USER_404_ID",

    /**
     * Username already exists (409 Conflict)
     *
     * Occurs when attempting to create a user with a username that is already taken.
     */
    USER_409_EXIST_UNAME = "USER_409_EXIST_UNAME",

    /**
     * User creation error (500 Internal Server Error)
     *
     * Occurs when there is a server-side error creating a new user account.
     */
    USER_500_CREATE = "USER_500_CREATE",
}
