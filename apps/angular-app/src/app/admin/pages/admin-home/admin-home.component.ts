/* eslint-disable */
import { Component, inject } from "@angular/core"
import { RolePermission } from "../../../core/enums";
import { RouterLink } from "@angular/router";
import { AuthState, PermissionDirective } from "@hichchi/ngx-auth";
import { UserService } from "../../../core/services/user.service";

@Component({
    selector: "app-admin-home",
    templateUrl: "./admin-home.component.html",
    styleUrl: "./admin-home.component.scss",
    imports: [
        PermissionDirective,
        RouterLink
    ]
})
export class AdminHomeComponent {
    authService = inject(AuthState)

    protected readonly RolePermission = RolePermission;

    constructor(protected readonly userService: UserService) {
    }

    async signOut() {
        await this.authService.signOut("/auth", true);
    }
}
