// noinspection JSUnusedGlobalSymbols

import {
    CONTEXT_MULTIPLIER,
    DEFAULT_BREAK_CHAR,
    DEFAULT_CONTEXT_LENGTH,
    DEFAULT_ELLIPSIS,
    DEFAULT_LINE_LENGTH,
    EnglishInflectionRules,
    HEX_PADDING_CHAR,
    HEX_PADDING_LENGTH,
    HEX_RADIX,
} from "../constants";
import { InflectionRule } from "../interfaces";

/**
 * Breaks a string into an array of words based on common separator patterns.
 *
 * This function intelligently splits strings into individual words by detecting various
 * word boundary patterns, including:
 * - Camel case boundaries ("helloWorld" → ["hello", "world"])
 * - Snake case boundaries ("hello_world" → ["hello", "world"])
 * - Kebab case boundaries ("hello-world" → ["hello", "world"])
 * - Space-separated words ("hello world" → ["hello", "world"])
 * - Uppercase acronyms ("APIClient" → ["api", "client"])
 *
 * The returned words are all converted to lowercase.
 *
 * @param {string} str - The string to split into words
 * @returns {string[]} - An array of lowercase words
 *
 * @example
 * ```typescript
 * breakToWords("helloWorld"); // ['hello', 'world']
 * breakToWords("hello_world"); // ['hello', 'world']
 * breakToWords("hello-world"); // ['hello', 'world']
 * breakToWords("hello world"); // ['hello', 'world']
 * breakToWords("APIConfig"); // ['api', 'config']
 * breakToWords("123Test456"); // ['123', 'test', '456']
 * ```
 *
 * @remarks
 * - Returns an empty array for empty, null, or undefined input
 * - Preserves numbers as separate words
 * - Handles consecutive uppercase letters as acronyms (preserving them as a single word)
 */
export function breakToWords(str: string): string[];

/**
 * Breaks a string into words and formats them using a provided function.
 *
 * This overload splits a string into words using the same logic as the array version,
 * but additionally applies a formatting function to each word and joins them with spaces.
 *
 * Common use cases include:
 * - Converting camelCase to Title Case
 * - Formatting identifiers for display
 * - Normalizing different string formats
 *
 * @param {string} str - The string to split and format
 * @param {(str: string) => string} format - A function to apply to each word
 * @returns {string} - A space-joined string of formatted words
 *
 * @example
 * ```typescript
 * // Convert camelCase to Sentence case
 * breakToWords("helloWorld", toFirstCase); // "Hello world"
 *
 * // Convert snake_case to Title Case
 * breakToWords("user_profile_data", toFirstCase); // "User profile data"
 *
 * // Format with a custom function
 * breakToWords("SYSTEM_ERROR", word => word.toLowerCase()); // "system error"
 * ```
 */
export function breakToWords(str: string, format: (str: string) => string): string;

export function breakToWords(str: string, format?: (str: string) => string): string[] | string {
    if (!str) {
        return format ? "" : [];
    }
    try {
        const words =
            str
                .match(/[A-Z]{2,}(?=[A-Z][a-z]+\d*|\b)|[A-Z]?[a-z]+\d*|[A-Z]+|\d+/g)
                ?.map((s: string) => s.toLowerCase()) ?? [];
        return format ? words.map(format).join(" ") : words;
    } catch {
        return format ? "" : [];
    }
}

/**
 * Convert a string to lower case.
 * @param {string} [str] String to convert to lower case.
 * @returns {string} String in lower case.
 *
 * @example
 * ```TypeScript
 * toLowerCase("Hello World"); // "hello world"
 * ```
 */
export function toLowerCase(str?: string): string {
    if (!str) {
        return "";
    }
    return str.toLowerCase();
}

/**
 * Convert a string to lower cases and break into words with optional join or space.
 * @param {string} [str] String to convert to lower cases and break into words.
 * @param {string} [join] Optional string to join the words with.
 * @returns {string} String in lower cases and broken into words.
 *
 * @example
 * ```TypeScript
 * toLowerCaseBreak("HelloWorld"); // "hello world"
 * ```
 */
export function toLowerCaseBreak(str?: string, join?: string): string {
    if (!str) {
        return "";
    }
    return breakToWords(str)
        .map(s => s.toLowerCase())
        .join(join ?? " ");
}

/**
 * Convert a string to upper case.
 * @param {string} [str] String to convert to upper case.
 * @returns {string} String in upper case.
 *
 * @example
 * ```TypeScript
 * toUpperCase("HelloWorld"); // "HELLO WORLD"
 * ```
 */
