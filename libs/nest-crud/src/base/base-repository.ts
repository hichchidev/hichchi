// noinspection JSUnusedGlobalSymbols

import {
    GetByIdOptions,
    GetByIdsOptions,
    GetManyOptions,
    GetOneOptions,
    GetOptions,
    SaveAndGetOptions,
    SaveOptionsWithSkip,
} from "../interfaces";
import {
    DeepPartial,
    DeleteResult,
    EntityManager,
    FindManyOptions,
    FindOneOptions,
    FindOperator,
    FindOptionsWhere,
    ILike,
    IsNull,
    Not,
    ObjectId,
    QueryDeepPartialEntity,
    Repository,
    UpdateResult,
} from "typeorm";
import { FindConditions } from "../types";
import { EntityDeepPartial, EntityId, Model, ModelExtension, QueryDeepPartial } from "@hichchi/nest-connector/crud";
import { toDeepPartial, toFindOptionsWhere } from "../utils/repository.utils";

/**
 * Base Repository Class that extends TypeORM's Repository with enhanced functionality
 *
 * This class extends TypeORM's Repository class and provides additional functionality
 * for working with entities. It serves as the foundation for all repositories in the
 * application, ensuring consistent data access patterns and reducing boilerplate code.
 *
 * Key features:
 * - Enhanced CRUD operations with more intuitive methods
 * - Automatic transaction management
 * - Advanced query building with support for complex filters
 * - Soft delete support with both soft and hard delete methods
 * - Convenience methods for common operations like saveAndGet, updateAndGet
 * - Type-safe query building with proper TypeScript support
 *
 * The class is designed to be used with the HichchiRepository decorator, which
 * automatically injects the TypeORM repository and handles dependency injection.
 *
 * @template Entity - The entity type this repository manages. This type parameter represents
 *                    the entity class that the repository will work with. It must extend either
 *                    the Model interface (for full entities with audit tracking) or the
 *                    ModelExtension interface (for lightweight entity extensions).
 *
 *                    The Entity type is used throughout the repository to provide type safety
 *                    for all operations, ensuring that only properties and methods available
 *                    on the entity can be accessed. It's also used to type the return values
 *                    of query methods, making the API fully type-safe.
 *
 *                    Common entity types used with this repository include:
 *                    - UserEntity - For user data management
 *                    - ProductEntity - For product data management
 *                    - Any custom entity that extends BaseEntity or BaseEntityExtension
 *
 * @example
 * ```typescript
 * // Basic repository for UserEntity
 * @HichchiRepository(UserEntity)
 * export class UserRepository extends BaseRepository<UserEntity> {
 *   // Custom methods specific to UserEntity
 *   async findByEmail(email: string): Promise<UserEntity | null> {
 *     return this.getOne({ where: { email } });
 *   }
 * }
 * ```
 *
 * @example
 * ```typescript
 * // Repository for a lightweight entity extension
 * @HichchiRepository(ProductImageEntity)
 * export class ProductImageRepository extends BaseRepository<ProductImageEntity> {
 *   // The Entity type parameter ensures type safety for all operations
 *   async findByProductId(productId: string): Promise<ProductImageEntity[]> {
 *     return this.getMany({
 *       where: { product: { id: productId } },
 *       relations: ['product']
 *     }).then(([images]) => images);
 *   }
 * }
 * ```
 *
 * @see {@link HichchiRepository} The decorator used to create repository instances
 * @see {@link Model} The base interface for entities with full audit tracking
 * @see {@link ModelExtension} The base interface for lightweight entity extensions
 * @see {@link BaseEntity} The base class for entities with full audit tracking
 * @see {@link BaseEntityExtension} The base class for lightweight entity extensions
 */
export class BaseRepository<Entity extends Model | ModelExtension> extends Repository<Entity> {
    /**
     * Static property to store the current transaction manager
     * Used to ensure all operations within a transaction use the same manager
     * @private
     */
    private static _transactionalManager?: EntityManager;

    /**
     * Constructor for the BaseRepository
     *
     * @param {Repository<Entity>} repository - The TypeORM repository to extend
     */
    constructor(repository: Repository<Entity>) {
        super(repository?.target, repository?.manager, repository?.queryRunner);
    }

    /**
     * Get the appropriate repository instance for the current context
     *
     * This getter returns a repository that uses the transaction manager if one exists,
     * or the default manager otherwise. This ensures that all operations within a
     * transaction use the same manager.
     *
     * @returns {Repository<Entity>} The repository instance for the current context
     *
     * @see {@link transaction} Method that sets up the transaction manager
     * @see {@link Repository} TypeORM's Repository class
     */
    get entityRepository(): Repository<Entity> {
        return (BaseRepository._transactionalManager ?? this.manager).getRepository(this.target);
    }

