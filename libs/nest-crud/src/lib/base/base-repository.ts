// noinspection JSUnusedGlobalSymbols

import {
    GetByIdOptions,
    GetByIdsOptions,
    GetManyOptions,
    GetOneOptions,
    GetOneOptionsNot,
    GetOneOptionsSearch,
    GetOptions,
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
    In,
    Not,
    Repository,
    SaveOptions,
    UpdateResult,
} from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
import { FindConditions } from "../types";
import { EntityId, Model, ModelExtension } from "@hichchi/nest-connector/crud";

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
 * @template TEntity - The entity type this repository manages. This type parameter represents
 *                    the entity class that the repository will work with. It must extend either
 *                    the Model interface (for full entities with audit tracking) or the
 *                    ModelExtension interface (for lightweight entity extensions).
 *
 *                    The TEntity type is used throughout the repository to provide type safety
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
 *   // The TEntity type parameter ensures type safety for all operations
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
export class BaseRepository<TEntity extends Model | ModelExtension> extends Repository<TEntity> {
    /**
     * Static property to store the current transaction manager
     * Used to ensure all operations within a transaction use the same manager
     * @private
     */
    private static _transactionalManager?: EntityManager;

    /**
     * Constructor for the BaseRepository
     *
     * @param {Repository<TEntity>} repository - The TypeORM repository to extend
     */
    constructor(repository: Repository<TEntity>) {
        super(repository?.target, repository?.manager, repository?.queryRunner);
    }

    /**
     * Get the appropriate repository instance for the current context
     *
     * This getter returns a repository that uses the transaction manager if one exists,
     * or the default manager otherwise. This ensures that all operations within a
     * transaction use the same manager.
     *
     * @returns {Repository<TEntity>} The repository instance for the current context
     *
     * @see {@link transaction} Method that sets up the transaction manager
     * @see {@link Repository} TypeORM's Repository class
     */
    get entityRepository(): Repository<TEntity> {
        return (BaseRepository._transactionalManager ?? this.manager).getRepository(this.target);
    }

    /**
     * Create a new entity instance
     *
     * This overload creates an empty entity instance with default values.
     *
     * @returns {TEntity} A new entity instance
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
    override create(): TEntity;

    /**
     * Create a new entity instance with the provided data
     *
     * This overload creates an entity instance populated with the provided data.
     *
     * @template T - The type of the entity data
     * @template TEntity - The entity type this repository manages
     * @param {T} entityLike - The data to populate the entity with
     * @returns {TEntity} A new entity instance
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
    override create<T extends DeepPartial<TEntity>>(entityLike: T): TEntity;

    /**
     * Create multiple entity instances
     *
     * This overload creates multiple entity instances from an array of data.
     *
     * @template T - The type of the entity data
     * @template TEntity - The entity type this repository manages
     * @param {T[]} entityLikeArray - Array of data to create entities with
     * @returns {TEntity[]} Array of new entity instances
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
    override create<T extends DeepPartial<TEntity>>(entityLikeArray: T[]): TEntity[];

    /**
     * Implementation of the create method
     *
     * This is the actual implementation that handles all the overloads.
     *
     * @template T - The type of the entity data
     * @template TEntity - The entity type this repository manages
     * @param {T | T[]} [entityLike] - The data to create entities with
     * @returns {TEntity | TEntity[]} One or more entity instances
     */
    override create<T extends DeepPartial<TEntity>>(entityLike?: T | T[]): TEntity | TEntity[] {
        return super.create(entityLike as T);
    }