export function toUpperCase(str?: string): string {
    if (!str) {
        return "";
    }
    return str.toUpperCase();
}

/**
 * Compares two strings for similarity using Levenshtein distance algorithm.
 *
 * The Levenshtein distance is a measure of the difference between two strings
 * by counting the minimum number of single-character edits (insertions, deletions,
 * or substitutions) required to change one string into another.
 *
 * @param {string} str1 - First string to compare
 * @param {string} str2 - Second string to compare
 * @returns {number} - A value between 0 and 1, where 1 means identical strings
 *
 * @example
 * ```typescript
 * stringSimilarity("hello", "hallo");       // 0.8 (4/5 characters match)
 * stringSimilarity("kitten", "sitting");    // ~0.57 (higher distance)
 * stringSimilarity("same", "same");         // 1.0 (identical)
 * ```
 */
export function stringSimilarity(str1: string, str2: string): number {
    if (str1 === str2) return 1.0;
    if (!str1 || !str2) return 0.0;

    const len1 = str1.length;
    const len2 = str2.length;

    // Initialize the distance matrix
    const matrix: number[][] = Array(len1 + 1)
        .fill(null)
        .map(() => Array(len2 + 1).fill(0));

    // Fill the first row and column
    for (let i = 0; i <= len1; i++) matrix[i][0] = i;
    for (let j = 0; j <= len2; j++) matrix[0][j] = j;

    // Fill the rest of the matrix
    for (let i = 1; i <= len1; i++) {
        for (let j = 1; j <= len2; j++) {
            const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
            matrix[i][j] = Math.min(
                matrix[i - 1][j] + 1, // deletion
                matrix[i][j - 1] + 1, // insertion
                matrix[i - 1][j - 1] + cost, // substitution
            );
        }
    }

    // Calculate similarity from Levenshtein distance
    const maxLen = Math.max(len1, len2);
    if (maxLen === 0) return 1.0;
    return 1.0 - matrix[len1][len2] / maxLen;
}

/**
 * Generates a slug from a string, suitable for URLs or file names.
 *
 * @param {string} str - The string to convert to a slug
 * @param {string} [separator="-"] - The character to use as separator
 * @returns {string} - The slug string
 *
 * @example
 * ```typescript
 * slugify("Hello World");                // "hello-world"
 * slugify("10 Tips & Tricks!");          // "10-tips-tricks"
 * slugify("My Product (2023 Edition)");   // "my-product-2023-edition"
 * slugify("Über résumé");                // "uber-resume"
 * slugify("Blog Post", "_");             // "blog_post"
 * ```
 */
export function slugify(str: string, separator: string = "-"): string {
    if (!str) return "";

    return str
        .normalize("NFD") // Normalize to decomposed form for handling accents
        .replace(/[\u0300-\u036f]/g, "") // Remove accents/diacritics
        .toLowerCase() // Convert to lowercase
        .trim() // Trim whitespace
        .replace(/[^\w\s-]/g, "") // Remove non-word chars (except spaces and hyphens)
        .replace(/[\s_]+/g, separator) // Replace spaces and underscores with separator
        .replace(new RegExp(`${separator}+`, "g"), separator) // Replace multiple separators with single
        .replace(new RegExp(`^${separator}|${separator}$`, "g"), ""); // Remove leading/trailing separators
}

/**
 * Extracts all email addresses from a string.
 *
 * @param {string} str - The string to extract emails from
 * @returns {string[]} - Array of found email addresses
 *
 * @example
 * ```typescript
 * extractEmails("Contact us at support@example.com or sales@example.com");
 * // ["support@example.com", "sales@example.com"]
 * ```
 */
export function extractEmails(str: string): string[] {
    if (!str) return [];

    const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi;
    return str.match(emailRegex) || [];
}

/**
 * Extracts all URLs from a string.
 *
 * @param {string} str - The string to extract URLs from
 * @returns {string[]} - Array of found URLs
 *
 * @example
 * ```typescript
 * extractUrls("Visit https://example.com or http://test.org/page?id=5");
 * // ["https://example.com", "http://test.org/page?id=5"]
 * ```
 */
export function extractUrls(str: string): string[] {
    if (!str) return [];

    // noinspection RegExpSimplifiable
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return str.match(urlRegex) || [];
}

/**
 * Converts a string to a secure hash using SHA-256.
 *
 * Note: This is a browser-compatible implementation using the Web Crypto API.
 * For Node.js environments, you might want to use the crypto module instead.
 *
 * @param {string} str - The string to hash
 * @returns {Promise<string>} - Promise resolving to the hex hash string
 *
 * @example
 * ```typescript
 * // Browser usage
 * await hashString("password123");
 * // "ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f"
 * ```
 */
