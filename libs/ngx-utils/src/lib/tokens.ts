import { HttpContextToken } from "@angular/common/http";

/**
 * HTTP context token for controlling error notification behavior in HTTP requests
 *
 * This token provides a way to control whether HTTP errors should trigger user notifications
 * on a per-request basis. It's used in conjunction with HTTP interceptors to determine
 * if error messages should be displayed to users when API requests fail.
 *
 * The token defaults to `true`, meaning error notifications are enabled by default for
 * all HTTP requests. Individual requests can override this behavior by setting the token
 * to `false` in their HTTP context, allowing for silent error handling when needed.
 *
 * This is particularly useful for background operations, polling requests, or scenarios
 * where you want to handle errors programmatically without showing notifications to users.
 *
 * Key features:
 * - Per-request error notification control
 * - Default behavior enables notifications for all requests
 * - Integration with HTTP interceptors for centralized error handling
 * - Support for silent error handling when needed
 * - Type-safe boolean configuration
 *
 * @example
 * ```typescript
 * // Basic usage - error notifications enabled (default behavior)
 * import { HttpClient } from '@angular/common/http';
 *
 * @Injectable()
 * export class DataService {
 *   constructor(private http: HttpClient) {}
 *
 *   // This request will show error notifications if it fails
 *   getData() {
 *     return this.http.get('/api/data');
 *   }
 * }
 * ```
 *
 * @example
 * ```typescript
 * // Disabling error notifications for specific requests
 * import { HttpClient, HttpContext } from '@angular/common/http';
 * import { NOTIFY_ERRORS } from '@hichchi/ngx-utils';
 *
 * @Injectable()
 * export class DataService {
 *   constructor(private http: HttpClient) {}
 *
 *   // This request will NOT show error notifications if it fails
 *   getDataSilently() {
 *     return this.http.get('/api/data', {
 *       context: new HttpContext().set(NOTIFY_ERRORS, false)
 *     });
 *   }
 * }
 * ```
 *
 * @example
 * ```typescript
 * // Using with skipNotifyContext utility function
 * import { HttpClient } from '@angular/common/http';
 * import { skipNotifyContext } from '@hichchi/ngx-utils';
 *
 * @Injectable()
 * export class DataService {
 *   constructor(private http: HttpClient) {}
 *
 *   // Convenient way to disable notifications
 *   getDataSilently() {
 *     return this.http.get('/api/data', skipNotifyContext(true));
 *   }
 *
 *   // Explicitly enable notifications (same as default)
 *   getDataWithNotifications() {
 *     return this.http.get('/api/data', skipNotifyContext(false));
 *   }
 * }
 * ```
 *
 * @example
 * ```typescript
 * // Conditional error notification control
 * import { HttpClient, HttpContext } from '@angular/common/http';
 * import { NOTIFY_ERRORS } from '@hichchi/ngx-utils';
 *
 * @Injectable()
 * export class DataService {
 *   constructor(private http: HttpClient) {}
 *
 *   fetchData(silent: boolean = false) {
 *     const context = new HttpContext().set(NOTIFY_ERRORS, !silent);
 *     return this.http.get('/api/data', { context });
 *   }
 *
 *   // Usage
 *   loadDataQuietly() {
 *     return this.fetchData(true); // No error notifications
 *   }
 *
 *   loadDataWithFeedback() {
 *     return this.fetchData(false); // Show error notifications
 *   }
 * }
 * ```
 *
 * @example
 * ```typescript
 * // Integration with error interceptor
 * import { HttpInterceptorFn } from '@angular/common/http';
 * import { NOTIFY_ERRORS } from '@hichchi/ngx-utils';
 *
 * export const errorInterceptor: HttpInterceptorFn = (req, next) => {
 *   return next(req).pipe(
 *     catchError((error) => {
 *       const shouldNotify = req.context.get(NOTIFY_ERRORS);
 *
 *       if (shouldNotify) {
 *         // Show error notification to user
 *         this.notificationService.error(error.message);
 *       }
 *
 *       return throwError(() => error);
 *     })
 *   );
 * };
 * ```
 *
 * @see {@link HttpContextToken} Angular HTTP context token for request-specific configuration
 * @see {@link errorResponseInterceptor} Function that uses this token for error handling
 * @see {@link skipNotifyContext} Utility function for convenient token usage
 */
export const NOTIFY_ERRORS = new HttpContextToken<boolean>(() => true);
