// noinspection JSUnusedGlobalSymbols

import { toFirstCaseBreak, toLowerCaseBreak, toSentenceCase, toSnakeCase } from "@hichchi/utils";
import { Operation } from "../enums";
import {
    ErrorResponse,
    HttpClientErrorStatus as ClientError,
    HttpServerErrorStatus as ServerError,
} from "@hichchi/nest-connector";

/**
 * Standardized error responses for CRUD operations
 *
 * This object provides a collection of standardized error response factories for
 * common error scenarios in CRUD operations. Each method creates an ErrorResponse
 * with consistent formatting for status codes, error codes, and messages.
 *
 * The error responses follow a consistent pattern:
 * - Status codes use standard HTTP error codes (4xx for client errors, 5xx for server errors)
 * - Error codes follow the format `ENTITY_STATUS_REASON` in snake_case
 * - Messages are human-readable descriptions of the error
 * - Optional descriptions provide additional context
 *
 * These standardized responses help ensure consistent error handling across
 * the application and provide clear, actionable information to API clients.
 *
 * @example
 * ```typescript
 * // In a service or controller
 * if (!entity) {
 *   throw new NotFoundException(CrudErrorResponses.E_404_ID('user'));
 * }
 * ```
 *
 * @see {@link ErrorResponse} The error response structure
 * @see {@link Operation} Enum of CRUD operations
 */
