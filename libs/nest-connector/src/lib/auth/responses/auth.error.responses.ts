import { AuthErrorResponseCode } from "../enums";
import { ErrorResponse } from "../../common/interfaces";
import { HttpClientErrorStatus as ClientError, HttpServerErrorStatus as ServerError } from "../../common/enums";

/**
 * Collection of standardized authentication error responses
 *
 * This constant maps each authentication error code to its corresponding
 * standardized error response object. The responses include HTTP status codes,
 * error codes, and human-readable messages.
 *
 * Key features:
 * - Standardized error response format following the ErrorResponse interface
 * - Comprehensive coverage of authentication error scenarios
 * - Organized by HTTP status code (400, 401, 403, 404, 500, 501)
 * - Includes both authentication service errors (AUTH_) and user management errors (USER_)
 * - Human-readable error messages suitable for end-users
 *
 * The error responses are organized into categories based on HTTP status codes:
 * - 400 Bad Request: Client errors related to invalid input or request format
 * - 401 Unauthorized: Authentication failures and token-related errors
 * - 403 Forbidden: Access denied due to insufficient permissions
 * - 404 Not Found: Resource not found errors
 * - 500 Internal Server Error: Server-side errors during authentication operations
 * - 501 Not Implemented: Features that are not yet implemented
 *
 * The object is organized by error code, with each code mapping to an ErrorResponse
 * object that follows the standardized format defined by the ErrorResponse interface.
 *
 * @example
 * ```typescript
 * // Using an error response in an exception
 * import { AuthErrors } from '@hichchi/nest-connector/auth';
 * import { UnauthorizedException } from '@nestjs/common';
 *
 * // In an authentication service
 * if (!user.isEmailVerified) {
 *   throw new UnauthorizedException(AuthErrors.AUTH_401_EMAIL_NOT_VERIFIED);
 * }
 * ```
 *
 * @example
 * ```typescript
 * // Using an error response in a custom exception filter
 * import { AuthErrors } from '@hichchi/nest-connector/auth';
 * import { ExceptionFilter, Catch, ArgumentsHost, UnauthorizedException } from '@nestjs/common';
 *
 * @Catch(UnauthorizedException)
 * export class AuthExceptionFilter implements ExceptionFilter {
 *   catch(exception: UnauthorizedException, host: ArgumentsHost) {
 *     const response = host.switchToHttp().getResponse();
 *     const status = exception.getStatus();
 *
 *     // Use a standard error response
 *     response
 *       .status(status)
 *       .json(AuthErrors.AUTH_401_NOT_LOGGED_IN);
 *   }
 * }
 * ```
 *
 * @type {{ [key in AuthErrorResponseCode]: ErrorResponse }}
 *
 * @see {@link AuthErrorResponseCode} For all available error codes
 * @see {@link ErrorResponse} For the structure of error response objects
 * @see {@link AuthSuccessResponses} Complementary success responses for authentication
 */
