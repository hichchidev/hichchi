// noinspection JSUnusedGlobalSymbols,JSUnusedLocalSymbols,ExceptionCaughtLocallyJS

import { ExecutionContext, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ExtractJwt } from "passport-jwt";
import { AuthOptions, CacheUser } from "../interfaces";
import { AUTH_OPTIONS } from "../tokens";
import { AuthService, UserCacheService } from "../services";
import { cookieExtractor } from "../extractors";
import { AuthMethod } from "../enums";
import { v4 as uuid } from "uuid";
import { LoggerService } from "@hichchi/nest-core";
import { AuthErrors, AuthStrategy, RefreshToken, User } from "@hichchi/nest-connector/auth";
import { Request, Response } from "express";
import { SECOND_IN_MS } from "@hichchi/nest-connector";
import { ACCESS_TOKEN_COOKIE_NAME, REFRESH_TOKEN_COOKIE_NAME } from "../constants";

/**
 * Guard for JWT authentication.
 *
 * This guard extends Passport's AuthGuard for the JWT strategy and handles
 * token-based authentication. It supports both cookie-based and header-based
 * authentication methods, and includes token refresh functionality.
 *
 * When using cookie-based authentication, it will automatically refresh
 * expired access tokens using the refresh token if available.
 *
 * @example
 * ```typescript
 * // In a controller
 * @UseGuards(JwtAuthGuard)
 * @Get('profile')
 * getProfile(@CurrentUser() user: AuthUser) {
 *   return user;
 * }
 * ```
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard(AuthStrategy.JWT) {
    /**
     * Creates an instance of JwtAuthGuard.
     *
     * @param {AuthOptions} options - The authentication options injected from `AUTH_OPTIONS` token
     * @param {AuthService} authService - The authentication service for user verification
     * @param {UserCacheService} cacheService - The cache service for storing user sessions
     */
    constructor(
        @Inject(AUTH_OPTIONS) private readonly options: AuthOptions,
        private readonly authService: AuthService,
        private readonly cacheService: UserCacheService,
    ) {
        super();
    }

    /**
     * Determines if the current request is allowed to proceed.
     *
     * This method extracts the JWT token from either cookies or the Authorization header,
     * validates it, and handles token refresh if needed. If the access token is expired
     * but a valid refresh token is available, it will generate new tokens.
     *
     * @param {ExecutionContext} context - The execution context
     * @returns {Promise<boolean>} A promise that resolves to true if the request is authorized
     *
     * @throws {UnauthorizedException} If the user is not logged in or the token is invalid
     */
    override async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<Request>();
        const response = context.switchToHttp().getResponse<Response>();

        try {
            const accessToken =
                this.options.authMethod === AuthMethod.COOKIE
                    ? ExtractJwt.fromExtractors([cookieExtractor])(request)
                    : ExtractJwt.fromAuthHeaderAsBearerToken()(request);

            if (accessToken) {
                return await this.activate(context);
            }

            if (this.options.authMethod === AuthMethod.COOKIE && this.options.cookies) {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                const refreshToken = request.signedCookies[REFRESH_TOKEN_COOKIE_NAME] as RefreshToken | undefined;
                if (!refreshToken) {
                    throw new UnauthorizedException(AuthErrors.AUTH_401_NOT_LOGGED_IN);
                }

                const user = await this.authService.getUserByToken(request, refreshToken, true);
                if (!user) {
                    throw new UnauthorizedException(AuthErrors.AUTH_401_INVALID_REFRESH_TOKEN);
                }

                const tokens = this.authService.generateTokens(user);

                const cacheUser: CacheUser = (await this.cacheService.getUser(user.id)) ?? {
                    ...user,
                    sessions: [],
                };

                cacheUser.sessions = cacheUser.sessions.filter(session => session.refreshToken !== refreshToken);
                cacheUser.sessions.push({
                    sessionId: uuid(),
                    accessToken: tokens.accessToken,
                    refreshToken: tokens.refreshToken,
                });

                await this.cacheService.setUser(cacheUser);

                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                request.signedCookies[ACCESS_TOKEN_COOKIE_NAME] = tokens.accessToken;

                response.cookie(ACCESS_TOKEN_COOKIE_NAME, tokens.refreshToken, {
                    maxAge: Number(this.options.jwt.expiresIn) * SECOND_IN_MS,
                    httpOnly: false,
                    sameSite: this.options.cookies.sameSite,
                    secure: this.options.cookies.secure,
                    signed: true,
                });
                response.cookie(REFRESH_TOKEN_COOKIE_NAME, tokens.refreshToken, {
                    maxAge: Number(this.options.jwt.refreshExpiresIn) * SECOND_IN_MS,
                    httpOnly: false,
                    sameSite: this.options.cookies.sameSite,
                    secure: this.options.cookies.secure,
                    signed: true,
                });

                return await this.activate(context);
            }

            throw new UnauthorizedException(AuthErrors.AUTH_401_NOT_LOGGED_IN);
        } catch (err) {
            if (this.options.authMethod === AuthMethod.COOKIE) {
                response.clearCookie(ACCESS_TOKEN_COOKIE_NAME);
                response.clearCookie(REFRESH_TOKEN_COOKIE_NAME);
            }

            if (!(err instanceof UnauthorizedException)) {
                throw err;
            }

            LoggerService.error(err);
            return false;
        }
    }

    /**
     * Helper method to call the parent class's canActivate method.
     *
     * This method is used internally by the canActivate method to delegate
     * the actual authentication to the parent AuthGuard class.
     *
     * @param {ExecutionContext} context - The execution context
     * @returns {Promise<boolean>} A promise that resolves to true if the request is authorized
     */
    activate(context: ExecutionContext): Promise<boolean> {
        return super.canActivate(context) as Promise<boolean>;
    }

    /**
     * Processes the authenticated user and handles errors.
     *
     * This method is called after the JWT strategy has validated the token.
     * It handles any errors that occurred during validation and ensures
     * the user object is properly formatted before returning it.
     *
     * @param {unknown} err - Any error that occurred during authentication
     * @param {User} user - The authenticated user
     * @param {unknown} _info - Additional information (not used)
     * @returns {User} The authenticated user with sensitive information removed
     *
     * @throws {UnauthorizedException} If authentication failed or no user was found
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/no-explicit-any
    override handleRequest(err: unknown, user: User, _info: unknown): any {
        // You can throw an exception based on either "info" or "err" arguments
        if (err || !user) {
            throw err || new UnauthorizedException(AuthErrors.AUTH_401_INVALID_TOKEN);
        }

        delete user.password;
        return user;
    }
}
