import { Route } from "@angular/router";
import { LoginComponent } from "./pages/login/login.component";

export const authRoutes: Route[] = [
    {
        path: "",
        component: LoginComponent,
    },
];
