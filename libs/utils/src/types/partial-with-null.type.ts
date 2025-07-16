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
