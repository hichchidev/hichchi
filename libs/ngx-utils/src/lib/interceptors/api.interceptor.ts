import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { TENANT_HEADER_KEY, TenantSlug } from "@hichchi/nest-connector/auth";
import { extractSubdomain } from "../utils";

/**
 * Creates an HTTP interceptor that rewrites relative request URLs using a base API host
 * and optionally attaches a tenant header for multi-tenant applications.
 *
 * This interceptor allows Angular applications to:
 * - Use relative request URLs in services and components
 * - Automatically prepend a base API URL for consistency
 * - Add a tenant identifier via a custom HTTP header (`x-tenant`) if provided
 *   or extracted from the current origin using `splitDomain`
 *
 * How the interceptor works:
 * - Requests that already start with the provided `apiBase` or with `http://` or `https://`
 *   are passed through unchanged
 * - All other relative requests are rewritten as:
 *   `${apiBase}/${req.url}`
 * - If a `tenant` string is provided or a subdomain is extracted using `splitDomain`,
 *   it is added to the request headers using the `TENANT_HEADER_KEY` constant
 *
 * @param apiBase - The base API URL used to build relative request URLs (e.g., "https://api.example.com")
 * @param splitDomain - Optional domain name used to extract subdomain from the current URL (e.g., "example.com")
 * @param tenant - Optional tenant identifier to attach via header (e.g., "tenant-a")
 * @returns An `HttpInterceptorFn` that can be registered with Angular's `HttpClient`
 *
 * @example
 * ```typescript
 * // Basic usage in app configuration
 * apiInterceptor('https://api.example.com');
 * ```
 *
 * @example
 * ```typescript
 * // Using environment configuration
 * apiInterceptor(environment.apiUrl);
 * ```
 *
 * @example
 * ```typescript
 * // With a static tenant
 * apiInterceptor('https://api.example.com', undefined, 'tenant-a');
 * // Relative request 'users' -> 'https://api.example.com/users'
 * // Header 'x-tenant: tenant-a' is attached to the request
 * ```
 *
 * @example
 * ```typescript
 * // Using splitDomain to automatically extract tenant from URL
 * // Current page URL: https://tenant123.example.com
 * apiInterceptor('https://api.example.com', 'example.com');
 * // Relative request 'users' -> 'https://api.example.com/users'
 * // Header 'x-tenant: tenant123' is attached to the request
 * ```
 *
 * @example
 * ```typescript
 * // In a service using relative URLs
 * @Injectable()
 * export class UserService {
 *   constructor(private http: HttpClient) {}
 *
 *   getUsers() {
 *     // Relative URL becomes: https://api.example.com/users
 *     // Tenant header is added if specified or extracted
 *     return this.http.get('users');
 *   }
 *
 *   getUserById(id: string) {
 *     return this.http.get(`users/${id}`);
 *   }
 *
 *   // Absolute URLs are passed through unchanged
 *   getExternalData() {
 *     return this.http.get('https://external-api.com/data');
 *   }
 * }
 * ```
 *
 * @see {@link HttpInterceptorFn} Angular HTTP interceptor function type
 * @see {@link HttpRequest} Angular HTTP request interface
 * @see {@link TENANT_HEADER_KEY} Constant used to attach tenant header
 * @see {@link extractSubdomain} Utility function for extracting subdomains from URLs
 */
export function apiInterceptor(apiBase: string, splitDomain?: string, tenant?: TenantSlug): HttpInterceptorFn {
    return (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
        // Already an absolute URL? Just pass through
        if (/^https?:\/\//.test(req.url) || req.url.startsWith(apiBase)) {
            return next(req);
        }

        // Ensure no double slashes
        const path = req.url.startsWith("/") ? req.url.substring(1) : req.url;

        const subdomain = extractSubdomain(splitDomain);

        // Clone the request with the full URL and optional tenant header
        const apiReq = req.clone({
            url: `${apiBase}/${path}`,
            setHeaders: subdomain || tenant ? { [TENANT_HEADER_KEY]: (subdomain || tenant)! } : {},
        });
        return next(apiReq);
    };
}
