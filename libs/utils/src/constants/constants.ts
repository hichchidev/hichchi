/**
 * Base for hexadecimal number conversion
 *
 * This constant defines the radix (base) used for hexadecimal number conversion.
 * The value 16 represents the standard hexadecimal numbering system (0-9, A-F).
 * It's used in toString() and parseInt() operations involving hex values.
 *
 * @example
 * ```typescript
 * // Converting a number to hexadecimal string
 * const hexString = number.toString(HEX_RADIX);
 *
 * // Converting a hexadecimal string to a number
 * const number = parseInt(hexString, HEX_RADIX);
 * ```
 *
 * @see {@link HEX_PADDING_LENGTH} Related constant for hex string formatting
 * @see {@link HEX_PADDING_CHAR} Related constant for hex string padding
 */
export const HEX_RADIX = 16;

/**
 * Minimum length for padded hexadecimal strings
 *
 * This constant defines the minimum length for hexadecimal strings after padding.
 * It ensures that hex values have a consistent length (e.g., "0A" instead of "A").
 * The value 2 ensures that single-digit hex values are padded with a leading zero.
 *
 * @example
 * ```typescript
 * // Padding a hex string to ensure consistent length
 * const paddedHex = hexString.padStart(HEX_PADDING_LENGTH, HEX_PADDING_CHAR);
 *
 * // Full example with conversion and padding
 * const byteValue = 10;
 * const hexByte = byteValue.toString(HEX_RADIX).padStart(HEX_PADDING_LENGTH, HEX_PADDING_CHAR);
 * // hexByte = "0A"
 * ```
 *
 * @see {@link HEX_RADIX} Related constant for hex conversion
 * @see {@link HEX_PADDING_CHAR} Related constant for the padding character
 */
export const HEX_PADDING_LENGTH = 2;

/**
 * Character used for padding hexadecimal strings
 *
 * This constant defines the character used to pad hexadecimal strings to reach
 * the minimum length defined by HEX_PADDING_LENGTH. The value "0" is the standard
 * padding character for hexadecimal values.
 *
 * @example
 * ```typescript
 * // Padding a hex string with zeros
 * const paddedHex = hexString.padStart(HEX_PADDING_LENGTH, HEX_PADDING_CHAR);
 *
 * // Example with a single-digit hex value
 * const hexValue = "F";
 * const paddedHex = hexValue.padStart(HEX_PADDING_LENGTH, HEX_PADDING_CHAR);
 * // paddedHex = "0F"
 * ```
 *
 * @see {@link HEX_RADIX} Related constant for hex conversion
 * @see {@link HEX_PADDING_LENGTH} Related constant for the minimum length
 */
export const HEX_PADDING_CHAR = "0";

/**
 * Number of characters to remove in string truncation operations
 *
 * This constant defines the default number of characters to remove when
 * truncating strings in various utility functions. The value 2 is commonly
 * used when removing the last two characters of a string (e.g., removing
 * a trailing comma and space).
 *
 * @example
 * ```typescript
 * // Removing trailing characters from a string
 * const items = ["apple", "banana", "cherry"];
 * let result = "";
 *
 * for (const item of items) {
 *   result += item + ", ";
 * }
 *
 * // Remove trailing comma and space
 * if (result.length > 0) {
 *   result = result.slice(0, -CHARACTERS_TO_REMOVE);
 * }
 * // result = "apple, banana, cherry"
 * ```
 */
export const CHARACTERS_TO_REMOVE = 2;

/**
 * Default maximum line length for word wrapping
 *
 * This constant defines the default maximum length of a line when performing
 * word wrapping operations. The value 80 is a common standard for line length
 * in many text formats and terminal displays.
 *
 * @example
 * ```typescript
 * // Wrapping a long text to the default line length
 * function wrapText(text: string, maxLength = DEFAULT_LINE_LENGTH, breakChar = DEFAULT_BREAK_CHAR): string {
 *   // Word wrapping implementation
 *   const result = [];
 *   let line = "";
 *
 *   for (const word of text.split(" ")) {
 *     if ((line + word).length > maxLength) {
 *       result.push(line);
 *       line = word;
 *     } else {
 *       line += (line ? " " : "") + word;
 *     }
 *   }
 *
 *   if (line) {
 *     result.push(line);
 *   }
 *
 *   return result.join(breakChar);
 * }
 * ```
 *
 * @see {@link DEFAULT_BREAK_CHAR} Related constant for line break character
 */