    /**
     * Save an entity to the database
     *
     * This method creates an entity from the provided data and saves it to the database.
     *
     * @template T - The type of the entity data
     * @template TEntity - The entity type this repository manages
     * @param {T} entityLike - The entity data to save
     * @param {SaveOptions} [options] - Options for the save operation
     * @returns {Promise<T & TEntity>} The saved entity
     *
     * @example
     * ```typescript
     * const user = await userRepository.save({
     *   firstName: 'John',
     *   lastName: 'Doe',
     *   email: 'john.doe@example.com'
     * });
     * ```
     *
     * @see {@link Repository.save} TypeORM's save method that this extends
     * @see {@link create} Method used to create the entity before saving
     * @see {@link SaveOptions} TypeORM's options for save operations
     * @see {@link saveAndGet} Method to save and retrieve with relations
     * @see {@link saveMany} Method to save multiple entities
     */
    override save<T extends DeepPartial<TEntity>>(entityLike: T, options?: SaveOptions): Promise<T & TEntity> {
        return this.entityRepository.save(this.create(entityLike) as T, options);
    }

    /**
     * Save an entity and retrieve it with relations
     *
     * This method saves an entity and then retrieves it from the database with the specified relations.
     * It's useful when you need to immediately access related entities after saving.
     *
     * @template T - The type of the entity data
     * @template TEntity - The entity type this repository manages
     * @param {T} entityLike - The entity data to save
     * @param {SaveOptions & GetByIdOptions<TEntity>} [options] - Options for the save and get operations
     * @returns {Promise<TEntity | null>} The saved entity with relations
     *
     * @example
     * ```typescript
     * const user = await userRepository.saveAndGet(
     *   { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' },
     *   { relations: ['posts', 'profile'] }
     * );
     * ```
     *
     * @see {@link save} Method used to save the entity
     * @see {@link get} Method used to retrieve the entity with relations
     * @see {@link GetByIdOptions} Options for retrieving the entity
     * @see {@link SaveOptions} TypeORM's options for save operations
     */
    async saveAndGet<T extends DeepPartial<TEntity>>(
        entityLike: T,
        options?: SaveOptions & GetByIdOptions<TEntity>,
    ): Promise<TEntity | null> {
        const newEntity = await this.save(entityLike, options);
        return this.get(newEntity.id, options);
    }

    /**
     * Save multiple entities to the database
     *
     * This method creates entities from the provided data array and saves them to the database.
     *
     * @template T - The type of the entity data
     * @template TEntity - The entity type this repository manages
     * @param {T[]} entities - Array of entity data to save
     * @param {SaveOptions} [options] - Options for the save operation
     * @returns {Promise<(T & TEntity)[]>} Array of saved entities
     *
     * @example
     * ```typescript
     * const users = await userRepository.saveMany([
     *   { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' },
     *   { firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com' }
     * ]);
     * ```
     *
     * @see {@link Repository.save} TypeORM's save method that this uses internally
     * @see {@link create} Method used to create the entities before saving
     * @see {@link save} Method to save a single entity
     * @see {@link SaveOptions} TypeORM's options for save operations
     */
    saveMany<T extends DeepPartial<TEntity>>(entities: T[], options?: SaveOptions): Promise<(T & TEntity)[]> {
        return this.entityRepository.save(this.create(entities) as T[], options);
    }

    /**
     * Update an entity by ID
     *
     * This method updates an entity with the specified ID using the provided partial entity data.
     *
     * @template TEntity - The entity type this repository manages
     * @param {string} id - The ID of the entity to update
     * @param {QueryDeepPartialEntity<TEntity>} partialEntity - The partial entity data to apply
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
     * @see {@link QueryDeepPartialEntity} TypeORM's type for partial entity updates
     * @see {@link UpdateResult} TypeORM's result type for update operations
     */
    override update(id: EntityId, partialEntity: QueryDeepPartialEntity<TEntity>): Promise<UpdateResult> {
        return this.entityRepository.update(id, partialEntity);
    }