export async function hashString(str: string): Promise<string> {
    if (!str) return "";

    // Convert string to Uint8Array
    const encoder = new TextEncoder();
    const data = encoder.encode(str);

    // Hash the data
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);

    // Convert ArrayBuffer to hex string
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(HEX_RADIX).padStart(HEX_PADDING_LENGTH, HEX_PADDING_CHAR)).join("");
}

/**
 * Generates a random string with specified length and character set.
 *
 * @param {number} length - The length of the random string
 * @param {string} [charset] - The characters to use (defaults to alphanumeric)
 * @returns {string} - The generated random string
 *
 * @example
 * ```typescript
 * // Default alphanumeric string
 * randomString(8);
 * // e.g. "A7bC9Df3"
 *
 * // Hex string
 * randomString(6, "0123456789abcdef");
 * // e.g. "a3f9d2"
 *
 * // PIN code
 * randomString(4, "0123456789");
 * // e.g. "8302"
 * ```
 */
export function randomString(length: number, charset?: string): string {
    if (length <= 0) return "";

    const chars = charset || "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";

    // Generate cryptographically secure random values if available
    if (typeof crypto !== "undefined" && crypto.getRandomValues) {
        const values = new Uint32Array(length);
        crypto.getRandomValues(values);

        for (let i = 0; i < length; i++) {
            result += chars[values[i] % chars.length];
        }
    } else {
        // Fallback to Math.random (less secure)
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
    }

    return result;
}

/**
 * Masks a portion of a string, useful for displaying sensitive information.
 *
 * @param {string} str - The string to mask
 * @param {number} [visibleStart=0] - Number of characters to show at the beginning
 * @param {number} [visibleEnd=0] - Number of characters to show at the end
 * @param {string} [maskChar="*"] - Character to use for masking
 * @returns {string} - The masked string
 *
 * @example
 * ```typescript
 * // Mask credit card
 * maskString("4111111111111111", 4, 4);
 * // "4111********1111"
 *
 * // Mask email
 * maskString("user@example.com", 2, 4, "x");
 * // "usxxxxxx.com"
 *
 * // Mask phone number
 * maskString("+1-555-123-4567", 0, 4);
 * // "*********4567"
 * ```
 */
export function maskString(
    str: string,
    visibleStart: number = 0,
    visibleEnd: number = 0,
    maskChar: string = "*",
): string {
    if (!str) return "";

    const length = str.length;
    if (visibleStart + visibleEnd >= length) return str;

    const start = str.substring(0, visibleStart);
    const middle = maskChar.repeat(length - visibleStart - visibleEnd);
    const end = str.substring(length - visibleEnd);

    return start + middle + end;
}

/**
 * Convert a string to first case (Capitalize first letter of the string).
 * @param {string} [str] Optional string to join the words with.
 * @returns {string} String in first case.
 *
 * @example
 * ```TypeScript
 * toFirstCase("hello world"); // "Hello world"
 * ```
 */
export function toFirstCase(str?: string): string {
    if (!str) {
        return "";
    }
    return (str[0]?.toUpperCase() || "") + str.slice(1).toLowerCase();
}

/**
 * Converts a string to a camelCase or PascalCase variable name.
 *
 * @param {string} str - The string to convert
 * @param {boolean} [pascalCase=false] - Whether to use PascalCase (true) or camelCase (false)
 * @returns {string} - The variable name
 *
 * @example
 * ```typescript
 * toVariableName("Hello World");      // "helloWorld"
 * toVariableName("API Response");     // "apiResponse"
 * toVariableName("first-name");       // "firstName"
 * toVariableName("user_id", true);    // "UserId"
 * ```
 */
export function toVariableName(str: string, pascalCase: boolean = false): string {
    if (!str) return "";

    // Remove special characters and replace with spaces
    const cleaned = str.replace(/[^\w\s]/g, " ");

    // Break into words and process
    return breakToWords(cleaned)
        .map((word, index) => {
            // Skip first word for camelCase unless it's PascalCase
            if (index === 0 && !pascalCase) {
                return word.toLowerCase();
            }
            // Capitalize first letter
            return toFirstCase(word);
        })
        .join("");
}

/**
 * Wraps words in a string to ensure each line is no longer than a specified length.
 *
 * @param {string} str - The string to wrap
 * @param {number} [lineLength=80] - Maximum length of each line
 * @param {string} [breakChar="\n"] - Character(s) to insert at line breaks
 * @returns {string} - The wrapped string
 *
 * @example
 * ```typescript
 * const text = "This is a long sentence that needs to be wrapped to fit within a certain width.";
 *
 * wordWrap(text, 20);
 * // "This is a long\nsentence that needs\nto be wrapped to\nfit within a\ncertain width."
 *
 * wordWrap(text, 30, "<br>");
 * // "This is a long sentence that<br>needs to be wrapped to fit<br>within a certain width."
 * ```
 */
