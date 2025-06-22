import { Route } from "@angular/router";
import { LoginComponent } from "./pages/auth/login/login.component";

export const appRoutes: Route[] = [
    {
        path: "",
        component: LoginComponent,
    },
];