    /**
     * Create a new entity instance
     *
     * This overload creates an empty entity instance with default values.
     *
     * @returns {Entity} A new entity instance
     *
     * @example
     * ```typescript
     * const user = userRepository.create();
     * user.firstName = 'John';
     * user.lastName = 'Doe';
     * ```
     *
     * @see {@link Repository.create} TypeORM's create method that this extends
     * @see {@link DeepPartial} TypeORM's type for partial entity data
     */
    override create(): Entity;

    /**
     * Create a new entity instance with the provided data
     *
     * This overload creates an entity instance populated with the provided data.
     *
     * @template T - The type of the entity data
     * @template Entity - The entity type this repository manages
     * @param {T} entityLike - The data to populate the entity with
     * @returns {Entity} A new entity instance
     *
     * @example
     * ```typescript
     * const user = userRepository.create({
     *   firstName: 'John',
     *   lastName: 'Doe',
     *   email: 'john.doe@example.com'
     * });
     * ```
     *
     * @see {@link Repository.create} TypeORM's create method that this extends
     * @see {@link DeepPartial} TypeORM's type for partial entity data
     */
    override create<T extends EntityDeepPartial<Entity>>(entityLike: T): Entity;

    /**
     * Create multiple entity instances
     *
     * This overload creates multiple entity instances from an array of data.
     *
     * @template T - The type of the entity data
     * @template Entity - The entity type this repository manages
     * @param {T[]} entityLikeArray - Array of data to create entities with
     * @returns {Entity[]} Array of new entity instances
     *
     * @example
     * ```typescript
     * const users = userRepository.create([
     *   { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' },
     *   { firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com' }
     * ]);
     * ```
     *
     * @see {@link Repository.create} TypeORM's create method that this extends
     * @see {@link DeepPartial} TypeORM's type for partial entity data
     */
    override create<T extends EntityDeepPartial<Entity>>(entityLikeArray: T[]): Entity[];

    /**
     * Implementation of the create method
     *
     * This is the actual implementation that handles all the overloads.
     *
     * @template T - The type of the entity data
     * @template Entity - The entity type this repository manages
     * @param {T | T[]} [entityLike] - The data to create entities with
     * @returns {Entity | Entity[]} One or more entity instances
     */
    override create<T extends EntityDeepPartial<Entity>>(entityLike?: T | T[]): Entity | Entity[] {
        return super.create(
            (Array.isArray(entityLike)
                ? entityLike.map(e => toDeepPartial<Entity>(e))
                : toDeepPartial<Entity>(entityLike)) as DeepPartial<Entity>[],
        );
    }

    /**
     * Save an entity to the database
     *
     * This method creates an entity from the provided data and saves it to the database.
     * It supports an optional skipCreate flag to bypass entity creation when the data
     * is already a properly formed entity instance.
     *
     * @template T - The type of the entity data
     * @template Entity - The entity type this repository manages
     * @param {T} entityLike - The entity data to save
     * @param {SaveOptionsWithSkip} [options] - Options for the save operation, including skipCreate flag
     * @param {boolean} [options.skipCreate] - If true, skips entity creation and saves the data directly
     * @returns {Promise<Entity>} The saved entity
     *
     * @example
     * ```typescript
     * // Save with entity creation (default behavior)
     * const user = await userRepository.saveOne({
     *   firstName: 'John',
     *   lastName: 'Doe',
     *   email: 'john.doe@example.com'
     * });
     * ```
     *
     * @example
     * ```typescript
     * // Save without entity creation (when data is already an entity)
     * const existingUser = await userRepository.getById('user-id');
     * existingUser.firstName = 'Updated Name';
     * const savedUser = await userRepository.saveOne(existingUser, { skipCreate: true });
     * ```
     *
     * @see {@link Repository.save} TypeORM's save method that this extends
     * @see {@link create} Method used to create the entity before saving (when skipCreate is false)
     * @see {@link SaveOptionsWithSkip} Extended save options with skipCreate flag
     * @see {@link saveAndGet} Method to save and retrieve with relations
     * @see {@link saveMany} Method to save multiple entities
     */
    saveOne<T extends EntityDeepPartial<Entity>>(entityLike: T, options?: SaveOptionsWithSkip): Promise<Entity> {
        return this.entityRepository.save(
            options?.skipCreate ? (entityLike as T & Entity) : this.create(entityLike),
            options,
        );
    }

