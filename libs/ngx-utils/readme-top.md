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
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { apiInterceptor, AuthInterceptor, ErrorInterceptor, ResponseInterceptor } from '@hichchi/ngx-utils/interceptors';

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
import { Component } from '@angular/core';
import { AuthService } from '@hichchi/ngx-utils/services';

@Component({
  selector: 'app-sign-in',
  template: `
    <form (submit)="signIn()">
      <input [(ngModel)]="username" name="username" placeholder="Username">
      <input [(ngModel)]="password" name="password" type="password" placeholder="Password">
      <button type="submit">Sign In</button>
    </form>
  `,
})
export class SignInComponent {
  username = '';
  password = '';

  constructor(private authService: AuthService) {}

  signIn() {
    this.authService.signIn({
      email: this.username,
      password: this.password
    }).subscribe(
      response => console.log('Sign in successful', response),
      error => console.error('Sign in failed', error)
    );
  }
}
```

### State Management

```typescript
import { Component, OnInit } from '@angular/core';
import { AuthState } from '@hichchi/ngx-auth/state';

@Component({
  selector: 'app-header',
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

*Building the future of Angular development, one commit at a time*

</div>

---

# 📖 API Documentation

Complete technical reference for all classes, interfaces, methods, and types in this library.

**Auto-generated by TypeDoc** - Browse through detailed API references, code examples, and implementation guides below.

<!-- TypeDoc generated documentation will be appended below this point -->

---

## 📋 API Table of Contents
