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
import {
    AuthEndpoint,
    AuthErrors,
    AuthResponse,
    RegisterBody,
    RegType,
    TokenResponse,
    User,
} from "@hichchi/nest-connector/auth";
import { Request, Response } from "express";
import { AuthService } from "../services";
import { AUTH_OPTIONS } from "../tokens";
import { AuthOptions, TokenUser } from "../interfaces";
import { GoogleAuthGuard, JwtAuthGuard, LocalAuthGuard } from "../guards";
import { OverrideRegisterDtoPipe } from "../pipes";
import { CurrentUser } from "../decorators";
import {
    EmailVerifyDto,
    LoginDto,
    RefreshTokenDto,
    RequestResetDto,
    ResendEmailVerifyDto,
    ResetPasswordDto,
    ResetPasswordTokenVerifyDto,
    UpdatePasswordDto,
} from "../dtos";
import { Endpoint, HttpSuccessStatus, SuccessResponse } from "@hichchi/nest-connector";
import { AuthenticateSocialDto } from "../dtos/authenticate-social.dto";
import { LoggerService } from "@hichchi/nest-core";
import { AuthInfo } from "../decorators/auth-info.decorator";

@Controller(Endpoint.AUTH)
export class AuthController {
    constructor(
        @Inject(AUTH_OPTIONS) private options: AuthOptions,
        private readonly authService: AuthService,
    ) {}

    @Post(AuthEndpoint.SIGN_UP)
    @HttpCode(HttpSuccessStatus.CREATED)
    signUp(@Req() req: Request, @Body(OverrideRegisterDtoPipe) dto: RegisterBody): Promise<User> {
        if (this.options.disableRegistration) {
            throw new ForbiddenException(AuthErrors.USER_403_REGISTER);
        }
        return this.authService.signUp(req, dto, RegType.LOCAL);
    }

    @Post(AuthEndpoint.SIGN_IN)
    @HttpCode(HttpSuccessStatus.OK)
    @UseGuards(LocalAuthGuard)
    signIn(
        @Req() req: Request,
        @CurrentUser() tokenUser: TokenUser,
        @Body() _loginDto: LoginDto,
        @Res({ passthrough: true }) response: Response,
    ): Promise<AuthResponse> {
        return this.authService.signIn(req, tokenUser, response);
    }

    @Get(AuthEndpoint.GOOGLE_SIGN_IN)
    @HttpCode(HttpSuccessStatus.OK)
    @UseGuards(GoogleAuthGuard)
    // eslint-disable-next-line no-empty-function,@typescript-eslint/no-empty-function,@typescript-eslint/no-unused-vars
    async googleLogin(@Query("redirectUrl") _redirectUrl: string): Promise<void> {}

    @Get(AuthEndpoint.GOOGLE_CALLBACK)
    @UseGuards(GoogleAuthGuard)
    googleCallback(@Res() res: Response, @AuthInfo() tokenUser: TokenUser, @Query("state") state: string): void {
        try {
            const { redirectUrl } = JSON.parse(state) as {
                redirectUrl: string;
            };
            res.redirect(`${redirectUrl}?token=${tokenUser.accessToken}`);
        } catch (error) {
            LoggerService.error(error);
            throw new InternalServerErrorException(AuthErrors.AUTH_500_SOCIAL_LOGIN_CALLBACK);
        }
    }

    @HttpCode(HttpSuccessStatus.OK)
    @Post(AuthEndpoint.AUTHENTICATE_SOCIAL)
    authenticateSocial(
        @Req() req: Request,
        @Res({ passthrough: true }) res: Response,
        @Body() { accessToken }: AuthenticateSocialDto,
    ): Promise<AuthResponse> {
        return this.authService.authenticateSocial(req, accessToken, res);
    }

    @Post(AuthEndpoint.REFRESH_TOKEN)
    @HttpCode(HttpSuccessStatus.OK)
    refreshTokens(
        @Req() req: Request,
        @Body() refreshTokenDto: RefreshTokenDto,
        @Res({ passthrough: true }) response: Response,
    ): Promise<TokenResponse> {
        return this.authService.refreshTokens(req, refreshTokenDto.refreshToken, response);
    }

    @Get(AuthEndpoint.ME)
    @HttpCode(HttpSuccessStatus.OK)
    @UseGuards(JwtAuthGuard)
    getCurrentUser(@Req() req: Request, @CurrentUser() tokenUser: TokenUser): Promise<User | null> {
        return this.authService.getCurrentUser(req, tokenUser);
    }

    @Post(AuthEndpoint.CHANGE_PASSWORD)
    @HttpCode(HttpSuccessStatus.OK)
    @UseGuards(JwtAuthGuard)
    changePassword(
        @Req() req: Request,
        @CurrentUser() tokenUser: TokenUser,
        @Body() updatePasswordDto: UpdatePasswordDto,
    ): Promise<User> {
        return this.authService.changePassword(req, tokenUser, updatePasswordDto);
    }

    @Post(AuthEndpoint.RESEND_EMAIL_VERIFICATION)
    @HttpCode(HttpSuccessStatus.OK)
    resendEmailVerification(
        @Req() req: Request,
        @Body() resendEmailVerifyDto: ResendEmailVerifyDto,
    ): Promise<SuccessResponse> {
        return this.authService.resendEmailVerification(req, resendEmailVerifyDto);
    }

    @Get(AuthEndpoint.VERIFY_EMAIL)
    @HttpCode(HttpSuccessStatus.OK)
    async verifyEmail(
        @Req() req: Request,
        @Res() res: Response,
        @Query() emailVerifyDto: EmailVerifyDto,
    ): Promise<void> {
        const verified = await this.authService.verifyEmail(req, emailVerifyDto);
        res.redirect(`${this.options.emailVerifyRedirect}?verified=${verified}`);
    }

    @Post(AuthEndpoint.REQUEST_PASSWORD_RESET)
    @HttpCode(HttpSuccessStatus.OK)
    requestPasswordReset(@Req() req: Request, @Body() requestResetDto: RequestResetDto): Promise<SuccessResponse> {
        return this.authService.requestPasswordReset(req, requestResetDto);
    }

    @Post(AuthEndpoint.RESET_PASSWORD_VERIFY)
    @HttpCode(HttpSuccessStatus.OK)
    verifyResetPasswordToken(
        @Req() req: Request,
        @Body() verifyDto: ResetPasswordTokenVerifyDto,
    ): Promise<SuccessResponse> {
        return this.authService.verifyResetPasswordToken(req, verifyDto);
    }

    @Post(AuthEndpoint.RESET_PASSWORD)
    @HttpCode(HttpSuccessStatus.OK)
    resetPassword(@Req() req: Request, @Body() resetPasswordDto: ResetPasswordDto): Promise<SuccessResponse> {
        return this.authService.resetPassword(req, resetPasswordDto);
    }

    @Post(AuthEndpoint.SIGN_OUT)
    @HttpCode(HttpSuccessStatus.OK)
    @UseGuards(JwtAuthGuard)
    signOut(
        @Req() req: Request,
        @CurrentUser() tokenUser: TokenUser,
        @Res({ passthrough: true }) response: Response,
    ): Promise<SuccessResponse> {
        return this.authService.signOut(req, tokenUser, response);
    }
}
