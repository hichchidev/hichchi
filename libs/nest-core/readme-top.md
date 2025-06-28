<div align="center">
  <h1>⚡ @hichchi/nest-core</h1>
  <p>
    <strong>A comprehensive core library for NestJS applications with essential utilities and services</strong>
  </p>
  <p>
    <a href="https://www.npmjs.com/package/@hichchi/nest-core">
      <img src="https://img.shields.io/npm/v/@hichchi/nest-core?style=flat-square&color=blue" alt="npm version">
    </a>
    <a href="https://www.npmjs.com/package/@hichchi/nest-core">
      <img src="https://img.shields.io/npm/dm/@hichchi/nest-core?style=flat-square&color=green" alt="npm downloads">
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
npm install @hichchi/nest-core
```

## 🌟 Overview

This library provides a foundation for building NestJS applications with common utilities, services, and patterns. It includes bootstrap utilities, caching mechanisms, exception filters, interceptors, decorators, and more to streamline NestJS application development.

## ✨ Key Features

- 🚀 **Application Bootstrap**: Simplified application setup with sensible defaults
- 💾 **Caching**: Redis-based caching module for improved performance
- 🛡️ **Exception Handling**: Global exception filters for consistent error responses
- ✅ **Validation**: Pre-configured validation pipes with custom exception factories
- 🔄 **Interceptors**: Common interceptors for request/response transformation
- 🏷️ **Decorators**: Useful decorators for controller and service methods
- 🛠️ **Utilities**: Helper functions for common tasks in NestJS applications

## 🚀 Usage

### Bootstrapping an Application

```typescript
import { Module } from '@nestjs/common';
import { hichchiBootstrap } from '@hichchi/nest-core';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

async function bootstrap() {
  await hichchiBootstrap(AppModule, {
    port: 3000,
    globalPrefix: 'api',
    allowedOrigins: ['http://localhost:4200'],
    validation: true,
    globalFilters: true,
    globalInterceptors: true,
  });
}

bootstrap();
```

### Using the Cache Module

```typescript
import { Module } from '@nestjs/common';
import { CacheModule } from '@hichchi/nest-core';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    CacheModule.register({
      host: 'localhost',
      port: 6379,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

### Using Decorators

```typescript
import { Controller, Get } from '@nestjs/common';
import { Public, Roles } from '@hichchi/nest-core/decorators';

@Controller('users')
export class UsersController {
  @Public()
  @Get('public')
  getPublicData() {
    return { message: 'This endpoint is public' };
  }

  @Roles('admin')
  @Get('admin')
  getAdminData() {
    return { message: 'This endpoint is for admins only' };
  }
}
```

---

## 🔧 Development

### Building

```bash
nx build nest-core
```

### Running unit tests

```bash
nx test nest-core
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
