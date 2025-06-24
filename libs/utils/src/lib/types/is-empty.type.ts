// noinspection JSUnusedGlobalSymbols
/**
 * Type predicate that determines if a type is an empty object type.
 *
 * The `IsEmpty` type evaluates to `true` if the provided type T has no properties
 * (i.e., it is an empty object type), and `false` otherwise. This is determined by
 * checking if `keyof T extends never`.
 *
 * This utility type is useful for conditional types that need special handling
 * for empty objects versus objects with properties.
 *
 * @template T The type to check
 *
 * @example
 * ```typescript
 * // Example with conditional types
 * type ProcessObject<T> = IsEmpty<T> extends true
 *   ? { defaultProp: string }  // Provide default for empty objects
 *   : T;  // Keep non-empty objects as-is
 *
 * // Usage
 * type ProcessedEmpty = ProcessObject<{}>;  // { defaultProp: string }
 * type ProcessedNonEmpty = ProcessObject<{ name: string }>;  // { name: string }
 * ```
 */
export type IsEmpty<T> = keyof T extends never ? true : false;
