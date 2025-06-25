import { BadRequestException, ConflictException, HttpException, InternalServerErrorException } from "@nestjs/common";
import { Operation, TypeORMErrorType } from "../enums";
import { CrudErrorResponses, CrudSuccessResponses } from "../responses";
import { SuccessResponse } from "@hichchi/nest-connector";
import { isTypeormException } from "../exceptions";
import { EntityPropertyNotFoundError } from "typeorm";
import { EXTRACT_INVALID_COLUMN_REGEX, EXTRACT_INVALID_QUERY_FIELD_REGEX } from "../constants";
import { LoggerService } from "@hichchi/nest-core";

/**
 * Utility class for handling entity-related operations and errors
 *
 * This class provides utility methods for handling TypeORM errors and generating
 * standardized success responses for CRUD operations. It centralizes error handling
 * logic to ensure consistent error responses across the application.
 *
 * Key features:
 * - Detailed error handling for TypeORM-specific errors
 * - Automatic extraction of field names from error messages
 * - Conversion of database errors to appropriate HTTP exceptions
 * - Standardized success responses for CRUD operations
 * - Consistent logging of errors
 *
 * The class is designed to be used statically and does not require instantiation.
 *
 * @example
 * ```typescript
 * // Error handling in a service method
 * try {
 *   await this.repository.save(entity);
 * } catch (error) {
 *   EntityUtils.handleError(error, 'User', ['email', 'username']);
 * }
 * ```
 *
 * @example
 * ```typescript
 * // Success response generation
 * @Post()
 * async create(@Body() dto: CreateUserDto): Promise<SuccessResponse> {
 *   await this.userService.create(dto);
 *   return EntityUtils.handleSuccess('User', Operation.CREATE);
 * }
 * ```
 *
 * @see {@link CrudErrorResponses} For standardized error response formats
 * @see {@link CrudSuccessResponses} For standardized success response formats
 * @see {@link Operation} For available operation types
 * @see {@link isTypeormException} For TypeORM exception detection
 */
