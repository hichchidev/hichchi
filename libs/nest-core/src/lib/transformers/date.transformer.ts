// noinspection JSUnusedGlobalSymbols

import { TransformFnParams } from "class-transformer";

/**
 * Date transformer
 *
 * A transformer to use in DTOs as a `TransformFn` for the `Transform` property decorator from the `class-transformer` package.
 *
 * This transformer converts the property value to a JavaScript `Date` object if the value is a valid date string
 *
 * @example
 * ```typescript
 * export class DTO {
 *    @Transform(DateTransformer)
 *    birthday: Date;
 * }
 * ```
 *
 * @param {TransformFnParams} params - Parameters passed to the transformer
 * @returns {Date|undefined} - Transformed `Date` value or `undefined`
 */
export function DateTransformer(params: TransformFnParams): Date | undefined {
    if (typeof params.value.getMonth === "function") {
        return params.value;
    }

    if (typeof params.value !== "string") {
        return undefined;
    }

    try {
        const date = new Date(params.value);
        if (date.toString() === "Invalid Date") {
            return undefined;
        }
        return date;
    } catch {
        return undefined;
    }
}