    /**
     * Update an entity and retrieve it with relations
     *
     * This method updates an entity and then retrieves it from the database with the specified relations.
     * It's useful when you need to immediately access the updated entity with its relations.
     *
     * @template TEntity - The entity type this repository manages
     * @param {string} id - The ID of the entity to update
     * @param {QueryDeepPartialEntity<TEntity>} partialEntity - The partial entity data to apply
     * @param {GetByIdOptions<TEntity>} [options] - Options for the get operation
     * @returns {Promise<TEntity | null>} The updated entity with relations
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
     * @see {@link update} Method used to update the entity
     * @see {@link get} Method used to retrieve the entity with relations
     * @see {@link saveAndGet} Similar method for saving and retrieving
     * @see {@link GetByIdOptions} Options for retrieving the entity
     * @see {@link QueryDeepPartialEntity} TypeORM's type for partial entity updates
     */
    async updateAndGet(
        id: EntityId,
        partialEntity: QueryDeepPartialEntity<TEntity>,
        options?: GetByIdOptions<TEntity>,
    ): Promise<TEntity | null> {
        await this.update(id, partialEntity);
        return this.get(id, options);
    }

    /**
     * Update a single entity matching the specified criteria
     *
     * This method updates the first entity that matches the provided where condition.
     *
     * @template TEntity - The entity type this repository manages
     * @param {FindOptionsWhere<TEntity>} where - The criteria to find the entity
     * @param {QueryDeepPartialEntity<TEntity>} partialEntity - The partial entity data to apply
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
     * @see {@link update} Method to update by ID
     * @see {@link updateMany} Method to update multiple entities
     * @see {@link FindOptionsWhere} TypeORM's type for where conditions
     * @see {@link QueryDeepPartialEntity} TypeORM's type for partial entity updates
     * @see {@link UpdateResult} TypeORM's result type for update operations
     */
    updateOne(where: FindOptionsWhere<TEntity>, partialEntity: QueryDeepPartialEntity<TEntity>): Promise<UpdateResult> {
        return this.entityRepository.update(where, partialEntity);
    }

    /**
     * Update multiple entities matching the specified criteria
     *
     * This method updates all entities that match the provided where condition.
     *
     * @template TEntity - The entity type this repository manages
     * @param {FindConditions<TEntity>} where - The criteria to find the entities
     * @param {QueryDeepPartialEntity<TEntity>} partialEntity - The partial entity data to apply
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
     * @see {@link update} Method to update by ID
     * @see {@link updateOne} Method to update a single entity by criteria
     * @see {@link updateByIds} Method to update multiple entities by their IDs
     * @see {@link FindConditions} Type for where conditions
     * @see {@link QueryDeepPartialEntity} TypeORM's type for partial entity updates
     * @see {@link UpdateResult} TypeORM's result type for update operations
     */
    updateMany(where: FindConditions<TEntity>, partialEntity: QueryDeepPartialEntity<TEntity>): Promise<UpdateResult> {
        return this.entityRepository.update(where, partialEntity);
    }

    /**
     * Update multiple entities by their IDs
     *
     * This method updates all entities with IDs in the provided array.
     *
     * @param {string[]} ids - Array of entity IDs to update
     * @param {QueryDeepPartialEntity<TEntity>} partialEntity - The partial entity data to apply
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
     * @see {@link update} Method to update a single entity by ID
     * @see {@link In} TypeORM's operator for IN queries
     * @see {@link EntityId} Type for entity IDs
     * @see {@link QueryDeepPartialEntity} TypeORM's type for partial entity updates
     * @see {@link UpdateResult} TypeORM's result type for update operations
     */
    updateByIds(ids: EntityId[], partialEntity: QueryDeepPartialEntity<TEntity>): Promise<UpdateResult> {
        return this.updateMany({ id: In(ids) } as FindConditions<TEntity>, partialEntity);
    }

