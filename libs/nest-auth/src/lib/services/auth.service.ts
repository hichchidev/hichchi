// noinspection JSUnusedGlobalSymbols,ExceptionCaughtLocallyJS

import {
    BadRequestException,
    ForbiddenException,
    HttpException,
    Inject,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
    UnauthorizedException,
} from "@nestjs/common";
import { compareSync, hashSync } from "bcrypt";
import { JsonWebTokenError, TokenExpiredError } from "@nestjs/jwt";
import { LoggerService } from "@hichchi/nest-core";
import { Request, Response } from "express";
import { AUTH_OPTIONS, USER_SERVICE } from "../tokens";
import { AuthErrors, AuthSuccessResponses } from "../responses";
import { AuthField, AuthMethod } from "../enums";
import { UserCacheService } from "./user-cache.service";
import { JwtTokenService } from "./jwt-token.service";
import { v4 as uuid } from "uuid";
import { TokenVerifyService } from "./token-verify.service";
import { generateTokenUser } from "../utils";
import { AuthOptions, CacheUser, GoogleProfile, IJwtPayload, IUserService, TokenUser } from "../interfaces";
import {
    EmailVerifyDto,
    RequestResetDto,
    ResendEmailVerifyDto,
    ResetPasswordDto,
    ResetPasswordTokenVerifyDto,
    UpdatePasswordDto,
} from "../dtos";
import { randomBytes, randomInt } from "crypto";
import {
    AccessToken,
    AuthResponse,
    RefreshToken,
    RegisterBody,
    RegType,
    TokenResponse,
    User,
    VerifyToken,
} from "@hichchi/nest-connector/auth";
import { Errors, SuccessResponse, SuccessResponseDto } from "@hichchi/nest-connector";
import { ACCESS_TOKEN_COOKIE_NAME, REFRESH_TOKEN_COOKIE_NAME } from "../constants";

@Injectable()
export class AuthService {
    constructor(
        @Inject(AUTH_OPTIONS) private options: AuthOptions,
        @Inject(USER_SERVICE) private userService: IUserService,
        private readonly jwtTokenService: JwtTokenService,
        private readonly cacheService: UserCacheService,
        private readonly tokenVerifyService: TokenVerifyService,
    ) {}

    /**
     * Generate a random hash
     * @returns {VerifyToken} Random hash
     */
    public static generateVerifyToken(length = 48): VerifyToken {
        return randomBytes(length).toString("hex") as VerifyToken;
    }

    /**
     * Generate a random secure password
     * @param {number} length Length of the password
     * @returns {string} Random password
     */
    public static generateRandomPassword(length: number): string {
        const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const lowercase = "abcdefghijklmnopqrstuvwxyz";
        const numbers = "0123456789";
        const symbols = "!@#$%&*";

        const allCharacters = uppercase + lowercase + numbers + symbols;

        const getRandomSecureIndex = (max: number): number => {
            return randomInt(0, max);
        };

        let password = "";
        password += uppercase[getRandomSecureIndex(uppercase.length)];
        password += lowercase[getRandomSecureIndex(lowercase.length)];
        password += numbers[getRandomSecureIndex(numbers.length)];
        password += symbols[getRandomSecureIndex(symbols.length)];

        for (let i = password.length; i < length; i++) {
            password += allCharacters[getRandomSecureIndex(allCharacters.length)];
        }

        password = password
            .split("")
            .sort(() => 0.5 - Math.random())
            .join("");

        return password;
    }

    /**
     * Generate a password hash and salt
     * @param {string} password Password to hash
     * @returns {{salt: string, password: string}} Hashed password and salt
     */
    public static generateHash(password: string): string {
        return hashSync(password, 10);
    }

    /**
     * Verify password with hash and salt
     *
     * @param {string} password Password to verify
     * @param {string} hash Hashed password
     * @returns {boolean} Verification status
     */
    public static verifyHash(password: string, hash: string): boolean {
        return compareSync(password, hash);
    }

