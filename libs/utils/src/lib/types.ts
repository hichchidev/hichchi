/* eslint-disable @typescript-eslint/no-explicit-any */
// noinspection JSUnusedGlobalSymbols

/**
 * Represents an object with string keys and values of type T.
 *
 * This type is useful for representing objects with dynamic keys where
 * the values are all of the same type.
 *
 * @template T The type of values in the object. Defaults to any.
 *
 * @example
 * ```TypeScript
 * // Object with string keys and string values
 * const stringMap: LiteralObject<string> = {
 *   name: 'John',
 *   city: 'New York'
 * };
 * ```
 *
 * @example
 * ```TypeScript
 * // Object with string keys and number values
 * const numberMap: LiteralObject<number> = {
 *   age: 30,
 *   score: 95
 * };
 * ```
 */
export type LiteralObject<T = any> = {
    [key: string]: T;
};

/**
 * Makes all properties of type T optional and allows them to be null.
 *
 * This type is similar to TypeScript's built-in `Partial<T>` type, but it also
 * allows properties to be null in addition to being undefined or their original type.
 *
 * @template T The type to make partial with null.
 *
 * @example
 * ```TypeScript
 * interface User {
 *   id: number;
 *   name: string;
 *   email: string;
 * }
 *
 * // All properties are optional and can be null
 * const partialUser: PartialWithNull<User> = {
 *   id: 1,
 *   name: null,
 *   // email is omitted (undefined)
 * };
 * ```
 */
export type PartialWithNull<T> = {
    [p in keyof T]?: T[p] | null;
};

/**
 * Represents a type for autocompleting string values.
 *
 * The `LooseAutocomplete` type allows autocompletion for a set of predefined string literals
 * while still permitting other string values that are not part of the predefined set.
 *
 * This is useful in cases where a set of recommended values is available,
 * but the user is also given the flexibility to provide custom input as needed.
 *
 * @template T Extends string - The set of predefined literal string options for autocompletion.
 *
 * @author Matt Pocock (https://www.totaltypescript.com/tips/create-autocomplete-helper-which-allows-for-arbitrary-values)
 */
export type LooseAutocomplete<T extends string> = T | Omit<string, T>;

/**
 * Utility type for creating a clean object type from a complex type.
 *
 * The `Prettify` type takes a potentially complex type (with intersections, unions,
 * mapped types, etc.) and converts it into a simple object type with all properties
 * explicitly defined. This makes the resulting type easier to read in IDE tooltips
 * and type errors.
 *
 * @template T The complex type to simplify
 *
 * @author Matt Pocock (https://www.totaltypescript.com/tips/create-autocomplete-helper-which-allows-for-arbitrary-values)
 *
 * @example
 * ```typescript
 * // Instead of seeing: { a: number } & { b: string }
 * // You'll see: { a: number, b: string }
 * type ComplexType = { a: number } & { b: string };
 * type SimpleType = Prettify<ComplexType>;
 * ```
 */
export type Prettify<T> = {
    [K in keyof T]: T[K];
} & {};

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
 * Generic constructor type for creating class instances.
 *
 * The `Type` type represents a constructor function that can create instances of a class.
 * It's particularly useful when working with dependency injection systems, factories,
 * or any code that needs to work with class constructors in a generic way.
 *
 * @template T The type of object that will be instantiated (defaults to unknown)
 *
 * @example
 * ```typescript
 * function createInstance<T>(ctor: Type<T>): T {
 *   return new ctor();
 * }
 *
 * // Usage
 * class MyService {}
 * const instance = createInstance(MyService);
 * ```
 */
export type Type<T = unknown> = new (...args: unknown[]) => T;
