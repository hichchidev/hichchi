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
 * Base Repository Class
 *
 * This class extends TypeORM's Repository class and provides additional functionality
 * for working with entities. It includes enhanced methods for CRUD operations,
 * transaction management, and query building.
 *
 * All repositories in the application should extend this class to inherit the common
 * functionality and maintain consistency in data access patterns.
 *
 * @template BaseEntity - The entity type this repository manages, must extend IBaseEntity
 *
 * @example
 * ```TypeScript
 * @HichchiRepository(UserEntity)
 * export class UserRepository extends BaseRepository<UserEntity> {
 *   // Custom methods specific to UserEntity
 *   async findByEmail(email: string): Promise<UserEntity | null> {
 *     return this.getOne({ where: { email } });
 *   }
 * }
 * ```
 */
export class BaseRepository<BaseEntity extends Model | ModelExtension> extends Repository<BaseEntity> {
    /**
     * Static property to store the current transaction manager
     * Used to ensure all operations within a transaction use the same manager
     * @private
     */
    private static _transactionalManager?: EntityManager;

    /**
     * Constructor for the BaseRepository
     *
     * @param {Repository<BaseEntity>} repository - The TypeORM repository to extend
     */
    constructor(repository: Repository<BaseEntity>) {
        super(repository?.target, repository?.manager, repository?.queryRunner);
    }

    /**
     * Get the appropriate repository instance for the current context
     *
     * This getter returns a repository that uses the transaction manager if one exists,
     * or the default manager otherwise. This ensures that all operations within a
     * transaction use the same manager.
     *
     * @returns {Repository<BaseEntity>} The repository instance
     */
    get entityRepository(): Repository<BaseEntity> {
        return (BaseRepository._transactionalManager ?? this.manager).getRepository(this.target);
    }

    /**
     * Create a new entity instance
     *
     * This overload creates an empty entity instance with default values.
     *
     * @returns {BaseEntity} A new entity instance
     *
     * @example
     * ```TypeScript
     * const user = userRepository.create();
     * user.firstName = 'John';
     * user.lastName = 'Doe';
     * ```
     */
    override create(): BaseEntity;

    /**
     * Create a new entity instance with the provided data
     *
     * This overload creates an entity instance populated with the provided data.
     *
     * @template T - The type of the entity data
     * @param {T} entityLike - The data to populate the entity with
     * @returns {BaseEntity} A new entity instance
     *
     * @example
     * ```TypeScript
     * const user = userRepository.create({
     *   firstName: 'John',
     *   lastName: 'Doe',
     *   email: 'john.doe@example.com'
     * });
     * ```
     */
    override create<T extends DeepPartial<BaseEntity>>(entityLike: T): BaseEntity;

    /**
     * Create multiple entity instances
     *
     * This overload creates multiple entity instances from an array of data.
     *
     * @template T - The type of the entity data
     * @param {T[]} entityLikeArray - Array of data to create entities with
     * @returns {BaseEntity[]} Array of new entity instances
     *
     * @example
     * ```TypeScript
     * const users = userRepository.create([
     *   { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' },
     *   { firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com' }
     * ]);
     * ```
     */
    override create<T extends DeepPartial<BaseEntity>>(entityLikeArray: T[]): BaseEntity[];

    /**
     * Implementation of the create method
     *
     * This is the actual implementation that handles all the overloads.
     *
     * @template T - The type of the entity data
     * @param {T | T[]} [entityLike] - The data to create entities with
     * @returns {BaseEntity | BaseEntity[]} One or more entity instances
     */
    override create<T extends DeepPartial<BaseEntity>>(entityLike?: T | T[]): BaseEntity | BaseEntity[] {
        return super.create(entityLike as T);
    }

    /**
     * Save an entity to the database
     *
     * This method creates an entity from the provided data and saves it to the database.
     *
     * @template T - The type of the entity data
     * @param {T} entityLike - The entity data to save
     * @param {SaveOptions} [options] - Options for the save operation
     * @returns {Promise<T & BaseEntity>} The saved entity
     *
     * @example
     * ```TypeScript
     * const user = await userRepository.save({
     *   firstName: 'John',
     *   lastName: 'Doe',
     *   email: 'john.doe@example.com'
     * });
     * ```
     */
    override save<T extends DeepPartial<BaseEntity>>(entityLike: T, options?: SaveOptions): Promise<T & BaseEntity> {
        return this.entityRepository.save(this.create(entityLike) as T, options);
    }

