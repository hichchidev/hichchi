import { registerDecorator, ValidationOptions, ValidationArguments } from "class-validator";
import { isRandomHexToken } from "./random-hex.validator";

export const IS_VERIFY_TOKEN = "isVerifyToken";

// noinspection JSUnusedGlobalSymbols
export function IsVerifyToken(validationOptions?: ValidationOptions) {
    const FIXED_LENGTH = 16;

    return (object: object, propertyName: string): void => {
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
    };
}
