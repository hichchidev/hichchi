/* eslint-disable @typescript-eslint/no-explicit-any */
import { FindOptionsOrder } from "typeorm";

/**
 * Type alias for TypeORM's sorting configuration.
 *
 * SortOptions provides a strongly-typed way to define the sorting criteria for
 * entity queries. It maps directly to TypeORM's FindOptionsOrder type, offering
 * a consistent interface for ordering query results across the application.
 *
 * @template Entity The entity type for which sorting options are being defined,
 *                  defaults to any if not specified
 *
 * @remarks
 * The SortOptions type enables:
 *
 * - Type-safe property access based on the Entity type
 * - Defining sort direction ('asc'|'desc') for each property
 * - Nested sorting for properties within relations
 * - Complex ordering with multiple sort criteria
 *
 * This type is commonly used in CRUD service methods, repository queries, and
 * API endpoints that support result ordering.
 *
 * The type is used with the parseSortOptions utility function that can transform
 * string-based sort specifications (common in API requests) into the structured
 * SortOptions object required by TypeORM.
 *
 * @example
 * ```typescript
 * // Simple sorting by a single property
 * const nameAscending: SortOptions<User> = {
 *   name: 'asc'
 * };
 *
 * // Multi-property sorting (primary and secondary sort)
 * const createdThenName: SortOptions<User> = {
 *   createdAt: 'desc',
 *   name: 'asc'
 * };
 *
 * // Nested sorting with relations
 * const sortByProfileData: SortOptions<User> = {
 *   profile: {
 *     country: 'asc',
 *     age: 'desc'
 *   }
 * };
 *
 * // Using in repository queries
 * const users = await userRepository.find({
 *   order: createdThenName
 * });
 * ```
 */
export type SortOptions<Entity = any> = FindOptionsOrder<Entity>;
