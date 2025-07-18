/* eslint-disable no-console */
// noinspection ExceptionCaughtLocallyJS

import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthOptions, AuthUser, IJwtPayload } from "../interfaces";
import { AUTH_OPTIONS } from "../tokens";
import { cookieExtractor } from "../extractors";
import { AuthService } from "../services";
import { AccessToken, AuthErrors, AuthMethod, AuthStrategy } from "@hichchi/nest-connector/auth";
import { LoggerService, RequestWithSubdomain, SUBDOMAIN_KEY } from "@hichchi/nest-core";
import { ACCESS_TOKEN_COOKIE_NAME } from "../constants";

/**
 * JWT authentication strategy
 *
 * This strategy is used to authenticate users using JWT tokens.
 * It extracts the token from either cookies or the Authorization header,
 * depending on the configuration.
 *
 * @example
 * ```TypeScript
 * // In your module
 * @Module({
 *   imports: [PassportModule],
 *   providers: [JwtStrategy],
 * })
 *
 * // In your controller
 * @UseGuards(JwtAuthGuard)
 * @Get('profile')
 * getProfile(@CurrentUser() user: AuthUser) {
 *   return user;
 * }
 * ```
 */
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

    /**
     * Validate the JWT payload and extract the user
     *
     * This method is called by Passport after the token has been verified.
     * It extracts the access token from the request and uses it to authenticate the user.
     *
     * @param {RequestWithSubdomain} request - The HTTP request object
     * @param {IJwtPayload} jwtPayload - The decoded JWT payload
     * @returns {Promise<AuthUser>} The authenticated user
     * @throws {UnauthorizedException} If the token is invalid or the user is not found
     *
     * @example
     * ```TypeScript
     * // This method is called automatically by Passport
     * const user = await jwtStrategy.validate(request, { sub: 'user-id' });
     * ```
     */
    // noinspection JSUnusedGlobalSymbols
    async validate(request: RequestWithSubdomain, jwtPayload: IJwtPayload): Promise<AuthUser> {
        console.log(`JWT Strategy: Validating token for user ${jwtPayload.sub}`);
        try {
            console.log(`JWT Strategy: Auth method is ${this.options.authMethod}`);
            const accessToken: AccessToken | undefined =
                this.options.authMethod === AuthMethod.COOKIE
                    ? (request.signedCookies[ACCESS_TOKEN_COOKIE_NAME] as AccessToken) // eslint-disable-line @typescript-eslint/no-unsafe-member-access
                    : (request.headers.authorization?.split(" ")[1] as AccessToken);

            console.log(`JWT Strategy: Access token ${accessToken ? "found" : "not found"} in request`);
            if (!accessToken) {
                console.log("JWT Strategy: No access token, throwing UnauthorizedException");
                throw new UnauthorizedException(AuthErrors.AUTH_401_NOT_LOGGED_IN);
            }

            console.log("JWT Strategy: Calling authenticateJWT with token");
            const authUser = await this.authService.authenticateJWT(
                request,
                jwtPayload,
                accessToken,
                request[SUBDOMAIN_KEY],
            );
            console.log(`JWT Strategy: authenticateJWT successful, returning auth user for ${authUser.id}`);
            return authUser;
        } catch (error) {
            console.log(`JWT Strategy: Error caught during validation: ${(error as Error).message}`);
            if (error instanceof UnauthorizedException) {
                console.log("JWT Strategy: Re-throwing UnauthorizedException");
                throw error;
            }
            console.log("JWT Strategy: Logging error and throwing UnauthorizedException with AUTH_401_UNKNOWN");
            LoggerService.error(error, null, this.constructor.name);
            throw new UnauthorizedException(AuthErrors.AUTH_401_UNKNOWN);
        }
    }
}
