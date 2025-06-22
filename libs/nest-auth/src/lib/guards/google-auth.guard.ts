// noinspection JSUnusedGlobalSymbols

import { AuthGuard } from "@nestjs/passport";
import {
    BadRequestException,
    ExecutionContext,
    Inject,
    Injectable,
    InternalServerErrorException,
    Logger,
    UnauthorizedException,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { AuthOptions, TokenUser } from "../interfaces";
import { AUTH_OPTIONS } from "../tokens";
import * as passport from "passport";
import { AuthEndpoint, AuthErrors, AuthStrategy } from "@hichchi/nest-connector/auth";
import { Errors } from "@hichchi/nest-connector";
import { Request, Response } from "express";

@Injectable()
export class GoogleAuthGuard extends AuthGuard(AuthStrategy.GOOGLE) {
    constructor(@Inject(AUTH_OPTIONS) readonly options: AuthOptions) {
        super();
    }

    override canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        if (
            !this.options.googleAuth?.clientId ||
            !this.options.googleAuth?.clientSecret ||
            !this.options.googleAuth?.callbackUrl
        ) {
            throw new InternalServerErrorException(Errors.E_404_NOT_IMPLEMENTED);
        }

        const request = context.switchToHttp().getRequest<Request>();
        const response = context.switchToHttp().getResponse<Response>();
        const { state, redirectUrl } = request.query;

        if (!state && !redirectUrl) {
            throw new BadRequestException(AuthErrors.AUTH_400_REDIRECT_URL_REQUIRED);
        }

        const options = { session: false, state: JSON.stringify({ redirectUrl }) };

        return new Promise((resolve, reject) => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
            passport.authenticate(
                AuthStrategy.GOOGLE,
                options,
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                (err: Error, tokenUser: TokenUser, _info: unknown): void => {
                    if (err) {
                        Logger.error(err, null, GoogleAuthGuard.name);
                        reject(new UnauthorizedException(AuthErrors.AUTH_500_SOCIAL_LOGIN));
                        return;
                    }

                    const isCallback = request.url.includes(AuthEndpoint.GOOGLE_CALLBACK);

                    if (!tokenUser && isCallback) {
                        return reject(new UnauthorizedException(AuthErrors.AUTH_500_SOCIAL_LOGIN));
                    }

                    if (tokenUser) {
                        request.authInfo = tokenUser;
                    }

                    resolve(true);
                },
            )(request, response);
        });
    }
}
