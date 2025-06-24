import { Route } from "@angular/router";
import { SignInComponent } from "./pages/sign-in/sign-in.component";

export const authRoutes: Route[] = [
    {
        path: "",
        component: SignInComponent,
    },
];
