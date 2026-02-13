/**
 * Represents a flattened object where keys are dot-notation paths and values are primitive types.
 *
 * This interface defines a data structure that transforms nested objects into a flat, key-value
 * dictionary where:
 * - Keys are string paths using dot notation to represent the original object hierarchy
 * - Values are limited to primitive types (string, number, boolean)
 *
 * DottedPathValueObject provides a serialization-friendly format for complex nested objects, making them
 * easier to store, transmit, or manipulate in certain contexts (like databases, query params,
 * or form handling).
 *
 * @remarks
 * The DottedPathValueObject format offers several benefits:
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
 * @see {@link objectToDottedPathValueObject} Utility to convert nested objects to DottedPathValueObject
 * @see {@link dottedPathObjectToNested} Utility to convert DottedPathValueObject back to nested objects
 *
 * @example
 * ```typescript
 * // A DottedPathValueObject representing a nested user object
 * const userPathValues: DottedPathValueObject = {
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
 * // Converting between nested objects and DottedPathValueObject
 * import { objectToDottedPathValueObject, dottedPathObjectToNested } from './object.utils';
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
 * // Convert to DottedPathValueObject
 * const pathValues = objectToDottedPathValueObject(user);
 *
 * // Convert back to nested object
 * const reconstructedUser = dottedPathObjectToNested(pathValues);
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
export interface DottedPathValueObject {
    [path: string]: string | number | boolean;
}
