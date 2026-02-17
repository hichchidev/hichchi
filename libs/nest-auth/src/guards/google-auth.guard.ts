// noinspection JSUnusedGlobalSymbols

import { AuthGuard } from "@nestjs/passport";
import {
    BadRequestException,
    ExecutionContext,
    Inject,
    Injectable,
    InternalServerErrorException,
    UnauthorizedException,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { AuthOptions, AuthUser } from "../interfaces";
import { AUTH_OPTIONS } from "../tokens";
import passport from "passport";
import { AuthEndpoint, AuthErrors, AuthStrategy } from "@hichchi/nest-connector/auth";
import { Errors } from "@hichchi/nest-connector";
import { Request, Response } from "express";
import { LoggerService } from "@hichchi/nest-core";
import { GoogleAuthRequestQuery } from "../interfaces/google-auth-state.interface";

/**
 * Guard for Google OAuth authentication.
 *
 * This guard extends Passport's AuthGuard for the Google strategy and handles
 * the OAuth authentication flow. It validates that Google authentication is properly
 * configured and manages the authentication process, including handling callbacks
 * from Google's OAuth service.
 *
 * @example
 * ```typescript
 * // In a controller
 * @UseGuards(GoogleAuthGuard)
 * @Get('google-sign-in')
 * googleSignIn() {
 *   // This route initiates Google OAuth authentication
 * }
 *
 * @UseGuards(GoogleAuthGuard)
 * @Get('google-callback')
 * googleCallback() {
 *   // This route handles the callback from Google
 * }
 * ```
 */
@Injectable()
export class GoogleAuthGuard extends AuthGuard(AuthStrategy.GOOGLE) {
    /**
     * Creates an instance of GoogleAuthGuard.
     *
     * @param {AuthOptions} options - The authentication options injected from `AUTH_OPTIONS` token
     */
    constructor(@Inject(AUTH_OPTIONS) readonly options: AuthOptions) {
        super();
    }

    /**
     * Determines if the current request is allowed to proceed.
     *
     * This method validates that Google authentication is properly configured,
     * checks for required query parameters, and handles the authentication process
     * using Passport's authenticate method.
     *
     * @param {ExecutionContext} context - The execution context
     * @returns {boolean | Promise<boolean> | Observable<boolean>} A boolean or a promise/observable that resolves to a boolean
     *
     * @throws {InternalServerErrorException} If Google authentication is not properly configured
     * @throws {BadRequestException} If redirectUrl is missing
     * @throws {UnauthorizedException} If social sign in fails
     */
    override canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        if (
            !this.options.googleAuth?.clientId ||
            !this.options.googleAuth?.clientSecret ||
            !this.options.googleAuth?.callbackUrl
        ) {
            throw new InternalServerErrorException(Errors.ERROR_404_NOT_IMPLEMENTED);
        }

        const request = context.switchToHttp().getRequest<Request<unknown, unknown, unknown, GoogleAuthRequestQuery>>();
        const response = context.switchToHttp().getResponse<Response>();
        const { state, redirectUrl, tenant } = request.query;

        if (!state && !redirectUrl) {
            throw new BadRequestException(AuthErrors.AUTH_400_REDIRECT_URL_REQUIRED);
        }

        const options = {
            session: false,
            state: JSON.stringify({ redirectUrl, tenant }),
            callbackURL: this.options.googleAuth.callbackUrl,
        };

        return new Promise((resolve, reject) => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
            passport.authenticate(
                AuthStrategy.GOOGLE,
                options,
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                (error: unknown, authUser: AuthUser, _info: unknown): void => {
                    if (error) {
                        LoggerService.error(error, this.constructor.name);
                        reject(new UnauthorizedException(AuthErrors.AUTH_500_SOCIAL_SIGN_IN));
                        return;
                    }

                    const isCallback = request.url.includes(AuthEndpoint.GOOGLE_CALLBACK);

                    if (!authUser && isCallback) {
                        return reject(new UnauthorizedException(AuthErrors.AUTH_500_SOCIAL_SIGN_IN));
                    }

                    if (authUser) {
                        request.authInfo = authUser;
                    }

                    resolve(true);
                },
            )(request, response);
        });
    }
}
