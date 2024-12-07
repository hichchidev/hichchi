// noinspection JSUnusedGlobalSymbols

/**
 * Break a string into words array.<br>
 *
 * This function will break any of below to words in examples into `['hello', 'world']`<br>
 *
 * @param {string} [str] String to break into words.
 * @returns {string[]} Array of words.
 *
 * @example
 * ```typescript
 * breakToWords("helloWorld"); // ['hello', 'world']
 * ```
 *
 * @example
 * ```typescript
 * breakToWords("hello_world"); // ['hello', 'world']
 * ```
 *
 * @example
 * ```typescript
 * breakToWords("hello-world"); // ['hello', 'world']
 * ```
 *
 * @example
 * ```typescript
 * breakToWords("hello world"); // ['hello', 'world']
 * ```
 */
export function breakToWords(str: string): string[];

/**
 * Break a string into words array and format the string.<br>
 *
 * This function will break string into words and format the string using the provided function.<br>
 *
 * @param {string} [str] String to break into words.
 * @param {() => string} format Formatting function.
 * @returns {string[]} Array of words.
 *
 * @example
 * ```typescript
 * breakToWords("helloWorld" , toFirstCase); // Hello world
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
 * ```typescript
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
 * ```typescript
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
 * ```typescript
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
 * Convert a string to upper cases and break into words with optional join or space.
 * @param {string} [str] String to convert to upper cases and break into words.
 * @param {string} [join] Optional string to join the words with.
 * @returns {string} String in upper cases and broken into words.
 *
 * @example
 * ```typescript
 * toUpperCaseBreak("HelloWorld"); // "HELLO WORLD"
 * ```
 *
 * @example
 * ```typescript
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
 * Convert a string to first case (Capitalize first letter of the string).
 * @param {string} [str] Optional string to join the words with.
 * @returns {string} String in first case.
 *
 * @example
 * ```typescript
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
 * Convert a string to title case (Capitalize first letter of each word).
 * @param {string} [str] String to convert to title case.
 * @returns {string} String in title case.
 *
 * @example
 * ```typescript
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
 * ```typescript
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
 * ```typescript
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
 * ```typescript
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
 * Convert a string to snake case.
 * @param {string} [str] String to convert to snake case.
 * @param {boolean} [caps] Whether to convert to upper case.
 * @returns {string} String in snake case.
 *
 * @example
 * ```typescript
 * toSnakeCase("hello world"); // "hello_world"
 *```
 *
 * @example
 * ```typescript
 * toSnakeCase("hello world", true); // "HELLO_WORLD"
 * ```
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
 * ```typescript
 * toKebabCase("hello world"); // "hello-world"
 * ```
 *
 * @example
 * ```typescript
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
 * ```typescript
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
 * ```typescript
 * htmlToText("<h1>Hello World</h1>"); // "Hello World"
 * ```
 */
export function htmlToText(str: string): string {
    return str.replace(/<[^>]*>?/gm, "");
}

/**
 * Handles converting plural words to their singular form.
 * @param {string} str String to convert to singular.
 * @returns {string} Singular form of the string.
 *
 * @example
 * ```typescript
 * singular("children"); // "child"
 * ```
 */
export function singular(str: string): string {
    if (!str) return str;

    // Define the rule type
    interface Rule {
        regex: RegExp;
        replacement: string | ((match: string) => string);
    }

    // General rules and exceptions for singularizing
    const rules: Rule[] = [
        { regex: /children$/i, replacement: "child" }, // e.g., children -> child
        { regex: /men$/i, replacement: "man" }, // e.g., men -> man
        { regex: /women$/i, replacement: "woman" }, // e.g., women -> woman
        { regex: /teeth$/i, replacement: "tooth" }, // e.g., teeth -> tooth
        { regex: /feet$/i, replacement: "foot" }, // e.g., feet -> foot
        { regex: /(buses|dishes|matches)$/i, replacement: (match: string): string => match.slice(0, -2) }, // e.g., buses -> bus
        { regex: /oes$/i, replacement: "o" }, // e.g., potatoes -> potato
        { regex: /ies$/i, replacement: "y" }, // e.g., parties -> party
        { regex: /ves$/i, replacement: "f" }, // e.g., wolves -> wolf
        { regex: /cacti$/i, replacement: "cactus" }, // e.g., cacti -> cactus
        { regex: /data$/i, replacement: "datum" }, // e.g., data -> datum
        { regex: /phenomena$/i, replacement: "phenomenon" }, // e.g., phenomena -> phenomenon
        { regex: /s$/i, replacement: "" }, // e.g., cats -> cat
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
