<!--suppress ALL -->

<div align="center">
  <h1>🔧 @hichchi/ngx-utils</h1>
  <p>
    <strong>A utility library for Angular applications with HTTP interceptors, authentication services, and state management</strong>
  </p>
  <p>
    <a href="https://www.npmjs.com/package/@hichchi/ngx-utils">
      <img src="https://img.shields.io/npm/v/@hichchi/ngx-utils?style=flat-square&color=blue" alt="npm version">
    </a>
    <a href="https://www.npmjs.com/package/@hichchi/ngx-utils">
      <img src="https://img.shields.io/npm/dm/@hichchi/ngx-utils?style=flat-square&color=green" alt="npm downloads">
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
npm install @hichchi/ngx-utils
```

## 🌟 Overview

This library provides a collection of utilities for Angular applications, including HTTP interceptors, authentication services, state management, and form utilities. It helps streamline common tasks in Angular development and promotes consistent implementation patterns.

## ✨ Key Features

- 🌐 **HTTP Interceptors**: Pre-configured interceptors for API URLs, authentication, error handling, and response transformation
- 🔐 **Authentication Services**: Services for handling user authentication and authorization
- 📊 **State Management**: State management utilities for authentication and other application states
- 📝 **Form Utilities**: Helper functions for working with Angular forms
- 📋 **Interface Definitions**: TypeScript interfaces for consistent typing
- 🛠️ **Common Services**: Reusable services for Angular applications

## 🚀 Usage

### HTTP Interceptors

```typescript
import { NgModule } from "@angular/core";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import {
  apiInterceptor,
  AuthInterceptor,
  ErrorInterceptor,
  ResponseInterceptor,
} from "@hichchi/ngx-utils/interceptors";

