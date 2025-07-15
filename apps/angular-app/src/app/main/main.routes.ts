import { Route } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { UserComponent } from "./pages/user/user.component";

export const mainRoutes: Route[] = [
    {
        path: "",
        component: HomeComponent,
    },
    {
        path: "users",
        component: UserComponent,
    },
];
