/**
 * Generic interface for objects with string keys and values of a specified type.
 *
 * `LiteralObject` represents a simple key-value dictionary where all keys are strings
 * and all values are of the same type T. It provides a type-safe way to work with
 * dynamic objects that have arbitrary string keys.
 *
 * Key features:
 * - Allows any string as a key using an index signature
 * - Generic type parameter for values with `any` as the default
 * - Useful for representing dynamic objects with unknown structure
 * - Commonly used in object transformation and manipulation utilities
 *
 * Common use cases:
 * - Working with JSON data
 * - Creating dictionaries or maps with string keys
 * - Representing configuration objects
 * - Handling data with dynamic property names
 *
 * @template T The type of values in the object (defaults to `any`)
 *
 * @example
 * ```typescript
 * // Basic usage with default any type
 * const config: LiteralObject = {
 *   apiUrl: 'https://api.example.com',
 *   timeout: 5000,
 *   retryCount: 3
 * };
 *
 * // With a specific value type
 * const stringMap: LiteralObject<string> = {
 *   en: 'Hello',
 *   fr: 'Bonjour',
 *   es: 'Hola'
 * };
 *
 * // Accessing properties dynamically
 * function getValue(obj: LiteralObject, key: string): any {
 *   return obj[key];
 * }
 * ```
 *
 * @see {@link objectToPathValueSet} Utility that uses LiteralObject for object flattening
 * @see {@link PathValueSet} Related interface for flattened object representation
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface LiteralObject<T = any> {
    [key: string]: T;
}
