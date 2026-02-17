// noinspection JSUnusedGlobalSymbols

/**
 * Check if a provided origin is allowed based on a list of allowed origins
 *
 * This utility function determines if a given origin is allowed by comparing it against
 * a list of allowed origins. It supports both exact matching and wildcard patterns.
 * When an allowed origin contains a wildcard (*), the function converts it to a regular
 * expression pattern for flexible matching.
 *
 * This is particularly useful for implementing CORS (Cross-Origin Resource Sharing)
 * policies where you need to validate incoming request origins against a whitelist.
 *
 * @param {string} origin - The origin to check (e.g., "https://example.com")
 * @param {string[]} allowedOrigins - Array of allowed origins, which can include wildcards
 * @returns {boolean} `true` if the origin is allowed, `false` otherwise
 *
 * @example
 * ```typescript
 * // Check against exact origins
 * const allowed = isOriginAllowed(
 *   "https://example.com",
 *   ["https://example.com", "https://api.example.com"]
 * );
 * // Returns true
 * ```
 *
 * @example
 * ```typescript
 * // Check using wildcard patterns
 * const allowed = isOriginAllowed(
 *   "https://sub.example.com",
 *   ["https://*.example.com"]
 * );
 * // Returns true because the wildcard matches any subdomain
 * ```
 */
export function isOriginAllowed(origin: string, allowedOrigins: string[]): boolean {
    return allowedOrigins.some(allowedOrigin => {
        if (allowedOrigin.includes("*")) {
            const regex = new RegExp(`^${allowedOrigin.replace(/\./g, "\\.").replace("*", ".*")}$`);
            return regex.test(origin);
        }
        return allowedOrigin === origin;
    });
}

/**
 * Prepends a subdomain to the given host, if a subdomain is provided.
 * Ensures that the resulting host maintains a valid structure.
 *
 * @param {string} url - The url to which the subdomain will be prepended.
 * @param {string} [subdomain] - An optional subdomain to prepend to the host. If not provided, the original host is returned unchanged.
 * @return {string} A new string representing the host with the prepended subdomain, or the original host if no subdomain is provided or the host is invalid.
 */
export function prependSubdomainToUrl(url: string, subdomain?: string): string {
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
