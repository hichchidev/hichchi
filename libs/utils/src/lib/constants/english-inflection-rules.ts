import { CHARACTERS_TO_REMOVE } from "./constants";
import { InflectionRuleCategories } from "../interfaces";

/**
 * Shared rules for English word inflection (singular/plural transformations)
 */
export const EnglishInflectionRules: InflectionRuleCategories = {
    /**
     * Words that are the same in singular and plural form
     */
    INVARIANT: [{ regex: /^(fish|deer|sheep|species|series|equipment)$/i, replacement: "$1" }],

    /**
     * Irregular plural forms
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
     */
    DEFAULT: {
        toPlural: [{ regex: /(.*)$/i, replacement: "$1s" }],
        toSingular: [{ regex: /s$/i, replacement: "" }],
    },
};
