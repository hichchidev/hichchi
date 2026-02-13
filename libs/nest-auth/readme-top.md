<!--suppress ALL -->
<div align="center">

# 🔐 @hichchi/nest-auth

## Description

**NestJS authentication extension library that extends @hichchi/nest-core functionality with comprehensive JWT tokens, Google OAuth, local authentication, role-based access control, permission guards, user caching, encryption services, token management, and enterprise-grade security features - cannot be used independently, requires nest-core as foundation**

[![npm version](https://img.shields.io/npm/v/@hichchi/nest-auth?style=flat&color=blue)](https://www.npmjs.com/package/@hichchi/nest-auth)
[![npm downloads](https://img.shields.io/npm/dm/@hichchi/nest-auth?style=flat&color=green)](https://www.npmjs.com/package/@hichchi/nest-auth)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/hichchidev/hichchi/blob/main/LICENSE)
[![NestJS](https://img.shields.io/badge/nestjs-11.1.3-red.svg)](https://nestjs.com/)

*Part of the [Hichchi](https://github.com/hichchidev/hichchi) ecosystem - A powerful, scalable application built with Nx workspace*

[📚 Jump to Documentation](#-api-documentation)

</div>

---

## 📋 Table of Contents

- [📦 Installation](#-installation)
- [⚡ Quick Start](#-quick-start)
- [📋 Prerequisites](#-prerequisites)
- [🌟 Overview](#-overview)
- [✨ Features](#-features)
- [🚀 Usage](#-usage)
- [🔧 Configuration Reference](#-configuration-reference)
- [🔧 Development](#-development)
- [📖 API Documentation](#-api-documentation)

---

## 📦 Installation

```bash
npm install @hichchi/nest-core @hichchi/nest-auth
```

## ⚡ Quick Start

Get up and running with authentication in just a few minutes! This guide will walk you through setting up a complete authentication system with JWT tokens, user management, and secure endpoints.

#### 1. Create a NestJS service implementing `IUserService`

First, you need to create a service that handles user operations in your database. This service must implement the `IUserService` interface to work with the authentication module.

**_NOTE:_** All available methods can be found in the [IUserService](#iuserservice) interface documentation.

```typescript
import { Injectable } from "@nestjs/common";
import { GoogleProfile, IUserService } from "@hichchi/nest-auth";
import { AuthProvider, User } from "@hichchi/nest-connector/auth";
import { EntityId } from "@hichchi/nest-connector/crud";

@Injectable()
export class UserService implements IUserService {
  /**
   * Find user by email address (required for email-based authentication)
   */
  getUserByEmail(email: string): Promise<(User & { email: string }) | null> {
    // Implement your database query logic here
    // Example: return await this.userRepository.findOne({ where: { email } });
  }

  /**
   * Find user by username (required for username-based authentication)
   */
  getUserByUsername(username: string): Promise<(User & { username: string }) | null> {
    // Implement your database query logic here
    // Example: return this.userRepository.findOne({ where: { username } });
  }

  /**
   * Find user by ID (required for token validation and user profile operations)
   */
  getUserById(id: EntityId): Promise<User | null> {
    // Implement your database query logic here
    // Example: return this.userRepository.findOne({ where: { id } });
  }

  /**
   * Create new user during registration (supports both local and OAuth registration)
   */
  signUpUser(userDto: Partial<User>, signUpType: AuthProvider, profile?: GoogleProfile): Promise<User | null> {
    // Implement user creation logic here
    // Handle password hashing for local registration
    // Handle OAuth profile data for social registration
    // Example: return this.createUser(userDto, signUpType, profile);
  }

  /**
   * Update existing user information (required for profile updates)
   */
  updateUserById(id: EntityId, userDto: Partial<User>, updatedBy: User): Promise<User | null> {
    // Implement user update logic here
    // Example: return this.userRepository.update(id, userDto);
  }
}
```

#### 2. Create and export your user module

Create a module that provides your user service and makes it available for dependency injection.

```typescript
import { Module } from "@nestjs/common";
import { UserService } from "./services";

@Module({
  providers: [UserService],
    // Export the service so it can be used by the auth module
    exports: [UserService],})
export class UserModule {}
```

#### 3. Register the authentication module in your `app.module.ts`

Configure the authentication module by providing your user service and setting up authentication options.

**_NOTE:_** All available configuration options can be found in the [AuthOptions](#authoptions) interface documentation.

```typescript
import { Module } from "@nestjs/common";
import { AuthField, AuthMethod } from "@hichchi/nest-connector/auth";
import { HichchiAuthModule } from '@hichchi/nest-auth';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    // Register the authentication module with your user service
    HichchiAuthModule.register(
      {
        imports: [UserModule], // Import your user module
        useExisting: UserService, // Use your existing user service
      },
      {
        // Optional: Redis configuration for token caching and session management
        redis: {
          host: "localhost",
          port: 6379,
          prefix: "nest-auth", // Prefix for Redis keys
        },
        // JWT token configuration
        jwt: {
          secret: "your-super-secret-jwt-key-here", // Use a strong secret in production
          expiresIn: 86400, // Access token expires in 24 hours (in seconds)
          refreshSecret: "your-super-secret-refresh-key-here", // Use a different secret for refresh tokens
          refreshExpiresIn: 604800, // Refresh token expires in 7 days (in seconds)
        },
        authMethod: AuthMethod.JWT, // Use JWT-based authentication
        authField: AuthField.EMAIL, // Authenticate users by email address
        validationExceptionFactory: true, // Enable detailed validation error messages
      },
    )
  ]
})
export class AppModule {}
```

#### 4. Start using the authentication endpoints

Once configured, your application will automatically have the following authentication endpoints available under `/auth`:

**Authentication Endpoints:**
- `POST /auth/sign-up` - Register a new user account
- `POST /auth/sign-in` - Login with email/username and password
- `POST /auth/sign-out` - Logout and invalidate tokens
- `POST /auth/refresh-token` - Refresh access tokens using refresh token
- `POST /auth/get-auth-response` - Get authentication response from an existing token
- `GET /auth/me` - Get current user profile (requires authentication)
- `POST /auth/change-password` - Change user password (requires authentication)
- `POST /auth/request-password-reset` - Request password reset
- `POST /auth/reset-password-verify` - Verify password reset token/code
- `POST /auth/reset-password` - Reset password using reset token
- `POST /auth/resend-email-verification` - Send verification email again
- `POST /auth/verify-email` - Verify email address
- `GET /auth/google-sign-in` - Initiate Google OAuth login (if configured)
- `GET /auth/google-callback` - Google OAuth callback endpoint

**_NOTE:_** All available endpoints are also available from `AuthEndpoint` enum of the [@hichchi/nest-connector](https://www.npmjs.com/package/@hichchi/nest-connector) package

**Example Usage:**
```bash
# Register a new user
curl -X POST http://localhost:3000/auth/sign-up \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "securePassword123"}'

# Login
curl -X POST http://localhost:3000/auth/sign-in \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "securePassword123"}'

# Access protected profile endpoint (include JWT token in Authorization header)
curl -X GET http://localhost:3000/auth/me \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

Your authentication system is now ready to use! 🎉


## 📋 Prerequisites

Before installing @hichchi/nest-auth, ensure you have:

### Required Dependencies
- **Node.js**: >= 18.0.0
- **NestJS**: >= 11.0.0
- **TypeScript**: >= 5.6.0

### Peer Dependencies
```bash
npm install @nestjs/common @nestjs/core @nestjs/jwt @nestjs/passport
npm install passport passport-local passport-jwt
npm install bcrypt jsonwebtoken
```

### Internal Dependencies
This package depends on:
```bash
npm install @hichchi/nest-connector @hichchi/nest-core @hichchi/utils
```

### Optional Dependencies
For enhanced features:
```bash
# For Redis caching
npm install redis @nestjs/redis

# For Google OAuth
npm install passport-google-oauth20
```

### Database Requirements
- A user entity/model in your database
- User service that implements basic CRUD operations
- Fields for email/username and password storage

## 🌟 Overview

🎯 **Your complete authentication toolkit** for NestJS applications. From JWT tokens to Google OAuth, from Redis caching to encryption services - everything you need to secure your application with enterprise-grade authentication features.

## ✨ Features

### 🚀 Ready-to-Use Authentication Endpoints
- 📝 **User Registration** - Complete sign-up flow with email verification
- 🔐 **User Login/Logout** - Secure authentication with JWT tokens
- 🔄 **Token Refresh** - Automatic token renewal for seamless user experience
- 👤 **User Profile Management** - Get current user info and update profiles
- 🔑 **Password Management** - Change password and reset password functionality
- ✉️ **Email Verification** - Built-in email verification system
- 🌐 **Google OAuth Integration** - Social login with Google authentication

### 🔐 Authentication Strategies
- 🔑 **JWT Authentication** - Secure token-based authentication with customizable options
- 👤 **Local Authentication** - Traditional username/password authentication
- 🌐 **Google OAuth 2.0** - Social authentication integration

### 🛡️ Route Protection
- 🔒 **JWT Auth Guard** - Protect your routes with JWT token validation
- 👮 **Role-Based Access Control** - Restrict access based on user roles
- 🎫 **Permission-Based Access Control** - Fine-grained permission system
- 🌍 **Google Auth Guard** - Protect routes with Google OAuth

### 🎯 Helpful Decorators
- 👤 **@CurrentUser** - Get the authenticated user in your controllers
- 🏷️ **@Roles** - Define required roles for route access
- 🎫 **@Permission** - Define required permissions for route access
- 📋 **@AuthInfo** - Access authentication metadata

### 🔧 Configuration Options
- 🔧 **Flexible Module Setup** - Easy configuration with your existing user service
- ⚡ **Redis Caching** - Optional Redis integration for improved performance
- 🔒 **Security Settings** - Customizable JWT options, password requirements
- 🌐 **Multi-tenant Support** - Subdomain-based authentication
- 🔌 **WebSocket Support** - Real-time authentication for WebSocket connections

## 🚀 Usage

### Using Guards

#### `JwtAuthGuard`

This guard is used to authenticate requests using JWT tokens. It validates JWT tokens from either the Authorization header (Bearer token) or cookies, depending on your authentication method configuration. The guard also supports automatic token refresh when using cookie-based authentication.

```typescript
import { JwtAuthGuard, CurrentUser, AuthUser } from "@hichchi/nest-auth";
import { UseGuards, Post, Get, Body } from "@nestjs/common";

// In a controller - protect routes that require authentication
@UseGuards(JwtAuthGuard)
@Post()
create(@Body() dto: CreateUserDto, @CurrentUser() user: AuthUser): Promise<User | null> {
  return this.userService.save(dto);
}

// Get current user profile
@UseGuards(JwtAuthGuard)
@Get('profile')
getProfile(@CurrentUser() user: AuthUser): AuthUser {
  return user;
}
```

#### `LocalAuthGuard`

This guard is used to authenticate users with username/password credentials (local authentication). It validates that the required credentials (email/username and password) are provided in the request body before proceeding with authentication using the local strategy.

Usually used with `@CurrentUser()` decorator - the `LocalAuthGuard` handles the authentication part and returns the authenticated user to the request, and the decorator is used to access the authenticated user from the request.

```typescript
import {
  AuthUser,
  CurrentUser,
  LocalAuthGuard,
  SignInDto
} from "@hichchi/nest-auth";
import { AuthEndpoint, AuthResponse } from "@hichchi/nest-connector/auth";
import { HttpSuccessStatus } from "@hichchi/nest-connector";
import { Post, HttpCode, UseGuards, Body } from "@nestjs/common";

// In a controller - for sign-in endpoint
@Post(AuthEndpoint.SIGN_IN)
@HttpCode(HttpSuccessStatus.OK)
@UseGuards(LocalAuthGuard)
signIn(
  @CurrentUser() authUser: AuthUser,
  @Body() signInDto: SignInDto,
): Promise<AuthResponse> {
  return this.authService.signIn(authUser, signInDto);
}
```

#### `GoogleAuthGuard`

This guard is used to authenticate users with Google OAuth 2.0. It handles the OAuth authentication flow, validates that Google authentication is properly configured, and manages authentication callbacks from Google's OAuth service. Requires Google OAuth configuration in your auth options.

```typescript
import { GoogleAuthGuard } from "@hichchi/nest-auth";
import { UseGuards, Get, Query } from "@nestjs/common";

// Initiate Google OAuth authentication
@UseGuards(GoogleAuthGuard)
@Get('google-sign-in')
googleSignIn(@Query('redirectUrl') redirectUrl: string): void {
  // This route initiates Google OAuth authentication
  // User will be redirected to Google's OAuth consent screen
}

// Handle Google OAuth callback
@UseGuards(GoogleAuthGuard)
@Get('google-callback')
googleCallback(): void {
  // This route handles the callback from Google after authentication
  // The guard processes the OAuth response and authenticates the user
}
```

### Using Decorators

#### `@CurrentUser`

This decorator is used to extract the authenticated user information from the request context. It removes sensitive information like password and provides access to user details in controller methods. Requires authentication guard to be applied to the route.

```typescript
import { CurrentUser, AuthUser, JwtAuthGuard } from "@hichchi/nest-auth";
import { UseGuards, Get, Post, Body } from "@nestjs/common";

// Get current authenticated user
@UseGuards(JwtAuthGuard)
@Get('profile')
getProfile(@CurrentUser() user: AuthUser): AuthUser {
  return user; // Password is automatically removed
}

// Use current user in business logic
@UseGuards(JwtAuthGuard)
@Post('users')
createUser(@Body() dto: CreateUserDto, @CurrentUser() user: AuthUser): Promise<User> {
  return this.userService.save({ ...dto, createdBy: user.id });
}
```

#### `@Roles`

This decorator is used to define required roles for route access. Works with role-based access control to restrict endpoints based on user roles.

```typescript
import { Roles, RoleGuard, JwtAuthGuard } from "@hichchi/nest-auth";
import { UseGuards, Delete, Put, Param, Body } from "@nestjs/common";

// Require admin role
@UseGuards(JwtAuthGuard, RoleGuard)
@Roles('admin')
@Delete(':id')
deleteUser(@Param('id') id: string): Promise<void> {
  return this.userService.delete(id);
}

// Require multiple roles (user must have at least one)
@UseGuards(JwtAuthGuard, RoleGuard)
@Roles('admin', 'moderator')
@Patch(':id')
updateUser(@Param('id') id: string, @Body() dto: UpdateUserDto): Promise<User> {
  return this.userService.update(id, dto);
}
```

#### `@Permission`

This decorator is used to define required permissions for route access. Provides fine-grained permission-based access control.

```typescript
import { Permission, PermissionGuard, JwtAuthGuard } from "@hichchi/nest-auth";
import { UseGuards, Get, Delete, Param } from "@nestjs/common";

// Require specific permission
@UseGuards(JwtAuthGuard, PermissionGuard)
@Permission('users:read')
@Get()
getUsers(): Promise<User[]> {
  return this.userService.findAll();
}

// Require multiple permissions
@UseGuards(JwtAuthGuard, PermissionGuard)
@Permission('users:write', 'users:delete')
@Delete(':id')
deleteUser(@Param('id') id: string): Promise<void> {
  return this.userService.delete(id);
}
```

#### `@AuthInfo`

This decorator is used to access authentication metadata and additional information about the current authentication context.

```typescript
import { AuthInfo, JwtAuthGuard } from "@hichchi/nest-auth";
import { UseGuards, Get } from "@nestjs/common";

// Access authentication metadata
@UseGuards(JwtAuthGuard)
@Get('session-info')
getSessionInfo(@AuthInfo() authInfo: any): any {
  return {
    tokenType: authInfo.tokenType,
    issuedAt: authInfo.iat,
    expiresAt: authInfo.exp,
    // Additional auth metadata
  };
}
```

#### `@SocketId`

This decorator is used to extract the socket ID from the authenticated user's token data in the request. It provides easy access to the socket ID within controller methods for WebSocket-related functionality. Requires authentication guard to be applied to the route.

```typescript
import { SocketId, JwtAuthGuard } from "@hichchi/nest-auth";
import { UseGuards, Get, Post, Body } from "@nestjs/common";

// Get socket ID for WebSocket operations
@UseGuards(JwtAuthGuard)
@Get('socket-info')
getSocketInfo(@SocketId() socketId: string): any {
  return {
    socketId,
    message: 'Socket ID retrieved successfully'
  };
}

// Use socket ID in business logic
@UseGuards(JwtAuthGuard)
@Post('users/:id/update')
updateUserWithSocket(@Param('id') id: string, @Body() dto: UpdateUserDto, @SocketId() socketId: string): Promise<User> {
  return this.userService.update(id, { ...dto, socketId });
}
```

#### `@Subdomain`

This decorator is used to extract the subdomain from the current request. It provides easy access to the subdomain within controller methods for multi-tenant applications. Requires SubdomainMiddleware to be applied to your routes.

```typescript
import { Subdomain } from "@hichchi/nest-auth";
import { SubdomainMiddleware } from "@hichchi/nest-core";
import { UseGuards, Get, Module, MiddlewareConsumer, NestModule } from "@nestjs/common";

// Configure subdomain middleware in your module
@Module({...})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(SubdomainMiddleware("example.com", "api"))
      .forRoutes("*");
  }
}

// Use subdomain in controller
@Get('tenant-info')
getTenantInfo(@Subdomain() subdomain: string): any {
  return {
    tenant: subdomain,
    message: `Welcome to ${subdomain} tenant`
  };
}

// Multi-tenant data filtering
@Get('users')
getUsers(@Subdomain() subdomain: string): Promise<User[]> {
  return this.userService.findByTenant(subdomain);
}
```

### Using Extractors

#### `cookieExtractor`

This extractor function is used to extract JWT access tokens from request cookies. It's primarily used internally by the authentication system when using cookie-based authentication, but can also be used in custom authentication strategies.

```typescript
import { cookieExtractor } from "@hichchi/nest-auth";
import { ExtractJwt } from "passport-jwt";
import { Request } from "express";

// Use with passport-jwt ExtractJwt.fromExtractors
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
  secretOrKey: 'your-secret-key',
};

// Manual usage to extract token from request
function extractTokenFromCookies(request: Request): string | null {
  return cookieExtractor(request);
}

// Example in a custom strategy
@Injectable()
export class CustomJwtStrategy extends PassportStrategy(Strategy, 'custom-jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        cookieExtractor, // Extract from cookies first
        ExtractJwt.fromAuthHeaderAsBearerToken(), // Fallback to Authorization header
      ]),
      secretOrKey: process.env.JWT_SECRET,
    });
  }
}
```

### Using Utilities

#### Configuration Validation Functions

These utility functions help validate authentication configuration during module setup to ensure all required options are properly configured.

##### `validateRedisOptions`

Validates Redis connection options to ensure either a URL or host is provided for establishing a connection.

```typescript
import { validateRedisOptions } from "@hichchi/nest-auth";
import { RedisOptions } from "@hichchi/nest-core";

// Validate Redis configuration before using
const redisConfig: RedisOptions = {
  host: 'localhost',
  port: 6379,
  prefix: 'auth-cache'
};

try {
  validateRedisOptions(redisConfig);
  console.log('Redis configuration is valid');
} catch (error) {
  console.error('Invalid Redis configuration:', error.message);
}

// Example with URL-based configuration
const redisUrlConfig: RedisOptions = {
  url: 'redis://localhost:6379'
};

validateRedisOptions(redisUrlConfig); // Will pass validation
```

##### `validateJwtOptions`

Validates JWT configuration options to ensure all required secrets and expiration times are provided.

```typescript
import { validateJwtOptions } from "@hichchi/nest-auth";
import { JwtOptions } from "@hichchi/nest-auth";

// Validate JWT configuration
const jwtConfig: JwtOptions = {
  secret: 'your-access-token-secret',
  expiresIn: 3600, // 1 hour
  refreshSecret: 'your-refresh-token-secret',
  refreshExpiresIn: 604800, // 7 days
};

try {
  validateJwtOptions(jwtConfig);
  console.log('JWT configuration is valid');
} catch (error) {
  console.error('Invalid JWT configuration:', error.message);
}

// Example usage in module configuration
@Module({
  imports: [
    HichchiAuthModule.register(
      { /* user service config */ },
      {
        jwt: jwtConfig, // This will be validated internally
        // other auth options...
      }
    )
  ]
})
export class AppModule {}
```

##### `validateUserServiceProvider`

Validates that a user service implements all required methods based on the authentication configuration.

```typescript
import { validateUserServiceProvider } from "@hichchi/nest-auth";
import { IUserService, AuthOptions } from "@hichchi/nest-auth";
import { AuthField } from "@hichchi/nest-connector/auth";

// Example user service implementation
@Injectable()
export class UserService implements IUserService {
  async getUserByEmail(email: string) { /* implementation */ }
  async getUserByUsername(username: string) { /* implementation */ }
  async getUserById(id: string) { /* implementation */ }
  async signUpUser(userDto: any) { /* implementation */ }
  async updateUserById(id: string, userDto: any) { /* implementation */ }
}

// Validate the user service against auth configuration
const authOptions: AuthOptions = {
  authField: AuthField.EMAIL,
  jwt: { /* jwt config */ },
  googleAuth: { /* google config */ },
};

const userService = new UserService();

try {
  validateUserServiceProvider(userService, authOptions);
  console.log('User service implements all required methods');
} catch (error) {
  console.error('User service validation failed:', error.message);
}
```

#### User Management Functions

##### `generateAuthUser`

Generates an AuthUser object from cached user data and access token, combining user information with session details.

```typescript
import { generateAuthUser } from "@hichchi/nest-auth";
import { CacheUser, AuthUser } from "@hichchi/nest-auth";

// Example cached user data
const cacheUser: CacheUser = {
  id: 'user-123',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  roles: ['user'],
  sessions: [
    {
      sessionId: 'session-456',
      accessToken: 'jwt-access-token-here',
      refreshToken: 'jwt-refresh-token-here'
    }
  ]
};

// Generate AuthUser from cache and token
try {
  const authUser: AuthUser = generateAuthUser(cacheUser, 'jwt-access-token-here');

  console.log('Generated AuthUser:', {
    id: authUser.id,
    fullName: authUser.fullName, // 'John Doe' - automatically generated
    email: authUser.email,
    sessionId: authUser.sessionId,
    accessToken: authUser.accessToken,
    refreshToken: authUser.refreshToken
  });
} catch (error) {
  console.error('Failed to generate AuthUser:', error.message);
}

// Example usage in a custom authentication service
@Injectable()
export class CustomAuthService {
  constructor(private cacheService: UserCacheService) {}

  async getAuthenticatedUser(accessToken: string): Promise<AuthUser> {
    // Get user from cache (implementation depends on your cache strategy)
    const cacheUser = await this.cacheService.getUserByToken(accessToken);

    if (!cacheUser) {
      throw new UnauthorizedException('User not found in cache');
    }

    // Generate AuthUser with session information
    return generateAuthUser(cacheUser, accessToken);
  }
}
```

## 🔧 Configuration Reference

### Complete Configuration Options

```typescript
// JWT authentication configuration options
interface JwtOptions {
  /** Secret key used to sign JWT access tokens */
  secret: string;
  /** Expiration time for access tokens in seconds */
  expiresIn: number;
  /** Secret key used to sign JWT refresh tokens */
  refreshSecret: string;
  /** Expiration time for refresh tokens in seconds */
  refreshExpiresIn: number;
}

// Google OAuth authentication configuration options
interface GoogleAuthOptions {
  /** Google OAuth client ID from Google Developer Console */
  clientId: string;
  /** Google OAuth client secret from Google Developer Console */
  clientSecret: string;
  /** URL where Google will redirect after authentication */
  callbackUrl: string;
}

// Cookie configuration options
interface CookiesOptions {
  /** Secret key used for signing cookies */
  secret?: string;
  /** Controls how cookies are sent with cross-site requests */
  sameSite?: boolean | "lax" | "strict" | "none";
  /** Whether cookies should only be sent over HTTPS */
  secure?: boolean;
}

// Main authentication configuration options
interface AuthOptions {
  /**
   * Whether the application is running in production mode
   * @default false
   */
  isProd?: boolean;

  /**
   * Redis configuration for caching user sessions
   * When provided, user sessions will be stored in Redis
   */
  redis?: RedisOptions;

  /**
   * Secret key used for encrypting user sessions in cache
   * Required when using Redis caching with sensitive user data
   */
  sessionSecret?: string;

  /**
   * JWT configuration options (Required)
   */
  jwt: JwtOptions;

  /**
   * Google OAuth configuration options
   * When provided, enables Google OAuth authentication
   */
  googleAuth?: GoogleAuthOptions;

  /**
   * Cookie configuration options
   * Used when authMethod is set to AuthMethod.COOKIE
   */
  cookies?: CookiesOptions;

  /**
   * Whether to verify user email before allowing authentication
   * @default false
   */
  checkEmailVerified?: boolean;

  /**
   * URL to redirect to after email verification
   * Required when checkEmailVerified is true
   */
  emailVerifyRedirect?: string;

  /**
   * Password reset token expiration time in seconds
   * @default 3600 (1 hour)
   */
  passwordResetExp?: number;

  /**
   * Authentication method (JWT, Cookie, etc.)
   * @default AuthMethod.JWT
   */
  authMethod?: AuthMethod;

  /**
   * Field used for authentication (email, username, etc.)
   * @default AuthField.EMAIL
   */
  authField?: AuthField | string;

  /**
   * Custom DTO class for sign-up requests
   */
  signUpDto?: typeof SignUpDto;

  /**
   * Custom DTO class for user views
   */
  viewDto?: Type<ViewUserDto>;

  /**
   * Custom validation exception factory
   * @default false
   */
  validationExceptionFactory?: boolean | ((errors: ValidationError[]) => HttpException);

  /**
   * Whether to disable sign-up functionality
   * @default false
   */
  disableSignUp?: boolean;

  /**
   * List of allowed domains for redirect URLs
   * Used to prevent open redirect vulnerabilities
   */
  allowedRedirectDomains?: string[];
}
```

### Default Configuration

```typescript
const defaultConfig: Partial<AuthOptions> = {
  isProd: false,
  checkEmailVerified: false,
  passwordResetExp: 3600, // 1 hour
  authMethod: AuthMethod.JWT,
  authField: AuthField.EMAIL,
  disableSignUp: false,
  validationExceptionFactory: false,
};
```

## 🔧 Development

### Building

```bash
nx build nest-auth
```

Compile and bundle the authentication module for production use.

### Testing

```bash
nx test nest-auth
```

Run comprehensive unit tests powered by [Jest](https://jestjs.io).

---

<div align="center">

**Made with ❤️ by [Hichchi Dev](https://github.com/hichchidev)**

[![Hichchi Ecosystem](https://img.shields.io/badge/🏠_Hichchi_Ecosystem-blue)](https://github.com/hichchidev/hichchi)
[![Report Bug](https://img.shields.io/badge/🐛_Report_Bug-red)](https://github.com/hichchidev/hichchi/issues)
[![Request Feature](https://img.shields.io/badge/✨_Request_Feature-green)](https://github.com/hichchidev/hichchi/issues)

*Empowering secure applications with enterprise-grade authentication, JWT tokens, OAuth integration, and role-based access control*

</div>

---

# 📖 API Documentation

Complete technical reference for all classes, interfaces, methods, and types in this library.

**Auto-generated by TypeDoc** - Browse through detailed API references, code examples, and implementation guides below.

<!-- TypeDoc generated documentation will be appended below this point -->

---

## 📋 API Table of Contents
