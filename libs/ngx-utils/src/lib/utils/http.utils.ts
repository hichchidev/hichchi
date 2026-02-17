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

/**
 * Extract a subdomain from the current origin URL
 *
 * This utility function parses the current page's URL (`window.location.href`)
 * and extracts the subdomain portion relative to the provided main domain.
 *
 * Behavior:
 * - Returns the subdomain if the hostname contains one before the `splitDomain`
 * - Returns `undefined` for single-label hostnames (e.g., `localhost`), IP addresses,
 *   or if no subdomain exists
 *
 * @param splitDomain - The main domain used as reference for extraction (e.g., "example.com")
 * @returns The extracted subdomain if found, or `undefined` otherwise
 *
 * @example
 * ```ts
 * extractSubdomain("example.com");
 * // On "admin.example.com" -> returns "admin"
 * ```
 *
 * @example
 * ```ts
 * extractSubdomain("example.com");
 * // On "localhost:3000" -> returns undefined
 * ```
 *
 * @example
 * ```ts
 * extractSubdomain("example.com");
 * // On "example.com" -> returns undefined (no subdomain)
 * ```
 */
export function extractSubdomain(splitDomain?: string): string | undefined {
    if (!splitDomain) return undefined;

    const origin = window.location.href;

    try {
        const url = new URL(origin.startsWith("http") ? origin : `http://${origin}`);
        const hostname = url.hostname;

        const isIpv4 = /^(25[0-5]|2[0-4]\d|1?\d?\d)(\.(25[0-5]|2[0-4]\d|1?\d?\d)){3}$/.test(hostname);
        const isIpv6 = hostname.includes(":");

        if (!hostname.includes(".") || isIpv4 || isIpv6) {
            return undefined;
        }

        if (hostname.endsWith(splitDomain)) {
            const subdomainPart = hostname.slice(0, hostname.length - splitDomain.length);
            // Remove trailing dot if present
            const subdomain = subdomainPart.replace(/\.$/, "");
            return subdomain || undefined;
        }

        return undefined;
    } catch {
        return undefined;
    }
}
