**@hichchi/nest-connector**

---

<!--suppress ALL -->

<div align="center">

# 🔗 @hichchi/nest-connector

## Description

**Comprehensive NestJS connector library providing standardized HTTP responses, authentication interfaces, CRUD operations, and shared utilities for the Hichchi ecosystem**

[![npm version](https://img.shields.io/npm/v/@hichchi/nest-connector?style=flat&color=blue)](https://www.npmjs.com/package/@hichchi/nest-connector)
[![npm downloads](https://img.shields.io/npm/dm/@hichchi/nest-connector?style=flat&color=green)](https://www.npmjs.com/package/@hichchi/nest-connector)
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
- [🔧 Development](#-development)
- [📖 API Documentation](#-api-documentation)

---

## 📦 Installation

```bash
npm install @hichchi/nest-connector
```

## ⚡ Quick Start

Get up and running with standardized API responses in just a few minutes:

```typescript
// 1. Install the package
npm install @hichchi/nest-connector

// 2. Import response interfaces and builders
import {
  HttpResponse,
  SuccessResponse,
  ErrorResponse,
  SuccessResponseDto
} from '@hichchi/nest-connector';

// 3. Use in your NestJS controllers
@Controller('users')
export class UsersController {
  @Get()
  async getUsers(): Promise<SuccessResponse> {
    const users = await this.usersService.findAll();
    return new SuccessResponseDto(users, 'Users retrieved successfully');
  }
}
```

## 📋 Prerequisites

Before installing @hichchi/nest-connector, ensure you have:

### Required Dependencies

- **Node.js**: >= 18.0.0
- **NestJS**: >= 11.0.0
- **TypeScript**: >= 5.6.0

### Peer Dependencies

```bash
npm install @nestjs/common @nestjs/core
npm install rxjs reflect-metadata
```

### Internal Dependencies

This package depends on:

```bash
npm install @hichchi/utils
```

### Optional Dependencies

For enhanced features:

```bash
# For validation decorators
npm install class-validator class-transformer
```

## 🌟 Overview

🎯 **Your standardized response toolkit** for NestJS applications. Ensure consistent API responses across your entire application with pre-defined interfaces, builders, and response structures that follow industry best practices.

## ✨ Features

### 🏗️ Ready-to-Use Response Structures

- 📋 **HttpResponse Interface** - Base interface for all API responses
- ✅ **SuccessResponse Interface** - Standardized success response structure
- ❌ **ErrorResponse Interface** - Consistent error response format
- 🔢 **HTTP Status Enums** - Pre-defined status code enumerations

### 🛠️ Response Builders & DTOs

- 🏭 **SuccessResponseDto** - Builder for success responses with data
- 🎯 **Response Code Types** - Application-specific response codes
- 📊 **Status Code Management** - Organized HTTP status code handling
- 🔧 **Type-Safe Responses** - Full TypeScript support for response structures

### 🎨 Developer Experience

- 📝 **Comprehensive Documentation** - Detailed JSDoc comments for all interfaces
- 🔍 **IntelliSense Support** - Full IDE autocomplete and type checking
- 🎯 **Consistent API Design** - Standardized response patterns across applications
- 🚀 **Easy Integration** - Drop-in replacement for custom response handling

### 🔧 Advanced Features

- 🏷️ **User Info Interfaces** - Standardized user information structures
- 📦 **Modular Design** - Import only what you need
- 🔄 **Extensible Architecture** - Easy to extend with custom response types
- 🎪 **Framework Agnostic Types** - Core interfaces can be used beyond NestJS

## 🔧 Development

### Building the Library

```bash
nx build nest-connector
```

### Running Tests

```bash
nx test nest-connector
```

### Linting

```bash
nx lint nest-connector
```

---

<div align="center">

**Made with ❤️ by [Hichchi Dev](https://github.com/hichchidev)**

[![Hichchi Ecosystem](https://img.shields.io/badge/🏠_Hichchi_Ecosystem-blue)](https://github.com/hichchidev/hichchi)
[![Report Bug](https://img.shields.io/badge/🐛_Report_Bug-red)](https://github.com/hichchidev/hichchi/issues)
[![Request Feature](https://img.shields.io/badge/✨_Request_Feature-green)](https://github.com/hichchidev/hichchi/issues)

_Standardizing API responses and connecting NestJS applications with consistent interfaces and shared utilities_

</div>

---

# 📖 API Documentation

Complete technical reference for all classes, interfaces, methods, and types in this library.

**Auto-generated by TypeDoc** - Browse through detailed API references, code examples, and implementation guides below.

<!-- TypeDoc generated documentation will be appended below this point -->

---

## 📋 API Table of Contents

- [Classes](#classes)
  - [SuccessResponseDto](#successresponsedto)
- [Enumerations](#enumerations)
  - [CommonErrorResponseCode](#commonerrorresponsecode)
  - [CommonSuccessResponseCode](#commonsuccessresponsecode)
  - [Endpoint](#endpoint)
  - [Gateway](#gateway)
  - [HttpClientErrorStatus](#httpclienterrorstatus)
  - [HttpInfoStatus](#httpinfostatus)
  - [HttpRedirectionStatus](#httpredirectionstatus)
  - [HttpServerErrorStatus](#httpservererrorstatus)
  - [HttpSuccessStatus](#httpsuccessstatus)
- [Interfaces](#interfaces)
  - [ErrorResponse](#errorresponse)
  - [HttpResponse](#httpresponse)
  - [SuccessResponse](#successresponse)
  - [UserInfo](#userinfo)
- [Type Aliases](#type-aliases)
  - [ErrorResponseCode](#errorresponsecode)
  - [FileId](#fileid)
  - [HttpStatus](#httpstatus)
  - [ResponseCode](#responsecode)
  - [SocketId](#socketid)
  - [SuccessResponseCode](#successresponsecode)
  - [WsRefId](#wsrefid)
- [Variables](#variables)
  - [DAY_IN_HOURS](#day_in_hours)
  - [DAY_IN_SECONDS](#day_in_seconds)
  - [DEFAULT_ITEMS_PER_PAGE](#default_items_per_page)
  - [DEFAULT_MYSQL_PORT](#default_mysql_port)
  - [DEFAULT_REDIS_PORT](#default_redis_port)
  - [DEFAULT_SALT_ROUNDS](#default_salt_rounds)
  - [DEFAULT_UUID_VERSION](#default_uuid_version)
  - [DEFAULT_VERIFY_TOKEN_LENGTH](#default_verify_token_length)
  - [Errors](#errors)
  - [HOUR_IN_MINUTES](#hour_in_minutes)
  - [MINUTE_IN_SECONDS](#minute_in_seconds)
  - [MONTH_IN_DAYS](#month_in_days)
  - [MONTH_IN_SECONDS](#month_in_seconds)
  - [SECOND_IN_MS](#second_in_ms)
  - [SuccessResponses](#successresponses)

## Classes

### SuccessResponseDto

Defined in: [builders/success-response.dto.ts:55](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/common/builders/success-response.dto.ts#L55)

Data Transfer Object for standardized success responses

This class provides a standardized way to create success response objects
for API endpoints. It implements the SuccessResponse interface and ensures
that all required properties are properly set with appropriate default values.

Key features:

- Flexible constructor that accepts either individual parameters or a complete response object
- Default values for all properties if not explicitly provided
- Type-safe response code handling with autocomplete support
- Consistent structure for all success responses across the application

The class is designed to be used in controllers and services to return
standardized success responses to API clients.

#### Examples

```typescript
// Creating a success response with custom message
@Post()
createUser(@Body() createUserDto: CreateUserDto): SuccessResponseDto {
  this.userService.create(createUserDto);
  return new SuccessResponseDto("User created successfully");
}
```

```typescript
// Creating a success response from an existing response object
@Get()
getUsers(): SuccessResponseDto {
  const users = this.userService.findAll();
  const response = {
    statusCode: HttpSuccessStatus.OK,
    code: "USERS_RETRIEVED",
    message: "Users retrieved successfully",
    data: users
  };
  return new SuccessResponseDto(response);
}
```

#### See

- [SuccessResponse](#successresponse) The interface this class implements
- [HttpSuccessStatus](#httpsuccessstatus) Enum of HTTP success status codes
- [SuccessResponses](#successresponses) Predefined success response templates

#### Implements

- [`SuccessResponse`](#successresponse)

#### Constructors

##### Constructor

```ts
new SuccessResponseDto(
   message?,
   code?,
   status?,
   description?): SuccessResponseDto;
```

Defined in: [builders/success-response.dto.ts:118](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/common/builders/success-response.dto.ts#L118)

Creates a new success response with individual parameters

This constructor overload allows creating a success response by specifying
individual properties. Any properties not provided will use default values
from SuccessResponses.SUCCESS.

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

`message?`

</td>
<td>

`string`

</td>
<td>

Human-readable success message

</td>
</tr>
<tr>
<td>

`code?`

</td>
<td>

`string`

</td>
<td>

Unique code identifying the success type

</td>
</tr>
<tr>
<td>

`status?`

</td>
<td>

[`HttpSuccessStatus`](#httpsuccessstatus)

</td>
<td>

HTTP status code for the response

</td>
</tr>
<tr>
<td>

`description?`

</td>
<td>

`string`

</td>
<td>

Optional detailed description

</td>
</tr>
</tbody>
</table>

###### Returns

[`SuccessResponseDto`](#successresponsedto)

###### Example

```typescript
// Basic success response with just a message
const response = new SuccessResponseDto("Operation completed successfully");

// Success response with custom code and status
const response = new SuccessResponseDto(
  "User created successfully",
  "USER_CREATED",
  HttpSuccessStatus.CREATED,
);
```

##### Constructor

```ts
new SuccessResponseDto(response): SuccessResponseDto;
```

Defined in: [builders/success-response.dto.ts:140](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/common/builders/success-response.dto.ts#L140)

Creates a new success response from an existing response object

This constructor overload allows creating a success response by providing
an existing SuccessResponse object. Any properties not provided in the
input object will use default values from SuccessResponses.SUCCESS.

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

`response`

</td>
<td>

[`SuccessResponse`](#successresponse)

</td>
<td>

Existing success response object

</td>
</tr>
</tbody>
</table>

###### Returns

[`SuccessResponseDto`](#successresponsedto)

###### Example

```typescript
// Creating from an existing response object
const existingResponse = {
  statusCode: HttpSuccessStatus.OK,
  code: "DATA_RETRIEVED",
  message: "Data retrieved successfully",
};
const response = new SuccessResponseDto(existingResponse);
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

<a id="property-code"></a> `code`

</td>
<td>

`LooseAutocomplete`<`AuthSuccessResponseCode`>

</td>
<td>

Unique code identifying the success response type

This property holds a string code that identifies the specific type of success.
It uses LooseAutocomplete to provide type suggestions from AuthSuccessResponseCode
while still allowing custom string values.

**See**

AuthSuccessResponseCode For predefined success codes

</td>
<td>

[builders/success-response.dto.ts:75](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/common/builders/success-response.dto.ts#L75)

</td>
</tr>
<tr>
<td>

<a id="property-description"></a> `description?`

</td>
<td>

`string`

</td>
<td>

Optional detailed description of the success result

This property can contain additional information about the success result
that might be useful for debugging or providing more context to developers.

</td>
<td>

[builders/success-response.dto.ts:91](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/common/builders/success-response.dto.ts#L91)

</td>
</tr>
<tr>
<td>

<a id="property-message"></a> `message`

</td>
<td>

`string`

</td>
<td>

Human-readable success message

This property contains a user-friendly message describing the success result.
It should be clear, concise, and suitable for displaying to end users.

</td>
<td>

[builders/success-response.dto.ts:83](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/common/builders/success-response.dto.ts#L83)

</td>
</tr>
<tr>
<td>

<a id="property-statuscode"></a> `statusCode`

</td>
<td>

[`HttpSuccessStatus`](#httpsuccessstatus)

</td>
<td>

HTTP status code for the success response

This property holds the HTTP status code that should be returned to the client.
It uses the HttpSuccessStatus enum to ensure only valid success status codes are used.

**See**

[HttpSuccessStatus](#httpsuccessstatus) For available status codes

</td>
<td>

[builders/success-response.dto.ts:64](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/common/builders/success-response.dto.ts#L64)

</td>
</tr>
</tbody>
</table>

## Enumerations

### CommonErrorResponseCode

Defined in: [enums/common-error-response-code.enum.ts:16](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/common/enums/common-error-response-code.enum.ts#L16)

Common Error Response Codes Enum

This enum defines general-purpose error response codes that can be used across different
services and modules in the application. Each code represents a specific error condition
related to common operations such as data validation, resource access, and file operations.

The naming convention includes HTTP status codes (e.g., 400, 404, 500) for clarity, with
the prefix "ERROR\_" to distinguish them as error codes.

Enum Values are organized by HTTP status categories:

- `400` series: Client errors (Bad Request, Unauthorized, Forbidden, Not Found)
- `500` series: Server errors (Internal Server Error)
- Generic errors without specific status codes

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

<a id="enumeration-member-error"></a> `ERROR`

</td>
<td>

`"ERROR"`

</td>
<td>

Generic unspecified error

Most general error code for cases where the specific error type cannot be determined
or doesn't fit into any other category.

</td>
<td>

[enums/common-error-response-code.enum.ts:129](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/common/enums/common-error-response-code.enum.ts#L129)

</td>
</tr>
<tr>
<td>

<a id="enumeration-member-error_400"></a> `ERROR_400`

</td>
<td>

`"ERROR_400"`

</td>
<td>

Generic bad request error (400 Bad Request)

Generic error for bad requests when a more specific error code is not applicable.

</td>
<td>

[enums/common-error-response-code.enum.ts:93](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/common/enums/common-error-response-code.enum.ts#L93)

</td>
</tr>
<tr>
<td>

<a id="enumeration-member-error_400_empty_id"></a> `ERROR_400_EMPTY_ID`

</td>
<td>

`"ERROR_400_EMPTY_ID"`

</td>
<td>

Empty ID error (400 Bad Request)

Occurs when an ID field is required but not provided or is empty.

</td>
<td>

[enums/common-error-response-code.enum.ts:22](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/common/enums/common-error-response-code.enum.ts#L22)

</td>
</tr>
<tr>
<td>

<a id="enumeration-member-error_400_empty_ids"></a> `ERROR_400_EMPTY_IDS`

</td>
<td>

`"ERROR_400_EMPTY_IDS"`

</td>
<td>

Empty IDs array error (400 Bad Request)

Occurs when an array of IDs is required but not provided or is empty.

</td>
<td>

[enums/common-error-response-code.enum.ts:29](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/common/enums/common-error-response-code.enum.ts#L29)

</td>
</tr>
<tr>
<td>

<a id="enumeration-member-error_400_invalid_id"></a> `ERROR_400_INVALID_ID`

</td>
<td>

`"ERROR_400_INVALID_ID"`

</td>
<td>

Invalid ID format or value (400 Bad Request)

Occurs when an ID is provided but has an invalid format or value.

</td>
<td>

[enums/common-error-response-code.enum.ts:36](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/common/enums/common-error-response-code.enum.ts#L36)

</td>
</tr>
<tr>
<td>

<a id="enumeration-member-error_400_invalid_ids"></a> `ERROR_400_INVALID_IDS`

</td>
<td>

`"ERROR_400_INVALID_IDS"`

</td>
<td>

Invalid IDs array (400 Bad Request)

Occurs when an array of IDs contains one or more invalid entries.

</td>
<td>

[enums/common-error-response-code.enum.ts:43](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/common/enums/common-error-response-code.enum.ts#L43)

</td>
</tr>
<tr>
<td>

<a id="enumeration-member-error_400_invalid_uuid"></a> `ERROR_400_INVALID_UUID`

</td>
<td>

`"ERROR_400_INVALID_UUID"`

</td>
<td>

Invalid UUID format (400 Bad Request)

Occurs when a provided UUID doesn't conform to the required format.

</td>
<td>

[enums/common-error-response-code.enum.ts:50](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/common/enums/common-error-response-code.enum.ts#L50)

</td>
</tr>
<tr>
<td>

<a id="enumeration-member-error_400_not_id_array"></a> `ERROR_400_NOT_ID_ARRAY`

</td>
<td>

`"ERROR_400_NOT_ID_ARRAY"`

</td>
<td>

Not an array of IDs (400 Bad Request)

Occurs when a parameter expected to be an array of IDs is of the wrong type.

</td>
<td>

[enums/common-error-response-code.enum.ts:57](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/common/enums/common-error-response-code.enum.ts#L57)

</td>
</tr>
<tr>
<td>

<a id="enumeration-member-error_401"></a> `ERROR_401`

</td>
<td>

`"ERROR_401"`

</td>
<td>

Generic unauthorized error (401 Unauthorized)

Generic error for unauthorized access when a more specific error code is not applicable.

</td>
<td>

[enums/common-error-response-code.enum.ts:100](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/common/enums/common-error-response-code.enum.ts#L100)

</td>
</tr>
<tr>
<td>

<a id="enumeration-member-error_403"></a> `ERROR_403`

</td>
<td>

`"ERROR_403"`

</td>
<td>

Generic forbidden error (403 Forbidden)

Generic error for forbidden access when a more specific error code is not applicable.

</td>
<td>

[enums/common-error-response-code.enum.ts:107](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/common/enums/common-error-response-code.enum.ts#L107)

</td>
</tr>
<tr>
<td>

<a id="enumeration-member-error_404"></a> `ERROR_404`

</td>
<td>

`"ERROR_404"`

</td>
<td>

Generic not found error (404 Not Found)

Generic error for resource not found when a more specific error code is not applicable.

</td>
<td>

[enums/common-error-response-code.enum.ts:114](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/common/enums/common-error-response-code.enum.ts#L114)

</td>
</tr>
<tr>
<td>

<a id="enumeration-member-error_404_file_not_exist"></a> `ERROR_404_FILE_NOT_EXIST`

</td>
<td>

`"ERROR_404_FILE_NOT_EXIST"`

</td>
<td>

File not found (404 Not Found)

Occurs when attempting to access a file that doesn't exist.

</td>
<td>

[enums/common-error-response-code.enum.ts:64](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/common/enums/common-error-response-code.enum.ts#L64)

</td>
</tr>
<tr>
<td>

<a id="enumeration-member-error_404_not_implemented"></a> `ERROR_404_NOT_IMPLEMENTED`

</td>
<td>

`"ERROR_404_NOT_IMPLEMENTED"`

</td>
<td>

Feature not implemented (404 Not Found)

Occurs when attempting to use a feature or endpoint that is not yet implemented.
Note: While HTTP 501 is traditionally used for this, this uses 404 for specific cases.

</td>
<td>

[enums/common-error-response-code.enum.ts:72](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/common/enums/common-error-response-code.enum.ts#L72)

</td>
</tr>
<tr>
<td>

<a id="enumeration-member-error_500"></a> `ERROR_500`

</td>
<td>

`"ERROR_500"`

</td>
<td>

Generic server error (500 Internal Server Error)

Generic error for server-side issues when a more specific error code is not applicable.

</td>
<td>

[enums/common-error-response-code.enum.ts:121](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/common/enums/common-error-response-code.enum.ts#L121)

</td>
</tr>
<tr>
<td>

<a id="enumeration-member-error_500_file_delete"></a> `ERROR_500_FILE_DELETE`

</td>
<td>

`"ERROR_500_FILE_DELETE"`

</td>
<td>

File deletion error (500 Internal Server Error)

Occurs when there is a server-side error during file deletion.

</td>
<td>

[enums/common-error-response-code.enum.ts:86](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/common/enums/common-error-response-code.enum.ts#L86)

</td>
</tr>
<tr>
<td>

<a id="enumeration-member-error_500_file_upload"></a> `ERROR_500_FILE_UPLOAD`

</td>
<td>

`"ERROR_500_FILE_UPLOAD"`

</td>
<td>

File upload error (500 Internal Server Error)

Occurs when there is a server-side error during file upload processing.

</td>
<td>

[enums/common-error-response-code.enum.ts:79](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/common/enums/common-error-response-code.enum.ts#L79)

</td>
</tr>
</tbody>
</table>

---

### CommonSuccessResponseCode

Defined in: [enums/common-success-response-code.enum.ts:16](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/common/enums/common-success-response-code.enum.ts#L16)

Common Success Response Codes Enum

This enum defines general-purpose success response codes that can be used across different
services and modules in the application. Each code represents a specific success condition
for operations and requests.

While HTTP status codes in the 2xx range (like 200 OK, 201 Created) provide a standardized
way to indicate success at the protocol level, these application-specific success codes
offer more granular information about the exact nature of the successful operation.

Currently, this enum contains a single generic success code, but it can be extended
with more specific success codes as the application grows and more detailed success
states need to be communicated.

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

<a id="enumeration-member-success"></a> `SUCCESS`

</td>
<td>

`"SUCCESS"`

</td>
<td>

Generic success response

Indicates that the requested operation completed successfully without any issues.
This is the most general success code and can be used when a more specific
success code is not necessary or has not been defined.

</td>
<td>

[enums/common-success-response-code.enum.ts:24](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/common/enums/common-success-response-code.enum.ts#L24)

</td>
</tr>
</tbody>
</table>

---

### Endpoint

Defined in: [enums/endpoint.enum.ts:16](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/common/enums/endpoint.enum.ts#L16)

Base API Endpoints Enum

This enum defines the root-level API endpoints used throughout the application.
Each value represents a top-level API route segment that serves as a namespace
for more specific endpoints within that domain.

These root endpoints are typically combined with more specific sub-endpoints
(defined in domain-specific endpoint enums) to form complete API paths. For example,
the AUTH endpoint combined with an AuthEndpoint value would create a full authentication
API route.

This approach allows for organized, hierarchical API routing and helps maintain
consistency across the application's API structure.

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

<a id="enumeration-member-auth"></a> `AUTH`

</td>
<td>

`"auth"`

</td>
<td>

Authentication API endpoint root

Base path segment for all authentication-related operations.
This serves as the namespace for endpoints defined in AuthEndpoint enum.

Complete authentication endpoints are formed by combining this root with
specific authentication operations, e.g., "/auth/sign-in" or "/auth/verify-email".

**See**

AuthEndpoint For specific authentication operation endpoints

</td>
<td>

[enums/endpoint.enum.ts:28](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/common/enums/endpoint.enum.ts#L28)

</td>
</tr>
</tbody>
</table>

---

### Gateway

Defined in: [enums/gateways.enum.ts:17](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/common/enums/gateways.enum.ts#L17)

Application Gateways Enum

This enum defines the different communication gateways used in the application
for real-time or streaming data exchange. Each value represents a specific
gateway technology or implementation that enables bidirectional communication
between clients and the server.

Gateways provide alternatives to traditional HTTP request/response patterns,
allowing for push notifications, live updates, and interactive features.

The values in this enum can be used to identify and configure the appropriate
gateway implementation for different parts of the application.

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

<a id="enumeration-member-socket"></a> `SOCKET`

</td>
<td>

`"socket"`

</td>
<td>

WebSocket gateway

Represents the WebSocket-based communication gateway, which provides full-duplex
communication channels over a single, long-lived TCP connection.

This gateway enables real-time data exchange between clients and the server
without the overhead of repeatedly establishing new connections. It's particularly
useful for applications requiring low-latency updates, notifications, or
interactive features.

The implementation may use libraries like Socket.IO or native WebSockets.

</td>
<td>

[enums/gateways.enum.ts:31](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/common/enums/gateways.enum.ts#L31)

</td>
</tr>
</tbody>
</table>

---

### HttpClientErrorStatus

Defined in: [enums/http-status.enums.ts:83](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/common/enums/http-status.enums.ts#L83)

HTTP Client Error Status Codes (4xx)

This enum defines the standard HTTP status codes in the 4xx range (Client Error).
These status codes indicate that the client seems to have made an error in the request.

The 4xx class of status codes is intended for situations in which the client
appears to have erred, such as sending invalid authentication credentials,
requesting a resource that doesn't exist, or submitting malformed data.

#### See

https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#client\_error\_responses

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

<a id="enumeration-member-bad_request"></a> `BAD_REQUEST`

</td>
<td>

`400`

</td>
<td>

[enums/http-status.enums.ts:84](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/common/enums/http-status.enums.ts#L84)

</td>
</tr>
<tr>
<td>

<a id="enumeration-member-conflict"></a> `CONFLICT`

</td>
<td>

`409`

</td>
<td>

[enums/http-status.enums.ts:93](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/common/enums/http-status.enums.ts#L93)

</td>
</tr>
<tr>
<td>

<a id="enumeration-member-expectation_failed"></a> `EXPECTATION_FAILED`

</td>
<td>

`417`

</td>
<td>

[enums/http-status.enums.ts:101](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/common/enums/http-status.enums.ts#L101)

</td>
</tr>
<tr>
<td>

<a id="enumeration-member-failed_dependency"></a> `FAILED_DEPENDENCY`

</td>
<td>

`424`

</td>
<td>

[enums/http-status.enums.ts:106](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/common/enums/http-status.enums.ts#L106)

</td>
</tr>
<tr>
<td>

<a id="enumeration-member-forbidden"></a> `FORBIDDEN`

</td>
<td>

`403`

</td>
<td>

[enums/http-status.enums.ts:87](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/common/enums/http-status.enums.ts#L87)

</td>
</tr>
<tr>
<td>

<a id="enumeration-member-gone"></a> `GONE`

</td>
<td>

`410`

</td>
<td>

[enums/http-status.enums.ts:94](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/common/enums/http-status.enums.ts#L94)

</td>
</tr>
<tr>
<td>

<a id="enumeration-member-im_a_teapot"></a> `IM_A_TEAPOT`

</td>
<td>

`418`

</td>
<td>

[enums/http-status.enums.ts:102](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/common/enums/http-status.enums.ts#L102)

</td>
</tr>
<tr>
<td>

<a id="enumeration-member-length_required"></a> `LENGTH_REQUIRED`

</td>
<td>

`411`

</td>
<td>

[enums/http-status.enums.ts:95](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/common/enums/http-status.enums.ts#L95)

</td>
</tr>
<tr>
<td>

<a id="enumeration-member-locked"></a> `LOCKED`

</td>
<td>

`423`

</td>
<td>

[enums/http-status.enums.ts:105](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/common/enums/http-status.enums.ts#L105)

</td>
</tr>
<tr>
<td>

<a id="enumeration-member-method_not_allowed"></a> `METHOD_NOT_ALLOWED`

</td>
<td>

`405`

</td>
<td>

[enums/http-status.enums.ts:89](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/common/enums/http-status.enums.ts#L89)

</td>
</tr>
<tr>
<td>

<a id="enumeration-member-misdirected_request"></a> `MISDIRECTED_REQUEST`

</td>
<td>

`421`

</td>
<td>

[enums/http-status.enums.ts:103](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/common/enums/http-status.enums.ts#L103)

</td>
</tr>
<tr>
<td>

<a id="enumeration-member-not_acceptable"></a> `NOT_ACCEPTABLE`

</td>
<td>

`406`

</td>
<td>

[enums/http-status.enums.ts:90](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/common/enums/http-status.enums.ts#L90)

</td>
</tr>
<tr>
<td>

<a id="enumeration-member-not_found"></a> `NOT_FOUND`

</td>
<td>

`404`

</td>
<td>

[enums/http-status.enums.ts:88](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/common/enums/http-status.enums.ts#L88)

</td>
</tr>
<tr>
<td>

<a id="enumeration-member-payload_too_large"></a> `PAYLOAD_TOO_LARGE`

</td>
<td>

`413`

</td>
<td>

[enums/http-status.enums.ts:97](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/common/enums/http-status.enums.ts#L97)

</td>
</tr>
<tr>
<td>

<a id="enumeration-member-payment_required"></a> `PAYMENT_REQUIRED`

</td>
<td>

`402`

</td>
<td>

[enums/http-status.enums.ts:86](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/common/enums/http-status.enums.ts#L86)

</td>
</tr>
<tr>
<td>

<a id="enumeration-member-precondition_failed"></a> `PRECONDITION_FAILED`

</td>
<td>

`412`

</td>
<td>

[enums/http-status.enums.ts:96](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/common/enums/http-status.enums.ts#L96)

</td>
</tr>
<tr>
<td>

<a id="enumeration-member-precondition_required"></a> `PRECONDITION_REQUIRED`

</td>
<td>

`428`

</td>
<td>

[enums/http-status.enums.ts:109](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/common/enums/http-status.enums.ts#L109)

</td>
</tr>
<tr>
<td>

<a id="enumeration-member-proxy_authentication_required"></a> `PROXY_AUTHENTICATION_REQUIRED`

</td>
<td>

`407`

</td>
<td>

[enums/http-status.enums.ts:91](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/common/enums/http-status.enums.ts#L91)

</td>
</tr>
<tr>
<td>

<a id="enumeration-member-range_not_satisfiable"></a> `RANGE_NOT_SATISFIABLE`

</td>
<td>

`416`

</td>
<td>

[enums/http-status.enums.ts:100](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/common/enums/http-status.enums.ts#L100)

</td>
</tr>
<tr>
<td>

<a id="enumeration-member-request_header_fields_too_large"></a> `REQUEST_HEADER_FIELDS_TOO_LARGE`

</td>
<td>

`431`

</td>
<td>

[enums/http-status.enums.ts:111](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/common/enums/http-status.enums.ts#L111)

</td>
</tr>
<tr>
<td>

<a id="enumeration-member-request_timeout"></a> `REQUEST_TIMEOUT`

</td>
<td>

`408`

</td>
<td>

[enums/http-status.enums.ts:92](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/common/enums/http-status.enums.ts#L92)

</td>
</tr>
<tr>
<td>

<a id="enumeration-member-too_early"></a> `TOO_EARLY`

</td>
<td>

`425`

</td>
<td>

[enums/http-status.enums.ts:107](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/common/enums/http-status.enums.ts#L107)

</td>
</tr>
<tr>
<td>

<a id="enumeration-member-too_many_requests"></a> `TOO_MANY_REQUESTS`

</td>
<td>

`429`

</td>
<td>

[enums/http-status.enums.ts:110](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/common/enums/http-status.enums.ts#L110)

</td>
</tr>
<tr>
<td>

<a id="enumeration-member-unauthorized"></a> `UNAUTHORIZED`

</td>
<td>

`401`

</td>
<td>

[enums/http-status.enums.ts:85](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/common/enums/http-status.enums.ts#L85)

</td>
</tr>
<tr>
<td>

<a id="enumeration-member-unavailable_for_legal_reasons"></a> `UNAVAILABLE_FOR_LEGAL_REASONS`

</td>
<td>

`451`

</td>
<td>

[enums/http-status.enums.ts:112](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/common/enums/http-status.enums.ts#L112)

</td>
</tr>
<tr>
<td>

<a id="enumeration-member-unprocessable_entity"></a> `UNPROCESSABLE_ENTITY`

</td>
<td>

`422`

</td>
<td>

[enums/http-status.enums.ts:104](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/common/enums/http-status.enums.ts#L104)

</td>
</tr>
<tr>
<td>

<a id="enumeration-member-unsupported_media_type"></a> `UNSUPPORTED_MEDIA_TYPE`

</td>
<td>

`415`

</td>
<td>

[enums/http-status.enums.ts:99](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/common/enums/http-status.enums.ts#L99)

</td>
</tr>
<tr>
<td>

<a id="enumeration-member-upgrade_required"></a> `UPGRADE_REQUIRED`

</td>
<td>

`426`

</td>
<td>

[enums/http-status.enums.ts:108](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/common/enums/http-status.enums.ts#L108)

</td>
</tr>
<tr>
<td>

<a id="enumeration-member-uri_too_long"></a> `URI_TOO_LONG`

</td>
<td>

`414`

</td>
<td>

[enums/http-status.enums.ts:98](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/common/enums/http-status.enums.ts#L98)

</td>
</tr>
</tbody>
</table>

---

### HttpInfoStatus

Defined in: [enums/http-status.enums.ts:15](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/common/enums/http-status.enums.ts#L15)

HTTP Informational Status Codes (1xx)

This enum defines the standard HTTP status codes in the 1xx range (Informational).
These status codes indicate a provisional response and require the client
to continue with the request or ignore the response if the request is already finished.

The 1xx class of status codes represents preliminary information, indicating that
the request was received and is continuing to be processed.

#### See

https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#information\_responses

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

<a id="enumeration-member-continue"></a> `CONTINUE`

</td>
<td>

`100`

</td>
<td>

[enums/http-status.enums.ts:16](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/common/enums/http-status.enums.ts#L16)

</td>
</tr>
<tr>
<td>

<a id="enumeration-member-earlyhints"></a> `EARLYHINTS`

</td>
<td>

`103`

</td>
<td>

[enums/http-status.enums.ts:19](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/common/enums/http-status.enums.ts#L19)

</td>
</tr>
<tr>
<td>

<a id="enumeration-member-processing"></a> `PROCESSING`

</td>
<td>

`102`

</td>
<td>

[enums/http-status.enums.ts:18](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/common/enums/http-status.enums.ts#L18)

</td>
</tr>
<tr>
<td>

<a id="enumeration-member-switching_protocols"></a> `SWITCHING_PROTOCOLS`

</td>
<td>

`101`

</td>
<td>

[enums/http-status.enums.ts:17](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/common/enums/http-status.enums.ts#L17)

</td>
</tr>
</tbody>
</table>

---

### HttpRedirectionStatus

Defined in: [enums/http-status.enums.ts:60](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/common/enums/http-status.enums.ts#L60)

HTTP Redirection Status Codes (3xx)

This enum defines the standard HTTP status codes in the 3xx range (Redirection).
These status codes indicate that further action needs to be taken by the client
in order to complete the request, typically involving following a redirect.

The 3xx class of status codes indicates the client must take additional action
to complete the request, such as following a new URL or using a cached version.

#### See

https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#redirection\_messages

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

<a id="enumeration-member-found"></a> `FOUND`

</td>
<td>

`302`

</td>
<td>

[enums/http-status.enums.ts:63](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/common/enums/http-status.enums.ts#L63)

</td>
</tr>
<tr>
<td>

<a id="enumeration-member-moved_permanently"></a> `MOVED_PERMANENTLY`

</td>
<td>

`301`

</td>
<td>

[enums/http-status.enums.ts:62](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/common/enums/http-status.enums.ts#L62)

</td>
</tr>
<tr>
<td>

<a id="enumeration-member-multiple_choices"></a> `MULTIPLE_CHOICES`

</td>
<td>

`300`

</td>
<td>

[enums/http-status.enums.ts:61](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/common/enums/http-status.enums.ts#L61)

</td>
</tr>
<tr>
<td>

<a id="enumeration-member-not_modified"></a> `NOT_MODIFIED`

</td>
<td>

`304`

</td>
<td>

[enums/http-status.enums.ts:65](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/common/enums/http-status.enums.ts#L65)

</td>
</tr>
<tr>
<td>

<a id="enumeration-member-permanent_redirect"></a> `PERMANENT_REDIRECT`

</td>
<td>

`308`

</td>
<td>

[enums/http-status.enums.ts:68](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/common/enums/http-status.enums.ts#L68)

</td>
</tr>
<tr>
<td>

<a id="enumeration-member-see_other"></a> `SEE_OTHER`

</td>
<td>

`303`

</td>
<td>

[enums/http-status.enums.ts:64](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/common/enums/http-status.enums.ts#L64)

</td>
</tr>
<tr>
<td>

<a id="enumeration-member-temporary_redirect"></a> `TEMPORARY_REDIRECT`

</td>
<td>

`307`

</td>
<td>

[enums/http-status.enums.ts:67](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/common/enums/http-status.enums.ts#L67)

</td>
</tr>
<tr>
<td>

<a id="enumeration-member-use_proxy"></a> `USE_PROXY`

</td>
<td>

`305`

</td>
<td>

[enums/http-status.enums.ts:66](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/common/enums/http-status.enums.ts#L66)

</td>
</tr>
</tbody>
</table>

---

### HttpServerErrorStatus

Defined in: [enums/http-status.enums.ts:128](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/common/enums/http-status.enums.ts#L128)

HTTP Server Error Status Codes (5xx)

This enum defines the standard HTTP status codes in the 5xx range (Server Error).
These status codes indicate that the server failed to fulfill a valid request.

The 5xx class of status codes is intended for cases in which the server is aware
that it has encountered an error or is otherwise incapable of performing the
request. These errors are typically related to server configuration issues,
unexpected conditions, or temporary overloading.

#### See

https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#server\_error\_responses

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

<a id="enumeration-member-bad_gateway"></a> `BAD_GATEWAY`

</td>
<td>

`502`

</td>
<td>

[enums/http-status.enums.ts:131](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/common/enums/http-status.enums.ts#L131)

</td>
</tr>
<tr>
<td>

<a id="enumeration-member-gateway_timeout"></a> `GATEWAY_TIMEOUT`

</td>
<td>

`504`

</td>
<td>

[enums/http-status.enums.ts:133](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/common/enums/http-status.enums.ts#L133)

</td>
</tr>
<tr>
<td>

<a id="enumeration-member-http_version_not_supported"></a> `HTTP_VERSION_NOT_SUPPORTED`

</td>
<td>

`505`

</td>
<td>

[enums/http-status.enums.ts:134](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/common/enums/http-status.enums.ts#L134)

</td>
</tr>
<tr>
<td>

<a id="enumeration-member-insufficient_storage"></a> `INSUFFICIENT_STORAGE`

</td>
<td>

`507`

</td>
<td>

[enums/http-status.enums.ts:136](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/common/enums/http-status.enums.ts#L136)

</td>
</tr>
<tr>
<td>

<a id="enumeration-member-internal_server_error"></a> `INTERNAL_SERVER_ERROR`

</td>
<td>

`500`

</td>
<td>

[enums/http-status.enums.ts:129](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/common/enums/http-status.enums.ts#L129)

</td>
</tr>
<tr>
<td>

<a id="enumeration-member-loop_detected"></a> `LOOP_DETECTED`

</td>
<td>

`508`

</td>
<td>

[enums/http-status.enums.ts:137](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/common/enums/http-status.enums.ts#L137)

</td>
</tr>
<tr>
<td>

<a id="enumeration-member-network_authentication_required"></a> `NETWORK_AUTHENTICATION_REQUIRED`

</td>
<td>

`511`

</td>
<td>

[enums/http-status.enums.ts:139](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/common/enums/http-status.enums.ts#L139)

</td>
</tr>
<tr>
<td>

<a id="enumeration-member-not_extended"></a> `NOT_EXTENDED`

</td>
<td>

`510`

</td>
<td>

[enums/http-status.enums.ts:138](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/common/enums/http-status.enums.ts#L138)

</td>
</tr>
<tr>
<td>

<a id="enumeration-member-not_implemented"></a> `NOT_IMPLEMENTED`

</td>
<td>

`501`

</td>
<td>

[enums/http-status.enums.ts:130](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/common/enums/http-status.enums.ts#L130)

</td>
</tr>
<tr>
<td>

<a id="enumeration-member-service_unavailable"></a> `SERVICE_UNAVAILABLE`

</td>
<td>

`503`

</td>
<td>

[enums/http-status.enums.ts:132](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/common/enums/http-status.enums.ts#L132)

</td>
</tr>
<tr>
<td>

<a id="enumeration-member-variant_also_negotiates"></a> `VARIANT_ALSO_NEGOTIATES`

</td>
<td>

`506`

</td>
<td>

[enums/http-status.enums.ts:135](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/common/enums/http-status.enums.ts#L135)

</td>
</tr>
</tbody>
</table>

---

### HttpSuccessStatus

Defined in: [enums/http-status.enums.ts:35](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/common/enums/http-status.enums.ts#L35)

HTTP Success Status Codes (2xx)

This enum defines the standard HTTP status codes in the 2xx range (Success).
These status codes indicate that the client's request was successfully received,
understood, and accepted.

The 2xx class of status codes represents successful completion of the HTTP request,
with different codes indicating specific types of success such as resource creation,
accepted but not yet processed requests, or successful responses with no content.

#### See

https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#successful\_responses

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

<a id="enumeration-member-accepted"></a> `ACCEPTED`

</td>
<td>

`202`

</td>
<td>

[enums/http-status.enums.ts:38](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/common/enums/http-status.enums.ts#L38)

</td>
</tr>
<tr>
<td>

<a id="enumeration-member-already_reported"></a> `ALREADY_REPORTED`

</td>
<td>

`208`

</td>
<td>

[enums/http-status.enums.ts:44](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/common/enums/http-status.enums.ts#L44)

</td>
</tr>
<tr>
<td>

<a id="enumeration-member-content_different"></a> `CONTENT_DIFFERENT`

</td>
<td>

`210`

</td>
<td>

[enums/http-status.enums.ts:45](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/common/enums/http-status.enums.ts#L45)

</td>
</tr>
<tr>
<td>

<a id="enumeration-member-created"></a> `CREATED`

</td>
<td>

`201`

</td>
<td>

[enums/http-status.enums.ts:37](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/common/enums/http-status.enums.ts#L37)

</td>
</tr>
<tr>
<td>

<a id="enumeration-member-multi_status"></a> `MULTI_STATUS`

</td>
<td>

`207`

</td>
<td>

[enums/http-status.enums.ts:43](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/common/enums/http-status.enums.ts#L43)

</td>
</tr>
<tr>
<td>

<a id="enumeration-member-no_content"></a> `NO_CONTENT`

</td>
<td>

`204`

</td>
<td>

[enums/http-status.enums.ts:40](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/common/enums/http-status.enums.ts#L40)

</td>
</tr>
<tr>
<td>

<a id="enumeration-member-non_authoritative_information"></a> `NON_AUTHORITATIVE_INFORMATION`

</td>
<td>

`203`

</td>
<td>

[enums/http-status.enums.ts:39](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/common/enums/http-status.enums.ts#L39)

</td>
</tr>
<tr>
<td>

<a id="enumeration-member-ok"></a> `OK`

</td>
<td>

`200`

</td>
<td>

[enums/http-status.enums.ts:36](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/common/enums/http-status.enums.ts#L36)

</td>
</tr>
<tr>
<td>

<a id="enumeration-member-partial_content"></a> `PARTIAL_CONTENT`

</td>
<td>

`206`

</td>
<td>

[enums/http-status.enums.ts:42](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/common/enums/http-status.enums.ts#L42)

</td>
</tr>
<tr>
<td>

<a id="enumeration-member-reset_content"></a> `RESET_CONTENT`

</td>
<td>

`205`

</td>
<td>

[enums/http-status.enums.ts:41](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/common/enums/http-status.enums.ts#L41)

</td>
</tr>
</tbody>
</table>

## Interfaces

### ErrorResponse

Defined in: [interfaces/response.interfaces.ts:126](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/common/interfaces/response.interfaces.ts#L126)

Interface for error API responses that include error details.

The `ErrorResponse` interface extends the base `HttpResponse` interface to standardize
error responses across the application. It includes properties for error identification,
detailed error information, and optionally the original error object for debugging.

This structured approach to error responses makes it easier for clients to handle
errors in a consistent way and for developers to debug issues in the system.

ErrorResponse

#### See

- [HttpResponse](#httpresponse) Base interface for all responses
- [HttpClientErrorStatus](#httpclienterrorstatus) Client error HTTP status codes
- [HttpServerErrorStatus](#httpservererrorstatus) Server error HTTP status codes
- [ErrorResponseCode](#errorresponsecode) Application-specific error codes

#### Extends

- [`HttpResponse`](#httpresponse)

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Description</th>
<th>Overrides</th>
<th>Inherited from</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="property-code-1"></a> `code`

</td>
<td>

[`ErrorResponseCode`](#errorresponsecode)

</td>
<td>

Application-specific error code.

This provides more granular information about the specific error case,
allowing clients to handle different error scenarios distinctly.

**See**

[ErrorResponseCode](#errorresponsecode) Type for error response codes

</td>
<td>

[`HttpResponse`](#httpresponse).[`code`](#property-code-2)

</td>
<td>

‐

</td>
<td>

[interfaces/response.interfaces.ts:147](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/common/interfaces/response.interfaces.ts#L147)

</td>
</tr>
<tr>
<td>

<a id="property-description-1"></a> `description?`

</td>
<td>

`string`

</td>
<td>

Optional detailed description of the response.

When provided, this field contains additional information about the response
that might be useful for debugging or logging purposes. Unlike the message field,
this can contain technical details and is primarily intended for developers
rather than end users.

</td>
<td>

‐

</td>
<td>

[`HttpResponse`](#httpresponse).[`description`](#property-description-2)

</td>
<td>

[interfaces/response.interfaces.ts:66](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/common/interfaces/response.interfaces.ts#L66)

</td>
</tr>
<tr>
<td>

<a id="property-message-1"></a> `message`

</td>
<td>

`string`

</td>
<td>

Human-readable message describing the response.

This short message explains the result of the operation and is suitable
for displaying to end users. It should be clear, concise, and avoid
technical details that aren't relevant to users.

</td>
<td>

‐

</td>
<td>

[`HttpResponse`](#httpresponse).[`message`](#property-message-2)

</td>
<td>

[interfaces/response.interfaces.ts:56](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/common/interfaces/response.interfaces.ts#L56)

</td>
</tr>
<tr>
<td>

<a id="property-statuscode-1"></a> `statusCode`

</td>
<td>

| [`HttpClientErrorStatus`](#httpclienterrorstatus) | [`HttpServerErrorStatus`](#httpservererrorstatus)

</td>
<td>

The HTTP status code, which will be an error code (4xx or 5xx).

For error responses, this will typically be:

- 4xx range for client errors (e.g., 400 Bad Request, 404 Not Found)
- 5xx range for server errors (e.g., 500 Internal Server Error)

**See**

- [HttpClientErrorStatus](#httpclienterrorstatus) Enum of client error status codes
- [HttpServerErrorStatus](#httpservererrorstatus) Enum of server error status codes

</td>
<td>

[`HttpResponse`](#httpresponse).[`statusCode`](#property-statuscode-2)

</td>
<td>

‐

</td>
<td>

[interfaces/response.interfaces.ts:137](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/common/interfaces/response.interfaces.ts#L137)

</td>
</tr>
</tbody>
</table>

---

### HttpResponse

Defined in: [interfaces/response.interfaces.ts:21](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/common/interfaces/response.interfaces.ts#L21)

Base interface for all HTTP responses in the application.

The `HttpResponse` interface defines the standard structure for API responses
throughout the application. It ensures a consistent response format that includes
status information, a specific response code, and descriptive messages.

This standardized format makes it easier for clients to process responses and
handle different scenarios (success, error, etc.) in a consistent manner.

HttpResponse

#### See

- [SuccessResponse](#successresponse) For successful operation responses
- [ErrorResponse](#errorresponse) For error operation responses
- [ResponseCode](#responsecode) Type for response status codes
- [HttpStatus](#httpstatus) HTTP status codes enumeration

#### Extended by

- [`SuccessResponse`](#successresponse)
- [`ErrorResponse`](#errorresponse)

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

<a id="property-code-2"></a> `code`

</td>
<td>

[`ResponseCode`](#responsecode)

</td>
<td>

Application-specific response code.

This code provides more detailed information about the specific result
of the operation beyond what the HTTP status code indicates. It allows
for fine-grained categorization of responses within each HTTP status category.

**See**

- [ResponseCode](#responsecode) Union type for all response codes
- [SuccessResponseCode](#successresponsecode) Type for success response codes
- [ErrorResponseCode](#errorresponsecode) Type for error response codes

</td>
<td>

[interfaces/response.interfaces.ts:47](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/common/interfaces/response.interfaces.ts#L47)

</td>
</tr>
<tr>
<td>

<a id="property-description-2"></a> `description?`

</td>
<td>

`string`

</td>
<td>

Optional detailed description of the response.

When provided, this field contains additional information about the response
that might be useful for debugging or logging purposes. Unlike the message field,
this can contain technical details and is primarily intended for developers
rather than end users.

</td>
<td>

[interfaces/response.interfaces.ts:66](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/common/interfaces/response.interfaces.ts#L66)

</td>
</tr>
<tr>
<td>

<a id="property-message-2"></a> `message`

</td>
<td>

`string`

</td>
<td>

Human-readable message describing the response.

This short message explains the result of the operation and is suitable
for displaying to end users. It should be clear, concise, and avoid
technical details that aren't relevant to users.

</td>
<td>

[interfaces/response.interfaces.ts:56](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/common/interfaces/response.interfaces.ts#L56)

</td>
</tr>
<tr>
<td>

<a id="property-statuscode-2"></a> `statusCode`

</td>
<td>

[`HttpStatus`](#httpstatus)

</td>
<td>

The HTTP status code for the response.

This corresponds to standard HTTP status codes (200, 400, 500, etc.)
and provides a quick way for clients to determine the general category
of the response (success, client error, server error).

**See**

- [HttpStatus](#httpstatus) Type for HTTP status codes
- [HttpSuccessStatus](#httpsuccessstatus) Enum for success status codes
- [HttpClientErrorStatus](#httpclienterrorstatus) Enum for client error status codes
- [HttpServerErrorStatus](#httpservererrorstatus) Enum for server error status codes

</td>
<td>

[interfaces/response.interfaces.ts:34](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/common/interfaces/response.interfaces.ts#L34)

</td>
</tr>
</tbody>
</table>

---

### SuccessResponse

Defined in: [interfaces/response.interfaces.ts:84](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/common/interfaces/response.interfaces.ts#L84)

Interface for successful API responses that include data payload.

The `SuccessResponse` interface extends the base `HttpResponse` interface to include
a data property containing the operation's result. This interface is used for all
successful API responses that need to return data to the client.

The generic type parameter `T` allows for type-safe specification of the data structure
being returned, ensuring consistency between backend definitions and frontend expectations.

SuccessResponse

#### See

[HttpResponse](#httpresponse) Base interface for all responses

#### Extends

- [`HttpResponse`](#httpresponse)

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Description</th>
<th>Overrides</th>
<th>Inherited from</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="property-code-3"></a> `code`

</td>
<td>

[`SuccessResponseCode`](#successresponsecode)

</td>
<td>

Application-specific success code.

This provides more granular information about the specific success case,
allowing clients to handle different success scenarios distinctly if needed.

**See**

[SuccessResponseCode](#successresponsecode) Type for success response codes

</td>
<td>

[`HttpResponse`](#httpresponse).[`code`](#property-code-2)

</td>
<td>

‐

</td>
<td>

[interfaces/response.interfaces.ts:105](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/common/interfaces/response.interfaces.ts#L105)

</td>
</tr>
<tr>
<td>

<a id="property-description-3"></a> `description?`

</td>
<td>

`string`

</td>
<td>

Optional detailed description of the response.

When provided, this field contains additional information about the response
that might be useful for debugging or logging purposes. Unlike the message field,
this can contain technical details and is primarily intended for developers
rather than end users.

</td>
<td>

‐

</td>
<td>

[`HttpResponse`](#httpresponse).[`description`](#property-description-2)

</td>
<td>

[interfaces/response.interfaces.ts:66](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/common/interfaces/response.interfaces.ts#L66)

</td>
</tr>
<tr>
<td>

<a id="property-message-3"></a> `message`

</td>
<td>

`string`

</td>
<td>

Human-readable message describing the response.

This short message explains the result of the operation and is suitable
for displaying to end users. It should be clear, concise, and avoid
technical details that aren't relevant to users.

</td>
<td>

‐

</td>
<td>

[`HttpResponse`](#httpresponse).[`message`](#property-message-2)

</td>
<td>

[interfaces/response.interfaces.ts:56](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/common/interfaces/response.interfaces.ts#L56)

</td>
</tr>
<tr>
<td>

<a id="property-statuscode-3"></a> `statusCode`

</td>
<td>

[`HttpSuccessStatus`](#httpsuccessstatus)

</td>
<td>

The HTTP status code, which will be a success code (2xx).

For successful responses, this will typically be:

- 200 (OK) for general success
- 201 (Created) when a resource was successfully created
- 204 (No Content) when an operation succeeded but returns no data

**See**

[HttpSuccessStatus](#httpsuccessstatus) Enum of available success status codes

</td>
<td>

[`HttpResponse`](#httpresponse).[`statusCode`](#property-statuscode-2)

</td>
<td>

‐

</td>
<td>

[interfaces/response.interfaces.ts:95](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/common/interfaces/response.interfaces.ts#L95)

</td>
</tr>
</tbody>
</table>

---

### UserInfo

Defined in: [interfaces/user-info.interface.ts:38](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/common/interfaces/user-info.interface.ts#L38)

Interface representing essential user information.

The `UserInfo` interface defines the core identifying information for a user
that is commonly needed throughout the application. It contains only the essential
properties needed to identify and display basic user information, without including
sensitive or authentication-related data.

This interface is designed to be embedded within other entities for tracking user
associations, such as who created or modified a record. It's a lightweight alternative
to embedding or referencing the complete user entity.

Common use cases:

- Audit trails for entity creation and modification
- Activity logs showing which user performed an action
- User attribution in collaborative features
- Display of user information in UI components

#### See

- Model Uses this interface for tracking entity ownership and changes
- EntityId Type used for the user identifier

#### Example

```typescript
// Example of a blog post entity using UserInfo
interface BlogPost {
  id: EntityId;
  title: string;
  content: string;
  author: UserInfo; // The user who wrote the post
  lastEditedBy?: UserInfo; // The user who last edited the post
}
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

<a id="property-firstname"></a> `firstName`

</td>
<td>

`string`

</td>
<td>

The user's first name or given name.

Used for personalization and formal addressing throughout the application.

</td>
<td>

[interfaces/user-info.interface.ts:52](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/common/interfaces/user-info.interface.ts#L52)

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

The user's complete name, typically a combination of first and last name.

This property provides a convenience for displaying the user's full name
without having to concatenate the first and last names manually. The exact
format may vary based on locale and application requirements.

</td>
<td>

[interfaces/user-info.interface.ts:68](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/common/interfaces/user-info.interface.ts#L68)

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

The unique identifier for the user.

This ID corresponds to the primary key in the users table
and uniquely identifies the user across the entire system.

</td>
<td>

[interfaces/user-info.interface.ts:45](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/common/interfaces/user-info.interface.ts#L45)

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

The user's last name or family name.

Used alongside the first name for formal addressing and identification.

</td>
<td>

[interfaces/user-info.interface.ts:59](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/common/interfaces/user-info.interface.ts#L59)

</td>
</tr>
</tbody>
</table>

## Type Aliases

### ErrorResponseCode

```ts
type ErrorResponseCode = LooseAutocomplete<AuthErrorResponseCode>;
```

Defined in: [types/response-code.ts:62](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/common/types/response-code.ts#L62)

Represents all possible error response codes used throughout the application.

The `ErrorResponseCode` type is a union of error response codes from different
modules in the system. It provides a centralized type for all error scenarios,
ensuring consistency and type safety when working with error API responses.

This type is used in the `ErrorResponse` interface to ensure that only valid
error codes are used when constructing error responses.

#### See

- [ResponseCode](#responsecode) Type for all response codes
- AuthErrorResponseCode Authentication-related error codes
- [ErrorResponse](#errorresponse) Interface for error HTTP responses

---

### FileId

```ts
type FileId = string & object;
```

Defined in: [types/types.ts:38](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/common/types/types.ts#L38)

Represents a strongly-typed unique identifier for a file.

This type is a branded string, ensuring that only valid `FileId`
values can be assigned or passed to functions expecting this type.
This provides additional type safety by preventing ordinary strings
from being used where FileId values are expected.

The `__brand` property is used for type checking only and does not exist
on the runtime value - it's just a TypeScript type system feature.

#### Type Declaration

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`__brand`

</td>
<td>

unique `symbol`

</td>
<td>

[types/types.ts:38](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/common/types/types.ts#L38)

</td>
</tr>
</tbody>
</table>

#### Example

```typescript
// Creating a FileId (typically done inside a validated factory function)
function validateAndCreateFileId(id: string): FileId {
  // Validation logic here
  return id as FileId;
}

// Using the type in a function signature
function getFileDetails(fileId: FileId) {
  // Function can trust that fileId is valid
}
```

#### See

EntityId Generic entity identifier type

---

### HttpStatus

```ts
type HttpStatus =
  | HttpInfoStatus
  | HttpSuccessStatus
  | HttpRedirectionStatus
  | HttpClientErrorStatus
  | HttpServerErrorStatus;
```

Defined in: [types/types.ts:96](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/common/types/types.ts#L96)

Comprehensive HTTP status code type.

The `HttpStatus` type is a union of all HTTP status code categories defined in the HTTP
specification. It provides a complete and type-safe representation of all possible
HTTP status codes that can be used in API responses.

This type is used throughout the application to ensure consistency and type safety
when working with HTTP status codes in controllers, interceptors, and response handlers.

#### See

- [HttpInfoStatus](#httpinfostatus) Informational status codes (1xx)
- [HttpSuccessStatus](#httpsuccessstatus) Success status codes (2xx)
- [HttpRedirectionStatus](#httpredirectionstatus) Redirection status codes (3xx)
- [HttpClientErrorStatus](#httpclienterrorstatus) Client error status codes (4xx)
- [HttpServerErrorStatus](#httpservererrorstatus) Server error status codes (5xx)
- [HttpResponse](#httpresponse) Base interface for HTTP responses

---

### ResponseCode

```ts
type ResponseCode = LooseAutocomplete<
  CommonSuccessResponseCode | AuthSuccessResponseCode | AuthErrorResponseCode
>;
```

Defined in: [types/response-code.ts:23](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/common/types/response-code.ts#L23)

Represents all possible response codes used throughout the application.

The `ResponseCode` type is a union of all success and error response codes
from different modules in the system. It provides a centralized type for
all response codes, ensuring consistency and type safety when working with
API responses.

The type uses `LooseAutocomplete` to provide IDE autocompletion while still
allowing for extensibility with string literals when needed (e.g., for module-specific
codes that may be added in the future).

#### See

- [SuccessResponseCode](#successresponsecode) Type for success response codes only
- [ErrorResponseCode](#errorresponsecode) Type for error response codes only
- [HttpResponse](#httpresponse) Base interface for HTTP responses

---

### SocketId

```ts
type SocketId = string & object;
```

Defined in: [types/types.ts:77](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/common/types/types.ts#L77)

Represents a strongly-typed socket identifier for WebSocket connections.

The `SocketId` type is a branded string type that ensures socket identifiers
are treated as a distinct type from regular strings. This provides type safety
by preventing arbitrary strings from being used where socket IDs are expected.

This type is typically used in WebSocket services and connection management
to uniquely identify and track active socket connections.

#### Type Declaration

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`__brand`

</td>
<td>

unique `symbol`

</td>
<td>

[types/types.ts:77](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/common/types/types.ts#L77)

</td>
</tr>
</tbody>
</table>

#### Example

```typescript
// Creating a SocketId (typically done by a socket manager)
function createSocketId(rawId: string): SocketId {
  return rawId as SocketId;
}

// Using in a connection manager
class SocketConnectionManager {
  private connections = new Map<SocketId, WebSocket>();

  addConnection(socketId: SocketId, socket: WebSocket) {
    this.connections.set(socketId, socket);
  }
}
```

---

### SuccessResponseCode

```ts
type SuccessResponseCode = LooseAutocomplete<
  CommonSuccessResponseCode | AuthSuccessResponseCode
>;
```

Defined in: [types/response-code.ts:44](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/common/types/response-code.ts#L44)

Represents all possible success response codes used throughout the application.

The `SuccessResponseCode` type is a union of success response codes from different
modules in the system. It provides a centralized type for all success scenarios,
ensuring consistency and type safety when working with successful API responses.

This type is used in the `SuccessResponse` interface to ensure that only valid
success codes are used when constructing responses.

#### See

- [ResponseCode](#responsecode) Type for all response codes
- [CommonSuccessResponseCode](#commonsuccessresponsecode) Common success response codes
- AuthSuccessResponseCode Authentication-related success codes
- [SuccessResponse](#successresponse) Interface for successful HTTP responses

---

### WsRefId

```ts
type WsRefId = (string & object) | "system";
```

Defined in: [types/types.ts:48](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/common/types/types.ts#L48)

Represents a type alias `WsRefId` which is either a branded string or the literal string "system".

A branded string is a specific type of string that has been augmented with the `__brand` unique symbol.
This branding is used to provide stronger type safety and to differentiate the string from other generic strings.

The literal string `"system"` is included as an alternative value.

## Variables

### DAY_IN_HOURS

```ts
const DAY_IN_HOURS: 24 = 24;
```

Defined in: [constants.ts:4](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/common/constants.ts#L4)

---

### DAY_IN_SECONDS

```ts
const DAY_IN_SECONDS: number;
```

Defined in: [constants.ts:5](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/common/constants.ts#L5)

---

### DEFAULT_ITEMS_PER_PAGE

```ts
const DEFAULT_ITEMS_PER_PAGE: 10 = 10;
```

Defined in: [constants.ts:19](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/common/constants.ts#L19)

---

### DEFAULT_MYSQL_PORT

```ts
const DEFAULT_MYSQL_PORT: 3306 = 3306;
```

Defined in: [constants.ts:17](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/common/constants.ts#L17)

---

### DEFAULT_REDIS_PORT

```ts
const DEFAULT_REDIS_PORT: 6379 = 6379;
```

Defined in: [constants.ts:15](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/common/constants.ts#L15)

---

### DEFAULT_SALT_ROUNDS

```ts
const DEFAULT_SALT_ROUNDS: 10 = 10;
```

Defined in: [constants.ts:11](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/common/constants.ts#L11)

---

### DEFAULT_UUID_VERSION

```ts
const DEFAULT_UUID_VERSION: 4 = 4;
```

Defined in: [constants.ts:13](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/common/constants.ts#L13)

---

### DEFAULT_VERIFY_TOKEN_LENGTH

```ts
const DEFAULT_VERIFY_TOKEN_LENGTH: 16 = 16;
```

Defined in: [constants.ts:9](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/common/constants.ts#L9)

---

### Errors

```ts
const Errors: { [key in CommonErrorResponseCode]: ErrorResponse };
```

Defined in: [responses/error.responses.ts:71](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/common/responses/error.responses.ts#L71)

Collection of standardized common error responses

This constant maps each common error response code to its corresponding
standardized error response object. The responses include HTTP status codes,
error codes, and human-readable messages.

Key features:

- Standardized error response format following the ErrorResponse interface
- Comprehensive coverage of common error scenarios
- Organized by HTTP status code (400, 401, 403, 404, 500)
- Includes specialized errors for ID validation, file operations, and general errors
- Human-readable error messages suitable for end-users

The error responses are organized into categories based on HTTP status codes:

- 400 Bad Request: Client errors related to invalid input or request format
- 401 Unauthorized: Authentication failures
- 403 Forbidden: Access denied due to insufficient permissions
- 404 Not Found: Resource not found errors
- 500 Internal Server Error: Server-side errors

The object is organized by error code, with each code mapping to an ErrorResponse
object that follows the standardized format defined by the ErrorResponse interface.

#### Examples

```typescript
// Using an error response in an exception
import { Errors } from "@hichchi/nest-connector";
import { BadRequestException } from "@nestjs/common";

// In a service method
if (!id) {
  throw new BadRequestException(Errors.ERROR_400_EMPTY_ID);
}
```

```typescript
// Using an error response in a custom exception filter
import { Errors } from "@hichchi/nest-connector";
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  NotFoundException,
} from "@nestjs/common";

@Catch(NotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: NotFoundException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();
    const status = exception.getStatus();

    // Use a standard error response
    response.status(status).json(Errors.ERROR_404);
  }
}
```

#### See

- [CommonErrorResponseCode](#commonerrorresponsecode) For all available error codes
- [ErrorResponse](#errorresponse) For the structure of error response objects
- [HttpClientErrorStatus](#httpclienterrorstatus) For client error HTTP status codes
- [HttpServerErrorStatus](#httpservererrorstatus) For server error HTTP status codes

---

### HOUR_IN_MINUTES

```ts
const HOUR_IN_MINUTES: 60 = 60;
```

Defined in: [constants.ts:3](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/common/constants.ts#L3)

---

### MINUTE_IN_SECONDS

```ts
const MINUTE_IN_SECONDS: 60 = 60;
```

Defined in: [constants.ts:2](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/common/constants.ts#L2)

---

### MONTH_IN_DAYS

```ts
const MONTH_IN_DAYS: 30 = 30;
```

Defined in: [constants.ts:6](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/common/constants.ts#L6)

---

### MONTH_IN_SECONDS

```ts
const MONTH_IN_SECONDS: number;
```

Defined in: [constants.ts:7](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/common/constants.ts#L7)

---

### SECOND_IN_MS

```ts
const SECOND_IN_MS: 1000 = 1000;
```

Defined in: [constants.ts:1](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/common/constants.ts#L1)

---

### SuccessResponses

```ts
const SuccessResponses: { [key in CommonSuccessResponseCode]: SuccessResponse };
```

Defined in: [responses/success.responses.ts:59](https://github.com/hichchidev/hichchi/blob/ddfda2211ed6432fa0cfa8760d98fa9c6b64e318/libs/nest-connector/src/common/responses/success.responses.ts#L59)

Collection of standardized common success responses

This constant maps each common success response code to its corresponding
standardized success response object. The responses include HTTP status codes,
success codes, and human-readable messages.

Key features:

- Standardized success response format following the SuccessResponse interface
- Generic success response for common operations
- Consistent success message formatting across the application
- Extensible structure for adding more specific success responses as needed

Currently, this collection contains a single generic success response (SUCCESS),
but it can be extended with more specific success responses as the application
grows and more detailed success states need to be communicated.

#### Examples

```typescript
// Using a success response in a controller
import { SuccessResponses } from "@hichchi/nest-connector";
import { Controller, Get } from "@nestjs/common";

@Controller("items")
export class ItemsController {
  @Get()
  findAll() {
    // Return a generic success response
    return SuccessResponses.SUCCESS;
  }
}
```

```typescript
// Using a success response in a service
import { SuccessResponses } from "@hichchi/nest-connector";
import { Injectable } from "@nestjs/common";

@Injectable()
export class DataService {
  processData(data: any) {
    // Process data logic...
    return SuccessResponses.SUCCESS;
  }
}
```

#### See

- [CommonSuccessResponseCode](#commonsuccessresponsecode) For all available success codes
- [SuccessResponse](#successresponse) For the structure of success response objects
- [SuccessResponseDto](#successresponsedto) For a class-based approach to success responses
- [Errors](#errors) Complementary error responses for error handling
