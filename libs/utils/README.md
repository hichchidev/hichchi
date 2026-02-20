<!--suppress ALL -->

<div align="center">

# 🛠️ @hichchi/utils

## Description

**A comprehensive utility library with essential helper functions for JavaScript/TypeScript applications**

[![npm version](https://img.shields.io/npm/v/@hichchi/utils?style=flat&color=blue)](https://www.npmjs.com/package/@hichchi/utils)
[![npm downloads](https://img.shields.io/npm/dm/@hichchi/utils?style=flat&color=green)](https://www.npmjs.com/package/@hichchi/utils)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/hichchidev/hichchi/blob/main/LICENSE)
[![TypeScript](https://img.shields.io/badge/typescript-5.0+-blue.svg)](https://www.typescriptlang.org/)

_Part of the [Hichchi](https://github.com/hichchidev/hichchi) ecosystem - A powerful, scalable application built with Nx workspace_

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
import { dottedPathObjectToNested } from '@hichchi/utils';

// 3. Use utility functions in your application
const nestedObject = dottedPathObjectToNested({
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

- **Node.js**: ^18.0.0
- **TypeScript**: ^5.0.0 (for TypeScript projects)

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

_Building the future of development utilities, one commit at a time_

</div>

---

# 📖 API Documentation

Complete technical reference for all classes, interfaces, methods, and types in this library.

**Auto-generated by TypeDoc** - Browse through detailed API references, code examples, and implementation guides below.

<!-- TypeDoc generated documentation will be appended below this point -->

---

## 📋 API Table of Contents

- [Enumerations](#enumerations)
  - [TemplateTag](#templatetag)
- [Functions](#functions)
  - [applyTemplate()](#applytemplate)
  - [applyTemplates()](#applytemplates)
  - [breakToWords()](#breaktowords)
  - [countOccurrences()](#countoccurrences)
  - [createExcerpt()](#createexcerpt)
  - [deepCopy()](#deepcopy)
  - [dottedPathObjectToNested()](#dottedpathobjecttonested)
  - [escapeRegExp()](#escaperegexp)
  - [extractEmails()](#extractemails)
  - [extractUrls()](#extracturls)
  - [filterByObject()](#filterbyobject)
  - [format()](#format)
  - [getEnumValues()](#getenumvalues)
  - [getFileExt()](#getfileext)
  - [getFileSize()](#getfilesize)
  - [getMapKey()](#getmapkey)
  - [getMapKeys()](#getmapkeys)
  - [getValueByPath()](#getvaluebypath)
  - [groupBy()](#groupby)
  - [hashString()](#hashstring)
  - [hasOwnAll()](#hasownall)
  - [htmlToText()](#htmltotext)
  - [isAlphanumeric()](#isalphanumeric)
  - [isArray()](#isarray)
  - [isObject()](#isobject)
  - [isObjectWith()](#isobjectwith)
  - [isValidRedirectUrl()](#isvalidredirecturl)
  - [maskString()](#maskstring)
  - [normalizeString()](#normalizestring)
  - [objectToDottedPathValueObject()](#objecttodottedpathvalueobject)
  - [omit()](#omit)
  - [padString()](#padstring)
  - [plural()](#plural)
  - [prune()](#prune)
  - [randomString()](#randomstring)
  - [removeWhitespace()](#removewhitespace)
  - [reverse()](#reverse)
  - [searchMapValues()](#searchmapvalues)
  - [singular()](#singular)
  - [slugify()](#slugify)
  - [stringSimilarity()](#stringsimilarity)
  - [toCamelCase()](#tocamelcase)
  - [toFirstCase()](#tofirstcase)
  - [toFirstCaseBreak()](#tofirstcasebreak)
  - [toKebabCase()](#tokebabcase)
  - [toLowerCase()](#tolowercase)
  - [toLowerCaseBreak()](#tolowercasebreak)
  - [toNumber()](#tonumber)
  - [toPascalCase()](#topascalcase)
  - [toProperTitleCase()](#topropertitlecase)
  - [toSentenceCase()](#tosentencecase)
  - [toSnakeCase()](#tosnakecase)
  - [toTitleCase()](#totitlecase)
  - [toUpperCase()](#touppercase)
  - [toUpperCaseBreak()](#touppercasebreak)
  - [truncate()](#truncate)
  - [wordWrap()](#wordwrap)
- [Interfaces](#interfaces)
  - [DottedPathValueObject](#dottedpathvalueobject)
  - [InfiniteObject](#infiniteobject)
  - [InflectionRule](#inflectionrule)
  - [InflectionRuleCategories](#inflectionrulecategories)
  - [LiteralObject](#literalobject)
  - [PluralSingularRulePair](#pluralsingularrulepair)
- [Type Aliases](#type-aliases)
  - [DeepPartial](#deeppartial)
  - [IsAlreadyInPath](#isalreadyinpath)
  - [IsEmpty](#isempty)
  - [IsPrimitive](#isprimitive)
  - [LooseAutocomplete](#looseautocomplete)
  - [NonNullPrimitive](#nonnullprimitive)
  - [PartialWithNull](#partialwithnull)
  - [Prettify](#prettify)
  - [Primitive](#primitive)
  - [SimpleDeepPartial](#simpledeeppartial)
  - [Type()](#type)
- [Variables](#variables)
  - [CHARACTERS_TO_REMOVE](#characters_to_remove)
  - [CONTEXT_MULTIPLIER](#context_multiplier)
  - [DEFAULT_BREAK_CHAR](#default_break_char)
  - [DEFAULT_CONTEXT_LENGTH](#default_context_length)
  - [DEFAULT_ELLIPSIS](#default_ellipsis)
  - [DEFAULT_LINE_LENGTH](#default_line_length)
  - [EnglishInflectionRules](#englishinflectionrules)
  - [HEX_PADDING_CHAR](#hex_padding_char)
  - [HEX_PADDING_LENGTH](#hex_padding_length)
  - [HEX_RADIX](#hex_radix)
  - [mimeTypes](#mimetypes)

## Enumerations

### TemplateTag

Defined in: [enums/template-tag.enum.ts:15](https://github.com/hichchidev/hichchi/blob/0b9a2445c124fc8574826bbe19e8d3e57d724a38/libs/utils/src/enums/template-tag.enum.ts#L15)

Template tags for string transformations

This enum defines all available template tags that can be used with the `applyTemplate`
and `applyTemplates` functions. Each tag corresponds to a specific string transformation
function from the string.utils module.

Template tags are represented as strings in the format `#{transformationName}`. When these
tags appear in template strings, they are replaced with the result of applying the
corresponding transformation to the provided value.

#### See

- [applyTemplate](#applytemplate) For applying a single value to a template
- [applyTemplates](#applytemplates) For applying multiple values to a template

#### Enumeration Members

<table>
<thead>
<tr>
<th>Enumeration Member</th>
<th>Value</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="enumeration-member-camel_case"></a> `CAMEL_CASE`

</td>
<td>

`"#{camelCase}"`

</td>
<td>

[enums/template-tag.enum.ts:22](https://github.com/hichchidev/hichchi/blob/0b9a2445c124fc8574826bbe19e8d3e57d724a38/libs/utils/src/enums/template-tag.enum.ts#L22)

</td>
</tr>
<tr>
<td>

<a id="enumeration-member-first_case"></a> `FIRST_CASE`

</td>
<td>

`"#{firstCase}"`

</td>
<td>

[enums/template-tag.enum.ts:21](https://github.com/hichchidev/hichchi/blob/0b9a2445c124fc8574826bbe19e8d3e57d724a38/libs/utils/src/enums/template-tag.enum.ts#L21)

</td>
</tr>
<tr>
<td>

<a id="enumeration-member-first_case_break"></a> `FIRST_CASE_BREAK`

</td>
<td>

`"#{firstCaseBreak}"`

</td>
<td>

[enums/template-tag.enum.ts:29](https://github.com/hichchidev/hichchi/blob/0b9a2445c124fc8574826bbe19e8d3e57d724a38/libs/utils/src/enums/template-tag.enum.ts#L29)

</td>
</tr>
<tr>
<td>

<a id="enumeration-member-html_to_text"></a> `HTML_TO_TEXT`

</td>
<td>

`"#{htmlToText}"`

</td>
<td>

[enums/template-tag.enum.ts:32](https://github.com/hichchidev/hichchi/blob/0b9a2445c124fc8574826bbe19e8d3e57d724a38/libs/utils/src/enums/template-tag.enum.ts#L32)

</td>
</tr>
<tr>
<td>

<a id="enumeration-member-kebab_case"></a> `KEBAB_CASE`

</td>
<td>

`"#{kebabCase}"`

</td>
<td>

[enums/template-tag.enum.ts:24](https://github.com/hichchidev/hichchi/blob/0b9a2445c124fc8574826bbe19e8d3e57d724a38/libs/utils/src/enums/template-tag.enum.ts#L24)

</td>
</tr>
<tr>
<td>

<a id="enumeration-member-lower_case"></a> `LOWER_CASE`

</td>
<td>

`"#{lowerCase}"`

</td>
<td>

[enums/template-tag.enum.ts:19](https://github.com/hichchidev/hichchi/blob/0b9a2445c124fc8574826bbe19e8d3e57d724a38/libs/utils/src/enums/template-tag.enum.ts#L19)

</td>
</tr>
<tr>
<td>

<a id="enumeration-member-lower_case_break"></a> `LOWER_CASE_BREAK`

</td>
<td>

`"#{lowerCaseBreak}"`

</td>
<td>

[enums/template-tag.enum.ts:27](https://github.com/hichchidev/hichchi/blob/0b9a2445c124fc8574826bbe19e8d3e57d724a38/libs/utils/src/enums/template-tag.enum.ts#L27)

</td>
</tr>
<tr>
<td>

<a id="enumeration-member-number"></a> `NUMBER`

</td>
<td>

`"#{number}"`

</td>
<td>

[enums/template-tag.enum.ts:31](https://github.com/hichchidev/hichchi/blob/0b9a2445c124fc8574826bbe19e8d3e57d724a38/libs/utils/src/enums/template-tag.enum.ts#L31)

</td>
</tr>
<tr>
<td>

<a id="enumeration-member-pascal_case"></a> `PASCAL_CASE`

</td>
<td>

`"#{pascalCase}"`

</td>
<td>

[enums/template-tag.enum.ts:23](https://github.com/hichchidev/hichchi/blob/0b9a2445c124fc8574826bbe19e8d3e57d724a38/libs/utils/src/enums/template-tag.enum.ts#L23)

</td>
</tr>
<tr>
<td>

<a id="enumeration-member-sentence_case"></a> `SENTENCE_CASE`

</td>
<td>

`"#{sentenceCase}"`

</td>
<td>

[enums/template-tag.enum.ts:20](https://github.com/hichchidev/hichchi/blob/0b9a2445c124fc8574826bbe19e8d3e57d724a38/libs/utils/src/enums/template-tag.enum.ts#L20)

</td>
</tr>
<tr>
<td>

<a id="enumeration-member-singular"></a> `SINGULAR`

</td>
<td>

`"#{singular}"`

</td>
<td>

[enums/template-tag.enum.ts:30](https://github.com/hichchidev/hichchi/blob/0b9a2445c124fc8574826bbe19e8d3e57d724a38/libs/utils/src/enums/template-tag.enum.ts#L30)

</td>
</tr>
<tr>
<td>

<a id="enumeration-member-snake_case"></a> `SNAKE_CASE`

</td>
<td>

`"#{snakeCase}"`

</td>
<td>

[enums/template-tag.enum.ts:17](https://github.com/hichchidev/hichchi/blob/0b9a2445c124fc8574826bbe19e8d3e57d724a38/libs/utils/src/enums/template-tag.enum.ts#L17)

</td>
</tr>
<tr>
<td>

<a id="enumeration-member-title_case"></a> `TITLE_CASE`

</td>
<td>

`"#{titleCase}"`

</td>
<td>

[enums/template-tag.enum.ts:26](https://github.com/hichchidev/hichchi/blob/0b9a2445c124fc8574826bbe19e8d3e57d724a38/libs/utils/src/enums/template-tag.enum.ts#L26)

</td>
</tr>
<tr>
<td>

<a id="enumeration-member-upper_case"></a> `UPPER_CASE`

</td>
<td>

`"#{upperCase}"`

</td>
<td>

[enums/template-tag.enum.ts:16](https://github.com/hichchidev/hichchi/blob/0b9a2445c124fc8574826bbe19e8d3e57d724a38/libs/utils/src/enums/template-tag.enum.ts#L16)

</td>
</tr>
<tr>
<td>

<a id="enumeration-member-upper_case_break"></a> `UPPER_CASE_BREAK`

</td>
<td>

`"#{upperCaseBreak}"`

</td>
<td>

[enums/template-tag.enum.ts:28](https://github.com/hichchidev/hichchi/blob/0b9a2445c124fc8574826bbe19e8d3e57d724a38/libs/utils/src/enums/template-tag.enum.ts#L28)

</td>
</tr>
<tr>
<td>

<a id="enumeration-member-upper_kebab_case"></a> `UPPER_KEBAB_CASE`

</td>
<td>

`"#{upperKebabCase}"`

</td>
<td>

[enums/template-tag.enum.ts:25](https://github.com/hichchidev/hichchi/blob/0b9a2445c124fc8574826bbe19e8d3e57d724a38/libs/utils/src/enums/template-tag.enum.ts#L25)

</td>
</tr>
<tr>
<td>

<a id="enumeration-member-upper_snake_case"></a> `UPPER_SNAKE_CASE`

</td>
<td>

`"#{upperSnakeCase}"`

</td>
<td>

[enums/template-tag.enum.ts:18](https://github.com/hichchidev/hichchi/blob/0b9a2445c124fc8574826bbe19e8d3e57d724a38/libs/utils/src/enums/template-tag.enum.ts#L18)

</td>
</tr>
</tbody>
</table>

## Functions

### applyTemplate()

```ts
function applyTemplate(str, prefix): string;
```

Defined in: [utils/string-template.utils.ts:83](https://github.com/hichchidev/hichchi/blob/0b9a2445c124fc8574826bbe19e8d3e57d724a38/libs/utils/src/utils/string-template.utils.ts#L83)

Applies a value to a template string containing transformation tags.

This function replaces template tags in a string with transformed versions of a provided value.
It's particularly useful for creating dynamic messages, error notifications, or any text
that needs to include the same value in different formats.

Each template tag is replaced with the result of applying the corresponding transformation
function to the provided value. If a tag isn't present in the template string, that
transformation is skipped.

Available template tags:

- `#{upperCase}` - Converts to UPPERCASE ("USER")
- `#{snakeCase}` - Converts to snake_case ("user_profile")
- `#{upperSnakeCase}` - Converts to UPPER_SNAKE_CASE ("USER_PROFILE")
- `#{lowerCase}` - Converts to lowercase ("user")
- `#{sentenceCase}` - Converts to Sentence case ("User profile")
- `#{firstCase}` - Converts to First case ("User")
- `#{camelCase}` - Converts to camelCase ("userProfile")
- `#{pascalCase}` - Converts to PascalCase ("UserProfile")
- `#{kebabCase}` - Converts to kebab-case ("user-profile")
- `#{upperKebabCase}` - Converts to KEBAB-CASE ("USER-PROFILE")
- `#{titleCase}` - Converts to Title Case ("User Profile")
- `#{lowerCaseBreak}` - Breaks words and converts to lowercase ("user profile")
- `#{upperCaseBreak}` - Breaks words and converts to UPPERCASE ("USER PROFILE")
- `#{firstCaseBreak}` - Breaks words and applies First case ("User profile")
- `#{singular}` - Converts plural to singular form ("users" → "user")
- `#{number}` - Converts to a number if possible ("123" → 123)
- `#{htmlToText}` - Removes HTML tags ("<b>User</b>" → "User")
- `#{format}` - Formats a string with placeholders (used with additional parameters)

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

`str`

</td>
<td>

`string`

</td>
<td>

Template string containing transformation tags

</td>
</tr>
<tr>
<td>

`prefix`

</td>
<td>

`string`

</td>
<td>

The prefix to update with

</td>
</tr>
</tbody>
</table>

#### Returns

`string`

- The template with all tags replaced by transformed values

#### Examples

```typescript
// Error message with different versions of the same term
applyTemplate(
  "Cannot create a #{lowerCase} with this email. #{sentenceCase} already exists.",
  "User",
);
// Output: "Cannot create a user with this email. User already exists."
```

```typescript
// Using multiple transformations of the same value
applyTemplate(
  "Model: #{pascalCase}\nTable: #{snakeCase}\nAPI Path: #{kebabCase}",
  "blogPost",
);
// Output:
//     Model: BlogPost
//     Table: blog_post
//     API Path: blog-post
```

#### See

- [TemplateTag](#templatetag) For the full list of available template tags
- [applyTemplates](#applytemplates) For applying multiple different values to a template

---

### applyTemplates()

```ts
function applyTemplates(str, prefixes): string;
```

Defined in: [utils/string-template.utils.ts:211](https://github.com/hichchidev/hichchi/blob/0b9a2445c124fc8574826bbe19e8d3e57d724a38/libs/utils/src/utils/string-template.utils.ts#L211)

Applies multiple named template transformations to a string with different values for each prefix.

This advanced templating function allows you to use multiple different values within a single
template string, each with their own set of transformation tags. Unlike `applyTemplate` which
applies one value to all tags, this function lets you specify different values for different
prefixes, enabling complex template scenarios with multiple entities.

Each prefix in the template is identified by a namespace (e.g., `user`, `post`) followed by
a dot and the transformation tag (e.g., `#{user.lowerCase}`, `#{post.titleCase}`). This allows
for sophisticated template generation where different parts of the text need different source
values with various transformations applied.

This is particularly useful for generating complex messages, code templates, documentation,
or any text that involves multiple entities that need to be formatted differently within
the same template.

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

`str`

</td>
<td>

`string`

</td>
<td>

Template string containing namespaced transformation tags in the format
`#{prefix.transformationType}` where prefix matches keys in the prefixes object

</td>
</tr>
<tr>
<td>

`prefixes`

</td>
<td>

`Record`<`string`, `string`>

</td>
<td>

Object mapping prefix names to their corresponding values.
Each key becomes a namespace in the template, and the value
is the string that will be transformed according to the tags.

</td>
</tr>
</tbody>
</table>

#### Returns

`string`

The template string with all namespaced tags replaced by their transformed values

#### Examples

```typescript
// Multi-entity message generation
const message = applyTemplates(
  'User #{user.lowerCase} created a new #{entity.sentenceCase} titled "#{title.titleCase}"',
  {
    user: "JohnDoe",
    entity: "blogPost",
    title: "my first programming tutorial",
  },
);
// Returns: "User johndoe created a new Blog post titled "My First Programming Tutorial""
```

```typescript
// Code generation with multiple entities
const codeTemplate = applyTemplates(
  `class #{model.pascalCase} {
  constructor(private #{service.camelCase}: #{service.pascalCase}Service) {}

  async create#{model.pascalCase}(data: #{model.pascalCase}Data): Promise<#{model.pascalCase}> {
    return this.#{service.camelCase}.create(data);
  }
}`,
  {
    model: "user-profile",
    service: "database",
  },
);
// Generates a complete class with proper naming conventions
```

```typescript
// API documentation generation
const apiDoc = applyTemplates(
  `## #{endpoint.titleCase}

**URL:** \`/api/#{endpoint.kebabCase}\`
**Method:** #{method.upperCase}
**Model:** #{model.pascalCase}

Creates a new #{model.lowerCaseBreak} in the system.`,
  {
    endpoint: "userProfiles",
    method: "post",
    model: "UserProfile",
  },
);
```

```typescript
// Database migration script generation
const migration = applyTemplates(
  `CREATE TABLE #{table.snakeCase} (
  id SERIAL PRIMARY KEY,
  #{field.snakeCase} VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_#{table.snakeCase}_#{field.snakeCase} ON #{table.snakeCase}(#{field.snakeCase});`,
  {
    table: "UserProfiles",
    field: "emailAddress",
  },
);
```

#### Remarks

- Each prefix in the prefixes object becomes a namespace in the template
- Template tags must follow the format `#{prefix.transformationType}`
- All transformation types available in `applyTemplate` are supported
- If a prefixed tag is not found in the template, it's simply ignored
- The function processes all prefixes and their transformations in the order they appear
- Supports the same transformation types as the TemplateTag enum
- More flexible than `applyTemplate` but with slightly more complex syntax

#### See

- [applyTemplate](#applytemplate) For applying a single value to multiple transformation tags
- [TemplateTag](#templatetag) For the complete list of available transformation types

---

### breakToWords()

#### Call Signature

```ts
function breakToWords(str): string[];
```

Defined in: [utils/string.utils.ts:47](https://github.com/hichchidev/hichchi/blob/0b9a2445c124fc8574826bbe19e8d3e57d724a38/libs/utils/src/utils/string.utils.ts#L47)

Breaks a string into an array of words based on common separator patterns.

This function intelligently splits strings into individual words by detecting various
word boundary patterns, including:

- Camel case boundaries ("helloWorld" → \["hello", "world"])
- Snake case boundaries ("hello_world" → \["hello", "world"])
- Kebab case boundaries ("hello-world" → \["hello", "world"])
- Space-separated words ("hello world" → \["hello", "world"])
- Uppercase acronyms ("APIClient" → \["api", "client"])

The returned words are all converted to lowercase.

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

`str`

</td>
<td>

`string`

</td>
<td>

The string to split into words

</td>
</tr>
</tbody>
</table>

##### Returns

`string`\[]

- An array of lowercase words

##### Example

```typescript
breakToWords("helloWorld"); // ['hello', 'world']
breakToWords("hello_world"); // ['hello', 'world']
breakToWords("hello-world"); // ['hello', 'world']
breakToWords("hello world"); // ['hello', 'world']
breakToWords("APIConfig"); // ['api', 'config']
breakToWords("123Test456"); // ['123', 'test', '456']
```

##### Remarks

- Returns an empty array for empty, null, or undefined input
- Preserves numbers as separate words
- Handles consecutive uppercase letters as acronyms (preserving them as a single word)

#### Call Signature

```ts
function breakToWords(str, format): string;
```

Defined in: [utils/string.utils.ts:76](https://github.com/hichchidev/hichchi/blob/0b9a2445c124fc8574826bbe19e8d3e57d724a38/libs/utils/src/utils/string.utils.ts#L76)

Breaks a string into words and formats them using a provided function.

This overload splits a string into words using the same logic as the array version,
but additionally applies a formatting function to each word and joins them with spaces.

Common use cases include:

- Converting camelCase to Title Case
- Formatting identifiers for display
- Normalizing different string formats

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

`str`

</td>
<td>

`string`

</td>
<td>

The string to split and format

</td>
</tr>
<tr>
<td>

`format`

</td>
<td>

(`str`) => `string`

</td>
<td>

A function to apply to each word

</td>
</tr>
</tbody>
</table>

##### Returns

`string`

- A space-joined string of formatted words

##### Example

```typescript
// Convert camelCase to Sentence case
breakToWords("helloWorld", toFirstCase); // "Hello world"

// Convert snake_case to Title Case
breakToWords("user_profile_data", toFirstCase); // "User profile data"

// Format with a custom function
breakToWords("SYSTEM_ERROR", (word) => word.toLowerCase()); // "system error"
```

---

### countOccurrences()

```ts
function countOccurrences(str, searchValue, caseSensitive?): number;
```

Defined in: [utils/string.utils.ts:1288](https://github.com/hichchidev/hichchi/blob/0b9a2445c124fc8574826bbe19e8d3e57d724a38/libs/utils/src/utils/string.utils.ts#L1288)

Counts the occurrences of a substring within a string.

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`str`

</td>
<td>

`string`

</td>
<td>

`undefined`

</td>
<td>

The string to search within

</td>
</tr>
<tr>
<td>

`searchValue`

</td>
<td>

`string`

</td>
<td>

`undefined`

</td>
<td>

The substring to search for

</td>
</tr>
<tr>
<td>

`caseSensitive?`

</td>
<td>

`boolean`

</td>
<td>

`true`

</td>
<td>

Whether the search should be case-sensitive

</td>
</tr>
</tbody>
</table>

#### Returns

`number`

- The number of occurrences

#### Example

```typescript
countOccurrences("hello hello world", "hello"); // 2
countOccurrences("Hello hello", "hello", false); // 2
countOccurrences("Hello hello", "hello", true); // 1
```

---

### createExcerpt()

```ts
function createExcerpt(text, searchTerm, contextLength?, ellipsis?): string;
```

Defined in: [utils/string.utils.ts:721](https://github.com/hichchidev/hichchi/blob/0b9a2445c124fc8574826bbe19e8d3e57d724a38/libs/utils/src/utils/string.utils.ts#L721)

Creates an excerpt from a longer text by extracting a portion around a search term.
Useful for search result highlighting or previews.

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`text`

</td>
<td>

`string`

</td>
<td>

`undefined`

</td>
<td>

The full text to create an excerpt from

</td>
</tr>
<tr>
<td>

`searchTerm`

</td>
<td>

`string`

</td>
<td>

`undefined`

</td>
<td>

The search term to find in the text

</td>
</tr>
<tr>
<td>

`contextLength?`

</td>
<td>

`number`

</td>
<td>

`DEFAULT_CONTEXT_LENGTH`

</td>
<td>

Number of characters to include before and after the search term

</td>
</tr>
<tr>
<td>

`ellipsis?`

</td>
<td>

`string`

</td>
<td>

`DEFAULT_ELLIPSIS`

</td>
<td>

Characters to use for indicating truncated text

</td>
</tr>
</tbody>
</table>

#### Returns

`string`

- The excerpt with the search term in context

#### Example

```typescript
const article =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris.";

createExcerpt(article, "dolor", 10);
// "...ipsum dolor sit amet..."

createExcerpt(article, "consectetur", 15, "[...]");
// "[...]sit amet, consectetur adipiscing[...]"
```

---

### deepCopy()

```ts
function deepCopy<T>(obj): T;
```

Defined in: [utils/object.utils.ts:23](https://github.com/hichchidev/hichchi/blob/0b9a2445c124fc8574826bbe19e8d3e57d724a38/libs/utils/src/utils/object.utils.ts#L23)

Deep copy an object.

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

`T`

</td>
<td>

Type of the object.

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

`obj`

</td>
<td>

`T`

</td>
<td>

Object to copy.

</td>
</tr>
</tbody>
</table>

#### Returns

`T`

Copied object.

#### Example

```TypeScript
// Example usage
const object = {
   name: "John Doe"
}

const copiedObject = deepCopy(object);
```

---

### dottedPathObjectToNested()

```ts
function dottedPathObjectToNested<R>(pathValueSet): R;
```

Defined in: [utils/object.utils.ts:549](https://github.com/hichchidev/hichchi/blob/0b9a2445c124fc8574826bbe19e8d3e57d724a38/libs/utils/src/utils/object.utils.ts#L549)

Converts a flattened DottedPathValueObject back into a nested object structure.

This function is the inverse of `objectToDottedPathValueObject`. It takes a flat map of
dot-notation paths to values and reconstructs a hierarchical object structure.

Each key in the input DottedPathValueObject represents a path through the object hierarchy,
with dots separating each level. The function builds a nested object structure by
parsing these paths and placing values at the appropriate locations.

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

`R`

</td>
<td>

`object`

</td>
<td>

The type of the returned object (defaults to object)

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

`pathValueSet`

</td>
<td>

`Record`<`string`, `any`>

</td>
<td>

A flattened object with dot-notation path keys

</td>
</tr>
</tbody>
</table>

#### Returns

`R`

- A reconstructed nested object with the original hierarchy

#### Remarks

- Paths are validated for safety to prevent injection attacks
- Invalid paths are silently skipped (not included in the result)
- Path components should contain only alphanumeric characters, underscores, hyphens, and dots

#### See

- [objectToDottedPathValueObject](#objecttodottedpathvalueobject) The inverse operation to convert an object to DottedPathValueObject
- [DottedPathValueObject](#dottedpathvalueobject) The interface for the input flattened object

#### Examples

```typescript
// Convert a flat DottedPathValueObject to a nested object
const flatData = {
  "id": 123,
  "name": "John Doe",
  "profile.age": 30,
  "profile.address.city": "New York",
  "profile.address.zip": "10001"
};

const nestedObject = dottedPathObjectToNested(flatData);

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

```typescript
// Typed return value
interface User {
  id: number;
  name: string;
  profile: {
    age: number;
    address: {
      city: string;
      zip: string;
    };
  };
}

const userData = dottedPathObjectToNested<User>(flatData);
// Returns object with User type
```

---

### escapeRegExp()

```ts
function escapeRegExp(str): string;
```

Defined in: [utils/string.utils.ts:1134](https://github.com/hichchidev/hichchi/blob/0b9a2445c124fc8574826bbe19e8d3e57d724a38/libs/utils/src/utils/string.utils.ts#L1134)

Escapes special characters in a string for use in regular expressions.

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

`str`

</td>
<td>

`string`

</td>
<td>

The string to escape

</td>
</tr>
</tbody>
</table>

#### Returns

`string`

- The escaped string safe for use in RegExp

#### Example

```typescript
escapeRegExp("hello.world*"); // "hello\.world\*"

// Usage in RegExp:
const userInput = "hello.world*";
const regex = new RegExp(escapeRegExp(userInput));
```

---

### extractEmails()

```ts
function extractEmails(str): string[];
```

Defined in: [utils/string.utils.ts:456](https://github.com/hichchidev/hichchi/blob/0b9a2445c124fc8574826bbe19e8d3e57d724a38/libs/utils/src/utils/string.utils.ts#L456)

Extracts all email addresses from a string.

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

`str`

</td>
<td>

`string`

</td>
<td>

The string to extract emails from

</td>
</tr>
</tbody>
</table>

#### Returns

`string`\[]

- Array of found email addresses

#### Example

```typescript
extractEmails("Contact us at support@example.com or sales@example.com");
// ["support@example.com", "sales@example.com"]
```

---

### extractUrls()

```ts
function extractUrls(str): string[];
```

Defined in: [utils/string.utils.ts:475](https://github.com/hichchidev/hichchi/blob/0b9a2445c124fc8574826bbe19e8d3e57d724a38/libs/utils/src/utils/string.utils.ts#L475)

Extracts all URLs from a string.

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

`str`

</td>
<td>

`string`

</td>
<td>

The string to extract URLs from

</td>
</tr>
</tbody>
</table>

#### Returns

`string`\[]

- Array of found URLs

#### Example

```typescript
extractUrls("Visit https://example.com or http://test.org/page?id=5");
// ["https://example.com", "http://test.org/page?id=5"]
```

---

### filterByObject()

```ts
function filterByObject<T>(items, filters): T[];
```

Defined in: [utils/object.utils.ts:1082](https://github.com/hichchidev/hichchi/blob/0b9a2445c124fc8574826bbe19e8d3e57d724a38/libs/utils/src/utils/object.utils.ts#L1082)

Filters items by recursively matching nested property values.

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

`T`

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
</tr>
</thead>
<tbody>
<tr>
<td>

`items`

</td>
<td>

`T`\[]

</td>
</tr>
<tr>
<td>

`filters`

</td>
<td>

[`SimpleDeepPartial`](#simpledeeppartial)<`T`>

</td>
</tr>
</tbody>
</table>

#### Returns

`T`\[]

---

### format()

Implementation of the format function that handles both overloads.

#### Call Signature

```ts
function format(template, ...values): string;
```

Defined in: [utils/string.utils.ts:1220](https://github.com/hichchidev/hichchi/blob/0b9a2445c124fc8574826bbe19e8d3e57d724a38/libs/utils/src/utils/string.utils.ts#L1220)

Formats a string by replacing indexed placeholders with provided values.

This implementation uses {n} syntax for indexed placeholders where n is the
position of the value in the arguments list (0-based).

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

`template`

</td>
<td>

`string`

</td>
<td>

The template string with {0}, {1}, etc. placeholders

</td>
</tr>
<tr>
<td>

...`values`

</td>
<td>

(`string` | `number` | `boolean` | `null` | `undefined`)\[]

</td>
<td>

Values to insert into the template

</td>
</tr>
</tbody>
</table>

##### Returns

`string`

- The formatted string

##### Example

```typescript
format("Hello, {0}!", "World"); // "Hello, World!"

format("User {0} has {1} points", "John", 100);
// "User John has 100 points"
```

#### Call Signature

```ts
function format(template, values): string;
```

Defined in: [utils/string.utils.ts:1239](https://github.com/hichchidev/hichchi/blob/0b9a2445c124fc8574826bbe19e8d3e57d724a38/libs/utils/src/utils/string.utils.ts#L1239)

Formats a string by replacing named placeholders with values from an object.

This implementation uses {name} syntax for named placeholders where 'name'
corresponds to a property in the provided values object.

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

`template`

</td>
<td>

`string`

</td>
<td>

The template string with {propertyName} placeholders

</td>
</tr>
<tr>
<td>

`values`

</td>
<td>

`Record`<`string`, `string` | `number` | `boolean` | `null` | `undefined`>

</td>
<td>

Object with values to insert

</td>
</tr>
</tbody>
</table>

##### Returns

`string`

- The formatted string

##### Example

```typescript
// Named placeholders with object
format("Hello, {name}! You have {count} messages.", {
  name: "Alice",
  count: 5,
});
// "Hello, Alice! You have 5 messages."
```

---

### getEnumValues()

```ts
function getEnumValues<T>(e): T[keyof T][];
```

Defined in: [utils/object.utils.ts:1070](https://github.com/hichchidev/hichchi/blob/0b9a2445c124fc8574826bbe19e8d3e57d724a38/libs/utils/src/utils/object.utils.ts#L1070)

Extracts all values from a TypeScript enum, handling both string and numeric enum types correctly.

This utility function safely retrieves the actual values from TypeScript enums, accounting for
the different internal representations of string and numeric enums. For numeric enums, TypeScript
creates reverse mappings (value → key), so this function filters out the reverse mapping entries
to return only the actual enum values. For string enums, it returns all values directly.

This is particularly useful when you need to iterate over enum values, validate input against
enum values, create dropdown options from enums, or perform any operation that requires access
to the actual enum values rather than the keys.

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

`T` _extends_ `object`

</td>
<td>

The enum type extending object

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

`e`

</td>
<td>

`T`

</td>
<td>

The enum object to extract values from

</td>
</tr>
</tbody>
</table>

#### Returns

`T`\[keyof `T`]\[]

An array containing all the actual values of the enum

#### Examples

```typescript
// String enum example
enum Color {
  RED = "red",
  GREEN = "green",
  BLUE = "blue",
}

const colorValues = getEnumValues(Color);
// Returns: ["red", "green", "blue"]

// Use for validation
function isValidColor(value: string): value is Color {
  return getEnumValues(Color).includes(value as Color);
}
```

```typescript
// Numeric enum example
enum Status {
  PENDING, // 0
  APPROVED, // 1
  REJECTED, // 2
}

const statusValues = getEnumValues(Status);
// Returns: [0, 1, 2] (not ["PENDING", "APPROVED", "REJECTED", 0, 1, 2])

// Use for creating select options
const statusOptions = getEnumValues(Status).map((value) => ({
  value,
  label: Status[value], // Get the key name for display
}));
```

```typescript
// Mixed numeric enum example
enum HttpStatus {
  OK = 200,
  NOT_FOUND = 404,
  SERVER_ERROR = 500,
}

const httpStatusValues = getEnumValues(HttpStatus);
// Returns: [200, 404, 500]

// Use for status code validation
function isValidHttpStatus(code: number): code is HttpStatus {
  return getEnumValues(HttpStatus).includes(code as HttpStatus);
}
```

```typescript
// Creating dropdown options from enum
enum UserRole {
  ADMIN = "admin",
  USER = "user",
  MODERATOR = "moderator",
}

const roleOptions = getEnumValues(UserRole).map((role) => ({
  value: role,
  label: role.charAt(0).toUpperCase() + role.slice(1),
}));
// Returns: [
//   { value: "admin", label: "Admin" },
//   { value: "user", label: "User" },
//   { value: "moderator", label: "Moderator" }
// ]
```

#### Remarks

- Automatically detects numeric vs string enums and handles them appropriately
- For numeric enums, filters out reverse mapping entries that TypeScript automatically creates
- For string enums, returns all values as-is since there are no reverse mappings
- Works with mixed numeric enums (enums with explicit numeric values)
- The returned array maintains the order of enum declaration
- Type-safe: the return type is correctly inferred as an array of the enum's value types

#### See

Object.values The underlying method used to extract enum entries

---

### getFileExt()

```ts
function getFileExt(mimeType, allowedMimeTypes?): string | undefined;
```

Defined in: [utils/file.utils.ts:1265](https://github.com/hichchidev/hichchi/blob/0b9a2445c124fc8574826bbe19e8d3e57d724a38/libs/utils/src/utils/file.utils.ts#L1265)

Get the file extension of the given mime type.

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

`mimeType`

</td>
<td>

`string`

</td>
<td>

Mime type.

</td>
</tr>
<tr>
<td>

`allowedMimeTypes?`

</td>
<td>

`Map`<`string`, `string`>

</td>
<td>

Allowed mime types. If not provided, the default mime types map will be used.

</td>
</tr>
</tbody>
</table>

#### Returns

`string` | `undefined`

File extension or undefined if the mime type is not found.

#### Examples

```TypeScript
// Using the default mime types map
const extension = getFileExt('application/pdf');
// Output: 'pdf'
```

```TypeScript
// Using a custom mime types map
const customMimeTypes = new Map([
  ['jpg', 'image/jpeg'],
  ['png', 'image/png']
]);
const extension = getFileExt('image/jpeg', customMimeTypes);
// Output: 'jpg'
```

---

### getFileSize()

```ts
function getFileSize(size, round?): string;
```

Defined in: [utils/file.utils.ts:1296](https://github.com/hichchidev/hichchi/blob/0b9a2445c124fc8574826bbe19e8d3e57d724a38/libs/utils/src/utils/file.utils.ts#L1296)

Get file size in human-readable format.

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

`size`

</td>
<td>

`number`

</td>
<td>

File size in bytes.

</td>
</tr>
<tr>
<td>

`round?`

</td>
<td>

`boolean`

</td>
<td>

Whether to round the size to whole numbers. If true, decimals will be removed.

</td>
</tr>
</tbody>
</table>

#### Returns

`string`

File size in human-readable format (B, KB, MB, or GB).

#### Examples

```TypeScript
// Get file size with decimals
const readableSize = getFileSize(1536);
// Output: '1.50 KB'
```

```TypeScript
// Get rounded file size
const roundedSize = getFileSize(1536, true);
// Output: '2 KB'
```

```TypeScript
// Get size for larger files
const largeFileSize = getFileSize(1073741824);
// Output: '1.00 GB'
```

---

### getMapKey()

```ts
function getMapKey(map, value): string | undefined;
```

Defined in: [utils/object.utils.ts:53](https://github.com/hichchidev/hichchi/blob/0b9a2445c124fc8574826bbe19e8d3e57d724a38/libs/utils/src/utils/object.utils.ts#L53)

Get the key of a map by value.

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

`map`

</td>
<td>

`Map`<`string`, `unknown`>

</td>
<td>

Map to get key from.

</td>
</tr>
<tr>
<td>

`value`

</td>
<td>

`unknown`

</td>
<td>

Value to get key for.

</td>
</tr>
</tbody>
</table>

#### Returns

`string` | `undefined`

Key of the map.

#### Example

```TypeScript
// Example usage
const user = new Map<string, string>([
    ["firstName", "John"],
    ["lastName", "Doe"],
    ["preferredName", "John"],
    ["age", 30],
]);

const key = getMapKey(user, "value2");

// Example output: "firstName"
```

---

### getMapKeys()

```ts
function getMapKeys(map, partialValue): string[];
```

Defined in: [utils/object.utils.ts:122](https://github.com/hichchidev/hichchi/blob/0b9a2445c124fc8574826bbe19e8d3e57d724a38/libs/utils/src/utils/object.utils.ts#L122)

Retrieves all keys from a Map where the corresponding values contain a specified substring.

This utility function searches through a Map's values and returns an array of keys
whose associated values include the provided partial string. The search is case-sensitive
and uses JavaScript's native string.includes() method for matching.

This is particularly useful for implementing search functionality, filtering operations,
or finding related entries in configuration maps, user preference stores, or any
key-value data structure where you need to locate entries by partial value matching.

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

`map`

</td>
<td>

`Map`<`string`, `string`>

</td>
<td>

The Map to search through for matching values

</td>
</tr>
<tr>
<td>

`partialValue`

</td>
<td>

`string`

</td>
<td>

The substring to search for within the Map's values

</td>
</tr>
</tbody>
</table>

#### Returns

`string`\[]

An array of keys whose corresponding values contain the partial value

#### Examples

```typescript
// Search user preferences for entries containing "John"
const userPreferences = new Map<string, string>([
  ["displayName", "John Doe"],
  ["firstName", "John"],
  ["lastName", "Doe"],
  ["preferredName", "Johnny"],
  ["email", "john.doe@example.com"],
]);

const johnKeys = getMapKeys(userPreferences, "John");
// Returns: ["displayName", "firstName", "email"]
```

```typescript
// Find configuration keys related to database settings
const config = new Map<string, string>([
  ["db_host", "localhost"],
  ["db_port", "5432"],
  ["cache_host", "redis-server"],
  ["db_name", "myapp_database"],
  ["log_level", "debug"],
]);

const dbKeys = getMapKeys(config, "db");
// Returns: ["db_name"] (only values containing "db", not keys)
```

```typescript
// Search in a translations map
const translations = new Map<string, string>([
  ["welcome_message", "Welcome to our application"],
  ["error_message", "An error occurred"],
  ["success_message", "Operation completed successfully"],
  ["info_message", "Please check your information"],
]);

const messageKeys = getMapKeys(translations, "message");
// Returns: ["welcome_message", "error_message", "success_message", "info_message"]
```

#### Remarks

- The search is case-sensitive; "John" will not match "john"
- Returns an empty array if no matches are found
- The function iterates through all Map entries, so performance scales with Map size
- Only works with Maps that have string values; other value types will cause runtime errors

---

### getValueByPath()

```ts
function getValueByPath<T>(obj, path): T | undefined;
```

Defined in: [utils/object.utils.ts:379](https://github.com/hichchidev/hichchi/blob/0b9a2445c124fc8574826bbe19e8d3e57d724a38/libs/utils/src/utils/object.utils.ts#L379)

Gets a value from a nested object using a dot-notation path string.

This function safely traverses a deeply nested object structure using a string path
with dot notation. It handles both object properties and array indices within the path.

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

`T`

</td>
<td>

Type of the value to be returned.

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

`obj`

</td>
<td>

[`InfiniteObject`](#infiniteobject)

</td>
<td>

The object to retrieve the value from.

</td>
</tr>
<tr>
<td>

`path`

</td>
<td>

`string`

</td>
<td>

The dot-notation path to the desired value.

- Use dots to navigate through nested objects: 'user.profile.address'
- Use array notation for accessing array elements: 'items\[0]' or 'users\[2].name'

</td>
</tr>
</tbody>
</table>

#### Returns

`T` | `undefined`

- The value at the specified path, or undefined if:
  - Any part of the path doesn't exist
  - An array index is out of bounds
  - The path format is invalid

#### Examples

```typescript
// Simple nested object property
const user = {
  profile: {
    name: "John Doe",
    contact: { email: "john@example.com" },
  },
};
const email = getValueByPath<string>(user, "profile.contact.email");
// Returns: "john@example.com"
```

```typescript
// Accessing array elements
const data = {
  users: [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
  ],
};
const name = getValueByPath<string>(data, "users[1].name");
// Returns: "Bob"
```

---

### groupBy()

```ts
function groupBy<K, V>(list, keyGetter): Map<K, V[]>;
```

Defined in: [utils/object.utils.ts:237](https://github.com/hichchidev/hichchi/blob/0b9a2445c124fc8574826bbe19e8d3e57d724a38/libs/utils/src/utils/object.utils.ts#L237)

Groups an array of objects into a Map based on a key extraction function.

This utility function takes an array of objects and organizes them into groups
based on a common key or property. The grouping is performed using a key extraction
function that you provide, which determines how each object should be categorized.
The result is a Map where each key represents a group and the value is an array
of objects belonging to that group.

This is particularly useful for data analysis, reporting, organizing collections
for display purposes, or preparing data for further processing where items need
to be categorized by shared characteristics.

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

`K`

</td>
<td>

The type of the grouping key (can be string, number, boolean, etc.)

</td>
</tr>
<tr>
<td>

`V`

</td>
<td>

The type of the objects being grouped

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

`list`

</td>
<td>

`V`\[]

</td>
<td>

The array of objects to group

</td>
</tr>
<tr>
<td>

`keyGetter`

</td>
<td>

(`input`) => `K`

</td>
<td>

A function that extracts the grouping key from each object.
This function receives an object and should return the value
to group by. If the function returns null or undefined,
the object will be grouped under a null key.

</td>
</tr>
</tbody>
</table>

#### Returns

`Map`<`K`, `V`\[]>

A Map where keys are the grouping values and values are arrays
of objects that share that grouping key

#### Examples

```typescript
// Group users by age
interface User {
  name: string;
  age: number;
  department: string;
}

const users: User[] = [
  { name: "John", age: 30, department: "Engineering" },
  { name: "Jane", age: 25, department: "Marketing" },
  { name: "Bob", age: 30, department: "Engineering" },
  { name: "Alice", age: 25, department: "Sales" },
  { name: "Charlie", age: 35, department: "Engineering" },
];

const usersByAge = groupBy(users, (user) => user.age);
// Returns:
// Map {
//   30 => [
//     { name: "John", age: 30, department: "Engineering" },
//     { name: "Bob", age: 30, department: "Engineering" }
//   ],
//   25 => [
//     { name: "Jane", age: 25, department: "Marketing" },
//     { name: "Alice", age: 25, department: "Sales" }
//   ],
//   35 => [
//     { name: "Charlie", age: 35, department: "Engineering" }
//   ]
// }
```

```typescript
// Group products by category
interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
}

const products: Product[] = [
  { id: 1, name: "Laptop", category: "Electronics", price: 999 },
  { id: 2, name: "Book", category: "Education", price: 29 },
  { id: 3, name: "Phone", category: "Electronics", price: 699 },
  { id: 4, name: "Pen", category: "Office", price: 5 },
];

const productsByCategory = groupBy(products, (product) => product.category);
// Useful for creating category-based product listings
```

```typescript
// Group tasks by completion status with boolean keys
interface Task {
  id: number;
  title: string;
  completed: boolean;
}

const tasks: Task[] = [
  { id: 1, title: "Review code", completed: true },
  { id: 2, title: "Write tests", completed: false },
  { id: 3, title: "Deploy app", completed: true },
  { id: 4, title: "Update docs", completed: false },
];

const tasksByStatus = groupBy(tasks, (task) => task.completed);
// Returns Map with boolean keys: true and false
```

#### Remarks

- The function preserves the original order of objects within each group
- If the keyGetter function returns null or undefined, those objects will be grouped under a null key
- The Map structure allows for efficient lookups and iteration over groups
- Works with any type of grouping key (string, number, boolean, objects, etc.)
- Empty arrays will return an empty Map

---

### hashString()

```ts
function hashString(str): Promise<string>;
```

Defined in: [utils/string.utils.ts:499](https://github.com/hichchidev/hichchi/blob/0b9a2445c124fc8574826bbe19e8d3e57d724a38/libs/utils/src/utils/string.utils.ts#L499)

Converts a string to a secure hash using SHA-256.

Note: This is a browser-compatible implementation using the Web Crypto API.
For Node.js environments, you might want to use the crypto module instead.

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

`str`

</td>
<td>

`string`

</td>
<td>

The string to hash

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`<`string`>

- Promise resolving to the hex hash string

#### Example

```typescript
// Browser usage
await hashString("password123");
// "ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f"
```

---

### hasOwnAll()

```ts
function hasOwnAll(obj, props): boolean;
```

Defined in: [utils/object.utils.ts:965](https://github.com/hichchidev/hichchi/blob/0b9a2445c124fc8574826bbe19e8d3e57d724a38/libs/utils/src/utils/object.utils.ts#L965)

Checks if an object has all specified properties as its own properties (not inherited).

This utility function verifies that an object contains all the properties listed in the
provided array as direct (own) properties, not inherited from the prototype chain.
It uses the modern Object.hasOwn() method for reliable property existence checking,
making it safer than using hasOwnProperty() directly.

This is particularly useful for validating object structures, ensuring required properties
exist before processing, implementing type guards, or verifying that objects conform to
expected interfaces. It's commonly used in data validation, API request validation,
and ensuring objects have all necessary properties before performing operations.

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

`obj`

</td>
<td>

`Record`<`PropertyKey`, `unknown`>

</td>
<td>

The object to check for property existence

</td>
</tr>
<tr>
<td>

`props`

</td>
<td>

`PropertyKey`\[]

</td>
<td>

Array of property keys to verify exist on the object.
PropertyKey includes string, number, and symbol types.

</td>
</tr>
</tbody>
</table>

#### Returns

`boolean`

True if the object has all specified properties as own properties, false otherwise

#### Examples

```typescript
// Validate that a user object has required properties
interface User {
  id: number;
  name: string;
  email: string;
}

const user = {
  id: 123,
  name: "John Doe",
  email: "john@example.com",
  role: "admin",
};

const hasRequiredProps = hasOwnAll(user, ["id", "name", "email"]);
// Returns: true

const hasAllProps = hasOwnAll(user, ["id", "name", "email", "phone"]);
// Returns: false (missing 'phone' property)
```

```typescript
// Validate API request payload
function processUserUpdate(payload: unknown): User | null {
  if (typeof payload === "object" && payload !== null) {
    const requiredFields = ["id", "name", "email"];

    if (hasOwnAll(payload as Record<string, unknown>, requiredFields)) {
      // Safe to process as we know all required fields exist
      return updateUser(payload as User);
    }
  }

  throw new Error("Invalid payload: missing required fields");
}
```

```typescript
// Check configuration object completeness
interface DatabaseConfig {
  host: string;
  port: number;
  database: string;
  username: string;
  password: string;
}

const config = {
  host: "localhost",
  port: 5432,
  database: "myapp",
  username: "admin",
  // password is missing
};

const requiredConfigKeys = ["host", "port", "database", "username", "password"];
const isConfigComplete = hasOwnAll(config, requiredConfigKeys);
// Returns: false

if (!isConfigComplete) {
  throw new Error("Database configuration is incomplete");
}
```

```typescript
// Work with symbol properties
const symbolKey = Symbol("secret");
const obj = {
  name: "test",
  [symbolKey]: "hidden value",
};

const hasSymbolProp = hasOwnAll(obj, ["name", symbolKey]);
// Returns: true
```

#### Remarks

- Uses Object.hasOwn() which is more reliable than hasOwnProperty()
- Only checks for own properties, not inherited properties from the prototype chain
- Returns false immediately if any property is missing (short-circuit evaluation)
- Works with string, number, and symbol property keys
- Returns true for an empty properties array (vacuous truth)
- Does not check property values, only existence

#### See

Object.hasOwn The underlying method used for property checking

---

### htmlToText()

```ts
function htmlToText(str): string;
```

Defined in: [utils/string.utils.ts:1001](https://github.com/hichchidev/hichchi/blob/0b9a2445c124fc8574826bbe19e8d3e57d724a38/libs/utils/src/utils/string.utils.ts#L1001)

Remove HTML tags from a string and return plain text.

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

`str`

</td>
<td>

`string`

</td>
<td>

String to remove HTML tags from.

</td>
</tr>
</tbody>
</table>

#### Returns

`string`

Plain text.

#### Example

```TypeScript
htmlToText("<h1>Hello World</h1>"); // "Hello World"
```

---

### isAlphanumeric()

```ts
function isAlphanumeric(str): boolean;
```

Defined in: [utils/string.utils.ts:1325](https://github.com/hichchidev/hichchi/blob/0b9a2445c124fc8574826bbe19e8d3e57d724a38/libs/utils/src/utils/string.utils.ts#L1325)

Checks if a string contains only alphanumeric characters.

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

`str`

</td>
<td>

`string`

</td>
<td>

The string to check

</td>
</tr>
</tbody>
</table>

#### Returns

`boolean`

- True if the string contains only alphanumeric characters

#### Example

```typescript
isAlphanumeric("abc123"); // true
isAlphanumeric("abc-123"); // false
```

---

### isArray()

```ts
function isArray<T>(value): value is T[];
```

Defined in: [utils/assertions.utils.ts:42](https://github.com/hichchidev/hichchi/blob/0b9a2445c124fc8574826bbe19e8d3e57d724a38/libs/utils/src/utils/assertions.utils.ts#L42)

Type-safe utility to check if a value is an array of a specific type.

This function acts as a type guard that not only checks if the provided value
is an array (using the native Array.isArray method), but also narrows the TypeScript
type to an array of the generic type T. This enables safer handling of potentially
array-typed values with full type inference in the conditional branches.

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

`T`

</td>
<td>

The expected element type of the array

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

`value`

</td>
<td>

`T` | `T`\[] | `undefined`

</td>
<td>

The value to check, which could be a single item,
an array of items, or undefined

</td>
</tr>
</tbody>
</table>

#### Returns

`value is T[]`

Type predicate that narrows the type to T\[] when true

#### Remarks

While this function essentially wraps Array.isArray, its value comes from the
TypeScript type narrowing it provides, making it especially useful in code that
needs to handle both single items and collections of items with type safety.

The function properly handles undefined values by returning false, making it safe
to use with optional parameters or potentially undefined values.

#### Example

```typescript
// Function that can accept either a single user or multiple users
async function createUser(
  userOrUsers: UserDto | UserDto[] | undefined,
): Promise<User | User[]> {
  // TypeScript knows userOrUsers is UserDto[] in this branch
  if (isArray<UserDto>(userOrUsers)) {
    return Promise.all(userOrUsers.map((user) => userService.createUser(user)));
  }
  // TypeScript knows userOrUsers is UserDto or undefined in this branch
  else if (userOrUsers) {
    return userService.createUser(userOrUsers);
  } else {
    throw new BadRequestException("User data is required");
  }
}
```

---

### isObject()

```ts
function isObject<T>(value?): value is T;
```

Defined in: [utils/assertions.utils.ts:91](https://github.com/hichchidev/hichchi/blob/0b9a2445c124fc8574826bbe19e8d3e57d724a38/libs/utils/src/utils/assertions.utils.ts#L91)

Type-safe utility to check if a value is a non-array object of a specific type.

This function serves as a type guard that checks if the provided value is an object
(but not an array) and narrows the TypeScript type to the generic type T. It properly
excludes null, arrays, and primitive values, focusing only on object instances.

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

`T`

</td>
<td>

The expected object type to narrow to when the check passes

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

`value?`

</td>
<td>

`T` | `T`\[]

</td>
<td>

The value to check, which could be a single object,
an array of objects, or undefined

</td>
</tr>
</tbody>
</table>

#### Returns

`value is T`

Type predicate that narrows the type to T when true

#### Remarks

This function performs three checks to ensure the value is a proper object:

1. It's not an array (using Array.isArray)
2. It's of type "object" according to JavaScript's typeof operator
3. It's not null (which would pass the typeof check but isn't a valid object)

This is particularly useful when handling parameters that could be either an object
or a simpler identifier (like an ID), allowing for type-safe conditional logic.

#### Example

```typescript
// Function that can accept either a user ID or a user object
async function getUserInfo(
  userIdOrUser: number | User | undefined,
): Promise<UserInfo> {
  // TypeScript knows userIdOrUser is User in this branch
  if (isObject<User>(userIdOrUser)) {
    // Can safely access object properties
    return await userService.getUserInfo(userIdOrUser.id);
  }
  // TypeScript knows userIdOrUser is number or undefined in this branch
  else {
    return await userService.getUserInfo(userIdOrUser);
  }
}

// Works with optional parameters too
function formatUserName(user?: User | string): string {
  if (isObject<User>(user)) {
    return `${user.firstName} ${user.lastName}`;
  }
  return user || "Guest";
}
```

---

### isObjectWith()

```ts
function isObjectWith<T>(value, propertyName): value is T;
```

Defined in: [utils/assertions.utils.ts:158](https://github.com/hichchidev/hichchi/blob/0b9a2445c124fc8574826bbe19e8d3e57d724a38/libs/utils/src/utils/assertions.utils.ts#L158)

Type-safe utility to check if a value is an object with a specific property.

This function acts as a type guard that determines if an unknown value is an object
that contains a specified property, and narrows the TypeScript type to the generic
type T when true. This provides a robust way to implement duck typing in TypeScript,
allowing for safe property access in the conditional branches.

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

`T` _extends_ `object`

</td>
<td>

The expected object type that should contain the property

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

`value`

</td>
<td>

`unknown`

</td>
<td>

Any value to check, with no type constraints

</td>
</tr>
<tr>
<td>

`propertyName`

</td>
<td>

keyof `T`

</td>
<td>

The name of the property that should exist on the object

</td>
</tr>
</tbody>
</table>

#### Returns

`value is T`

Type predicate that narrows the type to T when true

#### Remarks

This function uses Object.prototype.hasOwnProperty.call to safely check for property
existence, even if the object has a custom implementation of hasOwnProperty or if the
property is named 'hasOwnProperty'.

Unlike the simpler isObject utility, this function can distinguish between different
object types based on their properties, making it ideal for discriminating between
different interface implementations or handling union types.

#### Example

```typescript
// Check if an object has the properties of a User interface
interface User {
  id: number;
  name: string;
}

interface Order {
  orderNumber: string;
  items: string[];
}

// Function that can handle different object types
function processEntity(entity: unknown): void {
  // Check if entity has 'id' property, indicating it's a User
  if (isObjectWith<User>(entity, "id")) {
    // TypeScript knows entity is User in this branch
    console.log(`Processing user: ${entity.name}`);
  }
  // Check if entity has 'orderNumber' property, indicating it's an Order
  else if (isObjectWith<Order>(entity, "orderNumber")) {
    // TypeScript knows entity is Order in this branch
    console.log(
      `Processing order: ${entity.orderNumber} with ${entity.items.length} items`,
    );
  } else {
    console.log("Unknown entity type");
  }
}

// Useful for API responses where types may vary
async function handleResponse(response: unknown): Promise<void> {
  if (isObjectWith<ErrorResponse>(response, "errorCode")) {
    throw new ApiException(response.errorCode, response.message);
  } else if (isObjectWith<SuccessResponse>(response, "data")) {
    await processData(response.data);
  }
}
```

---

### isValidRedirectUrl()

```ts
function isValidRedirectUrl(url, allowedDomains): boolean;
```

Defined in: [utils/url.utils.ts:100](https://github.com/hichchidev/hichchi/blob/0b9a2445c124fc8574826bbe19e8d3e57d724a38/libs/utils/src/utils/url.utils.ts#L100)

Validates if a redirect URL is allowed based on a whitelist of permitted domains.

This security utility function checks whether a given URL's domain is included in a list
of allowed domains, helping prevent open redirect vulnerabilities. It supports both exact
domain matching and subdomain matching, where a URL's hostname must either exactly match
an allowed domain or be a subdomain of an allowed domain.

This is essential for secure redirect functionality in web applications, preventing
attackers from redirecting users to malicious external sites. It's commonly used in
authentication flows, logout redirects, and any feature that accepts user-provided
redirect URLs.

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

`url`

</td>
<td>

`string`

</td>
<td>

The URL to validate. Must be a valid URL string that can be parsed
by the URL constructor. Can include protocol, path, query parameters, etc.

</td>
</tr>
<tr>
<td>

`allowedDomains`

</td>
<td>

`string`\[]

</td>
<td>

Array of domain names that are permitted for redirects.
Domains should be specified without protocol (e.g., "example.com").
Subdomains of these domains will also be allowed.

</td>
</tr>
</tbody>
</table>

#### Returns

`boolean`

True if the URL's hostname matches or is a subdomain of any allowed domain,
false if the domain is not allowed or if the URL is invalid

#### Examples

```typescript
// Basic domain validation
const allowedDomains = ["example.com", "myapp.com"];

const isValid1 = isValidRedirectUrl(
  "https://example.com/dashboard",
  allowedDomains,
);
// Returns: true (exact domain match)

const isValid2 = isValidRedirectUrl(
  "https://api.example.com/callback",
  allowedDomains,
);
// Returns: true (subdomain of allowed domain)

const isValid3 = isValidRedirectUrl(
  "https://malicious.com/phishing",
  allowedDomains,
);
// Returns: false (domain not in allowed list)
```

```typescript
// Authentication redirect validation
function handleAuthRedirect(redirectUrl: string): void {
  const trustedDomains = [
    "myapp.com",
    "admin.myapp.com",
    "localhost", // for development
  ];

  if (isValidRedirectUrl(redirectUrl, trustedDomains)) {
    window.location.href = redirectUrl;
  } else {
    // Redirect to safe default instead
    window.location.href = "/dashboard";
    console.warn("Attempted redirect to untrusted domain:", redirectUrl);
  }
}
```

```typescript
// API endpoint validation
app.post("/auth/login", (req, res) => {
  const { username, password, redirectUrl } = req.body;

  if (authenticateUser(username, password)) {
    const allowedDomains = ["myapp.com", "partner.com"];

    if (redirectUrl && isValidRedirectUrl(redirectUrl, allowedDomains)) {
      res.json({ success: true, redirectUrl });
    } else {
      res.json({ success: true, redirectUrl: "/dashboard" });
    }
  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
});
```

```typescript
// Complex subdomain scenarios
const domains = ["company.com"];

isValidRedirectUrl("https://app.company.com", domains); // true
isValidRedirectUrl("https://api.app.company.com", domains); // true
isValidRedirectUrl("https://company.com.evil.com", domains); // false
isValidRedirectUrl("https://fakecompany.com", domains); // false
```

#### Remarks

- Uses the native URL constructor for reliable URL parsing
- Supports both exact domain matches and subdomain matches
- Returns false for invalid URLs that cannot be parsed
- Domain matching is case-insensitive (handled by URL constructor)
- Does not validate the protocol - focuses only on hostname validation
- Subdomain matching uses endsWith() to ensure proper domain boundaries
- Empty or null URL strings will cause the function to return false

#### Throws

This function catches all URL parsing errors and returns false instead of throwing

---

### maskString()

```ts
function maskString(str, visibleStart?, visibleEnd?, maskChar?): string;
```

Defined in: [utils/string.utils.ts:584](https://github.com/hichchidev/hichchi/blob/0b9a2445c124fc8574826bbe19e8d3e57d724a38/libs/utils/src/utils/string.utils.ts#L584)

Masks a portion of a string, useful for displaying sensitive information.

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`str`

</td>
<td>

`string`

</td>
<td>

`undefined`

</td>
<td>

The string to mask

</td>
</tr>
<tr>
<td>

`visibleStart?`

</td>
<td>

`number`

</td>
<td>

`0`

</td>
<td>

Number of characters to show at the beginning

</td>
</tr>
<tr>
<td>

`visibleEnd?`

</td>
<td>

`number`

</td>
<td>

`0`

</td>
<td>

Number of characters to show at the end

</td>
</tr>
<tr>
<td>

`maskChar?`

</td>
<td>

`string`

</td>
<td>

`"*"`

</td>
<td>

Character to use for masking

</td>
</tr>
</tbody>
</table>

#### Returns

`string`

- The masked string

#### Example

```typescript
// Mask credit card
maskString("4111111111111111", 4, 4);
// "4111********1111"

// Mask email
maskString("user@example.com", 2, 4, "x");
// "usxxxxxx.com"

// Mask phone number
maskString("+1-555-123-4567", 0, 4);
// "*********4567"
```

---

### normalizeString()

```ts
function normalizeString(str): string;
```

Defined in: [utils/string.utils.ts:767](https://github.com/hichchidev/hichchi/blob/0b9a2445c124fc8574826bbe19e8d3e57d724a38/libs/utils/src/utils/string.utils.ts#L767)

Normalizes a string by removing accents, diacritics, and converting to lowercase.

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

`str`

</td>
<td>

`string`

</td>
<td>

The string to normalize

</td>
</tr>
</tbody>
</table>

#### Returns

`string`

- The normalized string

#### Example

```typescript
normalizeString("Café"); // "cafe"
normalizeString("Über"); // "uber"
normalizeString("résumé"); // "resume"
normalizeString("ESPAÑA"); // "espana"
```

---

### objectToDottedPathValueObject()

```ts
function objectToDottedPathValueObject(obj): DottedPathValueObject;
```

Defined in: [utils/object.utils.ts:460](https://github.com/hichchidev/hichchi/blob/0b9a2445c124fc8574826bbe19e8d3e57d724a38/libs/utils/src/utils/object.utils.ts#L460)

Converts a nested object into a flattened DottedPathValueObject representation.

This function transforms a hierarchical object structure into a flat key-value map
where keys represent paths to values in the original object using dot notation.

The function recursively traverses the object and flattens nested properties,
converting object hierarchies like `{ user: { name: 'John' } }` into
path-based entries like `{ 'user.name': 'John' }`.

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

`obj`

</td>
<td>

[`LiteralObject`](#literalobject)

</td>
<td>

The nested object to flatten

</td>
</tr>
</tbody>
</table>

#### Returns

[`DottedPathValueObject`](#dottedpathvalueobject)

- A flattened representation where:
  - Keys are dot-notation paths to values in the original object
  - Values are primitive values (strings, numbers, booleans) from the original object

#### Remarks

- Array values will be preserved as-is (not flattened into separate paths)
- Only primitive values (string, number, boolean) are supported as leaf values
- Circular references are not handled and will cause a stack overflow

#### See

- [dottedPathObjectToNested](#dottedpathobjecttonested) The inverse operation to convert a DottedPathValueObject back to a nested object
- [DottedPathValueObject](#dottedpathvalueobject) The interface for the returned flattened object

#### Example

```typescript
// Flatten a nested user object
const user = {
  id: 123,
  name: "John Doe",
  isActive: true,
  profile: {
    age: 30,
    address: {
      city: "New York",
      zip: "10001",
    },
  },
};

const flattened = objectToDottedPathValueObject(user);

// Result:
// {
//   "id": 123,
//   "name": "John Doe",
//   "isActive": true,
//   "profile.age": 30,
//   "profile.address.city": "New York",
//   "profile.address.zip": "10001"
// }
```

---

### omit()

```ts
function omit<T>(obj, keys?): Partial<T>;
```

Defined in: [utils/object.utils.ts:683](https://github.com/hichchidev/hichchi/blob/0b9a2445c124fc8574826bbe19e8d3e57d724a38/libs/utils/src/utils/object.utils.ts#L683)

Creates a new object by omitting specified properties and undefined values from the original object.

This utility function performs a selective copy of an object, excluding both explicitly
specified properties and any properties with undefined values. The function modifies
the original object in-place by deleting the unwanted properties, making it useful for
cleaning up objects before serialization, API calls, or data processing.

This is particularly useful for preparing data for API requests where you need to remove
sensitive fields, clean up form data, or exclude certain properties from being sent to
external services. It's also helpful for removing undefined values that might cause
issues in JSON serialization or database operations.

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

`T` _extends_ `object`

</td>
<td>

The type of the object being processed

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

`obj`

</td>
<td>

`Partial`<`T`>

</td>
<td>

The object to process and remove properties from.
This object will be modified in-place.

</td>
</tr>
<tr>
<td>

`keys?`

</td>
<td>

keyof `T`\[]

</td>
<td>

Optional array of property keys to omit from the object.
If not provided, only undefined properties will be removed.

</td>
</tr>
</tbody>
</table>

#### Returns

`Partial`<`T`>

The same object reference with specified properties and undefined values removed

#### Examples

```typescript
// Remove specific properties and undefined values
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  address?: string;
  phone?: string;
}

const user: Partial<User> = {
  id: 123,
  name: "John Doe",
  email: "john@example.com",
  role: "admin",
  address: undefined,
  phone: "555-0123",
};

const cleanUser = omit(user, ["role"]);
// Returns: { id: 123, name: "John Doe", email: "john@example.com", phone: "555-0123" }
// Note: 'role' and 'address' (undefined) are removed
```

```typescript
// Remove only undefined values (no specific keys)
const formData = {
  firstName: "John",
  lastName: "Doe",
  middleName: undefined,
  email: "john@example.com",
  phone: undefined,
};

const cleanFormData = omit(formData);
// Returns: { firstName: "John", lastName: "Doe", email: "john@example.com" }
```

```typescript
// Prepare data for API request by removing sensitive fields
interface UserProfile {
  id: number;
  username: string;
  email: string;
  password: string;
  internalNotes: string;
  createdAt: Date;
}

const userProfile: Partial<UserProfile> = {
  id: 1,
  username: "johndoe",
  email: "john@example.com",
  password: "secret123",
  internalNotes: "VIP customer",
  createdAt: new Date(),
};

const publicProfile = omit(userProfile, ["password", "internalNotes"]);
// Safe to send to client: { id: 1, username: "johndoe", email: "john@example.com", createdAt: Date }
```

#### Remarks

- This function modifies the original object in-place rather than creating a copy
- Both explicitly specified keys and undefined properties are removed
- If the input object is falsy (null, undefined), it's returned as-is
- The function uses delete operator, which may affect object performance in some JavaScript engines
- Properties with null values are preserved (only undefined values are automatically removed)

#### See

[prune](#prune) Function for more comprehensive object cleaning including null and empty values

---

### padString()

```ts
function padString(str, length, char?, padEnd?): string;
```

Defined in: [utils/string.utils.ts:1111](https://github.com/hichchidev/hichchi/blob/0b9a2445c124fc8574826bbe19e8d3e57d724a38/libs/utils/src/utils/string.utils.ts#L1111)

Pads a string to a specified length with a specified character.

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`str`

</td>
<td>

`string`

</td>
<td>

`undefined`

</td>
<td>

The string to pad

</td>
</tr>
<tr>
<td>

`length`

</td>
<td>

`number`

</td>
<td>

`undefined`

</td>
<td>

The target length of the resulting string

</td>
</tr>
<tr>
<td>

`char?`

</td>
<td>

`string`

</td>
<td>

`" "`

</td>
<td>

The character to pad with (defaults to space)

</td>
</tr>
<tr>
<td>

`padEnd?`

</td>
<td>

`boolean`

</td>
<td>

`true`

</td>
<td>

Whether to pad at the end (true) or beginning (false)

</td>
</tr>
</tbody>
</table>

#### Returns

`string`

- The padded string

#### Example

```typescript
padString("Hello", 10); // "Hello     "
padString("Hello", 10, "*"); // "Hello*****"
padString("Hello", 10, "0", false); // "00000Hello"
```

---

### plural()

```ts
function plural(str): string;
```

Defined in: [utils/string.utils.ts:1049](https://github.com/hichchidev/hichchi/blob/0b9a2445c124fc8574826bbe19e8d3e57d724a38/libs/utils/src/utils/string.utils.ts#L1049)

Converts a singular English word to its plural form.

This function applies common English pluralization rules to transform
singular words into their plural equivalents. It handles regular patterns
as well as many irregular cases and special rules for different word endings.

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

`str`

</td>
<td>

`string`

</td>
<td>

The singular word to convert to plural form

</td>
</tr>
</tbody>
</table>

#### Returns

`string`

- The plural form of the word, or the original string if:
  - Input is empty/falsy
  - The word is already plural

#### Example

```typescript
// Regular plurals
plural("cat"); // "cats"
plural("dog"); // "dogs"

// Words ending in -y
plural("party"); // "parties"
plural("day"); // "days"

// Words ending in -f or -fe
plural("wolf"); // "wolves"
plural("knife"); // "knives"

// Words ending in -o
plural("potato"); // "potatoes"
plural("photo"); // "photos"

// Irregular plurals
plural("child"); // "children"
plural("man"); // "men"
plural("foot"); // "feet"

// Latin/Greek words
plural("cactus"); // "cacti"
plural("analysis"); // "analyses"
```

#### Remarks

- This function is designed for English language words only
- It pairs well with the `singular()` function for round-trip conversion

---

### prune()

```ts
function prune<T>(obj, omitPrototype?): T;
```

Defined in: [utils/object.utils.ts:838](https://github.com/hichchidev/hichchi/blob/0b9a2445c124fc8574826bbe19e8d3e57d724a38/libs/utils/src/utils/object.utils.ts#L838)

Creates a deep copy of an object with all empty, null, undefined, and optionally prototype properties removed.

This utility function recursively traverses an object and creates a clean copy by excluding
properties that are null, undefined, or empty strings. It performs a deep cleaning operation,
processing nested objects recursively to ensure that the entire object hierarchy is pruned
of unwanted values.

This is particularly useful for preparing data for serialization, cleaning up API responses,
removing empty form fields, or ensuring that only meaningful data is processed or stored.
The function is especially valuable when working with deeply nested objects that may contain
sparse data or when you need to eliminate all traces of empty values from complex data structures.

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

`T`

</td>
<td>

The type of the object being pruned

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

`obj`

</td>
<td>

[`PartialWithNull`](#partialwithnull)<`T`>

</td>
<td>

The object to prune. Can contain null, undefined, or empty values.

</td>
</tr>
<tr>
<td>

`omitPrototype?`

</td>
<td>

`boolean`

</td>
<td>

Whether to exclude inherited properties from the prototype chain.
If true, only own properties will be included in the result.
If false (default), inherited enumerable properties will be processed.

</td>
</tr>
</tbody>
</table>

#### Returns

`T`

A new object with all empty, null, and undefined properties recursively removed

#### Examples

```typescript
// Clean up a user profile with nested empty values
interface UserProfile {
  id: number;
  name: string;
  contact: {
    email: string;
    phone?: string;
    address?: {
      street: string;
      city: string;
      zip?: string;
    };
  };
  preferences: {
    theme: string;
    notifications?: boolean;
  };
}

const userProfile = {
  id: 123,
  name: "John Doe",
  contact: {
    email: "john@example.com",
    phone: "",
    address: {
      street: "123 Main St",
      city: "New York",
      zip: null,
    },
  },
  preferences: {
    theme: "dark",
    notifications: undefined,
  },
};

const cleanProfile = prune(userProfile);
// Returns:
// {
//   id: 123,
//   name: "John Doe",
//   contact: {
//     email: "john@example.com",
//     address: {
//       street: "123 Main St",
//       city: "New York"
//     }
//   },
//   preferences: {
//     theme: "dark"
//   }
// }
```

```typescript
// Clean up form data before submission
const formData = {
  firstName: "John",
  lastName: "Doe",
  middleName: "",
  email: "john@example.com",
  phone: null,
  address: {
    street: "123 Main St",
    apartment: "",
    city: "New York",
    state: undefined,
    zip: "10001",
  },
  emergencyContact: {
    name: "",
    phone: null,
  },
};

const cleanFormData = prune(formData);
// Returns only fields with meaningful values:
// {
//   firstName: "John",
//   lastName: "Doe",
//   email: "john@example.com",
//   address: {
//     street: "123 Main St",
//     city: "New York",
//     zip: "10001"
//   }
// }
// Note: emergencyContact object is completely removed as all its properties were empty
```

```typescript
// Control prototype property inclusion
class BaseUser {
  role = "user";
}

class ExtendedUser extends BaseUser {
  name = "John";
  email = "";
}

const user = new ExtendedUser();

const prunedWithPrototype = prune(user, false);
// Includes inherited 'role' property: { role: "user", name: "John" }

const prunedOwnOnly = prune(user, true);
// Only own properties: { name: "John" }
```

#### Remarks

- Creates a new object rather than modifying the original (unlike the omit function)
- Recursively processes nested objects to ensure deep cleaning
- Removes properties with values: null, undefined, or empty string ("")
- Preserves properties with falsy but meaningful values like 0, false
- If a nested object becomes empty after pruning, it will be excluded from the result
- Non-object types are returned as an empty object of the target type
- The function preserves the type structure while removing empty values

#### See

[omit](#omit) Function for selective property removal without deep cleaning

---

### randomString()

```ts
function randomString(length, charset?): string;
```

Defined in: [utils/string.utils.ts:536](https://github.com/hichchidev/hichchi/blob/0b9a2445c124fc8574826bbe19e8d3e57d724a38/libs/utils/src/utils/string.utils.ts#L536)

Generates a random string with specified length and character set.

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

`length`

</td>
<td>

`number`

</td>
<td>

The length of the random string

</td>
</tr>
<tr>
<td>

`charset?`

</td>
<td>

`string`

</td>
<td>

The characters to use (defaults to alphanumeric)

</td>
</tr>
</tbody>
</table>

#### Returns

`string`

- The generated random string

#### Example

```typescript
// Default alphanumeric string
randomString(8);
// e.g. "A7bC9Df3"

// Hex string
randomString(6, "0123456789abcdef");
// e.g. "a3f9d2"

// PIN code
randomString(4, "0123456789");
// e.g. "8302"
```

---

### removeWhitespace()

```ts
function removeWhitespace(str): string;
```

Defined in: [utils/string.utils.ts:1342](https://github.com/hichchidev/hichchi/blob/0b9a2445c124fc8574826bbe19e8d3e57d724a38/libs/utils/src/utils/string.utils.ts#L1342)

Removes all whitespace from a string.

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

`str`

</td>
<td>

`string`

</td>
<td>

The string to process

</td>
</tr>
</tbody>
</table>

#### Returns

`string`

- The string with all whitespace removed

#### Example

```typescript
removeWhitespace("hello world"); // "helloworld"
removeWhitespace("  spaces   tabs  "); // "spacestabs"
```

---

### reverse()

```ts
function reverse(str): string;
```

Defined in: [utils/string.utils.ts:1308](https://github.com/hichchidev/hichchi/blob/0b9a2445c124fc8574826bbe19e8d3e57d724a38/libs/utils/src/utils/string.utils.ts#L1308)

Reverses a string.

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

`str`

</td>
<td>

`string`

</td>
<td>

The string to reverse

</td>
</tr>
</tbody>
</table>

#### Returns

`string`

- The reversed string

#### Example

```typescript
reverse("hello"); // "olleh"
reverse("12345"); // "54321"
```

---

### searchMapValues()

```ts
function searchMapValues(map, partialValue): string[];
```

Defined in: [utils/object.utils.ts:327](https://github.com/hichchidev/hichchi/blob/0b9a2445c124fc8574826bbe19e8d3e57d724a38/libs/utils/src/utils/object.utils.ts#L327)

Retrieves all values from a Map that contain a specified substring.

This utility function searches through a Map's values and returns an array of all values
that include the provided partial string. The search is case-sensitive and uses JavaScript's
native string.includes() method for matching. This is the counterpart to getMapKeys(),
but instead of returning the keys, it returns the actual values that match.

This is particularly useful for implementing search functionality where you need to find
and display matching content, filtering data for autocomplete features, or extracting
related values from configuration maps, user data, or any key-value store where you
need to locate entries by partial content matching.

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

`map`

</td>
<td>

`Map`<`string`, `string`>

</td>
<td>

The Map to search through for matching values

</td>
</tr>
<tr>
<td>

`partialValue`

</td>
<td>

`string`

</td>
<td>

The substring to search for within the Map's values

</td>
</tr>
</tbody>
</table>

#### Returns

`string`\[]

An array of values that contain the specified partial value

#### Examples

```typescript
// Search user information for values containing "John"
const userInfo = new Map<string, string>([
  ["fullName", "John Doe"],
  ["firstName", "John"],
  ["lastName", "Doe"],
  ["nickname", "Johnny"],
  ["email", "john.doe@example.com"],
  ["phone", "555-0123"],
]);

const johnValues = searchMapValues(userInfo, "John");
// Returns: ["John Doe", "John", "Johnny", "john.doe@example.com"]
```

```typescript
// Find error messages containing specific keywords
const errorMessages = new Map<string, string>([
  ["auth_failed", "Authentication failed. Please check your credentials."],
  ["network_error", "Network connection failed. Please try again."],
  ["validation_error", "Validation failed for the provided data."],
  ["timeout_error", "Request timeout. The server took too long to respond."],
  ["permission_denied", "Access denied. You don't have permission."],
]);

const failedMessages = searchMapValues(errorMessages, "failed");
// Returns: ["Authentication failed. Please check your credentials.",
//          "Network connection failed. Please try again.",
//          "Validation failed for the provided data."]
```

```typescript
// Search configuration values for environment-specific settings
const config = new Map<string, string>([
  ["api_url", "https://api.production.example.com"],
  ["db_host", "production-db.example.com"],
  ["cache_url", "redis://production-cache.example.com"],
  ["log_level", "error"],
  ["debug_mode", "false"],
]);

const productionValues = searchMapValues(config, "production");
// Returns: ["https://api.production.example.com",
//          "production-db.example.com",
//          "redis://production-cache.example.com"]
```

#### Remarks

- The search is case-sensitive; "John" will not match "john"
- Returns an empty array if no matches are found
- The function iterates through all Map entries, so performance scales with Map size
- Only works with Maps that have string values; other value types will cause runtime errors
- Values are returned in the order they appear in the Map iteration

#### See

[getMapKeys](#getmapkeys) Function to get keys whose values contain a substring

---

### singular()

```ts
function singular(str): string;
```

Defined in: [utils/string.utils.ts:1387](https://github.com/hichchidev/hichchi/blob/0b9a2445c124fc8574826bbe19e8d3e57d724a38/libs/utils/src/utils/string.utils.ts#L1387)

Converts plural English words to their singular form.

This function applies a series of linguistic rules and exceptions to transform
plural English words into their singular equivalents. It handles irregular plurals
(e.g., "children" → "child"), common suffix patterns (e.g., "parties" → "party"),
and Latin-derived words (e.g., "cacti" → "cactus").

The function applies rules in priority order, from most specific to most general,
to ensure correct handling of special cases.

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

`str`

</td>
<td>

`string`

</td>
<td>

The plural word to convert to singular form

</td>
</tr>
</tbody>
</table>

#### Returns

`string`

- The singular form of the word, or the original string if:
  - Input is empty/falsy
  - No singular form is recognized
  - The word is already singular

#### Example

```typescript
// Irregular plurals
singular("children"); // "child"
singular("men"); // "man"
singular("feet"); // "foot"

// Common patterns
singular("cats"); // "cat"
singular("boxes"); // "box"
singular("parties"); // "party"
singular("wolves"); // "wolf"

// Latin-derived words
singular("cacti"); // "cactus"
singular("phenomena"); // "phenomenon"
```

#### Remarks

- This function is designed for English language words only
- It handles many common cases but isn't exhaustive for all English plurals
- Words that are identical in singular and plural form (e.g., "sheep") are returned unchanged

---

### slugify()

```ts
function slugify(str, separator?): string;
```

Defined in: [utils/string.utils.ts:430](https://github.com/hichchidev/hichchi/blob/0b9a2445c124fc8574826bbe19e8d3e57d724a38/libs/utils/src/utils/string.utils.ts#L430)

Generates a slug from a string, suitable for URLs or file names.

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`str`

</td>
<td>

`string`

</td>
<td>

`undefined`

</td>
<td>

The string to convert to a slug

</td>
</tr>
<tr>
<td>

`separator?`

</td>
<td>

`string`

</td>
<td>

`"-"`

</td>
<td>

The character to use as separator

</td>
</tr>
</tbody>
</table>

#### Returns

`string`

- The slug string

#### Example

```typescript
slugify("Hello World"); // "hello-world"
slugify("10 Tips & Tricks!"); // "10-tips-tricks"
slugify("My Product (2023 Edition)"); // "my-product-2023-edition"
slugify("Über résumé"); // "uber-resume"
slugify("Blog Post", "_"); // "blog_post"
```

---

### stringSimilarity()

```ts
function stringSimilarity(str1, str2): number;
```

Defined in: [utils/string.utils.ts:380](https://github.com/hichchidev/hichchi/blob/0b9a2445c124fc8574826bbe19e8d3e57d724a38/libs/utils/src/utils/string.utils.ts#L380)

Compares two strings for similarity using Levenshtein distance algorithm.

The Levenshtein distance is a measure of the difference between two strings
by counting the minimum number of single-character edits (insertions, deletions,
or substitutions) required to change one string into another.

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

`str1`

</td>
<td>

`string`

</td>
<td>

First string to compare

</td>
</tr>
<tr>
<td>

`str2`

</td>
<td>

`string`

</td>
<td>

Second string to compare

</td>
</tr>
</tbody>
</table>

#### Returns

`number`

- A value between 0 and 1, where 1 means identical strings

#### Example

```typescript
stringSimilarity("hello", "hallo"); // 0.8 (4/5 characters match)
stringSimilarity("kitten", "sitting"); // ~0.57 (higher distance)
stringSimilarity("same", "same"); // 1.0 (identical)
```

---

### toCamelCase()

```ts
function toCamelCase(str?): string;
```

Defined in: [utils/string.utils.ts:870](https://github.com/hichchidev/hichchi/blob/0b9a2445c124fc8574826bbe19e8d3e57d724a38/libs/utils/src/utils/string.utils.ts#L870)

Convert a string to camel case.

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

`str?`

</td>
<td>

`string`

</td>
<td>

String to convert to camel case.

</td>
</tr>
</tbody>
</table>

#### Returns

`string`

String in camel case.

#### Example

```TypeScript
toCamelCase("hello world"); // "helloWorld"
```

---

### toFirstCase()

```ts
function toFirstCase(str?): string;
```

Defined in: [utils/string.utils.ts:612](https://github.com/hichchidev/hichchi/blob/0b9a2445c124fc8574826bbe19e8d3e57d724a38/libs/utils/src/utils/string.utils.ts#L612)

Convert a string to first case (Capitalize first letter of the string).

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

`str?`

</td>
<td>

`string`

</td>
<td>

Optional string to join the words with.

</td>
</tr>
</tbody>
</table>

#### Returns

`string`

String in first case.

#### Example

```TypeScript
toFirstCase("hello world"); // "Hello world"
```

---

### toFirstCaseBreak()

```ts
function toFirstCaseBreak(str?, join?): string;
```

Defined in: [utils/string.utils.ts:832](https://github.com/hichchidev/hichchi/blob/0b9a2445c124fc8574826bbe19e8d3e57d724a38/libs/utils/src/utils/string.utils.ts#L832)

Converts a string to Sentence case (first word capitalized, rest lowercase) with customizable word separators.

This function breaks a string into words, capitalizes the first word, converts remaining
words to lowercase, and then joins them using a custom separator (or space by default).

Unlike `toFirstCase()` which works on a single word, this function processes multi-word
strings from various formats (camelCase, snake_case, etc.) and gives control over how
the words are joined back together.

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

`str?`

</td>
<td>

`string`

</td>
<td>

The input string to convert

</td>
</tr>
<tr>
<td>

`join?`

</td>
<td>

`string`

</td>
<td>

Optional separator to join words (defaults to space)

</td>
</tr>
</tbody>
</table>

#### Returns

`string`

- The formatted string with first word capitalized and custom separators,
  or empty string if input is falsy

#### Example

```typescript
// With default space separator
toFirstCaseBreak("helloWorld"); // "Hello world"
toFirstCaseBreak("SYSTEM_ERROR"); // "System error"
toFirstCaseBreak("api-request-log"); // "Api request log"

// With custom separators
toFirstCaseBreak("hello_world", "-"); // "Hello-world"
toFirstCaseBreak("userAuthConfig", "."); // "User.auth.config"
toFirstCaseBreak("GET_USER_DATA", "/"); // "Get/user/data"
```

#### See

- [toFirstCase](#tofirstcase) For capitalizing a single word
- [toTitleCase](#totitlecase) For capitalizing the first letter of every word
- [breakToWords](#breaktowords) The underlying function used to split input into words

---

### toKebabCase()

```ts
function toKebabCase(str?, caps?): string;
```

Defined in: [utils/string.utils.ts:969](https://github.com/hichchidev/hichchi/blob/0b9a2445c124fc8574826bbe19e8d3e57d724a38/libs/utils/src/utils/string.utils.ts#L969)

Convert a string to kebab case.

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

`str?`

</td>
<td>

`string`

</td>
<td>

String to convert to kebab case.

</td>
</tr>
<tr>
<td>

`caps?`

</td>
<td>

`boolean`

</td>
<td>

Whether to convert to upper case.

</td>
</tr>
</tbody>
</table>

#### Returns

`string`

String in kebab case.

#### Examples

```TypeScript
toKebabCase("hello world"); // "hello-world"
```

```TypeScript
toKebabCase("hello world", true); // "HELLO-WORLD"
```

---

### toLowerCase()

```ts
function toLowerCase(str?): string;
```

Defined in: [utils/string.utils.ts:163](https://github.com/hichchidev/hichchi/blob/0b9a2445c124fc8574826bbe19e8d3e57d724a38/libs/utils/src/utils/string.utils.ts#L163)

Converts a string to lowercase with safe handling of undefined or null values.

This utility function provides a safe way to convert strings to lowercase, automatically
handling edge cases where the input might be undefined, null, or empty. Unlike the native
String.prototype.toLowerCase() method, this function won't throw an error when called
with undefined or null values, instead returning an empty string.

This is particularly useful when working with user input, API responses, or any scenario
where string values might be optional or potentially undefined. It's commonly used for
case-insensitive comparisons, search functionality, or normalizing text data.

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

`str?`

</td>
<td>

`string`

</td>
<td>

The string to convert to lowercase. Can be undefined or null.

</td>
</tr>
</tbody>
</table>

#### Returns

`string`

The lowercase version of the input string, or an empty string if input is falsy

#### Examples

```typescript
// Basic string conversion
const result1 = toLowerCase("Hello World");
// Returns: "hello world"

const result2 = toLowerCase("JAVASCRIPT");
// Returns: "javascript"
```

```typescript
// Safe handling of undefined/null values
const result1 = toLowerCase(undefined);
// Returns: ""

const result2 = toLowerCase(null);
// Returns: ""

const result3 = toLowerCase("");
// Returns: ""
```

```typescript
// Use in case-insensitive search
function searchUsers(users: User[], searchTerm: string): User[] {
  const normalizedSearch = toLowerCase(searchTerm);
  return users.filter(
    (user) =>
      toLowerCase(user.name).includes(normalizedSearch) ||
      toLowerCase(user.email).includes(normalizedSearch),
  );
}
```

```typescript
// Use in form validation
function validateEmail(email?: string): boolean {
  const normalizedEmail = toLowerCase(email);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(normalizedEmail);
}
```

#### Remarks

- Returns an empty string for any falsy input (undefined, null, empty string)
- Uses the native String.prototype.toLowerCase() method for actual conversion
- Does not modify the original string (strings are immutable in JavaScript)
- Handles all Unicode characters correctly, following locale-independent rules
- More robust than direct .toLowerCase() calls when input might be undefined

#### See

- [toUpperCase](#touppercase) Function for converting strings to uppercase
- [toLowerCaseBreak](#tolowercasebreak) Function for converting to lowercase and breaking into words

---

### toLowerCaseBreak()

```ts
function toLowerCaseBreak(str?, join?): string;
```

Defined in: [utils/string.utils.ts:262](https://github.com/hichchidev/hichchi/blob/0b9a2445c124fc8574826bbe19e8d3e57d724a38/libs/utils/src/utils/string.utils.ts#L262)

Converts a string to lowercase and breaks it into words, joining them with a specified separator.

This utility function combines word breaking and case conversion in a single operation.
It first breaks the input string into individual words using intelligent pattern recognition
(handling camelCase, snake_case, kebab-case, etc.), converts each word to lowercase,
and then joins them with the specified separator or a space by default.

This is particularly useful for converting various naming conventions to a consistent
lowercase format, creating readable labels from variable names, generating search-friendly
text, or preparing strings for further processing where consistent word separation is needed.

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

`str?`

</td>
<td>

`string`

</td>
<td>

The string to convert and break into words. Can be undefined or null.

</td>
</tr>
<tr>
<td>

`join?`

</td>
<td>

`string`

</td>
<td>

The separator to use when joining the words. Defaults to a single space.

</td>
</tr>
</tbody>
</table>

#### Returns

`string`

A lowercase string with words separated by the specified join character,
or an empty string if input is falsy

#### Examples

```typescript
// Basic camelCase conversion
const result1 = toLowerCaseBreak("HelloWorld");
// Returns: "hello world"

const result2 = toLowerCaseBreak("getUserProfile");
// Returns: "get user profile"
```

```typescript
// Custom separators
const result1 = toLowerCaseBreak("HelloWorld", "-");
// Returns: "hello-world"

const result2 = toLowerCaseBreak("APIResponseHandler", "_");
// Returns: "api_response_handler"

const result3 = toLowerCaseBreak("userAccountSettings", " | ");
// Returns: "user | account | settings"
```

```typescript
// Various input formats
const result1 = toLowerCaseBreak("snake_case_example");
// Returns: "snake case example"

const result2 = toLowerCaseBreak("kebab-case-example");
// Returns: "kebab case example"

const result3 = toLowerCaseBreak("CONSTANT_VALUE");
// Returns: "constant value"
```

```typescript
// Creating user-friendly labels
function createLabel(fieldName: string): string {
  return toLowerCaseBreak(fieldName)
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

createLabel("firstName"); // "First Name"
createLabel("emailAddress"); // "Email Address"
```

```typescript
// Safe handling of edge cases
const result1 = toLowerCaseBreak(undefined);
// Returns: ""

const result2 = toLowerCaseBreak("", "-");
// Returns: ""

const result3 = toLowerCaseBreak("singleword");
// Returns: "singleword"
```

#### Remarks

- Returns an empty string for any falsy input (undefined, null, empty string)
- Uses the same intelligent word-breaking algorithm as the breakToWords function
- Handles camelCase, PascalCase, snake_case, kebab-case, and mixed formats
- Preserves numbers as separate words when they appear in the string
- The join parameter can be any string, including empty string for concatenation
- More efficient than calling breakToWords and toLowerCase separately

#### See

- [breakToWords](#breaktowords) Function for breaking strings into word arrays
- [toLowerCase](#tolowercase) Function for simple lowercase conversion
- [toUpperCaseBreak](#touppercasebreak) Function for uppercase word breaking

---

### toNumber()

```ts
function toNumber(str): number | undefined;
```

Defined in: [utils/string.utils.ts:987](https://github.com/hichchidev/hichchi/blob/0b9a2445c124fc8574826bbe19e8d3e57d724a38/libs/utils/src/utils/string.utils.ts#L987)

Converts a string to a number.

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

`str`

</td>
<td>

`string` | `number`

</td>
<td>

String to convert to a number.

</td>
</tr>
</tbody>
</table>

#### Returns

`number` | `undefined`

Number or undefined.

#### Example

```TypeScript
toNumber("123"); // 123
```

---

### toPascalCase()

```ts
function toPascalCase(str?): string;
```

Defined in: [utils/string.utils.ts:889](https://github.com/hichchidev/hichchi/blob/0b9a2445c124fc8574826bbe19e8d3e57d724a38/libs/utils/src/utils/string.utils.ts#L889)

Convert a string to pascal case.

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

`str?`

</td>
<td>

`string`

</td>
<td>

String to convert to pascal case.

</td>
</tr>
</tbody>
</table>

#### Returns

`string`

String in pascal case.

#### Example

```TypeScript
toPascalCase("hello world"); // "HelloWorld"
```

---

### toProperTitleCase()

```ts
function toProperTitleCase(str): string;
```

Defined in: [utils/string.utils.ts:1159](https://github.com/hichchidev/hichchi/blob/0b9a2445c124fc8574826bbe19e8d3e57d724a38/libs/utils/src/utils/string.utils.ts#L1159)

Capitalizes each word in a string according to title case rules.

This function implements proper title case rules, where:

- The first and last words are always capitalized
- All other major words are capitalized
- Minor words (articles, conjunctions, short prepositions) are not capitalized
  unless they are the first or last word

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

`str`

</td>
<td>

`string`

</td>
<td>

The string to convert to title case

</td>
</tr>
</tbody>
</table>

#### Returns

`string`

- The string in proper title case format

#### Example

```typescript
toProperTitleCase("the quick brown fox jumps over the lazy dog");
// "The Quick Brown Fox Jumps over the Lazy Dog"

toProperTitleCase("a tale of two cities");
// "A Tale of Two Cities"
```

---

### toSentenceCase()

```ts
function toSentenceCase(str?): string;
```

Defined in: [utils/string.utils.ts:908](https://github.com/hichchidev/hichchi/blob/0b9a2445c124fc8574826bbe19e8d3e57d724a38/libs/utils/src/utils/string.utils.ts#L908)

Convert a string to sentence case. (Capitalize first letter of every sentence).

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

`str?`

</td>
<td>

`string`

</td>
<td>

String to convert to sentence case.

</td>
</tr>
</tbody>
</table>

#### Returns

`string`

String in sentence case.

#### Example

```TypeScript
toSentenceCase("hello world. how are you?"); // "Hello world. How are you?"
```

---

### toSnakeCase()

```ts
function toSnakeCase(str?, caps?): string;
```

Defined in: [utils/string.utils.ts:945](https://github.com/hichchidev/hichchi/blob/0b9a2445c124fc8574826bbe19e8d3e57d724a38/libs/utils/src/utils/string.utils.ts#L945)

Converts a string to snake_case format.

This function transforms a string from any common case format (camel, pascal, kebab, etc.)
into snake_case, where words are lowercase and separated by underscores.

When the optional `caps` parameter is set to true, the result will be UPPER_SNAKE_CASE
(also known as SCREAMING_SNAKE_CASE or CONSTANT_CASE).

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

`str?`

</td>
<td>

`string`

</td>
<td>

The input string to convert

</td>
</tr>
<tr>
<td>

`caps?`

</td>
<td>

`boolean`

</td>
<td>

When true, converts to UPPER_SNAKE_CASE

</td>
</tr>
</tbody>
</table>

#### Returns

`string`

- The converted snake_case string, or empty string if input is falsy

#### Example

```typescript
// From various formats to snake_case
toSnakeCase("hello world"); // "hello_world"
toSnakeCase("HelloWorld"); // "hello_world"
toSnakeCase("hello-world"); // "hello_world"
toSnakeCase("HELLO WORLD"); // "hello_world"

// To UPPER_SNAKE_CASE (CONSTANT_CASE)
toSnakeCase("hello world", true); // "HELLO_WORLD"
toSnakeCase("helloWorld", true); // "HELLO_WORLD"
```

#### Remarks

This function first splits the string into words using `breakToWords()`,
then joins them with underscores, applying the requested case transformation.

---

### toTitleCase()

```ts
function toTitleCase(str?): string;
```

Defined in: [utils/string.utils.ts:851](https://github.com/hichchidev/hichchi/blob/0b9a2445c124fc8574826bbe19e8d3e57d724a38/libs/utils/src/utils/string.utils.ts#L851)

Convert a string to title case (Capitalize first letter of each word).

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

`str?`

</td>
<td>

`string`

</td>
<td>

String to convert to title case.

</td>
</tr>
</tbody>
</table>

#### Returns

`string`

String in title case.

#### Example

```TypeScript
toTitleCase("hello world"); // "Hello World"
```

---

### toUpperCase()

```ts
function toUpperCase(str?): string;
```

Defined in: [utils/string.utils.ts:355](https://github.com/hichchidev/hichchi/blob/0b9a2445c124fc8574826bbe19e8d3e57d724a38/libs/utils/src/utils/string.utils.ts#L355)

Converts a string to uppercase with safe handling of undefined or null values.

This utility function provides a safe way to convert strings to uppercase, automatically
handling edge cases where the input might be undefined, null, or empty. Unlike the native
String.prototype.toUpperCase() method, this function won't throw an error when called
with undefined or null values, instead returning an empty string.

This is particularly useful when working with user input, API responses, or any scenario
where string values might be optional or potentially undefined. It's commonly used for
creating constants, formatting display text, generating identifiers, or normalizing text
data that needs to be in uppercase format.

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

`str?`

</td>
<td>

`string`

</td>
<td>

The string to convert to uppercase. Can be undefined or null.

</td>
</tr>
</tbody>
</table>

#### Returns

`string`

The uppercase version of the input string, or an empty string if input is falsy

#### Examples

```typescript
// Basic string conversion
const result1 = toUpperCase("hello world");
// Returns: "HELLO WORLD"

const result2 = toUpperCase("javascript");
// Returns: "JAVASCRIPT"
```

```typescript
// Safe handling of undefined/null values
const result1 = toUpperCase(undefined);
// Returns: ""

const result2 = toUpperCase(null);
// Returns: ""

const result3 = toUpperCase("");
// Returns: ""
```

```typescript
// Creating constants or identifiers
function generateConstantName(variableName: string): string {
  return toUpperCase(variableName.replace(/[^a-zA-Z0-9]/g, "_"));
}

generateConstantName("user-profile"); // "USER_PROFILE"
generateConstantName("api.endpoint"); // "API_ENDPOINT"
```

```typescript
// Use in text formatting
function formatTitle(title?: string): string {
  if (!title) return "UNTITLED";
  return toUpperCase(title.trim());
}

formatTitle("my document"); // "MY DOCUMENT"
formatTitle(undefined); // "UNTITLED"
```

```typescript
// Use in case-insensitive comparisons
function compareIgnoreCase(str1?: string, str2?: string): boolean {
  return toUpperCase(str1) === toUpperCase(str2);
}

compareIgnoreCase("Hello", "HELLO"); // true
compareIgnoreCase("Test", "test"); // true
```

#### Remarks

- Returns an empty string for any falsy input (undefined, null, empty string)
- Uses the native String.prototype.toUpperCase() method for actual conversion
- Does not modify the original string (strings are immutable in JavaScript)
- Handles all Unicode characters correctly, following locale-independent rules
- More robust than direct .toUpperCase() calls when input might be undefined
- Particularly useful for creating constants, headers, or display text

#### See

- [toLowerCase](#tolowercase) Function for converting strings to lowercase
- [toUpperCaseBreak](#touppercasebreak) Function for converting to uppercase and breaking into words

---

### toUpperCaseBreak()

```ts
function toUpperCaseBreak(str?, join?): string;
```

Defined in: [utils/string.utils.ts:791](https://github.com/hichchidev/hichchi/blob/0b9a2445c124fc8574826bbe19e8d3e57d724a38/libs/utils/src/utils/string.utils.ts#L791)

Convert a string to upper cases and break into words with optional join or space.

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

`str?`

</td>
<td>

`string`

</td>
<td>

String to convert to upper cases and break into words.

</td>
</tr>
<tr>
<td>

`join?`

</td>
<td>

`string`

</td>
<td>

Optional string to join the words with.

</td>
</tr>
</tbody>
</table>

#### Returns

`string`

String in upper cases and broken into words.

#### Examples

```TypeScript
toUpperCaseBreak("HelloWorld"); // "HELLO WORLD"
```

````TypeScript
toUpperCaseBreak("HelloWorld", "! "); // "HELLO! WORLD"

***

### toVariableName()

```ts
function toVariableName(str, pascalCase?): string;
````

Defined in: [utils/string.utils.ts:634](https://github.com/hichchidev/hichchi/blob/0b9a2445c124fc8574826bbe19e8d3e57d724a38/libs/utils/src/utils/string.utils.ts#L634)

Converts a string to a camelCase or PascalCase variable name.

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`str`

</td>
<td>

`string`

</td>
<td>

`undefined`

</td>
<td>

The string to convert

</td>
</tr>
<tr>
<td>

`pascalCase?`

</td>
<td>

`boolean`

</td>
<td>

`false`

</td>
<td>

Whether to use PascalCase (true) or camelCase (false)

</td>
</tr>
</tbody>
</table>

#### Returns

`string`

- The variable name

#### Example

```typescript
toVariableName("Hello World"); // "helloWorld"
toVariableName("API Response"); // "apiResponse"
toVariableName("first-name"); // "firstName"
toVariableName("user_id", true); // "UserId"
```

---

### truncate()

```ts
function truncate(str, length, ellipsis?): string;
```

Defined in: [utils/string.utils.ts:1089](https://github.com/hichchidev/hichchi/blob/0b9a2445c124fc8574826bbe19e8d3e57d724a38/libs/utils/src/utils/string.utils.ts#L1089)

Truncates a string to a specified length and adds an ellipsis if needed.

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`str`

</td>
<td>

`string`

</td>
<td>

`undefined`

</td>
<td>

The string to truncate

</td>
</tr>
<tr>
<td>

`length`

</td>
<td>

`number`

</td>
<td>

`undefined`

</td>
<td>

Maximum length of the truncated string (excluding ellipsis)

</td>
</tr>
<tr>
<td>

`ellipsis?`

</td>
<td>

`string`

</td>
<td>

`"..."`

</td>
<td>

The ellipsis to add to truncated strings

</td>
</tr>
</tbody>
</table>

#### Returns

`string`

- The truncated string with ellipsis if needed

#### Example

```typescript
truncate("This is a long sentence", 10); // "This is a..."
truncate("Short", 10); // "Short"
truncate("Custom ellipsis", 6, " [more]"); // "Custom [more]"
```

---

### wordWrap()

```ts
function wordWrap(str, lineLength?, breakChar?): string;
```

Defined in: [utils/string.utils.ts:672](https://github.com/hichchidev/hichchi/blob/0b9a2445c124fc8574826bbe19e8d3e57d724a38/libs/utils/src/utils/string.utils.ts#L672)

Wraps words in a string to ensure each line is no longer than a specified length.

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`str`

</td>
<td>

`string`

</td>
<td>

`undefined`

</td>
<td>

The string to wrap

</td>
</tr>
<tr>
<td>

`lineLength?`

</td>
<td>

`number`

</td>
<td>

`DEFAULT_LINE_LENGTH`

</td>
<td>

Maximum length of each line

</td>
</tr>
<tr>
<td>

`breakChar?`

</td>
<td>

`string`

</td>
<td>

`DEFAULT_BREAK_CHAR`

</td>
<td>

Character(s) to insert at line breaks

</td>
</tr>
</tbody>
</table>

#### Returns

`string`

- The wrapped string

#### Example

```typescript
const text =
  "This is a long sentence that needs to be wrapped to fit within a certain width.";

wordWrap(text, 20);
// "This is a long\nsentence that needs\nto be wrapped to\nfit within a\ncertain width."

wordWrap(text, 30, "<br>");
// "This is a long sentence that<br>needs to be wrapped to fit<br>within a certain width."
```

## Interfaces

### DottedPathValueObject

Defined in: [interfaces/path-value-set.interface.ts:77](https://github.com/hichchidev/hichchi/blob/0b9a2445c124fc8574826bbe19e8d3e57d724a38/libs/utils/src/interfaces/path-value-set.interface.ts#L77)

Represents a flattened object where keys are dot-notation paths and values are primitive types.

This interface defines a data structure that transforms nested objects into a flat, key-value
dictionary where:

- Keys are string paths using dot notation to represent the original object hierarchy
- Values are limited to primitive types (string, number, boolean)

DottedPathValueObject provides a serialization-friendly format for complex nested objects, making them
easier to store, transmit, or manipulate in certain contexts (like databases, query params,
or form handling).

#### Remarks

The DottedPathValueObject format offers several benefits:

- **Simplicity**: Eliminates nested structure complexity, making it easier to iterate over all properties
- **Queryability**: Enables direct access to deeply nested values without traversal logic
- **Serializability**: Flattened structure is more amenable to certain serialization formats
- **Transformability**: Easier to apply transformations to all values regardless of nesting level

Common use cases include:

- Flattening complex objects for storage in key-value databases
- Representing form data with nested field structures
- Simplifying diff operations between complex objects
- Creating update operations that target specific nested properties

#### See

- [InfiniteObject](#infiniteobject) The complementary nested object representation
- [objectToDottedPathValueObject](#objecttodottedpathvalueobject) Utility to convert nested objects to DottedPathValueObject
- [dottedPathObjectToNested](#dottedpathobjecttonested) Utility to convert DottedPathValueObject back to nested objects

#### Examples

```typescript
// A DottedPathValueObject representing a nested user object
const userPathValues: DottedPathValueObject = {
  id: 123,
  name: "John Doe",
  isActive: true,
  "profile.age": 30,
  "profile.address.city": "New York",
  "profile.address.zip": "10001",
};
```

```typescript
// Converting between nested objects and DottedPathValueObject
import {
  objectToDottedPathValueObject,
  dottedPathObjectToNested,
} from "./object.utils";

const user = {
  id: 123,
  name: "John Doe",
  profile: {
    age: 30,
    address: {
      city: "New York",
      zip: "10001",
    },
  },
};

// Convert to DottedPathValueObject
const pathValues = objectToDottedPathValueObject(user);

// Convert back to nested object
const reconstructedUser = dottedPathObjectToNested(pathValues);
```

```typescript
// Directly accessing a deeply nested value
const cityValue = userPathValues["profile.address.city"]; // 'New York'

// Updating a specific nested value without touching the rest
userPathValues["profile.address.city"] = "Boston";
```

#### Indexable

```ts
[path: string]: string | number | boolean
```

---

### InfiniteObject

Defined in: [interfaces/infinite-object.interface.ts:43](https://github.com/hichchidev/hichchi/blob/0b9a2445c124fc8574826bbe19e8d3e57d724a38/libs/utils/src/interfaces/infinite-object.interface.ts#L43)

Represents an object with infinite nesting capability (recursive object type).

This interface defines a recursive type that allows for objects with arbitrary depth of nesting,
where each property value can itself be another infinitely-nestable object. This pattern is useful
for representing hierarchical data structures, configuration objects, or any data that requires
unlimited nesting depth.

The interface uses TypeScript's index signature to allow any string key, with values that
must be of the same InfiniteObject type, creating the recursive structure.

#### Remarks

While this interface allows for infinite nesting in theory, practical limitations apply:

- JavaScript engine stack size limits may cause errors with extremely deep nesting
- Performance degrades with very deep object hierarchies
- Serialization/deserialization of deeply nested objects may be problematic

This type is often used in conjunction with utility functions for traversing, flattening,
or manipulating deeply nested object structures.

#### See

- DottedPathValueObject A flattened representation of nested objects
- [objectToDottedPathValueObject](#objecttodottedpathvalueobject) Utility to convert nested objects to DottedPathValueObject
- [dottedPathObjectToNested](#dottedpathobjecttonested) Utility to convert DottedPathValueObject back to nested objects

#### Example

```typescript
// Creating a deeply nested object
const nestedObj: InfiniteObject = {
  level1: {
    level2: {
      level3: {
        property: {
          value: {
            // Can continue nesting indefinitely
          },
        },
      },
    },
  },
};
```

#### Indexable

```ts
[key: string]: InfiniteObject
```

---

### InflectionRule

Defined in: [interfaces/inflection-rule.interfaces.ts:30](https://github.com/hichchidev/hichchi/blob/0b9a2445c124fc8574826bbe19e8d3e57d724a38/libs/utils/src/interfaces/inflection-rule.interfaces.ts#L30)

Rule type for word inflection transformation

This interface defines the structure of a single inflection rule, which consists of:

- A regular expression pattern to match words that the rule applies to
- A replacement string or function to transform the matched word

The replacement can be either a static string with capture group references
(e.g., "$1s") or a function that takes the matched string and returns the
transformed version.

#### Example

```typescript
// Simple string replacement rule (add 's' to the end)
const pluralRule: InflectionRule = {
  regex: /(.*)$/i,
  replacement: "$1s",
};

// Function-based replacement rule
const singularRule: InflectionRule = {
  regex: /(buses|dishes|matches)$/i,
  replacement: (match: string): string => match.slice(0, -2),
};
```

#### See

- [PluralSingularRulePair](#pluralsingularrulepair) Interface that uses InflectionRule for rule pairs
- [EnglishInflectionRules](#englishinflectionrules) Constant that implements these rules

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

<a id="property-regex"></a> `regex`

</td>
<td>

`RegExp`

</td>
<td>

Regular expression pattern to match words this rule applies to

</td>
<td>

[interfaces/inflection-rule.interfaces.ts:34](https://github.com/hichchidev/hichchi/blob/0b9a2445c124fc8574826bbe19e8d3e57d724a38/libs/utils/src/interfaces/inflection-rule.interfaces.ts#L34)

</td>
</tr>
<tr>
<td>

<a id="property-replacement"></a> `replacement`

</td>
<td>

`string` | (`match`) => `string`

</td>
<td>

Replacement string with capture group references or function to transform the matched word

</td>
<td>

[interfaces/inflection-rule.interfaces.ts:39](https://github.com/hichchidev/hichchi/blob/0b9a2445c124fc8574826bbe19e8d3e57d724a38/libs/utils/src/interfaces/inflection-rule.interfaces.ts#L39)

</td>
</tr>
</tbody>
</table>

---

### InflectionRuleCategories

Defined in: [interfaces/inflection-rule.interfaces.ts:125](https://github.com/hichchidev/hichchi/blob/0b9a2445c124fc8574826bbe19e8d3e57d724a38/libs/utils/src/interfaces/inflection-rule.interfaces.ts#L125)

Categories of English inflection rules

This interface defines the structure for organizing English inflection rules
into linguistic categories. Each category represents a different type of
inflection pattern in English:

- INVARIANT: Words that are the same in singular and plural form (e.g., "fish", "sheep")
- IRREGULAR: Words with irregular plural forms (e.g., "child/children", "man/men")
- LATIN_GREEK: Words borrowed from Latin and Greek (e.g., "cactus/cacti", "analysis/analyses")
- PATTERN_RULES: Words with specific ending patterns (e.g., words ending in -y, -f, -o)
- DEFAULT: Default rules for standard transformations (adding/removing 's')

Rules are typically applied in the order listed above, from most specific to most general.

#### Example

```typescript
// Using the categories in a word inflection function
function plural(word: string): string {
  // Combine all rules in priority order
  const rules: InflectionRule[] = [
    ...EnglishInflectionRules.INVARIANT,
    ...EnglishInflectionRules.IRREGULAR.toPlural,
    ...EnglishInflectionRules.LATIN_GREEK.toPlural,
    ...EnglishInflectionRules.PATTERN_RULES.toPlural,
    ...EnglishInflectionRules.DEFAULT.toPlural,
  ];

  // Apply the first matching rule
  for (const rule of rules) {
    if (rule.regex.test(word)) {
      return word.replace(rule.regex, rule.replacement as string);
    }
  }

  return word;
}
```

#### See

- [EnglishInflectionRules](#englishinflectionrules) Constant that implements this interface
- [plural](#plural) Function that uses these categories for pluralization
- [singular](#singular) Function that uses these categories for singularization

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

<a id="property-default"></a> `DEFAULT`

</td>
<td>

[`PluralSingularRulePair`](#pluralsingularrulepair)

</td>
<td>

Default rules for standard transformations

</td>
<td>

[interfaces/inflection-rule.interfaces.ts:149](https://github.com/hichchidev/hichchi/blob/0b9a2445c124fc8574826bbe19e8d3e57d724a38/libs/utils/src/interfaces/inflection-rule.interfaces.ts#L149)

</td>
</tr>
<tr>
<td>

<a id="property-invariant"></a> `INVARIANT`

</td>
<td>

[`InflectionRule`](#inflectionrule)\[]

</td>
<td>

Words that are the same in singular and plural form

</td>
<td>

[interfaces/inflection-rule.interfaces.ts:129](https://github.com/hichchidev/hichchi/blob/0b9a2445c124fc8574826bbe19e8d3e57d724a38/libs/utils/src/interfaces/inflection-rule.interfaces.ts#L129)

</td>
</tr>
<tr>
<td>

<a id="property-irregular"></a> `IRREGULAR`

</td>
<td>

[`PluralSingularRulePair`](#pluralsingularrulepair)

</td>
<td>

Words with irregular plural forms

</td>
<td>

[interfaces/inflection-rule.interfaces.ts:134](https://github.com/hichchidev/hichchi/blob/0b9a2445c124fc8574826bbe19e8d3e57d724a38/libs/utils/src/interfaces/inflection-rule.interfaces.ts#L134)

</td>
</tr>
<tr>
<td>

<a id="property-latin_greek"></a> `LATIN_GREEK`

</td>
<td>

[`PluralSingularRulePair`](#pluralsingularrulepair)

</td>
<td>

Words borrowed from Latin and Greek

</td>
<td>

[interfaces/inflection-rule.interfaces.ts:139](https://github.com/hichchidev/hichchi/blob/0b9a2445c124fc8574826bbe19e8d3e57d724a38/libs/utils/src/interfaces/inflection-rule.interfaces.ts#L139)

</td>
</tr>
<tr>
<td>

<a id="property-pattern_rules"></a> `PATTERN_RULES`

</td>
<td>

[`PluralSingularRulePair`](#pluralsingularrulepair)

</td>
<td>

Words with specific ending patterns

</td>
<td>

[interfaces/inflection-rule.interfaces.ts:144](https://github.com/hichchidev/hichchi/blob/0b9a2445c124fc8574826bbe19e8d3e57d724a38/libs/utils/src/interfaces/inflection-rule.interfaces.ts#L144)

</td>
</tr>
</tbody>
</table>

---

### LiteralObject

Defined in: [types/literal-object.type.ts:48](https://github.com/hichchidev/hichchi/blob/0b9a2445c124fc8574826bbe19e8d3e57d724a38/libs/utils/src/types/literal-object.type.ts#L48)

Generic interface for objects with string keys and values of a specified type.

`LiteralObject` represents a simple key-value dictionary where all keys are strings
and all values are of the same type T. It provides a type-safe way to work with
dynamic objects that have arbitrary string keys.

Key features:

- Allows any string as a key using an index signature
- Generic type parameter for values with `any` as the default
- Useful for representing dynamic objects with unknown structure
- Commonly used in object transformation and manipulation utilities

Common use cases:

- Working with JSON data
- Creating dictionaries or maps with string keys
- Representing configuration objects
- Handling data with dynamic property names

#### Example

```typescript
// Basic usage with default any type
const config: LiteralObject = {
  apiUrl: "https://api.example.com",
  timeout: 5000,
  retryCount: 3,
};

// With a specific value type
const stringMap: LiteralObject<string> = {
  en: "Hello",
  fr: "Bonjour",
  es: "Hola",
};

// Accessing properties dynamically
function getValue(obj: LiteralObject, key: string): any {
  return obj[key];
}
```

#### See

- [objectToDottedPathValueObject](#objecttodottedpathvalueobject) Utility that uses LiteralObject for object flattening
- [DottedPathValueObject](#dottedpathvalueobject) Related interface for flattened object representation

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

`T`

</td>
<td>

`any`

</td>
<td>

The type of values in the object (defaults to `any`)

</td>
</tr>
</tbody>
</table>

#### Indexable

```ts
[key: string]: T
```

---

### PluralSingularRulePair

Defined in: [interfaces/inflection-rule.interfaces.ts:70](https://github.com/hichchidev/hichchi/blob/0b9a2445c124fc8574826bbe19e8d3e57d724a38/libs/utils/src/interfaces/inflection-rule.interfaces.ts#L70)

Pair of rule sets for bidirectional singular/plural transformations

This interface defines a pair of rule sets for transforming words between
singular and plural forms:

- toPlural: Rules for converting singular words to plural form
- toSingular: Rules for converting plural words to singular form

Each rule set is an array of InflectionRule objects that are applied in order
until a matching rule is found.

#### Example

```typescript
// Rule pair for words ending in -y
const yRules: PluralSingularRulePair = {
  toPlural: [
    { regex: /([^aeiou])y$/i, replacement: "$1ies" }, // city -> cities
    { regex: /([aeiou]y)$/i, replacement: "$1s" }, // boy -> boys
  ],
  toSingular: [
    { regex: /([^aeiou])ies$/i, replacement: "$1y" }, // cities -> city
  ],
};
```

#### See

- [InflectionRule](#inflectionrule) Interface for individual transformation rules
- [InflectionRuleCategories](#inflectionrulecategories) Interface that uses PluralSingularRulePair for categories

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

<a id="property-toplural"></a> `toPlural`

</td>
<td>

[`InflectionRule`](#inflectionrule)\[]

</td>
<td>

Array of rules for converting singular words to plural form

</td>
<td>

[interfaces/inflection-rule.interfaces.ts:74](https://github.com/hichchidev/hichchi/blob/0b9a2445c124fc8574826bbe19e8d3e57d724a38/libs/utils/src/interfaces/inflection-rule.interfaces.ts#L74)

</td>
</tr>
<tr>
<td>

<a id="property-tosingular"></a> `toSingular`

</td>
<td>

[`InflectionRule`](#inflectionrule)\[]

</td>
<td>

Array of rules for converting plural words to singular form

</td>
<td>

[interfaces/inflection-rule.interfaces.ts:79](https://github.com/hichchidev/hichchi/blob/0b9a2445c124fc8574826bbe19e8d3e57d724a38/libs/utils/src/interfaces/inflection-rule.interfaces.ts#L79)

</td>
</tr>
</tbody>
</table>

## Type Aliases

### DeepPartial

```ts
type DeepPartial<T> =
  | T
  | T extends infer U[] ? DeepPartial<U>[] : T extends Map<infer K, infer V> ? Map<DeepPartial<K>, DeepPartial<V>> : T extends Set<infer M> ? Set<DeepPartial<M>> : T extends object ? { [K in keyof T]?: DeepPartial<T[K]> } : T;
```

Defined in: [types/deep-partial.type.ts:46](https://github.com/hichchidev/hichchi/blob/0b9a2445c124fc8574826bbe19e8d3e57d724a38/libs/utils/src/types/deep-partial.type.ts#L46)

A utility type that recursively makes all properties of an object optional.

Unlike TypeScript's built-in `Partial<T>` type which only makes top-level properties
optional, `DeepPartial<T>` recursively applies the transformation to nested objects,
arrays, maps, and sets. This makes it ideal for working with complex nested data
structures where you only want to provide a subset of the data.

Features:

- Makes all object properties optional at every level of nesting
- Handles arrays by making each element a deep partial
- Supports Map objects by making both keys and values deep partials
- Supports Set objects by making each member a deep partial
- Preserves primitive values unchanged

Common use cases:

- Creating update DTOs where only changed fields need to be provided
- Building test fixtures with minimal required properties
- Implementing patch operations for REST APIs
- Constructing partial configuration objects

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

`T`

</td>
<td>

The type to transform into a deep partial

</td>
</tr>
</tbody>
</table>

#### Example

```typescript
interface User {
  id: string;
  name: string;
  profile: {
    avatar: string;
    preferences: {
      theme: string;
      notifications: boolean;
    };
  };
  roles: string[];
}

// All these are valid DeepPartial<User>
const update1: DeepPartial<User> = { name: "New Name" };
const update2: DeepPartial<User> = {
  profile: { preferences: { theme: "dark" } },
};
const update3: DeepPartial<User> = { roles: ["admin"] };
```

---

### IsAlreadyInPath

```ts
type IsAlreadyInPath<T, U> = U extends object
  ? T extends U
    ? true
    : false
  : false;
```

Defined in: [types/is-already-in-path.type.ts:25](https://github.com/hichchidev/hichchi/blob/0b9a2445c124fc8574826bbe19e8d3e57d724a38/libs/utils/src/types/is-already-in-path.type.ts#L25)

Type predicate that detects circular references in type paths.

The `IsAlreadyInPath` type evaluates to `true` if type T is already part of the path U,
indicating a potential circular reference. It returns `false` otherwise.

This utility type is crucial for preventing infinite recursion in recursive type
definitions, particularly when working with deeply nested structures or graphs.

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

`T`

</td>
<td>

The type to check if it's in the path

</td>
</tr>
<tr>
<td>

`U`

</td>
<td>

The current path of types

</td>
</tr>
</tbody>
</table>

#### Example

```typescript
// Example usage in a recursive type definition
type RecursivelyProcess<T, Path = never> =
  IsAlreadyInPath<T, Path> extends true
    ? any // Break recursion to prevent infinite type expansion
    : T extends object
      ? { [K in keyof T]: RecursivelyProcess<T[K], Path | T> }
      : T;
```

---

### IsEmpty

```ts
type IsEmpty<T> = keyof T extends never ? true : false;
```

Defined in: [types/is-empty.type.ts:26](https://github.com/hichchidev/hichchi/blob/0b9a2445c124fc8574826bbe19e8d3e57d724a38/libs/utils/src/types/is-empty.type.ts#L26)

Type predicate that determines if a type is an empty object type.

The `IsEmpty` type evaluates to `true` if the provided type T has no properties
(i.e., it is an empty object type), and `false` otherwise. This is determined by
checking if `keyof T extends never`.

This utility type is useful for conditional types that need special handling
for empty objects versus objects with properties.

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

`T`

</td>
<td>

The type to check

</td>
</tr>
</tbody>
</table>

#### Example

```typescript
// Example with conditional types
type ProcessObject<T> =
  IsEmpty<T> extends true
    ? { defaultProp: string } // Provide default for empty objects
    : T; // Keep non-empty objects as-is

// Usage
type ProcessedEmpty = ProcessObject<{}>; // { defaultProp: string }
type ProcessedNonEmpty = ProcessObject<{ name: string }>; // { name: string }
```

---

### IsPrimitive

```ts
type IsPrimitive<T> = T extends Primitive ? true : false;
```

Defined in: [types/is-primitive.type.ts:31](https://github.com/hichchidev/hichchi/blob/0b9a2445c124fc8574826bbe19e8d3e57d724a38/libs/utils/src/types/is-primitive.type.ts#L31)

Type predicate that determines if a type is a primitive JavaScript value.

The `IsPrimitive` type evaluates to `true` if the provided type T is a primitive
JavaScript value (string, number, boolean, symbol, bigint, null, or undefined),
and `false` otherwise (objects, arrays, functions, etc.).

This utility type is useful for creating conditional types that need to
behave differently for primitive vs. non-primitive values.

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

`T`

</td>
<td>

The type to check

</td>
</tr>
</tbody>
</table>

#### Example

```typescript
// Example with conditional types
type SerializeValue<T> =
  IsPrimitive<T> extends true
    ? T // For primitives, keep as-is
    : string; // For non-primitives, convert to string

// Usage
type SerializedNumber = SerializeValue<number>; // number
type SerializedObject = SerializeValue<{ foo: string }>; // string
```

---

### LooseAutocomplete

```ts
type LooseAutocomplete<T> = T | Omit<string, T>;
```

Defined in: [types/loose-autocomplete.type.ts:32](https://github.com/hichchidev/hichchi/blob/0b9a2445c124fc8574826bbe19e8d3e57d724a38/libs/utils/src/types/loose-autocomplete.type.ts#L32)

Represents a type for autocompleting string values.

The `LooseAutocomplete` type allows autocompletion for a set of predefined string literals
while still permitting other string values that are not part of the predefined set.

This is useful in cases where a set of recommended values is available,
but the user is also given the flexibility to provide custom input as needed.

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

`T` _extends_ `string`

</td>
<td>

Extends string - The set of predefined literal string options for autocompletion.

</td>
</tr>
</tbody>
</table>

#### Example

```typescript
// Define a set of color options
type ColorOption = "red" | "green" | "blue";

// Function that accepts predefined colors but also allows custom colors
function setColor(color: LooseAutocomplete<ColorOption>): void {
  console.log(`Setting color to: ${color}`);
}

// Usage with predefined options (gets autocomplete)
setColor("red"); // Works, with autocomplete
setColor("green"); // Works, with autocomplete

// Usage with custom string (allowed, but no autocomplete)
setColor("purple"); // Also works, even though not in predefined options
```

#### Author

Matt Pocock (https://www.totaltypescript.com/tips/create-autocomplete-helper-which-allows-for-arbitrary-values)

---

### NonNullPrimitive

```ts
type NonNullPrimitive = string | number | boolean | symbol | bigint;
```

Defined in: [types/is-primitive.type.ts:5](https://github.com/hichchidev/hichchi/blob/0b9a2445c124fc8574826bbe19e8d3e57d724a38/libs/utils/src/types/is-primitive.type.ts#L5)

---

### PartialWithNull

```ts
type PartialWithNull<T> = { [p in keyof T]?: T[p] | null };
```

Defined in: [types/partial-with-null.type.ts:25](https://github.com/hichchidev/hichchi/blob/0b9a2445c124fc8574826bbe19e8d3e57d724a38/libs/utils/src/types/partial-with-null.type.ts#L25)

Makes all properties of type T optional and allows them to be null.

This type is similar to TypeScript's built-in `Partial<T>` type, but it also
allows properties to be null in addition to being undefined or their original type.

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

`T`

</td>
<td>

The type to make partial with null.

</td>
</tr>
</tbody>
</table>

#### Example

```TypeScript
interface User {
  id: number;
  name: string;
  email: string;
}

// All properties are optional and can be null
const partialUser: PartialWithNull<User> = {
  id: 1,
  name: null,
  // email is omitted (undefined)
};
```

---

### Prettify

```ts
type Prettify<T> = { [K in keyof T]: T[K] } & object;
```

Defined in: [types/prettify.type.ts:22](https://github.com/hichchidev/hichchi/blob/0b9a2445c124fc8574826bbe19e8d3e57d724a38/libs/utils/src/types/prettify.type.ts#L22)

Utility type for creating a clean object type from a complex type.

The `Prettify` type takes a potentially complex type (with intersections, unions,
mapped types, etc.) and converts it into a simple object type with all properties
explicitly defined. This makes the resulting type easier to read in IDE tooltips
and type errors.

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

`T`

</td>
<td>

The complex type to simplify

</td>
</tr>
</tbody>
</table>

#### Author

Matt Pocock (https://www.totaltypescript.com/tips/create-autocomplete-helper-which-allows-for-arbitrary-values)

#### Example

```typescript
// Instead of seeing: { a: number } & { b: string }
// You'll see: { a: number, b: string }
type ComplexType = { a: number } & { b: string };
type SimpleType = Prettify<ComplexType>;
```

---

### Primitive

```ts
type Primitive = string | number | boolean | symbol | bigint | null | undefined;
```

Defined in: [types/is-primitive.type.ts:3](https://github.com/hichchidev/hichchi/blob/0b9a2445c124fc8574826bbe19e8d3e57d724a38/libs/utils/src/types/is-primitive.type.ts#L3)

---

### SimpleDeepPartial

```ts
type SimpleDeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? SimpleDeepPartial<T[K]> : T[K];
};
```

Defined in: [types/deep-partial.type.ts:63](https://github.com/hichchidev/hichchi/blob/0b9a2445c124fc8574826bbe19e8d3e57d724a38/libs/utils/src/types/deep-partial.type.ts#L63)

Lightweight recursive partial type for plain object filtering/comparison use-cases.

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

`T`

</td>
</tr>
</tbody>
</table>

---

### Type()

```ts
type Type<T> = (...args) => T;
```

Defined in: [types/type.type.ts:21](https://github.com/hichchidev/hichchi/blob/0b9a2445c124fc8574826bbe19e8d3e57d724a38/libs/utils/src/types/type.type.ts#L21)

Generic constructor type for creating class instances.

The `Type` type represents a constructor function that can create instances of a class.
It's particularly useful when working with dependency injection systems, factories,
or any code that needs to work with class constructors in a generic way.

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

`T`

</td>
<td>

`unknown`

</td>
<td>

The type of object that will be instantiated (defaults to unknown)

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
</tr>
</thead>
<tbody>
<tr>
<td>

...`args`

</td>
<td>

`unknown`\[]

</td>
</tr>
</tbody>
</table>

#### Returns

`T`

#### Example

```typescript
function createInstance<T>(ctor: Type<T>): T {
  return new ctor();
}

// Usage
class MyService {}
const instance = createInstance(MyService);
```

## Variables

### CHARACTERS_TO_REMOVE

```ts
const CHARACTERS_TO_REMOVE: 2 = 2;
```

Defined in: [constants/constants.ts:93](https://github.com/hichchidev/hichchi/blob/0b9a2445c124fc8574826bbe19e8d3e57d724a38/libs/utils/src/constants/constants.ts#L93)

Number of characters to remove in string truncation operations

This constant defines the default number of characters to remove when
truncating strings in various utility functions. The value 2 is commonly
used when removing the last two characters of a string (e.g., removing
a trailing comma and space).

#### Example

```typescript
// Removing trailing characters from a string
const items = ["apple", "banana", "cherry"];
let result = "";

for (const item of items) {
  result += item + ", ";
}

// Remove trailing comma and space
if (result.length > 0) {
  result = result.slice(0, -CHARACTERS_TO_REMOVE);
}
// result = "apple, banana, cherry"
```

---

### CONTEXT_MULTIPLIER

```ts
const CONTEXT_MULTIPLIER: 2 = 2;
```

Defined in: [constants/constants.ts:231](https://github.com/hichchidev/hichchi/blob/0b9a2445c124fc8574826bbe19e8d3e57d724a38/libs/utils/src/constants/constants.ts#L231)

Multiplier for adjusting context length in excerpts

This constant defines a multiplier used to adjust the context length when
generating excerpts under different conditions. The value 2 is typically
used to double the context length for certain scenarios, such as when no
search term is found.

#### Example

```typescript
// Using the multiplier to adjust context length
function getContextLength(hasSearchTerm: boolean): number {
  return hasSearchTerm
    ? DEFAULT_CONTEXT_LENGTH
    : DEFAULT_CONTEXT_LENGTH * CONTEXT_MULTIPLIER;
}

// Getting the first part of a text when no search term is found
function getFirstPart(text: string): string {
  const length = DEFAULT_CONTEXT_LENGTH * CONTEXT_MULTIPLIER;
  return text.length > length
    ? text.substring(0, length) + DEFAULT_ELLIPSIS
    : text;
}
```

#### See

[DEFAULT_CONTEXT_LENGTH](#default_context_length) Related constant for base context length

---

### DEFAULT_BREAK_CHAR

```ts
const DEFAULT_BREAK_CHAR: "\n" = "\n";
```

Defined in: [constants/constants.ts:147](https://github.com/hichchidev/hichchi/blob/0b9a2445c124fc8574826bbe19e8d3e57d724a38/libs/utils/src/constants/constants.ts#L147)

Default line break character for word wrapping

This constant defines the default character or string used to separate lines
when performing word wrapping operations. The value "\n" represents a standard
line feed character used for line breaks in most text formats.

#### Example

```typescript
// Using the default break character in word wrapping
const wrappedText =
  longText
    .match(new RegExp(`.{1,${DEFAULT_LINE_LENGTH}}(\\s|$)`, "g"))
    ?.join(DEFAULT_BREAK_CHAR) || longText;
```

#### See

[DEFAULT_LINE_LENGTH](#default_line_length) Related constant for maximum line length

---

### DEFAULT_CONTEXT_LENGTH

```ts
const DEFAULT_CONTEXT_LENGTH: 40 = 40;
```

Defined in: [constants/constants.ts:177](https://github.com/hichchidev/hichchi/blob/0b9a2445c124fc8574826bbe19e8d3e57d724a38/libs/utils/src/constants/constants.ts#L177)

Default context length for text excerpts

This constant defines the default number of characters to include before and after
a search term when generating text excerpts or snippets. The value 40 provides
enough context to understand the meaning while keeping the excerpt concise.

#### Example

```typescript
// Generating an excerpt around a search term
function generateExcerpt(text: string, searchTerm: string): string {
  const index = text.toLowerCase().indexOf(searchTerm.toLowerCase());
  if (index === -1)
    return text.substring(0, DEFAULT_CONTEXT_LENGTH * 2) + DEFAULT_ELLIPSIS;

  const start = Math.max(0, index - DEFAULT_CONTEXT_LENGTH);
  const end = Math.min(
    text.length,
    index + searchTerm.length + DEFAULT_CONTEXT_LENGTH,
  );

  let excerpt = text.substring(start, end);
  if (start > 0) excerpt = DEFAULT_ELLIPSIS + excerpt;
  if (end < text.length) excerpt = excerpt + DEFAULT_ELLIPSIS;

  return excerpt;
}
```

#### See

- [DEFAULT_ELLIPSIS](#default_ellipsis) Related constant for indicating truncated text
- [CONTEXT_MULTIPLIER](#context_multiplier) Related constant for adjusting context length

---

### DEFAULT_ELLIPSIS

```ts
const DEFAULT_ELLIPSIS: "..." = "...";
```

Defined in: [constants/constants.ts:201](https://github.com/hichchidev/hichchi/blob/0b9a2445c124fc8574826bbe19e8d3e57d724a38/libs/utils/src/constants/constants.ts#L201)

Default ellipsis string for indicating truncated text

This constant defines the default string used to indicate that text has been
truncated or omitted in excerpts and summaries. The value "..." is the standard
ellipsis used to represent omitted content.

#### Example

```typescript
// Truncating a long string with ellipsis
function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return (
    text.substring(0, maxLength - DEFAULT_ELLIPSIS.length) + DEFAULT_ELLIPSIS
  );
}

const longText = "This is a very long text that needs to be truncated";
const truncated = truncate(longText, 20);
// truncated = "This is a very lo..."
```

#### See

[DEFAULT_CONTEXT_LENGTH](#default_context_length) Related constant for excerpt generation

---

### DEFAULT_LINE_LENGTH

```ts
const DEFAULT_LINE_LENGTH: 80 = 80;
```

Defined in: [constants/constants.ts:129](https://github.com/hichchidev/hichchi/blob/0b9a2445c124fc8574826bbe19e8d3e57d724a38/libs/utils/src/constants/constants.ts#L129)

Default maximum line length for word wrapping

This constant defines the default maximum length of a line when performing
word wrapping operations. The value 80 is a common standard for line length
in many text formats and terminal displays.

#### Example

```typescript
// Wrapping a long text to the default line length
function wrapText(
  text: string,
  maxLength = DEFAULT_LINE_LENGTH,
  breakChar = DEFAULT_BREAK_CHAR,
): string {
  // Word wrapping implementation
  const result = [];
  let line = "";

  for (const word of text.split(" ")) {
    if ((line + word).length > maxLength) {
      result.push(line);
      line = word;
    } else {
      line += (line ? " " : "") + word;
    }
  }

  if (line) {
    result.push(line);
  }

  return result.join(breakChar);
}
```

#### See

[DEFAULT_BREAK_CHAR](#default_break_char) Related constant for line break character

---

### EnglishInflectionRules

```ts
const EnglishInflectionRules: InflectionRuleCategories;
```

Defined in: [constants/english-inflection-rules.ts:55](https://github.com/hichchidev/hichchi/blob/0b9a2445c124fc8574826bbe19e8d3e57d724a38/libs/utils/src/constants/english-inflection-rules.ts#L55)

Comprehensive rules for English word inflection (singular/plural transformations)

This module provides a structured collection of rules for transforming English words
between singular and plural forms. The rules are organized into categories based on
linguistic patterns and exceptions, ensuring accurate transformations for various
word types.

Key features:

- Invariant words that are identical in singular and plural forms
- Irregular plural forms that don't follow standard patterns
- Latin and Greek origin words with their specific plural formations
- Pattern-based rules for common English word endings
- Default fallback rules for standard English pluralization

The rules are applied in a specific priority order, from most specific to most general,
to ensure correct handling of special cases. Each rule consists of a regular expression
pattern and a replacement string or function.

#### Example

```typescript
// Using the rules with the plural() function
import { EnglishInflectionRules } from "@hichchi/utils/constants";
import { InflectionRule } from "@hichchi/utils/interfaces";

function plural(word: string): string {
  // Combine all rules in priority order
  const rules: InflectionRule[] = [
    ...EnglishInflectionRules.INVARIANT,
    ...EnglishInflectionRules.IRREGULAR.toPlural,
    ...EnglishInflectionRules.LATIN_GREEK.toPlural,
    ...EnglishInflectionRules.PATTERN_RULES.toPlural,
    ...EnglishInflectionRules.DEFAULT.toPlural,
  ];

  // Apply the first matching rule
  for (const rule of rules) {
    if (rule.regex.test(word)) {
      return word.replace(rule.regex, rule.replacement as string);
    }
  }

  return word;
}
```

#### See

- [plural](#plural) Function that uses these rules to convert words to plural form
- [singular](#singular) Function that uses these rules to convert words to singular form
- [InflectionRuleCategories](#inflectionrulecategories) Interface defining the structure of the rules
- [InflectionRule](#inflectionrule) Interface for individual transformation rules

---

### HEX_PADDING_CHAR

```ts
const HEX_PADDING_CHAR: "0" = "0";
```

Defined in: [constants/constants.ts:66](https://github.com/hichchidev/hichchi/blob/0b9a2445c124fc8574826bbe19e8d3e57d724a38/libs/utils/src/constants/constants.ts#L66)

Character used for padding hexadecimal strings

This constant defines the character used to pad hexadecimal strings to reach
the minimum length defined by HEX_PADDING_LENGTH. The value "0" is the standard
padding character for hexadecimal values.

#### Example

```typescript
// Padding a hex string with zeros
const paddedHex = hexString.padStart(HEX_PADDING_LENGTH, HEX_PADDING_CHAR);

// Example with a single-digit hex value
const hexValue = "F";
const paddedHex = hexValue.padStart(HEX_PADDING_LENGTH, HEX_PADDING_CHAR);
// paddedHex = "0F"
```

#### See

- [HEX_RADIX](#hex_radix) Related constant for hex conversion
- [HEX_PADDING_LENGTH](#hex_padding_length) Related constant for the minimum length

---

### HEX_PADDING_LENGTH

```ts
const HEX_PADDING_LENGTH: 2 = 2;
```

Defined in: [constants/constants.ts:43](https://github.com/hichchidev/hichchi/blob/0b9a2445c124fc8574826bbe19e8d3e57d724a38/libs/utils/src/constants/constants.ts#L43)

Minimum length for padded hexadecimal strings

This constant defines the minimum length for hexadecimal strings after padding.
It ensures that hex values have a consistent length (e.g., "0A" instead of "A").
The value 2 ensures that single-digit hex values are padded with a leading zero.

#### Example

```typescript
// Padding a hex string to ensure consistent length
const paddedHex = hexString.padStart(HEX_PADDING_LENGTH, HEX_PADDING_CHAR);

// Full example with conversion and padding
const byteValue = 10;
const hexByte = byteValue
  .toString(HEX_RADIX)
  .padStart(HEX_PADDING_LENGTH, HEX_PADDING_CHAR);
// hexByte = "0A"
```

#### See

- [HEX_RADIX](#hex_radix) Related constant for hex conversion
- [HEX_PADDING_CHAR](#hex_padding_char) Related constant for the padding character

---

### HEX_RADIX

```ts
const HEX_RADIX: 16 = 16;
```

Defined in: [constants/constants.ts:20](https://github.com/hichchidev/hichchi/blob/0b9a2445c124fc8574826bbe19e8d3e57d724a38/libs/utils/src/constants/constants.ts#L20)

Base for hexadecimal number conversion

This constant defines the radix (base) used for hexadecimal number conversion.
The value 16 represents the standard hexadecimal numbering system (0-9, A-F).
It's used in toString() and parseInt() operations involving hex values.

#### Example

```typescript
// Converting a number to hexadecimal string
const hexString = number.toString(HEX_RADIX);

// Converting a hexadecimal string to a number
const number = parseInt(hexString, HEX_RADIX);
```

#### See

- [HEX_PADDING_LENGTH](#hex_padding_length) Related constant for hex string formatting
- [HEX_PADDING_CHAR](#hex_padding_char) Related constant for hex string padding

---

### mimeTypes

```ts
const mimeTypes: Map<string, string>;
```

Defined in: [utils/file.utils.ts:38](https://github.com/hichchidev/hichchi/blob/0b9a2445c124fc8574826bbe19e8d3e57d724a38/libs/utils/src/utils/file.utils.ts#L38)

Comprehensive mapping of file extensions to their corresponding MIME types.

This map provides a bidirectional mapping between file extensions and MIME types,
enabling applications to determine the appropriate content type for files or
to identify the likely file extension for a given MIME type.

The map includes entries for common file formats across various categories:

- Documents (PDF, DOC, DOCX, XLS, XLSX, etc.)
- Images (JPG, PNG, GIF, SVG, WebP, etc.)
- Audio (MP3, WAV, OGG, etc.)
- Video (MP4, WebM, AVI, etc.)
- Archives (ZIP, RAR, 7Z, etc.)
- Web resources (HTML, CSS, JS, etc.)
- And many more specialized formats

#### Remarks

The map is indexed by file extension (without the dot prefix) and contains
the corresponding MIME type as the value. Use utility functions like
getMimeTypeFromExtension and getExtensionFromMimeType to perform lookups
rather than accessing this map directly.

Extensions are stored in lowercase to ensure case-insensitive matching.

#### Example

```typescript
// Get MIME type for a file extension
const mimeType = getMimeTypeFromExtension("pdf"); // 'application/pdf'

// Get file extension for a MIME type
const extension = getExtensionFromMimeType("image/jpeg"); // 'jpg'
```
