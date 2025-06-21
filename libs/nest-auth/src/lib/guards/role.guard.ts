// noinspection JSUnusedGlobalSymbols

import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Role, User } from "@hichchi/nest-connector/auth";
import { ROLES_KEY } from "../decorators";
import { AuthErrors } from "../responses";

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const requiredRoles: string[] = this.reflector.getAllAndOverride<any[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requiredRoles) {
            return true;
        }
        const { user } = context.switchToHttp().getRequest() as { user: User };
        if (requiredRoles.some(role => ((user.role as Role).name || user.role) === role)) {
            return true;
        }
        throw new ForbiddenException(AuthErrors.AUTH_403_ROLE_FORBIDDEN);
    }
}

// TODO: add role as enum support
