import { ErrorResponse } from "@hichchi/nest-connector";

/**
 * Interface representing an HTTP error with enhanced error information
 *
 * This interface extends the standard JavaScript Error interface to include HTTP-specific
 * error details such as status codes and structured error responses. It provides a
 * standardized way to handle HTTP errors throughout Angular applications, making error
 * handling more consistent and informative.
 *
 * The interface is particularly useful in HTTP interceptors, error handlers, and services
 * that need to process and respond to different types of HTTP errors with appropriate
 * user feedback and application behavior.
 *
 * @extends Error Standard JavaScript Error interface
 *
 * @example
 * ```typescript
 * // Using in an HTTP error handler
 * function handleHttpError(error: HttpError): void {
 *   console.error(`HTTP ${error.status}: ${error.message}`);
 *
 *   if (error.status === 401) {
 *     // Handle authentication errors
 *     redirectToLogin();
 *   } else if (error.status >= 500) {
 *     // Handle server errors
 *     showServerErrorMessage();
 *   } else if (error.error) {
 *     // Handle structured API errors
 *     showApiErrorMessage(error.error.message);
 *   }
 * }
 * ```
 *
 * @example
 * ```typescript
 * // Using in an HTTP interceptor
 * export function errorInterceptor(
 *   req: HttpRequest<unknown>,
 *   next: HttpHandlerFn
 * ): Observable<HttpEvent<unknown>> {
 *   return next(req).pipe(
 *     catchError((error: HttpErrorResponse) => {
 *       const httpError: HttpError = {
 *         name: 'HttpError',
 *         status: error.status,
 *         message: error.message,
 *         error: error.error as ErrorResponse
 *       };
 *
 *       return throwError(() => httpError);
 *     })
 *   );
 * }
 * ```
 *
 * @example
 * ```typescript
 * // Using in a service with type-safe error handling
 * @Injectable()
 * export class DataService {
 *   constructor(private http: HttpClient) {}
 *
 *   getData(): Observable<any> {
 *     return this.http.get('/api/data').pipe(
 *       catchError((error: HttpErrorResponse) => {
 *         const httpError: HttpError = {
 *           name: 'HttpError',
 *           status: error.status,
 *           message: error.statusText || 'Unknown error',
 *           error: error.error
 *         };
 *
 *         this.logError(httpError);
 *         return throwError(() => httpError);
 *       })
 *     );
 *   }
 *
 *   private logError(error: HttpError): void {
 *     console.error('API Error:', {
 *       status: error.status,
 *       message: error.message,
 *       details: error.error
 *     });
 *   }
 * }
 * ```
 *
 * @example
 * ```typescript
 * // Using with error response processing
 * function processApiError(error: HttpError): string {
 *   // Check for structured error response
 *   if (error.error?.message) {
 *     return error.error.message;
 *   }
 *
 *   // Fallback to HTTP status-based messages
 *   switch (error.status) {
 *     case 400:
 *       return 'Invalid request. Please check your input.';
 *     case 401:
 *       return 'Authentication required. Please log in.';
 *     case 403:
 *       return 'Access denied. You do not have permission.';
 *     case 404:
 *       return 'The requested resource was not found.';
 *     case 500:
 *       return 'Server error. Please try again later.';
 *     default:
 *       return error.message || 'An unexpected error occurred.';
 *   }
 * }
 * ```
 *
 * @see {@link Error} Standard JavaScript Error interface
 * @see {@link ErrorResponse} Structured error response from the backend
 */
export interface HttpError extends Error {
    /**
     * HTTP status code of the error response
     *
     * This property contains the HTTP status code returned by the server,
     * such as 400 (Bad Request), 401 (Unauthorized), 404 (Not Found),
     * 500 (Internal Server Error), etc. It allows for status-specific
     * error handling and user feedback.
     *
     * @example
     * ```typescript
     * if (error.status === 401) {
     *   // Handle authentication error
     *   this.authService.logout();
     * }
     * ```
     */
    status: number;

    /**
     * Human-readable error message
     *
     * This property contains a descriptive error message that can be displayed
     * to users or logged for debugging purposes. It may come from the server
     * response or be generated based on the HTTP status code.
     *
     * @example
     * ```typescript
     * this.notificationService.showError(error.message);
     * ```
     */
    message: string;

    /**
     * Optional structured error response from the backend
     *
     * This property contains the detailed error response from the backend API,
     * which may include additional error codes, validation details, or other
     * structured error information. It's optional as not all HTTP errors
     * include a structured response body.
     *
     * @example
     * ```typescript
     * if (error.error?.validationErrors) {
     *   // Handle validation errors
     *   this.displayValidationErrors(error.error.validationErrors);
     * }
     * ```
     */
    error?: ErrorResponse;
}
