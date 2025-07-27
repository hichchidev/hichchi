
<!--suppress ALL -->
<div align="center">

# 🚀 @hichchi/nest-core

## Description

**Comprehensive NestJS core library providing application bootstrap, caching, decorators, filters, interceptors, logging, middleware, services, validators, and essential utilities for enterprise-grade applications**

[![npm version](https://img.shields.io/npm/v/@hichchi/nest-core?style=flat&color=blue)](https://www.npmjs.com/package/@hichchi/nest-core)
[![npm downloads](https://img.shields.io/npm/dm/@hichchi/nest-core?style=flat&color=green)](https://www.npmjs.com/package/@hichchi/nest-core)
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
npm install @hichchi/nest-core
```

## ⚡ Quick Start

Get up and running with essential NestJS utilities in just a few minutes:

```typescript
// 1. Install the package
npm install @hichchi/nest-core

// 2. Import utilities in your NestJS application
import { hichchiBootstrap, AxiosHttpService } from '@hichchi/nest-core';

// 3. Bootstrap your application with enhanced features
async function bootstrap() {
  await hichchiBootstrap(AppModule, {
    port: 3000,
  });
}
bootstrap();
```

## 📋 Prerequisites

Before installing @hichchi/nest-core, ensure you have:

### Required Dependencies
- **Node.js**: >= 18.0.0
- **NestJS**: >= 11.0.0
- **TypeScript**: >= 5.6.0

### Peer Dependencies
```bash
npm install @nestjs/common @nestjs/core
npm install rxjs reflect-metadata
```

### Internal Dependencies
This package depends on:
```bash
npm install @hichchi/nest-connector @hichchi/utils
```

### Optional Dependencies
For enhanced features:
```bash
# For HTTP client functionality
npm install axios

# For advanced validation
npm install class-validator class-transformer

# For caching features
npm install cache-manager
```

### System Requirements
- Compatible with all major operating systems
- Supports both CommonJS and ES modules
- TypeScript definitions included

## 🌟 Overview

🎯 **Your essential toolkit** for NestJS applications. From application bootstrapping to HTTP services, from validation utilities to custom decorators - everything you need to build robust, scalable NestJS applications with enterprise-grade components and utilities.

## ✨ Features

### 🚀 Application Bootstrap
- 🏗️ **Enhanced Bootstrap** - Advanced application initialization with `hichchiBootstrap`
- 🔧 **Configuration Management** - Streamlined app configuration and setup
- 🔧 **Environment Setup** - Automated environment-specific configurations
- 📊 **Health Checks** - Built-in application health monitoring

### 🌐 HTTP Services
- 🔗 **Axios HTTP Service** - Pre-configured HTTP client with advanced features
- 🔄 **Request/Response Interceptors** - Built-in request and response handling
- ⚡ **Retry Logic** - Automatic retry mechanisms for failed requests
- 📈 **Request Logging** - Comprehensive HTTP request/response logging

### 🎯 Helpful Decorators
- 📝 **@Dto** - Enhanced DTO validation and transformation decorators
- 🔄 **@UseTransformInterceptor** - Apply transformation interceptors to endpoints
- 🎫 **Custom Metadata** - Advanced metadata handling decorators
- 🏷️ **Parameter Decorators** - Specialized parameter extraction decorators

### 🛠️ Utility Functions
- 🔍 **Exception Utils** - Advanced exception handling and formatting utilities
- ✅ **Validation Utils** - Comprehensive validation helper functions
- 🌍 **Global Utils** - Application-wide utility functions
- 🔧 **General Utils** - Common utility functions for everyday tasks

### 🔐 Validators
- 🎲 **Random Hex Validator** - Validate random hexadecimal strings
- 🎫 **Token Verification** - Advanced token validation and verification
- 📋 **Custom Validators** - Extensible validation framework
- ⚡ **Performance Optimized** - Fast validation with minimal overhead

### 🏗️ Core Components
- 🗄️ **Cache Management** - Advanced caching strategies and utilities
- 🔄 **Data Converters** - Type-safe data transformation utilities
- 🚨 **Exception Handling** - Comprehensive error handling framework
- 🔍 **Filters & Interceptors** - Pre-built filters and interceptors
- 📊 **Logging System** - Advanced logging with multiple transports
- 🔗 **Middleware Collection** - Essential middleware components

### 🔧 Configuration Options
- 🔧 **Flexible Setup** - Easy integration with existing NestJS applications
- 🎛️ **Customizable Components** - Configure utilities to match your needs
- 🔌 **Modular Architecture** - Use only the components you need
- 📦 **Zero Configuration** - Works out of the box with sensible defaults

## 🚀 Usage

### Using Bootstrap Functionality

#### `hichchiBootstrap`

This function provides enhanced application bootstrapping with built-in configuration for CORS, validation, global filters, interceptors, and logging. It simplifies the setup process by providing sensible defaults while allowing customization.

```typescript
import { hichchiBootstrap } from '@hichchi/nest-core';
import { AppModule } from './app.module';

// Basic usage with default configuration
async function bootstrap() {
  await hichchiBootstrap(AppModule);
}

// Advanced usage with custom configuration
async function bootstrap() {
  await hichchiBootstrap(AppModule, {
    port: 3000,
    globalPrefix: 'api/v1',
    allowedOrigins: ['http://localhost:3000', 'https://myapp.com'],
    validation: {
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    },
    globalFilters: true, // Enable global exception filters
    globalInterceptors: true, // Enable global interceptors
    logger: true, // Enable enhanced logging
  });
}

bootstrap();
```

### Using HTTP Services

#### `AxiosHttpService`

This service provides a wrapper around Axios with enhanced error handling, automatic retries, and NestJS integration. It converts Axios responses to promises and handles HTTP exceptions appropriately.

```typescript
import { Injectable } from '@nestjs/common';
import { AxiosHttpService } from '@hichchi/nest-core';
import { AxiosRequestConfig } from 'axios';

@Injectable()
export class ApiService {
  constructor(private readonly httpService: AxiosHttpService) {}

  // GET request with configuration
  async getUsers(page: number = 1, limit: number = 10) {
    const config: AxiosRequestConfig = {
      params: { page, limit },
      timeout: 5000,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const response = await this.httpService.get('/users', config);
      return response.data;
    } catch (error) {
      // Error is automatically converted to appropriate NestJS exception
      throw error;
    }
  }

  // POST request with data
  async createUser(userData: any) {
    const config: AxiosRequestConfig = {
      timeout: 10000,
      headers: {
        'Authorization': `Bearer ${this.getAuthToken()}`,
        'Content-Type': 'application/json',
      },
    };

    return this.httpService.post('/users', userData, config);
  }

  // PUT request for updates
  async updateUser(id: string, userData: any) {
    const config: AxiosRequestConfig = {
      timeout: 10000,
      headers: {
        'Authorization': `Bearer ${this.getAuthToken()}`,
      },
    };

    return this.httpService.put(`/users/${id}`, userData, config);
  }

  // PATCH request for partial updates
  async patchUser(id: string, partialData: any) {
    return this.httpService.patch(`/users/${id}`, partialData, {
      headers: {
        'Authorization': `Bearer ${this.getAuthToken()}`,
      },
    });
  }

  // DELETE request
  async deleteUser(id: string) {
    const config: AxiosRequestConfig = {
      headers: {
        'Authorization': `Bearer ${this.getAuthToken()}`,
      },
    };

    return this.httpService.delete(`/users/${id}`, config);
  }

  private getAuthToken(): string {
    // Implementation to get auth token
    return 'your-auth-token';
  }
}
```

### Using Middlewares

#### `SubdomainMiddleware`

This middleware factory creates middleware for extracting subdomain information from requests, useful for multi-tenant applications.

```typescript
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { SubdomainMiddleware } from '@hichchi/nest-core';

// Apply globally in your AppModule
@Module({
  // ... your module configuration
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    // Apply to all routes
    consumer
      .apply(SubdomainMiddleware('example.com', 'default'))
      .forRoutes('*');
  }
}

// Use in controllers
import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';

interface RequestWithSubdomain extends Request {
  subdomain?: string;
  originUrl?: string;
}

@Controller('api')
export class ApiController {
  @Get('tenant-info')
  getTenantInfo(@Req() req: RequestWithSubdomain) {
    return {
      subdomain: req.subdomain,
      originUrl: req.originUrl,
      message: `Welcome to ${req.subdomain} tenant`,
    };
  }

  @Get('users')
  async getUsers(@Req() req: RequestWithSubdomain) {
    const tenant = req.subdomain;
    // Filter data based on tenant
    return this.userService.findByTenant(tenant);
  }
}
```

#### Body Parser Middlewares

The library provides specialized body parser middlewares for different content types.

```typescript
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { 
  JsonBodyParserMiddleware, 
  RawBodyParserMiddleware 
} from '@hichchi/nest-core';

@Module({})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    // Apply JSON body parser to specific routes
    consumer
      .apply(JsonBodyParserMiddleware)
      .forRoutes('api/webhooks/json');

    // Apply raw body parser for webhook endpoints
    consumer
      .apply(RawBodyParserMiddleware)
      .forRoutes('api/webhooks/raw');
  }
}

// Use in webhook controllers
@Controller('api/webhooks')
export class WebhookController {
  @Post('json')
  handleJsonWebhook(@Body() body: any) {
    // Body is automatically parsed as JSON
    return this.processJsonWebhook(body);
  }

  @Post('raw')
  handleRawWebhook(@Req() req: Request) {
    // Access raw body from request
    const rawBody = req.body;
    return this.processRawWebhook(rawBody);
  }
}
```

### Using Logger Service

#### `LoggerService`

This service provides comprehensive logging functionality with multiple log levels, custom formatting, and transport options.

```typescript
import { Injectable } from '@nestjs/common';
import { LoggerService } from '@hichchi/nest-core';

@Injectable()
export class UserService {
  constructor(private readonly logger: LoggerService) {
    // Set context for this service
    this.logger = new LoggerService('UserService');
  }

  async createUser(userData: any) {
    this.logger.log('Creating new user', { userData });

    try {
      const user = await this.userRepository.save(userData);
      this.logger.info('User created successfully', { userId: user.id });
      return user;
    } catch (error) {
      this.logger.error('Failed to create user', error, { userData });
      throw error;
    }
  }

  async findUser(id: string) {
    this.logger.debug('Finding user by ID', { id });

    const user = await this.userRepository.findById(id);
    if (!user) {
      this.logger.warn('User not found', { id });
      return null;
    }

    this.logger.verbose('User found', { userId: user.id });
    return user;
  }

  async deleteUser(id: string) {
    this.logger.log('Deleting user', { id });

    try {
      await this.userRepository.delete(id);
      this.logger.info('User deleted successfully', { id });
    } catch (error) {
      this.logger.fatal('Critical error during user deletion', error, { id });
      throw error;
    }
  }
}
```

#### Logger Configuration

Configure the logger with custom options and transports.

```typescript
import { LoggerService } from '@hichchi/nest-core';

// Configure logger globally
LoggerService.configure({
  level: 'info',
  format: 'json',
  transports: [
    {
      type: 'console',
      options: {
        colorize: true,
        timestamp: true,
      },
    },
    {
      type: 'file',
      options: {
        filename: 'logs/app.log',
        maxsize: 5242880, // 5MB
        maxFiles: 5,
      },
    },
  ],
});

// Use in different contexts
const authLogger = new LoggerService('AuthService');
const dbLogger = new LoggerService('DatabaseService');

// Different log levels
authLogger.verbose('Detailed debug information');
authLogger.debug('Debug information');
authLogger.info('General information');
authLogger.log('Standard log message');
authLogger.warn('Warning message');
authLogger.error('Error occurred', new Error('Sample error'));
authLogger.fatal('Critical system error', new Error('Fatal error'));
```

### Using Utilities

#### Exception Utilities

Utility functions for handling and transforming exceptions.

```typescript
import { 
  isHttpException, 
  transformException, 
  getExceptionMessage 
} from '@hichchi/nest-core';

@Injectable()
export class ErrorHandlerService {
  handleError(error: any) {
    // Check if error is an HTTP exception
    if (isHttpException(error)) {
      console.log('HTTP Exception:', error.getStatus(), error.message);
      return;
    }

    // Transform generic error to HTTP exception
    const httpException = transformException(error);
    console.log('Transformed exception:', httpException);

    // Extract meaningful error message
    const message = getExceptionMessage(error);
    console.log('Error message:', message);
  }

  async processWithErrorHandling(operation: () => Promise<any>) {
    try {
      return await operation();
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }
}
```

#### Validation Utilities

Utility functions for validation and data transformation.

```typescript
import { 
  validateObject, 
  transformData, 
  sanitizeInput 
} from '@hichchi/nest-core';

@Injectable()
export class ValidationService {
  async validateUserInput(userData: any) {
    // Validate object structure
    const isValid = await validateObject(userData, {
      email: 'required|email',
      name: 'required|string|min:2',
      age: 'optional|number|min:18',
    });

    if (!isValid) {
      throw new BadRequestException('Invalid user data');
    }

    // Transform data
    const transformedData = transformData(userData, {
      email: 'lowercase|trim',
      name: 'trim|capitalize',
    });

    // Sanitize input
    const sanitizedData = sanitizeInput(transformedData);

    return sanitizedData;
  }
}
```

#### Global Utilities

General utility functions for common operations.

```typescript
import { 
  getGlobal, 
  setGlobal, 
  isOriginAllowed 
} from '@hichchi/nest-core';

// Global state management
setGlobal('appConfig', {
  version: '1.0.0',
  environment: 'production',
});

const config = getGlobal('appConfig');
console.log('App version:', config.version);

// Origin validation for CORS
const allowedOrigins = ['http://localhost:3000', 'https://myapp.com'];

@Injectable()
export class CorsService {
  validateOrigin(origin: string): boolean {
    return isOriginAllowed(origin, allowedOrigins);
  }

  getCorsOptions() {
    return {
      origin: (origin: string, callback: Function) => {
        if (this.validateOrigin(origin)) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },
    };
  }
}
```

## 🔧 Configuration Reference

### Bootstrap Configuration

```typescript
interface AppConfiguration {
  /** Port number on which the application will listen (default: 8080) */
  port?: number;

  /** Global prefix for all routes in the application */
  globalPrefix?: string;

  /** List of allowed origins for CORS */
  allowedOrigins?: string[];

  /** Validation pipe configuration */
  validation?: boolean | ValidationPipeOptions;

  /** Global exception filters configuration */
  globalFilters?: boolean | ExceptionFilter[];

  /** Global interceptors configuration */
  globalInterceptors?: boolean | NestInterceptor[];

  /** Logger configuration */
  logger?: boolean | LoggerService;
}

// Bootstrap your application with enhanced features
await hichchiBootstrap(AppModule, {
  port: 3000,
  globalPrefix: 'api',
  allowedOrigins: ['localhost:3000', 'example.com'],
  validation: {
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true
  },
  globalFilters: true,
  globalInterceptors: true,
  logger: true
});
```

### HTTP Service Configuration

```typescript
import { AxiosHttpService } from '@hichchi/nest-core';
import { AxiosRequestConfig } from 'axios';

@Injectable()
export class MyService {
  constructor(private readonly httpService: AxiosHttpService) {}

  async getData() {
    const config: AxiosRequestConfig = {
      timeout: 5000,
      headers: { 'Authorization': 'Bearer token' },
      params: { page: 1, limit: 10 }
    };

    return this.httpService.get<DataResponse>('/api/data', config);
  }
}
```

### Logger Configuration

```typescript
import { LoggerService, LoggerOptions } from '@hichchi/nest-core';
import { LogLevel } from '@hichchi/nest-core';

// Configure logger globally
const loggerOptions: LoggerOptions = {
  appName: 'MyApp',
  level: LogLevel.INFO,
  logsDir: './logs',
  colors: true,
  prettyPrint: true,
  showAppName: true,
  timestampFormat: 'YYYY-MM-DD hh:mm:ss A'
};

LoggerService.configure(loggerOptions);

// Create logger instance with context
const logger = new LoggerService('MyService');
logger.log('Service initialized');
```

## 🔧 Development

### Building

```bash
nx build nest-core
```

Compile and bundle the core utilities for production use.

### Testing

```bash
nx test nest-core
```

Run comprehensive unit tests powered by [Jest](https://jestjs.io).

---

<div align="center">

**Made with ❤️ by [Hichchi Dev](https://github.com/hichchidev)**

[![Hichchi Ecosystem](https://img.shields.io/badge/🏠_Hichchi_Ecosystem-blue)](https://github.com/hichchidev/hichchi)
[![Report Bug](https://img.shields.io/badge/🐛_Report_Bug-red)](https://github.com/hichchidev/hichchi/issues)
[![Request Feature](https://img.shields.io/badge/✨_Request_Feature-green)](https://github.com/hichchidev/hichchi/issues)

*Accelerating NestJS development with essential bootstrap, caching, logging, middleware, and enterprise-grade utilities*

</div>

---

# 📖 API Documentation

Complete technical reference for all classes, interfaces, methods, and types in this library.

**Auto-generated by TypeDoc** - Browse through detailed API references, code examples, and implementation guides below.

<!-- TypeDoc generated documentation will be appended below this point -->

---

## 📋 API Table of Contents
