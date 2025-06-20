import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthOptions, IJwtPayload } from "../interfaces";
import { AuthErrors } from "../responses";
import { ACCESS_TOKEN_COOKIE_NAME, AUTH_OPTIONS } from "../tokens";
import { cookieExtractor } from "../extractors";
import { AuthMethod } from "../enums";
import { AuthService } from "../services";
import { TokenUser } from "../types";
import { LoggerService, RequestWithSubdomain } from "@hichchi/nest-core";
import { AuthStrategy } from "@hichchi/nest-connector/auth";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, AuthStrategy.JWT) {
    constructor(
        @Inject(AUTH_OPTIONS) readonly options: AuthOptions,
        private readonly authService: AuthService,
    ) {
        super({
            jwtFromRequest:
                options.authMethod === AuthMethod.COOKIE
                    ? ExtractJwt.fromExtractors([cookieExtractor])
                    : ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: true,
            secretOrKey: options.jwt.secret,
            passReqToCallback: true,
        });
    }

    // noinspection JSUnusedGlobalSymbols
    async validate(request: RequestWithSubdomain, jwtPayload: IJwtPayload): Promise<TokenUser> {
        try {
            const accessToken: string | undefined =
                this.options.authMethod === AuthMethod.COOKIE
                    ? request.signedCookies[ACCESS_TOKEN_COOKIE_NAME]
                    : request.headers.authorization?.split(" ")[1];

            if (!accessToken) {
                return Promise.reject(new UnauthorizedException(AuthErrors.AUTH_401_NOT_LOGGED_IN));
            }

            return await this.authService.authenticateJWT(jwtPayload, accessToken, request.subdomain);
        } catch (err) {
            if (err instanceof UnauthorizedException) {
                return Promise.reject(err);
            }
            LoggerService.error(err);
            return Promise.reject(new UnauthorizedException(AuthErrors.AUTH_401_UNKNOWN));
        }
    }
}
