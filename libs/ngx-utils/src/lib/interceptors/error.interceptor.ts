// import { inject } from "@angular/core";
// import { HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
// import { catchError, Observable, throwError } from "rxjs";
// import { HttpError } from "@core/interfaces";
// import { AppService } from "@core/services";
// import { AuthState } from "@core/state";
// import { AuthError } from "@auth/responses";
// import { NOTIFY_ERRORS } from "@core/tokens";
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
