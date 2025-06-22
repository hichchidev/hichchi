// import { HttpEvent, HttpHandlerFn, HttpRequest, HttpResponse } from "@angular/common/http";
// import { Observable } from "rxjs";
// import { tap } from "rxjs/operators";
// import { isSuccessResponse } from "@core/utils";
// import { NOTIFY_ERRORS } from "@core/tokens";
// import { inject } from "@angular/core";
// import { AppService } from "@core/services";
//
// // import { stringToDate } from "../utils";
//
// export function responseInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
//     const app = inject(AppService);
//     const showNotification = req.context.get(NOTIFY_ERRORS);
//
//     return next(req).pipe(
//         tap(event => {
//             if (event instanceof HttpResponse) {
//                 if (isSuccessResponse(event.body) && showNotification) {
//                     app.successToast(event.body.message);
//                 }
//
//                 // if (event.body) {
//                 //     stringToDate(event.body as {});
//                 // }
//             }
//             return event;
//         }),
//     );
// }
