// noinspection JSUnusedGlobalSymbols

/**
 * Convert a string to lower case.
 * @example <em>`hello_world`</em>.
 * @param str - String to convert to lower case.
 * @returns - String in lower case.
 */
export const toLowerCase = (str?: string): string => {
    if (!str) {
        return "";
    }
    return str.toLowerCase();
};
