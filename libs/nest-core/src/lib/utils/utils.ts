// noinspection JSUnusedGlobalSymbols

import { isUUID } from "class-validator";
import { BadRequestException, HttpException, Logger } from "@nestjs/common";
import { Request } from "express";
import { applyTemplate } from "@hichchi/utils";
import { ErrorResponse, Errors } from "@hichchi/nest-connector";
import { AllExceptionsFilter } from "../filters";

/**
 * Check if the given id is a valid UUID or throw a bad request exception
 * @param {string} id UUID
 * @param {1|3|4|5} version UUID version
 */
export function checkUUID(id: string, version: 1 | 3 | 4 | 5 = 4): void {
    if (!isUUID(id, version)) {
        throw new BadRequestException(Errors.E_400_INVALID_UUID);
    }
}

/**
 * Check if the provided origin is allowed by checking against the allowed origins
 * @param {string} origin Origin to check
 * @param {string[]} allowedOrigins Array of allowed origins
 * @returns {boolean} `true` if the origin is allowed otherwise `false`
 */
export function isOriginAllowed(origin: string, allowedOrigins: string[]): boolean {
    return allowedOrigins.some(allowedOrigin => {
        if (allowedOrigin.includes("*")) {
            const regex = new RegExp("^" + allowedOrigin.replace(/\./g, "\\.").replace("*", ".*") + "$");
            return regex.test(origin);
        }
        return allowedOrigin === origin;
    });
}

/**
 * Filter and transform the exception to an error response as `ErrorResponse`
 * @param {unknown} exception Exception object
 * @param {Request} request Request object
 * @param {boolean} [logUnknown] Weather to log unknown errors
 * @returns {HttpException} HttpException object
 */

export function httpExceptionFilter(exception: unknown, request: Request, logUnknown?: boolean): HttpException {
    try {
        const [, prefix] = request
            ? (request.url.replace(/\/?v\d+/, "").split("/") as [string, string, string])
            : [undefined, undefined, undefined];

        if (exception instanceof HttpException) {
            const res = exception.getResponse() as ErrorResponse;
            if (res.code && res.message) {
                return new HttpException(
                    {
                        statusCode: res.statusCode || Errors.ERROR.statusCode,
                        code: prefix ? applyTemplate(res.code, prefix) : Errors.ERROR.code,
                        message: prefix ? applyTemplate(res.message, prefix) : Errors.ERROR.message,
                        description: res.description,
                    } as ErrorResponse,
                    res.statusCode || Errors.ERROR.statusCode,
                );
            }
        }

        if (logUnknown) Logger.error(exception, null, AllExceptionsFilter.name);

        return new HttpException(
            {
                statusCode: Errors.ERROR.statusCode,
                code: Errors.ERROR.code,
                message: Errors.ERROR.message,
            } as ErrorResponse,
            Errors.ERROR.statusCode,
        );
    } catch {
        if (logUnknown) Logger.error(exception, null, AllExceptionsFilter.name);

        return new HttpException(
            {
                statusCode: Errors.ERROR.statusCode,
                code: Errors.ERROR.code,
                message: Errors.ERROR.message,
            } as ErrorResponse,
            Errors.ERROR.statusCode,
        );
    }
}

/**
 * Extract subdomain from the origin
 *
 * @example
 * ```typescript
 * extractSubdomain("example.com", "admin.example.com", "local")
 *
 * // Returns "admin"
 * ```
 *
 * @example
 * ```typescript
 * extractSubdomain("example.com", "localhost:3000", "local")
 *
 * // Returns "local"
 * ```
 *
 * @param {string} splitDomain Domain to split the url to get the subdomain
 * @param {string} origin Origin to extract the subdomain from
 * @param {string} ifLocalhost String to return as subdomain if the domain is localhost
 * @returns {string|undefined} the extracted subdomain or provided string if the domain is localhost, otherwise returns `undefined`
 */
export function extractSubdomain(splitDomain: string, origin?: string, ifLocalhost?: string): string | undefined {
    if (origin) {
        const parts = origin.split(RegExp(`http://|https://|\\.|${splitDomain}`));
        return parts?.[1] ? (parts[1].includes("localhost") ? ifLocalhost : parts[1]) : undefined;
    }
    return undefined;
}
