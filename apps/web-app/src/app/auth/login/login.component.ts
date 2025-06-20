/* eslint-disable */
import { Component } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "../../core/servies/http";
import { prune } from "@hichchi/utils";
import { LoginBody } from "@hichchi/nest-connector/auth";

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrl: "./login.component.scss",
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
        this.authService.login(prune<LoginBody>(this.loginForm.value)).subscribe({
            next: response => {
                console.log(response);
            },
            error: error => {
                console.error(error);
            },
        });
    }
}
