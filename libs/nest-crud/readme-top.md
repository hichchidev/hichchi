<div align="center">
  <h1>📊 @hichchi/nest-crud</h1>
  <p>
    <strong>A comprehensive CRUD (Create, Read, Update, Delete) module for NestJS applications with TypeORM integration</strong>
  </p>
  <p>
    <a href="https://www.npmjs.com/package/@hichchi/nest-crud">
      <img src="https://img.shields.io/npm/v/@hichchi/nest-crud?style=flat-square&color=blue" alt="npm version">
    </a>
    <a href="https://www.npmjs.com/package/@hichchi/nest-crud">
      <img src="https://img.shields.io/npm/dm/@hichchi/nest-crud?style=flat-square&color=green" alt="npm downloads">
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
npm install @hichchi/nest-crud
```

## 🌟 Overview

This library provides a complete solution for implementing CRUD operations in NestJS applications using TypeORM. It includes base entities, repositories, services, and utilities to streamline database operations and reduce boilerplate code.

## ✨ Key Features

- 🗄️ **TypeORM Integration**: Seamless integration with TypeORM for database operations
- 🏗️ **Base Entities**: Pre-configured entity classes with common fields and behaviors
- 🔧 **CRUD Service**: Comprehensive service with methods for all CRUD operations
- 📚 **Repository Pattern**: Implementation of the repository pattern for data access
- 💾 **Transaction Support**: Methods for handling database transactions
- 🛡️ **Error Handling**: Built-in error handling for database operations
- 📄 **Pagination**: Support for paginated responses

## 🚀 Usage

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

---

## 🔧 Development

### Building

```bash
nx build nest-crud
```

### Running unit tests

```bash
nx test nest-crud
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
