/**
 * Rule type for word inflection transformation
 *
 * This interface defines the structure of a single inflection rule, which consists of:
 * - A regular expression pattern to match words that the rule applies to
 * - A replacement string or function to transform the matched word
 *
 * The replacement can be either a static string with capture group references
 * (e.g., "$1s") or a function that takes the matched string and returns the
 * transformed version.
 *
 * @example
 * ```typescript
 * // Simple string replacement rule (add 's' to the end)
 * const pluralRule: InflectionRule = {
 *   regex: /(.*)$/i,
 *   replacement: "$1s"
 * };
 *
 * // Function-based replacement rule
 * const singularRule: InflectionRule = {
 *   regex: /(buses|dishes|matches)$/i,
 *   replacement: (match: string): string => match.slice(0, -2)
 * };
 * ```
 *
 * @see {@link PluralSingularRulePair} Interface that uses InflectionRule for rule pairs
 * @see {@link EnglishInflectionRules} Constant that implements these rules
 */
export interface InflectionRule {
    /**
     * Regular expression pattern to match words this rule applies to
     */
    regex: RegExp;

    /**
     * Replacement string with capture group references or function to transform the matched word
     */
    replacement: string | ((match: string) => string);
}

/**
 * Pair of rule sets for bidirectional singular/plural transformations
 *
 * This interface defines a pair of rule sets for transforming words between
 * singular and plural forms:
 * - toPlural: Rules for converting singular words to plural form
 * - toSingular: Rules for converting plural words to singular form
 *
 * Each rule set is an array of InflectionRule objects that are applied in order
 * until a matching rule is found.
 *
 * @example
 * ```typescript
 * // Rule pair for words ending in -y
 * const yRules: PluralSingularRulePair = {
 *   toPlural: [
 *     { regex: /([^aeiou])y$/i, replacement: "$1ies" }, // city -> cities
 *     { regex: /([aeiou]y)$/i, replacement: "$1s" }     // boy -> boys
 *   ],
 *   toSingular: [
 *     { regex: /([^aeiou])ies$/i, replacement: "$1y" }  // cities -> city
 *   ]
 * };
 * ```
 *
 * @see {@link InflectionRule} Interface for individual transformation rules
 * @see {@link InflectionRuleCategories} Interface that uses PluralSingularRulePair for categories
 */
export interface PluralSingularRulePair {
    /**
     * Array of rules for converting singular words to plural form
     */
    toPlural: InflectionRule[];

    /**
     * Array of rules for converting plural words to singular form
     */
    toSingular: InflectionRule[];
}

/**
 * Categories of English inflection rules
 *
 * This interface defines the structure for organizing English inflection rules
 * into linguistic categories. Each category represents a different type of
 * inflection pattern in English:
 *
 * - INVARIANT: Words that are the same in singular and plural form (e.g., "fish", "sheep")
 * - IRREGULAR: Words with irregular plural forms (e.g., "child/children", "man/men")
 * - LATIN_GREEK: Words borrowed from Latin and Greek (e.g., "cactus/cacti", "analysis/analyses")
 * - PATTERN_RULES: Words with specific ending patterns (e.g., words ending in -y, -f, -o)
 * - DEFAULT: Default rules for standard transformations (adding/removing 's')
 *
 * Rules are typically applied in the order listed above, from most specific to most general.
 *
 * @example
 * ```typescript
 * // Using the categories in a word inflection function
 * function plural(word: string): string {
 *   // Combine all rules in priority order
 *   const rules: InflectionRule[] = [
 *     ...EnglishInflectionRules.INVARIANT,
 *     ...EnglishInflectionRules.IRREGULAR.toPlural,
 *     ...EnglishInflectionRules.LATIN_GREEK.toPlural,
 *     ...EnglishInflectionRules.PATTERN_RULES.toPlural,
 *     ...EnglishInflectionRules.DEFAULT.toPlural,
 *   ];
 *
 *   // Apply the first matching rule
 *   for (const rule of rules) {
 *     if (rule.regex.test(word)) {
 *       return word.replace(rule.regex, rule.replacement as string);
 *     }
 *   }
 *
 *   return word;
 * }
 * ```
 *
 * @see {@link EnglishInflectionRules} Constant that implements this interface
 * @see {@link plural} Function that uses these categories for pluralization
 * @see {@link singular} Function that uses these categories for singularization
 */
export interface InflectionRuleCategories {
    /**
     * Words that are the same in singular and plural form
     */
    INVARIANT: InflectionRule[];

    /**
     * Words with irregular plural forms
     */
    IRREGULAR: PluralSingularRulePair;

    /**
     * Words borrowed from Latin and Greek
     */
    LATIN_GREEK: PluralSingularRulePair;

    /**
     * Words with specific ending patterns
     */
    PATTERN_RULES: PluralSingularRulePair;

    /**
     * Default rules for standard transformations
     */
    DEFAULT: PluralSingularRulePair;
}
