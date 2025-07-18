// noinspection JSUnusedGlobalSymbols,ExceptionCaughtLocallyJS

import { HttpException, InternalServerErrorException, NotFoundException, Type } from "@nestjs/common";
import { BaseRepository } from "../base";
import {
    GetAllOptions,
    GetByIdOptions,
    GetByIdsOptions,
    GetManyOptions,
    GetOneOptions,
    SaveAndGetOptions,
    SaveOptionsWithSkip,
} from "../interfaces";
import { EntityUtils } from "../utils";
import { Operation } from "../enums";
import { CrudErrorResponses } from "../responses";
import { TypeORMErrorHandler } from "../types";
import { isUUID } from "class-validator";
import { PaginatedResponse } from "../classes";
import { hichchiMetadata, ImplementationException } from "@hichchi/nest-core";
import { DEFAULT_UUID_VERSION, SuccessResponse, UserInfo } from "@hichchi/nest-connector";
import {
    EntityDeepPartial,
    EntityId,
    Model,
    ModelExtension,
    Pagination,
    QueryDeepPartial,
} from "@hichchi/nest-connector/crud";

/**
 * Abstract base service providing CRUD operations for entities
 *
 * This service provides a comprehensive set of CRUD (Create, Read, Update, Delete) operations
 * for entities that extend the Model interface. It serves as a foundation for building
 * entity-specific services with consistent data access patterns and error handling.
 *
 * Key features:
 * - Complete CRUD operations with various options and overloads
 * - Automatic error handling with standardized error responses
 * - Support for soft delete and hard delete operations
 * - Transaction management
 * - Pagination support
 * - Audit tracking (created/updated/deleted by)
 * - Type-safe operations with proper TypeScript support
 *
 * The service is designed to work with repositories that extend BaseRepository,
 * providing a consistent and type-safe way to interact with the database.
 *
 * @template BaseEntity - The entity type this service manages. This type parameter
 *                       represents the entity class that the service will work with.
 *                       It must extend the Model interface.
 *
 * @example
 * ```typescript
 * // Basic implementation of a user service
 * @Injectable()
 * export class UserService extends CrudService<UserEntity> {
 *   constructor(
 *     @InjectRepository(UserRepository)
 *     private readonly userRepository: UserRepository,
 *   ) {
 *     super(userRepository);
 *   }
 *
 *   // Add custom methods specific to users
 *   async findByEmail(email: string): Promise<UserEntity | null> {
 *     return this.getOne({ where: { email } });
 *   }
 * }
 * ```
 *
 * @example
 * ```typescript
 * // Using the service in a controller
 * @Controller('users')
 * export class UserController {
 *   constructor(private readonly userService: UserService) {}
 *
 *   @Get(':id')
 *   async findOne(@Param('id') id: string): Promise<UserEntity> {
 *     return this.userService.get(id);
 *   }
 *
 *   @Post()
 *   async create(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
 *     return this.userService.save(createUserDto);
 *   }
 * }
 * ```
 *
 * @see {@link BaseRepository} The repository class that provides enhanced data access
 * @see {@link Model} The base interface for entities
 * @see {@link EntityUtils} Utility class for handling entity-related operations and errors
 * @see {@link PaginatedResponse} Class for paginated responses
 */
export abstract class CrudService<Entity extends Model | ModelExtension> {
    /**
     * The name of the entity this service manages
     * @private
     */
    private readonly entityName: string;

    /**
     * Array of field names with unique constraints for the entity
     * @private
     */
    private readonly uniqueFieldNames?: string[];

    /**
     * Creates a new instance of CrudService
     *
     * The constructor initializes the service with a repository and extracts
     * metadata about the entity from the Hichchi metadata system. This metadata
     * includes the entity name and unique field names, which are used for error
     * handling and response generation.
     *
     * @param {BaseRepository<BaseEntity>} repository - The repository for the entity
     * @throws {ImplementationException} If no repository is provided
     *
     * @example
     * ```typescript
     * @Injectable()
     * export class UserService extends CrudService<UserEntity> {
     *   constructor(
     *     @InjectRepository(UserRepository)
     *     private readonly userRepository: UserRepository,
     *   ) {
     *     super(userRepository);
     *   }
     * }
     * ```
     *
     * @see {@link BaseRepository} The repository class that provides enhanced data access
     * @see {@link hichchiMetadata} The metadata system that stores entity information
     */
    // noinspection TypeScriptAbstractClassConstructorCanBeMadeProtected
    constructor(public readonly repository: BaseRepository<Entity>) {
        if (!repository) {
            throw new ImplementationException(
                "Repository not provided",
                "A repository must be provided to the CrudService constructor.",
            );
        }
        this.entityName = hichchiMetadata().getEntityName(repository.target as Type) || "";
        this.uniqueFieldNames = hichchiMetadata().getEntityUnique(repository.target as Type) || [];
    }

    /**
     * Gets the repository instance used by this service
     *
     * This method provides access to the underlying repository instance that the service
     * uses for database operations. It's useful when you need to perform custom operations
     * that aren't covered by the standard CRUD methods or when you need to access
     * repository-specific functionality.
     *
     * @template Entity - Type of the entity
     *
     * @returns {BaseRepository<Entity>} The repository instance for the entity
     *
     * @example
     * ```typescript
     * // Access the repository for custom operations
     * const repository = userService.getRepository();
     *
     * // Use repository methods directly
     * const customQuery = await repository.createQueryBuilder('user')
     *   .where('user.email LIKE :pattern', { pattern: '%@company.com' })
     *   .getMany();
     *
     * // Access repository metadata
     * const entityMetadata = repository.metadata;
     * ```
     *
     * @see {@link BaseRepository} The repository class that provides enhanced data access
     */
    getRepository(): BaseRepository<Entity> {
        return this.repository;
    }

    /**
     * Creates a new entity instance without saving it to the database
     *
     * This method creates a new entity instance from the provided data transfer object.
     * It does not save the entity to the database, but only initializes it with the
     * provided values. Use the `save` method to persist the entity.
     *
     * @template T - Type that extends DeepPartial of the base entity
     * @param {T} createDto - The data transfer object containing entity properties
     * @param {TypeORMErrorHandler} [eh] - Optional custom error handler
     * @returns {BaseEntity} A new entity instance with the provided properties
     * @throws {HttpException} If an error occurs during entity creation
     *
     * @example
     * ```typescript
     * // Create a new user entity without saving it
     * const userDto = { name: 'John Doe', email: 'john@example.com' };
     * const user = userService.create(userDto);
     * console.log(user); // UserEntity instance with name and email set
     * ```
     *
     * @see {@link save} Method to create and save an entity
     * @see {@link handleError} Method for standardized error handling
     */
    create<T extends EntityDeepPartial<Entity>>(createDto?: T | T[], eh?: TypeORMErrorHandler): Entity {
        try {
            return this.repository.create(createDto as T);
        } catch (error: unknown) {
            this.handleError(error, eh);
        }
    }

