import { EntityManager, FindOneOptions, SaveOptions } from "typeorm";
import { SortOptions } from "../types";
import { EntityId, Pagination, QueryDeepPartial } from "@hichchi/nest-connector/crud";

/**
 * Base options interface for CRUD operations.
 *
 * This interface defines the common configuration options that apply to various
 * CRUD operations within the application. It serves as the foundation for more
 * specialized options interfaces that handle specific operation types.
 *
 * @template Entity The entity type that the options apply to
 *
 * @example
 * ```typescript
 * // Basic usage in a service method
 * async findUsers(options: Options<User>) {
 *   const { manager, relations, sort } = options;
 *   // Implement query logic using these options
 * }
 * ```
 */
export interface QueryOptions<Entity> {
    /**
     * Optional EntityManager instance for transaction support.
     *
     * When provided, this EntityManager will be used for database operations
     * instead of the repository's default connection. This enables operations
     * to participate in ongoing database transactions.
     *
     * @example
     * // In a service method with transaction
     * async createUserWithProfile(data, manager: EntityManager) {
     *   return this.userRepository.create(data, { manager });
     * }
     */
    manager?: EntityManager;

    /**
     * Array of entity relation properties to eager-load.
     *
     * Specifies which related entities should be loaded along with the main entity.
     * This is transformed into TypeORM's relations option internally.
     *
     * @example
     * // Load user with their profile and posts
     * relations: ['profile', 'posts']
     */
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    relations?: (keyof Entity | `${keyof Entity}.${string}`)[];

    /**
     * Additional TypeORM find options excluding 'where' and 'relations'.
     *
     * Allows passing additional TypeORM query options that aren't covered by
     * the other properties in this interface. The 'where' and 'relations' options
     * are excluded since they're handled by dedicated properties.
     *
     * @example
     * options: {
     *   select: ['id', 'name', 'email'],
     *   skip: 10,
     *   take: 20
     * }
     */
    options?: Omit<FindOneOptions<Entity>, "where" | "relations">;

    /**
     * Sorting configuration for the query results.
     *
     * Defines how the results should be ordered. This is a TypeORM
     * FindOptionsOrder object that specifies sort direction for properties.
     *
     * @example
     * // Sort users by createdAt descending and then by name ascending
     * sort: {
     *   createdAt: 'DESC',
     *   name: 'ASC'
     * }
     */
    sort?: SortOptions<Entity>;
}

/**
 * Query options using the `where`-like filter object.
 */
export interface QueryOptionsFilter<Entity> extends QueryOptions<Entity> {
    /**
     * Exact match conditions for filtering entities.
     *
     * These conditions are combined with AND logic and match exactly the
     * specified values. Useful for filtering by known property values.
     *
     * @example
     * filters: { status: 'active', type: 'user' }
     */
    filters?: QueryDeepPartial<Entity>;

    /**
     * Explicitly excluded to prevent mixing with the 'search' approach.
     * Use SearchOptions for search-based filtering or WhereOptions for direct where clauses.
     */
    where?: never;
}

/**
 * Options interface for search-based CRUD operations.
 *
 * This interface extends the base Options interface to provide specialized
 * configuration for operations that need to filter entities based on search
 * criteria. It allows specifying both exact match filters and more flexible
 * search conditions.
 *
 * Note that this interface explicitly excludes 'where' and 'not' options
 * to maintain clear separation between different filtering approaches.
 *
 * @template Entity The entity type that the options apply to
 *
 * @example
 * ```typescript
 * // Find active users with a name containing 'john'
 * const options: SearchOptions<User> = {
 *   filters: { isActive: true },
 *   search: { firstName: Like('%john%') },
 *   relations: ['profile'],
 *   sort: { createdAt: 'DESC' }
 * };
 * const users = await userService.findMany(options);
 * ```
 */
export interface QueryOptionsSearch<Entity> extends QueryOptions<Entity> {
    // /**
    //  * Exact match conditions for filtering entities.
    //  *
    //  * These conditions are combined with AND logic and match exactly the
    //  * specified values. Useful for filtering by known property values.
    //  *
    //  * @example
    //  * filters: { status: 'active', type: 'admin' }
    //  */
    // filters?: QueryDeepPartial<Entity>;

