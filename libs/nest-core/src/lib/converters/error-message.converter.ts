// noinspection JSUnusedGlobalSymbols

import { toJSON, toString } from "./json.converter";
import { IEntityErrorResponse } from "../interfaces";
import { Errors } from "../responses";
import { LoggerService } from "../services";

/**
 * Convert the error object to a JSON string and return as the message
 *
 * @example
 * ```typescript
 * toString({
 *     status: 409,
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
 * @param {IEntityErrorResponse} errObj Error object
 * @returns {{ message: string }} Error message
 */
export function toErrString(errObj: IEntityErrorResponse): { message: string } {
    return {
        message: toString(errObj),
    };
}

/**
 * Convert error string to error object
 *
 * @example
 * ```typescript
 * toErrorObject('{"message":"User exists!"}');
 *
 * // Returns:
 * {
 *     status: 500,
 *     code: "ERROR_500",
 *     message: "User exists"
 * }
 * ```
 *
 * @example
 * ```typescript
 * toErrorObject('{ "status": "409", "code": "USER_409_EXIST_EMAIL", "message": "User with email exists!" }');
 *
 * // Returns:
 * {
 *     status: 409,
 *     code: "USER_409_EXIST_EMAIL",
 *     message: "User with email exists!"
 * }
 * ```
 *
 * @example
 * ```typescript
 * toErrorObject('User with email exists!');
 *
 * // Returns:
 * {
 *     status: 500,
 *     code: "ERROR_500",
 *     message: "Internal Server Error!"
 * }
 * ```
 *
 * @param {string} str JSON string
 * @returns {IEntityErrorResponse} Parsed object
 */
export function toErrorObject(str: string): IEntityErrorResponse {
    const json = toJSON(str) as IEntityErrorResponse;

    if (!json.status) {
        json.status = Errors.ERROR.status;
    }

    if (!json.code) {
        json.code = Errors.ERROR.code;
    }

    if (!json.message) {
        json.message = Errors.ERROR.message;
    }

    if (!json.status && !json.code && !json.message) {
        LoggerService.trace(str, "Invalid error string received");
    }

    return json;
}
