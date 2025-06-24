# @hichchi/nest-crud

A comprehensive CRUD (Create, Read, Update, Delete) module for NestJS applications with TypeORM integration.

## Installation

```bash
npm install @hichchi/nest-crud
```

## Overview

This library provides a complete solution for implementing CRUD operations in NestJS applications using TypeORM. It includes base entities, repositories, services, and utilities to streamline database operations and reduce boilerplate code.

## Key Features

- **TypeORM Integration**: Seamless integration with TypeORM for database operations
- **Base Entities**: Pre-configured entity classes with common fields and behaviors
- **CRUD Service**: Comprehensive service with methods for all CRUD operations
- **Repository Pattern**: Implementation of the repository pattern for data access
- **Transaction Support**: Methods for handling database transactions
- **Error Handling**: Built-in error handling for database operations
- **Pagination**: Support for paginated responses

## Usage

### Module Registration

```typescript
import { Module } from '@nestjs/common';
import { HichchiCrudModule } from '@hichchi/nest-crud';
import { UserEntity } from './entities/user.entity';

@Module({
  imports: [
    HichchiCrudModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'mydb',
      entities: ['dist/**/*.entity{.ts,.js}'],
      migrations: ['dist/database/migrations/*{.ts,.js}'],
      synchronize: false,
      autoLoadEntities: true,
    }),
    HichchiCrudModule.forFeature([UserEntity]),
  ],
  controllers: [...],
  providers: [...],
})
export class AppModule {}
```

### Creating a Service

```typescript
import { Injectable } from '@nestjs/common';
import { CrudService } from '@hichchi/nest-crud';
import { UserEntity } from './entities/user.entity';
import { UserRepository } from './repositories/user.repository';

@Injectable()
export class UserService extends CrudService<UserEntity> {
  constructor(private readonly userRepository: UserRepository) {
    super(userRepository);
  }

  // Add custom methods as needed
}
```

### Using CRUD Operations

```typescript
import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.userService.get(id);
  }

  // Add other endpoints as needed
}
```

## Building

Run `nx build nest-crud` to build the library.

## Running unit tests

Run `nx test nest-crud` to execute the unit tests via [Jest](https://jestjs.io).
