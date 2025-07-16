// noinspection JSUnusedGlobalSymbols

import { CustomDecorator, SetMetadata } from "@nestjs/common";

/**
 * A constant variable that holds the key name used to reference or identify
 * role settings or values.
 *
 * This key is typically utilized in contexts where roles need to be managed,
 * checked, or assigned, ensuring consistent usage across the application.
 */
export const ROLES_KEY = "roles";

/**
 * Roles decorator
 *
 * This decorator is used to set the roles for a route.
 *
 * Note: `RoleName` is an `enum` but this decorator accepts both `enum` values and `string` values directly.
 *
 * @example
 * ```TypeScript
 * @Controller("user")
 * export class UserController {
 *     @Get()
 *     @Roles(RoleName.ADMIN, RoleName.USER)
 *     async getUsers(): Promise<User[]> {
 *         // Implementation
 *     }
 * }
 *
 * ```
 *
 * @param roles Comma separated roles
 * @returns {CustomDecorator} CustomDecorator
 */
export function Roles<R extends string = string>(...roles: R[]): CustomDecorator {
    return SetMetadata(ROLES_KEY, roles);
}
