/* eslint-disable @typescript-eslint/no-unused-vars */
// noinspection JSUnusedGlobalSymbols

import { AuthGuard } from "@nestjs/passport";
import {
    ExecutionContext,
    Inject,
    Injectable,
    InternalServerErrorException,
    UnauthorizedException,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { AuthErrors } from "../responses";
import { AuthOptions, GoogleProfile } from "../interfaces";
import { AUTH_OPTIONS } from "../tokens";
import passport from "passport";
import { AuthStrategy } from "../enums";
import { Errors } from "@hichchi/nest-core";

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

        const request = context.switchToHttp().getRequest();
        const response = context.switchToHttp().getResponse();
        const { redirectUrl } = request.query;

        const googleOptions = {
            session: false,
            state: JSON.stringify({ redirectUrl }),
        };

        return new Promise((resolve, reject) => {
            passport.authenticate(
                AuthStrategy.GOOGLE,
                googleOptions,
                (err: unknown, user: GoogleProfile, _info: unknown) => {
                    if (err || !user) {
                        reject(new UnauthorizedException(AuthErrors.AUTH_500_SOCIAL_LOGIN));
                    } else {
                        request.user = user;
                        resolve(true);
                    }
                },
            )(request, response);
        });
    }
}
