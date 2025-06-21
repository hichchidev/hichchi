import { HttpSuccessStatus, SuccessResponse } from "@hichchi/nest-connector";
import { AuthSuccessResponse } from "@hichchi/nest-connector/auth";

const AuthSuccessResponses: { [key in AuthSuccessResponse]: SuccessResponse } = {
    [AuthSuccessResponse.AUTH_201_ACCOUNT_CREATED_REQUIRE_VERIFY]: {
        statusCode: HttpSuccessStatus.CREATED,
        code: AuthSuccessResponse.AUTH_201_ACCOUNT_CREATED_REQUIRE_VERIFY,
        message: "Account created successfully. Please verify your email to activate your account.",
    },
    [AuthSuccessResponse.AUTH_201_ACCOUNT_CREATED]: {
        statusCode: HttpSuccessStatus.CREATED,
        code: AuthSuccessResponse.AUTH_201_ACCOUNT_CREATED,
        message: "Account created successfully.",
    },
    [AuthSuccessResponse.AUTH_201_EMAIL_VERIFIED]: {
        statusCode: HttpSuccessStatus.OK,
        code: AuthSuccessResponse.AUTH_201_EMAIL_VERIFIED,
        message: "Email verified successfully. You can now login.",
    },
    [AuthSuccessResponse.AUTH_200_EMAIL_VERIFICATION_SENT]: {
        statusCode: HttpSuccessStatus.OK,
        code: AuthSuccessResponse.AUTH_200_EMAIL_VERIFICATION_SENT,
        message: "Verification email sent successfully",
    },
};

export { AuthSuccessResponses };
