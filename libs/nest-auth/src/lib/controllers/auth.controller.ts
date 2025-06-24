import {
    Body,
    Controller,
    ForbiddenException,
    Get,
    HttpCode,
    Inject,
    InternalServerErrorException,
    Post,
    Query,
    Req,
    Res,
    UseGuards,
} from "@nestjs/common";
import { AuthEndpoint, AuthErrors, AuthResponse, SignUpBody, TokenResponse, User } from "@hichchi/nest-connector/auth";
import { Request, Response } from "express";
import { AuthService } from "../services";
import { AUTH_OPTIONS } from "../tokens";
import { AuthOptions, AuthUser } from "../interfaces";
import { GoogleAuthGuard, JwtAuthGuard, LocalAuthGuard } from "../guards";
import { OverrideSignUpDtoPipe } from "../pipes";
import { AuthInfo, CurrentUser } from "../decorators";
import {
    EmailVerifyDto,
    GetAuthResponseDto,
    RefreshTokenDto,
    RequestResetDto,
    ResendEmailVerifyDto,
    ResetPasswordDto,
    ResetPasswordTokenVerifyDto,
    SignInDto,
    UpdatePasswordDto,
} from "../dtos";
import { Endpoint, HttpSuccessStatus, SuccessResponse } from "@hichchi/nest-connector";
import { LoggerService } from "@hichchi/nest-core";
import { isValidRedirectUrl } from "@hichchi/utils";

/**
 * Authentication controller that handles all authentication-related endpoints.
 *
 * This controller provides endpoints for user sign up, authentication, password management,
 * email verification, and social authentication.
 *
 * The default endpoint path is 'auth' but can be customized by extending this class:
 *
 * @example
 * ```typescript
 * @Controller('custom-auth')
 * export class CustomAuthController extends AuthController {
 *   // Override existing methods or add new ones
 *
 *   @Get('custom-endpoint')
 *   async customEndpoint() {
 *     return 'Custom endpoint';
 *   }
 * }
 * ```
 *
 * @see {@link Endpoint.AUTH} - The default endpoint path constant used for this controller.
 * @see {@link Endpoint} - Contains all available endpoints for this module.
 */
@Controller(Endpoint.AUTH)
export class AuthController {
    /**
     * Creates an instance of AuthController.
     *
     * @param {AuthOptions} options - The authentication options injected from `AUTH_OPTIONS` token
     * @param {AuthService} authService - The authentication service
     *
     * @see {@link AUTH_OPTIONS} Token used to inject authentication options
     * @see {@link AuthOptions} Interface defining authentication configuration
     * @see {@link AuthService} Service handling authentication logic
     */
    constructor(
        @Inject(AUTH_OPTIONS) private options: AuthOptions,
        protected readonly authService: AuthService,
    ) {}

    /**
     * Sign up a new user with the provided sign-up data.
     *
     * This endpoint creates a new user account with the provided sign up data.
     * If sign up is disabled in the auth options, it will throw a ForbiddenException.
     *
     * @param {Request} request - The Express request object
     * @param {SignUpBody} dto - The sign-up data transfer object containing user sign up information
     * @returns {Promise<User>} The newly created user
     *
     * @throws {ForbiddenException} If sign up is disabled
     *
     * @example
     * ```typescript
     * // Client-side example
     * const response = await fetch('/auth/sign-up', {
     *   method: 'POST',
     *   headers: { 'Content-Type': 'application/json' },
     *   body: JSON.stringify({
     *     email: 'user@example.com',
     *     password: 'password123',
     *     firstName: 'John',
     *     lastName: 'Doe'
     *   })
     * });
     * const user = await response.json();
     * ```
     *
     * ```json
     * // Result:
     * {
     *   "id": "123e4567-e89b-12d3-a456-426614174000",
     *   "email": "user@example.com",
     *   "firstName": "John",
     *   "lastName": "Doe",
     *   "isVerified": true,
     *   "signUpType": "local",
     *   "createdAt": "2025-06-24T10:12:45.123Z",
     *   "updatedAt": "2025-06-24T11:30:15.456Z"
     * }
     * ```
     *
     * @see {@link AuthEndpoint.SIGN_UP} - The specific endpoint path segment for user registration.
     * @see {@link AuthEndpoint} - Enum containing all authentication-specific endpoint paths.
     * @see {@link Endpoint.AUTH} - The default endpoint path constant used for this controller.
     */
    @Post(AuthEndpoint.SIGN_UP)
    @HttpCode(HttpSuccessStatus.CREATED)
    signUp(@Req() request: Request, @Body(OverrideSignUpDtoPipe) dto: SignUpBody): Promise<User> {
        if (this.options.disableSignUp) {
            throw new ForbiddenException(AuthErrors.USER_403_SIGN_UP);
        }
        return this.authService.signUp(request, dto);
    }

