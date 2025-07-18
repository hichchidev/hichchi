import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from "@angular/core";
import { provideRouter } from "@angular/router";
import { appRoutes } from "./app.routes";
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { apiUrlInterceptor, errorResponseInterceptor } from "@hichchi/ngx-utils";
import { authInterceptor, AuthState, NgxHichchiAuthModule } from "@hichchi/ngx-auth";
import { environment } from "../environments/environment";
import { AuthField } from "@hichchi/nest-connector/auth";
import { AppService } from "./app.service";
import { ToastrModule } from "ngx-toastr";
import { provideAnimations } from "@angular/platform-browser/animations";

export const appConfig: ApplicationConfig = {
    providers: [
        provideAnimations(),
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(appRoutes),
        importProvidersFrom(
            ToastrModule.forRoot(),
            NgxHichchiAuthModule.forRoot({ authField: AuthField.EMAIL, apiBaseURL: "http://localhost:8080" }),
        ),
        provideHttpClient(
            withInterceptors([
                apiUrlInterceptor(environment.apiBase),
                authInterceptor("/auth"),
                errorResponseInterceptor(AppService, AuthState),
            ]),
        ),
    ],
};