    /**
     * Flexible search conditions for filtering entities.
     *
     * These conditions can use TypeORM ILike operator
     * for more flexible matching. They're combined with AND logic alongside
     * any specified filters.
     *
     * @example
     * ```typescript
     * search: { name: 'smi' }
     * // will search for name containing `smi`, ex: 'smith'
     * ```
     */
    search?: QueryDeepPartial<Entity>;

    /**
     * Explicitly excluded to prevent mixing with the 'search' approach.
     * Use SearchOptions for search-based filtering or WhereOptions for direct where clauses.
     */
    where?: never;

    // /**
    //  * Explicitly excluded to prevent mixing with the 'search' approach.
    //  * Use SearchOptions for search-based filtering or NotOptions for exclusion-based filtering.
    //  */
    // not?: never;
}

/**
 * Options interface for exclusion-based CRUD operations.
 *
 * This interface extends the base Options interface to provide specialized
 * configuration for operations that need to exclude entities based on specific
 * criteria. It combines positive filters with negative conditions to create
 * queries that exclude certain records.
 *
 * Note that this interface explicitly excludes 'search' and 'where' options
 * to maintain clear separation between different filtering approaches.
 *
 * @template Entity The entity type that the options apply to
 *
 * @example
 * ```typescript
 * // Find active users that are NOT admins
 * const options: NotOptions<User> = {
 *   filters: { isActive: true },
 *   not: { role: 'admin' },
 *   relations: ['profile'],
 *   sort: { createdAt: 'DESC' }
 * };
 * const users = await userService.findMany(options);
 * ```
 */
export interface QueryOptionsNot<Entity> extends QueryOptions<Entity> {
    // /**
    //  * Exact match conditions for filtering entities.
    //  *
    //  * These conditions are combined with AND logic and match exactly the
    //  * specified values. Useful for filtering by known property values.
    //  *
    //  * @example
    //  * filters: { status: 'active', type: 'user' }
    //  */
    // filters?: QueryDeepPartial<Entity>;

    // /**
    //  * Explicitly excluded to prevent mixing with the 'not' approach.
    //  * Use SearchOptions for search-based filtering or NotOptions for exclusion-based filtering.
    //  */
    // search?: never;

    /**
     * Exclusion conditions for filtering out entities.
     *
     * These conditions specify criteria that entities must NOT match to be included
     * in the results. This is required for NotOptions and implemented using NOT logic.
     *
     * @example
     * not: { role: 'admin', status: 'deleted' }
     */
    not?: QueryDeepPartial<Entity>;

    /**
     * Explicitly excluded to prevent mixing with the 'not' approach.
     * Use NotOptions for exclusion-based filtering or WhereOptions for direct where clauses.
     */
    where?: never;
}

/**
 * Options interface for direct WHERE clause CRUD operations.
 *
 * This interface extends the base Options interface to provide specialized
 * configuration for operations that need to use TypeORM's native WHERE clauses
 * directly. It supports both single condition objects and arrays of conditions
 * for complex OR queries.
 *
 * Note that this interface explicitly excludes 'filters', 'search', and 'not' options
 * to maintain clear separation between different filtering approaches.
 *
 * @template Entity The entity type that the options apply to
 *
 * @example
 * ```typescript
 * // Find users that are either admins or have premium status
 * const options: WhereOptions<User> = {
 *   where: [
 *     { role: 'admin' },
 *     { status: 'premium' }
 *   ],
 *   relations: ['profile'],
 *   sort: { createdAt: 'DESC' }
 * };
 * const users = await userService.findMany(options);
 * ```
 */
export interface QueryOptionsWhere<Entity> extends QueryOptions<Entity> {
    /**
     * Explicitly excluded to prevent mixing with the 'where' approach.
     * Use SearchOptions for search-based filtering or WhereOptions for direct where clauses.
     */
    filters?: never;

