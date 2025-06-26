/* eslint-disable @typescript-eslint/no-explicit-any */
// noinspection JSUnusedGlobalSymbols

import { InfiniteObject, PathValueSet } from "../interfaces";
import { LiteralObject, PartialWithNull } from "../types";

/**
 * Deep copy an object.
 * @template T Type of the object.
 * @param {T} obj Object to copy.
 * @returns {T} Copied object.
 *
 * @example
 * ```TypeScript
 * // Example usage
 * const object = {
 *    name: "John Doe"
 * }
 *
 * const copiedObject = deepCopy(object);
 * ```
 */
export function deepCopy<T>(obj: T): T {
    if (Array.isArray(obj)) {
        return obj.map(deepCopy) as unknown as T;
    } else if (typeof obj === "object" && obj !== null) {
        return Object.fromEntries(Object.entries(obj).map(([key, value]) => [key, deepCopy(value)])) as unknown as T;
    }
    return obj;
}

/**
 * Get the key of a map by value.
 * @param {Map<string, unknown>} map Map to get key from.
 * @param {unknown} value Value to get key for.
 * @returns {string | undefined} Key of the map.
 *
 * @example
 * ```TypeScript
 * // Example usage
 * const user = new Map<string, string>([
 *     ["firstName", "John"],
 *     ["lastName", "Doe"],
 *     ["preferredName", "John"],
 *     ["age", 30],
 * ]);
 *
 * const key = getMapKey(user, "value2");
 *
 * // Example output: "firstName"
 * ```
 */
export function getMapKey(map: Map<string, unknown>, value: unknown): string | undefined {
    return [...Array.from(map.entries())].find(([, v]) => v === value)?.[0];
}

/**
 * Get the keys of a map by partial value.
 * @param {Map<string, string>} map Map to get keys from.
 * @param {string} partialValue Partial value to get keys for.
 * @returns - Keys of the map.
 *
 * @example
 * ```TypeScript
 * // Example usage
 * const user = new Map<string, string>([
 *    ["firstName", "John"],
 *    ["lastName", "Doe"],
 *    ["preferredName", "John"],
 *    ["age", 30],
 * ]);
 *
 * const keys = getMapKeys(user, "Jo");
 *
 * // Example output
 * ["firstName", "preferredName"]
 * ```
 */
export const getMapKeys = (map: Map<string, string>, partialValue: string): string[] => {
    const keys = [];
    for (const [key, value] of Array.from(map.entries())) {
        if (value.includes(partialValue)) {
            keys.push(key);
        }
    }
    return keys;
};

/**
 * Groups an array of objects by a key.
 * @template K Type of the key.
 * @template V Type of the object.
 * @param {Array<V>} list Array of objects to group.
 * @param {(input: V) => K} keyGetter Function to get the key from the object.
 * @returns {Map<K | null, Array<V>>} Grouped objects.
 *
 * @example
 * ```TypeScript
 * // Example usage
 * // group by age, all have unique names
 * const users = [
 *     { name: "John", age: 30 },
 *     { name: "Jane", age: 25 },
 *     { name: "Doe", age: 30 },
 *     { name: "Smith", age: 25 },
 *     { name: "Denis", age: 30 },
 * ];
 *
 * const groupedUsers = groupBy(users, user => user.age);
 *
 * // Example output
 * Map {
 *     30 => [
 *         { name: "John", age: 30 },
 *         { name: "Doe", age: 30 },
 *         { name: "Denis", age: 30 },
 *     ],
 *     25 => [
 *         { name: "Jane", age: 25 },
 *         { name: "Smith", age: 25 },
 *     ],
 * }
 * ```
 */
export const groupBy = <K, V>(list: Array<V>, keyGetter: (input: V) => K): Map<K | null, Array<V>> => {
    const map = new Map<K, Array<V>>();
    list.forEach(item => {
        const key = keyGetter(item);
        const collection = map.get(key);
        if (!collection) {
            map.set(key, [item]);
        } else {
            collection.push(item);
        }
    });
    return map;
};