    /**
     * Authenticates a user with email/username and password.
     *
     * This endpoint handles user sign in using local authentication strategy.
     * It sets authentication cookies and returns user information with tokens.
     *
     * @param {Request} request - The Express request object
     * @param {AuthUser} authUser - The authenticated user information (provided by LocalAuthGuard)
     * @param {SignInDto} _signInDto - The sign in credentials (not used directly as LocalAuthGuard handles validation)
     * @param {Response} response - The Express response object for setting cookies
     * @returns {Promise<AuthResponse>} Authentication response containing user info and tokens
     *
     * @example
     * ```typescript
     * // Client-side example
     * const response = await fetch('/auth/sign-in', {
     *   method: 'POST',
     *   headers: { 'Content-Type': 'application/json' },
     *   body: JSON.stringify({
     *     email: 'user@example.com',
     *     password: 'password123'
     *   })
     * });
     * const authData = await response.json();
     * ```
     *
     * ```json
     * // Result:
     * {
     *   "user": {
     *     "id": "123e4567-e89b-12d3-a456-426614174000",
     *     "email": "user@example.com",
     *     "firstName": "John",
     *     "lastName": "Doe",
     *     "isVerified": true,
     *     "signUpType": "local"
     *   },
     *   "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
     *   "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
     *   "accessTokenExpiresOn": "2025-06-24T15:12:45.123Z",
     *   "refreshTokenExpiresOn": "2025-07-24T10:12:45.123Z",
     *   "sessionId": "sess_abc123"
     * }
     * ```
     *
     * @see {@link AuthEndpoint.SIGN_IN} - The specific endpoint path segment for user authentication.
     * @see {@link AuthEndpoint} - Enum containing all authentication-specific endpoint paths.
     * @see {@link Endpoint.AUTH} - The default endpoint path constant used for this controller.
     */
    @Post(AuthEndpoint.SIGN_IN)
    @HttpCode(HttpSuccessStatus.OK)
    @UseGuards(LocalAuthGuard)
    signIn(
        @Req() request: Request,
        @CurrentUser() authUser: AuthUser,
        @Body() _signInDto: SignInDto,
        @Res({ passthrough: true }) response: Response,
    ): Promise<AuthResponse> {
        return this.authService.signIn(request, authUser, response);
    }

    /**
     * Initiates Google OAuth sign-in flow.
     *
     * This endpoint redirects the user to Google's authentication page.
     * The redirectUrl query parameter is used to determine where to redirect after successful authentication.
     *
     * @param {string} _redirectUrl - The URL to redirect to after successful authentication
     * @returns {Promise<void>} This method doesn't return any content as it redirects to Google
     *
     * @example
     * ```typescript
     * // Client-side example - typically used as a link in your frontend
     * <a href="/auth/google-sign-in?redirectUrl=http://your-app.com/dashboard">
     *     Sign in with Google
     * </a>
     * ```
     *
     * Note: Recommended approach is to use a browser popup or new tab to call this API instead of a full page redirect.
     * This allows smoother handling of the authentication flow and makes it easier to capture the callback response,
     * especially in single-page applications (SPAs) or when working with cross-origin redirects.
     *
     * @see {@link AuthEndpoint.GOOGLE_SIGN_IN} - The specific endpoint path segment for initiating Google OAuth flow.
     * @see {@link AuthEndpoint} - Enum containing all authentication-specific endpoint paths.
     * @see {@link Endpoint.AUTH} - The default endpoint path constant used for this controller.
     */
    @Get(AuthEndpoint.GOOGLE_SIGN_IN)
    @HttpCode(HttpSuccessStatus.OK)
    @UseGuards(GoogleAuthGuard)
    async googleSignIn(
        @Query("redirectUrl") _redirectUrl: string, // eslint-disable-line @typescript-eslint/no-unused-vars
    ): Promise<void> {
        /* skipped  */
    }

