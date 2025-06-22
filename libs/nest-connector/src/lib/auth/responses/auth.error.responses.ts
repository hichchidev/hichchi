import { AuthErrorResponse } from "../enums";
import { ErrorResponse } from "../../common/interfaces";
import { HttpClientErrorStatus as ClientError, HttpServerErrorStatus as ServerError } from "../../common/enums";

const AuthErrors: { [key in AuthErrorResponse]: ErrorResponse } = {
    [AuthErrorResponse.AUTH_400_EMAIL_ALREADY_VERIFIED]: {
        statusCode: ClientError.BAD_REQUEST,
        code: AuthErrorResponse.AUTH_400_EMAIL_ALREADY_VERIFIED,
        message: "Email already verified!",
    },
    [AuthErrorResponse.AUTH_400_REDIRECT_URL_REQUIRED]: {
        statusCode: ClientError.BAD_REQUEST,
        code: AuthErrorResponse.AUTH_400_REDIRECT_URL_REQUIRED,
        message: "Redirect URL is required",
        description: "Redirect URL is required",
    },
    [AuthErrorResponse.AUTH_401_CORS]: {
        statusCode: ClientError.UNAUTHORIZED,
        code: AuthErrorResponse.AUTH_401_CORS,
        message: "Access blocked by CORS!",
    },
    [AuthErrorResponse.AUTH_401_INVALID_USERNAME_PASSWORD]: {
        statusCode: ClientError.UNAUTHORIZED,
        code: AuthErrorResponse.AUTH_401_INVALID_USERNAME_PASSWORD,
        message: "Invalid username or password!",
    },
    [AuthErrorResponse.AUTH_401_INVALID_EMAIL_PASSWORD]: {
        statusCode: ClientError.UNAUTHORIZED,
        code: AuthErrorResponse.AUTH_401_INVALID_EMAIL_PASSWORD,
        message: "Invalid e-mail or password!",
    },
    [AuthErrorResponse.AUTH_401_INVALID_PASSWORD]: {
        statusCode: ClientError.UNAUTHORIZED,
        code: AuthErrorResponse.AUTH_401_INVALID_PASSWORD,
        message: "Invalid password!",
    },
    [AuthErrorResponse.AUTH_401_NOT_LOGGED_IN]: {
        statusCode: ClientError.UNAUTHORIZED,
        code: AuthErrorResponse.AUTH_401_NOT_LOGGED_IN,
        message: "User must be logged in to access this resource!",
    },
    [AuthErrorResponse.AUTH_401_NOT_LOCAL]: {
        statusCode: ClientError.UNAUTHORIZED,
        code: AuthErrorResponse.AUTH_401_NOT_LOCAL,
        message: "Cannot login with password for accounts registered with social media!",
    },
    [AuthErrorResponse.AUTH_401_SOCIAL_LOGIN]: {
        statusCode: ClientError.UNAUTHORIZED,
        code: AuthErrorResponse.AUTH_401_SOCIAL_LOGIN,
        message: "Cannot login with social media account!",
    },
    [AuthErrorResponse.AUTH_401_EMAIL_NOT_VERIFIED]: {
        statusCode: ClientError.UNAUTHORIZED,
        code: AuthErrorResponse.AUTH_401_EMAIL_NOT_VERIFIED,
        message: "User e-mail not verified!",
    },
    [AuthErrorResponse.AUTH_401_NOT_ACTIVE]: {
        statusCode: ClientError.UNAUTHORIZED,
        code: AuthErrorResponse.AUTH_401_NOT_ACTIVE,
        message: "Your account has been disabled. Contact us if you think this is a mistake!",
    },
    [AuthErrorResponse.AUTH_401_TOKEN_NOT_SET]: {
        statusCode: ClientError.UNAUTHORIZED,
        code: AuthErrorResponse.AUTH_401_TOKEN_NOT_SET,
        message: "Cannot find a token!",
    },
    [AuthErrorResponse.AUTH_401_REFRESH_TOKEN_NOT_SET]: {
        statusCode: ClientError.UNAUTHORIZED,
        code: AuthErrorResponse.AUTH_401_REFRESH_TOKEN_NOT_SET,
        message: "Cannot find a refresh token!",
    },
    [AuthErrorResponse.AUTH_401_INVALID_TOKEN]: {
        statusCode: ClientError.UNAUTHORIZED,
        code: AuthErrorResponse.AUTH_401_INVALID_TOKEN,
        message: "Invalid token received!",
    },
    [AuthErrorResponse.AUTH_401_EXPIRED_TOKEN]: {
        statusCode: ClientError.UNAUTHORIZED,
        code: AuthErrorResponse.AUTH_401_EXPIRED_TOKEN,
        message: "Expired token received!",
    },
    [AuthErrorResponse.AUTH_401_INVALID_VERIFICATION_TOKEN]: {
        statusCode: ClientError.UNAUTHORIZED,
        code: AuthErrorResponse.AUTH_401_INVALID_VERIFICATION_TOKEN,
        message: "Invalid or expired verification token received!",
    },
    [AuthErrorResponse.AUTH_401_INVALID_PASSWORD_RESET_TOKEN]: {
        statusCode: ClientError.UNAUTHORIZED,
        code: AuthErrorResponse.AUTH_401_INVALID_PASSWORD_RESET_TOKEN,
        message: "Invalid or expired password reset token token received!",
    },
    [AuthErrorResponse.AUTH_401_INVALID_REFRESH_TOKEN]: {
        statusCode: ClientError.UNAUTHORIZED,
        code: AuthErrorResponse.AUTH_401_INVALID_REFRESH_TOKEN,
        message: "Invalid refresh token received!",
    },
    [AuthErrorResponse.AUTH_401_EXPIRED_REFRESH_TOKEN]: {
        statusCode: ClientError.UNAUTHORIZED,
        code: AuthErrorResponse.AUTH_401_EXPIRED_REFRESH_TOKEN,
        message: "Expired refresh token received!",
    },
    [AuthErrorResponse.AUTH_401_EXPIRED_OR_INVALID_PASSWORD_RESET_TOKEN]: {
        statusCode: ClientError.UNAUTHORIZED,
        code: AuthErrorResponse.AUTH_401_EXPIRED_OR_INVALID_PASSWORD_RESET_TOKEN,
        message: "Expired or invalid password reset token received!",
    },
    [AuthErrorResponse.AUTH_401_UNKNOWN]: {
        statusCode: ClientError.UNAUTHORIZED,
        code: AuthErrorResponse.AUTH_401_UNKNOWN,
        message: "Unknown error occurred!",
    },
    [AuthErrorResponse.AUTH_403_PENDING]: {
        statusCode: ClientError.UNAUTHORIZED,
        code: AuthErrorResponse.AUTH_403_PENDING,
        message:
            "Please verify your e-mail address to continue. If you didn't receive the email you can click " +
            "the resend verification button to receive it again!",
    },
    [AuthErrorResponse.AUTH_403_ACCOUNT_DISABLED]: {
        statusCode: ClientError.BAD_REQUEST,
        code: AuthErrorResponse.AUTH_403_ACCOUNT_DISABLED,
        message: "Account disabled!",
    },
    [AuthErrorResponse.AUTH_403_ROLE_FORBIDDEN]: {
        statusCode: ClientError.FORBIDDEN,
        code: AuthErrorResponse.AUTH_403_ROLE_FORBIDDEN,
        message: "You don't have privileges to access this resource!",
    },
    [AuthErrorResponse.AUTH_404_EMAIL]: {
        statusCode: ClientError.NOT_FOUND,
        code: AuthErrorResponse.AUTH_404_EMAIL,
        message: "Cannot find a user account with this e-mail!",
    },
    [AuthErrorResponse.AUTH_500_REGISTER]: {
        statusCode: ServerError.INTERNAL_SERVER_ERROR,
        code: AuthErrorResponse.AUTH_500_REGISTER,
        message: "Error occurred while registering!",
    },
    [AuthErrorResponse.AUTH_500_REGISTER_SOCIAL]: {
        statusCode: ServerError.INTERNAL_SERVER_ERROR,
        code: AuthErrorResponse.AUTH_500_REGISTER_SOCIAL,
        message: "Error occurred while registering with social media account!",
    },
    [AuthErrorResponse.AUTH_500_LOGIN]: {
        statusCode: ServerError.INTERNAL_SERVER_ERROR,
        code: AuthErrorResponse.AUTH_500_LOGIN,
        message: "Error occurred while logging in!",
    },
    [AuthErrorResponse.AUTH_500_SOCIAL_LOGIN]: {
        statusCode: ServerError.INTERNAL_SERVER_ERROR,
        code: AuthErrorResponse.AUTH_500_SOCIAL_LOGIN,
        message: "Error occurred while logging in with social media account!",
    },
    [AuthErrorResponse.AUTH_500_SOCIAL_LOGIN_CALLBACK]: {
        statusCode: ServerError.INTERNAL_SERVER_ERROR,
        code: AuthErrorResponse.AUTH_500_SOCIAL_LOGIN_CALLBACK,
        message: "Error occurred while logging in with social media account!",
    },
    [AuthErrorResponse.AUTH_500_SEND_EMAIL_VERIFICATION]: {
        statusCode: ServerError.INTERNAL_SERVER_ERROR,
        code: AuthErrorResponse.AUTH_500_SEND_EMAIL_VERIFICATION,
        message: "Error occurred while sending email verification!",
    },
    [AuthErrorResponse.AUTH_500_VERIFY_EMAIL]: {
        statusCode: ServerError.INTERNAL_SERVER_ERROR,
        code: AuthErrorResponse.AUTH_500_VERIFY_EMAIL,
        message: "Error occurred while verifying email!",
    },
    [AuthErrorResponse.AUTH_500_REQUEST_PASSWORD_RESET]: {
        statusCode: ServerError.INTERNAL_SERVER_ERROR,
        code: AuthErrorResponse.AUTH_500_REQUEST_PASSWORD_RESET,
        message: "Error occurred while requesting password reset!",
    },
    [AuthErrorResponse.AUTH_500_PASSWORD_RESET]: {
        statusCode: ServerError.INTERNAL_SERVER_ERROR,
        code: AuthErrorResponse.AUTH_500_PASSWORD_RESET,
        message: "Error occurred while resetting password!",
    },
    [AuthErrorResponse.AUTH_500]: {
        statusCode: ServerError.INTERNAL_SERVER_ERROR,
        code: AuthErrorResponse.AUTH_500,
        message: "Error occurred!",
    },
    [AuthErrorResponse.AUTH_501_NOT_IMPLEMENTED]: {
        statusCode: ServerError.NOT_IMPLEMENTED,
        code: AuthErrorResponse.AUTH_501_NOT_IMPLEMENTED,
        message: "API Not implemented!",
    },
    [AuthErrorResponse.USER_400_EMPTY_EMAIL]: {
        statusCode: ClientError.BAD_REQUEST,
        code: AuthErrorResponse.USER_400_EMPTY_EMAIL,
        message: "Email cannot be empty!",
    },
    [AuthErrorResponse.USER_400_EMPTY_FNAME]: {
        statusCode: ClientError.BAD_REQUEST,
        code: AuthErrorResponse.USER_400_EMPTY_FNAME,
        message: "User first name cannot be empty!",
    },
    [AuthErrorResponse.USER_400_EMPTY_LNAME]: {
        statusCode: ClientError.BAD_REQUEST,
        code: AuthErrorResponse.USER_400_EMPTY_LNAME,
        message: "User last name cannot be empty!",
    },
    [AuthErrorResponse.USER_400_EMPTY_UNAME]: {
        statusCode: ClientError.BAD_REQUEST,
        code: AuthErrorResponse.USER_400_EMPTY_UNAME,
        message: "User username cannot be empty!",
    },
    [AuthErrorResponse.USER_400_EMPTY_PASSWORD]: {
        statusCode: ClientError.BAD_REQUEST,
        code: AuthErrorResponse.USER_400_EMPTY_PASSWORD,
        message: "User password cannot be empty!",
    },
    [AuthErrorResponse.USER_400_INVALID_EMAIL]: {
        statusCode: ClientError.BAD_REQUEST,
        code: AuthErrorResponse.USER_400_INVALID_EMAIL,
        message: "Invalid e-mail address!",
    },
    [AuthErrorResponse.USER_400_NOT_EMPTY_UNAME]: {
        statusCode: ClientError.BAD_REQUEST,
        code: AuthErrorResponse.USER_400_NOT_EMPTY_UNAME,
        message: "User username cannot be updated!",
    },
    [AuthErrorResponse.USER_400_NOT_EMPTY_PASSWORD]: {
        statusCode: ClientError.BAD_REQUEST,
        code: AuthErrorResponse.USER_400_NOT_EMPTY_PASSWORD,
        message: "User password cannot be updated!",
    },
    [AuthErrorResponse.USER_400_NOT_EMPTY_SALT]: {
        statusCode: ClientError.BAD_REQUEST,
        code: AuthErrorResponse.USER_400_NOT_EMPTY_SALT,
        message: "User salt cannot be inserted/updated!",
    },
    [AuthErrorResponse.USER_403_REGISTER]: {
        statusCode: ClientError.FORBIDDEN,
        code: AuthErrorResponse.USER_403_REGISTER,
        message: "User registration is disabled!",
    },
    [AuthErrorResponse.USER_404]: {
        statusCode: ClientError.NOT_FOUND,
        code: AuthErrorResponse.USER_404,
        message: "Cannot find a user with given id!",
    },
    [AuthErrorResponse.USER_409_EXIST_UNAME]: {
        statusCode: ClientError.CONFLICT,
        code: AuthErrorResponse.USER_409_EXIST_UNAME,
        message: "User with given username already exist!",
    },
    [AuthErrorResponse.USER_500_CREATE]: {
        statusCode: ServerError.INTERNAL_SERVER_ERROR,
        code: AuthErrorResponse.USER_500_CREATE,
        message: "Error occurred while creating user!",
    },
};

export { AuthErrors };
