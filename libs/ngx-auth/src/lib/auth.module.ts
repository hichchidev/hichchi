import { ModuleWithProviders, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { provideHttpClient } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AuthFormComponent } from "./components";
import { AuthService } from "./services";
import { AuthConfig } from "./interfaces";
import { AUTH_CONFIG } from "./tokens";
import { ButtonComponent, HcCardComponent, HcSeparatorComponent } from "@hichchi/ngx-ui";

@NgModule({
    declarations: [AuthFormComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ButtonComponent,
        HcCardComponent,
        HcCardComponent,
        HcSeparatorComponent,
    ],
    exports: [AuthFormComponent],
})
export class NgxHichchiAuthModule {
    static forRoot(config: AuthConfig): ModuleWithProviders<NgxHichchiAuthModule> {
        return {
            ngModule: NgxHichchiAuthModule,
            providers: [{ provide: AUTH_CONFIG, useValue: config }, provideHttpClient(), AuthService],
        };
    }
}
