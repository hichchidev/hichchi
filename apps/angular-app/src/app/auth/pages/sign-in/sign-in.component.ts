/* eslint-disable */
import { Component, inject } from "@angular/core"
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms"
import { prune } from "@hichchi/utils"
import { SignInBody } from "@hichchi/nest-connector/auth"
import { AuthState } from "@hichchi/ngx-utils"

@Component({
    selector: "app-sign-in",
    templateUrl: "./sign-in.component.html",
    styleUrl: "./sign-in.component.scss",
    imports: [
        ReactiveFormsModule,
    ],
})
export class SignInComponent {
    authState = inject(AuthState)

    signInForm;

    constructor(
        private readonly fb: FormBuilder,
    ) {
        this.signInForm = this.fb.group({
            email: ["", Validators.required],
            password: ["", Validators.required],
        });

    }

    signIn(): void {
        console.log(prune<SignInBody>(this.signInForm.value));
        this.authState.signIn(prune<SignInBody>(this.signInForm.value), "/").subscribe({
            next: response => {
                console.log(response);
            },
            error: error => {
                console.error(error);
            },
        });
    }
}
