// noinspection JSUnusedGlobalSymbols

import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";

/**
 * Creates an HTTP interceptor that automatically prepends a base API URL to relative requests
 *
 * This interceptor factory function creates an HTTP interceptor that automatically adds a base API URL
 * to requests that don't already have a complete URL. It's designed to simplify API calls by allowing
 * developers to use relative URLs throughout their application while ensuring all requests are properly
 * routed to the correct API base URL.
 *
 * The interceptor intelligently handles different URL formats:
 * - Requests that already start with the provided API base URL are passed through unchanged
 * - Requests that start with "http" (absolute URLs) are passed through unchanged
 * - All other requests (relative URLs) have the API base URL prepended
 *
 * This is particularly useful in Angular applications where you want to centralize API URL management
 * and avoid repeating the base URL in every HTTP service call.
 *
 * @param apiBase - The base API URL to prepend to relative requests (without trailing slash)
 * @returns An HttpInterceptorFn that can be used in Angular HTTP interceptor configuration
 *
 * @example
 * ```typescript
 * // Basic usage in app configuration
 * export const appConfig: ApplicationConfig = {
 *   providers: [
 *     provideHttpClient(
 *       withInterceptors([
 *         apiUrlInterceptor('https://api.example.com')
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
 *         apiUrlInterceptor(environment.apiUrl)
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
 *     // This will become: https://api.example.com/users
 *     return this.http.get('users');
 *   }
 *
 *   getUserById(id: string) {
 *     // This will become: https://api.example.com/users/123
 *     return this.http.get(`users/${id}`);
 *   }
 *
 *   // Absolute URLs are not modified
 *   getExternalData() {
 *     // This remains: https://external-api.com/data
 *     return this.http.get('https://external-api.com/data');
 *   }
 * }
 * ```
 *
 * @example
 * ```typescript
 * // In a module-based application
 * @NgModule({
 *   providers: [
 *     {
 *       provide: HTTP_INTERCEPTORS,
 *       useValue: apiUrlInterceptor('https://api.myapp.com/v1'),
 *       multi: true
 *     }
 *   ]
 * })
 * export class AppModule {}
 * ```
 *
 * @see {@link HttpInterceptorFn} Angular HTTP interceptor function type
 * @see {@link HttpRequest} Angular HTTP request interface
 */
export function apiUrlInterceptor(apiBase: string): HttpInterceptorFn {
    return (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
        if (req.url.startsWith(apiBase) || req.url.startsWith("http")) {
            return next(req);
        }

        const apiReq = req.clone({ url: `${apiBase}/${req.url}` });

        return next(apiReq);
    };
}
