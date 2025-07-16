// noinspection JSUnusedGlobalSymbols

import { registerDecorator, ValidationOptions, ValidationArguments } from "class-validator";
import isHexadecimalValidator from "validator/lib/isHexadecimal";

/**
 * Token name for the random hexadecimal validator
 *
 * This constant is used as the validator name when registering the decorator
 * with class-validator. It serves as an identifier for the validation rule.
 */
export const IS_RANDOM_HEX_TOKEN = "IsRandomHexToken";

/**
 * Validates if a value is a hexadecimal string of a specific length in bytes
 *
 * This function checks if the provided value is a string, has the expected length
 * (where each byte is represented by 2 hexadecimal characters), and contains only
 * valid hexadecimal characters (0-9, a-f, A-F).
 *
 * @param {unknown} value - The value to validate
 * @param {number} lengthInBytes - The expected length in bytes (each byte = 2 hex chars)
 * @returns {boolean} True if the value is a valid hexadecimal string of the expected length
 *
 * @example
 * ```typescript
 * // Check if a value is a valid 16-byte (32-character) hexadecimal string
 * const isValid = isRandomHexToken('a1b2c3d4e5f67890a1b2c3d4e5f67890', 16);
 * // Returns true
 *
 * // Check if a value is a valid 8-byte (16-character) hexadecimal string
 * const isValid = isRandomHexToken('invalid-value', 8);
 * // Returns false
 * ```
 */
export function isRandomHexToken(value: unknown, lengthInBytes: number): boolean {
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    const expectedLength = lengthInBytes * 2; // hex chars count
    return typeof value === "string" && value.length === expectedLength && isHexadecimalValidator(value);
}

/**
 * Decorator that validates if a property is a hexadecimal string of a specific length
 *
 * This decorator is used to validate that a property in a DTO is a valid hexadecimal
 * string with a specific length in bytes (where each byte is represented by 2 hexadecimal
 * characters). It's particularly useful for validating tokens, IDs, or other fixed-length
 * hexadecimal values.
 *
 * @param {number} lengthInBytes - The expected length in bytes (each byte = 2 hex chars)
 * @param {ValidationOptions} [validationOptions] - Optional validation options from class-validator
 * @returns {PropertyDecorator} A property decorator function
 *
 * @example
 * ```typescript
 * export class TokenDto {
 *   @IsRandomHexToken(16)
 *   token: string;
 * }
 * ```
 *
 * @example
 * ```typescript
 * export class UserDto {
 *   @IsRandomHexToken(32, { message: 'User ID must be a valid 64-character hexadecimal string' })
 *   id: string;
 * }
 * ```
 *
 * @see {@link isRandomHexToken} The underlying validation function
 */
export function IsRandomHexToken(lengthInBytes: number, validationOptions?: ValidationOptions): PropertyDecorator {
    return ((object: object, propertyName: string): void => {
        registerDecorator({
            name: IS_RANDOM_HEX_TOKEN,
            target: object.constructor,
            propertyName,
            constraints: [lengthInBytes],
            options: validationOptions,
            validator: {
                validate(value: unknown, args: ValidationArguments) {
                    const length = args.constraints[0] as number;
                    return isRandomHexToken(value, length);
                },
                defaultMessage(args: ValidationArguments) {
                    const length = args.constraints[0] as number;
                    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
                    return `${args.property} must be a ${length * 2}-character hexadecimal string`;
                },
            },
        });
    }) as PropertyDecorator;
}
