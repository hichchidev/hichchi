import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { prependSubdomainToUrlBrowser } from "../utils";

/**
 * Creates an HTTP interceptor that rewrites relative request URLs using a base API host.
 *
 * This interceptor factory function helps centralize API URL composition in Angular applications.
 * It allows application code to keep using relative request URLs while ensuring requests are
 * routed to the expected API domain.
 *
 * The interceptor intelligently handles different URL formats:
 * - Requests that already start with the provided `apiBase` are passed through unchanged
 * - Requests that start with `http://` or `https://` are passed through unchanged
 * - All other requests (relative URLs) are rebuilt as:
 *   `${protocol}${optionalSubdomainPrefix}${host}/${req.url}`
 *
 * `apiBase` can be provided with or without protocol:
 * - `https://api.example.com`
 * - `api.example.com`
 *
 * Subdomain behavior is controlled by `prependSubdomain`:
 * - `string`: prepend the given subdomain (e.g. `"tenant-a"` -> `tenant-a.api.example.com`)
 * - `true`: resolve subdomain dynamically from `getSubdomain()`
 * - `false` / `undefined`: do not prepend a subdomain
 *
 * @param apiBase - The base API host (optionally with protocol) used to build relative request URLs.
 * @param {string} splitDomain - The main domain to use as a reference for extraction
 *                              (e.g., "example.com")
 * @param {string} devSubdomain - The subdomain to use in development mode (e.g., "dev")
 * @returns An HttpInterceptorFn that can be used in Angular HTTP interceptor configuration
 *
 * @example
 * ```typescript
 * // Basic usage in app configuration
 * export const appConfig: ApplicationConfig = {
 *   providers: [
 *     provideHttpClient(
 *       withInterceptors([
 *         apiUrlInterceptor('https://api.example.com'),
 *       ])
 *     )
 *   ]
 * };
 * ```
 *
 * @example
 * ```typescript
 * // Using with environment configuration
 * import { environment } from '../environments/environment';
 *
 * export const appConfig: ApplicationConfig = {
 *   providers: [
 *     provideHttpClient(
 *       withInterceptors([
 *         apiUrlInterceptor(environment.apiUrl),
 *       ])
 *     )
 *   ]
 * };
 * ```
 *
 * @example
 * ```typescript
 * // In a service, you can now use relative URLs
 * @Injectable()
 * export class UserService {
 *   constructor(private http: HttpClient) {}
 *
 *   getUsers() {
 *     // Relative URL becomes: https://api.example.com/users
 *     return this.http.get('users');
 *   }
 *
 *   getUserById(id: string) {
 *     // Relative URL becomes: https://api.example.com/users/123
 *     return this.http.get(`users/${id}`);
 *   }
 *
 *   // Absolute URLs are passed through unchanged
 *   getExternalData() {
 *     // This remains: https://external-api.com/data
 *     return this.http.get('https://external-api.com/data');
 *   }
 * }
 * ```
 *
 * @example
 * ```typescript
 * // Static subdomain prefix
 * apiUrlInterceptor('https://api.example.com', 'tenant-a');
 * // Relative 'users' -> 'https://tenant-a.api.example.com/users'
 * ```
 *
 * @example
 * ```typescript
 * // Dynamic subdomain from getSubdomain()
 * apiUrlInterceptor('https://api.example.com', true);
 * // If getSubdomain() returns 'acme':
 * // Relative 'users' -> 'https://acme.api.example.com/users'
 * ```
 *
 * @see {@link HttpInterceptorFn} Angular HTTP interceptor function type
 * @see {@link HttpRequest} Angular HTTP request interface
 */
export function apiUrlInterceptor(apiBase: string, splitDomain?: string, devSubdomain?: string): HttpInterceptorFn {
    return (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
        // Already an absolute URL? Just pass through
        if (/^https?:\/\//.test(req.url) || req.url.startsWith(apiBase)) {
            return next(req);
        }

        // Build the base URL with optional subdomain
        const baseUrl = prependSubdomainToUrlBrowser(apiBase, splitDomain, devSubdomain);

        // Ensure no double slashes
        const path = req.url.startsWith("/") ? req.url.substring(1) : req.url;

        // Clone the request with the full URL
        const apiReq = req.clone({ url: `${baseUrl}/${path}` });

        return next(apiReq);
    };
}
