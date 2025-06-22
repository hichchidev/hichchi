import { ApplicationConfig, provideZoneChangeDetection } from "@angular/core";
import { provideRouter } from "@angular/router";
import { appRoutes } from "./app.routes";
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { apiUrlInterceptor, authInterceptor } from "@hichchi/ngx-utils";
import { environment } from "../environments/environment";

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(appRoutes),
        provideHttpClient(withInterceptors([apiUrlInterceptor(environment.apiBase), authInterceptor("/auth")])),
    ],
};
