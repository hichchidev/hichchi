// noinspection JSUnusedGlobalSymbols,JSUnusedLocalSymbols

import { ExecutionContext, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthErrors } from "../responses";
import { ExtractJwt } from "passport-jwt";
import { AuthOptions, CacheUser } from "../interfaces";
import { ACCESS_TOKEN_COOKIE_NAME, AUTH_OPTIONS, REFRESH_TOKEN_COOKIE_NAME } from "../tokens";
import { AuthService, UserCacheService } from "../services";
import { cookieExtractor } from "../extractors";
import { AuthMethod } from "../enums";
import { v4 as uuid } from "uuid";
import { LoggerService } from "@hichchi/nest-core";
import { AuthStrategy, RefreshToken, User } from "@hichchi/nest-connector/auth";

@Injectable()
export class JwtAuthGuard extends AuthGuard(AuthStrategy.JWT) {
    constructor(
        @Inject(AUTH_OPTIONS) private readonly options: AuthOptions,
        private readonly authService: AuthService,
        private readonly cacheService: UserCacheService,
    ) {
        super();
    }

    override async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const response = context.switchToHttp().getResponse();

        try {
            const accessToken =
                this.options.authMethod === AuthMethod.COOKIE
                    ? ExtractJwt.fromExtractors([cookieExtractor])(request)
                    : ExtractJwt.fromAuthHeaderAsBearerToken()(request);

            if (accessToken) {
                return this.activate(context);
            }

            if (this.options.authMethod === AuthMethod.COOKIE && this.options.cookies) {
                const refreshToken = request.signedCookies[REFRESH_TOKEN_COOKIE_NAME] as RefreshToken | undefined;
                if (!refreshToken) {
                    return Promise.reject(new UnauthorizedException(AuthErrors.AUTH_401_NOT_LOGGED_IN));
                }

                const user = await this.authService.getUserByToken(refreshToken, true);
                if (!user) {
                    return Promise.reject(new UnauthorizedException(AuthErrors.AUTH_401_INVALID_REFRESH_TOKEN));
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

                request.signedCookies[ACCESS_TOKEN_COOKIE_NAME] = tokens.accessToken;

                response.cookie(ACCESS_TOKEN_COOKIE_NAME, tokens.refreshToken, {
                    maxAge: Number(this.options.jwt.expiresIn) * 1000,
                    httpOnly: false,
                    sameSite: this.options.cookies.sameSite,
                    secure: this.options.cookies.secure,
                    signed: true,
                });
                response.cookie(REFRESH_TOKEN_COOKIE_NAME, tokens.refreshToken, {
                    maxAge: Number(this.options.jwt.refreshExpiresIn) * 1000,
                    httpOnly: false,
                    sameSite: this.options.cookies.sameSite,
                    secure: this.options.cookies.secure,
                    signed: true,
                });

                return this.activate(context);
            }
            return Promise.reject(new UnauthorizedException(AuthErrors.AUTH_401_NOT_LOGGED_IN));
        } catch (err) {
            LoggerService.error(err);
            if (this.options.authMethod === AuthMethod.COOKIE) {
                response.clearCookie(ACCESS_TOKEN_COOKIE_NAME);
                response.clearCookie(REFRESH_TOKEN_COOKIE_NAME);
            }
            return false;
        }
    }

    activate(context: ExecutionContext): Promise<boolean> {
        return super.canActivate(context) as Promise<boolean>;
    }

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