export class EntityUtils {
    /**
     * Handle TypeORM errors
     *
     * This method handles TypeORM errors and throws appropriate HTTP exceptions based on
     * the error type. It extracts relevant information from the error message and includes
     * it in the response for better client-side error handling.
     *
     * The method handles several specific TypeORM error types:
     * - EntityPropertyNotFoundError: When a query references a non-existent property
     * - ER_NO_DEFAULT_FOR_FIELD: When a required field is missing
     * - ER_DUP_ENTRY: When a unique constraint is violated
     * - ER_NO_REFERENCED_ROW_2: When a foreign key constraint is violated
     * - ER_BAD_FIELD_ERROR: When a query references a non-existent column
     *
     * For other errors, it logs the error and throws an InternalServerErrorException.
     *
     * @param {unknown} error - The error instance to handle
     * @param {string} entityName - The name of the entity being operated on
     * @param {string[]} [uniqueFieldNames] - Optional array of field names with unique constraints
     * @throws {HttpException} - An appropriate HTTP exception based on the error type
     *
     * @example
     * ```typescript
     * try {
     *   await this.userRepository.save(user);
     * } catch (error) {
     *   EntityUtils.handleError(error, 'User', ['email', 'username']);
     * }
     * ```
     *
     * @see {@link BadRequestException} For 400 errors
     * @see {@link ConflictException} For 409 errors
     * @see {@link InternalServerErrorException} For 500 errors
     * @see {@link CrudErrorResponses} For standardized error response formats
     */
    public static handleError(error: unknown, entityName: string, uniqueFieldNames?: string[]): never {
        if (error instanceof HttpException) {
            throw error;
        }

        if (error instanceof EntityPropertyNotFoundError) {
            const field = EXTRACT_INVALID_QUERY_FIELD_REGEX.exec(error.message)
                ? error.message.split(EXTRACT_INVALID_QUERY_FIELD_REGEX)[1]
                : undefined;
            throw new BadRequestException(CrudErrorResponses.E_400_QUERY(entityName, field, error.message));
        } else if (isTypeormException(error)) {
            switch (error.code) {
                case TypeORMErrorType.ER_NO_DEFAULT_FOR_FIELD: {
                    const field = error.sqlMessage.split("'")[1];
                    throw new BadRequestException(
                        CrudErrorResponses.E_400_NO_DEFAULT(entityName, field, error.sqlMessage ?? error.message),
                    );
                }
                case TypeORMErrorType.ER_DUP_ENTRY: {
                    const unique: string = error.sqlMessage
                        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
                        .split(/(for key )/)?.[2]
                        ?.replace(/'/g, "")
                        ?.split(".")?.[1];

                    if (unique) {
                        const [, entityName, uniqueFieldName] = unique.split("_");
                        if (entityName && uniqueFieldName) {
                            throw new ConflictException(
                                CrudErrorResponses.E_409_EXIST_U(
                                    entityName,
                                    [uniqueFieldName],
                                    error.sqlMessage ?? error.message,
                                ),
                            );
                        }
                    }
                    throw new ConflictException(
                        CrudErrorResponses.E_409_EXIST_U(
                            entityName,
                            uniqueFieldNames || [],
                            error.sqlMessage ?? error.message,
                        ),
                    );
                }
                case TypeORMErrorType.ER_NO_REFERENCED_ROW_2: {
                    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
                    const fk = error.sqlMessage.split(/(CONSTRAINT `|` FOREIGN KEY)/)?.[2];
                    if (fk) {
                        const [, entityName, relationName] = fk.split("_");
                        if (entityName && relationName) {
                            throw new BadRequestException(
                                CrudErrorResponses.E_404_RELATION(
                                    entityName,
                                    relationName,
                                    error.sqlMessage ?? error.message,
                                ),
                            );
                        }
                    }
                    throw new InternalServerErrorException(CrudErrorResponses.E_500(error.sqlMessage ?? error.message));
                }
                case TypeORMErrorType.ER_BAD_FIELD_ERROR: {
                    LoggerService.error(error, EntityUtils.name);
                    const field = EXTRACT_INVALID_COLUMN_REGEX.exec(error.message)
                        ? error.message.split(EXTRACT_INVALID_COLUMN_REGEX)[1]
                        : undefined;
                    throw new BadRequestException(
                        CrudErrorResponses.E_400_QUERY(entityName, field, error.sqlMessage ?? error.message),
                    );
                }
                default:
                    LoggerService.error(error, EntityUtils.name);
                    throw new InternalServerErrorException(CrudErrorResponses.E_500(error.sqlMessage ?? error.message));
            }
        } else if (error instanceof Error) {
            LoggerService.error(error, EntityUtils.name);
            throw new InternalServerErrorException(CrudErrorResponses.E_500(error.message));
        }

        LoggerService.error(error, EntityUtils.name);
        throw new InternalServerErrorException(CrudErrorResponses.E_500());
    }

    /**
     * Handle success responses for CRUD operations
     *
     * This method generates standardized success responses based on the operation type
     * and entity name. It ensures consistent success message formatting across the application.
     *
     * The method supports the following operation types:
     * - CREATE: For entity creation operations
     * - UPDATE: For entity update operations
     * - SAVE: For entity save operations (create or update)
     * - DELETE: For entity deletion operations
     * - undefined: For general success responses
     *
     * @param {string} entityName - The name of the entity being operated on
     * @param {Operation} [operation] - Optional operation type to determine the success message format
     * @returns {SuccessResponse} A standardized success response object
     *
     * @example
     * ```typescript
     * // In a controller method
     * @Post()
     * async create(@Body() dto: CreateUserDto): Promise<SuccessResponse> {
     *   await this.userService.create(dto);
     *   return EntityUtils.handleSuccess('User', Operation.CREATE);
     * }
     * ```
     *
     * @example
     * ```typescript
     * // In a service method
     * async updateUser(id: string, dto: UpdateUserDto): Promise<SuccessResponse> {
     *   await this.repository.update(id, dto);
     *   return EntityUtils.handleSuccess('User', Operation.UPDATE);
     * }
     * ```
     *
     * @see {@link Operation} For available operation types
     * @see {@link CrudSuccessResponses} For standardized success response formats
     * @see {@link SuccessResponse} For the response object structure
     */
    public static handleSuccess(entityName: string, operation?: Operation): SuccessResponse {
        switch (operation) {
            case Operation.CREATE:
                return CrudSuccessResponses.CREATED(entityName);
            case Operation.UPDATE:
                return CrudSuccessResponses.UPDATE(entityName);
            case Operation.SAVE:
                return CrudSuccessResponses.SAVE(entityName);
            case Operation.DELETE:
                return CrudSuccessResponses.DELETE(entityName);
            case undefined:
                return CrudSuccessResponses.SUCCESS();
        }
    }
}