/**
 * Get the values of a map by partial value.
 * @param {Map<string, string>} map Map to get values from.
 * @param {string} partialValue Partial value to get values for.
 * @returns {string[]} Values of the map.
 *
 * @example
 * ```TypeScript
 * // Example usage
 * const user = new Map<string, string>([
 *     ["name", "John Doe"],
 *     ["preferredName", "John"],
 *     ["age", 30],
 * ]);
 *
 * const values = getMapValues(user, "Jo");
 *
 * // Example output
 * ["John Doe", "John"]
 * ```
 */
export const searchMapValues = (map: Map<string, string>, partialValue: string): string[] => {
    const values = [];
    for (const [, value] of Array.from(map.entries())) {
        if (value.includes(partialValue)) {
            values.push(value);
        }
    }
    return values;
};

/**
 * Gets a value from a nested object using a dot-notation path string.
 *
 * This function safely traverses a deeply nested object structure using a string path
 * with dot notation. It handles both object properties and array indices within the path.
 *
 * @template T - Type of the value to be returned.
 * @param {InfiniteObject} obj - The object to retrieve the value from.
 * @param {string} path - The dot-notation path to the desired value.
 *   - Use dots to navigate through nested objects: 'user.profile.address'
 *   - Use array notation for accessing array elements: 'items[0]' or 'users[2].name'
 * @returns {T | undefined} - The value at the specified path, or undefined if:
 *   - Any part of the path doesn't exist
 *   - An array index is out of bounds
 *   - The path format is invalid
 *
 * @example
 * ```typescript
 * // Simple nested object property
 * const user = {
 *   profile: {
 *     name: "John Doe",
 *     contact: { email: "john@example.com" }
 *   }
 * };
 * const email = getValueByPath<string>(user, "profile.contact.email");
 * // Returns: "john@example.com"
 * ```
 *
 * @example
 * ```typescript
 * // Accessing array elements
 * const data = {
 *   users: [
 *     { id: 1, name: "Alice" },
 *     { id: 2, name: "Bob" }
 *   ]
 * };
 * const name = getValueByPath<string>(data, "users[1].name");
 * // Returns: "Bob"
 * ```
 */
export const getValueByPath = <T>(obj: InfiniteObject, path: string): T | undefined => {
    const keys = path.split("."); // Split the path into an array of keys

    let value = obj;
    for (const key of keys) {
        // noinspection RegExpRedundantEscape

        const regExp = /^(\w+)\[(\d+)\]$/;
        const isArrayIndex = regExp.exec(key); // Check if the key is an array index

        if (isArrayIndex) {
            const arrayKey = isArrayIndex[1];
            // eslint-disable-next-line @typescript-eslint/no-magic-numbers
            const index = Number(isArrayIndex[2]);
            if (arrayKey && Array.isArray(value[arrayKey]) && index >= 0 && index < value[arrayKey].length) {
                value = value[arrayKey][index]; // Update the value to the array element
            } else {
                return undefined; // Return undefined if the array index is invalid
            }
        } else if (value && typeof value === "object" && key in value) {
            value = value[key]; // Update the value to the nested property
        } else {
            return undefined; // Return undefined if any key is not found
        }
    }

    return value as T;
};

