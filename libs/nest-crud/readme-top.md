<!--suppress ALL -->
<div align="center">

# 🗃️ @hichchi/nest-crud

**NestJS CRUD extension library that extends @hichchi/nest-core functionality with comprehensive TypeORM-based CRUD operations, BaseEntity classes, advanced repositories, query builders, audit trails, soft delete, and enterprise-grade features - cannot be used independently, requires nest-core as foundation**

[![npm version](https://img.shields.io/npm/v/@hichchi/nest-crud?style=flat&color=blue)](https://www.npmjs.com/package/@hichchi/nest-crud)
[![npm downloads](https://img.shields.io/npm/dm/@hichchi/nest-crud?style=flat&color=green)](https://www.npmjs.com/package/@hichchi/nest-crud)
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
npm install @hichchi/nest-crud
```

## ⚡ Quick Start

Get up and running with powerful CRUD operations in just a few minutes! This guide will walk you through setting up a complete CRUD system with TypeORM entities, repositories, services, and advanced querying capabilities.

**_NOTE:_** This package uses TypeORM under the hood and provides enhanced functionality with audit trails, soft delete, caching, and enterprise-grade features.

#### 1. Create an entity using the `@HichchiEntity` decorator

First, you need to create a TypeORM entity that will represent your database table. The entity must extend `BaseEntity` and be decorated with `@HichchiEntity` to work with the CRUD system.

**_NOTE:_** Classes decorated with `@HichchiEntity` must extend [BaseEntity](#baseentity) (or [HichchiUserEntity](#hichchiuserentity) which already extends it). The `@HichchiEntity` decorator accepts two parameters: the table name and an array of unique field names for constraint validation.

**_NOTE:_** All available configuration options can be found in the [HichchiEntity](#hichchientity) decorator documentation.

```typescript
import { Column } from "typeorm";
import { BaseEntity, HichchiEntity } from "@hichchi/nest-crud";

// Define entity with table name "user" and unique constraint on "email" field
@HichchiEntity("user", ["email"])
export class UserEntity extends BaseEntity {
    // User's first name (required field)
    @Column({ nullable: false })
    firstName: string;

    // User's last name (required field)
    @Column({ nullable: false })
    lastName: string;

    // User's email address (required and unique)
    @Column({ nullable: false })
    email: string;

    // User's password (optional for OAuth users)
    @Column({ type: "varchar", nullable: true })
    password: string | null;
}
```

#### 2. Create a repository for the entity

Create a repository that extends `BaseRepository` to handle database operations. The repository provides advanced CRUD methods, query building, and error handling.

```typescript
import { UserEntity } from "../entities";
import { BaseRepository, HichchiRepository, Repository, InjectRepository } from "@hichchi/nest-crud";

// Repository decorator that registers the repository for dependency injection
@HichchiRepository(UserEntity)
export class UserRepository extends BaseRepository<UserEntity> {
    constructor(@InjectRepository(UserEntity) repository: Repository<UserEntity>) {
        // Initialize with TypeORM repository to provide enhanced CRUD operations
        super(repository);
    }
}
```

#### 3. Create a NestJS service extending `CrudService`

Create a service that extends `CrudService` to provide comprehensive CRUD operations with built-in error handling, pagination, filtering, and audit trail support.

```typescript
import { Injectable } from "@nestjs/common";
import { CrudService } from "@hichchi/nest-crud";
import { UserEntity } from "../entities";
import { UserRepository } from "../repositories";

@Injectable()
export class UserService extends CrudService<UserEntity> {
    constructor(readonly userRepository: UserRepository) {
        // Initialize the CRUD service with the repository
        // This provides methods like save(), get(), update(), delete(), etc.
        super(userRepository);
    }
}
```

#### 4. Create and register your feature module

Create a module that provides your entity, repository, and service, making them available for dependency injection.

```typescript
import { Module } from "@nestjs/common";
import { HichchiCrudModule } from "@hichchi/nest-crud";
import { UserController } from "./controllers";
import { UserService } from "./services";
import { UserRepository } from "./repositories";
import { UserEntity } from "./entities";

@Module({
    // Register the entity with the CRUD module for TypeORM integration
    imports: [HichchiCrudModule.forFeature([UserEntity])],
    controllers: [UserController],
    providers: [UserService, UserRepository],
    // Export the service so it can be used by other modules
    exports: [UserService],
})
export class UserModule {}
```

#### 5. Register the CRUD module in your `app.module.ts`

Configure the CRUD module at the application level by providing your database connection and global CRUD settings.

**_NOTE:_** All available configuration options can be found in the [Configuration Reference](#-configuration-reference) section.

```typescript
import { Module } from "@nestjs/common";
import { HichchiCrudModule } from "@hichchi/nest-crud";
import { UserModule } from './user/user.module';

@Module({
  imports: [
    // Configure the CRUD module with your database connection
    HichchiCrudModule.forRoot({
      // Database connection configuration
      type: "mysql", // Database type (mysql, postgres, sqlite, etc.)
      host: "localhost",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "your-database-password", // Use environment variables in production
      database: "your-database-name",
      charset: "utf8mb4",

      // Entity configuration
      entities: ["dist/**/entities/*.entity{.ts,.js}"], // Path to your compiled entities
      synchronize: true, // Auto-create database schema (disable in production)
      legacySpatialSupport: false,
      autoLoadEntities: true, // Automatically load entities from modules

      // Optional: Global CRUD configuration
      logging: true, // Enable SQL query logging
      dropSchema: false, // Never drop schema in production
    }),

    // Import your feature modules
    UserModule,
  ],
})
export class AppModule {}
```

#### 6. Start using your CRUD operations

Once configured, your service will automatically have comprehensive CRUD methods available. Here are some examples of what you can do:

**Available CRUD Methods:**
- `create(createDto, eh?)` - Create a new entity instance without saving it
- `save(createDto, options?, createdBy?, eh?)` - Create and save a new entity
- `saveMany(createDtos, options?, createdBy?, eh?)` - Create and save multiple entities
- `get(id, options?, eh?)` - Get a single entity by ID
- `getByIds(getByIds, eh?)` - Get multiple entities by their IDs
- `getOne(getOne, eh?)` - Get a single entity by conditions
- `getMany(getMany, eh?)` - Get multiple entities with filtering, sorting, and pagination
- `getAll(getAll?, eh?)` - Get all entities with optional filtering and pagination
- `update(id, updateDto, options?, updatedBy?, eh?)` - Update an existing entity by ID
- `updateOne(where, updateDto, updatedBy?, eh?)` - Update a single entity by conditions
- `updateMany(where, updateDto, updatedBy?, eh?)` - Update multiple entities by conditions
- `updateByIds(ids, updateDto, updatedBy?, eh?)` - Update multiple entities by IDs
- `delete(id, deletedByOrWipe?, eh?)` - Delete an entity by ID (soft or hard delete)
- `deleteOne(where, deletedByOrWipe?, eh?)` - Delete a single entity by conditions
- `deleteMany(where, deletedByOrWipe?, eh?)` - Delete multiple entities by conditions
- `deleteByIds(ids, deletedByOrWipe?, eh?)` - Delete multiple entities by IDs
- `count(getMany, eh?)` - Count entities matching conditions
- `transaction(operation)` - Execute operations within a database transaction

**Example Usage in a Controller:**
```typescript
import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { Filters, GetAllOptions, Pager, PaginatedResponse, Search, Sorter, SortOptions } from "@hichchi/nest-crud";
import { EntityId, Pagination, QueryDeepPartial } from "@hichchi/nest-connector/crud";
import { UserService } from "../services";
import { CreateUserDto, UpdateUserDto } from "../dto";
import { User } from "../interfaces";

@Controller("user")
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get(":id")
    getUser(@Param("id") id: EntityId): Promise<User> {
        return this.userService.get(id);
    }

    @Get()
    getUsers(
        @Pager() pagination?: Pagination,
        @Sorter() sort?: SortOptions<User>,
        @Search() search?: QueryDeepPartial<User>,
        @Filters() filters?: QueryDeepPartial<User>,
    ): Promise<PaginatedResponse<User> | User[]> {
        return this.userService.getMany({ pagination, sort, search, filters });
    }

    @Get()
    getAllUsers(
        @Pager() pagination?: Pagination,
        @Sorter() sort?: SortOptions<User>,
    ): Promise<PaginatedResponse<User> | User[]> {
        return this.userService.getAll<GetAllOptions<User>>({ pagination, sort });
    }

    @Post()
    create(@Body() dto: CreateUserDto): Promise<User | null> {
        return this.userService.save(dto);
    }

    @Patch(":id")
    update(@Param("id") id: EntityId, @Body() dto: UpdateUserDto): Promise<User> {
        return this.userService.update(id, dto);
    }

    @Delete()
    delete(@Param("id") id: EntityId): Promise<User> {
        return this.userService.delete(id);
    }
}
```

Your CRUD system is now ready to use! 🎉

## 📋 Prerequisites

Before installing @hichchi/nest-crud, ensure you have:

### Required Dependencies
- **Node.js**: >= 18.0.0
- **NestJS**: >= 11.0.0
- **TypeScript**: >= 5.6.0
- **TypeORM**: >= 0.3.0

### Peer Dependencies
```bash
npm install @nestjs/common @nestjs/core @nestjs/typeorm
npm install typeorm reflect-metadata
npm install rxjs
```

### Database Dependencies
Choose your database driver:
```bash
# For PostgreSQL
npm install pg @types/pg

# For MySQL
npm install mysql2

# For SQLite
npm install sqlite3

# For MongoDB
npm install mongodb
```

## 🌟 Overview

🎯 **Your complete CRUD toolkit** for NestJS applications with TypeORM. From base entities to advanced repository patterns, from query builders to response DTOs - everything you need to build robust, scalable CRUD operations with enterprise-grade features.

## ✨ Features

### 🏗️ Ready-to-Use Base Classes
- 🗂️ **BaseEntity** - Pre-configured entity with common fields (id, createdAt, updatedAt, etc.)
- 👤 **BaseUserEntity** - Extended entity with user-specific fields and relationships
- 🔧 **BaseEntityExtension** - Flexible entity extension for custom requirements
- 📦 **BaseRepository** - Comprehensive repository with advanced CRUD operations

### 🚀 Advanced CRUD Operations
- 📝 **CrudService** - Full-featured service with create, read, update, delete operations
- 🔍 **Advanced Querying** - Complex filtering, sorting, pagination, and search capabilities
- 🔗 **Relationship Management** - Automatic handling of entity relationships and joins
- 📊 **Bulk Operations** - Efficient batch create, update, and delete operations

### 🎨 Developer Experience
- 🏷️ **Decorators** - Custom decorators for enhanced functionality and validation
- 📋 **DTOs** - Pre-built Data Transfer Objects for common CRUD operations
- 🎯 **Type Safety** - Full TypeScript support with generic types and interfaces
- 🔧 **Flexible Configuration** - Customizable options for different use cases

### 🛠️ Advanced Features
- 🚨 **Custom Exceptions** - Specialized exception handling for CRUD operations
- 📤 **Response Builders** - Standardized response formats for API endpoints
- 🔄 **Soft Delete** - Built-in soft delete functionality with recovery options
- 🏪 **Caching Support** - Integrated caching mechanisms for improved performance
- 🔐 **Permission System** - Role-based access control for CRUD operations
- 📈 **Audit Trail** - Automatic tracking of entity changes and user actions

## 🚀 Usage

### Using Base Classes

#### `BaseEntity`

This is the foundational entity class that provides common fields and functionality for all entities in your application. It includes automatic timestamps, soft delete capabilities, and audit trail support.

```typescript
import { Column } from "typeorm";
import { BaseEntity, HichchiEntity } from "@hichchi/nest-crud";

// Create an entity extending BaseEntity
@HichchiEntity("user", ["email"])
export class UserEntity extends BaseEntity {
  @Column({ nullable: false })
  firstName: string;

  @Column({ nullable: false })
  lastName: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: true })
  password: string | null;
}

// BaseEntity automatically provides:
// - id: string (UUID primary key)
// - createdAt: Date (creation timestamp)
// - updatedAt: Date (last update timestamp)
// - deletedAt: Date | null (soft delete timestamp)
// - createdBy: string | null (audit trail - who created)
// - updatedBy: string | null (audit trail - who updated)
// - deletedBy: string | null (audit trail - who deleted)
```

#### `HichchiUserEntity`

This specialized entity extends BaseEntity with additional user-specific fields and relationships commonly needed in applications with user management.

```typescript
import { Column, ManyToOne, OneToOne } from "typeorm";
import { HichchiEntity, HichchiJoinColumn, HichchiUserEntity } from "@hichchi/nest-crud";
import { AuthProvider } from "@hichchi/nest-connector/auth";
import { EntityId } from "@hichchi/nest-connector/crud";

@HichchiEntity("user", ["email"])
export class UserEntity extends HichchiUserEntity {
  // HichchiUserEntity already provides:
  // - firstName: string
  // - lastName: string  
  // - fullName: string (automatically generated)
  // - email: string | null
  // - username: string | null
  // Plus all BaseEntity fields

  // Overriding email as only string if
  // the usage doesnt include null in the app
  @Column({ nullable: false })
  email: string;

  @Column({ type: "varchar", nullable: true })
  password: string | null;

  @Column({ default: false })
  emailVerified: boolean;

  @Column({ type: "varchar", nullable: true })
  avatar: string | null;
}
```

#### `BaseRepository`

This repository class provides enhanced CRUD operations with built-in error handling, query building, and advanced features like soft delete, bulk operations, and relationship management.

```typescript
import { UserEntity } from "../entities";
import {
  BaseRepository,
  HichchiRepository,
  Repository,
  InjectRepository
} from "@hichchi/nest-crud";

@HichchiRepository(UserEntity)
export class UserRepository extends BaseRepository<UserEntity> {
    constructor(@InjectRepository(UserEntity) repository: Repository<UserEntity>) {
        super(repository);
    }
}

// BaseRepository provides methods like:
// - save(), saveMany()
// - get(), getOne(), getMany(), getAll()
// - update(), updateOne(), updateMany()
// - delete(), deleteOne(), deleteMany()
// - count(), transaction()

// You can add custom repository methods if needed:
async findByEmail(email: string): Promise<UserEntity | null> {
    return this.getOne({ where: { email } });
}
```

#### `BaseController`

This controller class provides a foundation for creating REST API controllers with standardized response formats and error handling.

```typescript
import { Controller, Get, Post, Put, Delete, Body, Param } from "@nestjs/common";
import { BaseController } from "@hichchi/nest-crud";
import { UserEntity } from "../entities";
import { UserService } from "../services";

@Controller('users')
export class UserController extends BaseController {
  constructor(private readonly userService: UserService) {
    super();
  }

  @Post()
  async createUser(@Body() createUserDto: Partial<UserEntity>) {
    const user = await this.userService.save(createUserDto);
    return this.success(user, 'User created successfully');
  }

  @Get(':id')
  async getUser(@Param('id') id: string) {
    const user = await this.userService.get(id);
    return this.success(user);
  }
}
```

### Using Decorators

#### `@HichchiEntity`

This decorator enhances TypeORM's @Entity decorator with additional functionality for table naming, unique constraints, and foreign key validation.

```typescript
import { Column, OneToMany, OneToOne } from "typeorm";
import { BaseEntity, BaseEntityExtension, HichchiEntity, HichchiEntityExtension, HichchiJoinColumn } from "@hichchi/nest-crud";
import { EntityId } from "@hichchi/nest-connector/crud";

// Basic entity with table name and unique constraint
@HichchiEntity("user", ["email"])
export class UserEntity extends BaseEntity {
  @Column({ nullable: false })
  firstName: string;

  @Column({ nullable: false, unique: true })
  email: string;
}

// Role entity with unique constraint on name
@HichchiEntity("role", ["name"])
export class RoleEntity extends BaseEntity {
  @Column({ type: "varchar", nullable: false })
  name: string;

  @Column({ type: "json", nullable: true })
  permissions: string[] | null;

  @Column({ type: "int", nullable: true })
  priority: number | null;

  @OneToMany(() => UserEntity, user => user.role)
  users: UserEntity[] | null;
}
```

#### `@HichchiEntityExtension`

This decorator is specifically designed for entity extension classes that extend BaseEntityExtension. It provides validation and metadata registration for lightweight entity extensions that don't require the full audit tracking capabilities of BaseEntity.

```typescript
import { Column, OneToOne } from "typeorm";
import { BaseEntityExtension, HichchiEntityExtension, HichchiJoinColumn } from "@hichchi/nest-crud";
import { EntityId } from "@hichchi/nest-connector/crud";

// Basic entity extension for additional user data
@HichchiEntityExtension("addresses")
export class AddressEntity extends BaseEntityExtension {
  @Column({ type: "varchar", nullable: true })
  street: string | null;

  @Column({ type: "varchar", nullable: true })
  city: string | null;

  @Column({ type: "varchar", nullable: true })
  state: string | null;

  @Column({ type: "varchar", nullable: true })
  zip: string | null;

  @Column({ type: "varchar", nullable: true })
  country: string | null;

  // Required: OneToOne relationship with @HichchiJoinColumn
  @OneToOne(() => UserEntity, user => user.address)
  @HichchiJoinColumn()
  user: UserEntity | null;

  @Column({ nullable: true })
  userId: EntityId | null;
}

// BaseEntityExtension automatically provides:
// - id: string (UUID primary key)
// No audit tracking fields (createdAt, updatedAt, etc.)
```

**Key Differences from @HichchiEntity:**
- **Lightweight**: Only provides an ID field, no audit tracking
- **Extension Purpose**: Designed to extend existing entities through one-to-one relationships
- **Validation Requirements**: Must have at least one @OneToOne relation with @HichchiJoinColumn
- **Base Class**: Must extend BaseEntityExtension instead of BaseEntity

**Validation Requirements:**
- Target class must extend BaseEntityExtension
- Must have at least one @OneToOne relation
- Must use @HichchiJoinColumn instead of @JoinColumn
- Foreign key constraint names must follow 'FK_entity_entity' format

**Use Cases:**
- Adding additional properties to an entity without modifying its core structure
- Creating specialized versions of an entity for specific use cases
- Implementing one-to-one relationships with shared primary keys
- When you don't need full audit tracking capabilities

#### `@HichchiRepository`

This decorator simplifies repository creation by automatically handling dependency injection and entity association.

```typescript
import { UserEntity } from "../entities";
import { BaseRepository, HichchiRepository, Repository, InjectRepository } from "@hichchi/nest-crud";
import { Like } from "typeorm";

// Repository with @HichchiRepository decorator
@HichchiRepository(UserEntity)
export class UserRepository extends BaseRepository<UserEntity> {
  constructor(@InjectRepository(UserEntity) repository: Repository<UserEntity>) {
    super(repository);
  }

  // Add custom methods
  async findByEmailDomain(domain: string): Promise<UserEntity[]> {
    return this.getMany({
      where: { email: Like(`%@${domain}`) }
    });
  }
}
```

#### `@Filters`

This decorator extracts filter parameters from request query strings and transforms them into structured filter objects for database queries.

```typescript
import { Controller, Get } from "@nestjs/common";
import { Filters } from "@hichchi/nest-crud";
import { UserService } from "../services";
import { FilterOptions } from "@hichchi/nest-connector/crud";

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Basic filtering
  @Get()
  async getUsers(@Filters() filters?: FilterOptions<UserEntity>) {
    return this.userService.getMany({ where: filters });
  }

  // Advanced filtering with multiple parameters
  @Get('advanced')
  async getAdvancedUsers(@Filters() filters?: FilterOptions<UserEntity>) {
    return this.userService.getMany({
      where: { ...filters },
      order: sort,
      pagination
    });
  }
}

