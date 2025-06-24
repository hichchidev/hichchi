# @hichchi/ngx-utils

A utility library for Angular applications with common services, interceptors, and state management.

## Installation

```bash
npm install @hichchi/ngx-utils
```

## Overview

This library provides a collection of utilities for Angular applications, including HTTP interceptors, authentication services, state management, and form utilities. It helps streamline common tasks in Angular development and promotes consistent implementation patterns.

## Key Features

- **HTTP Interceptors**: Pre-configured interceptors for API URLs, authentication, error handling, and response transformation
- **Authentication Services**: Services for handling user authentication and authorization
- **State Management**: State management utilities for authentication and other application states
- **Form Utilities**: Helper functions for working with Angular forms
- **Interface Definitions**: TypeScript interfaces for consistent typing

## Usage

### HTTP Interceptors

```typescript
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiUrlInterceptor, AuthInterceptor, ErrorInterceptor, ResponseInterceptor } from '@hichchi/ngx-utils/interceptors';

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
    this.authService.signIn(this.username, this.password).subscribe(
      response => console.log('Sign in successful', response),
      error => console.error('Sign in failed', error)
    );
  }
}
```

### State Management

```typescript
import { Component, OnInit } from '@angular/core';
import { AuthState } from '@hichchi/ngx-utils/state';

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
    this.authState.isAuthenticated$.subscribe(
      isAuthenticated => this.isLoggedIn = isAuthenticated
    );
  }

  signOut() {
    this.authState.signOut();
  }
}
```

## Building

Run `nx build ngx-utils` to build the library.

## Running unit tests

Run `nx test ngx-utils` to execute the unit tests via [Jest](https://jestjs.io).
