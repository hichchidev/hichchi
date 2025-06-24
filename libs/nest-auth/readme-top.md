# @hichchi/nest-auth

A comprehensive authentication module for NestJS applications.

## Installation

```bash
npm install @hichchi/nest-auth
```

## Overview

This library provides a complete authentication solution for NestJS applications. It includes JWT authentication, local authentication, Google OAuth, user caching, token verification, and encryption services.

## Key Features

- **JWT Authentication**: Secure token-based authentication using JSON Web Tokens
- **Local Authentication**: Username/password authentication strategy
- **Google OAuth**: Social authentication with Google
- **User Caching**: Optional Redis-based user caching for improved performance
- **Token Verification**: Services for verifying and managing authentication tokens
- **Encryption Services**: Utilities for secure data encryption

## Usage

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

## Building

Run `nx build nest-auth` to build the library.

## Running unit tests

Run `nx test nest-auth` to execute the unit tests via [Jest](https://jestjs.io).
