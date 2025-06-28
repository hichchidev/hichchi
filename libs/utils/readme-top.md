<div align="center">
  <h1>🛠️ @hichchi/utils</h1>
  <p>
    <strong>A collection of utility functions and helpers for TypeScript/JavaScript applications</strong>
  </p>
  <p>
    <a href="https://www.npmjs.com/package/@hichchi/utils">
      <img src="https://img.shields.io/npm/v/@hichchi/utils?style=flat-square&color=blue" alt="npm version">
    </a>
    <a href="https://www.npmjs.com/package/@hichchi/utils">
      <img src="https://img.shields.io/npm/dm/@hichchi/utils?style=flat-square&color=green" alt="npm downloads">
    </a>
    <a href="https://github.com/hichchidev/hichchi/blob/main/LICENSE">
      <img src="https://img.shields.io/badge/license-MIT-green?style=flat-square" alt="License">
    </a>
    <img src="https://img.shields.io/badge/typescript-5.0+-blue?style=flat-square" alt="TypeScript Version">
  </p>
  <p>
    <em>Part of the <a href="https://github.com/hichchidev/hichchi">Hichchi</a> ecosystem - A powerful, scalable application built with Nx workspace</em>
  </p>
</div>

---

## 📦 Installation

```bash
npm install @hichchi/utils
```

## 🌟 Overview

This library provides a comprehensive set of utility functions for common tasks in TypeScript/JavaScript applications. It includes utilities for string manipulation, object handling, file operations, type assertions, and more.

## ✨ Key Features

- 📝 **String Utilities**: Functions for case conversion, string formatting, and template handling
- 🔧 **Object Utilities**: Deep copying, object transformation, and property manipulation
- 📁 **File Utilities**: File type detection, size formatting, and browser download helpers
- 🔍 **Type Assertions**: Type guards for runtime type checking
- 📋 **Type Definitions**: Useful TypeScript types and interfaces

## 🚀 Usage Examples

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

---

## 🔧 Development

### Building

```bash
nx build utils
```

### Running unit tests

```bash
nx test utils
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
