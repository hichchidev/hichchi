/* eslint-disable @typescript-eslint/no-explicit-any */
// noinspection JSUnusedGlobalSymbols

import { InfiniteObject, PathValueSet } from "./interfaces";
import { LiteralObject } from "./types";

/**
 * Deep copy an object.
 * @template T Type of the object.
 * @param {T} obj Object to copy.
 * @returns {T} Copied object.
 *
 * @example
 * ```typescript
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
 * ```typescript
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
 * ```typescript
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
 * ```typescript
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
 * ```typescript
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
 * Get value from an object by path.
 * @template T - Type of the value.
 * @param {InfiniteObject} obj Object to get value from.
 * @param {string} path Path to get value from.
 * @returns {T | undefined} Value from the object.
 *
 * @example
 * ```typescript
 * // Example usage
 * const object = {
 *     role: "user",
 *     profile: {
 *         name: "John Doe",
 *         age: 30,
 *         address: {
 *             city: "New York",
 *         },
 *     },
 * };
 *
 * const value = getValueByPath<string>(object, "profile.address.city");
 *
 * // Example output: "New York"
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
 * Convert an object to a path value set
 * @template T The type of the value
 * @param {LiteralObject} obj The object
 * @returns {PathValueSet<T>} The path value set
 *
 * @example
 * ```typescript
 * // Example usage
 * const object = {
 *     role: "user",
 *     profile: {
 *         name: "John Doe",
 *         age: 30,
 *         address: {
 *             city: "New York",
 *         },
 *     },
 * };
 *
 * const pathValueSet = objectToPathValueSet(object);
 *
 * // Example output
 * {
 *     "role": "user",
 *     "profile.name": "John Doe",
 *     "profile.age": 30,
 *     "profile.address.city": "New York",
 * }
 *    ```
 */
export function objectToPathValueSet(obj: LiteralObject): PathValueSet {
    const result: PathValueSet = {};

    function traverse(obj: LiteralObject, path: string[] = []): void {
        for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                const value = obj[key];
                if (typeof value === "object" && !Array.isArray(value)) {
                    traverse(value, [...path, key]);
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
 * Convert the path value set to an object
 * @template R The return type
 * @param {PathValueSet} pathValueSet The path value set
 * @returns {R} The object with the path value set converted
 *
 * @example
 * ```typescript
 * // Example usage
 * const pathValueSet = {
 *     "role": "user",
 *     "profile.name": "John Doe",
 *     "profile.age": 30,
 *     "profile.address.city": "New York",
 * }
 *
 * const object = pathValueSetToObject(pathValueSet);
 *
 * // Example output
 * {
 *     role: "user",
 *     profile: {
 *         name: "John Doe",
 *         age: 30,
 *         address: {
 *             city: "New York",
 *         },
 *     },
 * }
 * ```
 *
 */
export function pathValueSetToObject<R = object>(pathValueSet: Record<string, any>): R {
    const object: Record<string, any> = {};

    // Helper function to validate paths
    const isValidPath = (path: string): boolean => {
        const regex = /^[a-zA-Z0-9_.-]+$/;
        return path.split(".").every(part => regex.test(part));
    };

    // Helper function to set nested properties
    const setObjectValue = (obj: Record<string, any>, keys: string[], value: any): void => {
        const [firstKey, ...remainingKeys] = keys;
        if (remainingKeys.length === 0) {
            obj[firstKey] = value; // Set value at the final key
            return;
        }

        // Initialize the key if it doesn't exist
        obj[firstKey] = obj[firstKey] || {};
        setObjectValue(obj[firstKey], remainingKeys, value); // Recurse for the rest of the keys
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
 * @param obj - Object to omit properties from.
 * @param keys - Array of keys to omit.
 * @returns - Object with omitted properties.
 *
 * @example
 * ```typescript
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
export const omit = <T extends { [key: string]: unknown }>(obj: Partial<T>, keys?: (keyof T)[]): void => {
    if (obj) {
        Object.keys(obj).forEach(key => {
            return (obj[key] === undefined || keys?.includes(key)) && delete obj[key];
        });
    }
};

/**
 * Prune an object by removing all empty, null, undefined, and prototype properties.
 * @template T Type of the object.
 * @param {any} obj Object to prune.
 * @param {boolean} [omitPrototype] Omit prototype properties.
 * @returns {T} Pruned object.
 *
 * @example
 * ```typescript
 * // Example usage
 * const object = {
 *     role: "user",
 *     profile: {
 *         name: "John Doe",
 *         age: 30,
 *         address: undefined,
 *         city: "New York",
 *     },
 * };
 */
export const prune = <T>(obj: any, omitPrototype?: boolean): T => {
    const objClone: any = {};
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