/**
 * Converts a nested object into a flattened PathValueSet representation.
 *
 * This function transforms a hierarchical object structure into a flat key-value map
 * where keys represent paths to values in the original object using dot notation.
 *
 * The function recursively traverses the object and flattens nested properties,
 * converting object hierarchies like `{ user: { name: 'John' } }` into
 * path-based entries like `{ 'user.name': 'John' }`.
 *
 * @param {LiteralObject} obj - The nested object to flatten
 * @returns {PathValueSet} - A flattened representation where:
 *   - Keys are dot-notation paths to values in the original object
 *   - Values are primitive values (strings, numbers, booleans) from the original object
 *
 * @remarks
 * - Array values will be preserved as-is (not flattened into separate paths)
 * - Only primitive values (string, number, boolean) are supported as leaf values
 * - Circular references are not handled and will cause a stack overflow
 *
 * @see {@link pathValueSetToObject} The inverse operation to convert a PathValueSet back to a nested object
 * @see {@link PathValueSet} The interface for the returned flattened object
 *
 * @example
 * ```typescript
 * // Flatten a nested user object
 * const user = {
 *   id: 123,
 *   name: "John Doe",
 *   isActive: true,
 *   profile: {
 *     age: 30,
 *     address: {
 *       city: "New York",
 *       zip: "10001"
 *     }
 *   }
 * };
 *
 * const flattened = objectToPathValueSet(user);
 *
 * // Result:
 * // {
 * //   "id": 123,
 * //   "name": "John Doe",
 * //   "isActive": true,
 * //   "profile.age": 30,
 * //   "profile.address.city": "New York",
 * //   "profile.address.zip": "10001"
 * // }
 * ```
 */
export function objectToPathValueSet(obj: LiteralObject): PathValueSet {
    const result: PathValueSet = {};

    function traverse(obj: LiteralObject, path: string[] = []): void {
        for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                const value = obj[key];
                if (typeof value === "object" && !Array.isArray(value)) {
                    traverse(value as LiteralObject, [...path, key]);
                } else {
                    result[[...path, key].join(".")] = value;
                }
            }
        }
    }

    traverse(obj);

    return result;
}

/**
 * Converts a flattened PathValueSet back into a nested object structure.
 *
 * This function is the inverse of `objectToPathValueSet`. It takes a flat map of
 * dot-notation paths to values and reconstructs a hierarchical object structure.
 *
 * Each key in the input PathValueSet represents a path through the object hierarchy,
 * with dots separating each level. The function builds a nested object structure by
 * parsing these paths and placing values at the appropriate locations.
 *
 * @template R - The type of the returned object (defaults to object)
 * @param {PathValueSet} pathValueSet - A flattened object with dot-notation path keys
 * @returns {R} - A reconstructed nested object with the original hierarchy
 *
 * @remarks
 * - Paths are validated for safety to prevent injection attacks
 * - Invalid paths are silently skipped (not included in the result)
 * - Path components should contain only alphanumeric characters, underscores, hyphens, and dots
 *
 * @see {@link objectToPathValueSet} The inverse operation to convert an object to PathValueSet
 * @see {@link PathValueSet} The interface for the input flattened object
 *
 * @example
 * ```typescript
 * // Convert a flat PathValueSet to a nested object
 * const flatData = {
 *   "id": 123,
 *   "name": "John Doe",
 *   "profile.age": 30,
 *   "profile.address.city": "New York",
 *   "profile.address.zip": "10001"
 * };
 *
 * const nestedObject = pathValueSetToObject(flatData);
 *
 * Result:
 * // {
 * //   id: 123,
 * //   name: "John Doe",
 * //   profile: {
 * //     age: 30,
 * //     address: {
 * //       city: "New York",
 * //       zip: "10001"
 * //     }
 * //   }
 * // }
 * ```
 *
 * @example
 * ```typescript
 * // Typed return value
 * interface User {
 *   id: number;
 *   name: string;
 *   profile: {
 *     age: number;
 *     address: {
 *       city: string;
 *       zip: string;
 *     };
 *   };
 * }
 *
 * const userData = pathValueSetToObject<User>(flatData);
 * // Returns object with User type
 * ```
 */