export function wordWrap(
    str: string,
    lineLength: number = DEFAULT_LINE_LENGTH,
    breakChar: string = DEFAULT_BREAK_CHAR,
): string {
    if (!str) return "";
    if (str.length <= lineLength) return str;

    const words = str.split(" ");
    let result = "";
    let currentLine = "";

    for (const word of words) {
        // If adding this word exceeds line length, start a new line
        if (currentLine.length + word.length + 1 > lineLength) {
            result += currentLine.trim() + breakChar;
            currentLine = `${word} `;
        } else {
            currentLine += `${word} `;
        }
    }

    // Add the last line
    result += currentLine.trim();

    return result;
}

/**
 * Creates an excerpt from a longer text by extracting a portion around a search term.
 * Useful for search result highlighting or previews.
 *
 * @param {string} text - The full text to create an excerpt from
 * @param {string} searchTerm - The search term to find in the text
 * @param {number} [contextLength=40] - Number of characters to include before and after the search term
 * @param {string} [ellipsis="..."] - Characters to use for indicating truncated text
 * @returns {string} - The excerpt with the search term in context
 *
 * @example
 * ```typescript
 * const article = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris.";
 *
 * createExcerpt(article, "dolor", 10);
 * // "...ipsum dolor sit amet..."
 *
 * createExcerpt(article, "consectetur", 15, "[...]");
 * // "[...]sit amet, consectetur adipiscing[...]"
 * ```
 */
export function createExcerpt(
    text: string,
    searchTerm: string,
    contextLength: number = DEFAULT_CONTEXT_LENGTH,
    ellipsis: string = DEFAULT_ELLIPSIS,
): string {
    if (!text || !searchTerm) return text || "";

    // Case-insensitive search
    const lowerText = text.toLowerCase();
    const lowerSearchTerm = searchTerm.toLowerCase();
    const index = lowerText.indexOf(lowerSearchTerm);

    if (index === -1) {
        // If search term not found, return beginning of text
        return text.length > contextLength * CONTEXT_MULTIPLIER
            ? text.substring(0, contextLength * CONTEXT_MULTIPLIER) + ellipsis
            : text;
    }

    // Calculate the start and end positions for the excerpt
    const startPos = Math.max(0, index - contextLength);
    const endPos = Math.min(text.length, index + searchTerm.length + contextLength);

    // Add ellipsis if we're not at the beginning or end
    const prefix = startPos > 0 ? ellipsis : "";
    const suffix = endPos < text.length ? ellipsis : "";

    // Extract the excerpt
    return prefix + text.substring(startPos, endPos) + suffix;
}

/**
 * Normalizes a string by removing accents, diacritics, and converting to lowercase.
 *
 * @param {string} str - The string to normalize
 * @returns {string} - The normalized string
 *
 * @example
 * ```typescript
 * normalizeString("Café");          // "cafe"
 * normalizeString("Über");          // "uber"
 * normalizeString("résumé");        // "resume"
 * normalizeString("ESPAÑA");        // "espana"
 * ```
 */
export function normalizeString(str: string): string {
    if (!str) return "";

    return str
        .normalize("NFD") // Decompose accented characters
        .replace(/[\u0300-\u036f]/g, "") // Remove accent marks
        .toLowerCase(); // Convert to lowercase
}

/**
 * Convert a string to upper cases and break into words with optional join or space.
 * @param {string} [str] String to convert to upper cases and break into words.
 * @param {string} [join] Optional string to join the words with.
 * @returns {string} String in upper cases and broken into words.
 *
 * @example
 * ```TypeScript
 * toUpperCaseBreak("HelloWorld"); // "HELLO WORLD"
 * ```
 *
 * @example
 * ```TypeScript
 * toUpperCaseBreak("HelloWorld", "! "); // "HELLO! WORLD"
 */
export function toUpperCaseBreak(str?: string, join?: string): string {
    if (!str) {
        return "";
    }
    return breakToWords(str)
        .map(s => s.toUpperCase())
        .join(join ?? " ");
}