    /**
     * Save an entity and retrieve it with relations
     *
     * This method saves an entity and then retrieves it from the database with the specified relations.
     * It's useful when you need to immediately access related entities after saving. The method combines
     * save and get operations with unified options that support both skipCreate functionality and
     * relation loading.
     *
     * @template T - The type of the entity data
     * @template Entity - The entity type this repository manages
     * @param {T} entityLike - The entity data to save
     * @param {SaveAndGetOptions<Entity>} [options] - Combined options for save and get operations
     * @param {boolean} [options.skipCreate] - If true, skips entity creation and saves the data directly
     * @param {string[]} [options.relations] - Relations to include when retrieving the saved entity
     * @returns {Promise<Entity | null>} The saved entity with relations, or null if not found
     *
     * @example
     * ```typescript
     * // Save new entity and retrieve with relations
     * const user = await userRepository.saveAndGet(
     *   { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' },
     *   { relations: ['posts', 'profile'] }
     * );
     * ```
     *
     * @example
     * ```typescript
     * // Save existing entity without creation and retrieve with relations
     * const existingUser = await userRepository.getById('user-id');
     * existingUser.firstName = 'Updated Name';
     * const savedUser = await userRepository.saveAndGet(existingUser, {
     *   skipCreate: true,
     *   relations: ['posts', 'profile']
     * });
     * ```
     *
     * @see {@link saveOne} Method used to save the entity
     * @see {@link getById} Method used to retrieve the entity with relations
     * @see {@link SaveAndGetOptions} Combined options for save and get operations
     * @see {@link SaveOptionsWithSkip} Extended save options with skipCreate flag
     * @see {@link GetByIdOptions} Options for retrieving the entity
     */
    async saveAndGet<T extends EntityDeepPartial<Entity>>(
        entityLike: T,
        options?: SaveAndGetOptions<Entity>,
    ): Promise<Entity | null> {
        const newEntity = await this.saveOne(entityLike, options);
        return this.getById(newEntity.id, options);
    }

    /**
     * Save multiple entities to the database
     *
     * This method creates entities from the provided data array and saves them to the database.
     * It supports an optional skipCreate flag to bypass entity creation when the data array
     * contains already properly formed entity instances.
     *
     * @template T - The type of the entity data
     * @template Entity - The entity type this repository manages
     * @param {T[]} entities - Array of entity data to save
     * @param {SaveOptionsWithSkip} [options] - Options for the save operation, including skipCreate flag
     * @param {boolean} [options.skipCreate] - If true, skips entity creation and saves the data directly
     * @returns {Promise<Entity[]>} Array of saved entities
     *
     * @example
     * ```typescript
     * // Save with entity creation (default behavior)
     * const users = await userRepository.saveMany([
     *   { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' },
     *   { firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com' }
     * ]);
     * ```
     *
     * @example
     * ```typescript
     * // Save without entity creation (when data is already entities)
     * const existingUsers = await userRepository.getByIds({
     *   ids: ['user-id-1', 'user-id-2']
     * });
     * existingUsers.forEach(user => user.isActive = true);
     * const savedUsers = await userRepository.saveMany(existingUsers, { skipCreate: true });
     * ```
     *
     * @see {@link Repository.save} TypeORM's save method that this uses internally
     * @see {@link create} Method used to create the entities before saving (when skipCreate is false)
     * @see {@link saveOne} Method to save a single entity
     * @see {@link SaveOptionsWithSkip} Extended save options with skipCreate flag
     */
    saveMany<T extends EntityDeepPartial<Entity>>(entities: T[], options?: SaveOptionsWithSkip): Promise<Entity[]> {
        return this.entityRepository.save(
            options?.skipCreate ? (entities as (T & Entity)[]) : this.create(entities),
            options,
        );
    }

    /**
     * Update an entity by ID
     *
     * This method updates an entity with the specified ID using the provided partial entity data.
     *
     * @template Entity - The entity type this repository manages
     * @param {string} id - The ID of the entity to update
     * @param {EntityDeepPartial<Entity>} partialEntity - The partial entity data to apply
     * @returns {Promise<UpdateResult>} The result of the update operation
     *
     * @example
     * ```typescript
     * const result = await userRepository.update('user-id', {
     *   firstName: 'Updated Name',
     *   email: 'updated.email@example.com'
     * });
     * ```
     *
     * @see {@link Repository.update} TypeORM's update method that this extends
     * @see {@link updateAndGet} Method to update and retrieve with relations
     * @see {@link updateOne} Method to update by criteria instead of ID
     * @see {@link updateMany} Method to update multiple entities
     * @see {@link updateByIds} Method to update multiple entities by their IDs
     * @see {@link EntityDeepPartial} TypeORM's type for partial entity updates
     * @see {@link UpdateResult} TypeORM's result type for update operations
     */
    updateById(id: EntityId, partialEntity: EntityDeepPartial<Entity>): Promise<UpdateResult> {
        return this.entityRepository.update(id, partialEntity as QueryDeepPartialEntity<Entity>);
    }

