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
/**
 * Angular component for handling authentication forms with multiple provider support
 *
 * This component provides a comprehensive authentication interface that supports both
 * local authentication (sign-in/sign-up) and third-party authentication providers
 * (Google, Facebook). It manages form state, validation, and user interactions while
 * integrating with the authentication services and state management.
 *
 * The component dynamically adapts its form fields based on the authentication mode
 * (sign-in vs sign-up) and the configured authentication field type (email vs username).
 * It provides reactive form validation, loading states, error handling, and emits
 * events for successful authentication or errors.
 *
 * Key features:
 * - Local authentication with sign-in and sign-up modes
 * - Google OAuth integration
 * - Facebook authentication support (configurable)
 * - Dynamic form field management based on authentication mode
 * - Reactive form validation with Angular FormBuilder
 * - Loading states and error handling
 * - Configurable authentication field (email or username)
 * - Event emission for authentication success and errors
 * - Integration with AuthState and AuthService
 *
 * @example
 * ```html
 * <!-- Basic usage with all providers enabled -->
 * <hc-auth-card
 *   [local]="true"
 *   [google]="true"
 *   [facebook]="true"
 *   (onSignIn)="handleSignIn($event)"
 *   (onSignUp)="handleSignUp($event)"
 *   (onError)="handleError($event)">
 * </hc-auth-card>
 * ```
 *
 * @example
 * ```html
 * <!-- Local authentication only -->
 * <hc-auth-card
 *   [local]="true"
 *   [google]="false"
 *   [facebook]="false"
 *   (onSignIn)="handleSignIn($event)"
 *   (onError)="handleError($event)">
 * </hc-auth-card>
 * ```
 *
 * @example
 * ```html
 * <!-- Google authentication only -->
 * <hc-auth-card
 *   [local]="false"
 *   [google]="true"
 *   [facebook]="false"
 *   (onSignIn)="handleSignIn($event)"
 *   (onError)="handleError($event)">
 * </hc-auth-card>
 * ```
 *
 * @see {@link AuthService} Service for handling authentication operations
 * @see {@link AuthState} Service for managing authentication state
 * @see {@link AuthConfig} Configuration interface for authentication settings
 * @see {@link AuthFormData} Interface defining the form data structure
 * @see {@link AuthResponse} Interface for authentication response data
 * @see {@link User} Interface for user data structure
 * @see {@link HttpError} Interface for HTTP error handling
 */
export class AuthFormComponent {
    /** Input signal to control whether local authentication (username/email + password) is enabled */
    local: InputSignal<boolean> = input(true);

    /** Input signal to control whether Google OAuth authentication is enabled */
    google: InputSignal<boolean> = input(true);

    /** Input signal to control whether Facebook authentication is enabled */
    facebook: InputSignal<boolean> = input(true);

    /** Output emitter that fires when an authentication error occurs */
    onError: OutputEmitterRef<HttpError> = output<HttpError>();

    /** Output emitter that fires when a user successfully signs in */
    onSignIn: OutputEmitterRef<AuthResponse> = output<AuthResponse>();

    /** Output emitter that fires when a user successfully signs up */
    onSignUp: OutputEmitterRef<User> = output<User>();

    /** Writable signal indicating whether an authentication operation is in progress */
    isLoading: WritableSignal<boolean> = signal(false);

    /** Writable signal indicating whether the form is in sign-up mode (true) or sign-in mode (false) */
    isSignUp: WritableSignal<boolean> = signal(false);

    /** Writable signal indicating whether an error state is currently active */
    isError: WritableSignal<boolean> = signal(false);

    /** Writable signal containing the current authentication field type (EMAIL or USERNAME) */
    authField: WritableSignal<AuthField> = signal(AuthField.EMAIL);

    /** Writable signal containing the display label for the authentication field */
    authFieldLabel: WritableSignal<string> = signal(toFirstCase(AuthField.EMAIL));

    /** Writable signal containing the current error object, if any */
    error: WritableSignal<HttpError | null> = signal<HttpError | null>(null);

    /** Injected AuthState service for managing authentication state */
    authState = inject(AuthState);

    /** Reactive form group for handling authentication form data */
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

    /**
     * Handles Google OAuth sign-in authentication
     *
     * This method initiates the Google OAuth flow, retrieves an access token,
     * and authenticates the user with the backend service. It manages loading
     * states and emits appropriate events based on the authentication result.
     *
     * @returns Promise that resolves when the Google sign-in process completes
     *
     * @example
     * ```typescript
     * // Called automatically when user clicks Google sign-in button
     * await this.handleGoogleSignIn();
     * ```
     */
    async handleGoogleSignIn(): Promise<void> {
        const accessToken = await this.authService.googleSignIn();
        // noinspection ES6MissingAwait
        this.authState.authenticateWithToken(accessToken, undefined, true).subscribe({
            next: authResponse => {
                this.isLoading.set(false);
                this.onSignIn.emit(authResponse);
            },
            error: this.handleError.bind(this),
        });
    }

    /**
     * Handles local authentication sign-in process
     *
     * This method processes local authentication using username/email and password.
     * It sets loading and error states, then calls the AuthState service to perform
     * the sign-in operation.
     *
     * @param signInBody - The sign-in data containing authentication credentials
     *
     * @example
     * ```typescript
     * const signInData = {
     *   email: 'user@example.com',
     *   password: 'password123'
     * };
     * this.handleLocalAuth(signInData);
     * ```
     */
    handleLocalAuth(signInBody: SignInBody): void {
        this.isLoading.set(true);
        this.isError.set(false);

        this.authState.signIn(signInBody, undefined, true, false).subscribe();
    }

    /**
     * Handles user registration (sign-up) process
     *
     * This method processes user registration with the provided sign-up data.
     * It sets loading and error states, calls the AuthService to create a new user,
     * and emits the onSignUp event upon successful registration.
     *
     * @param signUpBody - The sign-up data containing user registration information
     *
     * @example
     * ```typescript
     * const signUpData = {
     *   firstName: 'John',
     *   lastName: 'Doe',
     *   email: 'john.doe@example.com',
     *   password: 'password123'
     * };
     * this.handleSignUp(signUpData);
     * ```
     */
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

    /**
     * Handles form submission for both sign-in and sign-up modes
     *
     * This method processes form submission by preventing the default browser behavior,
     * validating the form data, and routing to the appropriate authentication method
     * based on the current mode (sign-in or sign-up). It extracts form data and
     * calls either handleSignUp() or handleLocalAuth() accordingly.
     *
     * @param e - The form submit event to prevent default behavior
     *
     * @example
     * ```typescript
     * // Called automatically when form is submitted
     * // In template: <form (submit)="handleSubmit($event)">
     * handleSubmit(event);
     * ```
     */
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

    /**
     * Handles authentication errors and updates component state
     *
     * This method is called when any authentication operation fails. It updates
     * the component's loading and error states, stores the error for display,
     * and emits the onError event to notify parent components of the failure.
     *
     * @param error - The HTTP error object containing error details
     *
     * @example
     * ```typescript
     * // Called automatically by authentication methods on error
     * // Can also be called manually to handle custom errors
     * const customError = new HttpError('Custom error message');
     * this.handleError(customError);
     * ```
     */
    handleError(error: HttpError): void {
        this.isLoading.set(false);
        this.isError.set(true);
        this.error.set(error);
        this.onError.emit(error);
    }
}