    /**
     * Creates and saves a new entity to the database
     *
     * This method creates a new entity from the provided data transfer object and
     * saves it to the database. It also sets the createdBy property if a user is provided.
     * After saving, it retrieves the entity with any specified relations or options.
     *
     * @template T - Type that extends DeepPartial of the base entity
     * @param {T} createDto - The data transfer object containing entity properties
     * @param {GetByIdOptions<BaseEntity>} [options] - Options for saving and retrieving the entity
     * @param {UserInfo} [createdBy] - The user who created the entity (for audit tracking)
     * @param {TypeORMErrorHandler} [eh] - Optional custom error handler
     * @returns {Promise<BaseEntity | null>} The saved entity or null if not found
     * @throws {HttpException} If an error occurs during entity creation or saving
     *
     * @example
     * ```typescript
     * // Create and save a new user
     * const userDto = { name: 'John Doe', email: 'john@example.com' };
     * const user = await userService.save(userDto);
     *
     * // Create with relations loaded
     * const userWithProfile = await userService.save(
     *   userDto,
     *   { relations: ['profile'] }
     * );
     *
     * // Create with audit tracking
     * const userWithAudit = await userService.save(
     *   userDto,
     *   undefined,
     *   currentUser
     * );
     * ```
     *
     * @see {@link create} Method to create an entity without saving
     * @see {@link saveMany} Method to save multiple entities
     * @see {@link BaseRepository.saveAndGet} Repository method that performs the actual save operation
     */
    async save<T extends EntityDeepPartial<Entity>>(
        createDto: T,
        options?: SaveAndGetOptions<Entity>,
        createdBy?: UserInfo,
        eh?: TypeORMErrorHandler,
    ): Promise<Entity | null> {
        try {
            if (createdBy) (createDto as Model).createdBy ||= createdBy;
            return await this.repository.saveAndGet(createDto, { ...options });
        } catch (error: unknown) {
            this.handleError(error, eh);
        }
    }

    /**
     * Creates and saves multiple entities to the database
     *
     * This method creates multiple entities from an array of data transfer objects
     * and saves them to the database in a single operation. It also sets the createdBy
     * property on each entity if a user is provided.
     *
     * @template T - Type that extends DeepPartial of the base entity
     * @param {T[]} createDtos - Array of data transfer objects containing entity properties
     * @param {SaveOptionsWithSkip} [options] - Options for saving entities, including skipCreate flag to control whether new entities should be created during save operations. When skipCreate is true, only updates existing entities. Defaults to false.
     * @param {UserInfo} [createdBy] - The user who created the entities (for audit tracking)
     * @param {TypeORMErrorHandler} [eh] - Optional custom error handler
     * @returns {Promise<BaseEntity[]>} Array of saved entities
     * @throws {HttpException} If an error occurs during entity creation or saving
     *
     * @example
     * ```typescript
     * // Create and save multiple users
     * const userDtos = [
     *   { name: 'John Doe', email: 'john@example.com' },
     *   { name: 'Jane Smith', email: 'jane@example.com' }
     * ];
     * const users = await userService.saveMany(userDtos);
     *
     * // With audit tracking
     * const usersWithAudit = await userService.saveMany(
     *   userDtos,
     *   undefined,
     *   currentUser
     * );
     * ```
     *
     * @see {@link save} Method to save a single entity
     * @see {@link BaseRepository.saveMany} Repository method that performs the actual save operation
     */
    async saveMany<T extends EntityDeepPartial<Entity>>(
        createDtos: T[],
        options?: SaveOptionsWithSkip,
        createdBy?: UserInfo,
        eh?: TypeORMErrorHandler,
    ): Promise<Entity[]> {
        try {
            return await this.repository.saveMany(
                createDtos.map(
                    createDto =>
                        ({
                            ...createDto,
                            createdBy: (createDto as Model).createdBy || createdBy || null,
                        }) as T,
                ),
                options,
            );
        } catch (error: unknown) {
            this.handleError(error, eh);
        }
    }

    /**
     * Updates an entity by its ID
     *
     * This method updates an entity with the specified ID using the provided data.
     * It also sets the updatedBy property if a user is provided. After updating,
     * it retrieves the updated entity with any specified relations or options.
     *
     * @template T - Type that extends QueryDeepPartial of the base entity
     * @param {EntityId} id - The ID of the entity to update
     * @param {T} updateDto - The data transfer object containing properties to update
     * @param {GetByIdOptions<BaseEntity>} [options] - Options for retrieving the updated entity
     * @param {UserInfo} [updatedBy] - The user who updated the entity (for audit tracking)
     * @param {TypeORMErrorHandler} [eh] - Optional custom error handler
     * @returns {Promise<BaseEntity>} The updated entity
     * @throws {NotFoundException} If the entity with the given ID is not found or ID is invalid
     * @throws {InternalServerErrorException} If the update operation fails
     * @throws {HttpException} If any other error occurs during the update
     *
     * @example
     * ```typescript
     * // Update a user by ID
     * const userId = '123e4567-e89b-12d3-a456-426614174000';
     * const updateDto = { name: 'Updated Name' };
     * const updatedUser = await userService.update(userId, updateDto);
     *
     * // Update with relations loaded
     * const updatedUserWithProfile = await userService.update(
     *   userId,
     *   updateDto,
     *   { relations: ['profile'] }
     * );
     *
     * // Update with audit tracking
     * const updatedUserWithAudit = await userService.update(
     *   userId,
     *   updateDto,
     *   undefined,
     *   currentUser
     * );
     * ```
     *
     * @see {@link updateOne} Method to update an entity by conditions
     * @see {@link updateMany} Method to update multiple entities by conditions
     * @see {@link updateByIds} Method to update multiple entities by IDs
     * @see {@link BaseRepository.updateById} Repository method that performs the actual update operation
     */
    async update<T extends EntityDeepPartial<Entity>>(
        id: EntityId,
        updateDto: T,
        options?: GetByIdOptions<Entity>,
        updatedBy?: UserInfo,
        eh?: TypeORMErrorHandler,
    ): Promise<Entity> {
        try {
            if (!isUUID(id, DEFAULT_UUID_VERSION)) {
                throw new NotFoundException(CrudErrorResponses.E_400_INVALID_ID(this.entityName));
            }

            if (updatedBy) (updateDto as unknown as Model).createdBy ||= updatedBy || null;
            const { affected } = await this.repository.updateById(id, updateDto);
            if (affected === 0) {
                return EntityUtils.handleError(
                    new InternalServerErrorException(
                        CrudErrorResponses.E_500_OPERATION(this.entityName, Operation.UPDATE),
                    ),
                    this.entityName,
                );
            }

            return await this.get(id, options);
        } catch (error: unknown) {
            this.handleError(error, eh);
        }
    }