    /**
     * Handles the callback from Google OAuth authentication.
     *
     * This endpoint is called by Google after successful authentication.
     * It extracts the redirect URL from the state parameter and redirects the user
     * to that URL with the access token as a query parameter.
     *
     * @param {Response} response - The Express response object for redirection
     * @param {AuthUser} authUser - The authenticated user information (provided by GoogleAuthGuard)
     * @param {string} state - JSON string containing the redirectUrl
     * @returns {void} This method doesn't return any content as it redirects to the client application
     *
     * @throws {InternalServerErrorException} If there's an error processing the callback
     *
     * @example
     * ```typescript
     * // This endpoint is not called directly from client code
     * // It's called by Google's OAuth service after user authenticates
     * // The flow typically is:
     * // 1. User clicks "Sign In with Google" link (pointing to googleSignIn endpoint)
     * // 2. User authenticates on Google's site
     * // 3. Google redirects to this callback URL
     * // 4. This method redirects to the original application with the token
     * ```
     *
     * @see {@link AuthEndpoint.GOOGLE_CALLBACK} - The specific endpoint path segment for Google OAuth callback processing.
     * @see {@link AuthEndpoint} - Enum containing all authentication-specific endpoint paths.
     * @see {@link Endpoint.AUTH} - The default endpoint path constant used for this controller.
     */
    @Get(AuthEndpoint.GOOGLE_CALLBACK)
    @UseGuards(GoogleAuthGuard)
    googleCallback(@Res() response: Response, @AuthInfo() authUser: AuthUser, @Query("state") state: string): void {
        try {
            const { redirectUrl } = JSON.parse(state) as {
                redirectUrl: string;
            };
            response.redirect(`${redirectUrl}?token=${authUser.accessToken}`);
        } catch (error) {
            LoggerService.error(error);
            throw new InternalServerErrorException(AuthErrors.AUTH_500_SOCIAL_SIGN_IN_CALLBACK);
        }
    }

    /**
     * Gets a complete authentication response using an existing access token.
     *
     * This endpoint allows clients to retrieve a complete authentication response
     * using a previously issued JWT access token. It verifies the token,
     * retrieves the associated user information, generates new tokens,
     * and returns comprehensive authentication data.
     *
     * @param {Request} request - The Express request object
     * @param {Response} response - The Express response object for setting cookies
     * @param {GetAuthResponseDto} getAuthResponseDto - DTO containing the JWT access token
     * @param {string} getAuthResponseDto.accessToken - A valid JWT access token previously issued by this system
     * @returns {Promise<AuthResponse>} Authentication response containing  user info and tokens
     *
     * @example
     * ```typescript
     * // Client-side example - using a previously obtained JWT token
     * const response = await fetch('/auth/get-auth-response', {
     *   method: 'POST',
     *   headers: { 'Content-Type': 'application/json' },
     *   body: JSON.stringify({
     *     accessToken: 'previously-issued-jwt-token'
     *   })
     * });
     * const authData = await response.json();
     * ```
     *
     * ```json
     * // Result:
     * {
     *   "user": {
     *     "id": "123e4567-e89b-12d3-a456-426614174000",
     *     "email": "user@example.com",
     *     "firstName": "John",
     *     "lastName": "Doe",
     *     "isVerified": true,
     *     "signUpType": "google"
     *   },
     *   "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
     *   "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
     *   "accessTokenExpiresOn": "2025-06-24T15:12:45.123Z",
     *   "refreshTokenExpiresOn": "2025-07-24T10:12:45.123Z",
     *   "sessionId": "sess_abc123"
     * }
     * ```
     *
     * @see {@link AuthEndpoint.GET_AUTH_RESPONSE} - The specific endpoint path segment for retrieving authentication data.
     * @see {@link AuthEndpoint} - Enum containing all authentication-specific endpoint paths.
     * @see {@link Endpoint.AUTH} - The default endpoint path constant used for this controller.
     */
    @HttpCode(HttpSuccessStatus.OK)
    @Post(AuthEndpoint.GET_AUTH_RESPONSE)
    getAuthResponse(
        @Req() request: Request,
        @Res({ passthrough: true }) response: Response,
        @Body() { accessToken }: GetAuthResponseDto,
    ): Promise<AuthResponse> {
        return this.authService.getAuthResponse(request, accessToken, response);
    }

