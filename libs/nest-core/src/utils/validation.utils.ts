// noinspection JSUnusedGlobalSymbols

import { BadRequestException, Type } from "@nestjs/common";
import { toFirstCaseBreak, toLowerCaseBreak, toSnakeCase } from "@hichchi/utils";
import { validate, ValidationError } from "class-validator";
import { hichchiMetadata } from "../metadata";
import { ClassConstructor, plainToInstance } from "class-transformer";
import { ErrorResponse, HttpClientErrorStatus } from "@hichchi/nest-connector";

/**
 * Transform validation errors to a flattened array of error messages
 *
 * This helper function recursively extracts error messages from a ValidationError tree
 * and flattens them into a single array of strings. It handles nested validation errors
 * by recursively processing the children property of each ValidationError object.
 *
 * @param {ValidationError[]} validationErrors - The validation errors to transform
 * @param {string[]} [acc=[]] - Accumulated errors array (used for recursion)
 * @returns {string[]} A flattened array of error message strings
 *
 * @example
 * ```typescript
 * // Extract error messages from validation errors
 * const errors = transformErrors(validationResult);
 * // Returns ['Email must be a valid email', 'Password must be at least 8 characters']
 * ```
 *
 * @internal This is an internal helper function used by other validation utilities
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
 * Throw a bad request exception with validation error messages
 *
 * This function transforms validation errors into a flattened array of error messages
 * and throws a BadRequestException with these messages. It's useful for handling
 * validation failures in a consistent way across the application.
 *
 * @param {ValidationError[]} errors - The validation errors to process
 * @returns {never} This function never returns as it always throws an exception
 * @throws {BadRequestException} Always throws with the transformed error messages
 *
 * @example
 * ```typescript
 * // Validate input and throw if invalid
 * const errors = await validate(userDto);
 * if (errors.length > 0) {
 *   throwValidationErrors(errors);
 * }
 * ```
 *
 * @see {@link transformErrors} The helper function used to extract error messages
 * @see {@link BadRequestException} The exception type thrown by this function
 */
export function throwValidationErrors(errors: ValidationError[]): never {
    const errorMessages = transformErrors(errors);
    const errorObject = { statusCode: 400, message: errorMessages, error: "Bad Request" };
    throw new BadRequestException(errorObject, "Bad Request Exception");
}

/**
 * Validate a plain object against a DTO class using class-validator
 *
 * This function transforms a plain object into an instance of the specified DTO class
 * and validates it using class-validator. It can either throw an exception on validation
 * failure or return the validation errors, depending on the throwErrors parameter.
 *
 * The function uses plainToInstance from class-transformer to convert the plain object
 * to a class instance before validation, ensuring all class-validator decorators are applied.
 *
 * @template T - The DTO class type
 * @template V - The plain object type (defaults to object)
 * @template Thr - Boolean type for throwErrors parameter (for type inference)
 * @param {ClassConstructor<T>} dto - The DTO class to validate against
 * @param {V} obj - The plain object to validate
 * @param {boolean} [throwErrors=false] - Whether to throw exceptions on validation failure
 * @returns {Promise<T | ValidationError[]>} A promise that resolves to either:
 *   - The validated DTO instance (if validation succeeds)
 *   - An array of ValidationError objects (if validation fails and throwErrors is false)
 * @throws {BadRequestException} If validation fails and throwErrors is true
 *
 * @example
 * ```typescript
 * // Validate without throwing (returns errors or instance)
 * const result = await validateDto(CreateUserDto, requestBody);
 * if (Array.isArray(result)) {
 *   // Handle validation errors
 *   return { success: false, errors: result };
 * } else {
 *   // Use the validated DTO instance
 *   return userService.create(result);
 * }
 * ```
 *
 * @example
 * ```typescript
 * // Validate with automatic error throwing
 * try {
 *   const validatedDto = await validateDto(CreateUserDto, requestBody, true);
 *   return userService.create(validatedDto);
 * } catch (error) {
 *   // Handle the BadRequestException
 *   logger.error('Validation failed', error);
 *   throw error;
 * }
 * ```
 *
 * @see {@link plainToInstance} The class-transformer function used for object conversion
 * @see {@link validate} The class-validator function used for validation
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

/**
 * Generate a standardized error response from a validation error
 *
 * This function creates a standardized `ErrorResponse` object from a `ValidationError`.
 * It extracts information from the validation error and formats it into a consistent
 * structure with:
 * - A standardized status code (400 Bad Request)
 * - A machine-readable error code in snake_case format
 * - A human-readable error message with proper capitalization
 *
 * The function uses the Hichchi metadata system to get entity information for the
 * validated object, which helps create more descriptive error messages and codes.
 *
 * @param {ValidationError} error - The validation error to transform
 * @returns {ErrorResponse} A standardized error response object
 *
 * @example
 * ```typescript
 * // Generate an error response from a validation error
 * const errors = await validate(userDto);
 * if (errors.length > 0) {
 *   const errorResponse = generateValidationErrorResponse(errors[0]);
 *   // Returns something like:
 *   // {
 *   //   statusCode: 400,
 *   //   code: 'USER_400_NOT_EMAIL_EMAIL',
 *   //   message: 'User Email must be a valid email'
 *   // }
 *   throw new BadRequestException(errorResponse);
 * }
 * ```
 *
 * @see {@link ErrorResponse} The standardized error response structure
 * @see {@link hichchiMetadata} The metadata system used to get entity information
 */
