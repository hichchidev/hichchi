/**
 * Convert a string to first case
 * @example <em>`Hello`</em>.
 * @param str - String to convert to first case.
 * @returns - String in first case.
 */
export const toFirstCase = (str?: string): string => {
    if (!str) {
        return "";
    }
    return (str[0]?.toUpperCase() || "") + str.slice(1).toLowerCase();
};
