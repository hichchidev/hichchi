// noinspection JSUnusedGlobalSymbols

import {
    htmlToText,
    singular,
    toCamelCase,
    toFirstCase,
    toFirstCaseBreak,
    toKebabCase,
    toLowerCase,
    toLowerCaseBreak,
    toNumber,
    toPascalCase,
    toSentenceCase,
    toSnakeCase,
    toTitleCase,
    toUpperCase,
    toUpperCaseBreak,
} from "./string.utils";
import { TemplateTag } from "./enums";

/**
 * Applies a value to a template string containing transformation tags.
 *
 * This function replaces template tags in a string with transformed versions of a provided value.
 * It's particularly useful for creating dynamic messages, error notifications, or any text
 * that needs to include the same value in different formats.
 *
 * Each template tag is replaced with the result of applying the corresponding transformation
 * function to the provided value. If a tag isn't present in the template string, that
 * transformation is skipped.
 *
 * Available template tags:
 * - `#{upperCase}` - Converts to UPPERCASE ("USER")
 * - `#{snakeCase}` - Converts to snake_case ("user_profile")
 * - `#{upperSnakeCase}` - Converts to UPPER_SNAKE_CASE ("USER_PROFILE")
 * - `#{lowerCase}` - Converts to lowercase ("user")
 * - `#{sentenceCase}` - Converts to Sentence case ("User profile")
 * - `#{firstCase}` - Converts to First case ("User")
 * - `#{camelCase}` - Converts to camelCase ("userProfile")
 * - `#{pascalCase}` - Converts to PascalCase ("UserProfile")
 * - `#{kebabCase}` - Converts to kebab-case ("user-profile")
 * - `#{upperKebabCase}` - Converts to KEBAB-CASE ("USER-PROFILE")
 * - `#{titleCase}` - Converts to Title Case ("User Profile")
 * - `#{lowerCaseBreak}` - Breaks words and converts to lowercase ("user profile")
 * - `#{upperCaseBreak}` - Breaks words and converts to UPPERCASE ("USER PROFILE")
 * - `#{firstCaseBreak}` - Breaks words and applies First case ("User profile")
 * - `#{singular}` - Converts plural to singular form ("users" → "user")
 * - `#{number}` - Converts to a number if possible ("123" → 123)
 * - `#{htmlToText}` - Removes HTML tags ("<b>User</b>" → "User")
 * - `#{format}` - Formats a string with placeholders (used with additional parameters)
 *
 * @example
 * ```typescript
 * // Error message with different versions of the same term
 * applyTemplate(
 *     'Cannot create a #{lowerCase} with this email. #{sentenceCase} already exists.',
 *     'User'
 * );
 * // Output: "Cannot create a user with this email. User already exists."
 * ```
 *
 * @example
 * ```typescript
 * // Using multiple transformations of the same value
 * applyTemplate(
 *     'Model: #{pascalCase}\nTable: #{snakeCase}\nAPI Path: #{kebabCase}',
 *     'blogPost'
 * );
 * // Output:
 * //     Model: BlogPost
 * //     Table: blog_post
 * //     API Path: blog-post
 * ```
 *
 * @param {string} str - Template string containing transformation tags
 * @param {string} prefix - The prefix to update with
 * @returns {string} - The template with all tags replaced by transformed values
 *
 * @see {@link TemplateTag} For the full list of available template tags
 * @see {@link applyTemplates} For applying multiple different values to a template
 */