@NgModule({
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: apiInterceptor, multi: true },
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
import { AuthService } from "@hichchi/ngx-utils/services";

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
nx build ngx-utils
```

### Running unit tests

```bash
nx test ngx-utils
```

Tests are executed via [Jest](https://jestjs.io).

---

---

<div align="center">

**Made with ❤️ by [Hichchi Dev](https://github.com/hichchidev)**

[![Hichchi Ecosystem](https://img.shields.io/badge/🏠_Hichchi_Ecosystem-blue)](https://github.com/hichchidev/hichchi)
[![Report Bug](https://img.shields.io/badge/🐛_Report_Bug-red)](https://github.com/hichchidev/hichchi/issues)
[![Request Feature](https://img.shields.io/badge/✨_Request_Feature-green)](https://github.com/hichchidev/hichchi/issues)

_Building the future of Angular development, one commit at a time_

</div>

---

# 📖 API Documentation

Complete technical reference for all classes, interfaces, methods, and types in this library.

**Auto-generated by TypeDoc** - Browse through detailed API references, code examples, and implementation guides below.

<!-- TypeDoc generated documentation will be appended below this point -->

---

## 📋 API Table of Contents

- [Classes](#classes)
  - [`abstract` CrudHttpService](#abstract-crudhttpservice)
- [Functions](#functions)
  - [apiInterceptor()](#apiinterceptor)
  - [createFormData()](#createformdata)
  - [errorResponseInterceptor()](#errorresponseinterceptor)
  - [extractSubdomain()](#extractsubdomain)
  - [getClosestScrollableElement()](#getclosestscrollableelement)
  - [isElementInView()](#iselementinview)
  - [isScrollable()](#isscrollable)
  - [isSuccessResponse()](#issuccessresponse)
  - [markFormDirty()](#markformdirty)
  - [replaceNulls()](#replacenulls)
  - [saveAsFile()](#saveasfile)
  - [skipNotify()](#skipnotify)
  - [skipNotifyContext()](#skipnotifycontext)
  - [validatedFormData()](#validatedformdata)
- [Interfaces](#interfaces)
  - [DataFormGroup](#dataformgroup)
  - [Patch the value for a form group](#patch-the-value-for-a-form-group)
  - [Reset the form group values](#reset-the-form-group-values)
  - [Reset the form group values and disabled status](#reset-the-form-group-values-and-disabled-status)
  - [Manually set the errors for a control](#manually-set-the-errors-for-a-control)
  - [Set the complete value for the form group](#set-the-complete-value-for-the-form-group)
  - [HttpError](#httperror)
  - [HttpGetOptions](#httpgetoptions)
  - [HttpGetOptionsPromise](#httpgetoptionspromise)
  - [HttpOptions](#httpoptions)
  - [HttpOptionsPromise](#httpoptionspromise)
- [Type Aliases](#type-aliases)
  - [DataFormControls](#dataformcontrols)
  - [DataFormValues](#dataformvalues)

## Classes

### `abstract` CrudHttpService

Defined in: [libs/ngx-utils/src/lib/services/crud-http.service.ts:20](https://github.com/hichchidev/hichchi/blob/7a34875f41fbc37ae8354ec8276cde73a8661476/libs/ngx-utils/src/lib/services/crud-http.service.ts#L20)

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
<th>Default type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`Mdl` _extends_ `Model`

</td>
<td>

`Model`

</td>
</tr>
</tbody>
</table>

#### Constructors

##### Constructor

```ts
new CrudHttpService<Mdl>(): CrudHttpService<Mdl>;
```

###### Returns

[`CrudHttpService`](#abstract-crudhttpservice)<`Mdl`>

#### Methods

##### delete()

###### Call Signature

```ts
delete<Res>(url, options?): Observable<Res>;
```

Defined in: [libs/ngx-utils/src/lib/services/crud-http.service.ts:95](https://github.com/hichchidev/hichchi/blob/7a34875f41fbc37ae8354ec8276cde73a8661476/libs/ngx-utils/src/lib/services/crud-http.service.ts#L95)

###### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
<th>Default type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`Res`

</td>
<td>

`unknown`

</td>
</tr>
</tbody>
</table>

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

`url`

</td>
<td>

`string` | `string`\[]

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

[`HttpOptions`](#httpoptions)

</td>
</tr>
</tbody>
</table>

###### Returns

`Observable`<`Res`>

###### Call Signature

```ts
delete<Res>(url, options?): Promise<Res>;
```

Defined in: [libs/ngx-utils/src/lib/services/crud-http.service.ts:97](https://github.com/hichchidev/hichchi/blob/7a34875f41fbc37ae8354ec8276cde73a8661476/libs/ngx-utils/src/lib/services/crud-http.service.ts#L97)

###### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
<th>Default type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`Res`

</td>
<td>

`unknown`

</td>
</tr>
</tbody>
</table>

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

`url`

</td>
<td>

`string` | `string`\[]

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

[`HttpOptionsPromise`](#httpoptionspromise)

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`Res`>

##### get()

###### Call Signature

```ts
get<Res>(url, options?): Observable<Res>;
```

Defined in: [libs/ngx-utils/src/lib/services/crud-http.service.ts:48](https://github.com/hichchidev/hichchi/blob/7a34875f41fbc37ae8354ec8276cde73a8661476/libs/ngx-utils/src/lib/services/crud-http.service.ts#L48)

###### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
<th>Default type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`Res`

</td>
<td>

`unknown`

</td>
</tr>
</tbody>
</table>

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

`url`

</td>
<td>

`string` | `string`\[]

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

[`HttpGetOptions`](#httpgetoptions)<`Mdl`>

</td>
</tr>
</tbody>
</table>

###### Returns

`Observable`<`Res`>

###### Call Signature

```ts
get<Res>(url, options?): Promise<Res>;
```

Defined in: [libs/ngx-utils/src/lib/services/crud-http.service.ts:50](https://github.com/hichchidev/hichchi/blob/7a34875f41fbc37ae8354ec8276cde73a8661476/libs/ngx-utils/src/lib/services/crud-http.service.ts#L50)

###### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
<th>Default type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`Res`

</td>
<td>

`unknown`

</td>
</tr>
</tbody>
</table>

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

`url`

</td>
<td>

`string` | `string`\[]

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

[`HttpGetOptionsPromise`](#httpgetoptionspromise)<`Mdl`>

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`Res`>

##### patch()

###### Call Signature

```ts
patch<Res, B>(
   url,
   body,
options?): Observable<Res>;
```

Defined in: [libs/ngx-utils/src/lib/services/crud-http.service.ts:83](https://github.com/hichchidev/hichchi/blob/7a34875f41fbc37ae8354ec8276cde73a8661476/libs/ngx-utils/src/lib/services/crud-http.service.ts#L83)

###### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
<th>Default type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`Res`

</td>
<td>

`unknown`

</td>
</tr>
<tr>
<td>

`B`

</td>
<td>

`unknown`

</td>
</tr>
</tbody>
</table>

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

`url`

</td>
<td>

`string` | `string`\[]

</td>
</tr>
<tr>
<td>

`body`

</td>
<td>

`B`

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

[`HttpOptions`](#httpoptions)

</td>
</tr>
</tbody>
</table>

###### Returns

`Observable`<`Res`>

###### Call Signature

```ts
patch<Res, B>(
   url,
   body,
options?): Promise<Res>;
```

Defined in: [libs/ngx-utils/src/lib/services/crud-http.service.ts:85](https://github.com/hichchidev/hichchi/blob/7a34875f41fbc37ae8354ec8276cde73a8661476/libs/ngx-utils/src/lib/services/crud-http.service.ts#L85)

###### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
<th>Default type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`Res`

</td>
<td>

`unknown`

</td>
</tr>
<tr>
<td>

`B`

</td>
<td>

`unknown`

</td>
</tr>
</tbody>
</table>

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

`url`

</td>
<td>

`string` | `string`\[]

</td>
</tr>
<tr>
<td>

`body`

</td>
<td>

`B`

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

[`HttpOptionsPromise`](#httpoptionspromise)

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`Res`>

##### post()

###### Call Signature

```ts
post<Res, B>(
   url,
   body,
options?): Observable<Res>;
```

Defined in: [libs/ngx-utils/src/lib/services/crud-http.service.ts:59](https://github.com/hichchidev/hichchi/blob/7a34875f41fbc37ae8354ec8276cde73a8661476/libs/ngx-utils/src/lib/services/crud-http.service.ts#L59)

###### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
<th>Default type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`Res`

</td>
<td>

`unknown`

</td>
</tr>
<tr>
<td>

`B`

</td>
<td>

`unknown`

</td>
</tr>
</tbody>
</table>

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

`url`

</td>
<td>

`string` | `string`\[]

</td>
</tr>
<tr>
<td>

`body`

</td>
<td>

`B`

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

[`HttpOptions`](#httpoptions)

</td>
</tr>
</tbody>
</table>

###### Returns

`Observable`<`Res`>

###### Call Signature

```ts
post<Res, B>(
   url,
   body,
options?): Promise<Res>;
```

Defined in: [libs/ngx-utils/src/lib/services/crud-http.service.ts:61](https://github.com/hichchidev/hichchi/blob/7a34875f41fbc37ae8354ec8276cde73a8661476/libs/ngx-utils/src/lib/services/crud-http.service.ts#L61)

###### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
<th>Default type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`Res`

</td>
<td>

`unknown`

</td>
</tr>
<tr>
<td>

`B`

</td>
<td>

`unknown`

</td>
</tr>
</tbody>
</table>

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

`url`

</td>
<td>

`string` | `string`\[]

</td>
</tr>
<tr>
<td>

`body`

</td>
<td>

`B`

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

[`HttpOptionsPromise`](#httpoptionspromise)

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`Res`>

##### put()

###### Call Signature

```ts
put<Res, B>(
   url,
   body,
options?): Observable<Res>;
```

Defined in: [libs/ngx-utils/src/lib/services/crud-http.service.ts:71](https://github.com/hichchidev/hichchi/blob/7a34875f41fbc37ae8354ec8276cde73a8661476/libs/ngx-utils/src/lib/services/crud-http.service.ts#L71)

###### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
<th>Default type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`Res`

</td>
<td>

`unknown`

</td>
</tr>
<tr>
<td>

`B`

</td>
<td>

`unknown`

</td>
</tr>
</tbody>
</table>

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

`url`

</td>
<td>

`string` | `string`\[]

</td>
</tr>
<tr>
<td>

`body`

</td>
<td>

`B`

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

[`HttpOptions`](#httpoptions)

</td>
</tr>
</tbody>
</table>

###### Returns

`Observable`<`Res`>

###### Call Signature

```ts
put<Res, B>(
   url,
   body,
options?): Promise<Res>;
```

Defined in: [libs/ngx-utils/src/lib/services/crud-http.service.ts:73](https://github.com/hichchidev/hichchi/blob/7a34875f41fbc37ae8354ec8276cde73a8661476/libs/ngx-utils/src/lib/services/crud-http.service.ts#L73)

###### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
<th>Default type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`Res`

</td>
<td>

`unknown`

</td>
</tr>
<tr>
<td>

`B`

</td>
<td>

`unknown`

</td>
</tr>
</tbody>
</table>

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

`url`

</td>
<td>

`string` | `string`\[]

</td>
</tr>
<tr>
<td>

`body`

</td>
<td>

`B`

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

[`HttpOptionsPromise`](#httpoptionspromise)

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`Res`>

##### request()

```ts
protected request<Res, Body>(
   type,
   url,
   body,
options?): Promise<Res> | Observable<Res>;
```

Defined in: [libs/ngx-utils/src/lib/services/crud-http.service.ts:23](https://github.com/hichchidev/hichchi/blob/7a34875f41fbc37ae8354ec8276cde73a8661476/libs/ngx-utils/src/lib/services/crud-http.service.ts#L23)

###### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
<th>Default type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`Res`

</td>
<td>

`unknown`

</td>
</tr>
<tr>
<td>

`Body`

</td>
<td>

`unknown`

</td>
</tr>
</tbody>
</table>

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

`type`

</td>
<td>

`RequestType`

</td>
</tr>
<tr>
<td>

`url`

</td>
<td>

`string` | `string`\[]

</td>
</tr>
<tr>
<td>

`body`

</td>
<td>

`Body`

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

| [`HttpGetOptions`](#httpgetoptions)<`Mdl`> | [`HttpGetOptionsPromise`](#httpgetoptionspromise)<`Mdl`>

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`Res`> | `Observable`<`Res`>

##### parseQuery()

```ts
static parseQuery<T>(options?): HttpQuery<Model>;
```

Defined in: [libs/ngx-utils/src/lib/services/crud-http.service.ts:106](https://github.com/hichchidev/hichchi/blob/7a34875f41fbc37ae8354ec8276cde73a8661476/libs/ngx-utils/src/lib/services/crud-http.service.ts#L106)

###### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`T`

</td>
</tr>
</tbody>
</table>

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

`options?`

</td>
<td>

| [`HttpGetOptions`](#httpgetoptions)<`T`> | [`HttpGetOptionsPromise`](#httpgetoptionspromise)<`T`>

</td>
</tr>
</tbody>
</table>

###### Returns

`HttpQuery`<`Model`>

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Modifier</th>
<th>Type</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="property-http"></a> `http`

</td>
<td>

`protected`

</td>
<td>

`HttpClient`

</td>
<td>

[libs/ngx-utils/src/lib/services/crud-http.service.ts:21](https://github.com/hichchidev/hichchi/blob/7a34875f41fbc37ae8354ec8276cde73a8661476/libs/ngx-utils/src/lib/services/crud-http.service.ts#L21)

</td>
</tr>
</tbody>
</table>

## Functions

### apiInterceptor()

```ts
function apiInterceptor(apiBase, splitDomain?, tenant?): HttpInterceptorFn;
```

Defined in: [libs/ngx-utils/src/lib/interceptors/api.interceptor.ts:87](https://github.com/hichchidev/hichchi/blob/7a34875f41fbc37ae8354ec8276cde73a8661476/libs/ngx-utils/src/lib/interceptors/api.interceptor.ts#L87)

Creates an HTTP interceptor that rewrites relative request URLs using a base API host
and optionally attaches a tenant header for multi-tenant applications.

This interceptor allows Angular applications to:

- Use relative request URLs in services and components
- Automatically prepend a base API URL for consistency
- Add a tenant identifier via a custom HTTP header (`x-tenant`) if provided
  or extracted from the current origin using `splitDomain`

How the interceptor works:

- Requests that already start with the provided `apiBase` or with `http://` or `https://`
  are passed through unchanged
- All other relative requests are rewritten as:
  `${apiBase}/${req.url}`
- If a `tenant` string is provided or a subdomain is extracted using `splitDomain`,
  it is added to the request headers using the `TENANT_HEADER_KEY` constant

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

`apiBase`

</td>
<td>

`string`

</td>
<td>

The base API URL used to build relative request URLs (e.g., "https://api.example.com")

</td>
</tr>
<tr>
<td>

`splitDomain?`

</td>
<td>

`string`

</td>
<td>

Optional domain name used to extract subdomain from the current URL (e.g., "example.com")

</td>
</tr>
<tr>
<td>

`tenant?`

</td>
<td>

`TenantSlug`

</td>
<td>

Optional tenant identifier to attach via header (e.g., "tenant-a")

</td>
</tr>
</tbody>
</table>

#### Returns

`HttpInterceptorFn`

An `HttpInterceptorFn` that can be registered with Angular's `HttpClient`

#### Examples

```typescript
// Basic usage in app configuration
apiInterceptor("https://api.example.com");
```

```typescript
// Using environment configuration
apiInterceptor(environment.apiUrl);
```

```typescript
// With a static tenant
apiInterceptor("https://api.example.com", undefined, "tenant-a");
// Relative request 'users' -> 'https://api.example.com/users'
// Header 'x-tenant: tenant-a' is attached to the request
```

```typescript
// Using splitDomain to automatically extract tenant from URL
// Current page URL: https://tenant123.example.com
apiInterceptor("https://api.example.com", "example.com");
// Relative request 'users' -> 'https://api.example.com/users'
// Header 'x-tenant: tenant123' is attached to the request
```

```typescript
// In a service using relative URLs
@Injectable()
export class UserService {
  constructor(private http: HttpClient) {}

  getUsers() {
    // Relative URL becomes: https://api.example.com/users
    // Tenant header is added if specified or extracted
    return this.http.get("users");
  }

  getUserById(id: string) {
    return this.http.get(`users/${id}`);
  }

  // Absolute URLs are passed through unchanged
  getExternalData() {
    return this.http.get("https://external-api.com/data");
  }
}
```

#### See

- HttpInterceptorFn Angular HTTP interceptor function type
- HttpRequest Angular HTTP request interface
- HEADER_TENANT_KEY Constant used to attach tenant header
- [extractSubdomain](#extractsubdomain) Utility function for extracting subdomains from URLs

---

### createFormData()

```ts
function createFormData<T>(data): FormData;
```

Defined in: [libs/ngx-utils/src/lib/form/form.utils.ts:404](https://github.com/hichchidev/hichchi/blob/7a34875f41fbc37ae8354ec8276cde73a8661476/libs/ngx-utils/src/lib/form/form.utils.ts#L404)

Creates a FormData object from a plain JavaScript object

This utility function converts a plain object into a FormData object, which is
required for multipart/form-data HTTP requests, particularly when uploading files
or sending form data that includes binary content. The function handles different
data types appropriately, preserving file names for File objects and converting
other values to strings.

The function is particularly useful when working with Angular forms that need to
submit both regular form fields and file uploads in a single request. It automatically
handles the conversion of various data types to the format expected by FormData.

Key features:

- Preserves original file names for File objects
- Converts primitive values to strings
- Maintains type safety with generic constraints
- Handles Blob objects correctly
- Creates multipart/form-data compatible output

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`T` _extends_ `object`

</td>
<td>

Object type with string keys and values that can be converted to FormData

</td>
</tr>
</tbody>
</table>

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

`data`

</td>
<td>

`T`

</td>
<td>

Object containing the data to convert to FormData

</td>
</tr>
</tbody>
</table>

#### Returns

`FormData`

A FormData object ready for HTTP submission

#### Examples

```typescript
// Basic usage with mixed data types
const formData = createFormData({
  name: "John Doe",
  age: 30,
  isActive: true,
  avatar: fileInput.files[0], // File object
});

// Submit via HTTP
this.http.post("/api/users", formData).subscribe();
```

```typescript
// File upload with metadata
export class FileUploadComponent {
  onFileUpload(file: File, description: string, isPublic: boolean) {
    const uploadData = createFormData({
      file: file,
      description: description,
      isPublic: isPublic,
      uploadedAt: new Date().toISOString(),
    });

    this.fileService.upload(uploadData).subscribe({
      next: (response) => console.log("Upload successful"),
      error: (error) => console.error("Upload failed", error),
    });
  }
}
```

```typescript
// Using with form validation
export class ProfileFormComponent {
  profileForm = this.fb.group({
    name: ["", Validators.required],
    bio: [""],
    profilePicture: [null],
  });

  onSubmit() {
    const formValue = validatedFormData(this.profileForm);
    if (!formValue) return;

    // Convert to FormData for file upload
    const formData = createFormData({
      name: formValue.name,
      bio: formValue.bio || "",
      profilePicture: formValue.profilePicture,
      timestamp: Date.now(),
    });

    this.profileService.updateProfile(formData);
  }
}
```

```typescript
// Multiple file upload
interface UploadRequest {
  title: string;
  category: string;
  document: File;
  thumbnail: File;
  isPrivate: boolean;
}

const uploadRequest: UploadRequest = {
  title: "My Document",
  category: "reports",
  document: documentFile,
  thumbnail: thumbnailFile,
  isPrivate: false,
};

const formData = createFormData(uploadRequest);
// FormData will contain:
// - title: "My Document"
// - category: "reports"
// - document: [File object with original name]
// - thumbnail: [File object with original name]
// - isPrivate: "false"
```

#### See

- FormData Web API interface for form data
- File Web API interface for file objects
- Blob Web API interface for binary data
- [validatedFormData](#validatedformdata) Function for getting validated form data to use with this utility

---

### errorResponseInterceptor()

```ts
function errorResponseInterceptor(
  providerWithNotify,
  providerWithSignOut,
): HttpInterceptorFn;
```

Defined in: [libs/ngx-utils/src/lib/interceptors/error.interceptor.ts:140](https://github.com/hichchidev/hichchi/blob/7a34875f41fbc37ae8354ec8276cde73a8661476/libs/ngx-utils/src/lib/interceptors/error.interceptor.ts#L140)

Creates an HTTP error response interceptor for Angular applications

This function creates an HTTP interceptor that handles error responses from API calls.
It provides centralized error handling with support for authentication error detection,
automatic user sign-out on unauthorized access, and configurable error notifications.
The interceptor integrates with notification services and authentication services to
provide a seamless error handling experience.

The interceptor distinguishes between different types of errors and handles them
appropriately. It can detect known authentication errors, handle unauthorized access
by automatically signing out users, and show error notifications based on request
context configuration.

Key features:

- Centralized HTTP error handling for all API requests
- Authentication error detection and handling
- Automatic user sign-out on unauthorized access
- Configurable error notifications per request
- Integration with notification and authentication services
- Support for both client-side and server-side errors
- Context-aware error handling based on request configuration

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

`providerWithNotify`

</td>
<td>

`Type`<{ `error`: (`message`) => `void`; }>

</td>
<td>

Service provider type that implements error notification functionality

</td>
</tr>
<tr>
<td>

`providerWithSignOut`

</td>
<td>

`Type`<{ `signOut`: () => `Observable`<`any`>; }>

</td>
<td>

Service provider type that implements user sign-out functionality

</td>
</tr>
</tbody>
</table>

#### Returns

`HttpInterceptorFn`

HttpInterceptorFn that can be used in Angular HTTP interceptor configuration

#### Examples

```typescript
// Basic usage in app configuration
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { NotificationService } from "./services/notification.service";
import { AuthService } from "./services/auth.service";

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withInterceptors([
        errorResponseInterceptor(NotificationService, AuthService),
      ]),
    ),
  ],
};
```

```typescript
// Using with custom notification and auth services
import { ToastService } from "./services/toast.service";
import { UserAuthService } from "./services/user-auth.service";

const errorInterceptor = errorResponseInterceptor(
  ToastService,
  UserAuthService,
);

export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(withInterceptors([errorInterceptor]))],
};
```

```typescript
// Service implementations that work with the interceptor
@Injectable()
export class NotificationService {
  error(message: string): void {
    // Show error notification to user
    this.toastr.error(message);
  }
}

@Injectable()
export class AuthService {
  signOut(): void {
    // Clear user session and redirect to login
    this.clearTokens();
    this.router.navigate(["/login"]);
  }
}
```

```typescript
// Making HTTP requests with error notification control
import { HttpClient } from "@angular/common/http";
import { skipNotifyContext } from "@hichchi/ngx-utils";

@Injectable()
export class DataService {
  constructor(private http: HttpClient) {}

  // Request with error notifications enabled (default)
  getData() {
    return this.http.get("/api/data");
  }

  // Request with error notifications disabled
  getDataSilently() {
    return this.http.get("/api/data", skipNotifyContext(true));
  }
}
```

```typescript
// Advanced usage with multiple interceptors
import { AuthInterceptor } from "./interceptors/auth.interceptor";
import { LoadingInterceptor } from "./interceptors/loading.interceptor";

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withInterceptors([
        AuthInterceptor,
        LoadingInterceptor,
        errorResponseInterceptor(NotificationService, AuthService),
      ]),
    ),
  ],
};
```

#### See

- HttpInterceptorFn Angular HTTP interceptor function type
- [HttpError](#httperror) Interface for HTTP error objects
- NOTIFY_ERRORS Token for controlling error notification context
- AuthErrorResponseCode Enum of known authentication error codes
- HttpClientErrorStatus Enum of HTTP client error status codes

---

### extractSubdomain()

```ts
function extractSubdomain(splitDomain?): string | undefined;
```

Defined in: [libs/ngx-utils/src/lib/utils/http.utils.ts:69](https://github.com/hichchidev/hichchi/blob/7a34875f41fbc37ae8354ec8276cde73a8661476/libs/ngx-utils/src/lib/utils/http.utils.ts#L69)

Extract a subdomain from the current origin URL

This utility function parses the current page's URL (`window.location.href`)
and extracts the subdomain portion relative to the provided main domain.

Behavior:

- Returns the subdomain if the hostname contains one before the `splitDomain`
- Returns `undefined` for single-label hostnames (e.g., `localhost`), IP addresses,
  or if no subdomain exists

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

`splitDomain?`

</td>
<td>

`string`

</td>
<td>

The main domain used as reference for extraction (e.g., "example.com")

</td>
</tr>
</tbody>
</table>

#### Returns

`string` | `undefined`

The extracted subdomain if found, or `undefined` otherwise

#### Examples

```ts
extractSubdomain("example.com");
// On "admin.example.com" -> returns "admin"
```

```ts
extractSubdomain("example.com");
// On "localhost:3000" -> returns undefined
```

```ts
extractSubdomain("example.com");
// On "example.com" -> returns undefined (no subdomain)
```

---

### getClosestScrollableElement()

```ts
function getClosestScrollableElement(el): HTMLElement | null;
```

Defined in: [libs/ngx-utils/src/lib/utils/html.utils.ts:257](https://github.com/hichchidev/hichchi/blob/7a34875f41fbc37ae8354ec8276cde73a8661476/libs/ngx-utils/src/lib/utils/html.utils.ts#L257)

Finds the closest scrollable ancestor element in the DOM tree

This utility function traverses up the DOM tree from a given element to find the
nearest ancestor that is scrollable. It uses the isScrollable function to determine
scrollability and returns the first scrollable parent element found.

This is useful for implementing scroll-related functionality that needs to work
with the appropriate scrollable container, such as:

- Implementing custom scroll behaviors
- Adding scroll event listeners to the correct container
- Calculating scroll positions relative to the scrollable parent
- Implementing scroll-to-element functionality

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

`el`

</td>
<td>

`HTMLElement`

</td>
<td>

The starting HTML element to search from

</td>
</tr>
</tbody>
</table>

#### Returns

`HTMLElement` | `null`

The closest scrollable ancestor element, or null if none is found

#### Examples

```typescript
// Find the scrollable container for a specific element
const targetElement = document.querySelector(".target-element");
if (targetElement) {
  const scrollableParent = getClosestScrollableElement(targetElement);

  if (scrollableParent) {
    console.log("Found scrollable parent:", scrollableParent);
    // Add scroll event listener to the correct container
    scrollableParent.addEventListener("scroll", handleScroll);
  } else {
    console.log("No scrollable parent found");
  }
}
```

```typescript
// Implement scroll-to-element functionality
function scrollToElement(
  element: HTMLElement,
  behavior: ScrollBehavior = "smooth",
) {
  const scrollableContainer = getClosestScrollableElement(element);

  if (scrollableContainer) {
    // Calculate the position relative to the scrollable container
    const containerRect = scrollableContainer.getBoundingClientRect();
    const elementRect = element.getBoundingClientRect();
    const relativeTop =
      elementRect.top - containerRect.top + scrollableContainer.scrollTop;

    scrollableContainer.scrollTo({
      top: relativeTop,
      behavior,
    });
  } else {
    // Fallback to window scroll
    element.scrollIntoView({ behavior });
  }
}
```

```typescript
// Use in Angular directive for scroll-based functionality
@Directive({
  selector: "[appScrollSpy]",
})
export class ScrollSpyDirective implements OnInit, OnDestroy {
  private scrollContainer: HTMLElement | null = null;
  private scrollListener?: () => void;

  constructor(private elementRef: ElementRef<HTMLElement>) {}

  ngOnInit() {
    this.scrollContainer = getClosestScrollableElement(
      this.elementRef.nativeElement,
    );

    if (this.scrollContainer) {
      this.scrollListener = () => this.onScroll();
      this.scrollContainer.addEventListener("scroll", this.scrollListener);
    }
  }

  ngOnDestroy() {
    if (this.scrollContainer && this.scrollListener) {
      this.scrollContainer.removeEventListener("scroll", this.scrollListener);
    }
  }

  private onScroll() {
    // Implement scroll spy logic
    if (
      this.scrollContainer &&
      isElementInView(this.elementRef.nativeElement, this.scrollContainer)
    ) {
      // Element is in view
      console.log("Element is visible in scroll container");
    }
  }
}
```

#### See

- [isScrollable](#isscrollable) Function used internally to determine scrollability
- [isElementInView](#iselementinview) Function that can be used with the returned scrollable element
- HTMLElement.parentElement DOM property used for tree traversal

---

### isElementInView()

```ts
function isElementInView(el, container, threshold?): boolean;
```

Defined in: [libs/ngx-utils/src/lib/utils/html.utils.ts:153](https://github.com/hichchidev/hichchi/blob/7a34875f41fbc37ae8354ec8276cde73a8661476/libs/ngx-utils/src/lib/utils/html.utils.ts#L153)

Determines if an element is fully visible within a container element

This utility function checks whether a target element is completely visible within
the bounds of a container element. It compares the bounding rectangles of both
elements and optionally applies a threshold for more flexible visibility detection.

This is particularly useful for implementing features like:

- Lazy loading of content when elements come into view
- Scroll-based animations and transitions
- Virtual scrolling implementations
- Accessibility features that track visible content

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`el`

</td>
<td>

`HTMLElement`

</td>
<td>

`undefined`

</td>
<td>

The target element to check for visibility

</td>
</tr>
<tr>
<td>

`container`

</td>
<td>

`HTMLElement`

</td>
<td>

`undefined`

</td>
<td>

The container element that defines the visible area

</td>
</tr>
<tr>
<td>

`threshold`

</td>
<td>

`number`

</td>
<td>

`0`

</td>
<td>

Optional threshold in pixels for more flexible visibility detection (default: 0)

</td>
</tr>
</tbody>
</table>

#### Returns

`boolean`

True if the element is fully visible within the container, false otherwise

#### Examples

```typescript
// Check if a list item is visible in a scrollable container
const listItem = document.querySelector(".list-item");
const scrollContainer = document.querySelector(".scroll-container");

if (listItem && scrollContainer && isElementInView(listItem, scrollContainer)) {
  console.log("List item is fully visible");
  // Trigger animations or load additional content
}
```

```typescript
// Use with a threshold for partial visibility detection
const image = document.querySelector(".lazy-image");
const viewport = document.querySelector(".viewport");

// Check if image is visible with 50px threshold
if (image && viewport && isElementInView(image, viewport, 50)) {
  // Load the image when it's within 50px of being visible
  loadImage(image);
}
```

```typescript
// Implement scroll-based visibility tracking in Angular
@Component({
  selector: "app-scroll-tracker",
  template: `
    <div #container class="scroll-container" (scroll)="onScroll()">
      <div
        #item
        *ngFor="let item of items; trackBy: trackByFn"
        class="scroll-item"
        [class.visible]="item.isVisible"
      >
        {{ item.content }}
      </div>
    </div>
  `,
})
export class ScrollTrackerComponent {
  @ViewChild("container") container!: ElementRef<HTMLElement>;
  @ViewChildren("item") itemElements!: QueryList<ElementRef<HTMLElement>>;

  items = [
    { id: 1, content: "Item 1", isVisible: false },
    { id: 2, content: "Item 2", isVisible: false },
    // ... more items
  ];

  onScroll() {
    this.itemElements.forEach((itemRef, index) => {
      this.items[index].isVisible = isElementInView(
        itemRef.nativeElement,
        this.container.nativeElement,
        20, // 20px threshold
      );
    });
  }
}
```

#### See

- [isScrollable](#isscrollable) Function to check if an element is scrollable
- [getClosestScrollableElement](#getclosestscrollableelement) Function to find the nearest scrollable ancestor
- getBoundingClientRect DOM method used internally for position calculation

---

### isScrollable()

```ts
function isScrollable(el): boolean;
```

Defined in: [libs/ngx-utils/src/lib/utils/html.utils.ts:64](https://github.com/hichchidev/hichchi/blob/7a34875f41fbc37ae8354ec8276cde73a8661476/libs/ngx-utils/src/lib/utils/html.utils.ts#L64)

Determines if an HTML element is scrollable

This utility function checks whether an HTML element has scrollable content by examining
its computed CSS overflow-y property and comparing its scroll height to its client height.
An element is considered scrollable if it has overflow set to 'scroll' or 'auto' and
its content exceeds the visible area.

This is useful for implementing scroll-related functionality, such as infinite scrolling,
scroll position tracking, or determining whether scroll indicators should be shown.

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

`el`

</td>
<td>

`HTMLElement`

</td>
<td>

The HTML element to check for scrollability

</td>
</tr>
</tbody>
</table>

#### Returns

`boolean`

True if the element is scrollable, false otherwise

#### Examples

```typescript
// Check if a container element is scrollable
const container = document.getElementById("content-container");
if (container && isScrollable(container)) {
  console.log("Container has scrollable content");
  // Add scroll event listeners or show scroll indicators
}
```

```typescript
// Use in a component to conditionally show scroll indicators
@Component({
  selector: "app-scrollable-content",
  template: `
    <div #contentContainer class="content">
      <!-- content -->
    </div>
    <div *ngIf="showScrollIndicator" class="scroll-indicator">
      Scroll for more content
    </div>
  `,
})
export class ScrollableContentComponent implements AfterViewInit {
  @ViewChild("contentContainer") contentContainer!: ElementRef<HTMLElement>;
  showScrollIndicator = false;

  ngAfterViewInit() {
    this.showScrollIndicator = isScrollable(
      this.contentContainer.nativeElement,
    );
  }
}
```

```typescript
// Check multiple elements for scrollability
const elements = document.querySelectorAll(".potential-scroll-container");
const scrollableElements = Array.from(elements).filter((el) =>
  isScrollable(el as HTMLElement),
);

console.log(`Found ${scrollableElements.length} scrollable elements`);
```

#### See

- [getClosestScrollableElement](#getclosestscrollableelement) Function to find the nearest scrollable ancestor
- [isElementInView](#iselementinview) Function to check if an element is visible within a container

---

### isSuccessResponse()

```ts
function isSuccessResponse(body): body is SuccessResponse;
```

Defined in: [libs/ngx-utils/src/lib/utils/http.utils.ts:17](https://github.com/hichchidev/hichchi/blob/7a34875f41fbc37ae8354ec8276cde73a8661476/libs/ngx-utils/src/lib/utils/http.utils.ts#L17)

#### Parameters

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

`body`

</td>
<td>

`unknown`

</td>
</tr>
</tbody>
</table>

#### Returns

`body is SuccessResponse`

---

### markFormDirty()

```ts
function markFormDirty(form): void;
```

Defined in: [libs/ngx-utils/src/lib/form/form.utils.ts:75](https://github.com/hichchidev/hichchi/blob/7a34875f41fbc37ae8354ec8276cde73a8661476/libs/ngx-utils/src/lib/form/form.utils.ts#L75)

Recursively marks invalid form controls as dirty and touched

This utility function traverses a form hierarchy and marks all invalid controls
as dirty and touched, which triggers validation error display in the UI. It works
recursively through nested FormGroups and FormArrays to ensure all invalid
controls are properly marked for error display.

The function is particularly useful when you want to show all validation errors
at once, such as when a user attempts to submit a form. It only marks invalid
controls, leaving valid controls unchanged.

Key features:

- Recursive traversal of form hierarchy
- Only marks invalid controls as dirty/touched
- Handles nested FormGroups and FormArrays
- Updates validation state after marking controls
- Non-destructive (doesn't affect valid controls)

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

`form`

</td>
<td>

`FormGroup`

</td>
<td>

The FormGroup to process recursively

</td>
</tr>
</tbody>
</table>

#### Returns

`void`

#### Examples

```typescript
// Mark all invalid controls in a form for error display
export class UserFormComponent {
  userForm = this.fb.group({
    name: ["", Validators.required],
    email: ["", [Validators.required, Validators.email]],
    address: this.fb.group({
      street: ["", Validators.required],
      city: ["", Validators.required],
    }),
  });

  onSubmit() {
    if (this.userForm.invalid) {
      // Mark all invalid fields to show errors
      markFormDirty(this.userForm);
      return;
    }
    // Process valid form...
  }
}
```

```typescript
// Using with form arrays
export class DynamicFormComponent {
  form = this.fb.group({
    items: this.fb.array([
      this.fb.group({
        name: ["", Validators.required],
        quantity: [0, Validators.min(1)],
      }),
    ]),
  });

  validateAll() {
    markFormDirty(this.form);
    // All invalid controls in the array will be marked
  }
}
```

#### See

- FormGroup Angular reactive form group
- FormArray Angular reactive form array
- [validatedFormData](#validatedformdata) Function that uses this utility for validation

---

### replaceNulls()

```ts
function replaceNulls<T>(obj): { [K in string | number | symbol]?: T[K] };
```

Defined in: [libs/ngx-utils/src/lib/form/form.utils.ts:166](https://github.com/hichchidev/hichchi/blob/7a34875f41fbc37ae8354ec8276cde73a8661476/libs/ngx-utils/src/lib/form/form.utils.ts#L166)

Removes null values from an object by deleting properties with null values

This utility function creates a new object with all null properties removed.
It's particularly useful when working with form data where null values should
be omitted from API requests or when preparing data for processing that doesn't
handle null values well.

The function performs a shallow copy of the object and removes any properties
that have null values. Properties with undefined values are preserved, as they
represent different semantic meaning (missing vs explicitly null).

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`T`

</td>
<td>

The type of the object being processed

</td>
</tr>
</tbody>
</table>

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

`obj`

</td>
<td>

{ \[K in string | number | symbol]?: T\[K] | null }

</td>
<td>

Object that may contain null values to be removed

</td>
</tr>
</tbody>
</table>

#### Returns

{ \[K in string | number | symbol]?: T\[K] }

A new object with null properties removed

#### Examples

```typescript
// Remove null values from form data
const formData = {
  name: "John Doe",
  email: "john@example.com",
  phone: null,
  address: null,
  age: 30,
};

const cleanData = replaceNulls(formData);
// Result: { name: 'John Doe', email: 'john@example.com', age: 30 }
```

```typescript
// Using with API request data
interface UserUpdate {
  name?: string | null;
  email?: string | null;
  phone?: string | null;
}

const updateData: UserUpdate = {
  name: "Jane Smith",
  email: null, // Don't update email
  phone: "555-1234",
};

const apiPayload = replaceNulls(updateData);
// Result: { name: 'Jane Smith', phone: '555-1234' }
// API receives only the fields to update
```

```typescript
// Difference between null and undefined
const data = {
  field1: "value",
  field2: null, // Will be removed
  field3: undefined, // Will be preserved
};

const result = replaceNulls(data);
// Result: { field1: 'value', field3: undefined }
```

#### See

[validatedFormData](#validatedformdata) Function that uses this utility to clean form data

---

### saveAsFile()

```ts
function saveAsFile(blob, filename): void;
```

Defined in: [libs/ngx-utils/src/lib/utils/file.utils.ts:36](https://github.com/hichchidev/hichchi/blob/7a34875f41fbc37ae8354ec8276cde73a8661476/libs/ngx-utils/src/lib/utils/file.utils.ts#L36)

Save a Blob as a file by triggering a download in the browser.
This function creates a temporary download link and triggers a click event to download the file.

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

`blob`

</td>
<td>

`Blob`

</td>
<td>

Blob to save.

</td>
</tr>
<tr>
<td>

`filename`

</td>
<td>

`string`

</td>
<td>

File name with extension.

</td>
</tr>
</tbody>
</table>

#### Returns

`void`

#### Throws

Throws an error if used in a Node.js environment.

#### Examples

```TypeScript
// Save a text file
const textBlob = new Blob(['Hello, World!'], { type: 'text/plain' });
saveAsFile(textBlob, 'hello.txt');
```

```TypeScript
// Save a JSON file
const data = { name: 'John', age: 30 };
const jsonBlob = new Blob([JSON.stringify(data)], { type: 'application/json' });
saveAsFile(jsonBlob, 'user.json');
```

```TypeScript
// Save a file from an API response
fetch('https://example.com/api/document')
  .then(response => response.blob())
  .then(blob => {
    saveAsFile(blob, 'document.pdf');
  });
```

---

### skipNotify()

```ts
function skipNotify(value?): HttpContext;
```

Defined in: [libs/ngx-utils/src/lib/utils/http.utils.ts:9](https://github.com/hichchidev/hichchi/blob/7a34875f41fbc37ae8354ec8276cde73a8661476/libs/ngx-utils/src/lib/utils/http.utils.ts#L9)

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`value`

</td>
<td>

`boolean`

</td>
<td>

`false`

</td>
</tr>
</tbody>
</table>

#### Returns

`HttpContext`

---

### skipNotifyContext()

```ts
function skipNotifyContext(value?): object;
```

Defined in: [libs/ngx-utils/src/lib/utils/http.utils.ts:13](https://github.com/hichchidev/hichchi/blob/7a34875f41fbc37ae8354ec8276cde73a8661476/libs/ngx-utils/src/lib/utils/http.utils.ts#L13)

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`value`

</td>
<td>

`boolean`

</td>
<td>

`false`

</td>
</tr>
</tbody>
</table>

#### Returns

`object`

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`context`

</td>
<td>

`HttpContext`

</td>
<td>

[libs/ngx-utils/src/lib/utils/http.utils.ts:13](https://github.com/hichchidev/hichchi/blob/7a34875f41fbc37ae8354ec8276cde73a8661476/libs/ngx-utils/src/lib/utils/http.utils.ts#L13)

</td>
</tr>
</tbody>
</table>

---

### validatedFormData()

```ts
function validatedFormData<T>(
  form,
): { [K in string | number | symbol]: T[K] } | null;
```

Defined in: [libs/ngx-utils/src/lib/form/form.utils.ts:278](https://github.com/hichchidev/hichchi/blob/7a34875f41fbc37ae8354ec8276cde73a8661476/libs/ngx-utils/src/lib/form/form.utils.ts#L278)

Validates a form and returns clean data if valid, or null if invalid

This utility function combines form validation with data cleaning in a single operation.
It first marks all invalid controls as dirty (to show validation errors), then checks
if the form is valid. If valid, it returns the form data with null values removed.
If invalid, it returns null.

This is particularly useful for form submission handlers where you want to:

1. Show all validation errors if the form is invalid
2. Get clean, validated data if the form is valid
3. Handle both cases with a simple null check

The function uses the DataFormGroup type to ensure type safety between the form
structure and the returned data type.

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`T`

</td>
<td>

The type of the data structure represented by the form

</td>
</tr>
</tbody>
</table>

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

`form`

</td>
<td>

[`DataFormGroup`](#dataformgroup)<`T`>

</td>
<td>

The DataFormGroup to validate and extract data from

</td>
</tr>
</tbody>
</table>

#### Returns

{ \[K in string | number | symbol]: T\[K] } | `null`

The validated and cleaned form data, or null if the form is invalid

#### Examples

```typescript
// Basic form validation and submission
export class UserFormComponent {
  userForm: DataFormGroup<UserData> = this.fb.group({
    name: ["", Validators.required],
    email: ["", [Validators.required, Validators.email]],
    phone: [null], // Optional field
    age: [null, Validators.min(18)],
  });

  onSubmit() {
    const validData = validatedFormData(this.userForm);
    if (validData) {
      // Form is valid, submit clean data
      this.userService.createUser(validData);
    } else {
      // Form is invalid, errors are now visible
      console.log("Please fix form errors");
    }
  }
}
```

```typescript
// Using with async operations
export class ProfileComponent {
  profileForm: DataFormGroup<ProfileUpdate> = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    bio: [null], // Optional
    website: [null, Validators.pattern(/^https?://.+/)]
  });

  async updateProfile() {
    const updateData = validatedFormData(this.profileForm);
    if (!updateData) {
      this.showErrorMessage('Please fix the form errors');
      return;
    }

    try {
      await this.profileService.update(updateData);
      this.showSuccessMessage('Profile updated successfully');
    } catch (error) {
      this.showErrorMessage('Failed to update profile');
    }
  }
}
```

```typescript
// Type-safe form data extraction
interface ContactForm {
  name: string;
  email: string;
  message: string;
  newsletter?: boolean;
}

const contactForm: DataFormGroup<ContactForm> = this.fb.group({
  name: ["", Validators.required],
  email: ["", [Validators.required, Validators.email]],
  message: ["", [Validators.required, Validators.minLength(10)]],
  newsletter: [null],
});

const formData = validatedFormData(contactForm);
if (formData) {
  // TypeScript knows formData is ContactForm with null values removed
  console.log(formData.name); // string
  console.log(formData.email); // string
  console.log(formData.newsletter); // boolean | undefined (null was removed)
}
```

#### See

- [DataFormGroup](#dataformgroup) Type-safe form group interface
- [markFormDirty](#markformdirty) Function used internally to mark invalid controls
- [replaceNulls](#replacenulls) Function used internally to clean the data

## Interfaces

### DataFormGroup

Defined in: [libs/ngx-utils/src/lib/form/form.interfaces.ts:254](https://github.com/hichchidev/hichchi/blob/7a34875f41fbc37ae8354ec8276cde73a8661476/libs/ngx-utils/src/lib/form/form.interfaces.ts#L254)

Interface for a type-safe Angular reactive form group

This interface extends Angular's UntypedFormGroup to provide strong typing for both
form controls and form values. It ensures that the form structure matches the data
type it represents, providing compile-time type safety and better developer experience.

The interface bridges the gap between Angular's form system and TypeScript's type
system, allowing developers to work with forms in a type-safe manner while maintaining
compatibility with Angular's reactive forms API.

Key benefits:

- Type-safe access to form controls
- Type-safe access to form values
- IntelliSense support for form properties
- Compile-time error detection for form structure mismatches
- Seamless integration with form utility functions

#### Examples

```typescript
// Define the data structure
interface ContactForm {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  message: string;
}

// Create a type-safe form
export class ContactComponent {
  contactForm: DataFormGroup<ContactForm> = this.fb.group({
    firstName: ["", Validators.required],
    lastName: ["", Validators.required],
    email: ["", [Validators.required, Validators.email]],
    phone: [null],
    message: ["", [Validators.required, Validators.minLength(10)]],
  });

  onSubmit() {
    // Type-safe form validation and data extraction
    const formData = validatedFormData(this.contactForm);
    if (formData) {
      // formData is properly typed as ContactForm
      this.contactService.sendMessage(formData);
    }
  }
}
```

```typescript
// Advanced usage with nested forms
interface UserProfile {
  personal: {
    firstName: string;
    lastName: string;
    birthDate: Date;
  };
  contact: {
    email: string;
    phone: string;
  };
  preferences: {
    newsletter: boolean;
    notifications: boolean;
  };
}

export class ProfileComponent {
  profileForm: DataFormGroup<UserProfile> = this.fb.group({
    personal: this.fb.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      birthDate: [null, Validators.required],
    }),
    contact: this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      phone: ["", Validators.required],
    }),
    preferences: this.fb.group({
      newsletter: [false],
      notifications: [true],
    }),
  });

  // Type-safe access to nested controls
  get emailControl() {
    return this.profileForm.controls.contact.controls.email;
  }
}
```

```typescript
// Using with dynamic forms
interface DynamicField {
  id: string;
  label: string;
  value: string;
  required: boolean;
}

export class DynamicFormComponent {
  dynamicForm: DataFormGroup<Record<string, string>> = this.fb.group({});

  addField(field: DynamicField) {
    const validators = field.required ? [Validators.required] : [];
    this.dynamicForm.addControl(
      field.id,
      new FormControl(field.value, validators),
    );
  }

  getFormData() {
    return validatedFormData(this.dynamicForm);
  }
}
```

#### See

- [DataFormValues](#dataformvalues) Type for form values structure
- [DataFormControls](#dataformcontrols) Type for form controls structure
- UntypedFormGroup Angular's base form group class
- [validatedFormData](#validatedformdata) Function for extracting validated form data
- [markFormDirty](#markformdirty) Function for marking form controls as dirty

#### Extends

- `UntypedFormGroup`

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`T`

</td>
<td>

The data type that the form represents

</td>
</tr>
</tbody>
</table>

#### Accessors

##### asyncValidator

###### Get Signature

```ts
get asyncValidator(): AsyncValidatorFn | null;
```

Defined in: node_modules/@angular/forms/types/forms.d.ts:2571

Returns the function that is used to determine the validity of this control asynchronously.
If multiple validators have been added, this will be a single composed function.
See `Validators.compose()` for additional information.

###### Returns

`AsyncValidatorFn` | `null`

###### Set Signature

```ts
set asyncValidator(asyncValidatorFn): void;
```

Defined in: node_modules/@angular/forms/types/forms.d.ts:2572

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

`asyncValidatorFn`

</td>
<td>

`AsyncValidatorFn` | `null`

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### Inherited from

```ts
UntypedFormGroup.asyncValidator;
```

##### dirty

###### Get Signature

```ts
get dirty(): boolean;
```

Defined in: node_modules/@angular/forms/types/forms.d.ts:2659

A control is `dirty` if the user has changed the value
in the UI.

###### Returns

`boolean`

True if the user has changed the value of this control in the UI; compare `pristine`.
Programmatic changes to a control's value do not mark it dirty.

###### Inherited from

```ts
UntypedFormGroup.dirty;
```

##### disabled

###### Get Signature

```ts
get disabled(): boolean;
```

Defined in: node_modules/@angular/forms/types/forms.d.ts:2626

A control is `disabled` when its `status` is `DISABLED`.

Disabled controls are exempt from validation checks and
are not included in the aggregate value of their ancestor
controls.

###### See

AbstractControl.status

###### Returns

`boolean`

True if the control is disabled, false otherwise.

###### Inherited from

```ts
UntypedFormGroup.disabled;
```

##### enabled

###### Get Signature

```ts
get enabled(): boolean;
```

Defined in: node_modules/@angular/forms/types/forms.d.ts:2636

A control is `enabled` as long as its `status` is not `DISABLED`.

###### See

AbstractControl.status

###### Returns

`boolean`

True if the control has any status other than 'DISABLED',
false if the status is 'DISABLED'.

###### Inherited from

```ts
UntypedFormGroup.enabled;
```

##### invalid

###### Get Signature

```ts
get invalid(): boolean;
```

Defined in: node_modules/@angular/forms/types/forms.d.ts:2605

A control is `invalid` when its `status` is `INVALID`.

###### See

AbstractControl.status

###### Returns

`boolean`

True if this control has failed one or more of its validation checks,
false otherwise.

###### Inherited from

```ts
UntypedFormGroup.invalid;
```

##### parent

###### Get Signature

```ts
get parent(): FormGroup<any> | FormArray<any> | null;
```

Defined in: node_modules/@angular/forms/types/forms.d.ts:2576

The parent control.

###### Returns

`FormGroup`<`any`> | `FormArray`<`any`> | `null`

###### Inherited from

```ts
UntypedFormGroup.parent;
```

##### pending

###### Get Signature

```ts
get pending(): boolean;
```

Defined in: node_modules/@angular/forms/types/forms.d.ts:2614

A control is `pending` when its `status` is `PENDING`.

###### See

AbstractControl.status

###### Returns

`boolean`

True if this control is in the process of conducting a validation check,
false otherwise.

###### Inherited from

```ts
UntypedFormGroup.pending;
```

##### pristine

###### Get Signature

```ts
get pristine(): boolean;
```

Defined in: node_modules/@angular/forms/types/forms.d.ts:2649

A control is `pristine` if the user has not yet changed
the value in the UI.

###### Returns

`boolean`

True if the user has not yet changed the value in the UI; compare `dirty`.
Programmatic changes to a control's value do not mark it dirty.

###### Set Signature

```ts
set pristine(value): void;
```

Defined in: node_modules/@angular/forms/types/forms.d.ts:2650

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

`value`

</td>
<td>

`boolean`

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### Inherited from

```ts
UntypedFormGroup.pristine;
```

##### root

###### Get Signature

```ts
get root(): AbstractControl;
```

Defined in: node_modules/@angular/forms/types/forms.d.ts:3201

Retrieves the top-level ancestor of this control.

###### Returns

`AbstractControl`

###### Inherited from

```ts
UntypedFormGroup.root;
```

##### status

###### Get Signature

```ts
get status(): FormControlStatus;
```

Defined in: node_modules/@angular/forms/types/forms.d.ts:2585

The validation status of the control.

###### See

FormControlStatus

These status values are mutually exclusive, so a control cannot be
both valid AND invalid or invalid AND disabled.

###### Returns

`FormControlStatus`

###### Set Signature

```ts
set status(value): void;
```

Defined in: node_modules/@angular/forms/types/forms.d.ts:2586

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

`value`

</td>
<td>

`FormControlStatus`

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### Inherited from

```ts
UntypedFormGroup.status;
```

##### touched

###### Get Signature

```ts
get touched(): boolean;
```

Defined in: node_modules/@angular/forms/types/forms.d.ts:2666

True if the control is marked as `touched`.

A control is marked `touched` once the user has triggered
a `blur` event on it.

###### Returns

`boolean`

###### Set Signature

```ts
set touched(value): void;
```

Defined in: node_modules/@angular/forms/types/forms.d.ts:2667

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

`value`

</td>
<td>

`boolean`

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### Inherited from

```ts
UntypedFormGroup.touched;
```

##### untouched

###### Get Signature

```ts
get untouched(): boolean;
```

Defined in: node_modules/@angular/forms/types/forms.d.ts:2675

True if the control has not been marked as touched

A control is `untouched` if the user has not yet triggered
a `blur` event on it.

###### Returns

`boolean`

###### Inherited from

```ts
UntypedFormGroup.untouched;
```

##### updateOn

###### Get Signature

```ts
get updateOn(): FormHooks;
```

Defined in: node_modules/@angular/forms/types/forms.d.ts:2716

Reports the update strategy of the `AbstractControl` (meaning
the event on which the control updates itself).
Possible values: `'change'` | `'blur'` | `'submit'`
Default value: `'change'`

###### Returns

`FormHooks`

###### Inherited from

```ts
UntypedFormGroup.updateOn;
```

##### valid

###### Get Signature

```ts
get valid(): boolean;
```

Defined in: node_modules/@angular/forms/types/forms.d.ts:2596

A control is `valid` when its `status` is `VALID`.

###### See

AbstractControl.status

###### Returns

`boolean`

True if the control has passed all of its validation tests,
false otherwise.

###### Inherited from

```ts
UntypedFormGroup.valid;
```

##### validator

###### Get Signature

```ts
get validator(): ValidatorFn | null;
```

Defined in: node_modules/@angular/forms/types/forms.d.ts:2564

Returns the function that is used to determine the validity of this control synchronously.
If multiple validators have been added, this will be a single composed function.
See `Validators.compose()` for additional information.

###### Returns

`ValidatorFn` | `null`

###### Set Signature

```ts
set validator(validatorFn): void;
```

Defined in: node_modules/@angular/forms/types/forms.d.ts:2565

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

`validatorFn`

</td>
<td>

`ValidatorFn` | `null`

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### Inherited from

```ts
UntypedFormGroup.validator;
```

#### Methods

##### addAsyncValidators()

```ts
addAsyncValidators(validators): void;
```

Defined in: node_modules/@angular/forms/types/forms.d.ts:2763

Add an asynchronous validator or validators to this control, without affecting other
validators.

When you add or remove a validator at run time, you must call
`updateValueAndValidity()` for the new validation to take effect.

Adding a validator that already exists will have no effect.

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

`validators`

</td>
<td>

`AsyncValidatorFn` | `AsyncValidatorFn`\[]

</td>
<td>

The new asynchronous validator function or functions to add to this control.

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### Inherited from

```ts
UntypedFormGroup.addAsyncValidators;
```

##### addControl()

###### Call Signature

```ts
addControl(
   this,
   name,
   control,
   options?): void;
```

Defined in: node_modules/@angular/forms/types/forms.d.ts:1940

Add a control to this group. In a strongly-typed group, the control must be in the group's type
(possibly as an optional key).

If a control with a given name already exists, it would _not_ be replaced with a new one.
If you want to replace an existing control, use the FormGroup#setControl setControl
method instead. This method also updates the value and validity of the control.

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

`this`

</td>
<td>

`FormGroup`<{ \[`key`: `string`]: `AbstractControl`<`any`, `any`, `any`>; }>

</td>
<td>

‐

</td>
</tr>
<tr>
<td>

`name`

</td>
<td>

`string`

</td>
<td>

The control name to add to the collection

</td>
</tr>
<tr>
<td>

`control`

</td>
<td>

`AbstractControl`

</td>
<td>

Provides the control for the given name

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

{ `emitEvent?`: `boolean`; }

</td>
<td>

Specifies whether this FormGroup instance should emit events after a new
control is added.

- `emitEvent`: When true or not supplied (the default), both the `statusChanges` and
  `valueChanges` observables emit events with the latest status and value when the control is
  added. When false, no events are emitted.

</td>
</tr>
<tr>
<td>

`options.emitEvent?`

</td>
<td>

`boolean`

</td>
<td>

‐

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### Inherited from

```ts
UntypedFormGroup.addControl;
```

###### Call Signature

```ts
addControl<K>(
   name,
   control,
   options?): void;
```

Defined in: node_modules/@angular/forms/types/forms.d.ts:1945

Add a control to this group. In a strongly-typed group, the control must be in the group's type
(possibly as an optional key).

If a control with a given name already exists, it would _not_ be replaced with a new one.
If you want to replace an existing control, use the FormGroup#setControl setControl
method instead. This method also updates the value and validity of the control.

###### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`K` _extends_ `string`

</td>
</tr>
</tbody>
</table>

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

`name`

</td>
<td>

`K`

</td>
<td>

The control name to add to the collection

</td>
</tr>
<tr>
<td>

`control`

</td>
<td>

`any`

</td>
<td>

Provides the control for the given name

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

{ `emitEvent?`: `boolean`; }

</td>
<td>

Specifies whether this FormGroup instance should emit events after a new
control is added.

- `emitEvent`: When true or not supplied (the default), both the `statusChanges` and
  `valueChanges` observables emit events with the latest status and value when the control is
  added. When false, no events are emitted.

</td>
</tr>
<tr>
<td>

`options.emitEvent?`

</td>
<td>

`boolean`

</td>
<td>

‐

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### Inherited from

```ts
UntypedFormGroup.addControl;
```

##### addValidators()

```ts
addValidators(validators): void;
```

Defined in: node_modules/@angular/forms/types/forms.d.ts:2751

Add a synchronous validator or validators to this control, without affecting other validators.

When you add or remove a validator at run time, you must call
`updateValueAndValidity()` for the new validation to take effect.

Adding a validator that already exists will have no effect. If duplicate validator functions
are present in the `validators` array, only the first instance would be added to a form
control.

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

`validators`

</td>
<td>

`ValidatorFn` | `ValidatorFn`\[]

</td>
<td>

The new validator function or functions to add to this control.

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### Inherited from

```ts
UntypedFormGroup.addValidators;
```

##### clearAsyncValidators()

```ts
clearAsyncValidators(): void;
```

Defined in: node_modules/@angular/forms/types/forms.d.ts:2850

Empties out the async validator list.

When you add or remove a validator at run time, you must call
`updateValueAndValidity()` for the new validation to take effect.

###### Returns

`void`

###### Inherited from

```ts
UntypedFormGroup.clearAsyncValidators;
```

##### clearValidators()

```ts
clearValidators(): void;
```

Defined in: node_modules/@angular/forms/types/forms.d.ts:2842

Empties out the synchronous validator list.

When you add or remove a validator at run time, you must call
`updateValueAndValidity()` for the new validation to take effect.

###### Returns

`void`

###### Inherited from

```ts
UntypedFormGroup.clearValidators;
```

##### contains()

###### Call Signature

```ts
contains<K>(controlName): boolean;
```

Defined in: node_modules/@angular/forms/types/forms.d.ts:1988

Check whether there is an enabled control with the given name in the group.

Reports false for disabled controls. If you'd like to check for existence in the group
only, use AbstractControl#get get instead.

###### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`K` _extends_ `string`

</td>
</tr>
</tbody>
</table>

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

`controlName`

</td>
<td>

`K`

</td>
<td>

The control name to check for existence in the collection

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean`

false for disabled controls, true otherwise.

###### Inherited from

```ts
UntypedFormGroup.contains;
```

###### Call Signature

```ts
contains(this, controlName): boolean;
```

Defined in: node_modules/@angular/forms/types/forms.d.ts:1989

Check whether there is an enabled control with the given name in the group.

Reports false for disabled controls. If you'd like to check for existence in the group
only, use AbstractControl#get get instead.

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

`this`

</td>
<td>

`FormGroup`<{ \[`key`: `string`]: `AbstractControl`<`any`, `any`, `any`>; }>

</td>
<td>

‐

</td>
</tr>
<tr>
<td>

`controlName`

</td>
<td>

`string`

</td>
<td>

The control name to check for existence in the collection

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean`

false for disabled controls, true otherwise.

###### Inherited from

```ts
UntypedFormGroup.contains;
```

##### disable()

```ts
disable(opts?): void;
```

Defined in: node_modules/@angular/forms/types/forms.d.ts:3018

Disables the control. This means the control is exempt from validation checks and
excluded from the aggregate value of any parent. Its status is `DISABLED`.

If the control has children, all children are also disabled.

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

`opts?`

</td>
<td>

{ `emitEvent?`: `boolean`; `onlySelf?`: `boolean`; }

</td>
<td>

Configuration options that determine how the control propagates
changes and emits events after the control is disabled.

- `onlySelf`: When true, mark only this control. When false or not supplied,
  marks all direct ancestors. Default is false.
- `emitEvent`: When true or not supplied (the default), the `statusChanges`,
  `valueChanges` and `events`
  observables emit events with the latest status and value when the control is disabled.
  When false, no events are emitted.

</td>
</tr>
<tr>
<td>

`opts.emitEvent?`

</td>
<td>

`boolean`

</td>
<td>

‐

</td>
</tr>
<tr>
<td>

`opts.onlySelf?`

</td>
<td>

`boolean`

</td>
<td>

‐

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### See

AbstractControl.status

###### Inherited from

```ts
UntypedFormGroup.disable;
```

##### enable()

```ts
enable(opts?): void;
```

Defined in: node_modules/@angular/forms/types/forms.d.ts:3040

Enables the control. This means the control is included in validation checks and
the aggregate value of its parent. Its status recalculates based on its value and
its validators.

By default, if the control has children, all children are enabled.

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

`opts?`

</td>
<td>

{ `emitEvent?`: `boolean`; `onlySelf?`: `boolean`; }

</td>
<td>

Configure options that control how the control propagates changes and
emits events when marked as untouched

- `onlySelf`: When true, mark only this control. When false or not supplied,
  marks all direct ancestors. Default is false.
- `emitEvent`: When true or not supplied (the default), the `statusChanges`,
  `valueChanges` and `events`
  observables emit events with the latest status and value when the control is enabled.
  When false, no events are emitted.

</td>
</tr>
<tr>
<td>

`opts.emitEvent?`

</td>
<td>

`boolean`

</td>
<td>

‐

</td>
</tr>
<tr>
<td>

`opts.onlySelf?`

</td>
<td>

`boolean`

</td>
<td>

‐

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### See

AbstractControl.status

###### Inherited from

```ts
UntypedFormGroup.enable;
```

##### get()

###### Call Signature

```ts
get<P>(path):
  | AbstractControl<ɵGetProperty<any, P>, ɵGetProperty<any, P>, any>
  | null;
```

Defined in: node_modules/@angular/forms/types/forms.d.ts:3131

Retrieves a child control given the control's name or path.

This signature for get supports strings and `const` arrays (`.get(['foo', 'bar'] as const)`).

###### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`P` _extends_ `string` | readonly (`string` | `number`)\[]

</td>
</tr>
</tbody>
</table>

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

`path`

</td>
<td>

`P`

</td>
</tr>
</tbody>
</table>

###### Returns

| `AbstractControl`<`ɵGetProperty`<`any`, `P`>, `ɵGetProperty`<`any`, `P`>, `any`>
| `null`

###### Inherited from

```ts
UntypedFormGroup.get;
```

###### Call Signature

```ts
get<P>(path):
  | AbstractControl<ɵGetProperty<any, P>, ɵGetProperty<any, P>, any>
  | null;
```

Defined in: node_modules/@angular/forms/types/forms.d.ts:3138

Retrieves a child control given the control's name or path.

This signature for `get` supports non-const (mutable) arrays. Inferred type
information will not be as robust, so prefer to pass a `readonly` array if possible.

###### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`P` _extends_ `string` | (`string` | `number`)\[]

</td>
</tr>
</tbody>
</table>

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

`path`

</td>
<td>

`P`

</td>
</tr>
</tbody>
</table>

###### Returns

| `AbstractControl`<`ɵGetProperty`<`any`, `P`>, `ɵGetProperty`<`any`, `P`>, `any`>
| `null`

###### Inherited from

```ts
UntypedFormGroup.get;
```

##### getError()

```ts
getError(errorCode, path?): any;
```

Defined in: node_modules/@angular/forms/types/forms.d.ts:3166

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

`errorCode`

</td>
<td>

`string`

</td>
<td>

The code of the error to check

</td>
</tr>
<tr>
<td>

`path?`

</td>
<td>

`string` | (`string` | `number`)\[]

</td>
<td>

A list of control names that designates how to move from the current control
to the control that should be queried for errors.

</td>
</tr>
</tbody>
</table>

###### Returns

`any`

error data for that particular error. If the control or error is not present,
null is returned.

###### Description

Reports error data for the control with the given path.

###### Usage Notes

For example, for the following `FormGroup`:

```ts
form = new FormGroup({
  address: new FormGroup({ street: new FormControl() }),
});
```

The path to the 'street' control from the root form would be 'address' -> 'street'.

It can be provided to this method in one of two formats:

1. An array of string control names, e.g. `['address', 'street']`
2. A period-delimited list of control names in one string, e.g. `'address.street'`

###### Inherited from

```ts
UntypedFormGroup.getError;
```

##### getRawValue()

```ts
getRawValue(): any;
```

Defined in: node_modules/@angular/forms/types/forms.d.ts:2133

The aggregate value of the `FormGroup`, including any disabled controls.

Retrieves all values regardless of disabled status.

###### Returns

`any`

###### Inherited from

```ts
UntypedFormGroup.getRawValue;
```

##### hasAsyncValidator()

```ts
hasAsyncValidator(validator): boolean;
```

Defined in: node_modules/@angular/forms/types/forms.d.ts:2834

Check whether an asynchronous validator function is present on this control. The provided
validator must be a reference to the exact same function that was provided.

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

`validator`

</td>
<td>

`AsyncValidatorFn`

</td>
<td>

The asynchronous validator to check for presence. Compared by function
reference.

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean`

Whether the provided asynchronous validator was found on this control.

###### Inherited from

```ts
UntypedFormGroup.hasAsyncValidator;
```

##### hasError()

```ts
hasError(errorCode, path?): boolean;
```

Defined in: node_modules/@angular/forms/types/forms.d.ts:3197

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

`errorCode`

</td>
<td>

`string`

</td>
<td>

The code of the error to check

</td>
</tr>
<tr>
<td>

`path?`

</td>
<td>

`string` | (`string` | `number`)\[]

</td>
<td>

A list of control names that designates how to move from the current control
to the control that should be queried for errors.

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean`

whether the given error is present in the control at the given path.

If the control is not present, false is returned.

###### Description

Reports whether the control with the given path has the error specified.

###### Usage Notes

For example, for the following `FormGroup`:

```ts
form = new FormGroup({
  address: new FormGroup({ street: new FormControl() }),
});
```

The path to the 'street' control from the root form would be 'address' -> 'street'.

It can be provided to this method in one of two formats:

1. An array of string control names, e.g. `['address', 'street']`
2. A period-delimited list of control names in one string, e.g. `'address.street'`

If no path is given, this method checks for the error on the current control.

###### Inherited from

```ts
UntypedFormGroup.hasError;
```

##### hasValidator()

```ts
hasValidator(validator): boolean;
```

Defined in: node_modules/@angular/forms/types/forms.d.ts:2825

Check whether a synchronous validator function is present on this control. The provided
validator must be a reference to the exact same function that was provided.

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

`validator`

</td>
<td>

`ValidatorFn`

</td>
<td>

The validator to check for presence. Compared by function reference.

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean`

Whether the provided validator was found on this control.

###### Usage Notes

```ts
// Reference to the RequiredValidator
const ctrl = new FormControl<number | null>(0, Validators.required);
expect(ctrl.hasValidator(Validators.required)).toEqual(true);

// Reference to anonymous function inside MinValidator
const minValidator = Validators.min(3);
const ctrl = new FormControl<number | null>(0, minValidator);
expect(ctrl.hasValidator(minValidator)).toEqual(true);
expect(ctrl.hasValidator(Validators.min(3))).toEqual(false);
```

###### Inherited from

```ts
UntypedFormGroup.hasValidator;
```

##### markAllAsDirty()

```ts
markAllAsDirty(opts?): void;
```

Defined in: node_modules/@angular/forms/types/forms.d.ts:2887

Marks the control and all its descendant controls as `dirty`.

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

`opts?`

</td>
<td>

{ `emitEvent?`: `boolean`; }

</td>
<td>

Configuration options that determine how the control propagates changes
and emits events after marking is applied.

- `emitEvent`: When true or not supplied (the default), the `events`
  observable emits a `PristineChangeEvent` with the `pristine` property being `false`.
  When false, no events are emitted.

</td>
</tr>
<tr>
<td>

`opts.emitEvent?`

</td>
<td>

`boolean`

</td>
<td>

‐

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### See

- [()](#markasdirty)
- [Managing form control state](guide/forms/reactive-forms#managing-form-control-state)

###### Inherited from

```ts
UntypedFormGroup.markAllAsDirty;
```

##### markAllAsTouched()

```ts
markAllAsTouched(opts?): void;
```

Defined in: node_modules/@angular/forms/types/forms.d.ts:2903

Marks the control and all its descendant controls as `touched`.

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

`opts?`

</td>
<td>

{ `emitEvent?`: `boolean`; }

</td>
<td>

Configuration options that determine how the control propagates changes
and emits events after marking is applied.

- `emitEvent`: When true or not supplied (the default), the `events`
  observable emits a `TouchedChangeEvent` with the `touched` property being `true`.
  When false, no events are emitted.

</td>
</tr>
<tr>
<td>

`opts.emitEvent?`

</td>
<td>

`boolean`

</td>
<td>

‐

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### See

- [()](#markastouched)
- [Managing form control state](guide/forms/reactive-forms#managing-form-control-state)

###### Inherited from

```ts
UntypedFormGroup.markAllAsTouched;
```

##### markAsDirty()

```ts
markAsDirty(opts?): void;
```

Defined in: node_modules/@angular/forms/types/forms.d.ts:2950

Marks the control as `dirty`. A control becomes dirty when
the control's value is changed through the UI; compare `markAsTouched`.

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

`opts?`

</td>
<td>

{ `emitEvent?`: `boolean`; `onlySelf?`: `boolean`; }

</td>
<td>

Configuration options that determine how the control propagates changes
and emits events after marking is applied.

- `onlySelf`: When true, mark only this control. When false or not supplied,
  marks all direct ancestors. Default is false.
- `emitEvent`: When true or not supplied (the default), the `events`
  observable emits a `PristineChangeEvent` with the `pristine` property being `false`.
  When false, no events are emitted.

</td>
</tr>
<tr>
<td>

`opts.emitEvent?`

</td>
<td>

`boolean`

</td>
<td>

‐

</td>
</tr>
<tr>
<td>

`opts.onlySelf?`

</td>
<td>

`boolean`

</td>
<td>

‐

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### See

- [()](#markastouched)
- [()](#markasuntouched)
- [()](#markaspristine)
- [Managing form control state](guide/forms/reactive-forms#managing-form-control-state)

###### Inherited from

```ts
UntypedFormGroup.markAsDirty;
```

##### markAsPending()

```ts
markAsPending(opts?): void;
```

Defined in: node_modules/@angular/forms/types/forms.d.ts:2997

Marks the control as `pending`.

A control is pending while the control performs async validation.

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

`opts?`

</td>
<td>

{ `emitEvent?`: `boolean`; `onlySelf?`: `boolean`; }

</td>
<td>

Configuration options that determine how the control propagates changes and
emits events after marking is applied.

- `onlySelf`: When true, mark only this control. When false or not supplied,
  marks all direct ancestors. Default is false.
- `emitEvent`: When true or not supplied (the default), the `statusChanges`
  observable emits an event with the latest status the control is marked pending
  and the `events` observable emits a `StatusChangeEvent` with the `status` property being
  `PENDING` When false, no events are emitted.

</td>
</tr>
<tr>
<td>

`opts.emitEvent?`

</td>
<td>

`boolean`

</td>
<td>

‐

</td>
</tr>
<tr>
<td>

`opts.onlySelf?`

</td>
<td>

`boolean`

</td>
<td>

‐

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### See

AbstractControl.status

###### Inherited from

```ts
UntypedFormGroup.markAsPending;
```

##### markAsPristine()

```ts
markAsPristine(opts?): void;
```

Defined in: node_modules/@angular/forms/types/forms.d.ts:2976

Marks the control as `pristine`.

If the control has any children, marks all children as `pristine`,
and recalculates the `pristine` status of all parent
controls.

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

`opts?`

</td>
<td>

{ `emitEvent?`: `boolean`; `onlySelf?`: `boolean`; }

</td>
<td>

Configuration options that determine how the control emits events after
marking is applied.

- `onlySelf`: When true, mark only this control. When false or not supplied,
  marks all direct ancestors. Default is false.
- `emitEvent`: When true or not supplied (the default), the `events`
  observable emits a `PristineChangeEvent` with the `pristine` property being `true`.
  When false, no events are emitted.

</td>
</tr>
<tr>
<td>

`opts.emitEvent?`

</td>
<td>

`boolean`

</td>
<td>

‐

</td>
</tr>
<tr>
<td>

`opts.onlySelf?`

</td>
<td>

`boolean`

</td>
<td>

‐

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### See

- [()](#markastouched)
- [()](#markasuntouched)
- [()](#markasdirty)
- [Managing form control state](guide/forms/reactive-forms#managing-form-control-state)

###### Inherited from

```ts
UntypedFormGroup.markAsPristine;
```

##### markAsTouched()

```ts
markAsTouched(opts?): void;
```

Defined in: node_modules/@angular/forms/types/forms.d.ts:2870

Marks the control as `touched`. A control is touched by focus and
blur events that do not change the value.

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

`opts?`

</td>
<td>

{ `emitEvent?`: `boolean`; `onlySelf?`: `boolean`; }

</td>
<td>

Configuration options that determine how the control propagates changes
and emits events after marking is applied.

- `onlySelf`: When true, mark only this control. When false or not supplied,
  marks all direct ancestors. Default is false.
- `emitEvent`: When true or not supplied (the default), the `events`
  observable emits a `TouchedChangeEvent` with the `touched` property being `true`.
  When false, no events are emitted.

</td>
</tr>
<tr>
<td>

`opts.emitEvent?`

</td>
<td>

`boolean`

</td>
<td>

‐

</td>
</tr>
<tr>
<td>

`opts.onlySelf?`

</td>
<td>

`boolean`

</td>
<td>

‐

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### See

- [()](#markasuntouched)
- [()](#markasdirty)
- [()](#markaspristine)
- [Managing form control state](guide/forms/reactive-forms#managing-form-control-state)

###### Inherited from

```ts
UntypedFormGroup.markAsTouched;
```

##### markAsUntouched()

```ts
markAsUntouched(opts?): void;
```

Defined in: node_modules/@angular/forms/types/forms.d.ts:2927

Marks the control as `untouched`.

If the control has any children, also marks all children as `untouched`
and recalculates the `touched` status of all parent controls.

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

`opts?`

</td>
<td>

{ `emitEvent?`: `boolean`; `onlySelf?`: `boolean`; }

</td>
<td>

Configuration options that determine how the control propagates changes
and emits events after the marking is applied.

- `onlySelf`: When true, mark only this control. When false or not supplied,
  marks all direct ancestors. Default is false.
- `emitEvent`: When true or not supplied (the default), the `events`
  observable emits a `TouchedChangeEvent` with the `touched` property being `false`.
  When false, no events are emitted.

</td>
</tr>
<tr>
<td>

`opts.emitEvent?`

</td>
<td>

`boolean`

</td>
<td>

‐

</td>
</tr>
<tr>
<td>

`opts.onlySelf?`

</td>
<td>

`boolean`

</td>
<td>

‐

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### See

- [()](#markastouched)
- [()](#markasdirty)
- [()](#markaspristine)
- [Managing form control state](guide/forms/reactive-forms#managing-form-control-state)

###### Inherited from

```ts
UntypedFormGroup.markAsUntouched;
```

##### patchValue()

```ts
patchValue(value, options?): void;
```

Defined in: node_modules/@angular/forms/types/forms.d.ts:2062

Patches the value of the `FormGroup`. It accepts an object with control
names as keys, and does its best to match the values to the correct controls
in the group.

It accepts both super-sets and sub-sets of the group without throwing an error.

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

`value`

</td>
<td>

{ \[`key`: `string`]: `any`; }

</td>
<td>

The object that matches the structure of the group.

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

{ `emitEvent?`: `boolean`; `onlySelf?`: `boolean`; }

</td>
<td>

Configuration options that determine how the control propagates changes and
emits events after the value is patched.

- `onlySelf`: When true, each change only affects this control and not its parent. Default is
  true.
- `emitEvent`: When true or not supplied (the default), both the `statusChanges` and
  `valueChanges` observables emit events with the latest status and value when the control value
  is updated. When false, no events are emitted. The configuration options are passed to
  the AbstractControl#updateValueAndValidity updateValueAndValidity method.

</td>
</tr>
<tr>
<td>

`options.emitEvent?`

</td>
<td>

`boolean`

</td>
<td>

‐

</td>
</tr>
<tr>
<td>

`options.onlySelf?`

</td>
<td>

`boolean`

</td>
<td>

‐

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### Usage Notes

### Patch the value for a form group

```ts
const form = new FormGroup({
  first: new FormControl(),
  last: new FormControl(),
});
console.log(form.value); // {first: null, last: null}

form.patchValue({ first: "Nancy" });
console.log(form.value); // {first: 'Nancy', last: null}
```

###### Inherited from

```ts
UntypedFormGroup.patchValue;
```

##### registerControl()

###### Call Signature

```ts
registerControl<K>(name, control): any;
```

Defined in: node_modules/@angular/forms/types/forms.d.ts:1920

Registers a control with the group's list of controls. In a strongly-typed group, the control
must be in the group's type (possibly as an optional key).

This method does not update the value or validity of the control.
Use FormGroup#addControl addControl instead.

###### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`K` _extends_ `string`

</td>
</tr>
</tbody>
</table>

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

`name`

</td>
<td>

`K`

</td>
<td>

The control name to register in the collection

</td>
</tr>
<tr>
<td>

`control`

</td>
<td>

`any`

</td>
<td>

Provides the control for the given name

</td>
</tr>
</tbody>
</table>

###### Returns

`any`

###### Inherited from

```ts
UntypedFormGroup.registerControl;
```

###### Call Signature

```ts
registerControl(
   this,
   name,
control): AbstractControl<any>;
```

Defined in: node_modules/@angular/forms/types/forms.d.ts:1921

Registers a control with the group's list of controls. In a strongly-typed group, the control
must be in the group's type (possibly as an optional key).

This method does not update the value or validity of the control.
Use FormGroup#addControl addControl instead.

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

`this`

</td>
<td>

`FormGroup`<{ \[`key`: `string`]: `AbstractControl`<`any`, `any`, `any`>; }>

</td>
<td>

‐

</td>
</tr>
<tr>
<td>

`name`

</td>
<td>

`string`

</td>
<td>

The control name to register in the collection

</td>
</tr>
<tr>
<td>

`control`

</td>
<td>

`AbstractControl`<`any`>

</td>
<td>

Provides the control for the given name

</td>
</tr>
</tbody>
</table>

###### Returns

`AbstractControl`<`any`>

###### Inherited from

```ts
UntypedFormGroup.registerControl;
```

##### removeAsyncValidators()

```ts
removeAsyncValidators(validators): void;
```

Defined in: node_modules/@angular/forms/types/forms.d.ts:2803

Remove an asynchronous validator from this control, without affecting other validators.
Validators are compared by function reference; you must pass a reference to the exact same
validator function as the one that was originally set. If a provided validator is not found, it
is ignored.

When you add or remove a validator at run time, you must call
`updateValueAndValidity()` for the new validation to take effect.

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

`validators`

</td>
<td>

`AsyncValidatorFn` | `AsyncValidatorFn`\[]

</td>
<td>

The asynchronous validator or validators to remove.

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### Inherited from

```ts
UntypedFormGroup.removeAsyncValidators;
```

##### removeControl()

###### Call Signature

```ts
removeControl(
   this,
   name,
   options?): void;
```

Defined in: node_modules/@angular/forms/types/forms.d.ts:1948

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

`this`

</td>
<td>

`FormGroup`<{ \[`key`: `string`]: `AbstractControl`<`any`, `any`, `any`>; }>

</td>
</tr>
<tr>
<td>

`name`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

{ `emitEvent?`: `boolean`; }

</td>
</tr>
<tr>
<td>

`options.emitEvent?`

</td>
<td>

`boolean`

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### Inherited from

```ts
UntypedFormGroup.removeControl;
```

###### Call Signature

```ts
removeControl<S>(name, options?): void;
```

Defined in: node_modules/@angular/forms/types/forms.d.ts:1953

###### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`S` _extends_ `string`

</td>
</tr>
</tbody>
</table>

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

`name`

</td>
<td>

`S`

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

{ `emitEvent?`: `boolean`; }

</td>
</tr>
<tr>
<td>

`options.emitEvent?`

</td>
<td>

`boolean`

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### Inherited from

```ts
UntypedFormGroup.removeControl;
```

##### removeValidators()

```ts
removeValidators(validators): void;
```

Defined in: node_modules/@angular/forms/types/forms.d.ts:2791

Remove a synchronous validator from this control, without affecting other validators.
Validators are compared by function reference; you must pass a reference to the exact same
validator function as the one that was originally set. If a provided validator is not found,
it is ignored.

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

`validators`

</td>
<td>

`ValidatorFn` | `ValidatorFn`\[]

</td>
<td>

The validator or validators to remove.

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### Usage Notes

```ts
// Reference to the RequiredValidator
const ctrl = new FormControl<string | null>("", Validators.required);
ctrl.removeValidators(Validators.required);

// Reference to anonymous function inside MinValidator
const minValidator = Validators.min(3);
const ctrl = new FormControl<string | null>("", minValidator);
expect(ctrl.hasValidator(minValidator)).toEqual(true);
expect(ctrl.hasValidator(Validators.min(3))).toEqual(false);

ctrl.removeValidators(minValidator);
```

When you add or remove a validator at run time, you must call
`updateValueAndValidity()` for the new validation to take effect.

###### Inherited from

```ts
UntypedFormGroup.removeValidators;
```

##### reset()

```ts
reset(value?, options?): void;
```

Defined in: node_modules/@angular/forms/types/forms.d.ts:2123

Resets the `FormGroup`, marks all descendants `pristine` and `untouched` and sets
the value of all descendants to their default values, or null if no defaults were provided.

You reset to a specific form state by passing in a map of states
that matches the structure of your form, with control names as keys. The state
is a standalone value or a form state object with both a value and a disabled
status.

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

`value?`

</td>
<td>

`any`

</td>
<td>

Resets the control with an initial value,
or an object that defines the initial value and disabled state.

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

{ `emitEvent?`: `boolean`; `onlySelf?`: `boolean`; `overwriteDefaultValue?`: `boolean`; }

</td>
<td>

Configuration options that determine how the control propagates changes
and emits events when the group is reset.

- `onlySelf`: When true, each change only affects this control, and not its parent. Default is
  false.
- `emitEvent`: When true or not supplied (the default), both the `statusChanges` and
  `valueChanges`
  observables emit events with the latest status and value when the control is reset.
  When false, no events are emitted.
  The configuration options are passed to the AbstractControl#updateValueAndValidity updateValueAndValidity method.

</td>
</tr>
<tr>
<td>

`options.emitEvent?`

</td>
<td>

`boolean`

</td>
<td>

‐

</td>
</tr>
<tr>
<td>

`options.onlySelf?`

</td>
<td>

`boolean`

</td>
<td>

‐

</td>
</tr>
<tr>
<td>

`options.overwriteDefaultValue?`

</td>
<td>

`boolean`

</td>
<td>

‐

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### Usage Notes

### Reset the form group values

```ts
const form = new FormGroup({
  first: new FormControl("first name"),
  last: new FormControl("last name"),
});

console.log(form.value); // {first: 'first name', last: 'last name'}

form.reset({ first: "name", last: "last name" });

console.log(form.value); // {first: 'name', last: 'last name'}
```

### Reset the form group values and disabled status

```ts
const form = new FormGroup({
  first: new FormControl("first name"),
  last: new FormControl("last name"),
});

form.reset({
  first: { value: "name", disabled: true },
  last: "last",
});

console.log(form.value); // {last: 'last'}
console.log(form.get("first").status); // 'DISABLED'
```

###### Inherited from

```ts
UntypedFormGroup.reset;
```

##### setAsyncValidators()

```ts
setAsyncValidators(validators): void;
```

Defined in: node_modules/@angular/forms/types/forms.d.ts:2738

Sets the asynchronous validators that are active on this control. Calling this
overwrites any existing asynchronous validators.

When you add or remove a validator at run time, you must call
`updateValueAndValidity()` for the new validation to take effect.

If you want to add a new validator without affecting existing ones, consider
using `addAsyncValidators()` method instead.

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

`validators`

</td>
<td>

`AsyncValidatorFn` | `AsyncValidatorFn`\[] | `null`

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### Inherited from

```ts
UntypedFormGroup.setAsyncValidators;
```

##### setControl()

###### Call Signature

```ts
setControl<K>(
   name,
   control,
   options?): void;
```

Defined in: node_modules/@angular/forms/types/forms.d.ts:1970

Replace an existing control. In a strongly-typed group, the control must be in the group's type
(possibly as an optional key).

If a control with a given name does not exist in this `FormGroup`, it will be added.

###### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`K` _extends_ `string`

</td>
</tr>
</tbody>
</table>

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

`name`

</td>
<td>

`K`

</td>
<td>

The control name to replace in the collection

</td>
</tr>
<tr>
<td>

`control`

</td>
<td>

`any`

</td>
<td>

Provides the control for the given name

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

{ `emitEvent?`: `boolean`; }

</td>
<td>

Specifies whether this FormGroup instance should emit events after an
existing control is replaced.

- `emitEvent`: When true or not supplied (the default), both the `statusChanges` and
  `valueChanges` observables emit events with the latest status and value when the control is
  replaced with a new one. When false, no events are emitted.

</td>
</tr>
<tr>
<td>

`options.emitEvent?`

</td>
<td>

`boolean`

</td>
<td>

‐

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### Inherited from

```ts
UntypedFormGroup.setControl;
```

###### Call Signature

```ts
setControl(
   this,
   name,
   control,
   options?): void;
```

Defined in: node_modules/@angular/forms/types/forms.d.ts:1973

Replace an existing control. In a strongly-typed group, the control must be in the group's type
(possibly as an optional key).

If a control with a given name does not exist in this `FormGroup`, it will be added.

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

`this`

</td>
<td>

`FormGroup`<{ \[`key`: `string`]: `AbstractControl`<`any`, `any`, `any`>; }>

</td>
<td>

‐

</td>
</tr>
<tr>
<td>

`name`

</td>
<td>

`string`

</td>
<td>

The control name to replace in the collection

</td>
</tr>
<tr>
<td>

`control`

</td>
<td>

`AbstractControl`

</td>
<td>

Provides the control for the given name

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

{ `emitEvent?`: `boolean`; }

</td>
<td>

Specifies whether this FormGroup instance should emit events after an
existing control is replaced.

- `emitEvent`: When true or not supplied (the default), both the `statusChanges` and
  `valueChanges` observables emit events with the latest status and value when the control is
  replaced with a new one. When false, no events are emitted.

</td>
</tr>
<tr>
<td>

`options.emitEvent?`

</td>
<td>

`boolean`

</td>
<td>

‐

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### Inherited from

```ts
UntypedFormGroup.setControl;
```

##### setErrors()

```ts
setErrors(errors, opts?): void;
```

Defined in: node_modules/@angular/forms/types/forms.d.ts:3123

Sets errors on a form control when running validations manually, rather than automatically.

Calling `setErrors` also updates the validity of the parent control.

Note: Manually set errors are always overwritten by the results of the next validation run.

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

`errors`

</td>
<td>

`ValidationErrors` | `null`

</td>
<td>

‐

</td>
</tr>
<tr>
<td>

`opts?`

</td>
<td>

{ `emitEvent?`: `boolean`; }

</td>
<td>

Configuration options that determine how the control propagates
changes and emits events after the control errors are set.

- `emitEvent`: When true or not supplied (the default), the `statusChanges`
  observable emits an event after the errors are set.

</td>
</tr>
<tr>
<td>

`opts.emitEvent?`

</td>
<td>

`boolean`

</td>
<td>

‐

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### Usage Notes

### Manually set the errors for a control

```ts
const login = new FormControl("someLogin");
login.setErrors({
  notUnique: true,
});

expect(login.valid).toEqual(false);
expect(login.errors).toEqual({ notUnique: true });

login.setValue("someOtherLogin");

expect(login.valid).toEqual(true);
```

###### Inherited from

```ts
UntypedFormGroup.setErrors;
```

##### setParent()

```ts
setParent(parent): void;
```

Defined in: node_modules/@angular/forms/types/forms.d.ts:3050

Sets the parent of the control

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

`parent`

</td>
<td>

`FormGroup`<`any`> | `FormArray`<`any`> | `null`

</td>
<td>

The new parent.

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### Inherited from

```ts
UntypedFormGroup.setParent;
```

##### setValidators()

```ts
setValidators(validators): void;
```

Defined in: node_modules/@angular/forms/types/forms.d.ts:2727

Sets the synchronous validators that are active on this control. Calling
this overwrites any existing synchronous validators.

When you add or remove a validator at run time, you must call
`updateValueAndValidity()` for the new validation to take effect.

If you want to add a new validator without affecting existing ones, consider
using `addValidators()` method instead.

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

`validators`

</td>
<td>

`ValidatorFn` | `ValidatorFn`\[] | `null`

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### Inherited from

```ts
UntypedFormGroup.setValidators;
```

##### setValue()

```ts
setValue(value, options?): void;
```

Defined in: node_modules/@angular/forms/types/forms.d.ts:2027

Sets the value of the `FormGroup`. It accepts an object that matches
the structure of the group, with control names as keys.

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

`value`

</td>
<td>

{ \[`key`: `string`]: `any`; }

</td>
<td>

The new value for the control that matches the structure of the group.

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

{ `emitEvent?`: `boolean`; `onlySelf?`: `boolean`; }

</td>
<td>

Configuration options that determine how the control propagates changes
and emits events after the value changes.
The configuration options are passed to the AbstractControl#updateValueAndValidity updateValueAndValidity method.

- `onlySelf`: When true, each change only affects this control, and not its parent. Default is
  false.
- `emitEvent`: When true or not supplied (the default), both the `statusChanges` and
  `valueChanges`
  observables emit events with the latest status and value when the control value is updated.
  When false, no events are emitted.

</td>
</tr>
<tr>
<td>

`options.emitEvent?`

</td>
<td>

`boolean`

</td>
<td>

‐

</td>
</tr>
<tr>
<td>

`options.onlySelf?`

</td>
<td>

`boolean`

</td>
<td>

‐

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### Usage Notes

### Set the complete value for the form group

```ts
const form = new FormGroup({
  first: new FormControl(),
  last: new FormControl(),
});

console.log(form.value); // {first: null, last: null}

form.setValue({ first: "Nancy", last: "Drew" });
console.log(form.value); // {first: 'Nancy', last: 'Drew'}
```

###### Throws

When strict checks fail, such as setting the value of a control
that doesn't exist or if you exclude a value of a control that does exist.

###### Inherited from

```ts
UntypedFormGroup.setValue;
```

##### updateValueAndValidity()

```ts
updateValueAndValidity(opts?): void;
```

Defined in: node_modules/@angular/forms/types/forms.d.ts:3085

Recalculates the value and validation status of the control.

By default, it also updates the value and validity of its ancestors.

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

`opts?`

</td>
<td>

{ `emitEvent?`: `boolean`; `onlySelf?`: `boolean`; }

</td>
<td>

Configuration options determine how the control propagates changes and emits events
after updates and validity checks are applied.

- `onlySelf`: When true, only update this control. When false or not supplied,
  update all direct ancestors. Default is false.
- `emitEvent`: When true or not supplied (the default), the `statusChanges`,
  `valueChanges` and `events`
  observables emit events with the latest status and value when the control is updated.
  When false, no events are emitted.

</td>
</tr>
<tr>
<td>

`opts.emitEvent?`

</td>
<td>

`boolean`

</td>
<td>

‐

</td>
</tr>
<tr>
<td>

`opts.onlySelf?`

</td>
<td>

`boolean`

</td>
<td>

‐

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### See

[Understanding propagation control](guide/forms/reactive-forms#understanding-event-emission)

###### Inherited from

```ts
UntypedFormGroup.updateValueAndValidity;
```

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Modifier</th>
<th>Type</th>
<th>Description</th>
<th>Overrides</th>
<th>Inherited from</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="property-controls"></a> `controls`

</td>
<td>

`public`

</td>
<td>

[`DataFormControls`](#dataformcontrols)<`T`>

</td>
<td>

‐

</td>
<td>

```ts
UntypedFormGroup.controls;
```

</td>
<td>

‐

</td>
<td>

[libs/ngx-utils/src/lib/form/form.interfaces.ts:255](https://github.com/hichchidev/hichchi/blob/7a34875f41fbc37ae8354ec8276cde73a8661476/libs/ngx-utils/src/lib/form/form.interfaces.ts#L255)

</td>
</tr>
<tr>
<td>

<a id="property-errors"></a> `errors`

</td>
<td>

`readonly`

</td>
<td>

`ValidationErrors` | `null`

</td>
<td>

An object containing any errors generated by failing validation,
or null if there are no errors.

</td>
<td>

‐

</td>
<td>

```ts
UntypedFormGroup.errors;
```

</td>
<td>

node_modules/@angular/forms/types/forms.d.ts:2641

</td>
</tr>
<tr>
<td>

<a id="property-events"></a> `events`

</td>
<td>

`readonly`

</td>
<td>

`Observable`<`ControlEvent`<`any`>>

</td>
<td>

A multicasting observable that emits an event every time the state of the control changes.
It emits for value, status, pristine or touched changes.

**Note**: On value change, the emit happens right after a value of this control is updated. The
value of a parent control (for example if this FormControl is a part of a FormGroup) is updated
later, so accessing a value of a parent control (using the `value` property) from the callback
of this event might result in getting a value that has not been updated yet. Subscribe to the
`events` of the parent control instead.
For other event types, the events are emitted after the parent control has been updated.

**See**

[Unified control state change events](guide/forms/reactive-forms#unified-control-state-change-events)

</td>
<td>

‐

</td>
<td>

```ts
UntypedFormGroup.events;
```

</td>
<td>

node_modules/@angular/forms/types/forms.d.ts:2689

</td>
</tr>
<tr>
<td>

<a id="property-statuschanges"></a> `statusChanges`

</td>
<td>

`readonly`

</td>
<td>

`Observable`<`FormControlStatus`>

</td>
<td>

A multicasting observable that emits an event every time the validation `status` of the control
recalculates.

**See**

- FormControlStatus
- AbstractControl.status

</td>
<td>

‐

</td>
<td>

```ts
UntypedFormGroup.statusChanges;
```

</td>
<td>

node_modules/@angular/forms/types/forms.d.ts:2709

</td>
</tr>
<tr>
<td>

<a id="property-value"></a> `value`

</td>
<td>

`public`

</td>
<td>

[`DataFormValues`](#dataformvalues)<`T`>

</td>
<td>

The current value of the control.

- For a `FormControl`, the current value.
- For an enabled `FormGroup`, the values of enabled controls as an object
  with a key-value pair for each member of the group.
- For a disabled `FormGroup`, the values of all controls as an object
  with a key-value pair for each member of the group.
- For a `FormArray`, the values of enabled controls as an array.

</td>
<td>

```ts
UntypedFormGroup.value;
```

</td>
<td>

‐

</td>
<td>

[libs/ngx-utils/src/lib/form/form.interfaces.ts:256](https://github.com/hichchidev/hichchi/blob/7a34875f41fbc37ae8354ec8276cde73a8661476/libs/ngx-utils/src/lib/form/form.interfaces.ts#L256)

</td>
</tr>
<tr>
<td>

<a id="property-valuechanges"></a> `valueChanges`

</td>
<td>

`readonly`

</td>
<td>

`Observable`<`any`>

</td>
<td>

A multicasting observable that emits an event every time the value of the control changes, in
the UI or programmatically. It also emits an event each time you call enable() or disable()
without passing along {emitEvent: false} as a function argument.

**Note**: the emit happens right after a value of this control is updated. The value of a
parent control (for example if this FormControl is a part of a FormGroup) is updated later, so
accessing a value of a parent control (using the `value` property) from the callback of this
event might result in getting a value that has not been updated yet. Subscribe to the
`valueChanges` event of the parent control instead.

</td>
<td>

‐

</td>
<td>

```ts
UntypedFormGroup.valueChanges;
```

</td>
<td>

node_modules/@angular/forms/types/forms.d.ts:2701

</td>
</tr>
</tbody>
</table>

---

### HttpError

Defined in: [libs/ngx-utils/src/lib/interfaces/http-error.interface.ts:121](https://github.com/hichchidev/hichchi/blob/7a34875f41fbc37ae8354ec8276cde73a8661476/libs/ngx-utils/src/lib/interfaces/http-error.interface.ts#L121)

Interface representing an HTTP error with enhanced error information

This interface extends the standard JavaScript Error interface to include HTTP-specific
error details such as status codes and structured error responses. It provides a
standardized way to handle HTTP errors throughout Angular applications, making error
handling more consistent and informative.

The interface is particularly useful in HTTP interceptors, error handlers, and services
that need to process and respond to different types of HTTP errors with appropriate
user feedback and application behavior.

#### Examples

```typescript
// Using in an HTTP error handler
function handleHttpError(error: HttpError): void {
  console.error(`HTTP ${error.status}: ${error.message}`);

  if (error.status === 401) {
    // Handle authentication errors
    redirectToLogin();
  } else if (error.status >= 500) {
    // Handle server errors
    showServerErrorMessage();
  } else if (error.error) {
    // Handle structured API errors
    showApiErrorMessage(error.error.message);
  }
}
```

```typescript
// Using in an HTTP interceptor
export function errorInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const httpError: HttpError = {
        name: "HttpError",
        status: error.status,
        message: error.message,
        error: error.error as ErrorResponse,
      };

      return throwError(() => httpError);
    }),
  );
}
```

```typescript
// Using in a service with type-safe error handling
@Injectable()
export class DataService {
  constructor(private http: HttpClient) {}

  getData(): Observable<any> {
    return this.http.get("/api/data").pipe(
      catchError((error: HttpErrorResponse) => {
        const httpError: HttpError = {
          name: "HttpError",
          status: error.status,
          message: error.statusText || "Unknown error",
          error: error.error,
        };

        this.logError(httpError);
        return throwError(() => httpError);
      }),
    );
  }

  private logError(error: HttpError): void {
    console.error("API Error:", {
      status: error.status,
      message: error.message,
      details: error.error,
    });
  }
}
```

```typescript
// Using with error response processing
function processApiError(error: HttpError): string {
  // Check for structured error response
  if (error.error?.message) {
    return error.error.message;
  }

  // Fallback to HTTP status-based messages
  switch (error.status) {
    case 400:
      return "Invalid request. Please check your input.";
    case 401:
      return "Authentication required. Please log in.";
    case 403:
      return "Access denied. You do not have permission.";
    case 404:
      return "The requested resource was not found.";
    case 500:
      return "Server error. Please try again later.";
    default:
      return error.message || "An unexpected error occurred.";
  }
}
```

#### See

- Error Standard JavaScript Error interface
- ErrorResponse Structured error response from the backend

#### Extends

- `Error`

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Description</th>
<th>Overrides</th>
<th>Inherited from</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="property-cause"></a> `cause?`

</td>
<td>

`unknown`

</td>
<td>

‐

</td>
<td>

‐

</td>
<td>

```ts
Error.cause;
```

</td>
<td>

node_modules/typescript/lib/lib.es2022.error.d.ts:26

</td>
</tr>
<tr>
<td>

<a id="property-error"></a> `error?`

</td>
<td>

`ErrorResponse`

</td>
<td>

Optional structured error response from the backend

This property contains the detailed error response from the backend API,
which may include additional error codes, validation details, or other
structured error information. It's optional as not all HTTP errors
include a structured response body.

**Example**

```typescript
if (error.error?.validationErrors) {
  // Handle validation errors
  this.displayValidationErrors(error.error.validationErrors);
}
```

</td>
<td>

‐

</td>
<td>

‐

</td>
<td>

[libs/ngx-utils/src/lib/interfaces/http-error.interface.ts:170](https://github.com/hichchidev/hichchi/blob/7a34875f41fbc37ae8354ec8276cde73a8661476/libs/ngx-utils/src/lib/interfaces/http-error.interface.ts#L170)

</td>
</tr>
<tr>
<td>

<a id="property-message"></a> `message`

</td>
<td>

`string`

</td>
<td>

Human-readable error message

This property contains a descriptive error message that can be displayed
to users or logged for debugging purposes. It may come from the server
response or be generated based on the HTTP status code.

**Example**

```typescript
this.notificationService.showError(error.message);
```

</td>
<td>

```ts
Error.message;
```

</td>
<td>

‐

</td>
<td>

[libs/ngx-utils/src/lib/interfaces/http-error.interface.ts:152](https://github.com/hichchidev/hichchi/blob/7a34875f41fbc37ae8354ec8276cde73a8661476/libs/ngx-utils/src/lib/interfaces/http-error.interface.ts#L152)

</td>
</tr>
<tr>
<td>

<a id="property-name"></a> `name`

</td>
<td>

`string`

</td>
<td>

‐

</td>
<td>

‐

</td>
<td>

```ts
Error.name;
```

</td>
<td>

node_modules/typescript/lib/lib.es5.d.ts:1076

</td>
</tr>
<tr>
<td>

<a id="property-stack"></a> `stack?`

</td>
<td>

`string`

</td>
<td>

‐

</td>
<td>

‐

</td>
<td>

```ts
Error.stack;
```

</td>
<td>

node_modules/typescript/lib/lib.es5.d.ts:1078

</td>
</tr>
<tr>
<td>

<a id="property-status"></a> `status`

</td>
<td>

`number`

</td>
<td>

HTTP status code of the error response

This property contains the HTTP status code returned by the server,
such as 400 (Bad Request), 401 (Unauthorized), 404 (Not Found),
500 (Internal Server Error), etc. It allows for status-specific
error handling and user feedback.

**Example**

```typescript
if (error.status === 401) {
  // Handle authentication error
  this.authService.logout();
}
```

</td>
<td>

‐

</td>
<td>

‐

</td>
<td>

[libs/ngx-utils/src/lib/interfaces/http-error.interface.ts:138](https://github.com/hichchidev/hichchi/blob/7a34875f41fbc37ae8354ec8276cde73a8661476/libs/ngx-utils/src/lib/interfaces/http-error.interface.ts#L138)

</td>
</tr>
</tbody>
</table>

---

### HttpGetOptions

Defined in: [libs/ngx-utils/src/lib/interfaces/http-options.interfaces.ts:12](https://github.com/hichchidev/hichchi/blob/7a34875f41fbc37ae8354ec8276cde73a8661476/libs/ngx-utils/src/lib/interfaces/http-options.interfaces.ts#L12)

#### Extends

- [`HttpOptions`](#httpoptions)

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`Model`

</td>
</tr>
</tbody>
</table>

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Inherited from</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="property-filter"></a> `filter?`

</td>
<td>

`FilterOptions`<`Model`>

</td>
<td>

‐

</td>
<td>

[libs/ngx-utils/src/lib/interfaces/http-options.interfaces.ts:14](https://github.com/hichchidev/hichchi/blob/7a34875f41fbc37ae8354ec8276cde73a8661476/libs/ngx-utils/src/lib/interfaces/http-options.interfaces.ts#L14)

</td>
</tr>
<tr>
<td>

<a id="property-pagination"></a> `pagination?`

</td>
<td>

`PaginationOptions`

</td>
<td>

‐

</td>
<td>

[libs/ngx-utils/src/lib/interfaces/http-options.interfaces.ts:16](https://github.com/hichchidev/hichchi/blob/7a34875f41fbc37ae8354ec8276cde73a8661476/libs/ngx-utils/src/lib/interfaces/http-options.interfaces.ts#L16)

</td>
</tr>
<tr>
<td>

<a id="property-promise"></a> `promise?`

</td>
<td>

`false`

</td>
<td>

[`HttpOptions`](#httpoptions).[`promise`](#property-promise-2)

</td>
<td>

[libs/ngx-utils/src/lib/interfaces/http-options.interfaces.ts:5](https://github.com/hichchidev/hichchi/blob/7a34875f41fbc37ae8354ec8276cde73a8661476/libs/ngx-utils/src/lib/interfaces/http-options.interfaces.ts#L5)

</td>
</tr>
<tr>
<td>

<a id="property-search"></a> `search?`

</td>
<td>

`SearchOptions`<`Model`>

</td>
<td>

‐

</td>
<td>

[libs/ngx-utils/src/lib/interfaces/http-options.interfaces.ts:13](https://github.com/hichchidev/hichchi/blob/7a34875f41fbc37ae8354ec8276cde73a8661476/libs/ngx-utils/src/lib/interfaces/http-options.interfaces.ts#L13)

</td>
</tr>
<tr>
<td>

<a id="property-skipnotify"></a> `skipNotify?`

</td>
<td>

`boolean`

</td>
<td>

[`HttpOptions`](#httpoptions).[`skipNotify`](#property-skipnotify-2)

</td>
<td>

[libs/ngx-utils/src/lib/interfaces/http-options.interfaces.ts:4](https://github.com/hichchidev/hichchi/blob/7a34875f41fbc37ae8354ec8276cde73a8661476/libs/ngx-utils/src/lib/interfaces/http-options.interfaces.ts#L4)

</td>
</tr>
<tr>
<td>

<a id="property-sort"></a> `sort?`

</td>
<td>

`SortOptions`<`Model`>

</td>
<td>

‐

</td>
<td>

[libs/ngx-utils/src/lib/interfaces/http-options.interfaces.ts:15](https://github.com/hichchidev/hichchi/blob/7a34875f41fbc37ae8354ec8276cde73a8661476/libs/ngx-utils/src/lib/interfaces/http-options.interfaces.ts#L15)

</td>
</tr>
</tbody>
</table>

---

### HttpGetOptionsPromise

Defined in: [libs/ngx-utils/src/lib/interfaces/http-options.interfaces.ts:19](https://github.com/hichchidev/hichchi/blob/7a34875f41fbc37ae8354ec8276cde73a8661476/libs/ngx-utils/src/lib/interfaces/http-options.interfaces.ts#L19)

#### Extends

- `Omit`<[`HttpGetOptions`](#httpgetoptions)<`Model`>, `"promise"`>

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`Model`

</td>
</tr>
</tbody>
</table>

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Inherited from</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="property-filter-1"></a> `filter?`

</td>
<td>

`FilterOptions`<`Model`>

</td>
<td>

```ts
Omit.filter;
```

</td>
<td>

[libs/ngx-utils/src/lib/interfaces/http-options.interfaces.ts:14](https://github.com/hichchidev/hichchi/blob/7a34875f41fbc37ae8354ec8276cde73a8661476/libs/ngx-utils/src/lib/interfaces/http-options.interfaces.ts#L14)

</td>
</tr>
<tr>
<td>

<a id="property-pagination-1"></a> `pagination?`

</td>
<td>

`PaginationOptions`

</td>
<td>

```ts
Omit.pagination;
```

</td>
<td>

[libs/ngx-utils/src/lib/interfaces/http-options.interfaces.ts:16](https://github.com/hichchidev/hichchi/blob/7a34875f41fbc37ae8354ec8276cde73a8661476/libs/ngx-utils/src/lib/interfaces/http-options.interfaces.ts#L16)

</td>
</tr>
<tr>
<td>

<a id="property-promise-1"></a> `promise`

</td>
<td>

`true`

</td>
<td>

‐

</td>
<td>

[libs/ngx-utils/src/lib/interfaces/http-options.interfaces.ts:20](https://github.com/hichchidev/hichchi/blob/7a34875f41fbc37ae8354ec8276cde73a8661476/libs/ngx-utils/src/lib/interfaces/http-options.interfaces.ts#L20)

</td>
</tr>
<tr>
<td>

<a id="property-search-1"></a> `search?`

</td>
<td>

`SearchOptions`<`Model`>

</td>
<td>

```ts
Omit.search;
```

</td>
<td>

[libs/ngx-utils/src/lib/interfaces/http-options.interfaces.ts:13](https://github.com/hichchidev/hichchi/blob/7a34875f41fbc37ae8354ec8276cde73a8661476/libs/ngx-utils/src/lib/interfaces/http-options.interfaces.ts#L13)

</td>
</tr>
<tr>
<td>

<a id="property-skipnotify-1"></a> `skipNotify?`

</td>
<td>

`boolean`

</td>
<td>

[`HttpOptions`](#httpoptions).[`skipNotify`](#property-skipnotify-2)

</td>
<td>

[libs/ngx-utils/src/lib/interfaces/http-options.interfaces.ts:4](https://github.com/hichchidev/hichchi/blob/7a34875f41fbc37ae8354ec8276cde73a8661476/libs/ngx-utils/src/lib/interfaces/http-options.interfaces.ts#L4)

</td>
</tr>
<tr>
<td>

<a id="property-sort-1"></a> `sort?`

</td>
<td>

`SortOptions`<`Model`>

</td>
<td>

```ts
Omit.sort;
```

</td>
<td>

[libs/ngx-utils/src/lib/interfaces/http-options.interfaces.ts:15](https://github.com/hichchidev/hichchi/blob/7a34875f41fbc37ae8354ec8276cde73a8661476/libs/ngx-utils/src/lib/interfaces/http-options.interfaces.ts#L15)

</td>
</tr>
</tbody>
</table>

---

### HttpOptions

Defined in: [libs/ngx-utils/src/lib/interfaces/http-options.interfaces.ts:3](https://github.com/hichchidev/hichchi/blob/7a34875f41fbc37ae8354ec8276cde73a8661476/libs/ngx-utils/src/lib/interfaces/http-options.interfaces.ts#L3)

#### Extended by

- [`HttpGetOptions`](#httpgetoptions)

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

<a id="property-promise-2"></a> `promise?`

</td>
<td>

`false`

</td>
<td>

[libs/ngx-utils/src/lib/interfaces/http-options.interfaces.ts:5](https://github.com/hichchidev/hichchi/blob/7a34875f41fbc37ae8354ec8276cde73a8661476/libs/ngx-utils/src/lib/interfaces/http-options.interfaces.ts#L5)

</td>
</tr>
<tr>
<td>

<a id="property-skipnotify-2"></a> `skipNotify?`

</td>
<td>

`boolean`

</td>
<td>

[libs/ngx-utils/src/lib/interfaces/http-options.interfaces.ts:4](https://github.com/hichchidev/hichchi/blob/7a34875f41fbc37ae8354ec8276cde73a8661476/libs/ngx-utils/src/lib/interfaces/http-options.interfaces.ts#L4)

</td>
</tr>
</tbody>
</table>

---

### HttpOptionsPromise

Defined in: [libs/ngx-utils/src/lib/interfaces/http-options.interfaces.ts:7](https://github.com/hichchidev/hichchi/blob/7a34875f41fbc37ae8354ec8276cde73a8661476/libs/ngx-utils/src/lib/interfaces/http-options.interfaces.ts#L7)

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

<a id="property-promise-3"></a> `promise`

</td>
<td>

`true`

</td>
<td>

[libs/ngx-utils/src/lib/interfaces/http-options.interfaces.ts:9](https://github.com/hichchidev/hichchi/blob/7a34875f41fbc37ae8354ec8276cde73a8661476/libs/ngx-utils/src/lib/interfaces/http-options.interfaces.ts#L9)

</td>
</tr>
<tr>
<td>

<a id="property-skipnotify-3"></a> `skipNotify?`

</td>
<td>

`boolean`

</td>
<td>

[libs/ngx-utils/src/lib/interfaces/http-options.interfaces.ts:8](https://github.com/hichchidev/hichchi/blob/7a34875f41fbc37ae8354ec8276cde73a8661476/libs/ngx-utils/src/lib/interfaces/http-options.interfaces.ts#L8)

</td>
</tr>
</tbody>
</table>

## Type Aliases

### DataFormControls

```ts
type DataFormControls<T> = { [K in keyof T]: FormControl<T[K] | null> };
```

Defined in: [libs/ngx-utils/src/lib/form/form.interfaces.ts:122](https://github.com/hichchidev/hichchi/blob/7a34875f41fbc37ae8354ec8276cde73a8661476/libs/ngx-utils/src/lib/form/form.interfaces.ts#L122)

Type representing the controls structure of a type-safe form

This type maps each property of the data type T to a FormControl that can hold
either the original type or null. This ensures type safety when accessing form
controls while accounting for Angular's form control behavior where values can be null.

The type is essential for creating strongly-typed reactive forms where each control
is properly typed according to the data structure it represents, providing compile-time
type checking and IntelliSense support.

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`T`

</td>
<td>

The data type that the form represents

</td>
</tr>
</tbody>
</table>

#### Examples

```typescript
// Define the data structure
interface ProductData {
  name: string;
  price: number;
  description: string;
  inStock: boolean;
}

// The form controls type will be:
type ProductFormControls = DataFormControls<ProductData>;
// Equivalent to:
// {
//   name: FormControl<string | null>;
//   price: FormControl<number | null>;
//   description: FormControl<string | null>;
//   inStock: FormControl<boolean | null>;
// }
```

```typescript
// Using with form builder
export class ProductFormComponent {
  productForm: DataFormGroup<ProductData> = this.fb.group({
    name: ["", Validators.required],
    price: [null, [Validators.required, Validators.min(0)]],
    description: [""],
    inStock: [true],
  });

  // Type-safe access to individual controls
  get nameControl(): FormControl<string | null> {
    return this.productForm.controls.name; // Fully typed
  }

  get priceControl(): FormControl<number | null> {
    return this.productForm.controls.price; // Fully typed
  }
}
```

#### See

- [DataFormGroup](#dataformgroup) Interface that uses this type for form controls
- [DataFormValues](#dataformvalues) Related type for form values structure
- FormControl Angular's FormControl class

---

### DataFormValues

```ts
type DataFormValues<T> = { [K in keyof T]?: T[K] | null };
```

Defined in: [libs/ngx-utils/src/lib/form/form.interfaces.ts:58](https://github.com/hichchidev/hichchi/blob/7a34875f41fbc37ae8354ec8276cde73a8661476/libs/ngx-utils/src/lib/form/form.interfaces.ts#L58)

Type representing the value structure of a type-safe form

This type maps each property of the data type T to an optional property that can
be either the original type or null. This reflects how Angular forms handle values,
where form controls can have null values and some fields may be optional.

The type is particularly useful when working with form.value in Angular reactive forms,
ensuring type safety while accounting for the possibility of null values that can
occur in form controls.

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`T`

</td>
<td>

The data type that the form represents

</td>
</tr>
</tbody>
</table>

#### Examples

```typescript
// Define the data structure
interface UserData {
  name: string;
  email: string;
  age: number;
  bio?: string;
}

// The form values type will be:
type UserFormValues = DataFormValues<UserData>;
// Equivalent to:
// {
//   name?: string | null;
//   email?: string | null;
//   age?: number | null;
//   bio?: string | null;
// }
```

```typescript
// Using with form value extraction
export class UserFormComponent {
  userForm: DataFormGroup<UserData> = this.fb.group({
    name: ["", Validators.required],
    email: ["", Validators.required],
    age: [null, Validators.min(18)],
    bio: [null],
  });

  getFormValues(): DataFormValues<UserData> {
    return this.userForm.value; // Type-safe access to form values
  }
}
```

#### See

- [DataFormGroup](#dataformgroup) Interface that uses this type for form values
- [DataFormControls](#dataformcontrols) Related type for form controls structure
- [validatedFormData](#validatedformdata) Function that works with this type