/**
 * Converts a string to Sentence case (first word capitalized, rest lowercase) with customizable word separators.
 *
 * This function breaks a string into words, capitalizes the first word, converts remaining
 * words to lowercase, and then joins them using a custom separator (or space by default).
 *
 * Unlike `toFirstCase()` which works on a single word, this function processes multi-word
 * strings from various formats (camelCase, snake_case, etc.) and gives control over how
 * the words are joined back together.
 *
 * @param {string} [str] - The input string to convert
 * @param {string} [join] - Optional separator to join words (defaults to space)
 * @returns {string} - The formatted string with first word capitalized and custom separators,
 *                    or empty string if input is falsy
 *
 * @example
 * ```typescript
 * // With default space separator
 * toFirstCaseBreak("helloWorld");       // "Hello world"
 * toFirstCaseBreak("SYSTEM_ERROR");     // "System error"
 * toFirstCaseBreak("api-request-log");  // "Api request log"
 *
 * // With custom separators
 * toFirstCaseBreak("hello_world", "-");    // "Hello-world"
 * toFirstCaseBreak("userAuthConfig", "."); // "User.auth.config"
 * toFirstCaseBreak("GET_USER_DATA", "/");  // "Get/user/data"
 * ```
 *
 * @see {@link toFirstCase} For capitalizing a single word
 * @see {@link toTitleCase} For capitalizing the first letter of every word
 * @see {@link breakToWords} The underlying function used to split input into words
 */
export function toFirstCaseBreak(str?: string, join?: string): string {
    if (!str) {
        return "";
    }
    return breakToWords(str)
        .map((s, i) => (i === 0 ? toFirstCase(s) : s.toLowerCase()))
        .join(join ?? " ");
}

/**
 * Convert a string to title case (Capitalize first letter of each word).
 * @param {string} [str] String to convert to title case.
 * @returns {string} String in title case.
 *
 * @example
 * ```TypeScript
 * toTitleCase("hello world"); // "Hello World"
 * ```
 */
export function toTitleCase(str?: string): string {
    if (!str) {
        return "";
    }
    return breakToWords(str)
        .map(s => toFirstCase(s))
        .join(" ");
}

/**
 * Convert a string to camel case.
 * @param {string} [str] String to convert to camel case.
 * @returns {string} String in camel case.
 *
 * @example
 * ```TypeScript
 * toCamelCase("hello world"); // "helloWorld"
 * ```
 */
export function toCamelCase(str?: string): string {
    if (!str) {
        return "";
    }
    return breakToWords(str)
        .map((s, i) => (i === 0 ? s.toLowerCase() : toFirstCase(s)))
        .join("");
}

/**
 * Convert a string to pascal case.
 * @param {string} [str] String to convert to pascal case.
 * @returns {string} String in pascal case.
 *
 * @example
 * ```TypeScript
 * toPascalCase("hello world"); // "HelloWorld"
 * ```
 */
export function toPascalCase(str?: string): string {
    if (!str) {
        return "";
    }
    return breakToWords(str)
        .map(s => toFirstCase(s))
        .join("");
}

/**
 * Convert a string to sentence case. (Capitalize first letter of every sentence).
 * @param {string} [str] String to convert to sentence case.
 * @returns {string} String in sentence case.
 *
 * @example
 * ```TypeScript
 * toSentenceCase("hello world. how are you?"); // "Hello world. How are you?"
 * ```
 */
export function toSentenceCase(str: string): string {
    return str
        .split(".")
        .map(s => toFirstCase(s.trim()))
        .join(". ");
}

/**
 * Converts a string to snake_case format.
 *
 * This function transforms a string from any common case format (camel, pascal, kebab, etc.)
 * into snake_case, where words are lowercase and separated by underscores.
 *
 * When the optional `caps` parameter is set to true, the result will be UPPER_SNAKE_CASE
 * (also known as SCREAMING_SNAKE_CASE or CONSTANT_CASE).
 *
 * @param {string} [str] - The input string to convert
 * @param {boolean} [caps=false] - When true, converts to UPPER_SNAKE_CASE
 * @returns {string} - The converted snake_case string, or empty string if input is falsy
 *
 * @example
 * ```typescript
 * // From various formats to snake_case
 * toSnakeCase("hello world");    // "hello_world"
 * toSnakeCase("HelloWorld");     // "hello_world"
 * toSnakeCase("hello-world");    // "hello_world"
 * toSnakeCase("HELLO WORLD");    // "hello_world"
 *
 * // To UPPER_SNAKE_CASE (CONSTANT_CASE)
 * toSnakeCase("hello world", true);  // "HELLO_WORLD"
 * toSnakeCase("helloWorld", true);   // "HELLO_WORLD"
 * ```
 *
 * @remarks
 * This function first splits the string into words using `breakToWords()`,
 * then joins them with underscores, applying the requested case transformation.
 */
