import { CHARACTERS_TO_REMOVE } from "./constants";
import { InflectionRuleCategories } from "../interfaces";

/**
 * Comprehensive rules for English word inflection (singular/plural transformations)
 *
 * This module provides a structured collection of rules for transforming English words
 * between singular and plural forms. The rules are organized into categories based on
 * linguistic patterns and exceptions, ensuring accurate transformations for various
 * word types.
 *
 * Key features:
 * - Invariant words that are identical in singular and plural forms
 * - Irregular plural forms that don't follow standard patterns
 * - Latin and Greek origin words with their specific plural formations
 * - Pattern-based rules for common English word endings
 * - Default fallback rules for standard English pluralization
 *
 * The rules are applied in a specific priority order, from most specific to most general,
 * to ensure correct handling of special cases. Each rule consists of a regular expression
 * pattern and a replacement string or function.
 *
 * @example
 * ```typescript
 * // Using the rules with the plural() function
 * import { EnglishInflectionRules } from '@hichchi/utils/constants';
 * import { InflectionRule } from '@hichchi/utils/interfaces';
 *
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
 * @see {@link plural} Function that uses these rules to convert words to plural form
 * @see {@link singular} Function that uses these rules to convert words to singular form
 * @see {@link InflectionRuleCategories} Interface defining the structure of the rules
 * @see {@link InflectionRule} Interface for individual transformation rules
 */
