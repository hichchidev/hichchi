// noinspection JSUnusedGlobalSymbols

/**
 * Remove HTML string to a plain text string.
 * @param str - String to remove HTML tags from.
 * @returns - Plain text string.
 */
export const htmlToText = (str: string): string => {
    return str.replace(/<[^>]*>/g, "");
};
