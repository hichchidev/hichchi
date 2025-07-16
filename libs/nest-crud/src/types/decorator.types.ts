/**
 * Type definitions for entity decorator functions
 *
 * This module provides type definitions for decorator functions used with
 * Hichchi entities. These types ensure type safety when creating and using
 * decorators that target entity classes.
 *
 * Key features:
 * - Type-safe decorator function signatures
 * - Support for both standard entities and entity extensions
 * - Integration with the Hichchi entity system
 * - Compatibility with TypeScript's decorator pattern
 *
 * These types are primarily used when creating custom decorators for entities
 * or when extending the functionality of existing entity decorators.
 *
 * @see {@link BaseEntity} The base entity class that standard decorators target
 * @see {@link BaseEntityExtension} The extended entity class for specialized decorators
 * @see {@link HichchiEntity} The primary entity decorator that uses these types
 */

import { Type } from "@hichchi/utils";
import { BaseEntity, BaseEntityExtension } from "../base";

/**
 * Type definition for decorators that target standard entity classes
 *
 * This type represents a decorator function that can be applied to classes
 * that extend the BaseEntity class. It follows the TypeScript decorator pattern
 * where the decorator receives the class constructor as its parameter.
 *
 * The decorator function doesn't return a value (void), as it typically
 * modifies the target class or registers metadata about the class.
 *
 * @param {Type<BaseEntity>} target - The entity class being decorated
 * @returns {void}
 *
 * @example
 * ```typescript
 * // Creating a custom entity decorator
 * const CustomEntity: EntityDecorator = (target: Type<BaseEntity>) => {
 *   // Register metadata or modify the target class
 *   Reflect.defineMetadata('custom:entity', true, target);
 *
 *   // You can also extend the class prototype
 *   target.prototype.customMethod = function() {
 *     return 'This is a custom method';
 *   };
 * };
 *
 * // Using the custom decorator
 * @HichchiEntity()
 * @CustomEntity
 * export class UserEntity extends BaseEntity {
 *   // Entity properties and methods
 * }
 * ```
 *
 * @see {@link BaseEntity} The base class that decorated entities must extend
 * @see {@link HichchiEntity} The primary entity decorator
 * @see {@link EntityExtensionDecorator} Similar type for entity extensions
 */
export type EntityDecorator = (target: Type<BaseEntity>) => void;

/**
 * Type definition for decorators that target extended entity classes
 *
 * This type represents a decorator function that can be applied to classes
 * that extend the BaseEntityExtension class. It follows the TypeScript decorator
 * pattern where the decorator receives the class constructor as its parameter.
 *
 * The decorator function doesn't return a value (void), as it typically
 * modifies the target class or registers metadata about the class.
 *
 * This type is similar to EntityDecorator but specifically targets entity
 * classes that use the extended entity base class, which provides additional
 * functionality beyond the standard BaseEntity.
 *
 * @param {Type<BaseEntityExtension>} target - The entity extension class being decorated
 * @returns {void}
 *
 * @example
 * ```typescript
 * // Creating a custom entity extension decorator
 * const CustomExtendedEntity: EntityExtensionDecorator = (target: Type<BaseEntityExtension>) => {
 *   // Register metadata or modify the target class
 *   Reflect.defineMetadata('custom:extended-entity', true, target);
 *
 *   // You can also extend the class prototype with extension-specific features
 *   target.prototype.getExtendedInfo = function() {
 *     return 'This is an extended entity';
 *   };
 * };
 *
 * // Using the custom decorator
 * @HichchiEntity()
 * @CustomExtendedEntity
 * export class ProductEntity extends BaseEntityExtension {
 *   // Entity properties and methods with extended functionality
 * }
 * ```
 *
 * @see {@link BaseEntityExtension} The base class that decorated entity extensions must extend
 * @see {@link HichchiEntity} The primary entity decorator
 * @see {@link EntityDecorator} Similar type for standard entities
 */
export type EntityExtensionDecorator = (target: Type<BaseEntityExtension>) => void;
