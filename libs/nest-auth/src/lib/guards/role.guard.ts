// noinspection JSUnusedGlobalSymbols

import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "../decorators";
import { AuthErrors } from "../responses";
import { IRoleEntity } from "@hichchi/nest-core";
import { IAuthUserEntity } from "../interfaces";

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
        const { user } = context.switchToHttp().getRequest() as { user: IAuthUserEntity };
        if (requiredRoles.some(role => ((user.role as IRoleEntity).name || user.role) === role)) {
            return true;
        }
        throw new ForbiddenException(AuthErrors.AUTH_403_ROLE_FORBIDDEN);
    }
}
