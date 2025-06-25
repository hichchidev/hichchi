// noinspection JSUnusedGlobalSymbols

import { toJSON, toString } from "./json.converter";
import { ErrorResponse, Errors } from "@hichchi/nest-connector";
import { LoggerService } from "../logger";

/**
 * Convert the error object to a JSON string and return as the message
 *
 * @example
 * ```TypeScript
 * toString({
 *     statusCode: 409,
 *     code: "USER_409_EXIST_EMAIL",
 *     message: "User exists!"
 * });
 *
 * // Returns:
 * {
 *     message: '{"status":409,"code":"USER_409_EXIST_EMAIL","message":"User exists!"}'
 * }
 * ```
 *
 * @param {ErrorResponse} errObj Error object
 * @returns {{ message: string }} Error message
 */
export function toErrString(errObj: ErrorResponse): { message: string } {
    return {
        message: toString(errObj),
    };
}

/**
 * Convert error string to error object
 *
 * @example
 * ```TypeScript
 * toErrorObject('{"message":"User exists!"}');
 *
 * // Returns:
 * {
 *     statusCode: 500,
 *     code: "ERROR_500",
 *     message: "User exists"
 * }
 * ```
 *
 * @example
 * ```TypeScript
 * toErrorObject('{ "status": "409", "code": "USER_409_EXIST_EMAIL", "message": "User with email exists!" }');
 *
 * // Returns:
 * {
 *     statusCode: 409,
 *     code: "USER_409_EXIST_EMAIL",
 *     message: "User with email exists!"
 * }
 * ```
 *
 * @example
 * ```TypeScript
 * toErrorObject('User with email exists!');
 *
 * // Returns:
 * {
 *     statusCode: 500,
 *     code: "ERROR_500",
 *     message: "Internal Server Error!"
 * }
 * ```
 *
 * @param {string} str JSON string
 * @returns {ErrorResponse} Parsed object
 */
export function toErrorObject(str: string): ErrorResponse {
    const json = toJSON(str) as ErrorResponse;

    if (!json.statusCode) {
        json.statusCode = Errors.ERROR.statusCode;
    }

    if (!json.code) {
        json.code = Errors.ERROR.code;
    }

    if (!json.message) {
        json.message = Errors.ERROR.message;
    }

    if (!json.statusCode && !json.code && !json.message) {
        LoggerService.error("Invalid error string received", str);
    }

    return json;
}
