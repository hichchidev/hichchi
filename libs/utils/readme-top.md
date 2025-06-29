<div align="center">

# 🛠️ @hichchi/utils

**A comprehensive utility library with essential helper functions for JavaScript/TypeScript applications**

[![npm version](https://img.shields.io/npm/v/@hichchi/utils?style=flat&color=blue)](https://www.npmjs.com/package/@hichchi/utils)
[![npm downloads](https://img.shields.io/npm/dm/@hichchi/utils?style=flat&color=green)](https://www.npmjs.com/package/@hichchi/utils)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/hichchidev/hichchi/blob/main/LICENSE)
[![TypeScript](https://img.shields.io/badge/typescript-5.0+-blue.svg)](https://www.typescriptlang.org/)

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
npm install @hichchi/utils
```

## ⚡ Quick Start

Get up and running with powerful utility functions in just a few minutes:

```typescript
// 1. Install the package
npm install @hichchi/utils

// 2. Import utility functions
import { 
  StringUtils, 
  ObjectUtils, 
  FileUtils,
  UrlUtils,
  AssertionUtils 
} from '@hichchi/utils';

// 3. Use utility functions in your application
// String manipulation
const camelCase = StringUtils.toCamelCase('hello-world'); // 'helloWorld'
const slug = StringUtils.toSlug('Hello World!'); // 'hello-world'

// Object operations
const merged = ObjectUtils.deepMerge(obj1, obj2);
const cloned = ObjectUtils.deepClone(originalObject);

// File operations
const content = await FileUtils.readFile('path/to/file.txt');
const exists = await FileUtils.exists('path/to/check');
```

## 📋 Prerequisites

Before installing @hichchi/utils, ensure you have:

### Required Dependencies
- **Node.js**: >= 18.0.0
- **TypeScript**: >= 5.0.0 (for TypeScript projects)


## 🌟 Overview

🎯 **Your essential toolkit** for JavaScript and TypeScript development. From string manipulation to file operations, from object utilities to URL handling - everything you need to streamline your development workflow with battle-tested, performance-optimized utility functions.

## ✨ Features

### 🔤 String Utilities
- 🎨 **Case Conversion** - camelCase, PascalCase, snake_case, kebab-case transformations
- 🔍 **String Analysis** - Pattern matching, validation, and content analysis
- ✂️ **String Manipulation** - Truncation, padding, cleaning, and formatting
- 🏷️ **Slug Generation** - URL-friendly string generation with customizable options
- 📝 **Template Processing** - Advanced string templating with variable substitution

### 🗂️ Object Utilities
- 🔄 **Deep Operations** - Deep merge, clone, compare, and transformation
- 🎯 **Property Access** - Safe property getting/setting with dot notation
- 🔍 **Object Analysis** - Type checking, validation, and structure analysis
- 📊 **Data Transformation** - Object flattening, nesting, and restructuring
- 🧹 **Object Cleaning** - Remove null/undefined values, empty objects

### 📁 File Utilities
- 📖 **File Operations** - Read, write, copy, move, and delete operations
- 📂 **Directory Management** - Create, list, and manage directory structures
- 🔍 **Path Utilities** - Path resolution, normalization, and validation
- 📊 **File Analysis** - Size calculation, type detection, and metadata extraction
- 🗜️ **Compression** - File compression and decompression utilities

### 🌐 URL Utilities
- 🔗 **URL Building** - Construct URLs with parameters and fragments
- 📝 **Query Parameters** - Parse, stringify, and manipulate query strings
- ✅ **URL Validation** - Validate URL formats and accessibility
- 🎯 **Path Manipulation** - URL path joining, normalization, and extraction

### ✅ Assertion Utilities
- 🔍 **Type Checking** - Runtime type validation and assertion
- 🛡️ **Value Validation** - Null checks, range validation, and custom assertions
- 🚨 **Error Handling** - Descriptive error messages for failed assertions
- 🎯 **Guard Functions** - Type guards for TypeScript type narrowing

### 🎨 Developer Experience
- 📝 **Full TypeScript Support** - Complete type definitions and IntelliSense
- 🔧 **Tree Shaking** - Import only what you need for optimal bundle size
- 📚 **Comprehensive Documentation** - Detailed JSDoc comments for all functions
- 🧪 **Well Tested** - Extensive test coverage for reliability
- 🚀 **Performance Optimized** - Efficient algorithms and minimal overhead

## 🚀 Usage

Detailed usage examples will be added here

## ⚙️ Configuration Reference

### String Utilities Configuration

```typescript
import { StringUtils, StringTemplateUtils } from '@hichchi/utils';

// Case conversion options
const options = {
  preserveConsecutiveUppercase: true,
  splitOnNumbers: false
};

const result = StringUtils.toCamelCase('XMLHttpRequest', options);

// Template configuration
const templateConfig = {
  openTag: '{{',
  closeTag: '}}',
  escapeHtml: true
};

const rendered = StringTemplateUtils.render(template, data, templateConfig);
```

### File Utilities Configuration

```typescript
import { FileUtils } from '@hichchi/utils';

// File operation options
const readOptions = {
  encoding: 'utf8',
  flag: 'r'
};

const writeOptions = {
  encoding: 'utf8',
  mode: 0o666,
  flag: 'w'
};

const content = await FileUtils.readFile('file.txt', readOptions);
await FileUtils.writeFile('output.txt', content, writeOptions);
```

### Object Utilities Configuration

```typescript
import { ObjectUtils } from '@hichchi/utils';

// Deep merge options
const mergeOptions = {
  arrayMerge: 'replace', // 'concat' | 'replace' | 'merge'
  skipUndefined: true,
  skipNull: false
};

const merged = ObjectUtils.deepMerge(obj1, obj2, mergeOptions);
```

## 🔒 Security Best Practices

Detailed security best practices will be added here

## 🛠️ Troubleshooting

### Common Issues

#### Import Errors
```typescript
// Use named imports for better tree shaking
import { StringUtils } from '@hichchi/utils';

// Avoid default imports
// import utils from '@hichchi/utils'; // ❌
```

#### TypeScript Compilation Issues
```bash
# Ensure you have the correct TypeScript version
npm install typescript@^5.0.0 --save-dev
```

#### File System Permissions
```typescript
// Handle file system errors gracefully
try {
  const content = await FileUtils.readFile('protected-file.txt');
} catch (error) {
  console.error('File access denied:', error.message);
}
```

## 🔧 Debug Mode

Enable detailed logging for utility operations:

```typescript
// Set environment variable for debug mode
process.env.HICHCHI_UTILS_DEBUG = 'true';

// Or configure programmatically
import { UtilsConfig } from '@hichchi/utils';
UtilsConfig.setDebugMode(true);
```

## ⚡ Performance Issues

### Optimization Tips
- Use specific utility imports to reduce bundle size
- Cache results of expensive operations when possible
- Use async versions of file operations for better performance
- Consider using streaming for large file operations

### Performance Examples
```typescript
// ✅ Good: Specific imports
import { StringUtils } from '@hichchi/utils';

// ❌ Avoid: Importing everything
import * as utils from '@hichchi/utils';

// ✅ Good: Async file operations
const content = await FileUtils.readFileAsync('large-file.txt');

// ✅ Good: Streaming for large files
const stream = FileUtils.createReadStream('huge-file.txt');
```

## 🔧 Development

### Building the Library
```bash
nx build utils
```

### Running Tests
```bash
nx test utils
```

### Linting
```bash
nx lint utils
```

### Performance Testing
```bash
nx run utils:benchmark
```

## 📖 API Documentation

For complete API documentation, visit our [TypeDoc documentation](https://hichchidev.github.io/hichchi/utils).

### Core Exports

#### String Utilities
- `StringUtils.toCamelCase()` - Convert to camelCase
- `StringUtils.toPascalCase()` - Convert to PascalCase
- `StringUtils.toKebabCase()` - Convert to kebab-case
- `StringUtils.toSnakeCase()` - Convert to snake_case
- `StringUtils.toSlug()` - Generate URL-friendly slugs
- `StringUtils.truncate()` - Truncate strings with ellipsis
- `StringUtils.capitalize()` - Capitalize strings
- `StringUtils.isEmail()` - Email validation
- `StringUtils.isUrl()` - URL validation

#### Object Utilities
- `ObjectUtils.deepMerge()` - Deep merge objects
- `ObjectUtils.deepClone()` - Deep clone objects
- `ObjectUtils.deepEqual()` - Deep equality comparison
- `ObjectUtils.get()` - Safe property access
- `ObjectUtils.set()` - Safe property setting
- `ObjectUtils.flatten()` - Flatten nested objects
- `ObjectUtils.pick()` - Pick specific properties
- `ObjectUtils.omit()` - Omit specific properties

#### File Utilities
- `FileUtils.readFile()` - Read file contents
- `FileUtils.writeFile()` - Write file contents
- `FileUtils.exists()` - Check file existence
- `FileUtils.copy()` - Copy files
- `FileUtils.move()` - Move files
- `FileUtils.delete()` - Delete files
- `FileUtils.mkdir()` - Create directories
- `FileUtils.getSize()` - Get file size
- `FileUtils.getStats()` - Get file statistics

#### URL Utilities
- `UrlUtils.build()` - Build URLs with parameters
- `UrlUtils.parse()` - Parse URL components
- `UrlUtils.join()` - Join URL paths
- `UrlUtils.addParams()` - Add query parameters
- `UrlUtils.removeParams()` - Remove query parameters
- `UrlUtils.isValid()` - Validate URLs

#### Assertion Utilities
- `AssertionUtils.isString()` - String type assertion
- `AssertionUtils.isNumber()` - Number type assertion
- `AssertionUtils.isObject()` - Object type assertion
- `AssertionUtils.isArray()` - Array type assertion
- `AssertionUtils.notNull()` - Null check assertion
- `AssertionUtils.notEmpty()` - Empty check assertion

---

<div align="center">

**[@hichchi/utils](https://www.npmjs.com/package/@hichchi/utils)** is part of the [Hichchi](https://github.com/hichchidev/hichchi) ecosystem.

Made with ❤️ by [Waruna Udayanga](https://github.com/hichchidev)

</div>
