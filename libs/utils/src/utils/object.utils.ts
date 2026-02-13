/* eslint-disable @typescript-eslint/no-explicit-any */
// noinspection JSUnusedGlobalSymbols

import { InfiniteObject, DottedPathValueObject } from "../interfaces";
import { LiteralObject, PartialWithNull, SimpleDeepPartial } from "../types";

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
 * Retrieves all keys from a Map where the corresponding values contain a specified substring.
 *
 * This utility function searches through a Map's values and returns an array of keys
 * whose associated values include the provided partial string. The search is case-sensitive
 * and uses JavaScript's native string.includes() method for matching.
 *
 * This is particularly useful for implementing search functionality, filtering operations,
 * or finding related entries in configuration maps, user preference stores, or any
 * key-value data structure where you need to locate entries by partial value matching.
 *
 * @param {Map<string, string>} map - The Map to search through for matching values
 * @param {string} partialValue - The substring to search for within the Map's values
 * @returns {string[]} An array of keys whose corresponding values contain the partial value
 *
 * @example
 * ```typescript
 * // Search user preferences for entries containing "John"
 * const userPreferences = new Map<string, string>([
 *     ["displayName", "John Doe"],
 *     ["firstName", "John"],
 *     ["lastName", "Doe"],
 *     ["preferredName", "Johnny"],
 *     ["email", "john.doe@example.com"]
 * ]);
 *
 * const johnKeys = getMapKeys(userPreferences, "John");
 * // Returns: ["displayName", "firstName", "email"]
 * ```
 *
 * @example
 * ```typescript
 * // Find configuration keys related to database settings
 * const config = new Map<string, string>([
 *     ["db_host", "localhost"],
 *     ["db_port", "5432"],
 *     ["cache_host", "redis-server"],
 *     ["db_name", "myapp_database"],
 *     ["log_level", "debug"]
 * ]);
 *
 * const dbKeys = getMapKeys(config, "db");
 * // Returns: ["db_name"] (only values containing "db", not keys)
 * ```
 *
 * @example
 * ```typescript
 * // Search in a translations map
 * const translations = new Map<string, string>([
 *     ["welcome_message", "Welcome to our application"],
 *     ["error_message", "An error occurred"],
 *     ["success_message", "Operation completed successfully"],
 *     ["info_message", "Please check your information"]
 * ]);
 *
 * const messageKeys = getMapKeys(translations, "message");
 * // Returns: ["welcome_message", "error_message", "success_message", "info_message"]
 * ```
 *
 * @remarks
 * - The search is case-sensitive; "John" will not match "john"
 * - Returns an empty array if no matches are found
 * - The function iterates through all Map entries, so performance scales with Map size
 * - Only works with Maps that have string values; other value types will cause runtime errors
 */
export const getMapKeys = (map: Map<string, string>, partialValue: string): string[] => {
    const keys: string[] = [];
    for (const [key, value] of Array.from(map.entries())) {
        if (value.includes(partialValue)) {
            keys.push(key);
        }
    }
    return keys;
};

