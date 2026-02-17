import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners } from "@angular/core";
import { provideRouter } from "@angular/router";
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { routes } from "./app.routes";
import { apiInterceptor, errorResponseInterceptor } from "@hichchi/ngx-utils";
import { authInterceptor, AuthState, NgxHichchiAuthModule } from "@hichchi/ngx-auth";
import { environment } from "../environments/environment";
import { AppService } from "./app.service";
import { ToastrModule } from "ngx-toastr";
import { AuthField } from "@hichchi/nest-connector/auth";

/**
 * Global Angular providers and runtime configuration.
 */
export const appConfig: ApplicationConfig = {
    providers: [
        provideBrowserGlobalErrorListeners(),
        provideRouter(routes),
        provideHttpClient(
            withInterceptors([
                apiInterceptor(environment.apiBase, environment.splitDomain),
                authInterceptor("/auth"),
                errorResponseInterceptor(AppService, AuthState),
            ]),
        ),
        importProvidersFrom(
            ToastrModule.forRoot(),
            NgxHichchiAuthModule.forRoot({
                authField: AuthField.EMAIL,
                apiBaseURL: environment.apiBase,
                splitDomain: environment.splitDomain,
            }),
        ),
    ],
};
