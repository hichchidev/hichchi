import {
    Body,
    Controller,
    ForbiddenException,
    Get,
    HttpCode,
    Inject,
    Post,
    Query,
    Req,
    Res,
    UseGuards,
} from "@nestjs/common";
import { SuccessResponse } from "@hichchi/nest-core";
import { Request, Response } from "express";
import { AuthService } from "../services";
import { AUTH_ENDPOINT, AUTH_OPTIONS } from "../tokens";
import { AuthOptions, AuthResponse, IAuthUserEntity, IRegisterDto, TokenResponse } from "../interfaces";
import { GoogleAuthGuard, JwtAuthGuard, LocalAuthGuard } from "../guards";
import { OverrideRegisterDtoPipe } from "../pipes";
import { CurrentUser } from "../decorators";
import { TokenUser } from "../types";
import { AuthErrors } from "../responses";
import { RegType } from "../enums";
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

@Controller(AUTH_ENDPOINT)
export class AuthController {
    constructor(
        @Inject(AUTH_OPTIONS) private options: AuthOptions,
        private readonly authService: AuthService,
    ) {}

    @Post("register")
    @HttpCode(201)
    async register(@Req() req: Request, @Body(OverrideRegisterDtoPipe) dto: IRegisterDto): Promise<IAuthUserEntity> {
        if (this.options.disableRegistration) {
            throw new ForbiddenException(AuthErrors.USER_403_REGISTER);
        }
        return await this.authService.register(req, dto, RegType.LOCAL);
    }

    @Post("login")
    @HttpCode(200)
    @UseGuards(LocalAuthGuard)
    async login(
        @Req() req: Request,
        @CurrentUser() tokenUser: TokenUser,
        @Body() _loginDto: LoginDto,
        @Res({ passthrough: true }) response: Response,
    ): Promise<AuthResponse> {
        return await this.authService.login(req, tokenUser, response);
    }

    @Get("google-login")
    @HttpCode(200)
    @UseGuards(GoogleAuthGuard)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-empty-function,@typescript-eslint/no-empty-function
    async googleLogin(@Query("redirectUrl") _redirectUrl: string): Promise<void> {}

    @Get("google-callback")
    @UseGuards(GoogleAuthGuard)
    googleCallback(@Res() res: Response, @CurrentUser() tokenUser: TokenUser, @Query("state") state: string): void {
        const { redirectUrl } = JSON.parse(state);
        res.redirect(`${redirectUrl}?token=${tokenUser.accessToken}`);
    }

    @Post("refresh-token")
    @HttpCode(200)
    refreshTokens(
        @Req() req: Request,
        @Body() refreshTokenDto: RefreshTokenDto,
        @Res({ passthrough: true }) response: Response,
    ): Promise<TokenResponse> {
        return this.authService.refreshTokens(req, refreshTokenDto.refreshToken, response);
    }

    @Get("me")
    @HttpCode(200)
    @UseGuards(JwtAuthGuard)
    async getCurrentUser(@Req() req: Request, @CurrentUser() tokenUser: TokenUser): Promise<IAuthUserEntity | null> {
        return await this.authService.getCurrentUser(req, tokenUser);
    }

    @Post("change-password")
    @HttpCode(200)
    @UseGuards(JwtAuthGuard)
    changePassword(
        @Req() req: Request,
        @CurrentUser() tokenUser: TokenUser,
        @Body() updatePasswordDto: UpdatePasswordDto,
    ): Promise<IAuthUserEntity> {
        return this.authService.changePassword(req, tokenUser, updatePasswordDto);
    }

    @Post("resend-email-verify")
    @HttpCode(200)
    resendEmailVerification(
        @Req() req: Request,
        @Body() resendEmailVerifyDto: ResendEmailVerifyDto,
    ): Promise<SuccessResponse> {
        return this.authService.resendEmailVerification(req, resendEmailVerifyDto);
    }

    @Get("verify-email")
    @HttpCode(200)
    async verifyEmail(
        @Req() req: Request,
        @Res() res: Response,
        @Query() emailVerifyDto: EmailVerifyDto,
    ): Promise<void> {
        const verified = await this.authService.verifyEmail(req, emailVerifyDto);
        res.redirect(`${this.options.emailVerifyRedirect}?verified=${verified}`);
    }

    @Post("request-password-reset")
    @HttpCode(200)
    requestPasswordReset(@Req() req: Request, @Body() requestResetDto: RequestResetDto): Promise<SuccessResponse> {
        return this.authService.requestPasswordReset(req, requestResetDto);
    }

    @Post("reset-password-verify")
    @HttpCode(200)
    verifyResetPasswordToken(
        @Req() req: Request,
        @Body() verifyDto: ResetPasswordTokenVerifyDto,
    ): Promise<SuccessResponse> {
        return this.authService.verifyResetPasswordToken(req, verifyDto);
    }

    @Post("reset-password")
    @HttpCode(200)
    resetPassword(@Req() req: Request, @Body() resetPasswordDto: ResetPasswordDto): Promise<SuccessResponse> {
        return this.authService.resetPassword(req, resetPasswordDto);
    }

    @Post("logout")
    @HttpCode(200)
    @UseGuards(JwtAuthGuard)
    async logout(
        @Req() req: Request,
        @CurrentUser() tokenUser: TokenUser,
        @Res({ passthrough: true }) response: Response,
    ): Promise<SuccessResponse> {
        return await this.authService.logout(req, tokenUser, response);
    }
}
