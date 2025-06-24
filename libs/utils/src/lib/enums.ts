/**
 * Template tags for string transformations
 *
 * This enum defines all available template tags that can be used with the `applyTemplate`
 * and `applyTemplates` functions. Each tag corresponds to a specific string transformation
 * function from the string.utils module.
 *
 * Template tags are represented as strings in the format `#{transformationName}`. When these
 * tags appear in template strings, they are replaced with the result of applying the
 * corresponding transformation to the provided value.
 *
 * @see {@link applyTemplate} For applying a single value to a template
 * @see {@link applyTemplates} For applying multiple values to a template
 */
export enum TemplateTag {
    UPPER_CASE = "#{upperCase}",
    SNAKE_CASE = "#{snakeCase}",
    UPPER_SNAKE_CASE = "#{upperSnakeCase}",
    LOWER_CASE = "#{lowerCase}",
    SENTENCE_CASE = "#{sentenceCase}",
    FIRST_CASE = "#{firstCase}",
    CAMEL_CASE = "#{camelCase}",
    PASCAL_CASE = "#{pascalCase}",
    KEBAB_CASE = "#{kebabCase}",
    UPPER_KEBAB_CASE = "#{upperKebabCase}",
    TITLE_CASE = "#{titleCase}",
    LOWER_CASE_BREAK = "#{lowerCaseBreak}",
    UPPER_CASE_BREAK = "#{upperCaseBreak}",
    FIRST_CASE_BREAK = "#{firstCaseBreak}",
    SINGULAR = "#{singular}",
    NUMBER = "#{number}",
    HTML_TO_TEXT = "#{htmlToText}",
    // FORMAT = "#{format}",
}
