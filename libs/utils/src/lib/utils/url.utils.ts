// noinspection JSUnusedGlobalSymbols
/**
 * Validates if a redirect URL is allowed based on the configured domains.
 *
 * @param url - The URL to validate
 * @param allowedDomains - Array of allowed domain names
 * @returns boolean - True if the URL's domain is allowed, false otherwise
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