// Example API calls:
// GET /users?emailVerified=true&signUpType=LOCAL
// GET /users?address.city=NewYork&emailVerified=true
// GET /users?createdAt.gte=2024-01-01&createdAt.lte=2024-12-31
```

#### `@Search`

This decorator extracts search parameters from request query strings and creates search conditions for full-text search functionality.

```typescript
import { Controller, Get } from "@nestjs/common";
import { Search } from "@hichchi/nest-crud";
import { UserService } from "../services";
import { FilterOptions } from "@hichchi/nest-connector/crud";

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('search')
  async searchUsers(@Search() search?: FilterOptions<UserEntity>) {
    return this.userService.getMany({ where: search });
  }
}

// Example API calls:
// GET /users/search?searchValue=john&searchFields=firstName,lastName,email
// GET /users/search?searchValue=LOCAL&searchFields=signUpType
// GET /users/search?searchValue=2024&searchFields=createdAt
```

#### `@Sorter`

This decorator extracts sorting parameters from request query strings and transforms them into structured sort objects for database queries.

```typescript
import { Controller, Get } from "@nestjs/common";
import { Sorter } from "@hichchi/nest-crud";
import { UserService } from "../services";
import { SortOptions } from "@hichchi/nest-connector/crud";

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUsers(@Sorter() sort?: SortOptions<UserEntity>) {
    return this.userService.getMany({ 
      order: sort || { createdAt: 'DESC' } 
    });
  }
}

