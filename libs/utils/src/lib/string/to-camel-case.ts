// noinspection JSUnusedGlobalSymbols

import { toFirstCase } from "./to-first-case";
import { breakToWords } from "./break-to-words";

/**
 * Convert a string to camel case.
 * @example <em>`helloWorld`</em>.
 * @param str - String to convert to camel case.
 * @returns - String in camel case.
 */
export const toCamelCase = (str?: string): string => {
    if (!str) {
        return "";
    }
    return breakToWords(str)
        .map((s, i) => (i === 0 ? s.toLowerCase() : toFirstCase(s)))
        .join("");
};