    /**
     * Update an entity and retrieve it with relations
     *
     * This method updates an entity and then retrieves it from the database with the specified relations.
     * It's useful when you need to immediately access the updated entity with its relations.
     *
     * @template Entity - The entity type this repository manages
     * @param {string} id - The ID of the entity to update
     * @param {EntityDeepPartial<Entity>} partialEntity - The partial entity data to apply
     * @param {GetByIdOptions<Entity>} [options] - Options for the get operation
     * @returns {Promise<Entity | null>} The updated entity with relations
     *
     * @example
     * ```typescript
     * const user = await userRepository.updateAndGet(
     *   'user-id',
     *   { firstName: 'Updated Name' },
     *   { relations: ['posts', 'profile'] }
     * );
     * ```
     *
     * @see {@link updateById} Method used to update the entity
     * @see {@link getById} Method used to retrieve the entity with relations
     * @see {@link saveAndGet} Similar method for saving and retrieving
     * @see {@link GetByIdOptions} Options for retrieving the entity
     * @see {@link EntityDeepPartial} TypeORM's type for partial entity updates
     */
    async updateAndGet(
        id: EntityId,
        partialEntity: EntityDeepPartial<Entity>,
        options?: GetByIdOptions<Entity>,
    ): Promise<Entity | null> {
        await this.updateById(id, partialEntity);
        return this.getById(id, options);
    }

    /**
     * Update a single entity matching the specified criteria
     *
     * This method updates the first entity that matches the provided where condition.
     *
     * @template Entity - The entity type this repository manages
     * @param {QueryDeepPartial<Entity>} where - The criteria to find the entity
     * @param {EntityDeepPartial<Entity>} partialEntity - The partial entity data to apply
     * @returns {Promise<UpdateResult>} The result of the update operation
     *
     * @example
     * ```typescript
     * const result = await userRepository.updateOne(
     *   { email: 'john.doe@example.com' },
     *   { firstName: 'Updated Name' }
     * );
     * ```
     *
     * @see {@link Repository.update} TypeORM's update method that this uses internally
     * @see {@link updateById} Method to update by ID
     * @see {@link updateMany} Method to update multiple entities
     * @see {@link QueryDeepPartial} TypeORM's type for where conditions
     * @see {@link EntityDeepPartial} TypeORM's type for partial entity updates
     * @see {@link UpdateResult} TypeORM's result type for update operations
     */
    updateOne(
        where: QueryDeepPartial<Entity> | QueryDeepPartial<Entity>[],
        partialEntity: EntityDeepPartial<Entity>,
    ): Promise<UpdateResult> {
        return this.entityRepository.update(toFindOptionsWhere(where), partialEntity as QueryDeepPartialEntity<Entity>);
    }

    /**
     * Update multiple entities matching the specified criteria
     *
     * This method updates all entities that match the provided where condition.
     *
     * @template Entity - The entity type this repository manages
     * @param {FindConditions<Entity>} where - The criteria to find the entities
     * @param {EntityDeepPartial<Entity>} partialEntity - The partial entity data to apply
     * @returns {Promise<UpdateResult>} The result of the update operation
     *
     * @example
     * ```typescript
     * const result = await userRepository.updateMany(
     *   { role: 'user' },
     *   { isActive: true }
     * );
     * ```
     *
     * @see {@link Repository.update} TypeORM's update method that this uses internally
     * @see {@link updateById} Method to update by ID
     * @see {@link updateOne} Method to update a single entity by criteria
     * @see {@link updateByIds} Method to update multiple entities by their IDs
     * @see {@link FindConditions} Type for where conditions
     * @see {@link EntityDeepPartial} TypeORM's type for partial entity updates
     * @see {@link UpdateResult} TypeORM's result type for update operations
     */
    updateMany(where: FindConditions<Entity>, partialEntity: EntityDeepPartial<Entity>): Promise<UpdateResult> {
        return this.entityRepository.update(
            where instanceof ObjectId || where instanceof Date || typeof where === "string" || typeof where === "number"
                ? where
                : Array.isArray(where)
                  ? where.every(
                        w =>
                            w instanceof ObjectId ||
                            w instanceof Date ||
                            typeof w === "string" ||
                            typeof w === "number",
                    )
                      ? where
                      : toFindOptionsWhere(where)
                  : toFindOptionsWhere(where),
            partialEntity as QueryDeepPartialEntity<Entity>,
        );
    }

    /**
     * Update multiple entities by their IDs
     *
     * This method updates all entities with IDs in the provided array.
     *
     * @param {string[]} ids - Array of entity IDs to update
     * @param {EntityDeepPartial<Entity>} partialEntity - The partial entity data to apply
     * @returns {Promise<UpdateResult>} The result of the update operation
     *
     * @example
     * ```typescript
     * const result = await userRepository.updateByIds(
     *   ['user-id-1', 'user-id-2', 'user-id-3'],
     *   { isActive: true }
     * );
     * ```
     *
     * @see {@link updateMany} Method used internally to perform the update
     * @see {@link updateById} Method to update a single entity by ID
     * @see {@link EntityId} Type for entity IDs
     * @see {@link EntityDeepPartial} TypeORM's type for partial entity updates
     * @see {@link UpdateResult} TypeORM's result type for update operations
     */
    updateByIds(ids: EntityId[], partialEntity: EntityDeepPartial<Entity>): Promise<UpdateResult> {
        return this.updateMany(ids, partialEntity);
    }