// Example API calls:
// GET /users?sort=firstName:asc,createdAt:desc
// GET /users?sort=email:asc
// GET /users?sort=updatedAt:desc,firstName:asc
```

#### `@Pager`

This decorator extracts pagination parameters from request query strings and transforms them into pagination objects for database queries.

```typescript
import { Controller, Get } from "@nestjs/common";
import { Pager } from "@hichchi/nest-crud";
import { UserService } from "../services";
import { Pagination } from "@hichchi/nest-connector/crud";

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUsers(@Pager() pagination?: Pagination) {
    return this.userService.getMany({ pagination });
  }

  // Combined with other decorators
  @Get('advanced')
  async getAdvancedUsers(
    @Filters() filters?: FilterOptions<UserEntity>,
    @Sorter() sort?: SortOptions<UserEntity>,
    @Pager() pagination?: Pagination
  ) {
    return this.userService.getMany({
      where: filters,
      order: sort,
      pagination
    });
  }
}

// Example API calls:
// GET /users?page=1&limit=10
// GET /users?page=2&limit=25
// GET /users?page=1&limit=50&sort=createdAt:desc&emailVerified=true
```

### Using Services

#### `CrudService`

This service class provides comprehensive CRUD operations with built-in error handling, validation, audit trails, and advanced querying capabilities.

```typescript
import { CrudService } from "@hichchi/nest-crud";
import { GoogleProfile, IUserService, SignUpDto } from "@hichchi/nest-auth";
import { AuthProvider, VerifyToken } from "@hichchi/nest-connector/auth";
import { UserRepository } from "../repositories";
import { EntityId } from "@hichchi/nest-connector/crud";
import { LoggerService } from "@hichchi/nest-core";
import { Injectable } from "@nestjs/common";
import { User } from "../interfaces";

