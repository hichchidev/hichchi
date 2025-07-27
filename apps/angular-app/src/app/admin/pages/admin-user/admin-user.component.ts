import { Component } from "@angular/core";
import { DataFormGroup } from "@hichchi/ngx-utils";
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { AuthFormData } from "@hichchi/ngx-auth";
import { CommonModule } from "@angular/common";

@Component({
    selector: "app-admin-user",
    templateUrl: "./admin-user.component.html",
    styleUrl: "./admin-user.component.css",
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
})
export class AdminUserComponent {
    authForm: DataFormGroup<AuthFormData>;

    constructor(private readonly fb: FormBuilder) {
        this.authForm = this.fb.group({
            firstName: ["", Validators.required],
            lastName: ["", Validators.required],
            authFieldValue: ["", [Validators.required]],
            password: ["", Validators.required],
        });
    }
}