export const EnglishInflectionRules: InflectionRuleCategories = {
    /**
     * Words that are the same in singular and plural form
     *
     * This category contains rules for words that don't change between singular and plural forms.
     * These invariant words (also called "zero plurals") have identical singular and plural forms
     * in English. The rule simply returns the word unchanged.
     *
     * Common examples include:
     * - Animal names: "fish", "deer", "sheep"
     * - Scientific terms: "species", "series"
     * - Uncountable nouns: "equipment"
     *
     * @example
     * ```typescript
     * // These words remain unchanged in plural form
     * plural("fish");     // "fish"
     * plural("deer");     // "deer"
     * plural("sheep");    // "sheep"
     * plural("species");  // "species"
     * plural("equipment"); // "equipment"
     * ```
     *
     * @see {@link plural} Function that applies these rules
     * @see {@link singular} Function that applies these rules
     */
    INVARIANT: [{ regex: /^(fish|deer|sheep|species|series|equipment)$/i, replacement: "$1" }],

    /**
     * Irregular plural forms
     *
     * This category contains rules for words with irregular plural forms that don't
     * follow standard English pluralization patterns. These words have unique
     * transformations between singular and plural forms that must be handled as
     * special cases.
     *
     * The category is divided into two rule sets:
     * - toPlural: Rules for converting singular forms to their irregular plural forms
     * - toSingular: Rules for converting irregular plural forms back to singular
     *
     * These rules handle common irregular English plurals like "child/children",
     * "man/men", "tooth/teeth", etc. Many of these irregular forms have historical
     * origins in Old English and other Germanic languages.
     *
     * @example
     * ```typescript
     * // Singular to plural transformations
     * plural("child");   // "children"
     * plural("man");     // "men"
     * plural("tooth");   // "teeth"
     * plural("person");  // "people"
     *
     * // Plural to singular transformations
     * singular("children"); // "child"
     * singular("men");      // "man"
     * singular("teeth");    // "tooth"
     * singular("people");   // "person"
     * ```
     *
     * @see {@link plural} Function that applies these rules for pluralization
     * @see {@link singular} Function that applies these rules for singularization
     */
    IRREGULAR: {
        // Singular to plural transformations
        toPlural: [
            { regex: /^child$/i, replacement: "children" },
            { regex: /^man$/i, replacement: "men" },
            { regex: /^woman$/i, replacement: "women" },
            { regex: /^tooth$/i, replacement: "teeth" },
            { regex: /^foot$/i, replacement: "feet" },
            { regex: /^goose$/i, replacement: "geese" },
            { regex: /^mouse$/i, replacement: "mice" },
            { regex: /^person$/i, replacement: "people" },
            { regex: /^ox$/i, replacement: "oxen" },
        ],
        // Plural to singular transformations
        toSingular: [
            { regex: /children$/i, replacement: "child" },
            { regex: /men$/i, replacement: "man" },
            { regex: /women$/i, replacement: "woman" },
            { regex: /teeth$/i, replacement: "tooth" },
            { regex: /feet$/i, replacement: "foot" },
            { regex: /geese$/i, replacement: "goose" },
            { regex: /mice$/i, replacement: "mouse" },
            { regex: /people$/i, replacement: "person" },
            { regex: /oxen$/i, replacement: "ox" },
        ],
    },

    /**
     * Latin/Greek origin words
     *
     * This category contains rules for words borrowed from Latin and Greek that
     * retain their original pluralization patterns. These words follow different
     * rules than native English words and often have distinctive ending changes.
     *
     * The category is divided into two rule sets:
     * - toPlural: Rules for converting Latin/Greek singular forms to their plural forms
     * - toSingular: Rules for converting Latin/Greek plural forms back to singular
     *
     * Common patterns include:
     * - "-us" → "-i" (cactus/cacti, fungus/fungi)
     * - "-is" → "-es" (analysis/analyses, thesis/theses)
     * - "-on"/"-um" → "-a" (criterion/criteria, datum/data)
     * - "-ex"/"-ix" → "-ices" (index/indices, matrix/matrices)
     *
     * These words are often found in academic, scientific, and technical contexts.
     * Note that some of these words have alternative anglicized plural forms that
     * are also acceptable in modern English (e.g., "cactuses" alongside "cacti").
     *
     * @example
     * ```typescript
     * // Singular to plural transformations
     * plural("cactus");    // "cacti"
     * plural("analysis");  // "analyses"
     * plural("criterion"); // "criteria"
     * plural("index");     // "indices"
     * plural("matrix");    // "matrices"
     *
     * // Plural to singular transformations
     * singular("cacti");     // "cactus"
     * singular("analyses");  // "analysis"
     * singular("criteria");  // "criterion"
     * singular("indices");   // "index"
     * singular("matrices");  // "matrix"
     * ```
     *
     * @see {@link plural} Function that applies these rules for pluralization
     * @see {@link singular} Function that applies these rules for singularization
     */
    LATIN_GREEK: {
        // Singular to plural transformations
        toPlural: [
            { regex: /^cactus$/i, replacement: "cacti" },
            { regex: /^focus$/i, replacement: "foci" },
            { regex: /^fungus$/i, replacement: "fungi" },
            { regex: /^nucleus$/i, replacement: "nuclei" },
            { regex: /^syllabus$/i, replacement: "syllabi" },
            { regex: /^analysis$/i, replacement: "analyses" },
            { regex: /^diagnosis$/i, replacement: "diagnoses" },
            { regex: /^thesis$/i, replacement: "theses" },
            { regex: /^criterion$/i, replacement: "criteria" },
            { regex: /^datum$/i, replacement: "data" },
            { regex: /^phenomenon$/i, replacement: "phenomena" },
            { regex: /^index$/i, replacement: "indices" },
            { regex: /^matrix$/i, replacement: "matrices" },
            { regex: /^vertex$/i, replacement: "vertices" },
            { regex: /^appendix$/i, replacement: "appendices" },
        ],
        // Plural to singular transformations
        toSingular: [
            { regex: /matrices$/i, replacement: "matrix" },
            { regex: /indices$/i, replacement: "index" },
            { regex: /vertices$/i, replacement: "vertex" },
            { regex: /appendices$/i, replacement: "appendix" },
            { regex: /cacti$/i, replacement: "cactus" },
            { regex: /foci$/i, replacement: "focus" },
            { regex: /fungi$/i, replacement: "fungus" },
            { regex: /nuclei$/i, replacement: "nucleus" },
            { regex: /syllabi$/i, replacement: "syllabus" },
            { regex: /analyses$/i, replacement: "analysis" },
            { regex: /diagnoses$/i, replacement: "diagnosis" },
            { regex: /theses$/i, replacement: "thesis" },
            { regex: /criteria$/i, replacement: "criterion" },
            { regex: /data$/i, replacement: "datum" },
            { regex: /phenomena$/i, replacement: "phenomenon" },
        ],
    },

    /**
     * Words with specific ending patterns
     *
     * This category contains rules for words that follow regular patterns based on
     * their endings. These patterns represent the most common rules for English
     * pluralization and singularization, covering a wide range of everyday words.
     *
     * The category is divided into two rule sets:
     * - toPlural: Rules for converting singular forms to plural based on word endings
     * - toSingular: Rules for converting plural forms back to singular
     *
     * Key pattern groups include:
     *
     * 1. Words ending in -f or -fe:
     *    - "knife" → "knives", "life" → "lives", "wolf" → "wolves"
     *
     * 2. Words ending in -y:
     *    - After consonant: "city" → "cities", "baby" → "babies"
     *    - After vowel: "boy" → "boys", "key" → "keys"
     *
     * 3. Words ending in -o:
     *    - Some specific words: "hero" → "heroes", "potato" → "potatoes"
     *    - After consonant: "echo" → "echoes", "tomato" → "tomatoes"
     *
     * 4. Words ending in -s, -ss, -sh, -ch, -x, -z:
     *    - "bus" → "buses", "box" → "boxes", "dish" → "dishes"
     *
     * These patterns cover the majority of regular English pluralization rules
     * and are applied after checking for invariant words, irregular forms, and
     * Latin/Greek words.
     *
     * @example
     * ```typescript
     * // Words ending in -f or -fe
     * plural("knife");   // "knives"
     * plural("life");    // "lives"
     * plural("wolf");    // "wolves"
     *
     * // Words ending in -y
     * plural("city");    // "cities"
     * plural("boy");     // "boys"
     *
     * // Words ending in -o
     * plural("hero");    // "heroes"
     * plural("photo");   // "photos"
     *
     * // Words ending in -s, -ss, -sh, -ch, -x, -z
     * plural("bus");     // "buses"
     * plural("box");     // "boxes"
     * plural("dish");    // "dishes"
     *
     * // Plural to singular
     * singular("knives");  // "knife"
     * singular("cities");  // "city"
     * singular("boxes");   // "box"
     * ```
     *
     * @see {@link plural} Function that applies these rules for pluralization
     * @see {@link singular} Function that applies these rules for singularization
     * @see {@link CHARACTERS_TO_REMOVE} Constant used in some replacement functions
     */
    PATTERN_RULES: {
        // Singular to plural transformations
        toPlural: [
            // Words ending in -f or -fe
            { regex: /^((?:wi|li)fe)$/i, replacement: "$1ves" },
            { regex: /(fe)$/i, replacement: "ves" },
            { regex: /([^f])f$/i, replacement: "$1ves" },

            // Words ending in -y
            { regex: /([^aeiou])y$/i, replacement: "$1ies" },
            { regex: /([aeiou]y)$/i, replacement: "$1s" },

            // Words ending in -o
            { regex: /(hero|potato|tomato|torpedo|veto)$/i, replacement: "$1es" },
            { regex: /([^aeiou])o$/i, replacement: "$1oes" },

            // Words ending in -is
            { regex: /(is)$/i, replacement: "es" },

            // Words ending in -us
            { regex: /(us)$/i, replacement: "uses" },

            // Words ending in -s, -ss, -sh, -ch, -x, -z
            { regex: /(s|ss|sh|ch|x|z)$/i, replacement: "$1es" },
        ],
        // Plural to singular transformations
        toSingular: [
            // Special spelling changes
            { regex: /knives$/i, replacement: "knife" },
            { regex: /lives$/i, replacement: "life" },
            { regex: /shelves$/i, replacement: "shelf" },

            // Common word patterns
            {
                regex: /(buses|dishes|matches)$/i,
                replacement: (match: string): string => match.slice(0, -CHARACTERS_TO_REMOVE),
            },
            { regex: /([^aeiouy]|qu)ies$/i, replacement: "$1y" },
            { regex: /(x|ch|ss|sh)es$/i, replacement: "$1" },
            { regex: /oes$/i, replacement: "o" },
            { regex: /ves$/i, replacement: "f" },
        ],
    },

    /**
     * Default rules for standard transformations
     *
     * This category contains fallback rules that are applied when no other rules match.
     * These represent the most basic and common English pluralization pattern: adding
     * an "s" to form plurals and removing an "s" to form singulars.
     *
     * The category is divided into two rule sets:
     * - toPlural: Adds "s" to the end of any word to form its plural
     * - toSingular: Removes a trailing "s" from any word to form its singular
     *
     * These rules are applied as a last resort after all other more specific rules
     * have been checked. They handle the majority of regular English words that don't
     * fall into any of the special categories or patterns.
     *
     * While simple, these rules can sometimes produce incorrect results for words that
     * should follow more specific patterns but weren't included in the other rule sets.
     * They're designed as a reasonable fallback rather than a comprehensive solution.
     *
     * @example
     * ```typescript
     * // Singular to plural with default rule
     * plural("book");    // "books"
     * plural("car");     // "cars"
     * plural("apple");   // "apples"
     *
     * // Plural to singular with default rule
     * singular("books");  // "book"
     * singular("cars");   // "car"
     * singular("apples"); // "apple"
     * ```
     *
     * @see {@link plural} Function that applies these rules for pluralization
     * @see {@link singular} Function that applies these rules for singularization
     */
    DEFAULT: {
        toPlural: [{ regex: /(.*)$/i, replacement: "$1s" }],
        toSingular: [{ regex: /s$/i, replacement: "" }],
    },
};
