import { Component } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { NgxHichchiAuthModule } from "@hichchi/ngx-auth";
import { Router, RouterLink, RouterOutlet } from "@angular/router";

@Component({
    selector: "app-sign-in",
    templateUrl: "./complete.component.html",
    styleUrl: "./complete.component.scss",
    imports: [ReactiveFormsModule, NgxHichchiAuthModule, RouterOutlet, RouterLink],
})
export class CompleteComponent {
    signInForm;

    constructor(
        private readonly fb: FormBuilder,
        private readonly router: Router,
    ) {
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