@Injectable()
export class UserService extends CrudService<User> implements IUserService {
    constructor(readonly userRepository: UserRepository) {
        super(userRepository);
    }

    getUserById(id: EntityId): Promise<User | null> {
        return this.get(id);
    }

    getUserByEmail(email: string): Promise<User | null> {
        return this.getOne({ where: { email } });
    }

    getUserByAuthField(authFieldValue: EntityId): Promise<User | null> {
        return this.getOne({ where: { id: authFieldValue } });
    }

    sendPasswordResetEmail(email: string, token: VerifyToken): Promise<boolean> {
        LoggerService.log(`Sending password reset email to ${email} with token: ${token}`);
        return Promise.resolve(false);
    }

    sendVerificationEmail(userId: EntityId, token: VerifyToken): Promise<boolean> {
        LoggerService.log(`Sending verification email to user with id: ${userId} with token: ${token}`);
        return Promise.resolve(false);
    }

    signUpUser(userDto: SignUpDto, signUpType: AuthProvider, profileData?: GoogleProfile): Promise<User | null> {
        return this.save({ ...userDto, signUpType, profileData });
    }

    updateUserById(id: EntityId, userDto: Partial<User>): Promise<User> {
        return this.update(id, { password: userDto.password });
    }
}

// CrudService provides inherited methods like:
// - save(), saveMany()
// - get(), getOne(), getMany(), getAll()
// - update(), updateOne(), updateMany()
// - delete(), deleteOne(), deleteMany()
// - count(), transaction()
```

### Using Utilities

#### HTTP Utilities

These utility functions help with HTTP request/response handling and query parameter parsing.

##### `parseSortOptions`

Parse sort options from query string parameters into TypeORM-compatible sort objects.

```typescript
import { parseSortOptions } from "@hichchi/nest-crud";
import { UserEntity } from "../entities";

