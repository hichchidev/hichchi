import { Route } from "@angular/router";
import { LandingHomeComponent } from "./pages/landing-home/landing-home.component";

export const landingRoutes: Route[] = [
    {
        path: "",
        component: LandingHomeComponent,
    },
];