/**
 * Groups an array of objects into a Map based on a key extraction function.
 *
 * This utility function takes an array of objects and organizes them into groups
 * based on a common key or property. The grouping is performed using a key extraction
 * function that you provide, which determines how each object should be categorized.
 * The result is a Map where each key represents a group and the value is an array
 * of objects belonging to that group.
 *
 * This is particularly useful for data analysis, reporting, organizing collections
 * for display purposes, or preparing data for further processing where items need
 * to be categorized by shared characteristics.
 *
 * @template K - The type of the grouping key (can be string, number, boolean, etc.)
 * @template V - The type of the objects being grouped
 * @param {Array<V>} list - The array of objects to group
 * @param {(input: V) => K} keyGetter - A function that extracts the grouping key from each object.
 *                                      This function receives an object and should return the value
 *                                      to group by. If the function returns null or undefined,
 *                                      the object will be grouped under a null key.
 * @returns {Map<K | null, Array<V>>} A Map where keys are the grouping values and values are arrays
 *                                    of objects that share that grouping key
 *
 * @example
 * ```typescript
 * // Group users by age
 * interface User {
 *   name: string;
 *   age: number;
 *   department: string;
 * }
 *
 * const users: User[] = [
 *     { name: "John", age: 30, department: "Engineering" },
 *     { name: "Jane", age: 25, department: "Marketing" },
 *     { name: "Bob", age: 30, department: "Engineering" },
 *     { name: "Alice", age: 25, department: "Sales" },
 *     { name: "Charlie", age: 35, department: "Engineering" }
 * ];
 *
 * const usersByAge = groupBy(users, user => user.age);
 * // Returns:
 * // Map {
 * //   30 => [
 * //     { name: "John", age: 30, department: "Engineering" },
 * //     { name: "Bob", age: 30, department: "Engineering" }
 * //   ],
 * //   25 => [
 * //     { name: "Jane", age: 25, department: "Marketing" },
 * //     { name: "Alice", age: 25, department: "Sales" }
 * //   ],
 * //   35 => [
 * //     { name: "Charlie", age: 35, department: "Engineering" }
 * //   ]
 * // }
 * ```
 *
 * @example
 * ```typescript
 * // Group products by category
 * interface Product {
 *   id: number;
 *   name: string;
 *   category: string;
 *   price: number;
 * }
 *
 * const products: Product[] = [
 *     { id: 1, name: "Laptop", category: "Electronics", price: 999 },
 *     { id: 2, name: "Book", category: "Education", price: 29 },
 *     { id: 3, name: "Phone", category: "Electronics", price: 699 },
 *     { id: 4, name: "Pen", category: "Office", price: 5 }
 * ];
 *
 * const productsByCategory = groupBy(products, product => product.category);
 * // Useful for creating category-based product listings
 * ```
 *
 * @example
 * ```typescript
 * // Group tasks by completion status with boolean keys
 * interface Task {
 *   id: number;
 *   title: string;
 *   completed: boolean;
 * }
 *
 * const tasks: Task[] = [
 *     { id: 1, title: "Review code", completed: true },
 *     { id: 2, title: "Write tests", completed: false },
 *     { id: 3, title: "Deploy app", completed: true },
 *     { id: 4, title: "Update docs", completed: false }
 * ];
 *
 * const tasksByStatus = groupBy(tasks, task => task.completed);
 * // Returns Map with boolean keys: true and false
 * ```
 *
 * @remarks
 * - The function preserves the original order of objects within each group
 * - If the keyGetter function returns null or undefined, those objects will be grouped under a null key
 * - The Map structure allows for efficient lookups and iteration over groups
 * - Works with any type of grouping key (string, number, boolean, objects, etc.)
 * - Empty arrays will return an empty Map
 */