const CrudErrorResponses = {
    /**
     * Error response for missing default value for a field
     *
     * This error occurs when trying to insert a row without providing a value for a field
     * that has no default value defined in the database schema. It corresponds to the
     * TypeORMErrorType.ER_NO_DEFAULT_FOR_FIELD error.
     *
     * @param {string} entityName - The name of the entity (e.g., 'user', 'product')
     * @param {string} field - The name of the field missing a default value
     * @param {string} [description] - Optional additional context or details
     * @returns {ErrorResponse} A formatted error response object
     *
     * @example
     * ```typescript
     * throw new BadRequestException(
     *   CrudErrorResponses.E_400_NO_DEFAULT('user', 'email')
     * );
     * ```
     */
    E_400_NO_DEFAULT: (entityName: string, field: string, description?: string): ErrorResponse => ({
        statusCode: ClientError.BAD_REQUEST,
        code: `${toSnakeCase(entityName, true)}_${ClientError.BAD_REQUEST}_NO_DEFAULT_${toSnakeCase(field, true)}`,
        message: `No default value for ${toLowerCaseBreak(entityName)} ${toLowerCaseBreak(field)}!`,
        description,
    }),

    /**
     * Error response for invalid entity ID format
     *
     * This error occurs when an ID provided for an entity is not in the expected
     * UUID format. It's typically used for validation errors in request parameters.
     *
     * @param {string} entityName - The name of the entity (e.g., 'user', 'product')
     * @param {string} [description] - Optional additional context or details
     * @returns {ErrorResponse} A formatted error response object
     *
     * @example
     * ```typescript
     * if (!isUUID(id)) {
     *   throw new BadRequestException(
     *     CrudErrorResponses.E_400_INVALID_ID('user')
     *   );
     * }
     * ```
     */
    E_400_INVALID_ID: (entityName: string, description?: string): ErrorResponse => ({
        statusCode: ClientError.BAD_REQUEST,
        code: `${toSnakeCase(entityName, true)}_${ClientError.BAD_REQUEST}_INVALID_ID`,
        message: `Invalid ${toLowerCaseBreak(entityName)} id!, Id must be a UUID!`,
        description,
    }),

    /**
     * Error response for invalid query field
     *
     * This error occurs when a query references a field that doesn't exist in the entity.
     * It corresponds to the TypeORMErrorType.ER_BAD_FIELD_ERROR error and is typically
     * used for validation errors in filter, search, or sort parameters.
     *
     * @param {string} entityName - The name of the entity (e.g., 'user', 'product')
     * @param {string} [field] - The name of the invalid field (if known)
     * @param {string} [description] - Optional additional context or details
     * @returns {ErrorResponse} A formatted error response object
     *
     * @example
     * ```typescript
     * try {
     *   return await this.repository.findOne({ where: { [field]: value } });
     * } catch (error) {
     *   if (isTypeormException(error) && error.code === TypeORMErrorType.ER_BAD_FIELD_ERROR) {
     *     throw new BadRequestException(
     *       CrudErrorResponses.E_400_QUERY('user', field)
     *     );
     *   }
     *   throw error;
     * }
     * ```
     */
    E_400_QUERY: (entityName: string, field?: string, description?: string): ErrorResponse => ({
        statusCode: ClientError.BAD_REQUEST,
        code: `${toSnakeCase(entityName, true)}_${ClientError.BAD_REQUEST}_QUERY`,
        message: `Cannot find ${field ? `field with name '${field}'` : "a field provided as a filter or search"} in ${toLowerCaseBreak(entityName)}!`,
        description,
    }),
    /**
     * Error response for empty required field values
     *
     * This error occurs when a required field is provided as empty during
     * request validation. It's commonly used in create and update operations
     * where specific fields must contain a non-empty value.
     *
     * @param {string} entityName - The name of the entity (e.g., 'user', 'product')
     * @param {string} [field] - The name of the field that must not be empty
     * @param {string} [description] - Optional additional context or details
     * @returns {ErrorResponse} A formatted error response object
     *
     * @example
     * ```typescript
     * if (!dto.name?.trim()) {
     *   throw new BadRequestException(
     *     CrudErrorResponses.E_400_EMPTY('user', 'name')
     *   );
     * }
     * ```
     */
    E_400_EMPTY: (entityName: string, field: string, description?: string): ErrorResponse => ({
        statusCode: ClientError.BAD_REQUEST,
        code: `${toSnakeCase(entityName, true)}_${ClientError.BAD_REQUEST}_EMPTY_${toSnakeCase(field, true)}`,
        message: `${toFirstCaseBreak(entityName)} ${toLowerCaseBreak(field)} should not be empty!`,
        description,
    }),
    /**
     * Error response for entity not found by ID
     *
     * This error occurs when trying to retrieve, update, or delete an entity with
     * an ID that doesn't exist in the database. It's commonly used in CRUD operations
     * that operate on a specific entity by ID.
     *
     * @param {string} entityName - The name of the entity (e.g., 'user', 'product')
     * @param {string} [description] - Optional additional context or details
     * @returns {ErrorResponse} A formatted error response object
     *
     * @example
     * ```typescript
     * const entity = await this.repository.findOne(id);
     * if (!entity) {
     *   throw new NotFoundException(
     *     CrudErrorResponses.E_404_ID('user')
     *   );
     * }
     * ```
     */
    E_404_ID: (entityName: string, description?: string): ErrorResponse => ({
        statusCode: ClientError.NOT_FOUND,
        code: `${toSnakeCase(entityName, true)}_${ClientError.NOT_FOUND}_ID`,
        message: `Cannot find a ${toLowerCaseBreak(entityName)} with given id!`,
        description,
    }),

    /**
     * Error response for related entity not found by ID
     *
     * This error occurs when trying to establish a relationship with an entity
     * that doesn't exist in the database. It corresponds to the
     * TypeORMErrorType.ER_NO_REFERENCED_ROW_2 error and is used when a foreign
     * key constraint fails.
     *
     * @param {string} entityName - The name of the primary entity (e.g., 'user', 'product')
     * @param {string} relationName - The name of the related entity (e.g., 'role', 'category')
     * @param {string} [description] - Optional additional context or details
     * @returns {ErrorResponse} A formatted error response object
     *
     * @example
     * ```typescript
     * try {
     *   return await this.repository.save({ ...dto, roleId });
     * } catch (error) {
     *   if (isTypeormException(error) && error.code === TypeORMErrorType.ER_NO_REFERENCED_ROW_2) {
     *     throw new NotFoundException(
     *       CrudErrorResponses.E_404_RELATION('user', 'role')
     *     );
     *   }
     *   throw error;
     * }
     * ```
     */
    E_404_RELATION: (entityName: string, relationName: string, description?: string): ErrorResponse => ({
        statusCode: ClientError.NOT_FOUND,
        code: `${toSnakeCase(entityName, true)}_${ClientError.NOT_FOUND}_${relationName.toUpperCase()}_ID`,
        description,
        message: `Cannot find a ${relationName.toLowerCase()} with given id!`,
    }),

    /**
     * Error response for entity not found by condition
     *
     * This error occurs when trying to retrieve an entity using a specific
     * condition (other than ID) that doesn't match any records in the database.
     * It's commonly used in custom query operations.
     *
     * @param {string} entityName - The name of the entity (e.g., 'user', 'product')
     * @param {string} [description] - Optional additional context or details
     * @returns {ErrorResponse} A formatted error response object
     *
     * @example
     * ```typescript
     * const entity = await this.repository.findOne({ where: { email } });
     * if (!entity) {
     *   throw new NotFoundException(
     *     CrudErrorResponses.E_404_CONDITION('user', `User with email ${email} not found`)
     *   );
     * }
     * ```
     */
    E_404_CONDITION: (entityName: string, description?: string): ErrorResponse => ({
        statusCode: ClientError.NOT_FOUND,
        code: `${toSnakeCase(entityName, true)}_${ClientError.NOT_FOUND}_CONDITION`,
        message: `Cannot find a ${toLowerCaseBreak(entityName)} with given condition!`,
        description,
    }),
    /**
     * Error response for unique constraint violation
     *
     * This error occurs when trying to insert or update an entity with values that
     * violate a unique constraint in the database. It corresponds to the
     * TypeORMErrorType.ER_DUP_ENTRY error and is used to provide a clear message
     * about which unique fields are causing the conflict.
     *
     * @param {string} entityName - The name of the entity (e.g., 'user', 'product')
     * @param {string[]} unique - Array of field names that form the unique constraint
     * @param {string} [description] - Optional additional context or details
     * @returns {ErrorResponse} A formatted error response object
     *
     * @example
     * ```typescript
     * try {
     *   return await this.repository.save(newUser);
     * } catch (error) {
     *   if (isTypeormException(error) && error.code === TypeORMErrorType.ER_DUP_ENTRY) {
     *     throw new ConflictException(
     *       CrudErrorResponses.E_409_EXIST_U('user', ['email'])
     *     );
     *   }
     *   throw error;
     * }
     * ```
     */
    E_409_EXIST_U: (entityName: string, unique: string[], description?: string): ErrorResponse => ({
        statusCode: ClientError.CONFLICT,
        code: `${toSnakeCase(entityName, true)}_${ClientError.CONFLICT}_EXIST_${toSnakeCase(unique.join("_"), true)}`,
        message: `${toSentenceCase(entityName)} with given ${unique.map(u => toLowerCaseBreak(u, " ")).join(" or ")} already exists!`,
        description,
    }),

    /**
     * Error response for unexpected error during a CRUD operation
     *
     * This error is used as a fallback for unexpected errors that occur during
     * specific CRUD operations. It provides context about which entity and
     * operation were being performed when the error occurred.
     *
     * @param {string} entityName - The name of the entity (e.g., 'user', 'product')
     * @param {Operation} operation - The CRUD operation being performed (CREATE, UPDATE, SAVE, DELETE)
     * @param {string} [description] - Optional additional context or details
     * @returns {ErrorResponse} A formatted error response object
     *
     * @example
     * ```typescript
     * try {
     *   return await this.repository.save(entity);
     * } catch (error) {
     *   this.logger.error('Failed to save entity', error);
     *   throw new InternalServerErrorException(
     *     CrudErrorResponses.E_500_OPERATION('user', Operation.SAVE)
     *   );
     * }
     * ```
     *
     * @see {@link Operation} Enum of CRUD operations
     */
    E_500_OPERATION: (entityName: string, operation: Operation, description?: string): ErrorResponse => ({
        statusCode: ServerError.INTERNAL_SERVER_ERROR,
        code: `${toSnakeCase(entityName, true)}_${ServerError.INTERNAL_SERVER_ERROR}_${toSnakeCase(operation, true)}`,
        message: `Unexpected error occurred while ${toLowerCaseBreak(operation)} ${toLowerCaseBreak(entityName)}!`,
        description,
    }),

    /**
     * Generic error response for unexpected errors
     *
     * This error is used as a fallback for unexpected errors that don't fit into
     * any of the more specific error categories. It provides a generic error message
     * that can be customized with an optional description.
     *
     * @param {string} [description] - Optional additional context or details
     * @returns {ErrorResponse} A formatted error response object
     *
     * @example
     * ```typescript
     * try {
     *   // Some complex operation
     * } catch (error) {
     *   this.logger.error('Unexpected error', error);
     *   throw new InternalServerErrorException(
     *     CrudErrorResponses.E_500('An unexpected error occurred while processing your request')
     *   );
     * }
     * ```
     */
    E_500: (description?: string): ErrorResponse => ({
        statusCode: ServerError.INTERNAL_SERVER_ERROR,
        code: `E_${ServerError.INTERNAL_SERVER_ERROR}_ERROR`,
        message: "Unexpected error occurred!",
        description,
    }),
};

export { CrudErrorResponses };
