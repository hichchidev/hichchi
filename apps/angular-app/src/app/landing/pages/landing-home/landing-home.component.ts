/* eslint-disable */
import { Component } from "@angular/core"
import { RolePermission } from "../../../core/enums";

@Component({
    selector: "app-landing-home",
    templateUrl: "./landing-home.component.html",
    styleUrl: "./landing-home.component.scss",
    imports: []
})
export class LandingHomeComponent {

    protected readonly RolePermission = RolePermission;
}