    /**
     * Refreshes the authentication tokens using a refresh token.
     *
     * This endpoint allows clients to obtain new access and refresh tokens
     * when their current access token expires, without requiring the user to log in again.
     *
     * @param {Request} request - The Express request object
     * @param {RefreshTokenDto} refreshTokenDto - DTO containing the refresh token
     * @param {Response} response - The Express response object for setting cookies
     * @returns {Promise<TokenResponse>} New access and refresh tokens
     *
     * @example
     * ```typescript
     * // Client-side example
     * const response = await fetch('/auth/refresh-token', {
     *   method: 'POST',
     *   headers: { 'Content-Type': 'application/json' },
     *   body: JSON.stringify({
     *     refreshToken: 'your-refresh-token'
     *   })
     * });
     * const tokens = await response.json();
     * // tokens contains new accessToken and refreshToken
     * ```
     *
     * @see {@link AuthEndpoint.REFRESH_TOKEN} - The specific endpoint path segment for token refreshing.
     * @see {@link AuthEndpoint} - Enum containing all authentication-specific endpoint paths.
     * @see {@link Endpoint.AUTH} - The default endpoint path constant used for this controller.
     */
    @Post(AuthEndpoint.REFRESH_TOKEN)
    @HttpCode(HttpSuccessStatus.OK)
    refreshTokens(
        @Req() request: Request,
        @Body() refreshTokenDto: RefreshTokenDto,
        @Res({ passthrough: true }) response: Response,
    ): Promise<TokenResponse> {
        return this.authService.refreshTokens(request, refreshTokenDto.refreshToken, response);
    }

    /**
     * Retrieves the currently authenticated user's information.
     *
     * This endpoint returns the user information for the currently authenticated user.
     * It requires a valid JWT token and is protected by the JwtAuthGuard.
     *
     * @param {Request} request - The Express request object
     * @param {AuthUser} authUser - The authenticated user information (provided by JwtAuthGuard)
     * @returns {Promise<User | null>} The current user's information or null if not found
     *
     * @example
     * ```typescript
     * // Client-side example
     * const response = await fetch('/auth/me', {
     *   method: 'GET',
     *   headers: {
     *     'Authorization': 'Bearer your-jwt-token'
     *   }
     * });
     * const user = await response.json();
     * ```
     *
     * ```json
     * // result:
     * {
     *   "id": "123e4567-e89b-12d3-a456-426614174000",
     *   "email": "user@example.com",
     *   "firstName": "John",
     *   "lastName": "Doe",
     *   "isVerified": true,
     *   "signUpType": "local"
     * }
     * ```
     *
     * @see {@link AuthEndpoint.ME} - The specific endpoint path segment for retrieving current user information.
     * @see {@link AuthEndpoint} - Enum containing all authentication-specific endpoint paths.
     * @see {@link Endpoint.AUTH} - The default endpoint path constant used for this controller.
     */
    @Get(AuthEndpoint.ME)
    @HttpCode(HttpSuccessStatus.OK)
    @UseGuards(JwtAuthGuard)
    getCurrentUser(@Req() request: Request, @CurrentUser() authUser: AuthUser): Promise<User | null> {
        return this.authService.getCurrentUser(request, authUser);
    }

