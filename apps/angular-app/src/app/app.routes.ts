import { RouteCondition, authGuard } from "@hichchi/ngx-auth";
import { AuthLayoutComponent } from "./layouts/auth-layout/auth-layout.component";
import { MainLayoutComponent } from "./layouts/main-layout/main-layout.component";
import { Route } from "@angular/router";

export const appRoutes: Route[] = [
    {
        path: "",
        component: MainLayoutComponent,
        loadChildren: () => import("./main/main.routes").then(r => r.mainRoutes),
        canActivate: [authGuard(RouteCondition.SIGNED_IN, true, "/auth")],
    },
    {
        path: "auth",
        component: AuthLayoutComponent,
        loadChildren: () => import("./auth/auth.routes").then(r => r.authRoutes),
        canActivate: [authGuard(RouteCondition.SIGNED_IN, false, "/")],
    },
    {
        path: "**",
        redirectTo: "",
        pathMatch: "full",
    },
];