    /**
     * Get an entity by ID
     *
     * This method retrieves an entity with the specified ID from the database.
     * It can include relations and other options for the query.
     *
     * @template Entity - The entity type this repository manages
     * @param {string} id - The ID of the entity to retrieve
     * @param {GetByIdOptions<Entity>} [options] - Options for the query
     * @returns {Promise<Entity | null>} The entity if found, null otherwise
     *
     * @example
     * ```typescript
     * const user = await userRepository.get('user-id', {
     *   relations: ['posts', 'profile']
     * });
     * ```
     *
     * @see {@link getOne} Method used internally to perform the query
     * @see {@link getByIds} Method to retrieve multiple entities by their IDs
     * @see {@link getMany} Method to retrieve multiple entities by criteria
     * @see {@link EntityId} Type for entity IDs
     * @see {@link GetByIdOptions} Options for retrieving an entity by ID
     */
    getById(id: EntityId, options?: GetByIdOptions<Entity>): Promise<Entity | null> {
        return this.getOne({
            ...options,
            where: { id } as QueryDeepPartial<Entity>,
        });
    }

    /**
     * Get multiple entities by their IDs
     *
     * This method retrieves entities with IDs in the provided array from the database.
     * It can include relations, pagination, sorting, and other options for the query.
     *
     * @template Entity - The entity type this repository manages
     * @param {GetByIdsOptions<Entity>} getByIds - Options for the query including IDs
     * @returns {Promise<Entity[]>} Array of entities matching the IDs
     *
     * @example
     * ```typescript
     * const users = await userRepository.getByIds({
     *   ids: ['user-id-1', 'user-id-2', 'user-id-3'],
     *   relations: ['profile'],
     *   sort: { firstName: 'ASC' }
     * });
     * ```
     *
     * @see {@link getMany} Method used internally to perform the query
     * @see {@link getById} Method to retrieve a single entity by ID
     * @see {@link GetByIdsOptions} Options for retrieving entities by IDs
     * @see {@link EntityId} Type for entity IDs
     */
    async getByIds(getByIds: GetByIdsOptions<Entity>): Promise<Entity[]> {
        const { ids, relations, pagination, sort, options } = getByIds;
        const where = { id: ids } as QueryDeepPartial<Entity>;
        const [entities] = await this.getMany({
            relations,
            pagination,
            sort,
            options,
            where,
        });
        return entities;
    }

    /**
     * Get a single entity matching the specified criteria
     *
     * This method retrieves the first entity that matches the provided criteria.
     *
     * @template Entity - The entity type this repository manages
     * @param {GetOneOptions<Entity>} getOne - Options for the query
     * @returns {Promise<Entity | null>} The entity if found, null otherwise
     *
     * @example
     * ```typescript
     * const user = await userRepository.getOne({
     *   where: { email: 'john.doe@example.com' },
     *   relations: ['profile']
     * });
     * ```
     *
     * @see {@link getById} Method to retrieve an entity by ID
     * @see {@link getMany} Method to retrieve multiple entities
     * @see {@link generateOptions} Method used to transform query options
     * @see {@link GetOneOptions} Options for retrieving a single entity
     * @see {@link FindOneOptions} TypeORM's options for findOne queries
     */
    getOne(getOne: GetOneOptions<Entity>): Promise<Entity | null> {
        return this.entityRepository.findOne(this.generateOptions(getOne));
    }

    /**
     * Get multiple entities matching the specified criteria
     *
     * This method retrieves all entities that match the provided criteria.
     * It returns both the entities and the total count.
     *
     * @template Entity - The entity type this repository manages
     * @param {GetManyOptions<Entity>} getMany - Options for the query
     * @returns {Promise<[Entity[], number]>} Array of entities and total count
     *
     * @example
     * ```typescript
     * const [users, count] = await userRepository.getMany({
     *   where: { role: 'user' },
     *   relations: ['profile'],
     *   pagination: { skip: 0, take: 10 },
     *   sort: { createdAt: 'DESC' }
     * });
     * ```
     *
     * @see {@link getOne} Method to retrieve a single entity
     * @see {@link getByIds} Method to retrieve entities by their IDs
     * @see {@link generateOptions} Method used to transform query options
     * @see {@link GetManyOptions} Options for retrieving multiple entities
     * @see {@link FindManyOptions} TypeORM's options for find queries
     * @see {@link countMany} Method to count entities without retrieving them
     */
    getMany(getMany: GetManyOptions<Entity>): Promise<[Entity[], number]> {
        return this.entityRepository.findAndCount(this.generateOptions(getMany));
    }