export function toSnakeCase(str?: string, caps?: boolean): string {
    if (!str) {
        return "";
    }
    const snake = breakToWords(str).join("_");
    return caps ? snake.toUpperCase() : snake.toLowerCase();
}

/**
 * Convert a string to kebab case.
 * @param {string} [str] String to convert to kebab case.
 * @param {boolean} [caps] Whether to convert to upper case.
 * @returns {string} String in kebab case.
 *
 * @example
 * ```TypeScript
 * toKebabCase("hello world"); // "hello-world"
 * ```
 *
 * @example
 * ```TypeScript
 * toKebabCase("hello world", true); // "HELLO-WORLD"
 * ```
 */
export function toKebabCase(str?: string, caps?: boolean): string {
    if (!str) {
        return "";
    }
    const kebab = breakToWords(str).join("-");
    return caps ? kebab.toUpperCase() : kebab.toLowerCase();
}

/**
 * Converts a string to a number.
 * @param {number|string} str String to convert to a number.
 * @returns {number|undefined} Number or undefined.
 *
 * @example
 * ```TypeScript
 * toNumber("123"); // 123
 * ```
 */
export function toNumber(str: number | string): number | undefined {
    return !isNaN(Number(str)) ? Number(str) : undefined;
}

/**
 * Remove HTML tags from a string and return plain text.
 * @param {string} str String to remove HTML tags from.
 * @returns {string} Plain text.
 *
 * @example
 * ```TypeScript
 * htmlToText("<h1>Hello World</h1>"); // "Hello World"
 * ```
 */
export function htmlToText(str: string): string {
    return str.replace(/<[^>]*>?/gm, "");
}

/**
 * Converts a singular English word to its plural form.
 *
 * This function applies common English pluralization rules to transform
 * singular words into their plural equivalents. It handles regular patterns
 * as well as many irregular cases and special rules for different word endings.
 *
 * @param {string} str - The singular word to convert to plural form
 * @returns {string} - The plural form of the word, or the original string if:
 *   - Input is empty/falsy
 *   - The word is already plural
 *
 * @example
 * ```typescript
 * // Regular plurals
 * plural("cat");      // "cats"
 * plural("dog");      // "dogs"
 *
 * // Words ending in -y
 * plural("party");    // "parties"
 * plural("day");      // "days"
 *
 * // Words ending in -f or -fe
 * plural("wolf");     // "wolves"
 * plural("knife");    // "knives"
 *
 * // Words ending in -o
 * plural("potato");   // "potatoes"
 * plural("photo");    // "photos"
 *
 * // Irregular plurals
 * plural("child");    // "children"
 * plural("man");      // "men"
 * plural("foot");     // "feet"
 *
 * // Latin/Greek words
 * plural("cactus");   // "cacti"
 * plural("analysis"); // "analyses"
 * ```
 *
 * @remarks
 * - This function is designed for English language words only
 * - It pairs well with the `singular()` function for round-trip conversion
 */
export function plural(str: string): string {
    if (!str) return str;

    // Combine all rules in priority order
    const rules: InflectionRule[] = [
        ...EnglishInflectionRules.INVARIANT,
        ...EnglishInflectionRules.IRREGULAR.toPlural,
        ...EnglishInflectionRules.LATIN_GREEK.toPlural,
        ...EnglishInflectionRules.PATTERN_RULES.toPlural,
        ...EnglishInflectionRules.DEFAULT.toPlural,
    ];

    // Apply the first matching rule
    for (const rule of rules) {
        if (rule.regex.test(str)) {
            return str.replace(
                rule.regex,
                typeof rule.replacement === "string" ? rule.replacement : rule.replacement(str),
            );
        }
    }

    return str;
}

/**
 * Truncates a string to a specified length and adds an ellipsis if needed.
 *
 * @param {string} str - The string to truncate
 * @param {number} length - Maximum length of the truncated string (excluding ellipsis)
 * @param {string} [ellipsis="..."] - The ellipsis to add to truncated strings
 * @returns {string} - The truncated string with ellipsis if needed
 *
 * @example
 * ```typescript
 * truncate("This is a long sentence", 10);  // "This is a..."
 * truncate("Short", 10);                   // "Short"
 * truncate("Custom ellipsis", 6, " [more]"); // "Custom [more]"
 * ```
 */
export function truncate(str: string, length: number, ellipsis: string = "..."): string {
    if (!str) return "";
    if (str.length <= length) return str;
    return str.substring(0, length) + ellipsis;
}

