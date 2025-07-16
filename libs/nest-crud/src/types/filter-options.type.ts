import { IsPrimitive } from "@hichchi/utils";

/**
 * A recursive type for building structured filter conditions for entity queries.
 *
 * This generic type enables creating complex, nested filter objects that match
 * the structure of the entity being filtered. It allows for filtering on direct
 * properties as well as nested objects within the entity.
 *
 * @template T The entity type to be filtered, defaulting to unknown if not specified
 *
 * @remarks
 * - Each key in the FilterOptions object corresponds to a property in the entity
 * - Each value can either be a primitive FilterValue or a nested FilterOptions object
 * - All properties are optional, allowing for partial filtering
 * - The structure supports arbitrary nesting to match complex entity relationships
 *
 * When used with CRUD services, these filter options are typically converted to
 * appropriate WHERE conditions in the resulting database query.
 *
 * @example
 * ```typescript
 * // Basic filter for a User entity
 * interface User {
 *   id: number;
 *   name: string;
 *   email: string;
 *   isActive: boolean;
 *   profile?: {
 *     age: number;
 *     country: string;
 *   };
 * }
 *
 * // Simple filtering on direct properties
 * const activeUsersFilter: FilterOptions<User> = {
 *   isActive: true
 * };
 *
 * // Combined filtering on multiple properties
 * const activeAdminFilter: FilterOptions<User> = {
 *   isActive: true,
 *   email: 'admin@example.com'
 * };
 *
 * // Nested filtering using object structure
 * const activeUsersInUSFilter: FilterOptions<User> = {
 *   isActive: true,
 *   profile: {
 *     country: 'US'
 *   }
 * };
 *
 * // Using with a CRUD service
 * const users = await userService.findMany({
 *   filters: activeUsersInUSFilter
 * });
 * ```
 */
export type FilterOptions<Entity = unknown> = {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    [P in keyof Entity]?: NonNullable<Entity[P]> extends Array<infer _U>
        ? never
        : NonNullable<Entity[P]> extends Date
          ? never
          : // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
            NonNullable<Entity[P]> extends Function
            ? never
            : IsPrimitive<NonNullable<Entity[P]>> extends true
              ? NonNullable<Entity[P]>
              : FilterOptions<NonNullable<Entity[P]>>;
};
