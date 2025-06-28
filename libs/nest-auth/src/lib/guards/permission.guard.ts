// noinspection JSUnusedGlobalSymbols

import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthErrors, isRoleObject, User } from "@hichchi/nest-connector/auth";
import { PERMISSION_KEY } from "../decorators";
import { Request } from "express";

/**
 * Guard for permission-based authorization.
 *
 * This guard checks if the authenticated user has the required permission
 * to access a specific route. Permissions are defined using the `@Permission`
 * decorator on controllers or individual routes.
 *
 * @example
 * ```typescript
 * // In a controller
 * @Permission('read:users')
 * @UseGuards(JwtAuthGuard, PermissionGuard)
 * @Get('users')
 * getUsers() {
 *   return this.userService.findAll();
 * }
 * ```
 */
@Injectable()
export class PermissionGuard implements CanActivate {
    /**
     * Creates an instance of PermissionGuard.
     *
     * @param {Reflector} reflector - The reflector service used to retrieve metadata
     */
    constructor(private reflector: Reflector) {}

    /**
     * Determines if the current request is allowed to proceed based on permissions.
     *
     * This method checks if the route has a permission requirement and if the
     * authenticated user has that permission. If no permission is required or
     * the user has the required permission, the request is allowed to proceed.
     *
     * @param {ExecutionContext} context - The execution context
     * @returns {boolean} True if the request is authorized, false otherwise
     *
     * @throws {ForbiddenException} If the user doesn't have the required permission
     */
    canActivate<P extends string = string>(context: ExecutionContext): boolean {
        const requiredPermission: P = this.reflector.getAllAndOverride<P>(PERMISSION_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requiredPermission) {
            return true;
        }
        const { user } = context.switchToHttp().getRequest<Request & { user: User }>();
        if (isRoleObject(user.role) && user.role.permissions?.includes(requiredPermission)) {
            return true;
        }
        throw new ForbiddenException(AuthErrors.AUTH_403_PERMISSION_FORBIDDEN);
    }
}
