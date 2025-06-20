import { Request } from "express";
import { ACCESS_TOKEN_COOKIE_NAME } from "../tokens";
import { AccessToken } from "@hichchi/nest-connector/auth";

/**
 * Extract access token from the request cookies
 *
 * This function is used to extract the access token from the request cookies
 *
 * @example
 * ```typescript
 * ExtractJwt.fromExtractors([cookieExtractor])
 * ```
 *
 * @param {Request} request The request object
 * @returns {AccessToken|null} Access token or `null` if not found
 */
export function cookieExtractor(request: Request): AccessToken | null {
    return request?.signedCookies[ACCESS_TOKEN_COOKIE_NAME] || null;
}
