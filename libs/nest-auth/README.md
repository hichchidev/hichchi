<!--suppress ALL -->

<div align="center">

# 🔐 @hichchi/nest-auth

## Description

**NestJS authentication extension library that extends @hichchi/nest-core functionality with comprehensive JWT tokens, Google OAuth, local authentication, role-based access control, permission guards, user caching, encryption services, token management, and enterprise-grade security features - cannot be used independently, requires nest-core as foundation**

[![npm version](https://img.shields.io/npm/v/@hichchi/nest-auth?style=flat&color=blue)](https://www.npmjs.com/package/@hichchi/nest-auth)
[![npm downloads](https://img.shields.io/npm/dm/@hichchi/nest-auth?style=flat&color=green)](https://www.npmjs.com/package/@hichchi/nest-auth)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/hichchidev/hichchi/blob/main/LICENSE)
[![NestJS](https://img.shields.io/badge/nestjs-11.1.3-red.svg)](https://nestjs.com/)

_Part of the [Hichchi](https://github.com/hichchidev/hichchi) ecosystem - A powerful, scalable application built with Nx workspace_

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
  // Find user by email address (required for email-based authentication)
  async getUserByEmail(
    email: string,
  ): Promise<(User & { email: string }) | null> {
    // Implement your database query logic here
    // Example: return await this.userRepository.findOne({ where: { email } });
    const user = await this.findUserByEmail(email);
    return user;
  }

  // Find user by username (required for username-based authentication)
  async getUserByUsername(
    username: string,
  ): Promise<(User & { username: string }) | null> {
    // Implement your database query logic here
    // Example: return await this.userRepository.findOne({ where: { username } });
    const user = await this.findUserByUsername(username);
    return user;
  }

  // Find user by ID (required for token validation and user profile operations)
  async getUserById(id: EntityId): Promise<User | null> {
    // Implement your database query logic here
    // Example: return await this.userRepository.findOne({ where: { id } });
    const user = await this.findUserById(id);
    return user;
  }

  // Create new user during registration (supports both local and OAuth registration)
  async signUpUser(
    userDto: Partial<User>,
    signUpType: AuthProvider,
    profile?: GoogleProfile,
  ): Promise<User | null> {
    // Implement user creation logic here
    // Handle password hashing for local registration
    // Handle OAuth profile data for social registration
    const newUser = await this.createUser(userDto, signUpType, profile);
    return newUser;
  }

  // Update existing user information (required for profile updates)
  async updateUserById(
    id: EntityId,
    userDto: Partial<User>,
    updatedBy: User,
  ): Promise<User> {
    // Implement user update logic here
    // Example: return await this.userRepository.update(id, userDto);
    const updatedUser = await this.updateUser(id, userDto, updatedBy);
    return updatedUser;
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
  exports: [UserService],
})
export class UserModule {}
```

#### 3. Register the authentication module in your `app.module.ts`

Configure the authentication module by providing your user service and setting up authentication options.

**_NOTE:_** All available configuration options can be found in the [AuthOptions](#authoptions) interface documentation.

```typescript
import { Module } from "@nestjs/common";
import { AuthField, AuthMethod } from "@hichchi/nest-connector/auth";
import { HichchiAuthModule } from "@hichchi/nest-auth";
import { UserModule } from "./user/user.module";

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
    ),
  ],
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
  secretOrKey: "your-secret-key",
};

// Manual usage to extract token from request
function extractTokenFromCookies(request: Request): string | null {
  return cookieExtractor(request);
}

// Example in a custom strategy
@Injectable()
export class CustomJwtStrategy extends PassportStrategy(
  Strategy,
  "custom-jwt",
) {
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
  host: "localhost",
  port: 6379,
  prefix: "auth-cache",
};

try {
  validateRedisOptions(redisConfig);
  console.log("Redis configuration is valid");
} catch (error) {
  console.error("Invalid Redis configuration:", error.message);
}

// Example with URL-based configuration
const redisUrlConfig: RedisOptions = {
  url: "redis://localhost:6379",
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
  secret: "your-access-token-secret",
  expiresIn: 3600, // 1 hour
  refreshSecret: "your-refresh-token-secret",
  refreshExpiresIn: 604800, // 7 days
};

try {
  validateJwtOptions(jwtConfig);
  console.log("JWT configuration is valid");
} catch (error) {
  console.error("Invalid JWT configuration:", error.message);
}

// Example usage in module configuration
@Module({
  imports: [
    HichchiAuthModule.register(
      {
        /* user service config */
      },
      {
        jwt: jwtConfig, // This will be validated internally
        // other auth options...
      },
    ),
  ],
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
  async getUserByEmail(email: string) {
    /* implementation */
  }
  async getUserByUsername(username: string) {
    /* implementation */
  }
  async getUserById(id: string) {
    /* implementation */
  }
  async signUpUser(userDto: any) {
    /* implementation */
  }
  async updateUserById(id: string, userDto: any) {
    /* implementation */
  }
}

// Validate the user service against auth configuration
const authOptions: AuthOptions = {
  authField: AuthField.EMAIL,
  jwt: {
    /* jwt config */
  },
  googleAuth: {
    /* google config */
  },
};

const userService = new UserService();

try {
  validateUserServiceProvider(userService, authOptions);
  console.log("User service implements all required methods");
} catch (error) {
  console.error("User service validation failed:", error.message);
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
  id: "user-123",
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  roles: ["user"],
  sessions: [
    {
      sessionId: "session-456",
      accessToken: "jwt-access-token-here",
      refreshToken: "jwt-refresh-token-here",
    },
  ],
};

// Generate AuthUser from cache and token
try {
  const authUser: AuthUser = generateAuthUser(
    cacheUser,
    "jwt-access-token-here",
  );

  console.log("Generated AuthUser:", {
    id: authUser.id,
    fullName: authUser.fullName, // 'John Doe' - automatically generated
    email: authUser.email,
    sessionId: authUser.sessionId,
    accessToken: authUser.accessToken,
    refreshToken: authUser.refreshToken,
  });
} catch (error) {
  console.error("Failed to generate AuthUser:", error.message);
}

// Example usage in a custom authentication service
@Injectable()
export class CustomAuthService {
  constructor(private cacheService: UserCacheService) {}

  async getAuthenticatedUser(accessToken: string): Promise<AuthUser> {
    // Get user from cache (implementation depends on your cache strategy)
    const cacheUser = await this.cacheService.getUserByToken(accessToken);

    if (!cacheUser) {
      throw new UnauthorizedException("User not found in cache");
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
  validationExceptionFactory?:
    | boolean
    | ((errors: ValidationError[]) => HttpException);

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

_Empowering secure applications with enterprise-grade authentication, JWT tokens, OAuth integration, and role-based access control_

</div>

---

# 📖 API Documentation

Complete technical reference for all classes, interfaces, methods, and types in this library.

**Auto-generated by TypeDoc** - Browse through detailed API references, code examples, and implementation guides below.

<!-- TypeDoc generated documentation will be appended below this point -->

---

## 📋 API Table of Contents

- [Classes](#classes)
  - [AuthController](#authcontroller)
  - [AuthService](#authservice)
  - [EmailVerifyDto](#emailverifydto)
  - [GetAuthResponseDto](#getauthresponsedto)
  - [GoogleAuthGuard](#googleauthguard-1)
  - [GoogleStrategy](#googlestrategy)
  - [HichchiAuthModule](#hichchiauthmodule)
  - [JwtAuthGuard](#jwtauthguard-1)
  - [JwtStrategy](#jwtstrategy)
  - [JwtTokenService](#jwttokenservice)
  - [LocalAuthGuard](#localauthguard-1)
  - [LocalStrategy](#localstrategy)
  - [OverrideSignUpDtoPipe](#overridesignupdtopipe)
  - [PermissionGuard](#permissionguard)
  - [RefreshTokenDto](#refreshtokendto)
  - [RequestResetDto](#requestresetdto)
  - [ResendEmailVerifyDto](#resendemailverifydto)
  - [ResetPasswordDto](#resetpassworddto)
  - [ResetPasswordTokenVerifyDto](#resetpasswordtokenverifydto)
  - [RoleGuard](#roleguard)
  - [SignInDto](#signindto)
  - [SignUpDto](#signupdto)
  - [UpdatePasswordDto](#updatepassworddto)
  - [UserCacheService](#usercacheservice)
  - [ViewUserDto](#viewuserdto)
- [Functions](#functions)
  - [AuthInfo()](#authinfo-1)
  - [cookieExtractor()](#cookieextractor-1)
  - [CurrentUser()](#currentuser-1)
  - [Permission()](#permission-1)
  - [Roles()](#roles-1)
  - [SocketId()](#socketid-1)
  - [Subdomain()](#subdomain-1)
- [Interfaces](#interfaces)
  - [AuthOptions](#authoptions)
  - [AuthUser](#authuser)
  - [CacheUser](#cacheuser)
  - [CookiesOptions](#cookiesoptions)
  - [GoogleAuthOptions](#googleauthoptions)
  - [IJwtPayload](#ijwtpayload)
  - [IUserService](#iuserservice)
  - [JwtOptions](#jwtoptions)
  - [UserExtra](#userextra)
  - [UserServiceActions](#userserviceactions)
  - [UserServiceEvents](#userserviceevents)
  - [UserServiceExistingProvider](#userserviceexistingprovider)
  - [UserServiceFactoryProvider](#userservicefactoryprovider)
- [Type Aliases](#type-aliases)
  - [UserServiceProvider](#userserviceprovider)
- [Variables](#variables)
  - [ACCESS_TOKEN_COOKIE_NAME](#access_token_cookie_name)
  - [AUTH_OPTIONS](#auth_options)
  - [EMAIL_KEY](#email_key)
  - [PERMISSION_KEY](#permission_key)
  - [REFRESH_TOKEN_COOKIE_NAME](#refresh_token_cookie_name)
  - [ROLES_KEY](#roles_key)
  - [USER_SERVICE](#user_service)
  - [USERNAME_KEY](#username_key)

## Classes

### AuthController

Defined in: [libs/nest-auth/src/controllers/auth.controller.ts:63](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/controllers/auth.controller.ts#L63)

Authentication controller that handles all authentication-related endpoints.

This controller provides endpoints for user sign up, authentication, password management,
email verification, and social authentication.

The default endpoint path is 'auth' but can be customized by extending this class:

#### Example

```typescript
@Controller("custom-auth")
export class CustomAuthController extends AuthController {
  // Override existing methods or add new ones

  @Get("custom-endpoint")
  async customEndpoint() {
    return "Custom endpoint";
  }
}
```

#### See

- Endpoint.AUTH - The default endpoint path constant used for this controller.
- Endpoint - Contains all available endpoints for this module.

#### Constructors

##### Constructor

```ts
new AuthController(options, authService): AuthController;
```

Defined in: [libs/nest-auth/src/controllers/auth.controller.ts:74](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/controllers/auth.controller.ts#L74)

Creates an instance of AuthController.

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

`options`

</td>
<td>

[`AuthOptions`](#authoptions)

</td>
<td>

The authentication options injected from `AUTH_OPTIONS` token

</td>
</tr>
<tr>
<td>

`authService`

</td>
<td>

[`AuthService`](#authservice)

</td>
<td>

The authentication service

</td>
</tr>
</tbody>
</table>

###### Returns

[`AuthController`](#authcontroller)

###### See

- [AUTH_OPTIONS](#auth_options) Token used to inject authentication options
- [AuthOptions](#authoptions) Interface defining authentication configuration
- [AuthService](#authservice) Service handling authentication logic

#### Methods

##### changePassword()

```ts
changePassword(
   request,
   authUser,
updatePasswordDto): Promise<User<string, string>>;
```

Defined in: [libs/nest-auth/src/controllers/auth.controller.ts:461](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/controllers/auth.controller.ts#L461)

Changes the password for the currently authenticated user.

This endpoint allows an authenticated user to change their password.
It requires both the current password and the new password.

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

`request`

</td>
<td>

`Request`

</td>
<td>

The Express request object

</td>
</tr>
<tr>
<td>

`authUser`

</td>
<td>

[`AuthUser`](#authuser)

</td>
<td>

The authenticated user information (provided by JwtAuthGuard)

</td>
</tr>
<tr>
<td>

`updatePasswordDto`

</td>
<td>

[`UpdatePasswordDto`](#updatepassworddto)

</td>
<td>

DTO containing the current and new passwords

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`User`<`string`, `string`>>

The updated user information

###### Example

```typescript
// Client-side example
const response = await fetch("/auth/change-password", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer your-jwt-token",
  },
  body: JSON.stringify({
    currentPassword: "current-password",
    newPassword: "new-password",
  }),
});
```

```json
// result:
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "isVerified": true,
  "signUpType": "local"
}
```

###### See

- AuthEndpoint.CHANGE_PASSWORD - The specific endpoint path segment for changing user passwords.
- AuthEndpoint - Enum containing all authentication-specific endpoint paths.
- Endpoint.AUTH - The default endpoint path constant used for this controller.

##### getAuthResponse()

```ts
getAuthResponse(
   request,
   response,
getAuthResponseDto): Promise<AuthResponse>;
```

Defined in: [libs/nest-auth/src/controllers/auth.controller.ts:324](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/controllers/auth.controller.ts#L324)

Gets a complete authentication response using an existing access token.

This endpoint allows clients to retrieve a complete authentication response
using a previously issued JWT access token. It verifies the token,
retrieves the associated user information, generates new tokens,
and returns comprehensive authentication data.

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

`request`

</td>
<td>

`Request`

</td>
<td>

The Express request object

</td>
</tr>
<tr>
<td>

`response`

</td>
<td>

`Response`

</td>
<td>

The Express response object for setting cookies

</td>
</tr>
<tr>
<td>

`getAuthResponseDto`

</td>
<td>

[`GetAuthResponseDto`](#getauthresponsedto)

</td>
<td>

DTO containing the JWT access token

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`AuthResponse`>

Authentication response containing user info and tokens

###### Example

```typescript
// Client-side example - using a previously obtained JWT token
const response = await fetch("/auth/get-auth-response", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    accessToken: "previously-issued-jwt-token",
  }),
});
const authData = await response.json();
```

```json
// Result:
{
  "user": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "isVerified": true,
    "signUpType": "google"
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "accessTokenExpiresOn": "2025-06-24T15:12:45.123Z",
  "refreshTokenExpiresOn": "2025-07-24T10:12:45.123Z",
  "sessionId": "sess_abc123"
}
```

###### See

- AuthEndpoint.GET_AUTH_RESPONSE - The specific endpoint path segment for retrieving authentication data.
- AuthEndpoint - Enum containing all authentication-specific endpoint paths.
- Endpoint.AUTH - The default endpoint path constant used for this controller.

##### getCurrentUser()

```ts
getCurrentUser(request, authUser): Promise<User<string, string> | null>;
```

Defined in: [libs/nest-auth/src/controllers/auth.controller.ts:412](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/controllers/auth.controller.ts#L412)

Retrieves the currently authenticated user's information.

This endpoint returns the user information for the currently authenticated user.
It requires a valid JWT token and is protected by the JwtAuthGuard.

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

`request`

</td>
<td>

`Request`

</td>
<td>

The Express request object

</td>
</tr>
<tr>
<td>

`authUser`

</td>
<td>

[`AuthUser`](#authuser)

</td>
<td>

The authenticated user information (provided by JwtAuthGuard)

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`User`<`string`, `string`> | `null`>

The current user's information or null if not found

###### Example

```typescript
// Client-side example
const response = await fetch("/auth/me", {
  method: "GET",
  headers: {
    Authorization: "Bearer your-jwt-token",
  },
});
const user = await response.json();
```

```json
// result:
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "isVerified": true,
  "signUpType": "local"
}
```

###### See

- AuthEndpoint.ME - The specific endpoint path segment for retrieving current user information.
- AuthEndpoint - Enum containing all authentication-specific endpoint paths.
- Endpoint.AUTH - The default endpoint path constant used for this controller.

##### googleCallback()

```ts
googleCallback(
   response,
   authUser,
   state): void;
```

Defined in: [libs/nest-auth/src/controllers/auth.controller.ts:260](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/controllers/auth.controller.ts#L260)

Handles the callback from Google OAuth authentication.

This endpoint is called by Google after successful authentication.
It extracts the redirect URL from the state parameter and redirects the user
to that URL with the access token as a query parameter.

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

`response`

</td>
<td>

`Response`

</td>
<td>

The Express response object for redirection

</td>
</tr>
<tr>
<td>

`authUser`

</td>
<td>

[`AuthUser`](#authuser)

</td>
<td>

The authenticated user information (provided by GoogleAuthGuard)

</td>
</tr>
<tr>
<td>

`state`

</td>
<td>

`string`

</td>
<td>

JSON string containing the redirectUrl

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

This method doesn't return any content as it redirects to the client application

###### Throws

If there's an error processing the callback

###### Example

```typescript
// This endpoint is not called directly from client code
// It's called by Google's OAuth service after user authenticates
// The flow typically is:
// 1. User clicks "Sign In with Google" link (pointing to googleSignIn endpoint)
// 2. User authenticates on Google's site
// 3. Google redirects to this callback URL
// 4. This method redirects to the original application with the token
```

###### See

- AuthEndpoint.GOOGLE_CALLBACK - The specific endpoint path segment for Google OAuth callback processing.
- AuthEndpoint - Enum containing all authentication-specific endpoint paths.
- Endpoint.AUTH - The default endpoint path constant used for this controller.

##### googleSignIn()

```ts
googleSignIn(_redirectUrl): Promise<void>;
```

Defined in: [libs/nest-auth/src/controllers/auth.controller.ts:223](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/controllers/auth.controller.ts#L223)

Initiates Google OAuth sign-in flow.

This endpoint redirects the user to Google's authentication page.
The redirectUrl query parameter is used to determine where to redirect after successful authentication.

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

`_redirectUrl`

</td>
<td>

`string`

</td>
<td>

The URL to redirect to after successful authentication

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`void`>

This method doesn't return any content as it redirects to Google

###### Example

```typescript
// Client-side example - typically used as a link in your frontend
<a href="/auth/google-sign-in?redirectUrl=http://your-app.com/dashboard">
    Sign in with Google
</a>
```

Note: Recommended approach is to use a browser popup or new tab to call this API instead of a full page redirect.
This allows smoother handling of the authentication flow and makes it easier to capture the callback response,
especially in single-page applications (SPAs) or when working with cross-origin redirects.

###### See

- AuthEndpoint.GOOGLE_SIGN_IN - The specific endpoint path segment for initiating Google OAuth flow.
- AuthEndpoint - Enum containing all authentication-specific endpoint paths.
- Endpoint.AUTH - The default endpoint path constant used for this controller.

##### refreshTokens()

```ts
refreshTokens(
   request,
   refreshTokenDto,
response): Promise<TokenResponse>;
```

Defined in: [libs/nest-auth/src/controllers/auth.controller.ts:363](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/controllers/auth.controller.ts#L363)

Refreshes the authentication tokens using a refresh token.

This endpoint allows clients to obtain new access and refresh tokens
when their current access token expires, without requiring the user to log in again.

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

`request`

</td>
<td>

`Request`

</td>
<td>

The Express request object

</td>
</tr>
<tr>
<td>

`refreshTokenDto`

</td>
<td>

[`RefreshTokenDto`](#refreshtokendto)

</td>
<td>

DTO containing the refresh token

</td>
</tr>
<tr>
<td>

`response`

</td>
<td>

`Response`

</td>
<td>

The Express response object for setting cookies

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`TokenResponse`>

New access and refresh tokens

###### Example

```typescript
// Client-side example
const response = await fetch("/auth/refresh-token", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    refreshToken: "your-refresh-token",
  }),
});
const tokens = await response.json();
// tokens contains new accessToken and refreshToken
```

###### See

- AuthEndpoint.REFRESH_TOKEN - The specific endpoint path segment for token refreshing.
- AuthEndpoint - Enum containing all authentication-specific endpoint paths.
- Endpoint.AUTH - The default endpoint path constant used for this controller.

##### requestPasswordReset()

```ts
requestPasswordReset(request, requestResetDto): Promise<SuccessResponse>;
```

Defined in: [libs/nest-auth/src/controllers/auth.controller.ts:599](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/controllers/auth.controller.ts#L599)

Initiates the password reset process for a user.

This endpoint allows users to request a password reset by providing their email address.
If the email exists in the system, a password reset link will be sent to that email.

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

`request`

</td>
<td>

`Request`

</td>
<td>

The Express request object

</td>
</tr>
<tr>
<td>

`requestResetDto`

</td>
<td>

[`RequestResetDto`](#requestresetdto)

</td>
<td>

DTO containing the email address

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`SuccessResponse`>

Success response indicating the reset email was sent

###### Example

```typescript
// Client-side example
const response = await fetch("/auth/request-password-reset", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    email: "user@example.com",
  }),
});
const result = await response.json();
```

```json
// result:
{
  "statusCode": 200,
  "code": "AUTH_200_PASSWORD_RESET_EMAIL_SENT",
  "message": "Password reset email sent successfully"
}
```

###### See

- AuthEndpoint.REQUEST_PASSWORD_RESET - The specific endpoint path segment for requesting password resets.
- AuthEndpoint - Enum containing all authentication-specific endpoint paths.
- Endpoint.AUTH - The default endpoint path constant used for this controller.

##### resendEmailVerification()

```ts
resendEmailVerification(request, resendEmailVerifyDto): Promise<SuccessResponse>;
```

Defined in: [libs/nest-auth/src/controllers/auth.controller.ts:507](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/controllers/auth.controller.ts#L507)

Resends the email verification link to the user.

This endpoint allows users to request a new email verification link
if they didn't receive the original one or if it expired.

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

`request`

</td>
<td>

`Request`

</td>
<td>

The Express request object

</td>
</tr>
<tr>
<td>

`resendEmailVerifyDto`

</td>
<td>

[`ResendEmailVerifyDto`](#resendemailverifydto)

</td>
<td>

DTO containing the email address

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`SuccessResponse`>

Success response indicating the email was sent

###### Example

```typescript
// Client-side example
const response = await fetch("/auth/resend-email-verification", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    email: "user@example.com",
  }),
});
const result = await response.json();
```

```json
// result:
{
  "statusCode": 200,
  "code": "AUTH_200_EMAIL_VERIFICATION_SENT",
  "message": "Verification email sent successfully"
}
```

###### See

- AuthEndpoint.RESEND_EMAIL_VERIFICATION - The specific endpoint path segment for resending verification emails.
- AuthEndpoint - Enum containing all authentication-specific endpoint paths.
- Endpoint.AUTH - The default endpoint path constant used for this controller.

##### resetPassword()

```ts
resetPassword(request, resetPasswordDto): Promise<SuccessResponse>;
```

Defined in: [libs/nest-auth/src/controllers/auth.controller.ts:687](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/controllers/auth.controller.ts#L687)

Resets a user's password using a valid reset token.

This endpoint allows users to set a new password after verifying their reset token.
It should be called after the token has been verified using the verifyResetPasswordToken endpoint.

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

`request`

</td>
<td>

`Request`

</td>
<td>

The Express request object

</td>
</tr>
<tr>
<td>

`resetPasswordDto`

</td>
<td>

[`ResetPasswordDto`](#resetpassworddto)

</td>
<td>

DTO containing the reset token and new password

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`SuccessResponse`>

Success response indicating the password was reset

###### Example

```typescript
// Client-side example
const response = await fetch("/auth/reset-password", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    token: "reset-token-from-email",
    password: "new-password",
  }),
});
const result = await response.json();
```

```json
// result:
{
  "statusCode": 200,
  "code": "AUTH_200_PASSWORD_RESET_SUCCESS",
  "message": "Password reset successfully"
}
```

###### See

- AuthEndpoint.RESET_PASSWORD - The specific endpoint path segment for setting a new password after reset.
- AuthEndpoint - Enum containing all authentication-specific endpoint paths.
- Endpoint.AUTH - The default endpoint path constant used for this controller.

##### signIn()

```ts
signIn(
   request,
   authUser,
   _signInDto,
response): Promise<AuthResponse>;
```

Defined in: [libs/nest-auth/src/controllers/auth.controller.ts:186](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/controllers/auth.controller.ts#L186)

Authenticates a user with email/username and password.

This endpoint handles user sign in using local authentication strategy.
It sets authentication cookies and returns user information with tokens.

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

`request`

</td>
<td>

`Request`

</td>
<td>

The Express request object

</td>
</tr>
<tr>
<td>

`authUser`

</td>
<td>

[`AuthUser`](#authuser)

</td>
<td>

The authenticated user information (provided by LocalAuthGuard)

</td>
</tr>
<tr>
<td>

`_signInDto`

</td>
<td>

[`SignInDto`](#signindto)

</td>
<td>

The sign in credentials (not used directly as LocalAuthGuard handles validation)

</td>
</tr>
<tr>
<td>

`response`

</td>
<td>

`Response`

</td>
<td>

The Express response object for setting cookies

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`AuthResponse`>

Authentication response containing user info and tokens

###### Example

```typescript
// Client-side example
const response = await fetch("/auth/sign-in", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    email: "user@example.com",
    password: "password123",
  }),
});
const authData = await response.json();
```

```json
// Result:
{
  "user": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "isVerified": true,
    "signUpType": "local"
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "accessTokenExpiresOn": "2025-06-24T15:12:45.123Z",
  "refreshTokenExpiresOn": "2025-07-24T10:12:45.123Z",
  "sessionId": "sess_abc123"
}
```

###### See

- AuthEndpoint.SIGN_IN - The specific endpoint path segment for user authentication.
- AuthEndpoint - Enum containing all authentication-specific endpoint paths.
- Endpoint.AUTH - The default endpoint path constant used for this controller.

##### signOut()

```ts
signOut(
   request,
   authUser,
response): Promise<SuccessResponse>;
```

Defined in: [libs/nest-auth/src/controllers/auth.controller.ts:735](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/controllers/auth.controller.ts#L735)

Signs out the currently authenticated user.

This endpoint invalidates the user's authentication tokens and clears authentication cookies.
It requires a valid JWT token and is protected by the JwtAuthGuard.

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

`request`

</td>
<td>

`Request`

</td>
<td>

The Express request object

</td>
</tr>
<tr>
<td>

`authUser`

</td>
<td>

[`AuthUser`](#authuser)

</td>
<td>

The authenticated user information (provided by JwtAuthGuard)

</td>
</tr>
<tr>
<td>

`response`

</td>
<td>

`Response`

</td>
<td>

The Express response object for clearing cookies

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`SuccessResponse`>

Success response indicating the user was signed out

###### Example

```typescript
// Client-side example
const response = await fetch("/auth/sign-out", {
  method: "POST",
  headers: {
    Authorization: "Bearer your-jwt-token",
  },
});
const result = await response.json();

// After this, the client should clear any stored tokens and redirect to the sign in page
localStorage.removeItem("accessToken");
localStorage.removeItem("refreshToken");
window.location.href = "/sign-in";
```

```json
// result
{
  "statusCode": HttpSuccessStatus.OK,
  "code": AuthSuccessResponseCode.AUTH_200_SIGNED_OUT,
  "message": "Signed out successfully",
}
```

###### See

- AuthEndpoint.SIGN_OUT - The specific endpoint path segment for user logout and token invalidation.
- AuthEndpoint - Enum containing all authentication-specific endpoint paths.
- Endpoint.AUTH - The default endpoint path constant used for this controller.

##### signUp()

```ts
signUp(request, dto): Promise<User<string, string>>;
```

Defined in: [libs/nest-auth/src/controllers/auth.controller.ts:127](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/controllers/auth.controller.ts#L127)

Sign up a new user with the provided sign-up data.

This endpoint creates a new user account with the provided sign up data.
If sign up is disabled in the auth options, it will throw a ForbiddenException.

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

`request`

</td>
<td>

`Request`

</td>
<td>

The Express request object

</td>
</tr>
<tr>
<td>

`dto`

</td>
<td>

`SignUpBody`

</td>
<td>

The sign-up data transfer object containing user sign up information

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`User`<`string`, `string`>>

The newly created user

###### Throws

If sign up is disabled

###### Example

```typescript
// Client-side example
const response = await fetch("/auth/sign-up", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    email: "user@example.com",
    password: "password123",
    firstName: "John",
    lastName: "Doe",
  }),
});
const user = await response.json();
```

```json
// Result:
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "isVerified": true,
  "signUpType": "local",
  "createdAt": "2025-06-24T10:12:45.123Z",
  "updatedAt": "2025-06-24T11:30:15.456Z"
}
```

###### See

- AuthEndpoint.SIGN_UP - The specific endpoint path segment for user registration.
- AuthEndpoint - Enum containing all authentication-specific endpoint paths.
- Endpoint.AUTH - The default endpoint path constant used for this controller.

##### verifyEmail()

```ts
verifyEmail(
   request,
   response,
emailVerifyDto): Promise<void>;
```

Defined in: [libs/nest-auth/src/controllers/auth.controller.ts:545](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/controllers/auth.controller.ts#L545)

Verifies a user's email address using the verification token.

This endpoint is accessed via a link sent to the user's email.
It verifies the token and redirects the user to a configured URL
with a query parameter indicating whether verification was successful.

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

`request`

</td>
<td>

`Request`

</td>
<td>

The Express request object

</td>
</tr>
<tr>
<td>

`response`

</td>
<td>

`Response`

</td>
<td>

The Express response object for redirection

</td>
</tr>
<tr>
<td>

`emailVerifyDto`

</td>
<td>

[`EmailVerifyDto`](#emailverifydto)

</td>
<td>

DTO containing the verification token

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`void`>

This method doesn't return any content as it redirects to the configured URL

###### Example

```html
This endpoint is typically accessed via a link in an email:

<a href="https://your-api.com/auth/verify-email?token=verification-token">
  Verify Email
</a>

The user will be redirected to the configured URL:
https://your-app.com/email-verification?verified=true
```

###### See

- AuthEndpoint.VERIFY_EMAIL - The specific endpoint path segment for email verification processing.
- AuthEndpoint - Enum containing all authentication-specific endpoint paths.
- Endpoint.AUTH - The default endpoint path constant used for this controller.

##### verifyResetPasswordToken()

```ts
verifyResetPasswordToken(request, verifyDto): Promise<SuccessResponse>;
```

Defined in: [libs/nest-auth/src/controllers/auth.controller.ts:641](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/controllers/auth.controller.ts#L641)

Verifies a password reset token.

This endpoint allows clients to verify if a password reset token is valid
before showing the password reset form to the user.

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

`request`

</td>
<td>

`Request`

</td>
<td>

The Express request object

</td>
</tr>
<tr>
<td>

`verifyDto`

</td>
<td>

[`ResetPasswordTokenVerifyDto`](#resetpasswordtokenverifydto)

</td>
<td>

DTO containing the reset token

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`SuccessResponse`>

Success response indicating if the token is valid

###### Example

```typescript
// Client-side example
const response = await fetch("/auth/reset-password-verify", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    token: "reset-token-from-email",
  }),
});
const result = await response.json();
```

```json
// result:
{
  "statusCode": 200,
  "code": "AUTH_200_PASSWORD_RESET_TOKEN_VALID",
  "message": "Password reset token is valid"
}
```

###### See

- AuthEndpoint.RESET_PASSWORD_VERIFY - The specific endpoint path segment for verifying password reset tokens.
- AuthEndpoint - Enum containing all authentication-specific endpoint paths.
- Endpoint.AUTH - The default endpoint path constant used for this controller.

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

<a id="property-authservice"></a> `authService`

</td>
<td>

`readonly`

</td>
<td>

[`AuthService`](#authservice)

</td>
<td>

The authentication service

</td>
<td>

[libs/nest-auth/src/controllers/auth.controller.ts:76](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/controllers/auth.controller.ts#L76)

</td>
</tr>
</tbody>
</table>

---

### AuthService

Defined in: [libs/nest-auth/src/services/auth.service.ts:107](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/services/auth.service.ts#L107)

Core authentication service that provides comprehensive identity management functionality.

This service is responsible for handling all authentication-related operations within the application.
It works alongside the AuthController to provide a complete authentication solution. The service
delegates many operations to specialized services like JwtTokenService for token management,
UserCacheService for session management, and TokenVerifyService for verification tokens.

Key features include:

- User sign up and sign in with email/username and password
- JWT token generation, validation, and refresh
- Password management (change, reset, verify)
- Email verification workflow
- Social authentication (Google OAuth)
- Session management with multi-device support
- Token-based and cookie-based authentication modes

The service is designed to be flexible and configurable through the AuthOptions injection token,
allowing applications to customize authentication behaviors. It also integrates with a user service
provided by the application through the USER_SERVICE injection token, which handles user data storage.

Security features include:

- Secure password hashing with bcrypt
- Cryptographically secure token generation
- Token expiration and refresh mechanisms
- Protection against common authentication vulnerabilities

#### Example

```typescript
// In a controller
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("sign-up")
  async signUp(@Req() request: Request, @Body() signUpDto: SignUpDto) {
    return this.authService.signUp(request, signUpDto);
  }
}
```

#### See

- [AuthController](#authcontroller) The controller that exposes authentication endpoints using this service
- [JwtTokenService](#jwttokenservice) Service responsible for JWT token operations
- [UserCacheService](#usercacheservice) Service that manages user session caching
- TokenVerifyService Service that handles verification tokens
- [AuthOptions](#authoptions) Configuration options for authentication behavior
- [IUserService](#iuserservice) Interface that user services must implement

#### Constructors

##### Constructor

```ts
new AuthService(
   options,
   userService,
   jwtTokenService,
   cacheService,
   tokenVerifyService): AuthService;
```

Defined in: [libs/nest-auth/src/services/auth.service.ts:117](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/services/auth.service.ts#L117)

Creates an instance of AuthService.

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

`options`

</td>
<td>

[`AuthOptions`](#authoptions)

</td>
<td>

The authentication options injected from `AUTH_OPTIONS` token

</td>
</tr>
<tr>
<td>

`userService`

</td>
<td>

[`IUserService`](#iuserservice)

</td>
<td>

The user service injected from `USER_SERVICE` token

</td>
</tr>
<tr>
<td>

`jwtTokenService`

</td>
<td>

[`JwtTokenService`](#jwttokenservice)

</td>
<td>

The JWT token service for token operations

</td>
</tr>
<tr>
<td>

`cacheService`

</td>
<td>

[`UserCacheService`](#usercacheservice)

</td>
<td>

The user cache service for storing user sessions

</td>
</tr>
<tr>
<td>

`tokenVerifyService`

</td>
<td>

`TokenVerifyService`

</td>
<td>

The token verification service for email and password reset tokens

</td>
</tr>
</tbody>
</table>

###### Returns

[`AuthService`](#authservice)

#### Methods

##### authenticate()

```ts
authenticate(
   request,
   username,
   password,
subdomain?): Promise<AuthUser>;
```

Defined in: [libs/nest-auth/src/services/auth.service.ts:334](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/services/auth.service.ts#L334)

Authenticate a user with username/email and password

This method authenticates a user by verifying their credentials against the user service.
It supports authentication by either email or username, depending on the configured auth method.
If authentication is successful, it returns a authenticated user object that can be used to generate tokens.

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

`request`

</td>
<td>

`Request`

</td>
<td>

The Express request object

</td>
</tr>
<tr>
<td>

`username`

</td>
<td>

`string`

</td>
<td>

The username or email to authenticate

</td>
</tr>
<tr>
<td>

`password`

</td>
<td>

`string`

</td>
<td>

The password to verify

</td>
</tr>
<tr>
<td>

`subdomain?`

</td>
<td>

`string`

</td>
<td>

Optional subdomain for multi-tenant applications

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<[`AuthUser`](#authuser)>

A authenticated user object if authentication is successful

###### Throws

If the credentials are invalid

###### Throws

If the user is not verified and verification is required

###### Example

```typescript
// In a local strategy
async validate(request: Request, username: string, password: string): Promise<AuthUser> {
  try {
    return await this.authService
        .authenticate(request, username, password);
  } catch (error) {
    throw new UnauthorizedException('Invalid credentials');
  }
}
```

###### See

- [authenticateJWT](#authenticatejwt) Method for JWT-based authentication
- [authenticateGoogle](#authenticategoogle) Method for Google OAuth authentication
- [signIn](#signin-1) Method that completes the authentication process after validation
- [verifyHash](#verifyhash) Static method used to verify password hash
- [LocalStrategy](#localstrategy) Strategy that uses this method to authenticate users

##### authenticateGoogle()

```ts
authenticateGoogle(
   request,
   profile,
redirectUrl?): Promise<AuthUser>;
```

Defined in: [libs/nest-auth/src/services/auth.service.ts:530](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/services/auth.service.ts#L530)

Authenticate a user using Google

This method authenticates a user with their Google profile information.
If the user already exists (matched by email), it will authenticate them.
If the user doesn't exist, it will sign up a new user with the Google profile data.
In both cases, it generates authentication tokens and creates a user session.

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

`request`

</td>
<td>

`Request`

</td>
<td>

The Express request object

</td>
</tr>
<tr>
<td>

`profile`

</td>
<td>

`GoogleProfile`

</td>
<td>

The Google profile information containing user details

</td>
</tr>
<tr>
<td>

`redirectUrl?`

</td>
<td>

`string`

</td>
<td>

Optional URL to redirect after authentication

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<[`AuthUser`](#authuser)>

A authenticated user object if authentication is successful

###### Throws

If the user service doesn't implement required methods

###### Throws

If sign up fails

###### Example

```typescript
// In a Google strategy
async validate(request: Request, accessToken: string, refreshToken: string, profile: GoogleProfile): Promise<AuthUser> {
  try {
    return await this.authService.authenticateGoogle(
      request,
      {
        email: profile.emails[0].value,
        given_name: profile.name.givenName,
        family_name: profile.name.familyName
      },
      request.query.redirectUrl as string
    );
  } catch (error) {
    throw new UnauthorizedException('Google authentication failed');
  }
}
```

###### See

- GoogleProfile Interface representing Google user profile data
- [GoogleStrategy](#googlestrategy) Strategy that uses this method for authentication
- AuthProvider.GOOGLE Enum value indicating Google authentication
- [authenticate](#authenticate) Method for username/password authentication
- [authenticateJWT](#authenticatejwt) Method for JWT authentication
- [signUp](#signup-1) Method used to create new users during Google authentication
- [generateTokens](#generatetokens) Method used to create tokens for the authenticated user

##### authenticateJWT()

```ts
authenticateJWT(
   request,
   payload,
   accessToken,
_subdomain?): Promise<AuthUser>;
```

Defined in: [libs/nest-auth/src/services/auth.service.ts:440](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/services/auth.service.ts#L440)

Authenticate a user using JWT

This method verifies a JWT access token and retrieves the associated user from the cache.
It checks that the token is valid and that the user has an active session with this token.
If successful, it returns a authenticated user object that can be used for authenticated operations.

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

`request`

</td>
<td>

`Request`

</td>
<td>

The Express request object

</td>
</tr>
<tr>
<td>

`payload`

</td>
<td>

[`IJwtPayload`](#ijwtpayload)

</td>
<td>

The decoded JWT payload containing the user ID

</td>
</tr>
<tr>
<td>

`accessToken`

</td>
<td>

`AccessToken`

</td>
<td>

The JWT access token to verify

</td>
</tr>
<tr>
<td>

`_subdomain?`

</td>
<td>

`string`

</td>
<td>

Optional subdomain for multi-tenant applications (not used)

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<[`AuthUser`](#authuser)>

A authenticated user object if authentication is successful

###### Throws

If the token is invalid, expired, or the user session doesn't exist

###### Example

```typescript
// In a JWT strategy
async validate(request: Request, payload: IJwtPayload): Promise<AuthUser> {
  try {
    const accessToken = ExtractJwt.fromAuthHeaderAsBearerToken()(request);
    return await this.authService.authenticateJWT(
      request,
      payload,
      accessToken
    );
  } catch (error) {
    throw new UnauthorizedException('Invalid token');
  }
}
```

###### See

- [IJwtPayload](#ijwtpayload) Interface representing the payload structure of a JWT token
- [AuthUser](#authuser) Interface representing a fully authenticated user with tokens
- [JwtStrategy](#jwtstrategy) Strategy that uses this method to authenticate users
- [JwtTokenService.verifyAccessToken](#verifyaccesstoken) Method used to verify the access token
- AccessToken Type representing JWT access tokens
- [authenticate](#authenticate) Method for username/password authentication
- [authenticateGoogle](#authenticategoogle) Method for Google OAuth authentication
- [refreshTokens](#refreshtokens-1) Method to renew expired tokens

##### changePassword()

```ts
changePassword(
   request,
   authUser,
updatePasswordDto): Promise<User<string, string>>;
```

Defined in: [libs/nest-auth/src/services/auth.service.ts:1201](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/services/auth.service.ts#L1201)

Change the password for an authenticated user

This method allows an authenticated user to change their password.
It verifies the user exists, checks that the old password is correct,
hashes the new password, updates the user record, and triggers the
onChangePassword callback if provided.

This method only works for users with local authentication (users with a password).

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

`request`

</td>
<td>

`Request`

</td>
<td>

The Express request object

</td>
</tr>
<tr>
<td>

`authUser`

</td>
<td>

[`AuthUser`](#authuser)

</td>
<td>

The authenticated user object containing the user ID

</td>
</tr>
<tr>
<td>

`updatePasswordDto`

</td>
<td>

[`UpdatePasswordDto`](#updatepassworddto)

</td>
<td>

DTO containing the old and new passwords

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`User`<`string`, `string`>>

The updated user with password removed

###### Throws

If the user doesn't exist

###### Throws

If the old password is incorrect

###### Throws

If the user doesn't have local authentication

###### Example

```typescript
// In a controller with JwtAuthGuard
@UseGuards(JwtAuthGuard)
@Post('change-password')
async changePassword(
  @Req() req: Request,
  @CurrentUser() authUser: AuthUser,
  @Body() updatePasswordDto: UpdatePasswordDto
) {
  return this.authService.changePassword(req, authUser, updatePasswordDto);
}
```

###### See

- [verifyHash](#verifyhash) Method used to verify the old password
- [generateHash](#generatehash) Method used to hash the new password
- updateUserById Method used to update the user record
- onChangePassword Optional callback triggered after password change
- [UpdatePasswordDto](#updatepassworddto) DTO containing the old and new password fields

##### generateTokens()

```ts
generateTokens(user): TokenResponse;
```

Defined in: [libs/nest-auth/src/services/auth.service.ts:774](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/services/auth.service.ts#L774)

Generate access and refresh tokens for a user

This method creates a new pair of JWT tokens (access token and refresh token)
for the specified user. It creates a payload containing the user ID,
signs it using the configured JWT secrets, and returns both tokens along
with their expiration dates.

The access token is used for authenticating API requests, while the refresh token
is used to obtain a new access token when the current one expires.

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

`user`

</td>
<td>

`User`

</td>
<td>

The user to generate tokens for

</td>
</tr>
</tbody>
</table>

###### Returns

`TokenResponse`

Object containing the access token, refresh token, and their expiration dates

###### Example

```typescript
// Generate tokens for a user
const user = await userService.getUserById(
  "123e4567-e89b-12d3-a456-426614174000",
);
const tokens = authService.generateTokens(user);

// tokens contains:
// {
//   accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
//   refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
//   accessTokenExpiresOn: Date,
//   refreshTokenExpiresOn: Date
// }
```

###### See

- TokenResponse Interface that defines the structure of the token response
- [JwtTokenService.createToken](#createtoken) Method used to create the access token
- [JwtTokenService.createRefreshToken](#createrefreshtoken) Method used to create the refresh token
- [JwtTokenService.getTokenExpiresOn](#gettokenexpireson) Method used to calculate token expiration
- [IJwtPayload](#ijwtpayload) Interface representing the payload structure of JWT tokens
- [refreshTokens](#refreshtokens-1) Method to refresh tokens when they expire

##### getAuthResponse()

```ts
getAuthResponse(
   request,
   accessToken,
res): Promise<AuthResponse>;
```

Defined in: [libs/nest-auth/src/services/auth.service.ts:611](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/services/auth.service.ts#L611)

Get authentication response using an existing token

This method retrieves a complete authentication response using a previously issued JWT token.
It verifies the token, retrieves the user, generates new authentication tokens, and creates
a user session. It returns comprehensive authentication data including tokens and user information.

This is useful for clients that need to exchange an existing token for a complete authentication response.

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

`request`

</td>
<td>

`Request`

</td>
<td>

The Express request object

</td>
</tr>
<tr>
<td>

`accessToken`

</td>
<td>

`AccessToken`

</td>
<td>

A valid JWT access token previously issued by this system

</td>
</tr>
<tr>
<td>

`res`

</td>
<td>

`Response`

</td>
<td>

The Express response object for setting cookies

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`AuthResponse`>

Authentication response containing user info and tokens

###### Throws

If the token is invalid or the user doesn't exist

###### Example

```typescript
// In a controller
@Post('get-auth-response')
async getAuthResponse(
  @Req() req: Request,
  @Res({ passthrough: true }) res: Response,
  @Body() body: { accessToken: string }
): Promise<AuthResponse> {
  return this.authService.getAuthResponse(req, body.accessToken, res);
}
```

###### See

- AuthResponse Interface representing complete authentication data
- [JwtTokenService.verifyAccessToken](#verifyaccesstoken) Method used to verify the token
- [getUserByToken](#getuserbytoken) Method to get user information from a token
- [generateTokens](#generatetokens) Method used to create new tokens
- [signIn](#signin-1) Method called to complete the authentication process
- [AuthController.getAuthResponse](#getauthresponse) Controller endpoint that uses this method

##### getCurrentUser()

```ts
getCurrentUser(request, authUser): Promise<User<string, string> | null>;
```

Defined in: [libs/nest-auth/src/services/auth.service.ts:1070](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/services/auth.service.ts#L1070)

Get the current authenticated user's information

This method retrieves the full user information for the currently authenticated user.
It uses the authenticated user's ID to fetch the complete user record from the database,
removes the password field for security, and triggers the onGetCurrentUser callback
if provided.

This is typically used in endpoints that need to return the user's profile information.

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

`request`

</td>
<td>

`Request`

</td>
<td>

The Express request object

</td>
</tr>
<tr>
<td>

`authUser`

</td>
<td>

[`AuthUser`](#authuser)

</td>
<td>

The authenticated user object containing the user ID

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`User`<`string`, `string`> | `null`>

The user information with password removed

###### Throws

If the user doesn't exist

###### Example

```typescript
// In a controller with JwtAuthGuard
@UseGuards(JwtAuthGuard)
@Get('me')
async getProfile(@Req() req: Request, @CurrentUser() authUser: AuthUser) {
  return this.authService.getCurrentUser(req, authUser);
}
```

##### getUserByToken()

Get a user by token

This method retrieves a user by their JWT token (either access or refresh token).
It verifies the token, extracts the user ID from the payload, and fetches the user
from the database. It also triggers the onGetUserByToken callback if provided.

###### Param

The Express request object

###### Param

The JWT token (access or refresh)

###### Param

Flag indicating if this is a refresh token

###### Throws

If token verification fails (caught internally and returns null)

###### See

- verifyAccessToken Method used to verify access tokens
- verifyRefreshToken Method used to verify refresh tokens
- getUserById Method used to retrieve the user
- onGetUserByToken Optional callback for token retrieval
- AccessToken Type representing JWT access tokens
- RefreshToken Type representing JWT refresh tokens

###### Call Signature

```ts
getUserByToken(request, token): Promise<User<string, string> | null>;
```

Defined in: [libs/nest-auth/src/services/auth.service.ts:654](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/services/auth.service.ts#L654)

Get a user by access token

This overload retrieves a user by their access token. It verifies the token,
extracts the user ID from the payload, and fetches the user from the database.

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

`request`

</td>
<td>

`Request`

</td>
<td>

The Express request object

</td>
</tr>
<tr>
<td>

`token`

</td>
<td>

`AccessToken`

</td>
<td>

The JWT access token

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`User`<`string`, `string`> | `null`>

The user if found and token is valid, null otherwise

###### Example

```typescript
// Get user from an access token
const accessToken = req.headers.authorization?.split(" ")[1];
const user = await authService.getUserByToken(req, accessToken);
if (user) {
  // User is authenticated
}
```

###### See

- AccessToken Type representing JWT access tokens
- [JwtTokenService.verifyAccessToken](#verifyaccesstoken) Method used to verify the token
- User Interface representing user information
- [refreshTokens](#refreshtokens-1) Method to refresh tokens when they expire
- [authenticateJWT](#authenticatejwt) Method for JWT-based authentication

###### Call Signature

```ts
getUserByToken(
   request,
   token,
refresh): Promise<User<string, string> | null>;
```

Defined in: [libs/nest-auth/src/services/auth.service.ts:683](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/services/auth.service.ts#L683)

Get a user by refresh token

This overload retrieves a user by their refresh token. It verifies the token,
extracts the user ID from the payload, and fetches the user from the database.

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

`request`

</td>
<td>

`Request`

</td>
<td>

The Express request object

</td>
</tr>
<tr>
<td>

`token`

</td>
<td>

`RefreshToken`

</td>
<td>

The JWT refresh token

</td>
</tr>
<tr>
<td>

`refresh`

</td>
<td>

`true`

</td>
<td>

Flag indicating this is a refresh token

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`User`<`string`, `string`> | `null`>

The user if found and token is valid, null otherwise

###### Example

```typescript
// Get user from a refresh token
const refreshToken = req.cookies.refreshToken;
const user = await authService.getUserByToken(req, refreshToken, true);
if (user) {
  // User's refresh token is valid
}
```

###### See

- RefreshToken Type representing JWT refresh tokens
- [JwtTokenService.verifyRefreshToken](#verifyrefreshtoken) Method used to verify the refresh token
- User Interface representing user information
- [refreshTokens](#refreshtokens-1) Method to create new tokens using a refresh token
- [REFRESH_TOKEN_COOKIE_NAME](#refresh_token_cookie_name) Constant for the refresh token cookie name

##### refreshTokens()

```ts
refreshTokens(
   request,
   token,
response): Promise<TokenResponse>;
```

Defined in: [libs/nest-auth/src/services/auth.service.ts:1131](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/services/auth.service.ts#L1131)

Refresh authentication tokens using a refresh token

This method allows clients to obtain new access and refresh tokens when their
current access token expires, without requiring the user to log in again.
It verifies the refresh token, retrieves the user, generates new tokens,
updates the user's session in the cache, and sets new authentication cookies
if cookie-based authentication is enabled.

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

`request`

</td>
<td>

`Request`

</td>
<td>

The Express request object

</td>
</tr>
<tr>
<td>

`token`

</td>
<td>

`RefreshToken`

</td>
<td>

The refresh token to use for generating new tokens

</td>
</tr>
<tr>
<td>

`response`

</td>
<td>

`Response`

</td>
<td>

The Express response object for setting cookies

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`TokenResponse`>

New access and refresh tokens with expiration dates

###### Throws

If the refresh token is invalid, expired, or the user doesn't exist

###### Example

```typescript
// In a controller
@Post('refresh-token')
async refreshToken(
  @Req() req: Request,
  @Body() body: { refreshToken: string },
  @Res({ passthrough: true }) res: Response
) {
  try {
    const tokens = await this.authService.refreshTokens(
      req,
      body.refreshToken,
      res
    );
    return tokens;
  } catch (error) {
    throw new UnauthorizedException('Invalid refresh token');
  }
}
```

##### requestPasswordReset()

```ts
requestPasswordReset(request, requestResetDto): Promise<SuccessResponse>;
```

Defined in: [libs/nest-auth/src/services/auth.service.ts:1455](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/services/auth.service.ts#L1455)

Request a password reset email

This method initiates the password reset process for a user. It checks if the user
exists, generates a password reset token, stores it in the cache, and sends a
password reset email to the user. The token is used to verify the user's identity
when they attempt to reset their password.

This method requires that the user service implements getUserByEmail and sendPasswordResetEmail methods.

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

`request`

</td>
<td>

`Request`

</td>
<td>

The Express request object

</td>
</tr>
<tr>
<td>

`requestResetDto`

</td>
<td>

[`RequestResetDto`](#requestresetdto)

</td>
<td>

DTO containing the email address

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`SuccessResponse`>

Success response indicating the reset email was sent

###### Throws

If the user service doesn't implement required methods or the email doesn't exist

###### Throws

If there's an error generating the token or sending the email

###### Example

```typescript
// In a controller
@Post('forgot-password')
async forgotPassword(
  @Req() req: Request,
  @Body() requestResetDto: RequestResetDto
) {
  return this.authService.requestPasswordReset(req, requestResetDto);
}
```

###### See

- [generateVerifyToken](#generateverifytoken) Static method used to generate the reset token
- savePasswordResetToken Method used to store the token in cache
- getUserByEmail Method used to get user by email
- sendPasswordResetEmail Method that sends the reset email
- onRequestPasswordReset Optional callback triggered after request
- [verifyResetPasswordToken](#verifyresetpasswordtoken-1) Method used to verify the token before password reset
- [resetPassword](#resetpassword-1) Method used to perform the actual password reset
- [RequestResetDto](#requestresetdto) DTO containing the email field
- SuccessResponseDto Response object returned on success

##### resendEmailVerification()

```ts
resendEmailVerification(request, resendEmailVerifyDto): Promise<SuccessResponse>;
```

Defined in: [libs/nest-auth/src/services/auth.service.ts:1324](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/services/auth.service.ts#L1324)

Resend a verification email to a user

This method allows users to request a new email verification link if they
didn't receive the original one or if it expired. It checks if the user exists,
verifies that their email is not already verified, generates a new verification token,
and sends a new verification email.

This method requires that the user service implements getUserByEmail and sendVerificationEmail methods.

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

`request`

</td>
<td>

`Request`

</td>
<td>

The Express request object

</td>
</tr>
<tr>
<td>

`resendEmailVerifyDto`

</td>
<td>

[`ResendEmailVerifyDto`](#resendemailverifydto)

</td>
<td>

DTO containing the email address

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`SuccessResponse`>

Success response indicating the email was sent

###### Throws

If the user service doesn't implement required methods or the email doesn't exist

###### Throws

If the email is already verified

###### Throws

If there's an error sending the email

###### Example

```typescript
// In a controller
@Post('resend-verification')
async resendVerification(
  @Req() req: Request,
  @Body() resendDto: ResendEmailVerifyDto
) {
  return this.authService.resendEmailVerification(req, resendDto);
}
```

###### See

- [sendVerificationEmail](#sendverificationemail) Method used to send the verification email
- getUserByEmail Method used to get the user by email
- onResendVerificationEmail Optional callback triggered after email is sent
- [ResendEmailVerifyDto](#resendemailverifydto) DTO containing the email field
- SuccessResponseDto Response object returned on success
- AuthErrors.AUTH_400_EMAIL_ALREADY_VERIFIED Error thrown if email is already verified
- AuthErrors.AUTH_404_EMAIL Error thrown if email doesn't exist

##### resetPassword()

```ts
resetPassword(request, resetPasswordDto): Promise<SuccessResponse>;
```

Defined in: [libs/nest-auth/src/services/auth.service.ts:1601](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/services/auth.service.ts#L1601)

Reset a user's password using a reset token

This method allows users to set a new password after verifying their identity
with a password reset token. It verifies the token, updates the user's password
with the new hashed password, clears the reset token from the cache, and triggers
the onResetPassword callback if provided.

This method should be called after the token has been verified using the
verifyResetPasswordToken method.

This method requires that the user service implements getUserByEmail and sendPasswordResetEmail methods.

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

`request`

</td>
<td>

`Request`

</td>
<td>

The Express request object

</td>
</tr>
<tr>
<td>

`resetPasswordDto`

</td>
<td>

[`ResetPasswordDto`](#resetpassworddto)

</td>
<td>

DTO containing the reset token and new password

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`SuccessResponse`>

Success response indicating the password was reset

###### Throws

If the user service doesn't implement required methods, the token is invalid, or the user doesn't exist

###### Throws

If there's an error resetting the password

###### Example

```typescript
// In a controller
@Post('reset-password')
async resetPassword(
  @Req() req: Request,
  @Body() resetPasswordDto: ResetPasswordDto
) {
  try {
    return await this.authService.resetPassword(req, resetPasswordDto);
    // If successful, redirect to sign in page
  } catch (error) {
    // If token is invalid or expired, show an error message
    throw new BadRequestException('Password reset failed');
  }
}
```

###### See

- getUserIdByPasswordResetToken Method used to validate the token
- clearPasswordResetTokenByUserId Method used to clear the token
- [generateHash](#generatehash) Static method used to hash the new password
- updateUserById Method used to update the user's password
- onResetPassword Optional callback triggered after password reset
- [verifyResetPasswordToken](#verifyresetpasswordtoken-1) Method used to verify the token before password reset
- [requestPasswordReset](#requestpasswordreset-1) Method used to generate and send the reset token
- [ResetPasswordDto](#resetpassworddto) DTO containing the reset token and new password
- AuthErrors.AUTH_401_EXPIRED_OR_INVALID_PASSWORD_RESET_TOKEN Error thrown if token is invalid
- AuthErrors.AUTH_500_PASSWORD_RESET Error thrown if password reset fails

##### sendVerificationEmail()

```ts
sendVerificationEmail(user): Promise<void>;
```

Defined in: [libs/nest-auth/src/services/auth.service.ts:1270](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/services/auth.service.ts#L1270)

Send an email verification link to a user

This method generates a verification token, stores it in the cache,
and sends a verification email to the user. The token is used to verify
the user's email address when they click the link in the email.

This method requires that the user service implements the sendVerificationEmail method.

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

`user`

</td>
<td>

`User`

</td>
<td>

The user to send the verification email to

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`void`>

###### Throws

If the user service doesn't implement sendVerificationEmail

###### Throws

If there's an error generating the token or sending the email

###### Example

```typescript
// During user sign up
async signUp(signUpDto: SignUpDto) {
  const user = await this.userService.create(signUpDto);
  await this.authService.sendVerificationEmail(user);
  return { message: 'User signed up. Please check your email to verify your account.' };
}
```

###### See

- [generateVerifyToken](#generateverifytoken) Static method used to generate the verification token
- saveEmailVerifyToken Method used to store the token in cache
- [sendVerificationEmail](#sendverificationemail) Method that sends the verification email
- [verifyEmail](#verifyemail-1) Method used to verify the email when user clicks the link
- Errors.ERROR_404_NOT_IMPLEMENTED Error thrown when the service is not implemented

##### setAuthCookies()

```ts
setAuthCookies(response, tokenResponse): void;
```

Defined in: [libs/nest-auth/src/services/auth.service.ts:907](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/services/auth.service.ts#L907)

Set authentication cookies in the response

This method sets HTTP cookies for both the access token and refresh token
in the response object. It only sets cookies if the authentication method
is configured to use cookies (AuthMethod.COOKIE).

The cookies are configured with:

- Appropriate expiration times based on token lifetimes
- HTTP-only flag for security
- Same-site attribute as configured
- Secure flag as configured
- Signed flag to prevent tampering

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

`response`

</td>
<td>

`Response`

</td>
<td>

The Express response object to set cookies on

</td>
</tr>
<tr>
<td>

`tokenResponse`

</td>
<td>

`TokenResponse`

</td>
<td>

The token response containing access and refresh tokens

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### Example

```typescript
// In a controller or service
@Post('sign-in')
async signIn(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
  const user = await this.userService.validateUser(req.body.username, req.body.password);
  const tokens = this.authService.generateTokens(user);

  // Set cookies in the response
  this.authService.setAuthCookies(res, tokens);

  return { user, tokens };
}
```

###### See

- AuthMethod.COOKIE Authentication method using cookies
- TokenResponse Interface containing access and refresh tokens
- [ACCESS_TOKEN_COOKIE_NAME](#access_token_cookie_name) Constant for the access token cookie name
- [REFRESH_TOKEN_COOKIE_NAME](#refresh_token_cookie_name) Constant for the refresh token cookie name
- SECOND_IN_MS Constant for converting seconds to milliseconds
- [AuthOptions.cookies](#property-cookies) Configuration for cookie settings

##### signIn()

```ts
signIn(
   req,
   authUser,
res): Promise<AuthResponse>;
```

Defined in: [libs/nest-auth/src/services/auth.service.ts:1010](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/services/auth.service.ts#L1010)

Sign in a user and create an authenticated session

This method handles user sign in by creating an authenticated session for a authenticated user.
It verifies the user exists, sets authentication cookies if cookie-based authentication
is enabled, and triggers the onSignIn callback if provided.

The authenticated user is typically created by the authenticate, authenticateJWT, or authenticateGoogle
methods and contains the user's ID and tokens.

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

`req`

</td>
<td>

`Request`

</td>
<td>

The Express request object

</td>
</tr>
<tr>
<td>

`authUser`

</td>
<td>

[`AuthUser`](#authuser)

</td>
<td>

The authenticated user object containing user ID and tokens

</td>
</tr>
<tr>
<td>

`res`

</td>
<td>

`Response`

</td>
<td>

The Express response object for setting cookies

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`AuthResponse`>

Authentication response containing user info and tokens

###### Throws

If the user doesn't exist

###### Example

```typescript
// In a controller with LocalAuthGuard
@UseGuards(LocalAuthGuard)
@Post('sign-in')
async signIn(
  @Req() req: Request,
  @CurrentUser() authUser: AuthUser,
  @Res({ passthrough: true }) res: Response
) {
  return this.authService.signIn(req, authUser, res);
}
```

##### signOut()

```ts
signOut(
   request,
   authUser,
response): Promise<SuccessResponse>;
```

Defined in: [libs/nest-auth/src/services/auth.service.ts:1674](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/services/auth.service.ts#L1674)

Sign out a user and invalidate their session

This method handles user sign out by invalidating their authentication tokens and
clearing authentication cookies. It removes the user's current session from the cache,
or all sessions if this is the last active session. If cookie-based authentication is
enabled, it also clears the authentication cookies from the response.

The method also triggers the onSignOut callback if provided.

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

`request`

</td>
<td>

`Request`

</td>
<td>

The Express request object

</td>
</tr>
<tr>
<td>

`authUser`

</td>
<td>

[`AuthUser`](#authuser)

</td>
<td>

The authenticated user object containing the user ID and tokens

</td>
</tr>
<tr>
<td>

`response`

</td>
<td>

`Response`

</td>
<td>

The Express response object for clearing cookies

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`SuccessResponse`>

Success response indicating the user was signed out

###### Throws

If there's an error during the sign-out process

###### Example

```typescript
// In a controller with JwtAuthGuard
@UseGuards(JwtAuthGuard)
@Post('sign-out')
async signOut(
  @Req() req: Request,
  @CurrentUser() authUser: AuthUser,
  @Res({ passthrough: true }) res: Response
) {
  return this.authService.signOut(req, authUser, res);
}
```

###### See

- onSignOut Optional callback triggered after sign out
- [ACCESS_TOKEN_COOKIE_NAME](#access_token_cookie_name) Constant for the access token cookie name
- [REFRESH_TOKEN_COOKIE_NAME](#refresh_token_cookie_name) Constant for the refresh token cookie name
- AuthMethod.COOKIE Authentication method that uses cookies
- [JwtAuthGuard](#jwtauthguard) Guard that protects routes requiring authentication

##### signUp()

```ts
signUp(request, signUpDto): Promise<User<string, string>>;
```

Defined in: [libs/nest-auth/src/services/auth.service.ts:954](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/services/auth.service.ts#L954)

Sign up a new user

This method handles the sign up of a new user. It hashes the user's password,
creates a new user record via the user service, and sends a verification email
if email verification is enabled. It also triggers the onSignUp callback if provided.

Currently, this method only supports local sign up (SignUpType.LOCAL).

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

`request`

</td>
<td>

`Request`

</td>
<td>

The Express request object

</td>
</tr>
<tr>
<td>

`signUpDto`

</td>
<td>

[`SignUpDto`](#signupdto)

</td>
<td>

The sign up data containing user information and password

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`User`<`string`, `string`>>

The newly signed up user (with password removed)

###### Throws

If sign up fails or sending verification email fails

###### Example

```typescript
// In a controller
@Post('sign-up')
async signUp(@Req() req: Request, @Body() signUpDto: SignUpDto) {
  try {
    const user = await this.authService.signUp(req, signUpDto, SignUpType.LOCAL);
    return { success: true, user };
  } catch (error) {
    throw new BadRequestException('Sign up failed');
  }
}
```

##### updateCacheUser()

```ts
updateCacheUser(
   user,
   tokenResponse,
   oldRefreshToken?,
frontendUrl?): Promise<CacheUser>;
```

Defined in: [libs/nest-auth/src/services/auth.service.ts:827](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/services/auth.service.ts#L827)

Update the user session in cache

This method updates or creates a user's session information in the cache.
It stores the user data along with their active sessions, which include
access tokens, refresh tokens, and optional frontend URLs.

If an old refresh token is provided, it will remove the corresponding session
before adding the new one, effectively replacing the session.

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

`user`

</td>
<td>

`User`

</td>
<td>

The user to update in cache

</td>
</tr>
<tr>
<td>

`tokenResponse`

</td>
<td>

`TokenResponse`

</td>
<td>

The token response containing access and refresh tokens

</td>
</tr>
<tr>
<td>

`oldRefreshToken?`

</td>
<td>

`string`

</td>
<td>

Optional old refresh token to replace

</td>
</tr>
<tr>
<td>

`frontendUrl?`

</td>
<td>

`string`

</td>
<td>

Optional frontend URL associated with the session

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<[`CacheUser`](#cacheuser)>

The updated cache user object

###### Example

```typescript
// Update user session during sign in
const user = await userService.getUserById(
  "123e4567-e89b-12d3-a456-426614174000",
);
const tokens = authService.generateTokens(user);
const cacheUser = await authService.updateCacheUser(user, tokens);

// Replace an existing session during token refresh
const newTokens = authService.generateTokens(user);
const updatedCacheUser = await authService.updateCacheUser(
  user,
  newTokens,
  oldRefreshToken,
);
```

###### See

- [CacheUser](#cacheuser) Interface representing a user in the cache
- [UserCacheService.getUser](#getuser) Method to retrieve the current cache state
- [UserCacheService.setUser](#setuser) Method to store the updated cache state
- TokenResponse Interface containing access and refresh tokens
- generateAuthUser Utility function to create auth user from cache user

##### verifyEmail()

```ts
verifyEmail(request, emailVerifyDto): Promise<boolean>;
```

Defined in: [libs/nest-auth/src/services/auth.service.ts:1386](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/services/auth.service.ts#L1386)

Verify a user's email address using a verification token

This method verifies a user's email address by validating the provided token.
If the token is valid, it updates the user's emailVerified status to true,
clears the verification token from the cache, and triggers the onVerifyEmail
callback if provided.

This method requires that the user service implements the sendVerificationEmail method.

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

`request`

</td>
<td>

`Request`

</td>
<td>

The Express request object

</td>
</tr>
<tr>
<td>

`emailVerifyDto`

</td>
<td>

[`EmailVerifyDto`](#emailverifydto)

</td>
<td>

DTO containing the verification token

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`boolean`>

Success response indicating the email was verified

###### Throws

If the user service doesn't implement required methods or the token is invalid

###### Throws

If there's an error verifying the email

###### Example

```typescript
// In a controller
@Get('verify-email')
async verifyEmail(
  @Req() req: Request,
  @Query() emailVerifyDto: EmailVerifyDto
) {
  return this.authService.verifyEmail(req, emailVerifyDto);
}
```

###### See

- getUserIdByEmailVerifyToken Method used to validate the token
- clearEmailVerifyTokenByUserId Method used to clear the token
- updateUserById Method used to update the user's email verification status
- onVerifyEmail Optional callback triggered after email is verified
- [EmailVerifyDto](#emailverifydto) DTO containing the verification token
- [sendVerificationEmail](#sendverificationemail) Method used to send the verification email
- AuthErrors.AUTH_500_VERIFY_EMAIL Error thrown if verification fails

##### verifyResetPasswordToken()

```ts
verifyResetPasswordToken(request, verifyDto): Promise<SuccessResponse>;
```

Defined in: [libs/nest-auth/src/services/auth.service.ts:1535](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/services/auth.service.ts#L1535)

Verify a password reset token

This method verifies if a password reset token is valid. It checks if the token
exists in the cache and is associated with a user. If the token is valid, it
triggers the onVerifyResetPasswordToken callback if provided.

This method is typically used before showing the password reset form to the user,
to ensure that the token is valid.

This method requires that the user service implements getUserByEmail and sendPasswordResetEmail methods.

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

`request`

</td>
<td>

`Request`

</td>
<td>

The Express request object

</td>
</tr>
<tr>
<td>

`verifyDto`

</td>
<td>

[`ResetPasswordTokenVerifyDto`](#resetpasswordtokenverifydto)

</td>
<td>

DTO containing the reset token

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`SuccessResponse`>

Success response indicating if the token is valid

###### Throws

If the user service doesn't implement required methods or the token is invalid

###### Example

```typescript
// In a controller
@Post('verify-reset-token')
async verifyResetToken(
  @Req() req: Request,
  @Body() verifyDto: ResetPasswordTokenVerifyDto
) {
  try {
    return await this.authService.verifyResetPasswordToken(req, verifyDto);
    // If successful, show the password reset form
  } catch (error) {
    // If token is invalid, show an error message
    throw new BadRequestException('Invalid or expired token');
  }
}
```

###### See

- getUserIdByPasswordResetToken Method used to validate the token
- onVerifyResetPasswordToken Optional callback triggered after token verification
- [requestPasswordReset](#requestpasswordreset-1) Method used to generate and send the reset token
- [resetPassword](#resetpassword-1) Method used to perform the actual password reset
- [ResetPasswordTokenVerifyDto](#resetpasswordtokenverifydto) DTO containing the reset token
- AuthErrors.AUTH_401_EXPIRED_OR_INVALID_PASSWORD_RESET_TOKEN Error thrown if token is invalid

##### generateHash()

```ts
static generateHash(password): string;
```

Defined in: [libs/nest-auth/src/services/auth.service.ts:258](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/services/auth.service.ts#L258)

Generates a secure password hash using the bcrypt hashing algorithm.

This static method creates a cryptographically secure hash of a password using bcrypt,
which is designed specifically for password hashing with built-in salt generation.
The bcrypt algorithm is resistant to brute-force attacks due to its computationally
intensive nature and automatic salt handling.

Key security features:

- Automatically generates a random salt for each password
- Integrates the salt into the resulting hash string
- Uses a configurable number of rounds to adjust computational complexity
- Produces a self-contained hash string that includes algorithm information,
  cost factor, salt, and the actual hash

The resulting hash follows the format: $2b$rounds$saltActualHash

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

`password`

</td>
<td>

`string`

</td>
<td>

The plain text password to hash

</td>
</tr>
</tbody>
</table>

###### Returns

`string`

The complete bcrypt hash string (includes algorithm version, cost factor, salt, and hash)

###### Example

```typescript
// Hash a password
const hashedPassword = AuthService.generateHash("mySecurePassword123");
// Result: "$2b$10$X7Rw6.../K8fYtPO3Zg9O.zVSVu/n0MXFJSJPjYYkBCpIMT6s6Oy"

// Store the hashed password in your database
await userRepository.update(userId, { password: hashedPassword });
```

###### See

- hashSync The bcrypt function used for synchronous password hashing
- DEFAULT_SALT_ROUNDS Configuration constant for bcrypt cost factor
- [verifyHash](#verifyhash) Companion method for verifying passwords against hashes

##### generateRandomPassword()

```ts
static generateRandomPassword(length): string;
```

Defined in: [libs/nest-auth/src/services/auth.service.ts:193](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/services/auth.service.ts#L193)

Generates a cryptographically secure random password with strong complexity requirements.

This static method creates a random password that follows best practices for password security:

- Includes at least one uppercase letter (A-Z)
- Includes at least one lowercase letter (a-z)
- Includes at least one number (0-9)
- Includes at least one special character (!@#$%&\*)
- Characters are randomly shuffled to ensure unpredictability

The method uses the Node.js crypto module's randomInt function to ensure
cryptographic randomness. Each character category is guaranteed to be
represented in the password, and the final character ordering is randomized
to increase entropy.

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

`length`

</td>
<td>

`number`

</td>
<td>

The desired length of the password (minimum 4 to accommodate all required character types)

</td>
</tr>
</tbody>
</table>

###### Returns

`string`

A cryptographically secure random password meeting complexity requirements

###### Throws

Implicitly if length is less than 4, as the minimum requirements cannot be met

###### Example

```typescript
// Generate an 8-character password
const password = AuthService.generateRandomPassword(8);
// Example result: "a2B!x9Zk"

// Generate a longer password for higher security
const securePassword = AuthService.generateRandomPassword(16);
// Example result: "X7@bKp3qR!sT9zLm"
```

###### See

- randomInt Node.js crypto function used for generating secure random integers
- [generateHash](#generatehash) Method used to hash passwords after generation
- Math.random Used for shuffling the password characters

##### generateVerifyToken()

```ts
static generateVerifyToken(length?): VerifyToken;
```

Defined in: [libs/nest-auth/src/services/auth.service.ts:155](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/services/auth.service.ts#L155)

Generates a cryptographically secure random verification token for email verification or password reset.

This static method creates a random hexadecimal string using Node.js crypto module's
randomBytes function, ensuring high entropy and security for verification purposes.
The generated tokens are used for one-time verification operations such as confirming
email addresses or validating password reset requests.

The token length is configurable, with a default value defined by DEFAULT_VERIFY_TOKEN_LENGTH.
The actual string length will be twice the byte length since each byte is represented
by two hexadecimal characters.

###### Parameters

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

`length?`

</td>
<td>

`number`

</td>
<td>

`DEFAULT_VERIFY_TOKEN_LENGTH`

</td>
<td>

The length of the token in bytes (resulting hex string will be twice this length)

</td>
</tr>
</tbody>
</table>

###### Returns

`VerifyToken`

A cryptographically secure random hexadecimal string

###### Example

```typescript
// Generate a token with default length
const token = AuthService.generateVerifyToken();
// Result: "a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6"

// Generate a shorter token
const shortToken = AuthService.generateVerifyToken(8);
// Result: "a1b2c3d4e5f6a1b2"
```

###### See

- randomBytes Node.js crypto function used for generating random bytes
- DEFAULT_VERIFY_TOKEN_LENGTH Default length constant for verification tokens
- VerifyToken Type representing verification tokens

##### verifyHash()

```ts
static verifyHash(password, hash): boolean;
```

Defined in: [libs/nest-auth/src/services/auth.service.ts:296](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/services/auth.service.ts#L296)

Securely verifies a plain text password against a bcrypt hash.

This static method determines whether a provided password matches a previously
generated bcrypt hash. It uses bcrypt's compareSync function, which:

1. Extracts the salt from the hash string
2. Applies the same hashing algorithm with the extracted salt to the input password
3. Performs a time-constant comparison to prevent timing attacks

The verification is performed in a way that protects against timing attacks,
where an attacker could potentially derive information based on how long the
comparison takes. Bcrypt's implementation ensures that comparisons take the
same amount of time regardless of whether they match or not.

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

`password`

</td>
<td>

`string`

</td>
<td>

The plain text password to verify

</td>
</tr>
<tr>
<td>

`hash`

</td>
<td>

`string`

</td>
<td>

The bcrypt hash to compare against

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean`

True if the password matches the hash, false otherwise

###### Example

```typescript
// During sign in
const user = await userRepository.findByEmail(email);
if (user && AuthService.verifyHash(password, user.password)) {
  // Password is correct, proceed with authentication
  return generateAuthUser(user);
} else {
  // Invalid credentials
  throw new UnauthorizedException("Invalid email or password");
}
```

###### See

- compareSync The bcrypt function used for synchronous password verification
- [generateHash](#generatehash) Companion method for generating password hashes

---

### EmailVerifyDto

Defined in: [libs/nest-auth/src/dtos/email-verify.dto.ts:13](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/dtos/email-verify.dto.ts#L13)

Data Transfer Object for email verification.
This class is used to encapsulate the verification token sent to users
for confirming their email address after sign up.

Implements the EmailVerifyBody interface.

#### Implements

- `EmailVerifyBody`

#### Constructors

##### Constructor

```ts
new EmailVerifyDto(): EmailVerifyDto;
```

###### Returns

[`EmailVerifyDto`](#emailverifydto)

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

<a id="property-redirecturl"></a> `redirectUrl?`

</td>
<td>

`string`

</td>
<td>

The URL to redirect the user to after successful verification.

This field is optional but if provided, it must be a valid URL.
It's typically used to redirect users back to the application
after completing the email verification process.

</td>
<td>

[libs/nest-auth/src/dtos/email-verify.dto.ts:33](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/dtos/email-verify.dto.ts#L33)

</td>
</tr>
<tr>
<td>

<a id="property-token"></a> `token`

</td>
<td>

`VerifyToken`

</td>
<td>

The verification token sent to the user's email.

This token is used to verify the user's email address.
It must be a valid verification token and cannot be empty.

</td>
<td>

[libs/nest-auth/src/dtos/email-verify.dto.ts:22](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/dtos/email-verify.dto.ts#L22)

</td>
</tr>
</tbody>
</table>

---

### GetAuthResponseDto

Defined in: [libs/nest-auth/src/dtos/get-auth-response.dto.ts:12](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/dtos/get-auth-response.dto.ts#L12)

Data Transfer Object for getting a complete authentication response using an existing JWT token.

This class encapsulates the required properties for retrieving authentication data
using a previously issued access token. It implements the GetAuthResponseBody interface.

#### Implements

- `GetAuthResponseBody`

#### Constructors

##### Constructor

```ts
new GetAuthResponseDto(): GetAuthResponseDto;
```

###### Returns

[`GetAuthResponseDto`](#getauthresponsedto)

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

<a id="property-accesstoken"></a> `accessToken`

</td>
<td>

`AccessToken`

</td>
<td>

A valid JWT access token previously issued by this system.

This token will be verified, and if valid, will be used to retrieve
the associated user information and generate a complete authentication response.

</td>
<td>

[libs/nest-auth/src/dtos/get-auth-response.dto.ts:21](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/dtos/get-auth-response.dto.ts#L21)

</td>
</tr>
</tbody>
</table>

---

### GoogleAuthGuard

Defined in: [libs/nest-auth/src/guards/google-auth.guard.ts:46](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/guards/google-auth.guard.ts#L46)

Guard for Google OAuth authentication.

This guard extends Passport's AuthGuard for the Google strategy and handles
the OAuth authentication flow. It validates that Google authentication is properly
configured and manages the authentication process, including handling callbacks
from Google's OAuth service.

#### Example

```typescript
// In a controller
@UseGuards(GoogleAuthGuard)
@Get('google-sign-in')
googleSignIn() {
  // This route initiates Google OAuth authentication
}

@UseGuards(GoogleAuthGuard)
@Get('google-callback')
googleCallback() {
  // This route handles the callback from Google
}
```

#### Extends

- `IAuthGuard`

#### Constructors

##### Constructor

```ts
new GoogleAuthGuard(options): GoogleAuthGuard;
```

Defined in: [libs/nest-auth/src/guards/google-auth.guard.ts:52](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/guards/google-auth.guard.ts#L52)

Creates an instance of GoogleAuthGuard.

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

`options`

</td>
<td>

[`AuthOptions`](#authoptions)

</td>
<td>

The authentication options injected from `AUTH_OPTIONS` token

</td>
</tr>
</tbody>
</table>

###### Returns

[`GoogleAuthGuard`](#googleauthguard)

###### Overrides

```ts
AuthGuard(AuthStrategy.GOOGLE).constructor;
```

#### Methods

##### canActivate()

```ts
canActivate(context): boolean | Promise<boolean> | Observable<boolean>;
```

Defined in: [libs/nest-auth/src/guards/google-auth.guard.ts:70](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/guards/google-auth.guard.ts#L70)

Determines if the current request is allowed to proceed.

This method validates that Google authentication is properly configured,
checks for required query parameters, and handles the authentication process
using Passport's authenticate method.

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

`context`

</td>
<td>

`ExecutionContext`

</td>
<td>

The execution context

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean` | `Promise`<`boolean`> | `Observable`<`boolean`>

A boolean or a promise/observable that resolves to a boolean

###### Throws

If Google authentication is not properly configured

###### Throws

If redirectUrl is missing

###### Throws

If social sign in fails

###### Overrides

```ts
AuthGuard(AuthStrategy.GOOGLE).canActivate;
```

##### getAuthenticateOptions()

```ts
getAuthenticateOptions(context): IAuthModuleOptions | undefined;
```

Defined in: node_modules/@nestjs/passport/dist/auth.guard.d.ts:9

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

`context`

</td>
<td>

`ExecutionContext`

</td>
</tr>
</tbody>
</table>

###### Returns

`IAuthModuleOptions` | `undefined`

###### Inherited from

```ts
AuthGuard(AuthStrategy.GOOGLE).getAuthenticateOptions;
```

##### getRequest()

```ts
getRequest(context): any;
```

Defined in: node_modules/@nestjs/passport/dist/auth.guard.d.ts:10

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

`context`

</td>
<td>

`ExecutionContext`

</td>
</tr>
</tbody>
</table>

###### Returns

`any`

###### Inherited from

```ts
AuthGuard(AuthStrategy.GOOGLE).getRequest;
```

##### handleRequest()

```ts
handleRequest<TUser>(
   err,
   user,
   info,
   context,
   status?): TUser;
```

Defined in: node_modules/@nestjs/passport/dist/auth.guard.d.ts:8

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

`TUser`

</td>
<td>

`any`

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

`err`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`user`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`info`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`context`

</td>
<td>

`ExecutionContext`

</td>
</tr>
<tr>
<td>

`status?`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

###### Returns

`TUser`

###### Inherited from

```ts
AuthGuard(AuthStrategy.GOOGLE).handleRequest;
```

##### logIn()

```ts
logIn<TRequest>(request): Promise<void>;
```

Defined in: node_modules/@nestjs/passport/dist/auth.guard.d.ts:5

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

`TRequest` _extends_ `object`

</td>
<td>

`any`

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

`request`

</td>
<td>

`TRequest`

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`void`>

###### Inherited from

```ts
AuthGuard(AuthStrategy.GOOGLE).logIn;
```

##### \[hasInstance]\()

```ts
static hasInstance: boolean;
```

Defined in: node_modules/typescript/lib/lib.es2015.symbol.wellknown.d.ts:164

Determines whether the given value inherits from this function if this function was used
as a constructor function.

A constructor function can control which objects are recognized as its instances by
'instanceof' by overriding this method.

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

`any`

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean`

###### Inherited from

```ts
AuthGuard(AuthStrategy.GOOGLE).[hasInstance]
```

##### apply()

```ts
static apply(
   this,
   thisArg,
   argArray?): any;
```

Defined in: node_modules/typescript/lib/lib.es5.d.ts:281

Calls the function, substituting the specified object for the this value of the function, and the specified array for the arguments of the function.

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

`Function`

</td>
<td>

‐

</td>
</tr>
<tr>
<td>

`thisArg`

</td>
<td>

`any`

</td>
<td>

The object to be used as the this object.

</td>
</tr>
<tr>
<td>

`argArray?`

</td>
<td>

`any`

</td>
<td>

A set of arguments to be passed to the function.

</td>
</tr>
</tbody>
</table>

###### Returns

`any`

###### Inherited from

```ts
AuthGuard(AuthStrategy.GOOGLE).apply;
```

##### bind()

```ts
static bind(
   this,
   thisArg, ...
   argArray): any;
```

Defined in: node_modules/typescript/lib/lib.es5.d.ts:296

For a given function, creates a bound function that has the same body as the original function.
The this object of the bound function is associated with the specified object, and has the specified initial parameters.

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

`Function`

</td>
<td>

‐

</td>
</tr>
<tr>
<td>

`thisArg`

</td>
<td>

`any`

</td>
<td>

An object to which the this keyword can refer inside the new function.

</td>
</tr>
<tr>
<td>

...`argArray`

</td>
<td>

`any`\[]

</td>
<td>

A list of arguments to be passed to the new function.

</td>
</tr>
</tbody>
</table>

###### Returns

`any`

###### Inherited from

```ts
AuthGuard(AuthStrategy.GOOGLE).bind;
```

##### call()

```ts
static call(
   this,
   thisArg, ...
   argArray): any;
```

Defined in: node_modules/typescript/lib/lib.es5.d.ts:288

Calls a method of an object, substituting another object for the current object.

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

`Function`

</td>
<td>

‐

</td>
</tr>
<tr>
<td>

`thisArg`

</td>
<td>

`any`

</td>
<td>

The object to be used as the current object.

</td>
</tr>
<tr>
<td>

...`argArray`

</td>
<td>

`any`\[]

</td>
<td>

A list of arguments to be passed to the method.

</td>
</tr>
</tbody>
</table>

###### Returns

`any`

###### Inherited from

```ts
AuthGuard(AuthStrategy.GOOGLE).call;
```

##### toString()

```ts
static toString(): string;
```

Defined in: node_modules/typescript/lib/lib.es5.d.ts:299

Returns a string representation of a function.

###### Returns

`string`

###### Inherited from

```ts
AuthGuard(AuthStrategy.GOOGLE).toString;
```

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Modifier</th>
<th>Type</th>
<th>Description</th>
<th>Inherited from</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="property-options"></a> `options`

</td>
<td>

`readonly`

</td>
<td>

[`AuthOptions`](#authoptions)

</td>
<td>

The authentication options injected from `AUTH_OPTIONS` token

</td>
<td>

‐

</td>
<td>

[libs/nest-auth/src/guards/google-auth.guard.ts:52](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/guards/google-auth.guard.ts#L52)

</td>
</tr>
<tr>
<td>

<a id="property-arguments"></a> `arguments`

</td>
<td>

`static`

</td>
<td>

`any`

</td>
<td>

‐

</td>
<td>

```ts
AuthGuard(AuthStrategy.GOOGLE).arguments;
```

</td>
<td>

node_modules/typescript/lib/lib.es5.d.ts:305

</td>
</tr>
<tr>
<td>

<a id="property-caller"></a> `caller`

</td>
<td>

`static`

</td>
<td>

`Function`

</td>
<td>

‐

</td>
<td>

```ts
AuthGuard(AuthStrategy.GOOGLE).caller;
```

</td>
<td>

node_modules/typescript/lib/lib.es5.d.ts:306

</td>
</tr>
<tr>
<td>

<a id="property-length"></a> `length`

</td>
<td>

`readonly`

</td>
<td>

`number`

</td>
<td>

‐

</td>
<td>

```ts
AuthGuard(AuthStrategy.GOOGLE).length;
```

</td>
<td>

node_modules/typescript/lib/lib.es5.d.ts:302

</td>
</tr>
<tr>
<td>

<a id="property-name"></a> `name`

</td>
<td>

`readonly`

</td>
<td>

`string`

</td>
<td>

Returns the name of the function. Function names are read-only and can not be changed.

</td>
<td>

```ts
AuthGuard(AuthStrategy.GOOGLE).name;
```

</td>
<td>

node_modules/typescript/lib/lib.es2015.core.d.ts:97

</td>
</tr>
</tbody>
</table>

---

### GoogleStrategy

Defined in: [libs/nest-auth/src/strategies/google.strategy.ts:42](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/strategies/google.strategy.ts#L42)

Google OAuth2 authentication strategy

This strategy is used to authenticate users using their Google accounts.
It configures the OAuth2 client with the application's credentials and callback URL.

#### Example

```TypeScript
// In your module
@Module({
  imports: [PassportModule],
  providers: [GoogleStrategy],
})

// In your controller
@Get('google')
@UseGuards(AuthGuard(AuthStrategy.GOOGLE))
googleAuth() {
  // This route initiates the Google OAuth2 flow
}

@Get('google/callback')
@UseGuards(AuthGuard(AuthStrategy.GOOGLE))
googleAuthCallback(@CurrentUser() user: AuthUser) {
  return user;
}
```

#### Extends

- `Strategy`<`this`> & `PassportStrategyMixin`<`unknown`, `this`>

#### Constructors

##### Constructor

```ts
new GoogleStrategy(options, authService): GoogleStrategy;
```

Defined in: [libs/nest-auth/src/strategies/google.strategy.ts:43](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/strategies/google.strategy.ts#L43)

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

`options`

</td>
<td>

[`AuthOptions`](#authoptions)

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

[`GoogleStrategy`](#googlestrategy)

###### Overrides

```ts
PassportStrategy(Strategy, AuthStrategy.GOOGLE).constructor;
```

#### Methods

##### validate()

```ts
validate(
   request,
   _accessToken,
   _refreshToken,
   profile,
done): Promise<void>;
```

Defined in: [libs/nest-auth/src/strategies/google.strategy.ts:80](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/strategies/google.strategy.ts#L80)

Validate the Google profile

This method is called by Passport after the user has authenticated with Google.
It delegates the authentication to the AuthService.

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

`request`

</td>
<td>

`Request`

</td>
<td>

Request object

</td>
</tr>
<tr>
<td>

`_accessToken`

</td>
<td>

`AccessToken`

</td>
<td>

The access token provided by Google (unused)

</td>
</tr>
<tr>
<td>

`_refreshToken`

</td>
<td>

`RefreshToken`

</td>
<td>

The refresh token provided by Google (unused)

</td>
</tr>
<tr>
<td>

`profile`

</td>
<td>

`GoogleProfile`

</td>
<td>

The user's Google profile

</td>
</tr>
<tr>
<td>

`done`

</td>
<td>

`DoneCallback`

</td>
<td>

Passport callback to indicate success or failure

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`void`>

Nothing

###### Example

```TypeScript
// This method is called automatically by Passport
await googleStrategy.validate(
  'access-token',
  'refresh-token',
  { email: 'user@example.com', given_name: 'John', family_name: 'Doe' },
  (error, user) => { console.log('Callback executed') }
);
```

###### Overrides

```ts
PassportStrategy(Strategy, AuthStrategy.GOOGLE).validate;
```

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Modifier</th>
<th>Type</th>
<th>Inherited from</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="property-authenticate"></a> `authenticate`

</td>
<td>

`public`

</td>
<td>

(`req`, `options?`) => `void`

</td>
<td>

```ts
PassportStrategy(Strategy, AuthStrategy.GOOGLE).authenticate;
```

</td>
<td>

node_modules/@types/passport-google-oauth2/index.d.ts:53

</td>
</tr>
<tr>
<td>

<a id="property-name-1"></a> `name`

</td>
<td>

`public`

</td>
<td>

`string`

</td>
<td>

```ts
PassportStrategy(Strategy, AuthStrategy.GOOGLE).name;
```

</td>
<td>

node_modules/@types/passport-google-oauth2/index.d.ts:52

</td>
</tr>
<tr>
<td>

<a id="property-options-1"></a> `options`

</td>
<td>

`readonly`

</td>
<td>

[`AuthOptions`](#authoptions)

</td>
<td>

‐

</td>
<td>

[libs/nest-auth/src/strategies/google.strategy.ts:44](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/strategies/google.strategy.ts#L44)

</td>
</tr>
</tbody>
</table>

---

### HichchiAuthModule

Defined in: [libs/nest-auth/src/auth.module.ts:64](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/auth.module.ts#L64)

#### Constructors

##### Constructor

```ts
new HichchiAuthModule(userService, options): HichchiAuthModule;
```

Defined in: [libs/nest-auth/src/auth.module.ts:80](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/auth.module.ts#L80)

Creates an instance of HichchiAuthModule

The constructor validates that the provided user service implements all required methods
based on the authentication options.

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

`userService`

</td>
<td>

[`IUserService`](#iuserservice)

</td>
<td>

The user service injected from USER_SERVICE token

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

[`AuthOptions`](#authoptions)

</td>
<td>

The authentication options injected from AUTH_OPTIONS token

</td>
</tr>
</tbody>
</table>

###### Returns

[`HichchiAuthModule`](#hichchiauthmodule)

###### Throws

If the user service doesn't implement required methods

###### See

- [USER_SERVICE](#user_service) Token for injecting user service
- [AUTH_OPTIONS](#auth_options) Token for injecting authentication options
- validateUserServiceProvider Function that validates the user service implementation
- [IUserService](#iuserservice) Interface that user service implementations must implement

#### Methods

##### register()

```ts
static register(userServiceProvider, options): DynamicModule;
```

Defined in: [libs/nest-auth/src/auth.module.ts:147](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/auth.module.ts#L147)

Register the HichchiAuthModule

This method is used to register the `HichchiAuthModule` in your application.
It takes a user service provider and authentication options as arguments and returns a dynamic module.
The user service provider can be either `UserServiceFactoryProvider` or `UserServiceExistingProvider`.
The `UserService` used in the user service provider should implement the `IUserService` interface provided by the `@hichchi/nest-auth` package.

The authentication options include the redis, jwt, cookies, socket, authMethod, authField, disableSignUp, signUpDto, and viewDto.

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

`userServiceProvider`

</td>
<td>

[`UserServiceProvider`](#userserviceprovider)

</td>
<td>

The user service provider

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

[`AuthOptions`](#authoptions)

</td>
<td>

The authentication options

</td>
</tr>
</tbody>
</table>

###### Returns

`DynamicModule`

The dynamic module

###### Throws

If JWT options are missing or invalid

###### Throws

If Redis options are provided but invalid

###### Examples

```TypeScript
@Module({
    imports: [
        HichchiAuthModule.register(
            // Using UserServiceFactoryProvider
            {
                imports: [UserModule],
                useFactory: (userService: UserService) => userService,
                inject: [UserService],
            },
            { ... },
        ),
    ],
    controllers: [...],
    providers: [...],
})
export class AppModule {}
```

```TypeScript
@Module({
    imports: [
        HichchiAuthModule.register(
            // Using UserServiceExistingProvider
            {
                imports: [UserModule],
                useExisting: UserService,
            },
            { ... },
        ),
    ],
    controllers: [...],
    providers: [...],
})
export class AppModule {}

```

###### See

- [UserServiceProvider](#userserviceprovider) Interface for providing user service
- [UserServiceFactoryProvider](#userservicefactoryprovider) Provider using factory function
- [UserServiceExistingProvider](#userserviceexistingprovider) Provider using existing service
- validateJwtOptions Function that validates JWT options
- validateRedisOptions Function that validates Redis options
- validateUserServiceProvider Function that validates user service provider

---

### JwtAuthGuard

Defined in: [libs/nest-auth/src/guards/jwt-auth.guard.ts:38](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/guards/jwt-auth.guard.ts#L38)

Guard for JWT authentication.

This guard extends Passport's AuthGuard for the JWT strategy and handles
token-based authentication. It supports both cookie-based and header-based
authentication methods, and includes token refresh functionality.

When using cookie-based authentication, it will automatically refresh
expired access tokens using the refresh token if available.

#### Example

```typescript
// In a controller
@UseGuards(JwtAuthGuard)
@Get('profile')
getProfile(@CurrentUser() user: AuthUser) {
  return user;
}
```

#### Extends

- `IAuthGuard`

#### Constructors

##### Constructor

```ts
new JwtAuthGuard(
   options,
   authService,
   cacheService): JwtAuthGuard;
```

Defined in: [libs/nest-auth/src/guards/jwt-auth.guard.ts:46](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/guards/jwt-auth.guard.ts#L46)

Creates an instance of JwtAuthGuard.

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

`options`

</td>
<td>

[`AuthOptions`](#authoptions)

</td>
<td>

The authentication options injected from `AUTH_OPTIONS` token

</td>
</tr>
<tr>
<td>

`authService`

</td>
<td>

[`AuthService`](#authservice)

</td>
<td>

The authentication service for user verification

</td>
</tr>
<tr>
<td>

`cacheService`

</td>
<td>

[`UserCacheService`](#usercacheservice)

</td>
<td>

The cache service for storing user sessions

</td>
</tr>
</tbody>
</table>

###### Returns

[`JwtAuthGuard`](#jwtauthguard)

###### Overrides

```ts
AuthGuard(AuthStrategy.JWT).constructor;
```

#### Methods

##### activate()

```ts
activate(context): Promise<boolean>;
```

Defined in: [libs/nest-auth/src/guards/jwt-auth.guard.ts:154](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/guards/jwt-auth.guard.ts#L154)

Helper method to call the parent class's canActivate method.

This method is used internally by the canActivate method to delegate
the actual authentication to the parent AuthGuard class.

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

`context`

</td>
<td>

`ExecutionContext`

</td>
<td>

The execution context

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`boolean`>

A promise that resolves to true if the request is authorized

##### canActivate()

```ts
canActivate(context): Promise<boolean>;
```

Defined in: [libs/nest-auth/src/guards/jwt-auth.guard.ts:66](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/guards/jwt-auth.guard.ts#L66)

Determines if the current request is allowed to proceed.

This method extracts the JWT token from either cookies or the Authorization header,
validates it, and handles token refresh if needed. If the access token is expired
but a valid refresh token is available, it will generate new tokens.

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

`context`

</td>
<td>

`ExecutionContext`

</td>
<td>

The execution context

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`boolean`>

A promise that resolves to true if the request is authorized

###### Throws

If the user is not logged in or the token is invalid

###### Overrides

```ts
AuthGuard(AuthStrategy.JWT).canActivate;
```

##### getAuthenticateOptions()

```ts
getAuthenticateOptions(context): IAuthModuleOptions | undefined;
```

Defined in: node_modules/@nestjs/passport/dist/auth.guard.d.ts:9

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

`context`

</td>
<td>

`ExecutionContext`

</td>
</tr>
</tbody>
</table>

###### Returns

`IAuthModuleOptions` | `undefined`

###### Inherited from

```ts
AuthGuard(AuthStrategy.JWT).getAuthenticateOptions;
```

##### getRequest()

```ts
getRequest(context): any;
```

Defined in: node_modules/@nestjs/passport/dist/auth.guard.d.ts:10

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

`context`

</td>
<td>

`ExecutionContext`

</td>
</tr>
</tbody>
</table>

###### Returns

`any`

###### Inherited from

```ts
AuthGuard(AuthStrategy.JWT).getRequest;
```

##### handleRequest()

```ts
handleRequest(
   error,
   user,
   _info): any;
```

Defined in: [libs/nest-auth/src/guards/jwt-auth.guard.ts:173](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/guards/jwt-auth.guard.ts#L173)

Processes the authenticated user and handles errors.

This method is called after the JWT strategy has validated the token.
It handles any errors that occurred during validation and ensures
the user object is properly formatted before returning it.

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

`unknown`

</td>
<td>

Any error that occurred during authentication

</td>
</tr>
<tr>
<td>

`user`

</td>
<td>

`User`

</td>
<td>

The authenticated user

</td>
</tr>
<tr>
<td>

`_info`

</td>
<td>

`unknown`

</td>
<td>

Additional information (not used)

</td>
</tr>
</tbody>
</table>

###### Returns

`any`

The authenticated user with sensitive information removed

###### Throws

If authentication failed or no user was found

###### Overrides

```ts
AuthGuard(AuthStrategy.JWT).handleRequest;
```

##### logIn()

```ts
logIn<TRequest>(request): Promise<void>;
```

Defined in: node_modules/@nestjs/passport/dist/auth.guard.d.ts:5

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

`TRequest` _extends_ `object`

</td>
<td>

`any`

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

`request`

</td>
<td>

`TRequest`

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`void`>

###### Inherited from

```ts
AuthGuard(AuthStrategy.JWT).logIn;
```

##### \[hasInstance]\()

```ts
static hasInstance: boolean;
```

Defined in: node_modules/typescript/lib/lib.es2015.symbol.wellknown.d.ts:164

Determines whether the given value inherits from this function if this function was used
as a constructor function.

A constructor function can control which objects are recognized as its instances by
'instanceof' by overriding this method.

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

`any`

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean`

###### Inherited from

```ts
AuthGuard(AuthStrategy.JWT).[hasInstance]
```

##### apply()

```ts
static apply(
   this,
   thisArg,
   argArray?): any;
```

Defined in: node_modules/typescript/lib/lib.es5.d.ts:281

Calls the function, substituting the specified object for the this value of the function, and the specified array for the arguments of the function.

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

`Function`

</td>
<td>

‐

</td>
</tr>
<tr>
<td>

`thisArg`

</td>
<td>

`any`

</td>
<td>

The object to be used as the this object.

</td>
</tr>
<tr>
<td>

`argArray?`

</td>
<td>

`any`

</td>
<td>

A set of arguments to be passed to the function.

</td>
</tr>
</tbody>
</table>

###### Returns

`any`

###### Inherited from

```ts
AuthGuard(AuthStrategy.JWT).apply;
```

##### bind()

```ts
static bind(
   this,
   thisArg, ...
   argArray): any;
```

Defined in: node_modules/typescript/lib/lib.es5.d.ts:296

For a given function, creates a bound function that has the same body as the original function.
The this object of the bound function is associated with the specified object, and has the specified initial parameters.

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

`Function`

</td>
<td>

‐

</td>
</tr>
<tr>
<td>

`thisArg`

</td>
<td>

`any`

</td>
<td>

An object to which the this keyword can refer inside the new function.

</td>
</tr>
<tr>
<td>

...`argArray`

</td>
<td>

`any`\[]

</td>
<td>

A list of arguments to be passed to the new function.

</td>
</tr>
</tbody>
</table>

###### Returns

`any`

###### Inherited from

```ts
AuthGuard(AuthStrategy.JWT).bind;
```

##### call()

```ts
static call(
   this,
   thisArg, ...
   argArray): any;
```

Defined in: node_modules/typescript/lib/lib.es5.d.ts:288

Calls a method of an object, substituting another object for the current object.

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

`Function`

</td>
<td>

‐

</td>
</tr>
<tr>
<td>

`thisArg`

</td>
<td>

`any`

</td>
<td>

The object to be used as the current object.

</td>
</tr>
<tr>
<td>

...`argArray`

</td>
<td>

`any`\[]

</td>
<td>

A list of arguments to be passed to the method.

</td>
</tr>
</tbody>
</table>

###### Returns

`any`

###### Inherited from

```ts
AuthGuard(AuthStrategy.JWT).call;
```

##### toString()

```ts
static toString(): string;
```

Defined in: node_modules/typescript/lib/lib.es5.d.ts:299

Returns a string representation of a function.

###### Returns

`string`

###### Inherited from

```ts
AuthGuard(AuthStrategy.JWT).toString;
```

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Modifier</th>
<th>Type</th>
<th>Description</th>
<th>Inherited from</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="property-arguments-1"></a> `arguments`

</td>
<td>

`static`

</td>
<td>

`any`

</td>
<td>

‐

</td>
<td>

```ts
AuthGuard(AuthStrategy.JWT).arguments;
```

</td>
<td>

node_modules/typescript/lib/lib.es5.d.ts:305

</td>
</tr>
<tr>
<td>

<a id="property-caller-1"></a> `caller`

</td>
<td>

`static`

</td>
<td>

`Function`

</td>
<td>

‐

</td>
<td>

```ts
AuthGuard(AuthStrategy.JWT).caller;
```

</td>
<td>

node_modules/typescript/lib/lib.es5.d.ts:306

</td>
</tr>
<tr>
<td>

<a id="property-length-1"></a> `length`

</td>
<td>

`readonly`

</td>
<td>

`number`

</td>
<td>

‐

</td>
<td>

```ts
AuthGuard(AuthStrategy.JWT).length;
```

</td>
<td>

node_modules/typescript/lib/lib.es5.d.ts:302

</td>
</tr>
<tr>
<td>

<a id="property-name-2"></a> `name`

</td>
<td>

`readonly`

</td>
<td>

`string`

</td>
<td>

Returns the name of the function. Function names are read-only and can not be changed.

</td>
<td>

```ts
AuthGuard(AuthStrategy.JWT).name;
```

</td>
<td>

node_modules/typescript/lib/lib.es2015.core.d.ts:97

</td>
</tr>
</tbody>
</table>

---

### JwtStrategy

Defined in: [libs/nest-auth/src/strategies/jwt.strategy.ts:38](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/strategies/jwt.strategy.ts#L38)

JWT authentication strategy

This strategy is used to authenticate users using JWT tokens.
It extracts the token from either cookies or the Authorization header,
depending on the configuration.

#### Example

```TypeScript
// In your module
@Module({
  imports: [PassportModule],
  providers: [JwtStrategy],
})

// In your controller
@UseGuards(JwtAuthGuard)
@Get('profile')
getProfile(@CurrentUser() user: AuthUser) {
  return user;
}
```

#### Extends

- `Strategy`<`this`> & `PassportStrategyMixin`<`unknown`, `this`>

#### Constructors

##### Constructor

```ts
new JwtStrategy(options, authService): JwtStrategy;
```

Defined in: [libs/nest-auth/src/strategies/jwt.strategy.ts:39](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/strategies/jwt.strategy.ts#L39)

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

`options`

</td>
<td>

[`AuthOptions`](#authoptions)

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

[`JwtStrategy`](#jwtstrategy)

###### Overrides

```ts
PassportStrategy(Strategy, AuthStrategy.JWT).constructor;
```

#### Methods

##### authenticate()

```ts
authenticate(req, options?): void;
```

Defined in: node_modules/@types/passport-strategy/index.d.ts:20

Performs authentication for the request.
Note: Virtual function - re-implement in the strategy.

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

`req`

</td>
<td>

`Request`

</td>
<td>

The request to authenticate.

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

`any`

</td>
<td>

Options passed to the strategy.

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### Inherited from

```ts
PassportStrategy(Strategy, AuthStrategy.JWT).authenticate;
```

##### error()

```ts
error(err): void;
```

Defined in: node_modules/@types/passport-strategy/index.d.ts:90

Internal error while performing authentication.

Strategies should call this function when an internal error occurs
during the process of performing authentication; for example, if the
user directory is not available.

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

`err`

</td>
<td>

`Error`

</td>
<td>

‐

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### Api

public

###### Inherited from

```ts
PassportStrategy(Strategy, AuthStrategy.JWT).error;
```

##### fail()

###### Call Signature

```ts
fail(challenge, status): void;
```

Defined in: node_modules/@types/passport-strategy/index.d.ts:54

Fail authentication, with optional `challenge` and `status`, defaulting
to 401.

Strategies should call this function to fail an authentication attempt.

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

`challenge`

</td>
<td>

`any`

</td>
<td>

(Can also be an object with 'message' and 'type' fields).

</td>
</tr>
<tr>
<td>

`status`

</td>
<td>

`number`

</td>
<td>

‐

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### Api

public

###### Inherited from

```ts
PassportStrategy(Strategy, AuthStrategy.JWT).fail;
```

###### Call Signature

```ts
fail(status): void;
```

Defined in: node_modules/@types/passport-strategy/index.d.ts:55

Fail authentication, with optional `challenge` and `status`, defaulting
to 401.

Strategies should call this function to fail an authentication attempt.

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

`status`

</td>
<td>

`number`

</td>
<td>

‐

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### Api

public

###### Inherited from

```ts
PassportStrategy(Strategy, AuthStrategy.JWT).fail;
```

##### pass()

```ts
pass(): void;
```

Defined in: node_modules/@types/passport-strategy/index.d.ts:78

Pass without making a success or fail decision.

Under most circumstances, Strategies should not need to call this
function. It exists primarily to allow previous authentication state
to be restored, for example from an HTTP session.

###### Returns

`void`

###### Api

public

###### Inherited from

```ts
PassportStrategy(Strategy, AuthStrategy.JWT).pass;
```

##### redirect()

```ts
redirect(url, status?): void;
```

Defined in: node_modules/@types/passport-strategy/index.d.ts:67

Redirect to `url` with optional `status`, defaulting to 302.

Strategies should call this function to redirect the user (via their
user agent) to a third-party website for authentication.

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

`url`

</td>
<td>

`string`

</td>
<td>

‐

</td>
</tr>
<tr>
<td>

`status?`

</td>
<td>

`number`

</td>
<td>

‐

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### Api

public

###### Inherited from

```ts
PassportStrategy(Strategy, AuthStrategy.JWT).redirect;
```

##### success()

```ts
success(user, info?): void;
```

Defined in: node_modules/@types/passport-strategy/index.d.ts:42

Authenticate `user`, with optional `info`.

Strategies should call this function to successfully authenticate a
user. `user` should be an object supplied by the application after it
has been given an opportunity to verify credentials. `info` is an
optional argument containing additional user information. This is
useful for third-party authentication strategies to pass profile
details.

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

`user`

</td>
<td>

`any`

</td>
<td>

‐

</td>
</tr>
<tr>
<td>

`info?`

</td>
<td>

`any`

</td>
<td>

‐

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### Api

public

###### Inherited from

```ts
PassportStrategy(Strategy, AuthStrategy.JWT).success;
```

##### validate()

```ts
validate(request, jwtPayload): Promise<AuthUser>;
```

Defined in: [libs/nest-auth/src/strategies/jwt.strategy.ts:72](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/strategies/jwt.strategy.ts#L72)

Validate the JWT payload and extract the user

This method is called by Passport after the token has been verified.
It extracts the access token from the request and uses it to authenticate the user.

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

`request`

</td>
<td>

`RequestWithSubdomain`

</td>
<td>

The HTTP request object

</td>
</tr>
<tr>
<td>

`jwtPayload`

</td>
<td>

[`IJwtPayload`](#ijwtpayload)

</td>
<td>

The decoded JWT payload

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<[`AuthUser`](#authuser)>

The authenticated user

###### Throws

If the token is invalid or the user is not found

###### Example

```TypeScript
// This method is called automatically by Passport
const user = await jwtStrategy.validate(request, { sub: 'user-id' });
```

###### Overrides

```ts
PassportStrategy(Strategy, AuthStrategy.JWT).validate;
```

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Modifier</th>
<th>Type</th>
<th>Inherited from</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="property-name-3"></a> `name`

</td>
<td>

`public`

</td>
<td>

`string`

</td>
<td>

```ts
PassportStrategy(Strategy, AuthStrategy.JWT).name;
```

</td>
<td>

node_modules/@types/passport-jwt/index.d.ts:13

</td>
</tr>
<tr>
<td>

<a id="property-options-2"></a> `options`

</td>
<td>

`readonly`

</td>
<td>

[`AuthOptions`](#authoptions)

</td>
<td>

‐

</td>
<td>

[libs/nest-auth/src/strategies/jwt.strategy.ts:40](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/strategies/jwt.strategy.ts#L40)

</td>
</tr>
</tbody>
</table>

---

### JwtTokenService

Defined in: [libs/nest-auth/src/services/jwt-token.service.ts:21](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/services/jwt-token.service.ts#L21)

JWT Token Service

This service handles the creation and verification of JWT tokens for authentication.
It provides methods to create access tokens, refresh tokens, verify tokens, and get token expiration dates.

#### Example

```TypeScript
// Inject the service
constructor(private readonly jwtTokenService: JwtTokenService) {}
```

#### Constructors

##### Constructor

```ts
new JwtTokenService(options, jwtService): JwtTokenService;
```

Defined in: [libs/nest-auth/src/services/jwt-token.service.ts:28](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/services/jwt-token.service.ts#L28)

Creates an instance of JwtTokenService.

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

`options`

</td>
<td>

[`AuthOptions`](#authoptions)

</td>
<td>

The authentication options injected from AUTH_OPTIONS token

</td>
</tr>
<tr>
<td>

`jwtService`

</td>
<td>

`JwtService`

</td>
<td>

The NestJS JWT service for token operations

</td>
</tr>
</tbody>
</table>

###### Returns

[`JwtTokenService`](#jwttokenservice)

#### Methods

##### createRefreshToken()

```ts
createRefreshToken(payload): RefreshToken;
```

Defined in: [libs/nest-auth/src/services/jwt-token.service.ts:71](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/services/jwt-token.service.ts#L71)

Create a new JWT refresh token

This method creates a new JWT refresh token with the provided payload.
The token is signed using the application's refresh token secret and configured expiration time.
Refresh tokens typically have a longer lifetime than access tokens.

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

`payload`

</td>
<td>

[`IJwtPayload`](#ijwtpayload)

</td>
<td>

The payload to be signed, typically containing a user ID

</td>
</tr>
</tbody>
</table>

###### Returns

`RefreshToken`

A signed JWT refresh token

###### Example

```TypeScript
const refreshToken = jwtTokenService.createRefreshToken({ sub: '123e4567-e89b-12d3-a456-426614174000' });
// Result: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

##### createToken()

```ts
createToken(payload): AccessToken;
```

Defined in: [libs/nest-auth/src/services/jwt-token.service.ts:48](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/services/jwt-token.service.ts#L48)

Create a new JWT access token

This method creates a new JWT access token with the provided payload.
The token is signed using the application's JWT secret and configured expiration time.

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

`payload`

</td>
<td>

[`IJwtPayload`](#ijwtpayload)

</td>
<td>

The payload to be signed, typically containing a user ID

</td>
</tr>
</tbody>
</table>

###### Returns

`AccessToken`

A signed JWT access token

###### Example

```TypeScript
const accessToken = jwtTokenService.createToken({ sub: '123e4567-e89b-12d3-a456-426614174000' });
// Result: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

##### getTokenExpiresOn()

```ts
getTokenExpiresOn(token): Date;
```

Defined in: [libs/nest-auth/src/services/jwt-token.service.ts:160](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/services/jwt-token.service.ts#L160)

Get the expiration date of a JWT token

This method decodes a JWT token and extracts its expiration timestamp.
It converts the Unix timestamp to a JavaScript Date object.

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

`token`

</td>
<td>

`AccessToken` | `RefreshToken`

</td>
<td>

The JWT token to decode

</td>
</tr>
</tbody>
</table>

###### Returns

`Date`

The expiration date of the token

###### Example

```TypeScript
const expiresOn = jwtTokenService.getTokenExpiresOn(accessToken);
console.log(`Token expires on: ${expiresOn.toISOString()}`);

// Check if token is about to expire
const now = new Date();
const fiveMinutes = 5 * 60 * 1000;
if (expiresOn.getTime() - now.getTime() < fiveMinutes) {
  console.log('Token will expire soon, consider refreshing');
}
```

##### verifyAccessToken()

```ts
verifyAccessToken(accessToken): IJwtPayload;
```

Defined in: [libs/nest-auth/src/services/jwt-token.service.ts:103](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/services/jwt-token.service.ts#L103)

Verify a JWT access token

This method verifies the signature and expiration of a JWT access token.
If the token is valid, it returns the decoded payload.

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

The JWT access token to verify

</td>
</tr>
</tbody>
</table>

###### Returns

[`IJwtPayload`](#ijwtpayload)

The decoded payload if the token is valid

###### Throws

If the token signature is invalid

###### Throws

If the token has expired

###### Example

```TypeScript
try {
  const payload = jwtTokenService.verifyAccessToken(accessToken);
  console.log(`Token is valid for user: ${payload.sub}`); // '123e4567-e89b-12d3-a456-426614174000'
} catch (error) {
  if (error instanceof TokenExpiredError) {
    console.error('Token has expired');
  } else {
    console.error('Token is invalid');
  }
}
```

##### verifyRefreshToken()

```ts
verifyRefreshToken(refreshToken): IJwtPayload;
```

Defined in: [libs/nest-auth/src/services/jwt-token.service.ts:132](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/services/jwt-token.service.ts#L132)

Verify a JWT refresh token

This method verifies the signature and expiration of a JWT refresh token.
If the token is valid, it returns the decoded payload.

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

The JWT refresh token to verify

</td>
</tr>
</tbody>
</table>

###### Returns

[`IJwtPayload`](#ijwtpayload)

The decoded payload if the token is valid

###### Throws

If the token signature is invalid

###### Throws

If the token has expired

###### Example

```TypeScript
try {
  const payload = jwtTokenService.verifyRefreshToken(refreshToken);
  // payload.sub contains the user ID: '123e4567-e89b-12d3-a456-426614174000'
  // Generate a new access token
  const newAccessToken = jwtTokenService.createToken(payload);
} catch (error) {
  console.error('Refresh token is invalid or expired');
}
```

---

### LocalAuthGuard

Defined in: [libs/nest-auth/src/guards/local-auth.guard.ts:27](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/guards/local-auth.guard.ts#L27)

Guard for local authentication (username/password).

This guard extends Passport's AuthGuard for the LOCAL strategy and handles
username/password authentication. It validates that the required credentials
are provided in the request body before proceeding with authentication.

#### Example

```typescript
// In a controller
@UseGuards(LocalAuthGuard)
@Post('sign-in')
signIn(@Body() signInDto: SignInDto) {
  return this.authService.signIn(signInDto);
}
```

#### Extends

- `IAuthGuard`

#### Constructors

##### Constructor

```ts
new LocalAuthGuard(...args): LocalAuthGuard;
```

Defined in: node_modules/@nestjs/passport/dist/interfaces/type.interface.d.ts:2

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

...`args`

</td>
<td>

`any`\[]

</td>
</tr>
</tbody>
</table>

###### Returns

[`LocalAuthGuard`](#localauthguard)

###### Inherited from

```ts
AuthGuard(AuthStrategy.LOCAL).constructor;
```

#### Methods

##### canActivate()

```ts
canActivate(context): boolean | Promise<boolean> | Observable<boolean>;
```

Defined in: [libs/nest-auth/src/guards/local-auth.guard.ts:39](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/guards/local-auth.guard.ts#L39)

Determines if the current request is allowed to proceed.

This method validates that the required credentials (email/username and password)
are provided in the request body before proceeding with authentication.

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

`context`

</td>
<td>

`ExecutionContext`

</td>
<td>

The execution context

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean` | `Promise`<`boolean`> | `Observable`<`boolean`>

A boolean or a promise/observable that resolves to a boolean

###### Throws

If email/username or password is missing

###### Overrides

```ts
AuthGuard(AuthStrategy.LOCAL).canActivate;
```

##### getAuthenticateOptions()

```ts
getAuthenticateOptions(context): IAuthModuleOptions | undefined;
```

Defined in: node_modules/@nestjs/passport/dist/auth.guard.d.ts:9

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

`context`

</td>
<td>

`ExecutionContext`

</td>
</tr>
</tbody>
</table>

###### Returns

`IAuthModuleOptions` | `undefined`

###### Inherited from

```ts
AuthGuard(AuthStrategy.LOCAL).getAuthenticateOptions;
```

##### getRequest()

```ts
getRequest(context): any;
```

Defined in: node_modules/@nestjs/passport/dist/auth.guard.d.ts:10

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

`context`

</td>
<td>

`ExecutionContext`

</td>
</tr>
</tbody>
</table>

###### Returns

`any`

###### Inherited from

```ts
AuthGuard(AuthStrategy.LOCAL).getRequest;
```

##### handleRequest()

```ts
handleRequest(
   error,
   user,
   _info): any;
```

Defined in: [libs/nest-auth/src/guards/local-auth.guard.ts:64](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/guards/local-auth.guard.ts#L64)

Processes the authenticated user and handles errors.

This method is called after the LOCAL strategy has validated the credentials.
It handles any errors that occurred during validation and ensures
the user object is properly formatted before returning it.

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

`unknown`

</td>
<td>

Any error that occurred during authentication

</td>
</tr>
<tr>
<td>

`user`

</td>
<td>

`User`

</td>
<td>

The authenticated user

</td>
</tr>
<tr>
<td>

`_info`

</td>
<td>

`unknown`

</td>
<td>

Additional information (not used)

</td>
</tr>
</tbody>
</table>

###### Returns

`any`

The authenticated user with sensitive information removed

###### Throws

If authentication failed or no user was found

###### Overrides

```ts
AuthGuard(AuthStrategy.LOCAL).handleRequest;
```

##### logIn()

```ts
logIn<TRequest>(request): Promise<void>;
```

Defined in: node_modules/@nestjs/passport/dist/auth.guard.d.ts:5

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

`TRequest` _extends_ `object`

</td>
<td>

`any`

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

`request`

</td>
<td>

`TRequest`

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`void`>

###### Inherited from

```ts
AuthGuard(AuthStrategy.LOCAL).logIn;
```

##### \[hasInstance]\()

```ts
static hasInstance: boolean;
```

Defined in: node_modules/typescript/lib/lib.es2015.symbol.wellknown.d.ts:164

Determines whether the given value inherits from this function if this function was used
as a constructor function.

A constructor function can control which objects are recognized as its instances by
'instanceof' by overriding this method.

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

`any`

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean`

###### Inherited from

```ts
AuthGuard(AuthStrategy.LOCAL).[hasInstance]
```

##### apply()

```ts
static apply(
   this,
   thisArg,
   argArray?): any;
```

Defined in: node_modules/typescript/lib/lib.es5.d.ts:281

Calls the function, substituting the specified object for the this value of the function, and the specified array for the arguments of the function.

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

`Function`

</td>
<td>

‐

</td>
</tr>
<tr>
<td>

`thisArg`

</td>
<td>

`any`

</td>
<td>

The object to be used as the this object.

</td>
</tr>
<tr>
<td>

`argArray?`

</td>
<td>

`any`

</td>
<td>

A set of arguments to be passed to the function.

</td>
</tr>
</tbody>
</table>

###### Returns

`any`

###### Inherited from

```ts
AuthGuard(AuthStrategy.LOCAL).apply;
```

##### bind()

```ts
static bind(
   this,
   thisArg, ...
   argArray): any;
```

Defined in: node_modules/typescript/lib/lib.es5.d.ts:296

For a given function, creates a bound function that has the same body as the original function.
The this object of the bound function is associated with the specified object, and has the specified initial parameters.

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

`Function`

</td>
<td>

‐

</td>
</tr>
<tr>
<td>

`thisArg`

</td>
<td>

`any`

</td>
<td>

An object to which the this keyword can refer inside the new function.

</td>
</tr>
<tr>
<td>

...`argArray`

</td>
<td>

`any`\[]

</td>
<td>

A list of arguments to be passed to the new function.

</td>
</tr>
</tbody>
</table>

###### Returns

`any`

###### Inherited from

```ts
AuthGuard(AuthStrategy.LOCAL).bind;
```

##### call()

```ts
static call(
   this,
   thisArg, ...
   argArray): any;
```

Defined in: node_modules/typescript/lib/lib.es5.d.ts:288

Calls a method of an object, substituting another object for the current object.

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

`Function`

</td>
<td>

‐

</td>
</tr>
<tr>
<td>

`thisArg`

</td>
<td>

`any`

</td>
<td>

The object to be used as the current object.

</td>
</tr>
<tr>
<td>

...`argArray`

</td>
<td>

`any`\[]

</td>
<td>

A list of arguments to be passed to the method.

</td>
</tr>
</tbody>
</table>

###### Returns

`any`

###### Inherited from

```ts
AuthGuard(AuthStrategy.LOCAL).call;
```

##### toString()

```ts
static toString(): string;
```

Defined in: node_modules/typescript/lib/lib.es5.d.ts:299

Returns a string representation of a function.

###### Returns

`string`

###### Inherited from

```ts
AuthGuard(AuthStrategy.LOCAL).toString;
```

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Modifier</th>
<th>Type</th>
<th>Description</th>
<th>Inherited from</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="property-arguments-2"></a> `arguments`

</td>
<td>

`static`

</td>
<td>

`any`

</td>
<td>

‐

</td>
<td>

```ts
AuthGuard(AuthStrategy.LOCAL).arguments;
```

</td>
<td>

node_modules/typescript/lib/lib.es5.d.ts:305

</td>
</tr>
<tr>
<td>

<a id="property-caller-2"></a> `caller`

</td>
<td>

`static`

</td>
<td>

`Function`

</td>
<td>

‐

</td>
<td>

```ts
AuthGuard(AuthStrategy.LOCAL).caller;
```

</td>
<td>

node_modules/typescript/lib/lib.es5.d.ts:306

</td>
</tr>
<tr>
<td>

<a id="property-length-2"></a> `length`

</td>
<td>

`readonly`

</td>
<td>

`number`

</td>
<td>

‐

</td>
<td>

```ts
AuthGuard(AuthStrategy.LOCAL).length;
```

</td>
<td>

node_modules/typescript/lib/lib.es5.d.ts:302

</td>
</tr>
<tr>
<td>

<a id="property-name-4"></a> `name`

</td>
<td>

`readonly`

</td>
<td>

`string`

</td>
<td>

Returns the name of the function. Function names are read-only and can not be changed.

</td>
<td>

```ts
AuthGuard(AuthStrategy.LOCAL).name;
```

</td>
<td>

node_modules/typescript/lib/lib.es2015.core.d.ts:97

</td>
</tr>
</tbody>
</table>

---

### LocalStrategy

Defined in: [libs/nest-auth/src/strategies/local.strategy.ts:34](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/strategies/local.strategy.ts#L34)

Local authentication strategy

This strategy is used to authenticate users using email and password.
It configures the username field to be 'email' instead of the default 'username'.

#### Example

```TypeScript
// In your module
@Module({
  imports: [PassportModule],
  providers: [LocalStrategy],
})

// In your controller
@UseGuards(LocalAuthGuard)
@Post('sign-in')
signIn(@CurrentUser() user: AuthUser) {
  return user;
}
```

#### Extends

- `Strategy`<`this`> & `PassportStrategyMixin`<`unknown`, `this`>

#### Constructors

##### Constructor

```ts
new LocalStrategy(options, authService): LocalStrategy;
```

Defined in: [libs/nest-auth/src/strategies/local.strategy.ts:35](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/strategies/local.strategy.ts#L35)

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

`options`

</td>
<td>

[`AuthOptions`](#authoptions)

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

[`LocalStrategy`](#localstrategy)

###### Overrides

```ts
PassportStrategy(Strategy, AuthStrategy.LOCAL).constructor;
```

#### Methods

##### authenticate()

```ts
authenticate(req, options?): void;
```

Defined in: node_modules/@types/passport-strategy/index.d.ts:20

Performs authentication for the request.
Note: Virtual function - re-implement in the strategy.

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

`req`

</td>
<td>

`Request`

</td>
<td>

The request to authenticate.

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

`any`

</td>
<td>

Options passed to the strategy.

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### Inherited from

```ts
PassportStrategy(Strategy, AuthStrategy.LOCAL).authenticate;
```

##### error()

```ts
error(err): void;
```

Defined in: node_modules/@types/passport-strategy/index.d.ts:90

Internal error while performing authentication.

Strategies should call this function when an internal error occurs
during the process of performing authentication; for example, if the
user directory is not available.

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

`err`

</td>
<td>

`Error`

</td>
<td>

‐

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### Api

public

###### Inherited from

```ts
PassportStrategy(Strategy, AuthStrategy.LOCAL).error;
```

##### fail()

###### Call Signature

```ts
fail(challenge, status): void;
```

Defined in: node_modules/@types/passport-strategy/index.d.ts:54

Fail authentication, with optional `challenge` and `status`, defaulting
to 401.

Strategies should call this function to fail an authentication attempt.

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

`challenge`

</td>
<td>

`any`

</td>
<td>

(Can also be an object with 'message' and 'type' fields).

</td>
</tr>
<tr>
<td>

`status`

</td>
<td>

`number`

</td>
<td>

‐

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### Api

public

###### Inherited from

```ts
PassportStrategy(Strategy, AuthStrategy.LOCAL).fail;
```

###### Call Signature

```ts
fail(status): void;
```

Defined in: node_modules/@types/passport-strategy/index.d.ts:55

Fail authentication, with optional `challenge` and `status`, defaulting
to 401.

Strategies should call this function to fail an authentication attempt.

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

`status`

</td>
<td>

`number`

</td>
<td>

‐

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### Api

public

###### Inherited from

```ts
PassportStrategy(Strategy, AuthStrategy.LOCAL).fail;
```

##### pass()

```ts
pass(): void;
```

Defined in: node_modules/@types/passport-strategy/index.d.ts:78

Pass without making a success or fail decision.

Under most circumstances, Strategies should not need to call this
function. It exists primarily to allow previous authentication state
to be restored, for example from an HTTP session.

###### Returns

`void`

###### Api

public

###### Inherited from

```ts
PassportStrategy(Strategy, AuthStrategy.LOCAL).pass;
```

##### redirect()

```ts
redirect(url, status?): void;
```

Defined in: node_modules/@types/passport-strategy/index.d.ts:67

Redirect to `url` with optional `status`, defaulting to 302.

Strategies should call this function to redirect the user (via their
user agent) to a third-party website for authentication.

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

`url`

</td>
<td>

`string`

</td>
<td>

‐

</td>
</tr>
<tr>
<td>

`status?`

</td>
<td>

`number`

</td>
<td>

‐

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### Api

public

###### Inherited from

```ts
PassportStrategy(Strategy, AuthStrategy.LOCAL).redirect;
```

##### success()

```ts
success(user, info?): void;
```

Defined in: node_modules/@types/passport-strategy/index.d.ts:42

Authenticate `user`, with optional `info`.

Strategies should call this function to successfully authenticate a
user. `user` should be an object supplied by the application after it
has been given an opportunity to verify credentials. `info` is an
optional argument containing additional user information. This is
useful for third-party authentication strategies to pass profile
details.

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

`user`

</td>
<td>

`any`

</td>
<td>

‐

</td>
</tr>
<tr>
<td>

`info?`

</td>
<td>

`any`

</td>
<td>

‐

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### Api

public

###### Inherited from

```ts
PassportStrategy(Strategy, AuthStrategy.LOCAL).success;
```

##### validate()

```ts
validate(
   request,
   username,
password): Promise<AuthUser>;
```

Defined in: [libs/nest-auth/src/strategies/local.strategy.ts:64](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/strategies/local.strategy.ts#L64)

Validate the username and password

This method is called by Passport when a user attempts to log in.
It delegates the authentication to the AuthService.

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

`request`

</td>
<td>

`RequestWithSubdomain`

</td>
<td>

The request body

</td>
</tr>
<tr>
<td>

`username`

</td>
<td>

`string`

</td>
<td>

The user's email address

</td>
</tr>
<tr>
<td>

`password`

</td>
<td>

`string`

</td>
<td>

The user's password

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<[`AuthUser`](#authuser)>

The authenticated user

###### Throws

If the credentials are invalid

###### Example

```TypeScript
// This method is called automatically by Passport
const user = await localStrategy.validate('user@example.com', 'password');
```

###### Overrides

```ts
PassportStrategy(Strategy, AuthStrategy.LOCAL).validate;
```

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Modifier</th>
<th>Type</th>
<th>Inherited from</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="property-name-5"></a> `name`

</td>
<td>

`public`

</td>
<td>

`string`

</td>
<td>

```ts
PassportStrategy(Strategy, AuthStrategy.LOCAL).name;
```

</td>
<td>

node_modules/@types/passport-local/index.d.ts:46

</td>
</tr>
<tr>
<td>

<a id="property-options-3"></a> `options`

</td>
<td>

`readonly`

</td>
<td>

[`AuthOptions`](#authoptions)

</td>
<td>

‐

</td>
<td>

[libs/nest-auth/src/strategies/local.strategy.ts:36](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/strategies/local.strategy.ts#L36)

</td>
</tr>
</tbody>
</table>

---

### OverrideSignUpDtoPipe

Defined in: [libs/nest-auth/src/pipes/override-sign-up-dto.pipe.ts:26](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/pipes/override-sign-up-dto.pipe.ts#L26)

Pipe for validating and transforming sign up DTOs.

This pipe validates incoming sign up data against either the default SignUpDto
or a custom DTO provided in the auth options. It handles validation errors according
to the configured exception factory or falls back to default error handling.

#### Example

```typescript
// In a controller
@Post('sign-up')
signUp(@Body(OverrideSignUpDtoPipe) dto: SignUpDto) {
  return this.authService.signUp(dto);
}
```

#### Implements

- `PipeTransform`

#### Constructors

##### Constructor

```ts
new OverrideSignUpDtoPipe(options): OverrideSignUpDtoPipe;
```

Defined in: [libs/nest-auth/src/pipes/override-sign-up-dto.pipe.ts:33](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/pipes/override-sign-up-dto.pipe.ts#L33)

Creates an instance of OverrideSignUpDtoPipe.

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

`options`

</td>
<td>

[`AuthOptions`](#authoptions)

</td>
<td>

The authentication options injected from AUTH_OPTIONS token
Contains configuration for validation, custom DTOs, and exception handling

</td>
</tr>
</tbody>
</table>

###### Returns

[`OverrideSignUpDtoPipe`](#overridesignupdtopipe)

#### Methods

##### transform()

```ts
transform(value): Promise<SignUpDto>;
```

Defined in: [libs/nest-auth/src/pipes/override-sign-up-dto.pipe.ts:48](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/pipes/override-sign-up-dto.pipe.ts#L48)

Transforms and validates the incoming value against the sign up DTO.

This method validates the incoming data against either the custom signUpDto
specified in auth options or the default SignUpDto. It handles validation errors
using the configured exception factory or default error handling mechanisms.

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

`object`

</td>
<td>

The incoming data to validate and transform

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<[`SignUpDto`](#signupdto)>

The validated and transformed DTO instance

###### Throws

If validation fails and no custom exception factory is provided

###### Throws

Custom exception if a validation exception factory is provided

###### Implementation of

```ts
PipeTransform.transform;
```

---

### PermissionGuard

Defined in: [libs/nest-auth/src/guards/permission.guard.ts:28](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/guards/permission.guard.ts#L28)

Guard for permission-based authorization.

This guard checks if the authenticated user has the required permission
to access a specific route. Permissions are defined using the `@Permission`
decorator on controllers or individual routes.

#### Example

```typescript
// In a controller
@Permission('read:users')
@UseGuards(JwtAuthGuard, PermissionGuard)
@Get('users')
getUsers() {
  return this.userService.findAll();
}
```

#### Implements

- `CanActivate`

#### Constructors

##### Constructor

```ts
new PermissionGuard(reflector): PermissionGuard;
```

Defined in: [libs/nest-auth/src/guards/permission.guard.ts:34](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/guards/permission.guard.ts#L34)

Creates an instance of PermissionGuard.

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

`reflector`

</td>
<td>

`Reflector`

</td>
<td>

The reflector service used to retrieve metadata

</td>
</tr>
</tbody>
</table>

###### Returns

[`PermissionGuard`](#permissionguard)

#### Methods

##### canActivate()

```ts
canActivate<P>(context): boolean;
```

Defined in: [libs/nest-auth/src/guards/permission.guard.ts:48](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/guards/permission.guard.ts#L48)

Determines if the current request is allowed to proceed based on permissions.

This method checks if the route has a permission requirement and if the
authenticated user has that permission. If no permission is required or
the user has the required permission, the request is allowed to proceed.

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

`P` _extends_ `string`

</td>
<td>

`string`

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

`context`

</td>
<td>

`ExecutionContext`

</td>
<td>

The execution context

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean`

True if the request is authorized, false otherwise

###### Throws

If the user doesn't have the required permission

###### Implementation of

```ts
CanActivate.canActivate;
```

---

### RefreshTokenDto

Defined in: [libs/nest-auth/src/dtos/refresh-token.dto.ts:13](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/dtos/refresh-token.dto.ts#L13)

Data Transfer Object for token refresh operations.
This class is used to encapsulate the refresh token needed to obtain
a new access token when the current one expires.

Implements the RefreshTokenBody interface.

#### Implements

- `RefreshTokenBody`

#### Constructors

##### Constructor

```ts
new RefreshTokenDto(): RefreshTokenDto;
```

###### Returns

[`RefreshTokenDto`](#refreshtokendto)

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

<a id="property-refreshtoken"></a> `refreshToken`

</td>
<td>

`RefreshToken`

</td>
<td>

A valid JWT refresh token previously issued by this system.

This token is used to obtain a new access token when the current one expires.
It must be a valid JWT token and cannot be empty.

</td>
<td>

[libs/nest-auth/src/dtos/refresh-token.dto.ts:22](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/dtos/refresh-token.dto.ts#L22)

</td>
</tr>
</tbody>
</table>

---

### RequestResetDto

Defined in: [libs/nest-auth/src/dtos/request-reset.dto.ts:13](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/dtos/request-reset.dto.ts#L13)

Data Transfer Object for requesting a password reset.
This class is used to encapsulate the email address of the user
who wants to reset their password.

Implements the RequestResetBody interface.

#### Implements

- `RequestResetBody`

#### Constructors

##### Constructor

```ts
new RequestResetDto(): RequestResetDto;
```

###### Returns

[`RequestResetDto`](#requestresetdto)

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

<a id="property-email"></a> `email`

</td>
<td>

`string`

</td>
<td>

The email address of the user requesting a password reset.

This field is required and cannot be empty.
A password reset token will be sent to this email address.

</td>
<td>

[libs/nest-auth/src/dtos/request-reset.dto.ts:21](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/dtos/request-reset.dto.ts#L21)

</td>
</tr>
</tbody>
</table>

---

### ResendEmailVerifyDto

Defined in: [libs/nest-auth/src/dtos/resend-email-verify.dto.ts:13](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/dtos/resend-email-verify.dto.ts#L13)

Data Transfer Object for requesting a new email verification link.
This class is used to encapsulate the email address of the user
who needs a new verification email sent to them.

Implements the ResendEmailVerifyBody interface.

#### Implements

- `ResendEmailVerifyBody`

#### Constructors

##### Constructor

```ts
new ResendEmailVerifyDto(): ResendEmailVerifyDto;
```

###### Returns

[`ResendEmailVerifyDto`](#resendemailverifydto)

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

<a id="property-email-1"></a> `email`

</td>
<td>

`string`

</td>
<td>

The email address of the user requesting a new verification email.

This field is required and cannot be empty.
A new verification token will be sent to this email address.

</td>
<td>

[libs/nest-auth/src/dtos/resend-email-verify.dto.ts:21](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/dtos/resend-email-verify.dto.ts#L21)

</td>
</tr>
</tbody>
</table>

---

### ResetPasswordDto

Defined in: [libs/nest-auth/src/dtos/reset-password.dto.ts:13](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/dtos/reset-password.dto.ts#L13)

Data Transfer Object for resetting a user's password.
This class is used to encapsulate the verification token and new password
required to complete the password reset process.

Implements the ResetPasswordBody interface.

#### Implements

- `ResetPasswordBody`

#### Constructors

##### Constructor

```ts
new ResetPasswordDto(): ResetPasswordDto;
```

###### Returns

[`ResetPasswordDto`](#resetpassworddto)

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

<a id="property-password"></a> `password`

</td>
<td>

`string`

</td>
<td>

The new password to set for the user's account.

This field is required and cannot be empty.
It will be hashed before storage for security.

</td>
<td>

[libs/nest-auth/src/dtos/reset-password.dto.ts:31](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/dtos/reset-password.dto.ts#L31)

</td>
</tr>
<tr>
<td>

<a id="property-token-1"></a> `token`

</td>
<td>

`VerifyToken`

</td>
<td>

The verification token for password reset.

This token is sent to the user's email during the password reset process.
It must be a valid verification token and cannot be empty.

</td>
<td>

[libs/nest-auth/src/dtos/reset-password.dto.ts:22](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/dtos/reset-password.dto.ts#L22)

</td>
</tr>
</tbody>
</table>

---

### ResetPasswordTokenVerifyDto

Defined in: [libs/nest-auth/src/dtos/reset-password-token-verify.dto.ts:13](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/dtos/reset-password-token-verify.dto.ts#L13)

Data Transfer Object for verifying a password reset token.
This class is used to encapsulate the token provided in a password reset link
to verify that it's valid before allowing the user to set a new password.

Implements the ResetPasswordTokenVerifyBody interface.

#### Implements

- `ResetPasswordTokenVerifyBody`

#### Constructors

##### Constructor

```ts
new ResetPasswordTokenVerifyDto(): ResetPasswordTokenVerifyDto;
```

###### Returns

[`ResetPasswordTokenVerifyDto`](#resetpasswordtokenverifydto)

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

<a id="property-token-2"></a> `token`

</td>
<td>

`VerifyToken`

</td>
<td>

The verification token for password reset.

This token is sent to the user's email during the password reset process.
It must be a valid verification token and cannot be empty.
The system will verify this token before allowing the user to set a new password.

</td>
<td>

[libs/nest-auth/src/dtos/reset-password-token-verify.dto.ts:23](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/dtos/reset-password-token-verify.dto.ts#L23)

</td>
</tr>
</tbody>
</table>

---

### RoleGuard

Defined in: [libs/nest-auth/src/guards/role.guard.ts:28](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/guards/role.guard.ts#L28)

Guard for role-based authorization.

This guard checks if the authenticated user has one of the required roles
to access a specific route. Roles are defined using the `@Roles` decorator
on controllers or individual routes.

#### Example

```typescript
// In a controller
@Roles('admin', 'manager')
@UseGuards(JwtAuthGuard, RoleGuard)
@Get('admin-dashboard')
getAdminDashboard() {
  return this.dashboardService.getAdminData();
}
```

#### Implements

- `CanActivate`

#### Constructors

##### Constructor

```ts
new RoleGuard(reflector): RoleGuard;
```

Defined in: [libs/nest-auth/src/guards/role.guard.ts:34](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/guards/role.guard.ts#L34)

Creates an instance of RoleGuard.

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

`reflector`

</td>
<td>

`Reflector`

</td>
<td>

The reflector service used to retrieve metadata

</td>
</tr>
</tbody>
</table>

###### Returns

[`RoleGuard`](#roleguard)

#### Methods

##### canActivate()

```ts
canActivate<R, P>(context): boolean;
```

Defined in: [libs/nest-auth/src/guards/role.guard.ts:48](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/guards/role.guard.ts#L48)

Determines if the current request is allowed to proceed based on roles.

This method checks if the route has role requirements and if the
authenticated user has one of the required roles. If no roles are required or
the user has one of the required roles, the request is allowed to proceed.

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

`R` _extends_ `string`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`P` _extends_ `string`

</td>
<td>

`string`

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

`context`

</td>
<td>

`ExecutionContext`

</td>
<td>

The execution context

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean`

True if the request is authorized, false otherwise

###### Throws

If the user doesn't have any of the required roles

###### Implementation of

```ts
CanActivate.canActivate;
```

---

### SignInDto

Defined in: [libs/nest-auth/src/dtos/sign-in.dto.ts:13](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/dtos/sign-in.dto.ts#L13)

Data Transfer Object for user sign-in authentication.
This class is used to encapsulate the credentials needed for authenticating a user
via username/email and password combination.

Implements the SignInBody interface.

#### Implements

- `SignInBody`

#### Constructors

##### Constructor

```ts
new SignInDto(): SignInDto;
```

###### Returns

[`SignInDto`](#signindto)

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

<a id="property-email-2"></a> `email?`

</td>
<td>

`string`

</td>
<td>

The user's email address for authentication.

This field is required if username is not provided.
Either email or username must be provided for authentication.

</td>
<td>

[libs/nest-auth/src/dtos/sign-in.dto.ts:32](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/dtos/sign-in.dto.ts#L32)

</td>
</tr>
<tr>
<td>

<a id="property-password-1"></a> `password`

</td>
<td>

`string`

</td>
<td>

The user's password for authentication.

This field is required and must be a string.
It will be verified against the stored hashed password.

</td>
<td>

[libs/nest-auth/src/dtos/sign-in.dto.ts:42](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/dtos/sign-in.dto.ts#L42)

</td>
</tr>
<tr>
<td>

<a id="property-username"></a> `username?`

</td>
<td>

`string`

</td>
<td>

The user's username for authentication.

This field is required if email is not provided.
Either username or email must be provided for authentication.

</td>
<td>

[libs/nest-auth/src/dtos/sign-in.dto.ts:22](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/dtos/sign-in.dto.ts#L22)

</td>
</tr>
</tbody>
</table>

---

### SignUpDto

Defined in: [libs/nest-auth/src/dtos/sign-up.dto.ts:13](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/dtos/sign-up.dto.ts#L13)

Data Transfer Object for user sign up.
This class is used to encapsulate the required user information
for creating a new user account in the system.

Implements the SignUpBody interface.

#### Implements

- `SignUpBody`

#### Constructors

##### Constructor

```ts
new SignUpDto(): SignUpDto;
```

###### Returns

[`SignUpDto`](#signupdto)

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

<a id="property-email-3"></a> `email?`

</td>
<td>

`string`

</td>
<td>

The user's email address.

This field is required if username is not provided.
Either email or username must be provided for authentication.

</td>
<td>

[libs/nest-auth/src/dtos/sign-up.dto.ts:48](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/dtos/sign-up.dto.ts#L48)

</td>
</tr>
<tr>
<td>

<a id="property-firstname"></a> `firstName`

</td>
<td>

`string`

</td>
<td>

The user's first name.

This field is required and cannot be empty.

</td>
<td>

[libs/nest-auth/src/dtos/sign-up.dto.ts:20](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/dtos/sign-up.dto.ts#L20)

</td>
</tr>
<tr>
<td>

<a id="property-lastname"></a> `lastName`

</td>
<td>

`string`

</td>
<td>

The user's last name.

This field is required and cannot be empty.

</td>
<td>

[libs/nest-auth/src/dtos/sign-up.dto.ts:28](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/dtos/sign-up.dto.ts#L28)

</td>
</tr>
<tr>
<td>

<a id="property-password-2"></a> `password`

</td>
<td>

`string`

</td>
<td>

The user's password.

This field is required and cannot be empty.
It will be hashed before storage for security.

</td>
<td>

[libs/nest-auth/src/dtos/sign-up.dto.ts:57](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/dtos/sign-up.dto.ts#L57)

</td>
</tr>
<tr>
<td>

<a id="property-username-1"></a> `username?`

</td>
<td>

`string`

</td>
<td>

The user's username.

This field is required if email is not provided.
Either username or email must be provided for authentication.

</td>
<td>

[libs/nest-auth/src/dtos/sign-up.dto.ts:38](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/dtos/sign-up.dto.ts#L38)

</td>
</tr>
</tbody>
</table>

---

### UpdatePasswordDto

Defined in: [libs/nest-auth/src/dtos/update-password.dto.ts:13](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/dtos/update-password.dto.ts#L13)

Data Transfer Object for updating a user's password.
This class is used to encapsulate the old and new passwords
when an authenticated user wants to change their password.

Implements the UpdatePasswordBody interface.

#### Implements

- `UpdatePasswordBody`

#### Constructors

##### Constructor

```ts
new UpdatePasswordDto(): UpdatePasswordDto;
```

###### Returns

[`UpdatePasswordDto`](#updatepassworddto)

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

<a id="property-newpassword"></a> `newPassword`

</td>
<td>

`string`

</td>
<td>

The new password to set for the user's account.

This field is required and cannot be empty.
It will be hashed before storage for security.

</td>
<td>

[libs/nest-auth/src/dtos/update-password.dto.ts:30](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/dtos/update-password.dto.ts#L30)

</td>
</tr>
<tr>
<td>

<a id="property-oldpassword"></a> `oldPassword`

</td>
<td>

`string`

</td>
<td>

The user's current password.

This field is required and cannot be empty.
It will be verified against the stored hashed password.

</td>
<td>

[libs/nest-auth/src/dtos/update-password.dto.ts:21](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/dtos/update-password.dto.ts#L21)

</td>
</tr>
</tbody>
</table>

---

### UserCacheService

Defined in: [libs/nest-auth/src/services/user-cache.service.ts:23](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/services/user-cache.service.ts#L23)

Service for caching user data and sessions

This service provides methods for storing, retrieving, and clearing user data in the cache.
It supports optional encryption of user sessions for enhanced security.

#### Example

```typescript
// Inject the service
constructor(private readonly userCacheService: UserCacheService) {}
```

#### Constructors

##### Constructor

```ts
new UserCacheService(
   options,
   cacheService,
   encryptionService): UserCacheService;
```

Defined in: [libs/nest-auth/src/services/user-cache.service.ts:31](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/services/user-cache.service.ts#L31)

Creates an instance of UserCacheService.

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

`options`

</td>
<td>

[`AuthOptions`](#authoptions)

</td>
<td>

The authentication options injected from AUTH_OPTIONS token

</td>
</tr>
<tr>
<td>

`cacheService`

</td>
<td>

`CacheService`

</td>
<td>

The cache service for storing and retrieving user data

</td>
</tr>
<tr>
<td>

`encryptionService`

</td>
<td>

`EncryptionService`

</td>
<td>

The encryption service for securing user sessions

</td>
</tr>
</tbody>
</table>

###### Returns

[`UserCacheService`](#usercacheservice)

#### Methods

##### clearUser()

```ts
clearUser(userId): Promise<boolean>;
```

Defined in: [libs/nest-auth/src/services/user-cache.service.ts:131](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/services/user-cache.service.ts#L131)

Clear user from the cache

This method removes a user object from the cache by their ID.
It's typically used during sign out or when a user's session is invalidated.

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

`userId`

</td>
<td>

`EntityId`

</td>
<td>

The ID of the user to remove from cache

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`boolean`>

True if the operation was successful

###### Example

```TypeScript
// When a user logs out
const success = await userCacheService.clearUser('123e4567-e89b-12d3-a456-426614174000');
if (success) {
  console.log('User session cleared from cache');
}
```

##### getUser()

```ts
getUser(userId): Promise<CacheUser | undefined>;
```

Defined in: [libs/nest-auth/src/services/user-cache.service.ts:92](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/services/user-cache.service.ts#L92)

Get user from cache

This method retrieves a user object from the cache by their ID.
If a session secret is configured and the user has encrypted sessions,
it decrypts the sessions before returning the user object.

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

`userId`

</td>
<td>

`EntityId`

</td>
<td>

The ID of the user to retrieve

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<[`CacheUser`](#cacheuser) | `undefined`>

The user object if found, undefined otherwise

###### Example

```TypeScript
const user = await userCacheService.getUser('123e4567-e89b-12d3-a456-426614174000');
if (user) {
  console.log(`Found user: ${user.firstName} ${user.lastName}`);
  console.log(`Active sessions: ${user.sessions.length}`);
}
```

##### setUser()

```ts
setUser(user): Promise<boolean>;
```

Defined in: [libs/nest-auth/src/services/user-cache.service.ts:57](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/services/user-cache.service.ts#L57)

Set user in cache

This method stores a user object in the cache. If a session secret is configured,
it encrypts the user's sessions before storing them.

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

`user`

</td>
<td>

[`CacheUser`](#cacheuser)

</td>
<td>

The user object to store in cache

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`boolean`>

True if the operation was successful

###### Example

```TypeScript
const success = await userCacheService.setUser({
  id: '123e4567-e89b-12d3-a456-426614174000',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  sessions: [{ sessionId: 'session-id', accessToken: 'token', refreshToken: 'refresh-token' }]
});
```

---

### ViewUserDto

Defined in: [libs/nest-auth/src/dtos/view-user.dto.ts:9](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/dtos/view-user.dto.ts#L9)

A Data Transfer Object (`DTO`) class used for viewing user data.
This class ensures that the user data is formatted and structured for output or display purposes.
Implements the IViewDto interface for standardized data formatting operations.

#### Implements

- `IViewDto`

#### Constructors

##### Constructor

```ts
new ViewUserDto(): ViewUserDto;
```

###### Returns

[`ViewUserDto`](#viewuserdto)

#### Methods

##### formatDataSet()

```ts
formatDataSet(user?): User<string, string> | null;
```

Defined in: [libs/nest-auth/src/dtos/view-user.dto.ts:20](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/dtos/view-user.dto.ts#L20)

Formats a user entity for output or display purposes.

This method takes a User object and formats it for presentation.
In this implementation, it simply returns the user object as is,
but it could be extended to filter, transform, or enhance the user data.

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

`user?`

</td>
<td>

`User`<`string`, `string`> | `null`

</td>
<td>

The user entity to format

</td>
</tr>
</tbody>
</table>

###### Returns

`User`<`string`, `string`> | `null`

The formatted user data

###### Implementation of

```ts
IViewDto.formatDataSet;
```

## Functions

### AuthInfo()

```ts
function AuthInfo(): ParameterDecorator;
```

Defined in: [libs/nest-auth/src/decorators/auth-info.decorator.ts:31](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/decorators/auth-info.decorator.ts#L31)

Auth Info Decorator

This decorator extracts the authenticated user information from the request object.
It retrieves the authInfo property which contains the [AuthUser](#authuser) data set by the authentication process.

Note: This decorator requires the [GoogleAuthGuard](#googleauthguard) to be applied to the route using `@UseGuards(GoogleAuthGuard)`
to ensure proper authentication and access to user information.

#### Returns

`ParameterDecorator`

The parameter decorator

#### Example

```TypeScript
@Controller("user")
export class UserController {
    constructor(private userService: UserService) {}

    @Get()
    @UseGuards(GoogleAuthGuard)
    async getUsers(@AuthInfo() authInfo: AuthUser): Promise<User[]> {
        // Implementation
    }
}
```

---

### cookieExtractor()

```ts
function cookieExtractor(request): AccessToken | null;
```

Defined in: [libs/nest-auth/src/extractors/cookie-extractor.ts:22](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/extractors/cookie-extractor.ts#L22)

Extract access token from the request cookies

This function is used to extract the access token from the request cookies

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

`request`

</td>
<td>

`Request`

</td>
<td>

The request object

</td>
</tr>
</tbody>
</table>

#### Returns

`AccessToken` | `null`

`AccessToken` or `null` if not found

#### Example

```TypeScript
ExtractJwt.fromExtractors([cookieExtractor])
```

#### See

- [ACCESS_TOKEN_COOKIE_NAME](#access_token_cookie_name) The cookie name used to store the access token
- [JwtAuthGuard](#jwtauthguard) Guard that uses this extractor for authentication
- AuthMethod.COOKIE Authentication method that uses cookies

---

### CurrentUser()

```ts
function CurrentUser(): ParameterDecorator;
```

Defined in: [libs/nest-auth/src/decorators/current-user.decorator.ts:29](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/decorators/current-user.decorator.ts#L29)

Current User Decorator

This decorator is used to extract the authenticated user information from the request context.
It removes sensitive information like password and provides access to user details in controller methods.
The decorator automatically retrieves the user object `AuthUser` that was attached to the request by the authentication process.

Note: This decorator requires the `JwtAuthGuard` to be applied to the route using `@UseGuards(JwtAuthGuard)`
to ensure proper authentication and access to user information.

#### Returns

`ParameterDecorator`

The parameter decorator

#### Example

```TypeScript
@Controller("user")
export class UserController {
    @Get()
    @UseGuards(JwtAuthGuard)
    async getUsers(@CurrentUser() user: AuthUser): Promise<User[]> {
        // Implementation
    }
}
```

---

### Permission()

```ts
function Permission<P>(permission): CustomDecorator;
```

Defined in: [libs/nest-auth/src/decorators/permission.decorator.ts:35](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/decorators/permission.decorator.ts#L35)

Permission decorator

This decorator is used to set the permission for a route.

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

`P` _extends_ `string`

</td>
<td>

`string`

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

`permission`

</td>
<td>

`P`

</td>
<td>

permission

</td>
</tr>
</tbody>
</table>

#### Returns

`CustomDecorator`

CustomDecorator

#### Example

```TypeScript
@Controller("user")
export class UserController {
    @Get()
    @Permission(Permission.GET_USER)
    async getUsers(): Promise<User[]> {
        // Implementation
    }
}

```

---

### Roles()

```ts
function Roles<R>(...roles): CustomDecorator;
```

Defined in: [libs/nest-auth/src/decorators/roles.decorator.ts:37](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/decorators/roles.decorator.ts#L37)

Roles decorator

This decorator is used to set the roles for a route.

Note: `RoleName` is an `enum` but this decorator accepts both `enum` values and `string` values directly.

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

`R` _extends_ `string`

</td>
<td>

`string`

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

...`roles`

</td>
<td>

`R`\[]

</td>
<td>

Comma separated roles

</td>
</tr>
</tbody>
</table>

#### Returns

`CustomDecorator`

CustomDecorator

#### Example

```TypeScript
@Controller("user")
export class UserController {
    @Get()
    @Roles(RoleName.ADMIN, RoleName.USER)
    async getUsers(): Promise<User[]> {
        // Implementation
    }
}

```

---

### SocketId()

```ts
function SocketId(): ParameterDecorator;
```

Defined in: [libs/nest-auth/src/decorators/socket-id.decorator.ts:29](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/decorators/socket-id.decorator.ts#L29)

Request socket id decorator

This decorator is used to extract the socket id from the current user's token data in the request.
It provides easy access to the socket id within controller methods without manually accessing the request object.

Note: This decorator requires the `JwtAuthGuard` to be applied to the route using `@UseGuards(JwtAuthGuard)`
to ensure proper authentication and access to user information.

#### Returns

`ParameterDecorator`

The parameter decorator

#### Example

```TypeScript
@Controller("user")
export class UserController {
    @Get()
    @UseGuards(JwtAuthGuard)
    async getUsers(@SocketId() socketId: string): Promise<User[]> {
        // Implementation
    }
}
```

---

### Subdomain()

```ts
function Subdomain(required?): ParameterDecorator;
```

Defined in: [libs/nest-auth/src/decorators/subdomain.decorator.ts:39](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/decorators/subdomain.decorator.ts#L39)

Request subdomain decorator

This decorator is used to extract the subdomain from the current request.
It provides easy access to the subdomain within controller methods without manually accessing the request object.
It returns the subdomain string from the current request or undefined if no subdomain is present.

Note: The `SubdomainMiddleware` must be applied to your routes for this decorator to work.

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

`required?`

</td>
<td>

`boolean`

</td>
</tr>
</tbody>
</table>

#### Returns

`ParameterDecorator`

The parameter decorator

#### Example

```TypeScript
@Module({...})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer): void {
        consumer
            .apply(SubdomainMiddleware("google.com", "accounts"))
            .forRoutes("*");
    }
}

@Controller("user")
export class UserController {
    @Get()
    async getUsers(@Subdomain() subdomain: string): Promise<User[]> {
        // Implementation
    }
}
```

## Interfaces

### AuthOptions

Defined in: [libs/nest-auth/src/interfaces/auth-options.interface.ts:192](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/interfaces/auth-options.interface.ts#L192)

Main authentication configuration options

This interface defines the complete configuration for the authentication system,
including JWT settings, OAuth providers, cookie settings, and various authentication behaviors.
The `AuthOptions` interface is the primary configuration point for the @hichchi/nest-auth module.

When setting up authentication for your NestJS application, you'll need to provide
an instance of this interface to the `AuthModule.register()` method.

The only required property is `jwt`, which configures the JWT authentication strategy.
Other properties are optional and can be used to customize the authentication behavior
according to your application's needs.

#### Examples

```typescript
// Basic authentication configuration
const authOptions: AuthOptions = {
  isProd: process.env.NODE_ENV === "production",
  jwt: {
    secret: "your-access-token-secret",
    expiresIn: 3600, // 1 hour
    refreshSecret: "your-refresh-token-secret",
    refreshExpiresIn: 604800, // 7 days
  },
  authMethod: AuthMethod.JWT,
  authField: AuthField.EMAIL,
  checkEmailVerified: true,
};

// Register the AuthModule with the configuration
@Module({
  imports: [AuthModule.register(authOptions)],
  // ...
})
export class AppModule {}
```

```typescript
// Advanced authentication configuration with Google OAuth and Redis caching
const authOptions: AuthOptions = {
  isProd: process.env.NODE_ENV === "production",
  redis: {
    host: "localhost",
    port: 6379,
    ttl: 86400, // 1 day
  },
  sessionSecret: "your-session-encryption-secret",
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: 3600, // 1 hour
    refreshSecret: process.env.JWT_REFRESH_SECRET,
    refreshExpiresIn: 604800, // 7 days
  },
  googleAuth: {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackUrl: "https://your-app.com/api/auth/google/callback",
  },
  cookies: {
    secret: process.env.COOKIE_SECRET,
    sameSite: "strict",
    secure: true,
  },
  checkEmailVerified: true,
  emailVerifyRedirect: "https://your-app.com/email-verified",
  passwordResetExp: 3600, // 1 hour
  authMethod: AuthMethod.JWT,
  authField: AuthField.EMAIL,
  disableSignUp: false,
};
```

#### See

[HichchiAuthModule](#hichchiauthmodule) The module that uses this configuration

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

<a id="property-allowedredirectdomains"></a> `allowedRedirectDomains?`

</td>
<td>

`string`\[]

</td>
<td>

List of allowed domains for redirect URLs.

These domains are used to validate redirect URLs provided by the frontend
to prevent open redirect vulnerabilities. URLs with domains not in this list
will be rejected, and the fallback URL will be used instead.

Example: \['myapp.com', 'staging-myapp.com']
This would allow redirects to any subdomain of myapp.com or staging-myapp.com

</td>
<td>

[libs/nest-auth/src/interfaces/auth-options.interface.ts:369](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/interfaces/auth-options.interface.ts#L369)

</td>
</tr>
<tr>
<td>

<a id="property-authfield"></a> `authField?`

</td>
<td>

`string`

</td>
<td>

Field used for authentication (email, username, etc.)

Determines which field is used as the identifier during authentication.
This can be a value from the AuthField enum or a custom string.

**Default**

```ts
AuthField.EMAIL;
```

**See**

AuthField

</td>
<td>

[libs/nest-auth/src/interfaces/auth-options.interface.ts:312](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/interfaces/auth-options.interface.ts#L312)

</td>
</tr>
<tr>
<td>

<a id="property-authmethod"></a> `authMethod?`

</td>
<td>

`AuthMethod`

</td>
<td>

Authentication method (JWT, Cookie, etc.)

Determines how authentication tokens are stored and transmitted.

- JWT: Tokens are sent in the Authorization header
- COOKIE: Tokens are stored in HTTP-only cookies

**Default**

```ts
AuthMethod.JWT;
```

**See**

AuthMethod

</td>
<td>

[libs/nest-auth/src/interfaces/auth-options.interface.ts:301](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/interfaces/auth-options.interface.ts#L301)

</td>
</tr>
<tr>
<td>

<a id="property-checkemailverified"></a> `checkEmailVerified?`

</td>
<td>

`boolean`

</td>
<td>

Whether to verify user email before allowing authentication

When set to true, users must verify their email address before they can
sign in. This adds an extra layer of security and verification.

**Default**

```ts
false;
```

</td>
<td>

[libs/nest-auth/src/interfaces/auth-options.interface.ts:269](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/interfaces/auth-options.interface.ts#L269)

</td>
</tr>
<tr>
<td>

<a id="property-cookies"></a> `cookies?`

</td>
<td>

[`CookiesOptions`](#cookiesoptions)

</td>
<td>

Cookie configuration options

When provided, configures how authentication cookies are stored and transmitted.
This is used when authMethod is set to AuthMethod.COOKIE.

**See**

[CookiesOptions](#cookiesoptions)

</td>
<td>

[libs/nest-auth/src/interfaces/auth-options.interface.ts:256](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/interfaces/auth-options.interface.ts#L256)

</td>
</tr>
<tr>
<td>

<a id="property-disablesignup"></a> `disableSignUp?`

</td>
<td>

`boolean`

</td>
<td>

Whether to disable sign-up functionality

When set to true, the sign-up endpoints will be disabled, and users will
not be able to create new accounts. This is useful for applications where
user accounts are created through an admin interface or another system.

**Default**

```ts
false;
```

</td>
<td>

[libs/nest-auth/src/interfaces/auth-options.interface.ts:357](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/interfaces/auth-options.interface.ts#L357)

</td>
</tr>
<tr>
<td>

<a id="property-emailverifyredirect"></a> `emailVerifyRedirect?`

</td>
<td>

`string`

</td>
<td>

URL to redirect to after email verification

When a user verifies their email address, they will be redirected to this URL.
This should be a frontend URL that can handle the verification success state.

Required when checkEmailVerified is true.

</td>
<td>

[libs/nest-auth/src/interfaces/auth-options.interface.ts:279](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/interfaces/auth-options.interface.ts#L279)

</td>
</tr>
<tr>
<td>

<a id="property-googleauth"></a> `googleAuth?`

</td>
<td>

[`GoogleAuthOptions`](#googleauthoptions)

</td>
<td>

Google OAuth configuration options

When provided, enables Google OAuth authentication in your application.
Users will be able to sign in using their Google accounts.

**See**

[GoogleAuthOptions](#googleauthoptions)

</td>
<td>

[libs/nest-auth/src/interfaces/auth-options.interface.ts:246](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/interfaces/auth-options.interface.ts#L246)

</td>
</tr>
<tr>
<td>

<a id="property-isprod"></a> `isProd?`

</td>
<td>

`boolean`

</td>
<td>

Whether the application is running in production mode

When set to true, certain security features are enforced and development-only
features are disabled. It's recommended to set this based on your environment
variables, e.g., `process.env.NODE_ENV === 'production'`.

**Default**

```ts
false;
```

</td>
<td>

[libs/nest-auth/src/interfaces/auth-options.interface.ts:202](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/interfaces/auth-options.interface.ts#L202)

</td>
</tr>
<tr>
<td>

<a id="property-jwt"></a> `jwt`

</td>
<td>

[`JwtOptions`](#jwtoptions)

</td>
<td>

JWT configuration options

This is the only required property in AuthOptions. It configures the JWT
authentication strategy, including secrets and expiration times for both
access and refresh tokens.

**See**

[JwtOptions](#jwtoptions)

</td>
<td>

[libs/nest-auth/src/interfaces/auth-options.interface.ts:236](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/interfaces/auth-options.interface.ts#L236)

</td>
</tr>
<tr>
<td>

<a id="property-passwordresetexp"></a> `passwordResetExp?`

</td>
<td>

`number`

</td>
<td>

Password reset token expiration time in seconds

Determines how long a password reset token is valid. After this time,
the user will need to request a new password reset token.

**Default**

```ts
3600 (1 hour)
```

</td>
<td>

[libs/nest-auth/src/interfaces/auth-options.interface.ts:289](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/interfaces/auth-options.interface.ts#L289)

</td>
</tr>
<tr>
<td>

<a id="property-redis"></a> `redis?`

</td>
<td>

`RedisOptions`

</td>
<td>

Redis configuration for caching user sessions

When provided, user sessions will be stored in Redis, which improves
performance and enables horizontal scaling of your application. This is
highly recommended for production environments.

**See**

RedisOptions from @hichchi/nest-core

</td>
<td>

[libs/nest-auth/src/interfaces/auth-options.interface.ts:213](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/interfaces/auth-options.interface.ts#L213)

</td>
</tr>
<tr>
<td>

<a id="property-sessionsecret"></a> `sessionSecret?`

</td>
<td>

`string`

</td>
<td>

Secret key used for encrypting user sessions in cache

This key is used to encrypt sensitive user data before storing it in the cache.
It should be a strong, unique secret and should be kept secure.

Required when using Redis caching with sensitive user data.

**See**

[CacheUser](#cacheuser) User interface with encrypted session capabilities

</td>
<td>

[libs/nest-auth/src/interfaces/auth-options.interface.ts:225](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/interfaces/auth-options.interface.ts#L225)

</td>
</tr>
<tr>
<td>

<a id="property-signupdto"></a> `signUpDto?`

</td>
<td>

_typeof_ [`SignUpDto`](#signupdto)

</td>
<td>

Custom DTO class for sign-up requests

When provided, this DTO class will be used to validate sign-up requests
instead of the default SignUpDto. This allows you to customize the
sign-up process with additional fields or validation rules.

**See**

[SignUpDto](#signupdto)

</td>
<td>

[libs/nest-auth/src/interfaces/auth-options.interface.ts:323](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/interfaces/auth-options.interface.ts#L323)

</td>
</tr>
<tr>
<td>

<a id="property-validationexceptionfactory"></a> `validationExceptionFactory?`

</td>
<td>

`boolean` | (`errors`) => `HttpException`

</td>
<td>

Custom validation exception factory

When provided, this function will be used to create exceptions for validation
errors. This allows you to customize the format of validation error responses.

Set to true to use the default NestJS validation exception factory.

**Default**

```ts
false;
```

</td>
<td>

[libs/nest-auth/src/interfaces/auth-options.interface.ts:346](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/interfaces/auth-options.interface.ts#L346)

</td>
</tr>
<tr>
<td>

<a id="property-viewdto"></a> `viewDto?`

</td>
<td>

`Type`<[`ViewUserDto`](#viewuserdto)>

</td>
<td>

Custom DTO class for user views

When provided, this DTO class will be used to transform user entities
before returning them in responses. This allows you to customize the
user data that is exposed to clients.

**See**

[ViewUserDto](#viewuserdto)

</td>
<td>

[libs/nest-auth/src/interfaces/auth-options.interface.ts:334](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/interfaces/auth-options.interface.ts#L334)

</td>
</tr>
</tbody>
</table>

---

### AuthUser

Defined in: [libs/nest-auth/src/interfaces/auth-user.type.ts:27](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/interfaces/auth-user.type.ts#L27)

Interface representing a user with complete authentication information.

The `AuthUser` interface combines three key aspects of user authentication:

1. Core user identity properties (from `User`)
2. Additional authentication-related properties (from `UserExtra`)
3. Session-specific information including tokens (from `UserSession`)

This comprehensive interface is used throughout the authentication process
to maintain a complete view of the authenticated user's state and capabilities.
It's especially useful in token-based authentication flows where user identity
and session information need to be accessible together.

AuthUser

#### See

- User Base user interface with core user properties
- [UserExtra](#userextra) Additional authentication-related user properties
- UserSession Session information including access and refresh tokens
- [CacheUser](#cacheuser) Related interface for users stored in cache

#### Extends

- `User`.[`UserExtra`](#userextra).`UserSession`

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Description</th>
<th>Inherited from</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="property-accesstoken-1"></a> `accessToken`

</td>
<td>

`AccessToken`

</td>
<td>

The access token used for authenticated API requests.
This is a short-lived JWT token that contains the user's identity and permissions.

**See**

AccessToken Branded type for access tokens

</td>
<td>

```ts
UserSession.accessToken;
```

</td>
<td>

[libs/nest-connector/src/auth/interfaces/user-session.interface.ts:34](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/auth/interfaces/user-session.interface.ts#L34)

</td>
</tr>
<tr>
<td>

<a id="property-authfield-1"></a> `authField?`

</td>
<td>

`string`

</td>
<td>

The name of the field used for authentication

This property stores which field is used as the identifier during authentication.
Common values would be 'email', 'username', or any other unique identifier field.

This allows the authentication system to be flexible and support different
authentication strategies based on configuration.

**See**

- AuthField Enum of standard authentication field options
- [AuthOptions.authField](#property-authfield) Configuration for the default authentication field

</td>
<td>

[`UserExtra`](#userextra).[`authField`](#property-authfield-3)

</td>
<td>

[libs/nest-auth/src/interfaces/user-extra.interfaces.ts:33](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/interfaces/user-extra.interfaces.ts#L33)

</td>
</tr>
<tr>
<td>

<a id="property-authfieldvalue"></a> `authFieldValue?`

</td>
<td>

`string`

</td>
<td>

The value of the authentication field for this user

This property stores the actual value of the field used for authentication.
For example, if authField is 'email', this would contain the user's email address.

Storing this separately allows for optimized lookups during authentication
without having to determine which field to use at runtime.

</td>
<td>

[`UserExtra`](#userextra).[`authFieldValue`](#property-authfieldvalue-2)

</td>
<td>

[libs/nest-auth/src/interfaces/user-extra.interfaces.ts:44](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/interfaces/user-extra.interfaces.ts#L44)

</td>
</tr>
<tr>
<td>

<a id="property-authprovider"></a> `authProvider?`

</td>
<td>

`AuthProvider`

</td>
<td>

The authentication provider used for this session.
Indicates how the user was authenticated (e.g., local, Google).

Optional: Defaults to the application's primary authentication provider if not specified.

**See**

AuthProvider Enum of supported authentication type

</td>
<td>

```ts
UserSession.authProvider;
```

</td>
<td>

[libs/nest-connector/src/auth/interfaces/user-session.interface.ts:68](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/auth/interfaces/user-session.interface.ts#L68)

</td>
</tr>
<tr>
<td>

<a id="property-authproviderid"></a> `authProviderId?`

</td>
<td>

`string`

</td>
<td>

The unique identifier representing the user in the context of the auth provider.
For example, this could be a Google user ID for sessions authenticated via Google OAuth.

Optional: Only relevant for third-party authentication providers.

</td>
<td>

```ts
UserSession.authProviderId;
```

</td>
<td>

[libs/nest-connector/src/auth/interfaces/user-session.interface.ts:76](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/auth/interfaces/user-session.interface.ts#L76)

</td>
</tr>
<tr>
<td>

<a id="property-avatar"></a> `avatar`

</td>
<td>

`string` | `null`

</td>
<td>

URL or path to the user's profile picture/avatar.

Provides a visual representation of the user throughout the application.
May be automatically populated from social login providers when available.

</td>
<td>

```ts
User.avatar;
```

</td>
<td>

[libs/nest-connector/src/auth/interfaces/user.interface.ts:112](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/auth/interfaces/user.interface.ts#L112)

</td>
</tr>
<tr>
<td>

<a id="property-createdat"></a> `createdAt`

</td>
<td>

`Date`

</td>
<td>

Timestamp when the entity was created.

This value is set automatically on entity creation and never changes
afterward, providing an immutable record of when the data was first added.

</td>
<td>

```ts
User.createdAt;
```

</td>
<td>

[libs/nest-connector/src/crud/interfaces/model.interface.ts:65](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/crud/interfaces/model.interface.ts#L65)

</td>
</tr>
<tr>
<td>

<a id="property-createdby"></a> `createdBy`

</td>
<td>

`UserInfo` | `null`

</td>
<td>

Detailed information about the user who created this entity.

Contains essential identifying information about the creator without
including sensitive data. This property may be populated through a join or
separate query when needed for display purposes.

**See**

UserInfo Interface for user reference information

</td>
<td>

```ts
User.createdBy;
```

</td>
<td>

[libs/nest-connector/src/crud/interfaces/model.interface.ts:102](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/crud/interfaces/model.interface.ts#L102)

</td>
</tr>
<tr>
<td>

<a id="property-createdbyid"></a> `createdById`

</td>
<td>

`EntityId` | `null`

</td>
<td>

ID of the user who created this entity.

Stores just the ID reference to the user for efficient database storage.
Use in conjunction with the `createdBy` property when user details are needed.

</td>
<td>

```ts
User.createdById;
```

</td>
<td>

[libs/nest-connector/src/crud/interfaces/model.interface.ts:91](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/crud/interfaces/model.interface.ts#L91)

</td>
</tr>
<tr>
<td>

<a id="property-deletedat"></a> `deletedAt`

</td>
<td>

`Date` | `null`

</td>
<td>

Timestamp when the entity was soft-deleted, if applicable.

When present and not null, indicates that this entity has been deleted
logically but is still present in the database. This enables data recovery
and maintains referential integrity while hiding the record from normal queries.

</td>
<td>

```ts
User.deletedAt;
```

</td>
<td>

[libs/nest-connector/src/crud/interfaces/model.interface.ts:83](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/crud/interfaces/model.interface.ts#L83)

</td>
</tr>
<tr>
<td>

<a id="property-deletedby"></a> `deletedBy`

</td>
<td>

`UserInfo` | `null`

</td>
<td>

Detailed information about the user who soft-deleted this entity, if applicable.

Contains identifying information about the user who performed the deletion,
used primarily in administrative interfaces for reviewing deletion history.

**See**

UserInfo Interface for user reference information

</td>
<td>

```ts
User.deletedBy;
```

</td>
<td>

[libs/nest-connector/src/crud/interfaces/model.interface.ts:138](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/crud/interfaces/model.interface.ts#L138)

</td>
</tr>
<tr>
<td>

<a id="property-deletedbyid"></a> `deletedById`

</td>
<td>

`EntityId` | `null`

</td>
<td>

ID of the user who soft-deleted this entity, if applicable.

When an entity is soft-deleted, this property stores the ID of the user
who performed the deletion action for accountability purposes.

</td>
<td>

```ts
User.deletedById;
```

</td>
<td>

[libs/nest-connector/src/crud/interfaces/model.interface.ts:128](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/crud/interfaces/model.interface.ts#L128)

</td>
</tr>
<tr>
<td>

<a id="property-email-4"></a> `email`

</td>
<td>

`string` | `null`

</td>
<td>

The user's email address.

May be optional for some authentication methods, but generally serves
as the primary means of communication and account recovery.
Often used as the primary identifier for authentication.

</td>
<td>

```ts
User.email;
```

</td>
<td>

[libs/nest-connector/src/auth/interfaces/user.interface.ts:35](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/auth/interfaces/user.interface.ts#L35)

</td>
</tr>
<tr>
<td>

<a id="property-emailverified"></a> `emailVerified`

</td>
<td>

`boolean`

</td>
<td>

Indicates whether the user's email address has been verified.

Email verification is an important security measure to confirm user identity
and prevent account abuse. Some features may be restricted until verification.

</td>
<td>

```ts
User.emailVerified;
```

</td>
<td>

[libs/nest-connector/src/auth/interfaces/user.interface.ts:96](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/auth/interfaces/user.interface.ts#L96)

</td>
</tr>
<tr>
<td>

<a id="property-firstname-1"></a> `firstName`

</td>
<td>

`string`

</td>
<td>

The user's first name or given name.

Used for personalization and formal addressing throughout the application.

</td>
<td>

```ts
User.firstName;
```

</td>
<td>

[libs/nest-connector/src/common/interfaces/user-info.interface.ts:52](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/common/interfaces/user-info.interface.ts#L52)

</td>
</tr>
<tr>
<td>

<a id="property-frontendurl"></a> `frontendUrl?`

</td>
<td>

`string`

</td>
<td>

The base URL for the frontend application associated with this session.
Used for generating correct redirect URLs for multi-frontend applications.

Optional: May be omitted for API-only usage or when a default frontend URL is configured.

</td>
<td>

```ts
UserSession.frontendUrl;
```

</td>
<td>

[libs/nest-connector/src/auth/interfaces/user-session.interface.ts:58](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/auth/interfaces/user-session.interface.ts#L58)

</td>
</tr>
<tr>
<td>

<a id="property-fullname"></a> `fullName`

</td>
<td>

`string`

</td>
<td>

The user's complete name, typically a combination of first and last name.

This property provides a convenience for displaying the user's full name
without having to concatenate the first and last names manually. The exact
format may vary based on locale and application requirements.

</td>
<td>

```ts
User.fullName;
```

</td>
<td>

[libs/nest-connector/src/common/interfaces/user-info.interface.ts:68](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/common/interfaces/user-info.interface.ts#L68)

</td>
</tr>
<tr>
<td>

<a id="property-id"></a> `id`

</td>
<td>

`EntityId`

</td>
<td>

The unique identifier for the user.

This ID corresponds to the primary key in the users table
and uniquely identifies the user across the entire system.

</td>
<td>

```ts
User.id;
```

</td>
<td>

[libs/nest-connector/src/common/interfaces/user-info.interface.ts:45](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/common/interfaces/user-info.interface.ts#L45)

</td>
</tr>
<tr>
<td>

<a id="property-lastname-1"></a> `lastName`

</td>
<td>

`string`

</td>
<td>

The user's last name or family name.

Used alongside the first name for formal addressing and identification.

</td>
<td>

```ts
User.lastName;
```

</td>
<td>

[libs/nest-connector/src/common/interfaces/user-info.interface.ts:59](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/common/interfaces/user-info.interface.ts#L59)

</td>
</tr>
<tr>
<td>

<a id="property-password-3"></a> `password`

</td>
<td>

`string` | `null`

</td>
<td>

The user's password (typically hashed).

Optional as some authentication methods (e.g., OAuth) don't use passwords.
When present, this should always be a hashed version of the password,
never the plaintext value.

Note: This field is typically excluded from responses sent to clients.

</td>
<td>

```ts
User.password;
```

</td>
<td>

[libs/nest-connector/src/auth/interfaces/user.interface.ts:54](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/auth/interfaces/user.interface.ts#L54)

</td>
</tr>
<tr>
<td>

<a id="property-profiledata"></a> `profileData`

</td>
<td>

`GoogleProfile` | `null`

</td>
<td>

Additional profile information for the user.

This flexible object can contain various user-specific details not covered
by standard fields, such as preferences, settings, or application-specific data.

</td>
<td>

```ts
User.profileData;
```

</td>
<td>

[libs/nest-connector/src/auth/interfaces/user.interface.ts:104](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/auth/interfaces/user.interface.ts#L104)

</td>
</tr>
<tr>
<td>

<a id="property-refreshtoken-1"></a> `refreshToken`

</td>
<td>

`RefreshToken`

</td>
<td>

A token used to refresh the user's access token when it expires.
This is a long-lived token that should be kept secure.

**See**

RefreshToken Branded type for refresh tokens

</td>
<td>

```ts
UserSession.refreshToken;
```

</td>
<td>

[libs/nest-connector/src/auth/interfaces/user-session.interface.ts:42](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/auth/interfaces/user-session.interface.ts#L42)

</td>
</tr>
<tr>
<td>

<a id="property-role"></a> `role`

</td>
<td>

`string` | `Role`<`string`, `string`> | `null`

</td>
<td>

The authorization role assigned to the user.

Determines the user's permissions and access levels within the system.
Can be a complex Role object or a simple string identifier.

**See**

Role Interface defining user authorization roles

</td>
<td>

```ts
User.role;
```

</td>
<td>

[libs/nest-connector/src/auth/interfaces/user.interface.ts:75](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/auth/interfaces/user.interface.ts#L75)

</td>
</tr>
<tr>
<td>

<a id="property-roleid"></a> `roleId?`

</td>
<td>

`EntityId` | `null`

</td>
<td>

The unique identifier of the user's role.

Optional foreign key reference to the role entity. This property provides
a direct link to the role's identifier when the role is stored as a separate
entity in the database. May be null if the role is embedded directly or
if no role is assigned.

**See**

- EntityId Type definition for entity identifiers
- Role Interface defining user authorization roles

</td>
<td>

```ts
User.roleId;
```

</td>
<td>

[libs/nest-connector/src/auth/interfaces/user.interface.ts:88](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/auth/interfaces/user.interface.ts#L88)

</td>
</tr>
<tr>
<td>

<a id="property-sessionid"></a> `sessionId`

</td>
<td>

`string`

</td>
<td>

A unique identifier for this specific user session.
Used to distinguish between multiple active sessions for the same user.

</td>
<td>

```ts
UserSession.sessionId;
```

</td>
<td>

[libs/nest-connector/src/auth/interfaces/user-session.interface.ts:26](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/auth/interfaces/user-session.interface.ts#L26)

</td>
</tr>
<tr>
<td>

<a id="property-signuptype"></a> `signUpType`

</td>
<td>

`AuthProvider`

</td>
<td>

The method used for account creation/registration.

Indicates whether the user registered directly or via a third-party
authentication provider (Google, Facebook, etc.). This affects available
authentication methods and account management options.

**See**

AuthProvider Enumeration of registration methods

</td>
<td>

```ts
User.signUpType;
```

</td>
<td>

[libs/nest-connector/src/auth/interfaces/user.interface.ts:65](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/auth/interfaces/user.interface.ts#L65)

</td>
</tr>
<tr>
<td>

<a id="property-socketid"></a> `socketId?`

</td>
<td>

`string`

</td>
<td>

The identifier for a websocket connection associated with this session.
Used for real-time communication features if applicable.

Optional: This may not be present if the session doesn't have an active socket connection.

</td>
<td>

```ts
UserSession.socketId;
```

</td>
<td>

[libs/nest-connector/src/auth/interfaces/user-session.interface.ts:50](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/auth/interfaces/user-session.interface.ts#L50)

</td>
</tr>
<tr>
<td>

<a id="property-updatedat"></a> `updatedAt`

</td>
<td>

`Date`

</td>
<td>

Timestamp when the entity was last updated.

This value is automatically updated whenever any property of the entity
changes, providing a way to track the recency of data and implement
optimistic concurrency control.

</td>
<td>

```ts
User.updatedAt;
```

</td>
<td>

[libs/nest-connector/src/crud/interfaces/model.interface.ts:74](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/crud/interfaces/model.interface.ts#L74)

</td>
</tr>
<tr>
<td>

<a id="property-updatedby"></a> `updatedBy`

</td>
<td>

`UserInfo` | `null`

</td>
<td>

Detailed information about the user who last updated this entity.

Contains essential identifying information about the last user to modify
the record. Used primarily for display in audit logs and history views.

**See**

UserInfo Interface for user reference information

</td>
<td>

```ts
User.updatedBy;
```

</td>
<td>

[libs/nest-connector/src/crud/interfaces/model.interface.ts:120](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/crud/interfaces/model.interface.ts#L120)

</td>
</tr>
<tr>
<td>

<a id="property-updatedbyid"></a> `updatedById`

</td>
<td>

`EntityId` | `null`

</td>
<td>

ID of the user who last updated this entity.

Tracks which user most recently modified any property of this entity.
Essential for audit trails and accountability in multi-user systems.

</td>
<td>

```ts
User.updatedById;
```

</td>
<td>

[libs/nest-connector/src/crud/interfaces/model.interface.ts:110](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/crud/interfaces/model.interface.ts#L110)

</td>
</tr>
<tr>
<td>

<a id="property-username-2"></a> `username`

</td>
<td>

`string` | `null`

</td>
<td>

The user's chosen username.

Optional identifier that may be used as an alternative to email for
authentication. May be displayed publicly or used for personalization.

</td>
<td>

```ts
User.username;
```

</td>
<td>

[libs/nest-connector/src/auth/interfaces/user.interface.ts:43](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/auth/interfaces/user.interface.ts#L43)

</td>
</tr>
</tbody>
</table>

---

### CacheUser

Defined in: [libs/nest-auth/src/interfaces/cache-user.interfaces.ts:18](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/interfaces/cache-user.interfaces.ts#L18)

Interface representing a user with caching capabilities.

A `CacheUser` extends the base User interface and UserExtra interface, adding
properties for tracking active sessions and optionally storing encrypted session data.
This interface is used for storing user information in the cache service.

CacheUser

#### See

- User Base user interface with core user properties
- [UserExtra](#userextra) Additional authentication-related user properties

#### Extends

- `User`.[`UserExtra`](#userextra)

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Description</th>
<th>Inherited from</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="property-authfield-2"></a> `authField?`

</td>
<td>

`string`

</td>
<td>

The name of the field used for authentication

This property stores which field is used as the identifier during authentication.
Common values would be 'email', 'username', or any other unique identifier field.

This allows the authentication system to be flexible and support different
authentication strategies based on configuration.

**See**

- AuthField Enum of standard authentication field options
- [AuthOptions.authField](#property-authfield) Configuration for the default authentication field

</td>
<td>

[`UserExtra`](#userextra).[`authField`](#property-authfield-3)

</td>
<td>

[libs/nest-auth/src/interfaces/user-extra.interfaces.ts:33](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/interfaces/user-extra.interfaces.ts#L33)

</td>
</tr>
<tr>
<td>

<a id="property-authfieldvalue-1"></a> `authFieldValue?`

</td>
<td>

`string`

</td>
<td>

The value of the authentication field for this user

This property stores the actual value of the field used for authentication.
For example, if authField is 'email', this would contain the user's email address.

Storing this separately allows for optimized lookups during authentication
without having to determine which field to use at runtime.

</td>
<td>

[`UserExtra`](#userextra).[`authFieldValue`](#property-authfieldvalue-2)

</td>
<td>

[libs/nest-auth/src/interfaces/user-extra.interfaces.ts:44](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/interfaces/user-extra.interfaces.ts#L44)

</td>
</tr>
<tr>
<td>

<a id="property-avatar-1"></a> `avatar`

</td>
<td>

`string` | `null`

</td>
<td>

URL or path to the user's profile picture/avatar.

Provides a visual representation of the user throughout the application.
May be automatically populated from social login providers when available.

</td>
<td>

```ts
User.avatar;
```

</td>
<td>

[libs/nest-connector/src/auth/interfaces/user.interface.ts:112](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/auth/interfaces/user.interface.ts#L112)

</td>
</tr>
<tr>
<td>

<a id="property-createdat-1"></a> `createdAt`

</td>
<td>

`Date`

</td>
<td>

Timestamp when the entity was created.

This value is set automatically on entity creation and never changes
afterward, providing an immutable record of when the data was first added.

</td>
<td>

```ts
User.createdAt;
```

</td>
<td>

[libs/nest-connector/src/crud/interfaces/model.interface.ts:65](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/crud/interfaces/model.interface.ts#L65)

</td>
</tr>
<tr>
<td>

<a id="property-createdby-1"></a> `createdBy`

</td>
<td>

`UserInfo` | `null`

</td>
<td>

Detailed information about the user who created this entity.

Contains essential identifying information about the creator without
including sensitive data. This property may be populated through a join or
separate query when needed for display purposes.

**See**

UserInfo Interface for user reference information

</td>
<td>

```ts
User.createdBy;
```

</td>
<td>

[libs/nest-connector/src/crud/interfaces/model.interface.ts:102](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/crud/interfaces/model.interface.ts#L102)

</td>
</tr>
<tr>
<td>

<a id="property-createdbyid-1"></a> `createdById`

</td>
<td>

`EntityId` | `null`

</td>
<td>

ID of the user who created this entity.

Stores just the ID reference to the user for efficient database storage.
Use in conjunction with the `createdBy` property when user details are needed.

</td>
<td>

```ts
User.createdById;
```

</td>
<td>

[libs/nest-connector/src/crud/interfaces/model.interface.ts:91](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/crud/interfaces/model.interface.ts#L91)

</td>
</tr>
<tr>
<td>

<a id="property-deletedat-1"></a> `deletedAt`

</td>
<td>

`Date` | `null`

</td>
<td>

Timestamp when the entity was soft-deleted, if applicable.

When present and not null, indicates that this entity has been deleted
logically but is still present in the database. This enables data recovery
and maintains referential integrity while hiding the record from normal queries.

</td>
<td>

```ts
User.deletedAt;
```

</td>
<td>

[libs/nest-connector/src/crud/interfaces/model.interface.ts:83](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/crud/interfaces/model.interface.ts#L83)

</td>
</tr>
<tr>
<td>

<a id="property-deletedby-1"></a> `deletedBy`

</td>
<td>

`UserInfo` | `null`

</td>
<td>

Detailed information about the user who soft-deleted this entity, if applicable.

Contains identifying information about the user who performed the deletion,
used primarily in administrative interfaces for reviewing deletion history.

**See**

UserInfo Interface for user reference information

</td>
<td>

```ts
User.deletedBy;
```

</td>
<td>

[libs/nest-connector/src/crud/interfaces/model.interface.ts:138](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/crud/interfaces/model.interface.ts#L138)

</td>
</tr>
<tr>
<td>

<a id="property-deletedbyid-1"></a> `deletedById`

</td>
<td>

`EntityId` | `null`

</td>
<td>

ID of the user who soft-deleted this entity, if applicable.

When an entity is soft-deleted, this property stores the ID of the user
who performed the deletion action for accountability purposes.

</td>
<td>

```ts
User.deletedById;
```

</td>
<td>

[libs/nest-connector/src/crud/interfaces/model.interface.ts:128](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/crud/interfaces/model.interface.ts#L128)

</td>
</tr>
<tr>
<td>

<a id="property-email-5"></a> `email`

</td>
<td>

`string` | `null`

</td>
<td>

The user's email address.

May be optional for some authentication methods, but generally serves
as the primary means of communication and account recovery.
Often used as the primary identifier for authentication.

</td>
<td>

```ts
User.email;
```

</td>
<td>

[libs/nest-connector/src/auth/interfaces/user.interface.ts:35](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/auth/interfaces/user.interface.ts#L35)

</td>
</tr>
<tr>
<td>

<a id="property-emailverified-1"></a> `emailVerified`

</td>
<td>

`boolean`

</td>
<td>

Indicates whether the user's email address has been verified.

Email verification is an important security measure to confirm user identity
and prevent account abuse. Some features may be restricted until verification.

</td>
<td>

```ts
User.emailVerified;
```

</td>
<td>

[libs/nest-connector/src/auth/interfaces/user.interface.ts:96](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/auth/interfaces/user.interface.ts#L96)

</td>
</tr>
<tr>
<td>

<a id="property-encryptedsessions"></a> `encryptedSessions?`

</td>
<td>

`string`

</td>
<td>

An optional encrypted string representation of the user's sessions.
This field is only populated when session encryption is enabled via sessionSecret in authOptions.

When sessions are encrypted:

- The sessions array will be empty
- Session data is securely stored in this encrypted string
- Sessions are automatically decrypted when reading from persistent storage

**See**

- [AuthOptions.sessionSecret](#property-sessionsecret) Configuration option that enables session encryption
- UserSession The structure of each session when decrypted

</td>
<td>

‐

</td>
<td>

[libs/nest-auth/src/interfaces/cache-user.interfaces.ts:43](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/interfaces/cache-user.interfaces.ts#L43)

</td>
</tr>
<tr>
<td>

<a id="property-firstname-2"></a> `firstName`

</td>
<td>

`string`

</td>
<td>

The user's first name or given name.

Used for personalization and formal addressing throughout the application.

</td>
<td>

```ts
User.firstName;
```

</td>
<td>

[libs/nest-connector/src/common/interfaces/user-info.interface.ts:52](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/common/interfaces/user-info.interface.ts#L52)

</td>
</tr>
<tr>
<td>

<a id="property-fullname-1"></a> `fullName`

</td>
<td>

`string`

</td>
<td>

The user's complete name, typically a combination of first and last name.

This property provides a convenience for displaying the user's full name
without having to concatenate the first and last names manually. The exact
format may vary based on locale and application requirements.

</td>
<td>

```ts
User.fullName;
```

</td>
<td>

[libs/nest-connector/src/common/interfaces/user-info.interface.ts:68](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/common/interfaces/user-info.interface.ts#L68)

</td>
</tr>
<tr>
<td>

<a id="property-id-1"></a> `id`

</td>
<td>

`EntityId`

</td>
<td>

The unique identifier for the user.

This ID corresponds to the primary key in the users table
and uniquely identifies the user across the entire system.

</td>
<td>

```ts
User.id;
```

</td>
<td>

[libs/nest-connector/src/common/interfaces/user-info.interface.ts:45](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/common/interfaces/user-info.interface.ts#L45)

</td>
</tr>
<tr>
<td>

<a id="property-lastname-2"></a> `lastName`

</td>
<td>

`string`

</td>
<td>

The user's last name or family name.

Used alongside the first name for formal addressing and identification.

</td>
<td>

```ts
User.lastName;
```

</td>
<td>

[libs/nest-connector/src/common/interfaces/user-info.interface.ts:59](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/common/interfaces/user-info.interface.ts#L59)

</td>
</tr>
<tr>
<td>

<a id="property-password-4"></a> `password`

</td>
<td>

`string` | `null`

</td>
<td>

The user's password (typically hashed).

Optional as some authentication methods (e.g., OAuth) don't use passwords.
When present, this should always be a hashed version of the password,
never the plaintext value.

Note: This field is typically excluded from responses sent to clients.

</td>
<td>

```ts
User.password;
```

</td>
<td>

[libs/nest-connector/src/auth/interfaces/user.interface.ts:54](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/auth/interfaces/user.interface.ts#L54)

</td>
</tr>
<tr>
<td>

<a id="property-profiledata-1"></a> `profileData`

</td>
<td>

`GoogleProfile` | `null`

</td>
<td>

Additional profile information for the user.

This flexible object can contain various user-specific details not covered
by standard fields, such as preferences, settings, or application-specific data.

</td>
<td>

```ts
User.profileData;
```

</td>
<td>

[libs/nest-connector/src/auth/interfaces/user.interface.ts:104](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/auth/interfaces/user.interface.ts#L104)

</td>
</tr>
<tr>
<td>

<a id="property-role-1"></a> `role`

</td>
<td>

`string` | `Role`<`string`, `string`> | `null`

</td>
<td>

The authorization role assigned to the user.

Determines the user's permissions and access levels within the system.
Can be a complex Role object or a simple string identifier.

**See**

Role Interface defining user authorization roles

</td>
<td>

```ts
User.role;
```

</td>
<td>

[libs/nest-connector/src/auth/interfaces/user.interface.ts:75](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/auth/interfaces/user.interface.ts#L75)

</td>
</tr>
<tr>
<td>

<a id="property-roleid-1"></a> `roleId?`

</td>
<td>

`EntityId` | `null`

</td>
<td>

The unique identifier of the user's role.

Optional foreign key reference to the role entity. This property provides
a direct link to the role's identifier when the role is stored as a separate
entity in the database. May be null if the role is embedded directly or
if no role is assigned.

**See**

- EntityId Type definition for entity identifiers
- Role Interface defining user authorization roles

</td>
<td>

```ts
User.roleId;
```

</td>
<td>

[libs/nest-connector/src/auth/interfaces/user.interface.ts:88](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/auth/interfaces/user.interface.ts#L88)

</td>
</tr>
<tr>
<td>

<a id="property-sessions"></a> `sessions`

</td>
<td>

`UserSession`\[]

</td>
<td>

An array of active user session objects.
Each session represents a distinct authenticated instance of this user
across different devices, browsers, or applications.

When a user logs in, a new session is created and added to this array.
When they log out, the corresponding session is removed.

**See**

UserSession The structure of each session object

</td>
<td>

‐

</td>
<td>

[libs/nest-auth/src/interfaces/cache-user.interfaces.ts:29](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/interfaces/cache-user.interfaces.ts#L29)

</td>
</tr>
<tr>
<td>

<a id="property-signuptype-1"></a> `signUpType`

</td>
<td>

`AuthProvider`

</td>
<td>

The method used for account creation/registration.

Indicates whether the user registered directly or via a third-party
authentication provider (Google, Facebook, etc.). This affects available
authentication methods and account management options.

**See**

AuthProvider Enumeration of registration methods

</td>
<td>

```ts
User.signUpType;
```

</td>
<td>

[libs/nest-connector/src/auth/interfaces/user.interface.ts:65](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/auth/interfaces/user.interface.ts#L65)

</td>
</tr>
<tr>
<td>

<a id="property-updatedat-1"></a> `updatedAt`

</td>
<td>

`Date`

</td>
<td>

Timestamp when the entity was last updated.

This value is automatically updated whenever any property of the entity
changes, providing a way to track the recency of data and implement
optimistic concurrency control.

</td>
<td>

```ts
User.updatedAt;
```

</td>
<td>

[libs/nest-connector/src/crud/interfaces/model.interface.ts:74](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/crud/interfaces/model.interface.ts#L74)

</td>
</tr>
<tr>
<td>

<a id="property-updatedby-1"></a> `updatedBy`

</td>
<td>

`UserInfo` | `null`

</td>
<td>

Detailed information about the user who last updated this entity.

Contains essential identifying information about the last user to modify
the record. Used primarily for display in audit logs and history views.

**See**

UserInfo Interface for user reference information

</td>
<td>

```ts
User.updatedBy;
```

</td>
<td>

[libs/nest-connector/src/crud/interfaces/model.interface.ts:120](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/crud/interfaces/model.interface.ts#L120)

</td>
</tr>
<tr>
<td>

<a id="property-updatedbyid-1"></a> `updatedById`

</td>
<td>

`EntityId` | `null`

</td>
<td>

ID of the user who last updated this entity.

Tracks which user most recently modified any property of this entity.
Essential for audit trails and accountability in multi-user systems.

</td>
<td>

```ts
User.updatedById;
```

</td>
<td>

[libs/nest-connector/src/crud/interfaces/model.interface.ts:110](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/crud/interfaces/model.interface.ts#L110)

</td>
</tr>
<tr>
<td>

<a id="property-username-3"></a> `username`

</td>
<td>

`string` | `null`

</td>
<td>

The user's chosen username.

Optional identifier that may be used as an alternative to email for
authentication. May be displayed publicly or used for personalization.

</td>
<td>

```ts
User.username;
```

</td>
<td>

[libs/nest-connector/src/auth/interfaces/user.interface.ts:43](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/auth/interfaces/user.interface.ts#L43)

</td>
</tr>
</tbody>
</table>

---

### CookiesOptions

Defined in: [libs/nest-auth/src/interfaces/auth-options.interface.ts:100](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/interfaces/auth-options.interface.ts#L100)

Cookie configuration options

This interface defines the configuration for cookies used in authentication,
including security settings. Cookies are used to store authentication tokens
in the user's browser, providing a seamless authentication experience across
page refreshes and browser sessions.

Properly configured cookie settings are essential for security. In production
environments, it's recommended to set `secure: true` and use appropriate
`sameSite` settings to protect against CSRF and other attacks.

#### Example

```typescript
// Example cookie configuration for development
const devCookieOptions: CookiesOptions = {
  secret: "your-cookie-signing-secret",
  sameSite: "lax",
  secure: false, // Set to true in production
};

// Example cookie configuration for production
const prodCookieOptions: CookiesOptions = {
  secret: process.env.COOKIE_SECRET,
  sameSite: "strict",
  secure: true,
};
```

#### See

<https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies> MDN Web Docs: HTTP cookies

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

<a id="property-samesite"></a> `sameSite?`

</td>
<td>

`boolean` | `"lax"` | `"strict"` | `"none"`

</td>
<td>

Controls how cookies are sent with cross-site requests

</td>
<td>

[libs/nest-auth/src/interfaces/auth-options.interface.ts:104](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/interfaces/auth-options.interface.ts#L104)

</td>
</tr>
<tr>
<td>

<a id="property-secret"></a> `secret?`

</td>
<td>

`string`

</td>
<td>

Secret key used for signing cookies

</td>
<td>

[libs/nest-auth/src/interfaces/auth-options.interface.ts:102](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/interfaces/auth-options.interface.ts#L102)

</td>
</tr>
<tr>
<td>

<a id="property-secure"></a> `secure?`

</td>
<td>

`boolean`

</td>
<td>

Whether cookies should only be sent over HTTPS

</td>
<td>

[libs/nest-auth/src/interfaces/auth-options.interface.ts:106](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/interfaces/auth-options.interface.ts#L106)

</td>
</tr>
</tbody>
</table>

---

### GoogleAuthOptions

Defined in: [libs/nest-auth/src/interfaces/auth-options.interface.ts:60](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/interfaces/auth-options.interface.ts#L60)

Google OAuth authentication configuration options

This interface defines the configuration required for Google OAuth authentication,
including client credentials and callback URL. Google OAuth allows users to sign in
to your application using their Google accounts, providing a secure and convenient
authentication method without requiring users to create new credentials.

To use Google OAuth, you need to create a project in the Google Developer Console
and configure OAuth credentials.

#### Example

```typescript
// Example Google OAuth configuration
const googleAuthOptions: GoogleAuthOptions = {
  clientId: "your-google-client-id.apps.googleusercontent.com",
  clientSecret: "your-google-client-secret",
  callbackUrl: "https://your-app.com/api/auth/google/callback",
};
```

#### See

<https://console.developers.google.com/> Google Developer Console

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

<a id="property-callbackurl"></a> `callbackUrl`

</td>
<td>

`string`

</td>
<td>

URL where Google will redirect after authentication

</td>
<td>

[libs/nest-auth/src/interfaces/auth-options.interface.ts:66](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/interfaces/auth-options.interface.ts#L66)

</td>
</tr>
<tr>
<td>

<a id="property-clientid"></a> `clientId`

</td>
<td>

`string`

</td>
<td>

Google OAuth client ID from Google Developer Console

</td>
<td>

[libs/nest-auth/src/interfaces/auth-options.interface.ts:62](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/interfaces/auth-options.interface.ts#L62)

</td>
</tr>
<tr>
<td>

<a id="property-clientsecret"></a> `clientSecret`

</td>
<td>

`string`

</td>
<td>

Google OAuth client secret from Google Developer Console

</td>
<td>

[libs/nest-auth/src/interfaces/auth-options.interface.ts:64](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/interfaces/auth-options.interface.ts#L64)

</td>
</tr>
</tbody>
</table>

---

### IJwtPayload

Defined in: [libs/nest-auth/src/interfaces/token-data.interface.ts:17](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/interfaces/token-data.interface.ts#L17)

Interface representing the payload of a JWT token

This interface defines the minimum structure for JWT payloads used in the authentication system.
It follows the JWT standard by using 'sub' (subject) to store the user identifier.

The 'sub' claim in a JWT is intended to be a unique identifier for the subject of the token,
which in most authentication scenarios is the user ID.

#### See

- [JwtTokenService](#jwttokenservice) Service that creates and verifies JWT tokens
- [JwtOptions](#jwtoptions) Configuration options for JWT authentication
- AccessToken Branded type for access tokens
- RefreshToken Branded type for refresh tokens

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

<a id="property-sub"></a> `sub`

</td>
<td>

`EntityId`

</td>
<td>

The subject of the token, typically the user's unique identifier

Following JWT standards, the 'sub' (subject) claim identifies the principal
that is the subject of the JWT. In most authentication systems,
this will be the user's ID from the database.

**See**

- EntityId Type for entity identifiers from @hichchi/nest-connector/crud
- <https://tools.ietf.org/html/rfc7519#section-4.1.2> JWT RFC - 'sub' claim

</td>
<td>

[libs/nest-auth/src/interfaces/token-data.interface.ts:28](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/interfaces/token-data.interface.ts#L28)

</td>
</tr>
</tbody>
</table>

---

### IUserService

Defined in: [libs/nest-auth/src/interfaces/user-service.interface.ts:473](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/interfaces/user-service.interface.ts#L473)

Full user-service contract combining required auth actions and optional lifecycle events.

#### Extends

- [`UserServiceActions`](#userserviceactions).[`UserServiceEvents`](#userserviceevents)

#### Methods

##### getUserByAuthField()?

```ts
optional getUserByAuthField(authFieldValue, subdomain?): Promise<User<string, string> | null>;
```

Defined in: [libs/nest-auth/src/interfaces/user-service.interface.ts:395](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/interfaces/user-service.interface.ts#L395)

Retrieve a user by the configured authentication field

This optional method is used when the authentication field is configurable
and can be something other than email or username. The specific field used
is determined by the authField setting in AuthOptions.

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

`authFieldValue`

</td>
<td>

`string` | `number`

</td>
<td>

The value of the authentication field to search for

</td>
</tr>
<tr>
<td>

`subdomain?`

</td>
<td>

`string`

</td>
<td>

Optional subdomain context for multi-tenant applications

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`User`<`string`, `string`> | `null`>

The user if found, null otherwise

###### See

- User Base user interface structure
- [UserExtra](#userextra) Interface containing authField and authFieldValue properties
- AuthField Enum of standard authentication field options

###### Inherited from

[`UserServiceActions`](#userserviceactions).[`getUserByAuthField`](#getuserbyauthfield-1)

##### getUserByEmail()

```ts
getUserByEmail(email, subdomain?): Promise<User<string, string> & object | null>;
```

Defined in: [libs/nest-auth/src/interfaces/user-service.interface.ts:343](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/interfaces/user-service.interface.ts#L343)

Retrieve a user by their email address

This method is used during email-based authentication flows to find
a user based on their email address.

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

`email`

</td>
<td>

`string`

</td>
<td>

The email address to search for

</td>
</tr>
<tr>
<td>

`subdomain?`

</td>
<td>

`string`

</td>
<td>

Optional subdomain context for multi-tenant applications

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`User`<`string`, `string`> & `object` | `null`>

The user if found, null otherwise

###### See

- User Base user interface structure
- [sendPasswordResetEmail](#sendpasswordresetemail-1) Related method that may use this lookup
- [getUserByUsernameOrEmail](#getuserbyusernameoremail-1) Related lookup method

###### Inherited from

[`UserServiceActions`](#userserviceactions).[`getUserByEmail`](#getuserbyemail-1)

##### getUserById()

```ts
getUserById(id, subdomain?): Promise<User<string, string> | null>;
```

Defined in: [libs/nest-auth/src/interfaces/user-service.interface.ts:327](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/interfaces/user-service.interface.ts#L327)

Retrieve a user by their unique identifier

This method is the primary way to look up a user in the system.
It should return the complete user object if found, or null if not found.

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

`id`

</td>
<td>

`EntityId`

</td>
<td>

The unique identifier of the user to retrieve

</td>
</tr>
<tr>
<td>

`subdomain?`

</td>
<td>

`string`

</td>
<td>

Optional subdomain context for multi-tenant applications

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`User`<`string`, `string`> | `null`>

The user if found, null otherwise

###### See

- User Base user interface structure
- EntityId Type for entity identifiers
- [onGetUserByToken](#ongetuserbytoken) Related event handler

###### Inherited from

[`UserServiceActions`](#userserviceactions).[`getUserById`](#getuserbyid-1)

##### getUserByUsername()?

```ts
optional getUserByUsername(username, subdomain?): Promise<User<string, string> & object | null>;
```

Defined in: [libs/nest-auth/src/interfaces/user-service.interface.ts:359](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/interfaces/user-service.interface.ts#L359)

Retrieve a user by their username

This optional method is used during username-based authentication flows
to find a user based on their username.

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

`username`

</td>
<td>

`string`

</td>
<td>

The username to search for

</td>
</tr>
<tr>
<td>

`subdomain?`

</td>
<td>

`string`

</td>
<td>

Optional subdomain context for multi-tenant applications

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`User`<`string`, `string`> & `object` | `null`>

The user if found, null otherwise

###### See

- User Base user interface structure
- [getUserByUsernameOrEmail](#getuserbyusernameoremail-1) Related lookup method
- [UserExtra](#userextra) Additional authentication-related user properties

###### Inherited from

[`UserServiceActions`](#userserviceactions).[`getUserByUsername`](#getuserbyusername-1)

##### getUserByUsernameOrEmail()?

```ts
optional getUserByUsernameOrEmail(username, subdomain?): Promise<User<string, string> & object | null>;
```

Defined in: [libs/nest-auth/src/interfaces/user-service.interface.ts:375](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/interfaces/user-service.interface.ts#L375)

Retrieve a user by either username or email

This optional method is used when the authentication system allows
users to sign in with either their username or email address.

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

`username`

</td>
<td>

`string`

</td>
<td>

The username or email to search for

</td>
</tr>
<tr>
<td>

`subdomain?`

</td>
<td>

`string`

</td>
<td>

Optional subdomain context for multi-tenant applications

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`User`<`string`, `string`> & `object` | `null`>

The user if found, null otherwise

###### See

- User Base user interface structure
- [getUserByUsername](#getuserbyusername-1) Related lookup method
- [getUserByEmail](#getuserbyemail-1) Related lookup method

###### Inherited from

[`UserServiceActions`](#userserviceactions).[`getUserByUsernameOrEmail`](#getuserbyusernameoremail-1)

##### onAuthenticate()?

```ts
optional onAuthenticate(
   request,
   authUser?,
error?): Promise<void>;
```

Defined in: [libs/nest-auth/src/interfaces/user-service.interface.ts:239](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/interfaces/user-service.interface.ts#L239)

Generic event handler triggered after any authentication attempt

This handler is called after any authentication attempt, regardless of
the specific strategy used or whether the attempt was successful.
It provides a central point for monitoring all authentication activity.

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

`request`

</td>
<td>

`Request`

</td>
<td>

The Express request object

</td>
</tr>
<tr>
<td>

`authUser?`

</td>
<td>

[`AuthUser`](#authuser)

</td>
<td>

The authenticated user (if successful)

</td>
</tr>
<tr>
<td>

`error?`

</td>
<td>

`unknown`

</td>
<td>

Error information (if authentication failed)

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`void`>

###### See

- [AuthUser](#authuser) Combined user and token information
- [onAuthenticateJWT](#onauthenticatejwt-1) Strategy-specific authentication event
- [onAuthenticateGoogle](#onauthenticategoogle-1) Strategy-specific authentication event

###### Inherited from

[`UserServiceEvents`](#userserviceevents).[`onAuthenticate`](#onauthenticate-1)

##### onAuthenticateGoogle()?

```ts
optional onAuthenticateGoogle(
   request,
   authUser?,
error?): Promise<void>;
```

Defined in: [libs/nest-auth/src/interfaces/user-service.interface.ts:273](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/interfaces/user-service.interface.ts#L273)

Event handler triggered after Google OAuth authentication attempts

This handler is called specifically when Google OAuth authentication is attempted,
regardless of whether the attempt was successful. It allows for
strategy-specific monitoring and logging.

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

`request`

</td>
<td>

`Request`

</td>
<td>

The Express request object

</td>
</tr>
<tr>
<td>

`authUser?`

</td>
<td>

[`AuthUser`](#authuser)

</td>
<td>

The authenticated user (if successful)

</td>
</tr>
<tr>
<td>

`error?`

</td>
<td>

`unknown`

</td>
<td>

Error information (if authentication failed)

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`void`>

###### See

- [AuthUser](#authuser) Combined user and token information
- GoogleProfile Google user profile information
- [onAuthenticate](#onauthenticate-1) Generic authentication event

###### Inherited from

[`UserServiceEvents`](#userserviceevents).[`onAuthenticateGoogle`](#onauthenticategoogle-1)

##### onAuthenticateJWT()?

```ts
optional onAuthenticateJWT(
   request,
   authUser?,
error?): Promise<void>;
```

Defined in: [libs/nest-auth/src/interfaces/user-service.interface.ts:256](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/interfaces/user-service.interface.ts#L256)

Event handler triggered after JWT authentication attempts

This handler is called specifically when JWT authentication is attempted,
regardless of whether the attempt was successful. It allows for
strategy-specific monitoring and logging.

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

`request`

</td>
<td>

`Request`

</td>
<td>

The Express request object

</td>
</tr>
<tr>
<td>

`authUser?`

</td>
<td>

[`AuthUser`](#authuser)

</td>
<td>

The authenticated user (if successful)

</td>
</tr>
<tr>
<td>

`error?`

</td>
<td>

`unknown`

</td>
<td>

Error information (if authentication failed)

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`void`>

###### See

- [AuthUser](#authuser) Combined user and token information
- [IJwtPayload](#ijwtpayload) Structure of JWT token payload
- [onAuthenticate](#onauthenticate-1) Generic authentication event

###### Inherited from

[`UserServiceEvents`](#userserviceevents).[`onAuthenticateJWT`](#onauthenticatejwt-1)

##### onChangePassword()?

```ts
optional onChangePassword(
   request,
   authUser?,
error?): Promise<void>;
```

Defined in: [libs/nest-auth/src/interfaces/user-service.interface.ts:158](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/interfaces/user-service.interface.ts#L158)

Event handler triggered after a password change attempt

This handler is called when a user attempts to change their password,
regardless of whether the attempt was successful. If successful, the authUser
parameter will contain the user information. If unsuccessful, the error parameter
will contain information about what went wrong.

Common uses include:

- Sending password change confirmation emails
- Logging password changes for security auditing
- Invalidating other active sessions after password change

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

`request`

</td>
<td>

`Request`

</td>
<td>

The Express request object

</td>
</tr>
<tr>
<td>

`authUser?`

</td>
<td>

[`AuthUser`](#authuser)

</td>
<td>

The authenticated user information (if successful)

</td>
</tr>
<tr>
<td>

`error?`

</td>
<td>

`unknown`

</td>
<td>

Error information (if password change failed)

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`void`>

###### See

- [updateUserById](#updateuserbyid) Method that may trigger this event
- [AuthUser](#authuser) Combined user and token information
- UserSession Session information including tokens

###### Inherited from

[`UserServiceEvents`](#userserviceevents).[`onChangePassword`](#onchangepassword-1)

##### onGetCurrentUser()?

```ts
optional onGetCurrentUser(
   request,
   authUser?,
error?): Promise<void>;
```

Defined in: [libs/nest-auth/src/interfaces/user-service.interface.ts:135](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/interfaces/user-service.interface.ts#L135)

Event handler triggered when current user information is requested

This handler is called when the application retrieves information about
the currently authenticated user. It can be used for monitoring user activity
or implementing additional authorization checks.

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

`request`

</td>
<td>

`Request`

</td>
<td>

The Express request object

</td>
</tr>
<tr>
<td>

`authUser?`

</td>
<td>

[`AuthUser`](#authuser)

</td>
<td>

The authenticated user information (if available)

</td>
</tr>
<tr>
<td>

`error?`

</td>
<td>

`unknown`

</td>
<td>

Error information (if retrieval failed)

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`void`>

###### See

- [AuthUser](#authuser) Combined user and token information
- [CacheUser](#cacheuser) User information stored in cache
- [UserExtra](#userextra) Additional authentication-related user properties

###### Inherited from

[`UserServiceEvents`](#userserviceevents).[`onGetCurrentUser`](#ongetcurrentuser-1)

##### onGetUserByToken()?

```ts
optional onGetUserByToken(
   request,
   userId?,
error?): Promise<void>;
```

Defined in: [libs/nest-auth/src/interfaces/user-service.interface.ts:290](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/interfaces/user-service.interface.ts#L290)

Event handler triggered when a user is retrieved by token

This handler is called when the application attempts to retrieve a user
based on an authentication token. It can be used for monitoring token usage
or implementing additional security checks.

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

`request`

</td>
<td>

`Request`

</td>
<td>

The Express request object

</td>
</tr>
<tr>
<td>

`userId?`

</td>
<td>

`EntityId`

</td>
<td>

The ID of the retrieved user (if successful)

</td>
</tr>
<tr>
<td>

`error?`

</td>
<td>

`unknown`

</td>
<td>

Error information (if retrieval failed)

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`void`>

###### See

- [IJwtPayload](#ijwtpayload) JWT token payload structure
- [AuthUser](#authuser) Combined user and token information
- [getUserById](#getuserbyid) Method that may be used to retrieve the user

###### Inherited from

[`UserServiceEvents`](#userserviceevents).[`onGetUserByToken`](#ongetuserbytoken-1)

##### onRefreshTokens()?

```ts
optional onRefreshTokens(request, authUser?): Promise<void>;
```

Defined in: [libs/nest-auth/src/interfaces/user-service.interface.ts:118](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/interfaces/user-service.interface.ts#L118)

Event handler triggered after token refresh operations

This handler is called when a user's authentication tokens are refreshed.
It provides an opportunity to log token refreshes, update analytics,
or perform additional security checks.

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

`request`

</td>
<td>

`Request`

</td>
<td>

The Express request object

</td>
</tr>
<tr>
<td>

`authUser?`

</td>
<td>

[`AuthUser`](#authuser)

</td>
<td>

The user with newly refreshed token information

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`void`>

###### See

- [AuthUser](#authuser) Combined user and token information
- UserSession Session information including tokens
- [IJwtPayload](#ijwtpayload) Structure of JWT token payload

###### Inherited from

[`UserServiceEvents`](#userserviceevents).[`onRefreshTokens`](#onrefreshtokens-1)

##### onRequestPasswordReset()?

```ts
optional onRequestPasswordReset(request, userId?): Promise<void>;
```

Defined in: [libs/nest-auth/src/interfaces/user-service.interface.ts:173](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/interfaces/user-service.interface.ts#L173)

Event handler triggered when a password reset is requested

This handler is called after a user requests a password reset.
It provides an opportunity to log the request, implement additional
security measures, or track reset request patterns.

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

`request`

</td>
<td>

`Request`

</td>
<td>

The Express request object

</td>
</tr>
<tr>
<td>

`userId?`

</td>
<td>

`EntityId`

</td>
<td>

The ID of the user requesting the reset (if found)

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`void`>

###### See

- [sendPasswordResetEmail](#sendpasswordresetemail) Method that triggers this event
- VerifyToken Token type used in reset emails

###### Inherited from

[`UserServiceEvents`](#userserviceevents).[`onRequestPasswordReset`](#onrequestpasswordreset-1)

##### onResendVerificationEmail()?

```ts
optional onResendVerificationEmail(request, userId): Promise<void>;
```

Defined in: [libs/nest-auth/src/interfaces/user-service.interface.ts:57](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/interfaces/user-service.interface.ts#L57)

Event handler triggered when a user requests a new verification email

This handler is called after a verification email has been resent to a user.
It provides an opportunity to perform additional actions such as logging,
rate limiting, or notifying administrators about repeated verification attempts.

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

`request`

</td>
<td>

`Request`

</td>
<td>

The Express request object

</td>
</tr>
<tr>
<td>

`userId`

</td>
<td>

`EntityId`

</td>
<td>

The ID of the user requesting the verification email

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`void`>

###### See

- [sendVerificationEmail](#sendverificationemail-1) Method that triggers this event
- VerifyToken Token type used in verification emails

###### Inherited from

[`UserServiceEvents`](#userserviceevents).[`onResendVerificationEmail`](#onresendverificationemail-1)

##### onResetPassword()?

```ts
optional onResetPassword(request, userId?): Promise<void>;
```

Defined in: [libs/nest-auth/src/interfaces/user-service.interface.ts:204](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/interfaces/user-service.interface.ts#L204)

Event handler triggered after a password is reset

This handler is called after a user completes a password reset.
It provides an opportunity to send confirmation emails, log the event,
or invalidate other active sessions after the reset.

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

`request`

</td>
<td>

`Request`

</td>
<td>

The Express request object

</td>
</tr>
<tr>
<td>

`userId?`

</td>
<td>

`EntityId`

</td>
<td>

The ID of the user who reset their password

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`void`>

###### See

- [updateUserById](#updateuserbyid) Method that may trigger this event
- [onVerifyResetPasswordToken](#onverifyresetpasswordtoken-1) Related event for token verification
- [onRequestPasswordReset](#onrequestpasswordreset-1) Related event for reset requests

###### Inherited from

[`UserServiceEvents`](#userserviceevents).[`onResetPassword`](#onresetpassword-1)

##### onSignIn()?

```ts
optional onSignIn(
   request,
   authUser?,
error?): Promise<void>;
```

Defined in: [libs/nest-auth/src/interfaces/user-service.interface.ts:102](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/interfaces/user-service.interface.ts#L102)

Event handler triggered after a user sign-in attempt

This handler is called whenever a user attempts to sign in, regardless of whether
the attempt was successful. If successful, the authUser parameter will contain
the authenticated user information with tokens. If unsuccessful, the error parameter
will contain information about what went wrong.

Common uses include:

- Logging successful/failed sign in attempts
- Updating user activity timestamps
- Tracking suspicious login patterns
- Sending notifications about new login activity

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

`request`

</td>
<td>

`Request`

</td>
<td>

The Express request object

</td>
</tr>
<tr>
<td>

`authUser?`

</td>
<td>

[`AuthUser`](#authuser)

</td>
<td>

The authenticated user with token information (if successful)

</td>
</tr>
<tr>
<td>

`error?`

</td>
<td>

`unknown`

</td>
<td>

Error information (if sign-in failed)

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`void`>

###### See

- [AuthUser](#authuser) Combined user and token information
- [IJwtPayload](#ijwtpayload) Structure of JWT token payload
- UserSession Session information stored with the user

###### Inherited from

[`UserServiceEvents`](#userserviceevents).[`onSignIn`](#onsignin-1)

##### onSignOut()?

```ts
optional onSignOut(
   request,
   authUser?,
error?): Promise<void>;
```

Defined in: [libs/nest-auth/src/interfaces/user-service.interface.ts:222](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/interfaces/user-service.interface.ts#L222)

Event handler triggered after a sign-out attempt

This handler is called when a user attempts to sign out, regardless of whether
the attempt was successful. If successful, the authUser parameter will contain
the user who signed out. If unsuccessful, the error parameter will contain
information about what went wrong.

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

`request`

</td>
<td>

`Request`

</td>
<td>

The Express request object

</td>
</tr>
<tr>
<td>

`authUser?`

</td>
<td>

[`AuthUser`](#authuser)

</td>
<td>

The user who signed out (if successful)

</td>
</tr>
<tr>
<td>

`error?`

</td>
<td>

`unknown`

</td>
<td>

Error information (if sign-out failed)

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`void`>

###### See

- [AuthUser](#authuser) Combined user and token information
- UserSession Session information including tokens
- [CacheUser](#cacheuser) Related interface for users stored in cache with sessions

###### Inherited from

[`UserServiceEvents`](#userserviceevents).[`onSignOut`](#onsignout-1)

##### onSignUp()?

```ts
optional onSignUp(
   request,
   userId?,
error?): Promise<void>;
```

Defined in: [libs/nest-auth/src/interfaces/user-service.interface.ts:42](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/interfaces/user-service.interface.ts#L42)

Event handler triggered after a user sign-up attempt

This handler is called after a user attempts to sign up, regardless of whether
the attempt was successful. If successful, the userId parameter will contain
the ID of the newly created user. If unsuccessful, the error parameter will
contain information about what went wrong.

Common uses include:

- Sending welcome emails to new users
- Setting up initial user data or preferences
- Tracking sign-up analytics
- Logging failed sign-up attempts for security monitoring

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

`request`

</td>
<td>

`Request`

</td>
<td>

The Express request object from the sign-up attempt

</td>
</tr>
<tr>
<td>

`userId?`

</td>
<td>

`EntityId`

</td>
<td>

The ID of the newly created user (if sign-up was successful)

</td>
</tr>
<tr>
<td>

`error?`

</td>
<td>

`unknown`

</td>
<td>

Error information (if sign-up failed)

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`void`>

###### See

- [signUpUser](#signupuser) Method that triggers this event
- User User entity structure
- AuthProvider Enum of sign-up methods

###### Inherited from

[`UserServiceEvents`](#userserviceevents).[`onSignUp`](#onsignup-1)

##### onVerifyEmail()?

```ts
optional onVerifyEmail(
   request,
   userId,
status): Promise<void>;
```

Defined in: [libs/nest-auth/src/interfaces/user-service.interface.ts:78](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/interfaces/user-service.interface.ts#L78)

Event handler triggered when a user verifies their email address

This handler is called after a user attempts to verify their email address,
whether the verification was successful or not. The status parameter indicates
whether the verification succeeded.

Common uses include:

- Updating user permissions or access levels after verification
- Sending follow-up emails with next steps
- Tracking verification success rates

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

`request`

</td>
<td>

`Request`

</td>
<td>

The Express request object

</td>
</tr>
<tr>
<td>

`userId`

</td>
<td>

`EntityId`

</td>
<td>

The ID of the user verifying their email

</td>
</tr>
<tr>
<td>

`status`

</td>
<td>

`boolean`

</td>
<td>

Whether the verification was successful

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`void`>

###### See

- User User entity structure
- VerifyToken Token type used in verification emails

###### Inherited from

[`UserServiceEvents`](#userserviceevents).[`onVerifyEmail`](#onverifyemail-1)

##### onVerifyResetPasswordToken()?

```ts
optional onVerifyResetPasswordToken(request, userId?): Promise<void>;
```

Defined in: [libs/nest-auth/src/interfaces/user-service.interface.ts:188](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/interfaces/user-service.interface.ts#L188)

Event handler triggered when a password reset token is verified

This handler is called when a user attempts to verify a password reset token.
It can be used to log verification attempts or implement additional security checks.

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

`request`

</td>
<td>

`Request`

</td>
<td>

The Express request object

</td>
</tr>
<tr>
<td>

`userId?`

</td>
<td>

`EntityId`

</td>
<td>

The ID of the user verifying the token (if valid)

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`void`>

###### See

- VerifyToken Token type used in reset process
- [IJwtPayload](#ijwtpayload) Structure of JWT token payload
- [sendPasswordResetEmail](#sendpasswordresetemail) Related method for sending reset tokens

###### Inherited from

[`UserServiceEvents`](#userserviceevents).[`onVerifyResetPasswordToken`](#onverifyresetpasswordtoken-1)

##### sendPasswordResetEmail()?

```ts
optional sendPasswordResetEmail(
   email,
   token,
subdomain?): Promise<boolean>;
```

Defined in: [libs/nest-auth/src/interfaces/user-service.interface.ts:448](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/interfaces/user-service.interface.ts#L448)

Send a password reset email to a user

This optional method is called when a user requests a password reset.
It should send an email containing a link with the reset token.

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

`email`

</td>
<td>

`string`

</td>
<td>

The email address to send the reset link to

</td>
</tr>
<tr>
<td>

`token`

</td>
<td>

`VerifyToken`

</td>
<td>

The verification token to include in the email

</td>
</tr>
<tr>
<td>

`subdomain?`

</td>
<td>

`string`

</td>
<td>

Optional subdomain context for multi-tenant applications

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`boolean`>

Whether the email was successfully sent

###### See

- VerifyToken Token type for verification purposes
- [onRequestPasswordReset](#onrequestpasswordreset) Event triggered when reset is requested
- [getUserByEmail](#getuserbyemail-1) Method used to find the user by email

###### Inherited from

[`UserServiceActions`](#userserviceactions).[`sendPasswordResetEmail`](#sendpasswordresetemail-1)

##### sendVerificationEmail()?

```ts
optional sendVerificationEmail(
   userId,
   token,
subdomain?): Promise<boolean>;
```

Defined in: [libs/nest-auth/src/interfaces/user-service.interface.ts:467](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/interfaces/user-service.interface.ts#L467)

Send an email verification email to a user

This optional method is called when a user needs to verify their email address,
either during sign-up or when changing their email. It should send an email
containing a link with the verification token.

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

`userId`

</td>
<td>

`EntityId`

</td>
<td>

The ID of the user to send the verification email to

</td>
</tr>
<tr>
<td>

`token`

</td>
<td>

`VerifyToken`

</td>
<td>

The verification token to include in the email

</td>
</tr>
<tr>
<td>

`subdomain?`

</td>
<td>

`string`

</td>
<td>

Optional subdomain context for multi-tenant applications

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`boolean`>

Whether the email was successfully sent

###### See

- VerifyToken Token type for verification purposes
- [onResendVerificationEmail](#onresendverificationemail) Event triggered when verification email is resent
- [onVerifyEmail](#onverifyemail) Event triggered when email is verified
- [getUserById](#getuserbyid-1) Method used to find the user by ID

###### Inherited from

[`UserServiceActions`](#userserviceactions).[`sendVerificationEmail`](#sendverificationemail-2)

##### signUpUser()

```ts
signUpUser(
   userDto,
   signUpType,
profile?): Promise<User<string, string> | null>;
```

Defined in: [libs/nest-auth/src/interfaces/user-service.interface.ts:413](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/interfaces/user-service.interface.ts#L413)

Create a new user account

This method is called during the sign-up process to create a new user
in the system. It should create the user record and return the created user.

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

`userDto`

</td>
<td>

`Partial`<`User`>

</td>
<td>

The user data to create

</td>
</tr>
<tr>
<td>

`signUpType`

</td>
<td>

`AuthProvider`

</td>
<td>

The method used for sign-up (local, Google, etc.)

</td>
</tr>
<tr>
<td>

`profile?`

</td>
<td>

`GoogleProfile`

</td>
<td>

Additional profile data from OAuth providers

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`User`<`string`, `string`> | `null`>

The created user

###### See

- User Base user interface structure
- AuthProvider Enum of sign-up methods
- GoogleProfile Google OAuth profile data structure
- [onSignUp](#onsignup) Event handler triggered after signup

###### Inherited from

[`UserServiceActions`](#userserviceactions).[`signUpUser`](#signupuser-1)

##### updateUserById()

```ts
updateUserById(
   id,
   userDto,
updatedBy): Promise<User<string, string>>;
```

Defined in: [libs/nest-auth/src/interfaces/user-service.interface.ts:431](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/interfaces/user-service.interface.ts#L431)

Update an existing user account

This method is used to update user information, such as when changing
passwords or updating profile details.

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

`id`

</td>
<td>

`EntityId`

</td>
<td>

The ID of the user to update

</td>
</tr>
<tr>
<td>

`userDto`

</td>
<td>

`Partial`<`User`>

</td>
<td>

The user data to update

</td>
</tr>
<tr>
<td>

`updatedBy`

</td>
<td>

`User`

</td>
<td>

The user performing the update (for audit trails)

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`User`<`string`, `string`>>

The updated user

###### See

- User Base user interface structure
- EntityId Type for entity identifiers
- [onChangePassword](#onchangepassword) Related event that may be triggered
- [onResetPassword](#onresetpassword) Related event that may be triggered

###### Inherited from

[`UserServiceActions`](#userserviceactions).[`updateUserById`](#updateuserbyid-1)

---

### JwtOptions

Defined in: [libs/nest-auth/src/interfaces/auth-options.interface.ts:26](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/interfaces/auth-options.interface.ts#L26)

JWT authentication configuration options

This interface defines the configuration for JWT-based authentication,
including secrets and expiration times for both access and refresh tokens.
JWT (JSON Web Token) is a compact, URL-safe means of representing claims
to be transferred between two parties.

#### Example

```typescript
// Example JWT configuration
const jwtOptions: JwtOptions = {
  secret: "your-secret-key-for-access-tokens",
  expiresIn: 3600, // 1 hour in seconds
  refreshSecret: "your-secret-key-for-refresh-tokens",
  refreshExpiresIn: 604800, // 7 days in seconds
};
```

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

<a id="property-expiresin"></a> `expiresIn`

</td>
<td>

`number`

</td>
<td>

Expiration time for access tokens in seconds

</td>
<td>

[libs/nest-auth/src/interfaces/auth-options.interface.ts:30](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/interfaces/auth-options.interface.ts#L30)

</td>
</tr>
<tr>
<td>

<a id="property-refreshexpiresin"></a> `refreshExpiresIn`

</td>
<td>

`number`

</td>
<td>

Expiration time for refresh tokens in seconds

</td>
<td>

[libs/nest-auth/src/interfaces/auth-options.interface.ts:34](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/interfaces/auth-options.interface.ts#L34)

</td>
</tr>
<tr>
<td>

<a id="property-refreshsecret"></a> `refreshSecret`

</td>
<td>

`string`

</td>
<td>

Secret key used to sign JWT refresh tokens

</td>
<td>

[libs/nest-auth/src/interfaces/auth-options.interface.ts:32](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/interfaces/auth-options.interface.ts#L32)

</td>
</tr>
<tr>
<td>

<a id="property-secret-1"></a> `secret`

</td>
<td>

`string`

</td>
<td>

Secret key used to sign JWT access tokens

</td>
<td>

[libs/nest-auth/src/interfaces/auth-options.interface.ts:28](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/interfaces/auth-options.interface.ts#L28)

</td>
</tr>
</tbody>
</table>

---

### UserExtra

Defined in: [libs/nest-auth/src/interfaces/user-extra.interfaces.ts:20](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/interfaces/user-extra.interfaces.ts#L20)

Interface representing additional authentication-related user properties.

The `UserExtra` interface extends the base user model with properties specifically
related to authentication mechanisms. It provides a flexible way to support
different authentication strategies (email, username, etc.) by storing the
authentication field name and its value separately.

This interface is used in combination with the base User interface in various
authentication contexts throughout the application.

UserExtra

#### See

- User Base user interface with core user properties
- [AuthUser](#authuser) Combined interface for users with authentication tokens
- [CacheUser](#cacheuser) Interface for users stored in cache
- AuthField Enum of standard authentication field options
- [AuthOptions.authField](#property-authfield) Configuration for the default authentication field

#### Extended by

- [`AuthUser`](#authuser)
- [`CacheUser`](#cacheuser)

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

<a id="property-authfield-3"></a> `authField?`

</td>
<td>

`string`

</td>
<td>

The name of the field used for authentication

This property stores which field is used as the identifier during authentication.
Common values would be 'email', 'username', or any other unique identifier field.

This allows the authentication system to be flexible and support different
authentication strategies based on configuration.

**See**

- AuthField Enum of standard authentication field options
- [AuthOptions.authField](#property-authfield) Configuration for the default authentication field

</td>
<td>

[libs/nest-auth/src/interfaces/user-extra.interfaces.ts:33](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/interfaces/user-extra.interfaces.ts#L33)

</td>
</tr>
<tr>
<td>

<a id="property-authfieldvalue-2"></a> `authFieldValue?`

</td>
<td>

`string`

</td>
<td>

The value of the authentication field for this user

This property stores the actual value of the field used for authentication.
For example, if authField is 'email', this would contain the user's email address.

Storing this separately allows for optimized lookups during authentication
without having to determine which field to use at runtime.

</td>
<td>

[libs/nest-auth/src/interfaces/user-extra.interfaces.ts:44](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/interfaces/user-extra.interfaces.ts#L44)

</td>
</tr>
</tbody>
</table>

---

### UserServiceActions

Defined in: [libs/nest-auth/src/interfaces/user-service.interface.ts:312](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/interfaces/user-service.interface.ts#L312)

Interface defining core user management service capabilities

The `IUserService` interface extends UserServiceEvents and defines the
essential methods required for managing users within the authentication system.
It provides methods for retrieving, creating, and updating users, as well as
sending authentication-related emails.

Implementations of this interface serve as the bridge between the authentication
system and the underlying user data storage, allowing the auth system to work with
any user model that conforms to the base User interface.

#### See

- [UserServiceEvents](#userserviceevents) Event handlers for authentication-related actions
- User Base user interface with core user properties
- [AuthUser](#authuser) Combined interface for users with authentication tokens
- GoogleProfile Profile information from Google OAuth

#### Extended by

- [`IUserService`](#iuserservice)

#### Methods

##### getUserByAuthField()?

```ts
optional getUserByAuthField(authFieldValue, subdomain?): Promise<User<string, string> | null>;
```

Defined in: [libs/nest-auth/src/interfaces/user-service.interface.ts:395](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/interfaces/user-service.interface.ts#L395)

Retrieve a user by the configured authentication field

This optional method is used when the authentication field is configurable
and can be something other than email or username. The specific field used
is determined by the authField setting in AuthOptions.

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

`authFieldValue`

</td>
<td>

`string` | `number`

</td>
<td>

The value of the authentication field to search for

</td>
</tr>
<tr>
<td>

`subdomain?`

</td>
<td>

`string`

</td>
<td>

Optional subdomain context for multi-tenant applications

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`User`<`string`, `string`> | `null`>

The user if found, null otherwise

###### See

- User Base user interface structure
- [UserExtra](#userextra) Interface containing authField and authFieldValue properties
- AuthField Enum of standard authentication field options

##### getUserByEmail()

```ts
getUserByEmail(email, subdomain?): Promise<User<string, string> & object | null>;
```

Defined in: [libs/nest-auth/src/interfaces/user-service.interface.ts:343](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/interfaces/user-service.interface.ts#L343)

Retrieve a user by their email address

This method is used during email-based authentication flows to find
a user based on their email address.

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

`email`

</td>
<td>

`string`

</td>
<td>

The email address to search for

</td>
</tr>
<tr>
<td>

`subdomain?`

</td>
<td>

`string`

</td>
<td>

Optional subdomain context for multi-tenant applications

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`User`<`string`, `string`> & `object` | `null`>

The user if found, null otherwise

###### See

- User Base user interface structure
- [sendPasswordResetEmail](#sendpasswordresetemail-1) Related method that may use this lookup
- [getUserByUsernameOrEmail](#getuserbyusernameoremail-1) Related lookup method

##### getUserById()

```ts
getUserById(id, subdomain?): Promise<User<string, string> | null>;
```

Defined in: [libs/nest-auth/src/interfaces/user-service.interface.ts:327](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/interfaces/user-service.interface.ts#L327)

Retrieve a user by their unique identifier

This method is the primary way to look up a user in the system.
It should return the complete user object if found, or null if not found.

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

`id`

</td>
<td>

`EntityId`

</td>
<td>

The unique identifier of the user to retrieve

</td>
</tr>
<tr>
<td>

`subdomain?`

</td>
<td>

`string`

</td>
<td>

Optional subdomain context for multi-tenant applications

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`User`<`string`, `string`> | `null`>

The user if found, null otherwise

###### See

- User Base user interface structure
- EntityId Type for entity identifiers
- onGetUserByToken Related event handler

##### getUserByUsername()?

```ts
optional getUserByUsername(username, subdomain?): Promise<User<string, string> & object | null>;
```

Defined in: [libs/nest-auth/src/interfaces/user-service.interface.ts:359](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/interfaces/user-service.interface.ts#L359)

Retrieve a user by their username

This optional method is used during username-based authentication flows
to find a user based on their username.

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

`username`

</td>
<td>

`string`

</td>
<td>

The username to search for

</td>
</tr>
<tr>
<td>

`subdomain?`

</td>
<td>

`string`

</td>
<td>

Optional subdomain context for multi-tenant applications

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`User`<`string`, `string`> & `object` | `null`>

The user if found, null otherwise

###### See

- User Base user interface structure
- [getUserByUsernameOrEmail](#getuserbyusernameoremail-1) Related lookup method
- [UserExtra](#userextra) Additional authentication-related user properties

##### getUserByUsernameOrEmail()?

```ts
optional getUserByUsernameOrEmail(username, subdomain?): Promise<User<string, string> & object | null>;
```

Defined in: [libs/nest-auth/src/interfaces/user-service.interface.ts:375](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/interfaces/user-service.interface.ts#L375)

Retrieve a user by either username or email

This optional method is used when the authentication system allows
users to sign in with either their username or email address.

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

`username`

</td>
<td>

`string`

</td>
<td>

The username or email to search for

</td>
</tr>
<tr>
<td>

`subdomain?`

</td>
<td>

`string`

</td>
<td>

Optional subdomain context for multi-tenant applications

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`User`<`string`, `string`> & `object` | `null`>

The user if found, null otherwise

###### See

- User Base user interface structure
- [getUserByUsername](#getuserbyusername-1) Related lookup method
- [getUserByEmail](#getuserbyemail-1) Related lookup method

##### sendPasswordResetEmail()?

```ts
optional sendPasswordResetEmail(
   email,
   token,
subdomain?): Promise<boolean>;
```

Defined in: [libs/nest-auth/src/interfaces/user-service.interface.ts:448](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/interfaces/user-service.interface.ts#L448)

Send a password reset email to a user

This optional method is called when a user requests a password reset.
It should send an email containing a link with the reset token.

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

`email`

</td>
<td>

`string`

</td>
<td>

The email address to send the reset link to

</td>
</tr>
<tr>
<td>

`token`

</td>
<td>

`VerifyToken`

</td>
<td>

The verification token to include in the email

</td>
</tr>
<tr>
<td>

`subdomain?`

</td>
<td>

`string`

</td>
<td>

Optional subdomain context for multi-tenant applications

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`boolean`>

Whether the email was successfully sent

###### See

- VerifyToken Token type for verification purposes
- onRequestPasswordReset Event triggered when reset is requested
- [getUserByEmail](#getuserbyemail-1) Method used to find the user by email

##### sendVerificationEmail()?

```ts
optional sendVerificationEmail(
   userId,
   token,
subdomain?): Promise<boolean>;
```

Defined in: [libs/nest-auth/src/interfaces/user-service.interface.ts:467](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/interfaces/user-service.interface.ts#L467)

Send an email verification email to a user

This optional method is called when a user needs to verify their email address,
either during sign-up or when changing their email. It should send an email
containing a link with the verification token.

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

`userId`

</td>
<td>

`EntityId`

</td>
<td>

The ID of the user to send the verification email to

</td>
</tr>
<tr>
<td>

`token`

</td>
<td>

`VerifyToken`

</td>
<td>

The verification token to include in the email

</td>
</tr>
<tr>
<td>

`subdomain?`

</td>
<td>

`string`

</td>
<td>

Optional subdomain context for multi-tenant applications

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`boolean`>

Whether the email was successfully sent

###### See

- VerifyToken Token type for verification purposes
- onResendVerificationEmail Event triggered when verification email is resent
- onVerifyEmail Event triggered when email is verified
- [getUserById](#getuserbyid-1) Method used to find the user by ID

##### signUpUser()

```ts
signUpUser(
   userDto,
   signUpType,
profile?): Promise<User<string, string> | null>;
```

Defined in: [libs/nest-auth/src/interfaces/user-service.interface.ts:413](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/interfaces/user-service.interface.ts#L413)

Create a new user account

This method is called during the sign-up process to create a new user
in the system. It should create the user record and return the created user.

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

`userDto`

</td>
<td>

`Partial`<`User`>

</td>
<td>

The user data to create

</td>
</tr>
<tr>
<td>

`signUpType`

</td>
<td>

`AuthProvider`

</td>
<td>

The method used for sign-up (local, Google, etc.)

</td>
</tr>
<tr>
<td>

`profile?`

</td>
<td>

`GoogleProfile`

</td>
<td>

Additional profile data from OAuth providers

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`User`<`string`, `string`> | `null`>

The created user

###### See

- User Base user interface structure
- AuthProvider Enum of sign-up methods
- GoogleProfile Google OAuth profile data structure
- onSignUp Event handler triggered after signup

##### updateUserById()

```ts
updateUserById(
   id,
   userDto,
updatedBy): Promise<User<string, string>>;
```

Defined in: [libs/nest-auth/src/interfaces/user-service.interface.ts:431](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/interfaces/user-service.interface.ts#L431)

Update an existing user account

This method is used to update user information, such as when changing
passwords or updating profile details.

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

`id`

</td>
<td>

`EntityId`

</td>
<td>

The ID of the user to update

</td>
</tr>
<tr>
<td>

`userDto`

</td>
<td>

`Partial`<`User`>

</td>
<td>

The user data to update

</td>
</tr>
<tr>
<td>

`updatedBy`

</td>
<td>

`User`

</td>
<td>

The user performing the update (for audit trails)

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`User`<`string`, `string`>>

The updated user

###### See

- User Base user interface structure
- EntityId Type for entity identifiers
- onChangePassword Related event that may be triggered
- onResetPassword Related event that may be triggered

---

### UserServiceEvents

Defined in: [libs/nest-auth/src/interfaces/user-service.interface.ts:19](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/interfaces/user-service.interface.ts#L19)

Interface defining event handlers for user-related authentication events.

This interface provides optional event handler methods that can be implemented
to react to various authentication-related actions in the system. These handlers
allow for custom business logic to be executed at specific points in the
authentication flow, such as sending welcome emails after signup or tracking
login activity for security purposes.

Each event handler receives the HTTP request object along with relevant context
data for the specific event. All handlers are optional, allowing implementations
to choose which events they need to handle.

#### Extended by

- [`IUserService`](#iuserservice)

#### Methods

##### onAuthenticate()?

```ts
optional onAuthenticate(
   request,
   authUser?,
error?): Promise<void>;
```

Defined in: [libs/nest-auth/src/interfaces/user-service.interface.ts:239](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/interfaces/user-service.interface.ts#L239)

Generic event handler triggered after any authentication attempt

This handler is called after any authentication attempt, regardless of
the specific strategy used or whether the attempt was successful.
It provides a central point for monitoring all authentication activity.

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

`request`

</td>
<td>

`Request`

</td>
<td>

The Express request object

</td>
</tr>
<tr>
<td>

`authUser?`

</td>
<td>

[`AuthUser`](#authuser)

</td>
<td>

The authenticated user (if successful)

</td>
</tr>
<tr>
<td>

`error?`

</td>
<td>

`unknown`

</td>
<td>

Error information (if authentication failed)

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`void`>

###### See

- [AuthUser](#authuser) Combined user and token information
- [onAuthenticateJWT](#onauthenticatejwt-1) Strategy-specific authentication event
- [onAuthenticateGoogle](#onauthenticategoogle-1) Strategy-specific authentication event

##### onAuthenticateGoogle()?

```ts
optional onAuthenticateGoogle(
   request,
   authUser?,
error?): Promise<void>;
```

Defined in: [libs/nest-auth/src/interfaces/user-service.interface.ts:273](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/interfaces/user-service.interface.ts#L273)

Event handler triggered after Google OAuth authentication attempts

This handler is called specifically when Google OAuth authentication is attempted,
regardless of whether the attempt was successful. It allows for
strategy-specific monitoring and logging.

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

`request`

</td>
<td>

`Request`

</td>
<td>

The Express request object

</td>
</tr>
<tr>
<td>

`authUser?`

</td>
<td>

[`AuthUser`](#authuser)

</td>
<td>

The authenticated user (if successful)

</td>
</tr>
<tr>
<td>

`error?`

</td>
<td>

`unknown`

</td>
<td>

Error information (if authentication failed)

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`void`>

###### See

- [AuthUser](#authuser) Combined user and token information
- GoogleProfile Google user profile information
- [onAuthenticate](#onauthenticate-1) Generic authentication event

##### onAuthenticateJWT()?

```ts
optional onAuthenticateJWT(
   request,
   authUser?,
error?): Promise<void>;
```

Defined in: [libs/nest-auth/src/interfaces/user-service.interface.ts:256](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/interfaces/user-service.interface.ts#L256)

Event handler triggered after JWT authentication attempts

This handler is called specifically when JWT authentication is attempted,
regardless of whether the attempt was successful. It allows for
strategy-specific monitoring and logging.

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

`request`

</td>
<td>

`Request`

</td>
<td>

The Express request object

</td>
</tr>
<tr>
<td>

`authUser?`

</td>
<td>

[`AuthUser`](#authuser)

</td>
<td>

The authenticated user (if successful)

</td>
</tr>
<tr>
<td>

`error?`

</td>
<td>

`unknown`

</td>
<td>

Error information (if authentication failed)

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`void`>

###### See

- [AuthUser](#authuser) Combined user and token information
- [IJwtPayload](#ijwtpayload) Structure of JWT token payload
- [onAuthenticate](#onauthenticate-1) Generic authentication event

##### onChangePassword()?

```ts
optional onChangePassword(
   request,
   authUser?,
error?): Promise<void>;
```

Defined in: [libs/nest-auth/src/interfaces/user-service.interface.ts:158](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/interfaces/user-service.interface.ts#L158)

Event handler triggered after a password change attempt

This handler is called when a user attempts to change their password,
regardless of whether the attempt was successful. If successful, the authUser
parameter will contain the user information. If unsuccessful, the error parameter
will contain information about what went wrong.

Common uses include:

- Sending password change confirmation emails
- Logging password changes for security auditing
- Invalidating other active sessions after password change

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

`request`

</td>
<td>

`Request`

</td>
<td>

The Express request object

</td>
</tr>
<tr>
<td>

`authUser?`

</td>
<td>

[`AuthUser`](#authuser)

</td>
<td>

The authenticated user information (if successful)

</td>
</tr>
<tr>
<td>

`error?`

</td>
<td>

`unknown`

</td>
<td>

Error information (if password change failed)

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`void`>

###### See

- updateUserById Method that may trigger this event
- [AuthUser](#authuser) Combined user and token information
- UserSession Session information including tokens

##### onGetCurrentUser()?

```ts
optional onGetCurrentUser(
   request,
   authUser?,
error?): Promise<void>;
```

Defined in: [libs/nest-auth/src/interfaces/user-service.interface.ts:135](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/interfaces/user-service.interface.ts#L135)

Event handler triggered when current user information is requested

This handler is called when the application retrieves information about
the currently authenticated user. It can be used for monitoring user activity
or implementing additional authorization checks.

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

`request`

</td>
<td>

`Request`

</td>
<td>

The Express request object

</td>
</tr>
<tr>
<td>

`authUser?`

</td>
<td>

[`AuthUser`](#authuser)

</td>
<td>

The authenticated user information (if available)

</td>
</tr>
<tr>
<td>

`error?`

</td>
<td>

`unknown`

</td>
<td>

Error information (if retrieval failed)

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`void`>

###### See

- [AuthUser](#authuser) Combined user and token information
- [CacheUser](#cacheuser) User information stored in cache
- [UserExtra](#userextra) Additional authentication-related user properties

##### onGetUserByToken()?

```ts
optional onGetUserByToken(
   request,
   userId?,
error?): Promise<void>;
```

Defined in: [libs/nest-auth/src/interfaces/user-service.interface.ts:290](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/interfaces/user-service.interface.ts#L290)

Event handler triggered when a user is retrieved by token

This handler is called when the application attempts to retrieve a user
based on an authentication token. It can be used for monitoring token usage
or implementing additional security checks.

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

`request`

</td>
<td>

`Request`

</td>
<td>

The Express request object

</td>
</tr>
<tr>
<td>

`userId?`

</td>
<td>

`EntityId`

</td>
<td>

The ID of the retrieved user (if successful)

</td>
</tr>
<tr>
<td>

`error?`

</td>
<td>

`unknown`

</td>
<td>

Error information (if retrieval failed)

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`void`>

###### See

- [IJwtPayload](#ijwtpayload) JWT token payload structure
- [AuthUser](#authuser) Combined user and token information
- getUserById Method that may be used to retrieve the user

##### onRefreshTokens()?

```ts
optional onRefreshTokens(request, authUser?): Promise<void>;
```

Defined in: [libs/nest-auth/src/interfaces/user-service.interface.ts:118](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/interfaces/user-service.interface.ts#L118)

Event handler triggered after token refresh operations

This handler is called when a user's authentication tokens are refreshed.
It provides an opportunity to log token refreshes, update analytics,
or perform additional security checks.

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

`request`

</td>
<td>

`Request`

</td>
<td>

The Express request object

</td>
</tr>
<tr>
<td>

`authUser?`

</td>
<td>

[`AuthUser`](#authuser)

</td>
<td>

The user with newly refreshed token information

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`void`>

###### See

- [AuthUser](#authuser) Combined user and token information
- UserSession Session information including tokens
- [IJwtPayload](#ijwtpayload) Structure of JWT token payload

##### onRequestPasswordReset()?

```ts
optional onRequestPasswordReset(request, userId?): Promise<void>;
```

Defined in: [libs/nest-auth/src/interfaces/user-service.interface.ts:173](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/interfaces/user-service.interface.ts#L173)

Event handler triggered when a password reset is requested

This handler is called after a user requests a password reset.
It provides an opportunity to log the request, implement additional
security measures, or track reset request patterns.

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

`request`

</td>
<td>

`Request`

</td>
<td>

The Express request object

</td>
</tr>
<tr>
<td>

`userId?`

</td>
<td>

`EntityId`

</td>
<td>

The ID of the user requesting the reset (if found)

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`void`>

###### See

- sendPasswordResetEmail Method that triggers this event
- VerifyToken Token type used in reset emails

##### onResendVerificationEmail()?

```ts
optional onResendVerificationEmail(request, userId): Promise<void>;
```

Defined in: [libs/nest-auth/src/interfaces/user-service.interface.ts:57](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/interfaces/user-service.interface.ts#L57)

Event handler triggered when a user requests a new verification email

This handler is called after a verification email has been resent to a user.
It provides an opportunity to perform additional actions such as logging,
rate limiting, or notifying administrators about repeated verification attempts.

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

`request`

</td>
<td>

`Request`

</td>
<td>

The Express request object

</td>
</tr>
<tr>
<td>

`userId`

</td>
<td>

`EntityId`

</td>
<td>

The ID of the user requesting the verification email

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`void`>

###### See

- sendVerificationEmail Method that triggers this event
- VerifyToken Token type used in verification emails

##### onResetPassword()?

```ts
optional onResetPassword(request, userId?): Promise<void>;
```

Defined in: [libs/nest-auth/src/interfaces/user-service.interface.ts:204](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/interfaces/user-service.interface.ts#L204)

Event handler triggered after a password is reset

This handler is called after a user completes a password reset.
It provides an opportunity to send confirmation emails, log the event,
or invalidate other active sessions after the reset.

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

`request`

</td>
<td>

`Request`

</td>
<td>

The Express request object

</td>
</tr>
<tr>
<td>

`userId?`

</td>
<td>

`EntityId`

</td>
<td>

The ID of the user who reset their password

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`void`>

###### See

- updateUserById Method that may trigger this event
- [onVerifyResetPasswordToken](#onverifyresetpasswordtoken-1) Related event for token verification
- [onRequestPasswordReset](#onrequestpasswordreset-1) Related event for reset requests

##### onSignIn()?

```ts
optional onSignIn(
   request,
   authUser?,
error?): Promise<void>;
```

Defined in: [libs/nest-auth/src/interfaces/user-service.interface.ts:102](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/interfaces/user-service.interface.ts#L102)

Event handler triggered after a user sign-in attempt

This handler is called whenever a user attempts to sign in, regardless of whether
the attempt was successful. If successful, the authUser parameter will contain
the authenticated user information with tokens. If unsuccessful, the error parameter
will contain information about what went wrong.

Common uses include:

- Logging successful/failed sign in attempts
- Updating user activity timestamps
- Tracking suspicious login patterns
- Sending notifications about new login activity

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

`request`

</td>
<td>

`Request`

</td>
<td>

The Express request object

</td>
</tr>
<tr>
<td>

`authUser?`

</td>
<td>

[`AuthUser`](#authuser)

</td>
<td>

The authenticated user with token information (if successful)

</td>
</tr>
<tr>
<td>

`error?`

</td>
<td>

`unknown`

</td>
<td>

Error information (if sign-in failed)

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`void`>

###### See

- [AuthUser](#authuser) Combined user and token information
- [IJwtPayload](#ijwtpayload) Structure of JWT token payload
- UserSession Session information stored with the user

##### onSignOut()?

```ts
optional onSignOut(
   request,
   authUser?,
error?): Promise<void>;
```

Defined in: [libs/nest-auth/src/interfaces/user-service.interface.ts:222](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/interfaces/user-service.interface.ts#L222)

Event handler triggered after a sign-out attempt

This handler is called when a user attempts to sign out, regardless of whether
the attempt was successful. If successful, the authUser parameter will contain
the user who signed out. If unsuccessful, the error parameter will contain
information about what went wrong.

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

`request`

</td>
<td>

`Request`

</td>
<td>

The Express request object

</td>
</tr>
<tr>
<td>

`authUser?`

</td>
<td>

[`AuthUser`](#authuser)

</td>
<td>

The user who signed out (if successful)

</td>
</tr>
<tr>
<td>

`error?`

</td>
<td>

`unknown`

</td>
<td>

Error information (if sign-out failed)

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`void`>

###### See

- [AuthUser](#authuser) Combined user and token information
- UserSession Session information including tokens
- [CacheUser](#cacheuser) Related interface for users stored in cache with sessions

##### onSignUp()?

```ts
optional onSignUp(
   request,
   userId?,
error?): Promise<void>;
```

Defined in: [libs/nest-auth/src/interfaces/user-service.interface.ts:42](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/interfaces/user-service.interface.ts#L42)

Event handler triggered after a user sign-up attempt

This handler is called after a user attempts to sign up, regardless of whether
the attempt was successful. If successful, the userId parameter will contain
the ID of the newly created user. If unsuccessful, the error parameter will
contain information about what went wrong.

Common uses include:

- Sending welcome emails to new users
- Setting up initial user data or preferences
- Tracking sign-up analytics
- Logging failed sign-up attempts for security monitoring

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

`request`

</td>
<td>

`Request`

</td>
<td>

The Express request object from the sign-up attempt

</td>
</tr>
<tr>
<td>

`userId?`

</td>
<td>

`EntityId`

</td>
<td>

The ID of the newly created user (if sign-up was successful)

</td>
</tr>
<tr>
<td>

`error?`

</td>
<td>

`unknown`

</td>
<td>

Error information (if sign-up failed)

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`void`>

###### See

- signUpUser Method that triggers this event
- User User entity structure
- AuthProvider Enum of sign-up methods

##### onVerifyEmail()?

```ts
optional onVerifyEmail(
   request,
   userId,
status): Promise<void>;
```

Defined in: [libs/nest-auth/src/interfaces/user-service.interface.ts:78](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/interfaces/user-service.interface.ts#L78)

Event handler triggered when a user verifies their email address

This handler is called after a user attempts to verify their email address,
whether the verification was successful or not. The status parameter indicates
whether the verification succeeded.

Common uses include:

- Updating user permissions or access levels after verification
- Sending follow-up emails with next steps
- Tracking verification success rates

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

`request`

</td>
<td>

`Request`

</td>
<td>

The Express request object

</td>
</tr>
<tr>
<td>

`userId`

</td>
<td>

`EntityId`

</td>
<td>

The ID of the user verifying their email

</td>
</tr>
<tr>
<td>

`status`

</td>
<td>

`boolean`

</td>
<td>

Whether the verification was successful

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`void`>

###### See

- User User entity structure
- VerifyToken Token type used in verification emails

##### onVerifyResetPasswordToken()?

```ts
optional onVerifyResetPasswordToken(request, userId?): Promise<void>;
```

Defined in: [libs/nest-auth/src/interfaces/user-service.interface.ts:188](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/interfaces/user-service.interface.ts#L188)

Event handler triggered when a password reset token is verified

This handler is called when a user attempts to verify a password reset token.
It can be used to log verification attempts or implement additional security checks.

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

`request`

</td>
<td>

`Request`

</td>
<td>

The Express request object

</td>
</tr>
<tr>
<td>

`userId?`

</td>
<td>

`EntityId`

</td>
<td>

The ID of the user verifying the token (if valid)

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`void`>

###### See

- VerifyToken Token type used in reset process
- [IJwtPayload](#ijwtpayload) Structure of JWT token payload
- sendPasswordResetEmail Related method for sending reset tokens

---

### UserServiceExistingProvider

Defined in: [libs/nest-auth/src/providers/user-service.provider.ts:33](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/providers/user-service.provider.ts#L33)

Interface for providing an existing user service implementation.

This provider type is used when you have an existing service class that implements
the IUserService interface and you want to use it as the user service for authentication.

#### Example

```typescript
// In your app module
@Module({
  imports: [
    UserModule,
    HichchiAuthModule.register(
      {
        imports: [UserModule],
        useExisting: UserService,
      },
      {
        jwt: { secret: "your-secret" },
        // other options
      },
    ),
  ],
  // other module configuration
})
export class AppModule {}
```

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

<a id="property-imports"></a> `imports?`

</td>
<td>

( | `Type`<`any`> | `ForwardReference`<`any`> | `DynamicModule` | `Promise`<`DynamicModule`>)\[]

</td>
<td>

Optional array of modules to import.

These modules will be imported into the dynamic module created by the auth module.
This is useful when your user service depends on other modules.

</td>
<td>

[libs/nest-auth/src/providers/user-service.provider.ts:40](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/providers/user-service.provider.ts#L40)

</td>
</tr>
<tr>
<td>

<a id="property-useexisting"></a> `useExisting`

</td>
<td>

(...`args`) => [`IUserService`](#iuserservice)

</td>
<td>

The existing service class that implements IUserService.

This should be a class reference (not an instance) that implements the IUserService interface.
The auth module will use this class to resolve the user service.

</td>
<td>

[libs/nest-auth/src/providers/user-service.provider.ts:48](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/providers/user-service.provider.ts#L48)

</td>
</tr>
</tbody>
</table>

---

### UserServiceFactoryProvider

Defined in: [libs/nest-auth/src/providers/user-service.provider.ts:81](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/providers/user-service.provider.ts#L81)

Interface for providing a factory function that creates a user service.

This provider type is used when you want to create the user service instance
using a factory function, which gives you more control over how the service
is created and configured.

#### Example

```typescript
// In your app module
@Module({
  imports: [
    UserModule,
    HichchiAuthModule.register(
      {
        imports: [UserModule],
        useFactory: (userService: UserService) => userService,
        inject: [UserService],
      },
      {
        jwt: { secret: "your-secret" },
        // other options
      },
    ),
  ],
  // other module configuration
})
export class AppModule {}
```

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

<a id="property-imports-1"></a> `imports?`

</td>
<td>

( | `Type`<`any`> | `ForwardReference`<`any`> | `DynamicModule` | `Promise`<`DynamicModule`>)\[]

</td>
<td>

Optional array of modules to import.

These modules will be imported into the dynamic module created by the auth module.
This is useful when your factory function depends on services from other modules.

</td>
<td>

[libs/nest-auth/src/providers/user-service.provider.ts:88](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/providers/user-service.provider.ts#L88)

</td>
</tr>
<tr>
<td>

<a id="property-inject"></a> `inject?`

</td>
<td>

`any`\[]

</td>
<td>

Optional array of providers to inject into the factory function.

These providers will be resolved and passed as arguments to the factory function
in the same order they are specified in this array.

</td>
<td>

[libs/nest-auth/src/providers/user-service.provider.ts:105](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/providers/user-service.provider.ts#L105)

</td>
</tr>
<tr>
<td>

<a id="property-usefactory"></a> `useFactory`

</td>
<td>

(...`args`) => | [`IUserService`](#iuserservice) | `Promise`<[`IUserService`](#iuserservice)>

</td>
<td>

Factory function that creates an instance of IUserService.

This function will be called to create the user service instance.
It can be synchronous (returning IUserService) or asynchronous (returning Promise<IUserService>).
The function can accept dependencies that are specified in the inject array.

</td>
<td>

[libs/nest-auth/src/providers/user-service.provider.ts:97](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/providers/user-service.provider.ts#L97)

</td>
</tr>
</tbody>
</table>

## Type Aliases

### UserServiceProvider

```ts
type UserServiceProvider =
  | UserServiceExistingProvider
  | UserServiceFactoryProvider;
```

Defined in: [libs/nest-auth/src/providers/user-service.provider.ts:130](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/providers/user-service.provider.ts#L130)

Union type representing either an existing provider or a factory provider for the user service.

This type is used in the HichchiAuthModule.register method to allow either provider type
to be used when configuring the auth module.

#### Example

```typescript
// Using UserServiceExistingProvider
const provider: UserServiceProvider = {
  imports: [UserModule],
  useExisting: UserService,
};

// Using UserServiceFactoryProvider
const provider: UserServiceProvider = {
  imports: [UserModule],
  useFactory: (userService: UserService) => userService,
  inject: [UserService],
};
```

## Variables

### ACCESS_TOKEN_COOKIE_NAME

```ts
const ACCESS_TOKEN_COOKIE_NAME: "Authorization" = "Authorization";
```

Defined in: [libs/nest-auth/src/constants.ts:35](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/constants.ts#L35)

Cookie name for storing the access token

This constant defines the name of the cookie used to store the JWT access token
in cookie-based authentication. The access token is used for authenticating
requests to protected resources.

The default value is "Authorization", which is a common convention for
authentication tokens. This cookie is typically set as HttpOnly, secure,
and signed to enhance security.

#### Examples

```typescript
// Setting the access token cookie
response.cookie(ACCESS_TOKEN_COOKIE_NAME, accessToken, {
  httpOnly: true,
  secure: true,
  signed: true,
  maxAge: 15 * 60 * 1000, // 15 minutes
});
```

```typescript
// Retrieving the access token from cookies
const accessToken = request.signedCookies[ACCESS_TOKEN_COOKIE_NAME];
```

#### See

- [AuthService.setAuthCookies](#setauthcookies) Method that sets authentication cookies
- [JwtAuthGuard](#jwtauthguard) Guard that uses this cookie for authentication
- [cookieExtractor](#cookieextractor) Function that extracts this cookie from requests
- AuthMethod.COOKIE Authentication method that uses cookies
- [REFRESH_TOKEN_COOKIE_NAME](#refresh_token_cookie_name) Related cookie for refresh tokens

---

### AUTH_OPTIONS

```ts
const AUTH_OPTIONS: "AUTH_OPTIONS" = "AUTH_OPTIONS";
```

Defined in: [libs/nest-auth/src/tokens.ts:80](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/tokens.ts#L80)

Token for authentication configuration options

This constant defines a token used for dependency injection of authentication
configuration options in NestJS applications. It serves as a key for providing
and retrieving authentication-related configuration throughout the application.

The token is used to inject an implementation of the AuthOptions interface,
which provides configuration for JWT tokens, authentication strategies, and
other authentication-related settings.

#### Example

```typescript
// Providing authentication options
@Module({
  imports: [
    AuthModule.register({
      jwtSecret: "your-secret-key",
      jwtExpiresIn: "1h",
      refreshTokenExpiresIn: "7d",
      google: {
        clientID: "your-client-id",
        clientSecret: "your-client-secret",
        callbackURL: "http://localhost:3000/auth/google/callback",
      },
    }),
  ],
})
export class AppModule {}
```

#### See

- [AuthOptions](#authoptions) The interface that defines the authentication options structure
- [HichchiAuthModule](#hichchiauthmodule) Module that uses this token for dependency injection
- [AuthController](#authcontroller) Controller that uses these options for authentication endpoints
- [AuthService](#authservice) Service that uses these options for authentication logic
- [JwtAuthGuard](#jwtauthguard) Guard that uses these options for JWT authentication
- validateJwtOptions Function that validates JWT options
- validateRedisOptions Function that validates Redis options

---

### EMAIL_KEY

```ts
const EMAIL_KEY: "email" = "email";
```

Defined in: [libs/nest-auth/src/constants.ts:104](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/constants.ts#L104)

Field key for email identification in authentication

This constant defines the field name used for email-based authentication.
It's used in authentication strategies to identify which field in the request
contains the email address.

The default value is "email", which is the standard field name for email addresses
in authentication requests.

#### Examples

```typescript
// Configuring a local strategy for email-based authentication
new LocalStrategy({
  usernameField: EMAIL_KEY,
  passwordField: "password",
});
```

```typescript
// Using the email key in an authentication service
const email = request.body[EMAIL_KEY];
const user = await this.userService.findByEmail(email);
```

#### See

- [LocalStrategy](#localstrategy) Strategy that uses this key for authentication configuration
- AuthField Enum that defines authentication field types
- AuthField.EMAIL Email-based authentication field type
- [SignInDto](#signindto) DTO that uses this field for sign-in
- [USERNAME_KEY](#username_key) Alternative authentication field

---

### PERMISSION_KEY

```ts
const PERMISSION_KEY: "permission" = "permission";
```

Defined in: [libs/nest-auth/src/decorators/permission.decorator.ts:12](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/decorators/permission.decorator.ts#L12)

A constant variable that holds the key name used to reference or identify
permission settings or values.

This key is typically utilized in contexts where permissions need to be managed,
checked, or assigned, ensuring consistent usage across the application.

---

### REFRESH_TOKEN_COOKIE_NAME

```ts
const REFRESH_TOKEN_COOKIE_NAME: "Refresh" = "Refresh";
```

Defined in: [libs/nest-auth/src/constants.ts:70](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/constants.ts#L70)

Cookie name for storing the refresh token

This constant defines the name of the cookie used to store the JWT refresh token
in cookie-based authentication. The refresh token is used to obtain a new access
token when the current one expires.

The default value is "Refresh". This cookie is typically set as HttpOnly, secure,
and signed to enhance security, with a longer expiration time than the access token.

#### Examples

```typescript
// Setting the refresh token cookie
response.cookie(REFRESH_TOKEN_COOKIE_NAME, refreshToken, {
  httpOnly: true,
  secure: true,
  signed: true,
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
});
```

```typescript
// Retrieving the refresh token from cookies
const refreshToken = request.signedCookies[REFRESH_TOKEN_COOKIE_NAME];
```

#### See

- [AuthService.setAuthCookies](#setauthcookies) Method that sets authentication cookies
- [JwtAuthGuard](#jwtauthguard) Guard that uses this cookie for token refresh
- [AuthService.refreshTokens](#refreshtokens-1) Method that uses refresh tokens to generate new access tokens
- AuthMethod.COOKIE Authentication method that uses cookies
- [ACCESS_TOKEN_COOKIE_NAME](#access_token_cookie_name) Related cookie for access tokens

---

### ROLES_KEY

```ts
const ROLES_KEY: "roles" = "roles";
```

Defined in: [libs/nest-auth/src/decorators/roles.decorator.ts:12](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/decorators/roles.decorator.ts#L12)

A constant variable that holds the key name used to reference or identify
role settings or values.

This key is typically utilized in contexts where roles need to be managed,
checked, or assigned, ensuring consistent usage across the application.

---

### USER_SERVICE

```ts
const USER_SERVICE: "USER_SERVICE" = "USER_SERVICE";
```

Defined in: [libs/nest-auth/src/tokens.ts:39](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/tokens.ts#L39)

Token for user service implementation

This constant defines a token used for dependency injection of the user service
implementation in NestJS applications. It serves as a key for providing and
retrieving the user service throughout the authentication module.

The token is used to inject an implementation of the IUserService interface,
which provides methods for user management such as finding, creating, and updating
users. This allows the authentication module to work with any user data storage
implementation that conforms to the interface.

#### Example

```typescript
// Providing a user service implementation
@Module({
  imports: [
    AuthModule.register({
      // Auth configuration...
    }),
  ],
  providers: [
    {
      provide: USER_SERVICE,
      useClass: UserService,
    },
  ],
})
export class AppModule {}
```

#### See

- [IUserService](#iuserservice) The interface that user service implementations must implement
- [HichchiAuthModule](#hichchiauthmodule) Module that uses this token for dependency injection
- [UserServiceProvider](#userserviceprovider) Provider interface for the user service
- [UserServiceFactoryProvider](#userservicefactoryprovider) Factory provider for the user service
- [UserServiceExistingProvider](#userserviceexistingprovider) Existing provider for the user service
- validateUserServiceProvider Function that validates the user service implementation

---

### USERNAME_KEY

```ts
const USERNAME_KEY: "username" = "username";
```

Defined in: [libs/nest-auth/src/constants.ts:138](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-auth/src/constants.ts#L138)

Field key for username identification in authentication

This constant defines the field name used for username-based authentication.
It's used in authentication strategies to identify which field in the request
contains the username.

The default value is "username", which is the standard field name for usernames
in authentication requests.

#### Examples

```typescript
// Configuring a local strategy for username-based authentication
new LocalStrategy({
  usernameField: USERNAME_KEY,
  passwordField: "password",
});
```

```typescript
// Using the username key in an authentication service
const username = request.body[USERNAME_KEY];
const user = await this.userService.findByUsername(username);
```

#### See

- [LocalStrategy](#localstrategy) Strategy that uses this key for authentication configuration
- AuthField Enum that defines authentication field types
- AuthField.USERNAME Username-based authentication field type
- [SignInDto](#signindto) DTO that uses this field for sign-in
- [EMAIL_KEY](#email_key) Alternative authentication field
