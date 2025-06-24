# @hichchi/nest-core

A comprehensive core library for NestJS applications with essential utilities and services.

## Installation

```bash
npm install @hichchi/nest-core
```

## Overview

This library provides a foundation for building NestJS applications with common utilities, services, and patterns. It includes bootstrap utilities, caching mechanisms, exception filters, interceptors, decorators, and more to streamline NestJS application development.

## Key Features

- **Application Bootstrap**: Simplified application setup with sensible defaults
- **Caching**: Redis-based caching module for improved performance
- **Exception Handling**: Global exception filters for consistent error responses
- **Validation**: Pre-configured validation pipes with custom exception factories
- **Interceptors**: Common interceptors for request/response transformation
- **Decorators**: Useful decorators for controller and service methods
- **Utilities**: Helper functions for common tasks in NestJS applications

## Usage

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

## Building

Run `nx build nest-core` to build the library.

## Running unit tests

Run `nx test nest-core` to execute the unit tests via [Jest](https://jestjs.io).
