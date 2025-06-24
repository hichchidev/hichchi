// noinspection JSUnusedGlobalSymbols

/**
 * Type-safe utility to check if a value is an array of a specific type.
 *
 * This function acts as a type guard that not only checks if the provided value
 * is an array (using the native Array.isArray method), but also narrows the TypeScript
 * type to an array of the generic type T. This enables safer handling of potentially
 * array-typed values with full type inference in the conditional branches.
 *
 * @template T The expected element type of the array
 * @param {T | T[] | undefined} value The value to check, which could be a single item,
 *                                     an array of items, or undefined
 * @returns {value is T[]} Type predicate that narrows the type to T[] when true
 *
 * @remarks
 * While this function essentially wraps Array.isArray, its value comes from the
 * TypeScript type narrowing it provides, making it especially useful in code that
 * needs to handle both single items and collections of items with type safety.
 *
 * The function properly handles undefined values by returning false, making it safe
 * to use with optional parameters or potentially undefined values.
 *
 * @example
 * ```typescript
 * // Function that can accept either a single user or multiple users
 * async function createUser(userOrUsers: UserDto | UserDto[] | undefined): Promise<User | User[]> {
 *     // TypeScript knows userOrUsers is UserDto[] in this branch
 *     if (isArray<UserDto>(userOrUsers)) {
 *         return Promise.all(userOrUsers.map(user => userService.createUser(user)));
 *     }
 *     // TypeScript knows userOrUsers is UserDto or undefined in this branch
 *     else if (userOrUsers) {
 *         return userService.createUser(userOrUsers);
 *     }
 *     else {
 *         throw new BadRequestException('User data is required');
 *     }
 * }
 * ```
 */
export function isArray<T>(value: T | T[] | undefined): value is T[] {
    return Array.isArray(value);
}

/**
 * Type-safe utility to check if a value is a non-array object of a specific type.
 *
 * This function serves as a type guard that checks if the provided value is an object
 * (but not an array) and narrows the TypeScript type to the generic type T. It properly
 * excludes null, arrays, and primitive values, focusing only on object instances.
 *
 * @template T The expected object type to narrow to when the check passes
 * @param {T | T[] | undefined} [value] The value to check, which could be a single object,
 *                                       an array of objects, or undefined
 * @returns {value is T} Type predicate that narrows the type to T when true
 *
 * @remarks
 * This function performs three checks to ensure the value is a proper object:
 * 1. It's not an array (using Array.isArray)
 * 2. It's of type "object" according to JavaScript's typeof operator
 * 3. It's not null (which would pass the typeof check but isn't a valid object)
 *
 * This is particularly useful when handling parameters that could be either an object
 * or a simpler identifier (like an ID), allowing for type-safe conditional logic.
 *
 * @example
 * ```typescript
 * // Function that can accept either a user ID or a user object
 * async function getUserInfo(userIdOrUser: number | User | undefined): Promise<UserInfo> {
 *     // TypeScript knows userIdOrUser is User in this branch
 *     if (isObject<User>(userIdOrUser)) {
 *         // Can safely access object properties
 *         return await userService.getUserInfo(userIdOrUser.id);
 *     }
 *     // TypeScript knows userIdOrUser is number or undefined in this branch
 *     else {
 *         return await userService.getUserInfo(userIdOrUser);
 *     }
 * }
 *
 * // Works with optional parameters too
 * function formatUserName(user?: User | string): string {
 *     if (isObject<User>(user)) {
 *         return `${user.firstName} ${user.lastName}`;
 *     }
 *     return user || 'Guest';
 * }
 * ```
 */
export function isObject<T>(value?: T | T[] | undefined): value is T {
    return !Array.isArray(value) && typeof value === "object" && value !== null;
}

/**
 * Type-safe utility to check if a value is an object with a specific property.
 *
 * This function acts as a type guard that determines if an unknown value is an object
 * that contains a specified property, and narrows the TypeScript type to the generic
 * type T when true. This provides a robust way to implement duck typing in TypeScript,
 * allowing for safe property access in the conditional branches.
 *
 * @template T The expected object type that should contain the property
 * @param {unknown} value Any value to check, with no type constraints
 * @param {keyof T} propertyName The name of the property that should exist on the object
 * @returns {value is T} Type predicate that narrows the type to T when true
 *
 * @remarks
 * This function uses Object.prototype.hasOwnProperty.call to safely check for property
 * existence, even if the object has a custom implementation of hasOwnProperty or if the
 * property is named 'hasOwnProperty'.
 *
 * Unlike the simpler isObject utility, this function can distinguish between different
 * object types based on their properties, making it ideal for discriminating between
 * different interface implementations or handling union types.
 *
 * @example
 * ```typescript
 * // Check if an object has the properties of a User interface
 * interface User {
 *   id: number;
 *   name: string;
 * }
 *
 * interface Order {
 *   orderNumber: string;
 *   items: string[];
 * }
 *
 * // Function that can handle different object types
 * function processEntity(entity: unknown): void {
 *   // Check if entity has 'id' property, indicating it's a User
 *   if (isObjectWith<User>(entity, 'id')) {
 *     // TypeScript knows entity is User in this branch
 *     console.log(`Processing user: ${entity.name}`);
 *   }
 *   // Check if entity has 'orderNumber' property, indicating it's an Order
 *   else if (isObjectWith<Order>(entity, 'orderNumber')) {
 *     // TypeScript knows entity is Order in this branch
 *     console.log(`Processing order: ${entity.orderNumber} with ${entity.items.length} items`);
 *   }
 *   else {
 *     console.log('Unknown entity type');
 *   }
 * }
 *
 * // Useful for API responses where types may vary
 * async function handleResponse(response: unknown): Promise<void> {
 *   if (isObjectWith<ErrorResponse>(response, 'errorCode')) {
 *     throw new ApiException(response.errorCode, response.message);
 *   }
 *   else if (isObjectWith<SuccessResponse>(response, 'data')) {
 *     await processData(response.data);
 *   }
 * }
 * ```
 */
export function isObjectWith<T extends object>(value: unknown, propertyName: keyof T): value is T {
    return Object.prototype.hasOwnProperty.call(value, propertyName);
}