export const groupBy = <K, V>(list: Array<V>, keyGetter: (input: V) => K): Map<K, Array<V>> => {
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
 * Retrieves all values from a Map that contain a specified substring.
 *
 * This utility function searches through a Map's values and returns an array of all values
 * that include the provided partial string. The search is case-sensitive and uses JavaScript's
 * native string.includes() method for matching. This is the counterpart to getMapKeys(),
 * but instead of returning the keys, it returns the actual values that match.
 *
 * This is particularly useful for implementing search functionality where you need to find
 * and display matching content, filtering data for autocomplete features, or extracting
 * related values from configuration maps, user data, or any key-value store where you
 * need to locate entries by partial content matching.
 *
 * @param {Map<string, string>} map - The Map to search through for matching values
 * @param {string} partialValue - The substring to search for within the Map's values
 * @returns {string[]} An array of values that contain the specified partial value
 *
 * @example
 * ```typescript
 * // Search user information for values containing "John"
 * const userInfo = new Map<string, string>([
 *     ["fullName", "John Doe"],
 *     ["firstName", "John"],
 *     ["lastName", "Doe"],
 *     ["nickname", "Johnny"],
 *     ["email", "john.doe@example.com"],
 *     ["phone", "555-0123"]
 * ]);
 *
 * const johnValues = searchMapValues(userInfo, "John");
 * // Returns: ["John Doe", "John", "Johnny", "john.doe@example.com"]
 * ```
 *
 * @example
 * ```typescript
 * // Find error messages containing specific keywords
 * const errorMessages = new Map<string, string>([
 *     ["auth_failed", "Authentication failed. Please check your credentials."],
 *     ["network_error", "Network connection failed. Please try again."],
 *     ["validation_error", "Validation failed for the provided data."],
 *     ["timeout_error", "Request timeout. The server took too long to respond."],
 *     ["permission_denied", "Access denied. You don't have permission."]
 * ]);
 *
 * const failedMessages = searchMapValues(errorMessages, "failed");
 * // Returns: ["Authentication failed. Please check your credentials.",
 * //          "Network connection failed. Please try again.",
 * //          "Validation failed for the provided data."]
 * ```
 *
 * @example
 * ```typescript
 * // Search configuration values for environment-specific settings
 * const config = new Map<string, string>([
 *     ["api_url", "https://api.production.example.com"],
 *     ["db_host", "production-db.example.com"],
 *     ["cache_url", "redis://production-cache.example.com"],
 *     ["log_level", "error"],
 *     ["debug_mode", "false"]
 * ]);
 *
 * const productionValues = searchMapValues(config, "production");
 * // Returns: ["https://api.production.example.com",
 * //          "production-db.example.com",
 * //          "redis://production-cache.example.com"]
 * ```
 *
 * @remarks
 * - The search is case-sensitive; "John" will not match "john"
 * - Returns an empty array if no matches are found
 * - The function iterates through all Map entries, so performance scales with Map size
 * - Only works with Maps that have string values; other value types will cause runtime errors
 * - Values are returned in the order they appear in the Map iteration
 *
 * @see {@link getMapKeys} Function to get keys whose values contain a substring
 */
export const searchMapValues = (map: Map<string, string>, partialValue: string): string[] => {
    const values: string[] = [];
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
 * Converts a nested object into a flattened DottedPathValueObject representation.
 *
 * This function transforms a hierarchical object structure into a flat key-value map
 * where keys represent paths to values in the original object using dot notation.
 *
 * The function recursively traverses the object and flattens nested properties,
 * converting object hierarchies like `{ user: { name: 'John' } }` into
 * path-based entries like `{ 'user.name': 'John' }`.
 *
 * @param {LiteralObject} obj - The nested object to flatten
 * @returns {DottedPathValueObject} - A flattened representation where:
 *   - Keys are dot-notation paths to values in the original object
 *   - Values are primitive values (strings, numbers, booleans) from the original object
 *
 * @remarks
 * - Array values will be preserved as-is (not flattened into separate paths)
 * - Only primitive values (string, number, boolean) are supported as leaf values
 * - Circular references are not handled and will cause a stack overflow
 *
 * @see {@link dottedPathObjectToNested} The inverse operation to convert a DottedPathValueObject back to a nested object
 * @see {@link DottedPathValueObject} The interface for the returned flattened object
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
 * const flattened = objectToDottedPathValueObject(user);
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
export function objectToDottedPathValueObject(obj: LiteralObject): DottedPathValueObject {
    const result: DottedPathValueObject = {};

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
 * Converts a flattened DottedPathValueObject back into a nested object structure.
 *
 * This function is the inverse of `objectToDottedPathValueObject`. It takes a flat map of
 * dot-notation paths to values and reconstructs a hierarchical object structure.
 *
 * Each key in the input DottedPathValueObject represents a path through the object hierarchy,
 * with dots separating each level. The function builds a nested object structure by
 * parsing these paths and placing values at the appropriate locations.
 *
 * @template R - The type of the returned object (defaults to object)
 * @param {DottedPathValueObject} pathValueSet - A flattened object with dot-notation path keys
 * @returns {R} - A reconstructed nested object with the original hierarchy
 *
 * @remarks
 * - Paths are validated for safety to prevent injection attacks
 * - Invalid paths are silently skipped (not included in the result)
 * - Path components should contain only alphanumeric characters, underscores, hyphens, and dots
 *
 * @see {@link objectToDottedPathValueObject} The inverse operation to convert an object to DottedPathValueObject
 * @see {@link DottedPathValueObject} The interface for the input flattened object
 *
 * @example
 * ```typescript
 * // Convert a flat DottedPathValueObject to a nested object
 * const flatData = {
 *   "id": 123,
 *   "name": "John Doe",
 *   "profile.age": 30,
 *   "profile.address.city": "New York",
 *   "profile.address.zip": "10001"
 * };
 *
 * const nestedObject = dottedPathObjectToNested(flatData);
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
 * const userData = dottedPathObjectToNested<User>(flatData);
 * // Returns object with User type
 * ```
 */
export function dottedPathObjectToNested<R = object>(pathValueSet: Record<string, any>): R {
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
 * Creates a new object by omitting specified properties and undefined values from the original object.
 *
 * This utility function performs a selective copy of an object, excluding both explicitly
 * specified properties and any properties with undefined values. The function modifies
 * the original object in-place by deleting the unwanted properties, making it useful for
 * cleaning up objects before serialization, API calls, or data processing.
 *
 * This is particularly useful for preparing data for API requests where you need to remove
 * sensitive fields, clean up form data, or exclude certain properties from being sent to
 * external services. It's also helpful for removing undefined values that might cause
 * issues in JSON serialization or database operations.
 *
 * @template T - The type of the object being processed
 * @param {Partial<T>} obj - The object to process and remove properties from.
 *                           This object will be modified in-place.
 * @param {(keyof T)[]} [keys] - Optional array of property keys to omit from the object.
 *                               If not provided, only undefined properties will be removed.
 * @returns {Partial<T>} The same object reference with specified properties and undefined values removed
 *
 * @example
 * ```typescript
 * // Remove specific properties and undefined values
 * interface User {
 *   id: number;
 *   name: string;
 *   email: string;
 *   role: string;
 *   address?: string;
 *   phone?: string;
 * }
 *
 * const user: Partial<User> = {
 *     id: 123,
 *     name: "John Doe",
 *     email: "john@example.com",
 *     role: "admin",
 *     address: undefined,
 *     phone: "555-0123"
 * };
 *
 * const cleanUser = omit(user, ["role"]);
 * // Returns: { id: 123, name: "John Doe", email: "john@example.com", phone: "555-0123" }
 * // Note: 'role' and 'address' (undefined) are removed
 * ```
 *
 * @example
 * ```typescript
 * // Remove only undefined values (no specific keys)
 * const formData = {
 *     firstName: "John",
 *     lastName: "Doe",
 *     middleName: undefined,
 *     email: "john@example.com",
 *     phone: undefined
 * };
 *
 * const cleanFormData = omit(formData);
 * // Returns: { firstName: "John", lastName: "Doe", email: "john@example.com" }
 * ```
 *
 * @example
 * ```typescript
 * // Prepare data for API request by removing sensitive fields
 * interface UserProfile {
 *   id: number;
 *   username: string;
 *   email: string;
 *   password: string;
 *   internalNotes: string;
 *   createdAt: Date;
 * }
 *
 * const userProfile: Partial<UserProfile> = {
 *     id: 1,
 *     username: "johndoe",
 *     email: "john@example.com",
 *     password: "secret123",
 *     internalNotes: "VIP customer",
 *     createdAt: new Date()
 * };
 *
 * const publicProfile = omit(userProfile, ["password", "internalNotes"]);
 * // Safe to send to client: { id: 1, username: "johndoe", email: "john@example.com", createdAt: Date }
 * ```
 *
 * @remarks
 * - This function modifies the original object in-place rather than creating a copy
 * - Both explicitly specified keys and undefined properties are removed
 * - If the input object is falsy (null, undefined), it's returned as-is
 * - The function uses delete operator, which may affect object performance in some JavaScript engines
 * - Properties with null values are preserved (only undefined values are automatically removed)
 *
 * @see {@link prune} Function for more comprehensive object cleaning including null and empty values
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
 * Creates a deep copy of an object with all empty, null, undefined, and optionally prototype properties removed.
 *
 * This utility function recursively traverses an object and creates a clean copy by excluding
 * properties that are null, undefined, or empty strings. It performs a deep cleaning operation,
 * processing nested objects recursively to ensure that the entire object hierarchy is pruned
 * of unwanted values.
 *
 * This is particularly useful for preparing data for serialization, cleaning up API responses,
 * removing empty form fields, or ensuring that only meaningful data is processed or stored.
 * The function is especially valuable when working with deeply nested objects that may contain
 * sparse data or when you need to eliminate all traces of empty values from complex data structures.
 *
 * @template T - The type of the object being pruned
 * @param {PartialWithNull<T>} obj - The object to prune. Can contain null, undefined, or empty values.
 * @param {boolean} [omitPrototype=false] - Whether to exclude inherited properties from the prototype chain.
 *                                          If true, only own properties will be included in the result.
 *                                          If false (default), inherited enumerable properties will be processed.
 * @returns {T} A new object with all empty, null, and undefined properties recursively removed
 *
 * @example
 * ```typescript
 * // Clean up a user profile with nested empty values
 * interface UserProfile {
 *   id: number;
 *   name: string;
 *   contact: {
 *     email: string;
 *     phone?: string;
 *     address?: {
 *       street: string;
 *       city: string;
 *       zip?: string;
 *     };
 *   };
 *   preferences: {
 *     theme: string;
 *     notifications?: boolean;
 *   };
 * }
 *
 * const userProfile = {
 *     id: 123,
 *     name: "John Doe",
 *     contact: {
 *         email: "john@example.com",
 *         phone: "",
 *         address: {
 *             street: "123 Main St",
 *             city: "New York",
 *             zip: null
 *         }
 *     },
 *     preferences: {
 *         theme: "dark",
 *         notifications: undefined
 *     }
 * };
 *
 * const cleanProfile = prune(userProfile);
 * // Returns:
 * // {
 * //   id: 123,
 * //   name: "John Doe",
 * //   contact: {
 * //     email: "john@example.com",
 * //     address: {
 * //       street: "123 Main St",
 * //       city: "New York"
 * //     }
 * //   },
 * //   preferences: {
 * //     theme: "dark"
 * //   }
 * // }
 * ```
 *
 * @example
 * ```typescript
 * // Clean up form data before submission
 * const formData = {
 *     firstName: "John",
 *     lastName: "Doe",
 *     middleName: "",
 *     email: "john@example.com",
 *     phone: null,
 *     address: {
 *         street: "123 Main St",
 *         apartment: "",
 *         city: "New York",
 *         state: undefined,
 *         zip: "10001"
 *     },
 *     emergencyContact: {
 *         name: "",
 *         phone: null
 *     }
 * };
 *
 * const cleanFormData = prune(formData);
 * // Returns only fields with meaningful values:
 * // {
 * //   firstName: "John",
 * //   lastName: "Doe",
 * //   email: "john@example.com",
 * //   address: {
 * //     street: "123 Main St",
 * //     city: "New York",
 * //     zip: "10001"
 * //   }
 * // }
 * // Note: emergencyContact object is completely removed as all its properties were empty
 * ```
 *
 * @example
 * ```typescript
 * // Control prototype property inclusion
 * class BaseUser {
 *   role = "user";
 * }
 *
 * class ExtendedUser extends BaseUser {
 *   name = "John";
 *   email = "";
 * }
 *
 * const user = new ExtendedUser();
 *
 * const prunedWithPrototype = prune(user, false);
 * // Includes inherited 'role' property: { role: "user", name: "John" }
 *
 * const prunedOwnOnly = prune(user, true);
 * // Only own properties: { name: "John" }
 * ```
 *
 * @remarks
 * - Creates a new object rather than modifying the original (unlike the omit function)
 * - Recursively processes nested objects to ensure deep cleaning
 * - Removes properties with values: null, undefined, or empty string ("")
 * - Preserves properties with falsy but meaningful values like 0, false
 * - If a nested object becomes empty after pruning, it will be excluded from the result
 * - Non-object types are returned as an empty object of the target type
 * - The function preserves the type structure while removing empty values
 *
 * @see {@link omit} Function for selective property removal without deep cleaning
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

/**
 * Checks if an object has all specified properties as its own properties (not inherited).
 *
 * This utility function verifies that an object contains all the properties listed in the
 * provided array as direct (own) properties, not inherited from the prototype chain.
 * It uses the modern Object.hasOwn() method for reliable property existence checking,
 * making it safer than using hasOwnProperty() directly.
 *
 * This is particularly useful for validating object structures, ensuring required properties
 * exist before processing, implementing type guards, or verifying that objects conform to
 * expected interfaces. It's commonly used in data validation, API request validation,
 * and ensuring objects have all necessary properties before performing operations.
 *
 * @param {Record<PropertyKey, unknown>} obj - The object to check for property existence
 * @param {PropertyKey[]} props - Array of property keys to verify exist on the object.
 *                                PropertyKey includes string, number, and symbol types.
 * @returns {boolean} True if the object has all specified properties as own properties, false otherwise
 *
 * @example
 * ```typescript
 * // Validate that a user object has required properties
 * interface User {
 *   id: number;
 *   name: string;
 *   email: string;
 * }
 *
 * const user = {
 *   id: 123,
 *   name: "John Doe",
 *   email: "john@example.com",
 *   role: "admin"
 * };
 *
 * const hasRequiredProps = hasOwnAll(user, ["id", "name", "email"]);
 * // Returns: true
 *
 * const hasAllProps = hasOwnAll(user, ["id", "name", "email", "phone"]);
 * // Returns: false (missing 'phone' property)
 * ```
 *
 * @example
 * ```typescript
 * // Validate API request payload
 * function processUserUpdate(payload: unknown): User | null {
 *   if (typeof payload === 'object' && payload !== null) {
 *     const requiredFields = ['id', 'name', 'email'];
 *
 *     if (hasOwnAll(payload as Record<string, unknown>, requiredFields)) {
 *       // Safe to process as we know all required fields exist
 *       return updateUser(payload as User);
 *     }
 *   }
 *
 *   throw new Error('Invalid payload: missing required fields');
 * }
 * ```
 *
 * @example
 * ```typescript
 * // Check configuration object completeness
 * interface DatabaseConfig {
 *   host: string;
 *   port: number;
 *   database: string;
 *   username: string;
 *   password: string;
 * }
 *
 * const config = {
 *   host: "localhost",
 *   port: 5432,
 *   database: "myapp",
 *   username: "admin"
 *   // password is missing
 * };
 *
 * const requiredConfigKeys = ['host', 'port', 'database', 'username', 'password'];
 * const isConfigComplete = hasOwnAll(config, requiredConfigKeys);
 * // Returns: false
 *
 * if (!isConfigComplete) {
 *   throw new Error('Database configuration is incomplete');
 * }
 * ```
 *
 * @example
 * ```typescript
 * // Work with symbol properties
 * const symbolKey = Symbol('secret');
 * const obj = {
 *   name: "test",
 *   [symbolKey]: "hidden value"
 * };
 *
 * const hasSymbolProp = hasOwnAll(obj, ['name', symbolKey]);
 * // Returns: true
 * ```
 *
 * @remarks
 * - Uses Object.hasOwn() which is more reliable than hasOwnProperty()
 * - Only checks for own properties, not inherited properties from the prototype chain
 * - Returns false immediately if any property is missing (short-circuit evaluation)
 * - Works with string, number, and symbol property keys
 * - Returns true for an empty properties array (vacuous truth)
 * - Does not check property values, only existence
 *
 * @see {@link Object.hasOwn} The underlying method used for property checking
 */
export function hasOwnAll(obj: Record<PropertyKey, unknown>, props: PropertyKey[]): boolean {
    return props.every((prop: PropertyKey) => Object.hasOwn(obj, prop));
}

/**
 * Extracts all values from a TypeScript enum, handling both string and numeric enum types correctly.
 *
 * This utility function safely retrieves the actual values from TypeScript enums, accounting for
 * the different internal representations of string and numeric enums. For numeric enums, TypeScript
 * creates reverse mappings (value → key), so this function filters out the reverse mapping entries
 * to return only the actual enum values. For string enums, it returns all values directly.
 *
 * This is particularly useful when you need to iterate over enum values, validate input against
 * enum values, create dropdown options from enums, or perform any operation that requires access
 * to the actual enum values rather than the keys.
 *
 * @template T - The enum type extending object
 * @param {T} e - The enum object to extract values from
 * @returns {T[keyof T][]} An array containing all the actual values of the enum
 *
 * @example
 * ```typescript
 * // String enum example
 * enum Color {
 *   RED = "red",
 *   GREEN = "green",
 *   BLUE = "blue"
 * }
 *
 * const colorValues = getEnumValues(Color);
 * // Returns: ["red", "green", "blue"]
 *
 * // Use for validation
 * function isValidColor(value: string): value is Color {
 *   return getEnumValues(Color).includes(value as Color);
 * }
 * ```
 *
 * @example
 * ```typescript
 * // Numeric enum example
 * enum Status {
 *   PENDING,    // 0
 *   APPROVED,   // 1
 *   REJECTED    // 2
 * }
 *
 * const statusValues = getEnumValues(Status);
 * // Returns: [0, 1, 2] (not ["PENDING", "APPROVED", "REJECTED", 0, 1, 2])
 *
 * // Use for creating select options
 * const statusOptions = getEnumValues(Status).map(value => ({
 *   value,
 *   label: Status[value] // Get the key name for display
 * }));
 * ```
 *
 * @example
 * ```typescript
 * // Mixed numeric enum example
 * enum HttpStatus {
 *   OK = 200,
 *   NOT_FOUND = 404,
 *   SERVER_ERROR = 500
 * }
 *
 * const httpStatusValues = getEnumValues(HttpStatus);
 * // Returns: [200, 404, 500]
 *
 * // Use for status code validation
 * function isValidHttpStatus(code: number): code is HttpStatus {
 *   return getEnumValues(HttpStatus).includes(code as HttpStatus);
 * }
 * ```
 *
 * @example
 * ```typescript
 * // Creating dropdown options from enum
 * enum UserRole {
 *   ADMIN = "admin",
 *   USER = "user",
 *   MODERATOR = "moderator"
 * }
 *
 * const roleOptions = getEnumValues(UserRole).map(role => ({
 *   value: role,
 *   label: role.charAt(0).toUpperCase() + role.slice(1)
 * }));
 * // Returns: [
 * //   { value: "admin", label: "Admin" },
 * //   { value: "user", label: "User" },
 * //   { value: "moderator", label: "Moderator" }
 * // ]
 * ```
 *
 * @remarks
 * - Automatically detects numeric vs string enums and handles them appropriately
 * - For numeric enums, filters out reverse mapping entries that TypeScript automatically creates
 * - For string enums, returns all values as-is since there are no reverse mappings
 * - Works with mixed numeric enums (enums with explicit numeric values)
 * - The returned array maintains the order of enum declaration
 * - Type-safe: the return type is correctly inferred as an array of the enum's value types
 *
 * @see {@link Object.values} The underlying method used to extract enum entries
 */
export function getEnumValues<T extends object>(e: T): T[keyof T][] {
    const values = Object.values(e);

    // In numeric enums, values can appear as keys (reverse mapping)
    const isNumericEnum = values.some(v => typeof v === "number");

    return isNumericEnum ? (values.filter(v => typeof v !== "string") as T[keyof T][]) : (values as T[keyof T][]);
}

/**
 * Filters items by recursively matching nested property values.
 */
export function filterByObject<T>(items: T[], filters: SimpleDeepPartial<T>): T[] {
    function matchesObject(item: unknown, filter: unknown): boolean {
        if (typeof filter !== "object" || filter === null) {
            return item === filter;
        }

        if (typeof item !== "object" || item === null) {
            return false;
        }

        const itemObj = item as Record<string, unknown>;
        const filterObj = filter as Record<string, unknown>;

        for (const key in filterObj) {
            if (!matchesObject(itemObj[key], filterObj[key])) {
                return false;
            }
        }

        return true;
    }

    return items.filter(item => matchesObject(item, filters));
}
