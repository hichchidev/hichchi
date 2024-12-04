// noinspection JSUnusedGlobalSymbols

import { TransformFnParams } from "class-transformer";

/**
 * Multi value form field transformer
 *
 * A transformer to use in DTOs as a `TransformFn` for the `Transform` property decorator from the `class-transformer` package.
 *
 * This transformer will transform a multi-value form field into an array of values or a single value into an array
 * with that value.This is useful when you have a form field that can accept multiple values, like a multi-select
 * field, and you want to ensure that the value is always an array even if there is only one value.
 *
 * @example
 * ```typescript
 * export class DTO {
 *    @Transform(MultiValueFormFieldTransformer)
 *    userIds: string[];
 * }
 * ```
 *
 * @param {TransformFnParams} params - Parameters passed to the transformer
 * @returns {string[]} - An array of values
 */
export function MultiValueFormFieldTransformer(params: TransformFnParams): string[] {
    return Array.isArray(params.value) ? params.value : [params.value];
}
