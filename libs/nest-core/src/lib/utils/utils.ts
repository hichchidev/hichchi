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
            const regex = new RegExp("^" + allowedOrigin.replace(/\./g, "\\.").replace("*", ".*") + "$");
            return regex.test(origin);
        }
        return allowedOrigin === origin;
    });
}

/**
 * Extract a subdomain from an origin URL
 *
 * This utility function parses an origin URL and extracts the subdomain portion.
 * It works by splitting the origin string using a regular expression that matches
 * protocol prefixes (http://, https://), dots, and the provided domain name.
 *
 * The function handles special cases:
 * - If the origin contains "localhost", it returns the provided fallback value
 * - If no subdomain is found or the origin is undefined, it returns undefined
 *
 * This is particularly useful for multi-tenant applications where different
 * subdomains represent different tenants or environments.
 *
 * @param {string} splitDomain - The main domain to use as a reference for extraction
 *                              (e.g., "example.com")
 * @param {string} [origin] - The origin URL to extract the subdomain from
 *                           (e.g., "https://admin.example.com")
 * @param {string} [ifLocalhost] - Fallback value to return when the origin contains
 *                                "localhost" (e.g., "local" or "development")
 * @returns {string|undefined} The extracted subdomain if found, the ifLocalhost value
 *                            for localhost origins, or undefined if no subdomain exists
 *                            or origin is undefined
 *
 * @example
 * ```TypeScript
 * extractSubdomain("example.com", "admin.example.com", "local")
 * // Returns "admin"
 * ```
 *
 * @example
 * ```TypeScript
 * extractSubdomain("example.com", "localhost:3000", "local")
 * // Returns "local"
 * ```
 *
 * @example
 * ```TypeScript
 * extractSubdomain("example.com", "example.com", "local")
 * // Returns undefined (no subdomain)
 * ```
 */
export function extractSubdomain(splitDomain: string, origin?: string, ifLocalhost?: string): string | undefined {
    if (origin) {
        const parts = origin.split(RegExp(`http://|https://|\\.|${splitDomain}`));
        return parts?.[1] ? (parts[1].includes("localhost") ? ifLocalhost : parts[1]) : undefined;
    }
    return undefined;
}
