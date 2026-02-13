// noinspection JSUnusedGlobalSymbols
/**
 * A utility type that recursively makes all properties of an object optional.
 *
 * Unlike TypeScript's built-in `Partial<T>` type which only makes top-level properties
 * optional, `DeepPartial<T>` recursively applies the transformation to nested objects,
 * arrays, maps, and sets. This makes it ideal for working with complex nested data
 * structures where you only want to provide a subset of the data.
 *
 * Features:
 * - Makes all object properties optional at every level of nesting
 * - Handles arrays by making each element a deep partial
 * - Supports Map objects by making both keys and values deep partials
 * - Supports Set objects by making each member a deep partial
 * - Preserves primitive values unchanged
 *
 * Common use cases:
 * - Creating update DTOs where only changed fields need to be provided
 * - Building test fixtures with minimal required properties
 * - Implementing patch operations for REST APIs
 * - Constructing partial configuration objects
 *
 * @template T The type to transform into a deep partial
 *
 * @example
 * ```typescript
 * interface User {
 *   id: string;
 *   name: string;
 *   profile: {
 *     avatar: string;
 *     preferences: {
 *       theme: string;
 *       notifications: boolean;
 *     };
 *   };
 *   roles: string[];
 * }
 *
 * // All these are valid DeepPartial<User>
 * const update1: DeepPartial<User> = { name: 'New Name' };
 * const update2: DeepPartial<User> = { profile: { preferences: { theme: 'dark' } } };
 * const update3: DeepPartial<User> = { roles: ['admin'] };
 * ```
 */
export type DeepPartial<T> =
    | T
    | (T extends Array<infer U>
          ? DeepPartial<U>[]
          : T extends Map<infer K, infer V>
            ? Map<DeepPartial<K>, DeepPartial<V>>
            : T extends Set<infer M>
              ? Set<DeepPartial<M>>
              : T extends object
                ? {
                      [K in keyof T]?: DeepPartial<T[K]>;
                  }
                : T);

/**
 * Lightweight recursive partial type for plain object filtering/comparison use-cases.
 */
export type SimpleDeepPartial<T> = {
    [K in keyof T]?: T[K] extends object ? SimpleDeepPartial<T[K]> : T[K];
};
