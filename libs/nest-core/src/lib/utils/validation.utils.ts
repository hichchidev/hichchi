// noinspection JSUnusedGlobalSymbols

import { BadRequestException, Type } from "@nestjs/common";
import { toLowerCaseBreak, toSnakeCase } from "@hichchi/utils";
import { validate, ValidationError } from "class-validator";
import { hichchiMetadata } from "../metadata";
import { ClassConstructor, plainToInstance } from "class-transformer";
import { ErrorResponse } from "@hichchi/nest-connector";
import { ValidationConstraint } from "../types";
import { ValidationErrors } from "../responses";

/**
 * Transform validation errors to error string array
 * @param {ValidationError[]} validationErrors Validation errors
 * @param {string[]} acc Accumulated errors array
 * @returns {string[]} Error string array
 */
function transformErrors(validationErrors: ValidationError[], acc: string[] = []): string[] {
    const errors: string[] = acc;
    if (validationErrors.length) {
        validationErrors.forEach(error => {
            errors.push(...Object.values(error.constraints ?? []));
            if (error.children?.length) {
                errors.push(...transformErrors(error.children, errors));
            }
        });
    }
    return errors;
}

/**
 * Throw a bad request exception with the given error messages or first error message in the array
 * @param {string|string[]} errors Error messages or array of error messages
 */
export function throwValidationErrors(errors: ValidationError[]): never {
    const errorMessages = transformErrors(errors);
    const errorObject = { statusCode: 400, message: errorMessages, error: "Bad Request" };
    throw new BadRequestException(errorObject, "Bad Request Exception");
}

/**
 * Validate a DTO object with class-validator
 *
 * @example
 * ```typescript
 * @Controller("auth")
 * export class AuthController {
 *     @Post("register")
 *     async register(@Body() dto: any): Promise<User> {
 *         // Other implementation
 *         await validateDto(RegisterDto, dto)
 *         // Other implementation
 *     }
 * }
 *
 * ```
 * @template T DTO class type
 * @template V Object type
 * @param {ClassConstructor<T>} dto DTO class
 * @param {V} obj Object to validate
 * @param {boolean} throwErrors Weather to throw errors or return the errors
 * @returns Validated object instance as a promise
 * @throws {BadRequestException} If the object is not valid
 */
export async function validateDto<T, V = object, Thr = false>(
    dto: ClassConstructor<T>,
    obj: V,
    throwErrors?: Thr | boolean,
): Promise<true extends Thr ? T : T | ValidationError[]>;

export async function validateDto<T extends Type, V>(
    dto: ClassConstructor<T>,
    obj: V,
    throwErrors = false,
): Promise<T | ValidationError[]> {
    const objInstance = plainToInstance(dto, obj);
    const validationErrors = await validate(objInstance, { whitelist: true });
    if (validationErrors.length && throwErrors) {
        throw new BadRequestException(
            validationErrors.map(error => (error.constraints ? Object.values(error.constraints)[0] : [])),
        );
    }
    return validationErrors.length ? validationErrors : objInstance;
}

export function generateValidationErrorResponse(error: ValidationError): ErrorResponse;

export function generateValidationErrorResponse(
    constraint: ValidationConstraint,
    entity: string,
    property: string,
    description?: string,
): ErrorResponse;

export function generateValidationErrorResponse(
    errorOrConstraint: ValidationConstraint | ValidationError,
    entity?: string,
    property?: string,
    description?: string,
): ErrorResponse {
    let error: ValidationError;
    let constraint: ValidationConstraint | undefined;

    if (typeof errorOrConstraint === "string") {
        constraint = errorOrConstraint;
    } else {
        error = errorOrConstraint;
        if (error.constraints) {
            constraint = Object.keys(error.constraints)[0] as ValidationConstraint;
            // eslint-disable-next-line no-param-reassign
            entity = hichchiMetadata().getDtoMetaOfInstance(error.target)?.name;
            // eslint-disable-next-line no-param-reassign
            property = error.property;
        }
    }

    if (constraint && entity && property) {
        const handler = ValidationErrors[constraint];
        if (handler) {
            return handler(entity, property, description);
        }
    }

    return {
        statusCode: 400,
        code: `${toSnakeCase(entity || "error", true)}_400_${toSnakeCase(property, true)}`,
        message: `Something is wrong with the provided ${entity ? toLowerCaseBreak(entity) + " " : ""}${toLowerCaseBreak(property)}`,
        description,
    };
}

/**
 * Validation pipe exception factory.
 * This function is used to create a custom exception for the validation pipe.
 *
 * @param {ValidationError[]} errors The validation errors
 * @returns {BadRequestException} The custom exception
 *
 * @example
 * ```typescript
 * async function bootstrap(): Promise<void> {
 *     const app = await NestFactory.create(AppModule);
 *
 *     app.useGlobalPipes(
 *         new ValidationPipe({ exceptionFactory: validationPipeExceptionFactory }),
 *     );
 *
 *     await app.listen(3000);
 * }
 *
 * bootstrap();
 * ```
 */
export function validationPipeExceptionFactory(errors: ValidationError[]): BadRequestException {
    return new BadRequestException(generateValidationErrorResponse(errors[0]));
}
