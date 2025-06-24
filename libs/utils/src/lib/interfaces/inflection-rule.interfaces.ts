/**
 * Rule type for word inflection transformation
 */
export interface InflectionRule {
    regex: RegExp;
    replacement: string | ((match: string) => string);
}

export interface PluralSingularRulePair {
    toPlural: InflectionRule[];
    toSingular: InflectionRule[];
}

export interface InflectionRuleCategories {
    INVARIANT: InflectionRule[];
    IRREGULAR: PluralSingularRulePair;
    LATIN_GREEK: PluralSingularRulePair;
    PATTERN_RULES: PluralSingularRulePair;
    DEFAULT: PluralSingularRulePair;
}
