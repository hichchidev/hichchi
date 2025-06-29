<!--suppress ALL -->
<div align="center">

# 🔗 @hichchi/nest-connector

**Comprehensive NestJS connector library providing standardized HTTP responses, authentication interfaces, CRUD operations, and shared utilities for the Hichchi ecosystem**

[![npm version](https://img.shields.io/npm/v/@hichchi/nest-connector?style=flat&color=blue)](https://www.npmjs.com/package/@hichchi/nest-connector)
[![npm downloads](https://img.shields.io/npm/dm/@hichchi/nest-connector?style=flat&color=green)](https://www.npmjs.com/package/@hichchi/nest-connector)
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
npm install @hichchi/nest-connector
```

## ⚡ Quick Start

Get up and running with standardized API responses in just a few minutes:

```typescript
// 1. Install the package
npm install @hichchi/nest-connector

// 2. Import response interfaces and builders
import { 
  HttpResponse, 
  SuccessResponse, 
  ErrorResponse,
  SuccessResponseDto 
} from '@hichchi/nest-connector';

// 3. Use in your NestJS controllers
@Controller('users')
export class UsersController {
  @Get()
  async getUsers(): Promise<SuccessResponse> {
    const users = await this.usersService.findAll();
    return new SuccessResponseDto(users, 'Users retrieved successfully');
  }
}
```

## 📋 Prerequisites

Before installing @hichchi/nest-connector, ensure you have:

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
npm install @hichchi/utils
```

### Optional Dependencies
For enhanced features:
```bash
# For validation decorators
npm install class-validator class-transformer
```

## 🌟 Overview

🎯 **Your standardized response toolkit** for NestJS applications. Ensure consistent API responses across your entire application with pre-defined interfaces, builders, and response structures that follow industry best practices.

## ✨ Features

### 🏗️ Ready-to-Use Response Structures
- 📋 **HttpResponse Interface** - Base interface for all API responses
- ✅ **SuccessResponse Interface** - Standardized success response structure
- ❌ **ErrorResponse Interface** - Consistent error response format
- 🔢 **HTTP Status Enums** - Pre-defined status code enumerations

### 🛠️ Response Builders & DTOs
- 🏭 **SuccessResponseDto** - Builder for success responses with data
- 🎯 **Response Code Types** - Application-specific response codes
- 📊 **Status Code Management** - Organized HTTP status code handling
- 🔧 **Type-Safe Responses** - Full TypeScript support for response structures

### 🎨 Developer Experience
- 📝 **Comprehensive Documentation** - Detailed JSDoc comments for all interfaces
- 🔍 **IntelliSense Support** - Full IDE autocomplete and type checking
- 🎯 **Consistent API Design** - Standardized response patterns across applications
- 🚀 **Easy Integration** - Drop-in replacement for custom response handling

### 🔧 Advanced Features
- 🏷️ **User Info Interfaces** - Standardized user information structures
- 📦 **Modular Design** - Import only what you need
- 🔄 **Extensible Architecture** - Easy to extend with custom response types
- 🎪 **Framework Agnostic Types** - Core interfaces can be used beyond NestJS

## 🚀 Usage

Detailed usage examples will be added here

## 🔧 Configuration Reference

### Response Interface Structure

```typescript
interface HttpResponse {
  statusCode: HttpStatus;
  code: ResponseCode;
  message: string;
  description?: string;
}

interface SuccessResponse extends HttpResponse {
  statusCode: HttpSuccessStatus;
  code: SuccessResponseCode;
}

interface ErrorResponse extends HttpResponse {
  statusCode: HttpClientErrorStatus | HttpServerErrorStatus;
  code: ErrorResponseCode;
}
```

### Available HTTP Status Enums

```typescript
// Success Status Codes (2xx)
enum HttpSuccessStatus {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204
}

// Client Error Status Codes (4xx)
enum HttpClientErrorStatus {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404
}

// Server Error Status Codes (5xx)
enum HttpServerErrorStatus {
  INTERNAL_SERVER_ERROR = 500,
  BAD_GATEWAY = 502,
  SERVICE_UNAVAILABLE = 503
}
```

## 🔧 Development

### Building the Library
```bash
nx build nest-connector
```

### Running Tests
```bash
nx test nest-connector
```

### Linting
```bash
nx lint nest-connector
```

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
