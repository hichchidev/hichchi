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
        message: "Email verified successfully. You can now login.",
    },
    [AuthSuccessResponseCode.AUTH_200_EMAIL_VERIFICATION_SENT]: {
        statusCode: HttpSuccessStatus.OK,
        code: AuthSuccessResponseCode.AUTH_200_EMAIL_VERIFICATION_SENT,
        message: "Verification email sent successfully",
    },
};

export { AuthSuccessResponses };
