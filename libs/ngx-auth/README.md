<!--suppress ALL -->

<div align="center">
  <h1>🅰️ @hichchi/ngx-auth</h1>
  <p>
    <strong>A utility library for Angular applications with common services, interceptors, and state management</strong>
  </p>
  <p>
    <a href="https://www.npmjs.com/package/@hichchi/ngx-auth">
      <img src="https://img.shields.io/npm/v/@hichchi/ngx-auth?style=flat-square&color=blue" alt="npm version">
    </a>
    <a href="https://www.npmjs.com/package/@hichchi/ngx-auth">
      <img src="https://img.shields.io/npm/dm/@hichchi/ngx-auth?style=flat-square&color=green" alt="npm downloads">
    </a>
    <a href="https://github.com/hichchidev/hichchi/blob/main/LICENSE">
      <img src="https://img.shields.io/badge/license-MIT-green?style=flat-square" alt="License">
    </a>
    <img src="https://img.shields.io/badge/angular-19.0.0-red?style=flat-square" alt="Angular Version">
  </p>
  <p>
    <em>Part of the <a href="https://github.com/hichchidev/hichchi">Hichchi</a> ecosystem - A powerful, scalable application built with Nx workspace</em>
  </p>
</div>

---

## 📦 Installation

```bash
npm install @hichchi/ngx-auth
```

## 🌟 Overview

This library provides a collection of utilities for Angular applications, including HTTP interceptors, authentication services, state management, and form utilities. It helps streamline common tasks in Angular development and promotes consistent implementation patterns.

## ✨ Key Features

- 🌐 **HTTP Interceptors**: Pre-configured interceptors for API URLs, authentication, error handling, and response transformation
- 🔐 **Authentication Services**: Services for handling user authentication and authorization
- 📊 **State Management**: State management utilities for authentication and other application states
- 📝 **Form Utilities**: Helper functions for working with Angular forms
- 📋 **Interface Definitions**: TypeScript interfaces for consistent typing

## 🚀 Usage

### HTTP Interceptors

```typescript
import { NgModule } from "@angular/core";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import {
  ApiUrlInterceptor,
  AuthInterceptor,
  ErrorInterceptor,
  ResponseInterceptor,
} from "@hichchi/ngx-auth/interceptors";

@NgModule({
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ApiUrlInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ResponseInterceptor, multi: true },
  ],
})
export class AppModule {}
```

### Authentication Service

```typescript
import { Component } from "@angular/core";
import { AuthService } from "@hichchi/ngx-auth/services";

@Component({
  selector: "app-sign-in",
  template: `
    <form (submit)="signIn()">
      <input [(ngModel)]="username" name="username" placeholder="Username" />
      <input
        [(ngModel)]="password"
        name="password"
        type="password"
        placeholder="Password"
      />
      <button type="submit">Sign In</button>
    </form>
  `,
})
export class SignInComponent {
  username = "";
  password = "";

  constructor(private authService: AuthService) {}

  signIn() {
    this.authService
      .signIn({
        email: this.username,
        password: this.password,
      })
      .subscribe(
        (response) => console.log("Sign in successful", response),
        (error) => console.error("Sign in failed", error),
      );
  }
}
```

### State Management

```typescript
import { Component, OnInit } from "@angular/core";
import { AuthState } from "@hichchi/ngx-auth/state";

@Component({
  selector: "app-header",
  template: `
    <nav>
      <a routerLink="/">Home</a>
      <a *ngIf="isLoggedIn" routerLink="/profile">Profile</a>
      <button *ngIf="isLoggedIn" (click)="signOut()">Sign Out</button>
      <a *ngIf="!isLoggedIn" routerLink="/sign-in">Sign In</a>
    </nav>
  `,
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;

  constructor(private authState: AuthState) {}

  ngOnInit() {
    this.isLoggedIn = this.authState.signedIn();
  }

  signOut() {
    this.authState.signOut();
  }
}
```

---

## 🔧 Development

### Building

```bash
nx build ngx-auth
```

### Running unit tests

```bash
nx test ngx-auth
```