    /**
     * Changes the password for the currently authenticated user.
     *
     * This endpoint allows an authenticated user to change their password.
     * It requires both the current password and the new password.
     *
     * @param {Request} request - The Express request object
     * @param {AuthUser} authUser - The authenticated user information (provided by JwtAuthGuard)
     * @param {UpdatePasswordDto} updatePasswordDto - DTO containing the current and new passwords
     * @returns {Promise<User>} The updated user information
     *
     * @example
     * ```typescript
     * // Client-side example
     * const response = await fetch('/auth/change-password', {
     *   method: 'POST',
     *   headers: {
     *     'Content-Type': 'application/json',
     *     'Authorization': 'Bearer your-jwt-token'
     *   },
     *   body: JSON.stringify({
     *     currentPassword: 'current-password',
     *     newPassword: 'new-password'
     *   })
     * });
     * ```
     *
     * ```json
     * // result:
     * {
     *   "id": "123e4567-e89b-12d3-a456-426614174000",
     *   "email": "user@example.com",
     *   "firstName": "John",
     *   "lastName": "Doe",
     *   "isVerified": true,
     *   "signUpType": "local"
     * }
     * ```
     * @see {@link AuthEndpoint.CHANGE_PASSWORD} - The specific endpoint path segment for changing user passwords.
     * @see {@link AuthEndpoint} - Enum containing all authentication-specific endpoint paths.
     * @see {@link Endpoint.AUTH} - The default endpoint path constant used for this controller.
     */
    @Post(AuthEndpoint.CHANGE_PASSWORD)
    @HttpCode(HttpSuccessStatus.OK)
    @UseGuards(JwtAuthGuard)
    changePassword(
        @Req() request: Request,
        @CurrentUser() authUser: AuthUser,
        @Body() updatePasswordDto: UpdatePasswordDto,
    ): Promise<User> {
        return this.authService.changePassword(request, authUser, updatePasswordDto);
    }

    /**
     * Resends the email verification link to the user.
     *
     * This endpoint allows users to request a new email verification link
     * if they didn't receive the original one or if it expired.
     *
     * @param {Request} request - The Express request object
     * @param {ResendEmailVerifyDto} resendEmailVerifyDto - DTO containing the email address
     * @returns {Promise<SuccessResponse>} Success response indicating the email was sent
     *
     * @example
     * ```typescript
     * // Client-side example
     * const response = await fetch('/auth/resend-email-verification', {
     *   method: 'POST',
     *   headers: { 'Content-Type': 'application/json' },
     *   body: JSON.stringify({
     *     email: 'user@example.com'
     *   })
     * });
     * const result = await response.json();
     * ```
     *
     * ```json
     * // result:
     * {
     *  "statusCode": 200,
     *  "code": "AUTH_200_EMAIL_VERIFICATION_SENT",
     *  "message": "Verification email sent successfully",
     * }
     * ```
     *
     * @see {@link AuthEndpoint.RESEND_EMAIL_VERIFICATION} - The specific endpoint path segment for resending verification emails.
     * @see {@link AuthEndpoint} - Enum containing all authentication-specific endpoint paths.
     * @see {@link Endpoint.AUTH} - The default endpoint path constant used for this controller.
     */
    @Post(AuthEndpoint.RESEND_EMAIL_VERIFICATION)
    @HttpCode(HttpSuccessStatus.OK)
    resendEmailVerification(
        @Req() request: Request,
        @Body() resendEmailVerifyDto: ResendEmailVerifyDto,
    ): Promise<SuccessResponse> {
        // TODO: Email expiration and related feature exploration
        return this.authService.resendEmailVerification(request, resendEmailVerifyDto);
    }