    /**
     * Updates a single entity that matches the specified conditions
     *
     * This method updates the first entity that matches the given conditions.
     * It also sets the updatedBy property if a user is provided. After updating,
     * it retrieves the updated entity.
     *
     * @template T - Type that extends QueryDeepPartial of the base entity
     * @param {QueryDeepPartial<BaseEntity>} where - Conditions to find the entity to update
     * @param {T} updateDto - The data transfer object containing properties to update
     * @param {UserInfo} [updatedBy] - The user who updated the entity (for audit tracking)
     * @param {TypeORMErrorHandler} [eh] - Optional custom error handler
     * @returns {Promise<BaseEntity>} The updated entity
     * @throws {InternalServerErrorException} If the update operation fails
     * @throws {HttpException} If any other error occurs during the update
     *
     * @example
     * ```typescript
     * // Update a user by email
     * const updateDto = { name: 'Updated Name' };
     * const updatedUser = await userService.updateOne(
     *   { email: 'john@example.com' },
     *   updateDto
     * );
     *
     * // Update with audit tracking
     * const updatedUserWithAudit = await userService.updateOne(
     *   { email: 'john@example.com' },
     *   updateDto,
     *   currentUser
     * );
     * ```
     *
     * @see {@link update} Method to update an entity by ID
     * @see {@link updateMany} Method to update multiple entities by conditions
     * @see {@link BaseRepository.updateOne} Repository method that performs the actual update operation
     */
    async updateOne<T extends EntityDeepPartial<Entity>>(
        where: QueryDeepPartial<Entity>,
        updateDto: T,
        updatedBy?: UserInfo,
        eh?: TypeORMErrorHandler,
    ): Promise<Entity> {
        try {
            if (updatedBy) (updateDto as unknown as Model).createdBy ||= updatedBy || null;
            const { affected } = await this.repository.updateOne(where, updateDto);
            if (affected === 0) {
                return EntityUtils.handleError(
                    new InternalServerErrorException(
                        CrudErrorResponses.E_500_OPERATION(this.entityName, Operation.UPDATE),
                    ),
                    this.entityName,
                );
            }

            return await this.getOne({ where });
        } catch (error: unknown) {
            this.handleError(error, eh);
        }
    }

    /**
     * Updates multiple entities that match the specified conditions
     *
     * This method updates all entities that match the given conditions.
     * It also sets the updatedBy property if a user is provided. Unlike update and updateOne,
     * this method returns a success response rather than the updated entities.
     *
     * @template T - Type that extends QueryDeepPartial of the base entity
     * @param {QueryDeepPartial<BaseEntity>} where - Conditions to find entities to update
     * @param {T} updateDto - The data transfer object containing properties to update
     * @param {UserInfo} [updatedBy] - The user who updated the entities (for audit tracking)
     * @param {TypeORMErrorHandler} [eh] - Optional custom error handler
     * @returns {Promise<SuccessResponse>} A success response indicating the update was successful
     * @throws {InternalServerErrorException} If the update operation fails
     * @throws {HttpException} If any other error occurs during the update
     *
     * @example
     * ```typescript
     * // Update all active users
     * const updateDto = { lastLoginAt: new Date() };
     * const result = await userService.updateMany(
     *   { isActive: true },
     *   updateDto
     * );
     *
     * // Update with audit tracking
     * const resultWithAudit = await userService.updateMany(
     *   { isActive: true },
     *   updateDto,
     *   currentUser
     * );
     * ```
     *
     * @see {@link update} Method to update an entity by ID
     * @see {@link updateOne} Method to update a single entity by conditions
     * @see {@link updateByIds} Method to update multiple entities by IDs
     * @see {@link BaseRepository.updateMany} Repository method that performs the actual update operation
     * @see {@link EntityUtils.handleSuccess} Utility method that generates the success response
     */
    async updateMany<T extends EntityDeepPartial<Entity>>(
        where: QueryDeepPartial<Entity>,
        updateDto: T,
        updatedBy?: UserInfo,
        eh?: TypeORMErrorHandler,
    ): Promise<SuccessResponse> {
        try {
            if (updatedBy) (updateDto as unknown as Model).createdBy ||= updatedBy || null;
            const { affected } = await this.repository.updateMany(where, updateDto);
            if (affected === 0) {
                return EntityUtils.handleError(
                    new InternalServerErrorException(
                        CrudErrorResponses.E_500_OPERATION(this.entityName, Operation.UPDATE),
                    ),
                    this.entityName,
                );
            }

            return EntityUtils.handleSuccess(this.entityName, Operation.UPDATE);
        } catch (error: unknown) {
            this.handleError(error, eh);
        }
    }

