import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { Inject, Injectable } from "@nestjs/common";
import { AuthService } from "../services";
import { AUTH_OPTIONS } from "../tokens";
import { AuthOptions, AuthUser } from "../interfaces";
import { AuthField, AuthStrategy, HEADER_TENANT_KEY, TenantSlug } from "@hichchi/nest-connector/auth";
import { Request } from "express";
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
 * @Post('sign-in')
 * signIn(@CurrentUser() user: AuthUser) {
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
     * @param {Request} request - The request body
     * @param {string} username - The user's email address
     * @param {string} password - The user's password
     * @returns {Promise<AuthUser>} The authenticated user
     * @throws {import("@nestjs/common").UnauthorizedException} If the credentials are invalid
     *
     * @example
     * ```TypeScript
     * // This method is called automatically by Passport
     * const user = await localStrategy.validate('user@example.com', 'password');
     * ```
     */
    // noinspection JSUnusedGlobalSymbols
    validate(request: Request, username: string, password: string): Promise<AuthUser> {
        return this.authService.authenticate(
            request,
            username,
            password,
            request.header(HEADER_TENANT_KEY) as TenantSlug | undefined,
        );
    }
}
