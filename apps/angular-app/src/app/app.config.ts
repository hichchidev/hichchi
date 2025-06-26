import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from "@angular/core";
import { provideRouter } from "@angular/router";
import { appRoutes } from "./app.routes";
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { apiUrlInterceptor } from "@hichchi/ngx-utils";
import { authInterceptor, NgxHichchiAuthModule } from "@hichchi/ngx-auth";
import { environment } from "../environments/environment";
import { AuthField } from "@hichchi/nest-connector/auth";

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(appRoutes),
        provideHttpClient(withInterceptors([apiUrlInterceptor(environment.apiBase), authInterceptor("/auth")])),
        importProvidersFrom(
            NgxHichchiAuthModule.forRoot({ authField: AuthField.EMAIL, apiBaseURL: "http://localhost:8080" }),
        ),
    ],
};
