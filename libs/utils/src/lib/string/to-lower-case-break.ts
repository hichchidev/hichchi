// noinspection JSUnusedGlobalSymbols

import { breakToWords } from "./break-to-words";

/**
 * Convert a string to lower cases and break into words.
 * @example <em>`hello world`</em>.
 * @param str - String to convert to lower cases and break into words.
 * @param join - Optional string to join the words with.
 * @returns - String in lower cases and broken into words.
 */
export const toLowerCaseBreak = (str?: string, join?: string): string => {
    if (!str) {
        return "";
    }
    return breakToWords(str)
        .map(s => s.toLowerCase())
        .join(join ?? " ");
};
