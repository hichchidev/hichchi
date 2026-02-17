// noinspection JSUnusedGlobalSymbols

import { HttpContext } from "@angular/common/http";
import { NOTIFY_ERRORS } from "../tokens";
import { CommonSuccessResponseCode, HttpSuccessStatus, SuccessResponse } from "@hichchi/nest-connector";
import { extractSubdomain, getEnumValues, hasOwnAll } from "@hichchi/utils";
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

/**
 * Prepends subdomain to a URL
 *
 * @param url Base URL including protocol (http:// or https://)
 * @param {string} splitDomain - The main domain to use as a reference for extraction
 *                              (e.g., "example.com")
 * @param {string} devSubdomain - The subdomain to use for development environments
 * @returns URL with subdomain prepended (no trailing slash added)
 */
export function prependSubdomainToUrlBrowser(url: string, splitDomain?: string, devSubdomain?: string): string {
    if (!splitDomain) {
        return url;
    }

    const subdomain = extractSubdomain(window.location.href, splitDomain, devSubdomain);

    if (!subdomain) {
        return url;
    }

    const match = /^(https?:\/\/)?(.+)$/.exec(url);
    if (!match) {
        throw new Error(`Invalid URL: ${url}`);
    }

    const protocol = match[1] ?? "";
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    const host = match[2];

    return `${protocol}${subdomain ? `${subdomain}.` : ""}${host}`;
}
