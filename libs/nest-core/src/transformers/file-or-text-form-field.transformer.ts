// noinspection JSUnusedGlobalSymbols

import { TransformFnParams } from "class-transformer";

/**
 * File or text form field transformer
 *
 * A transformer to use in DTOs as a `TransformFn` for the `Transform` property decorator from the `class-transformer` package.
 *
 * This transformer is used to transform a file or text form field value to a `string` or `null`.
 *
 * @example
 * ```TypeScript
 * export class DTO {
 *    @Transform(FileOrTextFormFieldTransformer)
 *    image: string | null;
 * }
 * ```
 *
 * @param {TransformFnParams} params - Parameters passed to the transformer
 * @returns {string|null} `null` if the value is not a string or an empty string, otherwise returns the `string` value
 */
export function FileOrTextFormFieldTransformer(params: TransformFnParams): string | null {
    return typeof params.value !== "string" || params.value === "" ? null : params.value;
}
