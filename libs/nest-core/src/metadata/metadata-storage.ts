// noinspection JSUnusedGlobalSymbols

import { singular, Type } from "@hichchi/utils";
import { getGlobal } from "../utils";

/**
 * Information about a Data Transfer Object (DTO) stored in the metadata system
 *
 * This interface represents the metadata associated with a DTO class.
 * It can store either a reference to an entity class or a name string.
 */
interface HichchiMetaDtoInfo {
    entity?: Type;
    name?: string;
}

/**
 * Complete metadata for a DTO instance, including its target class
 *
 * This interface extends HichchiMetaDtoInfo to include the target class reference,
 * which represents the actual DTO class. This is used when retrieving metadata
 * for a specific DTO instance.
 */
interface HichchiMetaDto extends HichchiMetaDtoInfo {
    /**
     * The DTO class reference
     */
    target: Type;
}

/**
 * Metadata for an entity class stored in the metadata system
 *
 * This interface represents the metadata associated with an entity class,
 * including its table name, singular name, and unique field constraints.
 */
interface HichchiMetaEntity {
    /**
     * The entity class reference
     */
    entity: Type;

    /**
     * The database table name for this entity
     */
    tableName: string;

    /**
     * The singular name derived from the table name
     */
    name: string;

    /**
     * Array of property names that form a unique constraint
     */
    unique: string[];
}

/**
 * Central metadata storage system for Hichchi framework
 *
 * This class provides a centralized storage for metadata about DTOs, entities,
 * and other application components. It maintains three separate stores:
 *
 * 1. validationDtos: Maps DTO classes to their metadata
 * 2. entities: Maps entity classes to their metadata
 * 3. store: A general-purpose metadata store for any class
 *
 * The class is typically accessed through the hichchiMetadata() function,
 * which provides a singleton instance.
 *
 * @example
 * ```typescript
 * // Register a DTO with a name
 * hichchiMetadata().addValidationDto(UserDto, 'user');
 *
 * // Register an entity
 * hichchiMetadata().addEntity(User, 'users', ['id']);
 *
 * // Store and retrieve custom metadata
 * hichchiMetadata().setMetadata(User, 'isSearchable', true);
 * const isSearchable = hichchiMetadata().getMetadata<boolean>(User, 'isSearchable');
 * ```
 *
 * @see {@link hichchiMetadata} Function to access the singleton instance
 */
export class HichchiMetadata {
    /**
     * Storage for DTO class metadata
     * Maps DTO classes to their metadata information
     */
    private validationDtos: Map<Type, HichchiMetaDtoInfo> = new Map();

    /**
     * Storage for entity class metadata
     * Maps entity classes to their metadata information
     */
    private entities: Map<Type, HichchiMetaEntity> = new Map();

    /**
     * General-purpose metadata storage
     * Maps classes to a map of property keys and their values
     */
    private store = new Map<Type, Map<string, unknown>>();

    /**
     * Register a DTO class with a name
     *
     * @param {Type} dto - The DTO class to register
     * @param {string} name - The name to associate with the DTO
     * @returns {void}
     */
    addValidationDto(dto: Type, name: string): void;

    /**
     * Register a DTO class with an entity class
     *
     * @param {Type} dto - The DTO class to register
     * @param {Type} entity - The entity class to associate with the DTO
     * @returns {void}
     */
    addValidationDto(dto: Type, entity: Type): void;

    /**
     * Implementation of the addValidationDto method
     * Registers a DTO class with either a name or an entity class
     *
     * @param {Type} dto - The DTO class to register
     * @param {string | Type} nameOrEntity - The name or entity class to associate with the DTO
     * @returns {void}
     */
    addValidationDto(dto: Type, nameOrEntity: string | Type): void {
        if (typeof nameOrEntity === "string") {
            this.validationDtos.set(dto, { name: nameOrEntity });
            return;
        }
        this.validationDtos.set(dto, { entity: nameOrEntity });
    }

    /**
     * Get all registered DTO classes
     *
     * @returns {Type[]} Array of all registered DTO classes
     *
     * @example
     * ```typescript
     * const allDtos = hichchiMetadata().getValidationDtos();
     * console.log(`Found ${allDtos.length} registered DTOs`);
     * ```
     */
    getValidationDtos(): Type[] {
        return Array.from(this.validationDtos.keys());
    }

    /**
     * Get metadata information for a specific DTO class
     *
     * @param {Type} dto - The DTO class to get metadata for
     * @returns {HichchiMetaDtoInfo | undefined} The metadata information or undefined if not found
     *
     * @example
     * ```typescript
     * const userDtoInfo = hichchiMetadata().getValidationDtoInfo(UserDto);
     * if (userDtoInfo?.entity) {
     *   console.log('UserDto is associated with an entity');
     * }
     * ```
     */
    getValidationDtoInfo(dto: Type): HichchiMetaDtoInfo | undefined {
        return this.validationDtos.get(dto);
    }

