// noinspection JSUnusedGlobalSymbols

/**
 * Omits undefined properties and properties in the keys array from an object.
 * @param obj - Object to omit properties from.
 * @param keys - Array of keys to omit.
 * @returns - Object with omitted properties.
 */
export const omit = <T extends { [key: string]: unknown }>(obj: T, keys?: (keyof T)[]): void => {
    if (obj) {
        Object.keys(obj).forEach(key => {
            return (obj[key] === undefined || keys?.includes(key)) && delete obj[key];
        });
    }
};
