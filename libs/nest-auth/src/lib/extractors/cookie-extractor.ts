import { Request } from "express";
import { AccessToken } from "@hichchi/nest-connector/auth";
import { ACCESS_TOKEN_COOKIE_NAME } from "../constants";

/**
 * Extract access token from the request cookies
 *
 * This function is used to extract the access token from the request cookies
 *
 * @example
 * ```TypeScript
 * ExtractJwt.fromExtractors([cookieExtractor])
 * ```
 *
 * @param {Request} request The request object
 * @returns {AccessToken|null} `AccessToken` or `null` if not found
 */
export function cookieExtractor(request: Request): AccessToken | null {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    return (request?.signedCookies[ACCESS_TOKEN_COOKIE_NAME] as AccessToken) || null;
}
