/* eslint-disable */
import { Component } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms"
import { prune } from "@hichchi/utils";
import { LoginBody } from "@hichchi/nest-connector/auth";
import { AuthService } from "../../../core/servies/http";

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrl: "./login.component.scss",
    imports: [
        ReactiveFormsModule,
    ],
})
export class LoginComponent {
    loginForm;

    constructor(
        private readonly fb: FormBuilder,
        private readonly authService: AuthService,
    ) {
        this.loginForm = this.fb.group({
            email: ["", Validators.required],
            password: ["", Validators.required],
        });
    }

    login(): void {
        console.log(prune<LoginBody>(this.loginForm.value));
        this.authService.signIn(prune<LoginBody>(this.loginForm.value)).subscribe({
            next: response => {
                console.log(response);
            },
            error: error => {
                console.error(error);
            },
        });
    }
}