// Parse sort string from query parameters
const sortString = "firstName.asc,createdAt.desc";
const sortOptions = parseSortOptions<UserEntity>(sortString);

// Result:
// {
//   firstName: "asc",
//   createdAt: "desc"
// }

// Use in a controller
@Get()
async getUsers(@Query('sort') sort?: string): Promise<UserEntity[]> {
  const sortOptions = parseSortOptions<UserEntity>(sort);
  return this.userService.getMany({ order: sortOptions });
}
```

##### `parseFilterObject`

Parse filter object from query parameters with dot notation support into nested filter objects.

```typescript
import { parseFilterObject } from "@hichchi/nest-crud";
import { UserEntity } from "../entities";

// Parse filters with dot notation
const filters = {
  emailVerified: "true",
  "address.city": "New York",
  "address.zip": "10001"
};
const filterOptions = parseFilterObject<UserEntity>(filters);

// Result:
// {
//   emailVerified: "true",
//   address: {
//     city: "New York",
//     zip: "10001"
//   }
// }

// Use in a controller
@Get()
async getUsers(@Query() query: Record<string, string>): Promise<UserEntity[]> {
  const { page, limit, sort, ...filters } = query;
  const filterOptions = parseFilterObject<UserEntity>(filters);
  return this.userService.getMany({ where: filterOptions });
}
```

##### `parseSearchString`

Parse search parameters into filter options for multi-field search functionality.

```typescript
import { parseSearchString } from "@hichchi/nest-crud";
import { UserEntity } from "../entities";

