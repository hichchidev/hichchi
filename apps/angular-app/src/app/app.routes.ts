import { Route } from "@angular/router";
import { AuthLayoutComponent } from "./layouts/auth-layout/auth-layout.component";
import { MainLayoutComponent } from "./layouts/main-layout/main-layout.component";

export const appRoutes: Route[] = [
    {
        path: "auth",
        component: AuthLayoutComponent,
        loadChildren: () => import("./auth/auth.routes").then(r => r.authRoutes),
    },
    {
        path: "",
        component: MainLayoutComponent,
        loadChildren: () => import("./main/main.routes").then(r => r.mainRoutes),
    },
];
