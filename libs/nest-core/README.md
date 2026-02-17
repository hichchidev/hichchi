<!--suppress ALL -->

<div align="center">

# 🚀 @hichchi/nest-core

## Description

**Comprehensive NestJS core library providing application bootstrap, caching, decorators, filters, interceptors, logging, middleware, services, validators, and essential utilities for enterprise-grade applications**

[![npm version](https://img.shields.io/npm/v/@hichchi/nest-core?style=flat&color=blue)](https://www.npmjs.com/package/@hichchi/nest-core)
[![npm downloads](https://img.shields.io/npm/dm/@hichchi/nest-core?style=flat&color=green)](https://www.npmjs.com/package/@hichchi/nest-core)
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

- **Node.js**: ^20.0.0
- **NestJS**: ^11.0.0
- **TypeScript**: ~5.9.3

### Peer Dependencies

```bash
# For core functionality
npm install @nestjs/common @nestjs/core
npm install rxjs reflect-metadata

# For caching features
npm install @nestjs/cache-manager cache-manager @keyv/redis
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
import { hichchiBootstrap } from "@hichchi/nest-core";
import { AppModule } from "./app.module";

// Basic usage with default configuration
async function bootstrap() {
  await hichchiBootstrap(AppModule);
}

// Advanced usage with custom configuration
async function bootstrap() {
  await hichchiBootstrap(AppModule, {
    port: 3000,
    globalPrefix: "api/v1",
    allowedOrigins: ["http://localhost:3000", "https://myapp.com"],
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
import { Injectable } from "@nestjs/common";
import { AxiosHttpService } from "@hichchi/nest-core";
import { AxiosRequestConfig } from "axios";

@Injectable()
export class ApiService {
  constructor(private readonly httpService: AxiosHttpService) {}

  // GET request with configuration
  async getUsers(page: number = 1, limit: number = 10) {
    const config: AxiosRequestConfig = {
      params: { page, limit },
      timeout: 5000,
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await this.httpService.get("/users", config);
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
        Authorization: `Bearer ${this.getAuthToken()}`,
        "Content-Type": "application/json",
      },
    };

    return this.httpService.post("/users", userData, config);
  }

  // PUT request for updates
  async updateUser(id: string, userData: any) {
    const config: AxiosRequestConfig = {
      timeout: 10000,
      headers: {
        Authorization: `Bearer ${this.getAuthToken()}`,
      },
    };

    return this.httpService.put(`/users/${id}`, userData, config);
  }

  // PATCH request for partial updates
  async patchUser(id: string, partialData: any) {
    return this.httpService.patch(`/users/${id}`, partialData, {
      headers: {
        Authorization: `Bearer ${this.getAuthToken()}`,
      },
    });
  }

  // DELETE request
  async deleteUser(id: string) {
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${this.getAuthToken()}`,
      },
    };

    return this.httpService.delete(`/users/${id}`, config);
  }

  private getAuthToken(): string {
    // Implementation to get auth token
    return "your-auth-token";
  }
}
```

### Using Middlewares

#### Body Parser Middlewares

The library provides specialized body parser middlewares for different content types.

```typescript
import { Module, NestModule, MiddlewareConsumer } from "@nestjs/common";
import {
  JsonBodyParserMiddleware,
  RawBodyParserMiddleware,
} from "@hichchi/nest-core";

@Module({})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    // Apply JSON body parser to specific routes
    consumer.apply(JsonBodyParserMiddleware).forRoutes("api/webhooks/json");

    // Apply raw body parser for webhook endpoints
    consumer.apply(RawBodyParserMiddleware).forRoutes("api/webhooks/raw");
  }
}

// Use in webhook controllers
@Controller("api/webhooks")
export class WebhookController {
  @Post("json")
  handleJsonWebhook(@Body() body: any) {
    // Body is automatically parsed as JSON
    return this.processJsonWebhook(body);
  }

  @Post("raw")
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
import { Injectable } from "@nestjs/common";
import { LoggerService } from "@hichchi/nest-core";

@Injectable()
export class UserService {
  constructor(private readonly logger: LoggerService) {
    // Set context for this service
    this.logger = new LoggerService("UserService");
  }

  async createUser(userData: any) {
    this.logger.log("Creating new user", { userData });

    try {
      const user = await this.userRepository.save(userData);
      this.logger.info("User created successfully", { userId: user.id });
      return user;
    } catch (error) {
      this.logger.error("Failed to create user", error, { userData });
      throw error;
    }
  }

  async findUser(id: string) {
    this.logger.debug("Finding user by ID", { id });

    const user = await this.userRepository.findById(id);
    if (!user) {
      this.logger.warn("User not found", { id });
      return null;
    }

    this.logger.verbose("User found", { userId: user.id });
    return user;
  }

