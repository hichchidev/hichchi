// noinspection JSUnusedGlobalSymbols

import { HttpContext } from "@angular/common/http";
import { NOTIFY_ERRORS } from "../tokens";
import { CommonSuccessResponseCode, HttpSuccessStatus, SuccessResponse } from "@hichchi/nest-connector";
import { getEnumValues, hasOwnAll } from "@hichchi/utils";
import { AuthSuccessResponseCode } from "@hichchi/nest-connector/auth";

export function skipNotify(value: boolean = false): HttpContext {
    return new HttpContext().set(NOTIFY_ERRORS, !value);
}

export function skipNotifyContext(value: boolean = false): { context: HttpContext } {
    return { context: new HttpContext().set(NOTIFY_ERRORS, !value) };
}

export function isSuccessResponse(body: unknown): body is SuccessResponse {
    if (
        typeof body !== "object" ||
        body === null ||
        !hasOwnAll(body as Record<string, unknown>, ["statusCode", "code", "message"])
    ) {
        return false;
    }

    const b = body as Record<string, unknown>;

    return (
        typeof b["message"] === "string" &&
        getEnumValues(HttpSuccessStatus).includes(b["statusCode"] as HttpSuccessStatus) &&
        [...getEnumValues(CommonSuccessResponseCode), ...getEnumValues(AuthSuccessResponseCode)].includes(
            b["code"] as CommonSuccessResponseCode | AuthSuccessResponseCode,
        )
    );
}
