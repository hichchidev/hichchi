// noinspection JSUnusedGlobalSymbols

/**
 * Get the keys of a map by partial value.
 * @param map - Map to get keys from.
 * @param partialValue - Partial value to get keys for.
 * @returns - Keys of the map.
 */
export const getMapKeys = (map: Map<string, string>, partialValue: string): string[] => {
    const keys = [];
    for (const [key, value] of map.entries()) {
        if (value.includes(partialValue)) {
            keys.push(key);
        }
    }
    return keys;
};
