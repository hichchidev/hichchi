// noinspection JSUnusedGlobalSymbols

import { toFirstCase } from "./to-first-case";
import { breakToWords } from "./break-to-words";

/**
 * Convert a string to title case.
 * @example <em>`Hello World`</em>.
 * @param str - String to convert to title case.
 * @returns - String in title case.
 */
export const toTitleCase = (str?: string): string => {
    if (!str) {
        return "";
    }
    return breakToWords(str)
        .map(s => toFirstCase(s))
        .join(" ");
};
