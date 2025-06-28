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
 *
 * @see {@link URL} The Web API used for URL parsing and validation
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
