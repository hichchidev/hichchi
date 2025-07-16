// noinspection JSUnusedGlobalSymbols

import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthErrors, isRoleObject, User } from "@hichchi/nest-connector/auth";
import { ROLES_KEY } from "../decorators";
import { Request } from "express";

/**
 * Guard for role-based authorization.
 *
 * This guard checks if the authenticated user has one of the required roles
 * to access a specific route. Roles are defined using the `@Roles` decorator
 * on controllers or individual routes.
 *
 * @example
 * ```typescript
 * // In a controller
 * @Roles('admin', 'manager')
 * @UseGuards(JwtAuthGuard, RoleGuard)
 * @Get('admin-dashboard')
 * getAdminDashboard() {
 *   return this.dashboardService.getAdminData();
 * }
 * ```
 */
@Injectable()
export class RoleGuard implements CanActivate {
    /**
     * Creates an instance of RoleGuard.
     *
     * @param {Reflector} reflector - The reflector service used to retrieve metadata
     */
    constructor(private reflector: Reflector) {}

    /**
     * Determines if the current request is allowed to proceed based on roles.
     *
     * This method checks if the route has role requirements and if the
     * authenticated user has one of the required roles. If no roles are required or
     * the user has one of the required roles, the request is allowed to proceed.
     *
     * @param {ExecutionContext} context - The execution context
     * @returns {boolean} True if the request is authorized, false otherwise
     *
     * @throws {ForbiddenException} If the user doesn't have any of the required roles
     */
    canActivate<R extends string = string, P extends string = string>(context: ExecutionContext): boolean {
        const requiredRoles: R[] = this.reflector.getAllAndOverride<R[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requiredRoles) {
            return true;
        }
        const { user } = context.switchToHttp().getRequest<Request & { user: User<R, P> }>();
        if (requiredRoles.some(role => (isRoleObject(user.role) ? user.role.name === role : user.role === role))) {
            return true;
        }
        throw new ForbiddenException(AuthErrors.AUTH_403_ROLE_FORBIDDEN);
    }
}