    /**
     * Save an entity and retrieve it with relations
     *
     * This method saves an entity and then retrieves it from the database with the specified relations.
     * It's useful when you need to immediately access related entities after saving.
     *
     * @template T - The type of the entity data
     * @param {T} entityLike - The entity data to save
     * @param {SaveOptions & GetByIdOptions<BaseEntity>} [options] - Options for the save and get operations
     * @returns {Promise<BaseEntity | null>} The saved entity with relations
     *
     * @example
     * ```TypeScript
     * const user = await userRepository.saveAndGet(
     *   { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' },
     *   { relations: ['posts', 'profile'] }
     * );
     * ```
     */
    async saveAndGet<T extends DeepPartial<BaseEntity>>(
        entityLike: T,
        options?: SaveOptions & GetByIdOptions<BaseEntity>,
    ): Promise<BaseEntity | null> {
        const newEntity = await this.save(entityLike, options);
        return this.get(newEntity.id, options);
    }

    /**
     * Save multiple entities to the database
     *
     * This method creates entities from the provided data array and saves them to the database.
     *
     * @template T - The type of the entity data
     * @param {T[]} entities - Array of entity data to save
     * @param {SaveOptions} [options] - Options for the save operation
     * @returns {Promise<(T & BaseEntity)[]>} Array of saved entities
     *
     * @example
     * ```TypeScript
     * const users = await userRepository.saveMany([
     *   { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' },
     *   { firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com' }
     * ]);
     * ```
     */
    saveMany<T extends DeepPartial<BaseEntity>>(entities: T[], options?: SaveOptions): Promise<(T & BaseEntity)[]> {
        return this.entityRepository.save(this.create(entities) as T[], options);
    }

    /**
     * Update an entity by ID
     *
     * This method updates an entity with the specified ID using the provided partial entity data.
     *
     * @param {string} id - The ID of the entity to update
     * @param {QueryDeepPartialEntity<BaseEntity>} partialEntity - The partial entity data to apply
     * @returns {Promise<UpdateResult>} The result of the update operation
     *
     * @example
     * ```TypeScript
     * const result = await userRepository.update('user-id', {
     *   firstName: 'Updated Name',
     *   email: 'updated.email@example.com'
     * });
     * ```
     */
    override update(id: EntityId, partialEntity: QueryDeepPartialEntity<BaseEntity>): Promise<UpdateResult> {
        return this.entityRepository.update(id, partialEntity);
    }

    /**
     * Update an entity and retrieve it with relations
     *
     * This method updates an entity and then retrieves it from the database with the specified relations.
     * It's useful when you need to immediately access the updated entity with its relations.
     *
     * @param {string} id - The ID of the entity to update
     * @param {QueryDeepPartialEntity<BaseEntity>} partialEntity - The partial entity data to apply
     * @param {GetByIdOptions<BaseEntity>} [options] - Options for the get operation
     * @returns {Promise<BaseEntity | null>} The updated entity with relations
     *
     * @example
     * ```TypeScript
     * const user = await userRepository.updateAndGet(
     *   'user-id',
     *   { firstName: 'Updated Name' },
     *   { relations: ['posts', 'profile'] }
     * );
     * ```
     */
    async updateAndGet(
        id: EntityId,
        partialEntity: QueryDeepPartialEntity<BaseEntity>,
        options?: GetByIdOptions<BaseEntity>,
    ): Promise<BaseEntity | null> {
        await this.update(id, partialEntity);
        return this.get(id, options);
    }

    /**
     * Update a single entity matching the specified criteria
     *
     * This method updates the first entity that matches the provided where condition.
     *
     * @param {FindOptionsWhere<BaseEntity>} where - The criteria to find the entity
     * @param {QueryDeepPartialEntity<BaseEntity>} partialEntity - The partial entity data to apply
     * @returns {Promise<UpdateResult>} The result of the update operation
     *
     * @example
     * ```TypeScript
     * const result = await userRepository.updateOne(
     *   { email: 'john.doe@example.com' },
     *   { firstName: 'Updated Name' }
     * );
     * ```
     */
    updateOne(
        where: FindOptionsWhere<BaseEntity>,
        partialEntity: QueryDeepPartialEntity<BaseEntity>,
    ): Promise<UpdateResult> {
        return this.entityRepository.update(where, partialEntity);
    }

