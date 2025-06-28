<div align="center">
  <h1>🔗 @hichchi/nest-connector</h1>
  <p>
    <strong>A connector library for NestJS applications providing shared interfaces, types, and utilities</strong>
  </p>
  <p>
    <a href="https://www.npmjs.com/package/@hichchi/nest-connector">
      <img src="https://img.shields.io/npm/v/@hichchi/nest-connector?style=flat-square&color=blue" alt="npm version">
    </a>
    <a href="https://www.npmjs.com/package/@hichchi/nest-connector">
      <img src="https://img.shields.io/npm/dm/@hichchi/nest-connector?style=flat-square&color=green" alt="npm downloads">
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
npm install @hichchi/nest-connector
```

## 🌟 Overview

This library serves as a connector between different parts of a NestJS application ecosystem. It provides shared interfaces, types, enums, and utilities for authentication, CRUD operations, and common functionality, enabling consistent implementation patterns across your application.

## ✨ Key Features

- 🔐 **Authentication Connectors**: Interfaces and types for authentication systems
- 📊 **CRUD Connectors**: Shared interfaces and types for CRUD operations
- 🛠️ **Common Utilities**: Reusable components for NestJS applications
- 📋 **Response Models**: Standardized response structures
- 📝 **Type Definitions**: TypeScript types and interfaces for consistent typing

## 🚀 Usage

### Authentication Interfaces

```typescript
import { UserInfo, AuthResponse } from '@hichchi/nest-connector/auth';

// Use authentication interfaces in your services
@Injectable()
export class AuthService {
  async validateUser(username: string, password: string): Promise<UserInfo | null> {
    // Implementation
  }

  async signIn(user: UserInfo): Promise<AuthResponse> {
    // Implementation
  }
}
```

### CRUD Types

```typescript
import { EntityId, Pagination, Model } from '@hichchi/nest-connector/crud';

// Use CRUD types in your controllers
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  async findOne(@Param('id') id: EntityId): Promise<Model> {
    return this.usersService.findOne(id);
  }

  @Get()
  async findAll(@Query() query): Promise<Pagination<Model>> {
    return this.usersService.findAll(query);
  }
}
```

### Common Utilities

```typescript
import { SuccessResponse } from '@hichchi/nest-connector';

@Controller('items')
export class ItemsController {
  @Post()
  async create(@Body() createItemDto: CreateItemDto): Promise<SuccessResponse> {
    await this.itemsService.create(createItemDto);
    return { success: true, message: 'Item created successfully' };
  }
}
```

---

## 🔧 Development

### Building

```bash
nx build nest-connector
```

### Running unit tests

```bash
nx test nest-connector
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
