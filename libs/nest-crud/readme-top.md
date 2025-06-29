<div align="center">

# 🗃️ @hichchi/nest-crud

**A comprehensive CRUD framework for NestJS applications with TypeORM**

[![npm version](https://img.shields.io/npm/v/@hichchi/nest-crud?style=flat&color=blue)](https://www.npmjs.com/package/@hichchi/nest-crud)
[![npm downloads](https://img.shields.io/npm/dm/@hichchi/nest-crud?style=flat&color=green)](https://www.npmjs.com/package/@hichchi/nest-crud)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/hichchidev/hichchi/blob/main/LICENSE)
[![NestJS](https://img.shields.io/badge/nestjs-11.1.3-red.svg)](https://nestjs.com/)

*Part of the [Hichchi](https://github.com/hichchidev/hichchi) ecosystem - A powerful, scalable application built with Nx workspace*

[📚 Jump to Documentation](#api-documentation)

</div>

---

## 📋 Table of Contents

- [📦 Installation](#-installation)
- [⚡ Quick Start](#-quick-start)
- [📋 Prerequisites](#-prerequisites)
- [🌟 Overview](#-overview)
- [✨ Features](#-features)
- [🚀 Usage](#-usage)
- [⚙️ Configuration Reference](#️-configuration-reference)
- [🔒 Security Best Practices](#-security-best-practices)
- [🛠️ Troubleshooting](#️-troubleshooting)
- [🔧 Development](#-development)
- [📖 API Documentation](#-api-documentation)

---

## 📦 Installation

```bash
npm install @hichchi/nest-crud
```

## ⚡ Quick Start

Get up and running with powerful CRUD operations in just a few minutes:

```typescript
// 1. Install the package
npm install @hichchi/nest-crud

// 2. Create your entity extending BaseEntity
import { BaseEntity } from '@hichchi/nest-crud';
import { Entity, Column } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @Column()
  name: string;

  @Column()
  email: string;
}

// 3. Create your service extending CrudService
import { CrudService } from '@hichchi/nest-crud';

@Injectable()
export class UsersService extends CrudService<User> {
  constructor(
    @InjectRepository(User)
    repository: Repository<User>
  ) {
    super(repository);
  }
}
```

## 📋 Prerequisites

Before installing @hichchi/nest-crud, ensure you have:

### Required Dependencies
- **Node.js**: >= 18.0.0
- **NestJS**: >= 10.0.0
- **TypeScript**: >= 5.0.0
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

Detailed usage examples will be added here

## ⚙️ Configuration Reference

### CrudModule Configuration

```typescript
import { CrudModule } from '@hichchi/nest-crud';

@Module({
  imports: [
    CrudModule.forRoot({
      // Global CRUD configuration
      pagination: {
        defaultLimit: 20,
        maxLimit: 100
      },
      softDelete: true,
      auditTrail: true,
      caching: {
        enabled: true,
        ttl: 300 // 5 minutes
      }
    })
  ]
})
export class AppModule {}
```

### BaseEntity Structure

```typescript
export abstract class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  @Column({ nullable: true })
  createdBy?: string;

  @Column({ nullable: true })
  updatedBy?: string;
}
```

### CrudService Methods

```typescript
// Basic CRUD operations
create(createDto: CreateDto): Promise<Entity>
findAll(options?: FindOptions): Promise<Entity[]>
findOne(id: string): Promise<Entity>
update(id: string, updateDto: UpdateDto): Promise<Entity>
remove(id: string): Promise<void>

// Advanced operations
findWithPagination(options: PaginationOptions): Promise<PaginatedResult<Entity>>
bulkCreate(createDtos: CreateDto[]): Promise<Entity[]>
bulkUpdate(updates: BulkUpdateDto[]): Promise<Entity[]>
softDelete(id: string): Promise<void>
restore(id: string): Promise<Entity>
```

## 🔒 Security Best Practices

Detailed security best practices will be added here

## 🛠️ Troubleshooting

### Common Issues

#### TypeORM Connection Issues
```bash
# Ensure TypeORM is properly configured
npm install @nestjs/typeorm typeorm
```

#### Entity Relationship Errors
```typescript
// Make sure to properly define relationships
@ManyToOne(() => User, user => user.posts)
user: User;
```

#### Migration Problems
```bash
# Generate and run migrations
npm run typeorm:migration:generate
npm run typeorm:migration:run
```

## 🔧 Debug Mode

Enable detailed logging for CRUD operations:

```typescript
// Set environment variables for debug mode
process.env.NEST_CRUD_DEBUG = 'true';
process.env.TYPEORM_LOGGING = 'true';
```

## ⚡ Performance Issues

### Query Optimization
- Use proper indexing on frequently queried fields
- Implement pagination for large datasets
- Utilize query builders for complex operations
- Enable caching for read-heavy operations

### Repository Performance
```typescript
// Use select to limit returned fields
const users = await this.usersService.findAll({
  select: ['id', 'name', 'email']
});

// Use relations carefully
const users = await this.usersService.findAll({
  relations: ['profile'] // Only load needed relations
});
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

## 📖 API Documentation

For complete API documentation, visit our [TypeDoc documentation](https://hichchidev.github.io/hichchi/nest-crud).

### Core Exports

- `BaseEntity` - Base entity class with common fields
- `BaseUserEntity` - User-specific base entity
- `BaseRepository` - Advanced repository with CRUD operations
- `CrudService` - Comprehensive CRUD service
- `CrudModule` - Module for CRUD configuration
- `InjectRepository` - TypeORM repository injection decorator
- `Repository` - TypeORM repository class

### Decorators & DTOs

- `@CrudController` - Controller decorator for CRUD endpoints
- `@CrudAuth` - Authentication decorator for CRUD operations
- `CreateDto` - Base DTO for create operations
- `UpdateDto` - Base DTO for update operations
- `QueryDto` - DTO for query parameters and filtering

---

<div align="center">

**[@hichchi/nest-crud](https://www.npmjs.com/package/@hichchi/nest-crud)** is part of the [Hichchi](https://github.com/hichchidev/hichchi) ecosystem.

Made with ❤️ by [Waruna Udayanga](https://github.com/hichchidev)

</div>
