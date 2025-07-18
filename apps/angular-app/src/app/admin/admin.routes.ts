import { Route } from "@angular/router";
import { AdminHomeComponent } from "./pages/admin-home/admin-home.component";
import { AdminUserComponent } from "./pages/admin-user/admin-user.component";

export const adminRoutes: Route[] = [
    {
        path: "",
        component: AdminHomeComponent,
    },
    {
        path: "users",
        component: AdminUserComponent,
    },
];