Tests are executed via [Jest](https://jestjs.io).

---

<div align="center">

**Made with ❤️ by [Hichchi Dev](https://github.com/hichchidev)**

[![Hichchi Ecosystem](https://img.shields.io/badge/🏠_Hichchi_Ecosystem-blue)](https://github.com/hichchidev/hichchi)
[![Report Bug](https://img.shields.io/badge/🐛_Report_Bug-red)](https://github.com/hichchidev/hichchi/issues)
[![Request Feature](https://img.shields.io/badge/✨_Request_Feature-green)](https://github.com/hichchidev/hichchi/issues)

_Building the future of Angular authentication, one commit at a time_

</div>

---

# 📖 API Documentation

Complete technical reference for all classes, interfaces, methods, and types in this library.

**Auto-generated by TypeDoc** - Browse through detailed API references, code examples, and implementation guides below.

<!-- TypeDoc generated documentation will be appended below this point -->

---

## 📋 API Table of Contents

- [Classes](#classes)
  - [AuthFormComponent](#authformcomponent)
  - [AuthService](#authservice)
  - [NgxHichchiAuthModule](#ngxhichchiauthmodule)
  - [PermissionDirective](#permissiondirective)
- [Enumerations](#enumerations)
  - [AuthGuardCondition](#authguardcondition)
- [Functions](#functions)
  - [authGuard()](#authguard)
  - [authInterceptor()](#authinterceptor)
  - [roleGuard()](#roleguard)
- [Interfaces](#interfaces)
  - [AuthConfig](#authconfig)
  - [AuthFormData](#authformdata)
  - [AuthGuardOption](#authguardoption)
  - [AuthStateModel](#authstatemodel)
  - [RoleGuardOption](#roleguardoption)
- [Variables](#variables)
  - [AuthState](#authstate)
  - [SKIPPED_ERRORS](#skipped_errors)

## Classes

### AuthFormComponent

Defined in: [libs/ngx-auth/src/lib/components/auth-form/auth-form.component.ts:98](https://github.com/hichchidev/hichchi/blob/1821ea22bf9e9b89c932111f16da4943c07c58c7/libs/ngx-auth/src/lib/components/auth-form/auth-form.component.ts#L98)

#### Constructors

##### Constructor

```ts
new AuthFormComponent(
   config,
   fb,
   authService): AuthFormComponent;
```

Defined in: [libs/ngx-auth/src/lib/components/auth-form/auth-form.component.ts:141](https://github.com/hichchidev/hichchi/blob/1821ea22bf9e9b89c932111f16da4943c07c58c7/libs/ngx-auth/src/lib/components/auth-form/auth-form.component.ts#L141)

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`config`

</td>
<td>

[`AuthConfig`](#authconfig)

</td>
</tr>
<tr>
<td>

`fb`

</td>
<td>

`FormBuilder`

</td>
</tr>
<tr>
<td>

`authService`

</td>
<td>

[`AuthService`](#authservice)

</td>
</tr>
</tbody>
</table>

###### Returns

[`AuthFormComponent`](#authformcomponent)

#### Methods

##### handleError()

```ts
handleError(error): void;
```

Defined in: [libs/ngx-auth/src/lib/components/auth-form/auth-form.component.ts:309](https://github.com/hichchidev/hichchi/blob/1821ea22bf9e9b89c932111f16da4943c07c58c7/libs/ngx-auth/src/lib/components/auth-form/auth-form.component.ts#L309)

Handles authentication errors and updates component state

This method is called when any authentication operation fails. It updates
the component's loading and error states, stores the error for display,
and emits the onError event to notify parent components of the failure.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`error`

</td>
<td>

`HttpError`

</td>
<td>

The HTTP error object containing error details

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### Example

```typescript
// Called automatically by authentication methods on error
// Can also be called manually to handle custom errors
const customError = new HttpError("Custom error message");
this.handleError(customError);
```

##### handleGoogleSignIn()

```ts
handleGoogleSignIn(): Promise<void>;
```

Defined in: [libs/ngx-auth/src/lib/components/auth-form/auth-form.component.ts:182](https://github.com/hichchidev/hichchi/blob/1821ea22bf9e9b89c932111f16da4943c07c58c7/libs/ngx-auth/src/lib/components/auth-form/auth-form.component.ts#L182)

Handles Google OAuth sign-in authentication

This method initiates the Google OAuth flow, retrieves an access token,
and authenticates the user with the backend service. It manages loading
states and emits appropriate events based on the authentication result.

###### Returns

`Promise`<`void`>

Promise that resolves when the Google sign-in process completes

###### Example

```typescript
// Called automatically when user clicks Google sign-in button
await this.handleGoogleSignIn();
```

##### handleLocalAuth()

```ts
handleLocalAuth(signInBody): void;
```

Defined in: [libs/ngx-auth/src/lib/components/auth-form/auth-form.component.ts:212](https://github.com/hichchidev/hichchi/blob/1821ea22bf9e9b89c932111f16da4943c07c58c7/libs/ngx-auth/src/lib/components/auth-form/auth-form.component.ts#L212)

Handles local authentication sign-in process

This method processes local authentication using username/email and password.
It sets loading and error states, then calls the AuthState service to perform
the sign-in operation.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`signInBody`

</td>
<td>

`SignInBody`

</td>
<td>

The sign-in data containing authentication credentials

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### Example

```typescript
const signInData = {
  email: "user@example.com",
  password: "password123",
};
this.handleLocalAuth(signInData);
```

##### handleSignUp()

```ts
handleSignUp(signUpBody): void;
```

Defined in: [libs/ngx-auth/src/lib/components/auth-form/auth-form.component.ts:239](https://github.com/hichchidev/hichchi/blob/1821ea22bf9e9b89c932111f16da4943c07c58c7/libs/ngx-auth/src/lib/components/auth-form/auth-form.component.ts#L239)

Handles user registration (sign-up) process

This method processes user registration with the provided sign-up data.
It sets loading and error states, calls the AuthService to create a new user,
and emits the onSignUp event upon successful registration.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`signUpBody`

</td>
<td>

`SignUpBody`

</td>
<td>

The sign-up data containing user registration information

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### Example

```typescript
const signUpData = {
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  password: "password123",
};
this.handleSignUp(signUpData);
```

##### handleSubmit()

```ts
handleSubmit(e): void;
```

Defined in: [libs/ngx-auth/src/lib/components/auth-form/auth-form.component.ts:269](https://github.com/hichchidev/hichchi/blob/1821ea22bf9e9b89c932111f16da4943c07c58c7/libs/ngx-auth/src/lib/components/auth-form/auth-form.component.ts#L269)

Handles form submission for both sign-in and sign-up modes

This method processes form submission by preventing the default browser behavior,
validating the form data, and routing to the appropriate authentication method
based on the current mode (sign-in or sign-up). It extracts form data and
calls either handleSignUp() or handleLocalAuth() accordingly.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`e`

</td>
<td>

`SubmitEvent`

</td>
<td>

The form submit event to prevent default behavior

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### Example

```typescript
// Called automatically when form is submitted
// In template: <form (submit)="handleSubmit($event)">
handleSubmit(event);
```

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Modifier</th>
<th>Type</th>
<th>Description</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="authfield"></a> `authField`

</td>
<td>

`public`

</td>
<td>

`WritableSignal`<`AuthField`>

</td>
<td>

Writable signal containing the current authentication field type (EMAIL or USERNAME)

</td>
<td>

[libs/ngx-auth/src/lib/components/auth-form/auth-form.component.ts:127](https://github.com/hichchidev/hichchi/blob/1821ea22bf9e9b89c932111f16da4943c07c58c7/libs/ngx-auth/src/lib/components/auth-form/auth-form.component.ts#L127)

</td>
</tr>
<tr>
<td>

<a id="authfieldlabel"></a> `authFieldLabel`

</td>
<td>

`public`

</td>
<td>

`WritableSignal`<`string`>

</td>
<td>

Writable signal containing the display label for the authentication field

</td>
<td>

[libs/ngx-auth/src/lib/components/auth-form/auth-form.component.ts:130](https://github.com/hichchidev/hichchi/blob/1821ea22bf9e9b89c932111f16da4943c07c58c7/libs/ngx-auth/src/lib/components/auth-form/auth-form.component.ts#L130)

</td>
</tr>
<tr>
<td>

<a id="authform"></a> `authForm`

</td>
<td>

`public`

</td>
<td>

`DataFormGroup`<[`AuthFormData`](#authformdata)>

</td>
<td>

Reactive form group for handling authentication form data

</td>
<td>

[libs/ngx-auth/src/lib/components/auth-form/auth-form.component.ts:139](https://github.com/hichchidev/hichchi/blob/1821ea22bf9e9b89c932111f16da4943c07c58c7/libs/ngx-auth/src/lib/components/auth-form/auth-form.component.ts#L139)

</td>
</tr>
<tr>
<td>

<a id="authstate"></a> `authState`

</td>
<td>

`public`

</td>
<td>

`object` & `StateSource`<{ `accessToken`: `null` | `AccessToken`; `accessTokenExpiresOn`: `null` | `Date`; `refreshToken`: `null` | `RefreshToken`; `refreshTokenExpiresOn`: `null` | `Date`; `sessionId`: `null` | `string`; `signedIn`: `boolean`; `user`: `null` | `User`<`string`, `string`>; }>

</td>
<td>

Injected AuthState service for managing authentication state

</td>
<td>

[libs/ngx-auth/src/lib/components/auth-form/auth-form.component.ts:136](https://github.com/hichchidev/hichchi/blob/1821ea22bf9e9b89c932111f16da4943c07c58c7/libs/ngx-auth/src/lib/components/auth-form/auth-form.component.ts#L136)

</td>
</tr>
<tr>
<td>

<a id="config"></a> `config`

</td>
<td>

`readonly`

</td>
<td>

[`AuthConfig`](#authconfig)

</td>
<td>

‐

</td>
<td>

[libs/ngx-auth/src/lib/components/auth-form/auth-form.component.ts:142](https://github.com/hichchidev/hichchi/blob/1821ea22bf9e9b89c932111f16da4943c07c58c7/libs/ngx-auth/src/lib/components/auth-form/auth-form.component.ts#L142)

</td>
</tr>
<tr>
<td>

<a id="error"></a> `error`

</td>
<td>

`public`

</td>
<td>

`WritableSignal`<`null` | `HttpError`>

</td>
<td>

Writable signal containing the current error object, if any

</td>
<td>

[libs/ngx-auth/src/lib/components/auth-form/auth-form.component.ts:133](https://github.com/hichchidev/hichchi/blob/1821ea22bf9e9b89c932111f16da4943c07c58c7/libs/ngx-auth/src/lib/components/auth-form/auth-form.component.ts#L133)

</td>
</tr>
<tr>
<td>

<a id="facebook"></a> `facebook`

</td>
<td>

`public`

</td>
<td>

`InputSignal`<`boolean`>

</td>
<td>

Input signal to control whether Facebook authentication is enabled

</td>
<td>

[libs/ngx-auth/src/lib/components/auth-form/auth-form.component.ts:106](https://github.com/hichchidev/hichchi/blob/1821ea22bf9e9b89c932111f16da4943c07c58c7/libs/ngx-auth/src/lib/components/auth-form/auth-form.component.ts#L106)

</td>
</tr>
<tr>
<td>

<a id="google"></a> `google`

</td>
<td>

`public`

</td>
<td>

`InputSignal`<`boolean`>

</td>
<td>

Input signal to control whether Google OAuth authentication is enabled

</td>
<td>

[libs/ngx-auth/src/lib/components/auth-form/auth-form.component.ts:103](https://github.com/hichchidev/hichchi/blob/1821ea22bf9e9b89c932111f16da4943c07c58c7/libs/ngx-auth/src/lib/components/auth-form/auth-form.component.ts#L103)

</td>
</tr>
<tr>
<td>

<a id="iserror"></a> `isError`

</td>
<td>

`public`

</td>
<td>

`WritableSignal`<`boolean`>

</td>
<td>

Writable signal indicating whether an error state is currently active

</td>
<td>

[libs/ngx-auth/src/lib/components/auth-form/auth-form.component.ts:124](https://github.com/hichchidev/hichchi/blob/1821ea22bf9e9b89c932111f16da4943c07c58c7/libs/ngx-auth/src/lib/components/auth-form/auth-form.component.ts#L124)

</td>
</tr>
<tr>
<td>

<a id="isloading"></a> `isLoading`

</td>
<td>

`public`

</td>
<td>

`WritableSignal`<`boolean`>

</td>
<td>

Writable signal indicating whether an authentication operation is in progress

</td>
<td>

[libs/ngx-auth/src/lib/components/auth-form/auth-form.component.ts:118](https://github.com/hichchidev/hichchi/blob/1821ea22bf9e9b89c932111f16da4943c07c58c7/libs/ngx-auth/src/lib/components/auth-form/auth-form.component.ts#L118)

</td>
</tr>
<tr>
<td>

<a id="issignup"></a> `isSignUp`

</td>
<td>

`public`

</td>
<td>

`WritableSignal`<`boolean`>

</td>
<td>

Writable signal indicating whether the form is in sign-up mode (true) or sign-in mode (false)

</td>
<td>

[libs/ngx-auth/src/lib/components/auth-form/auth-form.component.ts:121](https://github.com/hichchidev/hichchi/blob/1821ea22bf9e9b89c932111f16da4943c07c58c7/libs/ngx-auth/src/lib/components/auth-form/auth-form.component.ts#L121)

</td>
</tr>
<tr>
<td>

<a id="local"></a> `local`

</td>
<td>

`public`

</td>
<td>

`InputSignal`<`boolean`>

</td>
<td>

Input signal to control whether local authentication (username/email + password) is enabled

</td>
<td>

[libs/ngx-auth/src/lib/components/auth-form/auth-form.component.ts:100](https://github.com/hichchidev/hichchi/blob/1821ea22bf9e9b89c932111f16da4943c07c58c7/libs/ngx-auth/src/lib/components/auth-form/auth-form.component.ts#L100)

</td>
</tr>
<tr>
<td>

<a id="onerror"></a> `onError`

</td>
<td>

`public`

</td>
<td>

`OutputEmitterRef`<`HttpError`>

</td>
<td>

Output emitter that fires when an authentication error occurs

</td>
<td>

[libs/ngx-auth/src/lib/components/auth-form/auth-form.component.ts:109](https://github.com/hichchidev/hichchi/blob/1821ea22bf9e9b89c932111f16da4943c07c58c7/libs/ngx-auth/src/lib/components/auth-form/auth-form.component.ts#L109)

</td>
</tr>
<tr>
<td>

<a id="onsignin"></a> `onSignIn`

</td>
<td>

`public`

</td>
<td>

`OutputEmitterRef`<`AuthResponse`>

</td>
<td>

Output emitter that fires when a user successfully signs in

</td>
<td>

[libs/ngx-auth/src/lib/components/auth-form/auth-form.component.ts:112](https://github.com/hichchidev/hichchi/blob/1821ea22bf9e9b89c932111f16da4943c07c58c7/libs/ngx-auth/src/lib/components/auth-form/auth-form.component.ts#L112)

</td>
</tr>
<tr>
<td>

<a id="onsignup"></a> `onSignUp`

</td>
<td>

`public`

</td>
<td>

`OutputEmitterRef`<`User`<`string`, `string`>>

</td>
<td>

Output emitter that fires when a user successfully signs up

</td>
<td>

[libs/ngx-auth/src/lib/components/auth-form/auth-form.component.ts:115](https://github.com/hichchidev/hichchi/blob/1821ea22bf9e9b89c932111f16da4943c07c58c7/libs/ngx-auth/src/lib/components/auth-form/auth-form.component.ts#L115)

</td>
</tr>
</tbody>
</table>

---

### AuthService

Defined in: [libs/ngx-auth/src/lib/services/auth.service.ts:70](https://github.com/hichchidev/hichchi/blob/1821ea22bf9e9b89c932111f16da4943c07c58c7/libs/ngx-auth/src/lib/services/auth.service.ts#L70)

Angular authentication service for client-side authentication operations

This service provides methods for handling authentication operations in Angular applications,
including user sign-in, sign-up, Google OAuth authentication, token management, and sign-out.
It communicates with the backend authentication API and handles the client-side aspects
of the authentication flow.

The service is configured through the AuthConfig interface and automatically handles
token expiration date parsing and HTTP request management. It integrates seamlessly
with the @hichchi/nest-auth backend module.

Key features:

- Local authentication (email/username and password)
- Google OAuth authentication with popup flow
- Token refresh functionality
- User registration
- Automatic token expiration handling
- RESTful API communication

#### Example

```typescript
// In a component
export class LoginComponent {
  constructor(private authService: AuthService) {}

  async signIn() {
    try {
      const response = await this.authService
        .signIn({
          email: "user@example.com",
          password: "password123",
        })
        .toPromise();
      console.log("Signed in:", response.user);
    } catch (error) {
      console.error("Sign in failed:", error);
    }
  }
}
```

#### See

- [AuthConfig](#authconfig) Configuration interface for the authentication service
- [NgxHichchiAuthModule](#ngxhichchiauthmodule) Module that provides this service
- [AuthState](#authstate-1) State management service for authentication
- AuthResponse Response interface for authentication operations

#### Constructors

##### Constructor

```ts
new AuthService(http, config): AuthService;
```

Defined in: [libs/ngx-auth/src/lib/services/auth.service.ts:80](https://github.com/hichchidev/hichchi/blob/1821ea22bf9e9b89c932111f16da4943c07c58c7/libs/ngx-auth/src/lib/services/auth.service.ts#L80)

Creates an instance of AuthService

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`http`

</td>
<td>

`HttpClient`

</td>
<td>

Http client

</td>
</tr>
<tr>
<td>

`config`

</td>
<td>

[`AuthConfig`](#authconfig)

</td>
<td>

The authentication configuration injected from AUTH_CONFIG token

</td>
</tr>
</tbody>
</table>

###### Returns

[`AuthService`](#authservice)

###### See

- AUTH_CONFIG Injection token for authentication configuration
- [AuthConfig](#authconfig) Interface defining the configuration structure

#### Methods

##### getAuthResponse()

```ts
getAuthResponse(accessToken, skipErrorNotify?): Observable<AuthResponse>;
```

Defined in: [libs/ngx-auth/src/lib/services/auth.service.ts:264](https://github.com/hichchidev/hichchi/blob/1821ea22bf9e9b89c932111f16da4943c07c58c7/libs/ngx-auth/src/lib/services/auth.service.ts#L264)

Retrieves the complete authentication response using an access token

This method exchanges an access token for a complete authentication response
containing user information and token details. It's typically used after
Google OAuth authentication to get the full user profile and session data.

The method automatically converts token expiration timestamps to JavaScript
Date objects for easier handling in the client application.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`accessToken`

</td>
<td>

`AccessToken`

</td>
<td>

The access token to exchange for authentication response

</td>
</tr>
<tr>
<td>

`skipErrorNotify?`

</td>
<td>

`boolean`

</td>
<td>

Optional flag to skip error notifications for this request

</td>
</tr>
</tbody>
</table>

###### Returns

`Observable`<`AuthResponse`>

Observable that emits the complete authentication response

###### Example

```typescript
// Get auth response after Google sign-in
const accessToken = await this.authService.googleSignIn();
this.authService.getAuthResponse(accessToken).subscribe({
  next: (response) => {
    console.log("User:", response.user);
    console.log("Tokens:", {
      access: response.accessToken,
      refresh: response.refreshToken,
    });
  },
  error: (error) => {
    console.error("Failed to get auth response:", error);
  },
});
```

###### See

- AccessToken Type representing access tokens
- AuthResponse Interface for complete authentication response
- AuthEndpoint.GET_AUTH_RESPONSE Backend endpoint for token exchange
- [googleSignIn](#googlesignin) Method that provides access tokens for this operation

##### googleSignIn()

```ts
googleSignIn(): Promise<AccessToken>;
```

Defined in: [libs/ngx-auth/src/lib/services/auth.service.ts:184](https://github.com/hichchidev/hichchi/blob/1821ea22bf9e9b89c932111f16da4943c07c58c7/libs/ngx-auth/src/lib/services/auth.service.ts#L184)

Initiates Google OAuth authentication using a popup window

This method opens a popup window that navigates to the Google OAuth authentication
endpoint. It handles the OAuth flow by monitoring the popup window and extracting
the access token from the callback URL when authentication is successful.

The popup is automatically positioned in the center of the screen and has predefined
dimensions for optimal user experience. The method polls the popup window to detect
when authentication is complete or if the user closes the popup.

###### Returns

`Promise`<`AccessToken`>

Promise that resolves with the access token when authentication succeeds

###### Throws

If authentication fails or the popup is blocked

###### Examples

```typescript
// Initiate Google sign-in
try {
  const accessToken = await this.authService.googleSignIn();
  console.log("Google authentication successful:", accessToken);

  // Use the token to get full auth response
  const authResponse = await this.authService
    .getAuthResponse(accessToken)
    .toPromise();
  console.log("User data:", authResponse.user);
} catch (error) {
  console.error("Google authentication failed:", error);
}
```

```typescript
// In a component with error handling
async signInWithGoogle() {
  try {
    const token = await this.authService.googleSignIn();
    // Handle successful authentication
    this.router.navigate(['/dashboard']);
  } catch (error) {
    if (error.message.includes('popup')) {
      this.showError('Please allow popups for Google sign-in');
    } else {
      this.showError('Google sign-in failed. Please try again.');
    }
  }
}
```

###### See

- [getAuthResponse](#getauthresponse) Method to get full authentication response using the access token
- AuthEndpoint.GOOGLE_SIGN_IN Backend endpoint for Google OAuth initiation
- GOOGLE_AUTH_POPUP_WIDTH Constant defining popup window width
- GOOGLE_AUTH_POPUP_HEIGHT Constant defining popup window height
- POPUP_POLLING_INTERVAL_MS Constant defining popup polling interval

##### refreshToken()

```ts
refreshToken(refreshToken, skipErrorNotify?): Observable<TokenResponse>;
```

Defined in: [libs/ngx-auth/src/lib/services/auth.service.ts:370](https://github.com/hichchidev/hichchi/blob/1821ea22bf9e9b89c932111f16da4943c07c58c7/libs/ngx-auth/src/lib/services/auth.service.ts#L370)

Refreshes an expired access token using a refresh token

This method exchanges a valid refresh token for a new set of access and refresh tokens.
It's typically used when the current access token has expired but the refresh token
is still valid, allowing the user to maintain their session without re-authenticating.

The refresh token mechanism provides a secure way to maintain long-lived sessions
while keeping access tokens short-lived for better security.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`refreshToken`

</td>
<td>

`RefreshToken`

</td>
<td>

The refresh token to exchange for new tokens

</td>
</tr>
<tr>
<td>

`skipErrorNotify?`

</td>
<td>

`boolean`

</td>
<td>

Optional flag to skip error notifications for this request

</td>
</tr>
</tbody>
</table>

###### Returns

`Observable`<`TokenResponse`>

Observable that emits the new token response

###### Example

```typescript
// Refresh tokens when access token expires
const storedRefreshToken = localStorage.getItem("refreshToken");
if (storedRefreshToken) {
  this.authService.refreshToken(storedRefreshToken).subscribe({
    next: (tokenResponse) => {
      console.log("Tokens refreshed successfully");
      // Store new tokens
      localStorage.setItem("accessToken", tokenResponse.accessToken);
      localStorage.setItem("refreshToken", tokenResponse.refreshToken);
    },
    error: (error) => {
      console.error("Token refresh failed:", error);
      // Redirect to login page
      this.router.navigate(["/login"]);
    },
  });
}
```

###### See

- RefreshToken Type representing refresh tokens
- TokenResponse Interface for token refresh response
- AuthEndpoint.REFRESH_TOKEN Backend endpoint for token refresh
- [signIn](#signin) Method to get initial tokens through authentication

##### signIn()

```ts
signIn(dto, skipErrorNotify?): Observable<AuthResponse>;
```

Defined in: [libs/ngx-auth/src/lib/services/auth.service.ts:117](https://github.com/hichchidev/hichchi/blob/1821ea22bf9e9b89c932111f16da4943c07c58c7/libs/ngx-auth/src/lib/services/auth.service.ts#L117)

Authenticates a user with email/username and password

This method sends a sign-in request to the backend authentication API with the provided
credentials. It automatically converts the token expiration timestamps from the response
into JavaScript Date objects for easier handling in the client application.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`dto`

</td>
<td>

`SignInBody`

</td>
<td>

The sign-in data containing user credentials

</td>
</tr>
<tr>
<td>

`skipErrorNotify?`

</td>
<td>

`boolean`

</td>
<td>

Optional flag to skip error notifications for this request

</td>
</tr>
</tbody>
</table>

###### Returns

`Observable`<`AuthResponse`>

Observable that emits the authentication response with user data and tokens

###### Example

```typescript
// Sign in with email and password
this.authService
  .signIn({
    email: "user@example.com",
    password: "password123",
  })
  .subscribe({
    next: (response) => {
      console.log("User signed in:", response.user);
      console.log("Access token expires:", response.accessTokenExpiresOn);
    },
    error: (error) => {
      console.error("Sign in failed:", error);
    },
  });
```

###### See

- SignInBody Interface for sign-in request data
- AuthResponse Interface for authentication response
- AuthEndpoint.SIGN_IN Backend endpoint for user authentication

##### signOut()

```ts
signOut(skipErrorNotify?): Observable<null | SuccessResponse>;
```

Defined in: [libs/ngx-auth/src/lib/services/auth.service.ts:438](https://github.com/hichchidev/hichchi/blob/1821ea22bf9e9b89c932111f16da4943c07c58c7/libs/ngx-auth/src/lib/services/auth.service.ts#L438)

Signs out the current user and invalidates their session

This method sends a sign-out request to the backend API to invalidate the user's
current session and tokens. It effectively logs the user out of the application
and clears their authentication state on the server.

After calling this method, you should also clear any client-side authentication
data such as tokens stored in localStorage, sessionStorage, or application state.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`skipErrorNotify?`

</td>
<td>

`boolean`

</td>
<td>

Optional flag to skip error notifications for this request

</td>
</tr>
</tbody>
</table>

###### Returns

`Observable`<`null` | `SuccessResponse`>

Observable that emits a success response when sign-out is complete

###### Examples

```typescript
// Sign out the current user
this.authService.signOut().subscribe({
  next: (response) => {
    console.log("User signed out successfully");
    // Clear client-side authentication data
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    // Redirect to login page
    this.router.navigate(["/login"]);
  },
  error: (error) => {
    console.error("Sign out failed:", error);
    // Even if server sign-out fails, clear local data
    localStorage.clear();
    this.router.navigate(["/login"]);
  },
});
```

```typescript
// Sign out with state management
async signOut() {
  try {
    await this.authService.signOut().toPromise();
    // Clear authentication state
    this.authState.clearUser();
    this.notificationService.showSuccess('Signed out successfully');
  } catch (error) {
    console.error('Sign out error:', error);
  } finally {
    // Always redirect to login
    this.router.navigate(['/login']);
  }
}
```

###### See

- SuccessResponse Interface for success response
- AuthEndpoint.SIGN_OUT Backend endpoint for user sign-out
- [signIn](#signin) Method to authenticate user after sign-out

##### signUp()

```ts
signUp(dto, skipErrorNotify?): Observable<User<string, string>>;
```

Defined in: [libs/ngx-auth/src/lib/services/auth.service.ts:324](https://github.com/hichchidev/hichchi/blob/1821ea22bf9e9b89c932111f16da4943c07c58c7/libs/ngx-auth/src/lib/services/auth.service.ts#L324)

Registers a new user account

This method sends a registration request to the backend API with the provided
user information. It creates a new user account and returns the user data
upon successful registration.

Note that this method only creates the user account and does not automatically
sign the user in. After successful registration, you may need to call signIn
or handle email verification depending on your application's configuration.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`dto`

</td>
<td>

`SignUpBody`

</td>
<td>

The sign-up data containing user registration information

</td>
</tr>
<tr>
<td>

`skipErrorNotify?`

</td>
<td>

`boolean`

</td>
<td>

Optional flag to skip error notifications for this request

</td>
</tr>
</tbody>
</table>

###### Returns

`Observable`<`User`<`string`, `string`>>

Observable that emits the newly created user data

###### Example

```typescript
// Register a new user
this.authService
  .signUp({
    email: "newuser@example.com",
    password: "securePassword123",
    firstName: "John",
    lastName: "Doe",
  })
  .subscribe({
    next: (user) => {
      console.log("User registered successfully:", user);
      // Optionally redirect to sign-in or email verification page
      this.router.navigate(["/verify-email"]);
    },
    error: (error) => {
      console.error("Registration failed:", error);
      // Handle registration errors (email already exists, etc.)
    },
  });
```

###### See

- SignUpBody Interface for user registration data
- User Interface for user data returned after registration
- AuthEndpoint.SIGN_UP Backend endpoint for user registration
- [signIn](#signin) Method to authenticate user after registration

---

### NgxHichchiAuthModule

Defined in: [libs/ngx-auth/src/lib/auth.module.ts:73](https://github.com/hichchidev/hichchi/blob/1821ea22bf9e9b89c932111f16da4943c07c58c7/libs/ngx-auth/src/lib/auth.module.ts#L73)

Angular module for authentication functionality

This module provides comprehensive authentication features for Angular applications,
including authentication forms, permission-based directives, and authentication services.
It integrates with the Hichchi authentication system and provides both components
and directives for building secure Angular applications.

The module exports:

- AuthFormComponent: A ready-to-use authentication form component
- PermissionDirective: A structural directive for permission-based conditional rendering

The module must be configured using the forRoot() method to provide the necessary
authentication configuration.

#### Examples

```typescript
// Basic module configuration
@NgModule({
  imports: [
    NgxHichchiAuthModule.forRoot({
      apiBaseURL: "https://api.example.com",
    }),
  ],
})
export class AppModule {}
```

```typescript
// Advanced configuration with custom authentication field
@NgModule({
  imports: [
    NgxHichchiAuthModule.forRoot({
      apiBaseURL: "https://api.example.com",
      authField: AuthField.EMAIL,
    }),
  ],
})
export class AppModule {}
```

#### See

- [AuthConfig](#authconfig) Configuration interface for the authentication module
- [AuthFormComponent](#authformcomponent) Authentication form component
- [PermissionDirective](#permissiondirective) Permission-based conditional rendering directive
- [AuthService](#authservice) Authentication service for managing user sessions

#### Constructors

##### Constructor

```ts
new NgxHichchiAuthModule(): NgxHichchiAuthModule;
```

###### Returns

[`NgxHichchiAuthModule`](#ngxhichchiauthmodule)

#### Methods

##### forRoot()

```ts
static forRoot(config): ModuleWithProviders<NgxHichchiAuthModule>;
```

Defined in: [libs/ngx-auth/src/lib/auth.module.ts:105](https://github.com/hichchidev/hichchi/blob/1821ea22bf9e9b89c932111f16da4943c07c58c7/libs/ngx-auth/src/lib/auth.module.ts#L105)

Configures the NgxHichchiAuthModule with the provided authentication configuration

This static method sets up the module with the necessary providers and configuration
for authentication functionality. It provides the AuthService, HTTP client, and
authentication configuration token that are required for the module to function properly.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`config`

</td>
<td>

[`AuthConfig`](#authconfig)

</td>
<td>

The authentication configuration object containing API endpoints and settings

</td>
</tr>
</tbody>
</table>

###### Returns

`ModuleWithProviders`<[`NgxHichchiAuthModule`](#ngxhichchiauthmodule)>

A ModuleWithProviders object configured with authentication providers

###### Examples

```typescript
// Basic configuration
NgxHichchiAuthModule.forRoot({
  apiBaseURL: "https://api.example.com",
});
```

```typescript
// Configuration with environment variables and authentication field
NgxHichchiAuthModule.forRoot({
  apiBaseURL: environment.apiUrl,
  authField: AuthField.USERNAME,
});
```

###### See

- [AuthConfig](#authconfig) Interface defining the configuration structure
- AUTH_CONFIG Injection token for the authentication configuration
- [AuthService](#authservice) Service that uses the provided configuration

---

### PermissionDirective

Defined in: [libs/ngx-auth/src/lib/directives/permission.directive.ts:67](https://github.com/hichchidev/hichchi/blob/1821ea22bf9e9b89c932111f16da4943c07c58c7/libs/ngx-auth/src/lib/directives/permission.directive.ts#L67)

Angular structural directive for permission-based conditional rendering

This directive conditionally displays or hides DOM elements based on the current user's permissions.
It integrates with the authentication state to check if the authenticated user has the required
permission to view the content. The directive uses Angular's structural directive pattern and
automatically updates when the user's authentication state or permissions change.

The directive works by checking the user's role permissions against the required permission string.
If the user has the required permission, the template content is rendered; otherwise, it's removed
from the DOM.

#### Examples

```html
<!-- Basic usage - show content only if user has 'users.read' permission -->
<div *hcPermission="'users.read'">
  <p>This content is only visible to users with read permission</p>
</div>
```

```html
<!-- Using with component properties -->
<button *hcPermission="'users.delete'" (click)="deleteUser()">
  Delete User
</button>
```

```html
<!-- Using with multiple permissions (user needs at least one) -->
<div *hcPermission="['users.read', 'users.write']">
  <p>This content is visible to users with either read OR write permission</p>
</div>
```

```html
<!-- Using with dynamic permissions -->
<ng-container *hcPermission="requiredPermission">
  <app-admin-panel></app-admin-panel>
</ng-container>
```

```typescript
// Component usage with dynamic permission
export class UserListComponent {
  requiredPermission = "users.manage";
  // Or with multiple permissions
  requiredPermissions = ["users.read", "users.write"];
}
```

#### See

- [AuthState](#authstate-1) Authentication state service that provides user information
- User User interface that contains role and permission information
- isRoleObject Utility function to check if role is an object with permissions
- [NgxHichchiAuthModule](#ngxhichchiauthmodule) Module that provides this directive

#### Constructors

##### Constructor

```ts
new PermissionDirective(): PermissionDirective;
```

Defined in: [libs/ngx-auth/src/lib/directives/permission.directive.ts:114](https://github.com/hichchidev/hichchi/blob/1821ea22bf9e9b89c932111f16da4943c07c58c7/libs/ngx-auth/src/lib/directives/permission.directive.ts#L114)

Constructor that sets up the permission checking effect

Initializes an Angular effect that automatically re-evaluates permission
whenever the authentication state or required permission changes. This
ensures the UI stays in sync with the user's current permissions.

###### Returns

[`PermissionDirective`](#permissiondirective)

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Description</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="hcpermission"></a> `hcPermission`

</td>
<td>

`InputSignal`<`string` | `string`\[]>

</td>
<td>

Required permission string or array of strings input signal

This input defines the permission(s) that the current user must have
for the template content to be displayed. The permission string(s)
should match the permissions defined in the user's role.

When an array is provided, the user needs to have at least one of
the specified permissions (OR logic).

**Example**

```html
<!-- Single permission -->
<div *hcPermission="'users.read'">Content</div>

<!-- Multiple permissions (user needs at least one) -->
<div *hcPermission="['users.read', 'users.write']">Content</div>
```

</td>
<td>

[libs/ngx-auth/src/lib/directives/permission.directive.ts:105](https://github.com/hichchidev/hichchi/blob/1821ea22bf9e9b89c932111f16da4943c07c58c7/libs/ngx-auth/src/lib/directives/permission.directive.ts#L105)

</td>
</tr>
</tbody>
</table>

## Enumerations

### AuthGuardCondition

Defined in: [libs/ngx-auth/src/lib/enums/auth-guard-condition.enum.ts:33](https://github.com/hichchidev/hichchi/blob/1821ea22bf9e9b89c932111f16da4943c07c58c7/libs/ngx-auth/src/lib/enums/auth-guard-condition.enum.ts#L33)

Enumeration of authentication guard conditions

This enum defines the different conditions that authentication guards can check
to determine whether a user should be allowed to access a route. Each condition
represents a different aspect of the user's authentication state.

These conditions are used in conjunction with AuthGuardOption to create
flexible route protection rules that can handle various authentication scenarios.

#### Examples

```typescript
// Check if user is signed in
const guardOption: AuthGuardOption = {
  condition: AuthGuardCondition.SIGNED_IN,
  state: true,
  redirect: "/login",
};
```

```typescript
// Check if user has a valid token
const tokenGuardOption: AuthGuardOption = {
  condition: AuthGuardCondition.HAS_TOKEN,
  state: true,
  redirect: "/unauthorized",
};
```

#### See

[AuthGuardOption](#authguardoption) Interface that uses these conditions

#### Enumeration Members

<table>
<thead>
<tr>
<th>Enumeration Member</th>
<th>Value</th>
<th>Description</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="has_token"></a> `HAS_TOKEN`

</td>
<td>

`"has-token"`

</td>
<td>

Check if the user has a valid access token

</td>
<td>

[libs/ngx-auth/src/lib/enums/auth-guard-condition.enum.ts:37](https://github.com/hichchidev/hichchi/blob/1821ea22bf9e9b89c932111f16da4943c07c58c7/libs/ngx-auth/src/lib/enums/auth-guard-condition.enum.ts#L37)

</td>
</tr>
<tr>
<td>

<a id="signed_in"></a> `SIGNED_IN`

</td>
<td>

`"signed-in"`

</td>
<td>

Check if the user is signed in to the application

</td>
<td>

[libs/ngx-auth/src/lib/enums/auth-guard-condition.enum.ts:35](https://github.com/hichchidev/hichchi/blob/1821ea22bf9e9b89c932111f16da4943c07c58c7/libs/ngx-auth/src/lib/enums/auth-guard-condition.enum.ts#L35)

</td>
</tr>
</tbody>
</table>

## Functions

### authGuard()

Authentication guard factory function for Angular route protection

This function creates a route guard that protects routes based on authentication state.
It supports both simple single-condition guards and complex multi-condition guards.
The guard evaluates authentication conditions and redirects users when conditions are not met.

The guard integrates with the AuthState service to check the current authentication status
and uses the Angular Router for navigation when redirects are needed. It supports checking
whether users are signed in, have valid tokens, and other authentication-related conditions.

Key features:

- Multiple authentication condition support
- Automatic redirection on failed conditions
- Integration with AuthState for reactive authentication checks
- Support for both simple and complex guard configurations
- Type-safe condition checking

#### Param

Either a single AuthGuardCondition or an array of AuthGuardOption objects

#### Param

Required state for single condition (ignored when using options array)

#### Param

Redirect path for single condition (ignored when using options array)

#### Examples

```typescript
// Protecting a route that requires authentication
const routes: Routes = [
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [authGuard(AuthGuardCondition.SIGNED_IN, true, "/login")],
  },
];
```

```typescript
// Complex guard with multiple conditions
const routes: Routes = [
  {
    path: "admin",
    component: AdminComponent,
    canActivate: [
      authGuard([
        {
          condition: AuthGuardCondition.SIGNED_IN,
          state: true,
          redirect: "/login",
        },
        {
          condition: AuthGuardCondition.HAS_TOKEN,
          state: true,
          redirect: "/unauthorized",
        },
      ]),
    ],
  },
];
```

```typescript
// Preventing authenticated users from accessing login page
const routes: Routes = [
  {
    path: "login",
    component: LoginComponent,
    canActivate: [authGuard(AuthGuardCondition.SIGNED_IN, false, "/dashboard")],
  },
];
```

#### See

- [AuthState](#authstate-1) Service that provides authentication state information
- [AuthGuardOption](#authguardoption) Interface for configuring guard options
- [AuthGuardCondition](#authguardcondition) Enum defining available authentication conditions
- getAllAuthGuardOptions Utility function for extracting guard options from routes
- AUTH_GUARD_OPTIONS_KEY Constant for storing guard options in route data

#### Call Signature

```ts
function authGuard(options): CanActivateFn;
```

Defined in: [libs/ngx-auth/src/lib/guards/auth.guard.ts:37](https://github.com/hichchidev/hichchi/blob/1821ea22bf9e9b89c932111f16da4943c07c58c7/libs/ngx-auth/src/lib/guards/auth.guard.ts#L37)

Creates an authentication guard function with multiple configuration options

This overload accepts an array of AuthGuardOption objects, allowing for complex
authentication rules with multiple conditions. Each option can specify different
conditions, states, and redirect paths.

##### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`options`

</td>
<td>

[`AuthGuardOption`](#authguardoption)\[]

</td>
<td>

Array of authentication guard options to evaluate

</td>
</tr>
</tbody>
</table>

##### Returns

`CanActivateFn`

A CanActivateFn that can be used in Angular route guards

##### Example

```typescript
// Multiple conditions guard
const routes: Routes = [
  {
    path: "admin",
    component: AdminComponent,
    canActivate: [
      authGuard([
        {
          condition: AuthGuardCondition.SIGNED_IN,
          state: true,
          redirect: "/login",
        },
        {
          condition: AuthGuardCondition.HAS_TOKEN,
          state: true,
          redirect: "/unauthorized",
        },
      ]),
    ],
  },
];
```

##### See

- [AuthGuardOption](#authguardoption) Interface defining guard configuration options
- [AuthGuardCondition](#authguardcondition) Enum of available authentication conditions

#### Call Signature

```ts
function authGuard(condition, state, fallbackRedirect): CanActivateFn;
```

Defined in: [libs/ngx-auth/src/lib/guards/auth.guard.ts:77](https://github.com/hichchidev/hichchi/blob/1821ea22bf9e9b89c932111f16da4943c07c58c7/libs/ngx-auth/src/lib/guards/auth.guard.ts#L77)

Creates an authentication guard function with a single condition

This overload provides a simplified way to create guards with a single authentication
condition. It's more convenient when you only need to check one condition.

##### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`condition`

</td>
<td>

[`AuthGuardCondition`](#authguardcondition)

</td>
<td>

The authentication condition to check

</td>
</tr>
<tr>
<td>

`state`

</td>
<td>

`boolean`

</td>
<td>

The required state of the condition (true/false)

</td>
</tr>
<tr>
<td>

`fallbackRedirect`

</td>
<td>

`string`

</td>
<td>

The path to redirect to if the condition is not met

</td>
</tr>
</tbody>
</table>

##### Returns

`CanActivateFn`

A CanActivateFn that can be used in Angular route guards

##### Examples

```typescript
// Simple signed-in guard
const routes: Routes = [
  {
    path: "profile",
    component: ProfileComponent,
    canActivate: [authGuard(AuthGuardCondition.SIGNED_IN, true, "/login")],
  },
];
```

```typescript
// Redirect signed-in users away from login page
const routes: Routes = [
  {
    path: "login",
    component: LoginComponent,
    canActivate: [authGuard(AuthGuardCondition.SIGNED_IN, false, "/dashboard")],
  },
];
```

##### See

- [AuthGuardCondition](#authguardcondition) Enum of available authentication conditions
- [AuthGuardOption](#authguardoption) Interface for more complex guard configurations

---

### authInterceptor()

```ts
function authInterceptor(redirect, onRedirect?): HttpInterceptorFn;
```

Defined in: [libs/ngx-auth/src/lib/interceptors/auth.interceptor.ts:167](https://github.com/hichchidev/hichchi/blob/1821ea22bf9e9b89c932111f16da4943c07c58c7/libs/ngx-auth/src/lib/interceptors/auth.interceptor.ts#L167)

Creates an HTTP interceptor for handling authentication tokens and automatic token refresh

This interceptor automatically adds authentication tokens to outgoing HTTP requests
and handles token refresh when requests fail due to expired tokens. It provides
seamless authentication management for Angular applications using JWT tokens.

Key features:

- Automatic token attachment to HTTP requests
- Automatic token refresh on authentication errors
- Prevention of multiple simultaneous refresh operations
- Coordinated handling of multiple failed requests during token refresh
- Automatic redirect to login page when refresh fails
- Configurable redirect behavior with optional callback

The interceptor works by:

1. Adding the current access token to outgoing requests
2. Monitoring responses for authentication errors
3. Attempting token refresh when authentication errors occur
4. Retrying failed requests with the new token
5. Redirecting to login when refresh fails or no refresh token is available

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`redirect`

</td>
<td>

`string`

</td>
<td>

The path to redirect to when authentication fails completely

</td>
</tr>
<tr>
<td>

`onRedirect?`

</td>
<td>

() => `void`

</td>
<td>

Optional callback function to execute before redirecting

</td>
</tr>
</tbody>
</table>

#### Returns

`HttpInterceptorFn`

An HttpInterceptorFn that can be used in Angular HTTP interceptor configuration

#### Examples

```typescript
// Basic usage in app configuration
export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(withInterceptors([authInterceptor("/login")]))],
};
```

```typescript
// With custom redirect callback
export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withInterceptors([
        authInterceptor("/login", () => {
          console.log("Redirecting to login due to authentication failure");
          // Clear any cached data
          localStorage.clear();
        }),
      ]),
    ),
  ],
};
```

```typescript
// In a module-based application
@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useValue: authInterceptor("/auth/login"),
      multi: true,
    },
  ],
})
export class AppModule {}
```

#### See

- [AuthState](#authstate-1) Service that provides authentication state and tokens
- [AuthService](#authservice) Service that handles token refresh operations
- HttpInterceptorFn Angular HTTP interceptor function type
- [SKIPPED_ERRORS](#skipped_errors) Array of error codes that trigger token refresh

---

### roleGuard()

```ts
function roleGuard(role, options): CanActivateFn;
```

Defined in: [libs/ngx-auth/src/lib/guards/role.guard.ts:76](https://github.com/hichchidev/hichchi/blob/1821ea22bf9e9b89c932111f16da4943c07c58c7/libs/ngx-auth/src/lib/guards/role.guard.ts#L76)

Creates a role-based authorization guard function for Angular route protection

This function creates a route guard that protects routes based on user roles.
It checks if the current user's role matches the required role, and if not,
it evaluates the provided options to determine the appropriate action (redirect
or sign out).

The guard integrates with the AuthState service to check the current user's role
and uses the Angular Router for navigation when redirects are needed. If no
matching role or redirect option is found, the user is automatically signed out.

Key features:

- Role-based route protection
- Configurable redirect options based on user roles
- Automatic sign-out for unauthorized access
- Integration with AuthState for reactive role checking
- Support for multiple role-based redirect scenarios

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`role`

</td>
<td>

`string`

</td>
<td>

The required role name that the user must have to access the route

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

[`RoleGuardOption`](#roleguardoption)\[]

</td>
<td>

Array of role guard options that define redirect behavior for different user roles

</td>
</tr>
</tbody>
</table>

#### Returns

`CanActivateFn`

A CanActivateFn that evaluates role-based authorization and handles navigation

#### Examples

```typescript
// Protecting an admin route
const routes: Routes = [
  {
    path: "admin",
    component: AdminComponent,
    canActivate: [
      roleGuard("admin", [
        { state: "user", redirect: "/dashboard" },
        { state: "moderator", redirect: "/moderator-panel" },
      ]),
    ],
  },
];
```

```typescript
// Protecting a moderator route with fallback redirects
const routes: Routes = [
  {
    path: "moderate",
    component: ModeratorComponent,
    canActivate: [
      roleGuard("moderator", [
        { state: "user", redirect: "/unauthorized" },
        { state: "guest", redirect: "/login" },
      ]),
    ],
  },
];
```

```typescript
// Simple role guard without specific redirects (will sign out unauthorized users)
const routes: Routes = [
  {
    path: "super-admin",
    component: SuperAdminComponent,
    canActivate: [roleGuard("super-admin", [])],
  },
];
```

#### See

- [AuthState](#authstate-1) Service that provides authentication and role state information
- [RoleGuardOption](#roleguardoption) Interface for configuring role-based redirect options

## Interfaces

### AuthConfig

Defined in: [libs/ngx-auth/src/lib/interfaces/auth-config.interface.ts:3](https://github.com/hichchidev/hichchi/blob/1821ea22bf9e9b89c932111f16da4943c07c58c7/libs/ngx-auth/src/lib/interfaces/auth-config.interface.ts#L3)

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="apibaseurl"></a> `apiBaseURL`

</td>
<td>

`string`

</td>
<td>

[libs/ngx-auth/src/lib/interfaces/auth-config.interface.ts:5](https://github.com/hichchidev/hichchi/blob/1821ea22bf9e9b89c932111f16da4943c07c58c7/libs/ngx-auth/src/lib/interfaces/auth-config.interface.ts#L5)

</td>
</tr>
<tr>
<td>

<a id="authfield-1"></a> `authField?`

</td>
<td>

`AuthField`

</td>
<td>

[libs/ngx-auth/src/lib/interfaces/auth-config.interface.ts:4](https://github.com/hichchidev/hichchi/blob/1821ea22bf9e9b89c932111f16da4943c07c58c7/libs/ngx-auth/src/lib/interfaces/auth-config.interface.ts#L4)

</td>
</tr>
</tbody>
</table>

---

### AuthFormData

Defined in: [libs/ngx-auth/src/lib/interfaces/auth-form-data.interface.ts:52](https://github.com/hichchidev/hichchi/blob/1821ea22bf9e9b89c932111f16da4943c07c58c7/libs/ngx-auth/src/lib/interfaces/auth-form-data.interface.ts#L52)

Interface for authentication form data

This interface defines the structure of data collected from authentication forms,
typically used for user registration or sign-in operations. It provides a standardized
format for form data that can be processed by authentication components and services.

The interface is designed to be flexible and work with different authentication
field types (email, username, etc.) through the generic `authFieldValue` property.

#### Examples

```typescript
// Example form data for email-based registration
const formData: AuthFormData = {
  firstName: "John",
  lastName: "Doe",
  authFieldValue: "john.doe@example.com", // email
  password: "securePassword123",
};
```

```typescript
// Example form data for username-based registration
const formData: AuthFormData = {
  firstName: "Jane",
  lastName: "Smith",
  authFieldValue: "janesmith", // username
  password: "mySecretPassword",
};
```

```typescript
// Using in a component
export class AuthFormComponent {
  onSubmit(formData: AuthFormData) {
    this.authService
      .signUp({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.authFieldValue, // assuming email-based auth
        password: formData.password,
      })
      .subscribe();
  }
}
```

#### See

- [AuthFormComponent](#authformcomponent) Component that uses this interface
- [AuthConfig](#authconfig) Configuration that determines the authentication field type
- AuthField Enum defining authentication field types

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Description</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="authfieldvalue"></a> `authFieldValue`

</td>
<td>

`string`

</td>
<td>

Authentication field value (email, username, etc.)

</td>
<td>

[libs/ngx-auth/src/lib/interfaces/auth-form-data.interface.ts:58](https://github.com/hichchidev/hichchi/blob/1821ea22bf9e9b89c932111f16da4943c07c58c7/libs/ngx-auth/src/lib/interfaces/auth-form-data.interface.ts#L58)

</td>
</tr>
<tr>
<td>

<a id="firstname"></a> `firstName`

</td>
<td>

`string`

</td>
<td>

User's first name

</td>
<td>

[libs/ngx-auth/src/lib/interfaces/auth-form-data.interface.ts:54](https://github.com/hichchidev/hichchi/blob/1821ea22bf9e9b89c932111f16da4943c07c58c7/libs/ngx-auth/src/lib/interfaces/auth-form-data.interface.ts#L54)

</td>
</tr>
<tr>
<td>

<a id="lastname"></a> `lastName`

</td>
<td>

`string`

</td>
<td>

User's last name

</td>
<td>

[libs/ngx-auth/src/lib/interfaces/auth-form-data.interface.ts:56](https://github.com/hichchidev/hichchi/blob/1821ea22bf9e9b89c932111f16da4943c07c58c7/libs/ngx-auth/src/lib/interfaces/auth-form-data.interface.ts#L56)

</td>
</tr>
<tr>
<td>

<a id="password"></a> `password`

</td>
<td>

`string`

</td>
<td>

User's password

</td>
<td>

[libs/ngx-auth/src/lib/interfaces/auth-form-data.interface.ts:60](https://github.com/hichchidev/hichchi/blob/1821ea22bf9e9b89c932111f16da4943c07c58c7/libs/ngx-auth/src/lib/interfaces/auth-form-data.interface.ts#L60)

</td>
</tr>
</tbody>
</table>

---

### AuthGuardOption

Defined in: [libs/ngx-auth/src/lib/interfaces/auth-guard-option.interface.ts:66](https://github.com/hichchidev/hichchi/blob/1821ea22bf9e9b89c932111f16da4943c07c58c7/libs/ngx-auth/src/lib/interfaces/auth-guard-option.interface.ts#L66)

Interface for configuring authentication guard behavior

This interface defines the configuration options for authentication guards,
allowing fine-grained control over route protection based on authentication
state. Guards can check different conditions and redirect users based on
whether the condition is met or not.

The interface allows you to specify what condition to check, what state
that condition should be in, and where to redirect if the condition is not met.

#### Examples

```typescript
// Protect route for signed-in users only
const protectedRouteOption: AuthGuardOption = {
  condition: AuthGuardCondition.SIGNED_IN,
  state: true, // User must be signed in
  redirect: "/login", // Redirect to login if not signed in
};
```

```typescript
// Redirect signed-in users away from login page
const loginPageOption: AuthGuardOption = {
  condition: AuthGuardCondition.SIGNED_IN,
  state: false, // User must NOT be signed in
  redirect: "/dashboard", // Redirect to dashboard if already signed in
};
```

```typescript
// Protect route based on token presence
const tokenBasedOption: AuthGuardOption = {
  condition: AuthGuardCondition.HAS_TOKEN,
  state: true, // User must have a valid token
  redirect: "/unauthorized", // Redirect if no token
};
```

```typescript
// Using in route configuration
const routes: Routes = [
  {
    path: "admin",
    component: AdminComponent,
    canActivate: [AuthGuard],
    data: {
      [AUTH_GUARD_OPTIONS_KEY]: {
        condition: AuthGuardCondition.SIGNED_IN,
        state: true,
        redirect: "/login",
      } as AuthGuardOption,
    },
  },
];
```

#### See

- [AuthGuardCondition](#authguardcondition) Enum defining available authentication conditions
- AUTH_GUARD_OPTIONS_KEY Constant for storing options in route data

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Description</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="condition"></a> `condition`

</td>
<td>

[`AuthGuardCondition`](#authguardcondition)

</td>
<td>

The authentication condition to check

</td>
<td>

[libs/ngx-auth/src/lib/interfaces/auth-guard-option.interface.ts:68](https://github.com/hichchidev/hichchi/blob/1821ea22bf9e9b89c932111f16da4943c07c58c7/libs/ngx-auth/src/lib/interfaces/auth-guard-option.interface.ts#L68)

</td>
</tr>
<tr>
<td>

<a id="redirect"></a> `redirect`

</td>
<td>

`string`

</td>
<td>

The route to redirect to if the condition is not met

</td>
<td>

[libs/ngx-auth/src/lib/interfaces/auth-guard-option.interface.ts:72](https://github.com/hichchidev/hichchi/blob/1821ea22bf9e9b89c932111f16da4943c07c58c7/libs/ngx-auth/src/lib/interfaces/auth-guard-option.interface.ts#L72)

</td>
</tr>
<tr>
<td>

<a id="state"></a> `state`

</td>
<td>

`boolean`

</td>
<td>

The required state of the condition (true/false)

</td>
<td>

[libs/ngx-auth/src/lib/interfaces/auth-guard-option.interface.ts:70](https://github.com/hichchidev/hichchi/blob/1821ea22bf9e9b89c932111f16da4943c07c58c7/libs/ngx-auth/src/lib/interfaces/auth-guard-option.interface.ts#L70)

</td>
</tr>
</tbody>
</table>

---

### AuthStateModel

Defined in: [libs/ngx-auth/src/lib/state/auth.state.ts:57](https://github.com/hichchidev/hichchi/blob/1821ea22bf9e9b89c932111f16da4943c07c58c7/libs/ngx-auth/src/lib/state/auth.state.ts#L57)

Interface defining the authentication state model

This interface represents the complete authentication state structure used
throughout the Angular application. It contains user information, authentication
tokens, and session data that persists across browser sessions.

The state is automatically synchronized with browser storage to maintain
authentication across page refreshes and browser restarts.

#### Example

```typescript
// Accessing state in a component
export class HeaderComponent {
  private authState = inject(AuthState);

  get isSignedIn() {
    return this.authState.signedIn();
  }

  get currentUser() {
    return this.authState.user();
  }
}
```

#### See

- [AuthState](#authstate-1) The signal store that manages this state
- User Interface for user data
- AccessToken Type for access tokens
- RefreshToken Type for refresh tokens

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Description</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="accesstoken"></a> `accessToken`

</td>
<td>

`null` | `AccessToken`

</td>
<td>

JWT access token for API authentication

</td>
<td>

[libs/ngx-auth/src/lib/state/auth.state.ts:65](https://github.com/hichchidev/hichchi/blob/1821ea22bf9e9b89c932111f16da4943c07c58c7/libs/ngx-auth/src/lib/state/auth.state.ts#L65)

</td>
</tr>
<tr>
<td>

<a id="accesstokenexpireson"></a> `accessTokenExpiresOn`

</td>
<td>

`null` | `Date`

</td>
<td>

Expiration date of the access token

</td>
<td>

[libs/ngx-auth/src/lib/state/auth.state.ts:69](https://github.com/hichchidev/hichchi/blob/1821ea22bf9e9b89c932111f16da4943c07c58c7/libs/ngx-auth/src/lib/state/auth.state.ts#L69)

</td>
</tr>
<tr>
<td>

<a id="refreshtoken-2"></a> `refreshToken`

</td>
<td>

`null` | `RefreshToken`

</td>
<td>

JWT refresh token for obtaining new access tokens

</td>
<td>

[libs/ngx-auth/src/lib/state/auth.state.ts:67](https://github.com/hichchidev/hichchi/blob/1821ea22bf9e9b89c932111f16da4943c07c58c7/libs/ngx-auth/src/lib/state/auth.state.ts#L67)

</td>
</tr>
<tr>
<td>

<a id="refreshtokenexpireson"></a> `refreshTokenExpiresOn`

</td>
<td>

`null` | `Date`

</td>
<td>

Expiration date of the refresh token

</td>
<td>

[libs/ngx-auth/src/lib/state/auth.state.ts:71](https://github.com/hichchidev/hichchi/blob/1821ea22bf9e9b89c932111f16da4943c07c58c7/libs/ngx-auth/src/lib/state/auth.state.ts#L71)

</td>
</tr>
<tr>
<td>

<a id="sessionid"></a> `sessionId`

</td>
<td>

`null` | `string`

</td>
<td>

Unique identifier for the current session

</td>
<td>

[libs/ngx-auth/src/lib/state/auth.state.ts:61](https://github.com/hichchidev/hichchi/blob/1821ea22bf9e9b89c932111f16da4943c07c58c7/libs/ngx-auth/src/lib/state/auth.state.ts#L61)

</td>
</tr>
<tr>
<td>

<a id="signedin"></a> `signedIn`

</td>
<td>

`boolean`

</td>
<td>

Whether the user is currently signed in

</td>
<td>

[libs/ngx-auth/src/lib/state/auth.state.ts:59](https://github.com/hichchidev/hichchi/blob/1821ea22bf9e9b89c932111f16da4943c07c58c7/libs/ngx-auth/src/lib/state/auth.state.ts#L59)

</td>
</tr>
<tr>
<td>

<a id="user"></a> `user`

</td>
<td>

`null` | `User`<`string`, `string`>

</td>
<td>

Current authenticated user information

</td>
<td>

[libs/ngx-auth/src/lib/state/auth.state.ts:63](https://github.com/hichchidev/hichchi/blob/1821ea22bf9e9b89c932111f16da4943c07c58c7/libs/ngx-auth/src/lib/state/auth.state.ts#L63)

</td>
</tr>
</tbody>
</table>

---

### RoleGuardOption

Defined in: [libs/ngx-auth/src/lib/interfaces/role-guard-option.interface.ts:1](https://github.com/hichchidev/hichchi/blob/1821ea22bf9e9b89c932111f16da4943c07c58c7/libs/ngx-auth/src/lib/interfaces/role-guard-option.interface.ts#L1)

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Description</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="redirect-1"></a> `redirect`

</td>
<td>

`string`

</td>
<td>

The route to redirect to if the role exist

</td>
<td>

[libs/ngx-auth/src/lib/interfaces/role-guard-option.interface.ts:5](https://github.com/hichchidev/hichchi/blob/1821ea22bf9e9b89c932111f16da4943c07c58c7/libs/ngx-auth/src/lib/interfaces/role-guard-option.interface.ts#L5)

</td>
</tr>
<tr>
<td>

<a id="state-1"></a> `state?`

</td>
<td>

`string`

</td>
<td>

The required state of the role

</td>
<td>

[libs/ngx-auth/src/lib/interfaces/role-guard-option.interface.ts:3](https://github.com/hichchidev/hichchi/blob/1821ea22bf9e9b89c932111f16da4943c07c58c7/libs/ngx-auth/src/lib/interfaces/role-guard-option.interface.ts#L3)

</td>
</tr>
</tbody>
</table>

## Variables

### AuthState

```ts
const AuthState: Type<
  object &
    StateSource<{
      accessToken: null | AccessToken;
      accessTokenExpiresOn: null | Date;
      refreshToken: null | RefreshToken;
      refreshTokenExpiresOn: null | Date;
      sessionId: null | string;
      signedIn: boolean;
      user: null | User<string, string>;
    }>
>;
```

Defined in: [libs/ngx-auth/src/lib/state/auth.state.ts:161](https://github.com/hichchidev/hichchi/blob/1821ea22bf9e9b89c932111f16da4943c07c58c7/libs/ngx-auth/src/lib/state/auth.state.ts#L161)

Authentication state management store using NgRx Signals

This signal store provides centralized state management for authentication in Angular applications.
It manages user authentication state, tokens, and provides methods for authentication operations.
The store automatically persists state to browser storage and provides reactive computed values.

Key features:

- Automatic state persistence with browser storage sync
- Reactive computed properties for common authentication checks
- Built-in methods for sign-in, sign-out, and token management
- Integration with Angular Router for navigation after authentication
- Type-safe state management with TypeScript

The store is provided at the root level and can be injected into any component or service.
It uses NgRx Signals for reactive state management and provides a modern alternative
to traditional NgRx store patterns.

#### Examples

```typescript
// In a component
export class AppComponent {
  private authState = inject(AuthState);

  // Access reactive state
  isSignedIn = this.authState.signedIn;
  currentUser = this.authState.user;
  hasAccessToken = this.authState.hasAccessToken;

  // Sign in user
  async signIn() {
    this.authState
      .signIn(
        {
          email: "user@example.com",
          password: "password123",
        },
        "/dashboard",
      )
      .subscribe({
        next: (response) => console.log("Signed in:", response.user),
        error: (error) => console.error("Sign in failed:", error),
      });
  }

  // Sign out user
  signOut() {
    this.authState.signOut("/login").subscribe();
  }
}
```

```typescript
// In a guard
export class AuthGuard {
  private authState = inject(AuthState);

  canActivate(): boolean {
    return this.authState.signedIn() && this.authState.hasAccessToken();
  }
}
```

```typescript
// Using computed properties
export class HeaderComponent {
  private authState = inject(AuthState);

  // Reactive computed values
  userRole = this.authState.role;
  isEmailVerified = this.authState.emailVerified;
  hasValidToken = this.authState.hasAccessToken;
}
```

#### See

- [AuthStateModel](#authstatemodel) Interface defining the state structure
- [AuthService](#authservice) Service used for authentication operations
- signalStore NgRx Signals store factory function
- withStorageSync Storage synchronization feature

---

### SKIPPED_ERRORS

```ts
const SKIPPED_ERRORS: ErrorResponseCode[];
```

Defined in: [libs/ngx-auth/src/lib/interceptors/auth.interceptor.ts:30](https://github.com/hichchidev/hichchi/blob/1821ea22bf9e9b89c932111f16da4943c07c58c7/libs/ngx-auth/src/lib/interceptors/auth.interceptor.ts#L30)

Array of authentication error codes that should trigger token refresh instead of immediate redirect

These error codes indicate authentication issues that can potentially be resolved
by refreshing the access token. When these errors are encountered, the interceptor
will attempt to refresh the token before redirecting the user to the login page.

#### Example

```typescript
// The interceptor checks if the error code is in this array
if (SKIPPED_ERRORS.includes(error.error?.code)) {
  // Attempt token refresh instead of immediate redirect
  return refreshToken(req, next);
}
```

#### See

- AuthErrorResponseCode Enum containing all authentication error codes
- [authInterceptor](#authinterceptor) Function that uses this array for error handling
