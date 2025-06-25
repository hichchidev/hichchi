// noinspection JSUnusedGlobalSymbols

import { AuthGuard } from "@nestjs/passport";
import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import { AuthErrors, AuthStrategy, User } from "@hichchi/nest-connector/auth";

/**
 * Guard for local authentication (username/password).
 *
 * This guard extends Passport's AuthGuard for the LOCAL strategy and handles
 * username/password authentication. It validates that the required credentials
 * are provided in the request body before proceeding with authentication.
 *
 * @example
 * ```typescript
 * // In a controller
 * @UseGuards(LocalAuthGuard)
 * @Post('sign-in')
 * signIn(@Body() signInDto: SignInDto) {
 *   return this.authService.signIn(signInDto);
 * }
 * ```
 */
@Injectable()
export class LocalAuthGuard extends AuthGuard(AuthStrategy.LOCAL) {
    /**
     * Determines if the current request is allowed to proceed.
     *
     * This method validates that the required credentials (email/username and password)
     * are provided in the request body before proceeding with authentication.
     *
     * @param {ExecutionContext} context - The execution context
     * @returns {boolean | Promise<boolean> | Observable<boolean>} A boolean or a promise/observable that resolves to a boolean
     *
     * @throws {UnauthorizedException} If email/username or password is missing
     */
    override canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const {
            body: { email, username, password },
        } = context.switchToHttp().getRequest();
        if ((!email && !username) || !password) {
            throw new UnauthorizedException(AuthErrors.AUTH_401_INVALID_USERNAME_PASSWORD);
        }
        return super.canActivate(context);
    }

    /**
     * Processes the authenticated user and handles errors.
     *
     * This method is called after the LOCAL strategy has validated the credentials.
     * It handles any errors that occurred during validation and ensures
     * the user object is properly formatted before returning it.
     *
     * @param {Error} error - Any error that occurred during authentication
     * @param {User} user - The authenticated user
     * @param {unknown} _info - Additional information (not used)
     * @returns {User} The authenticated user with sensitive information removed
     *
     * @throws {UnauthorizedException} If authentication failed or no user was found
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/no-unused-vars
    override handleRequest(error: Error, user: User, _info: unknown): any {
        // You can throw an exception based on either "info" or "err" arguments
        if (error || !user) {
            throw error || new UnauthorizedException(AuthErrors.AUTH_500_SIGN_IN);
        }
        delete user.password;
        return user;
    }
}
