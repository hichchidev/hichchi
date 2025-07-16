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