// Parse search value and fields
const searchValue = "John";
const searchFields = "firstName,lastName,email";
const searchFilter = parseSearchString<UserEntity>(searchValue, searchFields);

// Result:
// {
//   firstName: "John",
//   lastName: "John",
//   email: "John"
// }

// Use in a controller
@Get('search')
async search(
  @Query('q') searchTerm?: string,
  @Query('fields') fields?: string
): Promise<UserEntity[]> {
  const searchFilter = parseSearchString<UserEntity>(searchTerm, fields);
  return this.userService.getMany({ where: searchFilter });
}
```

### Using Response Classes

#### `PaginatedResponse`

This class provides a standardized structure for paginated API responses with metadata about the pagination state. You can create instances of PaginatedResponse to manually build paginated responses.

```typescript
import { Controller, Get } from "@nestjs/common";
import { PaginatedResponse, Pager } from "@hichchi/nest-crud";
import { UserService } from "../services";
import { UserEntity } from "../entities";
import { Pagination } from "@hichchi/nest-connector/crud";

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Method 1: Using service that returns PaginatedResponse automatically
  @Get()
  async getUsers(@Pager() pagination?: Pagination): Promise<PaginatedResponse<UserEntity> | UserEntity[]> {
    return this.userService.getMany({ pagination });
  }

  // Method 2: Manually creating PaginatedResponse instances
  @Get('manual')
  async getUsersManual(@Pager() pagination?: Pagination): Promise<PaginatedResponse<UserEntity>> {
    // Get data and total count from your service
    const [users, totalCount] = await this.userService.findAndCount({
      skip: pagination?.skip,
      take: pagination?.take,
      where: { deletedAt: null }
    });

    // Create and return PaginatedResponse instance
    return new PaginatedResponse(users, totalCount, pagination);
  }

  // Method 3: Creating response with custom logic
  @Get('custom')
  async getCustomUsers(@Pager() pagination?: Pagination): Promise<PaginatedResponse<UserEntity>> {
    // Custom business logic to get users
    const users = await this.userService.findActiveUsers();
    const totalCount = await this.userService.countActiveUsers();

    // Apply manual pagination if needed
    const startIndex = pagination?.skip || 0;
    const endIndex = startIndex + (pagination?.take || 10);
    const paginatedUsers = users.slice(startIndex, endIndex);

    // Create response with paginated data
    return new PaginatedResponse(paginatedUsers, totalCount, pagination);
  }

  // The response will have this structure:
  // {
  //   data: UserEntity[],
  //   rowCount: 100,
  //   page: 1,
  //   limit: 10
  // }
}
```

### Using DTOs

#### `BulkDeleteDto`

This DTO provides a standardized structure for bulk delete operations with support for both hard and soft deletes.

```typescript
import { Controller, Delete, Body } from "@nestjs/common";
import { BulkDeleteDto } from "@hichchi/nest-crud";
import { UserService } from "../services";

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Delete('bulk')
  async bulkDeleteUsers(@Body() bulkDeleteDto: BulkDeleteDto) {
    const { ids, hardDelete = false } = bulkDeleteDto;

    if (hardDelete) {
      // Permanently delete users
      return this.userService.deleteByIds(ids, true);
    } else {
      // Soft delete users (default)
      return this.userService.deleteByIds(ids);
    }
  }

  @Delete('bulk-by-condition')
  async bulkDeleteUsersByCondition(@Body() deleteDto: { where: any, hardDelete?: boolean }) {
    const { where, hardDelete = false } = deleteDto;

    return this.userService.deleteMany(where, hardDelete);
  }
}