    /**
     * Verifies a user's email address using the verification token.
     *
     * This endpoint is accessed via a link sent to the user's email.
     * It verifies the token and redirects the user to a configured URL
     * with a query parameter indicating whether verification was successful.
     *
     * @param {Request} request - The Express request object
     * @param {Response} response - The Express response object for redirection
     * @param {EmailVerifyDto} emailVerifyDto - DTO containing the verification token
     * @returns {Promise<void>} This method doesn't return any content as it redirects to the configured URL
     *
     * @example
     * ```html
     * This endpoint is typically accessed via a link in an email:
     *
     * <a href="https://your-api.com/auth/verify-email?token=verification-token">
     *     Verify Email
     * </a>
     *
     * The user will be redirected to the configured URL:
     * https://your-app.com/email-verification?verified=true
     * ```
     *
     * @see {@link AuthEndpoint.VERIFY_EMAIL} - The specific endpoint path segment for email verification processing.
     * @see {@link AuthEndpoint} - Enum containing all authentication-specific endpoint paths.
     * @see {@link Endpoint.AUTH} - The default endpoint path constant used for this controller.
     */
    @Get(AuthEndpoint.VERIFY_EMAIL)
    @HttpCode(HttpSuccessStatus.OK)
    async verifyEmail(
        @Req() request: Request,
        @Res() response: Response,
        @Query() emailVerifyDto: EmailVerifyDto,
    ): Promise<void> {
        const redirectUrl =
            emailVerifyDto.redirectUrl &&
            this.options.allowedRedirectDomains?.length &&
            isValidRedirectUrl(emailVerifyDto.redirectUrl, this.options.allowedRedirectDomains)
                ? emailVerifyDto.redirectUrl
                : this.options.emailVerifyRedirect;

        const status = await this.authService.verifyEmail(request, emailVerifyDto);
        response.redirect(`${redirectUrl}?verified=${status}`);
    }

    /**
     * Initiates the password reset process for a user.
     *
     * This endpoint allows users to request a password reset by providing their email address.
     * If the email exists in the system, a password reset link will be sent to that email.
     *
     * @param {Request} request - The Express request object
     * @param {RequestResetDto} requestResetDto - DTO containing the email address
     * @returns {Promise<SuccessResponse>} Success response indicating the reset email was sent
     *
     * @example
     * ```typescript
     * // Client-side example
     * const response = await fetch('/auth/request-password-reset', {
     *   method: 'POST',
     *   headers: { 'Content-Type': 'application/json' },
     *   body: JSON.stringify({
     *     email: 'user@example.com'
     *   })
     * });
     * const result = await response.json();
     * ```
     *
     * ```json
     * // result:
     * {
     *   "statusCode": 200,
     *   "code": "AUTH_200_PASSWORD_RESET_EMAIL_SENT",
     *   "message": "Password reset email sent successfully",
     * }
     * ```
     *
     * @see {@link AuthEndpoint.REQUEST_PASSWORD_RESET} - The specific endpoint path segment for requesting password resets.
     * @see {@link AuthEndpoint} - Enum containing all authentication-specific endpoint paths.
     * @see {@link Endpoint.AUTH} - The default endpoint path constant used for this controller.
     */
    @Post(AuthEndpoint.REQUEST_PASSWORD_RESET)
    @HttpCode(HttpSuccessStatus.OK)
    requestPasswordReset(@Req() request: Request, @Body() requestResetDto: RequestResetDto): Promise<SuccessResponse> {
        return this.authService.requestPasswordReset(request, requestResetDto);
    }

    /**
     * Verifies a password reset token.
     *
     * This endpoint allows clients to verify if a password reset token is valid
     * before showing the password reset form to the user.
     *
     * @param {Request} request - The Express request object
     * @param {ResetPasswordTokenVerifyDto} verifyDto - DTO containing the reset token
     * @returns {Promise<SuccessResponse>} Success response indicating if the token is valid
     *
     * @example
     * ```typescript
     * // Client-side example
     * const response = await fetch('/auth/reset-password-verify', {
     *   method: 'POST',
     *   headers: { 'Content-Type': 'application/json' },
     *   body: JSON.stringify({
     *     token: 'reset-token-from-email'
     *   })
     * });
     * const result = await response.json();
     * ```
     *
     * ```json
     * // result:
     * {
     *   "statusCode": 200,
     *   "code": "AUTH_200_PASSWORD_RESET_TOKEN_VALID",
     *   "message": "Password reset token is valid",
     * }
     * ```
     *
     * @see {@link AuthEndpoint.RESET_PASSWORD_VERIFY} - The specific endpoint path segment for verifying password reset tokens.
     * @see {@link AuthEndpoint} - Enum containing all authentication-specific endpoint paths.
     * @see {@link Endpoint.AUTH} - The default endpoint path constant used for this controller.
     */
    @Post(AuthEndpoint.RESET_PASSWORD_VERIFY)
    @HttpCode(HttpSuccessStatus.OK)
    verifyResetPasswordToken(
        @Req() request: Request,
        @Body() verifyDto: ResetPasswordTokenVerifyDto,
    ): Promise<SuccessResponse> {
        return this.authService.verifyResetPasswordToken(request, verifyDto);
    }

