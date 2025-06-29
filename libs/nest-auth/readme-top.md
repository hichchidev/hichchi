<div align="center">

# 🔐 @hichchi/nest-auth

**A comprehensive authentication powerhouse for NestJS applications**

[![npm version](https://img.shields.io/npm/v/@hichchi/nest-auth?style=flat&color=blue)](https://www.npmjs.com/package/@hichchi/nest-auth)
[![npm downloads](https://img.shields.io/npm/dm/@hichchi/nest-auth?style=flat&color=green)](https://www.npmjs.com/package/@hichchi/nest-auth)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/hichchidev/hichchi/blob/main/LICENSE)
[![NestJS](https://img.shields.io/badge/nestjs-11.1.3-red.svg)](https://nestjs.com/)

*Part of the [Hichchi](https://github.com/hichchidev/hichchi) ecosystem - A powerful, scalable application built with Nx workspace*

[📚 Jump to Documentation](#api-documentation)

</div>

---

## 📋 Table of Contents

- [📦 Installation](#-installation)
- [⚡ Quick Start](#-quick-start)
- [📋 Prerequisites](#-prerequisites)
- [🌟 Overview](#-overview)
- [✨ Features](#-features)
- [🚀 Usage](#-usage)
  - [Module Registration](#module-registration)
  - [Authentication Examples](#authentication-examples)
  - [Protected Routes](#protected-routes)
  - [Google OAuth Setup](#google-oauth-setup)
- [⚙️ Configuration Reference](#️-configuration-reference)
- [🔒 Security Best Practices](#-security-best-practices)
- [🛠️ Troubleshooting](#️-troubleshooting)
- [🔧 Development](#-development)
- [📖 API Documentation](#-api-documentation)

---

## 📦 Installation

```bash
npm install @hichchi/nest-auth
```

## ⚡ Quick Start

Get up and running with authentication in just a few minutes:

```typescript
// 1. Install the package
npm install @hichchi/nest-auth

// 2. Register the module in your app.module.ts
import { HichchiAuthModule } from '@hichchi/nest-auth';

@Module({
  imports: [
    HichchiAuthModule.register(
      userServiceProvider,
      {
        jwt: { secret: 'your-jwt-secret' },
        authMethod: 'email'
      }
    )
  ]
})
export class AppModule {}
```

## 📋 Prerequisites

Before installing @hichchi/nest-auth, ensure you have:

### Required Dependencies
- **Node.js**: >= 18.0.0
- **NestJS**: >= 10.0.0
- **TypeScript**: >= 5.0.0

### Peer Dependencies
```bash
npm install @nestjs/common @nestjs/core @nestjs/jwt @nestjs/passport
npm install passport passport-local passport-jwt
npm install bcrypt jsonwebtoken
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

### ⚙️ Configuration Options
- 🔧 **Flexible Module Setup** - Easy configuration with your existing user service
- ⚡ **Redis Caching** - Optional Redis integration for improved performance
- 🔒 **Security Settings** - Customizable JWT options, password requirements
- 🌐 **Multi-tenant Support** - Subdomain-based authentication
- 🔌 **WebSocket Support** - Real-time authentication for WebSocket connections

## 🚀 Usage

### Module Registration

Configure the authentication module in your NestJS application with your preferred settings:

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

### Authentication Examples

#### Login/Logout Endpoints

```typescript
import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthService, JwtAuthGuard } from '@hichchi/nest-auth';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: { email: string; password: string }) {
    const user = await this.authService.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.authService.login(user);
  }

  @Post('register')
  async register(@Body() registerDto: { email: string; password: string; name: string }) {
    return this.authService.register(registerDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Request() req) {
    return this.authService.logout(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('refresh')
  async refresh(@Request() req) {
    return this.authService.refreshToken(req.user);
  }
}
```

#### User Profile Management

```typescript
@Controller('profile')
export class ProfileController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getProfile(@Request() req) {
    return this.userService.findById(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  async updateProfile(@Request() req, @Body() updateDto: UpdateProfileDto) {
    return this.userService.update(req.user.id, updateDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('change-password')
  async changePassword(@Request() req, @Body() changePasswordDto: ChangePasswordDto) {
    return this.authService.changePassword(req.user.id, changePasswordDto);
  }
}
```

### Protected Routes

#### Using Guards

```typescript
import { JwtAuthGuard, RolesGuard, Roles } from '@hichchi/nest-auth';

@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AdminController {

  @Get('users')
  @Roles('admin', 'moderator')
  async getAllUsers() {
    return this.userService.findAll();
  }

  @Delete('users/:id')
  @Roles('admin')
  async deleteUser(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
```

#### Custom Route Protection

```typescript
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from '@hichchi/nest-auth';

@Injectable()
export class OwnershipGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const resourceId = request.params.id;

    // Check if user owns the resource
    return this.authService.checkOwnership(user.id, resourceId);
  }
}

@Controller('posts')
export class PostsController {
  @UseGuards(JwtAuthGuard, OwnershipGuard)
  @Put(':id')
  async updatePost(@Param('id') id: string, @Body() updateDto: UpdatePostDto) {
    return this.postsService.update(id, updateDto);
  }
}
```

### Google OAuth Setup

#### Configure Google OAuth

```typescript
// app.module.ts
import { HichchiAuthModule } from '@hichchi/nest-auth';

@Module({
  imports: [
    HichchiAuthModule.register(
      userServiceProvider,
      {
        jwt: {
          secret: process.env.JWT_SECRET,
          signOptions: { expiresIn: '1h' },
        },
        google: {
          clientID: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          callbackURL: process.env.GOOGLE_CALLBACK_URL,
        },
        authMethod: 'email',
        authField: 'email',
      }
    ),
  ],
})
export class AppModule {}
```

#### Google OAuth Controller

```typescript
import { Controller, Get, UseGuards, Request, Res } from '@nestjs/common';
import { GoogleAuthGuard, AuthService } from '@hichchi/nest-auth';

@Controller('auth/google')
export class GoogleAuthController {
  constructor(private authService: AuthService) {}

  @Get()
  @UseGuards(GoogleAuthGuard)
  async googleAuth() {
    // Initiates Google OAuth flow
  }

  @Get('callback')
  @UseGuards(GoogleAuthGuard)
  async googleAuthCallback(@Request() req, @Res() res) {
    const jwt = await this.authService.googleLogin(req.user);

    // Redirect to frontend with token
    res.redirect(`${process.env.FRONTEND_URL}/auth/success?token=${jwt.access_token}`);
  }
}
```

#### Environment Variables

```bash
# .env
JWT_SECRET=your-super-secret-jwt-key
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/callback
FRONTEND_URL=http://localhost:4200

# Optional Redis configuration
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=your-redis-password
```

## ⚙️ Configuration Reference

### Complete Configuration Options

```typescript
interface AuthModuleOptions {
  // JWT Configuration
  jwt: {
    secret: string;
    signOptions?: {
      expiresIn?: string | number;
      issuer?: string;
      audience?: string;
    };
    verifyOptions?: {
      ignoreExpiration?: boolean;
      clockTolerance?: number;
    };
  };

  // Authentication Method
  authMethod: 'email' | 'username';
  authField: string;

  // Password Configuration
  password?: {
    saltRounds?: number; // Default: 10
    minLength?: number;  // Default: 8
    requireSpecialChar?: boolean; // Default: true
  };

  // Redis Configuration (Optional)
  redis?: {
    host: string;
    port: number;
    password?: string;
    db?: number;
    keyPrefix?: string;
    ttl?: number; // Token TTL in seconds
  };

  // Google OAuth Configuration (Optional)
  google?: {
    clientID: string;
    clientSecret: string;
    callbackURL: string;
    scope?: string[]; // Default: ['email', 'profile']
  };


  // Session Configuration (Optional)
  session?: {
    secret: string;
    resave?: boolean;
    saveUninitialized?: boolean;
    cookie?: {
      secure?: boolean;
      httpOnly?: boolean;
      maxAge?: number;
    };
  };
}
```

### Default Configuration

```typescript
const defaultConfig: Partial<AuthModuleOptions> = {
  password: {
    saltRounds: 10,
    minLength: 8,
    requireSpecialChar: true,
  },
  google: {
    scope: ['email', 'profile'],
  },
};
```

## 🔒 Security Best Practices

### JWT Secret Management

```typescript
// ❌ Bad - Hardcoded secret
jwt: {
  secret: 'my-secret-key'
}

// ✅ Good - Environment variable
jwt: {
  secret: process.env.JWT_SECRET
}

// ✅ Better - Complex secret with rotation
jwt: {
  secret: process.env.JWT_SECRET,
  signOptions: {
    expiresIn: '15m', // Short-lived tokens
    issuer: 'your-app-name',
    audience: 'your-app-users'
  }
}
```

### Password Security

```typescript
// Configure strong password requirements
password: {
  saltRounds: 12, // Higher for better security
  minLength: 12,
  requireSpecialChar: true,
}

// Implement password validation
@IsStrongPassword({
  minLength: 12,
  minLowercase: 1,
  minUppercase: 1,
  minNumbers: 1,
  minSymbols: 1,
})
password: string;
```


### HTTPS and Security Headers

```typescript
// app.main.ts
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Security headers
  app.use(helmet());

  // CORS configuration
  app.enableCors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  });

  // Only accept HTTPS in production
  if (process.env.NODE_ENV === 'production') {
    app.use((req, res, next) => {
      if (req.header('x-forwarded-proto') !== 'https') {
        res.redirect(`https://${req.header('host')}${req.url}`);
      } else {
        next();
      }
    });
  }
}
```

### Token Storage Best Practices

```typescript
// ✅ Store tokens securely on client-side
// Use httpOnly cookies for web apps
res.cookie('access_token', jwt, {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  maxAge: 15 * 60 * 1000, // 15 minutes
});

// ✅ Use refresh tokens for longer sessions
res.cookie('refresh_token', refreshJwt, {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
});
```

## 🛠️ Troubleshooting

### Common Issues and Solutions

#### JWT Secret Configuration

**Problem**: `Error: secretOrPrivateKey has a value of "undefined"`

**Solution**:
```typescript
// Check your environment variables
console.log('JWT_SECRET:', process.env.JWT_SECRET);

// Ensure .env file is loaded
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    // ... other imports
  ],
})
```

#### Redis Connection Issues

**Problem**: `Error: Redis connection failed`

**Solutions**:
```typescript
// 1. Check Redis server status
redis-cli ping

// 2. Verify connection configuration
redis: {
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT) || 6379,
  password: process.env.REDIS_PASSWORD,
  retryDelayOnFailover: 100,
  maxRetriesPerRequest: 3,
}

// 3. Handle Redis connection errors
redis: {
  // ... config
  onClientReady: (client) => {
    console.log('Redis client ready');
  },
  onClientError: (err) => {
    console.error('Redis client error:', err);
  },
}
```

#### Google OAuth Issues

**Problem**: `Error: Google OAuth callback failed`

**Solutions**:
```typescript
// 1. Verify Google Console configuration
// - Authorized JavaScript origins: http://localhost:3000
// - Authorized redirect URIs: http://localhost:3000/auth/google/callback

// 2. Check environment variables
GOOGLE_CLIENT_ID=your-client-id
GOOGLE_CLIENT_SECRET=your-client-secret
GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/callback

// 3. Enable Google+ API in Google Console
```

#### User Service Integration

**Problem**: `Error: User service not found`

**Solution**:
```typescript
// Ensure your user service implements the required interface
interface IUserService {
  findByEmail(email: string): Promise<User | null>;
  findByUsername(username: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  create(userData: CreateUserDto): Promise<User>;
  validatePassword(user: User, password: string): Promise<boolean>;
}

// Register the service correctly
HichchiAuthModule.register(
  {
    imports: [UserModule],
    useFactory: (userService: UserService) => userService,
    inject: [UserService],
  },
  authOptions
)
```

#### Authentication Guard Issues

**Problem**: `Error: Cannot read property 'user' of undefined`

**Solution**:
```typescript
// 1. Ensure JWT strategy is properly configured
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, email: payload.email };
  }
}

// 2. Check token format in requests
// Header: Authorization: Bearer <your-jwt-token>
```

### Debug Mode

Enable debug logging for troubleshooting:

```typescript
// Enable debug mode
HichchiAuthModule.register(
  userServiceProvider,
  {
    // ... other options
    debug: process.env.NODE_ENV === 'development',
    logLevel: 'verbose', // 'error' | 'warn' | 'info' | 'verbose' | 'debug'
  }
)
```

### Performance Issues

**Problem**: Slow authentication responses

**Solutions**:
```typescript
// 1. Enable Redis caching
redis: {
  host: 'localhost',
  port: 6379,
  ttl: 3600, // 1 hour cache
}

// 2. Optimize password hashing
password: {
  saltRounds: 10, // Balance between security and performance
}

// 3. Use connection pooling for database
// 4. Implement proper indexing on user lookup fields
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

**Made with ❤️ by [HichchiDev](https://github.com/hichchidev)**

[![Hichchi Ecosystem](https://img.shields.io/badge/🏠_Hichchi_Ecosystem-blue)](https://github.com/hichchidev/hichchi)
[![Report Bug](https://img.shields.io/badge/🐛_Report_Bug-red)](https://github.com/hichchidev/hichchi/issues)
[![Request Feature](https://img.shields.io/badge/✨_Request_Feature-green)](https://github.com/hichchidev/hichchi/issues)

*Building the future of authentication, one commit at a time*

</div>

---

## 📖 API Documentation

Complete technical reference for all classes, interfaces, methods, and types in this library.

**Auto-generated by TypeDoc** - Browse through detailed API references, code examples, and implementation guides below.

<!-- TypeDoc generated documentation will be appended below this point -->
