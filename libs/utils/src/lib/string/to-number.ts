// noinspection JSUnusedGlobalSymbols

/**
 * Converts a string to a number.
 * @param str - String to convert to number.
 * @returns - Converted Number or undefined if failed.
 */
export const toNumber = (str: number | string): number | undefined => {
    return !isNaN(Number(str)) ? Number(str) : undefined;
}; // {Number} or undefined
