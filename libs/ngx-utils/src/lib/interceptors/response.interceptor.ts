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
