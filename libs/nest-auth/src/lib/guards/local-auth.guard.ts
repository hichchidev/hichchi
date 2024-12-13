// noinspection JSUnusedGlobalSymbols

import { AuthGuard } from "@nestjs/passport";
import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import { AuthErrors } from "../responses";
import { AuthStrategy } from "../enums";
import { IAuthUserEntity } from "../interfaces";

@Injectable()
export class LocalAuthGuard extends AuthGuard(AuthStrategy.LOCAL) {
    override canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        return super.canActivate(context);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/no-explicit-any
    override handleRequest(err: Error, user: IAuthUserEntity, _info: unknown): any {
        // You can throw an exception based on either "info" or "err" arguments
        if (err || !user) {
            throw err || new UnauthorizedException(AuthErrors.AUTH_500_LOGIN);
        }
        delete user.password;
        return user;
    }
}
