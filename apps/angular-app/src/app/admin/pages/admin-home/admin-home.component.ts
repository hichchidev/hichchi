/* eslint-disable */
import { Component } from "@angular/core"
import { RolePermission } from "../../../core/enums";

@Component({
    selector: "app-admin-home",
    templateUrl: "./admin-home.component.html",
    styleUrl: "./admin-home.component.scss",
    imports: []
})
export class AdminHomeComponent {

    protected readonly RolePermission = RolePermission;
}
