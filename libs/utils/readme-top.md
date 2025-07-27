
<!--suppress ALL -->
<div align="center">

# 🛠️ @hichchi/utils

## Description

**A comprehensive utility library with essential helper functions for JavaScript/TypeScript applications**

[![npm version](https://img.shields.io/npm/v/@hichchi/utils?style=flat&color=blue)](https://www.npmjs.com/package/@hichchi/utils)
[![npm downloads](https://img.shields.io/npm/dm/@hichchi/utils?style=flat&color=green)](https://www.npmjs.com/package/@hichchi/utils)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/hichchidev/hichchi/blob/main/LICENSE)
[![TypeScript](https://img.shields.io/badge/typescript-5.0+-blue.svg)](https://www.typescriptlang.org/)

*Part of the [Hichchi](https://github.com/hichchidev/hichchi) ecosystem - A powerful, scalable application built with Nx workspace*

[📚 Jump to Documentation](#-api-documentation)

</div>

---

## 📋 Table Of Contents

- [📦 Installation](#-installation)
- [⚡ Quick Start](#-quick-start)
- [📋 Prerequisites](#-prerequisites)
- [🌟 Overview](#-overview)
- [✨ Features](#-features)
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
import { pathValueSetToObject } from '@hichchi/utils';

// 3. Use utility functions in your application
const nestedObject = pathValueSetToObject({
    "id": 123,
    "name": "John Doe",
    "profile.age": 30,
    "profile.address.city": "New York",
    "profile.address.zip": "10001"
});

Result:
// {
//   id: 123,
//   name: "John Doe",
//   profile: {
//     age: 30,
//     address: {
//       city: "New York",
//       zip: "10001"
//     }
//   }
// }

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

### 📝 String Template Utilities
- 🎨 **Template Processing** - Advanced string templating with variable substitution
- 🔄 **Dynamic Content** - Apply templates with custom prefixes and transformations
- 🏷️ **Tag-based Processing** - Support for various template tags and formats

### 🌐 URL Utilities
- 🔒 **Redirect Validation** - Secure redirect URL validation against allowed domains
- 🛡️ **Security Features** - Prevent open redirect vulnerabilities

### ✅ Assertion Utilities
- 🔍 **Type Guards** - TypeScript type guards for arrays and objects
- 🎯 **Property Checking** - Check if objects have specific properties
- 🛡️ **Safe Type Narrowing** - Runtime type validation with TypeScript support

### 🎨 Developer Experience
- 📝 **Full TypeScript Support** - Complete type definitions and IntelliSense
- 🔧 **Tree Shaking** - Import only what you need for optimal bundle size
- 📚 **Comprehensive Documentation** - Detailed JSDoc comments for all functions
- 🧪 **Well Tested** - Extensive test coverage for reliability
- 🚀 **Performance Optimized** - Efficient algorithms and minimal overhead

## 🔒 Security Best Practices

Detailed security best practices will be added here

## 🛠️ Troubleshooting

### Common Issues

#### TypeScript Compilation Issues
```bash
# Ensure you have the correct TypeScript version
npm install typescript@^5.0.0 --save-dev
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

---

<div align="center">

**Made with ❤️ by [Hichchi Dev](https://github.com/hichchidev)**

[![Hichchi Ecosystem](https://img.shields.io/badge/🏠_Hichchi_Ecosystem-blue)](https://github.com/hichchidev/hichchi)
[![Report Bug](https://img.shields.io/badge/🐛_Report_Bug-red)](https://github.com/hichchidev/hichchi/issues)
[![Request Feature](https://img.shields.io/badge/✨_Request_Feature-green)](https://github.com/hichchidev/hichchi/issues)

*Building the future of development utilities, one commit at a time*

</div>

---

# 📖 API Documentation

Complete technical reference for all classes, interfaces, methods, and types in this library.

**Auto-generated by TypeDoc** - Browse through detailed API references, code examples, and implementation guides below.

<!-- TypeDoc generated documentation will be appended below this point -->

---

## 📋 API Table of Contents
