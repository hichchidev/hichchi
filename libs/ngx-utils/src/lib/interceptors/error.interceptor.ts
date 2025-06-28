// /**
//  * @fileoverview HTTP Error Response Interceptor (Template)
//  *
//  * This file contains a commented-out template for an HTTP error response interceptor.
//  * The interceptor is designed to handle HTTP errors globally across the application,
//  * providing centralized error handling, user notifications, and authentication state management.
//  *
//  * Key features of the template interceptor:
//  * - Global HTTP error handling
//  * - User notification management
//  * - Authentication error handling with automatic sign-out
//  * - Conditional error notifications based on request context
//  * - Integration with application services for error display
//  *
//  * To use this interceptor, uncomment the code and ensure all dependencies are properly
//  * imported and configured in your application.
//  *
//  * @example
//  * ```typescript
//  * // Example of how to implement and use this interceptor
//  * import { inject } from "@angular/core";
//  * import { HttpEvent, HttpHandlerFn, HttpRequest, HttpContext, HttpContextToken } from "@angular/common/http";
//  * import { catchError, Observable, throwError } from "rxjs";
//  * import { AppService } from '../services/app.service';
//  * import { AuthState } from '../state/auth.state';
//  *
//  * // Define context token for controlling error notifications
//  * export const NOTIFY_ERRORS = new HttpContextToken<boolean>(() => true);
//  *
//  * export function errorResponseInterceptor(
//  *   req: HttpRequest<unknown>,
//  *   next: HttpHandlerFn,
//  * ): Observable<HttpEvent<unknown>> {
//  *   const app = inject(AppService);
//  *   const authState = inject(AuthState);
//  *   const showNotification = req.context.get(NOTIFY_ERRORS);
//  *
//  *   return next(req).pipe(
//  *     catchError((error: any) => {
//  *       // Handle different types of errors
//  *       if (error.status === 401) {
//  *         // Handle authentication errors
//  *         authState.signOut();
//  *         if (showNotification) {
//  *           app.showError('Session expired. Please log in again.');
//  *         }
//  *       } else if (error.status >= 500) {
//  *         // Handle server errors
//  *         if (showNotification) {
//  *           app.showError('Server error. Please try again later.');
//  *         }
//  *       } else if (showNotification) {
//  *         // Handle other client errors
//  *         app.showError(error.error?.message || 'An error occurred');
//  *       }
//  *
//  *       return throwError(() => error);
//  *     })
//  *   );
//  * }
//  * ```
//  *
//  * @example
//  * ```typescript
//  * // Using the interceptor in app configuration
//  * export const appConfig: ApplicationConfig = {
//  *   providers: [
//  *     provideHttpClient(
//  *       withInterceptors([
//  *         errorResponseInterceptor
//  *       ])
//  *     )
//  *   ]
//  * };
//  * ```
//  *
//  * @example
//  * ```typescript
//  * // Controlling error notifications per request
//  * @Injectable()
//  * export class DataService {
//  *   constructor(private http: HttpClient) {}
//  *
//  *   // Request with error notifications enabled (default)
//  *   getData() {
//  *     return this.http.get('/api/data');
//  *   }
//  *
//  *   // Request with error notifications disabled
//  *   getDataSilently() {
//  *     const context = new HttpContext().set(NOTIFY_ERRORS, false);
//  *     return this.http.get('/api/data', { context });
//  *   }
//  * }
//  * ```
//  *
//  * @see {@link HttpInterceptorFn} Angular HTTP interceptor function type
//  * @see {@link HttpErrorResponse} Angular HTTP error response interface
//  * @see {@link catchError} RxJS operator for error handling
//  * @see {@link HttpContext} Angular HTTP context for request-specific data
//  */
//
// Template implementation (commented out - uncomment and modify as needed)
// import { inject } from "@angular/core";
// import { HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
// import { catchError, Observable, throwError } from "rxjs";
//
// export function errorResponseInterceptor(
//     req: HttpRequest<unknown>,
//     next: HttpHandlerFn,
// ): Observable<HttpEvent<unknown>> {
//     const app = inject(AppService);
//     const authState = inject(AuthState);
//     const showNotification = req.context.get(NOTIFY_ERRORS);
//
//     return next(req).pipe(
//         catchError((error: HttpError<AuthError>) => {
//             const { error: err } = error;
//
//             if (!(err instanceof ErrorEvent)) {
//                 const isKnownAuthError = Object.values(AuthError).includes(err?.code as AuthError);
//
//                 if (err?.statusCode === 401 && !isKnownAuthError) {
//                     if (showNotification) app.error(err?.message || "Something went wrong");
//                     authState.signOut();
//                 } else if (showNotification) app.error(err?.message || "Something went wrong");
//             } else if (showNotification) app.error(err?.message || "Something went wrong");
//
//             return throwError(() => error);
//         }),
//     );
// }