    /**
     * Authenticate a user
     * @param {Request} request Request object
     * @param {string} username Username or email
     * @param {string} password Password
     * @param {string} subdomain Subdomain
     * @returns {Promise<User>} Authenticated user
     */
    async authenticate(request: Request, username: string, password: string, subdomain?: string): Promise<TokenUser> {
        const INVALID_CREDS =
            this.options.authField === AuthField.EMAIL
                ? AuthErrors.AUTH_401_INVALID_EMAIL_PASSWORD
                : AuthErrors.AUTH_401_INVALID_USERNAME_PASSWORD;

        try {
            const user =
                this.options.authField === AuthField.USERNAME && this.userService.getUserByUsername
                    ? await this.userService.getUserByUsername(username, subdomain)
                    : this.options.authField === AuthField.EMAIL
                      ? await this.userService.getUserByEmail(username, subdomain)
                      : this.options.authField === AuthField.BOTH && this.userService.getUserByUsernameOrEmail
                        ? await this.userService.getUserByUsernameOrEmail(username, subdomain)
                        : Boolean(this.options.authField) && this.userService.getUserByAuthField
                          ? await this.userService.getUserByAuthField(username, subdomain)
                          : null;

            if (!user) {
                throw new UnauthorizedException(INVALID_CREDS);
            }

            if (!user.password) {
                throw new ForbiddenException(AuthErrors.AUTH_401_NOT_LOCAL);
            }

            if (!AuthService.verifyHash(password, user.password)) {
                throw new UnauthorizedException(INVALID_CREDS);
            }

            if (this.options.checkEmailVerified && !user.emailVerified) {
                throw new UnauthorizedException(AuthErrors.AUTH_401_EMAIL_NOT_VERIFIED);
            }

            // if (user.status === Status.PENDING) {
            //     return await Promise.reject(new ForbiddenException(AuthErrors.AUTH_403_PENDING));
            // }
            // if (user.status !== Status.ACTIVE) {
            //     return await Promise.reject(new UnauthorizedException(AuthErrors.AUTH_401_NOT_ACTIVE));
            // }

            const tokenResponse = this.generateTokens(user);

            const cacheUser = await this.updateCacheUser(user, tokenResponse);
            const tokenUser = generateTokenUser(cacheUser, tokenResponse.accessToken);

            await this.userService
                .onAuthenticate?.(request, tokenUser)
                .catch(callbackError =>
                    LoggerService.error("Error in onAuthenticate success callback:", callbackError),
                );

            return tokenUser;
        } catch (err) {
            await this.userService
                .onAuthenticate?.(request, undefined, err)
                .catch(callbackError => LoggerService.error("Error in onAuthenticate error callback:", callbackError));

            if (err instanceof HttpException) {
                throw err;
            }

            LoggerService.error(err);
            throw new UnauthorizedException(INVALID_CREDS);
        }
    }

    /**
     * Authenticate a user using JWT
     * @param {Request} request Request object
     * @param {IJwtPayload} payload JWT payload
     * @param {string} accessToken Access token
     * @param {string} _subdomain Subdomain
     * @returns {Promise<TokenUser>} Token user
     */
    async authenticateJWT(
        request: Request,
        payload: IJwtPayload,
        accessToken: AccessToken,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        _subdomain?: string | undefined,
    ): Promise<TokenUser> {
        try {
            this.jwtTokenService.verifyAccessToken(accessToken);

            const cacheUser = await this.cacheService.getUser(payload.sub);

            if (
                !cacheUser ||
                !cacheUser.sessions?.length ||
                !cacheUser.sessions?.find(session => session.accessToken === accessToken)
            ) {
                throw new UnauthorizedException(AuthErrors.AUTH_401_INVALID_TOKEN);
            }

            const tokenUser = generateTokenUser(cacheUser, accessToken);

            await this.userService
                .onAuthenticateJWT?.(request, tokenUser)
                .catch(callbackError =>
                    LoggerService.error("Error in onAuthenticateJWT success callback:", callbackError),
                );

            return tokenUser;
        } catch (err) {
            await this.userService
                .onAuthenticateJWT?.(request, undefined, err)
                .catch(callbackError =>
                    LoggerService.error("Error in onAuthenticateJWT error callback:", callbackError),
                );

            if (err instanceof TokenExpiredError) {
                throw new UnauthorizedException(AuthErrors.AUTH_401_EXPIRED_TOKEN);
            } else if (err instanceof JsonWebTokenError) {
                throw new UnauthorizedException(AuthErrors.AUTH_401_INVALID_TOKEN);
            } else if (err instanceof HttpException) {
                throw err;
            }
            throw new UnauthorizedException();
        }
    }