    /**
     * Updates multiple entities by their IDs
     *
     * This method updates all entities with the specified IDs using the provided data.
     * It also sets the updatedBy property if a user is provided. Like updateMany,
     * this method returns a success response rather than the updated entities.
     *
     * @template T - Type that extends QueryDeepPartial of the base entity
     * @param {EntityId[]} ids - Array of entity IDs to update
     * @param {T} updateDto - The data transfer object containing properties to update
     * @param {UserInfo} [updatedBy] - The user who updated the entities (for audit tracking)
     * @param {TypeORMErrorHandler} [eh] - Optional custom error handler
     * @returns {Promise<SuccessResponse>} A success response indicating the update was successful
     * @throws {NotFoundException} If any of the IDs are invalid
     * @throws {InternalServerErrorException} If the update operation fails
     * @throws {HttpException} If any other error occurs during the update
     *
     * @example
     * ```typescript
     * // Update multiple users by IDs
     * const userIds = [
     *   '123e4567-e89b-12d3-a456-426614174000',
     *   '223e4567-e89b-12d3-a456-426614174000'
     * ];
     * const updateDto = { isVerified: true };
     * const result = await userService.updateByIds(userIds, updateDto);
     *
     * // Update with audit tracking
     * const resultWithAudit = await userService.updateByIds(
     *   userIds,
     *   updateDto,
     *   currentUser
     * );
     * ```
     *
     * @see {@link update} Method to update a single entity by ID
     * @see {@link updateMany} Method to update multiple entities by conditions
     * @see {@link BaseRepository.updateByIds} Repository method that performs the actual update operation
     * @see {@link EntityUtils.handleSuccess} Utility method that generates the success response
     */
    async updateByIds<T extends EntityDeepPartial<Entity>>(
        ids: EntityId[],
        updateDto: T,
        updatedBy?: UserInfo,
        eh?: TypeORMErrorHandler,
    ): Promise<SuccessResponse> {
        if (ids.some(id => !isUUID(id, DEFAULT_UUID_VERSION))) {
            throw new NotFoundException(CrudErrorResponses.E_400_INVALID_ID(this.entityName));
        }

        try {
            if (updatedBy) (updateDto as unknown as Model).createdBy ||= updatedBy || null;
            const { affected } = await this.repository.updateByIds(ids, updateDto);
            if (affected === 0) {
                return EntityUtils.handleError(
                    new InternalServerErrorException(
                        CrudErrorResponses.E_500_OPERATION(this.entityName, Operation.UPDATE),
                    ),
                    this.entityName,
                );
            }

            return EntityUtils.handleSuccess(this.entityName, Operation.UPDATE);
        } catch (error: unknown) {
            this.handleError(error, eh);
        }
    }

    /**
     * Retrieves an entity by its ID
     *
     * This method fetches an entity with the specified ID. It can also load related
     * entities if specified in the options.
     *
     * @param {EntityId} id - The ID of the entity to retrieve
     * @param {GetByIdOptions<BaseEntity>} [options] - Options for retrieving the entity, such as relations to load
     * @param {TypeORMErrorHandler} [eh] - Optional custom error handler
     * @returns {Promise<BaseEntity>} The retrieved entity
     * @throws {NotFoundException} If the entity with the given ID is not found or ID is invalid
     * @throws {HttpException} If any other error occurs during retrieval
     *
     * @example
     * ```typescript
     * // Get a user by ID
     * const userId = '123e4567-e89b-12d3-a456-426614174000';
     * const user = await userService.get(userId);
     *
     * // Get a user with related entities
     * const userWithProfile = await userService.get(userId, {
     *   relations: ['profile', 'orders']
     * });
     * ```
     *
     * @see {@link getOne} Method to retrieve an entity by conditions
     * @see {@link getByIds} Method to retrieve multiple entities by IDs
     * @see {@link BaseRepository.getById} Repository method that performs the actual retrieval
     */
    async get(id: EntityId, options?: GetByIdOptions<Entity>, eh?: TypeORMErrorHandler): Promise<Entity> {
        try {
            if (!isUUID(id, DEFAULT_UUID_VERSION)) {
                throw new NotFoundException(CrudErrorResponses.E_400_INVALID_ID(this.entityName));
            }

            const entity = await this.repository.getById(id, options);
            if (entity) {
                return entity;
            }

            throw new NotFoundException(CrudErrorResponses.E_404_ID(this.entityName));
        } catch (error: unknown) {
            this.handleError(error, eh);
        }
    }

    /**
     * Retrieves multiple entities by their IDs
     *
     * This method fetches all entities with the specified IDs. It can also load related
     * entities if specified in the options.
     *
     * @param {GetByIdsOptions<BaseEntity>} getByIds - Options for retrieving entities, including the IDs and relations
     * @param {TypeORMErrorHandler} [eh] - Optional custom error handler
     * @returns {Promise<BaseEntity[]>} Array of retrieved entities
     * @throws {NotFoundException} If any of the IDs are invalid
     * @throws {HttpException} If any other error occurs during retrieval
     *
     * @example
     * ```typescript
     * // Get multiple users by IDs
     * const userIds = [
     *   '123e4567-e89b-12d3-a456-426614174000',
     *   '223e4567-e89b-12d3-a456-426614174000'
     * ];
     * const users = await userService.getByIds({ ids: userIds });
     *
     * // Get users with related entities
     * const usersWithProfiles = await userService.getByIds({
     *   ids: userIds,
     *   relations: ['profile']
     * });
     * ```
     *
     * @see {@link get} Method to retrieve a single entity by ID
     * @see {@link getMany} Method to retrieve multiple entities by conditions
     * @see {@link BaseRepository.getByIds} Repository method that performs the actual retrieval
     */
    async getByIds(getByIds: GetByIdsOptions<Entity>, eh?: TypeORMErrorHandler): Promise<Entity[]> {
        try {
            if (getByIds.ids.some(id => !isUUID(id, DEFAULT_UUID_VERSION))) {
                throw new NotFoundException(CrudErrorResponses.E_400_INVALID_ID(this.entityName));
            }

            return await this.repository.getByIds(getByIds);
        } catch (error: unknown) {
            this.handleError(error, eh);
        }
    }

    /**
     * Retrieves a single entity that matches the specified conditions
     *
     * This method fetches the first entity that matches the given conditions.
     * It can also load related entities if specified in the options.
     *
     * @param {GetOneOptions<BaseEntity>} getOne - Options for retrieving the entity, including conditions and relations
     * @param {TypeORMErrorHandler} [eh] - Optional custom error handler
     * @returns {Promise<BaseEntity>} The retrieved entity
     * @throws {NotFoundException} If no entity matches the conditions
     * @throws {HttpException} If any other error occurs during retrieval
     *
     * @example
     * ```typescript
     * // Get a user by email
     * const user = await userService.getOne({
     *   where: { email: 'john@example.com' }
     * });
     *
     * // Get a user with related entities
     * const userWithProfile = await userService.getOne({
     *   where: { email: 'john@example.com' },
     *   relations: ['profile']
     * });
     * ```
     *
     * @see {@link get} Method to retrieve an entity by ID
     * @see {@link getMany} Method to retrieve multiple entities by conditions
     * @see {@link BaseRepository.getOne} Repository method that performs the actual retrieval
     */
    async getOne(getOne: GetOneOptions<Entity>, eh?: TypeORMErrorHandler): Promise<Entity> {
        try {
            const entity = await this.repository.getOne(getOne);
            if (entity) {
                return entity;
            }

            throw new NotFoundException(CrudErrorResponses.E_404_CONDITION(this.entityName));
        } catch (error: unknown) {
            this.handleError(error, eh);
        }
    }

