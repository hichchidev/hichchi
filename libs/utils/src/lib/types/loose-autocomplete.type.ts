/**
 * Represents a type for autocompleting string values.
 *
 * The `LooseAutocomplete` type allows autocompletion for a set of predefined string literals
 * while still permitting other string values that are not part of the predefined set.
 *
 * This is useful in cases where a set of recommended values is available,
 * but the user is also given the flexibility to provide custom input as needed.
 *
 * @template T Extends string - The set of predefined literal string options for autocompletion.
 *
 * @example
 * ```typescript
 * // Define a set of color options
 * type ColorOption = 'red' | 'green' | 'blue';
 *
 * // Function that accepts predefined colors but also allows custom colors
 * function setColor(color: LooseAutocomplete<ColorOption>): void {
 *   console.log(`Setting color to: ${color}`);
 * }
 *
 * // Usage with predefined options (gets autocomplete)
 * setColor('red');     // Works, with autocomplete
 * setColor('green');   // Works, with autocomplete
 *
 * // Usage with custom string (allowed, but no autocomplete)
 * setColor('purple');  // Also works, even though not in predefined options
 * ```
 *
 * @author Matt Pocock (https://www.totaltypescript.com/tips/create-autocomplete-helper-which-allows-for-arbitrary-values)
 */
export type LooseAutocomplete<T extends string> = T | Omit<string, T>;
