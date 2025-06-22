/* eslint-disable */
import { Component, inject } from "@angular/core"
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms"
import { prune } from "@hichchi/utils"
import { SignInBody } from "@hichchi/nest-connector/auth"
import { AuthState } from "@hichchi/ngx-utils"

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrl: "./login.component.scss",
    imports: [
        ReactiveFormsModule,
    ],
})
export class LoginComponent {
    authState = inject(AuthState)
    loginForm;

    constructor(
        private readonly fb: FormBuilder,
    ) {
        this.loginForm = this.fb.group({
            email: ["", Validators.required],
            password: ["", Validators.required],
        });

    }

    signIn(): void {
        console.log(prune<SignInBody>(this.loginForm.value));
        this.authState.signIn(prune<SignInBody>(this.loginForm.value), "/").subscribe({
            next: response => {
                console.log(response);
            },
            error: error => {
                console.error(error);
            },
        });
    }
}