    /**
     * Retrieves multiple entities that match the specified conditions
     *
     * This method fetches all entities that match the given conditions. It supports
     * pagination, sorting, filtering, and loading related entities. When pagination
     * is specified, it returns a PaginatedResponse object with the entities and pagination
     * information. Otherwise, it returns an array of entities.
     *
     * @template Options - Type that extends GetManyOptions for the base entity
     * @param {Options} getMany - Options for retrieving entities, including conditions, relations, and pagination
     * @param {TypeORMErrorHandler} [eh] - Optional custom error handler
     * @returns {Promise<PaginatedResponse<BaseEntity> | BaseEntity[]>} Paginated response or array of entities
     * @throws {HttpException} If any error occurs during retrieval
     *
     * @example
     * ```typescript
     * // Get users with filtering
     * const users = await userService.getMany({
     *   where: { isActive: true }
     * });
     *
     * // Get users with pagination
     * const paginatedUsers = await userService.getMany({
     *   where: { isActive: true },
     *   pagination: { page: 1, limit: 10 }
     * });
     *
     * // Get users with sorting and relations
     * const sortedUsers = await userService.getMany({
     *   where: { isActive: true },
     *   order: { createdAt: 'DESC' },
     *   relations: ['profile']
     * });
     * ```
     *
     * @see {@link getOne} Method to retrieve a single entity by conditions
     * @see {@link getAll} Method to retrieve all entities
     * @see {@link BaseRepository.getMany} Repository method that performs the actual retrieval
     * @see {@link PaginatedResponse} Class that represents a paginated response
     */
    getMany<Options extends GetManyOptions<Entity>>(
        getMany: Options,
        eh?: TypeORMErrorHandler,
    ): Options extends { pagination: Pagination } ? Promise<PaginatedResponse<Entity>> : Promise<Entity[]>;

    async getMany(
        getMany: GetManyOptions<Entity>,
        eh?: TypeORMErrorHandler,
    ): Promise<PaginatedResponse<Entity> | Entity[]> {
        try {
            const [data, rowCount] = await this.repository.getMany({ ...getMany });

            return getMany.pagination ? new PaginatedResponse(data, rowCount, getMany.pagination) : data;
        } catch (error: unknown) {
            this.handleError(error, eh);
        }
    }

    /**
     * Retrieves all entities, optionally with filtering, sorting, and pagination
     *
     * This method is similar to getMany but is intended for retrieving all entities
     * when no specific conditions are needed. It supports pagination, sorting, and
     * loading related entities. When pagination is specified, it returns a PaginatedResponse
     * object with the entities and pagination information. Otherwise, it returns an array
     * of entities.
     *
     * @template Options - Type that extends GetAllOptions for the base entity
     * @param {Options} [getAll] - Optional settings for retrieving entities, including relations and pagination
     * @param {TypeORMErrorHandler} [eh] - Optional custom error handler
     * @returns {Promise<PaginatedResponse<BaseEntity> | BaseEntity[]>} Paginated response or array of entities
     * @throws {HttpException} If any error occurs during retrieval
     *
     * @example
     * ```typescript
     * // Get all users
     * const allUsers = await userService.getAll();
     *
     * // Get all users with pagination
     * const paginatedUsers = await userService.getAll({
     *   pagination: { page: 1, limit: 10 }
     * });
     *
     * // Get all users with sorting and relations
     * const sortedUsers = await userService.getAll({
     *   order: { createdAt: 'DESC' },
     *   relations: ['profile']
     * });
     * ```
     *
     * @see {@link getMany} Method to retrieve entities with specific conditions
     * @see {@link BaseRepository.getMany} Repository method that performs the actual retrieval
     * @see {@link PaginatedResponse} Class that represents a paginated response
     */
    getAll<Options extends GetAllOptions<Entity>>(
        getAll?: Options,
        eh?: TypeORMErrorHandler,
    ): Options extends { pagination: Pagination } ? Promise<PaginatedResponse<Entity>> : Promise<Entity[]>;

    async getAll<Options extends GetAllOptions<Entity>>(
        getAll?: Options,
        eh?: TypeORMErrorHandler,
    ): Promise<PaginatedResponse<Entity> | Entity[]> {
        try {
            const [data, rowCount] = await this.repository.getMany({ ...getAll });

            return getAll?.pagination ? new PaginatedResponse(data, rowCount, getAll.pagination) : data;
        } catch (error: unknown) {
            this.handleError(error, eh);
        }
    }

    /**
     * Deletes an entity by its ID
     *
     * This method supports both soft delete (default) and hard delete (permanent removal).
     * When using soft delete, it can also set the deletedBy property for audit tracking.
     *
     * @param {EntityId} id - The ID of the entity to delete
     * @param {true} wipe - When true, performs a hard delete (permanent removal)
     * @param {TypeORMErrorHandler} [eh] - Optional custom error handler
     * @returns {Promise<BaseEntity>} The deleted entity
     * @throws {NotFoundException} If the entity with the given ID is not found or ID is invalid
     * @throws {HttpException} If any other error occurs during deletion
     */
    async delete(id: EntityId, wipe?: true, eh?: TypeORMErrorHandler): Promise<Entity>;

    /**
     * Deletes an entity by its ID with audit tracking
     *
     * This overload performs a soft delete and sets the deletedBy property for audit tracking.
     *
     * @param {EntityId} id - The ID of the entity to delete
     * @param {UserInfo} deletedBy - The user who deleted the entity (for audit tracking)
     * @param {TypeORMErrorHandler} [eh] - Optional custom error handler
     * @returns {Promise<BaseEntity>} The deleted entity
     * @throws {NotFoundException} If the entity with the given ID is not found or ID is invalid
     * @throws {HttpException} If any other error occurs during deletion
     */
    async delete(id: EntityId, deletedBy?: UserInfo, eh?: TypeORMErrorHandler): Promise<Entity>;

