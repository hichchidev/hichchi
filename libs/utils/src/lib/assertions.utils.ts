/* eslint-disable @typescript-eslint/no-explicit-any */
// noinspection JSUnusedGlobalSymbols

/**
 * Check if the value is an array while asserting it's an array of generic type T
 * @template T The type of the array
 * @param {T | T[] | undefined} value The value to check
 * @returns {value is T[]} True if the value is an array, false otherwise
 *
 * @example
 * ```typescript
 * async function createUser(userOrUsers: UserDto | UserDto[] | undefined): User {
 *     if (isArray<UserDto>(userOrUsers)) {
 *         return userOrUsers.map(async user => await userService.createUser(user));
 *     } else {
 *         return await userService.createUser(userOrUsers);
 *     }
 * }
 * ```
 */
export function isArray<T>(value: T | T[] | undefined): value is T[] {
    return Array.isArray(value);
}

/**
 * Check if the value is an object while asserting it's an object of generic type T
 * @template T The type of the object
 * @param {T | T[] | undefined} [value] The value to check
 * @returns {value is T} True if the value is an object, false otherwise
 *
 * @example
 * ```typescript
 * async function getUserInfo(userIdOrUser: string | User | undefined): UserInfo {
 *     if (isObject<User>(userIdOrUser)) {
 *         return await userService.getUserInfo(userIdOrUser.id);
 *     } else {
 *         return await userService.getUserInfo(userIdOrUser);
 *     }
 * }
 * ```
 */
export function isObject<T>(value?: T | T[] | undefined): value is T {
    return !Array.isArray(value) && typeof value === "object" && value !== null;
}

/**
 * Check if the value is an object with a given property name and asset it's an object of generic type T
 * @template T The type of the object
 * @param {any} value The value to check
 * @param {keyof T} propertyName The property name to check
 * @returns {value is T} True if the value is an object with the given property name, false otherwise
 *
 * @example
 * ```typescript
 * async function getUserInfo(userIdOrUser: string | User | undefined): UserInfo {
 *     if (isObjectWith<User>(userIdOrUser, "id")) {
 *         return await userService.getUserInfo(userIdOrUser.id);
 *     } else {
 *         return await userService.getUserInfo(userIdOrUser);
 *     }
 * }
 * ```
 */
export function isObjectWith<T extends object>(value: any, propertyName: keyof T): value is T {
    return Object.prototype.hasOwnProperty.call(value, propertyName);
}
