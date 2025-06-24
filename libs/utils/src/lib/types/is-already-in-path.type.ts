// noinspection JSUnusedGlobalSymbols
/**
 * Type predicate that detects circular references in type paths.
 *
 * The `IsAlreadyInPath` type evaluates to `true` if type T is already part of the path U,
 * indicating a potential circular reference. It returns `false` otherwise.
 *
 * This utility type is crucial for preventing infinite recursion in recursive type
 * definitions, particularly when working with deeply nested structures or graphs.
 *
 * @template T The type to check if it's in the path
 * @template U The current path of types
 *
 * @example
 * ```typescript
 * // Example usage in a recursive type definition
 * type RecursivelyProcess<T, Path = never> =
 *   IsAlreadyInPath<T, Path> extends true
 *     ? any  // Break recursion to prevent infinite type expansion
 *     : T extends object
 *       ? { [K in keyof T]: RecursivelyProcess<T[K], Path | T> }
 *       : T;
 * ```
 */
export type IsAlreadyInPath<T, U> = U extends object ? (T extends U ? true : false) : false;
