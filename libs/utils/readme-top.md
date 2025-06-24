# @hichchi/utils

A collection of utility functions and helpers for TypeScript/JavaScript applications.

## Installation

```bash
npm install @hichchi/utils
```

## Overview

This library provides a comprehensive set of utility functions for common tasks in TypeScript/JavaScript applications. It includes utilities for string manipulation, object handling, file operations, type assertions, and more.

## Key Features

- **String Utilities**: Functions for case conversion, string formatting, and template handling
- **Object Utilities**: Deep copying, object transformation, and property manipulation
- **File Utilities**: File type detection, size formatting, and browser download helpers
- **Type Assertions**: Type guards for runtime type checking
- **Type Definitions**: Useful TypeScript types and interfaces

## Usage Examples

### String Utilities

```typescript
import { toCamelCase, toSnakeCase, toTitleCase } from '@hichchi/utils';

const camelCase = toCamelCase('hello world'); // 'helloWorld'
const snakeCase = toSnakeCase('hello world'); // 'hello_world'
const titleCase = toTitleCase('hello world'); // 'Hello World'
```

### Object Utilities

```typescript
import { deepCopy, prune, getValueByPath } from '@hichchi/utils';

// Deep copy an object
const original = { user: { name: 'John', age: 30 } };
const copy = deepCopy(original);

// Remove null/undefined values
const cleaned = prune({ name: 'John', email: null, address: undefined });
// Result: { name: 'John' }

// Access nested properties by path
const value = getValueByPath(original, 'user.name'); // 'John'
```

## Building

Run `nx build utils` to build the library.

## Running unit tests

Run `nx test utils` to execute the unit tests via [Jest](https://jestjs.io).
