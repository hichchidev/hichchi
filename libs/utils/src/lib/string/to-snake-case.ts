// noinspection JSUnusedGlobalSymbols

import { breakToWords } from "./break-to-words";

/**
 * Convert a string to snake case.
 * @example <em>`hello_world`</em> or <em>`HELLO_WORLD`</em>.
 * @param str - String to convert to snake case.
 * @param caps - Weather to capitalize the string or not.
 * @returns - String in snake case.
 */
export const toSnakeCase = (str?: string, caps?: boolean): string => {
    if (!str) {
        return "";
    }
    const snake = breakToWords(str).join("_");
    return caps ? snake.toUpperCase() : snake.toLowerCase();
};
