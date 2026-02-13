import { authGuard, AuthGuardCondition, roleGuard, RoleGuardOption } from "@hichchi/ngx-auth";
import { AuthLayoutComponent } from "./layouts/auth-layout/auth-layout.component";
import { MainLayoutComponent } from "./layouts/main-layout/main-layout.component";
import { Route } from "@angular/router";
import { RoleName } from "./core/enums";
import { LandingLayoutComponent } from "./layouts/admin-layout/landing-layout.component";

/**
 * Role-based redirection defaults used by the auth guard.
 */
export const redirectOptions: RoleGuardOption[] = [
    { state: RoleName.ADMIN, redirect: "admin" },
    { state: RoleName.USER, redirect: "" },
];

/**
 * Application route table.
 */
export const routes: Route[] = [
    {
        path: "landing",
        component: LandingLayoutComponent,
        loadChildren: () => import("./landing/landing.routes.js").then(r => r.landingRoutes),
    },
    {
        path: "",
        component: MainLayoutComponent,
        loadChildren: () => import("./main/main.routes.js").then(r => r.mainRoutes),
        canActivate: [
            authGuard(AuthGuardCondition.SIGNED_IN, true, "/auth"),
            roleGuard(RoleName.USER, redirectOptions),
        ],
    },
    {
        path: "admin",
        component: LandingLayoutComponent,
        loadChildren: () => import("./admin/admin.routes.js").then(r => r.adminRoutes),
        canActivate: [
            authGuard(AuthGuardCondition.SIGNED_IN, true, "/auth"),
            roleGuard(RoleName.ADMIN, redirectOptions),
        ],
    },
    {
        path: "auth",
        component: AuthLayoutComponent,
        loadChildren: () => import("./auth/auth.routes.js").then(r => r.authRoutes),
        canActivate: [authGuard(AuthGuardCondition.SIGNED_IN, false, "/")],
    },
    {
        path: "**",
        redirectTo: "",
        pathMatch: "full",
    },
];
