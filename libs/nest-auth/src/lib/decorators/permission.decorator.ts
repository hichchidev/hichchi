// noinspection JSUnusedGlobalSymbols

import { CustomDecorator, SetMetadata } from "@nestjs/common";

/**
 * A constant variable that holds the key name used to reference or identify
 * permission settings or values.
 *
 * This key is typically utilized in contexts where permissions need to be managed,
 * checked, or assigned, ensuring consistent usage across the application.
 */
export const PERMISSION_KEY = "permission";

/**
 * Permission decorator
 *
 * This decorator is used to set the permission for a route.
 *
 * @example
 * ```TypeScript
 * @Controller("user")
 * export class UserController {
 *     @Get()
 *     @Permission(Permission.GET_USER)
 *     async getUsers(): Promise<User[]> {
 *         // Implementation
 *     }
 * }
 *
 * ```
 *
 * @param {string} permission permission
 * @returns {CustomDecorator} CustomDecorator
 */
export function Permission(permission: string): CustomDecorator {
    return SetMetadata(PERMISSION_KEY, permission);
}

// TODO: implement and update doc