    /**
     * Explicitly excluded to prevent mixing with the 'where' approach.
     * Use SearchOptions for search-based filtering or WhereOptions for direct where clauses.
     */
    search?: never;

    /**
     * Explicitly excluded to prevent mixing with the 'where' approach.
     * Use NotOptions for exclusion-based filtering or WhereOptions for direct where clauses.
     */
    not?: never;

    /**
     * Direct TypeORM WHERE conditions for filtering entities.
     *
     * These conditions are passed directly to TypeORM's QueryDeepPartial.
     * When an array is provided, the conditions are combined with OR logic,
     * allowing for complex queries that match any of the specified conditions.
     *
     * @example
     * // Single condition (AND logic between properties)
     * where: { status: 'active', role: 'user' }
     *
     * @example
     * // Multiple conditions (OR logic between objects)
     * where: [
     *   { status: 'active', role: 'admin' },
     *   { status: 'premium', subscriptionValid: true }
     * ]
     */
    where?: QueryDeepPartial<Entity> | QueryDeepPartial<Entity>[];
}

/**
 * Options interface for paginated CRUD operations.
 *
 * This interface extends the base Options interface to provide pagination
 * capabilities for operations that return multiple entities. It allows
 * specifying pagination parameters like page number and page size.
 *
 * @template Entity The entity type that the options apply to
 *
 * @example
 * ```typescript
 * // Get the first page of users with 10 users per page
 * const options: PaginatedGetOptions<User> = {
 *   pagination: { page: 1, limit: 10 },
 *   sort: { createdAt: 'DESC' }
 * };
 * const users = await userService.findAll(options);
 * ```
 */
export interface PaginatedGetOptions<Entity> extends QueryOptions<Entity> {
    /**
     * Pagination parameters for limiting the number of results.
     *
     * When provided, the query results will be paginated according to
     * these parameters. This includes the page number and number of
     * items per page.
     *
     * @example
     * pagination: { page: 2, limit: 25 } // Get 25 items from the second page
     */
    pagination?: Pagination;
}

/**
 * Options interface for retrieving entities by their IDs.
 *
 * This interface extends PaginatedGetOptions to provide specialized
 * configuration for operations that need to fetch multiple entities
 * by their unique identifiers. It supports pagination and includes
 * an array of entity IDs to retrieve.
 *
 * @template Entity The entity type that the options apply to
 *
 * @example
 * ```typescript
 * // Get users with specific IDs and paginate the results
 * const options: GetByIdsOptions<User> = {
 *   ids: ['abc123', 'def456', 'ghi789'],
 *   pagination: { page: 1, limit: 10 },
 *   relations: ['profile'],
 *   sort: { createdAt: 'DESC' }
 * };
 * const users = await userService.findByIds(options);
 * ```
 */
export interface GetByIdsOptions<Entity> extends PaginatedGetOptions<Entity> {
    /**
     * Array of entity IDs to retrieve.
     *
     * The operation will fetch only the entities whose IDs are included
     * in this array. The IDs must match the entity's primary key type.
     *
     * @example
     * ids: [1, 2, 3] // For numeric IDs
     * @example
     * ids: ['abc123', 'def456'] // For string IDs
     */
    ids: EntityId[];
}

/**
 * Options interface for retrieving a single entity by its ID.
 *
 * This type extends the base Options interface, but excludes the sort option
 * since it's not relevant when retrieving a single entity by its unique identifier.
 * It retains other options like relations and manager for transaction support.
 *
 * @template Entity The entity type that the options apply to
 *
 * @example
 * ```typescript
 * // Get a user by ID with their profile relation loaded
 * const options: GetByIdOptions<User> = {
 *   relations: ['profile'],
 *   options: { cache: true } // Enable query caching
 * };
 * const user = await userService.findById('abc123', options);
 * ```
 */
export type GetByIdOptions<Entity> = Omit<QueryOptions<Entity>, "sort">;

/**
 * Options for retrieving a single entity using filter-based query keys.
 */
