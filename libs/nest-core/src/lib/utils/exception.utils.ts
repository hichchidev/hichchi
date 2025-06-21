/**
 * Filter and transform the exception to an error response as `ErrorResponse`
 * @param {unknown} exception Exception object
 * @param {Request} request Request object
 * @param {boolean} [logUnknown] Weather to log unknown errors
 * @returns {HttpException} HttpException object
 */
import { Request } from "express";
import { HttpException } from "@nestjs/common";
import { ErrorResponse, Errors } from "@hichchi/nest-connector";
import { AllExceptionsFilter } from "../filters";
import { LoggerService } from "../services";

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

    return new HttpException(
        {
            statusCode: Errors.ERROR.statusCode,
            code: Errors.ERROR.code,
            message: Errors.ERROR.message,
        } as ErrorResponse,
        Errors.ERROR.statusCode,
    );
}
