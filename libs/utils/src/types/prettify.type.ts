// noinspection JSUnusedGlobalSymbols
/**
 * Utility type for creating a clean object type from a complex type.
 *
 * The `Prettify` type takes a potentially complex type (with intersections, unions,
 * mapped types, etc.) and converts it into a simple object type with all properties
 * explicitly defined. This makes the resulting type easier to read in IDE tooltips
 * and type errors.
 *
 * @template T The complex type to simplify
 *
 * @author Matt Pocock (https://www.totaltypescript.com/tips/create-autocomplete-helper-which-allows-for-arbitrary-values)
 *
 * @example
 * ```typescript
 * // Instead of seeing: { a: number } & { b: string }
 * // You'll see: { a: number, b: string }
 * type ComplexType = { a: number } & { b: string };
 * type SimpleType = Prettify<ComplexType>;
 * ```
 */
export type Prettify<T> = {
    [K in keyof T]: T[K];
} & {};
