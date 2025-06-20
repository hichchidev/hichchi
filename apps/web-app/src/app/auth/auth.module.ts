import { NgModule } from "@angular/core";

import { AuthRoutingModule } from "./auth-routing.module";
import { AuthService } from "../core/servies/http";
import { LoginComponent } from "./login/login.component";
import { AppCommonModule } from "../common/app-common.module";

@NgModule({
    declarations: [LoginComponent],
    imports: [AppCommonModule, AuthRoutingModule],
    providers: [AuthService],
})
export class AuthModule {}
