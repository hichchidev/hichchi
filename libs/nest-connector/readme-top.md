# @hichchi/nest-connector

A connector library for NestJS applications providing shared interfaces, types, and utilities.

## Installation

```bash
npm install @hichchi/nest-connector
```

## Overview

This library serves as a connector between different parts of a NestJS application ecosystem. It provides shared interfaces, types, enums, and utilities for authentication, CRUD operations, and common functionality, enabling consistent implementation patterns across your application.

## Key Features

- **Authentication Connectors**: Interfaces and types for authentication systems
- **CRUD Connectors**: Shared interfaces and types for CRUD operations
- **Common Utilities**: Reusable components for NestJS applications
- **Response Models**: Standardized response structures
- **Type Definitions**: TypeScript types and interfaces for consistent typing

## Usage

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

## Building

Run `nx build nest-connector` to build the library.

## Running unit tests

Run `nx test nest-connector` to execute the unit tests via [Jest](https://jestjs.io).
