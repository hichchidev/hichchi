// noinspection JSUnusedGlobalSymbols

import { toFirstCase } from "./to-first-case";
import { breakToWords } from "./break-to-words";

/**
 * Convert a string to sentence case.
 * @example <em>`Hello world`</em>.
 * @param str - String to convert to sentence case.
 * @returns - String in sentence case.
 */
export const toSentenceCase = (str: string): string => {
    return breakToWords(str)
        .map((s, i) => (i === 0 ? toFirstCase(s) : s.toLowerCase()))
        .join(" ");
}; // Hello world