export function pathValueSetToObject<R = object>(pathValueSet: Record<string, any>): R {
    const object: Record<string, any> = {};

    // Helper function to validate paths
    const isValidPath = (path: string): boolean => {
        const regex = /^[a-zA-Z0-9_.-]+$/;
        return path.split(".").every(part => regex.test(part));
    };

    // Helper function to set nested properties
    const setObjectValue = <T = unknown>(obj: Record<string, any>, keys: string[], value: T): void => {
        const [firstKey, ...remainingKeys] = keys;
        if (remainingKeys.length === 0) {
            obj[firstKey] = value; // Set value at the final key
            return;
        }

        // Initialize the key if it doesn't exist
        obj[firstKey] = obj[firstKey] || {};
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        setObjectValue<T>(obj[firstKey], remainingKeys, value); // Recurse for the rest of the keys
        // TODO: v2.0 Fix type for above
    };

    for (const path in pathValueSet) {
        if (Object.prototype.hasOwnProperty.call(pathValueSet, path)) {
            if (!isValidPath(path)) {
                continue; // Skip invalid paths
            }

            const value = pathValueSet[path];
            const keys = path.split("."); // Split path into keys
            setObjectValue(object, keys, value); // Use helper to populate the object
        }
    }

    return object as R;
}

/**
 * Omits undefined properties and properties in the keys array from an object.
 * @template T Type of the object.
 * @param {Partial<T>} obj - Object to omit properties from.
 * @param {(keyof T)[]} keys - Array of keys to omit.
 * @returns {Partial<T>} - Object with omitted properties.
 *
 * @example
 * ```TypeScript
 * // Example usage
 * const object = {
 *     role: "user",
 *     name: "John Doe",
 *     age: 30,
 *     address: undefined,
 * };
 *
 * omit(object, ["role"]);
 *
 * // Example output
 * {
 *     name: "John Doe",
 *     age: 30,
 * }
 * ```
 */
export const omit = <T extends { [key: string]: unknown }>(obj: Partial<T>, keys?: (keyof T)[]): Partial<T> => {
    if (obj) {
        Object.keys(obj).forEach(key => {
            return (obj[key] === undefined || keys?.includes(key)) && delete obj[key];
        });
    }
    return obj;
};

/**
 * Prune an object by removing all empty, null, undefined, and prototype properties.
 * This function recursively removes properties that are null, undefined, or empty strings from the object.
 * @template T Type of the object.
 * @param {T} obj Object to prune.
 * @param {boolean} [omitPrototype] Whether to omit prototype properties. If true, only own properties will be included.
 * @returns {T} Pruned object with all empty, null, and undefined properties removed.
 *
 * @example
 * ```TypeScript
 * // Example usage
 * const object = {
 *     role: "user",
 *     profile: {
 *         name: "John Doe",
 *         age: 30,
 *         address: undefined,
 *         city: "New York",
 *         country: null,
 *         zip: ""
 *     },
 * };
 *
 * const prunedObject = prune(object);
 *
 * // Example output
 * {
 *     role: "user",
 *     profile: {
 *         name: "John Doe",
 *         age: 30,
 *         city: "New York"
 *     }
 * }
 * ```
 */
export const prune = <T>(obj: PartialWithNull<T>, omitPrototype?: boolean): T => {
    const objClone: T = {} as T;
    if (typeof obj !== "object") {
        return objClone as T;
    }

    for (const key in obj) {
        if (!omitPrototype || Object.prototype.hasOwnProperty.call(obj, key)) {
            if (obj[key] !== null && typeof obj[key] === "object") {
                objClone[key] = prune(obj[key], omitPrototype);
            } else if (obj[key] !== null && obj[key] !== undefined && obj[key] !== "") {
                objClone[key] = obj[key];
            }
        }
    }
    return objClone as T;
};

export function hasOwnAll(obj: Record<PropertyKey, unknown>, props: PropertyKey[]): boolean {
    return props.every((prop: PropertyKey) => Object.hasOwn(obj, prop));
}

export function getEnumValues<T extends object>(e: T): T[keyof T][] {
    const values = Object.values(e);

    // In numeric enums, values can appear as keys (reverse mapping)
    const isNumericEnum = values.some(v => typeof v === "number");

    return isNumericEnum ? (values.filter(v => typeof v !== "string") as T[keyof T][]) : (values as T[keyof T][]);
}
