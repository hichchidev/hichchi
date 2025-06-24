/**
 * Represents an object with infinite nesting capability (recursive object type).
 *
 * This interface defines a recursive type that allows for objects with arbitrary depth of nesting,
 * where each property value can itself be another infinitely-nestable object. This pattern is useful
 * for representing hierarchical data structures, configuration objects, or any data that requires
 * unlimited nesting depth.
 *
 * The interface uses TypeScript's index signature to allow any string key, with values that
 * must be of the same InfiniteObject type, creating the recursive structure.
 *
 * @remarks
 * While this interface allows for infinite nesting in theory, practical limitations apply:
 * - JavaScript engine stack size limits may cause errors with extremely deep nesting
 * - Performance degrades with very deep object hierarchies
 * - Serialization/deserialization of deeply nested objects may be problematic
 *
 * This type is often used in conjunction with utility functions for traversing, flattening,
 * or manipulating deeply nested object structures.
 *
 * @see PathValueSet A flattened representation of nested objects
 * @see {@link objectToPathValueSet} Utility to convert nested objects to PathValueSet
 * @see {@link pathValueSetToObject} Utility to convert PathValueSet back to nested objects
 *
 * @example
 * ```typescript
 * // Creating a deeply nested object
 * const nestedObj: InfiniteObject = {
 *   level1: {
 *     level2: {
 *       level3: {
 *         property: {
 *           value: {
 *             // Can continue nesting indefinitely
 *           }
 *         }
 *       }
 *     }
 *   }
 * };
 * ```
 */
export interface InfiniteObject {
    [key: string]: InfiniteObject;
}

/**
 * Represents a flattened object where keys are dot-notation paths and values are primitive types.
 *
 * This interface defines a data structure that transforms nested objects into a flat, key-value
 * dictionary where:
 * - Keys are string paths using dot notation to represent the original object hierarchy
 * - Values are limited to primitive types (string, number, boolean)
 *
 * PathValueSet provides a serialization-friendly format for complex nested objects, making them
 * easier to store, transmit, or manipulate in certain contexts (like databases, query params,
 * or form handling).
 *
 * @remarks
 * The PathValueSet format offers several benefits:
 *
 * - **Simplicity**: Eliminates nested structure complexity, making it easier to iterate over all properties
 * - **Queryability**: Enables direct access to deeply nested values without traversal logic
 * - **Serializability**: Flattened structure is more amenable to certain serialization formats
 * - **Transformability**: Easier to apply transformations to all values regardless of nesting level
 *
 * Common use cases include:
 * - Flattening complex objects for storage in key-value databases
 * - Representing form data with nested field structures
 * - Simplifying diff operations between complex objects
 * - Creating update operations that target specific nested properties
 *
 * @see {@link InfiniteObject} The complementary nested object representation
 * @see {@link objectToPathValueSet} Utility to convert nested objects to PathValueSet
 * @see {@link pathValueSetToObject} Utility to convert PathValueSet back to nested objects
 *
 * @example
 * ```typescript
 * // A PathValueSet representing a nested user object
 * const userPathValues: PathValueSet = {
 *   'id': 123,
 *   'name': 'John Doe',
 *   'isActive': true,
 *   'profile.age': 30,
 *   'profile.address.city': 'New York',
 *   'profile.address.zip': '10001'
 * };
 * ```
 *
 * @example
 * ```typescript
 * // Converting between nested objects and PathValueSet
 * import { objectToPathValueSet, pathValueSetToObject } from './object.utils';
 *
 * const user = {
 *   id: 123,
 *   name: 'John Doe',
 *   profile: {
 *     age: 30,
 *     address: {
 *       city: 'New York',
 *       zip: '10001'
 *     }
 *   }
 * };
 *
 * // Convert to PathValueSet
 * const pathValues = objectToPathValueSet(user);
 *
 * // Convert back to nested object
 * const reconstructedUser = pathValueSetToObject(pathValues);
 * ```
 *
 * @example
 * ```typescript
 * // Directly accessing a deeply nested value
 * const cityValue = userPathValues['profile.address.city']; // 'New York'
 *
 * // Updating a specific nested value without touching the rest
 * userPathValues['profile.address.city'] = 'Boston';
 * ```
 */
export interface PathValueSet {
    [path: string]: string | number | boolean;
}