export interface GetOneOptionsFilter<Entity> extends QueryOptions<Entity>, QueryOptionsFilter<Entity> {}

/**
 * Options interface for retrieving a single entity using search-based filtering.
 *
 * Combines the base Options interface with SearchOptions to provide a complete
 * configuration for search-based retrieval of a single entity.
 *
 * @template Entity The entity type that the options apply to
 *
 * @example
 * ```typescript
 * // Find a single active admin user by name
 * const options: GetOneOptionsSearch<User> = {
 *   filters: { isActive: true, role: 'admin' },
 *   search: { name: Like('%john%') },
 *   relations: ['profile']
 * };
 * const user = await userService.findOne(options);
 * ```
 */
export interface GetOneOptionsSearch<Entity> extends QueryOptions<Entity>, QueryOptionsSearch<Entity> {}

/**
 * Options interface for retrieving a single entity using exclusion-based filtering.
 *
 * Combines the base Options interface with NotOptions to provide a complete
 * configuration for retrieving a single entity by excluding specific criteria.
 *
 * @template Entity The entity type that the options apply to
 *
 * @example
 * ```typescript
 * // Find a single active user that is not an admin
 * const options: GetOneOptionsNot<User> = {
 *   filters: { isActive: true },
 *   not: { role: 'admin' },
 *   relations: ['profile']
 * };
 * const user = await userService.findOne(options);
 * ```
 */
export interface GetOneOptionsNot<Entity> extends QueryOptions<Entity>, QueryOptionsNot<Entity> {}

/**
 * Options interface for retrieving a single entity using direct WHERE clause.
 *
 * Combines the base Options interface with WhereOptions to provide a complete
 * configuration for retrieving a single entity using TypeORM's native WHERE clauses.
 *
 * @template Entity The entity type that the options apply to
 *
 * @example
 * ```typescript
 * // Find a single user that is either an admin or has premium status
 * const options: GetOneOptionsWhere<User> = {
 *   where: [
 *     { role: 'admin' },
 *     { status: 'premium' }
 *   ],
 *   relations: ['profile']
 * };
 * const user = await userService.findOne(options);
 * ```
 */
export interface GetOneOptionsWhere<Entity> extends QueryOptions<Entity>, QueryOptionsWhere<Entity> {}

/**
 * Options for retrieving multiple entities with pagination and filter-based query keys.
 */
export interface GetManyOptionsFilter<Entity> extends PaginatedGetOptions<Entity>, GetOneOptionsFilter<Entity> {}

/**
 * Options interface for retrieving multiple entities using search-based filtering with pagination.
 *
 * Combines PaginatedGetOptions with GetOneOptionsSearch to provide a complete
 * configuration for search-based retrieval of multiple entities with pagination support.
 *
 * @template Entity The entity type that the options apply to
 *
 * @example
 * ```typescript
 * // Find active admin users with names containing 'john', paginated
 * const options: GetManyOptionsSearch<User> = {
 *   filters: { isActive: true, role: 'admin' },
 *   search: { name: Like('%john%') },
 *   relations: ['profile'],
 *   pagination: { page: 1, limit: 10 },
 *   sort: { createdAt: 'DESC' }
 * };
 * const users = await userService.findMany(options);
 * ```
 */
export interface GetManyOptionsSearch<Entity> extends PaginatedGetOptions<Entity>, GetOneOptionsSearch<Entity> {}

/**
 * Options interface for retrieving multiple entities using exclusion-based filtering with pagination.
 *
 * Combines PaginatedGetOptions with GetOneOptionsNot to provide a complete
 * configuration for retrieving multiple entities by excluding specific criteria, with pagination support.
 *
 * @template Entity The entity type that the options apply to
 *
 * @example
 * ```typescript
 * // Find active users that are not admins, paginated
 * const options: GetManyOptionsNot<User> = {
 *   filters: { isActive: true },
 *   not: { role: 'admin' },
 *   relations: ['profile'],
 *   pagination: { page: 1, limit: 10 },
 *   sort: { createdAt: 'DESC' }
 * };
 * const users = await userService.findMany(options);
 * ```
 */