    /**
     * Soft delete an entity by ID
     *
     * This method marks an entity as deleted without actually removing it from the database.
     * It sets the deletedAt timestamp to the current time.
     *
     * @template Entity - The entity type this repository manages
     * @param {string} id - The ID of the entity to delete
     * @returns {Promise<DeleteResult>} The result of the delete operation
     *
     * @example
     * ```typescript
     * const result = await userRepository.delete('user-id');
     * ```
     *
     * @see {@link deleteByIds} Method to soft delete multiple entities by their IDs
     * @see {@link hardDeleteById} Method to permanently delete an entity
     * @see {@link EntityId} Type for entity IDs
     * @see {@link DeleteResult} TypeORM's result type for delete operations
     */
    deleteById(id: EntityId): Promise<DeleteResult> {
        return this.entityRepository.softDelete(id);
    }

    /**
     * Soft delete multiple entities by their IDs
     *
     * This method marks multiple entities as deleted without actually removing them from the database.
     * It sets the deletedAt timestamp to the current time for all entities with IDs in the provided array.
     *
     * @template Entity - The entity type this repository manages
     * @param {string[]} ids - Array of entity IDs to delete
     * @returns {Promise<DeleteResult>} The result of the delete operation
     *
     * @example
     * ```typescript
     * const result = await userRepository.deleteByIds(['user-id-1', 'user-id-2']);
     * ```
     *
     * @see {@link deleteById} Method to soft delete a single entity by ID
     * @see {@link hardDeleteByIds} Method to permanently delete multiple entities
     * @see {@link EntityId} Type for entity IDs
     * @see {@link DeleteResult} TypeORM's result type for delete operations
     */
    deleteByIds(ids: EntityId[]): Promise<DeleteResult> {
        return this.entityRepository.softDelete(ids);
    }

    /**
     * Permanently delete an entity by ID
     *
     * This method permanently removes an entity from the database.
     * Unlike the delete method, this cannot be undone.
     *
     * @template Entity - The entity type this repository manages
     * @param {string} id - The ID of the entity to delete
     * @returns {Promise<DeleteResult>} The result of the delete operation
     *
     * @example
     * ```typescript
     * const result = await userRepository.hardDelete('user-id');
     * ```
     *
     * @see {@link Repository.delete} TypeORM's delete method that this uses internally
     * @see {@link deleteById} Method to soft delete an entity
     * @see {@link hardDeleteByIds} Method to permanently delete multiple entities
     * @see {@link EntityId} Type for entity IDs
     * @see {@link DeleteResult} TypeORM's result type for delete operations
     */
    hardDeleteById(id: EntityId): Promise<DeleteResult> {
        return this.entityRepository.delete(id);
    }

    /**
     * Permanently delete multiple entities by their IDs
     *
     * This method permanently removes multiple entities from the database.
     * Unlike the deleteByIds method, this cannot be undone.
     *
     * @template Entity - The entity type this repository manages
     * @param {string[]} ids - Array of entity IDs to delete
     * @returns {Promise<DeleteResult>} The result of the delete operation
     *
     * @example
     * ```typescript
     * const result = await userRepository.hardDeleteByIds(['user-id-1', 'user-id-2']);
     * ```
     *
     * @see {@link Repository.delete} TypeORM's delete method that this uses internally
     * @see {@link hardDeleteById} Method to permanently delete a single entity
     * @see {@link deleteByIds} Method to soft delete multiple entities
     * @see {@link EntityId} Type for entity IDs
     * @see {@link DeleteResult} TypeORM's result type for delete operations
     */
    hardDeleteByIds(ids: EntityId[]): Promise<DeleteResult> {
        return this.entityRepository.delete(ids);
    }

    /**
     * Count entities matching the specified criteria
     *
     * This method counts the number of entities that match the provided criteria.
     *
     * @template Entity - The entity type this repository manages
     * @param {GetManyOptions<Entity>} [options] - Options for the query
     * @returns {Promise<number>} The count of matching entities
     *
     * @example
     * ```typescript
     * const count = await userRepository.countMany({
     *   where: { role: 'user', isActive: true }
     * });
     * ```
     *
     * @see {@link Repository.count} TypeORM's count method that this uses internally
     * @see {@link getMany} Method to retrieve entities and their count
     * @see {@link generateOptions} Method used to transform query options
     * @see {@link GetManyOptions} Options for retrieving multiple entities
     */
    countMany(options?: GetManyOptions<Entity>): Promise<number> {
        return this.entityRepository.count(options ? this.generateOptions(options) : { withDeleted: false });
    }

