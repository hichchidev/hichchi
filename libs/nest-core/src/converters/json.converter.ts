/**
 * Converts a JavaScript object to a JSON string
 *
 * This function safely converts any JavaScript object to its JSON string
 * representation. It handles non-object inputs by returning an empty object
 * string ("{}").
 *
 * @param {unknown} object - The object to convert to a JSON string
 * @returns {string} A JSON string representation of the object, or "{}" for non-objects
 *
 * @example
 * ```typescript
 * // Converting a simple object
 * const data = { name: 'John', age: 30 };
 * const json = toString(data);
 * // json = '{"name":"John","age":30}'
 *
 * // Handling non-object values
 * const notAnObject = 42;
 * const json = toString(notAnObject);
 * // json = '{}'
 * ```
 *
 * @see {@link toJSON} For the complementary function to convert JSON strings back to objects
 */
export function toString(object: unknown): string {
    if (typeof object !== "object") {
        return "{}";
    }
    return JSON.stringify(object);
}

/**
 * Converts a JSON string to a JavaScript object
 *
 * This function safely parses a JSON string into a JavaScript object with
 * type inference through generics. If the parsing fails (e.g., due to invalid JSON),
 * it returns an empty object cast to the specified type.
 *
 * @template T - The expected type of the resulting object (defaults to any)
 * @param {string} string - The JSON string to convert to an object
 * @returns {T} The parsed object, or an empty object if parsing fails
 *
 * @example
 * ```typescript
 * // Basic usage with default typing
 * const jsonString = '{"name":"John","age":30}';
 * const data = toJSON(jsonString);
 * // data = { name: 'John', age: 30 }
 *
 * // With explicit type parameter
 * interface User {
 *   id: number;
 *   name: string;
 *   email: string;
 * }
 *
 * const jsonString = '{"id":1,"name":"John","email":"john@example.com"}';
 * const user = toJSON<User>(jsonString);
 * // user is typed as User
 *
 * // Handling invalid JSON
 * const invalidJson = '{name:"John"'; // Missing closing brace
 * const result = toJSON(invalidJson);
 * // result = {}
 * ```
 *
 * @see {@link toString} For the complementary function to convert objects to JSON strings
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function toJSON<T = any>(string: string): T {
    try {
        return JSON.parse(string);
    } catch {
        return {} as T;
    }
}
