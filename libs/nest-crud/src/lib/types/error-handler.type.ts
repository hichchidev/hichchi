/**
 * A function type for custom TypeORM error handling.
 *
 * This type defines a function signature for handlers that process errors thrown
 * by TypeORM operations. It provides a standardized way to intercept, transform,
 * and customize error responses for database operations throughout the application.
 *
 * The handler receives the original error (which may be a TypeError or any other
 * exception thrown during database operations) and can either:
 * - Return a new Error instance to replace the original error
 * - Return void to let the original error propagate unchanged
 * - Throw a new error to immediately stop execution
 *
 * This pattern allows for consistent error handling, logging, and transformation
 * across different repositories and services that interact with the database.
 *
 * @param err - The original error thrown by TypeORM or related database operations
 * @returns Either a new Error instance to replace the original, or void to let the original error propagate
 *
 * @remarks
 * Common use cases include:
 * - Transforming database-specific errors into application-specific exceptions
 * - Adding additional context or metadata to errors
 * - Handling specific error types differently (e.g., unique constraint violations)
 * - Logging or monitoring database errors with additional context
 * - Normalizing error messages for consistent API responses
 *
 * @example
 * ```typescript
 * // Basic error handler that transforms TypeORM errors into application errors
 * const errorHandler: TypeORMErrorHandler = (err) => {
 *   // Handle unique constraint violations
 *   if (err instanceof QueryFailedError && err.message.includes('Duplicate entry')) {
 *     return new ConflictException('A record with this data already exists');
 *   }
 *
 *   // Log the error for debugging
 *   console.error('Database operation failed:', err);
 *
 *   // Return a generic error for other cases
 *   return new InternalServerErrorException('Database operation failed');
 * };
 *
 * // Using the error handler in a repository
 * try {
 *   await this.repository.save(entity);
 * } catch (error) {
 *   const handledError = errorHandler(error);
 *   if (handledError) throw handledError;
 *   throw error;
 * }
 * ```
 */
export type TypeORMErrorHandler = (error: TypeError | unknown) => Error | void;
