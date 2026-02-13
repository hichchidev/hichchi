import { Component, inject } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { NgxHichchiAuthModule } from "@hichchi/ngx-auth";
import { Router, RouterLink } from "@angular/router";

@Component({
    selector: "app-sign-in",
    templateUrl: "./sign-in.component.html",
    styleUrl: "./sign-in.component.scss",
    imports: [ReactiveFormsModule, NgxHichchiAuthModule, RouterLink],
})
export class SignInComponent {
    private readonly fb = inject(FormBuilder);

    private readonly router = inject(Router);

    signInForm;

    constructor() {
        this.signInForm = this.fb.group({
            email: ["", Validators.required],
            password: ["", Validators.required],
        });
    }

    async onSignIn(): Promise<void> {
        await this.router.navigate(["/"]);
    }

    onSignUp(): void {
        /* */
    }

    onError(): void {
        /* */
    }
}