const AuthErrors: { [key in AuthErrorResponseCode]: ErrorResponse } = {
    [AuthErrorResponseCode.AUTH_400_EMAIL_ALREADY_VERIFIED]: {
        statusCode: ClientError.BAD_REQUEST,
        code: AuthErrorResponseCode.AUTH_400_EMAIL_ALREADY_VERIFIED,
        message: "Email already verified!",
    },
    [AuthErrorResponseCode.AUTH_400_REDIRECT_URL_REQUIRED]: {
        statusCode: ClientError.BAD_REQUEST,
        code: AuthErrorResponseCode.AUTH_400_REDIRECT_URL_REQUIRED,
        message: "Redirect URL is required",
        description: "Redirect URL is required",
    },
    [AuthErrorResponseCode.AUTH_401_CORS]: {
        statusCode: ClientError.UNAUTHORIZED,
        code: AuthErrorResponseCode.AUTH_401_CORS,
        message: "Access blocked by CORS!",
    },
    [AuthErrorResponseCode.AUTH_401_INVALID_USERNAME_PASSWORD]: {
        statusCode: ClientError.UNAUTHORIZED,
        code: AuthErrorResponseCode.AUTH_401_INVALID_USERNAME_PASSWORD,
        message: "Invalid username or password!",
    },
    [AuthErrorResponseCode.AUTH_401_INVALID_EMAIL_PASSWORD]: {
        statusCode: ClientError.UNAUTHORIZED,
        code: AuthErrorResponseCode.AUTH_401_INVALID_EMAIL_PASSWORD,
        message: "Invalid e-mail or password!",
    },
    [AuthErrorResponseCode.AUTH_401_INVALID_PASSWORD]: {
        statusCode: ClientError.UNAUTHORIZED,
        code: AuthErrorResponseCode.AUTH_401_INVALID_PASSWORD,
        message: "Invalid password!",
    },
    [AuthErrorResponseCode.AUTH_401_NOT_LOGGED_IN]: {
        statusCode: ClientError.UNAUTHORIZED,
        code: AuthErrorResponseCode.AUTH_401_NOT_LOGGED_IN,
        message: "User must be logged in to access this resource!",
    },
    [AuthErrorResponseCode.AUTH_401_NOT_LOCAL]: {
        statusCode: ClientError.UNAUTHORIZED,
        code: AuthErrorResponseCode.AUTH_401_NOT_LOCAL,
        message: "Cannot sign in with password for accounts signed up with social media!",
    },
    [AuthErrorResponseCode.AUTH_401_SOCIAL_SIGN_IN]: {
        statusCode: ClientError.UNAUTHORIZED,
        code: AuthErrorResponseCode.AUTH_401_SOCIAL_SIGN_IN,
        message: "Cannot sign in with social media account!",
    },
    [AuthErrorResponseCode.AUTH_401_EMAIL_NOT_VERIFIED]: {
        statusCode: ClientError.UNAUTHORIZED,
        code: AuthErrorResponseCode.AUTH_401_EMAIL_NOT_VERIFIED,
        message: "User e-mail not verified!",
    },
    [AuthErrorResponseCode.AUTH_401_NOT_ACTIVE]: {
        statusCode: ClientError.UNAUTHORIZED,
        code: AuthErrorResponseCode.AUTH_401_NOT_ACTIVE,
        message: "Your account has been disabled. Contact us if you think this is a mistake!",
    },
    [AuthErrorResponseCode.AUTH_401_TOKEN_NOT_SET]: {
        statusCode: ClientError.UNAUTHORIZED,
        code: AuthErrorResponseCode.AUTH_401_TOKEN_NOT_SET,
        message: "Cannot find a token!",
    },
    [AuthErrorResponseCode.AUTH_401_REFRESH_TOKEN_NOT_SET]: {
        statusCode: ClientError.UNAUTHORIZED,
        code: AuthErrorResponseCode.AUTH_401_REFRESH_TOKEN_NOT_SET,
        message: "Cannot find a refresh token!",
    },
    [AuthErrorResponseCode.AUTH_401_INVALID_TOKEN]: {
        statusCode: ClientError.UNAUTHORIZED,
        code: AuthErrorResponseCode.AUTH_401_INVALID_TOKEN,
        message: "Invalid token received!",
    },
    [AuthErrorResponseCode.AUTH_401_EXPIRED_TOKEN]: {
        statusCode: ClientError.UNAUTHORIZED,
        code: AuthErrorResponseCode.AUTH_401_EXPIRED_TOKEN,
        message: "Expired token received!",
    },
    [AuthErrorResponseCode.AUTH_401_INVALID_VERIFICATION_TOKEN]: {
        statusCode: ClientError.UNAUTHORIZED,
        code: AuthErrorResponseCode.AUTH_401_INVALID_VERIFICATION_TOKEN,
        message: "Invalid or expired verification token received!",
    },
    [AuthErrorResponseCode.AUTH_401_INVALID_PASSWORD_RESET_TOKEN]: {
        statusCode: ClientError.UNAUTHORIZED,
        code: AuthErrorResponseCode.AUTH_401_INVALID_PASSWORD_RESET_TOKEN,
        message: "Invalid or expired password reset token token received!",
    },
    [AuthErrorResponseCode.AUTH_401_INVALID_REFRESH_TOKEN]: {
        statusCode: ClientError.UNAUTHORIZED,
        code: AuthErrorResponseCode.AUTH_401_INVALID_REFRESH_TOKEN,
        message: "Invalid refresh token received!",
    },
    [AuthErrorResponseCode.AUTH_401_EXPIRED_REFRESH_TOKEN]: {
        statusCode: ClientError.UNAUTHORIZED,
        code: AuthErrorResponseCode.AUTH_401_EXPIRED_REFRESH_TOKEN,
        message: "Expired refresh token received!",
    },
    [AuthErrorResponseCode.AUTH_401_EXPIRED_OR_INVALID_PASSWORD_RESET_TOKEN]: {
        statusCode: ClientError.UNAUTHORIZED,
        code: AuthErrorResponseCode.AUTH_401_EXPIRED_OR_INVALID_PASSWORD_RESET_TOKEN,
        message: "Expired or invalid password reset token received!",
    },
    [AuthErrorResponseCode.AUTH_401_UNKNOWN]: {
        statusCode: ClientError.UNAUTHORIZED,
        code: AuthErrorResponseCode.AUTH_401_UNKNOWN,
        message: "Unknown error occurred!",
    },
    [AuthErrorResponseCode.AUTH_403_PENDING]: {
        statusCode: ClientError.UNAUTHORIZED,
        code: AuthErrorResponseCode.AUTH_403_PENDING,
        message:
            "Please verify your e-mail address to continue. If you didn't receive the email you can click " +
            "the resend verification button to receive it again!",
    },
    [AuthErrorResponseCode.AUTH_403_ACCOUNT_DISABLED]: {
        statusCode: ClientError.BAD_REQUEST,
        code: AuthErrorResponseCode.AUTH_403_ACCOUNT_DISABLED,
        message: "Account disabled!",
    },
    [AuthErrorResponseCode.AUTH_403_ROLE_FORBIDDEN]: {
        statusCode: ClientError.FORBIDDEN,
        code: AuthErrorResponseCode.AUTH_403_ROLE_FORBIDDEN,
        message: "You don't have privileges to access this resource!",
    },
    [AuthErrorResponseCode.AUTH_404_EMAIL]: {
        statusCode: ClientError.NOT_FOUND,
        code: AuthErrorResponseCode.AUTH_404_EMAIL,
        message: "Cannot find a user account with this e-mail!",
    },
    [AuthErrorResponseCode.AUTH_500_SIGN_UP]: {
        statusCode: ServerError.INTERNAL_SERVER_ERROR,
        code: AuthErrorResponseCode.AUTH_500_SIGN_UP,
        message: "Error occurred while signing up!",
    },
    [AuthErrorResponseCode.AUTH_500_SOCIAL_SIGN_UP]: {
        statusCode: ServerError.INTERNAL_SERVER_ERROR,
        code: AuthErrorResponseCode.AUTH_500_SOCIAL_SIGN_UP,
        message: "Error occurred while signing up with social media account!",
    },
    [AuthErrorResponseCode.AUTH_500_SIGN_IN]: {
        statusCode: ServerError.INTERNAL_SERVER_ERROR,
        code: AuthErrorResponseCode.AUTH_500_SIGN_IN,
        message: "Error occurred while signing in!",
    },
    [AuthErrorResponseCode.AUTH_500_SOCIAL_SIGN_IN]: {
        statusCode: ServerError.INTERNAL_SERVER_ERROR,
        code: AuthErrorResponseCode.AUTH_500_SOCIAL_SIGN_IN,
        message: "Error occurred while signing in with social media account!",
    },
    [AuthErrorResponseCode.AUTH_500_SOCIAL_SIGN_IN_CALLBACK]: {
        statusCode: ServerError.INTERNAL_SERVER_ERROR,
        code: AuthErrorResponseCode.AUTH_500_SOCIAL_SIGN_IN_CALLBACK,
        message: "Error occurred while signing in with social media account!",
    },
    [AuthErrorResponseCode.AUTH_500_SIGN_OUT]: {
        statusCode: ServerError.INTERNAL_SERVER_ERROR,
        code: AuthErrorResponseCode.AUTH_500_SIGN_OUT,
        message: "Error occurred while signing out!",
    },
    [AuthErrorResponseCode.AUTH_500_SEND_EMAIL_VERIFICATION]: {
        statusCode: ServerError.INTERNAL_SERVER_ERROR,
        code: AuthErrorResponseCode.AUTH_500_SEND_EMAIL_VERIFICATION,
        message: "Error occurred while sending email verification!",
    },
    [AuthErrorResponseCode.AUTH_500_VERIFY_EMAIL]: {
        statusCode: ServerError.INTERNAL_SERVER_ERROR,
        code: AuthErrorResponseCode.AUTH_500_VERIFY_EMAIL,
        message: "Error occurred while verifying email!",
    },
    [AuthErrorResponseCode.AUTH_500_REQUEST_PASSWORD_RESET]: {
        statusCode: ServerError.INTERNAL_SERVER_ERROR,
        code: AuthErrorResponseCode.AUTH_500_REQUEST_PASSWORD_RESET,
        message: "Error occurred while requesting password reset!",
    },
    [AuthErrorResponseCode.AUTH_500_PASSWORD_RESET]: {
        statusCode: ServerError.INTERNAL_SERVER_ERROR,
        code: AuthErrorResponseCode.AUTH_500_PASSWORD_RESET,
        message: "Error occurred while resetting password!",
    },
    [AuthErrorResponseCode.AUTH_500]: {
        statusCode: ServerError.INTERNAL_SERVER_ERROR,
        code: AuthErrorResponseCode.AUTH_500,
        message: "Error occurred!",
    },
    [AuthErrorResponseCode.AUTH_501_NOT_IMPLEMENTED]: {
        statusCode: ServerError.NOT_IMPLEMENTED,
        code: AuthErrorResponseCode.AUTH_501_NOT_IMPLEMENTED,
        message: "API Not implemented!",
    },
    [AuthErrorResponseCode.USER_400_EMPTY_EMAIL]: {
        statusCode: ClientError.BAD_REQUEST,
        code: AuthErrorResponseCode.USER_400_EMPTY_EMAIL,
        message: "Email cannot be empty!",
    },
    [AuthErrorResponseCode.USER_400_EMPTY_FNAME]: {
        statusCode: ClientError.BAD_REQUEST,
        code: AuthErrorResponseCode.USER_400_EMPTY_FNAME,
        message: "User first name cannot be empty!",
    },
    [AuthErrorResponseCode.USER_400_EMPTY_LNAME]: {
        statusCode: ClientError.BAD_REQUEST,
        code: AuthErrorResponseCode.USER_400_EMPTY_LNAME,
        message: "User last name cannot be empty!",
    },
    [AuthErrorResponseCode.USER_400_EMPTY_UNAME]: {
        statusCode: ClientError.BAD_REQUEST,
        code: AuthErrorResponseCode.USER_400_EMPTY_UNAME,
        message: "User username cannot be empty!",
    },
    [AuthErrorResponseCode.USER_400_EMPTY_PASSWORD]: {
        statusCode: ClientError.BAD_REQUEST,
        code: AuthErrorResponseCode.USER_400_EMPTY_PASSWORD,
        message: "User password cannot be empty!",
    },
    [AuthErrorResponseCode.USER_400_INVALID_EMAIL]: {
        statusCode: ClientError.BAD_REQUEST,
        code: AuthErrorResponseCode.USER_400_INVALID_EMAIL,
        message: "Invalid e-mail address!",
    },
    [AuthErrorResponseCode.USER_400_NOT_EMPTY_UNAME]: {
        statusCode: ClientError.BAD_REQUEST,
        code: AuthErrorResponseCode.USER_400_NOT_EMPTY_UNAME,
        message: "User username cannot be updated!",
    },
    [AuthErrorResponseCode.USER_400_NOT_EMPTY_PASSWORD]: {
        statusCode: ClientError.BAD_REQUEST,
        code: AuthErrorResponseCode.USER_400_NOT_EMPTY_PASSWORD,
        message: "User password cannot be updated!",
    },
    [AuthErrorResponseCode.USER_400_NOT_EMPTY_SALT]: {
        statusCode: ClientError.BAD_REQUEST,
        code: AuthErrorResponseCode.USER_400_NOT_EMPTY_SALT,
        message: "User salt cannot be inserted/updated!",
    },
    [AuthErrorResponseCode.USER_403_SIGN_UP]: {
        statusCode: ClientError.FORBIDDEN,
        code: AuthErrorResponseCode.USER_403_SIGN_UP,
        message: "User sign up is disabled!",
    },
    [AuthErrorResponseCode.USER_404_ID]: {
        statusCode: ClientError.NOT_FOUND,
        code: AuthErrorResponseCode.USER_404_ID,
        message: "Cannot find a user with given id!",
    },
    [AuthErrorResponseCode.USER_409_EXIST_UNAME]: {
        statusCode: ClientError.CONFLICT,
        code: AuthErrorResponseCode.USER_409_EXIST_UNAME,
        message: "User with given username already exist!",
    },
    [AuthErrorResponseCode.USER_500_CREATE]: {
        statusCode: ServerError.INTERNAL_SERVER_ERROR,
        code: AuthErrorResponseCode.USER_500_CREATE,
        message: "Error occurred while creating user!",
    },
};

export { AuthErrors };