    /**
     * Update multiple entities matching the specified criteria
     *
     * This method updates all entities that match the provided where condition.
     *
     * @param {FindConditions<BaseEntity>} where - The criteria to find the entities
     * @param {QueryDeepPartialEntity<BaseEntity>} partialEntity - The partial entity data to apply
     * @returns {Promise<UpdateResult>} The result of the update operation
     *
     * @example
     * ```TypeScript
     * const result = await userRepository.updateMany(
     *   { role: 'user' },
     *   { isActive: true }
     * );
     * ```
     */
    updateMany(
        where: FindConditions<BaseEntity>,
        partialEntity: QueryDeepPartialEntity<BaseEntity>,
    ): Promise<UpdateResult> {
        return this.entityRepository.update(where, partialEntity);
    }

    /**
     * Update multiple entities by their IDs
     *
     * This method updates all entities with IDs in the provided array.
     *
     * @param {string[]} ids - Array of entity IDs to update
     * @param {QueryDeepPartialEntity<BaseEntity>} partialEntity - The partial entity data to apply
     * @returns {Promise<UpdateResult>} The result of the update operation
     *
     * @example
     * ```TypeScript
     * const result = await userRepository.updateByIds(
     *   ['user-id-1', 'user-id-2', 'user-id-3'],
     *   { isActive: true }
     * );
     * ```
     */
    updateByIds(ids: EntityId[], partialEntity: QueryDeepPartialEntity<BaseEntity>): Promise<UpdateResult> {
        return this.updateMany({ id: In(ids) } as FindConditions<BaseEntity>, partialEntity);
    }

    /**
     * Get an entity by ID
     *
     * This method retrieves an entity with the specified ID from the database.
     * It can include relations and other options for the query.
     *
     * @param {string} id - The ID of the entity to retrieve
     * @param {GetByIdOptions<BaseEntity>} [options] - Options for the query
     * @returns {Promise<BaseEntity | null>} The entity if found, null otherwise
     *
     * @example
     * ```TypeScript
     * const user = await userRepository.get('user-id', {
     *   relations: ['posts', 'profile']
     * });
     * ```
     */
    get(id: EntityId, options?: GetByIdOptions<BaseEntity>): Promise<BaseEntity | null> {
        return this.getOne({
            ...options,
            where: { id } as FindOptionsWhere<BaseEntity>,
        });
    }