    /**
     * Implementation of the delete method
     *
     * This method deletes an entity by its ID. It supports both soft delete (default) and
     * hard delete (permanent removal). When using soft delete, it can also set the deletedBy
     * property for audit tracking.
     *
     * @param {EntityId} id - The ID of the entity to delete
     * @param {UserInfo | boolean} [deletedByOrWipe] - The user who deleted the entity or true for hard delete
     * @param {TypeORMErrorHandler} [eh] - Optional custom error handler
     * @returns {Promise<BaseEntity>} The deleted entity
     * @throws {NotFoundException} If the entity with the given ID is not found or ID is invalid
     * @throws {HttpException} If any other error occurs during deletion
     *
     * @example
     * ```typescript
     * // Soft delete a user by ID
     * const userId = '123e4567-e89b-12d3-a456-426614174000';
     * const deletedUser = await userService.delete(userId);
     *
     * // Hard delete a user by ID (permanent removal)
     * const permanentlyDeletedUser = await userService.delete(userId, true);
     *
     * // Soft delete with audit tracking
     * const deletedUserWithAudit = await userService.delete(userId, currentUser);
     * ```
     *
     * @see {@link deleteOne} Method to delete an entity by conditions
     * @see {@link deleteMany} Method to delete multiple entities by conditions
     * @see {@link deleteByIds} Method to delete multiple entities by IDs
     * @see {@link BaseRepository.deleteById} Repository method that performs the soft delete
     * @see {@link BaseRepository.hardDeleteById} Repository method that performs the hard delete
     */
    async delete(id: EntityId, deletedByOrWipe?: UserInfo | boolean, eh?: TypeORMErrorHandler): Promise<Entity> {
        try {
            if (!isUUID(id, DEFAULT_UUID_VERSION)) {
                throw new NotFoundException(CrudErrorResponses.E_400_INVALID_ID(this.entityName));
            }

            const wipe = typeof deletedByOrWipe === "boolean" ? deletedByOrWipe : false;
            const deletedBy = typeof deletedByOrWipe === "object" ? deletedByOrWipe : undefined;
            let deletedRecord = await this.get(id, undefined);
            const { affected } = wipe ? await this.repository.hardDeleteById(id) : await this.repository.deleteById(id);
            if (affected !== 0) {
                if (!wipe && deletedBy) {
                    try {
                        deletedRecord = await this.update(id, {} as EntityDeepPartial<Entity>, undefined, deletedBy);
                    } catch {
                        /* empty */
                    }
                }
                return deletedRecord;
            }

            throw new NotFoundException(CrudErrorResponses.E_404_ID(this.entityName));
        } catch (error: unknown) {
            this.handleError(error, eh);
        }
    }

    /**
     * Deletes a single entity that matches the specified conditions
     *
     * This method supports both soft delete (default) and hard delete (permanent removal).
     *
     * @param {QueryDeepPartial<BaseEntity>} where - Conditions to find the entity to delete
     * @param {true} wipe - When true, performs a hard delete (permanent removal)
     * @param {TypeORMErrorHandler} [eh] - Optional custom error handler
     * @returns {Promise<BaseEntity>} The deleted entity
     * @throws {NotFoundException} If no entity matches the conditions
     * @throws {HttpException} If any other error occurs during deletion
     */
    async deleteOne(where: QueryDeepPartial<Entity>, wipe?: true, eh?: TypeORMErrorHandler): Promise<Entity>;

    /**
     * Deletes a single entity that matches the specified conditions with audit tracking
     *
     * This overload performs a soft delete and sets the deletedBy property for audit tracking.
     *
     * @param {QueryDeepPartial<BaseEntity>} where - Conditions to find the entity to delete
     * @param {UserInfo} deletedBy - The user who deleted the entity (for audit tracking)
     * @param {TypeORMErrorHandler} [eh] - Optional custom error handler
     * @returns {Promise<BaseEntity>} The deleted entity
     * @throws {NotFoundException} If no entity matches the conditions
     * @throws {HttpException} If any other error occurs during deletion
     */
    async deleteOne(where: QueryDeepPartial<Entity>, deletedBy?: UserInfo, eh?: TypeORMErrorHandler): Promise<Entity>;

    /**
     * Implementation of the deleteOne method
     *
     * This method deletes a single entity that matches the specified conditions.
     * It supports both soft delete (default) and hard delete (permanent removal).
     * When using soft delete, it can also set the deletedBy property for audit tracking.
     *
     * @param {QueryDeepPartial<BaseEntity>} where - Conditions to find the entity to delete
     * @param {UserInfo | boolean} [deletedByOrWipe] - The user who deleted the entity or true for hard delete
     * @param {TypeORMErrorHandler} [eh] - Optional custom error handler
     * @returns {Promise<BaseEntity>} The deleted entity
     * @throws {NotFoundException} If no entity matches the conditions
     * @throws {HttpException} If any other error occurs during deletion
     *
     * @example
     * ```typescript
     * // Soft delete a user by email
     * const deletedUser = await userService.deleteOne({
     *   email: 'john@example.com'
     * });
     *
     * // Hard delete a user by email (permanent removal)
     * const permanentlyDeletedUser = await userService.deleteOne(
     *   { email: 'john@example.com' },
     *   true
     * );
     *
     * // Soft delete with audit tracking
     * const deletedUserWithAudit = await userService.deleteOne(
     *   { email: 'john@example.com' },
     *   currentUser
     * );
     * ```
     *
     * @see {@link delete} Method to delete an entity by ID
     * @see {@link deleteMany} Method to delete multiple entities by conditions
     * @see {@link BaseRepository.deleteById} Repository method that performs the soft delete
     * @see {@link BaseRepository.hardDeleteById} Repository method that performs the hard delete
     */
    async deleteOne(
        where: QueryDeepPartial<Entity>,
        deletedByOrWipe?: UserInfo | boolean,
        eh?: TypeORMErrorHandler,
    ): Promise<Entity> {
        try {
            const wipe = typeof deletedByOrWipe === "boolean" ? deletedByOrWipe : false;
            const deletedBy = typeof deletedByOrWipe === "object" ? deletedByOrWipe : undefined;
            let entity = await this.repository.getOne({ where });
            if (!entity) {
                throw new NotFoundException(CrudErrorResponses.E_404_CONDITION(this.entityName));
            }

            const { affected } = wipe
                ? await this.repository.hardDeleteById(entity.id)
                : await this.repository.deleteById(entity.id);

            if (affected !== 0) {
                if (!wipe && deletedBy) {
                    try {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        entity = await this.update(entity.id, { deletedBy } as any);
                    } catch {
                        /* empty */
                    }
                }

                return entity;
            }

            throw new NotFoundException(CrudErrorResponses.E_404_ID(this.entityName));
        } catch (error: unknown) {
            this.handleError(error, eh);
        }
    }