    /**
     * Authenticate a user using Google
     * @param {Request} request Request object
     * @param {GoogleProfile} profile Google profile
     * @param {string} redirectUrl Redirect URL
     * @returns {Promise<TokenUser>} Token user
     */
    async authenticateGoogle(request: Request, profile: GoogleProfile, redirectUrl?: string): Promise<TokenUser> {
        if (!("getUserByEmail" in this.userService)) {
            throw new InternalServerErrorException(AuthErrors.AUTH_501_NOT_IMPLEMENTED);
        }

        try {
            let user = await this.userService.getUserByEmail(profile.email);
            if (!user) {
                try {
                    user = (await this.userService.registerUser(
                        {
                            firstName: profile.given_name,
                            lastName: profile.family_name,
                            email: profile.email,
                        },
                        RegType.GOOGLE,
                        profile,
                    )) as User & { email: string };
                } catch (err) {
                    LoggerService.error(err);
                    throw new UnauthorizedException(AuthErrors.AUTH_500_REGISTER);
                }
            }

            const tokenResponse = this.generateTokens(user);
            const cacheUser = await this.updateCacheUser(user, tokenResponse, undefined, redirectUrl);
            const tokenUser = generateTokenUser(cacheUser, tokenResponse.accessToken);

            await this.userService
                .onAuthenticateGoogle?.(request, tokenUser)
                .catch(callbackError =>
                    LoggerService.error("Error in onAuthenticateGoogle success callback:", callbackError),
                );

            return tokenUser;
        } catch (err) {
            await this.userService
                .onAuthenticateGoogle?.(request, undefined, err)
                .catch(callbackError =>
                    LoggerService.error("Error in onAuthenticateGoogle error callback:", callbackError),
                );

            throw err;
        }
    }

    /**
     * Authenticate a user with token generated by social login
     * @returns {Promise<AuthResponse>} Auth response with tokens and user
     */
    async authenticateSocial(request: Request, accessToken: AccessToken, res: Response): Promise<AuthResponse> {
        const jwtPayload = this.jwtTokenService.verifyAccessToken(accessToken);

        let user = await this.userService.getUserById(jwtPayload.sub);
        if (!user) {
            return Promise.reject(new UnauthorizedException(AuthErrors.AUTH_401_SOCIAL_LOGIN));
        }

        const tokenResponse = this.generateTokens(user);

        const cacheUser = await this.updateCacheUser(user, tokenResponse);

        const tokenUser = generateTokenUser(cacheUser, accessToken);

        return this.signIn(request, tokenUser, res);
    }

    /**
     * Ger a user by token
     * @param {Request} request Request object
     * @param {AccessToken} token Token
     * @returns {Promise<User>} User entity
     */
    public async getUserByToken(request: Request, token: AccessToken): Promise<User | null>;

    /**
     * Ger a user by token
     * @param {Request} request Request object
     * @param {RefreshToken} token Token
     * @param {true} refresh Token
     * @returns {Promise<User>} User entity
     */
    public async getUserByToken(request: Request, token: RefreshToken, refresh: true): Promise<User | null>;