// Example API calls:
// DELETE /users/bulk
// Body: { "ids": ["id1", "id2", "id3"], "hardDelete": false }

// DELETE /users/bulk-by-condition  
// Body: { "where": { "emailVerified": false }, "hardDelete": true }
```

## 🔧 Configuration Reference

### Complete Configuration Options

```typescript
// Database connection configuration options
interface ConnectionOptions {
  /** The database type to connect to (currently supports "mysql" and "mariadb") */
  type: DatabaseTypes;

  /** The hostname or IP address of the database server */
  host: string;

  /** The port number on which the database server is listening */
  port: number;

  /** The username for authenticating with the database server */
  username: string;

  /** The password for authenticating with the database server */
  password: string;

  /** The name of the database to connect to on the server */
  database: string;

  /** Array of paths to entity files or directories containing entities */
  entities: string[];

  /** Array of paths to migration files or directories containing migrations */
  migrations: string[];

  /** 
   * Optional character set for the database connection
   * @default undefined
   */
  charset?: string;

  /** 
   * Whether to synchronize database schema automatically on application start
   * @default false
   */
  synchronize?: boolean;

  /** 
   * Whether to use legacy spatial support for MySQL/MariaDB
   * @default false
   */
  legacySpatialSupport?: boolean;

  /** 
   * Whether to automatically load entity files from the TypeORM configuration
   * @default false
   */
  autoLoadEntities?: boolean;
}

