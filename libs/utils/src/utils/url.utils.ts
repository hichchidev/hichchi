// noinspection JSUnusedGlobalSymbols
/**
 * Validates if a redirect URL is allowed based on a whitelist of permitted domains.
 *
 * This security utility function checks whether a given URL's domain is included in a list
 * of allowed domains, helping prevent open redirect vulnerabilities. It supports both exact
 * domain matching and subdomain matching, where a URL's hostname must either exactly match
 * an allowed domain or be a subdomain of an allowed domain.
 *
 * This is essential for secure redirect functionality in web applications, preventing
 * attackers from redirecting users to malicious external sites. It's commonly used in
 * authentication flows, logout redirects, and any feature that accepts user-provided
 * redirect URLs.
 *
 * @param {string} url - The URL to validate. Must be a valid URL string that can be parsed
 *                       by the URL constructor. Can include protocol, path, query parameters, etc.
 * @param {string[]} allowedDomains - Array of domain names that are permitted for redirects.
 *                                    Domains should be specified without protocol (e.g., "example.com").
 *                                    Subdomains of these domains will also be allowed.
 * @returns {boolean} True if the URL's hostname matches or is a subdomain of any allowed domain,
 *                    false if the domain is not allowed or if the URL is invalid
 *
 * @example
 * ```typescript
 * // Basic domain validation
 * const allowedDomains = ["example.com", "myapp.com"];
 *
 * const isValid1 = isValidRedirectUrl("https://example.com/dashboard", allowedDomains);
 * // Returns: true (exact domain match)
 *
 * const isValid2 = isValidRedirectUrl("https://api.example.com/callback", allowedDomains);
 * // Returns: true (subdomain of allowed domain)
 *
 * const isValid3 = isValidRedirectUrl("https://malicious.com/phishing", allowedDomains);
 * // Returns: false (domain not in allowed list)
 * ```
 *
 * @example
 * ```typescript
 * // Authentication redirect validation
 * function handleAuthRedirect(redirectUrl: string): void {
 *   const trustedDomains = [
 *     "myapp.com",
 *     "admin.myapp.com",
 *     "localhost" // for development
 *   ];
 *
 *   if (isValidRedirectUrl(redirectUrl, trustedDomains)) {
 *     window.location.href = redirectUrl;
 *   } else {
 *     // Redirect to safe default instead
 *     window.location.href = "/dashboard";
 *     console.warn("Attempted redirect to untrusted domain:", redirectUrl);
 *   }
 * }
 * ```
 *
 * @example
 * ```typescript
 * // API endpoint validation
 * app.post('/auth/login', (req, res) => {
 *   const { username, password, redirectUrl } = req.body;
 *
 *   if (authenticateUser(username, password)) {
 *     const allowedDomains = ["myapp.com", "partner.com"];
 *
 *     if (redirectUrl && isValidRedirectUrl(redirectUrl, allowedDomains)) {
 *       res.json({ success: true, redirectUrl });
 *     } else {
 *       res.json({ success: true, redirectUrl: "/dashboard" });
 *     }
 *   } else {
 *     res.status(401).json({ error: "Invalid credentials" });
 *   }
 * });
 * ```
 *
 * @example
 * ```typescript
 * // Complex subdomain scenarios
 * const domains = ["company.com"];
 *
 * isValidRedirectUrl("https://app.company.com", domains);        // true
 * isValidRedirectUrl("https://api.app.company.com", domains);    // true
 * isValidRedirectUrl("https://company.com.evil.com", domains);   // false
 * isValidRedirectUrl("https://fakecompany.com", domains);        // false
 * ```
 *
 * @remarks
 * - Uses the native URL constructor for reliable URL parsing
 * - Supports both exact domain matches and subdomain matches
 * - Returns false for invalid URLs that cannot be parsed
 * - Domain matching is case-insensitive (handled by URL constructor)
 * - Does not validate the protocol - focuses only on hostname validation
 * - Subdomain matching uses endsWith() to ensure proper domain boundaries
 * - Empty or null URL strings will cause the function to return false
 *
 * @throws {never} This function catches all URL parsing errors and returns false instead of throwing
 */
export function isValidRedirectUrl(url: string, allowedDomains: string[]): boolean {
    try {
        const parsedUrl = new URL(url);
        return allowedDomains.some(
            domain => parsedUrl.hostname === domain || parsedUrl.hostname.endsWith(`.${domain}`),
        );
    } catch {
        return false;
    }
}

/**
 * Extract a subdomain from an origin URL
 *
 * This utility function parses an origin URL and extracts the subdomain portion.
 * It works by splitting the origin string using a regular expression that matches
 * protocol prefixes (http://, https://), dots, and the provided domain name.
 *
 * The function handles special cases:
 * - If the origin hostname has no domain name (single-label host) or is an IP address, it returns the provided fallback value
 * - If no subdomain is found or the origin is undefined, it returns undefined
 *
 * This is particularly useful for multi-tenant applications where different
 * subdomains represent different tenants or environments.
 *
 * @param {string} origin - The origin URL to extract the subdomain from
 *                           (e.g., "https://admin.example.com")
 * @param {string} [splitDomain] - The main domain to use as a reference for extraction
 *                              (e.g., "example.com")
 * @param {string} [ifLocalhost] - Fallback value to return when the origin hostname
 *                                has no domain name or is an IP address (e.g., "local" or "development")
 * @returns {string|undefined} The extracted subdomain if found, the ifLocalhost value
 *                            for single-label/IP hostnames, or undefined if no subdomain exists
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
export function extractSubdomain(origin: string, splitDomain?: string, ifLocalhost?: string): string | undefined {
    if (!splitDomain) return undefined;

    try {
        const url = new URL(origin.startsWith("http") ? origin : `http://${origin}`);
        const hostname = url.hostname;

        const isIpv4 = /^(25[0-5]|2[0-4]\d|1?\d?\d)(\.(25[0-5]|2[0-4]\d|1?\d?\d)){3}$/.test(hostname);
        const isIpv6 = hostname.includes(":");

        if (!hostname.includes(".") || isIpv4 || isIpv6) {
            return ifLocalhost;
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
