import { ObjectId } from "typeorm";
import { QueryDeepPartial } from "@hichchi/nest-connector/crud";

/**
 * A flexible type for defining query conditions when finding entities.
 *
 * This type provides a versatile way to specify search criteria when looking up
 * entities in the database. It supports both simple primary key lookups with
 * primitive values and complex conditional queries using TypeORM's query builder
 * syntax.
 *
 * @template Entity The entity type for which the find conditions are being defined
 *
 * @remarks
 * The FindConditions type supports the following forms of search criteria:
 *
 * - **Simple ID-based lookup**: Using primitive values like string, number, or ObjectId
 *   for direct primary key lookups
 *
 * - **Multiple ID lookup**: Using arrays of primitive values for finding entities
 *   matching any of the provided IDs (IN query)
 *
 * - **Date-based searches**: Using Date objects for timestamp-based lookups
 *
 * - **Complex conditions**: Using TypeORM's FindOptionsWhere for detailed query
 *   conditions with comparison operators, nested conditions, and relation filtering
 *
 * This type is particularly useful in repository methods and services that need to
 * provide flexible entity lookup capabilities while maintaining strong typing.
 *
 * @example
 * ```typescript
 * // Simple ID lookup
 * const userById: FindConditions<User> = 1;
 *
 * // Multiple ID lookup
 * const usersByIds: FindConditions<User> = [1, 2, 3];
 *
 * // Complex conditions
 * const activeAdmins: FindConditions<User> = {
 *   isActive: true,
 *   role: 'admin'
 * };
 *
 * // Nested conditions with relations
 * const usersWithProfileCondition: FindConditions<User> = {
 *   profile: {
 *     country: 'US',
 *     age: MoreThan(21)
 *   }
 * };
 *
 * // Using in repository methods
 * async function findUsers(conditions: FindConditions<User>): Promise<User[]> {
 *   return this.repository.find({ where: conditions });
 * }
 * ```
 */
export type FindConditions<Entity> =
    | string
    | string[]
    | number
    | number[]
    | Date
    | Date[]
    | ObjectId
    | ObjectId[]
    | QueryDeepPartial<Entity>;