/**
 * Pads a string to a specified length with a specified character.
 *
 * @param {string} str - The string to pad
 * @param {number} length - The target length of the resulting string
 * @param {string} [char=" "] - The character to pad with (defaults to space)
 * @param {boolean} [padEnd=true] - Whether to pad at the end (true) or beginning (false)
 * @returns {string} - The padded string
 *
 * @example
 * ```typescript
 * padString("Hello", 10);           // "Hello     "
 * padString("Hello", 10, "*");      // "Hello*****"
 * padString("Hello", 10, "0", false); // "00000Hello"
 * ```
 */
export function padString(str: string, length: number, char: string = " ", padEnd: boolean = true): string {
    if (!str) return "";
    if (str.length >= length) return str;

    const padding = char.repeat(length - str.length);
    return padEnd ? str + padding : padding + str;
}

/**
 * Escapes special characters in a string for use in regular expressions.
 *
 * @param {string} str - The string to escape
 * @returns {string} - The escaped string safe for use in RegExp
 *
 * @example
 * ```typescript
 * escapeRegExp("hello.world*");  // "hello\.world\*"
 *
 * // Usage in RegExp:
 * const userInput = "hello.world*";
 * const regex = new RegExp(escapeRegExp(userInput));
 * ```
 */
export function escapeRegExp(str: string): string {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Capitalizes each word in a string according to title case rules.
 *
 * This function implements proper title case rules, where:
 * - The first and last words are always capitalized
 * - All other major words are capitalized
 * - Minor words (articles, conjunctions, short prepositions) are not capitalized
 *   unless they are the first or last word
 *
 * @param {string} str - The string to convert to title case
 * @returns {string} - The string in proper title case format
 *
 * @example
 * ```typescript
 * toProperTitleCase("the quick brown fox jumps over the lazy dog");
 * // "The Quick Brown Fox Jumps over the Lazy Dog"
 *
 * toProperTitleCase("a tale of two cities");
 * // "A Tale of Two Cities"
 * ```
 */
export function toProperTitleCase(str: string): string {
    if (!str) return "";

    const minorWords = [
        "a",
        "an",
        "and",
        "as",
        "at",
        "but",
        "by",
        "for",
        "in",
        "nor",
        "of",
        "on",
        "or",
        "per",
        "the",
        "to",
        "via",
        "vs",
    ];

    const words = str.toLowerCase().split(/\s+/);
    const result = words.map((word, index) => {
        // Always capitalize first and last word
        if (index === 0 || index === words.length - 1) {
            return toFirstCase(word);
        }

        // Don't capitalize minor words
        if (minorWords.includes(word.toLowerCase())) {
            return word.toLowerCase();
        }

        // Capitalize major words
        return toFirstCase(word);
    });

    return result.join(" ");
}

/**
 * Formats a string by replacing indexed placeholders with provided values.
 *
 * This implementation uses {n} syntax for indexed placeholders where n is the
 * position of the value in the arguments list (0-based).
 *
 * @param {string} template - The template string with {0}, {1}, etc. placeholders
 * @param {...(string|number|boolean|null|undefined)} values - Values to insert into the template
 * @returns {string} - The formatted string
 *
 * @example
 * ```typescript
 * format("Hello, {0}!", "World");  // "Hello, World!"
 *
 * format("User {0} has {1} points", "John", 100);
 * // "User John has 100 points"
 * ```
 */
export function format(template: string, ...values: (string | number | boolean | null | undefined)[]): string;

/**
 * Formats a string by replacing named placeholders with values from an object.
 *
 * This implementation uses {name} syntax for named placeholders where 'name'
 * corresponds to a property in the provided values object.
 *
 * @param {string} template - The template string with {propertyName} placeholders
 * @param {Record<string, string|number|boolean|null|undefined>} values - Object with values to insert
 * @returns {string} - The formatted string
 *
 * @example
 * ```typescript
 * // Named placeholders with object
 * format("Hello, {name}! You have {count} messages.", { name: "Alice", count: 5 });
 * // "Hello, Alice! You have 5 messages."
 * ```
 */
export function format(template: string, values: Record<string, string | number | boolean | null | undefined>): string;

/**
 * Implementation of the format function that handles both overloads.
 */
export function format(
    template: string,
    ...values: (
        | string
        | number
        | boolean
        | null
        | undefined
        | Record<string, string | number | boolean | null | undefined>
    )[]
): string {
    if (!template) return "";

    // If the first value is an object (for named placeholders), use it directly
    if (values.length === 1 && typeof values[0] === "object" && values[0] !== null && !Array.isArray(values[0])) {
        const replacements = values[0] as Record<string, string | number | boolean | null | undefined>;
        return template.replace(/{([^{}]+)}/g, (match, key: string) => {
            const value = replacements[key];
            return value !== undefined ? String(value) : match;
        });
    }

    // Otherwise use indexed placeholders
    return template.replace(/{(\d+)}/g, (match, index) => {
        const value = values[Number(index)];
        return value !== undefined ? String(value) : match;
    });
}

/**
 * Counts the occurrences of a substring within a string.
 *
 * @param {string} str - The string to search within
 * @param {string} searchValue - The substring to search for
 * @param {boolean} [caseSensitive=true] - Whether the search should be case-sensitive
 * @returns {number} - The number of occurrences
 *
 * @example
 * ```typescript
 * countOccurrences("hello hello world", "hello");  // 2
 * countOccurrences("Hello hello", "hello", false); // 2
 * countOccurrences("Hello hello", "hello", true);  // 1
 * ```
 */
export function countOccurrences(str: string, searchValue: string, caseSensitive: boolean = true): number {
    if (!str || !searchValue) return 0;

    const regex = new RegExp(escapeRegExp(searchValue), caseSensitive ? "g" : "gi");
    const matches = str.match(regex);
    return matches ? matches.length : 0;
}

/**
 * Reverses a string.
 *
 * @param {string} str - The string to reverse
 * @returns {string} - The reversed string
 *
 * @example
 * ```typescript
 * reverse("hello");  // "olleh"
 * reverse("12345");  // "54321"
 * ```
 */
export function reverse(str: string): string {
    if (!str) return "";
    return str.split("").reverse().join("");
}

/**
 * Checks if a string contains only alphanumeric characters.
 *
 * @param {string} str - The string to check
 * @returns {boolean} - True if the string contains only alphanumeric characters
 *
 * @example
 * ```typescript
 * isAlphanumeric("abc123");  // true
 * isAlphanumeric("abc-123"); // false
 * ```
 */
export function isAlphanumeric(str: string): boolean {
    if (!str) return false;
    return /^[a-zA-Z0-9]+$/.test(str);
}

/**
 * Removes all whitespace from a string.
 *
 * @param {string} str - The string to process
 * @returns {string} - The string with all whitespace removed
 *
 * @example
 * ```typescript
 * removeWhitespace("hello world");       // "helloworld"
 * removeWhitespace("  spaces   tabs  "); // "spacestabs"
 * ```
 */
export function removeWhitespace(str: string): string {
    if (!str) return "";
    return str.replace(/\s+/g, "");
}

/**
 * Converts plural English words to their singular form.
 *
 * This function applies a series of linguistic rules and exceptions to transform
 * plural English words into their singular equivalents. It handles irregular plurals
 * (e.g., "children" → "child"), common suffix patterns (e.g., "parties" → "party"),
 * and Latin-derived words (e.g., "cacti" → "cactus").
 *
 * The function applies rules in priority order, from most specific to most general,
 * to ensure correct handling of special cases.
 *
 * @param {string} str - The plural word to convert to singular form
 * @returns {string} - The singular form of the word, or the original string if:
 *   - Input is empty/falsy
 *   - No singular form is recognized
 *   - The word is already singular
 *
 * @example
 * ```typescript
 * // Irregular plurals
 * singular("children"); // "child"
 * singular("men");     // "man"
 * singular("feet");    // "foot"
 *
 * // Common patterns
 * singular("cats");    // "cat"
 * singular("boxes");   // "box"
 * singular("parties"); // "party"
 * singular("wolves"); // "wolf"
 *
 * // Latin-derived words
 * singular("cacti");      // "cactus"
 * singular("phenomena");  // "phenomenon"
 * ```
 *
 * @remarks
 * - This function is designed for English language words only
 * - It handles many common cases but isn't exhaustive for all English plurals
 * - Words that are identical in singular and plural form (e.g., "sheep") are returned unchanged
 */
export function singular(str: string): string {
    if (!str) return str;

    // Combine all rules in priority order
    const rules: InflectionRule[] = [
        ...EnglishInflectionRules.INVARIANT,
        ...EnglishInflectionRules.IRREGULAR.toSingular,
        ...EnglishInflectionRules.LATIN_GREEK.toSingular,
        ...EnglishInflectionRules.PATTERN_RULES.toSingular,
        ...EnglishInflectionRules.DEFAULT.toSingular,
    ];

    // Iterate over rules and apply the first matching one
    for (const rule of rules) {
        if (rule.regex.test(str)) {
            return str.replace(
                rule.regex,
                typeof rule.replacement === "string" ? rule.replacement : rule.replacement(str),
            );
        }
    }

    // Return the original string if no rules match
    return str;
}