export function applyTemplate(str: string, prefix: string): string {
    // Apply all available template tags
    return str
        .replace(TemplateTag.UPPER_CASE, toUpperCase(prefix))
        .replace(TemplateTag.SNAKE_CASE, toSnakeCase(prefix))
        .replace(TemplateTag.UPPER_SNAKE_CASE, toSnakeCase(prefix, true))
        .replace(TemplateTag.LOWER_CASE, toLowerCase(prefix))
        .replace(TemplateTag.SENTENCE_CASE, toSentenceCase(prefix))
        .replace(TemplateTag.FIRST_CASE, toFirstCase(prefix))
        .replace(TemplateTag.CAMEL_CASE, toCamelCase(prefix))
        .replace(TemplateTag.PASCAL_CASE, toPascalCase(prefix))
        .replace(TemplateTag.KEBAB_CASE, toKebabCase(prefix))
        .replace(TemplateTag.UPPER_KEBAB_CASE, toKebabCase(prefix, true))
        .replace(TemplateTag.TITLE_CASE, toTitleCase(prefix))
        .replace(TemplateTag.LOWER_CASE_BREAK, toLowerCaseBreak(prefix))
        .replace(TemplateTag.UPPER_CASE_BREAK, toUpperCaseBreak(prefix))
        .replace(TemplateTag.FIRST_CASE_BREAK, toFirstCaseBreak(prefix))
        .replace(TemplateTag.SINGULAR, singular(prefix))
        .replace(TemplateTag.NUMBER, String(toNumber(prefix) ?? prefix))
        .replace(TemplateTag.HTML_TO_TEXT, htmlToText(prefix));
}

/**
 * Apply multiple templates to a string with different prefixes
 *
 * @param {string} str Template string to apply prefixes
 * @param {Record<string, string>} prefixes Object with key-value pairs where key is the template name and value is the prefix
 * @returns {string} String with all templates applied
 *
 * @example
 * ```TypeScript
 * applyTemplates(
 *     'User #{user.lowerCase} created post "#{post.titleCase}"',
 *     {
 *         user: 'JohnDoe',
 *         post: 'my first blog post'
 *     }
 * );
 * // Output: User johndoe created post "My First Blog Post"
 * ```
 */
export function applyTemplates(str: string, prefixes: Record<string, string>): string {
    let result: string = str;

    // Process each prefix
    for (const [key, prefix] of Object.entries(prefixes)) {
        // Replace all possible template tags for this prefix
        // eslint-disable-next-line no-loop-func
        Object.values(TemplateTag).forEach(tag => {
            // Convert #{tag} to #{prefix.tag}
            const prefixedTag = tag.replace("#{", `#{${key}.`);
            if (result.includes(prefixedTag)) {
                // Get the transformation function name
                const templateFunction = tag.replace(/#{(.+)}/, "$1");
                // Apply the appropriate transformation based on the tag
                let replacement = prefix;

                switch (templateFunction) {
                    case TemplateTag.UPPER_CASE:
                        replacement = toUpperCase(prefix);
                        break;
                    case TemplateTag.SNAKE_CASE:
                        replacement = toSnakeCase(prefix);
                        break;
                    case TemplateTag.UPPER_SNAKE_CASE:
                        replacement = toSnakeCase(prefix, true);
                        break;
                    case TemplateTag.LOWER_CASE:
                        replacement = toLowerCase(prefix);
                        break;
                    case TemplateTag.SENTENCE_CASE:
                        replacement = toSentenceCase(prefix);
                        break;
                    case TemplateTag.FIRST_CASE:
                        replacement = toFirstCase(prefix);
                        break;
                    case TemplateTag.CAMEL_CASE:
                        replacement = toCamelCase(prefix);
                        break;
                    case TemplateTag.PASCAL_CASE:
                        replacement = toPascalCase(prefix);
                        break;
                    case TemplateTag.KEBAB_CASE:
                        replacement = toKebabCase(prefix);
                        break;
                    case TemplateTag.UPPER_KEBAB_CASE:
                        replacement = toKebabCase(prefix, true);
                        break;
                    case TemplateTag.TITLE_CASE:
                        replacement = toTitleCase(prefix);
                        break;
                    case TemplateTag.LOWER_CASE_BREAK:
                        replacement = toLowerCaseBreak(prefix);
                        break;
                    case TemplateTag.UPPER_CASE_BREAK:
                        replacement = toUpperCaseBreak(prefix);
                        break;
                    case TemplateTag.FIRST_CASE_BREAK:
                        replacement = toFirstCaseBreak(prefix);
                        break;
                    case TemplateTag.SINGULAR:
                        replacement = singular(prefix);
                        break;
                    case TemplateTag.NUMBER:
                        replacement = String(toNumber(prefix) ?? prefix);
                        break;
                    case TemplateTag.HTML_TO_TEXT:
                        replacement = htmlToText(prefix);
                        break;
                }

                result = result.replace(prefixedTag, replacement);
            }
        });
    }

    return result;
}
