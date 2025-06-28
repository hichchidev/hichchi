/* eslint-disable */
import { Component } from "@angular/core"
import { PermissionDirective } from "@hichchi/ngx-auth";
import { RolePermission } from "../../core/enums";

@Component({
    selector: "app-home",
    templateUrl: "./home.component.html",
    styleUrl: "./home.component.scss",
    imports: [
        PermissionDirective
    ]
})
export class HomeComponent {

    protected readonly RolePermission = RolePermission;
}