  async deleteUser(id: string) {
    this.logger.log("Deleting user", { id });

    try {
      await this.userRepository.delete(id);
      this.logger.info("User deleted successfully", { id });
    } catch (error) {
      this.logger.fatal("Critical error during user deletion", error, { id });
      throw error;
    }
  }
}
```

#### Logger Configuration

Configure the logger with custom options and transports.

```typescript
import { LoggerService } from "@hichchi/nest-core";

// Configure logger globally
LoggerService.configure({
  level: "info",
  format: "json",
  transports: [
    {
      type: "console",
      options: {
        colorize: true,
        timestamp: true,
      },
    },
    {
      type: "file",
      options: {
        filename: "logs/app.log",
        maxsize: 5242880, // 5MB
        maxFiles: 5,
      },
    },
  ],
});

// Use in different contexts
const authLogger = new LoggerService("AuthService");
const dbLogger = new LoggerService("DatabaseService");

// Different log levels
authLogger.verbose("Detailed debug information");
authLogger.debug("Debug information");
authLogger.info("General information");
authLogger.log("Standard log message");
authLogger.warn("Warning message");
authLogger.error("Error occurred", new Error("Sample error"));
authLogger.fatal("Critical system error", new Error("Fatal error"));
```

### Using Utilities

#### Exception Utilities

Utility functions for handling and transforming exceptions.

```typescript
import {
  isHttpException,
  transformException,
  getExceptionMessage,
} from "@hichchi/nest-core";

@Injectable()
export class ErrorHandlerService {
  handleError(error: any) {
    // Check if error is an HTTP exception
    if (isHttpException(error)) {
      console.log("HTTP Exception:", error.getStatus(), error.message);
      return;
    }

    // Transform generic error to HTTP exception
    const httpException = transformException(error);
    console.log("Transformed exception:", httpException);

    // Extract meaningful error message
    const message = getExceptionMessage(error);
    console.log("Error message:", message);
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
  sanitizeInput,
} from "@hichchi/nest-core";

@Injectable()
export class ValidationService {
  async validateUserInput(userData: any) {
    // Validate object structure
    const isValid = await validateObject(userData, {
      email: "required|email",
      name: "required|string|min:2",
      age: "optional|number|min:18",
    });

    if (!isValid) {
      throw new BadRequestException("Invalid user data");
    }

    // Transform data
    const transformedData = transformData(userData, {
      email: "lowercase|trim",
      name: "trim|capitalize",
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
import { getGlobal, setGlobal, isOriginAllowed } from "@hichchi/nest-core";

// Global state management
setGlobal("appConfig", {
  version: "1.0.0",
  environment: "production",
});

const config = getGlobal("appConfig");
console.log("App version:", config.version);

// Origin validation for CORS
const allowedOrigins = ["http://localhost:3000", "https://myapp.com"];

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
          callback(new Error("Not allowed by CORS"));
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
  /** Port number on which the application will listen (default: 3000) */
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
  globalPrefix: "api",
  allowedOrigins: ["localhost:3000", "example.com"],
  validation: {
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  },
  globalFilters: true,
  globalInterceptors: true,
  logger: true,
});
```

### HTTP Service Configuration

```typescript
import { AxiosHttpService } from "@hichchi/nest-core";
import { AxiosRequestConfig } from "axios";

@Injectable()
export class MyService {
  constructor(private readonly httpService: AxiosHttpService) {}

  async getData() {
    const config: AxiosRequestConfig = {
      timeout: 5000,
      headers: { Authorization: "Bearer token" },
      params: { page: 1, limit: 10 },
    };

    return this.httpService.get<DataResponse>("/api/data", config);
  }
}
```

### Logger Configuration

```typescript
import { LoggerService, LoggerOptions } from "@hichchi/nest-core";
import { LogLevel } from "@hichchi/nest-core";

// Configure logger globally
const loggerOptions: LoggerOptions = {
  appName: "MyApp",
  level: LogLevel.INFO,
  logsDir: "./logs",
  colors: true,
  prettyPrint: true,
  showAppName: true,
  timestampFormat: "YYYY-MM-DD hh:mm:ss A",
};

LoggerService.configure(loggerOptions);

// Create logger instance with context
const logger = new LoggerService("MyService");
logger.log("Service initialized");
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

_Accelerating NestJS development with essential bootstrap, caching, logging, middleware, and enterprise-grade utilities_

</div>

---

# 📖 API Documentation

Complete technical reference for all classes, interfaces, methods, and types in this library.

**Auto-generated by TypeDoc** - Browse through detailed API references, code examples, and implementation guides below.

<!-- TypeDoc generated documentation will be appended below this point -->

---

## 📋 API Table of Contents

- [Classes](#classes)
  - [AllExceptionsFilter](#allexceptionsfilter)
  - [AxiosHttpService](#axioshttpservice-1)
  - [CacheModule](#cachemodule)
  - [CacheService](#cacheservice)
  - [HichchiMetadata](#hichchimetadata)
  - [ImplementationException](#implementationexception)
  - [JsonArrayFileTransport](#jsonarrayfiletransport)
  - [JsonBodyMiddleware](#jsonbodymiddleware)
  - [LoggerService](#loggerservice-1)
  - [PaginatedResponse](#paginatedresponse)
  - [RawBodyMiddleware](#rawbodymiddleware)
  - [RedisConfigException](#redisconfigexception)
  - [TransformInterceptor](#transforminterceptor)
- [Functions](#functions)
  - [BooleanTransformer()](#booleantransformer)
  - [BooleanTransformerWithDefault()](#booleantransformerwithdefault)
  - [colorize()](#colorize)
  - [consoleFormat()](#consoleformat)
  - [DateTransformer()](#datetransformer)
  - [Dto()](#dto)
  - [errorFileFormat()](#errorfileformat)
  - [FileFormFieldTransformer()](#fileformfieldtransformer)
  - [FileOrTextFormFieldTransformer()](#fileortextformfieldtransformer)
  - [formatMessage()](#formatmessage)
  - [generateValidationErrorResponse()](#generatevalidationerrorresponse)
  - [getGlobal()](#getglobal)
  - [hichchiBootstrap()](#hichchibootstrap-1)
  - [hichchiMetadata()](#hichchimetadata-1)
  - [httpExceptionFilter()](#httpexceptionfilter)
  - [isJson()](#isjson)
  - [isOriginAllowed()](#isoriginallowed)
  - [isRandomHexToken()](#israndomhextoken)
  - [IsRandomHexToken()](#israndomhextoken-1)
  - [IsVerifyToken()](#isverifytoken)
  - [MultiValueFormFieldTransformer()](#multivalueformfieldtransformer)
  - [throwValidationErrors()](#throwvalidationerrors)
  - [toErrorObject()](#toerrorobject)
  - [toErrString()](#toerrstring)
  - [toJSON()](#tojson)
  - [toString()](#tostring)
  - [UseTransformInterceptor()](#usetransforminterceptor)
  - [validateDto()](#validatedto)
  - [validationPipeExceptionFactory()](#validationpipeexceptionfactory)
- [Interfaces](#interfaces)
  - [Colorizer()](#colorizer)
  - [ColorScheme](#colorscheme)
  - [CommonRedisOptions](#commonredisoptions)
  - [InfoObject](#infoobject)
  - [IViewDto](#iviewdto)
  - [LogEntry](#logentry)
  - [LoggerOptions](#loggeroptions)
  - [MulterFile](#multerfile)
  - [NestLikeFormatOptions](#nestlikeformatoptions)
  - [RedisOptionsWithHost](#redisoptionswithhost)
  - [RedisOptionsWithUrl](#redisoptionswithurl)
- [Type Aliases](#type-aliases)
  - [LogParam](#logparam)
  - [RedisOptions](#redisoptions)
- [Variables](#variables)
  - [CACHE_OPTIONS](#cache_options)
  - [clc](#clc)
  - [colorScheme](#colorscheme-1)
  - [DEFAULT_PORT](#default_port)
  - [defaultOptions](#defaultoptions)
  - [IS_RANDOM_HEX_TOKEN](#is_random_hex_token)
  - [IS_VERIFY_TOKEN](#is_verify_token)

## Classes

### AllExceptionsFilter

Defined in: [libs/nest-core/src/filters/http-exception.filter.ts:43](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/filters/http-exception.filter.ts#L43)

Global exception filter that standardizes error responses

This filter catches all unhandled exceptions in the application and transforms them
into standardized error responses. It extends NestJS's BaseExceptionFilter and uses
the httpExceptionFilter utility to process exceptions before passing them to the
parent filter.

The filter ensures that all error responses follow a consistent format with:

- Appropriate HTTP status codes
- Standardized error codes
- Clear error messages
- Optional detailed descriptions

When registered as a global filter, it will catch exceptions from all routes and
controllers in the application, providing a centralized error handling mechanism.

#### Example

```TypeScript
// Register as a global filter in your bootstrap function
async function bootstrap(): Promise<void> {
    const app = await NestFactory.create(AppModule);

    const { httpAdapter } = app.get(HttpAdapterHost);
    app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

    await app.listen(3000);
}
bootstrap();
```

#### See

- [httpExceptionFilter](#httpexceptionfilter) The utility function that processes exceptions
- ErrorResponse The standardized error response structure

#### Extends

- `BaseExceptionFilter`

#### Constructors

##### Constructor

```ts
new AllExceptionsFilter(applicationRef?): AllExceptionsFilter;
```

Defined in: node_modules/@nestjs/core/exceptions/base-exception-filter.d.ts:8

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

`applicationRef?`

</td>
<td>

`HttpServer`<`any`, `any`, `any`>

</td>
</tr>
</tbody>
</table>

###### Returns

[`AllExceptionsFilter`](#allexceptionsfilter)

###### Inherited from

```ts
BaseExceptionFilter.constructor;
```

#### Methods

##### catch()

```ts
catch(exception, host): void;
```

Defined in: [libs/nest-core/src/filters/http-exception.filter.ts:64](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/filters/http-exception.filter.ts#L64)

Catches and processes exceptions

This method overrides the catch method from BaseExceptionFilter to process
exceptions using the httpExceptionFilter utility before passing them to the
parent class's catch method. It extracts the HTTP request from the host and
enables logging of unknown exceptions.

The method performs the following steps:

1. Extracts the HTTP request from the ArgumentsHost
2. Passes the exception, request, and true (to enable logging) to httpExceptionFilter
3. Passes the processed exception to the parent class's catch method

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

`exception`

</td>
<td>

`unknown`

</td>
<td>

The exception object thrown in the application

</td>
</tr>
<tr>
<td>

`host`

</td>
<td>

`ArgumentsHost`

</td>
<td>

The arguments host object containing the execution context

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### See

- [httpExceptionFilter](#httpexceptionfilter) The utility function that processes exceptions
- BaseExceptionFilter.catch The parent class's catch method

###### Overrides

```ts
BaseExceptionFilter.catch;
```

##### handleUnknownError()

```ts
handleUnknownError(
   exception,
   host,
   applicationRef): void;
```

Defined in: node_modules/@nestjs/core/exceptions/base-exception-filter.d.ts:10

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

`exception`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`host`

</td>
<td>

`ArgumentsHost`

</td>
</tr>
<tr>
<td>

`applicationRef`

</td>
<td>

| `HttpServer`<`any`, `any`, `any`> | `AbstractHttpAdapter`<`any`, `any`, `any`>

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### Inherited from

```ts
BaseExceptionFilter.handleUnknownError;
```

##### isExceptionObject()

```ts
isExceptionObject(err): err is Error;
```

Defined in: node_modules/@nestjs/core/exceptions/base-exception-filter.d.ts:11

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
</tbody>
</table>

###### Returns

`err is Error`

###### Inherited from

```ts
BaseExceptionFilter.isExceptionObject;
```

##### isHttpError()

```ts
isHttpError(err): err is { message: string; statusCode: number };
```

Defined in: node_modules/@nestjs/core/exceptions/base-exception-filter.d.ts:16

Checks if the thrown error comes from the "http-errors" library.

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

`any`

</td>
<td>

error object

</td>
</tr>
</tbody>
</table>

###### Returns

`err is { message: string; statusCode: number }`

###### Inherited from

```ts
BaseExceptionFilter.isHttpError;
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

<a id="property-applicationref"></a> `applicationRef?`

</td>
<td>

`readonly`

</td>
<td>

`HttpServer`<`any`, `any`, `any`>

</td>
<td>

```ts
BaseExceptionFilter.applicationRef;
```

</td>
<td>

node_modules/@nestjs/core/exceptions/base-exception-filter.d.ts:5

</td>
</tr>
<tr>
<td>

<a id="property-httpadapterhost"></a> `httpAdapterHost?`

</td>
<td>

`readonly`

</td>
<td>

`HttpAdapterHost`<`AbstractHttpAdapter`<`any`, `any`, `any`>>

</td>
<td>

```ts
BaseExceptionFilter.httpAdapterHost;
```

</td>
<td>

node_modules/@nestjs/core/exceptions/base-exception-filter.d.ts:7

</td>
</tr>
</tbody>
</table>

---

### AxiosHttpService

Defined in: [libs/nest-core/src/services/axios-http.service.ts:49](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/services/axios-http.service.ts#L49)

HTTP client service that wraps NestJS HttpService with improved error handling

This service provides a convenient wrapper around the NestJS HttpService (which is based on Axios)
to make HTTP requests with automatic error handling. It converts Axios errors into appropriate
NestJS exceptions based on the HTTP status code of the response.

The service offers methods for all standard HTTP methods (GET, POST, PUT, PATCH, DELETE)
with full TypeScript support for request and response types.

#### Example

```typescript
// Inject the service
constructor(private readonly httpService: AxiosHttpService) {}

// Make a GET request
async getUser(id: string): Promise<User> {
  return this.httpService.get<User>(`https://api.example.com/users/${id}`);
}

// Make a POST request with typed request and response
async createUser(userData: CreateUserDto): Promise<User> {
  return this.httpService.post<User, CreateUserDto>(
    'https://api.example.com/users',
    userData
  );
}
```

#### See

HttpService The underlying NestJS HttpService that this service wraps

#### Constructors

##### Constructor

```ts
new AxiosHttpService(httpService): AxiosHttpService;
```

Defined in: [libs/nest-core/src/services/axios-http.service.ts:50](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/services/axios-http.service.ts#L50)

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

`httpService`

</td>
<td>

`HttpService`

</td>
</tr>
</tbody>
</table>

###### Returns

[`AxiosHttpService`](#axioshttpservice)

#### Methods

##### delete()

```ts
delete<T>(url, config?): Promise<T>;
```

Defined in: [libs/nest-core/src/services/axios-http.service.ts:322](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/services/axios-http.service.ts#L322)

Performs an HTTP DELETE request

This method sends a DELETE request to the specified URL and returns the response data.
DELETE is used to remove resources from the server. It handles the conversion of
the Observable returned by HttpService into a Promise, and provides error handling
by converting Axios errors into appropriate NestJS exceptions.

###### Type Parameters

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

The expected type of the response data

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

`url`

</td>
<td>

`string`

</td>
<td>

The URL to send the request to

</td>
</tr>
<tr>
<td>

`config?`

</td>
<td>

`AxiosRequestConfig`<`any`>

</td>
<td>

Optional Axios request configuration

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`T`>

A promise that resolves to the response data

###### Throws

For 400 status responses

###### Throws

For 401 status responses

###### Throws

For 403 status responses

###### Throws

For all other error responses

###### Example

```typescript
// Delete a user
const result = await httpService.delete<{ success: boolean }>(
  "https://api.example.com/users/123",
);

if (result.success) {
  console.log("User deleted successfully");
}

// Delete with authentication and additional parameters
const deleteResult = await httpService.delete<ApiResponse>(
  "https://api.example.com/resources/456",
  {
    headers: { Authorization: "Bearer " + token },
    params: { permanent: true },
  },
);
```

##### get()

```ts
get<T>(url, config?): Promise<T>;
```

Defined in: [libs/nest-core/src/services/axios-http.service.ts:80](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/services/axios-http.service.ts#L80)

Performs an HTTP GET request

This method sends a GET request to the specified URL and returns the response data.
It handles the conversion of the Observable returned by HttpService into a Promise,
and provides error handling by converting Axios errors into appropriate NestJS exceptions.

###### Type Parameters

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

The expected type of the response data

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

`url`

</td>
<td>

`string`

</td>
<td>

The URL to send the request to

</td>
</tr>
<tr>
<td>

`config?`

</td>
<td>

`AxiosRequestConfig`<`any`>

</td>
<td>

Optional Axios request configuration

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`T`>

A promise that resolves to the response data

###### Throws

For 400 status responses

###### Throws

For 401 status responses

###### Throws

For 403 status responses

###### Throws

For all other error responses

###### Example

```typescript
// Get a user by ID
const user = await httpService.get<User>("https://api.example.com/users/123");

// Get users with query parameters and headers
const users = await httpService.get<User[]>("https://api.example.com/users", {
  params: { role: "admin", active: true },
  headers: { "X-API-Key": "your-api-key" },
});
```

##### patch()

```ts
patch<T, D>(
   url,
   data?,
config?): Promise<T>;
```

Defined in: [libs/nest-core/src/services/axios-http.service.ts:266](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/services/axios-http.service.ts#L266)

Performs an HTTP PATCH request

This method sends a PATCH request with the provided data to the specified URL
and returns the response data. Unlike PUT which replaces an entire resource,
PATCH is used for partial updates to a resource. It handles the conversion of
the Observable returned by HttpService into a Promise, and provides error handling
by converting Axios errors into appropriate NestJS exceptions.

###### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
<th>Default type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`T`

</td>
<td>

‐

</td>
<td>

The expected type of the response data

</td>
</tr>
<tr>
<td>

`D`

</td>
<td>

`any`

</td>
<td>

The type of the request data (defaults to any)

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

`url`

</td>
<td>

`string`

</td>
<td>

The URL to send the request to

</td>
</tr>
<tr>
<td>

`data?`

</td>
<td>

`D`

</td>
<td>

Optional data to send in the request body

</td>
</tr>
<tr>
<td>

`config?`

</td>
<td>

`AxiosRequestConfig`<`any`>

</td>
<td>

Optional Axios request configuration

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`T`>

A promise that resolves to the response data

###### Throws

For 400 status responses

###### Throws

For 401 status responses

###### Throws

For 403 status responses

###### Throws

For all other error responses

###### Example

```typescript
// Partially update a user
interface PatchUserDto {
  name?: string;
  email?: string;
}

const updatedUser = await httpService.patch<User, PatchUserDto>(
  "https://api.example.com/users/123",
  { name: "John Updated" }, // Only update the name
);

// Patch with query parameters
const result = await httpService.patch<ApiResponse, object>(
  "https://api.example.com/resources/456",
  { status: "inactive" },
  {
    params: { version: "2" },
    headers: { "X-Reason": "Maintenance" },
  },
);
```

##### post()

```ts
post<T, D>(
   url,
   data?,
config?): Promise<T>;
```

Defined in: [libs/nest-core/src/services/axios-http.service.ts:138](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/services/axios-http.service.ts#L138)

Performs an HTTP POST request

This method sends a POST request with the provided data to the specified URL
and returns the response data. It handles the conversion of the Observable
returned by HttpService into a Promise, and provides error handling by
converting Axios errors into appropriate NestJS exceptions.

###### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
<th>Default type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`T`

</td>
<td>

‐

</td>
<td>

The expected type of the response data

</td>
</tr>
<tr>
<td>

`D`

</td>
<td>

`any`

</td>
<td>

The type of the request data (defaults to any)

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

`url`

</td>
<td>

`string`

</td>
<td>

The URL to send the request to

</td>
</tr>
<tr>
<td>

`data?`

</td>
<td>

`D`

</td>
<td>

Optional data to send in the request body

</td>
</tr>
<tr>
<td>

`config?`

</td>
<td>

`AxiosRequestConfig`<`any`>

</td>
<td>

Optional Axios request configuration

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`T`>

A promise that resolves to the response data

###### Throws

For 400 status responses

###### Throws

For 401 status responses

###### Throws

For 403 status responses

###### Throws

For all other error responses

###### Example

```typescript
// Create a new user
interface CreateUserDto {
  name: string;
  email: string;
}

const newUser = await httpService.post<User, CreateUserDto>(
  "https://api.example.com/users",
  { name: "John Doe", email: "john@example.com" },
);

// Post with additional headers
const response = await httpService.post<ApiResponse, FormData>(
  "https://api.example.com/upload",
  formData,
  { headers: { "Content-Type": "multipart/form-data" } },
);
```

##### put()

```ts
put<T, D>(
   url,
   data?,
config?): Promise<T>;
```

Defined in: [libs/nest-core/src/services/axios-http.service.ts:204](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/services/axios-http.service.ts#L204)

Performs an HTTP PUT request

This method sends a PUT request with the provided data to the specified URL
and returns the response data. PUT is typically used for updating existing resources
with a complete replacement of the resource. It handles the conversion of the Observable
returned by HttpService into a Promise, and provides error handling by
converting Axios errors into appropriate NestJS exceptions.

###### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
<th>Default type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`T`

</td>
<td>

‐

</td>
<td>

The expected type of the response data

</td>
</tr>
<tr>
<td>

`D`

</td>
<td>

`any`

</td>
<td>

The type of the request data (defaults to any)

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

`url`

</td>
<td>

`string`

</td>
<td>

The URL to send the request to

</td>
</tr>
<tr>
<td>

`data?`

</td>
<td>

`D`

</td>
<td>

Optional data to send in the request body

</td>
</tr>
<tr>
<td>

`config?`

</td>
<td>

`AxiosRequestConfig`<`any`>

</td>
<td>

Optional Axios request configuration

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`T`>

A promise that resolves to the response data

###### Throws

For 400 status responses

###### Throws

For 401 status responses

###### Throws

For 403 status responses

###### Throws

For all other error responses

###### Example

```typescript
// Update a user (complete replacement)
interface UpdateUserDto {
  id: string;
  name: string;
  email: string;
  role: string;
}

const updatedUser = await httpService.put<User, UpdateUserDto>(
  "https://api.example.com/users/123",
  {
    id: "123",
    name: "John Doe",
    email: "john@example.com",
    role: "admin",
  },
);

// Put with authentication header
const result = await httpService.put<ApiResponse, object>(
  "https://api.example.com/resources/456",
  { status: "active" },
  { headers: { Authorization: "Bearer " + token } },
);
```

---

### CacheModule

Defined in: [libs/nest-core/src/cache/cache.module.ts:53](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/cache/cache.module.ts#L53)

Global cache module that provides Redis-based caching with in-memory fallback

This module integrates NestJS's cache manager with Redis and provides a two-layer
caching strategy: an in-memory LRU cache for frequently accessed items and a Redis
cache for distributed caching across multiple instances.

The module is marked as @Global(), so it only needs to be imported once in your
application's root module.

#### Examples

```typescript
// In your app module
@Module({
  imports: [
    CacheModule.register({
      host: "localhost",
      port: 6379,
      ttl: 3600,
      prefix: "myapp:",
    }),
  ],
})
export class AppModule {}
```

```typescript
// Using with a Redis URL
@Module({
  imports: [
    CacheModule.register({
      url: "redis://username:password@redis.example.com:6379",
      ttl: 86400, // 1 day
      lruSize: 1000,
    }),
  ],
})
export class AppModule {}
```

#### Constructors

##### Constructor

```ts
new CacheModule(): CacheModule;
```

###### Returns

[`CacheModule`](#cachemodule)

#### Methods

##### register()

```ts
static register(options): DynamicModule;
```

Defined in: [libs/nest-core/src/cache/cache.module.ts:89](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/cache/cache.module.ts#L89)

Register the cache module with Redis configuration

This static method configures the cache module with the provided Redis options.
It sets up a two-layer caching strategy:

1. An in-memory LRU cache for frequently accessed items
2. A Redis cache for distributed caching across multiple instances

The method validates the provided options and throws a RedisConfigException
if neither host nor url is provided.

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

[`RedisOptions`](#redisoptions)

</td>
<td>

Redis connection and caching options

</td>
</tr>
</tbody>
</table>

###### Returns

`DynamicModule`

A NestJS dynamic module configured for caching

###### Throws

If neither host nor url is provided in options

###### Examples

```typescript
// Register with host-based configuration
CacheModule.register({
  host: "localhost",
  port: 6379,
  ttl: 3600,
});
```

```typescript
// Register with URL-based configuration
CacheModule.register({
  url: "redis://redis.example.com:6379",
  prefix: "api:",
  lruSize: 500,
});
```

---

### CacheService

Defined in: [libs/nest-core/src/cache/services/cache.service.ts:30](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/cache/services/cache.service.ts#L30)

Cache Service

This service provides a wrapper around the NestJS cache manager for storing and retrieving data.
It offers type-safe methods for getting, setting, and deleting cache entries with error handling.

#### Example

```TypeScript
// Inject the service
constructor(private readonly cacheService: CacheService) {}

// Store a value in cache
await cacheService.set('user:123', { name: 'John Doe' }, 3600); // expires in 1 hour

// Retrieve a value from cache
const user = await cacheService.get<{ name: string }>('user:123');

// Delete a value from cache
await cacheService.delete('user:123');
```

#### See

[CacheModule](#cachemodule) The module that provides this service

#### Constructors

##### Constructor

```ts
new CacheService(cacheManager): CacheService;
```

Defined in: [libs/nest-core/src/cache/services/cache.service.ts:31](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/cache/services/cache.service.ts#L31)

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

`cacheManager`

</td>
<td>

`Cache`

</td>
</tr>
</tbody>
</table>

###### Returns

[`CacheService`](#cacheservice)

#### Methods

##### delete()

```ts
delete(key): Promise<boolean>;
```

Defined in: [libs/nest-core/src/cache/services/cache.service.ts:119](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/cache/services/cache.service.ts#L119)

Delete a value from cache

This method removes a value from the cache by its key.
It returns true if the operation was successful, false if there was an error.

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

`key`

</td>
<td>

`string`

</td>
<td>

The unique key of the cached value to delete

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`boolean`>

True if the operation was successful, false otherwise

###### Example

```TypeScript
// Delete a cached value
const success = await cacheService.delete('user:123');
if (success) {
  console.log('Cache entry successfully deleted');
} else {
  console.error('Failed to delete cache entry');
}
```

##### get()

```ts
get<T>(key): Promise<T | undefined>;
```

Defined in: [libs/nest-core/src/cache/services/cache.service.ts:57](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/cache/services/cache.service.ts#L57)

Get a value from cache

This method retrieves a value from the cache by its key.
It returns undefined if the key doesn't exist or if there's an error during retrieval.

###### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
<th>Default type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`T`

</td>
<td>

`unknown`

</td>
<td>

The type of the cached value

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

`key`

</td>
<td>

`string`

</td>
<td>

The unique key to identify the cached value

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`T` | `undefined`>

The cached value if found, undefined otherwise

###### Example

```TypeScript
// Get a string value
const message = await cacheService.get<string>('greeting');

// Get a complex object
const user = await cacheService.get<User>('user:123');
if (user) {
  console.log(`Found user: ${user.name}`);
} else {
  console.log('User not found in cache');
}
```

##### set()

```ts
set<T>(
   key,
   value,
ttl?): Promise<boolean>;
```

Defined in: [libs/nest-core/src/cache/services/cache.service.ts:90](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/cache/services/cache.service.ts#L90)

Set a value in cache

This method stores a value in the cache with the specified key.
An optional time-to-live (TTL) can be provided to automatically expire the cache entry.

###### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
<th>Default type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`T`

</td>
<td>

`unknown`

</td>
<td>

The type of the value to cache

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

`key`

</td>
<td>

`string`

</td>
<td>

The unique key to identify the cached value

</td>
</tr>
<tr>
<td>

`value`

</td>
<td>

`T`

</td>
<td>

The value to store in cache

</td>
</tr>
<tr>
<td>

`ttl?`

</td>
<td>

`number`

</td>
<td>

Optional time-to-live in seconds

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`boolean`>

True if the operation was successful, false otherwise

###### Example

```TypeScript
// Store a simple value with no expiration
await cacheService.set('greeting', 'Hello, World!');

// Store an object with a 1-hour expiration
await cacheService.set(
  'user:123',
  { id: 123, name: 'John Doe', email: 'john@example.com' },
  3600 // 1 hour in seconds
);
```

---

### HichchiMetadata

Defined in: [libs/nest-core/src/metadata/metadata-storage.ts:87](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/metadata/metadata-storage.ts#L87)

Central metadata storage system for Hichchi framework

This class provides a centralized storage for metadata about DTOs, entities,
and other application components. It maintains three separate stores:

1. validationDtos: Maps DTO classes to their metadata
2. entities: Maps entity classes to their metadata
3. store: A general-purpose metadata store for any class

The class is typically accessed through the hichchiMetadata() function,
which provides a singleton instance.

#### Example

```typescript
// Register a DTO with a name
hichchiMetadata().addValidationDto(UserDto, "user");

// Register an entity
hichchiMetadata().addEntity(User, "users", ["id"]);

// Store and retrieve custom metadata
hichchiMetadata().setMetadata(User, "isSearchable", true);
const isSearchable = hichchiMetadata().getMetadata<boolean>(
  User,
  "isSearchable",
);
```

#### See

[hichchiMetadata](#hichchimetadata-1) Function to access the singleton instance

#### Constructors

##### Constructor

```ts
new HichchiMetadata(): HichchiMetadata;
```

###### Returns

[`HichchiMetadata`](#hichchimetadata)

#### Methods

##### addEntity()

```ts
addEntity(
   entity,
   tableName,
   unique): void;
```

Defined in: [libs/nest-core/src/metadata/metadata-storage.ts:219](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/metadata/metadata-storage.ts#L219)

Register an entity class with its metadata

This method registers an entity class with its table name and unique field constraints.
It automatically generates a singular name from the table name.

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

`entity`

</td>
<td>

`Type`

</td>
<td>

The entity class to register

</td>
</tr>
<tr>
<td>

`tableName`

</td>
<td>

`string`

</td>
<td>

The database table name for this entity

</td>
</tr>
<tr>
<td>

`unique`

</td>
<td>

`string`\[]

</td>
<td>

Array of property names that form a unique constraint

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### Example

```typescript
// Register a User entity with 'users' table and 'id' as unique field
hichchiMetadata().addEntity(User, "users", ["id"]);
```

##### addValidationDto()

Implementation of the addValidationDto method
Registers a DTO class with either a name or an entity class

###### Param

The DTO class to register

###### Param

The name or entity class to associate with the DTO

###### Call Signature

```ts
addValidationDto(dto, name): void;
```

Defined in: [libs/nest-core/src/metadata/metadata-storage.ts:113](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/metadata/metadata-storage.ts#L113)

Register a DTO class with a name

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

`Type`

</td>
<td>

The DTO class to register

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

The name to associate with the DTO

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### Call Signature

```ts
addValidationDto(dto, entity): void;
```

Defined in: [libs/nest-core/src/metadata/metadata-storage.ts:122](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/metadata/metadata-storage.ts#L122)

Register a DTO class with an entity class

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

`Type`

</td>
<td>

The DTO class to register

</td>
</tr>
<tr>
<td>

`entity`

</td>
<td>

`Type`

</td>
<td>

The entity class to associate with the DTO

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

##### getDtoMetaOfInstance()

```ts
getDtoMetaOfInstance(instance): HichchiMetaDto | undefined;
```

Defined in: [libs/nest-core/src/metadata/metadata-storage.ts:191](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/metadata/metadata-storage.ts#L191)

Get metadata for an object instance by finding its DTO class

This method attempts to find a registered DTO class that matches the
constructor of the provided instance, and returns the metadata for that class.

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

`instance`

</td>
<td>

`unknown`

</td>
<td>

The object instance to get metadata for

</td>
</tr>
</tbody>
</table>

###### Returns

`HichchiMetaDto` | `undefined`

The metadata or undefined if no matching DTO is found

###### Example

```typescript
const userDto = new UserDto();
const metadata = hichchiMetadata().getDtoMetaOfInstance(userDto);
if (metadata) {
  console.log(`Found metadata for ${metadata.target.name}`);
}
```

##### getEntityName()

```ts
getEntityName(entity): string | undefined;
```

Defined in: [libs/nest-core/src/metadata/metadata-storage.ts:235](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/metadata/metadata-storage.ts#L235)

Get the singular name for an entity

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

`entity`

</td>
<td>

`Type`

</td>
<td>

The entity class to get the name for

</td>
</tr>
</tbody>
</table>

###### Returns

`string` | `undefined`

The singular name or undefined if entity not found

###### Example

```typescript
const entityName = hichchiMetadata().getEntityName(User);
// Returns 'user' if the entity was registered with tableName 'users'
```

##### getEntityUnique()

```ts
getEntityUnique(entity): string[] | undefined;
```

Defined in: [libs/nest-core/src/metadata/metadata-storage.ts:251](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/metadata/metadata-storage.ts#L251)

Get the unique field constraints for an entity

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

`entity`

</td>
<td>

`Type`

</td>
<td>

The entity class to get unique fields for

</td>
</tr>
</tbody>
</table>

###### Returns

`string`\[] | `undefined`

Array of unique field names or undefined if entity not found

###### Example

```typescript
const uniqueFields = hichchiMetadata().getEntityUnique(User);
// Returns ['id'] if the entity was registered with those unique fields
```

##### getMetadata()

```ts
getMetadata<T>(target, propertyKey): T;
```

Defined in: [libs/nest-core/src/metadata/metadata-storage.ts:313](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/metadata/metadata-storage.ts#L313)

Retrieve custom metadata for a class

This method retrieves previously stored metadata for a class.

###### Type Parameters

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

The expected type of the metadata value

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

`target`

</td>
<td>

`Type`

</td>
<td>

The class to retrieve metadata for

</td>
</tr>
<tr>
<td>

`propertyKey`

</td>
<td>

`string`

</td>
<td>

The key identifying the metadata

</td>
</tr>
</tbody>
</table>

###### Returns

`T`

The metadata value cast to type T

###### Example

```typescript
// Retrieve custom metadata
const isSearchable = hichchiMetadata().getMetadata<boolean>(
  User,
  "isSearchable",
);
const searchFields = hichchiMetadata().getMetadata<string[]>(
  User,
  "searchFields",
);
```

##### getValidationDtoInfo()

```ts
getValidationDtoInfo(dto): HichchiMetaDtoInfo | undefined;
```

Defined in: [libs/nest-core/src/metadata/metadata-storage.ts:169](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/metadata/metadata-storage.ts#L169)

Get metadata information for a specific DTO class

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

`Type`

</td>
<td>

The DTO class to get metadata for

</td>
</tr>
</tbody>
</table>

###### Returns

`HichchiMetaDtoInfo` | `undefined`

The metadata information or undefined if not found

###### Example

```typescript
const userDtoInfo = hichchiMetadata().getValidationDtoInfo(UserDto);
if (userDtoInfo?.entity) {
  console.log("UserDto is associated with an entity");
}
```

##### getValidationDtos()

```ts
getValidationDtos(): Type[];
```

Defined in: [libs/nest-core/src/metadata/metadata-storage.ts:151](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/metadata/metadata-storage.ts#L151)

Get all registered DTO classes

###### Returns

`Type`\[]

Array of all registered DTO classes

###### Example

```typescript
const allDtos = hichchiMetadata().getValidationDtos();
console.log(`Found ${allDtos.length} registered DTOs`);
```

##### isHichchiEntity()

```ts
isHichchiEntity(entity): boolean | undefined;
```

Defined in: [libs/nest-core/src/metadata/metadata-storage.ts:268](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/metadata/metadata-storage.ts#L268)

Check if a class is a registered Hichchi entity

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

`entity`

</td>
<td>

`Type`

</td>
<td>

The class to check

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean` | `undefined`

True if the class is a registered entity

###### Example

```typescript
if (hichchiMetadata().isHichchiEntity(User)) {
  console.log("User is a registered entity");
}
```

##### setMetadata()

```ts
setMetadata(
   target,
   propertyKey,
   value): void;
```

Defined in: [libs/nest-core/src/metadata/metadata-storage.ts:290](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/metadata/metadata-storage.ts#L290)

Store custom metadata for a class

This method allows storing arbitrary metadata for any class.
The metadata is stored with a property key for later retrieval.

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

`target`

</td>
<td>

`Type`

</td>
<td>

The class to store metadata for

</td>
</tr>
<tr>
<td>

`propertyKey`

</td>
<td>

`string`

</td>
<td>

The key to identify this metadata

</td>
</tr>
<tr>
<td>

`value`

</td>
<td>

`unknown`

</td>
<td>

The metadata value to store

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### Example

```typescript
// Store custom metadata
hichchiMetadata().setMetadata(User, "isSearchable", true);
hichchiMetadata().setMetadata(User, "searchFields", ["name", "email"]);
```

---

### ImplementationException

Defined in: [libs/nest-core/src/exceptions/implementation.exception.ts:31](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/exceptions/implementation.exception.ts#L31)

Exception for reporting implementation-related errors with structured details

This exception is designed for situations where there's an issue with how
a component is implemented or used. It provides a structured way to report
errors with a heading, message, and optional detailed description, making
it easier to understand and debug implementation problems.

The exception formats the error stack trace in a more readable way, with
clear separation between the heading, message, and description.

#### Examples

```typescript
// Basic usage with heading and message
throw new ImplementationException(
  "Database Connection Error",
  "Failed to connect to the database",
);
```

```typescript
// Usage with heading, message, and detailed description
throw new ImplementationException(
  "Configuration Error",
  "Invalid Redis configuration",
  "The Redis host or URL must be provided when registering the CacheModule",
);
```

#### Extends

- `Error`

#### Constructors

##### Constructor

```ts
new ImplementationException(
   heading,
   message,
   description?): ImplementationException;
```

Defined in: [libs/nest-core/src/exceptions/implementation.exception.ts:39](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/exceptions/implementation.exception.ts#L39)

Creates a new ImplementationException

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

`heading`

</td>
<td>

`string`

</td>
<td>

A short title or category for the error

</td>
</tr>
<tr>
<td>

`message`

</td>
<td>

`string`

</td>
<td>

The main error message describing what went wrong

</td>
</tr>
<tr>
<td>

`description?`

</td>
<td>

`string`

</td>
<td>

Optional detailed description providing more context or troubleshooting information

</td>
</tr>
</tbody>
</table>

###### Returns

[`ImplementationException`](#implementationexception)

###### Overrides

```ts
Error.constructor;
```

#### Methods

##### captureStackTrace()

```ts
static captureStackTrace(targetObject, constructorOpt?): void;
```

Defined in: node_modules/@types/node/globals.d.ts:146

Creates a `.stack` property on `targetObject`, which when accessed returns
a string representing the location in the code at which
`Error.captureStackTrace()` was called.

```js
const myObject = {};
Error.captureStackTrace(myObject);
myObject.stack; // Similar to `new Error().stack`
```

The first line of the trace will be prefixed with
`${myObject.name}: ${myObject.message}`.

The optional `constructorOpt` argument accepts a function. If given, all frames
above `constructorOpt`, including `constructorOpt`, will be omitted from the
generated stack trace.

The `constructorOpt` argument is useful for hiding implementation
details of error generation from the user. For instance:

```js
function a() {
  b();
}

function b() {
  c();
}

function c() {
  // Create an error without stack trace to avoid calculating the stack trace twice.
  const { stackTraceLimit } = Error;
  Error.stackTraceLimit = 0;
  const error = new Error();
  Error.stackTraceLimit = stackTraceLimit;

  // Capture the stack trace above function b
  Error.captureStackTrace(error, b); // Neither function c, nor b is included in the stack trace
  throw error;
}

a();
```

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

`targetObject`

</td>
<td>

`object`

</td>
</tr>
<tr>
<td>

`constructorOpt?`

</td>
<td>

`Function`

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### Inherited from

```ts
Error.captureStackTrace;
```

##### prepareStackTrace()

```ts
static prepareStackTrace(err, stackTraces): any;
```

Defined in: node_modules/@types/node/globals.d.ts:150

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

`Error`

</td>
</tr>
<tr>
<td>

`stackTraces`

</td>
<td>

`CallSite`\[]

</td>
</tr>
</tbody>
</table>

###### Returns

`any`

###### See

https://v8.dev/docs/stack-trace-api#customizing-stack-traces

###### Inherited from

```ts
Error.prepareStackTrace;
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

<a id="property-cause"></a> `cause?`

</td>
<td>

`public`

</td>
<td>

`unknown`

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

<a id="property-description"></a> `description?`

</td>
<td>

`public`

</td>
<td>

`string`

</td>
<td>

Optional detailed description providing more context or troubleshooting information

</td>
<td>

‐

</td>
<td>

[libs/nest-core/src/exceptions/implementation.exception.ts:42](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/exceptions/implementation.exception.ts#L42)

</td>
</tr>
<tr>
<td>

<a id="property-heading"></a> `heading`

</td>
<td>

`public`

</td>
<td>

`string`

</td>
<td>

A short title or category for the error

</td>
<td>

‐

</td>
<td>

[libs/nest-core/src/exceptions/implementation.exception.ts:40](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/exceptions/implementation.exception.ts#L40)

</td>
</tr>
<tr>
<td>

<a id="property-message"></a> `message`

</td>
<td>

`public`

</td>
<td>

`string`

</td>
<td>

The main error message describing what went wrong

</td>
<td>

```ts
Error.message;
```

</td>
<td>

[libs/nest-core/src/exceptions/implementation.exception.ts:41](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/exceptions/implementation.exception.ts#L41)

</td>
</tr>
<tr>
<td>

<a id="property-name"></a> `name`

</td>
<td>

`public`

</td>
<td>

`string`

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

`public`

</td>
<td>

`string`

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

<a id="property-stacktracelimit"></a> `stackTraceLimit`

</td>
<td>

`static`

</td>
<td>

`number`

</td>
<td>

The `Error.stackTraceLimit` property specifies the number of stack frames
collected by a stack trace (whether generated by `new Error().stack` or
`Error.captureStackTrace(obj)`).

The default value is `10` but may be set to any valid JavaScript number. Changes
will affect any stack trace captured _after_ the value has been changed.

If set to a non-number value, or set to a negative number, stack traces will
not capture any frames.

</td>
<td>

```ts
Error.stackTraceLimit;
```

</td>
<td>

node_modules/@types/node/globals.d.ts:162

</td>
</tr>
</tbody>
</table>

---

### JsonArrayFileTransport

Defined in: [libs/nest-core/src/logger/transports/json-array-file-transport.ts:95](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/logger/transports/json-array-file-transport.ts#L95)

Winston transport that writes logs to a JSON array file

This transport writes log entries to a file as a JSON array. Each log entry
is added as a new element in the array. The file is read and written on each
log operation, making it suitable for low-volume logging scenarios.

Features:

- Stores logs in a structured JSON array format
- Creates the logs directory if it doesn't exist
- Ensures the log file always contains a valid JSON array
- Supports filtering by log level
- Supports custom formatting

#### Example

```typescript
// Create a Winston logger with the JSON array transport
const logger = createLogger({
  transports: [
    new JsonArrayFileTransport({
      filename: "errors.json",
      logLevel: LogLevel.ERROR,
    }),
  ],
});

// Log an error that will be written to the JSON array file
logger.error("Database connection failed", {
  attempt: 3,
  reason: "Connection timeout",
});
```

#### See

- JsonArrayFileTransportOptions Configuration options for this transport
- Transport Base Winston transport class
- [LoggerService](#loggerservice) Service that uses this transport

#### Extends

- `TransportStream`

#### Constructors

##### Constructor

```ts
new JsonArrayFileTransport(options): JsonArrayFileTransport;
```

Defined in: [libs/nest-core/src/logger/transports/json-array-file-transport.ts:131](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/logger/transports/json-array-file-transport.ts#L131)

Creates a new JsonArrayFileTransport instance

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

`JsonArrayFileTransportOptions`

</td>
<td>

Configuration options for the transport

</td>
</tr>
</tbody>
</table>

###### Returns

[`JsonArrayFileTransport`](#jsonarrayfiletransport)

###### Example

```typescript
// Create a transport for error logs
const errorTransport = new JsonArrayFileTransport({
  filename: "errors.json",
  logsDir: "./logs",
  logLevel: LogLevel.ERROR,
});
```

###### See

JsonArrayFileTransportOptions Available configuration options

###### Overrides

```ts
Transport.constructor;
```

#### Methods

##### \_construct()?

```ts
optional _construct(callback): void;
```

Defined in: node_modules/@types/node/stream.d.ts:802

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

`callback`

</td>
<td>

(`error?`) => `void`

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### Inherited from

```ts
Transport._construct;
```

##### \_destroy()

```ts
_destroy(error, callback): void;
```

Defined in: node_modules/@types/node/stream.d.ts:803

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

`error`

</td>
<td>

`Error` | `null`

</td>
</tr>
<tr>
<td>

`callback`

</td>
<td>

(`error?`) => `void`

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### Inherited from

```ts
Transport._destroy;
```

##### \_final()

```ts
_final(callback): void;
```

Defined in: node_modules/@types/node/stream.d.ts:804

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

`callback`

</td>
<td>

(`error?`) => `void`

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### Inherited from

```ts
Transport._final;
```

##### \_write()

```ts
_write(
   chunk,
   encoding,
   callback): void;
```

Defined in: node_modules/@types/node/stream.d.ts:794

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

`chunk`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`encoding`

</td>
<td>

`BufferEncoding`

</td>
</tr>
<tr>
<td>

`callback`

</td>
<td>

(`error?`) => `void`

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### Inherited from

```ts
Transport._write;
```

##### \_writev()?

```ts
optional _writev(chunks, callback): void;
```

Defined in: node_modules/@types/node/stream.d.ts:795

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

`chunks`

</td>
<td>

`object`\[]

</td>
</tr>
<tr>
<td>

`callback`

</td>
<td>

(`error?`) => `void`

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### Inherited from

```ts
Transport._writev;
```

##### \[captureRejectionSymbol]\()?

```ts
optional [captureRejectionSymbol]<K>(
   error,
   event, ...
   args): void;
```

Defined in: node_modules/@types/node/events.d.ts:136

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

`K`

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

`error`

</td>
<td>

`Error`

</td>
</tr>
<tr>
<td>

`event`

</td>
<td>

`string` | `symbol`

</td>
</tr>
<tr>
<td>

...`args`

</td>
<td>

`AnyRest`

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### Inherited from

```ts
Transport.[captureRejectionSymbol]
```

##### addListener()

###### Call Signature

```ts
addListener(event, listener): this;
```

Defined in: node_modules/@types/node/stream.d.ts:970

Event emitter
The defined events on documents including:

1. close
2. drain
3. error
4. finish
5. pipe
6. unpipe

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

`event`

</td>
<td>

`"close"`

</td>
</tr>
<tr>
<td>

`listener`

</td>
<td>

() => `void`

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

###### Inherited from

```ts
Transport.addListener;
```

###### Call Signature

```ts
addListener(event, listener): this;
```

Defined in: node_modules/@types/node/stream.d.ts:971

Event emitter
The defined events on documents including:

1. close
2. drain
3. error
4. finish
5. pipe
6. unpipe

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

`event`

</td>
<td>

`"drain"`

</td>
</tr>
<tr>
<td>

`listener`

</td>
<td>

() => `void`

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

###### Inherited from

```ts
Transport.addListener;
```

###### Call Signature

```ts
addListener(event, listener): this;
```

Defined in: node_modules/@types/node/stream.d.ts:972

Event emitter
The defined events on documents including:

1. close
2. drain
3. error
4. finish
5. pipe
6. unpipe

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

`event`

</td>
<td>

`"error"`

</td>
</tr>
<tr>
<td>

`listener`

</td>
<td>

(`err`) => `void`

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

###### Inherited from

```ts
Transport.addListener;
```

###### Call Signature

```ts
addListener(event, listener): this;
```

Defined in: node_modules/@types/node/stream.d.ts:973

Event emitter
The defined events on documents including:

1. close
2. drain
3. error
4. finish
5. pipe
6. unpipe

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

`event`

</td>
<td>

`"finish"`

</td>
</tr>
<tr>
<td>

`listener`

</td>
<td>

() => `void`

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

###### Inherited from

```ts
Transport.addListener;
```

###### Call Signature

```ts
addListener(event, listener): this;
```

Defined in: node_modules/@types/node/stream.d.ts:974

Event emitter
The defined events on documents including:

1. close
2. drain
3. error
4. finish
5. pipe
6. unpipe

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

`event`

</td>
<td>

`"pipe"`

</td>
</tr>
<tr>
<td>

`listener`

</td>
<td>

(`src`) => `void`

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

###### Inherited from

```ts
Transport.addListener;
```

###### Call Signature

```ts
addListener(event, listener): this;
```

Defined in: node_modules/@types/node/stream.d.ts:975

Event emitter
The defined events on documents including:

1. close
2. drain
3. error
4. finish
5. pipe
6. unpipe

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

`event`

</td>
<td>

`"unpipe"`

</td>
</tr>
<tr>
<td>

`listener`

</td>
<td>

(`src`) => `void`

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

###### Inherited from

```ts
Transport.addListener;
```

###### Call Signature

```ts
addListener(event, listener): this;
```

Defined in: node_modules/@types/node/stream.d.ts:976

Event emitter
The defined events on documents including:

1. close
2. drain
3. error
4. finish
5. pipe
6. unpipe

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

`event`

</td>
<td>

`string` | `symbol`

</td>
</tr>
<tr>
<td>

`listener`

</td>
<td>

(...`args`) => `void`

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

###### Inherited from

```ts
Transport.addListener;
```

##### close()?

```ts
optional close(): void;
```

Defined in: node_modules/winston-transport/index.d.ts:22

###### Returns

`void`

###### Inherited from

```ts
Transport.close;
```

##### compose()

```ts
compose<T>(stream, options?): T;
```

Defined in: node_modules/@types/node/stream.d.ts:35

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

`T` _extends_ `ReadableStream`

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

`stream`

</td>
<td>

| `ComposeFnParam` | `T` | `Iterable`<`T`, `any`, `any`> | `AsyncIterable`<`T`, `any`, `any`>

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

{ `signal`: `AbortSignal`; }

</td>
</tr>
<tr>
<td>

`options.signal?`

</td>
<td>

`AbortSignal`

</td>
</tr>
</tbody>
</table>

###### Returns

`T`

###### Inherited from

```ts
Transport.compose;
```

##### cork()

```ts
cork(): void;
```

Defined in: node_modules/@types/node/stream.d.ts:908

The `writable.cork()` method forces all written data to be buffered in memory.
The buffered data will be flushed when either the [uncork](#uncork) or [end](#end) methods are called.

The primary intent of `writable.cork()` is to accommodate a situation in which
several small chunks are written to the stream in rapid succession. Instead of
immediately forwarding them to the underlying destination, `writable.cork()` buffers all the chunks until `writable.uncork()` is called, which will pass them
all to `writable._writev()`, if present. This prevents a head-of-line blocking
situation where data is being buffered while waiting for the first small chunk
to be processed. However, use of `writable.cork()` without implementing `writable._writev()` may have an adverse effect on throughput.

See also: `writable.uncork()`, `writable._writev()`.

###### Returns

`void`

###### Since

v0.11.2

###### Inherited from

```ts
Transport.cork;
```

##### destroy()

```ts
destroy(error?): this;
```

Defined in: node_modules/@types/node/stream.d.ts:959

Destroy the stream. Optionally emit an `'error'` event, and emit a `'close'` event (unless `emitClose` is set to `false`). After this call, the writable
stream has ended and subsequent calls to `write()` or `end()` will result in
an `ERR_STREAM_DESTROYED` error.
This is a destructive and immediate way to destroy a stream. Previous calls to `write()` may not have drained, and may trigger an `ERR_STREAM_DESTROYED` error.
Use `end()` instead of destroy if data should flush before close, or wait for
the `'drain'` event before destroying the stream.

Once `destroy()` has been called any further calls will be a no-op and no
further errors except from `_destroy()` may be emitted as `'error'`.

Implementors should not override this method,
but instead implement `writable._destroy()`.

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

`error?`

</td>
<td>

`Error`

</td>
<td>

Optional, an error to emit with `'error'` event.

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

###### Since

v8.0.0

###### Inherited from

```ts
Transport.destroy;
```

##### emit()

###### Call Signature

```ts
emit(event): boolean;
```

Defined in: node_modules/@types/node/stream.d.ts:977

Synchronously calls each of the listeners registered for the event named `eventName`, in the order they were registered, passing the supplied arguments
to each.

Returns `true` if the event had listeners, `false` otherwise.

```js
import { EventEmitter } from "node:events";
const myEmitter = new EventEmitter();

// First listener
myEmitter.on("event", function firstListener() {
  console.log("Helloooo! first listener");
});
// Second listener
myEmitter.on("event", function secondListener(arg1, arg2) {
  console.log(`event with parameters ${arg1}, ${arg2} in second listener`);
});
// Third listener
myEmitter.on("event", function thirdListener(...args) {
  const parameters = args.join(", ");
  console.log(`event with parameters ${parameters} in third listener`);
});

console.log(myEmitter.listeners("event"));

myEmitter.emit("event", 1, 2, 3, 4, 5);

// Prints:
// [
//   [Function: firstListener],
//   [Function: secondListener],
//   [Function: thirdListener]
// ]
// Helloooo! first listener
// event with parameters 1, 2 in second listener
// event with parameters 1, 2, 3, 4, 5 in third listener
```

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

`event`

</td>
<td>

`"close"`

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean`

###### Since

v0.1.26

###### Inherited from

```ts
Transport.emit;
```

###### Call Signature

```ts
emit(event): boolean;
```

Defined in: node_modules/@types/node/stream.d.ts:978

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

`event`

</td>
<td>

`"drain"`

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean`

###### Inherited from

```ts
Transport.emit;
```

###### Call Signature

```ts
emit(event, err): boolean;
```

Defined in: node_modules/@types/node/stream.d.ts:979

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

`event`

</td>
<td>

`"error"`

</td>
</tr>
<tr>
<td>

`err`

</td>
<td>

`Error`

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean`

###### Inherited from

```ts
Transport.emit;
```

###### Call Signature

```ts
emit(event): boolean;
```

Defined in: node_modules/@types/node/stream.d.ts:980

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

`event`

</td>
<td>

`"finish"`

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean`

###### Inherited from

```ts
Transport.emit;
```

###### Call Signature

```ts
emit(event, src): boolean;
```

Defined in: node_modules/@types/node/stream.d.ts:981

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

`event`

</td>
<td>

`"pipe"`

</td>
</tr>
<tr>
<td>

`src`

</td>
<td>

`Readable`

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean`

###### Inherited from

```ts
Transport.emit;
```

###### Call Signature

```ts
emit(event, src): boolean;
```

Defined in: node_modules/@types/node/stream.d.ts:982

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

`event`

</td>
<td>

`"unpipe"`

</td>
</tr>
<tr>
<td>

`src`

</td>
<td>

`Readable`

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean`

###### Inherited from

```ts
Transport.emit;
```

###### Call Signature

```ts
emit(event, ...args): boolean;
```

Defined in: node_modules/@types/node/stream.d.ts:983

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

`event`

</td>
<td>

`string` | `symbol`

</td>
</tr>
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

`boolean`

###### Inherited from

```ts
Transport.emit;
```

##### end()

###### Call Signature

```ts
end(cb?): this;
```

Defined in: node_modules/@types/node/stream.d.ts:891

Calling the `writable.end()` method signals that no more data will be written
to the `Writable`. The optional `chunk` and `encoding` arguments allow one
final additional chunk of data to be written immediately before closing the
stream.

Calling the [write](#write) method after calling [end](#end) will raise an error.

```js
// Write 'hello, ' and then end with 'world!'.
import fs from "node:fs";
const file = fs.createWriteStream("example.txt");
file.write("hello, ");
file.end("world!");
// Writing more now is not allowed!
```

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

`cb?`

</td>
<td>

() => `void`

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

###### Since

v0.9.4

###### Inherited from

```ts
Transport.end;
```

###### Call Signature

```ts
end(chunk, cb?): this;
```

Defined in: node_modules/@types/node/stream.d.ts:892

Calling the `writable.end()` method signals that no more data will be written
to the `Writable`. The optional `chunk` and `encoding` arguments allow one
final additional chunk of data to be written immediately before closing the
stream.

Calling the [write](#write) method after calling [end](#end) will raise an error.

```js
// Write 'hello, ' and then end with 'world!'.
import fs from "node:fs";
const file = fs.createWriteStream("example.txt");
file.write("hello, ");
file.end("world!");
// Writing more now is not allowed!
```

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

`chunk`

</td>
<td>

`any`

</td>
<td>

Optional data to write. For streams not operating in object mode, `chunk` must be a {string}, {Buffer},
{TypedArray} or {DataView}. For object mode streams, `chunk` may be any JavaScript value other than `null`.

</td>
</tr>
<tr>
<td>

`cb?`

</td>
<td>

() => `void`

</td>
<td>

‐

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

###### Since

v0.9.4

###### Inherited from

```ts
Transport.end;
```

###### Call Signature

```ts
end(
   chunk,
   encoding,
   cb?): this;
```

Defined in: node_modules/@types/node/stream.d.ts:893

Calling the `writable.end()` method signals that no more data will be written
to the `Writable`. The optional `chunk` and `encoding` arguments allow one
final additional chunk of data to be written immediately before closing the
stream.

Calling the [write](#write) method after calling [end](#end) will raise an error.

```js
// Write 'hello, ' and then end with 'world!'.
import fs from "node:fs";
const file = fs.createWriteStream("example.txt");
file.write("hello, ");
file.end("world!");
// Writing more now is not allowed!
```

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

`chunk`

</td>
<td>

`any`

</td>
<td>

Optional data to write. For streams not operating in object mode, `chunk` must be a {string}, {Buffer},
{TypedArray} or {DataView}. For object mode streams, `chunk` may be any JavaScript value other than `null`.

</td>
</tr>
<tr>
<td>

`encoding`

</td>
<td>

`BufferEncoding`

</td>
<td>

The encoding if `chunk` is a string

</td>
</tr>
<tr>
<td>

`cb?`

</td>
<td>

() => `void`

</td>
<td>

‐

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

###### Since

v0.9.4

###### Inherited from

```ts
Transport.end;
```

##### eventNames()

```ts
eventNames(): (string | symbol)[];
```

Defined in: node_modules/@types/node/events.d.ts:921

Returns an array listing the events for which the emitter has registered
listeners. The values in the array are strings or `Symbol`s.

```js
import { EventEmitter } from "node:events";

const myEE = new EventEmitter();
myEE.on("foo", () => {});
myEE.on("bar", () => {});

const sym = Symbol("symbol");
myEE.on(sym, () => {});

console.log(myEE.eventNames());
// Prints: [ 'foo', 'bar', Symbol(symbol) ]
```

###### Returns

(`string` | `symbol`)\[]

###### Since

v6.0.0

###### Inherited from

```ts
Transport.eventNames;
```

##### getMaxListeners()

```ts
getMaxListeners(): number;
```

Defined in: node_modules/@types/node/events.d.ts:773

Returns the current max listener value for the `EventEmitter` which is either
set by `emitter.setMaxListeners(n)` or defaults to [EventEmitter.defaultMaxListeners](#property-defaultmaxlisteners).

###### Returns

`number`

###### Since

v1.0.0

###### Inherited from

```ts
Transport.getMaxListeners;
```

##### listenerCount()

```ts
listenerCount<K>(eventName, listener?): number;
```

Defined in: node_modules/@types/node/events.d.ts:867

Returns the number of listeners listening for the event named `eventName`.
If `listener` is provided, it will return how many times the listener is found
in the list of the listeners of the event.

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

`K`

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

`eventName`

</td>
<td>

`string` | `symbol`

</td>
<td>

The name of the event being listened for

</td>
</tr>
<tr>
<td>

`listener?`

</td>
<td>

`Function`

</td>
<td>

The event handler function

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Since

v3.2.0

###### Inherited from

```ts
Transport.listenerCount;
```

##### listeners()

```ts
listeners<K>(eventName): Function[];
```

Defined in: node_modules/@types/node/events.d.ts:786

Returns a copy of the array of listeners for the event named `eventName`.

```js
server.on("connection", (stream) => {
  console.log("someone connected!");
});
console.log(util.inspect(server.listeners("connection")));
// Prints: [ [Function] ]
```

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

`K`

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

`eventName`

</td>
<td>

`string` | `symbol`

</td>
</tr>
</tbody>
</table>

###### Returns

`Function`\[]

###### Since

v0.1.26

###### Inherited from

```ts
Transport.listeners;
```

##### log()

```ts
log(info, callback): void;
```

Defined in: [libs/nest-core/src/logger/transports/json-array-file-transport.ts:184](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/logger/transports/json-array-file-transport.ts#L184)

Process a log entry and write it to the JSON array file

This method is called by Winston when a log message needs to be processed.
It checks if the log level meets the minimum threshold, applies any custom
formatting, and then appends the log entry to the JSON array file.

The method:

1. Checks if the log level meets the minimum threshold
2. Applies any custom formatting to the log entry
3. Reads the current content of the log file
4. Parses it as a JSON array
5. Adds the new log entry to the array
6. Writes the updated array back to the file

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

`info`

</td>
<td>

`TransformableInfo` & [`InfoObject`](#infoobject)

</td>
<td>

The log information to process

</td>
</tr>
<tr>
<td>

`callback`

</td>
<td>

() => `void`

</td>
<td>

Function to call when processing is complete

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### See

- TransformableInfo Winston interface for log information
- [InfoObject](#infoobject) Interface for metadata attached to log entries

###### Overrides

```ts
Transport.log;
```

##### logv()?

```ts
optional logv(info, next): any;
```

Defined in: node_modules/winston-transport/index.d.ts:21

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

`info`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`next`

</td>
<td>

() => `void`

</td>
</tr>
</tbody>
</table>

###### Returns

`any`

###### Inherited from

```ts
Transport.logv;
```

##### off()

```ts
off<K>(eventName, listener): this;
```

Defined in: node_modules/@types/node/events.d.ts:746

Alias for `emitter.removeListener()`.

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

`K`

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

`eventName`

</td>
<td>

`string` | `symbol`

</td>
</tr>
<tr>
<td>

`listener`

</td>
<td>

(...`args`) => `void`

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

###### Since

v10.0.0

###### Inherited from

```ts
Transport.off;
```

##### on()

###### Call Signature

```ts
on(event, listener): this;
```

Defined in: node_modules/@types/node/stream.d.ts:984

Adds the `listener` function to the end of the listeners array for the event
named `eventName`. No checks are made to see if the `listener` has already
been added. Multiple calls passing the same combination of `eventName` and
`listener` will result in the `listener` being added, and called, multiple times.

```js
server.on("connection", (stream) => {
  console.log("someone connected!");
});
```

Returns a reference to the `EventEmitter`, so that calls can be chained.

By default, event listeners are invoked in the order they are added. The `emitter.prependListener()` method can be used as an alternative to add the
event listener to the beginning of the listeners array.

```js
import { EventEmitter } from "node:events";
const myEE = new EventEmitter();
myEE.on("foo", () => console.log("a"));
myEE.prependListener("foo", () => console.log("b"));
myEE.emit("foo");
// Prints:
//   b
//   a
```

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

`event`

</td>
<td>

`"close"`

</td>
<td>

‐

</td>
</tr>
<tr>
<td>

`listener`

</td>
<td>

() => `void`

</td>
<td>

The callback function

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

###### Since

v0.1.101

###### Inherited from

```ts
Transport.on;
```

###### Call Signature

```ts
on(event, listener): this;
```

Defined in: node_modules/@types/node/stream.d.ts:985

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

`event`

</td>
<td>

`"drain"`

</td>
</tr>
<tr>
<td>

`listener`

</td>
<td>

() => `void`

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

###### Inherited from

```ts
Transport.on;
```

###### Call Signature

```ts
on(event, listener): this;
```

Defined in: node_modules/@types/node/stream.d.ts:986

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

`event`

</td>
<td>

`"error"`

</td>
</tr>
<tr>
<td>

`listener`

</td>
<td>

(`err`) => `void`

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

###### Inherited from

```ts
Transport.on;
```

###### Call Signature

```ts
on(event, listener): this;
```

Defined in: node_modules/@types/node/stream.d.ts:987

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

`event`

</td>
<td>

`"finish"`

</td>
</tr>
<tr>
<td>

`listener`

</td>
<td>

() => `void`

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

###### Inherited from

```ts
Transport.on;
```

###### Call Signature

```ts
on(event, listener): this;
```

Defined in: node_modules/@types/node/stream.d.ts:988

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

`event`

</td>
<td>

`"pipe"`

</td>
</tr>
<tr>
<td>

`listener`

</td>
<td>

(`src`) => `void`

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

###### Inherited from

```ts
Transport.on;
```

###### Call Signature

```ts
on(event, listener): this;
```

Defined in: node_modules/@types/node/stream.d.ts:989

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

`event`

</td>
<td>

`"unpipe"`

</td>
</tr>
<tr>
<td>

`listener`

</td>
<td>

(`src`) => `void`

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

###### Inherited from

```ts
Transport.on;
```

###### Call Signature

```ts
on(event, listener): this;
```

Defined in: node_modules/@types/node/stream.d.ts:990

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

`event`

</td>
<td>

`string` | `symbol`

</td>
</tr>
<tr>
<td>

`listener`

</td>
<td>

(...`args`) => `void`

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

###### Inherited from

```ts
Transport.on;
```

##### once()

###### Call Signature

```ts
once(event, listener): this;
```

Defined in: node_modules/@types/node/stream.d.ts:991

Adds a **one-time** `listener` function for the event named `eventName`. The
next time `eventName` is triggered, this listener is removed and then invoked.

```js
server.once("connection", (stream) => {
  console.log("Ah, we have our first user!");
});
```

Returns a reference to the `EventEmitter`, so that calls can be chained.

By default, event listeners are invoked in the order they are added. The `emitter.prependOnceListener()` method can be used as an alternative to add the
event listener to the beginning of the listeners array.

```js
import { EventEmitter } from "node:events";
const myEE = new EventEmitter();
myEE.once("foo", () => console.log("a"));
myEE.prependOnceListener("foo", () => console.log("b"));
myEE.emit("foo");
// Prints:
//   b
//   a
```

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

`event`

</td>
<td>

`"close"`

</td>
<td>

‐

</td>
</tr>
<tr>
<td>

`listener`

</td>
<td>

() => `void`

</td>
<td>

The callback function

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

###### Since

v0.3.0

###### Inherited from

```ts
Transport.once;
```

###### Call Signature

```ts
once(event, listener): this;
```

Defined in: node_modules/@types/node/stream.d.ts:992

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

`event`

</td>
<td>

`"drain"`

</td>
</tr>
<tr>
<td>

`listener`

</td>
<td>

() => `void`

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

###### Inherited from

```ts
Transport.once;
```

###### Call Signature

```ts
once(event, listener): this;
```

Defined in: node_modules/@types/node/stream.d.ts:993

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

`event`

</td>
<td>

`"error"`

</td>
</tr>
<tr>
<td>

`listener`

</td>
<td>

(`err`) => `void`

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

###### Inherited from

```ts
Transport.once;
```

###### Call Signature

```ts
once(event, listener): this;
```

Defined in: node_modules/@types/node/stream.d.ts:994

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

`event`

</td>
<td>

`"finish"`

</td>
</tr>
<tr>
<td>

`listener`

</td>
<td>

() => `void`

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

###### Inherited from

```ts
Transport.once;
```

###### Call Signature

```ts
once(event, listener): this;
```

Defined in: node_modules/@types/node/stream.d.ts:995

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

`event`

</td>
<td>

`"pipe"`

</td>
</tr>
<tr>
<td>

`listener`

</td>
<td>

(`src`) => `void`

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

###### Inherited from

```ts
Transport.once;
```

###### Call Signature

```ts
once(event, listener): this;
```

Defined in: node_modules/@types/node/stream.d.ts:996

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

`event`

</td>
<td>

`"unpipe"`

</td>
</tr>
<tr>
<td>

`listener`

</td>
<td>

(`src`) => `void`

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

###### Inherited from

```ts
Transport.once;
```

###### Call Signature

```ts
once(event, listener): this;
```

Defined in: node_modules/@types/node/stream.d.ts:997

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

`event`

</td>
<td>

`string` | `symbol`

</td>
</tr>
<tr>
<td>

`listener`

</td>
<td>

(...`args`) => `void`

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

###### Inherited from

```ts
Transport.once;
```

##### pipe()

```ts
pipe<T>(destination, options?): T;
```

Defined in: node_modules/@types/node/stream.d.ts:29

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

`T` _extends_ `WritableStream`

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

`destination`

</td>
<td>

`T`

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

{ `end?`: `boolean`; }

</td>
</tr>
<tr>
<td>

`options.end?`

</td>
<td>

`boolean`

</td>
</tr>
</tbody>
</table>

###### Returns

`T`

###### Inherited from

```ts
Transport.pipe;
```

##### prependListener()

###### Call Signature

```ts
prependListener(event, listener): this;
```

Defined in: node_modules/@types/node/stream.d.ts:998

Adds the `listener` function to the _beginning_ of the listeners array for the
event named `eventName`. No checks are made to see if the `listener` has
already been added. Multiple calls passing the same combination of `eventName`
and `listener` will result in the `listener` being added, and called, multiple times.

```js
server.prependListener("connection", (stream) => {
  console.log("someone connected!");
});
```

Returns a reference to the `EventEmitter`, so that calls can be chained.

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

`event`

</td>
<td>

`"close"`

</td>
<td>

‐

</td>
</tr>
<tr>
<td>

`listener`

</td>
<td>

() => `void`

</td>
<td>

The callback function

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

###### Since

v6.0.0

###### Inherited from

```ts
Transport.prependListener;
```

###### Call Signature

```ts
prependListener(event, listener): this;
```

Defined in: node_modules/@types/node/stream.d.ts:999

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

`event`

</td>
<td>

`"drain"`

</td>
</tr>
<tr>
<td>

`listener`

</td>
<td>

() => `void`

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

###### Inherited from

```ts
Transport.prependListener;
```

###### Call Signature

```ts
prependListener(event, listener): this;
```

Defined in: node_modules/@types/node/stream.d.ts:1000

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

`event`

</td>
<td>

`"error"`

</td>
</tr>
<tr>
<td>

`listener`

</td>
<td>

(`err`) => `void`

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

###### Inherited from

```ts
Transport.prependListener;
```

###### Call Signature

```ts
prependListener(event, listener): this;
```

Defined in: node_modules/@types/node/stream.d.ts:1001

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

`event`

</td>
<td>

`"finish"`

</td>
</tr>
<tr>
<td>

`listener`

</td>
<td>

() => `void`

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

###### Inherited from

```ts
Transport.prependListener;
```

###### Call Signature

```ts
prependListener(event, listener): this;
```

Defined in: node_modules/@types/node/stream.d.ts:1002

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

`event`

</td>
<td>

`"pipe"`

</td>
</tr>
<tr>
<td>

`listener`

</td>
<td>

(`src`) => `void`

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

###### Inherited from

```ts
Transport.prependListener;
```

###### Call Signature

```ts
prependListener(event, listener): this;
```

Defined in: node_modules/@types/node/stream.d.ts:1003

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

`event`

</td>
<td>

`"unpipe"`

</td>
</tr>
<tr>
<td>

`listener`

</td>
<td>

(`src`) => `void`

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

###### Inherited from

```ts
Transport.prependListener;
```

###### Call Signature

```ts
prependListener(event, listener): this;
```

Defined in: node_modules/@types/node/stream.d.ts:1004

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

`event`

</td>
<td>

`string` | `symbol`

</td>
</tr>
<tr>
<td>

`listener`

</td>
<td>

(...`args`) => `void`

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

###### Inherited from

```ts
Transport.prependListener;
```

##### prependOnceListener()

###### Call Signature

```ts
prependOnceListener(event, listener): this;
```

Defined in: node_modules/@types/node/stream.d.ts:1005

Adds a **one-time**`listener` function for the event named `eventName` to the _beginning_ of the listeners array. The next time `eventName` is triggered, this
listener is removed, and then invoked.

```js
server.prependOnceListener("connection", (stream) => {
  console.log("Ah, we have our first user!");
});
```

Returns a reference to the `EventEmitter`, so that calls can be chained.

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

`event`

</td>
<td>

`"close"`

</td>
<td>

‐

</td>
</tr>
<tr>
<td>

`listener`

</td>
<td>

() => `void`

</td>
<td>

The callback function

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

###### Since

v6.0.0

###### Inherited from

```ts
Transport.prependOnceListener;
```

###### Call Signature

```ts
prependOnceListener(event, listener): this;
```

Defined in: node_modules/@types/node/stream.d.ts:1006

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

`event`

</td>
<td>

`"drain"`

</td>
</tr>
<tr>
<td>

`listener`

</td>
<td>

() => `void`

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

###### Inherited from

```ts
Transport.prependOnceListener;
```

###### Call Signature

```ts
prependOnceListener(event, listener): this;
```

Defined in: node_modules/@types/node/stream.d.ts:1007

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

`event`

</td>
<td>

`"error"`

</td>
</tr>
<tr>
<td>

`listener`

</td>
<td>

(`err`) => `void`

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

###### Inherited from

```ts
Transport.prependOnceListener;
```

###### Call Signature

```ts
prependOnceListener(event, listener): this;
```

Defined in: node_modules/@types/node/stream.d.ts:1008

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

`event`

</td>
<td>

`"finish"`

</td>
</tr>
<tr>
<td>

`listener`

</td>
<td>

() => `void`

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

###### Inherited from

```ts
Transport.prependOnceListener;
```

###### Call Signature

```ts
prependOnceListener(event, listener): this;
```

Defined in: node_modules/@types/node/stream.d.ts:1009

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

`event`

</td>
<td>

`"pipe"`

</td>
</tr>
<tr>
<td>

`listener`

</td>
<td>

(`src`) => `void`

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

###### Inherited from

```ts
Transport.prependOnceListener;
```

###### Call Signature

```ts
prependOnceListener(event, listener): this;
```

Defined in: node_modules/@types/node/stream.d.ts:1010

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

`event`

</td>
<td>

`"unpipe"`

</td>
</tr>
<tr>
<td>

`listener`

</td>
<td>

(`src`) => `void`

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

###### Inherited from

```ts
Transport.prependOnceListener;
```

###### Call Signature

```ts
prependOnceListener(event, listener): this;
```

Defined in: node_modules/@types/node/stream.d.ts:1011

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

`event`

</td>
<td>

`string` | `symbol`

</td>
</tr>
<tr>
<td>

`listener`

</td>
<td>

(...`args`) => `void`

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

###### Inherited from

```ts
Transport.prependOnceListener;
```

##### rawListeners()

```ts
rawListeners<K>(eventName): Function[];
```

Defined in: node_modules/@types/node/events.d.ts:817

Returns a copy of the array of listeners for the event named `eventName`,
including any wrappers (such as those created by `.once()`).

```js
import { EventEmitter } from "node:events";
const emitter = new EventEmitter();
emitter.once("log", () => console.log("log once"));

// Returns a new Array with a function `onceWrapper` which has a property
// `listener` which contains the original listener bound above
const listeners = emitter.rawListeners("log");
const logFnWrapper = listeners[0];

// Logs "log once" to the console and does not unbind the `once` event
logFnWrapper.listener();

// Logs "log once" to the console and removes the listener
logFnWrapper();

emitter.on("log", () => console.log("log persistently"));
// Will return a new Array with a single function bound by `.on()` above
const newListeners = emitter.rawListeners("log");

// Logs "log persistently" twice
newListeners[0]();
emitter.emit("log");
```

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

`K`

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

`eventName`

</td>
<td>

`string` | `symbol`

</td>
</tr>
</tbody>
</table>

###### Returns

`Function`\[]

###### Since

v9.4.0

###### Inherited from

```ts
Transport.rawListeners;
```

##### removeAllListeners()

```ts
removeAllListeners(eventName?): this;
```

Defined in: node_modules/@types/node/events.d.ts:757

Removes all listeners, or those of the specified `eventName`.

It is bad practice to remove listeners added elsewhere in the code,
particularly when the `EventEmitter` instance was created by some other
component or module (e.g. sockets or file streams).

Returns a reference to the `EventEmitter`, so that calls can be chained.

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

`eventName?`

</td>
<td>

`string` | `symbol`

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

###### Since

v0.1.26

###### Inherited from

```ts
Transport.removeAllListeners;
```

##### removeListener()

###### Call Signature

```ts
removeListener(event, listener): this;
```

Defined in: node_modules/@types/node/stream.d.ts:1012

Removes the specified `listener` from the listener array for the event named `eventName`.

```js
const callback = (stream) => {
  console.log("someone connected!");
};
server.on("connection", callback);
// ...
server.removeListener("connection", callback);
```

`removeListener()` will remove, at most, one instance of a listener from the
listener array. If any single listener has been added multiple times to the
listener array for the specified `eventName`, then `removeListener()` must be
called multiple times to remove each instance.

Once an event is emitted, all listeners attached to it at the
time of emitting are called in order. This implies that any `removeListener()` or `removeAllListeners()` calls _after_ emitting and _before_ the last listener finishes execution
will not remove them from`emit()` in progress. Subsequent events behave as expected.

```js
import { EventEmitter } from "node:events";
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();

const callbackA = () => {
  console.log("A");
  myEmitter.removeListener("event", callbackB);
};

const callbackB = () => {
  console.log("B");
};

myEmitter.on("event", callbackA);

myEmitter.on("event", callbackB);

// callbackA removes listener callbackB but it will still be called.
// Internal listener array at time of emit [callbackA, callbackB]
myEmitter.emit("event");
// Prints:
//   A
//   B

// callbackB is now removed.
// Internal listener array [callbackA]
myEmitter.emit("event");
// Prints:
//   A
```

Because listeners are managed using an internal array, calling this will
change the position indices of any listener registered _after_ the listener
being removed. This will not impact the order in which listeners are called,
but it means that any copies of the listener array as returned by
the `emitter.listeners()` method will need to be recreated.

When a single function has been added as a handler multiple times for a single
event (as in the example below), `removeListener()` will remove the most
recently added instance. In the example the `once('ping')` listener is removed:

```js
import { EventEmitter } from "node:events";
const ee = new EventEmitter();

function pong() {
  console.log("pong");
}

ee.on("ping", pong);
ee.once("ping", pong);
ee.removeListener("ping", pong);

ee.emit("ping");
ee.emit("ping");
```

Returns a reference to the `EventEmitter`, so that calls can be chained.

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

`event`

</td>
<td>

`"close"`

</td>
</tr>
<tr>
<td>

`listener`

</td>
<td>

() => `void`

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

###### Since

v0.1.26

###### Inherited from

```ts
Transport.removeListener;
```

###### Call Signature

```ts
removeListener(event, listener): this;
```

Defined in: node_modules/@types/node/stream.d.ts:1013

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

`event`

</td>
<td>

`"drain"`

</td>
</tr>
<tr>
<td>

`listener`

</td>
<td>

() => `void`

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

###### Inherited from

```ts
Transport.removeListener;
```

###### Call Signature

```ts
removeListener(event, listener): this;
```

Defined in: node_modules/@types/node/stream.d.ts:1014

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

`event`

</td>
<td>

`"error"`

</td>
</tr>
<tr>
<td>

`listener`

</td>
<td>

(`err`) => `void`

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

###### Inherited from

```ts
Transport.removeListener;
```

###### Call Signature

```ts
removeListener(event, listener): this;
```

Defined in: node_modules/@types/node/stream.d.ts:1015

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

`event`

</td>
<td>

`"finish"`

</td>
</tr>
<tr>
<td>

`listener`

</td>
<td>

() => `void`

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

###### Inherited from

```ts
Transport.removeListener;
```

###### Call Signature

```ts
removeListener(event, listener): this;
```

Defined in: node_modules/@types/node/stream.d.ts:1016

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

`event`

</td>
<td>

`"pipe"`

</td>
</tr>
<tr>
<td>

`listener`

</td>
<td>

(`src`) => `void`

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

###### Inherited from

```ts
Transport.removeListener;
```

###### Call Signature

```ts
removeListener(event, listener): this;
```

Defined in: node_modules/@types/node/stream.d.ts:1017

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

`event`

</td>
<td>

`"unpipe"`

</td>
</tr>
<tr>
<td>

`listener`

</td>
<td>

(`src`) => `void`

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

###### Inherited from

```ts
Transport.removeListener;
```

###### Call Signature

```ts
removeListener(event, listener): this;
```

Defined in: node_modules/@types/node/stream.d.ts:1018

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

`event`

</td>
<td>

`string` | `symbol`

</td>
</tr>
<tr>
<td>

`listener`

</td>
<td>

(...`args`) => `void`

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

###### Inherited from

```ts
Transport.removeListener;
```

##### setDefaultEncoding()

```ts
setDefaultEncoding(encoding): this;
```

Defined in: node_modules/@types/node/stream.d.ts:868

The `writable.setDefaultEncoding()` method sets the default `encoding` for a `Writable` stream.

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

`encoding`

</td>
<td>

`BufferEncoding`

</td>
<td>

The new default encoding

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

###### Since

v0.11.15

###### Inherited from

```ts
Transport.setDefaultEncoding;
```

##### setMaxListeners()

```ts
setMaxListeners(n): this;
```

Defined in: node_modules/@types/node/events.d.ts:767

By default `EventEmitter`s will print a warning if more than `10` listeners are
added for a particular event. This is a useful default that helps finding
memory leaks. The `emitter.setMaxListeners()` method allows the limit to be
modified for this specific `EventEmitter` instance. The value can be set to `Infinity` (or `0`) to indicate an unlimited number of listeners.

Returns a reference to the `EventEmitter`, so that calls can be chained.

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

`n`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

###### Since

v0.3.5

###### Inherited from

```ts
Transport.setMaxListeners;
```

##### uncork()

```ts
uncork(): void;
```

Defined in: node_modules/@types/node/stream.d.ts:942

The `writable.uncork()` method flushes all data buffered since [cork](#cork) was called.

When using `writable.cork()` and `writable.uncork()` to manage the buffering
of writes to a stream, defer calls to `writable.uncork()` using `process.nextTick()`. Doing so allows batching of all `writable.write()` calls that occur within a given Node.js event
loop phase.

```js
stream.cork();
stream.write("some ");
stream.write("data ");
process.nextTick(() => stream.uncork());
```

If the `writable.cork()` method is called multiple times on a stream, the
same number of calls to `writable.uncork()` must be called to flush the buffered
data.

```js
stream.cork();
stream.write("some ");
stream.cork();
stream.write("data ");
process.nextTick(() => {
  stream.uncork();
  // The data will not be flushed until uncork() is called a second time.
  stream.uncork();
});
```

See also: `writable.cork()`.

###### Returns

`void`

###### Since

v0.11.2

###### Inherited from

```ts
Transport.uncork;
```

##### write()

###### Call Signature

```ts
write(chunk, callback?): boolean;
```

Defined in: node_modules/@types/node/stream.d.ts:861

The `writable.write()` method writes some data to the stream, and calls the
supplied `callback` once the data has been fully handled. If an error
occurs, the `callback` will be called with the error as its
first argument. The `callback` is called asynchronously and before `'error'` is
emitted.

The return value is `true` if the internal buffer is less than the `highWaterMark` configured when the stream was created after admitting `chunk`.
If `false` is returned, further attempts to write data to the stream should
stop until the `'drain'` event is emitted.

While a stream is not draining, calls to `write()` will buffer `chunk`, and
return false. Once all currently buffered chunks are drained (accepted for
delivery by the operating system), the `'drain'` event will be emitted.
Once `write()` returns false, do not write more chunks
until the `'drain'` event is emitted. While calling `write()` on a stream that
is not draining is allowed, Node.js will buffer all written chunks until
maximum memory usage occurs, at which point it will abort unconditionally.
Even before it aborts, high memory usage will cause poor garbage collector
performance and high RSS (which is not typically released back to the system,
even after the memory is no longer required). Since TCP sockets may never
drain if the remote peer does not read the data, writing a socket that is
not draining may lead to a remotely exploitable vulnerability.

Writing data while the stream is not draining is particularly
problematic for a `Transform`, because the `Transform` streams are paused
by default until they are piped or a `'data'` or `'readable'` event handler
is added.

If the data to be written can be generated or fetched on demand, it is
recommended to encapsulate the logic into a `Readable` and use [pipe](#pipe). However, if calling `write()` is preferred, it is
possible to respect backpressure and avoid memory issues using the `'drain'` event:

```js
function write(data, cb) {
  if (!stream.write(data)) {
    stream.once("drain", cb);
  } else {
    process.nextTick(cb);
  }
}

// Wait for cb to be called before doing any other write.
write("hello", () => {
  console.log("Write completed, do more writes now.");
});
```

A `Writable` stream in object mode will always ignore the `encoding` argument.

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

`chunk`

</td>
<td>

`any`

</td>
<td>

Optional data to write. For streams not operating in object mode, `chunk` must be a {string}, {Buffer},
{TypedArray} or {DataView}. For object mode streams, `chunk` may be any JavaScript value other than `null`.

</td>
</tr>
<tr>
<td>

`callback?`

</td>
<td>

(`error`) => `void`

</td>
<td>

Callback for when this chunk of data is flushed.

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean`

`false` if the stream wishes for the calling code to wait for the `'drain'` event to be emitted before continuing to write additional data; otherwise `true`.

###### Since

v0.9.4

###### Inherited from

```ts
Transport.write;
```

###### Call Signature

```ts
write(
   chunk,
   encoding,
   callback?): boolean;
```

Defined in: node_modules/@types/node/stream.d.ts:862

The `writable.write()` method writes some data to the stream, and calls the
supplied `callback` once the data has been fully handled. If an error
occurs, the `callback` will be called with the error as its
first argument. The `callback` is called asynchronously and before `'error'` is
emitted.

The return value is `true` if the internal buffer is less than the `highWaterMark` configured when the stream was created after admitting `chunk`.
If `false` is returned, further attempts to write data to the stream should
stop until the `'drain'` event is emitted.

While a stream is not draining, calls to `write()` will buffer `chunk`, and
return false. Once all currently buffered chunks are drained (accepted for
delivery by the operating system), the `'drain'` event will be emitted.
Once `write()` returns false, do not write more chunks
until the `'drain'` event is emitted. While calling `write()` on a stream that
is not draining is allowed, Node.js will buffer all written chunks until
maximum memory usage occurs, at which point it will abort unconditionally.
Even before it aborts, high memory usage will cause poor garbage collector
performance and high RSS (which is not typically released back to the system,
even after the memory is no longer required). Since TCP sockets may never
drain if the remote peer does not read the data, writing a socket that is
not draining may lead to a remotely exploitable vulnerability.

Writing data while the stream is not draining is particularly
problematic for a `Transform`, because the `Transform` streams are paused
by default until they are piped or a `'data'` or `'readable'` event handler
is added.

If the data to be written can be generated or fetched on demand, it is
recommended to encapsulate the logic into a `Readable` and use [pipe](#pipe). However, if calling `write()` is preferred, it is
possible to respect backpressure and avoid memory issues using the `'drain'` event:

```js
function write(data, cb) {
  if (!stream.write(data)) {
    stream.once("drain", cb);
  } else {
    process.nextTick(cb);
  }
}

// Wait for cb to be called before doing any other write.
write("hello", () => {
  console.log("Write completed, do more writes now.");
});
```

A `Writable` stream in object mode will always ignore the `encoding` argument.

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

`chunk`

</td>
<td>

`any`

</td>
<td>

Optional data to write. For streams not operating in object mode, `chunk` must be a {string}, {Buffer},
{TypedArray} or {DataView}. For object mode streams, `chunk` may be any JavaScript value other than `null`.

</td>
</tr>
<tr>
<td>

`encoding`

</td>
<td>

`BufferEncoding`

</td>
<td>

The encoding, if `chunk` is a string.

</td>
</tr>
<tr>
<td>

`callback?`

</td>
<td>

(`error`) => `void`

</td>
<td>

Callback for when this chunk of data is flushed.

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean`

`false` if the stream wishes for the calling code to wait for the `'drain'` event to be emitted before continuing to write additional data; otherwise `true`.

###### Since

v0.9.4

###### Inherited from

```ts
Transport.write;
```

##### addAbortListener()

```ts
static addAbortListener(signal, resource): Disposable;
```

Defined in: node_modules/@types/node/events.d.ts:436

Listens once to the `abort` event on the provided `signal`.

Listening to the `abort` event on abort signals is unsafe and may
lead to resource leaks since another third party with the signal can
call `e.stopImmediatePropagation()`. Unfortunately Node.js cannot change
this since it would violate the web standard. Additionally, the original
API makes it easy to forget to remove listeners.

This API allows safely using `AbortSignal`s in Node.js APIs by solving these
two issues by listening to the event such that `stopImmediatePropagation` does
not prevent the listener from running.

Returns a disposable so that it may be unsubscribed from more easily.

```js
import { addAbortListener } from "node:events";

function example(signal) {
  let disposable;
  try {
    signal.addEventListener("abort", (e) => e.stopImmediatePropagation());
    disposable = addAbortListener(signal, (e) => {
      // Do something when signal is aborted.
    });
  } finally {
    disposable?.[Symbol.dispose]();
  }
}
```

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

`signal`

</td>
<td>

`AbortSignal`

</td>
</tr>
<tr>
<td>

`resource`

</td>
<td>

(`event`) => `void`

</td>
</tr>
</tbody>
</table>

###### Returns

`Disposable`

Disposable that removes the `abort` listener.

###### Since

v20.5.0

###### Inherited from

```ts
Transport.addAbortListener;
```

##### fromWeb()

```ts
static fromWeb(writableStream, options?): Writable;
```

Defined in: node_modules/@types/node/stream.d.ts:719

A utility method for creating a `Writable` from a web `WritableStream`.

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

`writableStream`

</td>
<td>

`WritableStream`

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

`Pick`<`WritableOptions`<`Writable`>, `"signal"` | `"decodeStrings"` | `"highWaterMark"` | `"objectMode"`>

</td>
</tr>
</tbody>
</table>

###### Returns

`Writable`

###### Since

v17.0.0

###### Inherited from

```ts
Transport.fromWeb;
```

##### getEventListeners()

```ts
static getEventListeners(emitter, name): Function[];
```

Defined in: node_modules/@types/node/events.d.ts:358

Returns a copy of the array of listeners for the event named `eventName`.

For `EventEmitter`s this behaves exactly the same as calling `.listeners` on
the emitter.

For `EventTarget`s this is the only way to get the event listeners for the
event target. This is useful for debugging and diagnostic purposes.

```js
import { getEventListeners, EventEmitter } from "node:events";

{
  const ee = new EventEmitter();
  const listener = () => console.log("Events are fun");
  ee.on("foo", listener);
  console.log(getEventListeners(ee, "foo")); // [ [Function: listener] ]
}
{
  const et = new EventTarget();
  const listener = () => console.log("Events are fun");
  et.addEventListener("foo", listener);
  console.log(getEventListeners(et, "foo")); // [ [Function: listener] ]
}
```

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

`emitter`

</td>
<td>

`EventEmitter`<`DefaultEventMap`> | `EventTarget`

</td>
</tr>
<tr>
<td>

`name`

</td>
<td>

`string` | `symbol`

</td>
</tr>
</tbody>
</table>

###### Returns

`Function`\[]

###### Since

v15.2.0, v14.17.0

###### Inherited from

```ts
Transport.getEventListeners;
```

##### getMaxListeners()

```ts
static getMaxListeners(emitter): number;
```

Defined in: node_modules/@types/node/events.d.ts:387

Returns the currently set max amount of listeners.

For `EventEmitter`s this behaves exactly the same as calling `.getMaxListeners` on
the emitter.

For `EventTarget`s this is the only way to get the max event listeners for the
event target. If the number of event handlers on a single EventTarget exceeds
the max set, the EventTarget will print a warning.

```js
import { getMaxListeners, setMaxListeners, EventEmitter } from "node:events";

{
  const ee = new EventEmitter();
  console.log(getMaxListeners(ee)); // 10
  setMaxListeners(11, ee);
  console.log(getMaxListeners(ee)); // 11
}
{
  const et = new EventTarget();
  console.log(getMaxListeners(et)); // 10
  setMaxListeners(11, et);
  console.log(getMaxListeners(et)); // 11
}
```

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

`emitter`

</td>
<td>

`EventEmitter`<`DefaultEventMap`> | `EventTarget`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Since

v19.9.0

###### Inherited from

```ts
Transport.getMaxListeners;
```

##### ~~listenerCount()~~

```ts
static listenerCount(emitter, eventName): number;
```

Defined in: node_modules/@types/node/events.d.ts:330

A class method that returns the number of listeners for the given `eventName` registered on the given `emitter`.

```js
import { EventEmitter, listenerCount } from "node:events";

const myEmitter = new EventEmitter();
myEmitter.on("event", () => {});
myEmitter.on("event", () => {});
console.log(listenerCount(myEmitter, "event"));
// Prints: 2
```

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

`emitter`

</td>
<td>

`EventEmitter`

</td>
<td>

The emitter to query

</td>
</tr>
<tr>
<td>

`eventName`

</td>
<td>

`string` | `symbol`

</td>
<td>

The event name

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Since

v0.9.12

###### Deprecated

Since v3.2.0 - Use `listenerCount` instead.

###### Inherited from

```ts
Transport.listenerCount;
```

##### on()

###### Call Signature

```ts
static on(
   emitter,
   eventName,
options?): AsyncIterator<any[]>;
```

Defined in: node_modules/@types/node/events.d.ts:303

```js
import { on, EventEmitter } from "node:events";
import process from "node:process";

const ee = new EventEmitter();

// Emit later on
process.nextTick(() => {
  ee.emit("foo", "bar");
  ee.emit("foo", 42);
});

for await (const event of on(ee, "foo")) {
  // The execution of this inner block is synchronous and it
  // processes one event at a time (even with await). Do not use
  // if concurrent execution is required.
  console.log(event); // prints ['bar'] [42]
}
// Unreachable here
```

Returns an `AsyncIterator` that iterates `eventName` events. It will throw
if the `EventEmitter` emits `'error'`. It removes all listeners when
exiting the loop. The `value` returned by each iteration is an array
composed of the emitted event arguments.

An `AbortSignal` can be used to cancel waiting on events:

```js
import { on, EventEmitter } from "node:events";
import process from "node:process";

const ac = new AbortController();

(async () => {
  const ee = new EventEmitter();

  // Emit later on
  process.nextTick(() => {
    ee.emit("foo", "bar");
    ee.emit("foo", 42);
  });

  for await (const event of on(ee, "foo", { signal: ac.signal })) {
    // The execution of this inner block is synchronous and it
    // processes one event at a time (even with await). Do not use
    // if concurrent execution is required.
    console.log(event); // prints ['bar'] [42]
  }
  // Unreachable here
})();

process.nextTick(() => ac.abort());
```

Use the `close` option to specify an array of event names that will end the iteration:

```js
import { on, EventEmitter } from "node:events";
import process from "node:process";

const ee = new EventEmitter();

// Emit later on
process.nextTick(() => {
  ee.emit("foo", "bar");
  ee.emit("foo", 42);
  ee.emit("close");
});

for await (const event of on(ee, "foo", { close: ["close"] })) {
  console.log(event); // prints ['bar'] [42]
}
// the loop will exit after 'close' is emitted
console.log("done"); // prints 'done'
```

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

`emitter`

</td>
<td>

`EventEmitter`

</td>
</tr>
<tr>
<td>

`eventName`

</td>
<td>

`string` | `symbol`

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

`StaticEventEmitterIteratorOptions`

</td>
</tr>
</tbody>
</table>

###### Returns

`AsyncIterator`<`any`\[]>

An `AsyncIterator` that iterates `eventName` events emitted by the `emitter`

###### Since

v13.6.0, v12.16.0

###### Inherited from

```ts
Transport.on;
```

###### Call Signature

```ts
static on(
   emitter,
   eventName,
options?): AsyncIterator<any[]>;
```

Defined in: node_modules/@types/node/events.d.ts:308

```js
import { on, EventEmitter } from "node:events";
import process from "node:process";

const ee = new EventEmitter();

// Emit later on
process.nextTick(() => {
  ee.emit("foo", "bar");
  ee.emit("foo", 42);
});

for await (const event of on(ee, "foo")) {
  // The execution of this inner block is synchronous and it
  // processes one event at a time (even with await). Do not use
  // if concurrent execution is required.
  console.log(event); // prints ['bar'] [42]
}
// Unreachable here
```

Returns an `AsyncIterator` that iterates `eventName` events. It will throw
if the `EventEmitter` emits `'error'`. It removes all listeners when
exiting the loop. The `value` returned by each iteration is an array
composed of the emitted event arguments.

An `AbortSignal` can be used to cancel waiting on events:

```js
import { on, EventEmitter } from "node:events";
import process from "node:process";

const ac = new AbortController();

(async () => {
  const ee = new EventEmitter();

  // Emit later on
  process.nextTick(() => {
    ee.emit("foo", "bar");
    ee.emit("foo", 42);
  });

  for await (const event of on(ee, "foo", { signal: ac.signal })) {
    // The execution of this inner block is synchronous and it
    // processes one event at a time (even with await). Do not use
    // if concurrent execution is required.
    console.log(event); // prints ['bar'] [42]
  }
  // Unreachable here
})();

process.nextTick(() => ac.abort());
```

Use the `close` option to specify an array of event names that will end the iteration:

```js
import { on, EventEmitter } from "node:events";
import process from "node:process";

const ee = new EventEmitter();

// Emit later on
process.nextTick(() => {
  ee.emit("foo", "bar");
  ee.emit("foo", 42);
  ee.emit("close");
});

for await (const event of on(ee, "foo", { close: ["close"] })) {
  console.log(event); // prints ['bar'] [42]
}
// the loop will exit after 'close' is emitted
console.log("done"); // prints 'done'
```

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

`emitter`

</td>
<td>

`EventTarget`

</td>
</tr>
<tr>
<td>

`eventName`

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

`StaticEventEmitterIteratorOptions`

</td>
</tr>
</tbody>
</table>

###### Returns

`AsyncIterator`<`any`\[]>

An `AsyncIterator` that iterates `eventName` events emitted by the `emitter`

###### Since

v13.6.0, v12.16.0

###### Inherited from

```ts
Transport.on;
```

##### once()

###### Call Signature

```ts
static once(
   emitter,
   eventName,
options?): Promise<any[]>;
```

Defined in: node_modules/@types/node/events.d.ts:217

Creates a `Promise` that is fulfilled when the `EventEmitter` emits the given
event or that is rejected if the `EventEmitter` emits `'error'` while waiting.
The `Promise` will resolve with an array of all the arguments emitted to the
given event.

This method is intentionally generic and works with the web platform [EventTarget](https://dom.spec.whatwg.org/#interface-eventtarget) interface, which has no special`'error'` event
semantics and does not listen to the `'error'` event.

```js
import { once, EventEmitter } from "node:events";
import process from "node:process";

const ee = new EventEmitter();

process.nextTick(() => {
  ee.emit("myevent", 42);
});

const [value] = await once(ee, "myevent");
console.log(value);

const err = new Error("kaboom");
process.nextTick(() => {
  ee.emit("error", err);
});

try {
  await once(ee, "myevent");
} catch (err) {
  console.error("error happened", err);
}
```

The special handling of the `'error'` event is only used when `events.once()` is used to wait for another event. If `events.once()` is used to wait for the
'`error'` event itself, then it is treated as any other kind of event without
special handling:

```js
import { EventEmitter, once } from "node:events";

const ee = new EventEmitter();

once(ee, "error")
  .then(([err]) => console.log("ok", err.message))
  .catch((err) => console.error("error", err.message));

ee.emit("error", new Error("boom"));

// Prints: ok boom
```

An `AbortSignal` can be used to cancel waiting for the event:

```js
import { EventEmitter, once } from "node:events";

const ee = new EventEmitter();
const ac = new AbortController();

async function foo(emitter, event, signal) {
  try {
    await once(emitter, event, { signal });
    console.log("event emitted!");
  } catch (error) {
    if (error.name === "AbortError") {
      console.error("Waiting for the event was canceled!");
    } else {
      console.error("There was an error", error.message);
    }
  }
}

foo(ee, "foo", ac.signal);
ac.abort(); // Abort waiting for the event
ee.emit("foo"); // Prints: Waiting for the event was canceled!
```

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

`emitter`

</td>
<td>

`EventEmitter`

</td>
</tr>
<tr>
<td>

`eventName`

</td>
<td>

`string` | `symbol`

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

`StaticEventEmitterOptions`

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`any`\[]>

###### Since

v11.13.0, v10.16.0

###### Inherited from

```ts
Transport.once;
```

###### Call Signature

```ts
static once(
   emitter,
   eventName,
options?): Promise<any[]>;
```

Defined in: node_modules/@types/node/events.d.ts:222

Creates a `Promise` that is fulfilled when the `EventEmitter` emits the given
event or that is rejected if the `EventEmitter` emits `'error'` while waiting.
The `Promise` will resolve with an array of all the arguments emitted to the
given event.

This method is intentionally generic and works with the web platform [EventTarget](https://dom.spec.whatwg.org/#interface-eventtarget) interface, which has no special`'error'` event
semantics and does not listen to the `'error'` event.

```js
import { once, EventEmitter } from "node:events";
import process from "node:process";

const ee = new EventEmitter();

process.nextTick(() => {
  ee.emit("myevent", 42);
});

const [value] = await once(ee, "myevent");
console.log(value);

const err = new Error("kaboom");
process.nextTick(() => {
  ee.emit("error", err);
});

try {
  await once(ee, "myevent");
} catch (err) {
  console.error("error happened", err);
}
```

The special handling of the `'error'` event is only used when `events.once()` is used to wait for another event. If `events.once()` is used to wait for the
'`error'` event itself, then it is treated as any other kind of event without
special handling:

```js
import { EventEmitter, once } from "node:events";

const ee = new EventEmitter();

once(ee, "error")
  .then(([err]) => console.log("ok", err.message))
  .catch((err) => console.error("error", err.message));

ee.emit("error", new Error("boom"));

// Prints: ok boom
```

An `AbortSignal` can be used to cancel waiting for the event:

```js
import { EventEmitter, once } from "node:events";

const ee = new EventEmitter();
const ac = new AbortController();

async function foo(emitter, event, signal) {
  try {
    await once(emitter, event, { signal });
    console.log("event emitted!");
  } catch (error) {
    if (error.name === "AbortError") {
      console.error("Waiting for the event was canceled!");
    } else {
      console.error("There was an error", error.message);
    }
  }
}

foo(ee, "foo", ac.signal);
ac.abort(); // Abort waiting for the event
ee.emit("foo"); // Prints: Waiting for the event was canceled!
```

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

`emitter`

</td>
<td>

`EventTarget`

</td>
</tr>
<tr>
<td>

`eventName`

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

`StaticEventEmitterOptions`

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`any`\[]>

###### Since

v11.13.0, v10.16.0

###### Inherited from

```ts
Transport.once;
```

##### setMaxListeners()

```ts
static setMaxListeners(n?, ...eventTargets): void;
```

Defined in: node_modules/@types/node/events.d.ts:402

```js
import { setMaxListeners, EventEmitter } from "node:events";

const target = new EventTarget();
const emitter = new EventEmitter();

setMaxListeners(5, target, emitter);
```

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

`n?`

</td>
<td>

`number`

</td>
<td>

A non-negative number. The maximum number of listeners per `EventTarget` event.

</td>
</tr>
<tr>
<td>

...`eventTargets?`

</td>
<td>

(`EventEmitter`<`DefaultEventMap`> | `EventTarget`)\[]

</td>
<td>

Zero or more {EventTarget} or {EventEmitter} instances. If none are specified, `n` is set as the default max for all newly created {EventTarget} and {EventEmitter}
objects.

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### Since

v15.4.0

###### Inherited from

```ts
Transport.setMaxListeners;
```

##### toWeb()

```ts
static toWeb(streamWritable): WritableStream;
```

Defined in: node_modules/@types/node/stream.d.ts:727

A utility method for creating a web `WritableStream` from a `Writable`.

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

`streamWritable`

</td>
<td>

`Writable`

</td>
</tr>
</tbody>
</table>

###### Returns

`WritableStream`

###### Since

v17.0.0

###### Inherited from

```ts
Transport.toWeb;
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

<a id="property-closed"></a> `closed`

</td>
<td>

`readonly`

</td>
<td>

`boolean`

</td>
<td>

Is `true` after `'close'` has been emitted.

**Since**

v18.0.0

</td>
<td>

```ts
Transport.closed;
```

</td>
<td>

node_modules/@types/node/stream.d.ts:782

</td>
</tr>
<tr>
<td>

<a id="property-destroyed"></a> `destroyed`

</td>
<td>

`public`

</td>
<td>

`boolean`

</td>
<td>

Is `true` after `writable.destroy()` has been called.

**Since**

v8.0.0

</td>
<td>

```ts
Transport.destroyed;
```

</td>
<td>

node_modules/@types/node/stream.d.ts:777

</td>
</tr>
<tr>
<td>

<a id="property-errored"></a> `errored`

</td>
<td>

`readonly`

</td>
<td>

`Error` | `null`

</td>
<td>

Returns error if the stream has been destroyed with an error.

**Since**

v18.0.0

</td>
<td>

```ts
Transport.errored;
```

</td>
<td>

node_modules/@types/node/stream.d.ts:787

</td>
</tr>
<tr>
<td>

<a id="property-format"></a> `format?`

</td>
<td>

`public`

</td>
<td>

`Format`

</td>
<td>

‐

</td>
<td>

```ts
Transport.format;
```

</td>
<td>

node_modules/winston-transport/index.d.ts:12

</td>
</tr>
<tr>
<td>

<a id="property-handleexceptions"></a> `handleExceptions?`

</td>
<td>

`public`

</td>
<td>

`boolean`

</td>
<td>

‐

</td>
<td>

```ts
Transport.handleExceptions;
```

</td>
<td>

node_modules/winston-transport/index.d.ts:15

</td>
</tr>
<tr>
<td>

<a id="property-handlerejections"></a> `handleRejections?`

</td>
<td>

`public`

</td>
<td>

`boolean`

</td>
<td>

‐

</td>
<td>

```ts
Transport.handleRejections;
```

</td>
<td>

node_modules/winston-transport/index.d.ts:16

</td>
</tr>
<tr>
<td>

<a id="property-level"></a> `level?`

</td>
<td>

`public`

</td>
<td>

`string`

</td>
<td>

‐

</td>
<td>

```ts
Transport.level;
```

</td>
<td>

node_modules/winston-transport/index.d.ts:13

</td>
</tr>
<tr>
<td>

<a id="property-silent"></a> `silent?`

</td>
<td>

`public`

</td>
<td>

`boolean`

</td>
<td>

‐

</td>
<td>

```ts
Transport.silent;
```

</td>
<td>

node_modules/winston-transport/index.d.ts:14

</td>
</tr>
<tr>
<td>

<a id="property-writable"></a> `writable`

</td>
<td>

`readonly`

</td>
<td>

`boolean`

</td>
<td>

Is `true` if it is safe to call `writable.write()`, which means
the stream has not been destroyed, errored, or ended.

**Since**

v11.4.0

</td>
<td>

```ts
Transport.writable;
```

</td>
<td>

node_modules/@types/node/stream.d.ts:733

</td>
</tr>
<tr>
<td>

<a id="property-writableaborted"></a> `writableAborted`

</td>
<td>

`readonly`

</td>
<td>

`boolean`

</td>
<td>

Returns whether the stream was destroyed or errored before emitting `'finish'`.

**Since**

v18.0.0, v16.17.0

</td>
<td>

```ts
Transport.writableAborted;
```

</td>
<td>

node_modules/@types/node/stream.d.ts:738

</td>
</tr>
<tr>
<td>

<a id="property-writablecorked"></a> `writableCorked`

</td>
<td>

`readonly`

</td>
<td>

`number`

</td>
<td>

Number of times `writable.uncork()` needs to be
called in order to fully uncork the stream.

**Since**

v13.2.0, v12.16.0

</td>
<td>

```ts
Transport.writableCorked;
```

</td>
<td>

node_modules/@types/node/stream.d.ts:772

</td>
</tr>
<tr>
<td>

<a id="property-writableended"></a> `writableEnded`

</td>
<td>

`readonly`

</td>
<td>

`boolean`

</td>
<td>

Is `true` after `writable.end()` has been called. This property
does not indicate whether the data has been flushed, for this use `writable.writableFinished` instead.

**Since**

v12.9.0

</td>
<td>

```ts
Transport.writableEnded;
```

</td>
<td>

node_modules/@types/node/stream.d.ts:744

</td>
</tr>
<tr>
<td>

<a id="property-writablefinished"></a> `writableFinished`

</td>
<td>

`readonly`

</td>
<td>

`boolean`

</td>
<td>

Is set to `true` immediately before the `'finish'` event is emitted.

**Since**

v12.6.0

</td>
<td>

```ts
Transport.writableFinished;
```

</td>
<td>

node_modules/@types/node/stream.d.ts:749

</td>
</tr>
<tr>
<td>

<a id="property-writablehighwatermark"></a> `writableHighWaterMark`

</td>
<td>

`readonly`

</td>
<td>

`number`

</td>
<td>

Return the value of `highWaterMark` passed when creating this `Writable`.

**Since**

v9.3.0

</td>
<td>

```ts
Transport.writableHighWaterMark;
```

</td>
<td>

node_modules/@types/node/stream.d.ts:754

</td>
</tr>
<tr>
<td>

<a id="property-writablelength"></a> `writableLength`

</td>
<td>

`readonly`

</td>
<td>

`number`

</td>
<td>

This property contains the number of bytes (or objects) in the queue
ready to be written. The value provides introspection data regarding
the status of the `highWaterMark`.

**Since**

v9.4.0

</td>
<td>

```ts
Transport.writableLength;
```

</td>
<td>

node_modules/@types/node/stream.d.ts:761

</td>
</tr>
<tr>
<td>

<a id="property-writableneeddrain"></a> `writableNeedDrain`

</td>
<td>

`readonly`

</td>
<td>

`boolean`

</td>
<td>

Is `true` if the stream's buffer has been full and stream will emit `'drain'`.

**Since**

v15.2.0, v14.17.0

</td>
<td>

```ts
Transport.writableNeedDrain;
```

</td>
<td>

node_modules/@types/node/stream.d.ts:792

</td>
</tr>
<tr>
<td>

<a id="property-writableobjectmode"></a> `writableObjectMode`

</td>
<td>

`readonly`

</td>
<td>

`boolean`

</td>
<td>

Getter for the property `objectMode` of a given `Writable` stream.

**Since**

v12.3.0

</td>
<td>

```ts
Transport.writableObjectMode;
```

</td>
<td>

node_modules/@types/node/stream.d.ts:766

</td>
</tr>
<tr>
<td>

<a id="property-capturerejections"></a> `captureRejections`

</td>
<td>

`static`

</td>
<td>

`boolean`

</td>
<td>

Value: [boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type)

Change the default `captureRejections` option on all new `EventEmitter` objects.

**Since**

v13.4.0, v12.16.0

</td>
<td>

```ts
Transport.captureRejections;
```

</td>
<td>

node_modules/@types/node/events.d.ts:458

</td>
</tr>
<tr>
<td>

<a id="property-capturerejectionsymbol"></a> `captureRejectionSymbol`

</td>
<td>

`readonly`

</td>
<td>

_typeof_ [`captureRejectionSymbol`](#property-capturerejectionsymbol)

</td>
<td>

Value: `Symbol.for('nodejs.rejection')`

See how to write a custom `rejection handler`.

**Since**

v13.4.0, v12.16.0

</td>
<td>

```ts
Transport.captureRejectionSymbol;
```

</td>
<td>

node_modules/@types/node/events.d.ts:451

</td>
</tr>
<tr>
<td>

<a id="property-defaultmaxlisteners"></a> `defaultMaxListeners`

</td>
<td>

`static`

</td>
<td>

`number`

</td>
<td>

By default, a maximum of `10` listeners can be registered for any single
event. This limit can be changed for individual `EventEmitter` instances
using the `emitter.setMaxListeners(n)` method. To change the default
for _all_`EventEmitter` instances, the `events.defaultMaxListeners` property
can be used. If this value is not a positive number, a `RangeError` is thrown.

Take caution when setting the `events.defaultMaxListeners` because the
change affects _all_ `EventEmitter` instances, including those created before
the change is made. However, calling `emitter.setMaxListeners(n)` still has
precedence over `events.defaultMaxListeners`.

This is not a hard limit. The `EventEmitter` instance will allow
more listeners to be added but will output a trace warning to stderr indicating
that a "possible EventEmitter memory leak" has been detected. For any single
`EventEmitter`, the `emitter.getMaxListeners()` and `emitter.setMaxListeners()` methods can be used to
temporarily avoid this warning:

```js
import { EventEmitter } from "node:events";
const emitter = new EventEmitter();
emitter.setMaxListeners(emitter.getMaxListeners() + 1);
emitter.once("event", () => {
  // do stuff
  emitter.setMaxListeners(Math.max(emitter.getMaxListeners() - 1, 0));
});
```

The `--trace-warnings` command-line flag can be used to display the
stack trace for such warnings.

The emitted warning can be inspected with `process.on('warning')` and will
have the additional `emitter`, `type`, and `count` properties, referring to
the event emitter instance, the event's name and the number of attached
listeners, respectively.
Its `name` property is set to `'MaxListenersExceededWarning'`.

**Since**

v0.11.2

</td>
<td>

```ts
Transport.defaultMaxListeners;
```

</td>
<td>

node_modules/@types/node/events.d.ts:497

</td>
</tr>
<tr>
<td>

<a id="property-errormonitor"></a> `errorMonitor`

</td>
<td>

`readonly`

</td>
<td>

_typeof_ [`errorMonitor`](#property-errormonitor)

</td>
<td>

This symbol shall be used to install a listener for only monitoring `'error'` events. Listeners installed using this symbol are called before the regular `'error'` listeners are called.

Installing a listener using this symbol does not change the behavior once an `'error'` event is emitted. Therefore, the process will still crash if no
regular `'error'` listener is installed.

**Since**

v13.6.0, v12.17.0

</td>
<td>

```ts
Transport.errorMonitor;
```

</td>
<td>

node_modules/@types/node/events.d.ts:444

</td>
</tr>
</tbody>
</table>

---

### JsonBodyMiddleware

Defined in: [libs/nest-core/src/middlewares/json-body-parser.middleware.ts:53](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/middlewares/json-body-parser.middleware.ts#L53)

Middleware for parsing JSON request bodies

This middleware uses the body-parser's json function to parse JSON request bodies
and make them available in the request.body property. It's a simple wrapper around
the body-parser middleware that makes it compatible with NestJS's middleware system.

When applied to a route or globally, this middleware will automatically parse
incoming request bodies with Content-Type: application/json and populate the
request.body object with the parsed JSON data.

#### Examples

```typescript
// Apply globally in your AppModule
@Module({
  // ...
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JsonBodyMiddleware).forRoutes("*");
  }
}
```

```typescript
// Apply to specific routes
@Module({
  // ...
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JsonBodyMiddleware)
      .forRoutes(
        { path: "users", method: RequestMethod.POST },
        { path: "users", method: RequestMethod.PUT },
      );
  }
}
```

#### See

<https://github.com/expressjs/body-parser#bodyparserjsonoptions> body-parser json documentation

#### Implements

- `NestMiddleware`

#### Constructors

##### Constructor

```ts
new JsonBodyMiddleware(): JsonBodyMiddleware;
```

###### Returns

[`JsonBodyMiddleware`](#jsonbodymiddleware)

#### Methods

##### use()

```ts
use(
   req,
   res,
   next): void;
```

Defined in: [libs/nest-core/src/middlewares/json-body-parser.middleware.ts:69](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/middlewares/json-body-parser.middleware.ts#L69)

Applies the JSON body parser middleware to the request

This method is called by NestJS for each request that matches the routes
where this middleware is applied. It invokes the body-parser's json middleware
with default options to parse the request body.

After this middleware processes a request, the parsed JSON data will be
available in the request.body property for subsequent handlers.

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

`IncomingMessage`

</td>
<td>

The incoming HTTP request

</td>
</tr>
<tr>
<td>

`res`

</td>
<td>

`ServerResponse`

</td>
<td>

The outgoing HTTP response

</td>
</tr>
<tr>
<td>

`next`

</td>
<td>

`NextFunction`

</td>
<td>

Function to call the next middleware in the chain

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### Implementation of

```ts
NestMiddleware.use;
```

---

### LoggerService

Defined in: [libs/nest-core/src/logger/services/logger.service.ts:61](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/logger/services/logger.service.ts#L61)

Advanced logger service for NestJS applications

This service provides enhanced logging capabilities beyond the standard NestJS logger.
It implements the NestJS LoggerService interface and adds additional features:

- Winston integration for powerful logging
- File-based logging for errors
- Colorized console output
- Context-aware logging
- Metadata support
- Static logging methods
- Configurable formatting

The service can be used both as an instance (injected into components)
and statically (for use in non-injectable contexts).

#### Examples

```typescript
// Using as an injectable service
@Injectable()
export class UserService {
  constructor(private logger: LoggerService) {
    this.logger.log("UserService initialized");
  }

  findUser(id: string) {
    this.logger.debug(`Finding user with ID: ${id}`, "UserService.findUser");
    // ...
  }
}
```

```typescript
// Using static methods
LoggerService.info("Application starting");
LoggerService.error(
  new Error("Something went wrong"),
  { userId: "123" },
  "AuthService",
);
```

#### See

- NestLoggerService The NestJS interface this service implements
- [LoggerOptions](#loggeroptions) Configuration options for this service
- [LogParam](#logparam) Types of parameters that can be logged

#### Implements

- `LoggerService`

#### Constructors

##### Constructor

```ts
new LoggerService(context?): LoggerService;
```

Defined in: [libs/nest-core/src/logger/services/logger.service.ts:103](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/logger/services/logger.service.ts#L103)

Creates a new logger service instance

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

`context?`

</td>
<td>

`string`

</td>
<td>

Optional context name for this logger instance.
The context will be displayed in square brackets in log messages.

</td>
</tr>
</tbody>
</table>

###### Returns

[`LoggerService`](#loggerservice)

###### Example

```typescript
// Create a logger with a specific context
const logger = new LoggerService("UserService");
logger.log("User created"); // Will show [UserService] in the log
```

#### Methods

##### addTransport()

```ts
addTransport(transport): void;
```

Defined in: [libs/nest-core/src/logger/services/logger.service.ts:1138](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/logger/services/logger.service.ts#L1138)

Add a custom transport to the logger

This method adds a custom Winston transport to this logger instance.
Transports define where log messages are sent (console, file, external service, etc.).

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

`transport`

</td>
<td>

`TransportStream`

</td>
<td>

Winston transport to add

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### Example

```typescript
// Create a logger
const logger = new LoggerService("AppService");

// Add a custom file transport
logger.addTransport(
  new winston.transports.File({
    filename: "app-service.log",
    level: "info",
  }),
);
```

###### See

[LoggerService.addTransport](#addtransport-1) Static version of this method

##### configure()

```ts
configure(options?): void;
```

Defined in: [libs/nest-core/src/logger/services/logger.service.ts:108](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/logger/services/logger.service.ts#L108)

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

[`LoggerOptions`](#loggeroptions)

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

##### debug()?

```ts
optional debug(message, context): void;
```

Defined in: [libs/nest-core/src/logger/services/logger.service.ts:537](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/logger/services/logger.service.ts#L537)

Write a 'debug' level log

This method logs a message at the 'debug' level, which is typically
used for debugging information that is useful during development.

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

`message`

</td>
<td>

`unknown`

</td>
<td>

The message to log

</td>
</tr>
<tr>
<td>

`context`

</td>
<td>

`string`

</td>
<td>

The context (category) of the message

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### Example

```typescript
// Create a logger with context
const logger = new LoggerService("UserService");

// Simple debug log
logger.debug("Processing request");

// With additional context
logger.debug("User data retrieved", "DataFetcher");

// With metadata and context
logger.debug(
  "Request details",
  { method: "GET", path: "/users" },
  "RequestHandler",
);
```

###### See

- LogLevel Type defining log levels
- [LoggerService.debug](#debug-1) Static version of this method

###### Implementation of

```ts
NestLoggerService.debug;
```

##### error()

###### Call Signature

```ts
error(message, context): void;
```

Defined in: [libs/nest-core/src/logger/services/logger.service.ts:785](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/logger/services/logger.service.ts#L785)

Write an 'error' level log

This method logs a message at the 'error' level, which is typically
used for error events that might still allow the application to continue running.
Error logs are also written to a separate error log file.

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

`message`

</td>
<td>

`unknown`

</td>
<td>

The message or Error object to log

</td>
</tr>
<tr>
<td>

`context`

</td>
<td>

`string`

</td>
<td>

The context (category) of the message

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### Example

```typescript
// Create a logger with context
const logger = new LoggerService("DatabaseService");

// Simple error log
logger.error("Failed to connect to database");

// With Error object
try {
  // Some code that might throw
} catch (error) {
  logger.error(error, "QueryExecutor");
}

// With metadata and context
logger.error(
  "Authentication failed",
  { userId: "123", reason: "Invalid credentials" },
  "Authenticator",
);
```

###### See

- LogLevel Type defining log levels
- [LoggerService.error](#error-1) Static version of this method

###### Implementation of

```ts
NestLoggerService.error;
```

###### Call Signature

```ts
error(message, ...optionalParams): void;
```

Defined in: [libs/nest-core/src/logger/services/logger.service.ts:793](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/logger/services/logger.service.ts#L793)

Write an 'error' level log

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

`message`

</td>
<td>

`unknown`

</td>
<td>

The message or Error object to log

</td>
</tr>
<tr>
<td>

...`optionalParams`

</td>
<td>

`unknown`\[]

</td>
<td>

Optional parameters including metadata and context

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### Implementation of

```ts
NestLoggerService.error;
```

##### fatal()?

###### Call Signature

```ts
optional fatal(message, context): void;
```

Defined in: [libs/nest-core/src/logger/services/logger.service.ts:974](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/logger/services/logger.service.ts#L974)

Write a 'fatal' level log (maps to 'error' in Winston)

This method logs a message at the 'fatal' level, which is typically
used for severe error events that may cause the application to terminate.
In Winston, this maps to the 'error' level but is displayed with a different color.

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

`message`

</td>
<td>

`unknown`

</td>
<td>

The message or Error object to log

</td>
</tr>
<tr>
<td>

`context`

</td>
<td>

`string`

</td>
<td>

The context (category) of the message

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### Example

```typescript
// Create a logger with context
const logger = new LoggerService("SystemService");

// Simple fatal log
logger.fatal("Unrecoverable system error");

// With Error object
try {
  // Some critical operation
} catch (error) {
  logger.fatal(error, "CriticalOperation");
  process.exit(1);
}

// With metadata and context
logger.fatal(
  "Critical resource unavailable",
  { resource: "database", attempts: 5 },
  "ResourceManager",
);
```

###### See

- LogLevel Type defining log levels
- [LoggerService.fatal](#fatal-1) Static version of this method

###### Implementation of

```ts
NestLoggerService.fatal;
```

###### Call Signature

```ts
optional fatal(message, ...optionalParams): void;
```

Defined in: [libs/nest-core/src/logger/services/logger.service.ts:982](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/logger/services/logger.service.ts#L982)

Write a 'fatal' level log (maps to 'error' in Winston)

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

`message`

</td>
<td>

`unknown`

</td>
<td>

The message or Error object to log

</td>
</tr>
<tr>
<td>

...`optionalParams`

</td>
<td>

`unknown`\[]

</td>
<td>

Optional parameters including metadata and context

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### Implementation of

```ts
NestLoggerService.fatal;
```

##### info()

###### Call Signature

```ts
info(message, context): void;
```

Defined in: [libs/nest-core/src/logger/services/logger.service.ts:614](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/logger/services/logger.service.ts#L614)

Write a 'info' level log

This method logs a message at the 'info' level, which is typically
used for informational messages that highlight the progress of the application.

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

`message`

</td>
<td>

`unknown`

</td>
<td>

The message to log

</td>
</tr>
<tr>
<td>

`context`

</td>
<td>

`string`

</td>
<td>

The context (category) of the message

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### Example

```typescript
// Create a logger with context
const logger = new LoggerService("AuthService");

// Simple info log
logger.info("User authenticated");

// With additional context
logger.info("Session created", "SessionManager");

// With metadata and context
logger.info(
  "Operation completed",
  { duration: "120ms", status: "success" },
  "TaskProcessor",
);
```

###### See

- LogLevel Type defining log levels
- [LoggerService.info](#info-1) Static version of this method

###### Call Signature

```ts
info(message, ...optionalParams): void;
```

Defined in: [libs/nest-core/src/logger/services/logger.service.ts:622](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/logger/services/logger.service.ts#L622)

Write a 'info' level log

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

`message`

</td>
<td>

`unknown`

</td>
<td>

The message to log

</td>
</tr>
<tr>
<td>

...`optionalParams`

</td>
<td>

`unknown`\[]

</td>
<td>

Optional parameters including metadata and context

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

##### log()

###### Call Signature

```ts
log(message, context): void;
```

Defined in: [libs/nest-core/src/logger/services/logger.service.ts:695](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/logger/services/logger.service.ts#L695)

Write a 'log' level log

This method logs a message at the 'log' level, which is typically
used for standard output similar to console.log but with enhanced formatting.

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

`message`

</td>
<td>

`unknown`

</td>
<td>

The message to log

</td>
</tr>
<tr>
<td>

`context`

</td>
<td>

`string`

</td>
<td>

The context (category) of the message

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### Example

```typescript
// Create a logger with context
const logger = new LoggerService("ApiController");

// Simple log
logger.log("Processing data");

// With additional context
logger.log("Request received", "RequestHandler");

// With metadata and context
logger.log(
  "User activity",
  { userId: "123", action: "login" },
  "ActivityTracker",
);
```

###### See

- LogLevel Type defining log levels
- [LoggerService.log](#log-2) Static version of this method

###### Implementation of

```ts
NestLoggerService.log;
```

###### Call Signature

```ts
log(message, ...optionalParams): void;
```

Defined in: [libs/nest-core/src/logger/services/logger.service.ts:703](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/logger/services/logger.service.ts#L703)

Write a 'log' level log

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

`message`

</td>
<td>

`unknown`

</td>
<td>

The message to log

</td>
</tr>
<tr>
<td>

...`optionalParams`

</td>
<td>

`unknown`\[]

</td>
<td>

Optional parameters including metadata and context

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### Implementation of

```ts
NestLoggerService.log;
```

##### setLogLevels()?

```ts
optional setLogLevels(levels): void;
```

Defined in: [libs/nest-core/src/logger/services/logger.service.ts:1065](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/logger/services/logger.service.ts#L1065)

Set log levels

This method configures which log levels are enabled for this logger instance.
In Winston, this typically sets the minimum level that will be logged.

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

`levels`

</td>
<td>

`string`\[]

</td>
<td>

Log levels to enable

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### Example

```typescript
// Create a logger
const logger = new LoggerService("AppService");

// Set log level to only show warnings and errors
logger.setLogLevels(["warn"]);

// This won't be logged
logger.info("This message will be suppressed");

// This will be logged
logger.warn("This warning will be shown");
```

###### See

- LogLevel Type defining possible log levels
- [LoggerService.setLogLevels](#setloglevels-1) Static version of this method

###### Implementation of

```ts
NestLoggerService.setLogLevels;
```

##### verbose()?

```ts
optional verbose(message, context): void;
```

Defined in: [libs/nest-core/src/logger/services/logger.service.ts:460](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/logger/services/logger.service.ts#L460)

Write a 'verbose' level log

This method logs a message at the 'verbose' level, which is typically
used for highly detailed debugging information. It's the most verbose log level.

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

`message`

</td>
<td>

`unknown`

</td>
<td>

The message to log

</td>
</tr>
<tr>
<td>

`context`

</td>
<td>

`string`

</td>
<td>

The context (category) of the message

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### Example

```typescript
// Create a logger with context
const logger = new LoggerService("DatabaseService");

// Simple verbose log
logger.verbose("Database connection established");

// With additional context
logger.verbose("Query executed in 5ms", "QueryExecutor");

// With metadata and context
logger.verbose("User action", { userId: "123", action: "view" }, "UserTracker");
```

###### See

- LogLevel Type defining log levels
- [LoggerService.verbose](#verbose-1) Static version of this method

###### Implementation of

```ts
NestLoggerService.verbose;
```

##### warn()

###### Call Signature

```ts
warn(message, context): void;
```

Defined in: [libs/nest-core/src/logger/services/logger.service.ts:879](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/logger/services/logger.service.ts#L879)

Write a 'warn' level log

This method logs a message at the 'warn' level, which is typically
used for warning events that might indicate potential issues.

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

`message`

</td>
<td>

`unknown`

</td>
<td>

The message to log

</td>
</tr>
<tr>
<td>

`context`

</td>
<td>

`string`

</td>
<td>

The context (category) of the message

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### Example

```typescript
// Create a logger with context
const logger = new LoggerService("SystemMonitor");

// Simple warning log
logger.warn("Deprecated feature used");

// With additional context
logger.warn("High memory usage detected", "MemoryMonitor");

// With metadata and context
logger.warn(
  "Rate limit approaching",
  { current: 95, limit: 100, userId: "123" },
  "RateLimiter",
);
```

###### See

- LogLevel Type defining log levels
- [LoggerService.warn](#warn-1) Static version of this method

###### Implementation of

```ts
NestLoggerService.warn;
```

###### Call Signature

```ts
warn(message, ...optionalParams): void;
```

Defined in: [libs/nest-core/src/logger/services/logger.service.ts:887](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/logger/services/logger.service.ts#L887)

Write a 'warn' level log

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

`message`

</td>
<td>

`unknown`

</td>
<td>

The message to log

</td>
</tr>
<tr>
<td>

...`optionalParams`

</td>
<td>

`unknown`\[]

</td>
<td>

Optional parameters including metadata and context

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### Implementation of

```ts
NestLoggerService.warn;
```

##### addTransport()

```ts
static addTransport(transport): void;
```

Defined in: [libs/nest-core/src/logger/services/logger.service.ts:1164](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/logger/services/logger.service.ts#L1164)

Add a custom transport to the static logger

This static method adds a custom Winston transport to the static logger.
Transports define where log messages are sent (console, file, external service, etc.).

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

`transport`

</td>
<td>

`TransportStream`

</td>
<td>

Winston transport to add

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### Example

```typescript
// Add a custom file transport to the static logger
LoggerService.addTransport(
  new winston.transports.File({
    filename: "application.log",
    level: "info",
  }),
);

// Now static logging methods will also log to the file
LoggerService.info("This will be logged to the console and the file");
```

###### See

addTransportToLogger Private method that implements this functionality

##### configure()

```ts
static configure(options?): void;
```

Defined in: [libs/nest-core/src/logger/services/logger.service.ts:135](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/logger/services/logger.service.ts#L135)

Configure the logger with custom options

This static method allows customizing the logger's behavior by providing
configuration options. It merges the provided options with the default ones.

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

`options?`

</td>
<td>

[`LoggerOptions`](#loggeroptions)

</td>
<td>

Optional Logger configuration options

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### Example

```typescript
// Configure the logger with custom options
LoggerService.configure({
  appName: "MyApp",
  level: "debug",
  colors: true,
  logsDir: "./custom-logs",
});
```

###### See

- [LoggerOptions](#loggeroptions) Available configuration options
- [defaultOptions](#defaultoptions) Default values for these options
- [resetConfiguration](#resetconfiguration) Method to reset to default configuration

##### debug()

```ts
static debug(message, context): void;
```

Defined in: [libs/nest-core/src/logger/services/logger.service.ts:574](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/logger/services/logger.service.ts#L574)

Write a 'debug' level log (static method)

This static method logs a message at the 'debug' level, which is typically
used for debugging information that is useful during development.

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

`message`

</td>
<td>

`unknown`

</td>
<td>

The message to log

</td>
</tr>
<tr>
<td>

`context`

</td>
<td>

`string`

</td>
<td>

The context (category) of the message

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### Example

```typescript
// Simple debug log
LoggerService.debug("Processing request");

// With context
LoggerService.debug("User data retrieved", "UserService");

// With metadata and context
LoggerService.debug(
  "Request details",
  { method: "GET", path: "/users" },
  "RequestHandler",
);
```

###### See

- LogLevel Type defining log levels
- prepareLogParams Method that processes these parameters

##### error()

###### Call Signature

```ts
static error(message, context): void;
```

Defined in: [libs/nest-core/src/logger/services/logger.service.ts:833](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/logger/services/logger.service.ts#L833)

Write an 'error' level log (static method)

This static method logs a message at the 'error' level, which is typically
used for error events that might still allow the application to continue running.
Error logs are also written to a separate error log file.

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

`message`

</td>
<td>

`unknown`

</td>
<td>

The message or Error object to log

</td>
</tr>
<tr>
<td>

`context`

</td>
<td>

`string`

</td>
<td>

The context (category) of the message

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### Example

```typescript
// Simple error log
LoggerService.error("Failed to connect to database");

// With Error object
try {
  // Some code that might throw
} catch (error) {
  LoggerService.error(error, "DatabaseService");
}

// With metadata and context
LoggerService.error(
  "Authentication failed",
  { userId: "123", reason: "Invalid credentials" },
  "AuthService",
);
```

###### See

- LogLevel Type defining log levels
- prepareLogParams Method that processes these parameters

###### Call Signature

```ts
static error(message, ...optionalParams): void;
```

Defined in: [libs/nest-core/src/logger/services/logger.service.ts:841](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/logger/services/logger.service.ts#L841)

Write an 'error' level log (static method)

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

`message`

</td>
<td>

`unknown`

</td>
<td>

The message or Error object to log

</td>
</tr>
<tr>
<td>

...`optionalParams`

</td>
<td>

`unknown`\[]

</td>
<td>

Optional parameters including metadata and context

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

##### fatal()

###### Call Signature

```ts
static fatal(message, context): void;
```

Defined in: [libs/nest-core/src/logger/services/logger.service.ts:1023](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/logger/services/logger.service.ts#L1023)

Write a 'fatal' level log (static method, maps to 'error' in Winston)

This static method logs a message at the 'fatal' level, which is typically
used for severe error events that may cause the application to terminate.
In Winston, this maps to the 'error' level but is displayed with a different color.

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

`message`

</td>
<td>

`unknown`

</td>
<td>

The message or Error object to log

</td>
</tr>
<tr>
<td>

`context`

</td>
<td>

`string`

</td>
<td>

The context (category) of the message

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### Example

```typescript
// Simple fatal log
LoggerService.fatal("Unrecoverable system error");

// With Error object
try {
  // Some critical operation
} catch (error) {
  LoggerService.fatal(error, "SystemService");
  process.exit(1);
}

// With metadata and context
LoggerService.fatal(
  "Critical resource unavailable",
  { resource: "database", attempts: 5 },
  "StartupService",
);
```

###### See

- LogLevel Type defining log levels
- prepareLogParams Method that processes these parameters

###### Call Signature

```ts
static fatal(message, ...optionalParams): void;
```

Defined in: [libs/nest-core/src/logger/services/logger.service.ts:1031](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/logger/services/logger.service.ts#L1031)

Write a 'fatal' level log (static method, maps to 'error' in Winston)

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

`message`

</td>
<td>

`unknown`

</td>
<td>

The message or Error object to log

</td>
</tr>
<tr>
<td>

...`optionalParams`

</td>
<td>

`unknown`\[]

</td>
<td>

Optional parameters including metadata and context

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

##### info()

###### Call Signature

```ts
static info(message, context): void;
```

Defined in: [libs/nest-core/src/logger/services/logger.service.ts:653](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/logger/services/logger.service.ts#L653)

Write a 'info' level log (static method)

This static method logs a message at the 'info' level, which is typically
used for informational messages that highlight the progress of the application.

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

`message`

</td>
<td>

`unknown`

</td>
<td>

The message to log

</td>
</tr>
<tr>
<td>

`context`

</td>
<td>

`string`

</td>
<td>

The context (category) of the message

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### Example

```typescript
// Simple info log
LoggerService.info("Application started");

// With context
LoggerService.info("User registered", "AuthService");

// With metadata and context
LoggerService.info(
  "Operation completed",
  { duration: "120ms", status: "success" },
  "TaskService",
);
```

###### See

- LogLevel Type defining log levels
- prepareLogParams Method that processes these parameters

###### Call Signature

```ts
static info(message, ...optionalParams): void;
```

Defined in: [libs/nest-core/src/logger/services/logger.service.ts:661](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/logger/services/logger.service.ts#L661)

Write a 'info' level log (static method)

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

`message`

</td>
<td>

`unknown`

</td>
<td>

The message to log

</td>
</tr>
<tr>
<td>

...`optionalParams`

</td>
<td>

`unknown`\[]

</td>
<td>

Optional parameters including metadata and context

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

##### log()

###### Call Signature

```ts
static log(message, context): void;
```

Defined in: [libs/nest-core/src/logger/services/logger.service.ts:734](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/logger/services/logger.service.ts#L734)

Write a 'log' level log (static method)

This static method logs a message at the 'log' level, which is typically
used for standard output similar to console.log but with enhanced formatting.

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

`message`

</td>
<td>

`unknown`

</td>
<td>

The message to log

</td>
</tr>
<tr>
<td>

`context`

</td>
<td>

`string`

</td>
<td>

The context (category) of the message

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### Example

```typescript
// Simple log
LoggerService.log("Processing data");

// With context
LoggerService.log("Request received", "ApiController");

// With metadata and context
LoggerService.log(
  "User activity",
  { userId: "123", action: "login" },
  "ActivityTracker",
);
```

###### See

- LogLevel Type defining log levels
- prepareLogParams Method that processes these parameters

###### Call Signature

```ts
static log(message, ...optionalParams): void;
```

Defined in: [libs/nest-core/src/logger/services/logger.service.ts:742](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/logger/services/logger.service.ts#L742)

Write a 'log' level log (static method)

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

`message`

</td>
<td>

`unknown`

</td>
<td>

The message to log

</td>
</tr>
<tr>
<td>

...`optionalParams`

</td>
<td>

`unknown`\[]

</td>
<td>

Optional parameters including metadata and context

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

##### resetConfiguration()

```ts
static resetConfiguration(): void;
```

Defined in: [libs/nest-core/src/logger/services/logger.service.ts:220](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/logger/services/logger.service.ts#L220)

Reset logger configuration to defaults

This static method resets all logger configuration options to their default values.
It's useful when you want to revert any custom configuration.

###### Returns

`void`

###### Example

```typescript
// Reset logger to default configuration
LoggerService.resetConfiguration();
```

###### See

- [defaultOptions](#defaultoptions) The default options that will be restored
- [configure](#configure-1) Method to set custom configuration

##### setLogLevels()

```ts
static setLogLevels(levels): void;
```

Defined in: [libs/nest-core/src/logger/services/logger.service.ts:1092](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/logger/services/logger.service.ts#L1092)

Set log levels (static method)

This static method configures which log levels are enabled for the static logger.
In Winston, this typically sets the minimum level that will be logged.

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

`levels`

</td>
<td>

`string`\[]

</td>
<td>

Log levels to enable

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### Example

```typescript
// Set log level to only show warnings and errors
LoggerService.setLogLevels(["warn"]);

// This won't be logged
LoggerService.info("This message will be suppressed");

// This will be logged
LoggerService.warn("This warning will be shown");
```

###### See

- LogLevel Type defining possible log levels
- applyLogLevels Private method that implements this functionality

##### verbose()

```ts
static verbose(message, context): void;
```

Defined in: [libs/nest-core/src/logger/services/logger.service.ts:497](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/logger/services/logger.service.ts#L497)

Write a 'verbose' level log (static method)

This static method logs a message at the 'verbose' level, which is typically
used for highly detailed debugging information. It's the most verbose log level.

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

`message`

</td>
<td>

`unknown`

</td>
<td>

The message to log

</td>
</tr>
<tr>
<td>

`context`

</td>
<td>

`string`

</td>
<td>

The context (category) of the message

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### Example

```typescript
// Simple verbose log
LoggerService.verbose("Database connection established");

// With context
LoggerService.verbose("Query executed in 5ms", "DatabaseService");

// With metadata and context
LoggerService.verbose(
  "User action",
  { userId: "123", action: "view" },
  "UserService",
);
```

###### See

- LogLevel Type defining log levels
- prepareLogParams Method that processes these parameters

##### warn()

###### Call Signature

```ts
static warn(message, context): void;
```

Defined in: [libs/nest-core/src/logger/services/logger.service.ts:922](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/logger/services/logger.service.ts#L922)

Write a 'warn' level log (static method)

This static method logs a message at the 'warn' level, which is typically
used for warning events that might indicate potential issues.

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

`message`

</td>
<td>

`unknown`

</td>
<td>

The message to log

</td>
</tr>
<tr>
<td>

`context`

</td>
<td>

`string`

</td>
<td>

The context (category) of the message

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### Example

```typescript
// Simple warning log
LoggerService.warn("Deprecated feature used");

// With context
LoggerService.warn("High memory usage detected", "SystemMonitor");

// With metadata and context
LoggerService.warn(
  "Rate limit approaching",
  { current: 95, limit: 100, userId: "123" },
  "RateLimiter",
);
```

###### See

- LogLevel Type defining log levels
- prepareLogParams Method that processes these parameters

###### Call Signature

```ts
static warn(message, ...optionalParams): void;
```

Defined in: [libs/nest-core/src/logger/services/logger.service.ts:930](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/logger/services/logger.service.ts#L930)

Write a 'warn' level log (static method)

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

`message`

</td>
<td>

`unknown`

</td>
<td>

The message to log

</td>
</tr>
<tr>
<td>

...`optionalParams`

</td>
<td>

`unknown`\[]

</td>
<td>

Optional parameters including metadata and context

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

---

### PaginatedResponse

Defined in: [libs/nest-core/src/generators/paginated-response.ts:50](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/generators/paginated-response.ts#L50)

Class for standardized paginated responses with page-based navigation

The `PaginatedResponse<T>` class provides a consistent structure for returning
paginated data from API endpoints. It transforms the offset-based pagination
parameters (skip/take) into page-based navigation (page/limit) that is more
intuitive for frontend implementations.

This class is designed to be returned directly from controllers or services
that implement pagination. It automatically calculates the page number and
limit based on the provided pagination parameters.

Key features:

- Contains the actual data items in the `data` array
- Includes the total row count for calculating total pages
- Provides page number and limit for intuitive pagination controls
- Automatically calculates page from skip/take parameters

#### Examples

```typescript
// In a controller
@Get()
async getUsers(@Pager() pagination?: Pagination): Promise<PaginatedResponse<UserDto>> {
  const [users, totalCount] = await this.userService.findAndCount({
    skip: pagination?.skip,
    take: pagination?.take
  });

  return new PaginatedResponse(users, totalCount, pagination);
}
```

```typescript
// Response structure:
// {
//   "data": [{...}, {...}],
//   "rowCount": 42,
//   "page": 3,
//   "limit": 10
// }
```

#### See

Pagination The interface for pagination parameters (skip/take)

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

The type of items contained in the response data array

</td>
</tr>
</tbody>
</table>

#### Implements

- `PaginatedResponse`<`T`>

#### Constructors

##### Constructor

```ts
new PaginatedResponse<T>(
   data,
   totalCount,
pagination?): PaginatedResponse<T>;
```

Defined in: [libs/nest-core/src/generators/paginated-response.ts:113](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/generators/paginated-response.ts#L113)

Creates a new paginated response

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

`data`

</td>
<td>

`T`\[]

</td>
<td>

The array of data items for the current page

</td>
</tr>
<tr>
<td>

`totalCount`

</td>
<td>

`number`

</td>
<td>

The total number of records across all pages

</td>
</tr>
<tr>
<td>

`pagination?`

</td>
<td>

`Pagination`

</td>
<td>

Optional pagination parameters used to calculate page and limit

</td>
</tr>
</tbody>
</table>

###### Returns

[`PaginatedResponse`](#paginatedresponse)<`T`>

#### Methods

##### isPaginatedResponse()

```ts
static isPaginatedResponse<T>(response): response is PaginatedResponse<T>;
```

Defined in: [libs/nest-core/src/generators/paginated-response.ts:51](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/generators/paginated-response.ts#L51)

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

`response`

</td>
<td>

`unknown`

</td>
</tr>
</tbody>
</table>

###### Returns

`response is PaginatedResponse<T>`

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Default value</th>
<th>Description</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="property-data"></a> `data`

</td>
<td>

`T`\[]

</td>
<td>

`undefined`

</td>
<td>

Array containing the paginated data items

This property holds the actual data requested by the client, limited
by the pagination parameters. The type of items in this array is
determined by the generic type parameter `T`.

</td>
<td>

[libs/nest-core/src/generators/paginated-response.ts:68](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/generators/paginated-response.ts#L68)

</td>
</tr>
<tr>
<td>

<a id="property-limit"></a> `limit`

</td>
<td>

`number`

</td>
<td>

`0`

</td>
<td>

The maximum number of items per page

This property represents the maximum number of items that can be
displayed on a single page. It corresponds to the `take` parameter
in the pagination interface.

**Default**

```ts
0;
```

</td>
<td>

[libs/nest-core/src/generators/paginated-response.ts:89](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/generators/paginated-response.ts#L89)

</td>
</tr>
<tr>
<td>

<a id="property-page"></a> `page`

</td>
<td>

`number`

</td>
<td>

`0`

</td>
<td>

The current page number (1-based)

This property represents the current page number, calculated from
the skip and take parameters. The first page is 1.

**Default**

```ts
0;
```

</td>
<td>

[libs/nest-core/src/generators/paginated-response.ts:78](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/generators/paginated-response.ts#L78)

</td>
</tr>
<tr>
<td>

<a id="property-rowcount"></a> `rowCount`

</td>
<td>

`number`

</td>
<td>

`undefined`

</td>
<td>

The total number of records available across all pages

This value represents the total count of records that match the query
criteria before pagination was applied. It's essential for calculating
the total number of pages and implementing pagination controls in user
interfaces.

</td>
<td>

[libs/nest-core/src/generators/paginated-response.ts:103](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/generators/paginated-response.ts#L103)

</td>
</tr>
<tr>
<td>

<a id="property-skip"></a> `skip`

</td>
<td>

`number`

</td>
<td>

`undefined`

</td>
<td>

Number of records to skip before beginning to return results.

This is equivalent to the SQL OFFSET parameter and determines
the starting point in the result set. The first record has an
offset of 0.

**Example**

```ts
skip: 10; // Skip the first 10 records
```

</td>
<td>

[libs/nest-core/src/generators/paginated-response.ts:91](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/generators/paginated-response.ts#L91)

</td>
</tr>
<tr>
<td>

<a id="property-take"></a> `take`

</td>
<td>

`number`

</td>
<td>

`undefined`

</td>
<td>

Maximum number of records to return in the result set.

This is equivalent to the SQL LIMIT parameter and controls
how many records will be included in the response. It's recommended
to set reasonable limits to prevent performance issues.

**Example**

```ts
take: 25; // Return at most 25 records
```

</td>
<td>

[libs/nest-core/src/generators/paginated-response.ts:93](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/generators/paginated-response.ts#L93)

</td>
</tr>
</tbody>
</table>

---

### RawBodyMiddleware

Defined in: [libs/nest-core/src/middlewares/row-body-parser.middleware.ts:64](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/middlewares/row-body-parser.middleware.ts#L64)

Middleware for capturing and preserving the raw request body

This middleware extends the functionality of body-parser's json middleware
by capturing the raw request body buffer before it's parsed. The raw body
is stored in the request object's `rawBody` property, making it available
for subsequent handlers.

This is particularly useful for scenarios where you need access to the
unparsed request body, such as:

- Webhook signature verification
- Custom binary data processing
- Debugging request payloads

#### Examples

```typescript
// Apply globally in your AppModule
@Module({
  // ...
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RawBodyMiddleware).forRoutes("webhooks");
  }
}
```

```typescript
// Using the raw body in a controller
@Post('webhook')
handleWebhook(@Req() request: RawBodyRequest<Request>) {
  const rawBody = request.rawBody;
  const signature = request.headers['x-signature'];

  // Verify webhook signature using the raw body
  const isValid = this.webhookService.verifySignature(
    rawBody,
    signature
  );

  if (!isValid) {
    throw new UnauthorizedException('Invalid webhook signature');
  }

  // Process the parsed body normally
  return this.webhookService.processWebhook(request.body);
}
```

#### See

- <https://github.com/expressjs/body-parser#bodyparserjsonoptions> body-parser json documentation
- RawBodyRequest NestJS interface for requests with raw body

#### Author

<https://github.com/golevelup/nestjs/blob/master/packages/webhooks/src/webhooks.middleware.ts>

#### Implements

- `NestMiddleware`

#### Constructors

##### Constructor

```ts
new RawBodyMiddleware(): RawBodyMiddleware;
```

###### Returns

[`RawBodyMiddleware`](#rawbodymiddleware)

#### Methods

##### use()

```ts
use(
   req,
   res,
   next): void;
```

Defined in: [libs/nest-core/src/middlewares/row-body-parser.middleware.ts:77](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/middlewares/row-body-parser.middleware.ts#L77)

Applies the middleware to capture the raw request body

This method configures body-parser's json middleware with a verify callback
that captures the raw request body buffer before it's parsed. The raw body
is stored in the request object's `rawBody` property.

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

`IncomingMessage`

</td>
<td>

The incoming HTTP request

</td>
</tr>
<tr>
<td>

`res`

</td>
<td>

`ServerResponse`

</td>
<td>

The outgoing HTTP response

</td>
</tr>
<tr>
<td>

`next`

</td>
<td>

`NextFunction`

</td>
<td>

Function to call the next middleware in the chain

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### Implementation of

```ts
NestMiddleware.use;
```

---

### RedisConfigException

Defined in: [libs/nest-core/src/exceptions/redis-config.exception.ts:33](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/exceptions/redis-config.exception.ts#L33)

Exception for reporting Redis configuration errors

This exception is thrown when there's an issue with Redis configuration,
specifically when required connection parameters are missing. It's primarily
used by the CacheModule when validating Redis connection options.

The exception extends NestJS's RuntimeException and provides a clear error
message about what configuration parameter is missing or invalid.

#### Examples

```typescript
// Thrown when neither host nor url is provided in Redis options
throw new RedisConfigException(
  "Redis host or url is not provided while registering RedisCacheModule",
);
```

```typescript
// Validating Redis configuration
function validateRedisConfig(options: RedisOptions): void {
  if (!("host" in options) && !("url" in options)) {
    throw new RedisConfigException(
      "Missing required Redis connection parameters",
    );
  }
}
```

#### See

[CacheModule](#cachemodule) The module that uses this exception for Redis configuration validation

#### Extends

- `RuntimeException`

#### Constructors

##### Constructor

```ts
new RedisConfigException(message): RedisConfigException;
```

Defined in: [libs/nest-core/src/exceptions/redis-config.exception.ts:39](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/exceptions/redis-config.exception.ts#L39)

Creates a new RedisConfigException

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

`message`

</td>
<td>

`string`

</td>
<td>

The error message describing what configuration issue occurred

</td>
</tr>
</tbody>
</table>

###### Returns

[`RedisConfigException`](#redisconfigexception)

###### Overrides

```ts
RuntimeException.constructor;
```

#### Methods

##### what()

```ts
what(): string;
```

Defined in: node_modules/@nestjs/core/errors/exceptions/runtime.exception.d.ts:3

###### Returns

`string`

###### Inherited from

```ts
RuntimeException.what;
```

##### captureStackTrace()

```ts
static captureStackTrace(targetObject, constructorOpt?): void;
```

Defined in: node_modules/@types/node/globals.d.ts:146

Creates a `.stack` property on `targetObject`, which when accessed returns
a string representing the location in the code at which
`Error.captureStackTrace()` was called.

```js
const myObject = {};
Error.captureStackTrace(myObject);
myObject.stack; // Similar to `new Error().stack`
```

The first line of the trace will be prefixed with
`${myObject.name}: ${myObject.message}`.

The optional `constructorOpt` argument accepts a function. If given, all frames
above `constructorOpt`, including `constructorOpt`, will be omitted from the
generated stack trace.

The `constructorOpt` argument is useful for hiding implementation
details of error generation from the user. For instance:

```js
function a() {
  b();
}

function b() {
  c();
}

function c() {
  // Create an error without stack trace to avoid calculating the stack trace twice.
  const { stackTraceLimit } = Error;
  Error.stackTraceLimit = 0;
  const error = new Error();
  Error.stackTraceLimit = stackTraceLimit;

  // Capture the stack trace above function b
  Error.captureStackTrace(error, b); // Neither function c, nor b is included in the stack trace
  throw error;
}

a();
```

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

`targetObject`

</td>
<td>

`object`

</td>
</tr>
<tr>
<td>

`constructorOpt?`

</td>
<td>

`Function`

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### Inherited from

```ts
RuntimeException.captureStackTrace;
```

##### prepareStackTrace()

```ts
static prepareStackTrace(err, stackTraces): any;
```

Defined in: node_modules/@types/node/globals.d.ts:150

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

`Error`

</td>
</tr>
<tr>
<td>

`stackTraces`

</td>
<td>

`CallSite`\[]

</td>
</tr>
</tbody>
</table>

###### Returns

`any`

###### See

https://v8.dev/docs/stack-trace-api#customizing-stack-traces

###### Inherited from

```ts
RuntimeException.prepareStackTrace;
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

<a id="property-cause-1"></a> `cause?`

</td>
<td>

`public`

</td>
<td>

`unknown`

</td>
<td>

‐

</td>
<td>

```ts
RuntimeException.cause;
```

</td>
<td>

node_modules/typescript/lib/lib.es2022.error.d.ts:26

</td>
</tr>
<tr>
<td>

<a id="property-message-1"></a> `message`

</td>
<td>

`public`

</td>
<td>

`string`

</td>
<td>

The error message describing what configuration issue occurred

</td>
<td>

```ts
RuntimeException.message;
```

</td>
<td>

[libs/nest-core/src/exceptions/redis-config.exception.ts:39](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/exceptions/redis-config.exception.ts#L39)

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

‐

</td>
<td>

```ts
RuntimeException.name;
```

</td>
<td>

node_modules/typescript/lib/lib.es5.d.ts:1076

</td>
</tr>
<tr>
<td>

<a id="property-stack-1"></a> `stack?`

</td>
<td>

`public`

</td>
<td>

`string`

</td>
<td>

‐

</td>
<td>

```ts
RuntimeException.stack;
```

</td>
<td>

node_modules/typescript/lib/lib.es5.d.ts:1078

</td>
</tr>
<tr>
<td>

<a id="property-stacktracelimit-1"></a> `stackTraceLimit`

</td>
<td>

`static`

</td>
<td>

`number`

</td>
<td>

The `Error.stackTraceLimit` property specifies the number of stack frames
collected by a stack trace (whether generated by `new Error().stack` or
`Error.captureStackTrace(obj)`).

The default value is `10` but may be set to any valid JavaScript number. Changes
will affect any stack trace captured _after_ the value has been changed.

If set to a non-number value, or set to a negative number, stack traces will
not capture any frames.

</td>
<td>

```ts
RuntimeException.stackTraceLimit;
```

</td>
<td>

node_modules/@types/node/globals.d.ts:162

</td>
</tr>
</tbody>
</table>

---

### TransformInterceptor

Defined in: [libs/nest-core/src/interceptors/transform.interceptor.ts:64](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/interceptors/transform.interceptor.ts#L64)

Interceptor that transforms response data using a view DTO

This interceptor automatically transforms response data from controllers
using the provided view DTO's formatDataSet method. It handles various
response types including single objects, arrays, paginated responses,
and null values.

The interceptor uses generic type parameters to provide type safety:

- T: The input data type (typically an entity or internal model)
- R: The output data type (the transformed view representation)

This interceptor is typically applied using the

#### Use Transform Interceptor

decorator,
which provides a more convenient way to use it in controllers.

#### Template

The output data type after transformation

#### Example

```typescript
// Manual usage in a controller
@Controller("users")
@UseInterceptors(new TransformInterceptor(new UserViewDto()))
export class UserController {
  // All endpoints in this controller will have their responses transformed
  // using the UserViewDto.formatDataSet method
}

// Usage with specific endpoints
@Controller("products")
export class ProductController {
  @Get()
  @UseInterceptors(new TransformInterceptor(new ProductViewDto()))
  findAll(): Promise<Product[]> {
    // The Product[] returned here will be transformed to ProductView[]
    return this.productService.findAll();
  }
}
```

#### See

- [UseTransformInterceptor](#usetransforminterceptor) A decorator that simplifies using this interceptor
- [IViewDto](#iviewdto) The interface that view DTOs must implement

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

The input data type to be transformed

</td>
</tr>
</tbody>
</table>

#### Implements

- `NestInterceptor`<`Response`<`T`>, `Response`<`T`>>

#### Constructors

##### Constructor

```ts
new TransformInterceptor<T>(viewDto): TransformInterceptor<T>;
```

Defined in: [libs/nest-core/src/interceptors/transform.interceptor.ts:71](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/interceptors/transform.interceptor.ts#L71)

Creates a new TransformInterceptor

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

`viewDto`

</td>
<td>

[`IViewDto`](#iviewdto)<`T`, `T`>

</td>
<td>

The view DTO that defines how to transform the response data.
Must implement the IViewDto interface with a formatDataSet method.

</td>
</tr>
</tbody>
</table>

###### Returns

[`TransformInterceptor`](#transforminterceptor)<`T`>

#### Methods

##### intercept()

```ts
intercept(_context, next): Observable<Response<T>>;
```

Defined in: [libs/nest-core/src/interceptors/transform.interceptor.ts:89](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/interceptors/transform.interceptor.ts#L89)

Intercepts the response and transforms the data

This method is called automatically by NestJS when processing responses.
It transforms the response data using the view DTO's formatDataSet method,
handling different response types appropriately:

- For null values: Returns null
- For arrays: Transforms each item in the array
- For paginated responses: Transforms each item in the data array while preserving pagination metadata
- For single objects: Transforms the object directly

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

`_context`

</td>
<td>

`ExecutionContext`

</td>
<td>

The execution context (unused in this implementation)

</td>
</tr>
<tr>
<td>

`next`

</td>
<td>

`CallHandler`

</td>
<td>

The next handler in the chain

</td>
</tr>
</tbody>
</table>

###### Returns

`Observable`<`Response`<`T`>>

An observable of the transformed response

###### Implementation of

```ts
NestInterceptor.intercept;
```

## Functions

### BooleanTransformer()

```ts
function BooleanTransformer(params): boolean | undefined;
```

Defined in: [libs/nest-core/src/transformers/boolean.transformer.ts:51](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/transformers/boolean.transformer.ts#L51)

Boolean transformer

A transformer to use in DTOs as a `TransformFn` for the `Transform` property decorator from the `class-transformer` package.

This transformer converts the property value to a `boolean` if it is the string `"true"` or `"false"`.
Otherwise, it returns `undefined`.

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

`params`

</td>
<td>

`TransformFnParams`

</td>
<td>

Parameters passed to the transformer

</td>
</tr>
</tbody>
</table>

#### Returns

`boolean` | `undefined`

- Transformed `boolean` value or `undefined`

#### Example

```TypeScript
export class DTO {
   @Transform(BooleanTransformer)
   isActive: boolean | undefined;
}
```

---

### BooleanTransformerWithDefault()

```ts
function BooleanTransformerWithDefault(
  defaultValue,
): (params) => boolean | undefined;
```

Defined in: [libs/nest-core/src/transformers/boolean.transformer.ts:24](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/transformers/boolean.transformer.ts#L24)

Boolean transformer with default value

A transformer to use in DTOs as a `TransformFn` for the `Transform` property decorator from the `class-transformer` package.

This transformer converts the property value to a `boolean` if it is the string `"true"` or `"false"`.
Otherwise, it returns the default value passed to the transformer.

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

`defaultValue`

</td>
<td>

`boolean` | `undefined`

</td>
<td>

Default value to return if the property value is not `"true"` or `"false"`

</td>
</tr>
</tbody>
</table>

#### Returns

Transformer function with default value added

```ts
(params): boolean | undefined;
```

##### Parameters

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

`params`

</td>
<td>

`TransformFnParams`

</td>
</tr>
</tbody>
</table>

##### Returns

`boolean` | `undefined`

#### Example

```TypeScript
export class DTO {
   @Transform(BooleanTransformerWithDefault(false))
   isActive: boolean;
}
```

---

### colorize()

```ts
function colorize(obj): string;
```

Defined in: [libs/nest-core/src/logger/utils/logger.utils.ts:330](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/logger/utils/logger.utils.ts#L330)

Colorize an object for console output

This function uses Node.js's util.inspect to create a colorized string
representation of any object. It's useful for debugging complex objects.

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

`unknown`

</td>
<td>

The object to colorize

</td>
</tr>
</tbody>
</table>

#### Returns

`string`

A colorized string representation of the object

#### Example

```typescript
// Colorize a complex object for console output
const user = { id: 123, name: "John", roles: ["admin", "user"] };
console.log(colorize(user));
```

#### See

- [formatMessage](#formatmessage) Related function for formatting log messages
- [consoleFormat](#consoleformat) Function that formats log output

---

### consoleFormat()

```ts
function consoleFormat(appName?, options?): Format;
```

Defined in: [libs/nest-core/src/logger/utils/logger.utils.ts:150](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/logger/utils/logger.utils.ts#L150)

Creates a Winston format that mimics NestJS's default logger format

This function creates a custom Winston format that produces log output
similar to NestJS's default logger. It supports colorization, pretty-printing,
and various display options.

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

`appName?`

</td>
<td>

`string`

</td>
<td>

`"HICHCHI"`

</td>
<td>

The name of the application to display in logs

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

[`NestLikeFormatOptions`](#nestlikeformatoptions)

</td>
<td>

`{}`

</td>
<td>

Formatting options to customize the output

</td>
</tr>
</tbody>
</table>

#### Returns

`Format`

A Winston format function that can be used with format.combine()

#### Example

```typescript
// Create a Winston logger with NestJS-like format
const logger = createLogger({
  transports: [
    new winston.transports.Console({
      format: format.combine(
        format.timestamp(),
        consoleFormat("MyApp", { colors: true, prettyPrint: true }),
      ),
    }),
  ],
});
```

#### See

- [NestLikeFormatOptions](#nestlikeformatoptions) Interface defining the formatting options
- [defaultOptions](#defaultoptions) Default values for the formatting options
- [LoggerService](#loggerservice) Service that uses this format

---

### DateTransformer()

```ts
function DateTransformer(params): Date | undefined;
```

Defined in: [libs/nest-core/src/transformers/date.transformer.ts:23](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/transformers/date.transformer.ts#L23)

Date transformer

A transformer to use in DTOs as a `TransformFn` for the `Transform` property decorator from the `class-transformer` package.

This transformer converts the property value to a JavaScript `Date` object if the value is a valid date string

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

`params`

</td>
<td>

`TransformFnParams`

</td>
<td>

Parameters passed to the transformer

</td>
</tr>
</tbody>
</table>

#### Returns

`Date` | `undefined`

- Transformed `Date` value or `undefined`

#### Example

```TypeScript
export class DTO {
   @Transform(DateTransformer)
   birthday: Date;
}
```

---

### Dto()

```ts
function Dto(name?): ClassDecorator;
```

Defined in: [libs/nest-core/src/decorators/dto.decorator.ts:47](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/decorators/dto.decorator.ts#L47)

Decorator that registers a class as a validation DTO with the Hichchi metadata system

This decorator marks a class as a Data Transfer Object (DTO) and registers it with
the Hichchi metadata system. DTOs are used to define the shape of data for validation
purposes, especially in request/response handling.

When a class is decorated with @Dto(), it becomes available for metadata retrieval
through methods like getValidationDtos(), getValidationDtoInfo(), or getDtoMetaOfInstance().

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

`name?`

</td>
<td>

`string`

</td>
<td>

Optional name to associate with the DTO. If not provided, an empty string is used.

</td>
</tr>
</tbody>
</table>

#### Returns

`ClassDecorator`

A decorator function that registers the target class as a validation DTO

#### Examples

```typescript
// Basic usage with no name
@Dto()
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;
}
```

```typescript
// Usage with a custom name
@Dto("user-creation")
export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;
}
```

#### See

[hichchiMetadata](#hichchimetadata-1) The metadata storage system that this decorator interacts with

---

### errorFileFormat()

```ts
function errorFileFormat(): Format;
```

Defined in: [libs/nest-core/src/logger/utils/logger.utils.ts:275](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/logger/utils/logger.utils.ts#L275)

Creates a Winston format for error logs in JSON files

This function creates a custom Winston format specifically designed for
error logs that will be written to JSON files. It processes error objects
to create a structured JSON representation with properly formatted stack traces
and error details.

Features:

- Captures full error stack traces
- Formats error objects into a structured JSON format
- Separates error message from the main log message
- Splits stack traces into arrays for better readability

#### Returns

`Format`

A Winston format function that can be used with format.combine()

#### Example

```typescript
// Create a file transport with error file format
const fileTransport = new winston.transports.File({
  filename: "errors.json",
  level: "error",
  format: format.combine(format.timestamp(), errorFileFormat()),
});
```

#### See

- [JsonArrayFileTransport](#jsonarrayfiletransport) Transport that uses this format
- [LoggerService](#loggerservice) Service that configures transports with this format
- [consoleFormat](#consoleformat) Related format function for console output

---

### FileFormFieldTransformer()

```ts
function FileFormFieldTransformer(params): null | undefined;
```

Defined in: [libs/nest-core/src/transformers/file-form-field.transformer.ts:23](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/transformers/file-form-field.transformer.ts#L23)

File form field Transformer

A transformer to use in DTOs as a `TransformFn` for the `Transform` property decorator from the `class-transformer` package.

This transformer is used to transform a file form field value to `null` if the value is an empty string or `"null"`.

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

`params`

</td>
<td>

`TransformFnParams`

</td>
<td>

Parameters passed to the transformer

</td>
</tr>
</tbody>
</table>

#### Returns

`null` | `undefined`

`null` if the value is an empty string or `"null"`, otherwise returns `undefined`

#### Example

```TypeScript
export class DTO {
   @Transform(FileFormFieldTransformer)
   image: null | undefined;
}
```

---

### FileOrTextFormFieldTransformer()

```ts
function FileOrTextFormFieldTransformer(params): string | null;
```

Defined in: [libs/nest-core/src/transformers/file-or-text-form-field.transformer.ts:23](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/transformers/file-or-text-form-field.transformer.ts#L23)

File or text form field transformer

A transformer to use in DTOs as a `TransformFn` for the `Transform` property decorator from the `class-transformer` package.

This transformer is used to transform a file or text form field value to a `string` or `null`.

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

`params`

</td>
<td>

`TransformFnParams`

</td>
<td>

Parameters passed to the transformer

</td>
</tr>
</tbody>
</table>

#### Returns

`string` | `null`

`null` if the value is not a string or an empty string, otherwise returns the `string` value

#### Example

```TypeScript
export class DTO {
   @Transform(FileOrTextFormFieldTransformer)
   image: string | null;
}
```

---

### formatMessage()

```ts
function formatMessage(value): string;
```

Defined in: [libs/nest-core/src/logger/utils/logger.utils.ts:359](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/logger/utils/logger.utils.ts#L359)

Convert any value to a string in a meaningful way

This function converts any value to a string representation that is
suitable for logging. It handles different types appropriately:

- Primitives are converted to strings
- Errors have their message extracted
- Objects are JSON stringified
- Complex objects with circular references are inspected

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

`value`

</td>
<td>

`unknown`

</td>
<td>

The value to convert to a string

</td>
</tr>
</tbody>
</table>

#### Returns

`string`

A string representation of the value

#### Example

```typescript
// Format different types of values
console.log(formatMessage("Hello")); // "Hello"
console.log(formatMessage(123)); // "123"
console.log(formatMessage(new Error("Oops"))); // "Oops"
console.log(formatMessage({ name: "John" })); // "{"name":"John"}"
```

#### See

- [LogParam](#logparam) Type defining possible parameter types
- [LoggerService](#loggerservice) Service that uses this function

---

### generateValidationErrorResponse()

```ts
function generateValidationErrorResponse(error): ErrorResponse;
```

Defined in: [libs/nest-core/src/utils/validation.utils.ts:178](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/utils/validation.utils.ts#L178)

Generate a standardized error response from a validation error

This function creates a standardized `ErrorResponse` object from a `ValidationError`.
It extracts information from the validation error and formats it into a consistent
structure with:

- A standardized status code (400 Bad Request)
- A machine-readable error code in snake_case format
- A human-readable error message with proper capitalization

The function uses the Hichchi metadata system to get entity information for the
validated object, which helps create more descriptive error messages and codes.

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

`error`

</td>
<td>

`ValidationError`

</td>
<td>

The validation error to transform

</td>
</tr>
</tbody>
</table>

#### Returns

`ErrorResponse`

A standardized error response object

#### Example

```typescript
// Generate an error response from a validation error
const errors = await validate(userDto);
if (errors.length > 0) {
  const errorResponse = generateValidationErrorResponse(errors[0]);
  // Returns something like:
  // {
  //   statusCode: 400,
  //   code: 'USER_400_NOT_EMAIL_EMAIL',
  //   message: 'User Email must be a valid email'
  // }
  throw new BadRequestException(errorResponse);
}
```

#### See

- ErrorResponse The standardized error response structure
- [hichchiMetadata](#hichchimetadata-1) The metadata system used to get entity information

---

### getGlobal()

```ts
function getGlobal(): any;
```

Defined in: [libs/nest-core/src/utils/get-global.ts:42](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/utils/get-global.ts#L42)

Retrieves the global object across different JavaScript environments

This utility function provides a consistent way to access the global object
regardless of the JavaScript environment (browser, Node.js, Web Worker, etc.).
It checks for the availability of different global objects in the following order:

1. globalThis - The standard global object in modern JavaScript environments
2. global - The global object in Node.js
3. window - The global object in browser environments
4. self - The global object in Web Workers

This function is particularly useful for creating cross-environment utilities
that need to store or access global state, such as singletons or shared configuration.

#### Returns

`any`

The global object for the current JavaScript environment

#### Examples

```typescript
// Store a global variable
const global = getGlobal();
global.myAppConfig = { version: "1.0.0" };

// Access a global variable from anywhere
const config = getGlobal().myAppConfig;
```

```typescript
// Create a singleton instance
function createSingleton() {
  const g = getGlobal();
  if (!g.myInstance) {
    g.myInstance = new MyClass();
  }
  return g.myInstance;
}
```

---

### hichchiBootstrap()

Implementation of the hichchiBootstrap function

This is the actual implementation of the hichchiBootstrap function that handles
both overload signatures. It accepts either a pre-created `NestApplication` instance
or a NestJS module, and applies the specified configuration.

The function performs the following steps:

1. Merges the provided configuration with default values
2. Creates a NestApplication instance if a module was provided
3. Configures global exception filters if enabled
4. Sets up CORS if allowed origins are provided
5. Configures validation pipe if enabled
6. Sets up global interceptors if enabled
7. Sets the global prefix if provided
8. Starts the application on the specified port

#### Param

Either a pre-created `NestApplication` instance or a NestJS module

#### Param

Configuration options for the application

#### See

- INestApplication NestJS application interface
- NestApplication NestJS application instance
- IEntryNestModule Type representing a valid NestJS module
- AppConfiguration Configuration options for the bootstrap function
- [LoggerService](#loggerservice) Logger service used by the application
- [AllExceptionsFilter](#allexceptionsfilter) Default exception filter
- ValidationPipe NestJS validation pipe

#### Call Signature

```ts
function hichchiBootstrap(app, configuration?): Promise<void>;
```

Defined in: [libs/nest-core/src/bootstrap/app-bootstrapper.ts:175](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/bootstrap/app-bootstrapper.ts#L175)

Bootstrap a NestJS application with common configurations and best practices

This function sets up a NestJS application with common configurations and best practices,
including global filters, CORS, validation, interceptors, and global prefix.
It accepts a pre-created `NestApplication` instance and applies the specified configuration.

The function applies sensible defaults for all configuration options, making it easy to
quickly bootstrap a production-ready NestJS application with minimal configuration.

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

`app`

</td>
<td>

`INestApplication`

</td>
<td>

A pre-created `NestApplication` instance

</td>
</tr>
<tr>
<td>

`configuration?`

</td>
<td>

`AppConfiguration`

</td>
<td>

Configuration options for the application

</td>
</tr>
</tbody>
</table>

##### Returns

`Promise`<`void`>

A promise that resolves when the application is successfully started

##### Example

```typescript
// Bootstrap with a pre-created `NestApplication`
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Perform custom setup on the app instance
  app.enableShutdownHooks();

  // Then bootstrap with hichchiBootstrap
  await hichchiBootstrap(app, {
    port: 3000,
    globalPrefix: "api/v1",
  });
}
bootstrap();
```

##### See

AppConfiguration Configuration options for the bootstrap function

#### Call Signature

```ts
function hichchiBootstrap(module, configuration?): Promise<void>;
```

Defined in: [libs/nest-core/src/bootstrap/app-bootstrapper.ts:205](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/bootstrap/app-bootstrapper.ts#L205)

Bootstrap a NestJS application with common configurations and best practices

This function sets up a NestJS application with common configurations and best practices,
including global filters, CORS, validation, interceptors, and global prefix.
It accepts a NestJS module and creates a new `NestApplication` instance from it.

The function applies sensible defaults for all configuration options, making it easy to
quickly bootstrap a production-ready NestJS application with minimal configuration.

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

`module`

</td>
<td>

`IEntryNestModule`

</td>
<td>

A module to bootstrap

</td>
</tr>
<tr>
<td>

`configuration?`

</td>
<td>

`AppConfiguration`

</td>
<td>

Configuration options for the application

</td>
</tr>
</tbody>
</table>

##### Returns

`Promise`<`void`>

A promise that resolves when the application is successfully started

##### Example

```typescript
// Bootstrap with a module
import { AppModule } from "./app.module";

hichchiBootstrap(AppModule, {
  port: 3000,
  globalPrefix: "api",
  allowedOrigins: ["example.com"],
});
```

##### See

AppConfiguration Configuration options for the bootstrap function

---

### hichchiMetadata()

```ts
function hichchiMetadata(): HichchiMetadata;
```

Defined in: [libs/nest-core/src/metadata/metadata-storage.ts:342](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/metadata/metadata-storage.ts#L342)

Get the global singleton instance of HichchiMetadata

This function provides access to the global metadata storage system.
It ensures that only one instance of HichchiMetadata exists in the application,
creating it if it doesn't already exist.

#### Returns

[`HichchiMetadata`](#hichchimetadata)

The singleton instance of HichchiMetadata

#### Example

```typescript
// Register a DTO
hichchiMetadata().addValidationDto(UserDto, "user");

// Register an entity
hichchiMetadata().addEntity(User, "users", ["id"]);

// Store and retrieve custom metadata
hichchiMetadata().setMetadata(User, "isSearchable", true);
const isSearchable = hichchiMetadata().getMetadata<boolean>(
  User,
  "isSearchable",
);
```

#### See

[HichchiMetadata](#hichchimetadata) The class that provides metadata storage functionality

---

### httpExceptionFilter()

```ts
function httpExceptionFilter(exception, _request, logUnknown?): HttpException;
```

Defined in: [libs/nest-core/src/utils/exception.utils.ts:52](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/utils/exception.utils.ts#L52)

Filter and transform exceptions into standardized HttpException objects

This utility function processes exceptions and converts them into standardized
HttpException objects with consistent error response formats. It's primarily used
by the AllExceptionsFilter to ensure all errors returned by the API follow a
consistent structure.

The function handles different types of exceptions:

1. If the exception is already an HttpException with a properly formatted response,
   it preserves the original error details but ensures all required fields are present
2. For other HttpExceptions, it maps the status code to an appropriate error response
3. For unknown exceptions, it creates a generic error response

When logUnknown is true, unknown exceptions are logged using the LoggerService

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

`exception`

</td>
<td>

`unknown`

</td>
<td>

The exception object to process

</td>
</tr>
<tr>
<td>

`_request`

</td>
<td>

`Request`

</td>
<td>

The HTTP request object

</td>
</tr>
<tr>
<td>

`logUnknown?`

</td>
<td>

`boolean`

</td>
<td>

Whether to log unknown exceptions

</td>
</tr>
</tbody>
</table>

#### Returns

`HttpException`

A standardized HttpException object

#### Example

```typescript
// In an exception filter
catch(exception: unknown, host: ArgumentsHost): void {
  const ctx = host.switchToHttp();
  const request = ctx.getRequest<Request>();

  // Convert the exception to a standardized HttpException
  const httpException = httpExceptionFilter(exception, request, true);

  // Handle the standardized exception
  super.catch(httpException, host);
}
```

#### See

- [AllExceptionsFilter](#allexceptionsfilter) The filter that uses this utility
- ErrorResponse The standardized error response structure

---

### isJson()

```ts
function isJson(data): boolean;
```

Defined in: [libs/nest-core/src/logger/utils/logger.utils.ts:112](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/logger/utils/logger.utils.ts#L112)

Check if a string is valid JSON

This function attempts to parse a string as JSON and checks if it contains
at least one property. It's used to determine if a string should be treated
as JSON for formatting purposes.

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

`unknown`

</td>
<td>

The string to check

</td>
</tr>
</tbody>
</table>

#### Returns

`boolean`

True if the string is valid JSON, false otherwise

#### Example

```typescript
// Check if a string is valid JSON
if (isJson('{"name":"John","age":30}')) {
  console.log("Valid JSON");
}
```

#### See

[consoleFormat](#consoleformat) Function that uses this to format log output

---

### isOriginAllowed()

```ts
function isOriginAllowed(origin, allowedOrigins): boolean;
```

Defined in: [libs/nest-core/src/utils/utils.ts:38](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/utils/utils.ts#L38)

Check if a provided origin is allowed based on a list of allowed origins

This utility function determines if a given origin is allowed by comparing it against
a list of allowed origins. It supports both exact matching and wildcard patterns.
When an allowed origin contains a wildcard (\*), the function converts it to a regular
expression pattern for flexible matching.

This is particularly useful for implementing CORS (Cross-Origin Resource Sharing)
policies where you need to validate incoming request origins against a whitelist.

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

`origin`

</td>
<td>

`string`

</td>
<td>

The origin to check (e.g., "https://example.com")

</td>
</tr>
<tr>
<td>

`allowedOrigins`

</td>
<td>

`string`\[]

</td>
<td>

Array of allowed origins, which can include wildcards

</td>
</tr>
</tbody>
</table>

#### Returns

`boolean`

`true` if the origin is allowed, `false` otherwise

#### Examples

```typescript
// Check against exact origins
const allowed = isOriginAllowed("https://example.com", [
  "https://example.com",
  "https://api.example.com",
]);
// Returns true
```

```typescript
// Check using wildcard patterns
const allowed = isOriginAllowed("https://sub.example.com", [
  "https://*.example.com",
]);
// Returns true because the wildcard matches any subdomain
```

---

### isRandomHexToken()

```ts
function isRandomHexToken(value, lengthInBytes): boolean;
```

Defined in: [libs/nest-core/src/validators/random-hex.validator.ts:36](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/validators/random-hex.validator.ts#L36)

Validates if a value is a hexadecimal string of a specific length in bytes

This function checks if the provided value is a string, has the expected length
(where each byte is represented by 2 hexadecimal characters), and contains only
valid hexadecimal characters (0-9, a-f, A-F).

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

`value`

</td>
<td>

`unknown`

</td>
<td>

The value to validate

</td>
</tr>
<tr>
<td>

`lengthInBytes`

</td>
<td>

`number`

</td>
<td>

The expected length in bytes (each byte = 2 hex chars)

</td>
</tr>
</tbody>
</table>

#### Returns

`boolean`

True if the value is a valid hexadecimal string of the expected length

#### Example

```typescript
// Check if a value is a valid 16-byte (32-character) hexadecimal string
const isValid = isRandomHexToken("a1b2c3d4e5f67890a1b2c3d4e5f67890", 16);
// Returns true

// Check if a value is a valid 8-byte (16-character) hexadecimal string
const isValid = isRandomHexToken("invalid-value", 8);
// Returns false
```

---

### IsRandomHexToken()

```ts
function IsRandomHexToken(lengthInBytes, validationOptions?): PropertyDecorator;
```

Defined in: [libs/nest-core/src/validators/random-hex.validator.ts:72](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/validators/random-hex.validator.ts#L72)

Decorator that validates if a property is a hexadecimal string of a specific length

This decorator is used to validate that a property in a DTO is a valid hexadecimal
string with a specific length in bytes (where each byte is represented by 2 hexadecimal
characters). It's particularly useful for validating tokens, IDs, or other fixed-length
hexadecimal values.

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

`lengthInBytes`

</td>
<td>

`number`

</td>
<td>

The expected length in bytes (each byte = 2 hex chars)

</td>
</tr>
<tr>
<td>

`validationOptions?`

</td>
<td>

`ValidationOptions`

</td>
<td>

Optional validation options from class-validator

</td>
</tr>
</tbody>
</table>

#### Returns

`PropertyDecorator`

A property decorator function

#### Examples

```typescript
export class TokenDto {
  @IsRandomHexToken(16)
  token: string;
}
```

```typescript
export class UserDto {
  @IsRandomHexToken(32, {
    message: "User ID must be a valid 64-character hexadecimal string",
  })
  id: string;
}
```

#### See

[isRandomHexToken](#israndomhextoken) The underlying validation function

---

### IsVerifyToken()

```ts
function IsVerifyToken(validationOptions?): PropertyDecorator;
```

Defined in: [libs/nest-core/src/validators/verify-token.validator.ts:51](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/validators/verify-token.validator.ts#L51)

Decorator that validates if a property is a 32-character verification token

This decorator is used to validate that a property in a DTO is a valid hexadecimal
string with a fixed length of 16 bytes (32 hexadecimal characters). It's specifically
designed for validating verification tokens used in email verification, password reset,
and similar security-related features.

Unlike the more general IsRandomHexToken decorator, this decorator uses a fixed length
of 16 bytes, which is a common size for verification tokens that balances security
and usability.

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

`validationOptions?`

</td>
<td>

`ValidationOptions`

</td>
<td>

Optional validation options from class-validator

</td>
</tr>
</tbody>
</table>

#### Returns

`PropertyDecorator`

A property decorator function

#### Examples

```typescript
export class VerifyEmailDto {
  @IsVerifyToken()
  token: string;
}
```

```typescript
export class ResetPasswordDto {
  @IsVerifyToken({ message: "Invalid password reset token" })
  token: string;

  @IsString()
  @MinLength(8)
  newPassword: string;
}
```

#### See

[isRandomHexToken](#israndomhextoken) The underlying validation function

---

### MultiValueFormFieldTransformer()

```ts
function MultiValueFormFieldTransformer(params): string[];
```

Defined in: [libs/nest-core/src/transformers/multi-value-form-field.transformer.ts:25](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/transformers/multi-value-form-field.transformer.ts#L25)

Multi value form field transformer

A transformer to use in DTOs as a `TransformFn` for the `Transform` property decorator from the `class-transformer` package.

This transformer will transform a multi-value form field into an array of values or a single value into an array
with that value.This is useful when you have a form field that can accept multiple values, like a multi-select
field, and you want to ensure that the value is always an array even if there is only one value.

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

`params`

</td>
<td>

`TransformFnParams`

</td>
<td>

Parameters passed to the transformer

</td>
</tr>
</tbody>
</table>

#### Returns

`string`\[]

- An array of values

#### Example

```TypeScript
export class DTO {
   @Transform(MultiValueFormFieldTransformer)
   userIds: EntityId[];
}
```

---

### throwValidationErrors()

```ts
function throwValidationErrors(errors): never;
```

Defined in: [libs/nest-core/src/utils/validation.utils.ts:66](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/utils/validation.utils.ts#L66)

Throw a bad request exception with validation error messages

This function transforms validation errors into a flattened array of error messages
and throws a BadRequestException with these messages. It's useful for handling
validation failures in a consistent way across the application.

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

`errors`

</td>
<td>

`ValidationError`\[]

</td>
<td>

The validation errors to process

</td>
</tr>
</tbody>
</table>

#### Returns

`never`

This function never returns as it always throws an exception

#### Throws

Always throws with the transformed error messages

#### Example

```typescript
// Validate input and throw if invalid
const errors = await validate(userDto);
if (errors.length > 0) {
  throwValidationErrors(errors);
}
```

#### See

- transformErrors The helper function used to extract error messages
- BadRequestException The exception type thrown by this function

---

### toErrorObject()

```ts
function toErrorObject(str): ErrorResponse;
```

Defined in: [libs/nest-core/src/converters/error-message.converter.ts:75](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/converters/error-message.converter.ts#L75)

Convert error string to error object

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

`str`

</td>
<td>

`string`

</td>
<td>

JSON string

</td>
</tr>
</tbody>
</table>

#### Returns

`ErrorResponse`

Parsed object

#### Examples

```TypeScript
toErrorObject('{"message":"User exists!"}');

// Returns:
{
    statusCode: 500,
    code: "ERROR_500",
    message: "User exists"
}
```

```TypeScript
toErrorObject('{ "status": "409", "code": "USER_409_EXIST_EMAIL", "message": "User with email exists!" }');

// Returns:
{
    statusCode: 409,
    code: "USER_409_EXIST_EMAIL",
    message: "User with email exists!"
}
```

```TypeScript
toErrorObject('User with email exists!');

// Returns:
{
    statusCode: 500,
    code: "ERROR_500",
    message: "Internal Server Error!"
}
```

---

### toErrString()

```ts
function toErrString(errObj): object;
```

Defined in: [libs/nest-core/src/converters/error-message.converter.ts:27](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/converters/error-message.converter.ts#L27)

Convert the error object to a JSON string and return as the message

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

`errObj`

</td>
<td>

`ErrorResponse`

</td>
<td>

Error object

</td>
</tr>
</tbody>
</table>

#### Returns

`object`

Error message

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

`message`

</td>
<td>

`string`

</td>
<td>

[libs/nest-core/src/converters/error-message.converter.ts:27](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/converters/error-message.converter.ts#L27)

</td>
</tr>
</tbody>
</table>

#### Example

```TypeScript
toString({
    statusCode: 409,
    code: "USER_409_EXIST_EMAIL",
    message: "User exists!"
});

// Returns:
{
    message: '{"status":409,"code":"USER_409_EXIST_EMAIL","message":"User exists!"}'
}
```

---

### toJSON()

```ts
function toJSON<T>(string): T;
```

Defined in: [libs/nest-core/src/converters/json.converter.ts:71](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/converters/json.converter.ts#L71)

Converts a JSON string to a JavaScript object

This function safely parses a JSON string into a JavaScript object with
type inference through generics. If the parsing fails (e.g., due to invalid JSON),
it returns an empty object cast to the specified type.

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
<th>Default type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`T`

</td>
<td>

`any`

</td>
<td>

The expected type of the resulting object (defaults to any)

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

`string`

</td>
<td>

`string`

</td>
<td>

The JSON string to convert to an object

</td>
</tr>
</tbody>
</table>

#### Returns

`T`

The parsed object, or an empty object if parsing fails

#### Example

```typescript
// Basic usage with default typing
const jsonString = '{"name":"John","age":30}';
const data = toJSON(jsonString);
// data = { name: 'John', age: 30 }

// With explicit type parameter
interface User {
  id: number;
  name: string;
  email: string;
}

const jsonString = '{"id":1,"name":"John","email":"john@example.com"}';
const user = toJSON<User>(jsonString);
// user is typed as User

// Handling invalid JSON
const invalidJson = '{name:"John"'; // Missing closing brace
const result = toJSON(invalidJson);
// result = {}
```

#### See

[toString](#tostring) For the complementary function to convert objects to JSON strings

---

### toString()

```ts
function toString(object): string;
```

Defined in: [libs/nest-core/src/converters/json.converter.ts:26](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/converters/json.converter.ts#L26)

Converts a JavaScript object to a JSON string

This function safely converts any JavaScript object to its JSON string
representation. It handles non-object inputs by returning an empty object
string ("{}").

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

`object`

</td>
<td>

`unknown`

</td>
<td>

The object to convert to a JSON string

</td>
</tr>
</tbody>
</table>

#### Returns

`string`

A JSON string representation of the object, or "{}" for non-objects

#### Example

```typescript
// Converting a simple object
const data = { name: "John", age: 30 };
const json = toString(data);
// json = '{"name":"John","age":30}'

// Handling non-object values
const notAnObject = 42;
const json = toString(notAnObject);
// json = '{}'
```

#### See

[toJSON](#tojson) For the complementary function to convert JSON strings back to objects

---

### UseTransformInterceptor()

```ts
function UseTransformInterceptor(dto): MethodDecorator;
```

Defined in: [libs/nest-core/src/decorators/use-transform-interceptor.decorator.ts:53](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/decorators/use-transform-interceptor.decorator.ts#L53)

Method decorator that simplifies response transformation by applying the TransformInterceptor

This decorator provides a convenient way to transform API response data using a view DTO.
It wraps the NestJS `UseInterceptors` decorator and applies the `TransformInterceptor` with
the specified DTO, reducing boilerplate code and improving readability.

When applied to a controller method, this decorator will:

1. Create a new TransformInterceptor with the provided view DTO
2. Apply the interceptor to the method using NestJS's UseInterceptors
3. Automatically transform the method's response data according to the DTO's formatDataSet method

The decorator handles various response types including:

- Single objects
- Arrays of objects
- Paginated responses
- Null values

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

`dto`

</td>
<td>

[`IViewDto`](#iviewdto)

</td>
<td>

The View DTO instance that defines how to transform the response data.
Must implement the IViewDto interface with a formatDataSet method.

</td>
</tr>
</tbody>
</table>

#### Returns

`MethodDecorator`

A method decorator that applies the transformation logic to the decorated method

#### Example

```TypeScript
@Controller("user")
export class UserController {
    @Get()
    @UseTransformInterceptor(new ViewUserDto())
    async getUsers(): Promise<User[]> {
        // The raw User[] returned here will be automatically
        // transformed using ViewUserDto.formatDataSet()
        return this.userService.findAll();
    }

    @Get(':id')
    @UseTransformInterceptor(new ViewUserDto())
    async getUser(@Param('id') id: string): Promise<User> {
        // The single User object will be transformed
        return this.userService.findById(id);
    }
}
```

#### See

- [TransformInterceptor](#transforminterceptor) The interceptor that performs the actual transformation
- [IViewDto](#iviewdto) The interface that view DTOs must implement

---

### validateDto()

```ts
function validateDto<T, V, Thr>(
  dto,
  obj,
  throwErrors?,
): Promise<true extends Thr ? T : ValidationError[] | T>;
```

Defined in: [libs/nest-core/src/utils/validation.utils.ts:122](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/utils/validation.utils.ts#L122)

Validate a plain object against a DTO class using class-validator

This function transforms a plain object into an instance of the specified DTO class
and validates it using class-validator. It can either throw an exception on validation
failure or return the validation errors, depending on the throwErrors parameter.

The function uses plainToInstance from class-transformer to convert the plain object
to a class instance before validation, ensuring all class-validator decorators are applied.

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
<th>Default type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`T`

</td>
<td>

‐

</td>
<td>

The DTO class type

</td>
</tr>
<tr>
<td>

`V`

</td>
<td>

`object`

</td>
<td>

The plain object type (defaults to object)

</td>
</tr>
<tr>
<td>

`Thr`

</td>
<td>

`false`

</td>
<td>

Boolean type for throwErrors parameter (for type inference)

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

`dto`

</td>
<td>

`ClassConstructor`<`T`>

</td>
<td>

The DTO class to validate against

</td>
</tr>
<tr>
<td>

`obj`

</td>
<td>

`V`

</td>
<td>

The plain object to validate

</td>
</tr>
<tr>
<td>

`throwErrors?`

</td>
<td>

`boolean` | `Thr`

</td>
<td>

Whether to throw exceptions on validation failure

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`<`true` _extends_ `Thr` ? `T` : `ValidationError`\[] | `T`>

A promise that resolves to either:

- The validated DTO instance (if validation succeeds)
- An array of ValidationError objects (if validation fails and throwErrors is false)

#### Throws

If validation fails and throwErrors is true

#### Examples

```typescript
// Validate without throwing (returns errors or instance)
const result = await validateDto(CreateUserDto, requestBody);
if (Array.isArray(result)) {
  // Handle validation errors
  return { success: false, errors: result };
} else {
  // Use the validated DTO instance
  return userService.create(result);
}
```

```typescript
// Validate with automatic error throwing
try {
  const validatedDto = await validateDto(CreateUserDto, requestBody, true);
  return userService.create(validatedDto);
} catch (error) {
  // Handle the BadRequestException
  logger.error("Validation failed", error);
  throw error;
}
```

#### See

- plainToInstance The class-transformer function used for object conversion
- validate The class-validator function used for validation

---

### validationPipeExceptionFactory()

```ts
function validationPipeExceptionFactory(errors): BadRequestException;
```

Defined in: [libs/nest-core/src/utils/validation.utils.ts:259](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/utils/validation.utils.ts#L259)

Custom exception factory for NestJS ValidationPipe

This function creates a standardized BadRequestException from validation errors.
It's designed to be used as an exceptionFactory for NestJS ValidationPipe,
providing consistent error responses across the application.

The function takes the first validation error from the array and passes it to
generateValidationErrorResponse to create a standardized error response structure.
This ensures that all validation errors returned by the API have a consistent format.

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

`errors`

</td>
<td>

`ValidationError`\[]

</td>
<td>

The validation errors from ValidationPipe

</td>
</tr>
</tbody>
</table>

#### Returns

`BadRequestException`

A BadRequestException with standardized error details

#### Examples

```typescript
// In your bootstrap function or app module
import { ValidationPipe } from "@nestjs/common";
import { validationPipeExceptionFactory } from "@hichchi/nest-core";

// Apply globally in bootstrap function
async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      exceptionFactory: validationPipeExceptionFactory,
    }),
  );

  await app.listen(3000);
}
```

```typescript
// Or in your AppModule
@Module({
  providers: [
    {
      provide: APP_PIPE,
      useFactory: () =>
        new ValidationPipe({
          transform: true,
          whitelist: true,
          exceptionFactory: validationPipeExceptionFactory,
        }),
    },
  ],
})
export class AppModule {}
```

#### See

[generateValidationErrorResponse](#generatevalidationerrorresponse) The function used to create the error response

## Interfaces

### Colorizer()

Defined in: [libs/nest-core/src/logger/interfaces/logger.interfaces.ts:160](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/logger/interfaces/logger.interfaces.ts#L160)

Function that colorizes text

This interface defines a function type that applies ANSI color codes
to text strings for terminal output.

#### Example

```typescript
// Define a colorizer function
const redColorizer: Colorizer = (text) => `\x1B[31m${text}\x1B[39m`;

// Use the colorizer
console.log(redColorizer("This text will be red"));
```

#### See

- [ColorScheme](#colorscheme) Collection of colorizers for different log levels
- [clc](#clc) Object containing predefined colorizer functions

```ts
Colorizer(text): string;
```

Defined in: [libs/nest-core/src/logger/interfaces/logger.interfaces.ts:161](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/logger/interfaces/logger.interfaces.ts#L161)

Function that colorizes text

This interface defines a function type that applies ANSI color codes
to text strings for terminal output.

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

`text`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

#### Returns

`string`

#### Example

```typescript
// Define a colorizer function
const redColorizer: Colorizer = (text) => `\x1B[31m${text}\x1B[39m`;

// Use the colorizer
console.log(redColorizer("This text will be red"));
```

#### See

- [ColorScheme](#colorscheme) Collection of colorizers for different log levels
- [clc](#clc) Object containing predefined colorizer functions

---

### ColorScheme

Defined in: [libs/nest-core/src/logger/interfaces/logger.interfaces.ts:185](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/logger/interfaces/logger.interfaces.ts#L185)

Color scheme for different log levels

This interface defines a mapping of log levels to colorizer functions,
allowing different log levels to be displayed in different colors.

#### Example

```typescript
// Define a custom color scheme
const myColorScheme: ColorScheme = {
  info: clc.blue,
  warn: clc.yellow,
  error: clc.red,
  debug: clc.magentaBright,
};
```

#### See

- [Colorizer](#colorizer) Function type for colorizing text
- [colorScheme](#colorscheme-1) Default color scheme used by the logger
- LogLevel Type defining possible log levels

#### Indexable

```ts
[level: string]: Colorizer
```

---

### CommonRedisOptions

Defined in: [libs/nest-core/src/interfaces/redis-options.interface.ts:8](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/interfaces/redis-options.interface.ts#L8)

Common Redis configuration options shared across different connection methods.

This interface defines the shared configuration properties used by all Redis
connection types in the application. These options control caching behavior
and key management regardless of how the Redis connection is established.

#### Extended by

- [`RedisOptionsWithUrl`](#redisoptionswithurl)
- [`RedisOptionsWithHost`](#redisoptionswithhost)

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

<a id="property-lrusize"></a> `lruSize?`

</td>
<td>

`number`

</td>
<td>

Maximum size for Least Recently Used (LRU) cache in memory.

Controls the maximum number of items to keep in the LRU cache
before evicting the least recently used items. This is useful
for limiting memory usage while keeping frequently accessed
items in cache.

**Example**

```ts
lruSize: 1000; // Keep at most 1000 items in cache
```

</td>
<td>

[libs/nest-core/src/interfaces/redis-options.interface.ts:45](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/interfaces/redis-options.interface.ts#L45)

</td>
</tr>
<tr>
<td>

<a id="property-prefix"></a> `prefix?`

</td>
<td>

`string`

</td>
<td>

Optional prefix to prepend to all keys stored in Redis.

Using a prefix allows for namespace isolation, which is useful for:

- Separating keys from different applications using the same Redis instance
- Creating logical separation between different modules or features
- Simplifying key management and cleanup

**Example**

```ts
prefix: "app:user:"; // Results in keys like 'app:user:123'
```

</td>
<td>

[libs/nest-core/src/interfaces/redis-options.interface.ts:20](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/interfaces/redis-options.interface.ts#L20)

</td>
</tr>
<tr>
<td>

<a id="property-ttl"></a> `ttl?`

</td>
<td>

`number`

</td>
<td>

Default Time-To-Live (TTL) in seconds for cached items.

Sets the default expiration time for keys. After this period,
Redis will automatically remove the key. This helps prevent
stale data and manages memory usage.

**Example**

```ts
ttl: 3600; // Keys expire after 1 hour
```

</td>
<td>

[libs/nest-core/src/interfaces/redis-options.interface.ts:32](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/interfaces/redis-options.interface.ts#L32)

</td>
</tr>
</tbody>
</table>

---

### InfoObject

Defined in: [libs/nest-core/src/logger/interfaces/logger.interfaces.ts:104](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/logger/interfaces/logger.interfaces.ts#L104)

Represents metadata that can be attached to a log entry

This interface defines the structure of metadata objects that can be
attached to log entries. It includes optional error information and
custom log level, plus any additional key-value pairs.

#### Example

```typescript
// Create metadata for a log entry
const metadata: InfoObject = {
  customLogLevel: "debug",
  userId: "123",
  requestId: "abc-456",
  error: { name: "ValidationError", stack: "..." },
};
```

#### See

- LoggerService.prepareLogParams Method that processes metadata
- LogLevel Type defining possible log levels
- [LogEntry](#logentry) The log entry that this metadata is attached to

#### Indexable

```ts
[key: string]: unknown
```

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

<a id="property-error"></a> `error?`

</td>
<td>

`object`

</td>
<td>

[libs/nest-core/src/logger/interfaces/logger.interfaces.ts:106](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/logger/interfaces/logger.interfaces.ts#L106)

</td>
</tr>
<tr>
<td>

`error.message?`

</td>
<td>

`string`

</td>
<td>

[libs/nest-core/src/logger/interfaces/logger.interfaces.ts:106](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/logger/interfaces/logger.interfaces.ts#L106)

</td>
</tr>
<tr>
<td>

`error.name?`

</td>
<td>

`string`

</td>
<td>

[libs/nest-core/src/logger/interfaces/logger.interfaces.ts:106](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/logger/interfaces/logger.interfaces.ts#L106)

</td>
</tr>
<tr>
<td>

`error.stack?`

</td>
<td>

`string`

</td>
<td>

[libs/nest-core/src/logger/interfaces/logger.interfaces.ts:106](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/logger/interfaces/logger.interfaces.ts#L106)

</td>
</tr>
<tr>
<td>

<a id="property-loglevel"></a> `logLevel`

</td>
<td>

`LogLevel`

</td>
<td>

[libs/nest-core/src/logger/interfaces/logger.interfaces.ts:105](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/logger/interfaces/logger.interfaces.ts#L105)

</td>
</tr>
</tbody>
</table>

---

### IViewDto

Defined in: [libs/nest-core/src/interfaces/view-dto.interface.ts:58](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/interfaces/view-dto.interface.ts#L58)

Interface for Data Transfer Objects (DTOs) that transform data for presentation.

The `IViewDto` interface defines a contract for DTOs that are responsible for
formatting and transforming data from internal models or entities into a structure
suitable for client presentation. This interface enables a clean separation between
internal data representations and the data exposed through APIs.

This interface uses generic type parameters to provide type safety throughout the
transformation process:

- `T`: The input data type (typically an entity or internal model)
- `R`: The output data type (the transformed view representation)

By implementing this interface, DTOs can standardize how data transformations
are performed across an application, ensuring consistency in API responses
and making the transformation logic explicit and testable.

#### Example

```typescript
// Entity from database
class User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string; // Sensitive field
  createdAt: Date;
  updatedAt: Date;
}

// DTO for API responses
class UserViewDto implements IViewDto<User, UserView> {
  formatDataSet(user?: User): UserView | null {
    if (!user) return null;

    return {
      id: user.id,
      fullName: `${user.firstName} ${user.lastName}`,
      email: user.email,
      joinedOn: user.createdAt.toISOString().split('T')[0]
      // Note: password and other sensitive fields are excluded
    };
  }
}

// In a controller
@Get(':id')
async getUser(@Param('id') id: number) {
  const user = await this.userService.findById(id);
  const userViewDto = new UserViewDto();
  return userViewDto.formatDataSet(user);
}
```

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
<th>Default type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`T`

</td>
<td>

`unknown`

</td>
<td>

The input data type to be transformed (defaults to unknown)

</td>
</tr>
<tr>
<td>

`R`

</td>
<td>

`unknown`

</td>
<td>

The output data type after transformation (defaults to unknown)

</td>
</tr>
</tbody>
</table>

#### Methods

##### formatDataSet()

```ts
formatDataSet(data?): R | null;
```

Defined in: [libs/nest-core/src/interfaces/view-dto.interface.ts:93](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/interfaces/view-dto.interface.ts#L93)

Transforms input data into a view-friendly format.

This method is responsible for converting the internal data representation
(of type T) into a format suitable for client consumption (of type R).
The transformation can include:

- Excluding sensitive or internal-only fields
- Renaming fields to be more user-friendly
- Combining multiple fields into more meaningful representations
- Formatting dates, numbers, or other values for presentation
- Adding computed properties derived from the input data

If the input data is undefined or otherwise invalid, the method should
typically return null to indicate no data is available for formatting.

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

`data?`

</td>
<td>

`T` | `null`

</td>
<td>

The input data to transform. May be undefined if no data is available.

</td>
</tr>
</tbody>
</table>

###### Returns

`R` | `null`

The transformed data object of type R, or null if input data is unavailable or invalid.

###### Example

```ts
formatDataSet(user): UserView | null {
  if (!user) return null;

  return {
    id: user.id,
    displayName: user.displayName || `${user.firstName} ${user.lastName}`,
    contactInfo: {
      email: user.email,
      phone: user.phoneFormatted
    },
    memberSince: formatDate(user.createdAt)
  };
}
```

---

### LogEntry

Defined in: [libs/nest-core/src/logger/interfaces/logger.interfaces.ts:133](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/logger/interfaces/logger.interfaces.ts#L133)

Represents a log entry

This interface defines the structure of a log entry in the system.
It includes the log level, message, context, timestamp, and duration,
plus any additional properties.

#### Example

```typescript
// A typical log entry
const entry: LogEntry = {
  level: "info",
  message: "User logged in",
  context: "AuthService",
  timestamp: "2023-05-15 14:30:45",
  ms: "25ms",
};
```

#### See

- [LoggerService](#loggerservice) Service that creates log entries
- [InfoObject](#infoobject) Metadata that can be attached to log entries
- [consoleFormat](#consoleformat) Function that formats log entries for display

#### Indexable

```ts
[key: string]: unknown
```

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

<a id="property-context"></a> `context?`

</td>
<td>

`string`

</td>
<td>

[libs/nest-core/src/logger/interfaces/logger.interfaces.ts:136](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/logger/interfaces/logger.interfaces.ts#L136)

</td>
</tr>
<tr>
<td>

<a id="property-level-1"></a> `level`

</td>
<td>

`string`

</td>
<td>

[libs/nest-core/src/logger/interfaces/logger.interfaces.ts:134](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/logger/interfaces/logger.interfaces.ts#L134)

</td>
</tr>
<tr>
<td>

<a id="property-message-2"></a> `message?`

</td>
<td>

`string`

</td>
<td>

[libs/nest-core/src/logger/interfaces/logger.interfaces.ts:135](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/logger/interfaces/logger.interfaces.ts#L135)

</td>
</tr>
<tr>
<td>

<a id="property-ms"></a> `ms?`

</td>
<td>

`string`

</td>
<td>

[libs/nest-core/src/logger/interfaces/logger.interfaces.ts:138](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/logger/interfaces/logger.interfaces.ts#L138)

</td>
</tr>
<tr>
<td>

<a id="property-timestamp"></a> `timestamp?`

</td>
<td>

`string`

</td>
<td>

[libs/nest-core/src/logger/interfaces/logger.interfaces.ts:137](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/logger/interfaces/logger.interfaces.ts#L137)

</td>
</tr>
</tbody>
</table>

---

### LoggerOptions

Defined in: [libs/nest-core/src/logger/interfaces/logger.interfaces.ts:25](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/logger/interfaces/logger.interfaces.ts#L25)

Logger configuration options

This interface defines the configuration options for the logger service.
It allows customization of log appearance, output format, and file paths.

#### Example

```typescript
// Configure the logger with custom options
LoggerService.configure({
  appName: "MyApp",
  level: "debug",
  logsDir: "custom/logs/path",
  colors: true,
  prettyPrint: true,
});
```

#### See

- [LoggerService](#loggerservice) The service that uses these options
- [LoggerService.configure](#configure-1) Method to set these options
- LoggerService.defaultOptions Default values for these options

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

<a id="property-appname"></a> `appName?`

</td>
<td>

`string`

</td>
<td>

Application name to display in logs

</td>
<td>

[libs/nest-core/src/logger/interfaces/logger.interfaces.ts:29](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/logger/interfaces/logger.interfaces.ts#L29)

</td>
</tr>
<tr>
<td>

<a id="property-colors"></a> `colors?`

</td>
<td>

`boolean`

</td>
<td>

Whether to use colors in console output

</td>
<td>

[libs/nest-core/src/logger/interfaces/logger.interfaces.ts:49](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/logger/interfaces/logger.interfaces.ts#L49)

</td>
</tr>
<tr>
<td>

<a id="property-errorlogfilename"></a> `errorLogFilename?`

</td>
<td>

`string`

</td>
<td>

Filename for error logs

</td>
<td>

[libs/nest-core/src/logger/interfaces/logger.interfaces.ts:44](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/logger/interfaces/logger.interfaces.ts#L44)

</td>
</tr>
<tr>
<td>

<a id="property-level-2"></a> `level?`

</td>
<td>

`LogLevel`

</td>
<td>

Log level

</td>
<td>

[libs/nest-core/src/logger/interfaces/logger.interfaces.ts:34](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/logger/interfaces/logger.interfaces.ts#L34)

</td>
</tr>
<tr>
<td>

<a id="property-logsdir"></a> `logsDir?`

</td>
<td>

`string`

</td>
<td>

Path to the logs directory

</td>
<td>

[libs/nest-core/src/logger/interfaces/logger.interfaces.ts:39](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/logger/interfaces/logger.interfaces.ts#L39)

</td>
</tr>
<tr>
<td>

<a id="property-meta"></a> `meta?`

</td>
<td>

`boolean`

</td>
<td>

Whether to display metadata in logs

</td>
<td>

[libs/nest-core/src/logger/interfaces/logger.interfaces.ts:74](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/logger/interfaces/logger.interfaces.ts#L74)

</td>
</tr>
<tr>
<td>

<a id="property-prettyprint"></a> `prettyPrint?`

</td>
<td>

`boolean`

</td>
<td>

Whether to pretty-print objects in logs

</td>
<td>

[libs/nest-core/src/logger/interfaces/logger.interfaces.ts:54](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/logger/interfaces/logger.interfaces.ts#L54)

</td>
</tr>
<tr>
<td>

<a id="property-processid"></a> `processId?`

</td>
<td>

`boolean`

</td>
<td>

Whether to display process ID in logs

</td>
<td>

[libs/nest-core/src/logger/interfaces/logger.interfaces.ts:59](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/logger/interfaces/logger.interfaces.ts#L59)

</td>
</tr>
<tr>
<td>

<a id="property-showappname"></a> `showAppName?`

</td>
<td>

`boolean`

</td>
<td>

Whether to display application name in logs

</td>
<td>

[libs/nest-core/src/logger/interfaces/logger.interfaces.ts:64](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/logger/interfaces/logger.interfaces.ts#L64)

</td>
</tr>
<tr>
<td>

<a id="property-stack-2"></a> `stack?`

</td>
<td>

`boolean`

</td>
<td>

Whether to display stack traces in logs

</td>
<td>

[libs/nest-core/src/logger/interfaces/logger.interfaces.ts:69](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/logger/interfaces/logger.interfaces.ts#L69)

</td>
</tr>
<tr>
<td>

<a id="property-timestampformat"></a> `timestampFormat?`

</td>
<td>

`string`

</td>
<td>

Format for timestamps

</td>
<td>

[libs/nest-core/src/logger/interfaces/logger.interfaces.ts:79](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/logger/interfaces/logger.interfaces.ts#L79)

</td>
</tr>
</tbody>
</table>

---

### MulterFile

Defined in: [libs/nest-core/src/interfaces/multer-file.ts:35](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/interfaces/multer-file.ts#L35)

Interface representing a file uploaded via Multer middleware in NestJS.

The `MulterFile` interface defines the structure of file objects created by the
Multer middleware when handling file uploads in a NestJS application. This interface
represents files processed in memory storage mode (not disk storage).

Multer is the recommended middleware for handling multipart/form-data in NestJS,
which is primarily used for file uploads. This interface provides type safety when
working with the uploaded files throughout the application.

#### Remarks

This interface specifically represents files processed with memory storage.
When using disk storage, the object will also include properties like `filename`
and `path` instead of `buffer`.

#### Example

```typescript
// In a controller using FileInterceptor
@Post('upload')
@UseInterceptors(FileInterceptor('file'))
uploadFile(@UploadedFile() file: MulterFile) {
  console.log(`Received file: ${file.originalname}`);
  console.log(`Size: ${file.size} bytes`);
  console.log(`Type: ${file.mimetype}`);

  // Process the file buffer
  // For example, upload to cloud storage
  return this.fileService.uploadToStorage(file);
}
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

<a id="property-buffer"></a> `buffer`

</td>
<td>

`Buffer`

</td>
<td>

The file data as a Buffer object.

This contains the binary content of the uploaded file. When using memory
storage (as opposed to disk storage), Multer provides the entire file as
a Buffer in this property.

**Example**

```ts
buffer: <Buffer ff d8 ff e0 00 10 4a 46 49 46 00 01 ...>
```

</td>
<td>

[libs/nest-core/src/interfaces/multer-file.ts:90](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/interfaces/multer-file.ts#L90)

</td>
</tr>
<tr>
<td>

<a id="property-encoding"></a> `encoding`

</td>
<td>

`string`

</td>
<td>

The encoding type of the file.

This property specifies how the file was encoded during transmission.

**Example**

```ts
encoding: "7bit";
```

</td>
<td>

[libs/nest-core/src/interfaces/multer-file.ts:66](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/interfaces/multer-file.ts#L66)

</td>
</tr>
<tr>
<td>

<a id="property-fieldname"></a> `fieldname`

</td>
<td>

`string`

</td>
<td>

The name of the form field associated with this file.

This corresponds to the `name` attribute of the file input element
in the HTML form or the key used in FormData when uploading programmatically.

**Example**

```ts
fieldname: "profilePicture";
```

</td>
<td>

[libs/nest-core/src/interfaces/multer-file.ts:45](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/interfaces/multer-file.ts#L45)

</td>
</tr>
<tr>
<td>

<a id="property-mimetype"></a> `mimetype`

</td>
<td>

`string`

</td>
<td>

The MIME type of the file.

The MIME (Multipurpose Internet Mail Extensions) type identifies the
format of the file. This can be used for validation and determining how
to process the file.

**Example**

```ts
mimetype: "image/jpeg";
```

</td>
<td>

[libs/nest-core/src/interfaces/multer-file.ts:78](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/interfaces/multer-file.ts#L78)

</td>
</tr>
<tr>
<td>

<a id="property-originalname"></a> `originalname`

</td>
<td>

`string`

</td>
<td>

The original filename of the uploaded file on the user's device.

This is the name of the file as it existed on the client's computer
before uploading, including the file extension.

**Example**

```ts
originalname: "vacation-photo.jpg";
```

</td>
<td>

[libs/nest-core/src/interfaces/multer-file.ts:56](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/interfaces/multer-file.ts#L56)

</td>
</tr>
<tr>
<td>

<a id="property-size"></a> `size`

</td>
<td>

`number`

</td>
<td>

The size of the file in bytes.

This represents the total size of the uploaded file, which can be used
for validation or informational purposes.

**Example**

```ts
size: 1048576; // 1MB file
```

</td>
<td>

[libs/nest-core/src/interfaces/multer-file.ts:101](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/interfaces/multer-file.ts#L101)

</td>
</tr>
</tbody>
</table>

---

### NestLikeFormatOptions

Defined in: [libs/nest-core/src/logger/interfaces/logger.interfaces.ts:212](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/logger/interfaces/logger.interfaces.ts#L212)

Options for NestJS-like console format

This interface defines options for formatting log output in a style
similar to NestJS's default logger.

#### Example

```typescript
// Configure console format options
const formatOptions: NestLikeFormatOptions = {
  colors: true,
  prettyPrint: true,
  processId: true,
  appName: true,
  stack: true,
  meta: false,
};
```

#### See

- [consoleFormat](#consoleformat) Function that uses these options
- [defaultOptions](#defaultoptions) Default values for these options
- [LoggerOptions](#loggeroptions) Related logger configuration options

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

<a id="property-appname-1"></a> `appName?`

</td>
<td>

`boolean`

</td>
<td>

[libs/nest-core/src/logger/interfaces/logger.interfaces.ts:216](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/logger/interfaces/logger.interfaces.ts#L216)

</td>
</tr>
<tr>
<td>

<a id="property-colors-1"></a> `colors?`

</td>
<td>

`boolean`

</td>
<td>

[libs/nest-core/src/logger/interfaces/logger.interfaces.ts:213](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/logger/interfaces/logger.interfaces.ts#L213)

</td>
</tr>
<tr>
<td>

<a id="property-meta-1"></a> `meta?`

</td>
<td>

`boolean`

</td>
<td>

[libs/nest-core/src/logger/interfaces/logger.interfaces.ts:218](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/logger/interfaces/logger.interfaces.ts#L218)

</td>
</tr>
<tr>
<td>

<a id="property-prettyprint-1"></a> `prettyPrint?`

</td>
<td>

`boolean`

</td>
<td>

[libs/nest-core/src/logger/interfaces/logger.interfaces.ts:214](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/logger/interfaces/logger.interfaces.ts#L214)

</td>
</tr>
<tr>
<td>

<a id="property-processid-1"></a> `processId?`

</td>
<td>

`boolean`

</td>
<td>

[libs/nest-core/src/logger/interfaces/logger.interfaces.ts:215](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/logger/interfaces/logger.interfaces.ts#L215)

</td>
</tr>
<tr>
<td>

<a id="property-stack-3"></a> `stack?`

</td>
<td>

`boolean`

</td>
<td>

[libs/nest-core/src/logger/interfaces/logger.interfaces.ts:217](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/logger/interfaces/logger.interfaces.ts#L217)

</td>
</tr>
</tbody>
</table>

---

### RedisOptionsWithHost

Defined in: [libs/nest-core/src/interfaces/redis-options.interface.ts:105](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/interfaces/redis-options.interface.ts#L105)

Redis configuration using individual connection parameters.

This interface extends CommonRedisOptions to provide detailed control
over the Redis connection parameters. This approach is useful when
connection details are available as separate configuration values
or when more explicit control over the connection is needed.

#### Example

```typescript
// In a module configuration
const redisOptions: RedisOptionsWithHost = {
  host: "redis.example.com",
  port: 6379,
  username: "default",
  password: "secret",
  prefix: "myapp:",
  ttl: 3600,
};
```

#### Extends

- [`CommonRedisOptions`](#commonredisoptions)

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

<a id="property-host"></a> `host`

</td>
<td>

`string`

</td>
<td>

Redis server hostname or IP address.

The domain name or IP address of the Redis server to connect to.

**Examples**

```ts
host: "redis.example.com";
```

```ts
host: "10.0.0.12";
```

</td>
<td>

‐

</td>
<td>

[libs/nest-core/src/interfaces/redis-options.interface.ts:116](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/interfaces/redis-options.interface.ts#L116)

</td>
</tr>
<tr>
<td>

<a id="property-lrusize-1"></a> `lruSize?`

</td>
<td>

`number`

</td>
<td>

Maximum size for Least Recently Used (LRU) cache in memory.

Controls the maximum number of items to keep in the LRU cache
before evicting the least recently used items. This is useful
for limiting memory usage while keeping frequently accessed
items in cache.

**Example**

```ts
lruSize: 1000; // Keep at most 1000 items in cache
```

</td>
<td>

[`CommonRedisOptions`](#commonredisoptions).[`lruSize`](#property-lrusize)

</td>
<td>

[libs/nest-core/src/interfaces/redis-options.interface.ts:45](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/interfaces/redis-options.interface.ts#L45)

</td>
</tr>
<tr>
<td>

<a id="property-password"></a> `password?`

</td>
<td>

`string`

</td>
<td>

Redis server authentication password.

The password to use when authenticating with the Redis server.
Required if the Redis server has password authentication enabled.

**Example**

```ts
password: "your-secure-password";
```

</td>
<td>

‐

</td>
<td>

[libs/nest-core/src/interfaces/redis-options.interface.ts:139](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/interfaces/redis-options.interface.ts#L139)

</td>
</tr>
<tr>
<td>

<a id="property-port"></a> `port?`

</td>
<td>

`number`

</td>
<td>

Redis server port number.

The TCP port on which the Redis server is listening.
If not specified, defaults to the standard Redis port (6379).

**Default**

```ts
6379;
```

**Example**

```ts
port: 6380;
```

</td>
<td>

‐

</td>
<td>

[libs/nest-core/src/interfaces/redis-options.interface.ts:128](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/interfaces/redis-options.interface.ts#L128)

</td>
</tr>
<tr>
<td>

<a id="property-prefix-1"></a> `prefix?`

</td>
<td>

`string`

</td>
<td>

Optional prefix to prepend to all keys stored in Redis.

Using a prefix allows for namespace isolation, which is useful for:

- Separating keys from different applications using the same Redis instance
- Creating logical separation between different modules or features
- Simplifying key management and cleanup

**Example**

```ts
prefix: "app:user:"; // Results in keys like 'app:user:123'
```

</td>
<td>

[`CommonRedisOptions`](#commonredisoptions).[`prefix`](#property-prefix)

</td>
<td>

[libs/nest-core/src/interfaces/redis-options.interface.ts:20](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/interfaces/redis-options.interface.ts#L20)

</td>
</tr>
<tr>
<td>

<a id="property-ttl-1"></a> `ttl?`

</td>
<td>

`number`

</td>
<td>

Default Time-To-Live (TTL) in seconds for cached items.

Sets the default expiration time for keys. After this period,
Redis will automatically remove the key. This helps prevent
stale data and manages memory usage.

**Example**

```ts
ttl: 3600; // Keys expire after 1 hour
```

</td>
<td>

[`CommonRedisOptions`](#commonredisoptions).[`ttl`](#property-ttl)

</td>
<td>

[libs/nest-core/src/interfaces/redis-options.interface.ts:32](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/interfaces/redis-options.interface.ts#L32)

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

Redis server authentication username.

The username to use when authenticating with the Redis server.
Required for Redis servers version 6.0+ that use ACL-based authentication.

**Example**

```ts
username: "admin";
```

</td>
<td>

‐

</td>
<td>

[libs/nest-core/src/interfaces/redis-options.interface.ts:150](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/interfaces/redis-options.interface.ts#L150)

</td>
</tr>
</tbody>
</table>

---

### RedisOptionsWithUrl

Defined in: [libs/nest-core/src/interfaces/redis-options.interface.ts:66](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/interfaces/redis-options.interface.ts#L66)

Redis configuration using a connection URL string.

This interface extends CommonRedisOptions to provide a simple way to
configure Redis using a connection URL, which is convenient for environments
where connection details are provided as a single connection string
(like in many cloud hosting platforms).

#### Example

```typescript
// In a module configuration
const redisOptions: RedisOptionsWithUrl = {
  url: "redis://username:password@redis.example.com:6379",
  prefix: "myapp:",
  ttl: 3600,
};
```

#### Extends

- [`CommonRedisOptions`](#commonredisoptions)

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

<a id="property-lrusize-2"></a> `lruSize?`

</td>
<td>

`number`

</td>
<td>

Maximum size for Least Recently Used (LRU) cache in memory.

Controls the maximum number of items to keep in the LRU cache
before evicting the least recently used items. This is useful
for limiting memory usage while keeping frequently accessed
items in cache.

**Example**

```ts
lruSize: 1000; // Keep at most 1000 items in cache
```

</td>
<td>

[`CommonRedisOptions`](#commonredisoptions).[`lruSize`](#property-lrusize)

</td>
<td>

[libs/nest-core/src/interfaces/redis-options.interface.ts:45](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/interfaces/redis-options.interface.ts#L45)

</td>
</tr>
<tr>
<td>

<a id="property-prefix-2"></a> `prefix?`

</td>
<td>

`string`

</td>
<td>

Optional prefix to prepend to all keys stored in Redis.

Using a prefix allows for namespace isolation, which is useful for:

- Separating keys from different applications using the same Redis instance
- Creating logical separation between different modules or features
- Simplifying key management and cleanup

**Example**

```ts
prefix: "app:user:"; // Results in keys like 'app:user:123'
```

</td>
<td>

[`CommonRedisOptions`](#commonredisoptions).[`prefix`](#property-prefix)

</td>
<td>

[libs/nest-core/src/interfaces/redis-options.interface.ts:20](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/interfaces/redis-options.interface.ts#L20)

</td>
</tr>
<tr>
<td>

<a id="property-ttl-2"></a> `ttl?`

</td>
<td>

`number`

</td>
<td>

Default Time-To-Live (TTL) in seconds for cached items.

Sets the default expiration time for keys. After this period,
Redis will automatically remove the key. This helps prevent
stale data and manages memory usage.

**Example**

```ts
ttl: 3600; // Keys expire after 1 hour
```

</td>
<td>

[`CommonRedisOptions`](#commonredisoptions).[`ttl`](#property-ttl)

</td>
<td>

[libs/nest-core/src/interfaces/redis-options.interface.ts:32](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/interfaces/redis-options.interface.ts#L32)

</td>
</tr>
<tr>
<td>

<a id="property-url"></a> `url`

</td>
<td>

`string`

</td>
<td>

Redis connection URL string.

A fully qualified URL that includes all necessary connection parameters.
The URL should follow the format: redis://\[username:password@]host\[:port]\[/db-number]

For Redis clusters, specialized URL formats may be required based on the client library.
For TLS/SSL connections, use the rediss:// protocol prefix.

**Examples**

```ts
url: "redis://default:password123@redis-server.example.com:6379/0";
```

```ts
url: "rediss://redis.example.com:6379"; // SSL/TLS connection
```

</td>
<td>

‐

</td>
<td>

[libs/nest-core/src/interfaces/redis-options.interface.ts:81](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/interfaces/redis-options.interface.ts#L81)

</td>
</tr>
</tbody>
</table>

## Type Aliases

### LogParam

```ts
type LogParam =
  | string
  | number
  | boolean
  | object
  | Error
  | null
  | undefined
  | unknown;
```

Defined in: [libs/nest-core/src/logger/types/logger.types.ts:21](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/logger/types/logger.types.ts#L21)

Represents a parameter that can be passed to a log method

This type encompasses all possible parameter types that can be passed to
logging methods. It allows for flexible logging of various data types.

#### Example

```typescript
// Examples of valid LogParam values
logger.log("Simple string message");
logger.log(123);
logger.log(true);
logger.log({ userId: 123, action: "login" });
logger.log(new Error("Something went wrong"));
logger.log(null);
```

#### See

- [LoggerService](#loggerservice) Service that accepts these parameters in log methods
- [formatMessage](#formatmessage) Function that formats these parameters into strings

---

### RedisOptions

```ts
type RedisOptions = RedisOptionsWithUrl | RedisOptionsWithHost;
```

Defined in: [libs/nest-core/src/interfaces/redis-options.interface.ts:172](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/interfaces/redis-options.interface.ts#L172)

Union type representing all supported Redis configuration options.

This type combines both URL-based and host-based configuration options,
allowing for flexible Redis configuration throughout the application.

#### Example

```typescript
// Function that accepts any valid Redis configuration
function configureRedisCache(options: RedisOptions) {
  // Implementation that handles both connection types
  if ("url" in options) {
    // Handle URL-based connection
  } else {
    // Handle host-based connection
  }
}
```

## Variables

### CACHE_OPTIONS

```ts
const CACHE_OPTIONS: "cache_options" = "cache_options";
```

Defined in: [libs/nest-core/src/tokens.ts:46](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/tokens.ts#L46)

Token for cache configuration options

This constant defines a token used for dependency injection of cache configuration
options in NestJS applications. It serves as a key for providing and retrieving
cache-related configuration throughout the application.

The token is primarily used with NestJS's dependency injection system to provide
consistent access to cache configuration options across different modules and services.

#### Examples

```typescript
// Providing cache options using the token
@Module({
  providers: [
    {
      provide: CACHE_OPTIONS,
      useValue: {
        ttl: 3600,
        max: 100,
      },
    },
  ],
})
export class AppModule {}
```

```typescript
// Injecting cache options in a service
@Injectable()
export class SomeService {
  constructor(@Inject(CACHE_OPTIONS) private readonly cacheOptions: any) {}

  someMethod() {
    const ttl = this.cacheOptions.ttl;
    // Use the cache options...
  }
}
```

---

### clc

```ts
const clc: object;
```

Defined in: [libs/nest-core/src/logger/utils/logger.utils.ts:27](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/logger/utils/logger.utils.ts#L27)

Collection of ANSI color functions for terminal output

This object provides methods to colorize text for console output using ANSI color codes.
Each method takes a string and returns the same string wrapped with the appropriate color codes.

#### Type Declaration

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

<a id="property-blue"></a> `blue()`

</td>
<td>

(`text`) => `string`

</td>
<td>

[libs/nest-core/src/logger/utils/logger.utils.ts:30](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/logger/utils/logger.utils.ts#L30)

</td>
</tr>
<tr>
<td>

<a id="property-bold"></a> `bold()`

</td>
<td>

(`text`) => `string`

</td>
<td>

[libs/nest-core/src/logger/utils/logger.utils.ts:28](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/logger/utils/logger.utils.ts#L28)

</td>
</tr>
<tr>
<td>

<a id="property-cyan"></a> `cyan()`

</td>
<td>

(`text`) => `string`

</td>
<td>

[libs/nest-core/src/logger/utils/logger.utils.ts:36](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/logger/utils/logger.utils.ts#L36)

</td>
</tr>
<tr>
<td>

<a id="property-cyanbright"></a> `cyanBright()`

</td>
<td>

(`text`) => `string`

</td>
<td>

[libs/nest-core/src/logger/utils/logger.utils.ts:37](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/logger/utils/logger.utils.ts#L37)

</td>
</tr>
<tr>
<td>

<a id="property-green"></a> `green()`

</td>
<td>

(`text`) => `string`

</td>
<td>

[libs/nest-core/src/logger/utils/logger.utils.ts:31](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/logger/utils/logger.utils.ts#L31)

</td>
</tr>
<tr>
<td>

<a id="property-magentabright"></a> `magentaBright()`

</td>
<td>

(`text`) => `string`

</td>
<td>

[libs/nest-core/src/logger/utils/logger.utils.ts:35](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/logger/utils/logger.utils.ts#L35)

</td>
</tr>
<tr>
<td>

<a id="property-red"></a> `red()`

</td>
<td>

(`text`) => `string`

</td>
<td>

[libs/nest-core/src/logger/utils/logger.utils.ts:33](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/logger/utils/logger.utils.ts#L33)

</td>
</tr>
<tr>
<td>

<a id="property-redbright"></a> `redBright()`

</td>
<td>

(`text`) => `string`

</td>
<td>

[libs/nest-core/src/logger/utils/logger.utils.ts:34](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/logger/utils/logger.utils.ts#L34)

</td>
</tr>
<tr>
<td>

<a id="property-white"></a> `white()`

</td>
<td>

(`text`) => `string`

</td>
<td>

[libs/nest-core/src/logger/utils/logger.utils.ts:29](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/logger/utils/logger.utils.ts#L29)

</td>
</tr>
<tr>
<td>

<a id="property-yellow"></a> `yellow()`

</td>
<td>

(`text`) => `string`

</td>
<td>

[libs/nest-core/src/logger/utils/logger.utils.ts:32](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/logger/utils/logger.utils.ts#L32)

</td>
</tr>
</tbody>
</table>

#### Example

```typescript
console.log(clc.red("This text will be red"));
console.log(clc.blue("This text will be blue"));
console.log(clc.bold(clc.green("This text will be bold and green")));
```

#### See

- [Colorizer](#colorizer) Interface defining the function signature
- [colorScheme](#colorscheme-1) Color scheme that uses these functions

---

### colorScheme

```ts
const colorScheme: ColorScheme;
```

Defined in: [libs/nest-core/src/logger/utils/logger.utils.ts:57](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/logger/utils/logger.utils.ts#L57)

Default color scheme for log levels

This object maps each log level to a specific color function.
It's used to colorize log level indicators in the console output.

#### Example

```typescript
// Get the color function for a specific log level
const levelColor = colorScheme["info"];
console.log(levelColor("INFO")); // Will be blue
```

#### See

- [ColorScheme](#colorscheme) Interface defining the structure
- LogLevel Type defining the possible log levels
- [clc](#clc) Object containing the color functions

---

### DEFAULT_PORT

```ts
const DEFAULT_PORT: 3000 = 3000;
```

Defined in: [libs/nest-core/src/constants.ts:23](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/constants.ts#L23)

Default port number for the application server

This constant defines the default port number that the application will listen on
when no port is specified in the configuration or environment variables. It serves
as a fallback value to ensure the application can start even without explicit port
configuration.

The value is used in the hichchiBootstrap function as the last fallback in the
port resolution chain: config.port → process.env.PORT → DEFAULT_PORT

#### Default

```ts
3000;
```

#### Example

```typescript
// In app-bootstrapper.ts
const port = config.port || process.env["PORT"] || DEFAULT_PORT;
await app.listen(port);
```

#### See

[hichchiBootstrap](#hichchibootstrap) The bootstrap function that uses this constant

---

### defaultOptions

```ts
const defaultOptions: Required<NestLikeFormatOptions>;
```

Defined in: [libs/nest-core/src/logger/utils/logger.utils.ts:83](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/logger/utils/logger.utils.ts#L83)

Default options for NestJS-like console format

This object defines the default formatting options for console output.
These options control which elements are displayed in log messages and how they're formatted.

#### Example

```typescript
// Use default options with one override
const options = { ...defaultOptions, colors: false };
```

#### See

- [NestLikeFormatOptions](#nestlikeformatoptions) Interface defining these options
- [consoleFormat](#consoleformat) Function that uses these options
- [LoggerOptions](#loggeroptions) Related logger configuration options

---

### IS_RANDOM_HEX_TOKEN

```ts
const IS_RANDOM_HEX_TOKEN: "IsRandomHexToken" = "IsRandomHexToken";
```

Defined in: [libs/nest-core/src/validators/random-hex.validator.ts:12](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/validators/random-hex.validator.ts#L12)

Token name for the random hexadecimal validator

This constant is used as the validator name when registering the decorator
with class-validator. It serves as an identifier for the validation rule.

---

### IS_VERIFY_TOKEN

```ts
const IS_VERIFY_TOKEN: "isVerifyToken" = "isVerifyToken";
```

Defined in: [libs/nest-core/src/validators/verify-token.validator.ts:12](https://github.com/hichchidev/hichchi/blob/945db660e7bba28e17d58da0bb856736e708db35/libs/nest-core/src/validators/verify-token.validator.ts#L12)

Token name for the verification token validator

This constant is used as the validator name when registering the decorator
with class-validator. It serves as an identifier for the validation rule.
