/* eslint-disable @angular-eslint/no-output-on-prefix */
import {
    Component,
    effect,
    inject,
    Inject,
    input,
    InputSignal,
    output,
    OutputEmitterRef,
    signal,
    WritableSignal,
} from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { AuthField, AuthResponse, SignInBody, SignUpBody, User } from "@hichchi/nest-connector/auth";
import { AuthConfig, AuthFormData } from "../../interfaces";
import { AuthService } from "../../services";
import { AUTH_CONFIG } from "../../tokens";
import { toFirstCase } from "@hichchi/utils";
import { DataFormGroup, HttpError, validatedFormData } from "@hichchi/ngx-utils";
import { AuthState } from "../../state";

@Component({
    selector: "hc-auth-card",
    standalone: false,
    templateUrl: "./auth-form.component.html",
    styleUrl: "./auth-form.component.scss",
})
export class AuthFormComponent {
    local: InputSignal<boolean> = input(true);

    google: InputSignal<boolean> = input(true);

    facebook: InputSignal<boolean> = input(true);

    onError: OutputEmitterRef<HttpError> = output<HttpError>();

    onSignIn: OutputEmitterRef<AuthResponse> = output<AuthResponse>();

    onSignUp: OutputEmitterRef<User> = output<User>();

    isLoading: WritableSignal<boolean> = signal(false);

    isSignUp: WritableSignal<boolean> = signal(false);

    isError: WritableSignal<boolean> = signal(false);

    authField: WritableSignal<AuthField> = signal(AuthField.EMAIL);

    authFieldLabel: WritableSignal<string> = signal(toFirstCase(AuthField.EMAIL));

    error: WritableSignal<HttpError | null> = signal<HttpError | null>(null);

    authState = inject(AuthState);

    authForm: DataFormGroup<AuthFormData>;

    constructor(
        @Inject(AUTH_CONFIG) readonly config: AuthConfig,
        private readonly fb: FormBuilder,
        private readonly authService: AuthService,
    ) {
        this.authField.set(config.authField === AuthField.USERNAME ? AuthField.USERNAME : AuthField.EMAIL);
        this.authFieldLabel.set(toFirstCase(this.authField()));

        this.authForm = this.fb.group({
            firstName: ["", Validators.required],
            lastName: ["", Validators.required],
            authFieldValue: ["", [Validators.required]],
            password: ["", Validators.required],
        });

        effect((): void => {
            if (this.isSignUp()) {
                this.authForm.controls?.firstName?.enable();
                this.authForm.controls?.lastName?.enable();
            } else {
                this.authForm.controls?.firstName?.disable();
                this.authForm.controls?.lastName?.disable();
            }
        });
    }

    async handleGoogleSignIn(): Promise<void> {
        const accessToken = await this.authService.googleSignIn();
        this.authState.authenticateWithToken(accessToken).subscribe({
            next: authResponse => {
                this.isLoading.set(false);
                this.onSignIn.emit(authResponse);
            },
            error: this.handleError.bind(this),
        });
    }

    handleLocalAuth(signInBody: SignInBody): void {
        this.isLoading.set(true);
        this.isError.set(false);

        this.authState.signIn(signInBody).subscribe({
            next: authResponse => {
                this.isLoading.set(false);
                this.onSignIn.emit(authResponse);
            },
            error: this.handleError.bind(this),
        });
    }

    handleSignUp(signUpBody: SignUpBody): void {
        this.isLoading.set(true);
        this.isError.set(false);

        this.authService.signUp(signUpBody).subscribe({
            next: user => {
                this.isLoading.set(false);
                this.onSignUp.emit(user);
            },
            error: this.handleError.bind(this),
        });
    }

    handleSubmit(e: SubmitEvent): void {
        e.preventDefault();
        if (this.isSignUp()) {
            const formData = validatedFormData<AuthFormData>(this.authForm);
            if (formData) {
                this.handleSignUp({
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    [this.authField()]: formData.authFieldValue,
                    password: formData.password,
                });
            }
        } else {
            const formData = validatedFormData<AuthFormData>(this.authForm);
            if (formData) {
                this.handleLocalAuth({
                    [this.authField()]: formData.authFieldValue,
                    password: formData.password,
                });
            }
        }
    }

    handleError(error: HttpError): void {
        this.isLoading.set(false);
        this.isError.set(true);
        this.error.set(error);
        this.onError.emit(error);
    }
}
