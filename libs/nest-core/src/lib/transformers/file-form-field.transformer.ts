// noinspection JSUnusedGlobalSymbols

import { TransformFnParams } from "class-transformer";

/**
 * File form field Transformer
 *
 * A transformer to use in DTOs as a `TransformFn` for the `Transform` property decorator from the `class-transformer` package.
 *
 * This transformer is used to transform a file form field value to `null` if the value is an empty string or `"null"`.
 *
 * @example
 * ```typescript
 * export class DTO {
 *    @Transform(FileFormFieldTransformer)
 *    image: null | undefined;
 * }
 * ```
 *
 * @param {TransformFnParams} params - Parameters passed to the transformer
 * @returns {null|undefined} `null` if the value is an empty string or `"null"`, otherwise returns `undefined`
 */
export function FileFormFieldTransformer(params: TransformFnParams): null | undefined {
    return params.value === "" || params.value === "null" ? null : undefined;
}
