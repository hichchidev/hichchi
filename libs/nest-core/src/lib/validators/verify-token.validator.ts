// noinspection JSUnusedGlobalSymbols

import { registerDecorator, ValidationOptions, ValidationArguments } from "class-validator";
import { isRandomHexToken } from "./random-hex.validator";

/**
 * Token name for the verification token validator
 *
 * This constant is used as the validator name when registering the decorator
 * with class-validator. It serves as an identifier for the validation rule.
 */
export const IS_VERIFY_TOKEN = "isVerifyToken";

/**
 * Decorator that validates if a property is a 32-character verification token
 *
 * This decorator is used to validate that a property in a DTO is a valid hexadecimal
 * string with a fixed length of 16 bytes (32 hexadecimal characters). It's specifically
 * designed for validating verification tokens used in email verification, password reset,
 * and similar security-related features.
 *
 * Unlike the more general IsRandomHexToken decorator, this decorator uses a fixed length
 * of 16 bytes, which is a common size for verification tokens that balances security
 * and usability.
 *
 * @param {ValidationOptions} [validationOptions] - Optional validation options from class-validator
 * @returns {PropertyDecorator} A property decorator function
 *
 * @example
 * ```typescript
 * export class VerifyEmailDto {
 *   @IsVerifyToken()
 *   token: string;
 * }
 * ```
 *
 * @example
 * ```typescript
 * export class ResetPasswordDto {
 *   @IsVerifyToken({ message: 'Invalid password reset token' })
 *   token: string;
 *
 *   @IsString()
 *   @MinLength(8)
 *   newPassword: string;
 * }
 * ```
 *
 * @see {@link isRandomHexToken} The underlying validation function
 */
export function IsVerifyToken(validationOptions?: ValidationOptions): PropertyDecorator {
    const FIXED_LENGTH = 16;

    return ((object: object, propertyName: string): void => {
        registerDecorator({
            name: IS_VERIFY_TOKEN,
            target: object.constructor,
            propertyName,
            constraints: [FIXED_LENGTH],
            options: validationOptions,
            validator: {
                validate(value: unknown) {
                    return isRandomHexToken(value, FIXED_LENGTH);
                },
                defaultMessage(args: ValidationArguments) {
                    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
                    return `${args.property} must be a ${FIXED_LENGTH * 2}-character hexadecimal string`;
                },
            },
        });
    }) as PropertyDecorator;
}