    /**
     * Execute operations within a transaction
     *
     * This method ensures that all database operations within the provided function
     * are executed in a single transaction. If any operation fails, all changes are rolled back.
     *
     * @template T - The return type of the operation
     * @param {(manager: EntityManager) => Promise<T>} operation - Function containing the operations to execute
     * @returns {Promise<T>} The result of the operation
     *
     * @example
     * ```TypeScript
     * const result = await userRepository.transaction(async (manager) => {
     *   const user = await manager.getRepository(UserEntity).save({
     *     firstName: 'John',
     *     lastName: 'Doe',
     *     email: 'john.doe@example.com'
     *   });
     *
     *   const profile = await manager.getRepository(ProfileEntity).save({
     *     userId: user.id,
     *     bio: 'Software developer'
     *   });
     *
     *   return { user, profile };
     * });
     * ```
     *
     * @see {@link EntityManager} TypeORM's transaction manager
     * @see {@link entityRepository} Getter that uses the transaction manager
     * @see {@link Repository.manager} TypeORM's entity manager
     * @see {@link Repository.transaction} TypeORM's transaction method
     */
    transaction<T>(operation: (manager: EntityManager) => Promise<T>): Promise<T> {
        if (BaseRepository._transactionalManager) {
            return operation(BaseRepository._transactionalManager);
        }
        return this.manager.transaction(async (manager: EntityManager): Promise<T> => {
            BaseRepository._transactionalManager = manager;
            try {
                return await operation(manager);
            } finally {
                BaseRepository._transactionalManager = undefined;
            }
        });
    }

    /**
     * Generate TypeORM query options from Hichchi query options
     *
     * This utility method transforms the high-level query options used in Hichchi
     * repositories into the lower-level options expected by TypeORM. It handles
     * various query aspects including:
     * - Where conditions and filters
     * - Search conditions with ILike operators
     * - Negation conditions with Not operators
     * - Relations to include
     * - Pagination parameters
     * - Sorting options
     *
     * The method also ensures that soft-deleted entities are excluded by default.
     *
     * @template Entity - The entity type this repository manages
     * @param {GetOptions<Entity>} getOptions - The Hichchi query options
     * @returns {FindOneOptions<Entity>} TypeORM query options
     *
     * @see {@link GetOptions} The high-level query options interface
     * @see {@link FindOneOptions} TypeORM's query options interface
     * @see {@link orWhere} Method used to process search and negation conditions
     * @see {@link getOne} Method that uses this to generate options
     * @see {@link getMany} Method that uses this to generate options
     * @see {@link ILike} TypeORM's case-insensitive LIKE operator
     * @see {@link Not} TypeORM's negation operator
     */
    generateOptions(getOptions: GetOptions<Entity>): FindOneOptions<Entity> {
        const { options, relations, pagination, sort } = getOptions ?? {};
        const opt = { ...(options || {}) } as FindManyOptions<Entity>;

        opt.where = toFindOptionsWhere(getOptions.where || getOptions.filters);

        const { search, not } = getOptions;

        // if (not) {
        //     opt.where = this.orWhere(opt.where as FindOptionsWhere<Entity>, not, Not);
        // } else if (search) {
        //     opt.where = this.orWhere(opt.where as FindOptionsWhere<Entity>, search, ILike);
        // }

        if (not) {
            opt.where = this.mapAndWhere(opt.where as FindOptionsWhere<Entity>, not, Not);
        }

        if (search) {
            opt.where = this.mapAndWhere(opt.where as FindOptionsWhere<Entity>, search, ILike);
        }

        if (relations) {
            opt.relations = relations as string[];
        }

        if (pagination) {
            opt.take = pagination.take;
            opt.skip = pagination.skip;
        }

        if (sort) {
            opt.order = sort;
        }

        return { ...opt, withDeleted: false };
    }

    /**
     * Create OR conditions for search or negation queries
     *
     * This utility method creates OR conditions for search or negation queries.
     * When multiple search fields are provided, it creates an array of where conditions
     * that TypeORM will combine with OR logic.
     *
     * For search queries, it applies the ILike operator with wildcards (%{}%)
     * For negation queries, it applies the Not operator
     *
     * @template Entity - The entity type this repository manages
     * @param {FindOptionsWhere<Entity>} where - The base where condition
     * @param {FindOptionsWhere<Entity>} or - The search or negation criteria
     * @param {<T>(value: FindOperator<T> | T) => FindOperator<T>} operator - The operator to apply (ILike or Not)
     * @returns {FindOptionsWhere<Entity> | FindOptionsWhere<Entity>[]} The resulting where condition(s)
     *
     * @see {@link mapAndWhere} The helper method used to apply operators to conditions
     * @see {@link generateOptions} Method that uses this to process search and negation conditions
     * @see {@link FindOptionsWhere} TypeORM's type for where conditions
     * @see {@link ILike} TypeORM's case-insensitive LIKE operator
     * @see {@link Not} TypeORM's negation operator
     * @see {@link FindOperator} TypeORM's operator class for query building
     */
    orWhere(
        where: FindOptionsWhere<Entity>,
        or: QueryDeepPartial<Entity>,
        operator: <T>(value: FindOperator<T> | T) => FindOperator<T>,
    ): FindOptionsWhere<Entity> | FindOptionsWhere<Entity>[] {
        const entries: [string, unknown][] = Object.entries(or);
        if (entries.length > 1) {
            const whr: FindOptionsWhere<Entity>[] = [];
            entries.forEach(([key, value]) =>
                whr.push(this.mapAndWhere(where, { [key]: value } as QueryDeepPartial<Entity>, operator, "%{}%")),
            );
            return whr;
        }
        return this.mapAndWhere(where, or, operator, "%{}%");
    }

