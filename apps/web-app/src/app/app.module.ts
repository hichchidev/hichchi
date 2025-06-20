import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { AuthModule } from "./auth/auth.module";
import { AppCommonModule } from "./common/app-common.module";
import { provideHttpClient } from "@angular/common/http";

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, AppCommonModule, AppRoutingModule, AuthModule],
    providers: [provideHttpClient()],
    bootstrap: [AppComponent],
})
export class AppModule {}
