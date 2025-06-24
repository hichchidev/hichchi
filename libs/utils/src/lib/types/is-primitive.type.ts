// noinspection JSUnusedGlobalSymbols
/**
 * Type predicate that determines if a type is a primitive JavaScript value.
 *
 * The `IsPrimitive` type evaluates to `true` if the provided type T is a primitive
 * JavaScript value (string, number, boolean, symbol, bigint, null, or undefined),
 * and `false` otherwise (objects, arrays, functions, etc.).
 *
 * This utility type is useful for creating conditional types that need to
 * behave differently for primitive vs. non-primitive values.
 *
 * @template T The type to check
 *
 * @example
 * ```typescript
 * // Example with conditional types
 * type SerializeValue<T> = IsPrimitive<T> extends true
 *   ? T  // For primitives, keep as-is
 *   : string;  // For non-primitives, convert to string
 *
 * // Usage
 * type SerializedNumber = SerializeValue<number>;  // number
 * type SerializedObject = SerializeValue<{foo: string}>;  // string
 * ```
 */
export type IsPrimitive<T> = T extends string | number | boolean | symbol | bigint | null | undefined ? true : false;
