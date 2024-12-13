/* eslint-disable @typescript-eslint/no-explicit-any */
// noinspection JSUnusedGlobalSymbols

import { isUUID } from "class-validator";
import { BadRequestException } from "@nestjs/common";
import { Errors } from "../responses";
import { EntityErrorResponse } from "../interfaces";
import { toErrorObject } from "../converters";
import { LoggerService } from "../services";
import { Request } from "express";
import { applyTemplate } from "@hichchi/utils";

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
 * Filter and transform the exception to an error response as `IEntityErrorResponse`
 * @param {any} exception Exception object
 * @param {Request} request Request object
 * @param {boolean} logUnknown Weather to log unknown errors
 * @returns {*} Exception object
 */
export function httpExceptionFilter(exception: any, request?: Request, logUnknown?: boolean): any {
    const ex: any = exception;
    try {
        const [, prefix] = request
            ? (request.url.replace(/\/?v\d+/, "").split("/") as [string, string, string])
            : [undefined, "ERROR", undefined];

        let errObj = { ...(ex.response || {}) } as Partial<EntityErrorResponse>;
        if (ex.response && ex.response.statusCode && Array.isArray(ex.response.message)) {
            errObj = toErrorObject(ex.response.message[0]) || {};
        }
        ex.response = {
            status: errObj.status || Errors.ERROR.status,
            code: errObj.code ? applyTemplate(errObj.code, prefix) : Errors.ERROR.code,
            message: errObj.message ? applyTemplate(errObj.message, prefix) : Errors.ERROR.message,
            description: errObj.description,
        } as EntityErrorResponse;
    } catch {
        if (logUnknown) LoggerService.error(ex, "HttpException: Unknown Error");
        try {
            const message = ex.response?.message || ex.message || ex.response;
            ex.response = {
                status: ex.status || Errors.ERROR.status,
                code: Errors.ERROR.code,
                message: (Array.isArray(message) ? message[0] : message) || Errors.ERROR.message,
            };
        } catch {
            ex.response = {
                status: Errors.ERROR.status,
                code: Errors.ERROR.code,
                message: Errors.ERROR.message,
            };
        }
    }
    return ex;
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
