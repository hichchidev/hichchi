// noinspection JSUnusedGlobalSymbols

import { TypeORMErrorType } from "../enums";
import { TypeORMError } from "typeorm";

/**
 * Exception for handling TypeORM database errors with enhanced details
 *
 * This exception extends TypeORM's base error class to provide additional
 * structured information about database errors. It captures detailed information
 * about the failed query, error codes, and error messages from the database driver,
 * making it easier to diagnose and handle database-related issues.
 *
 * The exception includes properties for:
 * - The SQL query that caused the error
 * - Query parameters
 * - Standardized error type (mapped to TypeORMErrorType enum)
 * - Database-specific error codes and messages
 *
 * This class is typically used internally by the repository layer to catch and
 * transform raw database errors into more structured exceptions that can be
 * handled appropriately by the application.
 *
 * @example
 * ```typescript
 * // Catching and handling a TypeORM error
 * try {
 *   await repository.save(entity);
 * } catch (error) {
 *   if (isTypeormException(error)) {
 *     // Handle specific database error types
 *     switch (error.code) {
 *       case TypeORMErrorType.ER_DUP_ENTRY:
 *         throw new ConflictException('A record with this identifier already exists');
 *       case TypeORMErrorType.ER_NO_REFERENCED_ROW_2:
 *         throw new BadRequestException('Referenced entity does not exist');
 *       default:
 *         // Log detailed error information for debugging
 *         logger.error('Database error', {
 *           message: error.sqlMessage,
 *           query: error.query,
 *           parameters: error.parameters
 *         });
 *         throw new InternalServerErrorException('Database operation failed');
 *     }
 *   }
 *   throw error;
 * }
 * ```
 *
 * @see {@link TypeORMErrorType} Enum of standardized database error types
 * @see {@link TypeORMError} The base TypeORM error class this extends
 */
export class TypeormException extends TypeORMError {
    /**
     * The SQL query that caused the error
     *
     * This property contains the raw SQL query string that was executed
     * and resulted in the database error.
     */
    query: string;

    /**
     * Parameters that were used in the query
     *
     * This array contains the parameter values that were bound to
     * the query when it was executed.
     */
    parameters: string[];

    /**
     * Raw driver error object from the database
     *
     * This object contains the original error details as reported by
     * the database driver, including database-specific error codes
     * and messages.
     */
    driverError: {
        code: string;
        errno: number;
        sqlState: string;
        sqlMessage: string;
        sql: string;
    };

    /**
     * Standardized error type
     *
     * This property contains a standardized error type from the TypeORMErrorType
     * enum, making it easier to handle specific types of database errors in a
     * database-agnostic way.
     */
    code: TypeORMErrorType;

    /**
     * Database-specific error number
     *
     * This property contains the numeric error code returned by the database.
     * The meaning of this code is specific to the database system being used.
     */
    errno: number;

    /**
     * SQL state code
     *
     * This property contains the SQLSTATE code for the error, which is a
     * standardized error code defined by the SQL standard.
     */
    sqlState: string;

    /**
     * Human-readable error message from the database
     *
     * This property contains the error message as reported by the database,
     * which typically provides a human-readable description of what went wrong.
     */
    sqlMessage: string;

    /**
     * SQL statement that caused the error
     *
     * This property contains the SQL statement that was being executed when
     * the error occurred, which may be different from the query property if
     * the error occurred in a trigger, stored procedure, or other database object.
     */
    sql: string;
}

/**
 * Type guard to check if an error is a TypeormException
 *
 * This function determines whether an unknown error object is an instance of
 * TypeormException by checking if it's a TypeORMError and has the sqlMessage
 * and code properties that are characteristic of TypeormException.
 *
 * Use this function to safely handle TypeormException objects in catch blocks
 * where the error type is unknown.
 *
 * @param {unknown} error - The error object to check
 * @returns {boolean} True if the error is a TypeormException, false otherwise
 *
 * @example
 * ```typescript
 * try {
 *   await repository.save(entity);
 * } catch (error) {
 *   if (isTypeormException(error)) {
 *     // Handle TypeORM database error
 *     console.error(`Database error: ${error.sqlMessage}`);
 *     // Take appropriate action based on error.code
 *   } else {
 *     // Handle other types of errors
 *     console.error('Unknown error:', error);
 *   }
 * }
 * ```
 *
 * @see {@link TypeormException} The exception class this function checks for
 */
export function isTypeormException(error: unknown): error is TypeormException {
    return error instanceof TypeORMError && "sqlMessage" in error && "code" in error;
}
