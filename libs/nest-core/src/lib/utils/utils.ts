// noinspection JSUnusedGlobalSymbols

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
 * Extract subdomain from the origin
 *
 * @example
 * ```TypeScript
 * extractSubdomain("example.com", "admin.example.com", "local")
 *
 * // Returns "admin"
 * ```
 *
 * @example
 * ```TypeScript
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
