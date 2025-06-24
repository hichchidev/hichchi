import { HttpSuccessStatus, SuccessResponse } from "../../common";
import { AuthSuccessResponseCode } from "../enums";

/**
 * Collection of standardized authentication success responses
 *
 * This constant maps each authentication success response code to its corresponding
 * standardized success response object. The responses include HTTP status codes,
 * success codes, and human-readable messages.
 *
 * Key features:
 * - Standardized success response format following the SuccessResponse interface
 * - Comprehensive coverage of authentication success scenarios
 * - Organized by HTTP status code (200, 201)
 * - Human-readable success messages suitable for end-users
 * - Consistent response structure across the authentication system
 *
 * The success responses are organized into categories based on HTTP status codes:
 * - 200 OK: General success responses for operations like verification, password reset, sign out
 * - 201 Created: Success responses for resource creation operations like account creation
 *
 * The object is organized by success code, with each code mapping to a SuccessResponse
 * object that follows the standardized format defined by the SuccessResponse interface.
 *
 * @example
 * ```typescript
 * // Using a success response in a controller
 * import { AuthSuccessResponses } from '@hichchi/nest-connector/auth';
 * import { Controller, Post, Body } from '@nestjs/common';
 *
 * @Controller('auth')
 * export class AuthController {
 *   constructor(private readonly authService: AuthService) {}
 *
 *   @Post('register')
 *   async register(@Body() registerDto: RegisterDto) {
 *     await this.authService.register(registerDto);
 *     return AuthSuccessResponses.AUTH_201_ACCOUNT_CREATED_REQUIRE_VERIFY;
 *   }
 * }
 * ```
 *
 * @example
 * ```typescript
 * // Using a success response in a service
 * import { AuthSuccessResponses } from '@hichchi/nest-connector/auth';
 * import { Injectable } from '@nestjs/common';
 *
 * @Injectable()
 * export class AuthService {
 *   async verifyEmail(token: string) {
 *     // Verify email logic...
 *     return AuthSuccessResponses.AUTH_201_EMAIL_VERIFIED;
 *   }
 * }
 * ```
 *
 * @type {{ [key in AuthSuccessResponseCode]: SuccessResponse }}
 *
 * @see {@link AuthSuccessResponseCode} For all available success codes
 * @see {@link SuccessResponse} For the structure of success response objects
 * @see {@link AuthErrors} Complementary error responses for authentication
 */
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
