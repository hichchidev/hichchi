import { Role } from "../interfaces";

/**
 * Type guard function to check if a role is a Role object or a string
 *
 * This utility function determines whether the provided role parameter is a Role object
 * (containing properties like name, permissions, etc.) or just a string representation
 * of the role name. It's commonly used in authentication and authorization logic to
 * handle different role formats consistently.
 *
 * The function performs a type-safe check by verifying that the role exists and
 * contains a "name" property, which is characteristic of Role objects.
 *
 * @template R - The type of role string (defaults to string)
 * @param role - The role to check, can be a Role object, string, or null
 * @returns True if the role is a Role object, false if it's a string or null
 *
 * @example
 * ```typescript
 * // With a Role object
 * const roleObject: Role = {
 *   name: 'admin',
 *   permissions: ['users.read', 'users.write']
 * };
 *
 * if (isRoleObject(roleObject)) {
 *   console.log('Role name:', roleObject.name);
 *   console.log('Permissions:', roleObject.permissions);
 * }
 * ```
 *
 * @example
 * ```typescript
 * // With a string role
 * const roleString = 'admin';
 *
 * if (isRoleObject(roleString)) {
 *   // This won't execute because roleString is just a string
 *   console.log('Role object:', roleString.name);
 * } else {
 *   console.log('Role string:', roleString);
 * }
 * ```
 *
 * @example
 * ```typescript
 * // In a permission check function
 * function hasPermission(userRole: Role | string, requiredPermission: string): boolean {
 *   if (isRoleObject(userRole)) {
 *     return userRole.permissions?.includes(requiredPermission) ?? false;
 *   }
 *   // Handle string role case
 *   return false;
 * }
 * ```
 *
 * @see {@link Role} Interface defining the structure of role objects
 */
export function isRoleObject<R extends string = string>(role: Role<R> | R | null): role is Role<R> {
    return Boolean(role) && typeof role === "object" && Boolean("name" in (role as Role<R>));
}