    /**
     * Ger a user by token
     * @param {Request} request Request object
     * @param {AccessToken|RefreshToken} token Token
     * @param {boolean} [refresh] Refresh flag or request object
     * @returns {Promise<User>} User entity
     */
    public async getUserByToken(
        request: Request,
        token: AccessToken | RefreshToken,
        refresh?: boolean,
    ): Promise<User | null> {
        try {
            const payload = refresh
                ? this.jwtTokenService.verifyRefreshToken(token as RefreshToken)
                : this.jwtTokenService.verifyAccessToken(token as AccessToken);
            const user = await this.userService.getUserById(payload.sub);
            if (!user) {
                return null;
            }

            await this.userService
                .onGetUserByToken?.(request, user.id)
                .catch(callbackError =>
                    LoggerService.error("Error in onGetUserByToken success callback:", callbackError),
                );

            return user;
        } catch (err) {
            await this.userService
                .onGetUserByToken?.(request, undefined, err)
                .catch(callbackError =>
                    LoggerService.error("Error in onGetUserByToken error callback:", callbackError),
                );

            LoggerService.error(err);
            return null;
        }
    }

    /**
     * Generate access and refresh tokens
     * @param {User} user User entity
     * @returns {TokenResponse} Token response
     */
    generateTokens(user: User): TokenResponse {
        const payload: IJwtPayload = { sub: user.id };

        const accessToken = this.jwtTokenService.createToken(payload);

        const refreshToken = this.jwtTokenService.createRefreshToken(payload);

        return {
            accessToken,
            refreshToken,
            accessTokenExpiresOn: this.jwtTokenService.getTokenExpiresOn(accessToken),
            refreshTokenExpiresOn: this.jwtTokenService.getTokenExpiresOn(refreshToken),
        };
    }

    /**
     * Update the cache user
     * @param {User} user User entity
     * @param {TokenResponse} tokenResponse Token response
     * @param {string} oldRefreshToken Old refresh token
     * @param {string} frontendUrl Redirect URL
     */
    async updateCacheUser(
        user: User,
        tokenResponse: TokenResponse,
        oldRefreshToken?: string,
        frontendUrl?: string,
    ): Promise<CacheUser> {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...rest } = this.options.viewDto ? new this.options.viewDto().formatDataSet(user) : user;
        const cacheUser: CacheUser = { ...rest, sessions: (await this.cacheService.getUser(user.id))?.sessions ?? [] };

        if (cacheUser.sessions.length) {
            if (oldRefreshToken) {
                cacheUser.sessions = cacheUser.sessions.filter(session => session.refreshToken !== oldRefreshToken);
            }
            cacheUser.sessions.push({
                sessionId: uuid(),
                accessToken: tokenResponse.accessToken,
                refreshToken: tokenResponse.refreshToken,
                frontendUrl,
            });
        } else {
            cacheUser.sessions = [
                {
                    sessionId: uuid(),
                    accessToken: tokenResponse.accessToken,
                    refreshToken: tokenResponse.refreshToken,
                    frontendUrl,
                },
            ];
        }

        await this.cacheService.setUser(cacheUser);

