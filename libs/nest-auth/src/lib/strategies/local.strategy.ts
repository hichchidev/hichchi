import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { Inject, Injectable } from "@nestjs/common";
import { AuthService } from "../services";
import { AUTH_OPTIONS } from "../tokens";
import { AuthField } from "../enums";
import { AuthOptions, TokenUser } from "../interfaces";
import { RequestWithSubdomain, SUBDOMAIN_KEY } from "@hichchi/nest-core";
import { AuthStrategy } from "@hichchi/nest-connector/auth";
import { EMAIL_KEY, USERNAME_KEY } from "../constants";

/**
 * Local authentication strategy
 *
 * This strategy is used to authenticate users using email and password.
 * It configures the username field to be 'email' instead of the default 'username'.
 *
 * @example
 * ```TypeScript
 * // In your module
 * @Module({
 *   imports: [PassportModule],
 *   providers: [LocalStrategy],
 * })
 *
 * // In your controller
 * @UseGuards(LocalAuthGuard)
 * @Post('login')
 * login(@CurrentUser() user: TokenUser) {
 *   return user;
 * }
 * ```
 */
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, AuthStrategy.LOCAL) {
    constructor(
        @Inject(AUTH_OPTIONS) readonly options: AuthOptions,
        private readonly authService: AuthService,
    ) {
        super({
            usernameField: options.authField === AuthField.EMAIL ? EMAIL_KEY : USERNAME_KEY,
            passReqToCallback: true,
        });
    }

    /**
     * Validate the username and password
     *
     * This method is called by Passport when a user attempts to log in.
     * It delegates the authentication to the AuthService.
     *
     * @param {RequestWithSubdomain} request - The request body
     * @param {string} username - The user's email address
     * @param {string} password - The user's password
     * @returns {Promise<TokenUser>} The authenticated user
     * @throws {import("@nestjs/common").UnauthorizedException} If the credentials are invalid
     *
     * @example
     * ```TypeScript
     * // This method is called automatically by Passport
     * const user = await localStrategy.validate('user@example.com', 'password');
     * ```
     */
    // noinspection JSUnusedGlobalSymbols
    validate(request: RequestWithSubdomain, username: string, password: string): Promise<TokenUser> {
        return this.authService.authenticate(request, username, password, request[SUBDOMAIN_KEY]);
    }
}