    /**
     * Type guard to check if a value is a TypeORM FindOperator
     *
     * This utility method determines if a value is a TypeORM FindOperator instance.
     * It's used as a type guard to safely handle values in query building.
     *
     * @template T - The type of value the operator would contain
     * @param {unknown} value - The value to check
     * @returns {boolean} True if the value is a FindOperator instance
     *
     * @see {@link FindOperator} TypeORM's operator class for query building
     * @see {@link mapAndWhere} Method that uses this to safely handle values
     * @see {@link ILike} Example of a FindOperator
     * @see {@link Not} Example of a FindOperator
     */
    isFindOperator<T>(value: unknown): value is FindOperator<T> {
        return value instanceof FindOperator;
    }

    /**
     * Map and transform where conditions with operators
     *
     * This utility method recursively processes where conditions, applying operators
     * and transformations as needed. It's a powerful helper for building complex
     * queries with nested conditions and operators.
     *
     * Key features:
     * - Handles nested objects recursively
     * - Applies operators to values (like ILike, Not, IsNull)
     * - Supports string templating with the wrap parameter
     * - Preserves existing conditions when merging
     * - Maintains type safety throughout the transformation
     * - Uses FindOptionsWhere for improved type safety
     *
     * @template T - The entity type for the where conditions
     * @param {FindOptionsWhere<T>} where - The base where conditions to extend
     * @param {FindOptionsWhere<T>} and - The new conditions to apply
     * @param {<V>(value: V | FindOperator<V>) => FindOperator<V>} [operator] - Optional operator to apply to values
     * @param {`${string}{}${string}`} [wrap] - Optional template for wrapping string values
     * @returns {FindOptionsWhere<T>} The resulting where conditions
     *
     * @see {@link FindOptionsWhere} TypeORM's where conditions type
     * @see {@link FindOperator} TypeORM's operator class for query building
     * @see {@link orWhere} Method that uses this to process search and negation conditions
     * @see {@link isFindOperator} Method used to check if a value is a FindOperator
     * @see {@link toFindOptionsWhere} Utility function for type-safe where condition conversion
     * @see {@link ILike} Example of an operator that can be applied
     * @see {@link Not} Example of an operator that can be applied
     * @see {@link IsNull} Example of an operator that can be applied
     */
    mapAndWhere<T = Entity>(
        where: FindOptionsWhere<T>,
        and: QueryDeepPartial<T>,
        operator?: <V>(value: V | FindOperator<V>) => FindOperator<V>,
        wrap?: `${string}{}${string}`,
    ): FindOptionsWhere<T> {
        // Start with a copy of the base where conditions
        const whr: FindOptionsWhere<T> = where ? { ...where } : {};

        // Process each key-value pair in the data
        for (const key in and) {
            if (!Object.prototype.hasOwnProperty.call(and, key)) continue;

            const value = and[key];
            if (value === undefined) continue;

            const existing = whr[key];

            // Handle nested objects recursively
            if (value !== null && typeof value === "object" && !this.isFindOperator(value)) {
                // For nested objects, recursively apply mapWhere
                const nestedExisting =
                    existing && typeof existing === "object" && !this.isFindOperator(existing) ? existing : {};

                // Type-safe recursive call for nested objects
                const nestedResult = this.mapAndWhere(
                    nestedExisting as FindOptionsWhere<NonNullable<T[keyof T]>>,
                    value,
                    operator,
                    wrap,
                );
                whr[key as keyof T] = nestedResult as FindOptionsWhere<T>[keyof T];
            } else {
                // Convert explicit null leaf values to SQL IS NULL semantics
                if (value === null) {
                    const nullCondition = IsNull();
                    whr[key as keyof T] = (
                        operator ? operator(nullCondition as FindOperator<unknown>) : nullCondition
                    ) as FindOptionsWhere<T>[keyof T];
                    continue;
                }

                // Handle primitive values and FindOperators
                let processedValue: string | typeof value = value;

                // Apply string wrapping if specified
                // noinspection SuspiciousTypeOfGuard
                if (typeof value === "string" && wrap) {
                    processedValue = wrap.replace("{}", value);
                }

                // Apply operator if provided and value is not already a FindOperator
                if (operator && !this.isFindOperator(processedValue)) {
                    const operatorResult = operator(processedValue);
                    whr[key as keyof T] = operatorResult as FindOptionsWhere<T>[keyof T];
                } else {
                    whr[key as keyof T] = processedValue as FindOptionsWhere<T>[keyof T];
                }
            }
        }

        return whr;
    }
}
