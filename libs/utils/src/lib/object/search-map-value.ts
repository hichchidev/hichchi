// noinspection JSUnusedGlobalSymbols

/**
 * Get the values of a map by partial value.
 * @param map - Map to get values from.
 * @param partialValue - Partial value to get values for.
 * @returns - Values of the map.
 */
export const searchMapValues = (map: Map<string, string>, partialValue: string): string[] => {
    const values = [];
    for (const [, value] of map.entries()) {
        if (value.includes(partialValue)) {
            values.push(value);
        }
    }
    return values;
};
