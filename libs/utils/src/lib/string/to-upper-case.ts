// noinspection JSUnusedGlobalSymbols

/**
 * Convert a string to upper case.
 * @example <em>`HELLO_WORLD`</em>.
 * @param str - String to convert to upper case.
 * @returns - String in upper case.
 */
export const toUpperCase = (str?: string): string => {
    if (!str) {
        return "";
    }
    return str.toUpperCase();
};
