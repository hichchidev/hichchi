// noinspection JSUnusedGlobalSymbols

import { AuthGuard } from "@nestjs/passport";
import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import { AuthErrors } from "../responses";
import { AuthStrategy, User } from "@hichchi/nest-connector/auth";

@Injectable()
export class LocalAuthGuard extends AuthGuard(AuthStrategy.LOCAL) {
    override canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const {
            body: { email, username, password },
        } = context.switchToHttp().getRequest();
        if ((!email && !username) || !password) {
            throw new UnauthorizedException(AuthErrors.AUTH_401_INVALID_USERNAME_PASSWORD);
        }
        return super.canActivate(context);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/no-explicit-any
    override handleRequest(err: Error, user: User, _info: unknown): any {
        // You can throw an exception based on either "info" or "err" arguments
        if (err || !user) {
            throw err || new UnauthorizedException(AuthErrors.AUTH_500_LOGIN);
        }
        delete user.password;
        return user;
    }
}
