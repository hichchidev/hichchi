import { Component, inject } from "@angular/core";
import { RouterLink } from "@angular/router";
import { DataFormGroup } from "@hichchi/ngx-utils";
import { FormBuilder, Validators } from "@angular/forms";
import { AuthFormData } from "@hichchi/ngx-auth";

@Component({
    selector: "app-admin-user",
    templateUrl: "./admin-user.component.html",
    styleUrl: "./admin-user.component.css",
    imports: [RouterLink],
})
export class AdminUserComponent {
    authForm: DataFormGroup<AuthFormData>;

    private readonly fb = inject(FormBuilder);

    constructor() {
        this.authForm = this.fb.group({
            firstName: ["", Validators.required],
            lastName: ["", Validators.required],
            authFieldValue: ["", [Validators.required]],
            password: ["", Validators.required],
        });
    }
}
