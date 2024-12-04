/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Convert object to JSON string
 * @param {any} object object to convert
 * @returns {string} JSON string
 */
export function toString(object: unknown): string {
    if (typeof object !== "object") {
        return "{}";
    }
    return JSON.stringify(object);
}

/**
 * Convert JSON string to object
 * @template T
 * @param {string} string JSON string to convert
 * @returns {T} parsed object or empty object
 */
export function toJSON<T = any>(string: string): T {
    try {
        return JSON.parse(string);
    } catch {
        return {} as T;
    }
}
