<div align="center">
  <h1>🔐 @hichchi/nest-auth</h1>
  <p>
    <strong>A comprehensive authentication module for NestJS applications</strong>
  </p>
  <p>
    <a href="https://www.npmjs.com/package/@hichchi/nest-auth">
      <img src="https://img.shields.io/npm/v/@hichchi/nest-auth?style=flat-square&color=blue" alt="npm version">
    </a>
    <a href="https://www.npmjs.com/package/@hichchi/nest-auth">
      <img src="https://img.shields.io/npm/dm/@hichchi/nest-auth?style=flat-square&color=green" alt="npm downloads">
    </a>
    <a href="https://github.com/hichchidev/hichchi/blob/main/LICENSE">
      <img src="https://img.shields.io/badge/license-MIT-green?style=flat-square" alt="License">
    </a>
    <img src="https://img.shields.io/badge/nestjs-11.1.3-red?style=flat-square" alt="NestJS Version">
  </p>
  <p>
    <em>Part of the <a href="https://github.com/hichchidev/hichchi">Hichchi</a> ecosystem - A powerful, scalable application built with Nx workspace</em>
  </p>
</div>

---

## 📦 Installation

```bash
npm install @hichchi/nest-auth
```

## 🌟 Overview

This library provides a complete authentication solution for NestJS applications. It includes JWT authentication, local authentication, Google OAuth, user caching, token verification, and encryption services.

## ✨ Key Features

- 🔑 **JWT Authentication**: Secure token-based authentication using JSON Web Tokens
- 👤 **Local Authentication**: Username/password authentication strategy
- 🌐 **Google OAuth**: Social authentication with Google
- ⚡ **User Caching**: Optional Redis-based user caching for improved performance
- 🔍 **Token Verification**: Services for verifying and managing authentication tokens
- 🔒 **Encryption Services**: Utilities for secure data encryption

## 🚀 Usage

### Module Registration

```typescript
import { Module } from '@nestjs/common';
import { HichchiAuthModule } from '@hichchi/nest-auth';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';

@Module({
  imports: [
    UserModule,
    HichchiAuthModule.register(
      // User service provider
      {
        imports: [UserModule],
        useFactory: (userService: UserService) => userService,
        inject: [UserService],
      },
      // Auth options
      {
        jwt: {
          secret: 'your-secret-key',
          signOptions: { expiresIn: '1h' },
        },
        // Optional Redis configuration
        redis: {
          host: 'localhost',
          port: 6379,
        },
        // Authentication method configuration
        authMethod: 'email', // or 'username'
        authField: 'email',  // or 'username'
      }
    ),
  ],
})
export class AppModule {}
```

### Protecting Routes

```typescript
import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@hichchi/nest-auth';
import { User } from '@hichchi/nest-auth/decorators';

@Controller('profile')
export class ProfileController {
  @UseGuards(JwtAuthGuard)
  @Get()
  getProfile(@User() user) {
    return user;
  }
}
```

### Google OAuth Authentication

```typescript
import { Controller, Get, UseGuards } from '@nestjs/common';
import { GoogleAuthGuard } from '@hichchi/nest-auth';

@Controller('auth')
export class AuthController {
  @UseGuards(GoogleAuthGuard)
  @Get('google')
  googleAuth() {
    // Google authentication will be handled by Passport
  }

  @UseGuards(GoogleAuthGuard)
  @Get('google/callback')
  googleAuthCallback() {
    // Handle successful authentication
    return { message: 'Authentication successful' };
  }
}
```

---

## 🔧 Development

### Building

```bash
nx build nest-auth
```

### Running unit tests

```bash
nx test nest-auth
```

Tests are executed via [Jest](https://jestjs.io).

---

<div align="center">
  <p>
    <strong>Made with ❤️ by <a href="https://github.com/hichchidev">HichchiDev</a></strong>
  </p>
  <p>
    <a href="https://github.com/hichchidev/hichchi">🏠 Hichchi Ecosystem</a> •
    <a href="https://github.com/hichchidev/hichchi/issues">🐛 Report Bug</a> •
    <a href="https://github.com/hichchidev/hichchi/issues">✨ Request Feature</a>
  </p>
</div>
