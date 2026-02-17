<!--suppress ALL -->

<div align="center">

# 🗃️ @hichchi/nest-crud

## Description

**NestJS CRUD extension library that extends @hichchi/nest-core functionality with comprehensive TypeORM-based CRUD operations, BaseEntity classes, advanced repositories, query builders, audit trails, soft delete, and enterprise-grade features - cannot be used independently, requires nest-core as foundation**

[![npm version](https://img.shields.io/npm/v/@hichchi/nest-crud?style=flat&color=blue)](https://www.npmjs.com/package/@hichchi/nest-crud)
[![npm downloads](https://img.shields.io/npm/dm/@hichchi/nest-crud?style=flat&color=green)](https://www.npmjs.com/package/@hichchi/nest-crud)
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
import {
  BaseRepository,
  HichchiRepository,
  Repository,
  InjectRepository,
} from "@hichchi/nest-crud";

// Repository decorator that registers the repository for dependency injection
@HichchiRepository(UserEntity)
export class UserRepository extends BaseRepository<UserEntity> {
  constructor(
    @InjectRepository(UserEntity) repository: Repository<UserEntity>,
  ) {
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
import { UserModule } from "./user/user.module";

@Module({
  imports: [
    // Configure the CRUD module with your database connection
    HichchiCrudModule.forRoot({
      // Database connection configuration
      type: "mysql", // Database type (mysql, postgres, sqlite, etc.)
      host: "localhost",
      port: 3306,
      username: "root",
      password: "your-database-password", // Use environment variables in production
      database: "your-database-name",
      charset: "utf8mb4",

      // Entity configuration
      entities: ["dist/**/entities/*.entity{.ts,.js}"], // Path to your compiled entities
      migrations: ["dist/database/migrations/*{.ts,.js}"], // Path to your migrations
      synchronize: true, // Auto-create database schema (disable in production)
      legacySpatialSupport: false,
      autoLoadEntities: true, // Automatically load entities from modules
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
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import {
  Filters,
  GetAllOptions,
  Pager,
  PaginatedResponse,
  Search,
  Sorter,
  SortOptions,
} from "@hichchi/nest-crud";
import {
  EntityId,
  Pagination,
  QueryDeepPartial,
} from "@hichchi/nest-connector/crud";
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
import {
  HichchiEntity,
  HichchiJoinColumn,
  HichchiUserEntity,
} from "@hichchi/nest-crud";
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
  declare email: string;

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

// BaseRepository provides enhanced methods with skipCreate functionality:
// - saveOne(entity, options?) - Save single entity with SaveOptionsWithSkip
// - saveAndGet(entity, options?) - Save and retrieve with SaveAndGetOptions
// - saveMany(entities, options?) - Save multiple entities with SaveOptionsWithSkip
// - get(), getOne(), getMany(), getAll()
// - update(), updateOne(), updateMany()
// - delete(), deleteOne(), deleteMany()
// - count(), transaction()

// Enhanced save operations with skipCreate:

// Save with entity creation (default behavior)
const user = await userRepository.saveOne({
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com'
});

// Save without entity creation (when data is already an entity)
const existingUser = await userRepository.getById('user-id');
existingUser.firstName = 'Updated Name';
const savedUser = await userRepository.saveOne(existingUser, { skipCreate: true });

// Save and retrieve with relations
const userWithProfile = await userRepository.saveAndGet(
  { firstName: 'Jane', email: 'jane@example.com' },
  {
    skipCreate: false,
    relations: ['profile', 'posts'],
    options: { cache: true }
  }
);

// Save multiple entities with skip creation
const existingUsers = await userRepository.getByIds({ ids: ['id1', 'id2'] });
existingUsers.forEach(user => user.isActive = true);
const savedUsers = await userRepository.saveMany(existingUsers, { skipCreate: true });

// You can add custom repository methods if needed:
async findByEmail(email: string): Promise<UserEntity | null> {
    return this.getOne({ where: { email } });
}
```

#### `BaseController`

This controller class provides a foundation for creating REST API controllers with standardized response formats and error handling.

```typescript
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from "@nestjs/common";
import { BaseController } from "@hichchi/nest-crud";
import { UserEntity } from "../entities";
import { UserService } from "../services";

@Controller("users")
export class UserController extends BaseController {
  constructor(private readonly userService: UserService) {
    super();
  }

  @Post()
  async createUser(@Body() createUserDto: Partial<UserEntity>) {
    const user = await this.userService.save(createUserDto);
    return this.success(user, "User created successfully");
  }

  @Get(":id")
  async getUser(@Param("id") id: string) {
    const user = await this.userService.get(id);
    return this.success(user);
  }
}
```

### Using Interfaces

#### `SaveOptionsWithSkip`

This interface extends TypeORM's SaveOptions to provide additional control over save operations, specifically allowing the ability to skip entity creation when certain conditions are met. This is useful for scenarios where you want to update existing entities but avoid creating new ones.

```typescript
import { SaveOptionsWithSkip } from "@hichchi/nest-crud";

// Save user data but skip creation if user doesn't exist
const options: SaveOptionsWithSkip = {
  skipCreate: true,
  transaction: false,
  reload: true,
};
const savedUser = await userRepository.saveOne(userData, options);

// Normal save operation with creation allowed
const options2: SaveOptionsWithSkip = {
  skipCreate: false, // or omit this property
  chunk: 1000,
};
const savedUsers = await userRepository.saveMany(usersData, options2);
```

**Properties:**

- `skipCreate?: boolean` - Flag to control whether new entities should be created during save operations. When set to true, the save operation will only update existing entities and skip creating new ones. When false or undefined, the normal save behavior applies (both create and update operations are performed). Defaults to false.
- All other properties from TypeORM's `SaveOptions` interface

#### `SaveAndGetOptions`

This type combines SaveOptionsWithSkip and GetByIdOptions to provide a complete configuration for operations that save an entity and then immediately retrieve it by its ID. This is useful for scenarios where you need to save data and then return the saved entity with all its computed properties, relations, and database-generated values.

```typescript
import { SaveAndGetOptions } from "@hichchi/nest-crud";

// Save a user and retrieve it with profile relation loaded
const options: SaveAndGetOptions<User> = {
  skipCreate: false,
  transaction: false,
  relations: ["profile"],
  options: { cache: true },
};
const savedUser = await userService.save(userData, options);

// Update existing user only (skip creation) and retrieve with relations
const options2: SaveAndGetOptions<User> = {
  skipCreate: true,
  reload: true,
  relations: ["profile", "posts"],
  manager: transactionManager,
};
const updatedUser = await userRepository.saveAndGet(userData, options2);

// Enhanced relations support with dot notation for nested relations
const options3: SaveAndGetOptions<User> = {
  skipCreate: false,
  relations: [
    "profile",
    "posts",
    "posts.comments", // Nested relation: posts and their comments
    "profile.address", // Nested relation: profile and its address
    "profile.address.country", // Deep nested relation: address country
  ],
};
const userWithNestedRelations = await userService.save(userData, options3);
```

**Properties:**

- All properties from `SaveOptionsWithSkip` interface
- All properties from `GetByIdOptions<Entity>` interface (excluding sort since it's not relevant for single entity retrieval by ID)
- **Enhanced Relations Support**: The `relations` property now supports dot notation for nested relations (e.g., `'profile.address.country'`), allowing you to load deeply nested related entities in a single operation

### Using Decorators

#### `@HichchiEntity`

This decorator enhances TypeORM's @Entity decorator with additional functionality for table naming, unique constraints, and foreign key validation.

```typescript
import { Column, OneToMany, OneToOne } from "typeorm";
import {
  BaseEntity,
  BaseEntityExtension,
  HichchiEntity,
  HichchiEntityExtension,
  HichchiJoinColumn,
} from "@hichchi/nest-crud";
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

  @OneToMany(() => UserEntity, (user) => user.role)
  users: UserEntity[] | null;
}
```

#### `@HichchiEntityExtension`

This decorator is specifically designed for entity extension classes that extend BaseEntityExtension. It provides validation and metadata registration for lightweight entity extensions that don't require the full audit tracking capabilities of BaseEntity.

```typescript
import { Column, OneToOne } from "typeorm";
import {
  BaseEntityExtension,
  HichchiEntityExtension,
  HichchiJoinColumn,
} from "@hichchi/nest-crud";
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
  @OneToOne(() => UserEntity, (user) => user.address)
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
import {
  BaseRepository,
  HichchiRepository,
  Repository,
  InjectRepository,
} from "@hichchi/nest-crud";
import { Like } from "typeorm";

// Repository with @HichchiRepository decorator
@HichchiRepository(UserEntity)
export class UserRepository extends BaseRepository<UserEntity> {
  constructor(
    @InjectRepository(UserEntity) repository: Repository<UserEntity>,
  ) {
    super(repository);
  }

  // Add custom methods
  async findByEmailDomain(domain: string): Promise<UserEntity[]> {
    return this.getMany({
      where: { email: Like(`%@${domain}`) },
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

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Basic filtering
  @Get()
  async getUsers(@Filters() filters?: FilterOptions<UserEntity>) {
    return this.userService.getMany({ where: filters });
  }

  // Advanced filtering with multiple parameters
  @Get("advanced")
  async getAdvancedUsers(@Filters() filters?: FilterOptions<UserEntity>) {
    return this.userService.getMany({
      where: { ...filters },
      order: sort,
      pagination,
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

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get("search")
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

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUsers(@Sorter() sort?: SortOptions<UserEntity>) {
    return this.userService.getMany({
      order: sort || { createdAt: "DESC" },
    });
  }
}

// Example API calls:
// GET /users?sort=firstName:asc,createdAt:desc
// GET /users?sort=email:asc
// GET /users?sort=updatedAt:desc,firstName:asc
```

#### `@Pager`

This decorator extracts pagination parameters from request query strings and transforms them into pagination objects for database queries. It supports optional default values for page and limit parameters.

```typescript
import { Controller, Get } from "@nestjs/common";
import { Pager } from "@hichchi/nest-crud";
import { UserService } from "../services";
import { Pagination } from "@hichchi/nest-connector/crud";

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Basic usage - requires both page and limit query parameters
  @Get()
  async getUsers(@Pager() pagination?: Pagination) {
    return this.userService.getMany({ pagination });
  }

  // With default options - provides fallback values when query parameters are missing
  @Get("with-defaults")
  async getUsersWithDefaults(
    @Pager({ page: 1, limit: 20 }) pagination?: Pagination,
  ) {
    return this.userService.getMany({ pagination });
  }

  // Combined with other decorators
  @Get("advanced")
  async getAdvancedUsers(
    @Filters() filters?: FilterOptions<UserEntity>,
    @Sorter() sort?: SortOptions<UserEntity>,
    @Pager({ page: 1, limit: 10 }) pagination?: Pagination,
  ) {
    return this.userService.getMany({
      where: filters,
      order: sort,
      pagination,
    });
  }
}

// Example API calls:
// GET /users?page=1&limit=10 (basic usage)
// GET /users?page=2&limit=25 (basic usage)
// GET /users/with-defaults?page=2 (uses default limit=20)
// GET /users/with-defaults?limit=50 (uses default page=1)
// GET /users/with-defaults (uses both defaults: page=1, limit=20)
// GET /users?page=1&limit=50&sort=createdAt:desc&emailVerified=true (combined)
```

**Note:** The `@Pager` decorator returns `undefined` if either `page` or `limit` query parameters are missing (unless default options are provided). When default options are specified, missing query parameters will use the provided defaults.

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
    LoggerService.log(
      `Sending password reset email to ${email} with token: ${token}`,
    );
    return Promise.resolve(false);
  }

  sendVerificationEmail(
    userId: EntityId,
    token: VerifyToken,
  ): Promise<boolean> {
    LoggerService.log(
      `Sending verification email to user with id: ${userId} with token: ${token}`,
    );
    return Promise.resolve(false);
  }

  signUpUser(
    userDto: SignUpDto,
    signUpType: AuthProvider,
    profileData?: GoogleProfile,
  ): Promise<User | null> {
    return this.save({ ...userDto, signUpType, profileData });
  }

  updateUserById(id: EntityId, userDto: Partial<User>): Promise<User> {
    return this.update(id, { password: userDto.password });
  }
}

// CrudService provides inherited methods like:
// - getRepository() - Access the underlying repository instance
// - save(entity, options?, createdBy?, eh?) - Save entity with SaveAndGetOptions
// - saveMany(entities, options?, createdBy?, eh?) - Save multiple entities with SaveOptionsWithSkip
// - get(), getOne(), getMany(), getAll()
// - update(), updateOne(), updateMany()
// - delete(), deleteOne(), deleteMany()
// - count(), transaction()

// Enhanced method examples:

// Get repository for custom operations
const repository = userService.getRepository();
const customQuery = await repository
  .createQueryBuilder("user")
  .where("user.email LIKE :pattern", { pattern: "%@company.com" })
  .getMany();

// Save with enhanced options
const savedUser = await userService.save(
  { firstName: "John", email: "john@example.com" },
  {
    skipCreate: false,
    relations: ["profile"],
    options: { cache: true },
  },
  currentUser,
);

// Save many with skip creation
const savedUsers = await userService.saveMany(
  existingUsers.map((user) => ({ ...user, isActive: true })),
  { skipCreate: true },
  currentUser,
);
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

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Method 1: Using service that returns PaginatedResponse automatically
  @Get()
  async getUsers(
    @Pager() pagination?: Pagination,
  ): Promise<PaginatedResponse<UserEntity> | UserEntity[]> {
    return this.userService.getMany({ pagination });
  }

  // Method 2: Manually creating PaginatedResponse instances
  @Get("manual")
  async getUsersManual(
    @Pager() pagination?: Pagination,
  ): Promise<PaginatedResponse<UserEntity>> {
    // Get data and total count from your service
    const [users, totalCount] = await this.userService.findAndCount({
      skip: pagination?.skip,
      take: pagination?.take,
      where: { deletedAt: null },
    });

    // Create and return PaginatedResponse instance
    return new PaginatedResponse(users, totalCount, pagination);
  }

  // Method 3: Creating response with custom logic
  @Get("custom")
  async getCustomUsers(
    @Pager() pagination?: Pagination,
  ): Promise<PaginatedResponse<UserEntity>> {
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

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Delete("bulk")
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

  @Delete("bulk-by-condition")
  async bulkDeleteUsersByCondition(
    @Body() deleteDto: { where: any; hardDelete?: boolean },
  ) {
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
  charset: "utf8mb4",
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
  type: (process.env.DB_TYPE as DatabaseTypes) || "mysql",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "3306", 10),
  username: process.env.DB_USERNAME || "root",
  password: process.env.DB_PASSWORD || "password",
  database: process.env.DB_NAME || "myapp",
  entities: [__dirname + "/**/*.entity{.ts,.js}"],
  migrations: [__dirname + "/migrations/*{.ts,.js}"],
  synchronize: process.env.NODE_ENV !== "production",
  charset: process.env.DB_CHARSET || "utf8mb4",
  autoLoadEntities: true,
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
  autoLoadEntities: false,
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

_Streamlining database operations with TypeORM-based CRUD, advanced repositories, audit trails, and query builders_

</div>

---

# 📖 API Documentation

Complete technical reference for all classes, interfaces, methods, and types in this library.

**Auto-generated by TypeDoc** - Browse through detailed API references, code examples, and implementation guides below.

<!-- TypeDoc generated documentation will be appended below this point -->

---

## 📋 API Table of Contents

- [Classes](#classes)
  - [BaseEntity](#baseentity-1)
  - [BaseEntityExtension](#baseentityextension)
  - [BaseRepository](#baserepository-1)
  - [BulkDeleteDto](#bulkdeletedto-1)
  - [`abstract` CrudService](#abstract-crudservice)
  - [HichchiCrudModule](#hichchicrudmodule)
  - [HichchiUserEntity](#hichchiuserentity-1)
  - [IdsDto](#idsdto)
  - [Repository](#repository)
- [Enumerations](#enumerations)
  - [Operation](#operation)
  - [TypeORMErrorType](#typeormerrortype)
- [Functions](#functions)
  - [Filters()](#filters-1)
  - [HichchiEntity()](#hichchientity-1)
  - [HichchiEntityExtension()](#hichchientityextension-1)
  - [HichchiJoinColumn()](#hichchijoincolumn)
  - [HichchiRepository()](#hichchirepository-1)
  - [Pager()](#pager-1)
  - [Search()](#search-1)
  - [Sorter()](#sorter-1)
- [Interfaces](#interfaces)
  - [ConnectionOptions](#connectionoptions)
  - [GetByIdsOptions](#getbyidsoptions)
  - [GetManyOptionsFilter](#getmanyoptionsfilter)
  - [GetManyOptionsNot](#getmanyoptionsnot)
  - [GetManyOptionsSearch](#getmanyoptionssearch)
  - [GetManyOptionsWhere](#getmanyoptionswhere)
  - [GetOneOptionsFilter](#getoneoptionsfilter)
  - [GetOneOptionsNot](#getoneoptionsnot)
  - [GetOneOptionsSearch](#getoneoptionssearch)
  - [GetOneOptionsWhere](#getoneoptionswhere)
  - [PaginatedGetOptions](#paginatedgetoptions)
  - [QueryOptions](#queryoptions)
  - [QueryOptionsFilter](#queryoptionsfilter)
  - [QueryOptionsNot](#queryoptionsnot)
  - [QueryOptionsSearch](#queryoptionssearch)
  - [QueryOptionsWhere](#queryoptionswhere)
  - [SaveOptionsWithSkip](#saveoptionswithskip-1)
- [Type Aliases](#type-aliases)
  - [DatabaseTypes](#databasetypes)
  - [EntityDecorator()](#entitydecorator)
  - [EntityExtensionDecorator()](#entityextensiondecorator)
  - [EntityOptionUnique](#entityoptionunique)
  - [FilterOptions](#filteroptions)
  - [FindConditions](#findconditions)
  - [GetAllOptions](#getalloptions)
  - [GetByIdOptions](#getbyidoptions)
  - [GetManyOptions](#getmanyoptions)
  - [GetOneOptions](#getoneoptions)
  - [GetOptions](#getoptions)
  - [RepositoryDecorator()](#repositorydecorator)
  - [SaveAndGetOptions](#saveandgetoptions-1)
  - [SortOptions](#sortoptions)
  - [TypeORMErrorHandler()](#typeormerrorhandler)
- [Variables](#variables)
  - [BaseEntityTemplateRelations](#baseentitytemplaterelations)
  - [CONNECTION_OPTIONS](#connection_options)
  - [DEFAULT_MAX_RECURSION_DEPTH](#default_max_recursion_depth)
  - [EXTRACT_INVALID_COLUMN_REGEX](#extract_invalid_column_regex)
  - [EXTRACT_INVALID_QUERY_FIELD_REGEX](#extract_invalid_query_field_regex)
  - [FK_CONSTRAINT_REGEX](#fk_constraint_regex)
  - [ID_PATH](#id_path)
  - [ID_PATH_VAR](#id_path_var)
  - [InjectRepository()](#injectrepository)
  - [UNIQUE_CONSTRAINT_REGEX](#unique_constraint_regex)
  - [USER_ENTITY_TABLE_NAME](#user_entity_table_name)

## Classes

### BaseEntity

Defined in: [libs/nest-crud/src/base/base-entity.ts:51](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/base/base-entity.ts#L51)

Base entity class that provides common fields and functionality for all entities

This class serves as the foundation for all entities in the application, providing:

- A UUID primary key
- Automatic timestamp tracking (creation, update, deletion)
- User tracking for all operations (who created, updated, or deleted the entity)
- Automatic mapping of user entities to a simplified format

All entities in the application should extend this class to ensure consistent
structure and behavior across the data model.

#### Example

```typescript
@HichchiEntity("products")
export class ProductEntity extends BaseEntity {
  @Column()
  name: string;

  @Column("text")
  description: string;

  @Column("decimal")
  price: number;
}
```

#### Implements

Interface from @hichchi/nest-connector/crud

#### See

[HichchiEntity](#hichchientity) Decorator used to define entities

#### Implements

- `Model`

#### Constructors

##### Constructor

```ts
new BaseEntity(): BaseEntity;
```

###### Returns

[`BaseEntity`](#baseentity)

#### Methods

##### afterLoad()?

```ts
protected optional afterLoad(): void;
```

Defined in: [libs/nest-crud/src/base/base-entity.ts:156](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/base/base-entity.ts#L156)

Lifecycle hook that runs after an entity is loaded from the database

This method is automatically called by TypeORM after an entity is loaded.
It maps the user entities (createdBy, updatedBy, deletedBy) to a simplified format
using the private \_mapUserEntity method to ensure only essential user information
is included.

###### Returns

`void`

###### See

UserInfo The interface that defines the user information structure

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

<a id="property-createdat"></a> `createdAt`

</td>
<td>

`Date`

</td>
<td>

Timestamp when the entity was created

This field is automatically set to the current timestamp when the entity is created.
It is not nullable and cannot be changed after creation.

</td>
<td>

[libs/nest-crud/src/base/base-entity.ts:68](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/base/base-entity.ts#L68)

</td>
</tr>
<tr>
<td>

<a id="property-createdby"></a> `createdBy`

</td>
<td>

`UserInfo` | `null`

</td>
<td>

User who created the entity

This field stores a reference to the user who created the entity.
It is automatically loaded when the entity is retrieved with relations.

</td>
<td>

[libs/nest-crud/src/base/base-entity.ts:105](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/base/base-entity.ts#L105)

</td>
</tr>
<tr>
<td>

<a id="property-createdbyid"></a> `createdById`

</td>
<td>

`EntityId` | `null`

</td>
<td>

ID of the user who created the entity

This field stores the ID of the user who created the entity.
It is used for the foreign key relationship with the createdBy field.

</td>
<td>

[libs/nest-crud/src/base/base-entity.ts:95](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/base/base-entity.ts#L95)

</td>
</tr>
<tr>
<td>

<a id="property-deletedat"></a> `deletedAt`

</td>
<td>

`Date` | `null`

</td>
<td>

Timestamp when the entity was soft-deleted

This field is automatically set when the entity is soft-deleted using TypeORM's
soft delete functionality. When this field has a value, the entity is considered deleted.

</td>
<td>

[libs/nest-crud/src/base/base-entity.ts:86](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/base/base-entity.ts#L86)

</td>
</tr>
<tr>
<td>

<a id="property-deletedby"></a> `deletedBy`

</td>
<td>

`UserInfo` | `null`

</td>
<td>

User who deleted the entity

This field stores a reference to the user who deleted the entity.
It is automatically loaded when the entity is retrieved with relations.

</td>
<td>

[libs/nest-crud/src/base/base-entity.ts:143](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/base/base-entity.ts#L143)

</td>
</tr>
<tr>
<td>

<a id="property-deletedbyid"></a> `deletedById`

</td>
<td>

`EntityId` | `null`

</td>
<td>

ID of the user who deleted the entity

This field stores the ID of the user who deleted the entity.
It is used for the foreign key relationship with the deletedBy field.

</td>
<td>

[libs/nest-crud/src/base/base-entity.ts:133](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/base/base-entity.ts#L133)

</td>
</tr>
<tr>
<td>

<a id="property-id"></a> `id`

</td>
<td>

`EntityId`

</td>
<td>

Unique identifier for the entity

This UUID is automatically generated when the entity is created.
It serves as the primary key for the entity in the database.

</td>
<td>

[libs/nest-crud/src/base/base-entity.ts:59](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/base/base-entity.ts#L59)

</td>
</tr>
<tr>
<td>

<a id="property-updatedat"></a> `updatedAt`

</td>
<td>

`Date`

</td>
<td>

Timestamp when the entity was last updated

This field is automatically set to the current timestamp when the entity is created
and updated whenever the entity is modified.

</td>
<td>

[libs/nest-crud/src/base/base-entity.ts:77](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/base/base-entity.ts#L77)

</td>
</tr>
<tr>
<td>

<a id="property-updatedby"></a> `updatedBy`

</td>
<td>

`UserInfo` | `null`

</td>
<td>

User who last updated the entity

This field stores a reference to the user who last updated the entity.
It is automatically loaded when the entity is retrieved with relations.

</td>
<td>

[libs/nest-crud/src/base/base-entity.ts:124](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/base/base-entity.ts#L124)

</td>
</tr>
<tr>
<td>

<a id="property-updatedbyid"></a> `updatedById`

</td>
<td>

`EntityId` | `null`

</td>
<td>

ID of the user who last updated the entity

This field stores the ID of the user who last updated the entity.
It is used for the foreign key relationship with the updatedBy field.

</td>
<td>

[libs/nest-crud/src/base/base-entity.ts:114](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/base/base-entity.ts#L114)

</td>
</tr>
</tbody>
</table>

---

### BaseEntityExtension

Defined in: [libs/nest-crud/src/base/base-entity-extension.ts:43](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/base/base-entity-extension.ts#L43)

Base entity extension class that provides a minimal entity structure

This class serves as a lightweight foundation for entity extensions or related models
that only need an ID field but don't require the full audit tracking capabilities of
the BaseEntity class. It implements the ModelExtension interface, which is a minimal
version of the Model interface.

Entities created with BaseEntityExtension serve the purpose of extending entities created
with BaseEntity, as shown in the example where ProductImageEntity extends ProductEntity
through a one-to-one relationship. This pattern allows you to add additional properties
to an entity without modifying its core structure.

Use this class when you need to create an entity that:

- Requires a UUID primary key
- Does not need creation, update, or deletion tracking
- Does not need user attribution for operations
- Extends an existing entity created with BaseEntity

#### Example

```typescript
@HichchiEntityExtension("product_images")
export class ProductImageEntity extends BaseEntityExtension {
  @Column()
  url: string;

  @OneToOne(() => ProductEntity)
  @HichchiJoinColumn()
  product: ProductEntity;
}
```

#### Implements

Interface from @hichchi/nest-connector/crud

#### See

- [BaseEntity](#baseentity) The full entity class with comprehensive audit tracking
- [HichchiEntityExtension](#hichchientityextension) The decorator required for entity extensions
- [HichchiJoinColumn](#hichchijoincolumn) The decorator required for entity relationships

#### Implements

- `ModelExtension`

#### Constructors

##### Constructor

```ts
new BaseEntityExtension(): BaseEntityExtension;
```

###### Returns

[`BaseEntityExtension`](#baseentityextension)

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

<a id="property-id-1"></a> `id`

</td>
<td>

`EntityId`

</td>
<td>

Unique identifier for the entity extension

This UUID is automatically generated when the entity is created.
It serves as the primary key for the entity in the database.

</td>
<td>

[libs/nest-crud/src/base/base-entity-extension.ts:51](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/base/base-entity-extension.ts#L51)

</td>
</tr>
</tbody>
</table>

---

### BaseRepository

Defined in: [libs/nest-crud/src/base/base-repository.ts:97](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/base/base-repository.ts#L97)

Base Repository Class that extends TypeORM's Repository with enhanced functionality

This class extends TypeORM's Repository class and provides additional functionality
for working with entities. It serves as the foundation for all repositories in the
application, ensuring consistent data access patterns and reducing boilerplate code.

Key features:

- Enhanced CRUD operations with more intuitive methods
- Automatic transaction management
- Advanced query building with support for complex filters
- Soft delete support with both soft and hard delete methods
- Convenience methods for common operations like saveAndGet, updateAndGet
- Type-safe query building with proper TypeScript support

The class is designed to be used with the HichchiRepository decorator, which
automatically injects the TypeORM repository and handles dependency injection.

#### Examples

```typescript
// Basic repository for UserEntity
@HichchiRepository(UserEntity)
export class UserRepository extends BaseRepository<UserEntity> {
  // Custom methods specific to UserEntity
  async findByEmail(email: string): Promise<UserEntity | null> {
    return this.getOne({ where: { email } });
  }
}
```

```typescript
// Repository for a lightweight entity extension
@HichchiRepository(ProductImageEntity)
export class ProductImageRepository extends BaseRepository<ProductImageEntity> {
  // The Entity type parameter ensures type safety for all operations
  async findByProductId(productId: string): Promise<ProductImageEntity[]> {
    return this.getMany({
      where: { product: { id: productId } },
      relations: ["product"],
    }).then(([images]) => images);
  }
}
```

#### See

- [HichchiRepository](#hichchirepository) The decorator used to create repository instances
- Model The base interface for entities with full audit tracking
- ModelExtension The base interface for lightweight entity extensions
- [BaseEntity](#baseentity) The base class for entities with full audit tracking
- [BaseEntityExtension](#baseentityextension) The base class for lightweight entity extensions

#### Extends

- [`Repository`](#repository)<`Entity`>

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

`Entity` _extends_ `Model` | `ModelExtension`

</td>
<td>

The entity type this repository manages. This type parameter represents
the entity class that the repository will work with. It must extend either
the Model interface (for full entities with audit tracking) or the
ModelExtension interface (for lightweight entity extensions).

```
               The Entity type is used throughout the repository to provide type safety
               for all operations, ensuring that only properties and methods available
               on the entity can be accessed. It's also used to type the return values
               of query methods, making the API fully type-safe.

               Common entity types used with this repository include:
               - UserEntity - For user data management
               - ProductEntity - For product data management
               - Any custom entity that extends BaseEntity or BaseEntityExtension
```

</td>
</tr>
</tbody>
</table>

#### Accessors

##### entityRepository

###### Get Signature

```ts
get entityRepository(): Repository<Entity>;
```

Defined in: [libs/nest-crud/src/base/base-repository.ts:126](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/base/base-repository.ts#L126)

Get the appropriate repository instance for the current context

This getter returns a repository that uses the transaction manager if one exists,
or the default manager otherwise. This ensures that all operations within a
transaction use the same manager.

###### See

- [transaction](#transaction) Method that sets up the transaction manager
- [Repository](#repository) TypeORM's Repository class

###### Returns

[`Repository`](#repository)<`Entity`>

The repository instance for the current context

##### metadata

###### Get Signature

```ts
get metadata(): EntityMetadata;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:40

Entity metadata of the entity current repository manages.

###### Returns

`EntityMetadata`

###### Inherited from

[`Repository`](#repository).[`metadata`](#metadata-1)

#### Constructors

##### Constructor

```ts
new BaseRepository<Entity>(repository): BaseRepository<Entity>;
```

Defined in: [libs/nest-crud/src/base/base-repository.ts:110](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/base/base-repository.ts#L110)

Constructor for the BaseRepository

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

`repository`

</td>
<td>

[`Repository`](#repository)<`Entity`>

</td>
<td>

The TypeORM repository to extend

</td>
</tr>
</tbody>
</table>

###### Returns

[`BaseRepository`](#baserepository)<`Entity`>

###### Overrides

[`Repository`](#repository).[`constructor`](#constructor-8)

#### Methods

##### average()

```ts
average(columnName, where?): Promise<number | null>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:245

Return the AVG of a column

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

`columnName`

</td>
<td>

`PickKeysByType`<`Entity`, `number`>

</td>
</tr>
<tr>
<td>

`where?`

</td>
<td>

`FindOptionsWhere`<`Entity`> | `FindOptionsWhere`<`Entity`>\[]

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`number` | `null`>

###### Inherited from

[`Repository`](#repository).[`average`](#average-1)

##### clear()

```ts
clear(): Promise<void>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:337

Clears all the data from the given table/collection (truncates/drops it).

Note: this method uses TRUNCATE and may not work as you expect in transactions on some platforms.

###### Returns

`Promise`<`void`>

###### See

https://stackoverflow.com/a/5972738/925151

###### Inherited from

[`Repository`](#repository).[`clear`](#clear-1)

##### count()

```ts
count(options?): Promise<number>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:232

Counts entities that match given options.
Useful for pagination.

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

`FindManyOptions`<`Entity`>

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`number`>

###### Inherited from

[`Repository`](#repository).[`count`](#count-2)

##### countBy()

```ts
countBy(where): Promise<number>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:237

Counts entities that match given conditions.
Useful for pagination.

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

`where`

</td>
<td>

`FindOptionsWhere`<`Entity`> | `FindOptionsWhere`<`Entity`>\[]

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`number`>

###### Inherited from

[`Repository`](#repository).[`countBy`](#countby-1)

##### countMany()

```ts
countMany(options?): Promise<number>;
```

Defined in: [libs/nest-crud/src/base/base-repository.ts:759](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/base/base-repository.ts#L759)

Count entities matching the specified criteria

This method counts the number of entities that match the provided criteria.

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

[`GetManyOptions`](#getmanyoptions)<`Entity`>

</td>
<td>

Options for the query

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`number`>

The count of matching entities

###### Example

```typescript
const count = await userRepository.countMany({
  where: { role: "user", isActive: true },
});
```

###### See

- [Repository.count](#count-2) TypeORM's count method that this uses internally
- [getMany](#getmany) Method to retrieve entities and their count
- [generateOptions](#generateoptions) Method used to transform query options
- [GetManyOptions](#getmanyoptions) Options for retrieving multiple entities

##### create()

Implementation of the create method

This is the actual implementation that handles all the overloads.

###### Template

The type of the entity data

###### Template

The entity type this repository manages

###### Param

The data to create entities with

###### Call Signature

```ts
create(): Entity;
```

Defined in: [libs/nest-crud/src/base/base-repository.ts:147](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/base/base-repository.ts#L147)

Create a new entity instance

This overload creates an empty entity instance with default values.

###### Returns

`Entity`

A new entity instance

###### Example

```typescript
const user = userRepository.create();
user.firstName = "John";
user.lastName = "Doe";
```

###### See

- [Repository.create](#create-2) TypeORM's create method that this extends
- DeepPartial TypeORM's type for partial entity data

###### Overrides

[`Repository`](#repository).[`create`](#create-2)

###### Call Signature

```ts
create<T>(entityLike): Entity;
```

Defined in: [libs/nest-crud/src/base/base-repository.ts:171](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/base/base-repository.ts#L171)

Create a new entity instance with the provided data

This overload creates an entity instance populated with the provided data.

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

`T` _extends_
| {
`createdAt?`: `EntityPropertyDeepPartial`<`Date`>;
`createdBy?`: `EntityPropertyDeepPartial`<`UserInfo` | `null`>;
`createdById?`: `EntityPropertyDeepPartial`<`EntityId` | `null`>;
`deletedAt?`: `EntityPropertyDeepPartial`<`Date` | `null`>;
`deletedBy?`: `EntityPropertyDeepPartial`<`UserInfo` | `null`>;
`deletedById?`: `EntityPropertyDeepPartial`<`EntityId` | `null`>;
`id?`: `EntityPropertyDeepPartial`<`EntityId`>;
`updatedAt?`: `EntityPropertyDeepPartial`<`Date`>;
`updatedBy?`: `EntityPropertyDeepPartial`<`UserInfo` | `null`>;
`updatedById?`: `EntityPropertyDeepPartial`<`EntityId` | `null`>;
}
| {
`id?`: `EntityPropertyDeepPartial`<`EntityId`>;
}

</td>
<td>

The type of the entity data

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

`entityLike`

</td>
<td>

`T`

</td>
<td>

The data to populate the entity with

</td>
</tr>
</tbody>
</table>

###### Returns

`Entity`

A new entity instance

###### Example

```typescript
const user = userRepository.create({
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
});
```

###### See

- [Repository.create](#create-2) TypeORM's create method that this extends
- DeepPartial TypeORM's type for partial entity data

###### Overrides

[`Repository`](#repository).[`create`](#create-2)

###### Call Signature

```ts
create<T>(entityLikeArray): Entity[];
```

Defined in: [libs/nest-crud/src/base/base-repository.ts:194](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/base/base-repository.ts#L194)

Create multiple entity instances

This overload creates multiple entity instances from an array of data.

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

`T` _extends_
| {
`createdAt?`: `EntityPropertyDeepPartial`<`Date`>;
`createdBy?`: `EntityPropertyDeepPartial`<`UserInfo` | `null`>;
`createdById?`: `EntityPropertyDeepPartial`<`EntityId` | `null`>;
`deletedAt?`: `EntityPropertyDeepPartial`<`Date` | `null`>;
`deletedBy?`: `EntityPropertyDeepPartial`<`UserInfo` | `null`>;
`deletedById?`: `EntityPropertyDeepPartial`<`EntityId` | `null`>;
`id?`: `EntityPropertyDeepPartial`<`EntityId`>;
`updatedAt?`: `EntityPropertyDeepPartial`<`Date`>;
`updatedBy?`: `EntityPropertyDeepPartial`<`UserInfo` | `null`>;
`updatedById?`: `EntityPropertyDeepPartial`<`EntityId` | `null`>;
}
| {
`id?`: `EntityPropertyDeepPartial`<`EntityId`>;
}

</td>
<td>

The type of the entity data

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

`entityLikeArray`

</td>
<td>

`T`\[]

</td>
<td>

Array of data to create entities with

</td>
</tr>
</tbody>
</table>

###### Returns

`Entity`\[]

Array of new entity instances

###### Example

```typescript
const users = userRepository.create([
  { firstName: "John", lastName: "Doe", email: "john.doe@example.com" },
  { firstName: "Jane", lastName: "Smith", email: "jane.smith@example.com" },
]);
```

###### See

- [Repository.create](#create-2) TypeORM's create method that this extends
- DeepPartial TypeORM's type for partial entity data

###### Overrides

[`Repository`](#repository).[`create`](#create-2)

##### createQueryBuilder()

```ts
createQueryBuilder(alias?, queryRunner?): SelectQueryBuilder<Entity>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:45

Creates a new query builder that can be used to build a SQL query.

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

`alias?`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`queryRunner?`

</td>
<td>

`QueryRunner`

</td>
</tr>
</tbody>
</table>

###### Returns

`SelectQueryBuilder`<`Entity`>

###### Inherited from

[`Repository`](#repository).[`createQueryBuilder`](#createquerybuilder-1)

##### decrement()

```ts
decrement(
   conditions,
   propertyPath,
value): Promise<UpdateResult>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:345

Decrements some column by provided value of the entities matched given conditions.

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

`conditions`

</td>
<td>

`FindOptionsWhere`<`Entity`>

</td>
</tr>
<tr>
<td>

`propertyPath`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`value`

</td>
<td>

`string` | `number`

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`UpdateResult`>

###### Inherited from

[`Repository`](#repository).[`decrement`](#decrement-1)

##### delete()

```ts
delete(criteria): Promise<DeleteResult>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:189

Deletes entities by a given criteria.
Unlike save method executes a primitive operation without cascades, relations and other operations included.
Executes fast and efficient DELETE query.
Does not check if entity exist in the database.

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

`criteria`

</td>
<td>

| `string` | `number` | `string`\[] | `number`\[] | `Date` | `ObjectId` | `Date`\[] | `ObjectId`\[] | `FindOptionsWhere`<`Entity`> | `FindOptionsWhere`<`Entity`>\[]

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`DeleteResult`>

###### Inherited from

[`Repository`](#repository).[`delete`](#delete-2)

##### deleteAll()

```ts
deleteAll(): Promise<DeleteResult>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:197

Deletes all entities of target type.
This is a primitive operation without cascades, relations or other operations included.
Executes fast and efficient DELETE query without WHERE clause.

WARNING! This method deletes ALL rows in the target table.

###### Returns

`Promise`<`DeleteResult`>

###### Inherited from

[`Repository`](#repository).[`deleteAll`](#deleteall-1)

##### deleteById()

```ts
deleteById(id): Promise<DeleteResult>;
```

Defined in: [libs/nest-crud/src/base/base-repository.ts:660](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/base/base-repository.ts#L660)

Soft delete an entity by ID

This method marks an entity as deleted without actually removing it from the database.
It sets the deletedAt timestamp to the current time.

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

`id`

</td>
<td>

`EntityId`

</td>
<td>

The ID of the entity to delete

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`DeleteResult`>

The result of the delete operation

###### Example

```typescript
const result = await userRepository.delete("user-id");
```

###### See

- [deleteByIds](#deletebyids) Method to soft delete multiple entities by their IDs
- [hardDeleteById](#harddeletebyid) Method to permanently delete an entity
- EntityId Type for entity IDs
- DeleteResult TypeORM's result type for delete operations

##### deleteByIds()

```ts
deleteByIds(ids): Promise<DeleteResult>;
```

Defined in: [libs/nest-crud/src/base/base-repository.ts:684](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/base/base-repository.ts#L684)

Soft delete multiple entities by their IDs

This method marks multiple entities as deleted without actually removing them from the database.
It sets the deletedAt timestamp to the current time for all entities with IDs in the provided array.

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

`ids`

</td>
<td>

`EntityId`\[]

</td>
<td>

Array of entity IDs to delete

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`DeleteResult`>

The result of the delete operation

###### Example

```typescript
const result = await userRepository.deleteByIds(["user-id-1", "user-id-2"]);
```

###### See

- [deleteById](#deletebyid) Method to soft delete a single entity by ID
- [hardDeleteByIds](#harddeletebyids) Method to permanently delete multiple entities
- EntityId Type for entity IDs
- DeleteResult TypeORM's result type for delete operations

##### ~~exist()~~

```ts
exist(options?): Promise<boolean>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:219

Checks whether any entity exists that matches the given options.

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

`FindManyOptions`<`Entity`>

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`boolean`>

###### Deprecated

use `exists` method instead, for example:

.exists()

###### Inherited from

[`Repository`](#repository).[`exist`](#exist-1)

##### exists()

```ts
exists(options?): Promise<boolean>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:223

Checks whether any entity exists that matches the given options.

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

`FindManyOptions`<`Entity`>

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`boolean`>

###### Inherited from

[`Repository`](#repository).[`exists`](#exists-1)

##### existsBy()

```ts
existsBy(where): Promise<boolean>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:227

Checks whether any entity exists that matches the given conditions.

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

`where`

</td>
<td>

`FindOptionsWhere`<`Entity`> | `FindOptionsWhere`<`Entity`>\[]

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`boolean`>

###### Inherited from

[`Repository`](#repository).[`existsBy`](#existsby-1)

##### extend()

```ts
extend<CustomRepository>(customs): BaseRepository<Entity> & CustomRepository;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:349

Extends repository with provided functions.

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

`CustomRepository`

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

`customs`

</td>
<td>

`CustomRepository` & `ThisType`<[`BaseRepository`](#baserepository)<`Entity`> & `CustomRepository`>

</td>
</tr>
</tbody>
</table>

###### Returns

[`BaseRepository`](#baserepository)<`Entity`> & `CustomRepository`

###### Inherited from

[`Repository`](#repository).[`extend`](#extend-1)

##### find()

```ts
find(options?): Promise<Entity[]>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:257

Finds entities that match given find options.

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

`FindManyOptions`<`Entity`>

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`Entity`\[]>

###### Inherited from

[`Repository`](#repository).[`find`](#find-1)

##### findAndCount()

```ts
findAndCount(options?): Promise<[Entity[], number]>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:267

Finds entities that match given find options.
Also counts all entities that match given conditions,
but ignores pagination settings (from and take options).

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

`FindManyOptions`<`Entity`>

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<\[`Entity`\[], `number`]>

###### Inherited from

[`Repository`](#repository).[`findAndCount`](#findandcount-1)

##### findAndCountBy()

```ts
findAndCountBy(where): Promise<[Entity[], number]>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:273

Finds entities that match given WHERE conditions.
Also counts all entities that match given conditions,
but ignores pagination settings (from and take options).

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

`where`

</td>
<td>

`FindOptionsWhere`<`Entity`> | `FindOptionsWhere`<`Entity`>\[]

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<\[`Entity`\[], `number`]>

###### Inherited from

[`Repository`](#repository).[`findAndCountBy`](#findandcountby-1)

##### findBy()

```ts
findBy(where): Promise<Entity[]>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:261

Finds entities that match given find options.

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

`where`

</td>
<td>

`FindOptionsWhere`<`Entity`> | `FindOptionsWhere`<`Entity`>\[]

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`Entity`\[]>

###### Inherited from

[`Repository`](#repository).[`findBy`](#findby-1)

##### ~~findByIds()~~

```ts
findByIds(ids): Promise<Entity[]>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:284

Finds entities with ids.
Optionally find options or conditions can be applied.

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

`ids`

</td>
<td>

`any`\[]

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`Entity`\[]>

###### Deprecated

use `findBy` method instead in conjunction with `In` operator, for example:

.findBy({
id: In(\[1, 2, 3])
})

###### Inherited from

[`Repository`](#repository).[`findByIds`](#findbyids-1)

##### findOne()

```ts
findOne(options): Promise<Entity | null>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:289

Finds first entity by a given find options.
If entity was not found in the database - returns null.

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

`options`

</td>
<td>

`FindOneOptions`<`Entity`>

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`Entity` | `null`>

###### Inherited from

[`Repository`](#repository).[`findOne`](#findone-1)

##### findOneBy()

```ts
findOneBy(where): Promise<Entity | null>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:294

Finds first entity that matches given where condition.
If entity was not found in the database - returns null.

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

`where`

</td>
<td>

`FindOptionsWhere`<`Entity`> | `FindOptionsWhere`<`Entity`>\[]

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`Entity` | `null`>

###### Inherited from

[`Repository`](#repository).[`findOneBy`](#findoneby-1)

##### ~~findOneById()~~

```ts
findOneById(id): Promise<Entity | null>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:305

Finds first entity that matches given id.
If entity was not found in the database - returns null.

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

`id`

</td>
<td>

`string` | `number` | `Date` | `ObjectId`

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`Entity` | `null`>

###### Deprecated

use `findOneBy` method instead in conjunction with `In` operator, for example:

.findOneBy({
id: 1 // where "id" is your primary column name
})

###### Inherited from

[`Repository`](#repository).[`findOneById`](#findonebyid-1)

##### findOneByOrFail()

```ts
findOneByOrFail(where): Promise<Entity>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:315

Finds first entity that matches given where condition.
If entity was not found in the database - rejects with error.

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

`where`

</td>
<td>

`FindOptionsWhere`<`Entity`> | `FindOptionsWhere`<`Entity`>\[]

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`Entity`>

###### Inherited from

[`Repository`](#repository).[`findOneByOrFail`](#findonebyorfail-1)

##### findOneOrFail()

```ts
findOneOrFail(options): Promise<Entity>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:310

Finds first entity by a given find options.
If entity was not found in the database - rejects with error.

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

`options`

</td>
<td>

`FindOneOptions`<`Entity`>

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`Entity`>

###### Inherited from

[`Repository`](#repository).[`findOneOrFail`](#findoneorfail-1)

##### generateOptions()

```ts
generateOptions(getOptions): FindOneOptions<Entity>;
```

Defined in: [libs/nest-crud/src/base/base-repository.ts:837](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/base/base-repository.ts#L837)

Generate TypeORM query options from Hichchi query options

This utility method transforms the high-level query options used in Hichchi
repositories into the lower-level options expected by TypeORM. It handles
various query aspects including:

- Where conditions and filters
- Search conditions with ILike operators
- Negation conditions with Not operators
- Relations to include
- Pagination parameters
- Sorting options

The method also ensures that soft-deleted entities are excluded by default.

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

`getOptions`

</td>
<td>

[`GetOptions`](#getoptions)<`Entity`>

</td>
<td>

The Hichchi query options

</td>
</tr>
</tbody>
</table>

###### Returns

`FindOneOptions`<`Entity`>

TypeORM query options

###### See

- [GetOptions](#getoptions) The high-level query options interface
- FindOneOptions TypeORM's query options interface
- [orWhere](#orwhere) Method used to process search and negation conditions
- [getOne](#getone) Method that uses this to generate options
- [getMany](#getmany) Method that uses this to generate options
- ILike TypeORM's case-insensitive LIKE operator
- Not TypeORM's negation operator

##### getById()

```ts
getById(id, options?): Promise<Entity | null>;
```

Defined in: [libs/nest-crud/src/base/base-repository.ts:538](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/base/base-repository.ts#L538)

Get an entity by ID

This method retrieves an entity with the specified ID from the database.
It can include relations and other options for the query.

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

`id`

</td>
<td>

`EntityId`

</td>
<td>

The ID of the entity to retrieve

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

[`GetByIdOptions`](#getbyidoptions)<`Entity`>

</td>
<td>

Options for the query

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`Entity` | `null`>

The entity if found, null otherwise

###### Example

```typescript
const user = await userRepository.get("user-id", {
  relations: ["posts", "profile"],
});
```

###### See

- [getOne](#getone) Method used internally to perform the query
- [getByIds](#getbyids) Method to retrieve multiple entities by their IDs
- [getMany](#getmany) Method to retrieve multiple entities by criteria
- EntityId Type for entity IDs
- [GetByIdOptions](#getbyidoptions) Options for retrieving an entity by ID

##### getByIds()

```ts
getByIds(getByIds): Promise<Entity[]>;
```

Defined in: [libs/nest-crud/src/base/base-repository.ts:569](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/base/base-repository.ts#L569)

Get multiple entities by their IDs

This method retrieves entities with IDs in the provided array from the database.
It can include relations, pagination, sorting, and other options for the query.

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

`getByIds`

</td>
<td>

[`GetByIdsOptions`](#getbyidsoptions)<`Entity`>

</td>
<td>

Options for the query including IDs

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`Entity`\[]>

Array of entities matching the IDs

###### Example

```typescript
const users = await userRepository.getByIds({
  ids: ["user-id-1", "user-id-2", "user-id-3"],
  relations: ["profile"],
  sort: { firstName: "ASC" },
});
```

###### See

- [getMany](#getmany) Method used internally to perform the query
- [getById](#getbyid) Method to retrieve a single entity by ID
- [GetByIdsOptions](#getbyidsoptions) Options for retrieving entities by IDs
- EntityId Type for entity IDs

##### getId()

```ts
getId(entity): any;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:54

Gets entity mixed id.

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

`entity`

</td>
<td>

`Entity`

</td>
</tr>
</tbody>
</table>

###### Returns

`any`

###### Inherited from

[`Repository`](#repository).[`getId`](#getid-1)

##### getMany()

```ts
getMany(getMany): Promise<[Entity[], number]>;
```

Defined in: [libs/nest-crud/src/base/base-repository.ts:636](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/base/base-repository.ts#L636)

Get multiple entities matching the specified criteria

This method retrieves all entities that match the provided criteria.
It returns both the entities and the total count.

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

`getMany`

</td>
<td>

[`GetManyOptions`](#getmanyoptions)<`Entity`>

</td>
<td>

Options for the query

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<\[`Entity`\[], `number`]>

Array of entities and total count

###### Example

```typescript
const [users, count] = await userRepository.getMany({
  where: { role: "user" },
  relations: ["profile"],
  pagination: { skip: 0, take: 10 },
  sort: { createdAt: "DESC" },
});
```

###### See

- [getOne](#getone) Method to retrieve a single entity
- [getByIds](#getbyids) Method to retrieve entities by their IDs
- [generateOptions](#generateoptions) Method used to transform query options
- [GetManyOptions](#getmanyoptions) Options for retrieving multiple entities
- FindManyOptions TypeORM's options for find queries
- [countMany](#countmany) Method to count entities without retrieving them

##### getOne()

```ts
getOne(getOne): Promise<Entity | null>;
```

Defined in: [libs/nest-crud/src/base/base-repository.ts:605](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/base/base-repository.ts#L605)

Get a single entity matching the specified criteria

This method retrieves the first entity that matches the provided criteria.

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

`getOne`

</td>
<td>

[`GetOneOptions`](#getoneoptions)<`Entity`>

</td>
<td>

Options for the query

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`Entity` | `null`>

The entity if found, null otherwise

###### Example

```typescript
const user = await userRepository.getOne({
  where: { email: "john.doe@example.com" },
  relations: ["profile"],
});
```

###### See

- [getById](#getbyid) Method to retrieve an entity by ID
- [getMany](#getmany) Method to retrieve multiple entities
- [generateOptions](#generateoptions) Method used to transform query options
- [GetOneOptions](#getoneoptions) Options for retrieving a single entity
- FindOneOptions TypeORM's options for findOne queries

##### hardDeleteById()

```ts
hardDeleteById(id): Promise<DeleteResult>;
```

Defined in: [libs/nest-crud/src/base/base-repository.ts:709](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/base/base-repository.ts#L709)

Permanently delete an entity by ID

This method permanently removes an entity from the database.
Unlike the delete method, this cannot be undone.

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

`id`

</td>
<td>

`EntityId`

</td>
<td>

The ID of the entity to delete

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`DeleteResult`>

The result of the delete operation

###### Example

```typescript
const result = await userRepository.hardDelete("user-id");
```

###### See

- [Repository.delete](#delete-2) TypeORM's delete method that this uses internally
- [deleteById](#deletebyid) Method to soft delete an entity
- [hardDeleteByIds](#harddeletebyids) Method to permanently delete multiple entities
- EntityId Type for entity IDs
- DeleteResult TypeORM's result type for delete operations

##### hardDeleteByIds()

```ts
hardDeleteByIds(ids): Promise<DeleteResult>;
```

Defined in: [libs/nest-crud/src/base/base-repository.ts:734](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/base/base-repository.ts#L734)

Permanently delete multiple entities by their IDs

This method permanently removes multiple entities from the database.
Unlike the deleteByIds method, this cannot be undone.

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

`ids`

</td>
<td>

`EntityId`\[]

</td>
<td>

Array of entity IDs to delete

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`DeleteResult`>

The result of the delete operation

###### Example

```typescript
const result = await userRepository.hardDeleteByIds(["user-id-1", "user-id-2"]);
```

###### See

- [Repository.delete](#delete-2) TypeORM's delete method that this uses internally
- [hardDeleteById](#harddeletebyid) Method to permanently delete a single entity
- [deleteByIds](#deletebyids) Method to soft delete multiple entities
- EntityId Type for entity IDs
- DeleteResult TypeORM's result type for delete operations

##### hasId()

```ts
hasId(entity): boolean;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:50

Checks if entity has an id.
If entity composite compose ids, it will check them all.

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

`entity`

</td>
<td>

`Entity`

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean`

###### Inherited from

[`Repository`](#repository).[`hasId`](#hasid-1)

##### increment()

```ts
increment(
   conditions,
   propertyPath,
value): Promise<UpdateResult>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:341

Increments some column by provided value of the entities matched given conditions.

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

`conditions`

</td>
<td>

`FindOptionsWhere`<`Entity`>

</td>
</tr>
<tr>
<td>

`propertyPath`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`value`

</td>
<td>

`string` | `number`

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`UpdateResult`>

###### Inherited from

[`Repository`](#repository).[`increment`](#increment-1)

##### insert()

```ts
insert(entity): Promise<InsertResult>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:161

Inserts a given entity into the database.
Unlike save method executes a primitive operation without cascades, relations and other operations included.
Executes fast and efficient INSERT query.
Does not check if entity exist in the database, so query will fail if duplicate entity is being inserted.

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

`entity`

</td>
<td>

| `_QueryDeepPartialEntity`<`ObjectLiteral` _extends_ `Entity` ? `unknown` : `Entity`> | `_QueryDeepPartialEntity`<`ObjectLiteral` _extends_ `Entity` ? `unknown` : `Entity`>\[]

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`InsertResult`>

###### Inherited from

[`Repository`](#repository).[`insert`](#insert-1)

##### isFindOperator()

```ts
isFindOperator<T>(value): value is FindOperator<T>;
```

Defined in: [libs/nest-crud/src/base/base-repository.ts:929](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/base/base-repository.ts#L929)

Type guard to check if a value is a TypeORM FindOperator

This utility method determines if a value is a TypeORM FindOperator instance.
It's used as a type guard to safely handle values in query building.

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

The type of value the operator would contain

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

`value`

</td>
<td>

`unknown`

</td>
<td>

The value to check

</td>
</tr>
</tbody>
</table>

###### Returns

`value is FindOperator<T>`

True if the value is a FindOperator instance

###### See

- FindOperator TypeORM's operator class for query building
- [mapAndWhere](#mapandwhere) Method that uses this to safely handle values
- ILike Example of a FindOperator
- Not Example of a FindOperator

##### mapAndWhere()

```ts
mapAndWhere<T>(
   where,
   and,
   operator?,
wrap?): FindOptionsWhere<T>;
```

Defined in: [libs/nest-crud/src/base/base-repository.ts:963](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/base/base-repository.ts#L963)

Map and transform where conditions with operators

This utility method recursively processes where conditions, applying operators
and transformations as needed. It's a powerful helper for building complex
queries with nested conditions and operators.

Key features:

- Handles nested objects recursively
- Applies operators to values (like ILike, Not, etc.)
- Supports string templating with the wrap parameter
- Preserves existing conditions when merging
- Maintains type safety throughout the transformation
- Uses FindOptionsWhere for improved type safety

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

`Entity`

</td>
<td>

The entity type for the where conditions

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

`where`

</td>
<td>

`FindOptionsWhere`<`T`>

</td>
<td>

The base where conditions to extend

</td>
</tr>
<tr>
<td>

`and`

</td>
<td>

`QueryDeepPartial`<`T`>

</td>
<td>

The new conditions to apply

</td>
</tr>
<tr>
<td>

`operator?`

</td>
<td>

<`V`>(`value`) => `FindOperator`<`V`>

</td>
<td>

Optional operator to apply to values

</td>
</tr>
<tr>
<td>

`wrap?`

</td>
<td>

`` `${string}{}${string}` ``

</td>
<td>

Optional template for wrapping string values

</td>
</tr>
</tbody>
</table>

###### Returns

`FindOptionsWhere`<`T`>

The resulting where conditions

###### See

- FindOptionsWhere TypeORM's where conditions type
- FindOperator TypeORM's operator class for query building
- [orWhere](#orwhere) Method that uses this to process search and negation conditions
- [isFindOperator](#isfindoperator) Method used to check if a value is a FindOperator
- toFindOptionsWhere Utility function for type-safe where condition conversion
- ILike Example of an operator that can be applied
- Not Example of an operator that can be applied

##### maximum()

```ts
maximum(columnName, where?): Promise<number | null>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:253

Return the MAX of a column

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

`columnName`

</td>
<td>

`PickKeysByType`<`Entity`, `number`>

</td>
</tr>
<tr>
<td>

`where?`

</td>
<td>

`FindOptionsWhere`<`Entity`> | `FindOptionsWhere`<`Entity`>\[]

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`number` | `null`>

###### Inherited from

[`Repository`](#repository).[`maximum`](#maximum-1)

##### merge()

```ts
merge(mergeIntoEntity, ...entityLikes): Entity;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:72

Merges multiple entities (or entity-like objects) into a given entity.

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

`mergeIntoEntity`

</td>
<td>

`Entity`

</td>
</tr>
<tr>
<td>

...`entityLikes`

</td>
<td>

`DeepPartial`<`Entity`>\[]

</td>
</tr>
</tbody>
</table>

###### Returns

`Entity`

###### Inherited from

[`Repository`](#repository).[`merge`](#merge-1)

##### minimum()

```ts
minimum(columnName, where?): Promise<number | null>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:249

Return the MIN of a column

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

`columnName`

</td>
<td>

`PickKeysByType`<`Entity`, `number`>

</td>
</tr>
<tr>
<td>

`where?`

</td>
<td>

`FindOptionsWhere`<`Entity`> | `FindOptionsWhere`<`Entity`>\[]

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`number` | `null`>

###### Inherited from

[`Repository`](#repository).[`minimum`](#minimum-1)

##### orWhere()

```ts
orWhere(
   where,
   or,
   operator): FindOptionsWhere<Entity> | FindOptionsWhere<Entity>[];
```

Defined in: [libs/nest-crud/src/base/base-repository.ts:898](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/base/base-repository.ts#L898)

Create OR conditions for search or negation queries

This utility method creates OR conditions for search or negation queries.
When multiple search fields are provided, it creates an array of where conditions
that TypeORM will combine with OR logic.

For search queries, it applies the ILike operator with wildcards (%{}%)
For negation queries, it applies the Not operator

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

`where`

</td>
<td>

`FindOptionsWhere`<`Entity`>

</td>
<td>

The base where condition

</td>
</tr>
<tr>
<td>

`or`

</td>
<td>

`QueryDeepPartial`<`Entity`>

</td>
<td>

The search or negation criteria

</td>
</tr>
<tr>
<td>

`operator`

</td>
<td>

<`T`>(`value`) => `FindOperator`<`T`>

</td>
<td>

The operator to apply (ILike or Not)

</td>
</tr>
</tbody>
</table>

###### Returns

`FindOptionsWhere`<`Entity`> | `FindOptionsWhere`<`Entity`>\[]

The resulting where condition(s)

###### See

- [mapAndWhere](#mapandwhere) The helper method used to apply operators to conditions
- [generateOptions](#generateoptions) Method that uses this to process search and negation conditions
- FindOptionsWhere TypeORM's type for where conditions
- ILike TypeORM's case-insensitive LIKE operator
- Not TypeORM's negation operator
- FindOperator TypeORM's operator class for query building

##### preload()

```ts
preload(entityLike): Promise<Entity | undefined>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:82

Creates a new entity from the given plain javascript object. If entity already exist in the database, then
it loads it (and everything related to it), replaces all values with the new ones from the given object
and returns this new entity. This new entity is actually a loaded from the db entity with all properties
replaced from the new object.

Note that given entity-like object must have an entity id / primary key to find entity by.
Returns undefined if entity with given id was not found.

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

`entityLike`

</td>
<td>

`DeepPartial`<`Entity`>

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`Entity` | `undefined`>

###### Inherited from

[`Repository`](#repository).[`preload`](#preload-1)

##### query()

```ts
query<T>(query, parameters?): Promise<T>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:322

Executes a raw SQL query and returns a raw database results.
Raw query execution is supported only by relational databases (MongoDB is not supported).

###### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
<th>Default type</th>
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

`query`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`parameters?`

</td>
<td>

`any`\[]

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`T`>

###### See

[Official docs](https://typeorm.io/repository-api) for examples.

###### Inherited from

[`Repository`](#repository).[`query`](#query-1)

##### recover()

###### Call Signature

```ts
recover<T>(entities, options): Promise<T[]>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:138

Recovers all given entities in the database.

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

`T` _extends_
| `Model`
| `ModelExtension`
| {
`createdAt?`: `DeepPartial`<`Date`>;
`createdBy?`: `DeepPartial`<`UserInfo` | `null`>;
`createdById?`: `DeepPartial`<`EntityId` | `null`>;
`deletedAt?`: `DeepPartial`<`Date` | `null`>;
`deletedBy?`: `DeepPartial`<`UserInfo` | `null`>;
`deletedById?`: `DeepPartial`<`EntityId` | `null`>;
`id?`: `DeepPartial`<`EntityId`>;
`updatedAt?`: `DeepPartial`<`Date`>;
`updatedBy?`: `DeepPartial`<`UserInfo` | `null`>;
`updatedById?`: `DeepPartial`<`EntityId` | `null`>;
}
| {
`id?`: `DeepPartial`<`EntityId`>;
}

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

`entities`

</td>
<td>

`T`\[]

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

`SaveOptions` & `object`

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`T`\[]>

###### Inherited from

[`Repository`](#repository).[`recover`](#recover-1)

###### Call Signature

```ts
recover<T>(entities, options?): Promise<T & Entity[]>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:144

Recovers all given entities in the database.

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

`T` _extends_
| `Model`
| `ModelExtension`
| {
`createdAt?`: `DeepPartial`<`Date`>;
`createdBy?`: `DeepPartial`<`UserInfo` | `null`>;
`createdById?`: `DeepPartial`<`EntityId` | `null`>;
`deletedAt?`: `DeepPartial`<`Date` | `null`>;
`deletedBy?`: `DeepPartial`<`UserInfo` | `null`>;
`deletedById?`: `DeepPartial`<`EntityId` | `null`>;
`id?`: `DeepPartial`<`EntityId`>;
`updatedAt?`: `DeepPartial`<`Date`>;
`updatedBy?`: `DeepPartial`<`UserInfo` | `null`>;
`updatedById?`: `DeepPartial`<`EntityId` | `null`>;
}
| {
`id?`: `DeepPartial`<`EntityId`>;
}

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

`entities`

</td>
<td>

`T`\[]

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

`SaveOptions`

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`T` & `Entity`\[]>

###### Inherited from

[`Repository`](#repository).[`recover`](#recover-1)

###### Call Signature

```ts
recover<T>(entity, options): Promise<T>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:148

Recovers a given entity in the database.

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

`T` _extends_
| `Model`
| `ModelExtension`
| {
`createdAt?`: `DeepPartial`<`Date`>;
`createdBy?`: `DeepPartial`<`UserInfo` | `null`>;
`createdById?`: `DeepPartial`<`EntityId` | `null`>;
`deletedAt?`: `DeepPartial`<`Date` | `null`>;
`deletedBy?`: `DeepPartial`<`UserInfo` | `null`>;
`deletedById?`: `DeepPartial`<`EntityId` | `null`>;
`id?`: `DeepPartial`<`EntityId`>;
`updatedAt?`: `DeepPartial`<`Date`>;
`updatedBy?`: `DeepPartial`<`UserInfo` | `null`>;
`updatedById?`: `DeepPartial`<`EntityId` | `null`>;
}
| {
`id?`: `DeepPartial`<`EntityId`>;
}

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

`entity`

</td>
<td>

`T`

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

`SaveOptions` & `object`

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`T`>

###### Inherited from

[`Repository`](#repository).[`recover`](#recover-1)

###### Call Signature

```ts
recover<T>(entity, options?): Promise<T & Entity>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:154

Recovers a given entity in the database.

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

`T` _extends_
| `Model`
| `ModelExtension`
| {
`createdAt?`: `DeepPartial`<`Date`>;
`createdBy?`: `DeepPartial`<`UserInfo` | `null`>;
`createdById?`: `DeepPartial`<`EntityId` | `null`>;
`deletedAt?`: `DeepPartial`<`Date` | `null`>;
`deletedBy?`: `DeepPartial`<`UserInfo` | `null`>;
`deletedById?`: `DeepPartial`<`EntityId` | `null`>;
`id?`: `DeepPartial`<`EntityId`>;
`updatedAt?`: `DeepPartial`<`Date`>;
`updatedBy?`: `DeepPartial`<`UserInfo` | `null`>;
`updatedById?`: `DeepPartial`<`EntityId` | `null`>;
}
| {
`id?`: `DeepPartial`<`EntityId`>;
}

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

`entity`

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

`SaveOptions`

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`T` & `Entity`>

###### Inherited from

[`Repository`](#repository).[`recover`](#recover-1)

##### remove()

###### Call Signature

```ts
remove(entities, options?): Promise<Entity[]>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:110

Removes a given entities from the database.

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

`entities`

</td>
<td>

`Entity`\[]

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

`RemoveOptions`

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`Entity`\[]>

###### Inherited from

[`Repository`](#repository).[`remove`](#remove-1)

###### Call Signature

```ts
remove(entity, options?): Promise<Entity>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:114

Removes a given entity from the database.

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

`entity`

</td>
<td>

`Entity`

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

`RemoveOptions`

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`Entity`>

###### Inherited from

[`Repository`](#repository).[`remove`](#remove-1)

##### restore()

```ts
restore(criteria): Promise<UpdateResult>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:211

Restores entities by a given criteria.
Unlike save method executes a primitive operation without cascades, relations and other operations included.
Executes fast and efficient UPDATE query.
Does not check if entity exist in the database.

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

`criteria`

</td>
<td>

| `string` | `number` | `string`\[] | `number`\[] | `Date` | `ObjectId` | `Date`\[] | `ObjectId`\[] | `FindOptionsWhere`<`Entity`> | `FindOptionsWhere`<`Entity`>\[]

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`UpdateResult`>

###### Inherited from

[`Repository`](#repository).[`restore`](#restore-1)

##### save()

###### Call Signature

```ts
save<T>(entities, options): Promise<T[]>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:87

Saves all given entities in the database.
If entities do not exist in the database then inserts, otherwise updates.

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

`T` _extends_
| `Model`
| `ModelExtension`
| {
`createdAt?`: `DeepPartial`<`Date`>;
`createdBy?`: `DeepPartial`<`UserInfo` | `null`>;
`createdById?`: `DeepPartial`<`EntityId` | `null`>;
`deletedAt?`: `DeepPartial`<`Date` | `null`>;
`deletedBy?`: `DeepPartial`<`UserInfo` | `null`>;
`deletedById?`: `DeepPartial`<`EntityId` | `null`>;
`id?`: `DeepPartial`<`EntityId`>;
`updatedAt?`: `DeepPartial`<`Date`>;
`updatedBy?`: `DeepPartial`<`UserInfo` | `null`>;
`updatedById?`: `DeepPartial`<`EntityId` | `null`>;
}
| {
`id?`: `DeepPartial`<`EntityId`>;
}

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

`entities`

</td>
<td>

`T`\[]

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

`SaveOptions` & `object`

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`T`\[]>

###### Inherited from

[`Repository`](#repository).[`save`](#save-2)

###### Call Signature

```ts
save<T>(entities, options?): Promise<T & Entity[]>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:94

Saves all given entities in the database.
If entities do not exist in the database then inserts, otherwise updates.

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

`T` _extends_
| `Model`
| `ModelExtension`
| {
`createdAt?`: `DeepPartial`<`Date`>;
`createdBy?`: `DeepPartial`<`UserInfo` | `null`>;
`createdById?`: `DeepPartial`<`EntityId` | `null`>;
`deletedAt?`: `DeepPartial`<`Date` | `null`>;
`deletedBy?`: `DeepPartial`<`UserInfo` | `null`>;
`deletedById?`: `DeepPartial`<`EntityId` | `null`>;
`id?`: `DeepPartial`<`EntityId`>;
`updatedAt?`: `DeepPartial`<`Date`>;
`updatedBy?`: `DeepPartial`<`UserInfo` | `null`>;
`updatedById?`: `DeepPartial`<`EntityId` | `null`>;
}
| {
`id?`: `DeepPartial`<`EntityId`>;
}

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

`entities`

</td>
<td>

`T`\[]

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

`SaveOptions`

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`T` & `Entity`\[]>

###### Inherited from

[`Repository`](#repository).[`save`](#save-2)

###### Call Signature

```ts
save<T>(entity, options): Promise<T>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:99

Saves a given entity in the database.
If entity does not exist in the database then inserts, otherwise updates.

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

`T` _extends_
| `Model`
| `ModelExtension`
| {
`createdAt?`: `DeepPartial`<`Date`>;
`createdBy?`: `DeepPartial`<`UserInfo` | `null`>;
`createdById?`: `DeepPartial`<`EntityId` | `null`>;
`deletedAt?`: `DeepPartial`<`Date` | `null`>;
`deletedBy?`: `DeepPartial`<`UserInfo` | `null`>;
`deletedById?`: `DeepPartial`<`EntityId` | `null`>;
`id?`: `DeepPartial`<`EntityId`>;
`updatedAt?`: `DeepPartial`<`Date`>;
`updatedBy?`: `DeepPartial`<`UserInfo` | `null`>;
`updatedById?`: `DeepPartial`<`EntityId` | `null`>;
}
| {
`id?`: `DeepPartial`<`EntityId`>;
}

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

`entity`

</td>
<td>

`T`

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

`SaveOptions` & `object`

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`T`>

###### Inherited from

[`Repository`](#repository).[`save`](#save-2)

###### Call Signature

```ts
save<T>(entity, options?): Promise<T & Entity>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:106

Saves a given entity in the database.
If entity does not exist in the database then inserts, otherwise updates.

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

`T` _extends_
| `Model`
| `ModelExtension`
| {
`createdAt?`: `DeepPartial`<`Date`>;
`createdBy?`: `DeepPartial`<`UserInfo` | `null`>;
`createdById?`: `DeepPartial`<`EntityId` | `null`>;
`deletedAt?`: `DeepPartial`<`Date` | `null`>;
`deletedBy?`: `DeepPartial`<`UserInfo` | `null`>;
`deletedById?`: `DeepPartial`<`EntityId` | `null`>;
`id?`: `DeepPartial`<`EntityId`>;
`updatedAt?`: `DeepPartial`<`Date`>;
`updatedBy?`: `DeepPartial`<`UserInfo` | `null`>;
`updatedById?`: `DeepPartial`<`EntityId` | `null`>;
}
| {
`id?`: `DeepPartial`<`EntityId`>;
}

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

`entity`

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

`SaveOptions`

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`T` & `Entity`>

###### Inherited from

[`Repository`](#repository).[`save`](#save-2)

##### saveAndGet()

```ts
saveAndGet<T>(entityLike, options?): Promise<Entity | null>;
```

Defined in: [libs/nest-crud/src/base/base-repository.ts:301](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/base/base-repository.ts#L301)

Save an entity and retrieve it with relations

This method saves an entity and then retrieves it from the database with the specified relations.
It's useful when you need to immediately access related entities after saving. The method combines
save and get operations with unified options that support both skipCreate functionality and
relation loading.

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

`T` _extends_
| {
`createdAt?`: `EntityPropertyDeepPartial`<`Date`>;
`createdBy?`: `EntityPropertyDeepPartial`<`UserInfo` | `null`>;
`createdById?`: `EntityPropertyDeepPartial`<`EntityId` | `null`>;
`deletedAt?`: `EntityPropertyDeepPartial`<`Date` | `null`>;
`deletedBy?`: `EntityPropertyDeepPartial`<`UserInfo` | `null`>;
`deletedById?`: `EntityPropertyDeepPartial`<`EntityId` | `null`>;
`id?`: `EntityPropertyDeepPartial`<`EntityId`>;
`updatedAt?`: `EntityPropertyDeepPartial`<`Date`>;
`updatedBy?`: `EntityPropertyDeepPartial`<`UserInfo` | `null`>;
`updatedById?`: `EntityPropertyDeepPartial`<`EntityId` | `null`>;
}
| {
`id?`: `EntityPropertyDeepPartial`<`EntityId`>;
}

</td>
<td>

The type of the entity data

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

`entityLike`

</td>
<td>

`T`

</td>
<td>

The entity data to save

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

[`SaveAndGetOptions`](#saveandgetoptions)<`Entity`>

</td>
<td>

Combined options for save and get operations

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`Entity` | `null`>

The saved entity with relations, or null if not found

###### Examples

```typescript
// Save new entity and retrieve with relations
const user = await userRepository.saveAndGet(
  { firstName: "John", lastName: "Doe", email: "john.doe@example.com" },
  { relations: ["posts", "profile"] },
);
```

```typescript
// Save existing entity without creation and retrieve with relations
const existingUser = await userRepository.getById("user-id");
existingUser.firstName = "Updated Name";
const savedUser = await userRepository.saveAndGet(existingUser, {
  skipCreate: true,
  relations: ["posts", "profile"],
});
```

###### See

- [saveOne](#saveone) Method used to save the entity
- [getById](#getbyid) Method used to retrieve the entity with relations
- [SaveAndGetOptions](#saveandgetoptions) Combined options for save and get operations
- [SaveOptionsWithSkip](#saveoptionswithskip) Extended save options with skipCreate flag
- [GetByIdOptions](#getbyidoptions) Options for retrieving the entity

##### saveMany()

```ts
saveMany<T>(entities, options?): Promise<Entity[]>;
```

Defined in: [libs/nest-crud/src/base/base-repository.ts:347](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/base/base-repository.ts#L347)

Save multiple entities to the database

This method creates entities from the provided data array and saves them to the database.
It supports an optional skipCreate flag to bypass entity creation when the data array
contains already properly formed entity instances.

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

`T` _extends_
| {
`createdAt?`: `EntityPropertyDeepPartial`<`Date`>;
`createdBy?`: `EntityPropertyDeepPartial`<`UserInfo` | `null`>;
`createdById?`: `EntityPropertyDeepPartial`<`EntityId` | `null`>;
`deletedAt?`: `EntityPropertyDeepPartial`<`Date` | `null`>;
`deletedBy?`: `EntityPropertyDeepPartial`<`UserInfo` | `null`>;
`deletedById?`: `EntityPropertyDeepPartial`<`EntityId` | `null`>;
`id?`: `EntityPropertyDeepPartial`<`EntityId`>;
`updatedAt?`: `EntityPropertyDeepPartial`<`Date`>;
`updatedBy?`: `EntityPropertyDeepPartial`<`UserInfo` | `null`>;
`updatedById?`: `EntityPropertyDeepPartial`<`EntityId` | `null`>;
}
| {
`id?`: `EntityPropertyDeepPartial`<`EntityId`>;
}

</td>
<td>

The type of the entity data

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

`entities`

</td>
<td>

`T`\[]

</td>
<td>

Array of entity data to save

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

[`SaveOptionsWithSkip`](#saveoptionswithskip)

</td>
<td>

Options for the save operation, including skipCreate flag

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`Entity`\[]>

Array of saved entities

###### Examples

```typescript
// Save with entity creation (default behavior)
const users = await userRepository.saveMany([
  { firstName: "John", lastName: "Doe", email: "john.doe@example.com" },
  { firstName: "Jane", lastName: "Smith", email: "jane.smith@example.com" },
]);
```

```typescript
// Save without entity creation (when data is already entities)
const existingUsers = await userRepository.getByIds({
  ids: ["user-id-1", "user-id-2"],
});
existingUsers.forEach((user) => (user.isActive = true));
const savedUsers = await userRepository.saveMany(existingUsers, {
  skipCreate: true,
});
```

###### See

- [Repository.save](#save-2) TypeORM's save method that this uses internally
- [create](#create) Method used to create the entities before saving (when skipCreate is false)
- [saveOne](#saveone) Method to save a single entity
- [SaveOptionsWithSkip](#saveoptionswithskip) Extended save options with skipCreate flag

##### saveOne()

```ts
saveOne<T>(entityLike, options?): Promise<Entity>;
```

Defined in: [libs/nest-crud/src/base/base-repository.ts:252](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/base/base-repository.ts#L252)

Save an entity to the database

This method creates an entity from the provided data and saves it to the database.
It supports an optional skipCreate flag to bypass entity creation when the data
is already a properly formed entity instance.

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

`T` _extends_
| {
`createdAt?`: `EntityPropertyDeepPartial`<`Date`>;
`createdBy?`: `EntityPropertyDeepPartial`<`UserInfo` | `null`>;
`createdById?`: `EntityPropertyDeepPartial`<`EntityId` | `null`>;
`deletedAt?`: `EntityPropertyDeepPartial`<`Date` | `null`>;
`deletedBy?`: `EntityPropertyDeepPartial`<`UserInfo` | `null`>;
`deletedById?`: `EntityPropertyDeepPartial`<`EntityId` | `null`>;
`id?`: `EntityPropertyDeepPartial`<`EntityId`>;
`updatedAt?`: `EntityPropertyDeepPartial`<`Date`>;
`updatedBy?`: `EntityPropertyDeepPartial`<`UserInfo` | `null`>;
`updatedById?`: `EntityPropertyDeepPartial`<`EntityId` | `null`>;
}
| {
`id?`: `EntityPropertyDeepPartial`<`EntityId`>;
}

</td>
<td>

The type of the entity data

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

`entityLike`

</td>
<td>

`T`

</td>
<td>

The entity data to save

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

[`SaveOptionsWithSkip`](#saveoptionswithskip)

</td>
<td>

Options for the save operation, including skipCreate flag

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`Entity`>

The saved entity

###### Examples

```typescript
// Save with entity creation (default behavior)
const user = await userRepository.saveOne({
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
});
```

```typescript
// Save without entity creation (when data is already an entity)
const existingUser = await userRepository.getById("user-id");
existingUser.firstName = "Updated Name";
const savedUser = await userRepository.saveOne(existingUser, {
  skipCreate: true,
});
```

###### See

- [Repository.save](#save-2) TypeORM's save method that this extends
- [create](#create) Method used to create the entity before saving (when skipCreate is false)
- [SaveOptionsWithSkip](#saveoptionswithskip) Extended save options with skipCreate flag
- [saveAndGet](#saveandget) Method to save and retrieve with relations
- [saveMany](#savemany) Method to save multiple entities

##### softDelete()

```ts
softDelete(criteria): Promise<UpdateResult>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:204

Records the delete date of entities by a given criteria.
Unlike save method executes a primitive operation without cascades, relations and other operations included.
Executes fast and efficient UPDATE query.
Does not check if entity exist in the database.

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

`criteria`

</td>
<td>

| `string` | `number` | `string`\[] | `number`\[] | `Date` | `ObjectId` | `Date`\[] | `ObjectId`\[] | `FindOptionsWhere`<`Entity`> | `FindOptionsWhere`<`Entity`>\[]

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`UpdateResult`>

###### Inherited from

[`Repository`](#repository).[`softDelete`](#softdelete-1)

##### softRemove()

###### Call Signature

```ts
softRemove<T>(entities, options): Promise<T[]>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:118

Records the delete date of all given entities.

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

`T` _extends_
| `Model`
| `ModelExtension`
| {
`createdAt?`: `DeepPartial`<`Date`>;
`createdBy?`: `DeepPartial`<`UserInfo` | `null`>;
`createdById?`: `DeepPartial`<`EntityId` | `null`>;
`deletedAt?`: `DeepPartial`<`Date` | `null`>;
`deletedBy?`: `DeepPartial`<`UserInfo` | `null`>;
`deletedById?`: `DeepPartial`<`EntityId` | `null`>;
`id?`: `DeepPartial`<`EntityId`>;
`updatedAt?`: `DeepPartial`<`Date`>;
`updatedBy?`: `DeepPartial`<`UserInfo` | `null`>;
`updatedById?`: `DeepPartial`<`EntityId` | `null`>;
}
| {
`id?`: `DeepPartial`<`EntityId`>;
}

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

`entities`

</td>
<td>

`T`\[]

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

`SaveOptions` & `object`

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`T`\[]>

###### Inherited from

[`Repository`](#repository).[`softRemove`](#softremove-1)

###### Call Signature

```ts
softRemove<T>(entities, options?): Promise<T & Entity[]>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:124

Records the delete date of all given entities.

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

`T` _extends_
| `Model`
| `ModelExtension`
| {
`createdAt?`: `DeepPartial`<`Date`>;
`createdBy?`: `DeepPartial`<`UserInfo` | `null`>;
`createdById?`: `DeepPartial`<`EntityId` | `null`>;
`deletedAt?`: `DeepPartial`<`Date` | `null`>;
`deletedBy?`: `DeepPartial`<`UserInfo` | `null`>;
`deletedById?`: `DeepPartial`<`EntityId` | `null`>;
`id?`: `DeepPartial`<`EntityId`>;
`updatedAt?`: `DeepPartial`<`Date`>;
`updatedBy?`: `DeepPartial`<`UserInfo` | `null`>;
`updatedById?`: `DeepPartial`<`EntityId` | `null`>;
}
| {
`id?`: `DeepPartial`<`EntityId`>;
}

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

`entities`

</td>
<td>

`T`\[]

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

`SaveOptions`

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`T` & `Entity`\[]>

###### Inherited from

[`Repository`](#repository).[`softRemove`](#softremove-1)

###### Call Signature

```ts
softRemove<T>(entity, options): Promise<T>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:128

Records the delete date of a given entity.

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

`T` _extends_
| `Model`
| `ModelExtension`
| {
`createdAt?`: `DeepPartial`<`Date`>;
`createdBy?`: `DeepPartial`<`UserInfo` | `null`>;
`createdById?`: `DeepPartial`<`EntityId` | `null`>;
`deletedAt?`: `DeepPartial`<`Date` | `null`>;
`deletedBy?`: `DeepPartial`<`UserInfo` | `null`>;
`deletedById?`: `DeepPartial`<`EntityId` | `null`>;
`id?`: `DeepPartial`<`EntityId`>;
`updatedAt?`: `DeepPartial`<`Date`>;
`updatedBy?`: `DeepPartial`<`UserInfo` | `null`>;
`updatedById?`: `DeepPartial`<`EntityId` | `null`>;
}
| {
`id?`: `DeepPartial`<`EntityId`>;
}

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

`entity`

</td>
<td>

`T`

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

`SaveOptions` & `object`

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`T`>

###### Inherited from

[`Repository`](#repository).[`softRemove`](#softremove-1)

###### Call Signature

```ts
softRemove<T>(entity, options?): Promise<T & Entity>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:134

Records the delete date of a given entity.

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

`T` _extends_
| `Model`
| `ModelExtension`
| {
`createdAt?`: `DeepPartial`<`Date`>;
`createdBy?`: `DeepPartial`<`UserInfo` | `null`>;
`createdById?`: `DeepPartial`<`EntityId` | `null`>;
`deletedAt?`: `DeepPartial`<`Date` | `null`>;
`deletedBy?`: `DeepPartial`<`UserInfo` | `null`>;
`deletedById?`: `DeepPartial`<`EntityId` | `null`>;
`id?`: `DeepPartial`<`EntityId`>;
`updatedAt?`: `DeepPartial`<`Date`>;
`updatedBy?`: `DeepPartial`<`UserInfo` | `null`>;
`updatedById?`: `DeepPartial`<`EntityId` | `null`>;
}
| {
`id?`: `DeepPartial`<`EntityId`>;
}

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

`entity`

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

`SaveOptions`

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`T` & `Entity`>

###### Inherited from

[`Repository`](#repository).[`softRemove`](#softremove-1)

##### sql()

```ts
sql<T>(strings, ...values): Promise<T>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:330

Tagged template function that executes raw SQL query and returns raw database results.
Template expressions are automatically transformed into database parameters.
Raw query execution is supported only by relational databases (MongoDB is not supported).
Note: Don't call this as a regular function, it is meant to be used with backticks to tag a template literal.
Example: repository.sql`SELECT * FROM table_name WHERE id = ${id}`

###### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
<th>Default type</th>
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

`strings`

</td>
<td>

`TemplateStringsArray`

</td>
</tr>
<tr>
<td>

...`values`

</td>
<td>

`unknown`\[]

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`T`>

###### Inherited from

[`Repository`](#repository).[`sql`](#sql-1)

##### sum()

```ts
sum(columnName, where?): Promise<number | null>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:241

Return the SUM of a column

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

`columnName`

</td>
<td>

`PickKeysByType`<`Entity`, `number`>

</td>
</tr>
<tr>
<td>

`where?`

</td>
<td>

`FindOptionsWhere`<`Entity`> | `FindOptionsWhere`<`Entity`>\[]

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`number` | `null`>

###### Inherited from

[`Repository`](#repository).[`sum`](#sum-1)

##### transaction()

```ts
transaction<T>(operation): Promise<T>;
```

Defined in: [libs/nest-crud/src/base/base-repository.ts:796](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/base/base-repository.ts#L796)

Execute operations within a transaction

This method ensures that all database operations within the provided function
are executed in a single transaction. If any operation fails, all changes are rolled back.

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

The return type of the operation

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

`operation`

</td>
<td>

(`manager`) => `Promise`<`T`>

</td>
<td>

Function containing the operations to execute

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`T`>

The result of the operation

###### Example

```TypeScript
const result = await userRepository.transaction(async (manager) => {
  const user = await manager.getRepository(UserEntity).save({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com'
  });

  const profile = await manager.getRepository(ProfileEntity).save({
    userId: user.id,
    bio: 'Software developer'
  });

  return { user, profile };
});
```

###### See

- EntityManager TypeORM's transaction manager
- [entityRepository](#entityrepository) Getter that uses the transaction manager
- [Repository.manager](#property-manager-1) TypeORM's entity manager
- Repository.transaction TypeORM's transaction method

##### update()

```ts
update(criteria, partialEntity): Promise<UpdateResult>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:168

Updates entity partially. Entity can be found by a given conditions.
Unlike save method executes a primitive operation without cascades, relations and other operations included.
Executes fast and efficient UPDATE query.
Does not check if entity exist in the database.

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

`criteria`

</td>
<td>

| `string` | `number` | `string`\[] | `number`\[] | `Date` | `ObjectId` | `Date`\[] | `ObjectId`\[] | `FindOptionsWhere`<`Entity`> | `FindOptionsWhere`<`Entity`>\[]

</td>
</tr>
<tr>
<td>

`partialEntity`

</td>
<td>

`QueryDeepPartialEntity`<`Entity`>

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`UpdateResult`>

###### Inherited from

[`Repository`](#repository).[`update`](#update-2)

##### updateAll()

```ts
updateAll(partialEntity): Promise<UpdateResult>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:176

Updates all entities of target type, setting fields from supplied partial entity.
This is a primitive operation without cascades, relations or other operations included.
Executes fast and efficient UPDATE query without WHERE clause.

WARNING! This method updates ALL rows in the target table.

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

`partialEntity`

</td>
<td>

`QueryDeepPartialEntity`<`Entity`>

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`UpdateResult`>

###### Inherited from

[`Repository`](#repository).[`updateAll`](#updateall-1)

##### updateAndGet()

```ts
updateAndGet(
   id,
   partialEntity,
options?): Promise<Entity | null>;
```

Defined in: [libs/nest-crud/src/base/base-repository.ts:411](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/base/base-repository.ts#L411)

Update an entity and retrieve it with relations

This method updates an entity and then retrieves it from the database with the specified relations.
It's useful when you need to immediately access the updated entity with its relations.

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

`id`

</td>
<td>

`EntityId`

</td>
<td>

The ID of the entity to update

</td>
</tr>
<tr>
<td>

`partialEntity`

</td>
<td>

`EntityDeepPartial`<`Entity`>

</td>
<td>

The partial entity data to apply

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

[`GetByIdOptions`](#getbyidoptions)<`Entity`>

</td>
<td>

Options for the get operation

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`Entity` | `null`>

The updated entity with relations

###### Example

```typescript
const user = await userRepository.updateAndGet(
  "user-id",
  { firstName: "Updated Name" },
  { relations: ["posts", "profile"] },
);
```

###### See

- [updateById](#updatebyid) Method used to update the entity
- [getById](#getbyid) Method used to retrieve the entity with relations
- [saveAndGet](#saveandget) Similar method for saving and retrieving
- [GetByIdOptions](#getbyidoptions) Options for retrieving the entity
- EntityDeepPartial TypeORM's type for partial entity updates

##### updateById()

```ts
updateById(id, partialEntity): Promise<UpdateResult>;
```

Defined in: [libs/nest-crud/src/base/base-repository.ts:380](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/base/base-repository.ts#L380)

Update an entity by ID

This method updates an entity with the specified ID using the provided partial entity data.

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

`id`

</td>
<td>

`EntityId`

</td>
<td>

The ID of the entity to update

</td>
</tr>
<tr>
<td>

`partialEntity`

</td>
<td>

`EntityDeepPartial`<`Entity`>

</td>
<td>

The partial entity data to apply

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`UpdateResult`>

The result of the update operation

###### Example

```typescript
const result = await userRepository.update("user-id", {
  firstName: "Updated Name",
  email: "updated.email@example.com",
});
```

###### See

- [Repository.update](#update-2) TypeORM's update method that this extends
- [updateAndGet](#updateandget) Method to update and retrieve with relations
- [updateOne](#updateone) Method to update by criteria instead of ID
- [updateMany](#updatemany) Method to update multiple entities
- [updateByIds](#updatebyids) Method to update multiple entities by their IDs
- EntityDeepPartial TypeORM's type for partial entity updates
- UpdateResult TypeORM's result type for update operations

##### updateByIds()

```ts
updateByIds(ids, partialEntity): Promise<UpdateResult>;
```

Defined in: [libs/nest-crud/src/base/base-repository.ts:510](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/base/base-repository.ts#L510)

Update multiple entities by their IDs

This method updates all entities with IDs in the provided array.

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

`ids`

</td>
<td>

`EntityId`\[]

</td>
<td>

Array of entity IDs to update

</td>
</tr>
<tr>
<td>

`partialEntity`

</td>
<td>

`EntityDeepPartial`<`Entity`>

</td>
<td>

The partial entity data to apply

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`UpdateResult`>

The result of the update operation

###### Example

```typescript
const result = await userRepository.updateByIds(
  ["user-id-1", "user-id-2", "user-id-3"],
  { isActive: true },
);
```

###### See

- [updateMany](#updatemany) Method used internally to perform the update
- [updateById](#updatebyid) Method to update a single entity by ID
- EntityId Type for entity IDs
- EntityDeepPartial TypeORM's type for partial entity updates
- UpdateResult TypeORM's result type for update operations

##### updateMany()

```ts
updateMany(where, partialEntity): Promise<UpdateResult>;
```

Defined in: [libs/nest-crud/src/base/base-repository.ts:475](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/base/base-repository.ts#L475)

Update multiple entities matching the specified criteria

This method updates all entities that match the provided where condition.

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

`where`

</td>
<td>

[`FindConditions`](#findconditions)<`Entity`>

</td>
<td>

The criteria to find the entities

</td>
</tr>
<tr>
<td>

`partialEntity`

</td>
<td>

`EntityDeepPartial`<`Entity`>

</td>
<td>

The partial entity data to apply

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`UpdateResult`>

The result of the update operation

###### Example

```typescript
const result = await userRepository.updateMany(
  { role: "user" },
  { isActive: true },
);
```

###### See

- [Repository.update](#update-2) TypeORM's update method that this uses internally
- [updateById](#updatebyid) Method to update by ID
- [updateOne](#updateone) Method to update a single entity by criteria
- [updateByIds](#updatebyids) Method to update multiple entities by their IDs
- [FindConditions](#findconditions) Type for where conditions
- EntityDeepPartial TypeORM's type for partial entity updates
- UpdateResult TypeORM's result type for update operations

##### updateOne()

```ts
updateOne(where, partialEntity): Promise<UpdateResult>;
```

Defined in: [libs/nest-crud/src/base/base-repository.ts:445](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/base/base-repository.ts#L445)

Update a single entity matching the specified criteria

This method updates the first entity that matches the provided where condition.

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

`where`

</td>
<td>

`QueryDeepPartial`<`Entity`>

</td>
<td>

The criteria to find the entity

</td>
</tr>
<tr>
<td>

`partialEntity`

</td>
<td>

`EntityDeepPartial`<`Entity`>

</td>
<td>

The partial entity data to apply

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`UpdateResult`>

The result of the update operation

###### Example

```typescript
const result = await userRepository.updateOne(
  { email: "john.doe@example.com" },
  { firstName: "Updated Name" },
);
```

###### See

- [Repository.update](#update-2) TypeORM's update method that this uses internally
- [updateById](#updatebyid) Method to update by ID
- [updateMany](#updatemany) Method to update multiple entities
- QueryDeepPartial TypeORM's type for where conditions
- EntityDeepPartial TypeORM's type for partial entity updates
- UpdateResult TypeORM's result type for update operations

##### upsert()

```ts
upsert(entityOrEntities, conflictPathsOrOptions): Promise<InsertResult>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:182

Inserts a given entity into the database, unless a unique constraint conflicts then updates the entity
Unlike save method executes a primitive operation without cascades, relations and other operations included.
Executes fast and efficient INSERT ... ON CONFLICT DO UPDATE/ON DUPLICATE KEY UPDATE query.

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

`entityOrEntities`

</td>
<td>

| `_QueryDeepPartialEntity`<`ObjectLiteral` _extends_ `Entity` ? `unknown` : `Entity`> | `_QueryDeepPartialEntity`<`ObjectLiteral` _extends_ `Entity` ? `unknown` : `Entity`>\[]

</td>
</tr>
<tr>
<td>

`conflictPathsOrOptions`

</td>
<td>

`string`\[] | `UpsertOptions`<`Entity`>

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`InsertResult`>

###### Inherited from

[`Repository`](#repository).[`upsert`](#upsert-1)

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

<a id="property-manager"></a> `manager`

</td>
<td>

`readonly`

</td>
<td>

`EntityManager`

</td>
<td>

Entity Manager used by this repository.

</td>
<td>

[`Repository`](#repository).[`manager`](#property-manager-1)

</td>
<td>

node_modules/typeorm/repository/Repository.d.ts:32

</td>
</tr>
<tr>
<td>

<a id="property-queryrunner"></a> `queryRunner?`

</td>
<td>

`readonly`

</td>
<td>

`QueryRunner`

</td>
<td>

Query runner provider used for this repository.

</td>
<td>

[`Repository`](#repository).[`queryRunner`](#property-queryrunner-1)

</td>
<td>

node_modules/typeorm/repository/Repository.d.ts:36

</td>
</tr>
<tr>
<td>

<a id="property-target"></a> `target`

</td>
<td>

`readonly`

</td>
<td>

`EntityTarget`<`Entity`>

</td>
<td>

Entity target that is managed by this repository.
If this repository manages entity from schema,
then it returns a name of that schema instead.

</td>
<td>

[`Repository`](#repository).[`target`](#property-target-1)

</td>
<td>

node_modules/typeorm/repository/Repository.d.ts:28

</td>
</tr>
</tbody>
</table>

---

### BulkDeleteDto

Defined in: [libs/nest-crud/src/dtos/bulk-delete.dto.ts:45](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/dtos/bulk-delete.dto.ts#L45)

Data Transfer Object for bulk deletion operations

This DTO is used to validate and transfer data for bulk deletion operations.
It implements the BulkDeleteBody interface and adds validation decorators
to ensure that the ids array contains valid UUID values and is not empty.

Use this DTO in controller methods that handle bulk deletion requests,
typically in DELETE endpoints that need to remove multiple entities at once.

#### Examples

```typescript
// In a controller
@Delete()
async bulkDelete(@Body() dto: BulkDeleteDto): Promise<void> {
  await this.userService.deleteMany(dto.ids);
  return;
}
```

```typescript
// Client request body
{
  "ids": [
    "123e4567-e89b-12d3-a456-426614174000",
    "123e4567-e89b-12d3-a456-426614174001"
  ]
}
```

#### See

- BulkDeleteBody The interface this DTO implements
- [BaseRepository.deleteByIds](#deletebyids) Method for soft-deleting multiple entities by IDs
- [BaseRepository.hardDeleteByIds](#harddeletebyids) Method for permanently deleting multiple entities by IDs

#### Implements

- `BulkDeleteBody`

#### Constructors

##### Constructor

```ts
new BulkDeleteDto(): BulkDeleteDto;
```

###### Returns

[`BulkDeleteDto`](#bulkdeletedto)

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

<a id="property-ids"></a> `ids`

</td>
<td>

`EntityId`\[]

</td>
<td>

Array of entity IDs to delete

This property contains an array of UUIDs identifying the entities to be deleted.
It is validated to ensure:

- It is not empty (@IsNotEmpty)
- It is an array (@IsArray)
- All elements are valid UUIDs (@IsUUID)

The array is passed to repository methods like deleteByIds or hardDeleteByIds
to perform the actual deletion operation.

</td>
<td>

[libs/nest-crud/src/dtos/bulk-delete.dto.ts:62](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/dtos/bulk-delete.dto.ts#L62)

</td>
</tr>
</tbody>
</table>

---

### `abstract` CrudService

Defined in: [libs/nest-crud/src/services/crud.service.ts:98](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/services/crud.service.ts#L98)

Abstract base service providing CRUD operations for entities

This service provides a comprehensive set of CRUD (Create, Read, Update, Delete) operations
for entities that extend the Model interface. It serves as a foundation for building
entity-specific services with consistent data access patterns and error handling.

Key features:

- Complete CRUD operations with various options and overloads
- Automatic error handling with standardized error responses
- Support for soft delete and hard delete operations
- Transaction management
- Pagination support
- Audit tracking (created/updated/deleted by)
- Type-safe operations with proper TypeScript support

The service is designed to work with repositories that extend BaseRepository,
providing a consistent and type-safe way to interact with the database.

#### Template

The entity type this service manages. This type parameter
represents the entity class that the service will work with.
It must extend the Model interface.

#### Examples

```typescript
// Basic implementation of a user service
@Injectable()
export class UserService extends CrudService<UserEntity> {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {
    super(userRepository);
  }

  // Add custom methods specific to users
  async findByEmail(email: string): Promise<UserEntity | null> {
    return this.getOne({ where: { email } });
  }
}
```

```typescript
// Using the service in a controller
@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(":id")
  async findOne(@Param("id") id: string): Promise<UserEntity> {
    return this.userService.get(id);
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.userService.save(createUserDto);
  }
}
```

#### See

- [BaseRepository](#baserepository) The repository class that provides enhanced data access
- Model The base interface for entities
- EntityUtils Utility class for handling entity-related operations and errors
- PaginatedResponse Class for paginated responses

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`Entity` _extends_ `Model` | `ModelExtension`

</td>
</tr>
</tbody>
</table>

#### Constructors

##### Constructor

```ts
new CrudService<Entity>(repository): CrudService<Entity>;
```

Defined in: [libs/nest-crud/src/services/crud.service.ts:139](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/services/crud.service.ts#L139)

Creates a new instance of CrudService

The constructor initializes the service with a repository and extracts
metadata about the entity from the Hichchi metadata system. This metadata
includes the entity name and unique field names, which are used for error
handling and response generation.

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

`repository`

</td>
<td>

[`BaseRepository`](#baserepository)<`Entity`>

</td>
<td>

The repository for the entity

</td>
</tr>
</tbody>
</table>

###### Returns

[`CrudService`](#abstract-crudservice)<`Entity`>

###### Throws

If no repository is provided

###### Example

```typescript
@Injectable()
export class UserService extends CrudService<UserEntity> {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {
    super(userRepository);
  }
}
```

###### See

- [BaseRepository](#baserepository) The repository class that provides enhanced data access
- hichchiMetadata The metadata system that stores entity information

#### Methods

##### count()

```ts
count(getMany?, eh?): Promise<number>;
```

Defined in: [libs/nest-crud/src/services/crud.service.ts:1253](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/services/crud.service.ts#L1253)

Counts entities that match the specified conditions

This method returns the number of entities that match the given conditions.
It's useful for getting counts without retrieving the actual entities.

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

`getMany?`

</td>
<td>

[`GetManyOptions`](#getmanyoptions)<`Entity`>

</td>
<td>

Options for filtering entities to count

</td>
</tr>
<tr>
<td>

`eh?`

</td>
<td>

[`TypeORMErrorHandler`](#typeormerrorhandler)

</td>
<td>

Optional custom error handler

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`number`>

The number of entities that match the conditions

###### Throws

If any error occurs during the count operation

###### Example

```typescript
// Count all users
const totalUsers = await userService.count();

// Count active users
const activeUsers = await userService.count({
  where: { isActive: true },
});

// Count users with specific conditions
const premiumUsers = await userService.count({
  where: {
    isActive: true,
    subscriptionType: "premium",
  },
});
```

###### See

- [getMany](#count-1) Method to retrieve entities that match conditions
- [BaseRepository.countMany](#countmany) Repository method that performs the actual count

##### create()

```ts
create<T>(createDto?, eh?): Entity;
```

Defined in: [libs/nest-crud/src/services/crud.service.ts:206](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/services/crud.service.ts#L206)

Creates a new entity instance without saving it to the database

This method creates a new entity instance from the provided data transfer object.
It does not save the entity to the database, but only initializes it with the
provided values. Use the `save` method to persist the entity.

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

`T` _extends_
| {
`createdAt?`: `EntityPropertyDeepPartial`<`Date`>;
`createdBy?`: `EntityPropertyDeepPartial`<`UserInfo` | `null`>;
`createdById?`: `EntityPropertyDeepPartial`<`EntityId` | `null`>;
`deletedAt?`: `EntityPropertyDeepPartial`<`Date` | `null`>;
`deletedBy?`: `EntityPropertyDeepPartial`<`UserInfo` | `null`>;
`deletedById?`: `EntityPropertyDeepPartial`<`EntityId` | `null`>;
`id?`: `EntityPropertyDeepPartial`<`EntityId`>;
`updatedAt?`: `EntityPropertyDeepPartial`<`Date`>;
`updatedBy?`: `EntityPropertyDeepPartial`<`UserInfo` | `null`>;
`updatedById?`: `EntityPropertyDeepPartial`<`EntityId` | `null`>;
}
| {
`id?`: `EntityPropertyDeepPartial`<`EntityId`>;
}

</td>
<td>

Type that extends DeepPartial of the base entity

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

`createDto?`

</td>
<td>

`T` | `T`\[]

</td>
<td>

The data transfer object containing entity properties

</td>
</tr>
<tr>
<td>

`eh?`

</td>
<td>

[`TypeORMErrorHandler`](#typeormerrorhandler)

</td>
<td>

Optional custom error handler

</td>
</tr>
</tbody>
</table>

###### Returns

`Entity`

A new entity instance with the provided properties

###### Throws

If an error occurs during entity creation

###### Example

```typescript
// Create a new user entity without saving it
const userDto = { name: "John Doe", email: "john@example.com" };
const user = userService.create(userDto);
console.log(user); // UserEntity instance with name and email set
```

###### See

- [save](#save-1) Method to create and save an entity
- [handleError](#handleerror) Method for standardized error handling

##### delete()

Implementation of the delete method

This method deletes an entity by its ID. It supports both soft delete (default) and
hard delete (permanent removal). When using soft delete, it can also set the deletedBy
property for audit tracking.

###### Param

The ID of the entity to delete

###### Param

The user who deleted the entity or true for hard delete

###### Param

Optional custom error handler

###### Throws

If the entity with the given ID is not found or ID is invalid

###### Throws

If any other error occurs during deletion

###### Example

```typescript
// Soft delete a user by ID
const userId = "123e4567-e89b-12d3-a456-426614174000";
const deletedUser = await userService.delete(userId);

// Hard delete a user by ID (permanent removal)
const permanentlyDeletedUser = await userService.delete(userId, true);

// Soft delete with audit tracking
const deletedUserWithAudit = await userService.delete(userId, currentUser);
```

###### See

- [deleteOne](#deleteone) Method to delete an entity by conditions
- [deleteMany](#deletemany) Method to delete multiple entities by conditions
- [deleteByIds](#deletebyids-1) Method to delete multiple entities by IDs
- [BaseRepository.deleteById](#deletebyid) Repository method that performs the soft delete
- [BaseRepository.hardDeleteById](#harddeletebyid) Repository method that performs the hard delete

###### Call Signature

```ts
delete(
   id,
   wipe?,
eh?): Promise<Entity>;
```

Defined in: [libs/nest-crud/src/services/crud.service.ts:851](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/services/crud.service.ts#L851)

Deletes an entity by its ID

This method supports both soft delete (default) and hard delete (permanent removal).
When using soft delete, it can also set the deletedBy property for audit tracking.

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

`id`

</td>
<td>

`EntityId`

</td>
<td>

The ID of the entity to delete

</td>
</tr>
<tr>
<td>

`wipe?`

</td>
<td>

`true`

</td>
<td>

When true, performs a hard delete (permanent removal)

</td>
</tr>
<tr>
<td>

`eh?`

</td>
<td>

[`TypeORMErrorHandler`](#typeormerrorhandler)

</td>
<td>

Optional custom error handler

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`Entity`>

The deleted entity

###### Throws

If the entity with the given ID is not found or ID is invalid

###### Throws

If any other error occurs during deletion

###### Call Signature

```ts
delete(
   id,
   deletedBy?,
eh?): Promise<Entity>;
```

Defined in: [libs/nest-crud/src/services/crud.service.ts:865](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/services/crud.service.ts#L865)

Deletes an entity by its ID with audit tracking

This overload performs a soft delete and sets the deletedBy property for audit tracking.

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

`id`

</td>
<td>

`EntityId`

</td>
<td>

The ID of the entity to delete

</td>
</tr>
<tr>
<td>

`deletedBy?`

</td>
<td>

`WithId`

</td>
<td>

The user who deleted the entity (for audit tracking)

</td>
</tr>
<tr>
<td>

`eh?`

</td>
<td>

[`TypeORMErrorHandler`](#typeormerrorhandler)

</td>
<td>

Optional custom error handler

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`Entity`>

The deleted entity

###### Throws

If the entity with the given ID is not found or ID is invalid

###### Throws

If any other error occurs during deletion

##### deleteByIds()

Implementation of the deleteByIds method

This method deletes multiple entities by their IDs. It supports both soft delete (default)
and hard delete (permanent removal). When using soft delete, it can also set the deletedBy
property for audit tracking. Unlike the other delete methods, this method returns a success
response rather than the deleted entities.

###### Param

Array of entity IDs to delete

###### Param

The user who deleted the entities or true for hard delete

###### Param

Optional custom error handler

###### Throws

If no entities with the given IDs are found

###### Throws

If any other error occurs during deletion

###### Example

```typescript
// Soft delete multiple users by IDs
const userIds = [
  "123e4567-e89b-12d3-a456-426614174000",
  "223e4567-e89b-12d3-a456-426614174000",
];
const result = await userService.deleteByIds(userIds);

// Hard delete multiple users by IDs (permanent removal)
const permanentResult = await userService.deleteByIds(userIds, true);

// Soft delete with audit tracking
const resultWithAudit = await userService.deleteByIds(userIds, currentUser);
```

###### See

- [delete](#delete-1) Method to delete a single entity by ID
- [deleteMany](#deletemany) Method to delete multiple entities by conditions
- [BaseRepository.deleteByIds](#deletebyids) Repository method that performs the soft delete
- [BaseRepository.hardDeleteByIds](#harddeletebyids) Repository method that performs the hard delete
- EntityUtils.handleSuccess Utility method that generates the success response

###### Call Signature

```ts
deleteByIds(
   ids,
   wipe?,
eh?): Promise<SuccessResponse>;
```

Defined in: [libs/nest-crud/src/services/crud.service.ts:1141](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/services/crud.service.ts#L1141)

Deletes multiple entities by their IDs

This method supports both soft delete (default) and hard delete (permanent removal).
Unlike the other delete methods, this method returns a success response rather than
the deleted entities.

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

`ids`

</td>
<td>

`EntityId`\[]

</td>
<td>

Array of entity IDs to delete

</td>
</tr>
<tr>
<td>

`wipe?`

</td>
<td>

`true`

</td>
<td>

When true, performs a hard delete (permanent removal)

</td>
</tr>
<tr>
<td>

`eh?`

</td>
<td>

[`TypeORMErrorHandler`](#typeormerrorhandler)

</td>
<td>

Optional custom error handler

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`SuccessResponse`>

A success response indicating the deletion was successful

###### Throws

If no entities with the given IDs are found

###### Throws

If any other error occurs during deletion

###### Call Signature

```ts
deleteByIds(
   ids,
   deletedBy?,
eh?): Promise<SuccessResponse>;
```

Defined in: [libs/nest-crud/src/services/crud.service.ts:1155](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/services/crud.service.ts#L1155)

Deletes multiple entities by their IDs with audit tracking

This overload performs a soft delete and sets the deletedBy property for audit tracking.

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

`ids`

</td>
<td>

`EntityId`\[]

</td>
<td>

Array of entity IDs to delete

</td>
</tr>
<tr>
<td>

`deletedBy?`

</td>
<td>

`WithId`

</td>
<td>

The user who deleted the entities (for audit tracking)

</td>
</tr>
<tr>
<td>

`eh?`

</td>
<td>

[`TypeORMErrorHandler`](#typeormerrorhandler)

</td>
<td>

Optional custom error handler

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`SuccessResponse`>

A success response indicating the deletion was successful

###### Throws

If no entities with the given IDs are found

###### Throws

If any other error occurs during deletion

##### deleteMany()

Implementation of the deleteMany method

This method deletes multiple entities that match the specified conditions.
It supports both soft delete (default) and hard delete (permanent removal).
When using soft delete, it can also set the deletedBy property for audit tracking.

###### Param

Conditions to find entities to delete

###### Param

The user who deleted the entities or true for hard delete

###### Param

Optional custom error handler

###### Throws

If no entities match the conditions

###### Throws

If any other error occurs during deletion

###### Example

```typescript
// Soft delete all inactive users
const deletedUsers = await userService.deleteMany({
  isActive: false,
});

// Hard delete all inactive users (permanent removal)
const permanentlyDeletedUsers = await userService.deleteMany(
  { isActive: false },
  true,
);

// Soft delete with audit tracking
const deletedUsersWithAudit = await userService.deleteMany(
  { isActive: false },
  currentUser,
);
```

###### See

- [delete](#delete-1) Method to delete a single entity by ID
- [deleteOne](#deleteone) Method to delete a single entity by conditions
- [deleteByIds](#deletebyids-1) Method to delete multiple entities by IDs
- [BaseRepository.deleteByIds](#deletebyids) Repository method that performs the soft delete
- [BaseRepository.hardDeleteByIds](#harddeletebyids) Repository method that performs the hard delete

###### Call Signature

```ts
deleteMany(
   where,
   wipe?,
eh?): Promise<Entity[]>;
```

Defined in: [libs/nest-crud/src/services/crud.service.ts:1042](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/services/crud.service.ts#L1042)

Deletes multiple entities that match the specified conditions

This method supports both soft delete (default) and hard delete (permanent removal).

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

`where`

</td>
<td>

`QueryDeepPartial`<`Entity`>

</td>
<td>

Conditions to find entities to delete

</td>
</tr>
<tr>
<td>

`wipe?`

</td>
<td>

`true`

</td>
<td>

When true, performs a hard delete (permanent removal)

</td>
</tr>
<tr>
<td>

`eh?`

</td>
<td>

[`TypeORMErrorHandler`](#typeormerrorhandler)

</td>
<td>

Optional custom error handler

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`Entity`\[]>

Array of deleted entities

###### Throws

If no entities match the conditions

###### Throws

If any other error occurs during deletion

###### Call Signature

```ts
deleteMany(
   where,
   deletedBy?,
eh?): Promise<Entity[]>;
```

Defined in: [libs/nest-crud/src/services/crud.service.ts:1056](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/services/crud.service.ts#L1056)

Deletes multiple entities that match the specified conditions with audit tracking

This overload performs a soft delete and sets the deletedBy property for audit tracking.

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

`where`

</td>
<td>

`QueryDeepPartial`<`Entity`>

</td>
<td>

Conditions to find entities to delete

</td>
</tr>
<tr>
<td>

`deletedBy?`

</td>
<td>

`WithId`

</td>
<td>

The user who deleted the entities (for audit tracking)

</td>
</tr>
<tr>
<td>

`eh?`

</td>
<td>

[`TypeORMErrorHandler`](#typeormerrorhandler)

</td>
<td>

Optional custom error handler

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`Entity`\[]>

Array of deleted entities

###### Throws

If no entities match the conditions

###### Throws

If any other error occurs during deletion

##### deleteOne()

Implementation of the deleteOne method

This method deletes a single entity that matches the specified conditions.
It supports both soft delete (default) and hard delete (permanent removal).
When using soft delete, it can also set the deletedBy property for audit tracking.

###### Param

Conditions to find the entity to delete

###### Param

The user who deleted the entity or true for hard delete

###### Param

Optional custom error handler

###### Throws

If no entity matches the conditions

###### Throws

If any other error occurs during deletion

###### Example

```typescript
// Soft delete a user by email
const deletedUser = await userService.deleteOne({
  email: "john@example.com",
});

// Hard delete a user by email (permanent removal)
const permanentlyDeletedUser = await userService.deleteOne(
  { email: "john@example.com" },
  true,
);

// Soft delete with audit tracking
const deletedUserWithAudit = await userService.deleteOne(
  { email: "john@example.com" },
  currentUser,
);
```

###### See

- [delete](#delete-1) Method to delete an entity by ID
- [deleteMany](#deletemany) Method to delete multiple entities by conditions
- [BaseRepository.deleteById](#deletebyid) Repository method that performs the soft delete
- [BaseRepository.hardDeleteById](#harddeletebyid) Repository method that performs the hard delete

###### Call Signature

```ts
deleteOne(
   where,
   wipe?,
eh?): Promise<Entity>;
```

Defined in: [libs/nest-crud/src/services/crud.service.ts:939](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/services/crud.service.ts#L939)

Deletes a single entity that matches the specified conditions

This method supports both soft delete (default) and hard delete (permanent removal).

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

`where`

</td>
<td>

`QueryDeepPartial`<`Entity`>

</td>
<td>

Conditions to find the entity to delete

</td>
</tr>
<tr>
<td>

`wipe?`

</td>
<td>

`true`

</td>
<td>

When true, performs a hard delete (permanent removal)

</td>
</tr>
<tr>
<td>

`eh?`

</td>
<td>

[`TypeORMErrorHandler`](#typeormerrorhandler)

</td>
<td>

Optional custom error handler

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`Entity`>

The deleted entity

###### Throws

If no entity matches the conditions

###### Throws

If any other error occurs during deletion

###### Call Signature

```ts
deleteOne(
   where,
   deletedBy?,
eh?): Promise<Entity>;
```

Defined in: [libs/nest-crud/src/services/crud.service.ts:953](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/services/crud.service.ts#L953)

Deletes a single entity that matches the specified conditions with audit tracking

This overload performs a soft delete and sets the deletedBy property for audit tracking.

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

`where`

</td>
<td>

`QueryDeepPartial`<`Entity`>

</td>
<td>

Conditions to find the entity to delete

</td>
</tr>
<tr>
<td>

`deletedBy?`

</td>
<td>

`WithId`

</td>
<td>

The user who deleted the entity (for audit tracking)

</td>
</tr>
<tr>
<td>

`eh?`

</td>
<td>

[`TypeORMErrorHandler`](#typeormerrorhandler)

</td>
<td>

Optional custom error handler

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`Entity`>

The deleted entity

###### Throws

If no entity matches the conditions

###### Throws

If any other error occurs during deletion

##### get()

```ts
get(
   id,
   options?,
eh?): Promise<Entity>;
```

Defined in: [libs/nest-crud/src/services/crud.service.ts:622](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/services/crud.service.ts#L622)

Retrieves an entity by its ID

This method fetches an entity with the specified ID. It can also load related
entities if specified in the options.

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

`id`

</td>
<td>

`EntityId`

</td>
<td>

The ID of the entity to retrieve

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

[`GetByIdOptions`](#getbyidoptions)<`Entity`>

</td>
<td>

Options for retrieving the entity, such as relations to load

</td>
</tr>
<tr>
<td>

`eh?`

</td>
<td>

[`TypeORMErrorHandler`](#typeormerrorhandler)

</td>
<td>

Optional custom error handler

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`Entity`>

The retrieved entity

###### Throws

If the entity with the given ID is not found or ID is invalid

###### Throws

If any other error occurs during retrieval

###### Example

```typescript
// Get a user by ID
const userId = "123e4567-e89b-12d3-a456-426614174000";
const user = await userService.get(userId);

// Get a user with related entities
const userWithProfile = await userService.get(userId, {
  relations: ["profile", "orders"],
});
```

###### See

- [getOne](#getone-1) Method to retrieve an entity by conditions
- [getByIds](#getbyids-1) Method to retrieve multiple entities by IDs
- [BaseRepository.getById](#getbyid) Repository method that performs the actual retrieval

##### getAll()

```ts
getAll<Options>(getAll?, eh?): Options extends object ? Promise<PaginatedResponse<Entity>> : Promise<Entity[]>;
```

Defined in: [libs/nest-crud/src/services/crud.service.ts:820](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/services/crud.service.ts#L820)

Retrieves all entities, optionally with filtering, sorting, and pagination

This method is similar to getMany but is intended for retrieving all entities
when no specific conditions are needed. It supports pagination, sorting, and
loading related entities. When pagination is specified, it returns a PaginatedResponse
object with the entities and pagination information. Otherwise, it returns an array
of entities.

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

`Options` _extends_ [`GetAllOptions`](#getalloptions)<`Entity`>

</td>
<td>

Type that extends GetAllOptions for the base entity

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

`getAll?`

</td>
<td>

`Options`

</td>
<td>

Optional settings for retrieving entities, including relations and pagination

</td>
</tr>
<tr>
<td>

`eh?`

</td>
<td>

[`TypeORMErrorHandler`](#typeormerrorhandler)

</td>
<td>

Optional custom error handler

</td>
</tr>
</tbody>
</table>

###### Returns

`Options` _extends_ `object` ? `Promise`<`PaginatedResponse`<`Entity`>> : `Promise`<`Entity`\[]>

Paginated response or array of entities

###### Throws

If any error occurs during retrieval

###### Example

```typescript
// Get all users
const allUsers = await userService.getAll();

// Get all users with pagination
const paginatedUsers = await userService.getAll({
  pagination: { page: 1, limit: 10 },
});

// Get all users with sorting and relations
const sortedUsers = await userService.getAll({
  order: { createdAt: "DESC" },
  relations: ["profile"],
});
```

###### See

- [getMany](#getmany-1) Method to retrieve entities with specific conditions
- [BaseRepository.getMany](#getmany) Repository method that performs the actual retrieval
- PaginatedResponse Class that represents a paginated response

##### getByIds()

```ts
getByIds(getByIds, eh?): Promise<Entity[]>;
```

Defined in: [libs/nest-crud/src/services/crud.service.ts:671](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/services/crud.service.ts#L671)

Retrieves multiple entities by their IDs

This method fetches all entities with the specified IDs. It can also load related
entities if specified in the options.

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

`getByIds`

</td>
<td>

[`GetByIdsOptions`](#getbyidsoptions)<`Entity`>

</td>
<td>

Options for retrieving entities, including the IDs and relations

</td>
</tr>
<tr>
<td>

`eh?`

</td>
<td>

[`TypeORMErrorHandler`](#typeormerrorhandler)

</td>
<td>

Optional custom error handler

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`Entity`\[]>

Array of retrieved entities

###### Throws

If any of the IDs are invalid

###### Throws

If any other error occurs during retrieval

###### Example

```typescript
// Get multiple users by IDs
const userIds = [
  "123e4567-e89b-12d3-a456-426614174000",
  "223e4567-e89b-12d3-a456-426614174000",
];
const users = await userService.getByIds({ ids: userIds });

// Get users with related entities
const usersWithProfiles = await userService.getByIds({
  ids: userIds,
  relations: ["profile"],
});
```

###### See

- [get](#get) Method to retrieve a single entity by ID
- [getMany](#getmany-1) Method to retrieve multiple entities by conditions
- [BaseRepository.getByIds](#getbyids) Repository method that performs the actual retrieval

##### getMany()

```ts
getMany<Options>(getMany, eh?): Options extends object ? Promise<PaginatedResponse<Entity>> : Promise<Entity[]>;
```

Defined in: [libs/nest-crud/src/services/crud.service.ts:766](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/services/crud.service.ts#L766)

Retrieves multiple entities that match the specified conditions

This method fetches all entities that match the given conditions. It supports
pagination, sorting, filtering, and loading related entities. When pagination
is specified, it returns a PaginatedResponse object with the entities and pagination
information. Otherwise, it returns an array of entities.

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

`Options` _extends_ [`GetManyOptions`](#getmanyoptions)<`Entity`>

</td>
<td>

Type that extends GetManyOptions for the base entity

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

`getMany`

</td>
<td>

`Options`

</td>
<td>

Options for retrieving entities, including conditions, relations, and pagination

</td>
</tr>
<tr>
<td>

`eh?`

</td>
<td>

[`TypeORMErrorHandler`](#typeormerrorhandler)

</td>
<td>

Optional custom error handler

</td>
</tr>
</tbody>
</table>

###### Returns

`Options` _extends_ `object` ? `Promise`<`PaginatedResponse`<`Entity`>> : `Promise`<`Entity`\[]>

Paginated response or array of entities

###### Throws

If any error occurs during retrieval

###### Example

```typescript
// Get users with filtering
const users = await userService.getMany({
  where: { isActive: true },
});

// Get users with pagination
const paginatedUsers = await userService.getMany({
  where: { isActive: true },
  pagination: { page: 1, limit: 10 },
});

// Get users with sorting and relations
const sortedUsers = await userService.getMany({
  where: { isActive: true },
  order: { createdAt: "DESC" },
  relations: ["profile"],
});
```

###### See

- [getOne](#getone-1) Method to retrieve a single entity by conditions
- [getAll](#getall) Method to retrieve all entities
- [BaseRepository.getMany](#getmany) Repository method that performs the actual retrieval
- PaginatedResponse Class that represents a paginated response

##### getOne()

```ts
getOne(getOne, eh?): Promise<Entity>;
```

Defined in: [libs/nest-crud/src/services/crud.service.ts:713](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/services/crud.service.ts#L713)

Retrieves a single entity that matches the specified conditions

This method fetches the first entity that matches the given conditions.
It can also load related entities if specified in the options.

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

`getOne`

</td>
<td>

[`GetOneOptions`](#getoneoptions)<`Entity`>

</td>
<td>

Options for retrieving the entity, including conditions and relations

</td>
</tr>
<tr>
<td>

`eh?`

</td>
<td>

[`TypeORMErrorHandler`](#typeormerrorhandler)

</td>
<td>

Optional custom error handler

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`Entity`>

The retrieved entity

###### Throws

If no entity matches the conditions

###### Throws

If any other error occurs during retrieval

###### Example

```typescript
// Get a user by email
const user = await userService.getOne({
  where: { email: "john@example.com" },
});

// Get a user with related entities
const userWithProfile = await userService.getOne({
  where: { email: "john@example.com" },
  relations: ["profile"],
});
```

###### See

- [get](#get) Method to retrieve an entity by ID
- [getMany](#getmany-1) Method to retrieve multiple entities by conditions
- [BaseRepository.getOne](#getone) Repository method that performs the actual retrieval

##### getRepository()

```ts
getRepository(): BaseRepository<Entity>;
```

Defined in: [libs/nest-crud/src/services/crud.service.ts:178](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/services/crud.service.ts#L178)

Gets the repository instance used by this service

This method provides access to the underlying repository instance that the service
uses for database operations. It's useful when you need to perform custom operations
that aren't covered by the standard CRUD methods or when you need to access
repository-specific functionality.

###### Returns

[`BaseRepository`](#baserepository)<`Entity`>

The repository instance for the entity

###### Example

```typescript
// Access the repository for custom operations
const repository = userService.getRepository();

// Use repository methods directly
const customQuery = await repository
  .createQueryBuilder("user")
  .where("user.email LIKE :pattern", { pattern: "%@company.com" })
  .getMany();

// Access repository metadata
const entityMetadata = repository.metadata;
```

###### See

[BaseRepository](#baserepository) The repository class that provides enhanced data access

##### handleError()

```ts
handleError(error, eh?): never;
```

Defined in: [libs/nest-crud/src/services/crud.service.ts:1368](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/services/crud.service.ts#L1368)

Handles errors in a standardized way

This method provides centralized error handling for all service methods.
It first checks if the error is already an HttpException, in which case it
rethrows it. Then it applies any custom error handler if provided. Finally,
it delegates to EntityUtils.handleError for standard error handling.

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

`error`

</td>
<td>

`unknown`

</td>
<td>

The error to handle

</td>
</tr>
<tr>
<td>

`eh?`

</td>
<td>

[`TypeORMErrorHandler`](#typeormerrorhandler)

</td>
<td>

Optional custom error handler

</td>
</tr>
</tbody>
</table>

###### Returns

`never`

This method always throws an exception

###### Throws

The appropriate HTTP exception based on the error

###### Example

```typescript
// Custom error handler in a service method
async customOperation(): Promise<void> {
  try {
    // Some operation that might fail
    await this.repository.doSomething();
  } catch (error) {
    this.handleError(error, (err) => {
      // Custom error handling logic
      if (err instanceof SomeSpecificError) {
        return new BadRequestException('Custom error message');
      }
      return null; // Let the default handler handle other errors
    });
  }
}
```

###### See

- EntityUtils.handleError Utility method that handles entity-related errors
- [TypeORMErrorHandler](#typeormerrorhandler) Type definition for custom error handlers

##### save()

```ts
save<T>(
   createDto,
   options?,
   createdBy?,
eh?): Promise<Entity | null>;
```

Defined in: [libs/nest-crud/src/services/crud.service.ts:253](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/services/crud.service.ts#L253)

Creates and saves a new entity to the database

This method creates a new entity from the provided data transfer object and
saves it to the database. It also sets the createdBy property if a user is provided.
After saving, it retrieves the entity with any specified relations or options.

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

`T` _extends_
| {
`createdAt?`: `EntityPropertyDeepPartial`<`Date`>;
`createdBy?`: `EntityPropertyDeepPartial`<`UserInfo` | `null`>;
`createdById?`: `EntityPropertyDeepPartial`<`EntityId` | `null`>;
`deletedAt?`: `EntityPropertyDeepPartial`<`Date` | `null`>;
`deletedBy?`: `EntityPropertyDeepPartial`<`UserInfo` | `null`>;
`deletedById?`: `EntityPropertyDeepPartial`<`EntityId` | `null`>;
`id?`: `EntityPropertyDeepPartial`<`EntityId`>;
`updatedAt?`: `EntityPropertyDeepPartial`<`Date`>;
`updatedBy?`: `EntityPropertyDeepPartial`<`UserInfo` | `null`>;
`updatedById?`: `EntityPropertyDeepPartial`<`EntityId` | `null`>;
}
| {
`id?`: `EntityPropertyDeepPartial`<`EntityId`>;
}

</td>
<td>

Type that extends DeepPartial of the base entity

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

`createDto`

</td>
<td>

`T`

</td>
<td>

The data transfer object containing entity properties

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

[`SaveAndGetOptions`](#saveandgetoptions)<`Entity`>

</td>
<td>

Options for saving and retrieving the entity

</td>
</tr>
<tr>
<td>

`createdBy?`

</td>
<td>

`WithId`

</td>
<td>

The user who created the entity (for audit tracking)

</td>
</tr>
<tr>
<td>

`eh?`

</td>
<td>

[`TypeORMErrorHandler`](#typeormerrorhandler)

</td>
<td>

Optional custom error handler

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`Entity` | `null`>

The saved entity or null if not found

###### Throws

If an error occurs during entity creation or saving

###### Example

```typescript
// Create and save a new user
const userDto = { name: "John Doe", email: "john@example.com" };
const user = await userService.save(userDto);

// Create with relations loaded
const userWithProfile = await userService.save(userDto, {
  relations: ["profile"],
});

// Create with audit tracking
const userWithAudit = await userService.save(userDto, undefined, currentUser);
```

###### See

- [create](#create-1) Method to create an entity without saving
- [saveMany](#savemany-1) Method to save multiple entities
- [BaseRepository.saveAndGet](#saveandget) Repository method that performs the actual save operation

##### saveMany()

```ts
saveMany<T>(
   createDtos,
   options?,
   createdBy?,
eh?): Promise<Entity[]>;
```

Defined in: [libs/nest-crud/src/services/crud.service.ts:302](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/services/crud.service.ts#L302)

Creates and saves multiple entities to the database

This method creates multiple entities from an array of data transfer objects
and saves them to the database in a single operation. It also sets the createdBy
property on each entity if a user is provided.

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

`T` _extends_
| {
`createdAt?`: `EntityPropertyDeepPartial`<`Date`>;
`createdBy?`: `EntityPropertyDeepPartial`<`UserInfo` | `null`>;
`createdById?`: `EntityPropertyDeepPartial`<`EntityId` | `null`>;
`deletedAt?`: `EntityPropertyDeepPartial`<`Date` | `null`>;
`deletedBy?`: `EntityPropertyDeepPartial`<`UserInfo` | `null`>;
`deletedById?`: `EntityPropertyDeepPartial`<`EntityId` | `null`>;
`id?`: `EntityPropertyDeepPartial`<`EntityId`>;
`updatedAt?`: `EntityPropertyDeepPartial`<`Date`>;
`updatedBy?`: `EntityPropertyDeepPartial`<`UserInfo` | `null`>;
`updatedById?`: `EntityPropertyDeepPartial`<`EntityId` | `null`>;
}
| {
`id?`: `EntityPropertyDeepPartial`<`EntityId`>;
}

</td>
<td>

Type that extends DeepPartial of the base entity

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

`createDtos`

</td>
<td>

`T`\[]

</td>
<td>

Array of data transfer objects containing entity properties

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

[`SaveOptionsWithSkip`](#saveoptionswithskip)

</td>
<td>

Options for saving entities, including skipCreate flag to control whether new entities should be created during save operations. When skipCreate is true, only updates existing entities. Defaults to false.

</td>
</tr>
<tr>
<td>

`createdBy?`

</td>
<td>

`WithId`

</td>
<td>

The user who created the entities (for audit tracking)

</td>
</tr>
<tr>
<td>

`eh?`

</td>
<td>

[`TypeORMErrorHandler`](#typeormerrorhandler)

</td>
<td>

Optional custom error handler

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`Entity`\[]>

Array of saved entities

###### Throws

If an error occurs during entity creation or saving

###### Example

```typescript
// Create and save multiple users
const userDtos = [
  { name: "John Doe", email: "john@example.com" },
  { name: "Jane Smith", email: "jane@example.com" },
];
const users = await userService.saveMany(userDtos);

// With audit tracking
const usersWithAudit = await userService.saveMany(
  userDtos,
  undefined,
  currentUser,
);
```

###### See

- [save](#save-1) Method to save a single entity
- [BaseRepository.saveMany](#savemany) Repository method that performs the actual save operation

##### transaction()

```ts
transaction<T>(operation): Promise<T>;
```

Defined in: [libs/nest-crud/src/services/crud.service.ts:1294](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/services/crud.service.ts#L1294)

Executes operations within a transaction

This method creates a transaction and executes the provided operation function
within that transaction. If the operation succeeds, the transaction is committed.
If an error occurs, the transaction is rolled back.

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

The return type of the operation

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

`operation`

</td>
<td>

() => `Promise`<`T`>

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`T`>

The result of the operation

###### Throws

If any error occurs during the transaction

###### Example

```typescript
// Execute multiple operations in a transaction
const result = await userService.transaction(async (manager) => {
  // Create a user
  const user = await manager.getRepository(UserEntity).save({
    name: "John Doe",
    email: "john@example.com",
  });

  // Create a profile for the user
  const profile = await manager.getRepository(ProfileEntity).save({
    user,
    bio: "Software developer",
  });

  return { user, profile };
});
```

###### See

[BaseRepository.transaction](#transaction) Repository method that manages the transaction

##### try()

```ts
try<T>(fn): Promise<T>;
```

Defined in: [libs/nest-crud/src/services/crud.service.ts:1325](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/services/crud.service.ts#L1325)

Executes a function with error handling

This utility method executes the provided function and handles any errors
that occur using the service's error handling mechanism. It's useful for
wrapping custom operations that aren't covered by the standard CRUD methods.

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

The return type of the function

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

`fn`

</td>
<td>

() => `Promise`<`T`>

</td>
<td>

Function to execute

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`T`>

The result of the function

###### Throws

If any error occurs during execution

###### Example

```typescript
// Execute a custom operation with error handling
const result = await userService.try(async () => {
  // Custom logic that might throw errors
  const user = await someExternalService.fetchUser("john@example.com");
  if (!user) {
    throw new NotFoundException("User not found in external service");
  }
  return user;
});
```

###### See

[handleError](#handleerror) Method that handles errors

##### update()

```ts
update<T>(
   id,
   updateDto,
   options?,
   updatedBy?,
eh?): Promise<Entity>;
```

Defined in: [libs/nest-crud/src/services/crud.service.ts:370](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/services/crud.service.ts#L370)

Updates an entity by its ID

This method updates an entity with the specified ID using the provided data.
It also sets the updatedBy property if a user is provided. After updating,
it retrieves the updated entity with any specified relations or options.

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

`T` _extends_
| {
`createdAt?`: `EntityPropertyDeepPartial`<`Date`>;
`createdBy?`: `EntityPropertyDeepPartial`<`UserInfo` | `null`>;
`createdById?`: `EntityPropertyDeepPartial`<`EntityId` | `null`>;
`deletedAt?`: `EntityPropertyDeepPartial`<`Date` | `null`>;
`deletedBy?`: `EntityPropertyDeepPartial`<`UserInfo` | `null`>;
`deletedById?`: `EntityPropertyDeepPartial`<`EntityId` | `null`>;
`id?`: `EntityPropertyDeepPartial`<`EntityId`>;
`updatedAt?`: `EntityPropertyDeepPartial`<`Date`>;
`updatedBy?`: `EntityPropertyDeepPartial`<`UserInfo` | `null`>;
`updatedById?`: `EntityPropertyDeepPartial`<`EntityId` | `null`>;
}
| {
`id?`: `EntityPropertyDeepPartial`<`EntityId`>;
}

</td>
<td>

Type that extends QueryDeepPartial of the base entity

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

`id`

</td>
<td>

`EntityId`

</td>
<td>

The ID of the entity to update

</td>
</tr>
<tr>
<td>

`updateDto`

</td>
<td>

`T`

</td>
<td>

The data transfer object containing properties to update

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

[`GetByIdOptions`](#getbyidoptions)<`Entity`>

</td>
<td>

Options for retrieving the updated entity

</td>
</tr>
<tr>
<td>

`updatedBy?`

</td>
<td>

`WithId`

</td>
<td>

The user who updated the entity (for audit tracking)

</td>
</tr>
<tr>
<td>

`eh?`

</td>
<td>

[`TypeORMErrorHandler`](#typeormerrorhandler)

</td>
<td>

Optional custom error handler

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`Entity`>

The updated entity

###### Throws

If the entity with the given ID is not found or ID is invalid

###### Throws

If the update operation fails

###### Throws

If any other error occurs during the update

###### Example

```typescript
// Update a user by ID
const userId = "123e4567-e89b-12d3-a456-426614174000";
const updateDto = { name: "Updated Name" };
const updatedUser = await userService.update(userId, updateDto);

// Update with relations loaded
const updatedUserWithProfile = await userService.update(userId, updateDto, {
  relations: ["profile"],
});

// Update with audit tracking
const updatedUserWithAudit = await userService.update(
  userId,
  updateDto,
  undefined,
  currentUser,
);
```

###### See

- [updateOne](#updateone-1) Method to update an entity by conditions
- [updateMany](#updatemany-1) Method to update multiple entities by conditions
- [updateByIds](#updatebyids-1) Method to update multiple entities by IDs
- [BaseRepository.updateById](#updatebyid) Repository method that performs the actual update operation

##### updateByIds()

```ts
updateByIds<T>(
   ids,
   updateDto,
   updatedBy?,
eh?): Promise<SuccessResponse>;
```

Defined in: [libs/nest-crud/src/services/crud.service.ts:565](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/services/crud.service.ts#L565)

Updates multiple entities by their IDs

This method updates all entities with the specified IDs using the provided data.
It also sets the updatedBy property if a user is provided. Like updateMany,
this method returns a success response rather than the updated entities.

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

`T` _extends_
| {
`createdAt?`: `EntityPropertyDeepPartial`<`Date`>;
`createdBy?`: `EntityPropertyDeepPartial`<`UserInfo` | `null`>;
`createdById?`: `EntityPropertyDeepPartial`<`EntityId` | `null`>;
`deletedAt?`: `EntityPropertyDeepPartial`<`Date` | `null`>;
`deletedBy?`: `EntityPropertyDeepPartial`<`UserInfo` | `null`>;
`deletedById?`: `EntityPropertyDeepPartial`<`EntityId` | `null`>;
`id?`: `EntityPropertyDeepPartial`<`EntityId`>;
`updatedAt?`: `EntityPropertyDeepPartial`<`Date`>;
`updatedBy?`: `EntityPropertyDeepPartial`<`UserInfo` | `null`>;
`updatedById?`: `EntityPropertyDeepPartial`<`EntityId` | `null`>;
}
| {
`id?`: `EntityPropertyDeepPartial`<`EntityId`>;
}

</td>
<td>

Type that extends QueryDeepPartial of the base entity

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

`ids`

</td>
<td>

`EntityId`\[]

</td>
<td>

Array of entity IDs to update

</td>
</tr>
<tr>
<td>

`updateDto`

</td>
<td>

`T`

</td>
<td>

The data transfer object containing properties to update

</td>
</tr>
<tr>
<td>

`updatedBy?`

</td>
<td>

`WithId`

</td>
<td>

The user who updated the entities (for audit tracking)

</td>
</tr>
<tr>
<td>

`eh?`

</td>
<td>

[`TypeORMErrorHandler`](#typeormerrorhandler)

</td>
<td>

Optional custom error handler

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`SuccessResponse`>

A success response indicating the update was successful

###### Throws

If any of the IDs are invalid

###### Throws

If the update operation fails

###### Throws

If any other error occurs during the update

###### Example

```typescript
// Update multiple users by IDs
const userIds = [
  "123e4567-e89b-12d3-a456-426614174000",
  "223e4567-e89b-12d3-a456-426614174000",
];
const updateDto = { isVerified: true };
const result = await userService.updateByIds(userIds, updateDto);

// Update with audit tracking
const resultWithAudit = await userService.updateByIds(
  userIds,
  updateDto,
  currentUser,
);
```

###### See

- [update](#update-1) Method to update a single entity by ID
- [updateMany](#updatemany-1) Method to update multiple entities by conditions
- [BaseRepository.updateByIds](#updatebyids) Repository method that performs the actual update operation
- EntityUtils.handleSuccess Utility method that generates the success response

##### updateMany()

```ts
updateMany<T>(
   where,
   updateDto,
   updatedBy?,
eh?): Promise<SuccessResponse>;
```

Defined in: [libs/nest-crud/src/services/crud.service.ts:501](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/services/crud.service.ts#L501)

Updates multiple entities that match the specified conditions

This method updates all entities that match the given conditions.
It also sets the updatedBy property if a user is provided. Unlike update and updateOne,
this method returns a success response rather than the updated entities.

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

`T` _extends_
| {
`createdAt?`: `EntityPropertyDeepPartial`<`Date`>;
`createdBy?`: `EntityPropertyDeepPartial`<`UserInfo` | `null`>;
`createdById?`: `EntityPropertyDeepPartial`<`EntityId` | `null`>;
`deletedAt?`: `EntityPropertyDeepPartial`<`Date` | `null`>;
`deletedBy?`: `EntityPropertyDeepPartial`<`UserInfo` | `null`>;
`deletedById?`: `EntityPropertyDeepPartial`<`EntityId` | `null`>;
`id?`: `EntityPropertyDeepPartial`<`EntityId`>;
`updatedAt?`: `EntityPropertyDeepPartial`<`Date`>;
`updatedBy?`: `EntityPropertyDeepPartial`<`UserInfo` | `null`>;
`updatedById?`: `EntityPropertyDeepPartial`<`EntityId` | `null`>;
}
| {
`id?`: `EntityPropertyDeepPartial`<`EntityId`>;
}

</td>
<td>

Type that extends QueryDeepPartial of the base entity

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

`where`

</td>
<td>

`QueryDeepPartial`<`Entity`>

</td>
<td>

Conditions to find entities to update

</td>
</tr>
<tr>
<td>

`updateDto`

</td>
<td>

`T`

</td>
<td>

The data transfer object containing properties to update

</td>
</tr>
<tr>
<td>

`updatedBy?`

</td>
<td>

`WithId`

</td>
<td>

The user who updated the entities (for audit tracking)

</td>
</tr>
<tr>
<td>

`eh?`

</td>
<td>

[`TypeORMErrorHandler`](#typeormerrorhandler)

</td>
<td>

Optional custom error handler

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`SuccessResponse`>

A success response indicating the update was successful

###### Throws

If the update operation fails

###### Throws

If any other error occurs during the update

###### Example

```typescript
// Update all active users
const updateDto = { lastLoginAt: new Date() };
const result = await userService.updateMany({ isActive: true }, updateDto);

// Update with audit tracking
const resultWithAudit = await userService.updateMany(
  { isActive: true },
  updateDto,
  currentUser,
);
```

###### See

- [update](#update-1) Method to update an entity by ID
- [updateOne](#updateone-1) Method to update a single entity by conditions
- [updateByIds](#updatebyids-1) Method to update multiple entities by IDs
- [BaseRepository.updateMany](#updatemany) Repository method that performs the actual update operation
- EntityUtils.handleSuccess Utility method that generates the success response

##### updateOne()

```ts
updateOne<T>(
   where,
   updateDto,
   options?,
   updatedBy?,
eh?): Promise<Entity>;
```

Defined in: [libs/nest-crud/src/services/crud.service.ts:437](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/services/crud.service.ts#L437)

Updates a single entity that matches the specified conditions

This method updates the first entity that matches the given conditions.
It also sets the updatedBy property if a user is provided. After updating,
it retrieves the updated entity.

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

`T` _extends_
| {
`createdAt?`: `EntityPropertyDeepPartial`<`Date`>;
`createdBy?`: `EntityPropertyDeepPartial`<`UserInfo` | `null`>;
`createdById?`: `EntityPropertyDeepPartial`<`EntityId` | `null`>;
`deletedAt?`: `EntityPropertyDeepPartial`<`Date` | `null`>;
`deletedBy?`: `EntityPropertyDeepPartial`<`UserInfo` | `null`>;
`deletedById?`: `EntityPropertyDeepPartial`<`EntityId` | `null`>;
`id?`: `EntityPropertyDeepPartial`<`EntityId`>;
`updatedAt?`: `EntityPropertyDeepPartial`<`Date`>;
`updatedBy?`: `EntityPropertyDeepPartial`<`UserInfo` | `null`>;
`updatedById?`: `EntityPropertyDeepPartial`<`EntityId` | `null`>;
}
| {
`id?`: `EntityPropertyDeepPartial`<`EntityId`>;
}

</td>
<td>

Type that extends QueryDeepPartial of the base entity

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

`where`

</td>
<td>

`QueryDeepPartial`<`Entity`>

</td>
<td>

Conditions to find the entity to update

</td>
</tr>
<tr>
<td>

`updateDto`

</td>
<td>

`T`

</td>
<td>

The data transfer object containing properties to update

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

`Omit`<[`GetOneOptions`](#getoneoptions)<`Entity`>, `"where"`>

</td>
<td>

Options for retrieving the updated entity, excluding the where condition

</td>
</tr>
<tr>
<td>

`updatedBy?`

</td>
<td>

`WithId`

</td>
<td>

The user who updated the entity (for audit tracking)

</td>
</tr>
<tr>
<td>

`eh?`

</td>
<td>

[`TypeORMErrorHandler`](#typeormerrorhandler)

</td>
<td>

Optional custom error handler

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`Entity`>

The updated entity

###### Throws

If the update operation fails

###### Throws

If any other error occurs during the update

###### Example

```typescript
// Update a user by email
const updateDto = { name: "Updated Name" };
const updatedUser = await userService.updateOne(
  { email: "john@example.com" },
  updateDto,
);

// Update with audit tracking
const updatedUserWithAudit = await userService.updateOne(
  { email: "john@example.com" },
  updateDto,
  currentUser,
);
```

###### See

- [update](#update-1) Method to update an entity by ID
- [updateMany](#updatemany-1) Method to update multiple entities by conditions
- [BaseRepository.updateOne](#updateone) Repository method that performs the actual update operation

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Modifier</th>
<th>Type</th>
<th>Description</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="property-repository"></a> `repository`

</td>
<td>

`readonly`

</td>
<td>

[`BaseRepository`](#baserepository)<`Entity`>

</td>
<td>

The repository for the entity

</td>
<td>

[libs/nest-crud/src/services/crud.service.ts:139](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/services/crud.service.ts#L139)

</td>
</tr>
</tbody>
</table>

---

### HichchiCrudModule

Defined in: [libs/nest-crud/src/crud.module.ts:35](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/crud.module.ts#L35)

Module for integrating TypeORM with NestJS and providing CRUD functionality

This module provides a streamlined way to integrate TypeORM with NestJS applications
and offers enhanced CRUD functionality through specialized entities and repositories.
It handles database connection configuration, entity registration, and validation.

Key features:

- Simplified database connection setup with sensible defaults
- Entity validation to ensure proper inheritance and decoration
- Integration with TypeORM's repository pattern
- Support for custom entities that extend base entity classes
- Automatic entity registration with TypeORM

The module is designed to be used in the root module of your application (via `forRoot`)
and in feature modules (via `forFeature`) to register specific entities.

#### See

- [BaseEntity](#baseentity) The base entity class that custom entities should extend
- [BaseEntityExtension](#baseentityextension) Alternative base entity with extended functionality
- [HichchiUserEntity](#hichchiuserentity) Specialized entity for user management
- EntityUtils Utility class for entity operations

#### Constructors

##### Constructor

```ts
new HichchiCrudModule(): HichchiCrudModule;
```

###### Returns

[`HichchiCrudModule`](#hichchicrudmodule)

#### Methods

##### forFeature()

```ts
static forFeature(entities): DynamicModule;
```

Defined in: [libs/nest-crud/src/crud.module.ts:131](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/crud.module.ts#L131)

Register entities for the HichchiCrudModule

This method is used to register entities for the `HichchiCrudModule`.
It takes an array of entities as an argument and returns a dynamic module.
The entities should be custom entities that extends from `BaseEntity` provided by `@hichchi/nest-core`
and implement the (Not the BaseEntity from `typeorm`).

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

`entities`

</td>
<td>

( | _typeof_ [`BaseEntity`](#baseentity) | _typeof_ [`BaseEntityExtension`](#baseentityextension))\[]

</td>
<td>

The entities to register

</td>
</tr>
</tbody>
</table>

###### Returns

`DynamicModule`

The dynamic module

###### Example

```TypeScript
@Module({
    imports: [
        HichchiCrudModule.forFeature([UserEntity]),
    ],
    controllers: [UserController],
    providers: [UserService, UserRepository],
    exports: [UserService, UserRepository],
})
export class UserModule {}
```

##### forRoot()

```ts
static forRoot(options): DynamicModule;
```

Defined in: [libs/nest-crud/src/crud.module.ts:73](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/crud.module.ts#L73)

Register the HichchiCrudModule

This method is used to register the `HichchiCrudModule`.
It takes the connection options as an argument and returns a dynamic module.
The connection options include the type, host, port, username, password, database, entities, migrations,
charset, synchronize, legacySpatialSupport, keepConnectionAlive, and autoLoadEntities.

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

[`ConnectionOptions`](#connectionoptions)

</td>
<td>

The connection options

</td>
</tr>
</tbody>
</table>

###### Returns

`DynamicModule`

The dynamic module

###### Example

```TypeScript
const connectionOptions: IConnectionOptions = {
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "",
  database: "dbname",
  charset: "utf8mb4",
  synchronize: false,
  entities: ["dist/** /*.entity{.ts,.js}"],
  migrations: ["dist/database/migrations/*{.ts,.js}"],
  legacySpatialSupport: false,
  keepConnectionAlive: true,
  autoLoadEntities: true,
}

@Module({
    imports: [HichchiCrudModule.forRoot(connectionOptions)],
    controllers: [...],
    providers: [...],
})
export class AppModule {}
```

##### validateEntities()

```ts
static validateEntities(entities): void;
```

Defined in: [libs/nest-crud/src/crud.module.ts:206](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/crud.module.ts#L206)

Validates entities for registration with the HichchiCrudModule

This method ensures that all entities being registered with the module meet
the required criteria:

1. Each entity must be decorated with the `@HichchiEntity()` decorator
2. Each entity must extend one of the base entity classes: `BaseEntity`,
   `BaseEntityExtension`, or `HichchiUserEntity`

These validations ensure that entities will work correctly with the CRUD
functionality provided by the module. If any entity fails validation,
an ImplementationException is thrown with a descriptive error message.

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

`entities`

</td>
<td>

( | _typeof_ [`BaseEntity`](#baseentity) | _typeof_ [`BaseEntityExtension`](#baseentityextension))\[]

</td>
<td>

Array of entity classes to validate

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### Throws

- If any entity fails validation

###### See

- [BaseEntity](#baseentity) The primary base entity class
- [BaseEntityExtension](#baseentityextension) Alternative base entity with extended functionality
- [HichchiUserEntity](#hichchiuserentity) Specialized entity for user management
- [forFeature](#forfeature) The method that uses this validation

---

### HichchiUserEntity

Defined in: [libs/nest-crud/src/base/base-user.entity.ts:51](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/base/base-user.entity.ts#L51)

Base user entity class that provides common user fields and functionality

This class extends BaseEntity and implements the UserInfo interface, providing
the core user properties required for user identification and display. It serves
as the foundation for all user-related entities in the application, ensuring
consistent structure and behavior across different user types.

Key features:

- Provides firstName, lastName, and fullName properties required by UserInfo
- Automatically maintains the fullName property based on firstName and lastName
- Inherits all audit tracking capabilities from BaseEntity

Application-specific user entities should extend this class and add additional
properties as needed, such as email, password, roles, etc.

#### Example

```typescript
@HichchiEntity("users", ["email"])
export class UserEntity extends HichchiUserEntity implements User {
  @Column({ nullable: false })
  email: string;

  @Column({ nullable: true })
  password?: string;

  @Column({ default: false })
  emailVerified: boolean;
}
```

#### Implements

Provides the core user identification properties

#### See

UserInfo The interface that defines the required user properties

#### Implements

- `UserInfo`
- `Model`

#### Constructors

##### Constructor

```ts
new HichchiUserEntity(): HichchiUserEntity;
```

###### Returns

[`HichchiUserEntity`](#hichchiuserentity)

#### Methods

##### afterLoad()?

```ts
protected optional afterLoad(): void;
```

Defined in: [libs/nest-crud/src/base/base-user.entity.ts:246](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/base/base-user.entity.ts#L246)

Lifecycle hook that runs after an entity is loaded from the database

This method is automatically called by TypeORM after an entity is loaded.
It maps the user entities (createdBy, updatedBy, deletedBy) to a simplified format
using the private \_mapUserEntity method to ensure only essential user information
is included.

###### Returns

`void`

###### See

UserInfo The interface that defines the user information structure

##### beforeInsert()?

```ts
protected optional beforeInsert(): void;
```

Defined in: [libs/nest-crud/src/base/base-user.entity.ts:231](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/base/base-user.entity.ts#L231)

Lifecycle hooks that run before an entity is inserted or updated

This method is automatically called by TypeORM before an entity is inserted
or updated. It ensures that the fullName property is always up-to-date by
concatenating the firstName and lastName properties.

###### Returns

`void`

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

<a id="property-avatar"></a> `avatar`

</td>
<td>

`string` | `null`

</td>
<td>

‐

</td>
<td>

[libs/nest-crud/src/base/base-user.entity.ts:214](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/base/base-user.entity.ts#L214)

</td>
</tr>
<tr>
<td>

<a id="property-createdat-1"></a> `createdAt`

</td>
<td>

`Date`

</td>
<td>

Timestamp when the entity was created

This field is automatically set to the current timestamp when the entity is created.
It is not nullable and cannot be changed after creation.

</td>
<td>

[libs/nest-crud/src/base/base-user.entity.ts:80](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/base/base-user.entity.ts#L80)

</td>
</tr>
<tr>
<td>

<a id="property-createdby-1"></a> `createdBy`

</td>
<td>

`UserInfo` | `null`

</td>
<td>

User who created the entity

This field stores a reference to the user who created the entity.
It is automatically loaded when the entity is retrieved with relations.

</td>
<td>

[libs/nest-crud/src/base/base-user.entity.ts:117](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/base/base-user.entity.ts#L117)

</td>
</tr>
<tr>
<td>

<a id="property-createdbyid-1"></a> `createdById`

</td>
<td>

`EntityId` | `null`

</td>
<td>

ID of the user who created the entity

This field stores the ID of the user who created the entity.
It is used for the foreign key relationship with the createdBy field.

</td>
<td>

[libs/nest-crud/src/base/base-user.entity.ts:107](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/base/base-user.entity.ts#L107)

</td>
</tr>
<tr>
<td>

<a id="property-deletedat-1"></a> `deletedAt`

</td>
<td>

`Date` | `null`

</td>
<td>

Timestamp when the entity was soft-deleted

This field is automatically set when the entity is soft-deleted using TypeORM's
soft delete functionality. When this field has a value, the entity is considered deleted.

</td>
<td>

[libs/nest-crud/src/base/base-user.entity.ts:98](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/base/base-user.entity.ts#L98)

</td>
</tr>
<tr>
<td>

<a id="property-deletedby-1"></a> `deletedBy`

</td>
<td>

`UserInfo` | `null`

</td>
<td>

User who deleted the entity

This field stores a reference to the user who deleted the entity.
It is automatically loaded when the entity is retrieved with relations.

</td>
<td>

[libs/nest-crud/src/base/base-user.entity.ts:155](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/base/base-user.entity.ts#L155)

</td>
</tr>
<tr>
<td>

<a id="property-deletedbyid-1"></a> `deletedById`

</td>
<td>

`EntityId` | `null`

</td>
<td>

ID of the user who deleted the entity

This field stores the ID of the user who deleted the entity.
It is used for the foreign key relationship with the deletedBy field.

</td>
<td>

[libs/nest-crud/src/base/base-user.entity.ts:145](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/base/base-user.entity.ts#L145)

</td>
</tr>
<tr>
<td>

<a id="property-email"></a> `email`

</td>
<td>

`string` | `null`

</td>
<td>

The user's email address

This property stores the user's email address for authentication and communication
purposes. It is optional and can be null if the user doesn't have an email address
or uses alternative authentication methods.

</td>
<td>

[libs/nest-crud/src/base/base-user.entity.ts:194](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/base/base-user.entity.ts#L194)

</td>
</tr>
<tr>
<td>

<a id="property-emailverified"></a> `emailVerified`

</td>
<td>

`boolean`

</td>
<td>

‐

</td>
<td>

[libs/nest-crud/src/base/base-user.entity.ts:211](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/base/base-user.entity.ts#L211)

</td>
</tr>
<tr>
<td>

<a id="property-firstname"></a> `firstName`

</td>
<td>

`string`

</td>
<td>

The user's first name or given name

This property stores the user's first name and is used for personalization
and formal addressing throughout the application. It is required and cannot
be null.

</td>
<td>

[libs/nest-crud/src/base/base-user.entity.ts:165](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/base/base-user.entity.ts#L165)

</td>
</tr>
<tr>
<td>

<a id="property-fullname"></a> `fullName`

</td>
<td>

`string`

</td>
<td>

The user's complete name, automatically generated from firstName and lastName

This property provides a convenience for displaying the user's full name
without having to concatenate the first and last names manually. It is
automatically maintained by the beforeInsert and beforeUpdate hooks.

</td>
<td>

[libs/nest-crud/src/base/base-user.entity.ts:184](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/base/base-user.entity.ts#L184)

</td>
</tr>
<tr>
<td>

<a id="property-id-2"></a> `id`

</td>
<td>

`EntityId`

</td>
<td>

Unique identifier for the entity

This UUID is automatically generated when the entity is created.
It serves as the primary key for the entity in the database.

</td>
<td>

[libs/nest-crud/src/base/base-user.entity.ts:59](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/base/base-user.entity.ts#L59)

</td>
</tr>
<tr>
<td>

<a id="property-lastname"></a> `lastName`

</td>
<td>

`string`

</td>
<td>

The user's last name or family name

This property stores the user's last name and is used alongside the first name
for formal addressing and identification. It is required and cannot be null.

</td>
<td>

[libs/nest-crud/src/base/base-user.entity.ts:174](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/base/base-user.entity.ts#L174)

</td>
</tr>
<tr>
<td>

<a id="property-password"></a> `password`

</td>
<td>

`string` | `null`

</td>
<td>

‐

</td>
<td>

[libs/nest-crud/src/base/base-user.entity.ts:208](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/base/base-user.entity.ts#L208)

</td>
</tr>
<tr>
<td>

<a id="property-profiledata"></a> `profileData`

</td>
<td>

`GoogleProfile` | `null`

</td>
<td>

‐

</td>
<td>

[libs/nest-crud/src/base/base-user.entity.ts:217](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/base/base-user.entity.ts#L217)

</td>
</tr>
<tr>
<td>

<a id="property-signuptype"></a> `signUpType`

</td>
<td>

`AuthProvider`

</td>
<td>

‐

</td>
<td>

[libs/nest-crud/src/base/base-user.entity.ts:220](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/base/base-user.entity.ts#L220)

</td>
</tr>
<tr>
<td>

<a id="property-tenant"></a> `tenant`

</td>
<td>

`TenantSlug` | `null`

</td>
<td>

Represents the tenant associated with the current context.
The value can either be a tenant-specific identifier (TenantSlug) or null if no tenant is assigned.

A TenantSlug is typically a unique string or slug representing a tenant in multi-tenant applications.
Null indicates the absence of a tenant in the current context.

This variable is often used to scope application logic and data to a specific tenant.

</td>
<td>

[libs/nest-crud/src/base/base-user.entity.ts:71](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/base/base-user.entity.ts#L71)

</td>
</tr>
<tr>
<td>

<a id="property-updatedat-1"></a> `updatedAt`

</td>
<td>

`Date`

</td>
<td>

Timestamp when the entity was last updated

This field is automatically set to the current timestamp when the entity is created
and updated whenever the entity is modified.

</td>
<td>

[libs/nest-crud/src/base/base-user.entity.ts:89](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/base/base-user.entity.ts#L89)

</td>
</tr>
<tr>
<td>

<a id="property-updatedby-1"></a> `updatedBy`

</td>
<td>

`UserInfo` | `null`

</td>
<td>

User who last updated the entity

This field stores a reference to the user who last updated the entity.
It is automatically loaded when the entity is retrieved with relations.

</td>
<td>

[libs/nest-crud/src/base/base-user.entity.ts:136](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/base/base-user.entity.ts#L136)

</td>
</tr>
<tr>
<td>

<a id="property-updatedbyid-1"></a> `updatedById`

</td>
<td>

`EntityId` | `null`

</td>
<td>

ID of the user who last updated the entity

This field stores the ID of the user who last updated the entity.
It is used for the foreign key relationship with the updatedBy field.

</td>
<td>

[libs/nest-crud/src/base/base-user.entity.ts:126](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/base/base-user.entity.ts#L126)

</td>
</tr>
<tr>
<td>

<a id="property-username"></a> `username`

</td>
<td>

`string` | `null`

</td>
<td>

The user's unique username for authentication

This property stores a unique username that can be used for authentication
and user identification. It is optional and can be null if the user uses
alternative authentication methods like email-only authentication.

</td>
<td>

[libs/nest-crud/src/base/base-user.entity.ts:204](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/base/base-user.entity.ts#L204)

</td>
</tr>
</tbody>
</table>

---

### IdsDto

Defined in: [libs/nest-crud/src/dtos/ids.dto.ts:10](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/dtos/ids.dto.ts#L10)

#### Implements

- `IdsBody`

#### Constructors

##### Constructor

```ts
new IdsDto(): IdsDto;
```

###### Returns

[`IdsDto`](#idsdto)

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

<a id="property-ids-1"></a> `ids`

</td>
<td>

`EntityId`\[]

</td>
<td>

[libs/nest-crud/src/dtos/ids.dto.ts:14](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/dtos/ids.dto.ts#L14)

</td>
</tr>
</tbody>
</table>

---

### Repository

Defined in: node_modules/typeorm/repository/Repository.d.ts:22

Repository is supposed to work with your entity objects. Find entities, insert, update, delete, etc.

#### Extended by

- [`BaseRepository`](#baserepository)

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`Entity` _extends_ `ObjectLiteral`

</td>
</tr>
</tbody>
</table>

#### Accessors

##### metadata

###### Get Signature

```ts
get metadata(): EntityMetadata;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:40

Entity metadata of the entity current repository manages.

###### Returns

`EntityMetadata`

#### Constructors

##### Constructor

```ts
new Repository<Entity>(
   target,
   manager,
queryRunner?): Repository<Entity>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:41

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

`target`

</td>
<td>

`EntityTarget`<`Entity`>

</td>
</tr>
<tr>
<td>

`manager`

</td>
<td>

`EntityManager`

</td>
</tr>
<tr>
<td>

`queryRunner?`

</td>
<td>

`QueryRunner`

</td>
</tr>
</tbody>
</table>

###### Returns

[`Repository`](#repository)<`Entity`>

#### Methods

##### average()

```ts
average(columnName, where?): Promise<number | null>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:245

Return the AVG of a column

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

`columnName`

</td>
<td>

`PickKeysByType`<`Entity`, `number`>

</td>
</tr>
<tr>
<td>

`where?`

</td>
<td>

`FindOptionsWhere`<`Entity`> | `FindOptionsWhere`<`Entity`>\[]

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`number` | `null`>

##### clear()

```ts
clear(): Promise<void>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:337

Clears all the data from the given table/collection (truncates/drops it).

Note: this method uses TRUNCATE and may not work as you expect in transactions on some platforms.

###### Returns

`Promise`<`void`>

###### See

https://stackoverflow.com/a/5972738/925151

##### count()

```ts
count(options?): Promise<number>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:232

Counts entities that match given options.
Useful for pagination.

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

`FindManyOptions`<`Entity`>

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`number`>

##### countBy()

```ts
countBy(where): Promise<number>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:237

Counts entities that match given conditions.
Useful for pagination.

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

`where`

</td>
<td>

`FindOptionsWhere`<`Entity`> | `FindOptionsWhere`<`Entity`>\[]

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`number`>

##### create()

###### Call Signature

```ts
create(): Entity;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:58

Creates a new entity instance.

###### Returns

`Entity`

###### Call Signature

```ts
create(entityLikeArray): Entity[];
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:63

Creates new entities and copies all entity properties from given objects into their new entities.
Note that it copies only properties that are present in entity schema.

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

`entityLikeArray`

</td>
<td>

`DeepPartial`<`Entity`>\[]

</td>
</tr>
</tbody>
</table>

###### Returns

`Entity`\[]

###### Call Signature

```ts
create(entityLike): Entity;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:68

Creates a new entity instance and copies all entity properties from this object into a new entity.
Note that it copies only properties that are present in entity schema.

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

`entityLike`

</td>
<td>

`DeepPartial`<`Entity`>

</td>
</tr>
</tbody>
</table>

###### Returns

`Entity`

##### createQueryBuilder()

```ts
createQueryBuilder(alias?, queryRunner?): SelectQueryBuilder<Entity>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:45

Creates a new query builder that can be used to build a SQL query.

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

`alias?`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`queryRunner?`

</td>
<td>

`QueryRunner`

</td>
</tr>
</tbody>
</table>

###### Returns

`SelectQueryBuilder`<`Entity`>

##### decrement()

```ts
decrement(
   conditions,
   propertyPath,
value): Promise<UpdateResult>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:345

Decrements some column by provided value of the entities matched given conditions.

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

`conditions`

</td>
<td>

`FindOptionsWhere`<`Entity`>

</td>
</tr>
<tr>
<td>

`propertyPath`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`value`

</td>
<td>

`string` | `number`

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`UpdateResult`>

##### delete()

```ts
delete(criteria): Promise<DeleteResult>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:189

Deletes entities by a given criteria.
Unlike save method executes a primitive operation without cascades, relations and other operations included.
Executes fast and efficient DELETE query.
Does not check if entity exist in the database.

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

`criteria`

</td>
<td>

| `string` | `number` | `string`\[] | `number`\[] | `Date` | `ObjectId` | `Date`\[] | `ObjectId`\[] | `FindOptionsWhere`<`Entity`> | `FindOptionsWhere`<`Entity`>\[]

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`DeleteResult`>

##### deleteAll()

```ts
deleteAll(): Promise<DeleteResult>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:197

Deletes all entities of target type.
This is a primitive operation without cascades, relations or other operations included.
Executes fast and efficient DELETE query without WHERE clause.

WARNING! This method deletes ALL rows in the target table.

###### Returns

`Promise`<`DeleteResult`>

##### ~~exist()~~

```ts
exist(options?): Promise<boolean>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:219

Checks whether any entity exists that matches the given options.

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

`FindManyOptions`<`Entity`>

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`boolean`>

###### Deprecated

use `exists` method instead, for example:

.exists()

##### exists()

```ts
exists(options?): Promise<boolean>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:223

Checks whether any entity exists that matches the given options.

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

`FindManyOptions`<`Entity`>

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`boolean`>

##### existsBy()

```ts
existsBy(where): Promise<boolean>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:227

Checks whether any entity exists that matches the given conditions.

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

`where`

</td>
<td>

`FindOptionsWhere`<`Entity`> | `FindOptionsWhere`<`Entity`>\[]

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`boolean`>

##### extend()

```ts
extend<CustomRepository>(customs): Repository<Entity> & CustomRepository;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:349

Extends repository with provided functions.

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

`CustomRepository`

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

`customs`

</td>
<td>

`CustomRepository` & `ThisType`<[`Repository`](#repository)<`Entity`> & `CustomRepository`>

</td>
</tr>
</tbody>
</table>

###### Returns

[`Repository`](#repository)<`Entity`> & `CustomRepository`

##### find()

```ts
find(options?): Promise<Entity[]>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:257

Finds entities that match given find options.

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

`FindManyOptions`<`Entity`>

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`Entity`\[]>

##### findAndCount()

```ts
findAndCount(options?): Promise<[Entity[], number]>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:267

Finds entities that match given find options.
Also counts all entities that match given conditions,
but ignores pagination settings (from and take options).

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

`FindManyOptions`<`Entity`>

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<\[`Entity`\[], `number`]>

##### findAndCountBy()

```ts
findAndCountBy(where): Promise<[Entity[], number]>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:273

Finds entities that match given WHERE conditions.
Also counts all entities that match given conditions,
but ignores pagination settings (from and take options).

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

`where`

</td>
<td>

`FindOptionsWhere`<`Entity`> | `FindOptionsWhere`<`Entity`>\[]

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<\[`Entity`\[], `number`]>

##### findBy()

```ts
findBy(where): Promise<Entity[]>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:261

Finds entities that match given find options.

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

`where`

</td>
<td>

`FindOptionsWhere`<`Entity`> | `FindOptionsWhere`<`Entity`>\[]

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`Entity`\[]>

##### ~~findByIds()~~

```ts
findByIds(ids): Promise<Entity[]>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:284

Finds entities with ids.
Optionally find options or conditions can be applied.

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

`ids`

</td>
<td>

`any`\[]

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`Entity`\[]>

###### Deprecated

use `findBy` method instead in conjunction with `In` operator, for example:

.findBy({
id: In(\[1, 2, 3])
})

##### findOne()

```ts
findOne(options): Promise<Entity | null>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:289

Finds first entity by a given find options.
If entity was not found in the database - returns null.

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

`options`

</td>
<td>

`FindOneOptions`<`Entity`>

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`Entity` | `null`>

##### findOneBy()

```ts
findOneBy(where): Promise<Entity | null>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:294

Finds first entity that matches given where condition.
If entity was not found in the database - returns null.

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

`where`

</td>
<td>

`FindOptionsWhere`<`Entity`> | `FindOptionsWhere`<`Entity`>\[]

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`Entity` | `null`>

##### ~~findOneById()~~

```ts
findOneById(id): Promise<Entity | null>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:305

Finds first entity that matches given id.
If entity was not found in the database - returns null.

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

`id`

</td>
<td>

`string` | `number` | `Date` | `ObjectId`

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`Entity` | `null`>

###### Deprecated

use `findOneBy` method instead in conjunction with `In` operator, for example:

.findOneBy({
id: 1 // where "id" is your primary column name
})

##### findOneByOrFail()

```ts
findOneByOrFail(where): Promise<Entity>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:315

Finds first entity that matches given where condition.
If entity was not found in the database - rejects with error.

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

`where`

</td>
<td>

`FindOptionsWhere`<`Entity`> | `FindOptionsWhere`<`Entity`>\[]

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`Entity`>

##### findOneOrFail()

```ts
findOneOrFail(options): Promise<Entity>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:310

Finds first entity by a given find options.
If entity was not found in the database - rejects with error.

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

`options`

</td>
<td>

`FindOneOptions`<`Entity`>

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`Entity`>

##### getId()

```ts
getId(entity): any;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:54

Gets entity mixed id.

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

`entity`

</td>
<td>

`Entity`

</td>
</tr>
</tbody>
</table>

###### Returns

`any`

##### hasId()

```ts
hasId(entity): boolean;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:50

Checks if entity has an id.
If entity composite compose ids, it will check them all.

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

`entity`

</td>
<td>

`Entity`

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean`

##### increment()

```ts
increment(
   conditions,
   propertyPath,
value): Promise<UpdateResult>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:341

Increments some column by provided value of the entities matched given conditions.

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

`conditions`

</td>
<td>

`FindOptionsWhere`<`Entity`>

</td>
</tr>
<tr>
<td>

`propertyPath`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`value`

</td>
<td>

`string` | `number`

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`UpdateResult`>

##### insert()

```ts
insert(entity): Promise<InsertResult>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:161

Inserts a given entity into the database.
Unlike save method executes a primitive operation without cascades, relations and other operations included.
Executes fast and efficient INSERT query.
Does not check if entity exist in the database, so query will fail if duplicate entity is being inserted.

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

`entity`

</td>
<td>

| `_QueryDeepPartialEntity`<`ObjectLiteral` _extends_ `Entity` ? `unknown` : `Entity`> | `_QueryDeepPartialEntity`<`ObjectLiteral` _extends_ `Entity` ? `unknown` : `Entity`>\[]

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`InsertResult`>

##### maximum()

```ts
maximum(columnName, where?): Promise<number | null>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:253

Return the MAX of a column

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

`columnName`

</td>
<td>

`PickKeysByType`<`Entity`, `number`>

</td>
</tr>
<tr>
<td>

`where?`

</td>
<td>

`FindOptionsWhere`<`Entity`> | `FindOptionsWhere`<`Entity`>\[]

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`number` | `null`>

##### merge()

```ts
merge(mergeIntoEntity, ...entityLikes): Entity;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:72

Merges multiple entities (or entity-like objects) into a given entity.

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

`mergeIntoEntity`

</td>
<td>

`Entity`

</td>
</tr>
<tr>
<td>

...`entityLikes`

</td>
<td>

`DeepPartial`<`Entity`>\[]

</td>
</tr>
</tbody>
</table>

###### Returns

`Entity`

##### minimum()

```ts
minimum(columnName, where?): Promise<number | null>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:249

Return the MIN of a column

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

`columnName`

</td>
<td>

`PickKeysByType`<`Entity`, `number`>

</td>
</tr>
<tr>
<td>

`where?`

</td>
<td>

`FindOptionsWhere`<`Entity`> | `FindOptionsWhere`<`Entity`>\[]

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`number` | `null`>

##### preload()

```ts
preload(entityLike): Promise<Entity | undefined>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:82

Creates a new entity from the given plain javascript object. If entity already exist in the database, then
it loads it (and everything related to it), replaces all values with the new ones from the given object
and returns this new entity. This new entity is actually a loaded from the db entity with all properties
replaced from the new object.

Note that given entity-like object must have an entity id / primary key to find entity by.
Returns undefined if entity with given id was not found.

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

`entityLike`

</td>
<td>

`DeepPartial`<`Entity`>

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`Entity` | `undefined`>

##### query()

```ts
query<T>(query, parameters?): Promise<T>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:322

Executes a raw SQL query and returns a raw database results.
Raw query execution is supported only by relational databases (MongoDB is not supported).

###### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
<th>Default type</th>
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

`query`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`parameters?`

</td>
<td>

`any`\[]

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`T`>

###### See

[Official docs](https://typeorm.io/repository-api) for examples.

##### recover()

###### Call Signature

```ts
recover<T>(entities, options): Promise<T[]>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:138

Recovers all given entities in the database.

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

`T` _extends_
| `ObjectLiteral`
| `Map`<`unknown`, `unknown`>
| `Set`<`unknown`>
| `any`\[]
| {
\[`key`: `string`]: `any`;
}

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

`entities`

</td>
<td>

`T`\[]

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

`SaveOptions` & `object`

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`T`\[]>

###### Call Signature

```ts
recover<T>(entities, options?): Promise<T & Entity[]>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:144

Recovers all given entities in the database.

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

`T` _extends_
| `ObjectLiteral`
| `Map`<`unknown`, `unknown`>
| `Set`<`unknown`>
| `any`\[]
| {
\[`key`: `string`]: `any`;
}

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

`entities`

</td>
<td>

`T`\[]

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

`SaveOptions`

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`T` & `Entity`\[]>

###### Call Signature

```ts
recover<T>(entity, options): Promise<T>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:148

Recovers a given entity in the database.

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

`T` _extends_
| `ObjectLiteral`
| `Map`<`unknown`, `unknown`>
| `Set`<`unknown`>
| `any`\[]
| {
\[`key`: `string`]: `any`;
}

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

`entity`

</td>
<td>

`T`

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

`SaveOptions` & `object`

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`T`>

###### Call Signature

```ts
recover<T>(entity, options?): Promise<T & Entity>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:154

Recovers a given entity in the database.

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

`T` _extends_
| `ObjectLiteral`
| `Map`<`unknown`, `unknown`>
| `Set`<`unknown`>
| `any`\[]
| {
\[`key`: `string`]: `any`;
}

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

`entity`

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

`SaveOptions`

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`T` & `Entity`>

##### remove()

###### Call Signature

```ts
remove(entities, options?): Promise<Entity[]>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:110

Removes a given entities from the database.

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

`entities`

</td>
<td>

`Entity`\[]

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

`RemoveOptions`

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`Entity`\[]>

###### Call Signature

```ts
remove(entity, options?): Promise<Entity>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:114

Removes a given entity from the database.

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

`entity`

</td>
<td>

`Entity`

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

`RemoveOptions`

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`Entity`>

##### restore()

```ts
restore(criteria): Promise<UpdateResult>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:211

Restores entities by a given criteria.
Unlike save method executes a primitive operation without cascades, relations and other operations included.
Executes fast and efficient UPDATE query.
Does not check if entity exist in the database.

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

`criteria`

</td>
<td>

| `string` | `number` | `string`\[] | `number`\[] | `Date` | `ObjectId` | `Date`\[] | `ObjectId`\[] | `FindOptionsWhere`<`Entity`> | `FindOptionsWhere`<`Entity`>\[]

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`UpdateResult`>

##### save()

###### Call Signature

```ts
save<T>(entities, options): Promise<T[]>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:87

Saves all given entities in the database.
If entities do not exist in the database then inserts, otherwise updates.

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

`T` _extends_
| `ObjectLiteral`
| `Map`<`unknown`, `unknown`>
| `Set`<`unknown`>
| `any`\[]
| {
\[`key`: `string`]: `any`;
}

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

`entities`

</td>
<td>

`T`\[]

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

`SaveOptions` & `object`

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`T`\[]>

###### Call Signature

```ts
save<T>(entities, options?): Promise<T & Entity[]>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:94

Saves all given entities in the database.
If entities do not exist in the database then inserts, otherwise updates.

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

`T` _extends_
| `ObjectLiteral`
| `Map`<`unknown`, `unknown`>
| `Set`<`unknown`>
| `any`\[]
| {
\[`key`: `string`]: `any`;
}

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

`entities`

</td>
<td>

`T`\[]

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

`SaveOptions`

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`T` & `Entity`\[]>

###### Call Signature

```ts
save<T>(entity, options): Promise<T>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:99

Saves a given entity in the database.
If entity does not exist in the database then inserts, otherwise updates.

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

`T` _extends_
| `ObjectLiteral`
| `Map`<`unknown`, `unknown`>
| `Set`<`unknown`>
| `any`\[]
| {
\[`key`: `string`]: `any`;
}

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

`entity`

</td>
<td>

`T`

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

`SaveOptions` & `object`

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`T`>

###### Call Signature

```ts
save<T>(entity, options?): Promise<T & Entity>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:106

Saves a given entity in the database.
If entity does not exist in the database then inserts, otherwise updates.

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

`T` _extends_
| `ObjectLiteral`
| `Map`<`unknown`, `unknown`>
| `Set`<`unknown`>
| `any`\[]
| {
\[`key`: `string`]: `any`;
}

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

`entity`

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

`SaveOptions`

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`T` & `Entity`>

##### softDelete()

```ts
softDelete(criteria): Promise<UpdateResult>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:204

Records the delete date of entities by a given criteria.
Unlike save method executes a primitive operation without cascades, relations and other operations included.
Executes fast and efficient UPDATE query.
Does not check if entity exist in the database.

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

`criteria`

</td>
<td>

| `string` | `number` | `string`\[] | `number`\[] | `Date` | `ObjectId` | `Date`\[] | `ObjectId`\[] | `FindOptionsWhere`<`Entity`> | `FindOptionsWhere`<`Entity`>\[]

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`UpdateResult`>

##### softRemove()

###### Call Signature

```ts
softRemove<T>(entities, options): Promise<T[]>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:118

Records the delete date of all given entities.

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

`T` _extends_
| `ObjectLiteral`
| `Map`<`unknown`, `unknown`>
| `Set`<`unknown`>
| `any`\[]
| {
\[`key`: `string`]: `any`;
}

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

`entities`

</td>
<td>

`T`\[]

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

`SaveOptions` & `object`

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`T`\[]>

###### Call Signature

```ts
softRemove<T>(entities, options?): Promise<T & Entity[]>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:124

Records the delete date of all given entities.

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

`T` _extends_
| `ObjectLiteral`
| `Map`<`unknown`, `unknown`>
| `Set`<`unknown`>
| `any`\[]
| {
\[`key`: `string`]: `any`;
}

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

`entities`

</td>
<td>

`T`\[]

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

`SaveOptions`

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`T` & `Entity`\[]>

###### Call Signature

```ts
softRemove<T>(entity, options): Promise<T>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:128

Records the delete date of a given entity.

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

`T` _extends_
| `ObjectLiteral`
| `Map`<`unknown`, `unknown`>
| `Set`<`unknown`>
| `any`\[]
| {
\[`key`: `string`]: `any`;
}

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

`entity`

</td>
<td>

`T`

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

`SaveOptions` & `object`

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`T`>

###### Call Signature

```ts
softRemove<T>(entity, options?): Promise<T & Entity>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:134

Records the delete date of a given entity.

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

`T` _extends_
| `ObjectLiteral`
| `Map`<`unknown`, `unknown`>
| `Set`<`unknown`>
| `any`\[]
| {
\[`key`: `string`]: `any`;
}

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

`entity`

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

`SaveOptions`

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`T` & `Entity`>

##### sql()

```ts
sql<T>(strings, ...values): Promise<T>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:330

Tagged template function that executes raw SQL query and returns raw database results.
Template expressions are automatically transformed into database parameters.
Raw query execution is supported only by relational databases (MongoDB is not supported).
Note: Don't call this as a regular function, it is meant to be used with backticks to tag a template literal.
Example: repository.sql`SELECT * FROM table_name WHERE id = ${id}`

###### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
<th>Default type</th>
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

`strings`

</td>
<td>

`TemplateStringsArray`

</td>
</tr>
<tr>
<td>

...`values`

</td>
<td>

`unknown`\[]

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`T`>

##### sum()

```ts
sum(columnName, where?): Promise<number | null>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:241

Return the SUM of a column

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

`columnName`

</td>
<td>

`PickKeysByType`<`Entity`, `number`>

</td>
</tr>
<tr>
<td>

`where?`

</td>
<td>

`FindOptionsWhere`<`Entity`> | `FindOptionsWhere`<`Entity`>\[]

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`number` | `null`>

##### update()

```ts
update(criteria, partialEntity): Promise<UpdateResult>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:168

Updates entity partially. Entity can be found by a given conditions.
Unlike save method executes a primitive operation without cascades, relations and other operations included.
Executes fast and efficient UPDATE query.
Does not check if entity exist in the database.

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

`criteria`

</td>
<td>

| `string` | `number` | `string`\[] | `number`\[] | `Date` | `ObjectId` | `Date`\[] | `ObjectId`\[] | `FindOptionsWhere`<`Entity`> | `FindOptionsWhere`<`Entity`>\[]

</td>
</tr>
<tr>
<td>

`partialEntity`

</td>
<td>

`QueryDeepPartialEntity`<`Entity`>

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`UpdateResult`>

##### updateAll()

```ts
updateAll(partialEntity): Promise<UpdateResult>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:176

Updates all entities of target type, setting fields from supplied partial entity.
This is a primitive operation without cascades, relations or other operations included.
Executes fast and efficient UPDATE query without WHERE clause.

WARNING! This method updates ALL rows in the target table.

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

`partialEntity`

</td>
<td>

`QueryDeepPartialEntity`<`Entity`>

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`UpdateResult`>

##### upsert()

```ts
upsert(entityOrEntities, conflictPathsOrOptions): Promise<InsertResult>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:182

Inserts a given entity into the database, unless a unique constraint conflicts then updates the entity
Unlike save method executes a primitive operation without cascades, relations and other operations included.
Executes fast and efficient INSERT ... ON CONFLICT DO UPDATE/ON DUPLICATE KEY UPDATE query.

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

`entityOrEntities`

</td>
<td>

| `_QueryDeepPartialEntity`<`ObjectLiteral` _extends_ `Entity` ? `unknown` : `Entity`> | `_QueryDeepPartialEntity`<`ObjectLiteral` _extends_ `Entity` ? `unknown` : `Entity`>\[]

</td>
</tr>
<tr>
<td>

`conflictPathsOrOptions`

</td>
<td>

`string`\[] | `UpsertOptions`<`Entity`>

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`<`InsertResult`>

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Modifier</th>
<th>Type</th>
<th>Description</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="property-manager-1"></a> `manager`

</td>
<td>

`readonly`

</td>
<td>

`EntityManager`

</td>
<td>

Entity Manager used by this repository.

</td>
<td>

node_modules/typeorm/repository/Repository.d.ts:32

</td>
</tr>
<tr>
<td>

<a id="property-queryrunner-1"></a> `queryRunner?`

</td>
<td>

`readonly`

</td>
<td>

`QueryRunner`

</td>
<td>

Query runner provider used for this repository.

</td>
<td>

node_modules/typeorm/repository/Repository.d.ts:36

</td>
</tr>
<tr>
<td>

<a id="property-target-1"></a> `target`

</td>
<td>

`readonly`

</td>
<td>

`EntityTarget`<`Entity`>

</td>
<td>

Entity target that is managed by this repository.
If this repository manages entity from schema,
then it returns a name of that schema instead.

</td>
<td>

node_modules/typeorm/repository/Repository.d.ts:28

</td>
</tr>
</tbody>
</table>

## Enumerations

### Operation

Defined in: [libs/nest-crud/src/enums/crud.enums.ts:50](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/enums/crud.enums.ts#L50)

CRUD Operations Enum

This enum defines the standard Create, Read, Update, Delete (CRUD) operations
that can be performed on database entities. These values are used throughout
the application to identify the type of database operation being performed.

These operation types can be useful for logging, audit trails, or implementing
operation-specific behaviors such as validation rules or triggers that vary
depending on whether an entity is being created, updated, or deleted.

#### Enumeration Members

<table>
<thead>
<tr>
<th>Enumeration Member</th>
<th>Value</th>
<th>Description</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="enumeration-member-create"></a> `CREATE`

</td>
<td>

`"CREATE"`

</td>
<td>

Create operation

Represents the creation of a new entity in the database.
This operation typically validates that the entity doesn't already exist
and performs any initialization logic required for new entities.

</td>
<td>

[libs/nest-crud/src/enums/crud.enums.ts:58](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/enums/crud.enums.ts#L58)

</td>
</tr>
<tr>
<td>

<a id="enumeration-member-delete"></a> `DELETE`

</td>
<td>

`"DELETE"`

</td>
<td>

Delete operation

Represents the removal of an existing entity from the database.
This operation may perform cascading deletes, soft deletes, or
enforce referential integrity constraints, depending on the configuration.

</td>
<td>

[libs/nest-crud/src/enums/crud.enums.ts:85](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/enums/crud.enums.ts#L85)

</td>
</tr>
<tr>
<td>

<a id="enumeration-member-save"></a> `SAVE`

</td>
<td>

`"SAVE"`

</td>
<td>

Save operation

Represents a general-purpose save operation that can either create
a new entity or update an existing one, depending on whether the
entity already exists in the database.

</td>
<td>

[libs/nest-crud/src/enums/crud.enums.ts:76](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/enums/crud.enums.ts#L76)

</td>
</tr>
<tr>
<td>

<a id="enumeration-member-update"></a> `UPDATE`

</td>
<td>

`"UPDATE"`

</td>
<td>

Update operation

Represents updating an existing entity in the database.
This operation typically requires that the entity already exists
and may enforce different validation rules than creation.

</td>
<td>

[libs/nest-crud/src/enums/crud.enums.ts:67](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/enums/crud.enums.ts#L67)

</td>
</tr>
</tbody>
</table>

---

### TypeORMErrorType

Defined in: [libs/nest-crud/src/enums/crud.enums.ts:13](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/enums/crud.enums.ts#L13)

TypeORM Database Error Types

This enum defines common error types that may occur during database operations
when using TypeORM. These error codes correspond to specific database errors,
particularly from MySQL/MariaDB, and can be used to identify and handle
different types of database exceptions in a structured way.

Capturing these specific error types allows the application to implement
more precise error handling logic and provide more meaningful error messages
to clients, rather than exposing raw database errors.

#### Enumeration Members

<table>
<thead>
<tr>
<th>Enumeration Member</th>
<th>Value</th>
<th>Description</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="enumeration-member-er_bad_field_error"></a> `ER_BAD_FIELD_ERROR`

</td>
<td>

`"ER_BAD_FIELD_ERROR"`

</td>
<td>

Error when referencing a field or column that doesn't exist in the database schema,
often caused by typos in column names or outdated queries after schema changes.

</td>
<td>

[libs/nest-crud/src/enums/crud.enums.ts:36](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/enums/crud.enums.ts#L36)

</td>
</tr>
<tr>
<td>

<a id="enumeration-member-er_dup_entry"></a> `ER_DUP_ENTRY`

</td>
<td>

`"ER_DUP_ENTRY"`

</td>
<td>

Error when trying to insert a duplicate entry for a field that has a unique
constraint, such as primary keys or columns with unique indexes.

</td>
<td>

[libs/nest-crud/src/enums/crud.enums.ts:24](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/enums/crud.enums.ts#L24)

</td>
</tr>
<tr>
<td>

<a id="enumeration-member-er_no_default_for_field"></a> `ER_NO_DEFAULT_FOR_FIELD`

</td>
<td>

`"ER_NO_DEFAULT_FOR_FIELD"`

</td>
<td>

Error when trying to insert a row without providing a value for a field that
has no default value defined in the database schema.

</td>
<td>

[libs/nest-crud/src/enums/crud.enums.ts:18](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/enums/crud.enums.ts#L18)

</td>
</tr>
<tr>
<td>

<a id="enumeration-member-er_no_referenced_row_2"></a> `ER_NO_REFERENCED_ROW_2`

</td>
<td>

`"ER_NO_REFERENCED_ROW_2"`

</td>
<td>

Error when a foreign key constraint fails because the referenced row doesn't exist,
typically occurring during insert or update operations with invalid foreign key values.

</td>
<td>

[libs/nest-crud/src/enums/crud.enums.ts:30](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/enums/crud.enums.ts#L30)

</td>
</tr>
</tbody>
</table>

## Functions

### Filters()

```ts
function Filters(): ParameterDecorator;
```

Defined in: [libs/nest-crud/src/decorators/filter.decorator.ts:85](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/decorators/filter.decorator.ts#L85)

Filter parameter decorator

This decorator extracts filter parameters from the request query and transforms them
into a structured filter object that can be used for filtering entities. It simplifies
implementing filter functionality in API endpoints by automatically parsing query
parameters into a usable filter structure.

The decorator:

1. Extracts all query parameters from the request
2. Removes special parameters (page, limit, sort, searchValue, searchFields) that are handled by other decorators
3. Parses the remaining parameters into a structured filter object using dot notation for nested properties
4. Returns a FilterOptions object that can be used directly in repository queries

This approach allows clients to filter entities using simple query parameters like
`?status=active&user.role=admin` which get transformed into structured filter objects.

#### Returns

`ParameterDecorator`

A parameter decorator that extracts filter parameters

#### Examples

```TypeScript
// Basic usage example
@Controller("users")
export class UserController {
    constructor(private userService: UserService) {}

    @Get()
    async getUsers(@Filters() filters?: FilterOptions<User>) {
        // If filter parameters are provided, use them to filter results
        if (filters) {
            return this.userService.findMany({ where: filters });
        }

        // Otherwise, return all users
        return this.userService.findAll();
    }
}
```

```TypeScript
// Advanced usage with multiple query parameters
@Controller("products")
export class ProductController {
    constructor(private productService: ProductService) {}

    @Get()
    async getProducts(
        @Search() search?: FilterOptions<Product>,
        @Filters() filters?: FilterOptions<Product>,
        @Sorter() sort?: SortOptions<Product>,
        @Pager() pagination?: Pagination
    ) {
        // Build query options with all parameters
        const options = {
            where: { ...filters, ...search },
            order: sort || { createdAt: 'desc' }
        };

        // Add pagination if provided
        if (pagination) {
            options.skip = pagination.skip;
            options.take = pagination.take;
        }

        return this.productService.findMany(options);
    }
}
```

#### See

- [FilterOptions](#filteroptions) The filter options structure returned by this decorator
- parseFilterObject The utility function used to parse filter parameters
- [Search](#search) Related decorator for extracting search parameters
- [Sorter](#sorter) Related decorator for extracting sort parameters
- [Pager](#pager) Related decorator for extracting pagination parameters

---

### HichchiEntity()

```ts
function HichchiEntity(tableName, unique?, skipFkValidation?): EntityDecorator;
```

Defined in: [libs/nest-crud/src/decorators/entity.decorator.ts:109](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/decorators/entity.decorator.ts#L109)

Decorator for creating a new entity with enhanced validation and metadata registration

This decorator extends TypeORM's Entity decorator with additional validation and metadata
registration capabilities. It ensures consistent naming conventions, proper relationship
definitions, and automatic metadata registration for the Hichchi framework.

The decorator performs several validations:

- Ensures entity class names end with 'Entity'
- Validates table names for entities extending HichchiUserEntity
- Enforces proper unique constraint naming conventions
- Requires

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

`tableName`

</td>
<td>

`string`

</td>
<td>

The name of the database table for this entity

</td>
</tr>
<tr>
<td>

`unique?`

</td>
<td>

`string`\[] | [`EntityOptionUnique`](#entityoptionunique) | `string`\[]\[]

</td>
<td>

Unique constraints for the entity.
When provided as an object, keys must follow the format 'UNIQUE_entityName_fieldName'.

</td>
</tr>
<tr>
<td>

`skipFkValidation?`

</td>
<td>

`boolean`

</td>
<td>

When true, skips validation of foreign key constraints.
Use with caution as it bypasses important relationship validations.

</td>
</tr>
</tbody>
</table>

#### Returns

[`EntityDecorator`](#entitydecorator)

A decorator function that configures and validates the entity class

#### Hichchi Join Column

for relationships to ensure consistent foreign key constraints

- Validates foreign key constraint naming conventions

After validation, it registers the entity with TypeORM and the Hichchi metadata system,
making it available for various framework features like automatic DTO generation.

The unique parameter accepts three formats:

1. An object with constraint names as keys (`EntityOptionUnique`)
2. An array of field names (`string[]`)
3. An array of arrays of field names (`string[][]`)

#### Examples

```typescript
// Basic usage with unique constraints as an object
@HichchiEntity("users", {
  UNIQUE_user_email: "email",
  UNIQUE_user_phone: "phone",
})
export class UserEntity extends BaseEntity {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @ManyToOne(() => AddressEntity)
  @HichchiJoinColumn()
  homeAddress: AddressEntity;
}
```

```typescript
// Using array format for unique constraints
@HichchiEntity("products", [
  ["sku"],
  ["name", "category"], // Composite unique constraint
])
export class ProductEntity extends BaseEntity {
  @Column()
  sku: string;

  @Column()
  name: string;

  @Column()
  category: string;

  @Column("decimal")
  price: number;
}
```

```typescript
// Skipping foreign key validation (use with caution)
@HichchiEntity("temporary_data", null, true)
export class TemporaryDataEntity extends BaseEntity {
  @Column()
  data: string;

  // This would normally require @HichchiJoinColumn,
  // but validation is skipped
  @ManyToOne(() => UserEntity)
  @JoinColumn()
  user: UserEntity;
}
```

#### Throws

If entity naming conventions or relationship definitions are invalid

#### See

- [BaseEntity](#baseentity) The base class that all entities should extend
- [HichchiJoinColumn](#hichchijoincolumn) The decorator required for entity relationships
- [EntityOptionUnique](#entityoptionunique) The type definition for unique constraint configuration

---

### HichchiEntityExtension()

```ts
function HichchiEntityExtension(tableName): EntityExtensionDecorator;
```

Defined in: [libs/nest-crud/src/decorators/entity-extension.decorator.ts:54](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/decorators/entity-extension.decorator.ts#L54)

Decorator for creating entity extensions with enhanced validation

This decorator is specifically designed for entity extension classes that extend
BaseEntityExtension. It provides validation and metadata registration for lightweight
entity extensions that don't require the full audit tracking capabilities of BaseEntity.

The decorator performs several validations:

- Ensures the target class extends BaseEntityExtension
- Validates that the entity has at least one

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

`tableName`

</td>
<td>

`string`

</td>
<td>

The name of the database table for this entity extension

</td>
</tr>
</tbody>
</table>

#### Returns

[`EntityExtensionDecorator`](#entityextensiondecorator)

A decorator function that configures and validates the entity extension class

#### One To One

relation

- Ensures that

#### Hichchi Join Column

is used instead of

#### Join Column

- Validates foreign key constraint naming conventions

Entity extensions are typically used for:

- Adding additional properties to an entity without modifying its core structure
- Creating specialized versions of an entity for specific use cases
- Implementing one-to-one relationships with shared primary keys

#### Example

```typescript
// Basic usage for a user profile extension
@HichchiEntityExtension("user_profiles")
export class UserProfileEntity extends BaseEntityExtension {
  @Column()
  bio: string;

  @Column()
  avatarUrl: string;

  @OneToOne(() => UserEntity)
  @HichchiJoinColumn()
  user: UserEntity;
}
```

#### Throws

If extension class doesn't extend BaseEntityExtension or has invalid relationships

#### See

- [BaseEntityExtension](#baseentityextension) The lightweight base class that entity extensions should extend
- [HichchiJoinColumn](#hichchijoincolumn) The decorator required for entity relationships
- [HichchiEntity](#hichchientity) The decorator for standard entities with full audit tracking

---

### HichchiJoinColumn()

```ts
function HichchiJoinColumn(options?): PropertyDecorator;
```

Defined in: [libs/nest-crud/src/decorators/join-column.decorator.ts:51](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/decorators/join-column.decorator.ts#L51)

Decorator for creating a join column with automatic foreign key constraint naming

This decorator extends TypeORM's JoinColumn decorator with automatic generation
of foreign key constraint names following a consistent naming convention.
It also registers metadata to mark the column as a Hichchi foreign key.

The foreign key constraint name is automatically generated following the format
`FK_entityName_propertyName` and cannot be overridden. This is important for
entity error handling, which relies on these consistent foreign key names to
detect and report errors properly.

The decorator accepts an optional JoinColumnOptions object (without the foreignKeyConstraintName
property) that can include other custom configuration for the join column.

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

`options?`

</td>
<td>

`Omit`<`JoinColumnOptions`, `"foreignKeyConstraintName"`>

</td>
<td>

Optional join column configuration options (excluding foreignKeyConstraintName)

</td>
</tr>
</tbody>
</table>

#### Returns

`PropertyDecorator`

A property decorator that configures the join column

#### Examples

```typescript
@HichchiEntity("users")
export class UserEntity extends BaseEntity {
  @ManyToOne(() => AddressEntity)
  @HichchiJoinColumn()
  homeAddress: AddressEntity;
  // Generates constraint name: FK_user_homeAddress
}
```

```typescript
@HichchiEntity("users")
export class UserEntity extends BaseEntity {
  @ManyToOne(() => AddressEntity)
  @HichchiJoinColumn({
    referencedColumnName: "id",
  })
  homeAddress: AddressEntity;
  // Still generates constraint name: FK_user_homeAddress
}
```

#### See

JoinColumn TypeORM's JoinColumn decorator that this extends

---

### HichchiRepository()

```ts
function HichchiRepository<Entity>(entity): RepositoryDecorator;
```

Defined in: [libs/nest-crud/src/decorators/repository.decorator.ts:63](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/decorators/repository.decorator.ts#L63)

Decorator for creating a repository with automatic dependency injection

This decorator simplifies the creation of TypeORM repositories by automating
dependency injection and entity association. It performs several tasks:

1. Validates that the target class extends BaseRepository
2. Makes the repository injectable in NestJS's dependency injection system
3. Associates the repository with the specified entity class
4. Automatically injects the TypeORM repository for the entity

Using this decorator eliminates the need to manually inject the TypeORM repository
in the constructor and ensures consistent repository setup across the application.

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`Entity` _extends_
| _typeof_ [`BaseEntity`](#baseentity)
| _typeof_ [`BaseEntityExtension`](#baseentityextension)

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

`entity`

</td>
<td>

`Entity`

</td>
<td>

The entity class this repository will manage

</td>
</tr>
</tbody>
</table>

#### Returns

[`RepositoryDecorator`](#repositorydecorator)

A decorator function that configures the repository class

#### Examples

```typescript
// Basic repository with default functionality
@HichchiRepository(UserEntity)
export class UserRepository extends BaseRepository<UserEntity> {
  // The decorator automatically:
  // - Makes this class injectable
  // - Injects the TypeORM repository for UserEntity
  // - Associates this repository with UserEntity

  // You can add custom methods specific to UserEntity
  async findByEmail(email: string): Promise<UserEntity | null> {
    return this.getOne({ where: { email } });
  }
}
```

```typescript
// The decorator eliminates the need for this boilerplate:
@Injectable()
export class UserRepository extends BaseRepository<UserEntity> {
  constructor(
    @InjectRepository(UserEntity) repository: Repository<UserEntity>,
  ) {
    super(repository);
  }

  // Custom methods...
}
```

#### Throws

If the target class doesn't extend BaseRepository

#### See

- [BaseRepository](#baserepository) The base repository class that provides enhanced functionality
- [BaseEntity](#baseentity) The base entity class that all entities should extend
- Injectable NestJS decorator that marks a class as injectable
- [InjectRepository](#injectrepository) TypeORM decorator that injects a repository

---

### Pager()

Implementation overload for extracting pagination from request query params.

#### Call Signature

```ts
function Pager(): ParameterDecorator;
```

Defined in: [libs/nest-crud/src/decorators/page.decorator.ts:10](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/decorators/page.decorator.ts#L10)

Extracts pagination from `req.query.page` and `req.query.limit`.

##### Returns

`ParameterDecorator`

#### Call Signature

```ts
function Pager(page, limit): ParameterDecorator;
```

Defined in: [libs/nest-crud/src/decorators/page.decorator.ts:15](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/decorators/page.decorator.ts#L15)

Extracts pagination and falls back to provided defaults when parsed values are invalid.

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

`page`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`limit`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

##### Returns

`ParameterDecorator`

#### Call Signature

```ts
function Pager(defaultOptions?): ParameterDecorator;
```

Defined in: [libs/nest-crud/src/decorators/page.decorator.ts:120](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/decorators/page.decorator.ts#L120)

Pagination parameter decorator

This decorator extracts pagination parameters (page and limit) from the request query
and transforms them into a standardized Pagination object with `take` and `skip` properties.
It simplifies handling paginated API endpoints by automatically calculating the correct
offset based on the requested page number and items per page.

When both page and limit query parameters are present, the decorator:

1. Extracts and converts them to numbers
2. Applies defaults if values are invalid (page defaults to 1, limit defaults to DEFAULT_ITEMS_PER_PAGE)
3. Calculates the skip value as (page - 1) \* take
4. Removes the page and limit parameters from the query object to prevent conflicts
5. Returns a Pagination object with take and skip properties

If either page or limit is missing from the query, the decorator returns undefined,
allowing the endpoint to handle non-paginated requests differently if needed.

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

`defaultOptions?`

</td>
<td>

`PaginationOptions`

</td>
<td>

Optional default values for pagination parameters

</td>
</tr>
</tbody>
</table>

##### Returns

`ParameterDecorator`

A parameter decorator that extracts pagination information

##### Examples

```TypeScript
// Simple usage example
@Controller("products")
export class ProductController {
    constructor(private productService: ProductService) {}

    @Get()
    async getProducts(@Pager() pagination?: Pagination) {
        // If pagination is provided, use it to fetch paginated results
        if (pagination) {
            return this.productService.findPaginated(pagination);
        }

        // Otherwise, fetch all products
        return this.productService.findAll();
    }
}
```

```TypeScript
// Advanced usage with complete pagination handling
@Controller("users")
export class UserController {
    constructor(private userService: UserService) {}

    @Get()
    async getUsers(
        @Pager() pagination?: Pagination
    ): Promise<User[] | PaginatedResponse<User>> {
        if (pagination) {
            // Handle paginated request
            const [users, total] = await this.userService.findAndCount({
                skip: pagination.skip,
                take: pagination.take
            });

            return {
                data: users,
                meta: {
                    total,
                    page: Math.floor(pagination.skip / pagination.take) + 1,
                    lastPage: Math.ceil(total / pagination.take)
                }
            };
        }

        // Handle non-paginated request
        return this.userService.findAll();
    }
}
```

```TypeScript
// Usage with default options for invalid numeric values
@Controller("articles")
export class ArticleController {
    constructor(private articleService: ArticleService) {}

    @Get()
    async getArticles(
        @Pager({ page: 1, limit: 10 }) pagination?: Pagination
    ) {
        // If both query params are present but invalid, supplied defaults are used.
        // If page or limit is missing, returns undefined.
        if (pagination) {
            return this.articleService.findPaginated(pagination);
        }

        return this.articleService.findAll();
    }
}
```

##### See

- Pagination The pagination object structure returned by this decorator
- DEFAULT_ITEMS_PER_PAGE The default number of items per page

---

### Search()

```ts
function Search(): ParameterDecorator;
```

Defined in: [libs/nest-crud/src/decorators/search.decorator.ts:85](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/decorators/search.decorator.ts#L85)

Search parameter decorator

This decorator extracts search parameters from the request query and transforms them
into a structured filter object that can be used for searching entities. It simplifies
implementing search functionality in API endpoints by automatically parsing search
values and fields.

The decorator extracts two query parameters:

1. `searchValue`: The text or value to search for
2. `searchFields`: Comma-separated list of fields to search in (e.g., "name,email,description")

When both parameters are present, the decorator:

1. Extracts the search value and fields from the request query
2. Parses the search fields string into an array of field paths
3. Creates a filter object where each field path is mapped to the search value
4. Returns a structured FilterOptions object that can be used in repository queries

If either parameter is missing, the decorator returns undefined, allowing the
endpoint to handle non-search requests appropriately.

#### Returns

`ParameterDecorator`

A parameter decorator that extracts search parameters

#### Examples

```TypeScript
// Basic usage example
@Controller("users")
export class UserController {
    constructor(private userService: UserService) {}

    @Get()
    async getUsers(@Search() search?: FilterOptions<User>) {
        // If search parameters are provided, use them to filter results
        if (search) {
            return this.userService.findMany({ where: search });
        }

        // Otherwise, return all users
        return this.userService.findAll();
    }
}
```

```TypeScript
// Advanced usage with multiple query parameters
@Controller("products")
export class ProductController {
    constructor(private productService: ProductService) {}

    @Get()
    async getProducts(
        @Search() search?: FilterOptions<Product>,
        @Filters() filters?: FilterOptions<Product>,
        @Pager() pagination?: Pagination
    ) {
        // Combine search and filter conditions
        const where = { ...filters, ...search };

        // Use combined conditions with pagination
        if (pagination) {
            return this.productService.findMany({
                where,
                skip: pagination.skip,
                take: pagination.take
            });
        }

        // Use just the combined conditions without pagination
        return this.productService.findMany({ where });
    }
}
```

#### See

- [FilterOptions](#filteroptions) The filter options structure returned by this decorator
- parseSearchString The utility function used to parse search parameters
- [Filters](#filters) Related decorator for extracting filter parameters

---

### Sorter()

```ts
function Sorter(): ParameterDecorator;
```

Defined in: [libs/nest-crud/src/decorators/sort.decorator.ts:90](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/decorators/sort.decorator.ts#L90)

Sort parameter decorator

This decorator extracts and parses the sort query parameter from the request and
transforms it into a structured SortOptions object that can be used for ordering
query results. It simplifies implementing sorting functionality in API endpoints
by automatically parsing sort expressions.

The decorator extracts the `sort` query parameter, which should be a string in the
format `field1.order1,field2.order2,...` where:

- `field` is the name of the entity property to sort by
- `order` is either 'asc' (ascending) or 'desc' (descending)

When the sort parameter is present, the decorator:

1. Extracts the sort string from the request query
2. Parses the sort string into field-order pairs
3. Creates a SortOptions object mapping each field to its sort direction
4. Returns a structured SortOptions object that can be used in repository queries

If the sort parameter is missing, the decorator returns undefined, allowing the
endpoint to handle unsorted requests appropriately.

#### Returns

`ParameterDecorator`

A parameter decorator that extracts and parses sort parameters

#### Examples

```TypeScript
// Basic usage example
@Controller("users")
export class UserController {
    constructor(private userService: UserService) {}

    @Get()
    async getUsers(@Sorter() sort?: SortOptions<User>) {
        // If sort parameters are provided, use them to order results
        if (sort) {
            return this.userService.findMany({ order: sort });
        }

        // Otherwise, use default sorting
        return this.userService.findMany({
            order: { createdAt: 'desc' }
        });
    }
}
```

```TypeScript
// Advanced usage with multiple query parameters
@Controller("products")
export class ProductController {
    constructor(private productService: ProductService) {}

    @Get()
    async getProducts(
        @Search() search?: FilterOptions<Product>,
        @Filters() filters?: FilterOptions<Product>,
        @Sorter() sort?: SortOptions<Product>,
        @Pager() pagination?: Pagination
    ) {
        // Build query options with all parameters
        const options = {
            where: { ...filters, ...search },
            order: sort || { createdAt: 'desc' }
        };

        // Add pagination if provided
        if (pagination) {
            options.skip = pagination.skip;
            options.take = pagination.take;
        }

        return this.productService.findMany(options);
    }
}
```

#### See

- [SortOptions](#sortoptions) The sort options structure returned by this decorator
- parseSortOptions The utility function used to parse sort parameters
- [Search](#search) Related decorator for extracting search parameters
- [Filters](#filters) Related decorator for extracting filter parameters
- [Pager](#pager) Related decorator for extracting pagination parameters

## Interfaces

### ConnectionOptions

Defined in: [libs/nest-crud/src/interfaces/connection-options.interface.ts:45](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/interfaces/connection-options.interface.ts#L45)

Database connection configuration options.

This interface defines the configuration parameters needed to establish a
database connection in a NestJS application. It provides type-safe access
to all required and optional database connection settings supported by the
application's database integration.

These options are typically used when configuring the database module in a
NestJS application, either through direct configuration or through environment
variables processed into this structure.

#### Remarks

The current implementation supports MySQL and MariaDB databases as defined in
the `DatabaseTypes` type. The options follow TypeORM connection configuration
patterns while providing a simplified and application-specific interface.

#### Example

```typescript
// In a module configuration
const dbOptions: ConnectionOptions = {
  type: "mysql",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "3306", 10),
  username: process.env.DB_USERNAME || "root",
  password: process.env.DB_PASSWORD || "password",
  database: process.env.DB_NAME || "myapp",
  entities: [__dirname + "/** /*.entity{.ts,.js}"],
  migrations: [__dirname + "/migrations/*{.ts,.js}"],
  synchronize: process.env.NODE_ENV !== "production",
  charset: "utf8mb4",
};

@Module({
  imports: [
    TypeOrmModule.forRoot(dbOptions),
    // other imports
  ],
})
export class AppModule {}
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

<a id="property-autoloadentities"></a> `autoLoadEntities?`

</td>
<td>

`boolean`

</td>
<td>

Whether to automatically load entity files from the TypeORM configuration.

When true, TypeORM will automatically scan and load all entity files
based on its internal configuration, which can be useful for modules
that register their own entities.

**Default**

```ts
false;
```

**Example**

```ts
autoLoadEntities: true;
```

</td>
<td>

[libs/nest-crud/src/interfaces/connection-options.interface.ts:185](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/interfaces/connection-options.interface.ts#L185)

</td>
</tr>
<tr>
<td>

<a id="property-charset"></a> `charset?`

</td>
<td>

`string`

</td>
<td>

Optional character set for the database connection.

Specifies the character encoding for the database connection.
Modern applications typically use "utf8mb4" to support the full
Unicode character set including emojis.

**Example**

```ts
charset: "utf8mb4";
```

</td>
<td>

[libs/nest-crud/src/interfaces/connection-options.interface.ts:148](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/interfaces/connection-options.interface.ts#L148)

</td>
</tr>
<tr>
<td>

<a id="property-database"></a> `database`

</td>
<td>

`string`

</td>
<td>

The name of the database to connect to on the server.

This is the specific database your application will use on
the database server. The user must have access to this database.

**Example**

```ts
database: "my_application_db";
```

</td>
<td>

[libs/nest-crud/src/interfaces/connection-options.interface.ts:114](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/interfaces/connection-options.interface.ts#L114)

</td>
</tr>
<tr>
<td>

<a id="property-entities"></a> `entities`

</td>
<td>

`string`\[]

</td>
<td>

Array of paths to entity files or directories containing entities.

These paths specify where the ORM should look for entity definitions.
They can be glob patterns to match multiple files or explicit paths.

**Example**

```ts
entities: [__dirname + "/** /*.entity{.ts,.js}"];
```

</td>
<td>

[libs/nest-crud/src/interfaces/connection-options.interface.ts:125](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/interfaces/connection-options.interface.ts#L125)

</td>
</tr>
<tr>
<td>

<a id="property-host"></a> `host`

</td>
<td>

`string`

</td>
<td>

The hostname or IP address of the database server.

This specifies where the database server is located. For local
development, this is often "localhost" or "127.0.0.1".

**Examples**

```ts
host: "database.example.com";
```

```ts
host: "localhost";
```

</td>
<td>

[libs/nest-crud/src/interfaces/connection-options.interface.ts:69](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/interfaces/connection-options.interface.ts#L69)

</td>
</tr>
<tr>
<td>

<a id="property-legacyspatialsupport"></a> `legacySpatialSupport?`

</td>
<td>

`boolean`

</td>
<td>

Whether to use legacy spatial support for MySQL/MariaDB.

When true, enables support for older spatial features in MySQL/MariaDB.
This may be necessary for compatibility with certain geographic data
operations on older database versions.

**Default**

```ts
false;
```

</td>
<td>

[libs/nest-crud/src/interfaces/connection-options.interface.ts:172](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/interfaces/connection-options.interface.ts#L172)

</td>
</tr>
<tr>
<td>

<a id="property-migrations"></a> `migrations`

</td>
<td>

`string`\[]

</td>
<td>

Array of paths to migration files or directories containing migrations.

These paths specify where the ORM should look for database migration
definitions. They can be glob patterns to match multiple files.

**Example**

```ts
migrations: [__dirname + "/migrations/*{.ts,.js}"];
```

</td>
<td>

[libs/nest-crud/src/interfaces/connection-options.interface.ts:136](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/interfaces/connection-options.interface.ts#L136)

</td>
</tr>
<tr>
<td>

<a id="property-password-1"></a> `password`

</td>
<td>

`string`

</td>
<td>

The password for authenticating with the database server.

Should be used in conjunction with the username for authentication.
In production, this should always be a secure value stored in
environment variables or secrets management.

**Example**

```ts
password: process.env.DB_PASSWORD;
```

</td>
<td>

[libs/nest-crud/src/interfaces/connection-options.interface.ts:103](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/interfaces/connection-options.interface.ts#L103)

</td>
</tr>
<tr>
<td>

<a id="property-port"></a> `port`

</td>
<td>

`number`

</td>
<td>

The port number on which the database server is listening.

Standard ports are typically 3306 for MySQL and MariaDB, but
this can be configured differently in your database setup.

**Example**

```ts
port: 3306;
```

</td>
<td>

[libs/nest-crud/src/interfaces/connection-options.interface.ts:80](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/interfaces/connection-options.interface.ts#L80)

</td>
</tr>
<tr>
<td>

<a id="property-synchronize"></a> `synchronize?`

</td>
<td>

`boolean`

</td>
<td>

Whether to synchronize database schema automatically on application start.

When true, the ORM will attempt to automatically create or update
the database schema to match entity definitions. This should typically
be disabled in production environments and managed through migrations.

**Default**

```ts
false;
```

**Example**

```ts
synchronize: false;
```

</td>
<td>

[libs/nest-crud/src/interfaces/connection-options.interface.ts:161](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/interfaces/connection-options.interface.ts#L161)

</td>
</tr>
<tr>
<td>

<a id="property-type"></a> `type`

</td>
<td>

[`DatabaseTypes`](#databasetypes)

</td>
<td>

The database type to connect to.

Currently supported values are "mysql" and "mariadb" as defined
in the DatabaseTypes type. This determines which database driver
and connection strategy will be used.

**Example**

```ts
type: "mysql";
```

</td>
<td>

[libs/nest-crud/src/interfaces/connection-options.interface.ts:56](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/interfaces/connection-options.interface.ts#L56)

</td>
</tr>
<tr>
<td>

<a id="property-username-1"></a> `username`

</td>
<td>

`string`

</td>
<td>

The username for authenticating with the database server.

This user should have appropriate permissions for the operations
your application needs to perform (create/read/update/delete).

**Example**

```ts
username: "app_user";
```

</td>
<td>

[libs/nest-crud/src/interfaces/connection-options.interface.ts:91](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/interfaces/connection-options.interface.ts#L91)

</td>
</tr>
</tbody>
</table>

---

### GetByIdsOptions

Defined in: [libs/nest-crud/src/interfaces/crud-options.interfaces.ts:355](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/interfaces/crud-options.interfaces.ts#L355)

Options interface for retrieving entities by their IDs.

This interface extends PaginatedGetOptions to provide specialized
configuration for operations that need to fetch multiple entities
by their unique identifiers. It supports pagination and includes
an array of entity IDs to retrieve.

#### Example

```typescript
// Get users with specific IDs and paginate the results
const options: GetByIdsOptions<User> = {
  ids: ["abc123", "def456", "ghi789"],
  pagination: { page: 1, limit: 10 },
  relations: ["profile"],
  sort: { createdAt: "DESC" },
};
const users = await userService.findByIds(options);
```

#### Extends

- [`PaginatedGetOptions`](#paginatedgetoptions)<`Entity`>

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

`Entity`

</td>
<td>

The entity type that the options apply to

</td>
</tr>
</tbody>
</table>

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

<a id="property-ids-2"></a> `ids`

</td>
<td>

`EntityId`\[]

</td>
<td>

Array of entity IDs to retrieve.

The operation will fetch only the entities whose IDs are included
in this array. The IDs must match the entity's primary key type.

**Examples**

```ts
ids: [1, 2, 3]; // For numeric IDs
```

```ts
ids: ["abc123", "def456"]; // For string IDs
```

</td>
<td>

‐

</td>
<td>

[libs/nest-crud/src/interfaces/crud-options.interfaces.ts:367](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/interfaces/crud-options.interfaces.ts#L367)

</td>
</tr>
<tr>
<td>

<a id="property-manager-2"></a> `manager?`

</td>
<td>

`EntityManager`

</td>
<td>

Optional EntityManager instance for transaction support.

When provided, this EntityManager will be used for database operations
instead of the repository's default connection. This enables operations
to participate in ongoing database transactions.

**Example**

```ts
// In a service method with transaction
async createUserWithProfile(data, manager: EntityManager) {
  return this.userRepository.create(data, { manager });
}
```

</td>
<td>

[`PaginatedGetOptions`](#paginatedgetoptions).[`manager`](#property-manager-11)

</td>
<td>

[libs/nest-crud/src/interfaces/crud-options.interfaces.ts:37](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/interfaces/crud-options.interfaces.ts#L37)

</td>
</tr>
<tr>
<td>

<a id="property-options"></a> `options?`

</td>
<td>

`Omit`<`FindOneOptions`<`Entity`>, `"relations"` | `"where"`>

</td>
<td>

Additional TypeORM find options excluding 'where' and 'relations'.

Allows passing additional TypeORM query options that aren't covered by
the other properties in this interface. The 'where' and 'relations' options
are excluded since they're handled by dedicated properties.

**Example**

```ts
options: {
  select: ['id', 'name', 'email'],
  skip: 10,
  take: 20
}
```

</td>
<td>

[`PaginatedGetOptions`](#paginatedgetoptions).[`options`](#property-options-9)

</td>
<td>

[libs/nest-crud/src/interfaces/crud-options.interfaces.ts:67](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/interfaces/crud-options.interfaces.ts#L67)

</td>
</tr>
<tr>
<td>

<a id="property-pagination"></a> `pagination?`

</td>
<td>

`Pagination`

</td>
<td>

Pagination parameters for limiting the number of results.

When provided, the query results will be paginated according to
these parameters. This includes the page number and number of
items per page.

**Example**

```ts
pagination: { page: 2, limit: 25 } // Get 25 items from the second page
```

</td>
<td>

[`PaginatedGetOptions`](#paginatedgetoptions).[`pagination`](#property-pagination-5)

</td>
<td>

[libs/nest-crud/src/interfaces/crud-options.interfaces.ts:330](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/interfaces/crud-options.interfaces.ts#L330)

</td>
</tr>
<tr>
<td>

<a id="property-relations"></a> `relations?`

</td>
<td>

(keyof `Entity` | `` `${keyof Entity}.${string}` ``)\[]

</td>
<td>

Array of entity relation properties to eager-load.

Specifies which related entities should be loaded along with the main entity.
This is transformed into TypeORM's relations option internally.

**Example**

```ts
// Load user with their profile and posts
relations: ["profile", "posts"];
```

</td>
<td>

[`PaginatedGetOptions`](#paginatedgetoptions).[`relations`](#property-relations-9)

</td>
<td>

[libs/nest-crud/src/interfaces/crud-options.interfaces.ts:51](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/interfaces/crud-options.interfaces.ts#L51)

</td>
</tr>
<tr>
<td>

<a id="property-sort"></a> `sort?`

</td>
<td>

`FindOptionsOrder`<`Entity`>

</td>
<td>

Sorting configuration for the query results.

Defines how the results should be ordered. This is a TypeORM
FindOptionsOrder object that specifies sort direction for properties.

**Example**

```ts
// Sort users by createdAt descending and then by name ascending
sort: {
  createdAt: 'DESC',
  name: 'ASC'
}
```

</td>
<td>

[`PaginatedGetOptions`](#paginatedgetoptions).[`sort`](#property-sort-9)

</td>
<td>

[libs/nest-crud/src/interfaces/crud-options.interfaces.ts:82](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/interfaces/crud-options.interfaces.ts#L82)

</td>
</tr>
</tbody>
</table>

---

### GetManyOptionsFilter

Defined in: [libs/nest-crud/src/interfaces/crud-options.interfaces.ts:464](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/interfaces/crud-options.interfaces.ts#L464)

Options for retrieving multiple entities with pagination and filter-based query keys.

#### Extends

- [`PaginatedGetOptions`](#paginatedgetoptions)<`Entity`>.[`GetOneOptionsFilter`](#getoneoptionsfilter)<`Entity`>

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`Entity`

</td>
</tr>
</tbody>
</table>

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

<a id="property-filters"></a> `filters?`

</td>
<td>

`QueryDeepPartial`<`Entity`>

</td>
<td>

Exact match conditions for filtering entities.

These conditions are combined with AND logic and match exactly the
specified values. Useful for filtering by known property values.

**Example**

```ts
filters: { status: 'active', type: 'user' }
```

</td>
<td>

[`GetOneOptionsFilter`](#getoneoptionsfilter).[`filters`](#property-filters-2)

</td>
<td>

[libs/nest-crud/src/interfaces/crud-options.interfaces.ts:98](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/interfaces/crud-options.interfaces.ts#L98)

</td>
</tr>
<tr>
<td>

<a id="property-manager-3"></a> `manager?`

</td>
<td>

`EntityManager`

</td>
<td>

Optional EntityManager instance for transaction support.

When provided, this EntityManager will be used for database operations
instead of the repository's default connection. This enables operations
to participate in ongoing database transactions.

**Example**

```ts
// In a service method with transaction
async createUserWithProfile(data, manager: EntityManager) {
  return this.userRepository.create(data, { manager });
}
```

</td>
<td>

[`PaginatedGetOptions`](#paginatedgetoptions).[`manager`](#property-manager-11)

</td>
<td>

[libs/nest-crud/src/interfaces/crud-options.interfaces.ts:37](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/interfaces/crud-options.interfaces.ts#L37)

</td>
</tr>
<tr>
<td>

<a id="property-options-1"></a> `options?`

</td>
<td>

`Omit`<`FindOneOptions`<`Entity`>, `"relations"` | `"where"`>

</td>
<td>

Additional TypeORM find options excluding 'where' and 'relations'.

Allows passing additional TypeORM query options that aren't covered by
the other properties in this interface. The 'where' and 'relations' options
are excluded since they're handled by dedicated properties.

**Example**

```ts
options: {
  select: ['id', 'name', 'email'],
  skip: 10,
  take: 20
}
```

</td>
<td>

[`PaginatedGetOptions`](#paginatedgetoptions).[`options`](#property-options-9)

</td>
<td>

[libs/nest-crud/src/interfaces/crud-options.interfaces.ts:67](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/interfaces/crud-options.interfaces.ts#L67)

</td>
</tr>
<tr>
<td>

<a id="property-pagination-1"></a> `pagination?`

</td>
<td>

`Pagination`

</td>
<td>

Pagination parameters for limiting the number of results.

When provided, the query results will be paginated according to
these parameters. This includes the page number and number of
items per page.

**Example**

```ts
pagination: { page: 2, limit: 25 } // Get 25 items from the second page
```

</td>
<td>

[`PaginatedGetOptions`](#paginatedgetoptions).[`pagination`](#property-pagination-5)

</td>
<td>

[libs/nest-crud/src/interfaces/crud-options.interfaces.ts:330](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/interfaces/crud-options.interfaces.ts#L330)

</td>
</tr>
<tr>
<td>

<a id="property-relations-1"></a> `relations?`

</td>
<td>

(keyof `Entity` | `` `${keyof Entity}.${string}` ``)\[]

</td>
<td>

Array of entity relation properties to eager-load.

Specifies which related entities should be loaded along with the main entity.
This is transformed into TypeORM's relations option internally.

**Example**

```ts
// Load user with their profile and posts
relations: ["profile", "posts"];
```

</td>
<td>

[`PaginatedGetOptions`](#paginatedgetoptions).[`relations`](#property-relations-9)

</td>
<td>

[libs/nest-crud/src/interfaces/crud-options.interfaces.ts:51](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/interfaces/crud-options.interfaces.ts#L51)

</td>
</tr>
<tr>
<td>

<a id="property-sort-1"></a> `sort?`

</td>
<td>

`FindOptionsOrder`<`Entity`>

</td>
<td>

Sorting configuration for the query results.

Defines how the results should be ordered. This is a TypeORM
FindOptionsOrder object that specifies sort direction for properties.

**Example**

```ts
// Sort users by createdAt descending and then by name ascending
sort: {
  createdAt: 'DESC',
  name: 'ASC'
}
```

</td>
<td>

[`PaginatedGetOptions`](#paginatedgetoptions).[`sort`](#property-sort-9)

</td>
<td>

[libs/nest-crud/src/interfaces/crud-options.interfaces.ts:82](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/interfaces/crud-options.interfaces.ts#L82)

</td>
</tr>
<tr>
<td>

<a id="property-where"></a> `where?`

</td>
<td>

`undefined`

</td>
<td>

Explicitly excluded to prevent mixing with the 'search' approach.
Use SearchOptions for search-based filtering or WhereOptions for direct where clauses.

</td>
<td>

[`GetOneOptionsFilter`](#getoneoptionsfilter).[`where`](#property-where-4)

</td>
<td>

[libs/nest-crud/src/interfaces/crud-options.interfaces.ts:104](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/interfaces/crud-options.interfaces.ts#L104)

</td>
</tr>
</tbody>
</table>

---

### GetManyOptionsNot

Defined in: [libs/nest-crud/src/interfaces/crud-options.interfaces.ts:510](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/interfaces/crud-options.interfaces.ts#L510)

Options interface for retrieving multiple entities using exclusion-based filtering with pagination.

Combines PaginatedGetOptions with GetOneOptionsNot to provide a complete
configuration for retrieving multiple entities by excluding specific criteria, with pagination support.

#### Example

```typescript
// Find active users that are not admins, paginated
const options: GetManyOptionsNot<User> = {
  filters: { isActive: true },
  not: { role: "admin" },
  relations: ["profile"],
  pagination: { page: 1, limit: 10 },
  sort: { createdAt: "DESC" },
};
const users = await userService.findMany(options);
```

#### Extends

- [`PaginatedGetOptions`](#paginatedgetoptions)<`Entity`>.[`GetOneOptionsNot`](#getoneoptionsnot)<`Entity`>

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

`Entity`

</td>
<td>

The entity type that the options apply to

</td>
</tr>
</tbody>
</table>

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

<a id="property-manager-4"></a> `manager?`

</td>
<td>

`EntityManager`

</td>
<td>

Optional EntityManager instance for transaction support.

When provided, this EntityManager will be used for database operations
instead of the repository's default connection. This enables operations
to participate in ongoing database transactions.

**Example**

```ts
// In a service method with transaction
async createUserWithProfile(data, manager: EntityManager) {
  return this.userRepository.create(data, { manager });
}
```

</td>
<td>

[`PaginatedGetOptions`](#paginatedgetoptions).[`manager`](#property-manager-11)

</td>
<td>

[libs/nest-crud/src/interfaces/crud-options.interfaces.ts:37](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/interfaces/crud-options.interfaces.ts#L37)

</td>
</tr>
<tr>
<td>

<a id="property-not"></a> `not?`

</td>
<td>

`QueryDeepPartial`<`Entity`>

</td>
<td>

Exclusion conditions for filtering out entities.

These conditions specify criteria that entities must NOT match to be included
in the results. This is required for NotOptions and implemented using NOT logic.

**Example**

```ts
not: { role: 'admin', status: 'deleted' }
```

</td>
<td>

[`GetOneOptionsNot`](#getoneoptionsnot).[`not`](#property-not-2)

</td>
<td>

[libs/nest-crud/src/interfaces/crud-options.interfaces.ts:224](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/interfaces/crud-options.interfaces.ts#L224)

</td>
</tr>
<tr>
<td>

<a id="property-options-2"></a> `options?`

</td>
<td>

`Omit`<`FindOneOptions`<`Entity`>, `"relations"` | `"where"`>

</td>
<td>

Additional TypeORM find options excluding 'where' and 'relations'.

Allows passing additional TypeORM query options that aren't covered by
the other properties in this interface. The 'where' and 'relations' options
are excluded since they're handled by dedicated properties.

**Example**

```ts
options: {
  select: ['id', 'name', 'email'],
  skip: 10,
  take: 20
}
```

</td>
<td>

[`PaginatedGetOptions`](#paginatedgetoptions).[`options`](#property-options-9)

</td>
<td>

[libs/nest-crud/src/interfaces/crud-options.interfaces.ts:67](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/interfaces/crud-options.interfaces.ts#L67)

</td>
</tr>
<tr>
<td>

<a id="property-pagination-2"></a> `pagination?`

</td>
<td>

`Pagination`

</td>
<td>

Pagination parameters for limiting the number of results.

When provided, the query results will be paginated according to
these parameters. This includes the page number and number of
items per page.

**Example**

```ts
pagination: { page: 2, limit: 25 } // Get 25 items from the second page
```

</td>
<td>

[`PaginatedGetOptions`](#paginatedgetoptions).[`pagination`](#property-pagination-5)

</td>
<td>

[libs/nest-crud/src/interfaces/crud-options.interfaces.ts:330](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/interfaces/crud-options.interfaces.ts#L330)

</td>
</tr>
<tr>
<td>

<a id="property-relations-2"></a> `relations?`

</td>
<td>

(keyof `Entity` | `` `${keyof Entity}.${string}` ``)\[]

</td>
<td>

Array of entity relation properties to eager-load.

Specifies which related entities should be loaded along with the main entity.
This is transformed into TypeORM's relations option internally.

**Example**

```ts
// Load user with their profile and posts
relations: ["profile", "posts"];
```

</td>
<td>

[`PaginatedGetOptions`](#paginatedgetoptions).[`relations`](#property-relations-9)

</td>
<td>

[libs/nest-crud/src/interfaces/crud-options.interfaces.ts:51](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/interfaces/crud-options.interfaces.ts#L51)

</td>
</tr>
<tr>
<td>

<a id="property-sort-2"></a> `sort?`

</td>
<td>

`FindOptionsOrder`<`Entity`>

</td>
<td>

Sorting configuration for the query results.

Defines how the results should be ordered. This is a TypeORM
FindOptionsOrder object that specifies sort direction for properties.

**Example**

```ts
// Sort users by createdAt descending and then by name ascending
sort: {
  createdAt: 'DESC',
  name: 'ASC'
}
```

</td>
<td>

[`PaginatedGetOptions`](#paginatedgetoptions).[`sort`](#property-sort-9)

</td>
<td>

[libs/nest-crud/src/interfaces/crud-options.interfaces.ts:82](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/interfaces/crud-options.interfaces.ts#L82)

</td>
</tr>
<tr>
<td>

<a id="property-where-1"></a> `where?`

</td>
<td>

`undefined`

</td>
<td>

Explicitly excluded to prevent mixing with the 'not' approach.
Use NotOptions for exclusion-based filtering or WhereOptions for direct where clauses.

</td>
<td>

[`GetOneOptionsNot`](#getoneoptionsnot).[`where`](#property-where-5)

</td>
<td>

[libs/nest-crud/src/interfaces/crud-options.interfaces.ts:230](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/interfaces/crud-options.interfaces.ts#L230)

</td>
</tr>
</tbody>
</table>

---

### GetManyOptionsSearch

Defined in: [libs/nest-crud/src/interfaces/crud-options.interfaces.ts:487](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/interfaces/crud-options.interfaces.ts#L487)

Options interface for retrieving multiple entities using search-based filtering with pagination.

Combines PaginatedGetOptions with GetOneOptionsSearch to provide a complete
configuration for search-based retrieval of multiple entities with pagination support.

#### Example

```typescript
// Find active admin users with names containing 'john', paginated
const options: GetManyOptionsSearch<User> = {
  filters: { isActive: true, role: "admin" },
  search: { name: Like("%john%") },
  relations: ["profile"],
  pagination: { page: 1, limit: 10 },
  sort: { createdAt: "DESC" },
};
const users = await userService.findMany(options);
```

#### Extends

- [`PaginatedGetOptions`](#paginatedgetoptions)<`Entity`>.[`GetOneOptionsSearch`](#getoneoptionssearch)<`Entity`>

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

`Entity`

</td>
<td>

The entity type that the options apply to

</td>
</tr>
</tbody>
</table>

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

<a id="property-manager-5"></a> `manager?`

</td>
<td>

`EntityManager`

</td>
<td>

Optional EntityManager instance for transaction support.

When provided, this EntityManager will be used for database operations
instead of the repository's default connection. This enables operations
to participate in ongoing database transactions.

**Example**

```ts
// In a service method with transaction
async createUserWithProfile(data, manager: EntityManager) {
  return this.userRepository.create(data, { manager });
}
```

</td>
<td>

[`PaginatedGetOptions`](#paginatedgetoptions).[`manager`](#property-manager-11)

</td>
<td>

[libs/nest-crud/src/interfaces/crud-options.interfaces.ts:37](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/interfaces/crud-options.interfaces.ts#L37)

</td>
</tr>
<tr>
<td>

<a id="property-options-3"></a> `options?`

</td>
<td>

`Omit`<`FindOneOptions`<`Entity`>, `"relations"` | `"where"`>

</td>
<td>

Additional TypeORM find options excluding 'where' and 'relations'.

Allows passing additional TypeORM query options that aren't covered by
the other properties in this interface. The 'where' and 'relations' options
are excluded since they're handled by dedicated properties.

**Example**

```ts
options: {
  select: ['id', 'name', 'email'],
  skip: 10,
  take: 20
}
```

</td>
<td>

[`PaginatedGetOptions`](#paginatedgetoptions).[`options`](#property-options-9)

</td>
<td>

[libs/nest-crud/src/interfaces/crud-options.interfaces.ts:67](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/interfaces/crud-options.interfaces.ts#L67)

</td>
</tr>
<tr>
<td>

<a id="property-pagination-3"></a> `pagination?`

</td>
<td>

`Pagination`

</td>
<td>

Pagination parameters for limiting the number of results.

When provided, the query results will be paginated according to
these parameters. This includes the page number and number of
items per page.

**Example**

```ts
pagination: { page: 2, limit: 25 } // Get 25 items from the second page
```

</td>
<td>

[`PaginatedGetOptions`](#paginatedgetoptions).[`pagination`](#property-pagination-5)

</td>
<td>

[libs/nest-crud/src/interfaces/crud-options.interfaces.ts:330](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/interfaces/crud-options.interfaces.ts#L330)

</td>
</tr>
<tr>
<td>

<a id="property-relations-3"></a> `relations?`

</td>
<td>

(keyof `Entity` | `` `${keyof Entity}.${string}` ``)\[]

</td>
<td>

Array of entity relation properties to eager-load.

Specifies which related entities should be loaded along with the main entity.
This is transformed into TypeORM's relations option internally.

**Example**

```ts
// Load user with their profile and posts
relations: ["profile", "posts"];
```

</td>
<td>

[`PaginatedGetOptions`](#paginatedgetoptions).[`relations`](#property-relations-9)

</td>
<td>

[libs/nest-crud/src/interfaces/crud-options.interfaces.ts:51](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/interfaces/crud-options.interfaces.ts#L51)

</td>
</tr>
<tr>
<td>

<a id="property-search"></a> `search?`

</td>
<td>

`QueryDeepPartial`<`Entity`>

</td>
<td>

Flexible search conditions for filtering entities.

These conditions can use TypeORM ILike operator
for more flexible matching. They're combined with AND logic alongside
any specified filters.

**Example**

```typescript
search: {
  name: "smi";
}
// will search for name containing `smi`, ex: 'smith'
```

</td>
<td>

[`GetOneOptionsSearch`](#getoneoptionssearch).[`search`](#property-search-2)

</td>
<td>

[libs/nest-crud/src/interfaces/crud-options.interfaces.ts:157](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/interfaces/crud-options.interfaces.ts#L157)

</td>
</tr>
<tr>
<td>

<a id="property-sort-3"></a> `sort?`

</td>
<td>

`FindOptionsOrder`<`Entity`>

</td>
<td>

Sorting configuration for the query results.

Defines how the results should be ordered. This is a TypeORM
FindOptionsOrder object that specifies sort direction for properties.

**Example**

```ts
// Sort users by createdAt descending and then by name ascending
sort: {
  createdAt: 'DESC',
  name: 'ASC'
}
```

</td>
<td>

[`PaginatedGetOptions`](#paginatedgetoptions).[`sort`](#property-sort-9)

</td>
<td>

[libs/nest-crud/src/interfaces/crud-options.interfaces.ts:82](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/interfaces/crud-options.interfaces.ts#L82)

</td>
</tr>
<tr>
<td>

<a id="property-where-2"></a> `where?`

</td>
<td>

`undefined`

</td>
<td>

Explicitly excluded to prevent mixing with the 'search' approach.
Use SearchOptions for search-based filtering or WhereOptions for direct where clauses.

</td>
<td>

[`GetOneOptionsSearch`](#getoneoptionssearch).[`where`](#property-where-6)

</td>
<td>

[libs/nest-crud/src/interfaces/crud-options.interfaces.ts:163](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/interfaces/crud-options.interfaces.ts#L163)

</td>
</tr>
</tbody>
</table>

---

### GetManyOptionsWhere

Defined in: [libs/nest-crud/src/interfaces/crud-options.interfaces.ts:535](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/interfaces/crud-options.interfaces.ts#L535)

Options interface for retrieving multiple entities using direct WHERE clause with pagination.

Combines PaginatedGetOptions with GetOneOptionsWhere to provide a complete
configuration for retrieving multiple entities using TypeORM's native WHERE clauses, with pagination support.

#### Example

```typescript
// Find users that are either admins or have premium status, paginated
const options: GetManyOptionsWhere<User> = {
  where: [{ role: "admin" }, { status: "premium" }],
  relations: ["profile"],
  pagination: { page: 1, limit: 10 },
  sort: { createdAt: "DESC" },
};
const users = await userService.findMany(options);
```

#### Extends

- [`PaginatedGetOptions`](#paginatedgetoptions)<`Entity`>.[`GetOneOptionsWhere`](#getoneoptionswhere)<`Entity`>

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

`Entity`

</td>
<td>

The entity type that the options apply to

</td>
</tr>
</tbody>
</table>

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

<a id="property-filters-1"></a> `filters?`

</td>
<td>

`undefined`

</td>
<td>

Explicitly excluded to prevent mixing with the 'where' approach.
Use SearchOptions for search-based filtering or WhereOptions for direct where clauses.

</td>
<td>

[`GetOneOptionsWhere`](#getoneoptionswhere).[`filters`](#property-filters-3)

</td>
<td>

[libs/nest-crud/src/interfaces/crud-options.interfaces.ts:265](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/interfaces/crud-options.interfaces.ts#L265)

</td>
</tr>
<tr>
<td>

<a id="property-manager-6"></a> `manager?`

</td>
<td>

`EntityManager`

</td>
<td>

Optional EntityManager instance for transaction support.

When provided, this EntityManager will be used for database operations
instead of the repository's default connection. This enables operations
to participate in ongoing database transactions.

**Example**

```ts
// In a service method with transaction
async createUserWithProfile(data, manager: EntityManager) {
  return this.userRepository.create(data, { manager });
}
```

</td>
<td>

[`PaginatedGetOptions`](#paginatedgetoptions).[`manager`](#property-manager-11)

</td>
<td>

[libs/nest-crud/src/interfaces/crud-options.interfaces.ts:37](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/interfaces/crud-options.interfaces.ts#L37)

</td>
</tr>
<tr>
<td>

<a id="property-not-1"></a> `not?`

</td>
<td>

`undefined`

</td>
<td>

Explicitly excluded to prevent mixing with the 'where' approach.
Use NotOptions for exclusion-based filtering or WhereOptions for direct where clauses.

</td>
<td>

[`GetOneOptionsWhere`](#getoneoptionswhere).[`not`](#property-not-3)

</td>
<td>

[libs/nest-crud/src/interfaces/crud-options.interfaces.ts:277](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/interfaces/crud-options.interfaces.ts#L277)

</td>
</tr>
<tr>
<td>

<a id="property-options-4"></a> `options?`

</td>
<td>

`Omit`<`FindOneOptions`<`Entity`>, `"relations"` | `"where"`>

</td>
<td>

Additional TypeORM find options excluding 'where' and 'relations'.

Allows passing additional TypeORM query options that aren't covered by
the other properties in this interface. The 'where' and 'relations' options
are excluded since they're handled by dedicated properties.

**Example**

```ts
options: {
  select: ['id', 'name', 'email'],
  skip: 10,
  take: 20
}
```

</td>
<td>

[`PaginatedGetOptions`](#paginatedgetoptions).[`options`](#property-options-9)

</td>
<td>

[libs/nest-crud/src/interfaces/crud-options.interfaces.ts:67](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/interfaces/crud-options.interfaces.ts#L67)

</td>
</tr>
<tr>
<td>

<a id="property-pagination-4"></a> `pagination?`

</td>
<td>

`Pagination`

</td>
<td>

Pagination parameters for limiting the number of results.

When provided, the query results will be paginated according to
these parameters. This includes the page number and number of
items per page.

**Example**

```ts
pagination: { page: 2, limit: 25 } // Get 25 items from the second page
```

</td>
<td>

[`PaginatedGetOptions`](#paginatedgetoptions).[`pagination`](#property-pagination-5)

</td>
<td>

[libs/nest-crud/src/interfaces/crud-options.interfaces.ts:330](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/interfaces/crud-options.interfaces.ts#L330)

</td>
</tr>
<tr>
<td>

<a id="property-relations-4"></a> `relations?`

</td>
<td>

(keyof `Entity` | `` `${keyof Entity}.${string}` ``)\[]

</td>
<td>

Array of entity relation properties to eager-load.

Specifies which related entities should be loaded along with the main entity.
This is transformed into TypeORM's relations option internally.

**Example**

```ts
// Load user with their profile and posts
relations: ["profile", "posts"];
```

</td>
<td>

[`PaginatedGetOptions`](#paginatedgetoptions).[`relations`](#property-relations-9)

</td>
<td>

[libs/nest-crud/src/interfaces/crud-options.interfaces.ts:51](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/interfaces/crud-options.interfaces.ts#L51)

</td>
</tr>
<tr>
<td>

<a id="property-search-1"></a> `search?`

</td>
<td>

`undefined`

</td>
<td>

Explicitly excluded to prevent mixing with the 'where' approach.
Use SearchOptions for search-based filtering or WhereOptions for direct where clauses.

</td>
<td>

[`GetOneOptionsWhere`](#getoneoptionswhere).[`search`](#property-search-3)

</td>
<td>

[libs/nest-crud/src/interfaces/crud-options.interfaces.ts:271](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/interfaces/crud-options.interfaces.ts#L271)

</td>
</tr>
<tr>
<td>

<a id="property-sort-4"></a> `sort?`

</td>
<td>

`FindOptionsOrder`<`Entity`>

</td>
<td>

Sorting configuration for the query results.

Defines how the results should be ordered. This is a TypeORM
FindOptionsOrder object that specifies sort direction for properties.

**Example**

```ts
// Sort users by createdAt descending and then by name ascending
sort: {
  createdAt: 'DESC',
  name: 'ASC'
}
```

</td>
<td>

[`PaginatedGetOptions`](#paginatedgetoptions).[`sort`](#property-sort-9)

</td>
<td>

[libs/nest-crud/src/interfaces/crud-options.interfaces.ts:82](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/interfaces/crud-options.interfaces.ts#L82)

</td>
</tr>
<tr>
<td>

<a id="property-where-3"></a> `where?`

</td>
<td>

`QueryDeepPartial`<`Entity`> | `QueryDeepPartial`<`Entity`>\[]

</td>
<td>

Direct TypeORM WHERE conditions for filtering entities.

These conditions are passed directly to TypeORM's QueryDeepPartial.
When an array is provided, the conditions are combined with OR logic,
allowing for complex queries that match any of the specified conditions.

**Examples**

```ts
// Single condition (AND logic between properties)
where: { status: 'active', role: 'user' }
```

```ts
// Multiple conditions (OR logic between objects)
where: [
  { status: "active", role: "admin" },
  { status: "premium", subscriptionValid: true },
];
```

</td>
<td>

[`GetOneOptionsWhere`](#getoneoptionswhere).[`where`](#property-where-7)

</td>
<td>

[libs/nest-crud/src/interfaces/crud-options.interfaces.ts:297](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/interfaces/crud-options.interfaces.ts#L297)

</td>
</tr>
</tbody>
</table>

---

### GetOneOptionsFilter

Defined in: [libs/nest-crud/src/interfaces/crud-options.interfaces.ts:394](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/interfaces/crud-options.interfaces.ts#L394)

Options for retrieving a single entity using filter-based query keys.

#### Extends

- [`QueryOptions`](#queryoptions)<`Entity`>.[`QueryOptionsFilter`](#queryoptionsfilter)<`Entity`>

#### Extended by

- [`GetManyOptionsFilter`](#getmanyoptionsfilter)

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`Entity`

</td>
</tr>
</tbody>
</table>

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

<a id="property-filters-2"></a> `filters?`

</td>
<td>

`QueryDeepPartial`<`Entity`>

</td>
<td>

Exact match conditions for filtering entities.

These conditions are combined with AND logic and match exactly the
specified values. Useful for filtering by known property values.

**Example**

```ts
filters: { status: 'active', type: 'user' }
```

</td>
<td>

[`QueryOptionsFilter`](#queryoptionsfilter).[`filters`](#property-filters-4)

</td>
<td>

[libs/nest-crud/src/interfaces/crud-options.interfaces.ts:98](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/interfaces/crud-options.interfaces.ts#L98)

</td>
</tr>
<tr>
<td>

<a id="property-manager-7"></a> `manager?`

</td>
<td>

`EntityManager`

</td>
<td>

Optional EntityManager instance for transaction support.

When provided, this EntityManager will be used for database operations
instead of the repository's default connection. This enables operations
to participate in ongoing database transactions.

**Example**

```ts
// In a service method with transaction
async createUserWithProfile(data, manager: EntityManager) {
  return this.userRepository.create(data, { manager });
}
```

</td>
<td>

[`QueryOptions`](#queryoptions).[`manager`](#property-manager-12)

</td>
<td>

[libs/nest-crud/src/interfaces/crud-options.interfaces.ts:37](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/interfaces/crud-options.interfaces.ts#L37)

</td>
</tr>
<tr>
<td>

<a id="property-options-5"></a> `options?`

</td>
<td>

`Omit`<`FindOneOptions`<`Entity`>, `"relations"` | `"where"`>

</td>
<td>

Additional TypeORM find options excluding 'where' and 'relations'.

Allows passing additional TypeORM query options that aren't covered by
the other properties in this interface. The 'where' and 'relations' options
are excluded since they're handled by dedicated properties.

**Example**

```ts
options: {
  select: ['id', 'name', 'email'],
  skip: 10,
  take: 20
}
```

</td>
<td>

[`QueryOptions`](#queryoptions).[`options`](#property-options-10)

</td>
<td>

[libs/nest-crud/src/interfaces/crud-options.interfaces.ts:67](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/interfaces/crud-options.interfaces.ts#L67)

</td>
</tr>
<tr>
<td>

<a id="property-relations-5"></a> `relations?`

</td>
<td>

(keyof `Entity` | `` `${keyof Entity}.${string}` ``)\[]

</td>
<td>

Array of entity relation properties to eager-load.

Specifies which related entities should be loaded along with the main entity.
This is transformed into TypeORM's relations option internally.

**Example**

```ts
// Load user with their profile and posts
relations: ["profile", "posts"];
```

</td>
<td>

[`QueryOptions`](#queryoptions).[`relations`](#property-relations-10)

</td>
<td>

[libs/nest-crud/src/interfaces/crud-options.interfaces.ts:51](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/interfaces/crud-options.interfaces.ts#L51)

</td>
</tr>
<tr>
<td>

<a id="property-sort-5"></a> `sort?`

</td>
<td>

`FindOptionsOrder`<`Entity`>

</td>
<td>

Sorting configuration for the query results.

Defines how the results should be ordered. This is a TypeORM
FindOptionsOrder object that specifies sort direction for properties.

**Example**

```ts
// Sort users by createdAt descending and then by name ascending
sort: {
  createdAt: 'DESC',
  name: 'ASC'
}
```

</td>
<td>

[`QueryOptions`](#queryoptions).[`sort`](#property-sort-10)

</td>
<td>

[libs/nest-crud/src/interfaces/crud-options.interfaces.ts:82](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/interfaces/crud-options.interfaces.ts#L82)

</td>
</tr>
<tr>
<td>

<a id="property-where-4"></a> `where?`

</td>
<td>

`undefined`

</td>
<td>

Explicitly excluded to prevent mixing with the 'search' approach.
Use SearchOptions for search-based filtering or WhereOptions for direct where clauses.

</td>
<td>

[`QueryOptionsFilter`](#queryoptionsfilter).[`where`](#property-where-8)

</td>
<td>

[libs/nest-crud/src/interfaces/crud-options.interfaces.ts:104](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/interfaces/crud-options.interfaces.ts#L104)

</td>
</tr>
</tbody>
</table>

---

### GetOneOptionsNot

Defined in: [libs/nest-crud/src/interfaces/crud-options.interfaces.ts:436](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/interfaces/crud-options.interfaces.ts#L436)

Options interface for retrieving a single entity using exclusion-based filtering.

Combines the base Options interface with NotOptions to provide a complete
configuration for retrieving a single entity by excluding specific criteria.

#### Example

```typescript
// Find a single active user that is not an admin
const options: GetOneOptionsNot<User> = {
  filters: { isActive: true },
  not: { role: "admin" },
  relations: ["profile"],
};
const user = await userService.findOne(options);
```

#### Extends

- [`QueryOptions`](#queryoptions)<`Entity`>.[`QueryOptionsNot`](#queryoptionsnot)<`Entity`>

#### Extended by

- [`GetManyOptionsNot`](#getmanyoptionsnot)

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

`Entity`

</td>
<td>

The entity type that the options apply to

</td>
</tr>
</tbody>
</table>

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

<a id="property-manager-8"></a> `manager?`

</td>
<td>

`EntityManager`

</td>
<td>

Optional EntityManager instance for transaction support.

When provided, this EntityManager will be used for database operations
instead of the repository's default connection. This enables operations
to participate in ongoing database transactions.

**Example**

```ts
// In a service method with transaction
async createUserWithProfile(data, manager: EntityManager) {
  return this.userRepository.create(data, { manager });
}
```

</td>
<td>

[`QueryOptions`](#queryoptions).[`manager`](#property-manager-12)

</td>
<td>

[libs/nest-crud/src/interfaces/crud-options.interfaces.ts:37](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/interfaces/crud-options.interfaces.ts#L37)

</td>
</tr>
<tr>
<td>

<a id="property-not-2"></a> `not?`

</td>
<td>

`QueryDeepPartial`<`Entity`>

</td>
<td>

Exclusion conditions for filtering out entities.

These conditions specify criteria that entities must NOT match to be included
in the results. This is required for NotOptions and implemented using NOT logic.

**Example**

```ts
not: { role: 'admin', status: 'deleted' }
```

</td>
<td>

[`QueryOptionsNot`](#queryoptionsnot).[`not`](#property-not-4)

</td>
<td>

[libs/nest-crud/src/interfaces/crud-options.interfaces.ts:224](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/interfaces/crud-options.interfaces.ts#L224)

</td>
</tr>
<tr>
<td>

<a id="property-options-6"></a> `options?`

</td>
<td>

`Omit`<`FindOneOptions`<`Entity`>, `"relations"` | `"where"`>

</td>
<td>

Additional TypeORM find options excluding 'where' and 'relations'.

Allows passing additional TypeORM query options that aren't covered by
the other properties in this interface. The 'where' and 'relations' options
are excluded since they're handled by dedicated properties.

**Example**

```ts
options: {
  select: ['id', 'name', 'email'],
  skip: 10,
  take: 20
}
```

</td>
<td>

[`QueryOptions`](#queryoptions).[`options`](#property-options-10)

</td>
<td>

[libs/nest-crud/src/interfaces/crud-options.interfaces.ts:67](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/interfaces/crud-options.interfaces.ts#L67)

</td>
</tr>
<tr>
<td>

<a id="property-relations-6"></a> `relations?`

</td>
<td>

(keyof `Entity` | `` `${keyof Entity}.${string}` ``)\[]

</td>
<td>

Array of entity relation properties to eager-load.

Specifies which related entities should be loaded along with the main entity.
This is transformed into TypeORM's relations option internally.

**Example**

```ts
// Load user with their profile and posts
relations: ["profile", "posts"];
```

</td>
<td>

[`QueryOptions`](#queryoptions).[`relations`](#property-relations-10)

</td>
<td>

[libs/nest-crud/src/interfaces/crud-options.interfaces.ts:51](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/interfaces/crud-options.interfaces.ts#L51)

</td>
</tr>
<tr>
<td>

<a id="property-sort-6"></a> `sort?`

</td>
<td>

`FindOptionsOrder`<`Entity`>

</td>
<td>

Sorting configuration for the query results.

Defines how the results should be ordered. This is a TypeORM
FindOptionsOrder object that specifies sort direction for properties.

**Example**

```ts
// Sort users by createdAt descending and then by name ascending
sort: {
  createdAt: 'DESC',
  name: 'ASC'
}
```

</td>
<td>

[`QueryOptions`](#queryoptions).[`sort`](#property-sort-10)

</td>
<td>

[libs/nest-crud/src/interfaces/crud-options.interfaces.ts:82](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/interfaces/crud-options.interfaces.ts#L82)

</td>
</tr>
<tr>
<td>

<a id="property-where-5"></a> `where?`

</td>
<td>

`undefined`

</td>
<td>

Explicitly excluded to prevent mixing with the 'not' approach.
Use NotOptions for exclusion-based filtering or WhereOptions for direct where clauses.

</td>
<td>

[`QueryOptionsNot`](#queryoptionsnot).[`where`](#property-where-9)

</td>
<td>

[libs/nest-crud/src/interfaces/crud-options.interfaces.ts:230](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/interfaces/crud-options.interfaces.ts#L230)

</td>
</tr>
</tbody>
</table>

---

### GetOneOptionsSearch

Defined in: [libs/nest-crud/src/interfaces/crud-options.interfaces.ts:415](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/interfaces/crud-options.interfaces.ts#L415)

Options interface for retrieving a single entity using search-based filtering.

Combines the base Options interface with SearchOptions to provide a complete
configuration for search-based retrieval of a single entity.

#### Example

```typescript
// Find a single active admin user by name
const options: GetOneOptionsSearch<User> = {
  filters: { isActive: true, role: "admin" },
  search: { name: Like("%john%") },
  relations: ["profile"],
};
const user = await userService.findOne(options);
```

#### Extends

- [`QueryOptions`](#queryoptions)<`Entity`>.[`QueryOptionsSearch`](#queryoptionssearch)<`Entity`>

#### Extended by

- [`GetManyOptionsSearch`](#getmanyoptionssearch)

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

`Entity`

</td>
<td>

The entity type that the options apply to

</td>
</tr>
</tbody>
</table>

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

<a id="property-manager-9"></a> `manager?`

</td>
<td>

`EntityManager`

</td>
<td>

Optional EntityManager instance for transaction support.

When provided, this EntityManager will be used for database operations
instead of the repository's default connection. This enables operations
to participate in ongoing database transactions.

**Example**

```ts
// In a service method with transaction
async createUserWithProfile(data, manager: EntityManager) {
  return this.userRepository.create(data, { manager });
}
```

</td>
<td>

[`QueryOptions`](#queryoptions).[`manager`](#property-manager-12)

</td>
<td>

[libs/nest-crud/src/interfaces/crud-options.interfaces.ts:37](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/interfaces/crud-options.interfaces.ts#L37)

</td>
</tr>
<tr>
<td>

<a id="property-options-7"></a> `options?`

</td>
<td>

`Omit`<`FindOneOptions`<`Entity`>, `"relations"` | `"where"`>

</td>
<td>

Additional TypeORM find options excluding 'where' and 'relations'.

Allows passing additional TypeORM query options that aren't covered by
the other properties in this interface. The 'where' and 'relations' options
are excluded since they're handled by dedicated properties.

**Example**

```ts
options: {
  select: ['id', 'name', 'email'],
  skip: 10,
  take: 20
}
```

</td>
<td>

[`QueryOptions`](#queryoptions).[`options`](#property-options-10)

</td>
<td>

[libs/nest-crud/src/interfaces/crud-options.interfaces.ts:67](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/interfaces/crud-options.interfaces.ts#L67)

</td>
</tr>
<tr>
<td>

<a id="property-relations-7"></a> `relations?`

</td>
<td>

(keyof `Entity` | `` `${keyof Entity}.${string}` ``)\[]

</td>
<td>

Array of entity relation properties to eager-load.

Specifies which related entities should be loaded along with the main entity.
This is transformed into TypeORM's relations option internally.

**Example**

```ts
// Load user with their profile and posts
relations: ["profile", "posts"];
```

</td>
<td>

[`QueryOptions`](#queryoptions).[`relations`](#property-relations-10)

</td>
<td>

[libs/nest-crud/src/interfaces/crud-options.interfaces.ts:51](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/interfaces/crud-options.interfaces.ts#L51)

</td>
</tr>
<tr>
<td>

<a id="property-search-2"></a> `search?`

</td>
<td>

`QueryDeepPartial`<`Entity`>

</td>
<td>

Flexible search conditions for filtering entities.

These conditions can use TypeORM ILike operator
for more flexible matching. They're combined with AND logic alongside
any specified filters.

**Example**

```typescript
search: {
  name: "smi";
}
// will search for name containing `smi`, ex: 'smith'
```

</td>
<td>

[`QueryOptionsSearch`](#queryoptionssearch).[`search`](#property-search-4)

</td>
<td>

[libs/nest-crud/src/interfaces/crud-options.interfaces.ts:157](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/interfaces/crud-options.interfaces.ts#L157)

</td>
</tr>
<tr>
<td>

<a id="property-sort-7"></a> `sort?`

</td>
<td>

`FindOptionsOrder`<`Entity`>

</td>
<td>

Sorting configuration for the query results.

Defines how the results should be ordered. This is a TypeORM
FindOptionsOrder object that specifies sort direction for properties.

**Example**

```ts
// Sort users by createdAt descending and then by name ascending
sort: {
  createdAt: 'DESC',
  name: 'ASC'
}
```

</td>
<td>

[`QueryOptions`](#queryoptions).[`sort`](#property-sort-10)

</td>
<td>

[libs/nest-crud/src/interfaces/crud-options.interfaces.ts:82](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/interfaces/crud-options.interfaces.ts#L82)

</td>
</tr>
<tr>
<td>

<a id="property-where-6"></a> `where?`

</td>
<td>

`undefined`

</td>
<td>

Explicitly excluded to prevent mixing with the 'search' approach.
Use SearchOptions for search-based filtering or WhereOptions for direct where clauses.

</td>
<td>

[`QueryOptionsSearch`](#queryoptionssearch).[`where`](#property-where-10)

</td>
<td>

[libs/nest-crud/src/interfaces/crud-options.interfaces.ts:163](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/interfaces/crud-options.interfaces.ts#L163)

</td>
</tr>
</tbody>
</table>

---

### GetOneOptionsWhere

Defined in: [libs/nest-crud/src/interfaces/crud-options.interfaces.ts:459](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/interfaces/crud-options.interfaces.ts#L459)

Options interface for retrieving a single entity using direct WHERE clause.

Combines the base Options interface with WhereOptions to provide a complete
configuration for retrieving a single entity using TypeORM's native WHERE clauses.

#### Example

```typescript
// Find a single user that is either an admin or has premium status
const options: GetOneOptionsWhere<User> = {
  where: [{ role: "admin" }, { status: "premium" }],
  relations: ["profile"],
};
const user = await userService.findOne(options);
```

#### Extends

- [`QueryOptions`](#queryoptions)<`Entity`>.[`QueryOptionsWhere`](#queryoptionswhere)<`Entity`>

#### Extended by

- [`GetManyOptionsWhere`](#getmanyoptionswhere)

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

`Entity`

</td>
<td>

The entity type that the options apply to

</td>
</tr>
</tbody>
</table>

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

<a id="property-filters-3"></a> `filters?`

</td>
<td>

`undefined`

</td>
<td>

Explicitly excluded to prevent mixing with the 'where' approach.
Use SearchOptions for search-based filtering or WhereOptions for direct where clauses.

</td>
<td>

[`QueryOptionsWhere`](#queryoptionswhere).[`filters`](#property-filters-5)

</td>
<td>

[libs/nest-crud/src/interfaces/crud-options.interfaces.ts:265](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/interfaces/crud-options.interfaces.ts#L265)

</td>
</tr>
<tr>
<td>

<a id="property-manager-10"></a> `manager?`

</td>
<td>

`EntityManager`

</td>
<td>

Optional EntityManager instance for transaction support.

When provided, this EntityManager will be used for database operations
instead of the repository's default connection. This enables operations
to participate in ongoing database transactions.

**Example**

```ts
// In a service method with transaction
async createUserWithProfile(data, manager: EntityManager) {
  return this.userRepository.create(data, { manager });
}
```

</td>
<td>

[`QueryOptions`](#queryoptions).[`manager`](#property-manager-12)

</td>
<td>

[libs/nest-crud/src/interfaces/crud-options.interfaces.ts:37](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/interfaces/crud-options.interfaces.ts#L37)

</td>
</tr>
<tr>
<td>

<a id="property-not-3"></a> `not?`

</td>
<td>

`undefined`

</td>
<td>

Explicitly excluded to prevent mixing with the 'where' approach.
Use NotOptions for exclusion-based filtering or WhereOptions for direct where clauses.

</td>
<td>

[`QueryOptionsWhere`](#queryoptionswhere).[`not`](#property-not-5)

</td>
<td>

[libs/nest-crud/src/interfaces/crud-options.interfaces.ts:277](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/interfaces/crud-options.interfaces.ts#L277)

</td>
</tr>
<tr>
<td>

<a id="property-options-8"></a> `options?`

</td>
<td>

`Omit`<`FindOneOptions`<`Entity`>, `"relations"` | `"where"`>

</td>
<td>

Additional TypeORM find options excluding 'where' and 'relations'.

Allows passing additional TypeORM query options that aren't covered by
the other properties in this interface. The 'where' and 'relations' options
are excluded since they're handled by dedicated properties.

**Example**

```ts
options: {
  select: ['id', 'name', 'email'],
  skip: 10,
  take: 20
}
```

</td>
<td>

[`QueryOptions`](#queryoptions).[`options`](#property-options-10)

</td>
<td>

[libs/nest-crud/src/interfaces/crud-options.interfaces.ts:67](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/interfaces/crud-options.interfaces.ts#L67)

</td>
</tr>
<tr>
<td>

<a id="property-relations-8"></a> `relations?`

</td>
<td>

(keyof `Entity` | `` `${keyof Entity}.${string}` ``)\[]

</td>
<td>

Array of entity relation properties to eager-load.

Specifies which related entities should be loaded along with the main entity.
This is transformed into TypeORM's relations option internally.

**Example**

```ts
// Load user with their profile and posts
relations: ["profile", "posts"];
```

</td>
<td>

[`QueryOptions`](#queryoptions).[`relations`](#property-relations-10)

</td>
<td>

[libs/nest-crud/src/interfaces/crud-options.interfaces.ts:51](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/interfaces/crud-options.interfaces.ts#L51)

</td>
</tr>
<tr>
<td>

<a id="property-search-3"></a> `search?`

</td>
<td>

`undefined`

</td>
<td>

Explicitly excluded to prevent mixing with the 'where' approach.
Use SearchOptions for search-based filtering or WhereOptions for direct where clauses.

</td>
<td>

[`QueryOptionsWhere`](#queryoptionswhere).[`search`](#property-search-5)

</td>
<td>

[libs/nest-crud/src/interfaces/crud-options.interfaces.ts:271](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/interfaces/crud-options.interfaces.ts#L271)

</td>
</tr>
<tr>
<td>

<a id="property-sort-8"></a> `sort?`

</td>
<td>

`FindOptionsOrder`<`Entity`>

</td>
<td>

Sorting configuration for the query results.

Defines how the results should be ordered. This is a TypeORM
FindOptionsOrder object that specifies sort direction for properties.

**Example**

```ts
// Sort users by createdAt descending and then by name ascending
sort: {
  createdAt: 'DESC',
  name: 'ASC'
}
```

</td>
<td>

[`QueryOptions`](#queryoptions).[`sort`](#property-sort-10)

</td>
<td>

[libs/nest-crud/src/interfaces/crud-options.interfaces.ts:82](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/interfaces/crud-options.interfaces.ts#L82)

</td>
</tr>
<tr>
<td>

<a id="property-where-7"></a> `where?`

</td>
<td>

`QueryDeepPartial`<`Entity`> | `QueryDeepPartial`<`Entity`>\[]

</td>
<td>

Direct TypeORM WHERE conditions for filtering entities.

These conditions are passed directly to TypeORM's QueryDeepPartial.
When an array is provided, the conditions are combined with OR logic,
allowing for complex queries that match any of the specified conditions.

**Examples**

```ts
// Single condition (AND logic between properties)
where: { status: 'active', role: 'user' }
```

```ts
// Multiple conditions (OR logic between objects)
where: [
  { status: "active", role: "admin" },
  { status: "premium", subscriptionValid: true },
];
```

</td>
<td>

[`QueryOptionsWhere`](#queryoptionswhere).[`where`](#property-where-11)

</td>
<td>

[libs/nest-crud/src/interfaces/crud-options.interfaces.ts:297](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/interfaces/crud-options.interfaces.ts#L297)

</td>
</tr>
</tbody>
</table>

---

### PaginatedGetOptions

Defined in: [libs/nest-crud/src/interfaces/crud-options.interfaces.ts:319](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/interfaces/crud-options.interfaces.ts#L319)

Options interface for paginated CRUD operations.

This interface extends the base Options interface to provide pagination
capabilities for operations that return multiple entities. It allows
specifying pagination parameters like page number and page size.

#### Example

```typescript
// Get the first page of users with 10 users per page
const options: PaginatedGetOptions<User> = {
  pagination: { page: 1, limit: 10 },
  sort: { createdAt: "DESC" },
};
const users = await userService.findAll(options);
```

#### Extends

- [`QueryOptions`](#queryoptions)<`Entity`>

#### Extended by

- [`GetByIdsOptions`](#getbyidsoptions)
- [`GetManyOptionsFilter`](#getmanyoptionsfilter)
- [`GetManyOptionsSearch`](#getmanyoptionssearch)
- [`GetManyOptionsNot`](#getmanyoptionsnot)
- [`GetManyOptionsWhere`](#getmanyoptionswhere)

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

`Entity`

</td>
<td>

The entity type that the options apply to

</td>
</tr>
</tbody>
</table>

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

<a id="property-manager-11"></a> `manager?`

</td>
<td>

`EntityManager`

</td>
<td>

Optional EntityManager instance for transaction support.

When provided, this EntityManager will be used for database operations
instead of the repository's default connection. This enables operations
to participate in ongoing database transactions.

**Example**

```ts
// In a service method with transaction
async createUserWithProfile(data, manager: EntityManager) {
  return this.userRepository.create(data, { manager });
}
```

</td>
<td>

[`QueryOptions`](#queryoptions).[`manager`](#property-manager-12)

</td>
<td>

[libs/nest-crud/src/interfaces/crud-options.interfaces.ts:37](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/interfaces/crud-options.interfaces.ts#L37)

</td>
</tr>
<tr>
<td>

<a id="property-options-9"></a> `options?`

</td>
<td>

`Omit`<`FindOneOptions`<`Entity`>, `"relations"` | `"where"`>

</td>
<td>

Additional TypeORM find options excluding 'where' and 'relations'.

Allows passing additional TypeORM query options that aren't covered by
the other properties in this interface. The 'where' and 'relations' options
are excluded since they're handled by dedicated properties.

**Example**

```ts
options: {
  select: ['id', 'name', 'email'],
  skip: 10,
  take: 20
}
```

</td>
<td>

[`QueryOptions`](#queryoptions).[`options`](#property-options-10)

</td>
<td>

[libs/nest-crud/src/interfaces/crud-options.interfaces.ts:67](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/interfaces/crud-options.interfaces.ts#L67)

</td>
</tr>
<tr>
<td>

<a id="property-pagination-5"></a> `pagination?`

</td>
<td>

`Pagination`

</td>
<td>

Pagination parameters for limiting the number of results.

When provided, the query results will be paginated according to
these parameters. This includes the page number and number of
items per page.

**Example**

```ts
pagination: { page: 2, limit: 25 } // Get 25 items from the second page
```

</td>
<td>

‐

</td>
<td>

[libs/nest-crud/src/interfaces/crud-options.interfaces.ts:330](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/interfaces/crud-options.interfaces.ts#L330)

</td>
</tr>
<tr>
<td>

<a id="property-relations-9"></a> `relations?`

</td>
<td>

(keyof `Entity` | `` `${keyof Entity}.${string}` ``)\[]

</td>
<td>

Array of entity relation properties to eager-load.

Specifies which related entities should be loaded along with the main entity.
This is transformed into TypeORM's relations option internally.

**Example**

```ts
// Load user with their profile and posts
relations: ["profile", "posts"];
```

</td>
<td>

[`QueryOptions`](#queryoptions).[`relations`](#property-relations-10)

</td>
<td>

[libs/nest-crud/src/interfaces/crud-options.interfaces.ts:51](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/interfaces/crud-options.interfaces.ts#L51)

</td>
</tr>
<tr>
<td>

<a id="property-sort-9"></a> `sort?`

</td>
<td>

`FindOptionsOrder`<`Entity`>

</td>
<td>

Sorting configuration for the query results.

Defines how the results should be ordered. This is a TypeORM
FindOptionsOrder object that specifies sort direction for properties.

**Example**

```ts
// Sort users by createdAt descending and then by name ascending
sort: {
  createdAt: 'DESC',
  name: 'ASC'
}
```

</td>
<td>

[`QueryOptions`](#queryoptions).[`sort`](#property-sort-10)

</td>
<td>

[libs/nest-crud/src/interfaces/crud-options.interfaces.ts:82](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/interfaces/crud-options.interfaces.ts#L82)

</td>
</tr>
</tbody>
</table>

---

### QueryOptions

Defined in: [libs/nest-crud/src/interfaces/crud-options.interfaces.ts:23](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/interfaces/crud-options.interfaces.ts#L23)

Base options interface for CRUD operations.

This interface defines the common configuration options that apply to various
CRUD operations within the application. It serves as the foundation for more
specialized options interfaces that handle specific operation types.

#### Example

```typescript
// Basic usage in a service method
async findUsers(options: Options<User>) {
  const { manager, relations, sort } = options;
  // Implement query logic using these options
}
```

#### Extended by

- [`QueryOptionsFilter`](#queryoptionsfilter)
- [`QueryOptionsSearch`](#queryoptionssearch)
- [`QueryOptionsNot`](#queryoptionsnot)
- [`QueryOptionsWhere`](#queryoptionswhere)
- [`PaginatedGetOptions`](#paginatedgetoptions)
- [`GetOneOptionsFilter`](#getoneoptionsfilter)
- [`GetOneOptionsSearch`](#getoneoptionssearch)
- [`GetOneOptionsNot`](#getoneoptionsnot)
- [`GetOneOptionsWhere`](#getoneoptionswhere)

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

`Entity`

</td>
<td>

The entity type that the options apply to

</td>
</tr>
</tbody>
</table>

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

<a id="property-manager-12"></a> `manager?`

</td>
<td>

`EntityManager`

</td>
<td>

Optional EntityManager instance for transaction support.

When provided, this EntityManager will be used for database operations
instead of the repository's default connection. This enables operations
to participate in ongoing database transactions.

**Example**

```ts
// In a service method with transaction
async createUserWithProfile(data, manager: EntityManager) {
  return this.userRepository.create(data, { manager });
}
```

</td>
<td>

[libs/nest-crud/src/interfaces/crud-options.interfaces.ts:37](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/interfaces/crud-options.interfaces.ts#L37)

</td>
</tr>
<tr>
<td>

<a id="property-options-10"></a> `options?`

</td>
<td>

`Omit`<`FindOneOptions`<`Entity`>, `"relations"` | `"where"`>

</td>
<td>

Additional TypeORM find options excluding 'where' and 'relations'.

Allows passing additional TypeORM query options that aren't covered by
the other properties in this interface. The 'where' and 'relations' options
are excluded since they're handled by dedicated properties.

**Example**

```ts
options: {
  select: ['id', 'name', 'email'],
  skip: 10,
  take: 20
}
```

</td>
<td>

[libs/nest-crud/src/interfaces/crud-options.interfaces.ts:67](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/interfaces/crud-options.interfaces.ts#L67)

</td>
</tr>
<tr>
<td>

<a id="property-relations-10"></a> `relations?`

</td>
<td>

(keyof `Entity` | `` `${keyof Entity}.${string}` ``)\[]

</td>
<td>

Array of entity relation properties to eager-load.

Specifies which related entities should be loaded along with the main entity.
This is transformed into TypeORM's relations option internally.

**Example**

```ts
// Load user with their profile and posts
relations: ["profile", "posts"];
```

</td>
<td>

[libs/nest-crud/src/interfaces/crud-options.interfaces.ts:51](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/interfaces/crud-options.interfaces.ts#L51)

</td>
</tr>
<tr>
<td>

<a id="property-sort-10"></a> `sort?`

</td>
<td>

`FindOptionsOrder`<`Entity`>

</td>
<td>

Sorting configuration for the query results.

Defines how the results should be ordered. This is a TypeORM
FindOptionsOrder object that specifies sort direction for properties.

**Example**

```ts
// Sort users by createdAt descending and then by name ascending
sort: {
  createdAt: 'DESC',
  name: 'ASC'
}
```

</td>
<td>

[libs/nest-crud/src/interfaces/crud-options.interfaces.ts:82](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/interfaces/crud-options.interfaces.ts#L82)

</td>
</tr>
</tbody>
</table>

---

### QueryOptionsFilter

Defined in: [libs/nest-crud/src/interfaces/crud-options.interfaces.ts:88](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/interfaces/crud-options.interfaces.ts#L88)

Query options using the `where`-like filter object.

#### Extends

- [`QueryOptions`](#queryoptions)<`Entity`>

#### Extended by

- [`GetOneOptionsFilter`](#getoneoptionsfilter)

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`Entity`

</td>
</tr>
</tbody>
</table>

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

<a id="property-filters-4"></a> `filters?`

</td>
<td>

`QueryDeepPartial`<`Entity`>

</td>
<td>

Exact match conditions for filtering entities.

These conditions are combined with AND logic and match exactly the
specified values. Useful for filtering by known property values.

**Example**

```ts
filters: { status: 'active', type: 'user' }
```

</td>
<td>

‐

</td>
<td>

[libs/nest-crud/src/interfaces/crud-options.interfaces.ts:98](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/interfaces/crud-options.interfaces.ts#L98)

</td>
</tr>
<tr>
<td>

<a id="property-manager-13"></a> `manager?`

</td>
<td>

`EntityManager`

</td>
<td>

Optional EntityManager instance for transaction support.

When provided, this EntityManager will be used for database operations
instead of the repository's default connection. This enables operations
to participate in ongoing database transactions.

**Example**

```ts
// In a service method with transaction
async createUserWithProfile(data, manager: EntityManager) {
  return this.userRepository.create(data, { manager });
}
```

</td>
<td>

[`QueryOptions`](#queryoptions).[`manager`](#property-manager-12)

</td>
<td>

[libs/nest-crud/src/interfaces/crud-options.interfaces.ts:37](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/interfaces/crud-options.interfaces.ts#L37)

</td>
</tr>
<tr>
<td>

<a id="property-options-11"></a> `options?`

</td>
<td>

`Omit`<`FindOneOptions`<`Entity`>, `"relations"` | `"where"`>

</td>
<td>

Additional TypeORM find options excluding 'where' and 'relations'.

Allows passing additional TypeORM query options that aren't covered by
the other properties in this interface. The 'where' and 'relations' options
are excluded since they're handled by dedicated properties.

**Example**

```ts
options: {
  select: ['id', 'name', 'email'],
  skip: 10,
  take: 20
}
```

</td>
<td>

[`QueryOptions`](#queryoptions).[`options`](#property-options-10)

</td>
<td>

[libs/nest-crud/src/interfaces/crud-options.interfaces.ts:67](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/interfaces/crud-options.interfaces.ts#L67)

</td>
</tr>
<tr>
<td>

<a id="property-relations-11"></a> `relations?`

</td>
<td>

(keyof `Entity` | `` `${keyof Entity}.${string}` ``)\[]

</td>
<td>

Array of entity relation properties to eager-load.

Specifies which related entities should be loaded along with the main entity.
This is transformed into TypeORM's relations option internally.

**Example**

```ts
// Load user with their profile and posts
relations: ["profile", "posts"];
```

</td>
<td>

[`QueryOptions`](#queryoptions).[`relations`](#property-relations-10)

</td>
<td>

[libs/nest-crud/src/interfaces/crud-options.interfaces.ts:51](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/interfaces/crud-options.interfaces.ts#L51)

</td>
</tr>
<tr>
<td>

<a id="property-sort-11"></a> `sort?`

</td>
<td>

`FindOptionsOrder`<`Entity`>

</td>
<td>

Sorting configuration for the query results.

Defines how the results should be ordered. This is a TypeORM
FindOptionsOrder object that specifies sort direction for properties.

**Example**

```ts
// Sort users by createdAt descending and then by name ascending
sort: {
  createdAt: 'DESC',
  name: 'ASC'
}
```

</td>
<td>

[`QueryOptions`](#queryoptions).[`sort`](#property-sort-10)

</td>
<td>

[libs/nest-crud/src/interfaces/crud-options.interfaces.ts:82](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/interfaces/crud-options.interfaces.ts#L82)

</td>
</tr>
<tr>
<td>

<a id="property-where-8"></a> `where?`

</td>
<td>

`undefined`

</td>
<td>

Explicitly excluded to prevent mixing with the 'search' approach.
Use SearchOptions for search-based filtering or WhereOptions for direct where clauses.

</td>
<td>

‐

</td>
<td>

[libs/nest-crud/src/interfaces/crud-options.interfaces.ts:104](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/interfaces/crud-options.interfaces.ts#L104)

</td>
</tr>
</tbody>
</table>

---

### QueryOptionsNot

Defined in: [libs/nest-crud/src/interfaces/crud-options.interfaces.ts:197](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/interfaces/crud-options.interfaces.ts#L197)

Options interface for exclusion-based CRUD operations.

This interface extends the base Options interface to provide specialized
configuration for operations that need to exclude entities based on specific
criteria. It combines positive filters with negative conditions to create
queries that exclude certain records.

Note that this interface explicitly excludes 'search' and 'where' options
to maintain clear separation between different filtering approaches.

#### Example

```typescript
// Find active users that are NOT admins
const options: NotOptions<User> = {
  filters: { isActive: true },
  not: { role: "admin" },
  relations: ["profile"],
  sort: { createdAt: "DESC" },
};
const users = await userService.findMany(options);
```

#### Extends

- [`QueryOptions`](#queryoptions)<`Entity`>

#### Extended by

- [`GetOneOptionsNot`](#getoneoptionsnot)

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

`Entity`

</td>
<td>

The entity type that the options apply to

</td>
</tr>
</tbody>
</table>

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

<a id="property-manager-14"></a> `manager?`

</td>
<td>

`EntityManager`

</td>
<td>

Optional EntityManager instance for transaction support.

When provided, this EntityManager will be used for database operations
instead of the repository's default connection. This enables operations
to participate in ongoing database transactions.

**Example**

```ts
// In a service method with transaction
async createUserWithProfile(data, manager: EntityManager) {
  return this.userRepository.create(data, { manager });
}
```

</td>
<td>

[`QueryOptions`](#queryoptions).[`manager`](#property-manager-12)

</td>
<td>

[libs/nest-crud/src/interfaces/crud-options.interfaces.ts:37](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/interfaces/crud-options.interfaces.ts#L37)

</td>
</tr>
<tr>
<td>

<a id="property-not-4"></a> `not?`

</td>
<td>

`QueryDeepPartial`<`Entity`>

</td>
<td>

Exclusion conditions for filtering out entities.

These conditions specify criteria that entities must NOT match to be included
in the results. This is required for NotOptions and implemented using NOT logic.

**Example**

```ts
not: { role: 'admin', status: 'deleted' }
```

</td>
<td>

‐

</td>
<td>

[libs/nest-crud/src/interfaces/crud-options.interfaces.ts:224](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/interfaces/crud-options.interfaces.ts#L224)

</td>
</tr>
<tr>
<td>

<a id="property-options-12"></a> `options?`

</td>
<td>

`Omit`<`FindOneOptions`<`Entity`>, `"relations"` | `"where"`>

</td>
<td>

Additional TypeORM find options excluding 'where' and 'relations'.

Allows passing additional TypeORM query options that aren't covered by
the other properties in this interface. The 'where' and 'relations' options
are excluded since they're handled by dedicated properties.

**Example**

```ts
options: {
  select: ['id', 'name', 'email'],
  skip: 10,
  take: 20
}
```

</td>
<td>

[`QueryOptions`](#queryoptions).[`options`](#property-options-10)

</td>
<td>

[libs/nest-crud/src/interfaces/crud-options.interfaces.ts:67](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/interfaces/crud-options.interfaces.ts#L67)

</td>
</tr>
<tr>
<td>

<a id="property-relations-12"></a> `relations?`

</td>
<td>

(keyof `Entity` | `` `${keyof Entity}.${string}` ``)\[]

</td>
<td>

Array of entity relation properties to eager-load.

Specifies which related entities should be loaded along with the main entity.
This is transformed into TypeORM's relations option internally.

**Example**

```ts
// Load user with their profile and posts
relations: ["profile", "posts"];
```

</td>
<td>

[`QueryOptions`](#queryoptions).[`relations`](#property-relations-10)

</td>
<td>

[libs/nest-crud/src/interfaces/crud-options.interfaces.ts:51](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/interfaces/crud-options.interfaces.ts#L51)

</td>
</tr>
<tr>
<td>

<a id="property-sort-12"></a> `sort?`

</td>
<td>

`FindOptionsOrder`<`Entity`>

</td>
<td>

Sorting configuration for the query results.

Defines how the results should be ordered. This is a TypeORM
FindOptionsOrder object that specifies sort direction for properties.

**Example**

```ts
// Sort users by createdAt descending and then by name ascending
sort: {
  createdAt: 'DESC',
  name: 'ASC'
}
```

</td>
<td>

[`QueryOptions`](#queryoptions).[`sort`](#property-sort-10)

</td>
<td>

[libs/nest-crud/src/interfaces/crud-options.interfaces.ts:82](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/interfaces/crud-options.interfaces.ts#L82)

</td>
</tr>
<tr>
<td>

<a id="property-where-9"></a> `where?`

</td>
<td>

`undefined`

</td>
<td>

Explicitly excluded to prevent mixing with the 'not' approach.
Use NotOptions for exclusion-based filtering or WhereOptions for direct where clauses.

</td>
<td>

‐

</td>
<td>

[libs/nest-crud/src/interfaces/crud-options.interfaces.ts:230](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/interfaces/crud-options.interfaces.ts#L230)

</td>
</tr>
</tbody>
</table>

---

### QueryOptionsSearch

Defined in: [libs/nest-crud/src/interfaces/crud-options.interfaces.ts:132](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/interfaces/crud-options.interfaces.ts#L132)

Options interface for search-based CRUD operations.

This interface extends the base Options interface to provide specialized
configuration for operations that need to filter entities based on search
criteria. It allows specifying both exact match filters and more flexible
search conditions.

Note that this interface explicitly excludes 'where' and 'not' options
to maintain clear separation between different filtering approaches.

#### Example

```typescript
// Find active users with a name containing 'john'
const options: SearchOptions<User> = {
  filters: { isActive: true },
  search: { firstName: Like("%john%") },
  relations: ["profile"],
  sort: { createdAt: "DESC" },
};
const users = await userService.findMany(options);
```

#### Extends

- [`QueryOptions`](#queryoptions)<`Entity`>

#### Extended by

- [`GetOneOptionsSearch`](#getoneoptionssearch)

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

`Entity`

</td>
<td>

The entity type that the options apply to

</td>
</tr>
</tbody>
</table>

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

<a id="property-manager-15"></a> `manager?`

</td>
<td>

`EntityManager`

</td>
<td>

Optional EntityManager instance for transaction support.

When provided, this EntityManager will be used for database operations
instead of the repository's default connection. This enables operations
to participate in ongoing database transactions.

**Example**

```ts
// In a service method with transaction
async createUserWithProfile(data, manager: EntityManager) {
  return this.userRepository.create(data, { manager });
}
```

</td>
<td>

[`QueryOptions`](#queryoptions).[`manager`](#property-manager-12)

</td>
<td>

[libs/nest-crud/src/interfaces/crud-options.interfaces.ts:37](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/interfaces/crud-options.interfaces.ts#L37)

</td>
</tr>
<tr>
<td>

<a id="property-options-13"></a> `options?`

</td>
<td>

`Omit`<`FindOneOptions`<`Entity`>, `"relations"` | `"where"`>

</td>
<td>

Additional TypeORM find options excluding 'where' and 'relations'.

Allows passing additional TypeORM query options that aren't covered by
the other properties in this interface. The 'where' and 'relations' options
are excluded since they're handled by dedicated properties.

**Example**

```ts
options: {
  select: ['id', 'name', 'email'],
  skip: 10,
  take: 20
}
```

</td>
<td>

[`QueryOptions`](#queryoptions).[`options`](#property-options-10)

</td>
<td>

[libs/nest-crud/src/interfaces/crud-options.interfaces.ts:67](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/interfaces/crud-options.interfaces.ts#L67)

</td>
</tr>
<tr>
<td>

<a id="property-relations-13"></a> `relations?`

</td>
<td>

(keyof `Entity` | `` `${keyof Entity}.${string}` ``)\[]

</td>
<td>

Array of entity relation properties to eager-load.

Specifies which related entities should be loaded along with the main entity.
This is transformed into TypeORM's relations option internally.

**Example**

```ts
// Load user with their profile and posts
relations: ["profile", "posts"];
```

</td>
<td>

[`QueryOptions`](#queryoptions).[`relations`](#property-relations-10)

</td>
<td>

[libs/nest-crud/src/interfaces/crud-options.interfaces.ts:51](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/interfaces/crud-options.interfaces.ts#L51)

</td>
</tr>
<tr>
<td>

<a id="property-search-4"></a> `search?`

</td>
<td>

`QueryDeepPartial`<`Entity`>

</td>
<td>

Flexible search conditions for filtering entities.

These conditions can use TypeORM ILike operator
for more flexible matching. They're combined with AND logic alongside
any specified filters.

**Example**

```typescript
search: {
  name: "smi";
}
// will search for name containing `smi`, ex: 'smith'
```

</td>
<td>

‐

</td>
<td>

[libs/nest-crud/src/interfaces/crud-options.interfaces.ts:157](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/interfaces/crud-options.interfaces.ts#L157)

</td>
</tr>
<tr>
<td>

<a id="property-sort-13"></a> `sort?`

</td>
<td>

`FindOptionsOrder`<`Entity`>

</td>
<td>

Sorting configuration for the query results.

Defines how the results should be ordered. This is a TypeORM
FindOptionsOrder object that specifies sort direction for properties.

**Example**

```ts
// Sort users by createdAt descending and then by name ascending
sort: {
  createdAt: 'DESC',
  name: 'ASC'
}
```

</td>
<td>

[`QueryOptions`](#queryoptions).[`sort`](#property-sort-10)

</td>
<td>

[libs/nest-crud/src/interfaces/crud-options.interfaces.ts:82](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/interfaces/crud-options.interfaces.ts#L82)

</td>
</tr>
<tr>
<td>

<a id="property-where-10"></a> `where?`

</td>
<td>

`undefined`

</td>
<td>

Explicitly excluded to prevent mixing with the 'search' approach.
Use SearchOptions for search-based filtering or WhereOptions for direct where clauses.

</td>
<td>

‐

</td>
<td>

[libs/nest-crud/src/interfaces/crud-options.interfaces.ts:163](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/interfaces/crud-options.interfaces.ts#L163)

</td>
</tr>
</tbody>
</table>

---

### QueryOptionsWhere

Defined in: [libs/nest-crud/src/interfaces/crud-options.interfaces.ts:260](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/interfaces/crud-options.interfaces.ts#L260)

Options interface for direct WHERE clause CRUD operations.

This interface extends the base Options interface to provide specialized
configuration for operations that need to use TypeORM's native WHERE clauses
directly. It supports both single condition objects and arrays of conditions
for complex OR queries.

Note that this interface explicitly excludes 'filters', 'search', and 'not' options
to maintain clear separation between different filtering approaches.

#### Example

```typescript
// Find users that are either admins or have premium status
const options: WhereOptions<User> = {
  where: [{ role: "admin" }, { status: "premium" }],
  relations: ["profile"],
  sort: { createdAt: "DESC" },
};
const users = await userService.findMany(options);
```

#### Extends

- [`QueryOptions`](#queryoptions)<`Entity`>

#### Extended by

- [`GetOneOptionsWhere`](#getoneoptionswhere)

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

`Entity`

</td>
<td>

The entity type that the options apply to

</td>
</tr>
</tbody>
</table>

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

<a id="property-filters-5"></a> `filters?`

</td>
<td>

`undefined`

</td>
<td>

Explicitly excluded to prevent mixing with the 'where' approach.
Use SearchOptions for search-based filtering or WhereOptions for direct where clauses.

</td>
<td>

‐

</td>
<td>

[libs/nest-crud/src/interfaces/crud-options.interfaces.ts:265](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/interfaces/crud-options.interfaces.ts#L265)

</td>
</tr>
<tr>
<td>

<a id="property-manager-16"></a> `manager?`

</td>
<td>

`EntityManager`

</td>
<td>

Optional EntityManager instance for transaction support.

When provided, this EntityManager will be used for database operations
instead of the repository's default connection. This enables operations
to participate in ongoing database transactions.

**Example**

```ts
// In a service method with transaction
async createUserWithProfile(data, manager: EntityManager) {
  return this.userRepository.create(data, { manager });
}
```

</td>
<td>

[`QueryOptions`](#queryoptions).[`manager`](#property-manager-12)

</td>
<td>

[libs/nest-crud/src/interfaces/crud-options.interfaces.ts:37](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/interfaces/crud-options.interfaces.ts#L37)

</td>
</tr>
<tr>
<td>

<a id="property-not-5"></a> `not?`

</td>
<td>

`undefined`

</td>
<td>

Explicitly excluded to prevent mixing with the 'where' approach.
Use NotOptions for exclusion-based filtering or WhereOptions for direct where clauses.

</td>
<td>

‐

</td>
<td>

[libs/nest-crud/src/interfaces/crud-options.interfaces.ts:277](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/interfaces/crud-options.interfaces.ts#L277)

</td>
</tr>
<tr>
<td>

<a id="property-options-14"></a> `options?`

</td>
<td>

`Omit`<`FindOneOptions`<`Entity`>, `"relations"` | `"where"`>

</td>
<td>

Additional TypeORM find options excluding 'where' and 'relations'.

Allows passing additional TypeORM query options that aren't covered by
the other properties in this interface. The 'where' and 'relations' options
are excluded since they're handled by dedicated properties.

**Example**

```ts
options: {
  select: ['id', 'name', 'email'],
  skip: 10,
  take: 20
}
```

</td>
<td>

[`QueryOptions`](#queryoptions).[`options`](#property-options-10)

</td>
<td>

[libs/nest-crud/src/interfaces/crud-options.interfaces.ts:67](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/interfaces/crud-options.interfaces.ts#L67)

</td>
</tr>
<tr>
<td>

<a id="property-relations-14"></a> `relations?`

</td>
<td>

(keyof `Entity` | `` `${keyof Entity}.${string}` ``)\[]

</td>
<td>

Array of entity relation properties to eager-load.

Specifies which related entities should be loaded along with the main entity.
This is transformed into TypeORM's relations option internally.

**Example**

```ts
// Load user with their profile and posts
relations: ["profile", "posts"];
```

</td>
<td>

[`QueryOptions`](#queryoptions).[`relations`](#property-relations-10)

</td>
<td>

[libs/nest-crud/src/interfaces/crud-options.interfaces.ts:51](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/interfaces/crud-options.interfaces.ts#L51)

</td>
</tr>
<tr>
<td>

<a id="property-search-5"></a> `search?`

</td>
<td>

`undefined`

</td>
<td>

Explicitly excluded to prevent mixing with the 'where' approach.
Use SearchOptions for search-based filtering or WhereOptions for direct where clauses.

</td>
<td>

‐

</td>
<td>

[libs/nest-crud/src/interfaces/crud-options.interfaces.ts:271](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/interfaces/crud-options.interfaces.ts#L271)

</td>
</tr>
<tr>
<td>

<a id="property-sort-14"></a> `sort?`

</td>
<td>

`FindOptionsOrder`<`Entity`>

</td>
<td>

Sorting configuration for the query results.

Defines how the results should be ordered. This is a TypeORM
FindOptionsOrder object that specifies sort direction for properties.

**Example**

```ts
// Sort users by createdAt descending and then by name ascending
sort: {
  createdAt: 'DESC',
  name: 'ASC'
}
```

</td>
<td>

[`QueryOptions`](#queryoptions).[`sort`](#property-sort-10)

</td>
<td>

[libs/nest-crud/src/interfaces/crud-options.interfaces.ts:82](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/interfaces/crud-options.interfaces.ts#L82)

</td>
</tr>
<tr>
<td>

<a id="property-where-11"></a> `where?`

</td>
<td>

`QueryDeepPartial`<`Entity`> | `QueryDeepPartial`<`Entity`>\[]

</td>
<td>

Direct TypeORM WHERE conditions for filtering entities.

These conditions are passed directly to TypeORM's QueryDeepPartial.
When an array is provided, the conditions are combined with OR logic,
allowing for complex queries that match any of the specified conditions.

**Examples**

```ts
// Single condition (AND logic between properties)
where: { status: 'active', role: 'user' }
```

```ts
// Multiple conditions (OR logic between objects)
where: [
  { status: "active", role: "admin" },
  { status: "premium", subscriptionValid: true },
];
```

</td>
<td>

‐

</td>
<td>

[libs/nest-crud/src/interfaces/crud-options.interfaces.ts:297](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/interfaces/crud-options.interfaces.ts#L297)

</td>
</tr>
</tbody>
</table>

---

### SaveOptionsWithSkip

Defined in: [libs/nest-crud/src/interfaces/crud-options.interfaces.ts:566](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/interfaces/crud-options.interfaces.ts#L566)

Extended save options interface with skip creation functionality.

This interface extends TypeORM's SaveOptions to provide additional control
over the save operation, specifically allowing the ability to skip entity
creation when certain conditions are met. This is useful for scenarios
where you want to update existing entities but avoid creating new ones.

#### Examples

```typescript
// Save user data but skip creation if user doesn't exist
const options: SaveOptionsWithSkip = {
  skipCreate: true,
  transaction: false,
  reload: true,
};
const savedUser = await userRepository.save(userData, options);
```

```typescript
// Normal save operation with creation allowed
const options: SaveOptionsWithSkip = {
  skipCreate: false, // or omit this property
  chunk: 1000,
};
const savedUsers = await userRepository.save(usersData, options);
```

#### Extends

- `SaveOptions`

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

<a id="property-chunk"></a> `chunk?`

</td>
<td>

`number`

</td>
<td>

Breaks save execution into chunks of a given size.
For example, if you want to save 100,000 objects but you have issues with saving them,
you can break them into 10 groups of 10,000 objects (by setting { chunk: 10000 }) and save each group separately.
This option is needed to perform very big insertions when you have issues with underlying driver parameter number limitation.

</td>
<td>

```ts
SaveOptions.chunk;
```

</td>
<td>

node_modules/typeorm/repository/SaveOptions.d.ts:26

</td>
</tr>
<tr>
<td>

<a id="property-data"></a> `data?`

</td>
<td>

`any`

</td>
<td>

Additional data to be passed with persist method.
This data can be used in subscribers then.

</td>
<td>

```ts
SaveOptions.data;
```

</td>
<td>

node_modules/typeorm/repository/SaveOptions.d.ts:9

</td>
</tr>
<tr>
<td>

<a id="property-listeners"></a> `listeners?`

</td>
<td>

`boolean`

</td>
<td>

Indicates if listeners and subscribers are called for this operation.
By default they are enabled, you can disable them by setting { listeners: false } in save/remove options.

</td>
<td>

```ts
SaveOptions.listeners;
```

</td>
<td>

node_modules/typeorm/repository/SaveOptions.d.ts:14

</td>
</tr>
<tr>
<td>

<a id="property-reload"></a> `reload?`

</td>
<td>

`boolean`

</td>
<td>

Flag to determine whether the entity that is being persisted
should be reloaded during the persistence operation.

It will work only on databases which do not support RETURNING / OUTPUT statement.
Enabled by default.

</td>
<td>

```ts
SaveOptions.reload;
```

</td>
<td>

node_modules/typeorm/repository/SaveOptions.d.ts:34

</td>
</tr>
<tr>
<td>

<a id="property-skipcreate"></a> `skipCreate?`

</td>
<td>

`boolean`

</td>
<td>

Flag to control whether new entities should be created during save operations.

When set to true, the save operation will only update existing entities
and skip creating new ones. When false or undefined, the normal save
behavior applies (both create and update operations are performed).

**Default**

```ts
false;
```

**Example**

```ts
skipCreate: true; // Only update existing entities, don't create new ones
```

</td>
<td>

‐

</td>
<td>

[libs/nest-crud/src/interfaces/crud-options.interfaces.ts:579](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/interfaces/crud-options.interfaces.ts#L579)

</td>
</tr>
<tr>
<td>

<a id="property-transaction"></a> `transaction?`

</td>
<td>

`boolean`

</td>
<td>

By default transactions are enabled and all queries in persistence operation are wrapped into the transaction.
You can disable this behaviour by setting { transaction: false } in the persistence options.

</td>
<td>

```ts
SaveOptions.transaction;
```

</td>
<td>

node_modules/typeorm/repository/SaveOptions.d.ts:19

</td>
</tr>
</tbody>
</table>

## Type Aliases

### DatabaseTypes

```ts
type DatabaseTypes = "mysql" | "mariadb" | "postgres";
```

Defined in: [libs/nest-crud/src/types/database.types.ts:37](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/types/database.types.ts#L37)

Supported database types for application connections.

This type defines the supported database engines that can be used with the
application's database connection configuration. Currently, the application
supports MySQL and MariaDB database systems.

The type is used as a constraint for the `type` property in the `ConnectionOptions`
interface, ensuring that only supported database types can be specified
when configuring database connections.

#### Remarks

- "mysql": Standard MySQL database server (typically versions 5.7+, 8.0+)
- "mariadb": MariaDB database server, a MySQL fork with additional features

The application uses TypeORM as its ORM layer, which supports these database
types through specific drivers. The database type determines which driver
and connection strategy will be used when establishing database connections.

If additional database support is needed in the future (such as PostgreSQL,
SQLite, or MongoDB), this type would be expanded to include those options,
and corresponding driver implementation would need to be added.

#### Example

```typescript
// Configuring a MySQL connection
const dbType: DatabaseTypes = "mysql";

// Using in connection options
const connectionOptions: ConnectionOptions = {
  type: "mysql",
  host: "localhost",
  // other connection properties
};
```

---

### EntityDecorator()

```ts
type EntityDecorator = (target) => void;
```

Defined in: [libs/nest-crud/src/types/decorator.types.ts:64](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/types/decorator.types.ts#L64)

Type definition for decorators that target standard entity classes

This type represents a decorator function that can be applied to classes
that extend the BaseEntity class. It follows the TypeScript decorator pattern
where the decorator receives the class constructor as its parameter.

The decorator function doesn't return a value (void), as it typically
modifies the target class or registers metadata about the class.

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

`target`

</td>
<td>

`Type`<[`BaseEntity`](#baseentity) | [`HichchiUserEntity`](#hichchiuserentity)>

</td>
<td>

The entity class being decorated

</td>
</tr>
</tbody>
</table>

#### Returns

`void`

#### Example

```typescript
// Creating a custom entity decorator
const CustomEntity: EntityDecorator = (target: Type<BaseEntity>) => {
  // Register metadata or modify the target class
  Reflect.defineMetadata("custom:entity", true, target);

  // You can also extend the class prototype
  target.prototype.customMethod = function () {
    return "This is a custom method";
  };
};

// Using the custom decorator
@HichchiEntity()
@CustomEntity
export class UserEntity extends BaseEntity {
  // Entity properties and methods
}
```

#### See

- [BaseEntity](#baseentity) The base class that decorated entities must extend
- [HichchiUserEntity](#hichchiuserentity) The base user class that decorated entities must extend
- [HichchiEntity](#hichchientity) The primary entity decorator
- [EntityExtensionDecorator](#entityextensiondecorator) Similar type for entity extensions

---

### EntityExtensionDecorator()

```ts
type EntityExtensionDecorator = (target) => void;
```

Defined in: [libs/nest-crud/src/types/decorator.types.ts:108](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/types/decorator.types.ts#L108)

Type definition for decorators that target extended entity classes

This type represents a decorator function that can be applied to classes
that extend the BaseEntityExtension class. It follows the TypeScript decorator
pattern where the decorator receives the class constructor as its parameter.

The decorator function doesn't return a value (void), as it typically
modifies the target class or registers metadata about the class.

This type is similar to EntityDecorator but specifically targets entity
classes that use the extended entity base class, which provides additional
functionality beyond the standard BaseEntity.

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

`target`

</td>
<td>

`Type`<[`BaseEntityExtension`](#baseentityextension)>

</td>
<td>

The entity extension class being decorated

</td>
</tr>
</tbody>
</table>

#### Returns

`void`

#### Example

```typescript
// Creating a custom entity extension decorator
const CustomExtendedEntity: EntityExtensionDecorator = (
  target: Type<BaseEntityExtension>,
) => {
  // Register metadata or modify the target class
  Reflect.defineMetadata("custom:extended-entity", true, target);

  // You can also extend the class prototype with extension-specific features
  target.prototype.getExtendedInfo = function () {
    return "This is an extended entity";
  };
};

// Using the custom decorator
@HichchiEntity()
@CustomExtendedEntity
export class ProductEntity extends BaseEntityExtension {
  // Entity properties and methods with extended functionality
}
```

#### See

- [BaseEntityExtension](#baseentityextension) The base class that decorated entity extensions must extend
- [HichchiEntity](#hichchientity) The primary entity decorator
- [EntityDecorator](#entitydecorator) Similar type for standard entities

---

### EntityOptionUnique

```ts
type EntityOptionUnique = object;
```

Defined in: [libs/nest-crud/src/types/entity-option-unique.ts:51](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/types/entity-option-unique.ts#L51)

Configuration type for defining unique constraints on entity fields.

This type is used to specify unique constraints for entity properties in a
flexible, reusable way. It enables defining both simple unique constraints
for individual fields and composite unique constraints that span multiple fields.

The type represents an object where:

- Each key is a constraint name or identifier
- Each value is either:
  - A single field name (string) for simple unique constraints
  - An array of field names (string\[]) for composite unique constraints

This configuration can be used with repository decorators and CRUD services
to automatically enforce unique constraints during entity creation and updates.

#### Index Signature

```ts
[key: string]: string | string[]
```

#### Remarks

When implementing repository methods that handle entity creation or updates,
this configuration can be used to check if entities with the same unique
values already exist in the database before performing the operation.

For composite unique constraints, all specified fields are considered together
as a single uniqueness constraint, meaning the combination of values must be unique.

#### Example

```typescript
// Simple unique constraint for a single field
const userUniqueOptions: EntityOptionUnique = {
  email: "email",
};

// Multiple individual unique constraints
const productUniqueOptions: EntityOptionUnique = {
  sku: "sku",
  barcode: "barcode",
};

// Composite unique constraints
const orderItemUniqueOptions: EntityOptionUnique = {
  // A single order item can only have one product per order
  orderProduct: ["orderId", "productId"],
};

// Mixed simple and composite constraints
const appointmentUniqueOptions: EntityOptionUnique = {
  code: "appointmentCode", // Simple unique constraint
  timeSlot: ["doctorId", "date", "startTime"], // Composite unique constraint
};
```

---

### FilterOptions

```ts
type FilterOptions<Entity> = {
  [P in keyof Entity]?: NonNullable<Entity[P]> extends (infer _U)[]
    ? never
    : NonNullable<Entity[P]> extends Date
      ? never
      : NonNullable<Entity[P]> extends Function
        ? never
        : IsPrimitive<NonNullable<Entity[P]>> extends true
          ? NonNullable<Entity[P]>
          : FilterOptions<NonNullable<Entity[P]>>;
};
```

Defined in: [libs/nest-crud/src/types/filter-options.type.ts:60](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/types/filter-options.type.ts#L60)

A recursive type for building structured filter conditions for entity queries.

This generic type enables creating complex, nested filter objects that match
the structure of the entity being filtered. It allows for filtering on direct
properties as well as nested objects within the entity.

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
<th>Default type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`Entity`

</td>
<td>

`unknown`

</td>
</tr>
</tbody>
</table>

#### Template

The entity type to be filtered, defaulting to unknown if not specified

#### Remarks

- Each key in the FilterOptions object corresponds to a property in the entity
- Each value can either be a primitive FilterValue or a nested FilterOptions object
- All properties are optional, allowing for partial filtering
- The structure supports arbitrary nesting to match complex entity relationships

When used with CRUD services, these filter options are typically converted to
appropriate WHERE conditions in the resulting database query.

#### Example

```typescript
// Basic filter for a User entity
interface User {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
  profile?: {
    age: number;
    country: string;
  };
}

// Simple filtering on direct properties
const activeUsersFilter: FilterOptions<User> = {
  isActive: true,
};

// Combined filtering on multiple properties
const activeAdminFilter: FilterOptions<User> = {
  isActive: true,
  email: "admin@example.com",
};

// Nested filtering using object structure
const activeUsersInUSFilter: FilterOptions<User> = {
  isActive: true,
  profile: {
    country: "US",
  },
};

// Using with a CRUD service
const users = await userService.findMany({
  filters: activeUsersInUSFilter,
});
```

---

### FindConditions

```ts
type FindConditions<Entity> =
  | string
  | string[]
  | number
  | number[]
  | Date
  | Date[]
  | ObjectId
  | ObjectId[]
  | QueryDeepPartial<Entity>;
```

Defined in: [libs/nest-crud/src/types/find-conditions.type.ts:59](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/types/find-conditions.type.ts#L59)

A flexible type for defining query conditions when finding entities.

This type provides a versatile way to specify search criteria when looking up
entities in the database. It supports both simple primary key lookups with
primitive values and complex conditional queries using TypeORM's query builder
syntax.

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

`Entity`

</td>
<td>

The entity type for which the find conditions are being defined

</td>
</tr>
</tbody>
</table>

#### Remarks

The FindConditions type supports the following forms of search criteria:

- **Simple ID-based lookup**: Using primitive values like string, number, or ObjectId
  for direct primary key lookups

- **Multiple ID lookup**: Using arrays of primitive values for finding entities
  matching any of the provided IDs (IN query)

- **Date-based searches**: Using Date objects for timestamp-based lookups

- **Complex conditions**: Using TypeORM's FindOptionsWhere for detailed query
  conditions with comparison operators, nested conditions, and relation filtering

This type is particularly useful in repository methods and services that need to
provide flexible entity lookup capabilities while maintaining strong typing.

#### Example

```typescript
// Simple ID lookup
const userById: FindConditions<User> = 1;

// Multiple ID lookup
const usersByIds: FindConditions<User> = [1, 2, 3];

// Complex conditions
const activeAdmins: FindConditions<User> = {
  isActive: true,
  role: "admin",
};

// Nested conditions with relations
const usersWithProfileCondition: FindConditions<User> = {
  profile: {
    country: "US",
    age: MoreThan(21),
  },
};

// Using in repository methods
async function findUsers(conditions: FindConditions<User>): Promise<User[]> {
  return this.repository.find({ where: conditions });
}
```

---

### GetAllOptions

```ts
type GetAllOptions<Entity> = PaginatedGetOptions<Entity>;
```

Defined in: [libs/nest-crud/src/interfaces/crud-options.interfaces.ts:658](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/interfaces/crud-options.interfaces.ts#L658)

Simple options type for retrieving all entities with pagination.

This type is used when you want to retrieve all entities without any filtering,
but still want to use pagination and sorting. It's the simplest form of retrieval
options that only focuses on how to present the results rather than filtering them.

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

`Entity`

</td>
<td>

The entity type that the options apply to

</td>
</tr>
</tbody>
</table>

#### Example

```typescript
// Get all users with pagination and sorting
const options: GetAllOptions<User> = {
  pagination: { page: 1, limit: 10 },
  sort: { createdAt: "DESC" },
  relations: ["profile"],
};
const [users, count] = await userService.findAll(options);
```

---

### GetByIdOptions

```ts
type GetByIdOptions<Entity> = Omit<QueryOptions<Entity>, "sort">;
```

Defined in: [libs/nest-crud/src/interfaces/crud-options.interfaces.ts:389](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/interfaces/crud-options.interfaces.ts#L389)

Options interface for retrieving a single entity by its ID.

This type extends the base Options interface, but excludes the sort option
since it's not relevant when retrieving a single entity by its unique identifier.
It retains other options like relations and manager for transaction support.

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

`Entity`

</td>
<td>

The entity type that the options apply to

</td>
</tr>
</tbody>
</table>

#### Example

```typescript
// Get a user by ID with their profile relation loaded
const options: GetByIdOptions<User> = {
  relations: ["profile"],
  options: { cache: true }, // Enable query caching
};
const user = await userService.findById("abc123", options);
```

---

### GetManyOptions

```ts
type GetManyOptions<Entity> =
  | (GetManyOptionsFilter<Entity> &
      GetManyOptionsSearch<Entity> &
      GetManyOptionsNot<Entity>)
  | GetManyOptionsWhere<Entity>;
```

Defined in: [libs/nest-crud/src/interfaces/crud-options.interfaces.ts:693](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/interfaces/crud-options.interfaces.ts#L693)

Union type for all options interfaces for retrieving multiple entities with pagination.

This type allows for flexible usage of different filtering approaches
when retrieving multiple entities with pagination support. It can be used
with search-based filtering, exclusion-based filtering, or direct WHERE clauses.

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

`Entity`

</td>
<td>

The entity type that the options apply to

</td>
</tr>
</tbody>
</table>

#### Example

```typescript
// Generic function that accepts any type of filtering options for multiple entities
async function findManyUsers(
  options: GetManyOptions<User>,
): Promise<[User[], number]> {
  return userRepository.findManyAndCount(options);
}

// Can be called with any of the supported filtering approaches
const [users1, count1] = await findManyUsers({
  search: { name: Like("%john%") },
  pagination: { page: 1, limit: 10 },
});

const [users2, count2] = await findManyUsers({
  not: { role: "admin" },
  pagination: { page: 1, limit: 10 },
});

const [users3, count3] = await findManyUsers({
  where: [{ role: "admin" }, { status: "premium" }],
  pagination: { page: 1, limit: 10 },
});
```

---

### GetOneOptions

```ts
type GetOneOptions<Entity> =
  | (GetOneOptionsFilter<Entity> &
      GetOneOptionsSearch<Entity> &
      GetOneOptionsNot<Entity>)
  | GetOneOptionsWhere<Entity>;
```

Defined in: [libs/nest-crud/src/interfaces/crud-options.interfaces.ts:634](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/interfaces/crud-options.interfaces.ts#L634)

Union type for all options interfaces for retrieving a single entity.

This type allows for flexible usage of different filtering approaches
when retrieving a single entity. It can be used with search-based filtering,
exclusion-based filtering, or direct WHERE clauses.

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

`Entity`

</td>
<td>

The entity type that the options apply to

</td>
</tr>
</tbody>
</table>

#### Example

```typescript
// Generic function that accepts any type of filtering options
async function findOneUser(options: GetOneOptions<User>): Promise<User | null> {
  return userRepository.findOne(options);
}

// Can be called with any of the supported filtering approaches
const user1 = await findOneUser({ search: { name: Like("%john%") } });
const user2 = await findOneUser({ not: { role: "admin" } });
const user3 = await findOneUser({ where: { id: 123 } });
```

---

### GetOptions

```ts
type GetOptions<Entity> =
  | (QueryOptionsFilter<Entity> &
      QueryOptionsSearch<Entity> &
      QueryOptionsNot<Entity>)
  | (QueryOptionsWhere<Entity> & PaginatedGetOptions<Entity>);
```

Defined in: [libs/nest-crud/src/interfaces/crud-options.interfaces.ts:606](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/interfaces/crud-options.interfaces.ts#L606)

Comprehensive options type for retrieving entities with various filtering approaches and pagination.

This type combines the different filtering options (search, not, where) with
pagination support to provide a flexible interface for retrieving entities.
It allows for using any of the filtering approaches while maintaining pagination capabilities.

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

`Entity`

</td>
<td>

The entity type that the options apply to

</td>
</tr>
</tbody>
</table>

#### Example

```typescript
// Function that can accept any combination of filtering and pagination
async function getUsers(options: GetOptions<User>): Promise<[User[], number]> {
  return userRepository.findAndCount(options);
}

// Use with search filtering and pagination
const [users, count] = await getUsers({
  search: { name: Like("%john%") },
  pagination: { page: 1, limit: 10 },
  sort: { createdAt: "DESC" },
});
```

---

### RepositoryDecorator()

```ts
type RepositoryDecorator = <T>(target) => T | void;
```

Defined in: [libs/nest-crud/src/types/repository-decorator.type.ts:47](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/types/repository-decorator.type.ts#L47)

Type definition for repository class decorators.

This type represents the function signature for decorators that can be applied to
repository classes extending BaseRepository. It enables creating custom decorators
that modify, enhance, or add functionality to repository classes at design time.

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

`T` _extends_ (...`args`) => [`BaseRepository`](#baserepository)<`any`>

</td>
<td>

The constructor type for classes extending BaseRepository

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

`target`

</td>
<td>

`T`

</td>
<td>

The repository class constructor being decorated

</td>
</tr>
</tbody>
</table>

#### Returns

`T` | `void`

Either the modified class constructor or void if modifications are made in-place

#### Remarks

Repository decorators can be used to:

- Add new methods or properties to repository classes
- Override existing repository methods with enhanced implementations
- Register metadata for repositories (e.g., for validation, serialization)
- Configure entity-specific behaviors without modifying the base repository logic
- Apply cross-cutting concerns like logging, caching, or authorization checks

The decorator may either return a new class (typically a class that extends the target)
or void if it makes modifications directly to the provided target class.

#### Example

```typescript
// Define a custom repository decorator that adds logging
const WithLogging: RepositoryDecorator = <
  T extends { new (...args: any[]): BaseRepository<any> },
>(
  target: T,
) => {
  return class extends target {
    async findOne(...args: any[]): Promise<any> {
      console.log(
        `Repository ${this.constructor.name}: Finding one entity with args:`,
        args,
      );
      const result = await super.findOne(...args);
      console.log(`Repository ${this.constructor.name}: Found entity:`, result);
      return result;
    }
  };
};

// Apply the decorator to a repository class
@WithLogging
class UserRepository extends BaseRepository<User> {
  // Repository-specific methods...
}
```

---

### SaveAndGetOptions

```ts
type SaveAndGetOptions<Entity> = SaveOptionsWithSkip & GetByIdOptions<Entity>;
```

Defined in: [libs/nest-crud/src/interfaces/crud-options.interfaces.ts:736](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/interfaces/crud-options.interfaces.ts#L736)

Combined options type for save-and-get operations.

This type combines SaveOptionsWithSkip and GetByIdOptions to provide a complete
configuration for operations that save an entity and then immediately retrieve
it by its ID. This is useful for scenarios where you need to save data and
then return the saved entity with all its computed properties, relations, and
database-generated values.

The type inherits all save options (including the skipCreate functionality)
and all retrieval options (excluding sort since it's not relevant for single
entity retrieval by ID).

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

`Entity`

</td>
<td>

The entity type that the options apply to

</td>
</tr>
</tbody>
</table>

#### Examples

```typescript
// Save a user and retrieve it with profile relation loaded
const options: SaveAndGetOptions<User> = {
  skipCreate: false,
  transaction: false,
  relations: ["profile"],
  options: { cache: true },
};
const savedUser = await userService.saveAndGet(userData, options);
```

```typescript
// Update existing user only (skip creation) and retrieve with relations
const options: SaveAndGetOptions<User> = {
  skipCreate: true,
  reload: true,
  relations: ["profile", "posts"],
  manager: transactionManager,
};
const updatedUser = await userService.saveAndGet(userData, options);
```

---

### SortOptions

```ts
type SortOptions<Entity> = FindOptionsOrder<Entity>;
```

Defined in: [libs/nest-crud/src/types/sort-options.type.ts:56](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/types/sort-options.type.ts#L56)

Type alias for TypeORM's sorting configuration.

SortOptions provides a strongly-typed way to define the sorting criteria for
entity queries. It maps directly to TypeORM's FindOptionsOrder type, offering
a consistent interface for ordering query results across the application.

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

`Entity`

</td>
<td>

`any`

</td>
<td>

The entity type for which sorting options are being defined,
defaults to any if not specified

</td>
</tr>
</tbody>
</table>

#### Remarks

The SortOptions type enables:

- Type-safe property access based on the Entity type
- Defining sort direction ('asc'|'desc') for each property
- Nested sorting for properties within relations
- Complex ordering with multiple sort criteria

This type is commonly used in CRUD service methods, repository queries, and
API endpoints that support result ordering.

The type is used with the parseSortOptions utility function that can transform
string-based sort specifications (common in API requests) into the structured
SortOptions object required by TypeORM.

#### Example

```typescript
// Simple sorting by a single property
const nameAscending: SortOptions<User> = {
  name: "asc",
};

// Multi-property sorting (primary and secondary sort)
const createdThenName: SortOptions<User> = {
  createdAt: "desc",
  name: "asc",
};

// Nested sorting with relations
const sortByProfileData: SortOptions<User> = {
  profile: {
    country: "asc",
    age: "desc",
  },
};

// Using in repository queries
const users = await userRepository.find({
  order: createdThenName,
});
```

---

### TypeORMErrorHandler()

```ts
type TypeORMErrorHandler = (error) => Error | void;
```

Defined in: [libs/nest-crud/src/types/error-handler.type.ts:54](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/types/error-handler.type.ts#L54)

A function type for custom TypeORM error handling.

This type defines a function signature for handlers that process errors thrown
by TypeORM operations. It provides a standardized way to intercept, transform,
and customize error responses for database operations throughout the application.

The handler receives the original error (which may be a TypeError or any other
exception thrown during database operations) and can either:

- Return a new Error instance to replace the original error
- Return void to let the original error propagate unchanged
- Throw a new error to immediately stop execution

This pattern allows for consistent error handling, logging, and transformation
across different repositories and services that interact with the database.

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

`TypeError` | `unknown`

</td>
<td>

The original error thrown by TypeORM or related database operations

</td>
</tr>
</tbody>
</table>

#### Returns

`Error` | `void`

Either a new Error instance to replace the original, or void to let the original error propagate

#### Remarks

Common use cases include:

- Transforming database-specific errors into application-specific exceptions
- Adding additional context or metadata to errors
- Handling specific error types differently (e.g., unique constraint violations)
- Logging or monitoring database errors with additional context
- Normalizing error messages for consistent API responses

#### Example

```typescript
// Basic error handler that transforms TypeORM errors into application errors
const errorHandler: TypeORMErrorHandler = (error) => {
  // Handle unique constraint violations
  if (
    error instanceof QueryFailedError &&
    error.message.includes("Duplicate entry")
  ) {
    return new ConflictException("A record with this data already exists");
  }

  // Log the error for debugging
  console.error("Database operation failed:", error);

  // Return a generic error for other cases
  return new InternalServerErrorException("Database operation failed");
};

// Using the error handler in a repository
try {
  await this.repository.save(entity);
} catch (error) {
  const handledError = errorHandler(error);
  if (handledError) throw handledError;
  throw error;
}
```

## Variables

### BaseEntityTemplateRelations

```ts
const BaseEntityTemplateRelations: string[];
```

Defined in: [libs/nest-crud/src/base/base-entity.ts:19](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/base/base-entity.ts#L19)

List of standard relation properties in the BaseEntity

This constant defines the names of the relation properties that are automatically
included in all entities that extend BaseEntity. These properties track the users
who created, updated, and deleted the entity.

This constant is used internally by the HichchiEntity decorator to exclude these
standard relations from foreign key constraint validation.

#### See

- [BaseEntity](#baseentity) The base entity class that uses these relations
- [HichchiEntity](#hichchientity) The entity decorator that uses this constant

---

### CONNECTION_OPTIONS

```ts
const CONNECTION_OPTIONS: "CONNECTION_OPTIONS" = "CONNECTION_OPTIONS";
```

Defined in: [libs/nest-crud/src/tokens.ts:29](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/tokens.ts#L29)

Token for database connection options

This constant defines a token used for dependency injection of database connection
configuration options in NestJS applications. It serves as a key for providing and
retrieving database-related configuration throughout the application.

The token is primarily used with NestJS's dependency injection system to provide
consistent access to database connection options across different modules and services.

#### Example

```typescript
// Providing connection options using the token
@Module({
  imports: [HichchiCrudModule.forRoot(connectionOptions)],
  providers: [
    {
      provide: CONNECTION_OPTIONS,
      useValue: connectionOptions,
    },
  ],
})
export class AppModule {}
```

#### See

- [HichchiCrudModule](#hichchicrudmodule) The module that uses this token for database configuration
- [ConnectionOptions](#connectionoptions) The interface that defines the connection options structure

---

### DEFAULT_MAX_RECURSION_DEPTH

```ts
const DEFAULT_MAX_RECURSION_DEPTH: 10 = 10;
```

Defined in: [libs/nest-crud/src/constants.ts:21](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/constants.ts#L21)

Default maximum recursion depth for deep object operations

This constant defines the default maximum recursion depth for operations that process
deeply nested objects. It prevents stack overflow errors and potential DoS attacks
from excessively nested input data structures.

#### Example

```typescript
// Used in functions that recursively process nested objects
function processNestedObject(obj, depth = 0) {
  if (depth > DEFAULT_MAX_RECURSION_DEPTH) {
    throw new Error("Maximum recursion depth exceeded");
  }
  // Process object recursively
}
```

#### See

toQueryDeepPartialEntity Function that uses this constant to limit recursion depth

---

### EXTRACT_INVALID_COLUMN_REGEX

```ts
const EXTRACT_INVALID_COLUMN_REGEX: RegExp;
```

Defined in: [libs/nest-crud/src/constants.ts:106](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/constants.ts#L106)

Regular expression for extracting column names from database column not found errors

This constant is used to parse error messages from database errors about unknown columns
to extract the name of the column that caused the error. The pattern matches the format
of MySQL/MariaDB error messages for unknown column errors.

#### Example

```typescript
// Example error message: 'Unknown column 'invalidColumn' in 'where clause''
const field = EXTRACT_INVALID_COLUMN_REGEX.exec(errorMessage)
  ? errorMessage.split(EXTRACT_INVALID_COLUMN_REGEX)[1]
  : undefined;
// field = 'invalidColumn'
```

#### See

EntityUtils.handleError Method that uses this pattern to extract column names from errors

---

### EXTRACT_INVALID_QUERY_FIELD_REGEX

```ts
const EXTRACT_INVALID_QUERY_FIELD_REGEX: RegExp;
```

Defined in: [libs/nest-crud/src/constants.ts:86](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/constants.ts#L86)

Regular expression for extracting field names from TypeORM property not found errors

This constant is used to parse error messages from TypeORM's EntityPropertyNotFoundError
to extract the name of the property that caused the error. The pattern matches the format
of TypeORM's error messages for property not found errors.

#### Example

```typescript
// Example error message: 'Property "invalidField" was not found in "UserEntity".'
const field = EXTRACT_INVALID_QUERY_FIELD_REGEX.exec(errorMessage)
  ? errorMessage.split(EXTRACT_INVALID_QUERY_FIELD_REGEX)[1]
  : undefined;
// field = 'invalidField'
```

#### See

EntityUtils.handleError Method that uses this pattern to extract field names from errors

---

### FK_CONSTRAINT_REGEX

```ts
const FK_CONSTRAINT_REGEX: RegExp;
```

Defined in: [libs/nest-crud/src/constants.ts:66](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/constants.ts#L66)

Regular expression for validating foreign key constraint naming convention

This constant defines the expected format for foreign key constraint names in the database.
The format is: FK_entityName_relatedEntityName

- FK\_: Prefix indicating a foreign key constraint
- entityName: The name of the entity containing the foreign key (must start with a letter, can contain letters, numbers, and underscores)
- relatedEntityName: The name of the related entity (must start with a letter, can contain letters, numbers, and underscores)

#### Example

```typescript
// Valid foreign key constraint names
"FK_user_profile";
"FK_order_customer";
"FK_orderItem_product";
```

#### See

- [HichchiEntity](#hichchientity) Decorator that validates foreign key constraint names
- [HichchiJoinColumn](#hichchijoincolumn) Decorator that uses this pattern for foreign key constraints

---

### ID_PATH

```ts
const ID_PATH: "id" = "id";
```

Defined in: [libs/nest-crud/src/constants.ts:108](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/constants.ts#L108)

---

### ID_PATH_VAR

```ts
const ID_PATH_VAR: ":id";
```

Defined in: [libs/nest-crud/src/constants.ts:110](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/constants.ts#L110)

---

### InjectRepository()

```ts
const InjectRepository: (entity, dataSource?) => ReturnType<typeof Inject>;
```

Defined in: node_modules/@nestjs/typeorm/dist/common/typeorm.decorators.d.ts:4

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

`entity`

</td>
<td>

`EntityClassOrSchema`

</td>
</tr>
<tr>
<td>

`dataSource?`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

#### Returns

`ReturnType`<_typeof_ `Inject`>

---

### UNIQUE_CONSTRAINT_REGEX

```ts
const UNIQUE_CONSTRAINT_REGEX: RegExp;
```

Defined in: [libs/nest-crud/src/constants.ts:43](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/constants.ts#L43)

Regular expression for validating unique constraint naming convention

This constant defines the expected format for unique constraint names in the database.
The format is: UNIQUE_entityName_fieldName

- UNIQUE\_: Prefix indicating a unique constraint
- entityName: The name of the entity (must start with a letter, can contain letters, numbers, and underscores)
- fieldName: The name of the field with the unique constraint (must start with a letter, can contain letters, numbers, and underscores)

#### Example

```typescript
// Valid unique constraint names
"UNIQUE_user_email";
"UNIQUE_product_sku";
"UNIQUE_orderItem_productId";
```

#### See

[HichchiEntity](#hichchientity) Decorator that validates unique constraint names

---

### USER_ENTITY_TABLE_NAME

```ts
const USER_ENTITY_TABLE_NAME: "users" = "users";
```

Defined in: [libs/nest-crud/src/tokens.ts:56](https://github.com/hichchidev/hichchi/blob/680b16602323e63535d1e4f7113a156787a42e23/libs/nest-crud/src/tokens.ts#L56)

Standard table name for user entities

This constant defines the standard table name that must be used for all user entities
in the application. It ensures consistency across the application by providing a
single source of truth for the user table name.

The constant is enforced by the HichchiEntity decorator, which requires that any
entity extending HichchiUserEntity must use this table name.

#### Example

```typescript
// In a user entity definition
@HichchiEntity(USER_ENTITY_TABLE_NAME, ["email"])
export class UserEntity extends HichchiUserEntity implements User {
  @Column({ nullable: false })
  email: string;

  // Other user properties...
}
```

#### See

- [HichchiEntity](#hichchientity) The decorator that enforces this table name for user entities
- [HichchiUserEntity](#hichchiuserentity) The base entity class for user entities
