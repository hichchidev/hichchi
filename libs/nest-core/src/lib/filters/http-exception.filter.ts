// noinspection JSUnusedGlobalSymbols

import { ArgumentsHost, Catch } from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";
import { Request } from "express";
import { httpExceptionFilter } from "../utils";

/**
 * Global exception filter that standardizes error responses
 *
 * This filter catches all unhandled exceptions in the application and transforms them
 * into standardized error responses. It extends NestJS's BaseExceptionFilter and uses
 * the httpExceptionFilter utility to process exceptions before passing them to the
 * parent filter.
 *
 * The filter ensures that all error responses follow a consistent format with:
 * - Appropriate HTTP status codes
 * - Standardized error codes
 * - Clear error messages
 * - Optional detailed descriptions
 *
 * When registered as a global filter, it will catch exceptions from all routes and
 * controllers in the application, providing a centralized error handling mechanism.
 *
 * @example
 * ```TypeScript
 * // Register as a global filter in your bootstrap function
 * async function bootstrap(): Promise<void> {
 *     const app = await NestFactory.create(AppModule);
 *
 *     const { httpAdapter } = app.get(HttpAdapterHost);
 *     app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
 *
 *     await app.listen(3000);
 * }
 * bootstrap();
 * ```
 *
 * @see {@link httpExceptionFilter} The utility function that processes exceptions
 * @see {@link ErrorResponse} The standardized error response structure
 */
@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
    /**
     * Catches and processes exceptions
     *
     * This method overrides the catch method from BaseExceptionFilter to process
     * exceptions using the httpExceptionFilter utility before passing them to the
     * parent class's catch method. It extracts the HTTP request from the host and
     * enables logging of unknown exceptions.
     *
     * The method performs the following steps:
     * 1. Extracts the HTTP request from the ArgumentsHost
     * 2. Passes the exception, request, and true (to enable logging) to httpExceptionFilter
     * 3. Passes the processed exception to the parent class's catch method
     *
     * @param {unknown} exception - The exception object thrown in the application
     * @param {ArgumentsHost} host - The arguments host object containing the execution context
     * @returns {void}
     *
     * @see {@link httpExceptionFilter} The utility function that processes exceptions
     * @see {@link BaseExceptionFilter.catch} The parent class's catch method
     */
    override catch(exception: unknown, host: ArgumentsHost): void {
        super.catch(httpExceptionFilter(exception, host.switchToHttp().getRequest<Request>(), true), host);
    }
}