    /**
     * Resets a user's password using a valid reset token.
     *
     * This endpoint allows users to set a new password after verifying their reset token.
     * It should be called after the token has been verified using the verifyResetPasswordToken endpoint.
     *
     * @param {Request} request - The Express request object
     * @param {ResetPasswordDto} resetPasswordDto - DTO containing the reset token and new password
     * @returns {Promise<SuccessResponse>} Success response indicating the password was reset
     *
     * @example
     * ```typescript
     * // Client-side example
     * const response = await fetch('/auth/reset-password', {
     *   method: 'POST',
     *   headers: { 'Content-Type': 'application/json' },
     *   body: JSON.stringify({
     *     token: 'reset-token-from-email',
     *     password: 'new-password'
     *   })
     * });
     * const result = await response.json();
     * ```
     *
     * ```json
     * // result:
     * {
     *  "statusCode": 200,
     *  "code": "AUTH_200_PASSWORD_RESET_SUCCESS",
     *  "message": "Password reset successfully"
     * }
     * ```
     *
     * @see {@link AuthEndpoint.RESET_PASSWORD} - The specific endpoint path segment for setting a new password after reset.
     * @see {@link AuthEndpoint} - Enum containing all authentication-specific endpoint paths.
     * @see {@link Endpoint.AUTH} - The default endpoint path constant used for this controller.
     */
    @Post(AuthEndpoint.RESET_PASSWORD)
    @HttpCode(HttpSuccessStatus.OK)
    resetPassword(@Req() request: Request, @Body() resetPasswordDto: ResetPasswordDto): Promise<SuccessResponse> {
        return this.authService.resetPassword(request, resetPasswordDto);
    }

    /**
     * Signs out the currently authenticated user.
     *
     * This endpoint invalidates the user's authentication tokens and clears authentication cookies.
     * It requires a valid JWT token and is protected by the JwtAuthGuard.
     *
     * @param {Request} request - The Express request object
     * @param {AuthUser} authUser - The authenticated user information (provided by JwtAuthGuard)
     * @param {Response} response - The Express response object for clearing cookies
     * @returns {Promise<SuccessResponse>} Success response indicating the user was signed out
     *
     * @example
     * ```typescript
     * // Client-side example
     * const response = await fetch('/auth/sign-out', {
     *   method: 'POST',
     *   headers: {
     *     'Authorization': 'Bearer your-jwt-token'
     *   }
     * });
     * const result = await response.json();
     *
     * // After this, the client should clear any stored tokens and redirect to the sign in page
     * localStorage.removeItem('accessToken');
     * localStorage.removeItem('refreshToken');
     * window.location.href = '/sign-in';
     * ```
     *
     * ```json
     * // result
     * {
     *   "statusCode": HttpSuccessStatus.OK,
     *   "code": AuthSuccessResponseCode.AUTH_200_SIGNED_OUT,
     *   "message": "Signed out successfully",
     * }
     * ```
     *
     * @see {@link AuthEndpoint.SIGN_OUT} - The specific endpoint path segment for user logout and token invalidation.
     * @see {@link AuthEndpoint} - Enum containing all authentication-specific endpoint paths.
     * @see {@link Endpoint.AUTH} - The default endpoint path constant used for this controller.
     */
    @Post(AuthEndpoint.SIGN_OUT)
    @HttpCode(HttpSuccessStatus.OK)
    @UseGuards(JwtAuthGuard)
    signOut(
        @Req() request: Request,
        @CurrentUser() authUser: AuthUser,
        @Res({ passthrough: true }) response: Response,
    ): Promise<SuccessResponse> {
        return this.authService.signOut(request, authUser, response);
    }
}