    /**
     * Get an entity by ID
     *
     * This method retrieves an entity with the specified ID from the database.
     * It can include relations and other options for the query.
     *
     * @template TEntity - The entity type this repository manages
     * @param {string} id - The ID of the entity to retrieve
     * @param {GetByIdOptions<TEntity>} [options] - Options for the query
     * @returns {Promise<TEntity | null>} The entity if found, null otherwise
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
    get(id: EntityId, options?: GetByIdOptions<TEntity>): Promise<TEntity | null> {
        return this.getOne({
            ...options,
            where: { id } as FindOptionsWhere<TEntity>,
        });
    }

    /**
     * Get multiple entities by their IDs
     *
     * This method retrieves entities with IDs in the provided array from the database.
     * It can include relations, pagination, sorting, and other options for the query.
     *
     * @template TEntity - The entity type this repository manages
     * @param {GetByIdsOptions<TEntity>} getByIds - Options for the query including IDs
     * @returns {Promise<TEntity[]>} Array of entities matching the IDs
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
     * @see {@link get} Method to retrieve a single entity by ID
     * @see {@link In} TypeORM's operator for IN queries
     * @see {@link GetByIdsOptions} Options for retrieving entities by IDs
     * @see {@link EntityId} Type for entity IDs
     */
    async getByIds(getByIds: GetByIdsOptions<TEntity>): Promise<TEntity[]> {
        const { ids, relations, pagination, sort, options } = getByIds;
        const where = { id: In(ids) } as FindOptionsWhere<TEntity>;
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
     * @template TEntity - The entity type this repository manages
     * @param {GetOneOptions<TEntity>} getOne - Options for the query
     * @returns {Promise<TEntity | null>} The entity if found, null otherwise
     *
     * @example
     * ```typescript
     * const user = await userRepository.getOne({
     *   where: { email: 'john.doe@example.com' },
     *   relations: ['profile']
     * });
     * ```
     *
     * @see {@link Repository.findOne} TypeORM's findOne method that this uses internally
     * @see {@link get} Method to retrieve an entity by ID
     * @see {@link getMany} Method to retrieve multiple entities
     * @see {@link generateOptions} Method used to transform query options
     * @see {@link GetOneOptions} Options for retrieving a single entity
     * @see {@link FindOneOptions} TypeORM's options for findOne queries
     */
    getOne(getOne: GetOneOptions<TEntity>): Promise<TEntity | null> {
        return this.entityRepository.findOne(this.generateOptions(getOne));
    }

    /**
     * Get multiple entities matching the specified criteria
     *
     * This method retrieves all entities that match the provided criteria.
     * It returns both the entities and the total count.
     *
     * @template TEntity - The entity type this repository manages
     * @param {GetManyOptions<TEntity>} getMany - Options for the query
     * @returns {Promise<[TEntity[], number]>} Array of entities and total count
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
     * @see {@link Repository.findAndCount} TypeORM's findAndCount method that this uses internally
     * @see {@link getOne} Method to retrieve a single entity
     * @see {@link getByIds} Method to retrieve entities by their IDs
     * @see {@link generateOptions} Method used to transform query options
     * @see {@link GetManyOptions} Options for retrieving multiple entities
     * @see {@link FindManyOptions} TypeORM's options for find queries
     * @see {@link countMany} Method to count entities without retrieving them
     */
    getMany(getMany: GetManyOptions<TEntity>): Promise<[TEntity[], number]> {
        return this.entityRepository.findAndCount(this.generateOptions(getMany));
    }

    /**
     * Soft delete an entity by ID
     *
     * This method marks an entity as deleted without actually removing it from the database.
     * It sets the deletedAt timestamp to the current time.
     *
     * @template TEntity - The entity type this repository manages
     * @param {string} id - The ID of the entity to delete
     * @returns {Promise<DeleteResult>} The result of the delete operation
     *
     * @example
     * ```typescript
     * const result = await userRepository.delete('user-id');
     * ```
     *
     * @see {@link Repository.softDelete} TypeORM's softDelete method that this uses internally
     * @see {@link deleteByIds} Method to soft delete multiple entities by their IDs
     * @see {@link hardDelete} Method to permanently delete an entity
     * @see {@link EntityId} Type for entity IDs
     * @see {@link DeleteResult} TypeORM's result type for delete operations
     */
    override delete(id: EntityId): Promise<DeleteResult> {
        return this.entityRepository.softDelete(id);
    }

    /**
     * Soft delete multiple entities by their IDs
     *
     * This method marks multiple entities as deleted without actually removing them from the database.
     * It sets the deletedAt timestamp to the current time for all entities with IDs in the provided array.
     *
     * @template TEntity - The entity type this repository manages
     * @param {string[]} ids - Array of entity IDs to delete
     * @returns {Promise<DeleteResult>} The result of the delete operation
     *
     * @example
     * ```typescript
     * const result = await userRepository.deleteByIds(['user-id-1', 'user-id-2']);
     * ```
     *
     * @see {@link Repository.softDelete} TypeORM's softDelete method that this uses internally
     * @see {@link delete} Method to soft delete a single entity by ID
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
     * @template TEntity - The entity type this repository manages
     * @param {string} id - The ID of the entity to delete
     * @returns {Promise<DeleteResult>} The result of the delete operation
     *
     * @example
     * ```typescript
     * const result = await userRepository.hardDelete('user-id');
     * ```
     *
     * @see {@link Repository.delete} TypeORM's delete method that this uses internally
     * @see {@link delete} Method to soft delete an entity
     * @see {@link hardDeleteByIds} Method to permanently delete multiple entities
     * @see {@link EntityId} Type for entity IDs
     * @see {@link DeleteResult} TypeORM's result type for delete operations
     */
    hardDelete(id: EntityId): Promise<DeleteResult> {
        return this.entityRepository.delete(id);
    }

    /**
     * Permanently delete multiple entities by their IDs
     *
     * This method permanently removes multiple entities from the database.
     * Unlike the deleteByIds method, this cannot be undone.
     *
     * @template TEntity - The entity type this repository manages
     * @param {string[]} ids - Array of entity IDs to delete
     * @returns {Promise<DeleteResult>} The result of the delete operation
     *
     * @example
     * ```typescript
     * const result = await userRepository.hardDeleteByIds(['user-id-1', 'user-id-2']);
     * ```
     *
     * @see {@link Repository.delete} TypeORM's delete method that this uses internally
     * @see {@link hardDelete} Method to permanently delete a single entity
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
     * @template TEntity - The entity type this repository manages
     * @param {GetManyOptions<TEntity>} [options] - Options for the query
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
    countMany(options?: GetManyOptions<TEntity>): Promise<number> {
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
     * @template TEntity - The entity type this repository manages
     * @param {GetOptions<TEntity>} getOptions - The Hichchi query options
     * @returns {FindOneOptions<TEntity>} TypeORM query options
     *
     * @see {@link GetOptions} The high-level query options interface
     * @see {@link FindOneOptions} TypeORM's query options interface
     * @see {@link orWhere} Method used to process search and negation conditions
     * @see {@link getOne} Method that uses this to generate options
     * @see {@link getMany} Method that uses this to generate options
     * @see {@link ILike} TypeORM's case-insensitive LIKE operator
     * @see {@link Not} TypeORM's negation operator
     */
    generateOptions(getOptions: GetOptions<TEntity>): FindOneOptions<TEntity> {
        const { options, relations, pagination, sort } = getOptions ?? {};
        const opt = { ...(options || {}) } as FindManyOptions<TEntity>;

        opt.where = getOptions.where || getOptions.filters;

        const { search, not } = getOptions as GetOneOptionsSearch<TEntity> & GetOneOptionsNot<TEntity>;

        if (not) {
            opt.where = this.orWhere(opt.where as FindOptionsWhere<TEntity>, not, Not);
        } else if (search) {
            opt.where = this.orWhere(opt.where as FindOptionsWhere<TEntity>, search, ILike);
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
     * @template TEntity - The entity type this repository manages
     * @param {FindOptionsWhere<TEntity>} where - The base where condition
     * @param {FindOptionsWhere<TEntity>} search - The search or negation criteria
     * @param {<T>(value: FindOperator<T> | T) => FindOperator<T>} operator - The operator to apply (ILike or Not)
     * @returns {FindOptionsWhere<TEntity> | FindOptionsWhere<TEntity>[]} The resulting where condition(s)
     *
     * @see {@link mapWhere} The helper method used to apply operators to conditions
     * @see {@link generateOptions} Method that uses this to process search and negation conditions
     * @see {@link FindOptionsWhere} TypeORM's type for where conditions
     * @see {@link ILike} TypeORM's case-insensitive LIKE operator
     * @see {@link Not} TypeORM's negation operator
     * @see {@link FindOperator} TypeORM's operator class for query building
     */
    orWhere(
        where: FindOptionsWhere<TEntity>,
        search: FindOptionsWhere<TEntity>,
        operator: <T>(value: FindOperator<T> | T) => FindOperator<T>,
    ): FindOptionsWhere<TEntity> | FindOptionsWhere<TEntity>[] {
        const entries: [string, unknown][] = Object.entries(search);
        if (entries.length > 1) {
            const whr: FindOptionsWhere<TEntity>[] = [];
            entries.forEach(([key, value]) =>
                whr.push(this.mapWhere(where, { [key]: value } as FindOptionsWhere<TEntity>, operator, "%{}%")),
            );
            return whr;
        }
        return this.mapWhere(where, search, operator, "%{}%");
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
     * @see {@link mapWhere} Method that uses this to safely handle values
     * @see {@link In} Example of a FindOperator
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
     * - Applies operators to values (like ILike, Not, etc.)
     * - Supports string templating with the wrap parameter
     * - Preserves existing conditions when merging
     * - Maintains type safety throughout the transformation
     *
     * @template Entity - The entity type for the where conditions
     * @param {FindOptionsWhere<Entity>} where - The base where conditions to extend
     * @param {FindOptionsWhere<Entity>} data - The new conditions to apply
     * @param {<T>(value: T | FindOperator<T>) => FindOperator<T>} [operator] - Optional operator to apply to values
     * @param {`${string}{}${string}`} [wrap] - Optional template for wrapping string values
     * @returns {FindOptionsWhere<Entity>} The resulting where conditions
     *
     * @see {@link FindOptionsWhere} TypeORM's where conditions type
     * @see {@link FindOperator} TypeORM's operator class for query building
     * @see {@link orWhere} Method that uses this to process search and negation conditions
     * @see {@link isFindOperator} Method used to check if a value is a FindOperator
     * @see {@link ILike} Example of an operator that can be applied
     * @see {@link Not} Example of an operator that can be applied
     * @see {@link In} Example of an operator that can be applied
     */
    mapWhere<Entity>(
        where: FindOptionsWhere<Entity>,
        data: FindOptionsWhere<Entity>,
        operator?: <T>(value: T | FindOperator<T>) => FindOperator<T>,
        wrap?: `${string}{}${string}`,
    ): FindOptionsWhere<Entity> {
        const whr: FindOptionsWhere<Entity> = where ? { ...where } : ({} as FindOptionsWhere<Entity>);

        for (const key in data) {
            if (!Object.prototype.hasOwnProperty.call(data, key)) continue;

            const value = data[key];
            const existing = whr[key];

            if (value === undefined) continue;

            if (value !== null && typeof value === "object" && !this.isFindOperator(value)) {
                // Safely infer nested key value types
                type K = keyof Entity;
                type NestedValue = Entity[K];

                whr[key as keyof Entity] = this.mapWhere(
                    (existing ?? {}) as FindOptionsWhere<NestedValue>,
                    value as FindOptionsWhere<NestedValue>,
                    operator,
                    wrap,
                ) as FindOptionsWhere<Entity>[keyof Entity];
            } else {
                let input: string | typeof value = value;

                if (typeof value === "string" && wrap) {
                    input = wrap.replace("{}", value) as typeof value;
                }

                if (operator) {
                    whr[key as keyof Entity] = operator(input) as FindOptionsWhere<Entity>[keyof Entity];
                } else {
                    whr[key as keyof Entity] = input as FindOptionsWhere<Entity>[keyof Entity];
                }
            }
        }

        return whr;
    }
}