export interface GetManyOptionsNot<Entity> extends PaginatedGetOptions<Entity>, GetOneOptionsNot<Entity> {}

/**
 * Options interface for retrieving multiple entities using direct WHERE clause with pagination.
 *
 * Combines PaginatedGetOptions with GetOneOptionsWhere to provide a complete
 * configuration for retrieving multiple entities using TypeORM's native WHERE clauses, with pagination support.
 *
 * @template Entity The entity type that the options apply to
 *
 * @example
 * ```typescript
 * // Find users that are either admins or have premium status, paginated
 * const options: GetManyOptionsWhere<User> = {
 *   where: [
 *     { role: 'admin' },
 *     { status: 'premium' }
 *   ],
 *   relations: ['profile'],
 *   pagination: { page: 1, limit: 10 },
 *   sort: { createdAt: 'DESC' }
 * };
 * const users = await userService.findMany(options);
 * ```
 */
export interface GetManyOptionsWhere<Entity> extends PaginatedGetOptions<Entity>, GetOneOptionsWhere<Entity> {}

/**
 * Extended save options interface with skip creation functionality.
 *
 * This interface extends TypeORM's SaveOptions to provide additional control
 * over the save operation, specifically allowing the ability to skip entity
 * creation when certain conditions are met. This is useful for scenarios
 * where you want to update existing entities but avoid creating new ones.
 *
 * @example
 * ```typescript
 * // Save user data but skip creation if user doesn't exist
 * const options: SaveOptionsWithSkip = {
 *   skipCreate: true,
 *   transaction: false,
 *   reload: true
 * };
 * const savedUser = await userRepository.save(userData, options);
 * ```
 *
 * @example
 * ```typescript
 * // Normal save operation with creation allowed
 * const options: SaveOptionsWithSkip = {
 *   skipCreate: false, // or omit this property
 *   chunk: 1000
 * };
 * const savedUsers = await userRepository.save(usersData, options);
 * ```
 */
export interface SaveOptionsWithSkip extends SaveOptions {
    /**
     * Flag to control whether new entities should be created during save operations.
     *
     * When set to true, the save operation will only update existing entities
     * and skip creating new ones. When false or undefined, the normal save
     * behavior applies (both create and update operations are performed).
     *
     * @default false
     *
     * @example
     * skipCreate: true // Only update existing entities, don't create new ones
     */
    skipCreate?: boolean;
}

/**
 * Comprehensive options type for retrieving entities with various filtering approaches and pagination.
 *
 * This type combines the different filtering options (search, not, where) with
 * pagination support to provide a flexible interface for retrieving entities.
 * It allows for using any of the filtering approaches while maintaining pagination capabilities.
 *
 * @template Entity The entity type that the options apply to
 *
 * @example
 * ```typescript
 * // Function that can accept any combination of filtering and pagination
 * async function getUsers(options: GetOptions<User>): Promise<[User[], number]> {
 *   return userRepository.findAndCount(options);
 * }
 *
 * // Use with search filtering and pagination
 * const [users, count] = await getUsers({
 *   search: { name: Like('%john%') },
 *   pagination: { page: 1, limit: 10 },
 *   sort: { createdAt: 'DESC' }
 * });
 * ```
 */
export type GetOptions<Entity> = (
    | (QueryOptionsFilter<Entity> & QueryOptionsSearch<Entity> & QueryOptionsNot<Entity>)
    | QueryOptionsWhere<Entity>
) &
    PaginatedGetOptions<Entity>;

/**
 * Union type for all options interfaces for retrieving a single entity.
 *
 * This type allows for flexible usage of different filtering approaches
 * when retrieving a single entity. It can be used with search-based filtering,
 * exclusion-based filtering, or direct WHERE clauses.
 *
 * @template Entity The entity type that the options apply to
 *
 * @example
 * ```typescript
 * // Generic function that accepts any type of filtering options
 * async function findOneUser(options: GetOneOptions<User>): Promise<User | null> {
 *   return userRepository.findOne(options);
 * }
 *
 * // Can be called with any of the supported filtering approaches
 * const user1 = await findOneUser({ search: { name: Like('%john%') } });
 * const user2 = await findOneUser({ not: { role: 'admin' } });
 * const user3 = await findOneUser({ where: { id: 123 } });
 * ```
 */
