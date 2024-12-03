/**
 * Deep copy an object.
 * @param obj - Object to copy.
 * @returns - Copied object.
 */
export const deepCopy = <T>(obj: T): T => {
    if (Array.isArray(obj)) {
        return obj.map(deepCopy) as unknown as T;
    } else if (typeof obj === "object" && obj !== null) {
        return Object.fromEntries(Object.entries(obj).map(([key, value]) => [key, deepCopy(value)])) as unknown as T;
    }
    return obj;
};