    /**
     * Get multiple entities by their IDs
     *
     * This method retrieves entities with IDs in the provided array from the database.
     * It can include relations, pagination, sorting, and other options for the query.
     *
     * @param {GetByIdsOptions<BaseEntity>} getByIds - Options for the query including IDs
     * @returns {Promise<BaseEntity[]>} Array of entities matching the IDs
     *
     * @example
     * ```TypeScript
     * const users = await userRepository.getByIds({
     *   ids: ['user-id-1', 'user-id-2', 'user-id-3'],
     *   relations: ['profile'],
     *   sort: { firstName: 'ASC' }
     * });
     * ```
     */
    async getByIds(getByIds: GetByIdsOptions<BaseEntity>): Promise<BaseEntity[]> {
        const { ids, relations, pagination, sort, options } = getByIds;
        const where = { id: In(ids) } as FindOptionsWhere<BaseEntity>;
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
     * @param {GetOneOptions<BaseEntity>} getOne - Options for the query
     * @returns {Promise<BaseEntity | null>} The entity if found, null otherwise
     *
     * @example
     * ```TypeScript
     * const user = await userRepository.getOne({
     *   where: { email: 'john.doe@example.com' },
     *   relations: ['profile']
     * });
     * ```
     */
    getOne(getOne: GetOneOptions<BaseEntity>): Promise<BaseEntity | null> {
        return this.entityRepository.findOne(this.generateOptions(getOne));
    }

    /**
     * Get multiple entities matching the specified criteria
     *
     * This method retrieves all entities that match the provided criteria.
     * It returns both the entities and the total count.
     *
     * @param {GetManyOptions<BaseEntity>} getMany - Options for the query
     * @returns {Promise<[BaseEntity[], number]>} Array of entities and total count
     *
     * @example
     * ```TypeScript
     * const [users, count] = await userRepository.getMany({
     *   where: { role: 'user' },
     *   relations: ['profile'],
     *   pagination: { skip: 0, take: 10 },
     *   sort: { createdAt: 'DESC' }
     * });
     * ```
     */
    getMany(getMany: GetManyOptions<BaseEntity>): Promise<[BaseEntity[], number]> {
        return this.entityRepository.findAndCount(this.generateOptions(getMany));
    }

    /**
     * Soft delete an entity by ID
     *
     * This method marks an entity as deleted without actually removing it from the database.
     * It sets the deletedAt timestamp to the current time.
     *
     * @param {string} id - The ID of the entity to delete
     * @returns {Promise<DeleteResult>} The result of the delete operation
     *
     * @example
     * ```TypeScript
     * const result = await userRepository.delete('user-id');
     * ```
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
     * @param {string[]} ids - Array of entity IDs to delete
     * @returns {Promise<DeleteResult>} The result of the delete operation
     *
     * @example
     * ```TypeScript
     * const result = await userRepository.deleteByIds(['user-id-1', 'user-id-2']);
     * ```
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
     * @param {string} id - The ID of the entity to delete
     * @returns {Promise<DeleteResult>} The result of the delete operation
     *
     * @example
     * ```TypeScript
     * const result = await userRepository.hardDelete('user-id');
     * ```
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
     * @param {string[]} ids - Array of entity IDs to delete
     * @returns {Promise<DeleteResult>} The result of the delete operation
     *
     * @example
     * ```TypeScript
     * const result = await userRepository.hardDeleteByIds(['user-id-1', 'user-id-2']);
     * ```
     */
    hardDeleteByIds(ids: EntityId[]): Promise<DeleteResult> {
        return this.entityRepository.delete(ids);
    }

    /**
     * Count entities matching the specified criteria
     *
     * This method counts the number of entities that match the provided criteria.
     *
     * @param {GetManyOptions<BaseEntity>} [options] - Options for the query
     * @returns {Promise<number>} The count of matching entities
     *
     * @example
     * ```TypeScript
     * const count = await userRepository.countMany({
     *   where: { role: 'user', isActive: true }
     * });
     * ```
     */
    countMany(options?: GetManyOptions<BaseEntity>): Promise<number> {
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

    generateOptions(getOptions: GetOptions<BaseEntity>): FindOneOptions<BaseEntity> {
        const { options, relations, pagination, sort } = getOptions ?? {};
        const opt = { ...(options || {}) } as FindManyOptions<BaseEntity>;

        opt.where = getOptions.where || getOptions.filters;

        const { search, not } = getOptions as GetOneOptionsSearch<BaseEntity> & GetOneOptionsNot<BaseEntity>;

        if (not) {
            opt.where = this.orWhere(opt.where as FindOptionsWhere<BaseEntity>, not, Not);
        } else if (search) {
            opt.where = this.orWhere(opt.where as FindOptionsWhere<BaseEntity>, search, ILike);
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

    orWhere(
        where: FindOptionsWhere<BaseEntity>,
        search: FindOptionsWhere<BaseEntity>,
        operator: <T>(value: FindOperator<T> | T) => FindOperator<T>,
    ): FindOptionsWhere<BaseEntity> | FindOptionsWhere<BaseEntity>[] {
        const entries: [string, unknown][] = Object.entries(search);
        if (entries.length > 1) {
            const whr: FindOptionsWhere<BaseEntity>[] = [];
            entries.forEach(([key, value]) =>
                whr.push(this.mapWhere(where, { [key]: value } as FindOptionsWhere<BaseEntity>, operator, "%{}%")),
            );
            return whr;
        }
        return this.mapWhere(where, search, operator, "%{}%");
    }

    isFindOperator<T>(value: unknown): value is FindOperator<T> {
        return value instanceof FindOperator;
    }

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