export type GetOneOptions<Entity> =
    | (GetOneOptionsFilter<Entity> & GetOneOptionsSearch<Entity> & GetOneOptionsNot<Entity>)
    | GetOneOptionsWhere<Entity>;

/**
 * Simple options type for retrieving all entities with pagination.
 *
 * This type is used when you want to retrieve all entities without any filtering,
 * but still want to use pagination and sorting. It's the simplest form of retrieval
 * options that only focuses on how to present the results rather than filtering them.
 *
 * @template Entity The entity type that the options apply to
 *
 * @example
 * ```typescript
 * // Get all users with pagination and sorting
 * const options: GetAllOptions<User> = {
 *   pagination: { page: 1, limit: 10 },
 *   sort: { createdAt: 'DESC' },
 *   relations: ['profile']
 * };
 * const [users, count] = await userService.findAll(options);
 * ```
 */
export type GetAllOptions<Entity> = PaginatedGetOptions<Entity>;

/**
 * Union type for all options interfaces for retrieving multiple entities with pagination.
 *
 * This type allows for flexible usage of different filtering approaches
 * when retrieving multiple entities with pagination support. It can be used
 * with search-based filtering, exclusion-based filtering, or direct WHERE clauses.
 *
 * @template Entity The entity type that the options apply to
 *
 * @example
 * ```typescript
 * // Generic function that accepts any type of filtering options for multiple entities
 * async function findManyUsers(options: GetManyOptions<User>): Promise<[User[], number]> {
 *   return userRepository.findManyAndCount(options);
 * }
 *
 * // Can be called with any of the supported filtering approaches
 * const [users1, count1] = await findManyUsers({
 *   search: { name: Like('%john%') },
 *   pagination: { page: 1, limit: 10 }
 * });
 *
 * const [users2, count2] = await findManyUsers({
 *   not: { role: 'admin' },
 *   pagination: { page: 1, limit: 10 }
 * });
 *
 * const [users3, count3] = await findManyUsers({
 *   where: [{ role: 'admin' }, { status: 'premium' }],
 *   pagination: { page: 1, limit: 10 }
 * });
 * ```
 */
export type GetManyOptions<Entity> =
    | (GetManyOptionsFilter<Entity> & GetManyOptionsSearch<Entity> & GetManyOptionsNot<Entity>)
    | GetManyOptionsWhere<Entity>;

/**
 * Combined options type for save-and-get operations.
 *
 * This type combines SaveOptionsWithSkip and GetByIdOptions to provide a complete
 * configuration for operations that save an entity and then immediately retrieve
 * it by its ID. This is useful for scenarios where you need to save data and
 * then return the saved entity with all its computed properties, relations, and
 * database-generated values.
 *
 * The type inherits all save options (including the skipCreate functionality)
 * and all retrieval options (excluding sort since it's not relevant for single
 * entity retrieval by ID).
 *
 * @template Entity The entity type that the options apply to
 *
 * @example
 * ```typescript
 * // Save a user and retrieve it with profile relation loaded
 * const options: SaveAndGetOptions<User> = {
 *   skipCreate: false,
 *   transaction: false,
 *   relations: ['profile'],
 *   options: { cache: true }
 * };
 * const savedUser = await userService.saveAndGet(userData, options);
 * ```
 *
 * @example
 * ```typescript
 * // Update existing user only (skip creation) and retrieve with relations
 * const options: SaveAndGetOptions<User> = {
 *   skipCreate: true,
 *   reload: true,
 *   relations: ['profile', 'posts'],
 *   manager: transactionManager
 * };
 * const updatedUser = await userService.saveAndGet(userData, options);
 * ```
 */
export type SaveAndGetOptions<Entity> = SaveOptionsWithSkip & GetByIdOptions<Entity>;