    /**
     * Deletes multiple entities that match the specified conditions
     *
     * This method supports both soft delete (default) and hard delete (permanent removal).
     *
     * @param {QueryDeepPartial<BaseEntity>} where - Conditions to find entities to delete
     * @param {true} wipe - When true, performs a hard delete (permanent removal)
     * @param {TypeORMErrorHandler} [eh] - Optional custom error handler
     * @returns {Promise<BaseEntity[]>} Array of deleted entities
     * @throws {NotFoundException} If no entities match the conditions
     * @throws {HttpException} If any other error occurs during deletion
     */
    async deleteMany(where: QueryDeepPartial<Entity>, wipe?: true, eh?: TypeORMErrorHandler): Promise<Entity[]>;

    /**
     * Deletes multiple entities that match the specified conditions with audit tracking
     *
     * This overload performs a soft delete and sets the deletedBy property for audit tracking.
     *
     * @param {QueryDeepPartial<BaseEntity>} where - Conditions to find entities to delete
     * @param {UserInfo} deletedBy - The user who deleted the entities (for audit tracking)
     * @param {TypeORMErrorHandler} [eh] - Optional custom error handler
     * @returns {Promise<BaseEntity[]>} Array of deleted entities
     * @throws {NotFoundException} If no entities match the conditions
     * @throws {HttpException} If any other error occurs during deletion
     */
    async deleteMany(
        where: QueryDeepPartial<Entity>,
        deletedBy?: UserInfo,
        eh?: TypeORMErrorHandler,
    ): Promise<Entity[]>;

    /**
     * Implementation of the deleteMany method
     *
     * This method deletes multiple entities that match the specified conditions.
     * It supports both soft delete (default) and hard delete (permanent removal).
     * When using soft delete, it can also set the deletedBy property for audit tracking.
     *
     * @param {QueryDeepPartial<BaseEntity>} where - Conditions to find entities to delete
     * @param {UserInfo | boolean} [deletedByOrWipe] - The user who deleted the entities or true for hard delete
     * @param {TypeORMErrorHandler} [eh] - Optional custom error handler
     * @returns {Promise<BaseEntity[]>} Array of deleted entities
     * @throws {NotFoundException} If no entities match the conditions
     * @throws {HttpException} If any other error occurs during deletion
     *
     * @example
     * ```typescript
     * // Soft delete all inactive users
     * const deletedUsers = await userService.deleteMany({
     *   isActive: false
     * });
     *
     * // Hard delete all inactive users (permanent removal)
     * const permanentlyDeletedUsers = await userService.deleteMany(
     *   { isActive: false },
     *   true
     * );
     *
     * // Soft delete with audit tracking
     * const deletedUsersWithAudit = await userService.deleteMany(
     *   { isActive: false },
     *   currentUser
     * );
     * ```
     *
     * @see {@link delete} Method to delete a single entity by ID
     * @see {@link deleteOne} Method to delete a single entity by conditions
     * @see {@link deleteByIds} Method to delete multiple entities by IDs
     * @see {@link BaseRepository.deleteByIds} Repository method that performs the soft delete
     * @see {@link BaseRepository.hardDeleteByIds} Repository method that performs the hard delete
     */
    async deleteMany(
        where: QueryDeepPartial<Entity>,
        deletedByOrWipe?: UserInfo | boolean,
        eh?: TypeORMErrorHandler,
    ): Promise<Entity[]> {
        try {
            const wipe = typeof deletedByOrWipe === "boolean" ? deletedByOrWipe : false;
            const deletedBy = typeof deletedByOrWipe === "object" ? deletedByOrWipe : undefined;
            const entities = await this.getMany({ where });

            const ids = entities.map(entity => entity.id);
            const { affected } = wipe
                ? await this.repository.hardDeleteByIds(ids)
                : await this.repository.deleteByIds(ids);

            if (affected !== 0) {
                if (!wipe && deletedBy) {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    await this.updateByIds(ids, { deletedBy } as any);
                }

                return entities;
            }
            throw new NotFoundException(CrudErrorResponses.E_404_ID(this.entityName));
        } catch (error: unknown) {
            this.handleError(error, eh);
        }
    }

    /**
     * Deletes multiple entities by their IDs
     *
     * This method supports both soft delete (default) and hard delete (permanent removal).
     * Unlike the other delete methods, this method returns a success response rather than
     * the deleted entities.
     *
     * @param {EntityId[]} ids - Array of entity IDs to delete
     * @param {true} wipe - When true, performs a hard delete (permanent removal)
     * @param {TypeORMErrorHandler} [eh] - Optional custom error handler
     * @returns {Promise<SuccessResponse>} A success response indicating the deletion was successful
     * @throws {NotFoundException} If no entities with the given IDs are found
     * @throws {HttpException} If any other error occurs during deletion
     */
    async deleteByIds(ids: EntityId[], wipe?: true, eh?: TypeORMErrorHandler): Promise<SuccessResponse>;

    /**
     * Deletes multiple entities by their IDs with audit tracking
     *
     * This overload performs a soft delete and sets the deletedBy property for audit tracking.
     *
     * @param {EntityId[]} ids - Array of entity IDs to delete
     * @param {UserInfo} deletedBy - The user who deleted the entities (for audit tracking)
     * @param {TypeORMErrorHandler} [eh] - Optional custom error handler
     * @returns {Promise<SuccessResponse>} A success response indicating the deletion was successful
     * @throws {NotFoundException} If no entities with the given IDs are found
     * @throws {HttpException} If any other error occurs during deletion
     */
    async deleteByIds(ids: EntityId[], deletedBy?: UserInfo, eh?: TypeORMErrorHandler): Promise<SuccessResponse>;