export const DEFAULT_LINE_LENGTH = 80;

/**
 * Default line break character for word wrapping
 *
 * This constant defines the default character or string used to separate lines
 * when performing word wrapping operations. The value "\n" represents a standard
 * line feed character used for line breaks in most text formats.
 *
 * @example
 * ```typescript
 * // Using the default break character in word wrapping
 * const wrappedText = longText.match(new RegExp(`.{1,${DEFAULT_LINE_LENGTH}}(\\s|$)`, 'g'))
 *   ?.join(DEFAULT_BREAK_CHAR) || longText;
 * ```
 *
 * @see {@link DEFAULT_LINE_LENGTH} Related constant for maximum line length
 */
export const DEFAULT_BREAK_CHAR = "\n";

/**
 * Default context length for text excerpts
 *
 * This constant defines the default number of characters to include before and after
 * a search term when generating text excerpts or snippets. The value 40 provides
 * enough context to understand the meaning while keeping the excerpt concise.
 *
 * @example
 * ```typescript
 * // Generating an excerpt around a search term
 * function generateExcerpt(text: string, searchTerm: string): string {
 *   const index = text.toLowerCase().indexOf(searchTerm.toLowerCase());
 *   if (index === -1) return text.substring(0, DEFAULT_CONTEXT_LENGTH * 2) + DEFAULT_ELLIPSIS;
 *
 *   const start = Math.max(0, index - DEFAULT_CONTEXT_LENGTH);
 *   const end = Math.min(text.length, index + searchTerm.length + DEFAULT_CONTEXT_LENGTH);
 *
 *   let excerpt = text.substring(start, end);
 *   if (start > 0) excerpt = DEFAULT_ELLIPSIS + excerpt;
 *   if (end < text.length) excerpt = excerpt + DEFAULT_ELLIPSIS;
 *
 *   return excerpt;
 * }
 * ```
 *
 * @see {@link DEFAULT_ELLIPSIS} Related constant for indicating truncated text
 * @see {@link CONTEXT_MULTIPLIER} Related constant for adjusting context length
 */
export const DEFAULT_CONTEXT_LENGTH = 40;

/**
 * Default ellipsis string for indicating truncated text
 *
 * This constant defines the default string used to indicate that text has been
 * truncated or omitted in excerpts and summaries. The value "..." is the standard
 * ellipsis used to represent omitted content.
 *
 * @example
 * ```typescript
 * // Truncating a long string with ellipsis
 * function truncate(text: string, maxLength: number): string {
 *   if (text.length <= maxLength) return text;
 *   return text.substring(0, maxLength - DEFAULT_ELLIPSIS.length) + DEFAULT_ELLIPSIS;
 * }
 *
 * const longText = "This is a very long text that needs to be truncated";
 * const truncated = truncate(longText, 20);
 * // truncated = "This is a very lo..."
 * ```
 *
 * @see {@link DEFAULT_CONTEXT_LENGTH} Related constant for excerpt generation
 */
export const DEFAULT_ELLIPSIS = "...";

/**
 * Multiplier for adjusting context length in excerpts
 *
 * This constant defines a multiplier used to adjust the context length when
 * generating excerpts under different conditions. The value 2 is typically
 * used to double the context length for certain scenarios, such as when no
 * search term is found.
 *
 * @example
 * ```typescript
 * // Using the multiplier to adjust context length
 * function getContextLength(hasSearchTerm: boolean): number {
 *   return hasSearchTerm
 *     ? DEFAULT_CONTEXT_LENGTH
 *     : DEFAULT_CONTEXT_LENGTH * CONTEXT_MULTIPLIER;
 * }
 *
 * // Getting the first part of a text when no search term is found
 * function getFirstPart(text: string): string {
 *   const length = DEFAULT_CONTEXT_LENGTH * CONTEXT_MULTIPLIER;
 *   return text.length > length
 *     ? text.substring(0, length) + DEFAULT_ELLIPSIS
 *     : text;
 * }
 * ```
 *
 * @see {@link DEFAULT_CONTEXT_LENGTH} Related constant for base context length
 */
export const CONTEXT_MULTIPLIER = 2;
