import { registerDecorator, ValidationOptions, ValidationArguments } from "class-validator";
import isHexadecimalValidator from "validator/lib/isHexadecimal";

export const IS_RANDOM_HEX_TOKEN = "IsRandomHexToken";

export function isRandomHexToken(value: unknown, lengthInBytes: number): boolean {
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    const expectedLength = lengthInBytes * 2; // hex chars count
    return typeof value === "string" && value.length === expectedLength && isHexadecimalValidator(value);
}

export function IsRandomHexToken(lengthInBytes: number, validationOptions?: ValidationOptions) {
    return (object: object, propertyName: string): void => {
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
    };
}