    /**
     * Implementation of the deleteByIds method
     *
     * This method deletes multiple entities by their IDs. It supports both soft delete (default)
     * and hard delete (permanent removal). When using soft delete, it can also set the deletedBy
     * property for audit tracking. Unlike the other delete methods, this method returns a success
     * response rather than the deleted entities.
     *
     * @param {EntityId[]} ids - Array of entity IDs to delete
     * @param {UserInfo | boolean} [deletedByOrWipe] - The user who deleted the entities or true for hard delete
     * @param {TypeORMErrorHandler} [eh] - Optional custom error handler
     * @returns {Promise<SuccessResponse>} A success response indicating the deletion was successful
     * @throws {NotFoundException} If no entities with the given IDs are found
     * @throws {HttpException} If any other error occurs during deletion
     *
     * @example
     * ```typescript
     * // Soft delete multiple users by IDs
     * const userIds = [
     *   '123e4567-e89b-12d3-a456-426614174000',
     *   '223e4567-e89b-12d3-a456-426614174000'
     * ];
     * const result = await userService.deleteByIds(userIds);
     *
     * // Hard delete multiple users by IDs (permanent removal)
     * const permanentResult = await userService.deleteByIds(userIds, true);
     *
     * // Soft delete with audit tracking
     * const resultWithAudit = await userService.deleteByIds(userIds, currentUser);
     * ```
     *
     * @see {@link delete} Method to delete a single entity by ID
     * @see {@link deleteMany} Method to delete multiple entities by conditions
     * @see {@link BaseRepository.deleteByIds} Repository method that performs the soft delete
     * @see {@link BaseRepository.hardDeleteByIds} Repository method that performs the hard delete
     * @see {@link EntityUtils.handleSuccess} Utility method that generates the success response
     */
    async deleteByIds(
        ids: EntityId[],
        deletedByOrWipe?: UserInfo | boolean,
        eh?: TypeORMErrorHandler,
    ): Promise<SuccessResponse> {
        try {
            const wipe = typeof deletedByOrWipe === "boolean" ? deletedByOrWipe : false;
            const deletedBy = typeof deletedByOrWipe === "object" ? deletedByOrWipe : undefined;
            const { affected } = wipe
                ? await this.repository.hardDeleteByIds(ids)
                : await this.repository.deleteByIds(ids);

            if (affected !== 0) {
                if (!wipe && deletedBy) {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    await this.updateByIds(ids, { deletedBy } as any);
                }
                return EntityUtils.handleSuccess(this.entityName, Operation.DELETE);
            }

            throw new NotFoundException(CrudErrorResponses.E_404_ID(this.entityName));
        } catch (error: unknown) {
            this.handleError(error, eh);
        }
    }

    /**
     * Counts entities that match the specified conditions
     *
     * This method returns the number of entities that match the given conditions.
     * It's useful for getting counts without retrieving the actual entities.
     *
     * @param {GetManyOptions<BaseEntity>} [getMany] - Options for filtering entities to count
     * @param {TypeORMErrorHandler} [eh] - Optional custom error handler
     * @returns {Promise<number>} The number of entities that match the conditions
     * @throws {HttpException} If any error occurs during the count operation
     *
     * @example
     * ```typescript
     * // Count all users
     * const totalUsers = await userService.count();
     *
     * // Count active users
     * const activeUsers = await userService.count({
     *   where: { isActive: true }
     * });
     *
     * // Count users with specific conditions
     * const premiumUsers = await userService.count({
     *   where: {
     *     isActive: true,
     *     subscriptionType: 'premium'
     *   }
     * });
     * ```
     *
     * @see {@link getMany} Method to retrieve entities that match conditions
     * @see {@link BaseRepository.countMany} Repository method that performs the actual count
     */
    async count(getMany?: GetManyOptions<Entity>, eh?: TypeORMErrorHandler): Promise<number> {
        try {
            return await this.repository.countMany(getMany);
        } catch (error: unknown) {
            this.handleError(error, eh);
        }
    }

    /**
     * Executes operations within a transaction
     *
     * This method creates a transaction and executes the provided operation function
     * within that transaction. If the operation succeeds, the transaction is committed.
     * If an error occurs, the transaction is rolled back.
     *
     * @template T - The return type of the operation
     * @returns {Promise<T>} The result of the operation
     * @throws {HttpException} If any error occurs during the transaction
     *
     * @example
     * ```typescript
     * // Execute multiple operations in a transaction
     * const result = await userService.transaction(async (manager) => {
     *   // Create a user
     *   const user = await manager.getRepository(UserEntity).save({
     *     name: 'John Doe',
     *     email: 'john@example.com'
     *   });
     *
     *   // Create a profile for the user
     *   const profile = await manager.getRepository(ProfileEntity).save({
     *     user,
     *     bio: 'Software developer'
     *   });
     *
     *   return { user, profile };
     * });
     * ```
     *
     * @see {@link BaseRepository.transaction} Repository method that manages the transaction
     */
    transaction<T>(operation: () => Promise<T>): Promise<T> {
        return this.repository.transaction(operation);
    }

    /**
     * Executes a function with error handling
     *
     * This utility method executes the provided function and handles any errors
     * that occur using the service's error handling mechanism. It's useful for
     * wrapping custom operations that aren't covered by the standard CRUD methods.
     *
     * @template T - The return type of the function
     * @param {() => Promise<T>} fn - Function to execute
     * @returns {Promise<T>} The result of the function
     * @throws {HttpException} If any error occurs during execution
     *
     * @example
     * ```typescript
     * // Execute a custom operation with error handling
     * const result = await userService.try(async () => {
     *   // Custom logic that might throw errors
     *   const user = await someExternalService.fetchUser('john@example.com');
     *   if (!user) {
     *     throw new NotFoundException('User not found in external service');
     *   }
     *   return user;
     * });
     * ```
     *
     * @see {@link handleError} Method that handles errors
     */
    async try<T>(fn: () => Promise<T>): Promise<T> {
        try {
            return await fn();
        } catch (error: unknown) {
            this.handleError(error);
        }
    }

    /**
     * Handles errors in a standardized way
     *
     * This method provides centralized error handling for all service methods.
     * It first checks if the error is already an HttpException, in which case it
     * rethrows it. Then it applies any custom error handler if provided. Finally,
     * it delegates to EntityUtils.handleError for standard error handling.
     *
     * @param {unknown} error - The error to handle
     * @param {TypeORMErrorHandler} [eh] - Optional custom error handler
     * @returns {never} This method always throws an exception
     * @throws {HttpException} The appropriate HTTP exception based on the error
     *
     * @example
     * ```typescript
     * // Custom error handler in a service method
     * async customOperation(): Promise<void> {
     *   try {
     *     // Some operation that might fail
     *     await this.repository.doSomething();
     *   } catch (error) {
     *     this.handleError(error, (err) => {
     *       // Custom error handling logic
     *       if (err instanceof SomeSpecificError) {
     *         return new BadRequestException('Custom error message');
     *       }
     *       return null; // Let the default handler handle other errors
     *     });
     *   }
     * }
     * ```
     *
     * @see {@link EntityUtils.handleError} Utility method that handles entity-related errors
     * @see {@link TypeORMErrorHandler} Type definition for custom error handlers
     */
    handleError(error: unknown, eh?: TypeORMErrorHandler): never {
        if (error instanceof HttpException) {
            throw error;
        }

        if (eh) {
            const err = eh(error);
            if (err) {
                throw err;
            }
        }

        EntityUtils.handleError(error, this.entityName, this.uniqueFieldNames);
    }
}
