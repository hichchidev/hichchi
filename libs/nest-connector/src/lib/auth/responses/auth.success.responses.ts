import { HttpSuccessStatus, SuccessResponse } from "../../common";
import { AuthSuccessResponseCode } from "../enums";

const AuthSuccessResponses: { [key in AuthSuccessResponseCode]: SuccessResponse } = {
    [AuthSuccessResponseCode.AUTH_201_ACCOUNT_CREATED_REQUIRE_VERIFY]: {
        statusCode: HttpSuccessStatus.CREATED,
        code: AuthSuccessResponseCode.AUTH_201_ACCOUNT_CREATED_REQUIRE_VERIFY,
        message: "Account created successfully. Please verify your email to activate your account.",
    },
    [AuthSuccessResponseCode.AUTH_201_ACCOUNT_CREATED]: {
        statusCode: HttpSuccessStatus.CREATED,
        code: AuthSuccessResponseCode.AUTH_201_ACCOUNT_CREATED,
        message: "Account created successfully.",
    },
    [AuthSuccessResponseCode.AUTH_201_EMAIL_VERIFIED]: {
        statusCode: HttpSuccessStatus.OK,
        code: AuthSuccessResponseCode.AUTH_201_EMAIL_VERIFIED,
        message: "Email verified successfully. You can now sign in.",
    },
    [AuthSuccessResponseCode.AUTH_200_EMAIL_VERIFICATION_SENT]: {
        statusCode: HttpSuccessStatus.OK,
        code: AuthSuccessResponseCode.AUTH_200_EMAIL_VERIFICATION_SENT,
        message: "Verification email sent successfully",
    },
    [AuthSuccessResponseCode.AUTH_200_PASSWORD_RESET_EMAIL_SENT]: {
        statusCode: HttpSuccessStatus.OK,
        code: AuthSuccessResponseCode.AUTH_200_PASSWORD_RESET_EMAIL_SENT,
        message: "Password reset email sent successfully",
    },
    [AuthSuccessResponseCode.AUTH_200_PASSWORD_RESET_TOKEN_VALID]: {
        statusCode: HttpSuccessStatus.OK,
        code: AuthSuccessResponseCode.AUTH_200_PASSWORD_RESET_TOKEN_VALID,
        message: "Password reset token is valid",
    },
    [AuthSuccessResponseCode.AUTH_200_PASSWORD_RESET_SUCCESS]: {
        statusCode: HttpSuccessStatus.OK,
        code: AuthSuccessResponseCode.AUTH_200_PASSWORD_RESET_SUCCESS,
        message: "Password reset successfully",
    },
    [AuthSuccessResponseCode.AUTH_200_SIGNED_OUT]: {
        statusCode: HttpSuccessStatus.OK,
        code: AuthSuccessResponseCode.AUTH_200_SIGNED_OUT,
        message: "Successfully signed out",
    },
};

export { AuthSuccessResponses };
