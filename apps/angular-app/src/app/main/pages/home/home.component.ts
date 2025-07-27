/* eslint-disable */
import { Component, inject } from "@angular/core"
import { AuthState, PermissionDirective } from "@hichchi/ngx-auth";
import { RolePermission } from "../../../core/enums";
import { RouterLink } from "@angular/router";
import { UserService } from "../../../core/services/user.service";

@Component({
    selector: "app-home",
    templateUrl: "./home.component.html",
    styleUrl: "./home.component.scss",
    imports: [
        PermissionDirective,
        RouterLink
    ]
})
export class HomeComponent {
    authService = inject(AuthState)

    protected readonly RolePermission = RolePermission;

    constructor(protected readonly userService: UserService) {
    }

    async signOut() {
        await this.authService.signOut("/auth", true);
    }
}
