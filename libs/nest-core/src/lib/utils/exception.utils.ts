/**
 * Filter and transform the exception to an error response as `ErrorResponse`
 * @param {unknown} exception Exception object
 * @param {Request} request Request object
 * @param {boolean} [logUnknown] Weather to log unknown errors
 * @returns {HttpException} HttpException object
 */
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