// Supported database types
type DatabaseTypes = "mysql" | "mariadb";
```

### Configuration Examples

#### Basic Configuration

```typescript
import { ConnectionOptions, HichchiCrudModule } from "@hichchi/nest-crud";

const connectionOptions: ConnectionOptions = {
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "password",
  database: "myapp",
  entities: [__dirname + "/**/*.entity{.ts,.js}"],
  migrations: [__dirname + "/migrations/*{.ts,.js}"],
  synchronize: false,
  charset: "utf8mb4"
};

@Module({
  imports: [HichchiCrudModule.forRoot(connectionOptions)],
})
export class AppModule {}
```

#### Environment-Based Configuration

```typescript
import { ConnectionOptions } from "@hichchi/nest-crud";

const connectionOptions: ConnectionOptions = {
  type: process.env.DB_TYPE as DatabaseTypes || "mysql",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "3306", 10),
  username: process.env.DB_USERNAME || "root",
  password: process.env.DB_PASSWORD || "password",
  database: process.env.DB_NAME || "myapp",
  entities: [__dirname + "/**/*.entity{.ts,.js}"],
  migrations: [__dirname + "/migrations/*{.ts,.js}"],
  synchronize: process.env.NODE_ENV !== "production",
  charset: process.env.DB_CHARSET || "utf8mb4",
  autoLoadEntities: true
};
```

#### Production Configuration

```typescript
const connectionOptions: ConnectionOptions = {
  type: "mysql",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [__dirname + "/**/*.entity.js"],
  migrations: [__dirname + "/migrations/*.js"],
  synchronize: false, // Always false in production
  charset: "utf8mb4",
  legacySpatialSupport: false,
  autoLoadEntities: false
};
```

### Configuration Properties

#### Required Properties

- **`type`**: Database type (`"mysql"` or `"mariadb"`)
- **`host`**: Database server hostname or IP address
- **`port`**: Database server port number (typically 3306 for MySQL/MariaDB)
- **`username`**: Database authentication username
- **`password`**: Database authentication password
- **`database`**: Target database name
- **`entities`**: Paths to entity files (supports glob patterns)
- **`migrations`**: Paths to migration files (supports glob patterns)

#### Optional Properties

- **`charset`**: Character encoding for the connection (recommended: `"utf8mb4"`)
- **`synchronize`**: Auto-sync schema on startup (use `false` in production)
- **`legacySpatialSupport`**: Enable legacy spatial features for older MySQL versions
- **`autoLoadEntities`**: Automatically discover and load entities from TypeORM configuration

### Default Configuration

```typescript
const defaultConfig: Partial<ConnectionOptions> = {
  charset: undefined,
  synchronize: false,
  legacySpatialSupport: false,
  autoLoadEntities: false,
};
```

## 🔧 Development

### Building the Library
```bash
nx build nest-crud
```

### Running Tests
```bash
nx test nest-crud
```

### Linting
```bash
nx lint nest-crud
```

### Database Setup
```bash
# Run migrations
npm run typeorm:migration:run

# Seed database
npm run db:seed
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