export function generateValidationErrorResponse(error: ValidationError): ErrorResponse {
    const entity = hichchiMetadata().getDtoMetaOfInstance(error.target)?.name?.toUpperCase();

    const property = error.property;

    const errorMessage = error.constraints?.[Object.keys(error.constraints)[0]] ?? "";

    const message = errorMessage.startsWith(property)
        ? errorMessage.replace(property, `${entity ? `${toFirstCaseBreak(entity)} ` : ""}${toFirstCaseBreak(property)}`)
        : errorMessage.replace(property, toLowerCaseBreak(property));

    const constraint = error.constraints ? Object.keys(error.constraints)[0] : "";
    const errorCode = constraint.includes("isNot") ? constraint.replace("isNot", "") : constraint.replace("is", "not");

    return {
        statusCode: HttpClientErrorStatus.BAD_REQUEST,
        code:
            `${toSnakeCase(entity || "error", true)}` +
            `_${HttpClientErrorStatus.BAD_REQUEST}` +
            `_${toSnakeCase(errorCode, true)}` +
            `_${toSnakeCase(property, true)}`,
        message,
    };
}

/**
 * Custom exception factory for NestJS ValidationPipe
 *
 * This function creates a standardized BadRequestException from validation errors.
 * It's designed to be used as an exceptionFactory for NestJS ValidationPipe,
 * providing consistent error responses across the application.
 *
 * The function takes the first validation error from the array and passes it to
 * generateValidationErrorResponse to create a standardized error response structure.
 * This ensures that all validation errors returned by the API have a consistent format.
 *
 * @param {ValidationError[]} errors - The validation errors from ValidationPipe
 * @returns {BadRequestException} A BadRequestException with standardized error details
 *
 * @example
 * ```typescript
 * // In your bootstrap function or app module
 * import { ValidationPipe } from '@nestjs/common';
 * import { validationPipeExceptionFactory } from '@hichchi/nest-core';
 *
 * // Apply globally in bootstrap function
 * async function bootstrap(): Promise<void> {
 *   const app = await NestFactory.create(AppModule);
 *
 *   app.useGlobalPipes(
 *     new ValidationPipe({
 *       transform: true,
 *       whitelist: true,
 *       exceptionFactory: validationPipeExceptionFactory
 *     })
 *   );
 *
 *   await app.listen(3000);
 * }
 * ```
 *
 * @example
 * ```typescript
 * // Or in your AppModule
 * @Module({
 *   providers: [
 *     {
 *       provide: APP_PIPE,
 *       useFactory: () => new ValidationPipe({
 *         transform: true,
 *         whitelist: true,
 *         exceptionFactory: validationPipeExceptionFactory
 *       })
 *     }
 *   ]
 * })
 * export class AppModule {}
 * ```
 *
 * @see {@link generateValidationErrorResponse} The function used to create the error response
 */
export function validationPipeExceptionFactory(errors: ValidationError[]): BadRequestException {
    return new BadRequestException(generateValidationErrorResponse(errors[0]));
}
