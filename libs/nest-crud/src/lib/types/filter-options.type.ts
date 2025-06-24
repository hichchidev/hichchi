/**
 * Represents valid primitive values that can be used in filter conditions.
 *
 * This type defines the allowed value types that can be used for filtering
 * entities in database queries. It includes common primitive data types and null,
 * ensuring type safety when building query filters.
 *
 * @remarks
 * The supported value types are:
 * - string: For text-based filtering (e.g., names, descriptions, codes)
 * - number: For numeric filtering (e.g., quantities, prices, ids)
 * - boolean: For true/false conditions (e.g., active status, flags)
 * - Date: For date-based filtering (e.g., created dates, expiration dates)
 * - null: For checking if a field is null
 *
 * These types cover most common filtering scenarios while maintaining
 * type safety and preventing invalid filter values.
 *
 * @example
 * ```typescript
 * // Examples of valid FilterValue usage
 * const stringFilter: FilterValue = 'active';
 * const numberFilter: FilterValue = 123;
 * const booleanFilter: FilterValue = true;
 * const dateFilter: FilterValue = new Date();
 * const nullFilter: FilterValue = null;
 * ```
 */
export type FilterValue = string | number | boolean | Date | null;

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
export type FilterOptions<T = unknown> = {
    [P in keyof T]?: FilterValue | FilterOptions<T[P]>;
};