        return cacheUser;
    }

    /**
     * Set the auth cookies
     * @param {Response} response Response object
     * @param {TokenResponse} tokenResponse Token response
     */
    setAuthCookies(response: Response, tokenResponse: TokenResponse): void {
        if (this.options.authMethod === AuthMethod.COOKIE && this.options.cookies) {
            response.cookie(ACCESS_TOKEN_COOKIE_NAME, tokenResponse.accessToken, {
                maxAge: this.options.jwt.expiresIn * 1000,
                httpOnly: true,
                sameSite: this.options.cookies.sameSite,
                secure: this.options.cookies.secure,
                signed: true,
            });
            response.cookie(REFRESH_TOKEN_COOKIE_NAME, tokenResponse.refreshToken, {
                maxAge: this.options.jwt.refreshExpiresIn * 1000,
                httpOnly: true,
                sameSite: this.options.cookies.sameSite,
                secure: this.options.cookies.secure,
                signed: true,
            });
        }
    }

    /**
     * Register a new user
     * @param {Request} request Request object
     * @param {RegisterBody} registerDto Register DTO
     * @param {RegType} regType Registration type
     * @returns {Promise<User>} Registered user
     */
    async signUp(request: Request, registerDto: RegisterBody, regType: RegType.LOCAL): Promise<User> {
        try {
            const { password: rawPass, ...rest } = registerDto;
            const password = AuthService.generateHash(rawPass);
            const user = await this.userService.registerUser({ ...rest, password }, regType);
            await this.sendVerificationEmail(user);
            delete user.password;

            await this.userService
                .onRegister?.(request, user.id)
                .catch(callbackError => LoggerService.error("Error in onRegister success callback:", callbackError));

            return user;
        } catch (error: unknown) {
            await this.userService
                .onRegister?.(request, undefined, error)
                .catch(callbackError => LoggerService.error("Error in onRegister error callback:", callbackError));

            throw error;
        }
    }

    /**
     * Login a user
     * @param {Request} req Request object
     * @param {TokenUser} tokenUser Token user
     * @param {Response} res Response object
     * @returns {Promise<AuthResponse>} Auth response
     */
    async signIn(req: Request, tokenUser: TokenUser, res: Response): Promise<AuthResponse> {
        try {
            const user = await this.userService.getUserById(tokenUser.id);
            if (!user) {
                throw new NotFoundException(AuthErrors.AUTH_401_UNKNOWN);
            }

            const { sessionId, accessToken, refreshToken } = tokenUser;

            const tokenResponse: TokenResponse = {
                accessToken,
                refreshToken,
                accessTokenExpiresOn: this.jwtTokenService.getTokenExpiresOn(accessToken),
                refreshTokenExpiresOn: this.jwtTokenService.getTokenExpiresOn(refreshToken),
            };

            this.setAuthCookies(res, tokenResponse);

            await this.userService
                .onLogin?.(req, tokenUser as TokenUser)
                .catch(callbackError => LoggerService.error("Error in onLogin success callback:", callbackError));

            return {
                ...tokenResponse,
                sessionId,
                user: { ...user, password: undefined },
            };
        } catch (err) {
            await this.userService
                .onLogin?.(req, tokenUser, err as Error)
                .catch(callbackError => LoggerService.error("Error in onLogin error callback:", callbackError));
            throw err;
        }
    }

    /**
     * Get the current user
     * @param {Request} request Request object
     * @param {TokenUser} tokenUser Token user
     */
    async getCurrentUser(request: Request, tokenUser: TokenUser): Promise<User | null> {
        try {
            const user = await this.userService.getUserById(tokenUser.id);
            if (!user) {
                throw new NotFoundException(AuthErrors.AUTH_401_UNKNOWN);
            }

            await this.userService
                .onGetCurrentUser?.(request, tokenUser)
                .catch(callbackError =>
                    LoggerService.error("Error in onGetCurrentUser success callback:", callbackError),
                );

            return { ...user, password: undefined };
        } catch (err) {
            await this.userService
                .onGetCurrentUser?.(request, tokenUser, err as Error)
                .catch(callbackError =>
                    LoggerService.error("Error in onGetCurrentUser error callback:", callbackError),
                );
            throw err;
        }
    }

    /**
     * Refresh the tokens
     * @param {Request} request Request object
     * @param token Refresh token
     * @param response Response object
     * @returns {Promise<TokenResponse>} Token response
     */
    async refreshTokens(request: Request, token: RefreshToken, response: Response): Promise<TokenResponse> {
        try {
            const { sub } = this.jwtTokenService.verifyRefreshToken(token);

            const user = await this.userService.getUserById(sub);
            if (!user) {
                throw new UnauthorizedException(AuthErrors.AUTH_401_INVALID_REFRESH_TOKEN);
            }

            const tokenResponse: TokenResponse = this.generateTokens(user);

            const cacheUser = await this.updateCacheUser(user, tokenResponse, token);
            const tokenUser = generateTokenUser(cacheUser, tokenResponse.accessToken);
            this.setAuthCookies(response, tokenResponse);

            await this.userService
                .onRefreshTokens?.(request, tokenUser)
                .catch(callbackError => LoggerService.error("Error in onRefreshTokens callback:", callbackError));

            return tokenResponse;
        } catch (err) {
            if (err instanceof TokenExpiredError) {
                throw new UnauthorizedException(AuthErrors.AUTH_401_EXPIRED_REFRESH_TOKEN);
            } else if (err instanceof JsonWebTokenError) {
                throw new UnauthorizedException(AuthErrors.AUTH_401_INVALID_REFRESH_TOKEN);
            } else if (err instanceof HttpException) {
                throw err;
            }
            throw new UnauthorizedException();
        }
    }

    /**
     * Change user password
     * @param {Request} request Request object
     * @param {TokenUser} tokenUser Token user
     * @param {UpdatePasswordDto} updatePasswordDto Update password DTO
     * @returns {Promise<User>} Updated user
     */
    async changePassword(request: Request, tokenUser: TokenUser, updatePasswordDto: UpdatePasswordDto): Promise<User> {
        try {
            const user = await this.userService.getUserById(tokenUser.id);
            if (!user) {
                throw new UnauthorizedException(AuthErrors.AUTH_401_UNKNOWN);
            }

            if (user?.password) {
                const { oldPassword, newPassword } = updatePasswordDto;
                if (AuthService.verifyHash(oldPassword, user.password)) {
                    const password = AuthService.generateHash(newPassword);
                    const user = await this.userService.updateUserById(tokenUser.id, { password }, {
                        id: tokenUser.id,
                    } as User);
                    delete user.password;

                    // Success callback with error logging
                    await this.userService
                        .onChangePassword?.(request, tokenUser)
                        .catch(callbackError =>
                            LoggerService.error("Error in onChangePassword success callback:", callbackError),
                        );
                    return user;
                }

                throw new NotFoundException(AuthErrors.AUTH_401_INVALID_PASSWORD);
            }

            throw new ForbiddenException(AuthErrors.AUTH_401_NOT_LOCAL);
        } catch (err) {
            await this.userService
                .onChangePassword?.(request, tokenUser, err as Error)
                .catch(callbackError =>
                    LoggerService.error("Error in onChangePassword error callback:", callbackError),
                );
            throw err;
        }
    }

    /**
     * Send a verification email
     * @param {User} user User entity
     */
    async sendVerificationEmail(user: User): Promise<void> {
        if (!this.userService.sendVerificationEmail) {
            throw new NotFoundException(Errors.E_404_NOT_IMPLEMENTED);
        }

        try {
            const token = AuthService.generateVerifyToken(16);
            await this.tokenVerifyService.saveEmailVerifyToken(user.id, token);
            await this.userService.sendVerificationEmail(user.id, token);
        } catch (err) {
            if (err instanceof HttpException) {
                throw err;
            }
            throw new InternalServerErrorException(AuthErrors.AUTH_500_SEND_EMAIL_VERIFICATION);
        }
    }

    /**
     * Resend a verification email
     * @param {Request} request Request object
     * @param {ResendEmailVerifyDto} resendEmailVerifyDto Resend email verify DTO
     * @returns {Promise<SuccessResponse>} Success response
     */
    async resendEmailVerification(
        request: Request,
        resendEmailVerifyDto: ResendEmailVerifyDto,
    ): Promise<SuccessResponse> {
        if (!("getUserByEmail" in this.userService) || !this.userService.sendVerificationEmail) {
            throw new NotFoundException(Errors.E_404_NOT_IMPLEMENTED);
        }

        const user = await this.userService.getUserByEmail(resendEmailVerifyDto.email);
        if (user) {
            if (user.emailVerified) {
                throw new BadRequestException(AuthErrors.AUTH_400_EMAIL_ALREADY_VERIFIED);
            }
            await this.sendVerificationEmail(user);

            await this.userService
                .onResendVerificationEmail?.(request, user.id)
                .catch(callbackError =>
                    LoggerService.error("Error in onResendVerificationEmail callback:", callbackError),
                );
            return new SuccessResponseDto(AuthSuccessResponses.AUTH_200_EMAIL_VERIFICATION_SENT);
        }

        throw new NotFoundException(AuthErrors.AUTH_404_EMAIL);
    }

    /**
     * Verify an account
     * @param {Request} request Request object
     * @param {EmailVerifyDto} emailVerifyDto Email verify DTO
     */
    async verifyEmail(request: Request, emailVerifyDto: EmailVerifyDto): Promise<SuccessResponse> {
        if (!this.userService.sendVerificationEmail) {
            throw new NotFoundException(Errors.E_404_NOT_IMPLEMENTED);
        }

        try {
            const userId = await this.tokenVerifyService.getUserIdByEmailVerifyToken(emailVerifyDto.token);
            if (userId) {
                await this.userService.updateUserById(userId, { emailVerified: true }, {
                    id: userId,
                } as User);
                await this.tokenVerifyService.clearEmailVerifyTokenByUserId(userId);

                // Success callback with error logging
                await this.userService
                    .onVerifyEmail?.(request, userId, true)
                    .catch(callbackError =>
                        LoggerService.error("Error in onVerifyEmail success callback:", callbackError),
                    );

                return new SuccessResponseDto(AuthSuccessResponses.AUTH_201_EMAIL_VERIFIED);
            }
            throw new NotFoundException(AuthErrors.AUTH_404_EMAIL);
        } catch (err) {
            if (err instanceof HttpException) {
                throw err;
            }
            throw new InternalServerErrorException(AuthErrors.AUTH_500_VERIFY_EMAIL);
        }
    }

    /**
     * Request password reset email
     * @param {Request} request Request object
     * @param {RequestResetDto} requestResetDto Request reset DTO
     * @returns {Promise<SuccessResponse>} Success response
     */
    async requestPasswordReset(request: Request, requestResetDto: RequestResetDto): Promise<SuccessResponse> {
        if (!("getUserByEmail" in this.userService) || !this.userService.sendPasswordResetEmail) {
            throw new NotFoundException(Errors.E_404_NOT_IMPLEMENTED);
        }

        try {
            const user = await this.userService.getUserByEmail(requestResetDto.email);
            if (!user) {
                throw new NotFoundException(AuthErrors.AUTH_404_EMAIL);
            }

            if (!user.email) {
                throw new InternalServerErrorException(AuthErrors.AUTH_500);
            }

            const token = AuthService.generateVerifyToken(16);
            const setToken = await this.tokenVerifyService.savePasswordResetToken(user.id, token);
            const emailSent = await this.userService.sendPasswordResetEmail(user.email, token);

            if (setToken && emailSent) {
                // Success callback with error logging
                await this.userService
                    .onRequestPasswordReset?.(request, user.id)
                    .catch(callbackError =>
                        LoggerService.error("Error in onRequestPasswordReset callback:", callbackError),
                    );
                return new SuccessResponseDto("Password reset email sent successfully");
            }

            throw new InternalServerErrorException(AuthErrors.AUTH_500_REQUEST_PASSWORD_RESET);
        } catch (err) {
            if (err instanceof HttpException) {
                throw err;
            }
            throw new InternalServerErrorException(AuthErrors.AUTH_500_REQUEST_PASSWORD_RESET);
        }
    }

    /**
     * Verify a password reset token
     * @param {Request} request Request object
     * @param {ResetPasswordTokenVerifyDto} verifyDto Reset password token verify DTO
     * @returns {Promise<SuccessResponse>} Success response
     */
    async verifyResetPasswordToken(request: Request, verifyDto: ResetPasswordTokenVerifyDto): Promise<SuccessResponse> {
        if (!("getUserByEmail" in this.userService) || !this.userService.sendPasswordResetEmail) {
            throw new NotFoundException(Errors.E_404_NOT_IMPLEMENTED);
        }

        const userId = await this.tokenVerifyService.getUserIdByPasswordResetToken(verifyDto.token);
        if (userId) {
            await this.userService
                .onVerifyResetPasswordToken?.(request, userId)
                .catch(callbackError =>
                    LoggerService.error("Error in onVerifyResetPasswordToken callback:", callbackError),
                );
            return new SuccessResponseDto("Valid password reset token");
        }

        throw new NotFoundException(AuthErrors.AUTH_401_EXPIRED_OR_INVALID_PASSWORD_RESET_TOKEN);
    }

    /**
     * Reset a user password
     * @param {Request} request Request object
     * @param {ResetPasswordDto} resetPasswordDto Reset password DTO
     * @returns {Promise<SuccessResponse>} Success response
     */
    async resetPassword(request: Request, resetPasswordDto: ResetPasswordDto): Promise<SuccessResponse> {
        if (!("getUserByEmail" in this.userService) || !this.userService.sendPasswordResetEmail) {
            throw new NotFoundException(Errors.E_404_NOT_IMPLEMENTED);
        }

        try {
            const { token, password } = resetPasswordDto;
            const userId = await this.tokenVerifyService.getUserIdByPasswordResetToken(token);
            if (!userId) {
                throw new NotFoundException(AuthErrors.AUTH_401_EXPIRED_OR_INVALID_PASSWORD_RESET_TOKEN);
            }

            const hash = AuthService.generateHash(password);
            const user = await this.userService.updateUserById(userId, { password: hash }, {
                id: userId,
            } as User);

            if (!user) {
                throw new NotFoundException(AuthErrors.AUTH_500_PASSWORD_RESET);
            }

            await this.tokenVerifyService.clearPasswordResetTokenByUserId(userId);

            await this.userService
                .onResetPassword?.(request, userId)
                .catch(callbackError => LoggerService.error("Error in onResetPassword callback:", callbackError));

            return new SuccessResponseDto("Password reset successfully");
        } catch (err) {
            if (err instanceof HttpException) {
                throw err;
            }

            throw new NotFoundException(AuthErrors.AUTH_500_PASSWORD_RESET);
        }
    }

    /**
     * Logout a user
     * @param {Request} request Request object
     * @param {TokenUser} tokenUser Token user
     * @param {Response} response Response object
     * @returns {Promise<SuccessResponse>} Success response
     */
    async signOut(request: Request, tokenUser: TokenUser, response: Response): Promise<SuccessResponse> {
        try {
            if (this.options.authMethod === AuthMethod.COOKIE && this.options.cookies) {
                response.cookie(ACCESS_TOKEN_COOKIE_NAME, "", {
                    maxAge: 0,
                    httpOnly: true,
                    sameSite: this.options.cookies.sameSite,
                    secure: this.options.cookies.secure,
                    signed: true,
                });
                response.cookie(REFRESH_TOKEN_COOKIE_NAME, "", {
                    maxAge: 0,
                    httpOnly: true,
                    sameSite: this.options.cookies.sameSite,
                    secure: this.options.cookies.secure,
                    signed: true,
                });
            }

            const cacheUser = await this.cacheService.getUser(tokenUser.id);
            if (cacheUser && (cacheUser?.sessions?.length || 0) > 1) {
                cacheUser.sessions = cacheUser.sessions.filter(
                    session => session.accessToken !== tokenUser.accessToken,
                );
                if (cacheUser.sessions.length) {
                    cacheUser.sessions = cacheUser.sessions.filter(session => {
                        try {
                            this.jwtTokenService.verifyRefreshToken(session.refreshToken);
                            return true;
                        } catch {
                            return false;
                        }
                    });
                }
                await this.cacheService.setUser(cacheUser);
            } else {
                await this.cacheService.clearUser(tokenUser.id);
            }

            await this.userService
                .onLogout?.(request, tokenUser)
                .catch(callbackError => LoggerService.error("Error in onLogout success callback:", callbackError));

            return new SuccessResponseDto("Successfully logged out");
        } catch (err) {
            await this.userService
                .onLogout?.(request, tokenUser, err as Error)
                .catch(callbackError => LoggerService.error("Error in onLogout error callback:", callbackError));
            throw err;
        }
    }
}
