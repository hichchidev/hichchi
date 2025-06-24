import { Request } from "express";
import { HttpException } from "@nestjs/common";
import {
    CommonErrorResponseCode,
    ErrorResponse,
    Errors,
    HttpClientErrorStatus,
    HttpServerErrorStatus,
} from "@hichchi/nest-connector";
import { AllExceptionsFilter } from "../filters";
import { LoggerService } from "../services";

/**
 * Filter and transform exceptions into standardized HttpException objects
 *
 * This utility function processes exceptions and converts them into standardized
 * HttpException objects with consistent error response formats. It's primarily used
 * by the AllExceptionsFilter to ensure all errors returned by the API follow a
 * consistent structure.
 *
 * The function handles different types of exceptions:
 * 1. If the exception is already an HttpException with a properly formatted response,
 *    it preserves the original error details but ensures all required fields are present
 * 2. For other HttpExceptions, it maps the status code to an appropriate error response
 * 3. For unknown exceptions, it creates a generic error response
 *
 * When logUnknown is true, unknown exceptions are logged using the LoggerService
 *
 * @example
 * ```typescript
 * // In an exception filter
 * catch(exception: unknown, host: ArgumentsHost): void {
 *   const ctx = host.switchToHttp();
 *   const request = ctx.getRequest<Request>();
 *
 *   // Convert the exception to a standardized HttpException
 *   const httpException = httpExceptionFilter(exception, request, true);
 *
 *   // Handle the standardized exception
 *   super.catch(httpException, host);
 * }
 * ```
 *
 * @param {unknown} exception - The exception object to process
 * @param {Request} _request - The HTTP request object
 * @param {boolean} [logUnknown] - Whether to log unknown exceptions
 * @returns {HttpException} A standardized HttpException object
 *
 * @see {@link AllExceptionsFilter} The filter that uses this utility
 * @see {@link ErrorResponse} The standardized error response structure
 */
export function httpExceptionFilter(exception: unknown, _request: Request, logUnknown?: boolean): HttpException {
    try {
        if (exception instanceof HttpException) {
            const res = exception.getResponse() as ErrorResponse;
            if (res.code && res.message) {
                return new HttpException(
                    {
                        statusCode: res.statusCode || Errors.ERROR.statusCode,
                        code: res.code || Errors.ERROR.code,
                        message: res.message || Errors.ERROR.message,
                        description: res.description,
                    } as ErrorResponse,
                    res.statusCode || Errors.ERROR.statusCode,
                );
            }
        }
    } catch {
        /* Skipped */
    }

    if (logUnknown) LoggerService.error(exception, null, AllExceptionsFilter.name);

    if (exception instanceof HttpException) {
        return new HttpException(
            Errors[
                exception.getStatus() === HttpClientErrorStatus.BAD_REQUEST
                    ? CommonErrorResponseCode.ERROR_400
                    : exception.getStatus() === HttpClientErrorStatus.UNAUTHORIZED
                      ? CommonErrorResponseCode.ERROR_401
                      : exception.getStatus() === HttpClientErrorStatus.FORBIDDEN
                        ? CommonErrorResponseCode.ERROR_403
                        : exception.getStatus() === HttpClientErrorStatus.NOT_FOUND
                          ? CommonErrorResponseCode.ERROR_404
                          : CommonErrorResponseCode.ERROR_500
            ],
            [
                HttpClientErrorStatus.BAD_REQUEST,
                HttpClientErrorStatus.UNAUTHORIZED,
                HttpClientErrorStatus.FORBIDDEN,
                HttpClientErrorStatus.NOT_FOUND,
            ].includes(exception.getStatus())
                ? exception.getStatus()
                : HttpServerErrorStatus.INTERNAL_SERVER_ERROR,
        );
    }

    return new HttpException(Errors.ERROR, Errors.ERROR.statusCode);
}
