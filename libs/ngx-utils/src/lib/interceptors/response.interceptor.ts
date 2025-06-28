// /**
//  * @fileoverview HTTP Response Interceptor (Template)
//  *
//  * This file contains a commented-out template for an HTTP response interceptor.
//  * The interceptor is designed to transform HTTP responses globally across the application,
//  * providing centralized response processing such as data transformation, logging,
//  * and format standardization.
//  *
//  * Key features of the template interceptor:
//  * - Global HTTP response transformation
//  * - Date string to Date object conversion
//  * - Response data normalization
//  * - Response logging and monitoring
//  * - Custom response processing based on content type
//  *
//  * The template includes a placeholder for string-to-date conversion, which is a common
//  * use case for transforming ISO date strings from APIs into JavaScript Date objects.
//  *
//  * To use this interceptor, uncomment the code and implement the desired response
//  * transformation logic.
//  *
//  * @example
//  * ```typescript
//  * // Example of how to implement and use this interceptor
//  * import { HttpEvent, HttpHandlerFn, HttpRequest, HttpResponse } from "@angular/common/http";
//  * import { Observable } from "rxjs";
//  * import { tap, map } from "rxjs/operators";
//  *
//  * export function responseInterceptor(
//  *   req: HttpRequest<unknown>,
//  *   next: HttpHandlerFn
//  * ): Observable<HttpEvent<unknown>> {
//  *   return next(req).pipe(
//  *     tap(event => {
//  *       if (event instanceof HttpResponse) {
//  *         // Log successful responses
//  *         console.log(`Response from ${req.url}:`, event.status);
//  *       }
//  *     }),
//  *     map(event => {
//  *       if (event instanceof HttpResponse && event.body) {
//  *         // Transform response data
//  *         const transformedBody = transformDates(event.body);
//  *         return event.clone({ body: transformedBody });
//  *       }
//  *       return event;
//  *     })
//  *   );
//  * }
//  *
//  * // Helper function to convert date strings to Date objects
//  * function transformDates(obj: any): any {
//  *   if (obj === null || obj === undefined) return obj;
//  *
//  *   if (typeof obj === 'string' && isISODateString(obj)) {
//  *     return new Date(obj);
//  *   }
//  *
//  *   if (Array.isArray(obj)) {
//  *     return obj.map(transformDates);
//  *   }
//  *
//  *   if (typeof obj === 'object') {
//  *     const transformed: any = {};
//  *     for (const key in obj) {
//  *       transformed[key] = transformDates(obj[key]);
//  *     }
//  *     return transformed;
//  *   }
//  *
//  *   return obj;
//  * }
//  *
//  * function isISODateString(value: string): boolean {
//  *   return /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z?$/.test(value);
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
//  *         responseInterceptor
//  *       ])
//  *     )
//  *   ]
//  * };
//  * ```
//  *
//  * @example
//  * ```typescript
//  * // Response transformation for API standardization
//  * export function responseInterceptor(
//  *   req: HttpRequest<unknown>,
//  *   next: HttpHandlerFn
//  * ): Observable<HttpEvent<unknown>> {
//  *   return next(req).pipe(
//  *     map(event => {
//  *       if (event instanceof HttpResponse) {
//  *         // Standardize API response format
//  *         if (event.body && typeof event.body === 'object') {
//  *           const standardizedBody = {
//  *             data: event.body,
//  *             timestamp: new Date(),
//  *             status: event.status,
//  *             url: req.url
//  *           };
//  *           return event.clone({ body: standardizedBody });
//  *         }
//  *       }
//  *       return event;
//  *     })
//  *   );
//  * }
//  * ```
//  *
//  * @example
//  * ```typescript
//  * // Conditional response processing based on content type
//  * export function responseInterceptor(
//  *   req: HttpRequest<unknown>,
//  *   next: HttpHandlerFn
//  * ): Observable<HttpEvent<unknown>> {
//  *   return next(req).pipe(
//  *     map(event => {
//  *       if (event instanceof HttpResponse) {
//  *         const contentType = event.headers.get('content-type');
//  *
//  *         if (contentType?.includes('application/json') && event.body) {
//  *           // Process JSON responses
//  *           return event.clone({
//  *             body: processJsonResponse(event.body)
//  *           });
//  *         }
//  *
//  *         if (contentType?.includes('text/plain')) {
//  *           // Process text responses
//  *           return event.clone({
//  *             body: { text: event.body, processed: true }
//  *           });
//  *         }
//  *       }
//  *       return event;
//  *     })
//  *   );
//  * }
//  * ```
//  *
//  * @see {@link HttpInterceptorFn} Angular HTTP interceptor function type
//  * @see {@link HttpResponse} Angular HTTP response interface
//  * @see {@link tap} RxJS operator for side effects
//  * @see {@link map} RxJS operator for data transformation
//  */
//
// // Template implementation (commented out - uncomment and modify as needed)
// import { HttpEvent, HttpHandlerFn, HttpRequest, HttpResponse } from "@angular/common/http";
// import { Observable } from "rxjs";
// import { tap } from "rxjs/operators";
//
// export function responseInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
//     return next(req).pipe(
//         tap(event => {
//             if (event instanceof HttpResponse) {
//                 // if (event.body) {
//                 //     stringToDate(event.body as {});
//                 // }
//             }
//             return event;
//         }),
//     );
// }
