<!--suppress ALL -->
<div align="center">

# 🚀 @hichchi/nest-core

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
    globalPrefix: 'api'
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

Detailed usage examples will be added here

## 🔧 Configuration Reference

### Bootstrap Configuration

```typescript
interface BootstrapOptions {
  port?: number;
  globalPrefix?: string;
  cors?: boolean | CorsOptions;
  validation?: ValidationPipeOptions;
  logger?: LoggerOptions;
}

// Bootstrap your application with enhanced features
await hichchiBootstrap(AppModule, {
  port: 3000,
  globalPrefix: 'api',
  cors: true,
  validation: {
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true
  }
});
```

### HTTP Service Configuration

```typescript
import { AxiosHttpService } from '@hichchi/nest-core';

@Injectable()
export class MyService {
  constructor(private readonly httpService: AxiosHttpService) {}

  async getData() {
    return this.httpService.get('/api/data', {
      timeout: 5000,
      retries: 3
    });
  }
}
```

### Logger Configuration

```typescript
import { LoggerService } from '@hichchi/nest-core';

// Configure logger with multiple transports
const logger = new LoggerService({
  level: 'info',
  format: 'json',
  transports: ['console', 'file']
});
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

*Building the future of authentication, one commit at a time*

</div>

---

# 📖 API Documentation

Complete technical reference for all classes, interfaces, methods, and types in this library.

**Auto-generated by TypeDoc** - Browse through detailed API references, code examples, and implementation guides below.

<!-- TypeDoc generated documentation will be appended below this point -->

---

## 📋 API Table of Contents