    /**
     * Get metadata for an object instance by finding its DTO class
     *
     * This method attempts to find a registered DTO class that matches the
     * constructor of the provided instance, and returns the metadata for that class.
     *
     * @param {unknown} instance - The object instance to get metadata for
     * @returns {HichchiMetaDto | undefined} The metadata or undefined if no matching DTO is found
     *
     * @example
     * ```typescript
     * const userDto = new UserDto();
     * const metadata = hichchiMetadata().getDtoMetaOfInstance(userDto);
     * if (metadata) {
     *   console.log(`Found metadata for ${metadata.target.name}`);
     * }
     * ```
     */
    getDtoMetaOfInstance(instance: unknown): HichchiMetaDto | undefined {
        const dto = Array.from(this.validationDtos.keys()).find(dto => instance instanceof dto);
        if (!dto) {
            return undefined;
        }
        return {
            target: dto,
            ...this.getValidationDtoInfo(dto),
        };
    }

    /**
     * Register an entity class with its metadata
     *
     * This method registers an entity class with its table name and unique field constraints.
     * It automatically generates a singular name from the table name.
     *
     * @param {Type} entity - The entity class to register
     * @param {string} tableName - The database table name for this entity
     * @param {string[]} unique - Array of property names that form a unique constraint
     * @returns {void}
     *
     * @example
     * ```typescript
     * // Register a User entity with 'users' table and 'id' as unique field
     * hichchiMetadata().addEntity(User, 'users', ['id']);
     * ```
     */
    addEntity(entity: Type, tableName: string, unique: string[]): void {
        this.entities.set(entity, { entity, tableName, name: singular(tableName), unique });
    }

    /**
     * Get the singular name for an entity
     *
     * @param {Type} entity - The entity class to get the name for
     * @returns {string | undefined} The singular name or undefined if entity not found
     *
     * @example
     * ```typescript
     * const entityName = hichchiMetadata().getEntityName(User);
     * // Returns 'user' if the entity was registered with tableName 'users'
     * ```
     */
    getEntityName(entity: Type): string | undefined {
        return this.entities.get(entity)?.name;
    }

    /**
     * Get the unique field constraints for an entity
     *
     * @param {Type} entity - The entity class to get unique fields for
     * @returns {string[] | undefined} Array of unique field names or undefined if entity not found
     *
     * @example
     * ```typescript
     * const uniqueFields = hichchiMetadata().getEntityUnique(User);
     * // Returns ['id'] if the entity was registered with those unique fields
     * ```
     */
    getEntityUnique(entity: Type): string[] | undefined {
        return this.entities.get(entity)?.unique;
    }

    /**
     * Check if a class is a registered Hichchi entity
     *
     * @param {Type} entity - The class to check
     * @returns {boolean | undefined} True if the class is a registered entity
     *
     * @example
     * ```typescript
     * if (hichchiMetadata().isHichchiEntity(User)) {
     *   console.log('User is a registered entity');
     * }
     * ```
     */
    isHichchiEntity(entity: Type): boolean | undefined {
        return this.entities.has(entity);
    }

    /**
     * Store custom metadata for a class
     *
     * This method allows storing arbitrary metadata for any class.
     * The metadata is stored with a property key for later retrieval.
     *
     * @param {Type} target - The class to store metadata for
     * @param {string} propertyKey - The key to identify this metadata
     * @param {unknown} value - The metadata value to store
     * @returns {void}
     *
     * @example
     * ```typescript
     * // Store custom metadata
     * hichchiMetadata().setMetadata(User, 'isSearchable', true);
     * hichchiMetadata().setMetadata(User, 'searchFields', ['name', 'email']);
     * ```
     */
    setMetadata(target: Type, propertyKey: string, value: unknown): void {
        const item = (this.store.get(target) as Map<string, unknown>) || new Map<string, unknown>();
        item.set(propertyKey, value);
        this.store.set(target, item);
    }

    /**
     * Retrieve custom metadata for a class
     *
     * This method retrieves previously stored metadata for a class.
     *
     * @template T - The expected type of the metadata value
     * @param {Type} target - The class to retrieve metadata for
     * @param {string} propertyKey - The key identifying the metadata
     * @returns {T} The metadata value cast to type T
     *
     * @example
     * ```typescript
     * // Retrieve custom metadata
     * const isSearchable = hichchiMetadata().getMetadata<boolean>(User, 'isSearchable');
     * const searchFields = hichchiMetadata().getMetadata<string[]>(User, 'searchFields');
     * ```
     */
    getMetadata<T>(target: Type, propertyKey: string): T {
        return this.store.get(target)?.get(propertyKey) as T;
    }
}

/**
 * Get the global singleton instance of HichchiMetadata
 *
 * This function provides access to the global metadata storage system.
 * It ensures that only one instance of HichchiMetadata exists in the application,
 * creating it if it doesn't already exist.
 *
 * @returns {HichchiMetadata} The singleton instance of HichchiMetadata
 *
 * @example
 * ```typescript
 * // Register a DTO
 * hichchiMetadata().addValidationDto(UserDto, 'user');
 *
 * // Register an entity
 * hichchiMetadata().addEntity(User, 'users', ['id']);
 *
 * // Store and retrieve custom metadata
 * hichchiMetadata().setMetadata(User, 'isSearchable', true);
 * const isSearchable = hichchiMetadata().getMetadata<boolean>(User, 'isSearchable');
 * ```
 *
 * @see {@link HichchiMetadata} The class that provides metadata storage functionality
 */
export function hichchiMetadata(): HichchiMetadata {
    const global = getGlobal() as { hichchiMetadataStorage?: HichchiMetadata } & typeof globalThis & {};

    if (!global.hichchiMetadataStorage) {
        global.hichchiMetadataStorage = new HichchiMetadata();
    }

    return global.hichchiMetadataStorage;
}
