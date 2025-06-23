**@hichchi/nest-core**

---

# nest-core

This library was generated with [Nx](https://nx.dev).

## Building

Run `nx build nest-core` to build the library.

## Running unit tests

Run `nx test nest-core` to execute the unit tests via [Jest](https://jestjs.io).
This library was generated with [Nx](https://nx.dev).

## Building

Run `nx build nest-core` to build the library.

## Running unit tests

Run `nx test nest-core` to execute the unit tests via [Jest](https://jestjs.io).

## Classes

### AllExceptionsFilter

Defined in: [libs/nest-core/src/lib/filters/http-exception.filter.ts:27](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-core/src/lib/filters/http-exception.filter.ts#L27)

All exceptions filter

This filter is used to catch all exceptions and handle them

#### Example

```TypeScript
async function bootstrap(): Promise<void> {
    const app = await NestFactory.create(AppModule);

    const { httpAdapter } = app.get(HttpAdapterHost);
    app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

    await app.listen(3000);
}
bootstrap();
```

#### Extends

- `BaseExceptionFilter`

#### Constructors

##### Constructor

```ts
new AllExceptionsFilter(applicationRef?): AllExceptionsFilter;
```

Defined in: node_modules/@nestjs/core/exceptions/base-exception-filter.d.ts:8

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

`applicationRef?`

</td>
<td>

`HttpServer`\<`any`, `any`, `any`\>

</td>
</tr>
</tbody>
</table>

###### Returns

[`AllExceptionsFilter`](#allexceptionsfilter)

###### Inherited from

```ts
BaseExceptionFilter.constructor;
```

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Modifier</th>
<th>Type</th>
<th>Inherited from</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="applicationref"></a> `applicationRef?`

</td>
<td>

`readonly`

</td>
<td>

`HttpServer`\<`any`, `any`, `any`\>

</td>
<td>

```ts
BaseExceptionFilter.applicationRef;
```

</td>
<td>

node_modules/@nestjs/core/exceptions/base-exception-filter.d.ts:5

</td>
</tr>
<tr>
<td>

<a id="httpadapterhost"></a> `httpAdapterHost?`

</td>
<td>

`readonly`

</td>
<td>

`HttpAdapterHost`\<`AbstractHttpAdapter`\<`any`, `any`, `any`\>\>

</td>
<td>

```ts
BaseExceptionFilter.httpAdapterHost;
```

</td>
<td>

node_modules/@nestjs/core/exceptions/base-exception-filter.d.ts:7

</td>
</tr>
</tbody>
</table>

#### Methods

##### catch()

```ts
catch(exception, host): void;
```

Defined in: [libs/nest-core/src/lib/filters/http-exception.filter.ts:28](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-core/src/lib/filters/http-exception.filter.ts#L28)

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

`exception`

</td>
<td>

`unknown`

</td>
</tr>
<tr>
<td>

`host`

</td>
<td>

`ArgumentsHost`

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### Overrides

```ts
BaseExceptionFilter.catch;
```

##### handleUnknownError()

```ts
handleUnknownError(
   exception,
   host,
   applicationRef): void;
```

Defined in: node_modules/@nestjs/core/exceptions/base-exception-filter.d.ts:10

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

`exception`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`host`

</td>
<td>

`ArgumentsHost`

</td>
</tr>
<tr>
<td>

`applicationRef`

</td>
<td>

\| `HttpServer`\<`any`, `any`, `any`\> \| `AbstractHttpAdapter`\<`any`, `any`, `any`\>

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### Inherited from

```ts
BaseExceptionFilter.handleUnknownError;
```

##### isExceptionObject()

```ts
isExceptionObject(err): err is Error;
```

Defined in: node_modules/@nestjs/core/exceptions/base-exception-filter.d.ts:11

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

`err`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

###### Returns

`err is Error`

###### Inherited from

```ts
BaseExceptionFilter.isExceptionObject;
```

##### isHttpError()

```ts
isHttpError(err): err is { message: string; statusCode: number };
```

Defined in: node_modules/@nestjs/core/exceptions/base-exception-filter.d.ts:16

Checks if the thrown error comes from the "http-errors" library.

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

`err`

</td>
<td>

`any`

</td>
<td>

error object

</td>
</tr>
</tbody>
</table>

###### Returns

`err is { message: string; statusCode: number }`

###### Inherited from

```ts
BaseExceptionFilter.isHttpError;
```

---

### CacheModule

Defined in: [libs/nest-core/src/lib/cache/cache.module.ts:12](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-core/src/lib/cache/cache.module.ts#L12)

#### Constructors

##### Constructor

```ts
new CacheModule(): CacheModule;
```

###### Returns

[`CacheModule`](#cachemodule)

#### Methods

##### register()

```ts
static register(options): DynamicModule;
```

Defined in: [libs/nest-core/src/lib/cache/cache.module.ts:13](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-core/src/lib/cache/cache.module.ts#L13)

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

[`RedisOptions`](#redisoptions)

</td>
</tr>
</tbody>
</table>

###### Returns

`DynamicModule`

---

### CacheService

Defined in: [libs/nest-core/src/lib/cache/services/cache.service.ts:28](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-core/src/lib/cache/services/cache.service.ts#L28)

Cache Service

This service provides a wrapper around the NestJS cache manager for storing and retrieving data.
It offers type-safe methods for getting, setting, and deleting cache entries with error handling.

#### Example

```TypeScript
// Inject the service
constructor(private readonly cacheService: CacheService) {}

// Store a value in cache
await cacheService.set('user:123', { name: 'John Doe' }, 3600); // expires in 1 hour

// Retrieve a value from cache
const user = await cacheService.get<{ name: string }>('user:123');

// Delete a value from cache
await cacheService.delete('user:123');
```

#### Constructors

##### Constructor

```ts
new CacheService(cacheManager): CacheService;
```

Defined in: [libs/nest-core/src/lib/cache/services/cache.service.ts:29](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-core/src/lib/cache/services/cache.service.ts#L29)

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

`cacheManager`

</td>
<td>

`Cache`

</td>
</tr>
</tbody>
</table>

###### Returns

[`CacheService`](#cacheservice)

#### Methods

##### delete()

```ts
delete(key): Promise<boolean>;
```

Defined in: [libs/nest-core/src/lib/cache/services/cache.service.ts:117](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-core/src/lib/cache/services/cache.service.ts#L117)

Delete a value from cache

This method removes a value from the cache by its key.
It returns true if the operation was successful, false if there was an error.

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

`key`

</td>
<td>

`string`

</td>
<td>

The unique key of the cached value to delete

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`boolean`\>

True if the operation was successful, false otherwise

###### Example

```TypeScript
// Delete a cached value
const success = await cacheService.delete('user:123');
if (success) {
  console.log('Cache entry successfully deleted');
} else {
  console.error('Failed to delete cache entry');
}
```

##### get()

```ts
get<T>(key): Promise<undefined | T>;
```

Defined in: [libs/nest-core/src/lib/cache/services/cache.service.ts:55](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-core/src/lib/cache/services/cache.service.ts#L55)

Get a value from cache

This method retrieves a value from the cache by its key.
It returns undefined if the key doesn't exist or if there's an error during retrieval.

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

`unknown`

</td>
<td>

The type of the cached value

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

`key`

</td>
<td>

`string`

</td>
<td>

The unique key to identify the cached value

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`undefined` \| `T`\>

The cached value if found, undefined otherwise

###### Example

```TypeScript
// Get a string value
const message = await cacheService.get<string>('greeting');

// Get a complex object
const user = await cacheService.get<User>('user:123');
if (user) {
  console.log(`Found user: ${user.name}`);
} else {
  console.log('User not found in cache');
}
```

##### set()

```ts
set<T>(
   key,
   value,
ttl?): Promise<boolean>;
```

Defined in: [libs/nest-core/src/lib/cache/services/cache.service.ts:88](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-core/src/lib/cache/services/cache.service.ts#L88)

Set a value in cache

This method stores a value in the cache with the specified key.
An optional time-to-live (TTL) can be provided to automatically expire the cache entry.

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

`unknown`

</td>
<td>

The type of the value to cache

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

`key`

</td>
<td>

`string`

</td>
<td>

The unique key to identify the cached value

</td>
</tr>
<tr>
<td>

`value`

</td>
<td>

`T`

</td>
<td>

The value to store in cache

</td>
</tr>
<tr>
<td>

`ttl?`

</td>
<td>

`number`

</td>
<td>

Optional time-to-live in seconds

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`boolean`\>

True if the operation was successful, false otherwise

###### Example

```TypeScript
// Store a simple value with no expiration
await cacheService.set('greeting', 'Hello, World!');

// Store an object with a 1-hour expiration
await cacheService.set(
  'user:123',
  { id: 123, name: 'John Doe', email: 'john@example.com' },
  3600 // 1 hour in seconds
);
```

---

### CustomHttpService

Defined in: [libs/nest-core/src/lib/services/custom-http.service.ts:18](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-core/src/lib/services/custom-http.service.ts#L18)

#### Constructors

##### Constructor

```ts
new CustomHttpService(httpService): CustomHttpService;
```

Defined in: [libs/nest-core/src/lib/services/custom-http.service.ts:19](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-core/src/lib/services/custom-http.service.ts#L19)

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

`httpService`

</td>
<td>

`HttpService`

</td>
</tr>
</tbody>
</table>

###### Returns

[`CustomHttpService`](#customhttpservice)

#### Methods

##### delete()

```ts
delete<T>(url, config?): Promise<T>;
```

Defined in: [libs/nest-core/src/lib/services/custom-http.service.ts:139](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-core/src/lib/services/custom-http.service.ts#L139)

HTTP DELETE request

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

Response data type

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

`url`

</td>
<td>

`string`

</td>
<td>

URL

</td>
</tr>
<tr>
<td>

`config?`

</td>
<td>

`AxiosRequestConfig`\<`any`\>

</td>
<td>

Axios request config

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`T`\>

Response data

##### get()

```ts
get<T>(url, config?): Promise<T>;
```

Defined in: [libs/nest-core/src/lib/services/custom-http.service.ts:29](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-core/src/lib/services/custom-http.service.ts#L29)

HTTP GET request

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

Response data type

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

`url`

</td>
<td>

`string`

</td>
<td>

URL

</td>
</tr>
<tr>
<td>

`config?`

</td>
<td>

`AxiosRequestConfig`\<`any`\>

</td>
<td>

Axios request config

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`T`\>

Response data

##### patch()

```ts
patch<T, D>(
   url,
   data?,
config?): Promise<T>;
```

Defined in: [libs/nest-core/src/lib/services/custom-http.service.ts:113](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-core/src/lib/services/custom-http.service.ts#L113)

HTTP PATCH request

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

&hyphen;

</td>
<td>

Response data type

</td>
</tr>
<tr>
<td>

`D`

</td>
<td>

`any`

</td>
<td>

Request data type

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

`url`

</td>
<td>

`string`

</td>
<td>

URL

</td>
</tr>
<tr>
<td>

`data?`

</td>
<td>

`D`

</td>
<td>

Request data

</td>
</tr>
<tr>
<td>

`config?`

</td>
<td>

`AxiosRequestConfig`\<`any`\>

</td>
<td>

Axios request config

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`T`\>

Response data

##### post()

```ts
post<T, D>(
   url,
   data?,
config?): Promise<T>;
```

Defined in: [libs/nest-core/src/lib/services/custom-http.service.ts:57](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-core/src/lib/services/custom-http.service.ts#L57)

HTTP POST request

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

&hyphen;

</td>
<td>

Response data type

</td>
</tr>
<tr>
<td>

`D`

</td>
<td>

`any`

</td>
<td>

Request data type

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

`url`

</td>
<td>

`string`

</td>
<td>

URL

</td>
</tr>
<tr>
<td>

`data?`

</td>
<td>

`D`

</td>
<td>

Request data

</td>
</tr>
<tr>
<td>

`config?`

</td>
<td>

`AxiosRequestConfig`\<`any`\>

</td>
<td>

Axios request config

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`T`\>

Response data

##### put()

```ts
put<T, D>(
   url,
   data?,
config?): Promise<T>;
```

Defined in: [libs/nest-core/src/lib/services/custom-http.service.ts:85](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-core/src/lib/services/custom-http.service.ts#L85)

HTTP PUT request

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

&hyphen;

</td>
<td>

Response data type

</td>
</tr>
<tr>
<td>

`D`

</td>
<td>

`any`

</td>
<td>

Request data type

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

`url`

</td>
<td>

`string`

</td>
<td>

URL

</td>
</tr>
<tr>
<td>

`data?`

</td>
<td>

`D`

</td>
<td>

Request data

</td>
</tr>
<tr>
<td>

`config?`

</td>
<td>

`AxiosRequestConfig`\<`any`\>

</td>
<td>

Axios request config

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`T`\>

Response data

---

### HichchiMetadata

Defined in: [libs/nest-core/src/lib/metadata/metadata-storage.ts:23](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-core/src/lib/metadata/metadata-storage.ts#L23)

#### Constructors

##### Constructor

```ts
new HichchiMetadata(): HichchiMetadata;
```

###### Returns

[`HichchiMetadata`](#hichchimetadata)

#### Methods

##### addEntity()

```ts
addEntity(
   entity,
   tableName,
   unique): void;
```

Defined in: [libs/nest-core/src/lib/metadata/metadata-storage.ts:61](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-core/src/lib/metadata/metadata-storage.ts#L61)

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

`Type`

</td>
</tr>
<tr>
<td>

`tableName`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`unique`

</td>
<td>

`string`[]

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

##### addValidationDto()

###### Call Signature

```ts
addValidationDto(dto, name): void;
```

Defined in: [libs/nest-core/src/lib/metadata/metadata-storage.ts:30](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-core/src/lib/metadata/metadata-storage.ts#L30)

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

`dto`

</td>
<td>

`Type`

</td>
</tr>
<tr>
<td>

`name`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### Call Signature

```ts
addValidationDto(dto, entity): void;
```

Defined in: [libs/nest-core/src/lib/metadata/metadata-storage.ts:32](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-core/src/lib/metadata/metadata-storage.ts#L32)

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

`dto`

</td>
<td>

`Type`

</td>
</tr>
<tr>
<td>

`entity`

</td>
<td>

`Type`

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

##### getDtoMetaOfInstance()

```ts
getDtoMetaOfInstance(instance): undefined | HichchiMetaDto;
```

Defined in: [libs/nest-core/src/lib/metadata/metadata-storage.ts:50](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-core/src/lib/metadata/metadata-storage.ts#L50)

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

`instance`

</td>
<td>

`unknown`

</td>
</tr>
</tbody>
</table>

###### Returns

`undefined` \| `HichchiMetaDto`

##### getEntityName()

```ts
getEntityName(entity): undefined | string;
```

Defined in: [libs/nest-core/src/lib/metadata/metadata-storage.ts:65](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-core/src/lib/metadata/metadata-storage.ts#L65)

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

`Type`

</td>
</tr>
</tbody>
</table>

###### Returns

`undefined` \| `string`

##### getEntityUnique()

```ts
getEntityUnique(entity): undefined | string[];
```

Defined in: [libs/nest-core/src/lib/metadata/metadata-storage.ts:69](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-core/src/lib/metadata/metadata-storage.ts#L69)

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

`Type`

</td>
</tr>
</tbody>
</table>

###### Returns

`undefined` \| `string`[]

##### getMetadata()

```ts
getMetadata<T>(target, propertyKey): T;
```

Defined in: [libs/nest-core/src/lib/metadata/metadata-storage.ts:83](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-core/src/lib/metadata/metadata-storage.ts#L83)

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

`T`

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

`target`

</td>
<td>

`Type`

</td>
</tr>
<tr>
<td>

`propertyKey`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

###### Returns

`T`

##### getValidationDtoInfo()

```ts
getValidationDtoInfo(dto): undefined | HichchiMetaDtoInfo;
```

Defined in: [libs/nest-core/src/lib/metadata/metadata-storage.ts:46](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-core/src/lib/metadata/metadata-storage.ts#L46)

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

`dto`

</td>
<td>

`Type`

</td>
</tr>
</tbody>
</table>

###### Returns

`undefined` \| `HichchiMetaDtoInfo`

##### getValidationDtos()

```ts
getValidationDtos(): Type[];
```

Defined in: [libs/nest-core/src/lib/metadata/metadata-storage.ts:42](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-core/src/lib/metadata/metadata-storage.ts#L42)

###### Returns

`Type`[]

##### isHichchiEntity()

```ts
isHichchiEntity(entity): undefined | boolean;
```

Defined in: [libs/nest-core/src/lib/metadata/metadata-storage.ts:73](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-core/src/lib/metadata/metadata-storage.ts#L73)

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

`Type`

</td>
</tr>
</tbody>
</table>

###### Returns

`undefined` \| `boolean`

##### setMetadata()

```ts
setMetadata(
   target,
   propertyKey,
   value): void;
```

Defined in: [libs/nest-core/src/lib/metadata/metadata-storage.ts:77](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-core/src/lib/metadata/metadata-storage.ts#L77)

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

`Type`

</td>
</tr>
<tr>
<td>

`propertyKey`

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

`unknown`

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

---

### ImplementationException

Defined in: [libs/nest-core/src/lib/exceptions/implementation.exception.ts:1](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-core/src/lib/exceptions/implementation.exception.ts#L1)

#### Extends

- `Error`

#### Constructors

##### Constructor

```ts
new ImplementationException(
   heading,
   message,
   description?): ImplementationException;
```

Defined in: [libs/nest-core/src/lib/exceptions/implementation.exception.ts:2](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-core/src/lib/exceptions/implementation.exception.ts#L2)

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

`heading`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`message`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`description?`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

###### Returns

[`ImplementationException`](#implementationexception)

###### Overrides

```ts
Error.constructor;
```

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

<a id="description"></a> `description?`

</td>
<td>

`public`

</td>
<td>

`string`

</td>
<td>

&hyphen;

</td>
<td>

&hyphen;

</td>
<td>

[libs/nest-core/src/lib/exceptions/implementation.exception.ts:5](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-core/src/lib/exceptions/implementation.exception.ts#L5)

</td>
</tr>
<tr>
<td>

<a id="heading"></a> `heading`

</td>
<td>

`public`

</td>
<td>

`string`

</td>
<td>

&hyphen;

</td>
<td>

&hyphen;

</td>
<td>

[libs/nest-core/src/lib/exceptions/implementation.exception.ts:3](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-core/src/lib/exceptions/implementation.exception.ts#L3)

</td>
</tr>
<tr>
<td>

<a id="message"></a> `message`

</td>
<td>

`public`

</td>
<td>

`string`

</td>
<td>

&hyphen;

</td>
<td>

```ts
Error.message;
```

</td>
<td>

[libs/nest-core/src/lib/exceptions/implementation.exception.ts:4](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-core/src/lib/exceptions/implementation.exception.ts#L4)

</td>
</tr>
<tr>
<td>

<a id="name"></a> `name`

</td>
<td>

`public`

</td>
<td>

`string`

</td>
<td>

&hyphen;

</td>
<td>

```ts
Error.name;
```

</td>
<td>

node_modules/typescript/lib/lib.es5.d.ts:1076

</td>
</tr>
<tr>
<td>

<a id="stack"></a> `stack?`

</td>
<td>

`public`

</td>
<td>

`string`

</td>
<td>

&hyphen;

</td>
<td>

```ts
Error.stack;
```

</td>
<td>

node_modules/typescript/lib/lib.es5.d.ts:1078

</td>
</tr>
<tr>
<td>

<a id="stacktracelimit"></a> `stackTraceLimit`

</td>
<td>

`static`

</td>
<td>

`number`

</td>
<td>

The `Error.stackTraceLimit` property specifies the number of stack frames
collected by a stack trace (whether generated by `new Error().stack` or
`Error.captureStackTrace(obj)`).

The default value is `10` but may be set to any valid JavaScript number. Changes
will affect any stack trace captured _after_ the value has been changed.

If set to a non-number value, or set to a negative number, stack traces will
not capture any frames.

</td>
<td>

```ts
Error.stackTraceLimit;
```

</td>
<td>

node_modules/@types/node/globals.d.ts:162

</td>
</tr>
</tbody>
</table>

#### Methods

##### captureStackTrace()

```ts
static captureStackTrace(targetObject, constructorOpt?): void;
```

Defined in: node_modules/@types/node/globals.d.ts:146

Creates a `.stack` property on `targetObject`, which when accessed returns
a string representing the location in the code at which
`Error.captureStackTrace()` was called.

```js
const myObject = {};
Error.captureStackTrace(myObject);
myObject.stack; // Similar to `new Error().stack`
```

The first line of the trace will be prefixed with
`${myObject.name}: ${myObject.message}`.

The optional `constructorOpt` argument accepts a function. If given, all frames
above `constructorOpt`, including `constructorOpt`, will be omitted from the
generated stack trace.

The `constructorOpt` argument is useful for hiding implementation
details of error generation from the user. For instance:

```js
function a() {
  b();
}

function b() {
  c();
}

function c() {
  // Create an error without stack trace to avoid calculating the stack trace twice.
  const { stackTraceLimit } = Error;
  Error.stackTraceLimit = 0;
  const error = new Error();
  Error.stackTraceLimit = stackTraceLimit;

  // Capture the stack trace above function b
  Error.captureStackTrace(error, b); // Neither function c, nor b is included in the stack trace
  throw error;
}

a();
```

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

`targetObject`

</td>
<td>

`object`

</td>
</tr>
<tr>
<td>

`constructorOpt?`

</td>
<td>

`Function`

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### Inherited from

```ts
Error.captureStackTrace;
```

##### prepareStackTrace()

```ts
static prepareStackTrace(err, stackTraces): any;
```

Defined in: node_modules/@types/node/globals.d.ts:150

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

`err`

</td>
<td>

`Error`

</td>
</tr>
<tr>
<td>

`stackTraces`

</td>
<td>

`CallSite`[]

</td>
</tr>
</tbody>
</table>

###### Returns

`any`

###### See

https://v8.dev/docs/stack-trace-api#customizing-stack-traces

###### Inherited from

```ts
Error.prepareStackTrace;
```

---

### JsonBodyMiddleware

Defined in: [libs/nest-core/src/lib/middlewares/json-body-parser.middleware.ts:7](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-core/src/lib/middlewares/json-body-parser.middleware.ts#L7)

#### Implements

- `NestMiddleware`

#### Constructors

##### Constructor

```ts
new JsonBodyMiddleware(): JsonBodyMiddleware;
```

###### Returns

[`JsonBodyMiddleware`](#jsonbodymiddleware)

#### Methods

##### use()

```ts
use(
   req,
   res,
   next): void;
```

Defined in: [libs/nest-core/src/lib/middlewares/json-body-parser.middleware.ts:8](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-core/src/lib/middlewares/json-body-parser.middleware.ts#L8)

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

`req`

</td>
<td>

`IncomingMessage`

</td>
</tr>
<tr>
<td>

`res`

</td>
<td>

`ServerResponse`

</td>
</tr>
<tr>
<td>

`next`

</td>
<td>

`NextFunction`

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### Implementation of

```ts
NestMiddleware.use;
```

---

### LoggerService

Defined in: [libs/nest-core/src/lib/services/logger.service.ts:12](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-core/src/lib/services/logger.service.ts#L12)

#### Implements

- `LoggerService`

#### Constructors

##### Constructor

```ts
new LoggerService(): LoggerService;
```

Defined in: [libs/nest-core/src/lib/services/logger.service.ts:21](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-core/src/lib/services/logger.service.ts#L21)

###### Returns

[`LoggerService`](#loggerservice)

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Modifier</th>
<th>Type</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="filename"></a> `filename`

</td>
<td>

`public`

</td>
<td>

`string`

</td>
<td>

[libs/nest-core/src/lib/services/logger.service.ts:17](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-core/src/lib/services/logger.service.ts#L17)

</td>
</tr>
<tr>
<td>

<a id="filename-1"></a> `filename`

</td>
<td>

`static`

</td>
<td>

`string`

</td>
<td>

[libs/nest-core/src/lib/services/logger.service.ts:19](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-core/src/lib/services/logger.service.ts#L19)

</td>
</tr>
</tbody>
</table>

#### Methods

##### debug()

```ts
debug(message, ...optionalParams): void;
```

Defined in: [libs/nest-core/src/lib/services/logger.service.ts:131](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-core/src/lib/services/logger.service.ts#L131)

Debug log

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

`message`

</td>
<td>

`unknown`

</td>
<td>

Log message

</td>
</tr>
<tr>
<td>

...`optionalParams`

</td>
<td>

`unknown`[]

</td>
<td>

Optional parameters

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### Implementation of

```ts
NestLogger.debug;
```

##### error()

```ts
error(message, ...optionalParams): void;
```

Defined in: [libs/nest-core/src/lib/services/logger.service.ts:203](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-core/src/lib/services/logger.service.ts#L203)

Error log

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

`message`

</td>
<td>

`unknown`

</td>
<td>

Log message

</td>
</tr>
<tr>
<td>

...`optionalParams`

</td>
<td>

`unknown`[]

</td>
<td>

Optional parameters

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### Implementation of

```ts
NestLogger.error;
```

##### fatal()

```ts
fatal(message, ...optionalParams): void;
```

Defined in: [libs/nest-core/src/lib/services/logger.service.ts:223](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-core/src/lib/services/logger.service.ts#L223)

Fatal log

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

`message`

</td>
<td>

`unknown`

</td>
<td>

Log message

</td>
</tr>
<tr>
<td>

...`optionalParams`

</td>
<td>

`unknown`[]

</td>
<td>

Optional parameters

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### Implementation of

```ts
NestLogger.fatal;
```

##### log()

```ts
log(message, ...optionalParams): void;
```

Defined in: [libs/nest-core/src/lib/services/logger.service.ts:167](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-core/src/lib/services/logger.service.ts#L167)

Log

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

`message`

</td>
<td>

`unknown`

</td>
<td>

Log message

</td>
</tr>
<tr>
<td>

...`optionalParams`

</td>
<td>

`unknown`[]

</td>
<td>

Optional parameters

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### Implementation of

```ts
NestLogger.log;
```

##### silly()

```ts
silly(message, ...optionalParams): void;
```

Defined in: [libs/nest-core/src/lib/services/logger.service.ts:113](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-core/src/lib/services/logger.service.ts#L113)

Silly log

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

`message`

</td>
<td>

`unknown`

</td>
<td>

Log message

</td>
</tr>
<tr>
<td>

...`optionalParams`

</td>
<td>

`unknown`[]

</td>
<td>

Optional parameters

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

##### trace()

```ts
trace(message, ...optionalParams): void;
```

Defined in: [libs/nest-core/src/lib/services/logger.service.ts:149](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-core/src/lib/services/logger.service.ts#L149)

Trace log

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

`message`

</td>
<td>

`unknown`

</td>
<td>

Log message

</td>
</tr>
<tr>
<td>

...`optionalParams`

</td>
<td>

`unknown`[]

</td>
<td>

Optional parameters

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

##### verbose()?

```ts
optional verbose(message, ...optionalParams): void;
```

Defined in: [libs/nest-core/src/lib/services/logger.service.ts:241](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-core/src/lib/services/logger.service.ts#L241)

Verbose log

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

`message`

</td>
<td>

`unknown`

</td>
<td>

Log message

</td>
</tr>
<tr>
<td>

...`optionalParams`

</td>
<td>

`unknown`[]

</td>
<td>

Optional parameters

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### Implementation of

```ts
NestLogger.verbose;
```

##### warn()

```ts
warn(message, ...optionalParams): void;
```

Defined in: [libs/nest-core/src/lib/services/logger.service.ts:185](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-core/src/lib/services/logger.service.ts#L185)

W#arn log

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

`message`

</td>
<td>

`unknown`

</td>
<td>

Log message

</td>
</tr>
<tr>
<td>

...`optionalParams`

</td>
<td>

`unknown`[]

</td>
<td>

Optional parameters

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### Implementation of

```ts
NestLogger.warn;
```

##### debug()

```ts
static debug(message, ...optionalParams): void;
```

Defined in: [libs/nest-core/src/lib/services/logger.service.ts:140](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-core/src/lib/services/logger.service.ts#L140)

Debug log for static use

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

`message`

</td>
<td>

`unknown`

</td>
<td>

Log message

</td>
</tr>
<tr>
<td>

...`optionalParams`

</td>
<td>

`unknown`[]

</td>
<td>

Optional parameters

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

##### error()

```ts
static error(message, ...optionalParams): void;
```

Defined in: [libs/nest-core/src/lib/services/logger.service.ts:213](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-core/src/lib/services/logger.service.ts#L213)

Error log for static use

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

`message`

</td>
<td>

`unknown`

</td>
<td>

Log message

</td>
</tr>
<tr>
<td>

...`optionalParams`

</td>
<td>

`unknown`[]

</td>
<td>

Optional parameters

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

##### fatal()

```ts
static fatal(message, ...optionalParams): void;
```

Defined in: [libs/nest-core/src/lib/services/logger.service.ts:232](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-core/src/lib/services/logger.service.ts#L232)

Fatal log for static use

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

`message`

</td>
<td>

`unknown`

</td>
<td>

Log message

</td>
</tr>
<tr>
<td>

...`optionalParams`

</td>
<td>

`unknown`[]

</td>
<td>

Optional parameters

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

##### log()

```ts
static log(message, ...optionalParams): void;
```

Defined in: [libs/nest-core/src/lib/services/logger.service.ts:176](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-core/src/lib/services/logger.service.ts#L176)

Log for static use

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

`message`

</td>
<td>

`unknown`

</td>
<td>

Log message

</td>
</tr>
<tr>
<td>

...`optionalParams`

</td>
<td>

`unknown`[]

</td>
<td>

Optional parameters

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

##### silly()

```ts
static silly(message, ...optionalParams): void;
```

Defined in: [libs/nest-core/src/lib/services/logger.service.ts:122](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-core/src/lib/services/logger.service.ts#L122)

Silly log for static use

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

`message`

</td>
<td>

`unknown`

</td>
<td>

Log message

</td>
</tr>
<tr>
<td>

...`optionalParams`

</td>
<td>

`unknown`[]

</td>
<td>

Optional parameters

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

##### staticInitialize()

```ts
static staticInitialize(): void;
```

Defined in: [libs/nest-core/src/lib/services/logger.service.ts:30](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-core/src/lib/services/logger.service.ts#L30)

Initialize the logger service for static use

###### Returns

`void`

##### trace()

```ts
static trace(message, ...optionalParams): void;
```

Defined in: [libs/nest-core/src/lib/services/logger.service.ts:158](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-core/src/lib/services/logger.service.ts#L158)

Trace log for static use

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

`message`

</td>
<td>

`unknown`

</td>
<td>

Log message

</td>
</tr>
<tr>
<td>

...`optionalParams`

</td>
<td>

`unknown`[]

</td>
<td>

Optional parameters

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

##### verbose()

```ts
static verbose(message, ...optionalParams): void;
```

Defined in: [libs/nest-core/src/lib/services/logger.service.ts:250](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-core/src/lib/services/logger.service.ts#L250)

Verbose log for static use

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

`message`

</td>
<td>

`unknown`

</td>
<td>

Log message

</td>
</tr>
<tr>
<td>

...`optionalParams`

</td>
<td>

`unknown`[]

</td>
<td>

Optional parameters

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

##### warn()

```ts
static warn(message, ...optionalParams): void;
```

Defined in: [libs/nest-core/src/lib/services/logger.service.ts:194](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-core/src/lib/services/logger.service.ts#L194)

Warn log for static use

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

`message`

</td>
<td>

`unknown`

</td>
<td>

Log message

</td>
</tr>
<tr>
<td>

...`optionalParams`

</td>
<td>

`unknown`[]

</td>
<td>

Optional parameters

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

---

### RawBodyMiddleware

Defined in: [libs/nest-core/src/lib/middlewares/row-body-parser.middleware.ts:11](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-core/src/lib/middlewares/row-body-parser.middleware.ts#L11)

Copied this middleware to parse the raw response into a param to use later
from https://github.com/golevelup/nestjs/blob/master/packages/webhooks/src/webhooks.middleware.ts

#### Implements

- `NestMiddleware`

#### Constructors

##### Constructor

```ts
new RawBodyMiddleware(): RawBodyMiddleware;
```

###### Returns

[`RawBodyMiddleware`](#rawbodymiddleware)

#### Methods

##### use()

```ts
use(
   req,
   res,
   next): void;
```

Defined in: [libs/nest-core/src/lib/middlewares/row-body-parser.middleware.ts:12](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-core/src/lib/middlewares/row-body-parser.middleware.ts#L12)

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

`req`

</td>
<td>

`IncomingMessage`

</td>
</tr>
<tr>
<td>

`res`

</td>
<td>

`ServerResponse`

</td>
</tr>
<tr>
<td>

`next`

</td>
<td>

`NextFunction`

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### Implementation of

```ts
NestMiddleware.use;
```

---

### RedisConfigException

Defined in: [libs/nest-core/src/lib/exceptions/redis-config.exception.ts:3](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-core/src/lib/exceptions/redis-config.exception.ts#L3)

#### Extends

- `RuntimeException`

#### Constructors

##### Constructor

```ts
new RedisConfigException(message): RedisConfigException;
```

Defined in: [libs/nest-core/src/lib/exceptions/redis-config.exception.ts:4](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-core/src/lib/exceptions/redis-config.exception.ts#L4)

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

`message`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

###### Returns

[`RedisConfigException`](#redisconfigexception)

###### Overrides

```ts
RuntimeException.constructor;
```

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

<a id="message-1"></a> `message`

</td>
<td>

`public`

</td>
<td>

`string`

</td>
<td>

&hyphen;

</td>
<td>

```ts
RuntimeException.message;
```

</td>
<td>

[libs/nest-core/src/lib/exceptions/redis-config.exception.ts:4](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-core/src/lib/exceptions/redis-config.exception.ts#L4)

</td>
</tr>
<tr>
<td>

<a id="name-1"></a> `name`

</td>
<td>

`public`

</td>
<td>

`string`

</td>
<td>

&hyphen;

</td>
<td>

```ts
RuntimeException.name;
```

</td>
<td>

node_modules/typescript/lib/lib.es5.d.ts:1076

</td>
</tr>
<tr>
<td>

<a id="stack-1"></a> `stack?`

</td>
<td>

`public`

</td>
<td>

`string`

</td>
<td>

&hyphen;

</td>
<td>

```ts
RuntimeException.stack;
```

</td>
<td>

node_modules/typescript/lib/lib.es5.d.ts:1078

</td>
</tr>
<tr>
<td>

<a id="stacktracelimit-1"></a> `stackTraceLimit`

</td>
<td>

`static`

</td>
<td>

`number`

</td>
<td>

The `Error.stackTraceLimit` property specifies the number of stack frames
collected by a stack trace (whether generated by `new Error().stack` or
`Error.captureStackTrace(obj)`).

The default value is `10` but may be set to any valid JavaScript number. Changes
will affect any stack trace captured _after_ the value has been changed.

If set to a non-number value, or set to a negative number, stack traces will
not capture any frames.

</td>
<td>

```ts
RuntimeException.stackTraceLimit;
```

</td>
<td>

node_modules/@types/node/globals.d.ts:162

</td>
</tr>
</tbody>
</table>

#### Methods

##### what()

```ts
what(): string;
```

Defined in: node_modules/@nestjs/core/errors/exceptions/runtime.exception.d.ts:3

###### Returns

`string`

###### Inherited from

```ts
RuntimeException.what;
```

##### captureStackTrace()

```ts
static captureStackTrace(targetObject, constructorOpt?): void;
```

Defined in: node_modules/@types/node/globals.d.ts:146

Creates a `.stack` property on `targetObject`, which when accessed returns
a string representing the location in the code at which
`Error.captureStackTrace()` was called.

```js
const myObject = {};
Error.captureStackTrace(myObject);
myObject.stack; // Similar to `new Error().stack`
```

The first line of the trace will be prefixed with
`${myObject.name}: ${myObject.message}`.

The optional `constructorOpt` argument accepts a function. If given, all frames
above `constructorOpt`, including `constructorOpt`, will be omitted from the
generated stack trace.

The `constructorOpt` argument is useful for hiding implementation
details of error generation from the user. For instance:

```js
function a() {
  b();
}

function b() {
  c();
}

function c() {
  // Create an error without stack trace to avoid calculating the stack trace twice.
  const { stackTraceLimit } = Error;
  Error.stackTraceLimit = 0;
  const error = new Error();
  Error.stackTraceLimit = stackTraceLimit;

  // Capture the stack trace above function b
  Error.captureStackTrace(error, b); // Neither function c, nor b is included in the stack trace
  throw error;
}

a();
```

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

`targetObject`

</td>
<td>

`object`

</td>
</tr>
<tr>
<td>

`constructorOpt?`

</td>
<td>

`Function`

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### Inherited from

```ts
RuntimeException.captureStackTrace;
```

##### prepareStackTrace()

```ts
static prepareStackTrace(err, stackTraces): any;
```

Defined in: node_modules/@types/node/globals.d.ts:150

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

`err`

</td>
<td>

`Error`

</td>
</tr>
<tr>
<td>

`stackTraces`

</td>
<td>

`CallSite`[]

</td>
</tr>
</tbody>
</table>

###### Returns

`any`

###### See

https://v8.dev/docs/stack-trace-api#customizing-stack-traces

###### Inherited from

```ts
RuntimeException.prepareStackTrace;
```

---

### TransformInterceptor\<T, R\>

Defined in: [libs/nest-core/src/lib/interceptors/transform.interceptor.ts:13](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-core/src/lib/interceptors/transform.interceptor.ts#L13)

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
<tr>
<td>

`R`

</td>
</tr>
</tbody>
</table>

#### Implements

- `NestInterceptor`\<`Data`\<`T`\>, `Response`\<`R`\>\>

#### Constructors

##### Constructor

```ts
new TransformInterceptor<T, R>(viewDto): TransformInterceptor<T, R>;
```

Defined in: [libs/nest-core/src/lib/interceptors/transform.interceptor.ts:14](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-core/src/lib/interceptors/transform.interceptor.ts#L14)

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

`viewDto`

</td>
<td>

[`IViewDto`](#iviewdto)\<`T`, `R`\>

</td>
</tr>
</tbody>
</table>

###### Returns

[`TransformInterceptor`](#transforminterceptor)\<`T`, `R`\>

#### Methods

##### intercept()

```ts
intercept(_context, next): Observable<Response<R>>;
```

Defined in: [libs/nest-core/src/lib/interceptors/transform.interceptor.ts:16](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-core/src/lib/interceptors/transform.interceptor.ts#L16)

Method to implement a custom interceptor.

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

`_context`

</td>
<td>

`ExecutionContext`

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`next`

</td>
<td>

`CallHandler`

</td>
<td>

a reference to the `CallHandler`, which provides access to an
`Observable` representing the response stream from the route handler.

</td>
</tr>
</tbody>
</table>

###### Returns

`Observable`\<`Response`\<`R`\>\>

###### Implementation of

```ts
NestInterceptor.intercept;
```

## Interfaces

### CommonRedisOptions

Defined in: [libs/nest-core/src/lib/interfaces/redis-options.interface.ts:1](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-core/src/lib/interfaces/redis-options.interface.ts#L1)

#### Extended by

- [`RedisOptionsWithUrl`](#redisoptionswithurl)
- [`RedisOptionsWithHost`](#redisoptionswithhost)

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

<a id="lrusize"></a> `lruSize?`

</td>
<td>

`number`

</td>
<td>

[libs/nest-core/src/lib/interfaces/redis-options.interface.ts:4](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-core/src/lib/interfaces/redis-options.interface.ts#L4)

</td>
</tr>
<tr>
<td>

<a id="prefix"></a> `prefix?`

</td>
<td>

`string`

</td>
<td>

[libs/nest-core/src/lib/interfaces/redis-options.interface.ts:2](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-core/src/lib/interfaces/redis-options.interface.ts#L2)

</td>
</tr>
<tr>
<td>

<a id="ttl"></a> `ttl?`

</td>
<td>

`number`

</td>
<td>

[libs/nest-core/src/lib/interfaces/redis-options.interface.ts:3](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-core/src/lib/interfaces/redis-options.interface.ts#L3)

</td>
</tr>
</tbody>
</table>

---

### IViewDto\<T, R\>

Defined in: [libs/nest-core/src/lib/interfaces/viev-dto.interface.ts:1](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-core/src/lib/interfaces/viev-dto.interface.ts#L1)

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

`T`

</td>
<td>

`unknown`

</td>
</tr>
<tr>
<td>

`R`

</td>
<td>

`unknown`

</td>
</tr>
</tbody>
</table>

#### Methods

##### formatDataSet()

```ts
formatDataSet(data?): null | R;
```

Defined in: [libs/nest-core/src/lib/interfaces/viev-dto.interface.ts:2](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-core/src/lib/interfaces/viev-dto.interface.ts#L2)

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

`data?`

</td>
<td>

`T`

</td>
</tr>
</tbody>
</table>

###### Returns

`null` \| `R`

---

### MulterFile

Defined in: [libs/nest-core/src/lib/interfaces/multer-file.ts:3](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-core/src/lib/interfaces/multer-file.ts#L3)

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

<a id="buffer"></a> `buffer`

</td>
<td>

`Buffer`

</td>
<td>

[libs/nest-core/src/lib/interfaces/multer-file.ts:8](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-core/src/lib/interfaces/multer-file.ts#L8)

</td>
</tr>
<tr>
<td>

<a id="encoding"></a> `encoding`

</td>
<td>

`string`

</td>
<td>

[libs/nest-core/src/lib/interfaces/multer-file.ts:6](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-core/src/lib/interfaces/multer-file.ts#L6)

</td>
</tr>
<tr>
<td>

<a id="fieldname"></a> `fieldname`

</td>
<td>

`string`

</td>
<td>

[libs/nest-core/src/lib/interfaces/multer-file.ts:4](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-core/src/lib/interfaces/multer-file.ts#L4)

</td>
</tr>
<tr>
<td>

<a id="mimetype"></a> `mimetype`

</td>
<td>

`string`

</td>
<td>

[libs/nest-core/src/lib/interfaces/multer-file.ts:7](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-core/src/lib/interfaces/multer-file.ts#L7)

</td>
</tr>
<tr>
<td>

<a id="originalname"></a> `originalname`

</td>
<td>

`string`

</td>
<td>

[libs/nest-core/src/lib/interfaces/multer-file.ts:5](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-core/src/lib/interfaces/multer-file.ts#L5)

</td>
</tr>
<tr>
<td>

<a id="size"></a> `size`

</td>
<td>

`number`

</td>
<td>

[libs/nest-core/src/lib/interfaces/multer-file.ts:9](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-core/src/lib/interfaces/multer-file.ts#L9)

</td>
</tr>
</tbody>
</table>

---

### RedisOptionsWithHost

Defined in: [libs/nest-core/src/lib/interfaces/redis-options.interface.ts:11](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-core/src/lib/interfaces/redis-options.interface.ts#L11)

#### Extends

- [`CommonRedisOptions`](#commonredisoptions)

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Inherited from</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="host"></a> `host`

</td>
<td>

`string`

</td>
<td>

&hyphen;

</td>
<td>

[libs/nest-core/src/lib/interfaces/redis-options.interface.ts:12](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-core/src/lib/interfaces/redis-options.interface.ts#L12)

</td>
</tr>
<tr>
<td>

<a id="lrusize-1"></a> `lruSize?`

</td>
<td>

`number`

</td>
<td>

[`CommonRedisOptions`](#commonredisoptions).[`lruSize`](#lrusize)

</td>
<td>

[libs/nest-core/src/lib/interfaces/redis-options.interface.ts:4](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-core/src/lib/interfaces/redis-options.interface.ts#L4)

</td>
</tr>
<tr>
<td>

<a id="password"></a> `password?`

</td>
<td>

`string`

</td>
<td>

&hyphen;

</td>
<td>

[libs/nest-core/src/lib/interfaces/redis-options.interface.ts:14](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-core/src/lib/interfaces/redis-options.interface.ts#L14)

</td>
</tr>
<tr>
<td>

<a id="port"></a> `port?`

</td>
<td>

`number`

</td>
<td>

&hyphen;

</td>
<td>

[libs/nest-core/src/lib/interfaces/redis-options.interface.ts:13](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-core/src/lib/interfaces/redis-options.interface.ts#L13)

</td>
</tr>
<tr>
<td>

<a id="prefix-1"></a> `prefix?`

</td>
<td>

`string`

</td>
<td>

[`CommonRedisOptions`](#commonredisoptions).[`prefix`](#prefix)

</td>
<td>

[libs/nest-core/src/lib/interfaces/redis-options.interface.ts:2](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-core/src/lib/interfaces/redis-options.interface.ts#L2)

</td>
</tr>
<tr>
<td>

<a id="ttl-1"></a> `ttl?`

</td>
<td>

`number`

</td>
<td>

[`CommonRedisOptions`](#commonredisoptions).[`ttl`](#ttl)

</td>
<td>

[libs/nest-core/src/lib/interfaces/redis-options.interface.ts:3](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-core/src/lib/interfaces/redis-options.interface.ts#L3)

</td>
</tr>
<tr>
<td>

<a id="username"></a> `username?`

</td>
<td>

`string`

</td>
<td>

&hyphen;

</td>
<td>

[libs/nest-core/src/lib/interfaces/redis-options.interface.ts:15](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-core/src/lib/interfaces/redis-options.interface.ts#L15)

</td>
</tr>
</tbody>
</table>

---

### RedisOptionsWithUrl

Defined in: [libs/nest-core/src/lib/interfaces/redis-options.interface.ts:7](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-core/src/lib/interfaces/redis-options.interface.ts#L7)

#### Extends

- [`CommonRedisOptions`](#commonredisoptions)

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Inherited from</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="lrusize-2"></a> `lruSize?`

</td>
<td>

`number`

</td>
<td>

[`CommonRedisOptions`](#commonredisoptions).[`lruSize`](#lrusize)

</td>
<td>

[libs/nest-core/src/lib/interfaces/redis-options.interface.ts:4](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-core/src/lib/interfaces/redis-options.interface.ts#L4)

</td>
</tr>
<tr>
<td>

<a id="prefix-2"></a> `prefix?`

</td>
<td>

`string`

</td>
<td>

[`CommonRedisOptions`](#commonredisoptions).[`prefix`](#prefix)

</td>
<td>

[libs/nest-core/src/lib/interfaces/redis-options.interface.ts:2](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-core/src/lib/interfaces/redis-options.interface.ts#L2)

</td>
</tr>
<tr>
<td>

<a id="ttl-2"></a> `ttl?`

</td>
<td>

`number`

</td>
<td>

[`CommonRedisOptions`](#commonredisoptions).[`ttl`](#ttl)

</td>
<td>

[libs/nest-core/src/lib/interfaces/redis-options.interface.ts:3](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-core/src/lib/interfaces/redis-options.interface.ts#L3)

</td>
</tr>
<tr>
<td>

<a id="url"></a> `url`

</td>
<td>

`string`

</td>
<td>

&hyphen;

</td>
<td>

[libs/nest-core/src/lib/interfaces/redis-options.interface.ts:8](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-core/src/lib/interfaces/redis-options.interface.ts#L8)

</td>
</tr>
</tbody>
</table>

---

### RequestWithSubdomain

Defined in: [libs/nest-core/src/lib/interfaces/request-with-subdomain.ts:4](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-core/src/lib/interfaces/request-with-subdomain.ts#L4)

#### Extends

- `Request`

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

<a id="aborted"></a> ~~`aborted`~~

</td>
<td>

`public`

</td>
<td>

`boolean`

</td>
<td>

The `message.aborted` property will be `true` if the request has
been aborted.

**Since**

v10.1.0

**Deprecated**

Since v17.0.0,v16.12.0 - Check `message.destroyed` from <a href="stream.html#class-streamreadable" class="type">stream.Readable</a>.

</td>
<td>

```ts
Request.aborted;
```

</td>
<td>

node_modules/@types/node/http.d.ts:1206

</td>
</tr>
<tr>
<td>

<a id="accepted"></a> `accepted`

</td>
<td>

`public`

</td>
<td>

`MediaType`[]

</td>
<td>

Return an array of Accepted media types
ordered from highest quality to lowest.

</td>
<td>

```ts
Request.accepted;
```

</td>
<td>

node_modules/@types/express-serve-static-core/index.d.ts:523

</td>
</tr>
<tr>
<td>

<a id="app"></a> `app`

</td>
<td>

`public`

</td>
<td>

`Application`

</td>
<td>

&hyphen;

</td>
<td>

```ts
Request.app;
```

</td>
<td>

node_modules/@types/express-serve-static-core/index.d.ts:654

</td>
</tr>
<tr>
<td>

<a id="baseurl"></a> `baseUrl`

</td>
<td>

`public`

</td>
<td>

`string`

</td>
<td>

&hyphen;

</td>
<td>

```ts
Request.baseUrl;
```

</td>
<td>

node_modules/@types/express-serve-static-core/index.d.ts:652

</td>
</tr>
<tr>
<td>

<a id="body"></a> `body`

</td>
<td>

`public`

</td>
<td>

`any`

</td>
<td>

&hyphen;

</td>
<td>

```ts
Request.body;
```

</td>
<td>

node_modules/@types/express-serve-static-core/index.d.ts:633

</td>
</tr>
<tr>
<td>

<a id="closed"></a> `closed`

</td>
<td>

`readonly`

</td>
<td>

`boolean`

</td>
<td>

Is `true` after `'close'` has been emitted.

**Since**

v18.0.0

</td>
<td>

```ts
Request.closed;
```

</td>
<td>

node_modules/@types/node/stream.d.ts:157

</td>
</tr>
<tr>
<td>

<a id="complete"></a> `complete`

</td>
<td>

`public`

</td>
<td>

`boolean`

</td>
<td>

The `message.complete` property will be `true` if a complete HTTP message has
been received and successfully parsed.

This property is particularly useful as a means of determining if a client or
server fully transmitted a message before a connection was terminated:

```js
const req = http.request(
  {
    host: "127.0.0.1",
    port: 8080,
    method: "POST",
  },
  (res) => {
    res.resume();
    res.on("end", () => {
      if (!res.complete)
        console.error(
          "The connection was terminated while the message was still being sent",
        );
    });
  },
);
```

**Since**

v0.3.0

</td>
<td>

```ts
Request.complete;
```

</td>
<td>

node_modules/@types/node/http.d.ts:1241

</td>
</tr>
<tr>
<td>

<a id="connection"></a> ~~`connection`~~

</td>
<td>

`public`

</td>
<td>

`Socket`

</td>
<td>

Alias for `message.socket`.

**Since**

v0.1.90

**Deprecated**

Since v16.0.0 - Use `socket`.

</td>
<td>

```ts
Request.connection;
```

</td>
<td>

node_modules/@types/node/http.d.ts:1247

</td>
</tr>
<tr>
<td>

<a id="cookies"></a> `cookies`

</td>
<td>

`public`

</td>
<td>

`any`

</td>
<td>

&hyphen;

</td>
<td>

```ts
Request.cookies;
```

</td>
<td>

node_modules/@types/express-serve-static-core/index.d.ts:636

</td>
</tr>
<tr>
<td>

<a id="destroyed"></a> `destroyed`

</td>
<td>

`public`

</td>
<td>

`boolean`

</td>
<td>

Is `true` after `readable.destroy()` has been called.

**Since**

v8.0.0

</td>
<td>

```ts
Request.destroyed;
```

</td>
<td>

node_modules/@types/node/stream.d.ts:152

</td>
</tr>
<tr>
<td>

<a id="errored"></a> `errored`

</td>
<td>

`readonly`

</td>
<td>

`null` \| `Error`

</td>
<td>

Returns error if the stream has been destroyed with an error.

**Since**

v18.0.0

</td>
<td>

```ts
Request.errored;
```

</td>
<td>

node_modules/@types/node/stream.d.ts:162

</td>
</tr>
<tr>
<td>

<a id="fresh"></a> `fresh`

</td>
<td>

`readonly`

</td>
<td>

`boolean`

</td>
<td>

Check if the request is fresh, aka
Last-Modified and/or the ETag
still match.

</td>
<td>

```ts
Request.fresh;
```

</td>
<td>

node_modules/@types/express-serve-static-core/index.d.ts:618

</td>
</tr>
<tr>
<td>

<a id="headers"></a> `headers`

</td>
<td>

`public`

</td>
<td>

`IncomingHttpHeaders`

</td>
<td>

The request/response headers object.

Key-value pairs of header names and values. Header names are lower-cased.

```js
// Prints something like:
//
// { 'user-agent': 'curl/7.22.0',
//   host: '127.0.0.1:8000',
//   accept: '*' }
console.log(request.headers);
```

Duplicates in raw headers are handled in the following ways, depending on the
header name:

- Duplicates of `age`, `authorization`, `content-length`, `content-type`, `etag`, `expires`, `from`, `host`, `if-modified-since`, `if-unmodified-since`, `last-modified`, `location`,
  `max-forwards`, `proxy-authorization`, `referer`, `retry-after`, `server`, or `user-agent` are discarded.
  To allow duplicate values of the headers listed above to be joined,
  use the option `joinDuplicateHeaders` in request and createServer. See RFC 9110 Section 5.3 for more
  information.
- `set-cookie` is always an array. Duplicates are added to the array.
- For duplicate `cookie` headers, the values are joined together with `; `.
- For all other headers, the values are joined together with `, `.

**Since**

v0.1.5

</td>
<td>

```ts
Request.headers;
```

</td>
<td>

node_modules/@types/node/http.d.ts:1287

</td>
</tr>
<tr>
<td>

<a id="headersdistinct"></a> `headersDistinct`

</td>
<td>

`public`

</td>
<td>

`Dict`\<`string`[]\>

</td>
<td>

Similar to `message.headers`, but there is no join logic and the values are
always arrays of strings, even for headers received just once.

```js
// Prints something like:
//
// { 'user-agent': ['curl/7.22.0'],
//   host: ['127.0.0.1:8000'],
//   accept: ['*'] }
console.log(request.headersDistinct);
```

**Since**

v18.3.0, v16.17.0

</td>
<td>

```ts
Request.headersDistinct;
```

</td>
<td>

node_modules/@types/node/http.d.ts:1302

</td>
</tr>
<tr>
<td>

<a id="host-1"></a> `host`

</td>
<td>

`readonly`

</td>
<td>

`string`

</td>
<td>

Contains the host derived from the `Host` HTTP header.

</td>
<td>

```ts
Request.host;
```

</td>
<td>

node_modules/@types/express-serve-static-core/index.d.ts:611

</td>
</tr>
<tr>
<td>

<a id="hostname"></a> `hostname`

</td>
<td>

`readonly`

</td>
<td>

`string`

</td>
<td>

Contains the hostname derived from the `Host` HTTP header.

</td>
<td>

```ts
Request.hostname;
```

</td>
<td>

node_modules/@types/express-serve-static-core/index.d.ts:606

</td>
</tr>
<tr>
<td>

<a id="httpversion"></a> `httpVersion`

</td>
<td>

`public`

</td>
<td>

`string`

</td>
<td>

In case of server request, the HTTP version sent by the client. In the case of
client response, the HTTP version of the connected-to server.
Probably either `'1.1'` or `'1.0'`.

Also `message.httpVersionMajor` is the first integer and `message.httpVersionMinor` is the second.

**Since**

v0.1.1

</td>
<td>

```ts
Request.httpVersion;
```

</td>
<td>

node_modules/@types/node/http.d.ts:1215

</td>
</tr>
<tr>
<td>

<a id="httpversionmajor"></a> `httpVersionMajor`

</td>
<td>

`public`

</td>
<td>

`number`

</td>
<td>

&hyphen;

</td>
<td>

```ts
Request.httpVersionMajor;
```

</td>
<td>

node_modules/@types/node/http.d.ts:1216

</td>
</tr>
<tr>
<td>

<a id="httpversionminor"></a> `httpVersionMinor`

</td>
<td>

`public`

</td>
<td>

`number`

</td>
<td>

&hyphen;

</td>
<td>

```ts
Request.httpVersionMinor;
```

</td>
<td>

node_modules/@types/node/http.d.ts:1217

</td>
</tr>
<tr>
<td>

<a id="ip"></a> `ip`

</td>
<td>

`readonly`

</td>
<td>

`undefined` \| `string`

</td>
<td>

Return the remote address, or when
"trust proxy" is `true` return
the upstream addr.

Value may be undefined if the `req.socket` is destroyed
(for example, if the client disconnected).

</td>
<td>

```ts
Request.ip;
```

</td>
<td>

node_modules/@types/express-serve-static-core/index.d.ts:573

</td>
</tr>
<tr>
<td>

<a id="ips"></a> `ips`

</td>
<td>

`readonly`

</td>
<td>

`string`[]

</td>
<td>

When "trust proxy" is `true`, parse
the "X-Forwarded-For" ip address list.

For example if the value were "client, proxy1, proxy2"
you would receive the array `["client", "proxy1", "proxy2"]`
where "proxy2" is the furthest down-stream.

</td>
<td>

```ts
Request.ips;
```

</td>
<td>

node_modules/@types/express-serve-static-core/index.d.ts:583

</td>
</tr>
<tr>
<td>

<a id="method"></a> `method`

</td>
<td>

`public`

</td>
<td>

`string`

</td>
<td>

**Only valid for request obtained from Server.**

The request method as a string. Read only. Examples: `'GET'`, `'DELETE'`.

**Since**

v0.1.1

</td>
<td>

```ts
Request.method;
```

</td>
<td>

node_modules/@types/express-serve-static-core/index.d.ts:638

</td>
</tr>
<tr>
<td>

<a id="next"></a> `next?`

</td>
<td>

`public`

</td>
<td>

`NextFunction`

</td>
<td>

&hyphen;

</td>
<td>

```ts
Request.next;
```

</td>
<td>

node_modules/@types/express-serve-static-core/index.d.ts:661

</td>
</tr>
<tr>
<td>

<a id="originalurl"></a> `originalUrl`

</td>
<td>

`public`

</td>
<td>

`string`

</td>
<td>

&hyphen;

</td>
<td>

```ts
Request.originalUrl;
```

</td>
<td>

node_modules/@types/express-serve-static-core/index.d.ts:648

</td>
</tr>
<tr>
<td>

<a id="params"></a> `params`

</td>
<td>

`public`

</td>
<td>

`ParamsDictionary`

</td>
<td>

&hyphen;

</td>
<td>

```ts
Request.params;
```

</td>
<td>

node_modules/@types/express-serve-static-core/index.d.ts:640

</td>
</tr>
<tr>
<td>

<a id="path"></a> `path`

</td>
<td>

`readonly`

</td>
<td>

`string`

</td>
<td>

Short-hand for `url.parse(req.url).pathname`.

</td>
<td>

```ts
Request.path;
```

</td>
<td>

node_modules/@types/express-serve-static-core/index.d.ts:601

</td>
</tr>
<tr>
<td>

<a id="protocol"></a> `protocol`

</td>
<td>

`readonly`

</td>
<td>

`string`

</td>
<td>

Return the protocol string "http" or "https"
when requested with TLS. When the "trust proxy"
setting is enabled the "X-Forwarded-Proto" header
field will be trusted. If you're running behind
a reverse proxy that supplies https for you this
may be enabled.

</td>
<td>

```ts
Request.protocol;
```

</td>
<td>

node_modules/@types/express-serve-static-core/index.d.ts:556

</td>
</tr>
<tr>
<td>

<a id="query"></a> `query`

</td>
<td>

`public`

</td>
<td>

`ParsedQs`

</td>
<td>

&hyphen;

</td>
<td>

```ts
Request.query;
```

</td>
<td>

node_modules/@types/express-serve-static-core/index.d.ts:642

</td>
</tr>
<tr>
<td>

<a id="rawheaders"></a> `rawHeaders`

</td>
<td>

`public`

</td>
<td>

`string`[]

</td>
<td>

The raw request/response headers list exactly as they were received.

The keys and values are in the same list. It is _not_ a
list of tuples. So, the even-numbered offsets are key values, and the
odd-numbered offsets are the associated values.

Header names are not lowercased, and duplicates are not merged.

```js
// Prints something like:
//
// [ 'user-agent',
//   'this is invalid because there can be only one',
//   'User-Agent',
//   'curl/7.22.0',
//   'Host',
//   '127.0.0.1:8000',
//   'ACCEPT',
//   '*' ]
console.log(request.rawHeaders);
```

**Since**

v0.11.6

</td>
<td>

```ts
Request.rawHeaders;
```

</td>
<td>

node_modules/@types/node/http.d.ts:1327

</td>
</tr>
<tr>
<td>

<a id="rawtrailers"></a> `rawTrailers`

</td>
<td>

`public`

</td>
<td>

`string`[]

</td>
<td>

The raw request/response trailer keys and values exactly as they were
received. Only populated at the `'end'` event.

**Since**

v0.11.6

</td>
<td>

```ts
Request.rawTrailers;
```

</td>
<td>

node_modules/@types/node/http.d.ts:1345

</td>
</tr>
<tr>
<td>

<a id="readable"></a> `readable`

</td>
<td>

`public`

</td>
<td>

`boolean`

</td>
<td>

Is `true` if it is safe to call [read](#read), which means
the stream has not been destroyed or emitted `'error'` or `'end'`.

**Since**

v11.4.0

</td>
<td>

```ts
Request.readable;
```

</td>
<td>

node_modules/@types/node/stream.d.ts:109

</td>
</tr>
<tr>
<td>

<a id="readableaborted"></a> `readableAborted`

</td>
<td>

`readonly`

</td>
<td>

`boolean`

</td>
<td>

Returns whether the stream was destroyed or errored before emitting `'end'`.

**Since**

v16.8.0

</td>
<td>

```ts
Request.readableAborted;
```

</td>
<td>

node_modules/@types/node/stream.d.ts:103

</td>
</tr>
<tr>
<td>

<a id="readabledidread"></a> `readableDidRead`

</td>
<td>

`readonly`

</td>
<td>

`boolean`

</td>
<td>

Returns whether `'data'` has been emitted.

**Since**

v16.7.0, v14.18.0

</td>
<td>

```ts
Request.readableDidRead;
```

</td>
<td>

node_modules/@types/node/stream.d.ts:114

</td>
</tr>
<tr>
<td>

<a id="readableencoding"></a> `readableEncoding`

</td>
<td>

`readonly`

</td>
<td>

`null` \| `BufferEncoding`

</td>
<td>

Getter for the property `encoding` of a given `Readable` stream. The `encoding` property can be set using the [setEncoding](#setencoding) method.

**Since**

v12.7.0

</td>
<td>

```ts
Request.readableEncoding;
```

</td>
<td>

node_modules/@types/node/stream.d.ts:119

</td>
</tr>
<tr>
<td>

<a id="readableended"></a> `readableEnded`

</td>
<td>

`readonly`

</td>
<td>

`boolean`

</td>
<td>

Becomes `true` when [`'end'`](https://nodejs.org/docs/latest-v24.x/api/stream.html#event-end) event is emitted.

**Since**

v12.9.0

</td>
<td>

```ts
Request.readableEnded;
```

</td>
<td>

node_modules/@types/node/stream.d.ts:124

</td>
</tr>
<tr>
<td>

<a id="readableflowing"></a> `readableFlowing`

</td>
<td>

`readonly`

</td>
<td>

`null` \| `boolean`

</td>
<td>

This property reflects the current state of a `Readable` stream as described
in the [Three states](https://nodejs.org/docs/latest-v24.x/api/stream.html#three-states) section.

**Since**

v9.4.0

</td>
<td>

```ts
Request.readableFlowing;
```

</td>
<td>

node_modules/@types/node/stream.d.ts:130

</td>
</tr>
<tr>
<td>

<a id="readablehighwatermark"></a> `readableHighWaterMark`

</td>
<td>

`readonly`

</td>
<td>

`number`

</td>
<td>

Returns the value of `highWaterMark` passed when creating this `Readable`.

**Since**

v9.3.0

</td>
<td>

```ts
Request.readableHighWaterMark;
```

</td>
<td>

node_modules/@types/node/stream.d.ts:135

</td>
</tr>
<tr>
<td>

<a id="readablelength"></a> `readableLength`

</td>
<td>

`readonly`

</td>
<td>

`number`

</td>
<td>

This property contains the number of bytes (or objects) in the queue
ready to be read. The value provides introspection data regarding
the status of the `highWaterMark`.

**Since**

v9.4.0

</td>
<td>

```ts
Request.readableLength;
```

</td>
<td>

node_modules/@types/node/stream.d.ts:142

</td>
</tr>
<tr>
<td>

<a id="readableobjectmode"></a> `readableObjectMode`

</td>
<td>

`readonly`

</td>
<td>

`boolean`

</td>
<td>

Getter for the property `objectMode` of a given `Readable` stream.

**Since**

v12.3.0

</td>
<td>

```ts
Request.readableObjectMode;
```

</td>
<td>

node_modules/@types/node/stream.d.ts:147

</td>
</tr>
<tr>
<td>

<a id="res"></a> `res?`

</td>
<td>

`public`

</td>
<td>

`Response`\<`any`, `Record`\<`string`, `any`\>, `number`\>

</td>
<td>

After middleware.init executed, Request will contain res and next properties
See: express/lib/middleware/init.js

</td>
<td>

```ts
Request.res;
```

</td>
<td>

node_modules/@types/express-serve-static-core/index.d.ts:660

</td>
</tr>
<tr>
<td>

<a id="route"></a> `route`

</td>
<td>

`public`

</td>
<td>

`any`

</td>
<td>

&hyphen;

</td>
<td>

```ts
Request.route;
```

</td>
<td>

node_modules/@types/express-serve-static-core/index.d.ts:644

</td>
</tr>
<tr>
<td>

<a id="secure"></a> `secure`

</td>
<td>

`readonly`

</td>
<td>

`boolean`

</td>
<td>

Short-hand for:

req.protocol == 'https'

</td>
<td>

```ts
Request.secure;
```

</td>
<td>

node_modules/@types/express-serve-static-core/index.d.ts:563

</td>
</tr>
<tr>
<td>

<a id="signedcookies"></a> `signedCookies`

</td>
<td>

`public`

</td>
<td>

`any`

</td>
<td>

&hyphen;

</td>
<td>

```ts
Request.signedCookies;
```

</td>
<td>

node_modules/@types/express-serve-static-core/index.d.ts:646

</td>
</tr>
<tr>
<td>

<a id="socket"></a> `socket`

</td>
<td>

`public`

</td>
<td>

`Socket`

</td>
<td>

The `net.Socket` object associated with the connection.

With HTTPS support, use `request.socket.getPeerCertificate()` to obtain the
client's authentication details.

This property is guaranteed to be an instance of the `net.Socket` class,
a subclass of `stream.Duplex`, unless the user specified a socket
type other than `net.Socket` or internally nulled.

**Since**

v0.3.0

</td>
<td>

```ts
Request.socket;
```

</td>
<td>

node_modules/@types/node/http.d.ts:1259

</td>
</tr>
<tr>
<td>

<a id="stale"></a> `stale`

</td>
<td>

`readonly`

</td>
<td>

`boolean`

</td>
<td>

Check if the request is stale, aka
"Last-Modified" and / or the "ETag" for the
resource has changed.

</td>
<td>

```ts
Request.stale;
```

</td>
<td>

node_modules/@types/express-serve-static-core/index.d.ts:625

</td>
</tr>
<tr>
<td>

<a id="statuscode"></a> `statusCode?`

</td>
<td>

`public`

</td>
<td>

`number`

</td>
<td>

**Only valid for response obtained from ClientRequest.**

The 3-digit HTTP response status code. E.G. `404`.

**Since**

v0.1.1

</td>
<td>

```ts
Request.statusCode;
```

</td>
<td>

node_modules/@types/node/http.d.ts:1407

</td>
</tr>
<tr>
<td>

<a id="statusmessage"></a> `statusMessage?`

</td>
<td>

`public`

</td>
<td>

`string`

</td>
<td>

**Only valid for response obtained from ClientRequest.**

The HTTP response status message (reason phrase). E.G. `OK` or `Internal Server Error`.

**Since**

v0.11.10

</td>
<td>

```ts
Request.statusMessage;
```

</td>
<td>

node_modules/@types/node/http.d.ts:1414

</td>
</tr>
<tr>
<td>

<a id="subdomain"></a> `subdomain?`

</td>
<td>

`public`

</td>
<td>

`string`

</td>
<td>

&hyphen;

</td>
<td>

&hyphen;

</td>
<td>

[libs/nest-core/src/lib/interfaces/request-with-subdomain.ts:5](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-core/src/lib/interfaces/request-with-subdomain.ts#L5)

</td>
</tr>
<tr>
<td>

<a id="subdomains"></a> `subdomains`

</td>
<td>

`readonly`

</td>
<td>

`string`[]

</td>
<td>

Return subdomains as an array.

Subdomains are the dot-separated parts of the host before the main domain of
the app. By default, the domain of the app is assumed to be the last two
parts of the host. This can be changed by setting "subdomain offset".

For example, if the domain is "tobi.ferrets.example.com":
If "subdomain offset" is not set, req.subdomains is `["ferrets", "tobi"]`.
If "subdomain offset" is 3, req.subdomains is `["tobi"]`.

</td>
<td>

```ts
Request.subdomains;
```

</td>
<td>

node_modules/@types/express-serve-static-core/index.d.ts:596

</td>
</tr>
<tr>
<td>

<a id="trailers"></a> `trailers`

</td>
<td>

`public`

</td>
<td>

`Dict`\<`string`\>

</td>
<td>

The request/response trailers object. Only populated at the `'end'` event.

**Since**

v0.3.0

</td>
<td>

```ts
Request.trailers;
```

</td>
<td>

node_modules/@types/node/http.d.ts:1332

</td>
</tr>
<tr>
<td>

<a id="trailersdistinct"></a> `trailersDistinct`

</td>
<td>

`public`

</td>
<td>

`Dict`\<`string`[]\>

</td>
<td>

Similar to `message.trailers`, but there is no join logic and the values are
always arrays of strings, even for headers received just once.
Only populated at the `'end'` event.

**Since**

v18.3.0, v16.17.0

</td>
<td>

```ts
Request.trailersDistinct;
```

</td>
<td>

node_modules/@types/node/http.d.ts:1339

</td>
</tr>
<tr>
<td>

<a id="url-1"></a> `url`

</td>
<td>

`public`

</td>
<td>

`string`

</td>
<td>

**Only valid for request obtained from Server.**

Request URL string. This contains only the URL that is present in the actual
HTTP request. Take the following request:

```http
GET /status?name=ryan HTTP/1.1
Accept: text/plain
```

To parse the URL into its parts:

```js
new URL(`http://${process.env.HOST ?? "localhost"}${request.url}`);
```

When `request.url` is `'/status?name=ryan'` and `process.env.HOST` is undefined:

```console
$ node
> new URL(`http://${process.env.HOST ?? 'localhost'}${request.url}`);
URL {
  href: 'http://localhost/status?name=ryan',
  origin: 'http://localhost',
  protocol: 'http:',
  username: '',
  password: '',
  host: 'localhost',
  hostname: 'localhost',
  port: '',
  pathname: '/status',
  search: '?name=ryan',
  searchParams: URLSearchParams { 'name' => 'ryan' },
  hash: ''
}
```

Ensure that you set `process.env.HOST` to the server's host name, or consider replacing this part entirely. If using `req.headers.host`, ensure proper
validation is used, as clients may specify a custom `Host` header.

**Since**

v0.1.90

</td>
<td>

```ts
Request.url;
```

</td>
<td>

node_modules/@types/express-serve-static-core/index.d.ts:650

</td>
</tr>
<tr>
<td>

<a id="xhr"></a> `xhr`

</td>
<td>

`readonly`

</td>
<td>

`boolean`

</td>
<td>

Check if the request was an _XMLHttpRequest_.

</td>
<td>

```ts
Request.xhr;
```

</td>
<td>

node_modules/@types/express-serve-static-core/index.d.ts:630

</td>
</tr>
</tbody>
</table>

#### Methods

##### \_construct()?

```ts
optional _construct(callback): void;
```

Defined in: node_modules/@types/node/stream.d.ts:164

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

`callback`

</td>
<td>

(`error?`) => `void`

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### Inherited from

```ts
Request._construct;
```

##### \_destroy()

```ts
_destroy(error, callback): void;
```

Defined in: node_modules/@types/node/stream.d.ts:605

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

`error`

</td>
<td>

`null` \| `Error`

</td>
</tr>
<tr>
<td>

`callback`

</td>
<td>

(`error?`) => `void`

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### Inherited from

```ts
Request._destroy;
```

##### \_read()

```ts
_read(size): void;
```

Defined in: node_modules/@types/node/stream.d.ts:165

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

`size`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### Inherited from

```ts
Request._read;
```

##### \[asyncDispose\]()

```ts
asyncDispose: Promise<void>;
```

Defined in: node_modules/@types/node/stream.d.ts:690

Calls `readable.destroy()` with an `AbortError` and returns a promise that fulfills when the stream is finished.

###### Returns

`Promise`\<`void`\>

###### Since

v20.4.0

###### Inherited from

```ts
Request.[asyncDispose]
```

##### \[asyncIterator\]()

```ts
asyncIterator: AsyncIterator<any>;
```

Defined in: node_modules/@types/node/stream.d.ts:685

###### Returns

`AsyncIterator`\<`any`\>

###### Inherited from

```ts
Request.[asyncIterator]
```

##### \[captureRejectionSymbol\]()?

```ts
optional [captureRejectionSymbol]<K>(
   error,
   event, ...
   args): void;
```

Defined in: node_modules/@types/node/events.d.ts:136

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

`K`

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

`error`

</td>
<td>

`Error`

</td>
</tr>
<tr>
<td>

`event`

</td>
<td>

`string` \| `symbol`

</td>
</tr>
<tr>
<td>

...`args`

</td>
<td>

`AnyRest`

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### Inherited from

```ts
Request.[captureRejectionSymbol]
```

##### accepts()

###### Call Signature

```ts
accepts(): string[];
```

Defined in: node_modules/@types/express-serve-static-core/index.d.ts:464

Check if the given `type(s)` is acceptable, returning
the best match when true, otherwise `undefined`, in which
case you should respond with 406 "Not Acceptable".

The `type` value may be a single mime type string
such as "application/json", the extension name
such as "json", a comma-delimted list such as "json, html, text/plain",
or an array `["json", "html", "text/plain"]`. When a list
or array is given the _best_ match, if any is returned.

Examples:

    // Accept: text/html
    req.accepts('html');
    // => "html"

    // Accept: text/*, application/json
    req.accepts('html');
    // => "html"
    req.accepts('text/html');
    // => "text/html"
    req.accepts('json, text');
    // => "json"
    req.accepts('application/json');
    // => "application/json"

    // Accept: text/*, application/json
    req.accepts('image/png');
    req.accepts('png');
    // => false

    // Accept: text/*;q=.5, application/json
    req.accepts(['html', 'json']);
    req.accepts('html, json');
    // => "json"

###### Returns

`string`[]

###### Inherited from

```ts
Request.accepts;
```

###### Call Signature

```ts
accepts(type): string | false;
```

Defined in: node_modules/@types/express-serve-static-core/index.d.ts:465

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

`type`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

###### Returns

`string` \| `false`

###### Inherited from

```ts
Request.accepts;
```

###### Call Signature

```ts
accepts(type): string | false;
```

Defined in: node_modules/@types/express-serve-static-core/index.d.ts:466

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

`type`

</td>
<td>

`string`[]

</td>
</tr>
</tbody>
</table>

###### Returns

`string` \| `false`

###### Inherited from

```ts
Request.accepts;
```

###### Call Signature

```ts
accepts(...type): string | false;
```

Defined in: node_modules/@types/express-serve-static-core/index.d.ts:467

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

...`type`

</td>
<td>

`string`[]

</td>
</tr>
</tbody>
</table>

###### Returns

`string` \| `false`

###### Inherited from

```ts
Request.accepts;
```

##### acceptsCharsets()

###### Call Signature

```ts
acceptsCharsets(): string[];
```

Defined in: node_modules/@types/express-serve-static-core/index.d.ts:476

Returns the first accepted charset of the specified character sets,
based on the request's Accept-Charset HTTP header field.
If none of the specified charsets is accepted, returns false.

For more information, or if you have issues or concerns, see accepts.

###### Returns

`string`[]

###### Inherited from

```ts
Request.acceptsCharsets;
```

###### Call Signature

```ts
acceptsCharsets(charset): string | false;
```

Defined in: node_modules/@types/express-serve-static-core/index.d.ts:477

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

`charset`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

###### Returns

`string` \| `false`

###### Inherited from

```ts
Request.acceptsCharsets;
```

###### Call Signature

```ts
acceptsCharsets(charset): string | false;
```

Defined in: node_modules/@types/express-serve-static-core/index.d.ts:478

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

`charset`

</td>
<td>

`string`[]

</td>
</tr>
</tbody>
</table>

###### Returns

`string` \| `false`

###### Inherited from

```ts
Request.acceptsCharsets;
```

###### Call Signature

```ts
acceptsCharsets(...charset): string | false;
```

Defined in: node_modules/@types/express-serve-static-core/index.d.ts:479

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

...`charset`

</td>
<td>

`string`[]

</td>
</tr>
</tbody>
</table>

###### Returns

`string` \| `false`

###### Inherited from

```ts
Request.acceptsCharsets;
```

##### acceptsEncodings()

###### Call Signature

```ts
acceptsEncodings(): string[];
```

Defined in: node_modules/@types/express-serve-static-core/index.d.ts:488

Returns the first accepted encoding of the specified encodings,
based on the request's Accept-Encoding HTTP header field.
If none of the specified encodings is accepted, returns false.

For more information, or if you have issues or concerns, see accepts.

###### Returns

`string`[]

###### Inherited from

```ts
Request.acceptsEncodings;
```

###### Call Signature

```ts
acceptsEncodings(encoding): string | false;
```

Defined in: node_modules/@types/express-serve-static-core/index.d.ts:489

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

`encoding`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

###### Returns

`string` \| `false`

###### Inherited from

```ts
Request.acceptsEncodings;
```

###### Call Signature

```ts
acceptsEncodings(encoding): string | false;
```

Defined in: node_modules/@types/express-serve-static-core/index.d.ts:490

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

`encoding`

</td>
<td>

`string`[]

</td>
</tr>
</tbody>
</table>

###### Returns

`string` \| `false`

###### Inherited from

```ts
Request.acceptsEncodings;
```

###### Call Signature

```ts
acceptsEncodings(...encoding): string | false;
```

Defined in: node_modules/@types/express-serve-static-core/index.d.ts:491

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

...`encoding`

</td>
<td>

`string`[]

</td>
</tr>
</tbody>
</table>

###### Returns

`string` \| `false`

###### Inherited from

```ts
Request.acceptsEncodings;
```

##### acceptsLanguages()

###### Call Signature

```ts
acceptsLanguages(): string[];
```

Defined in: node_modules/@types/express-serve-static-core/index.d.ts:500

Returns the first accepted language of the specified languages,
based on the request's Accept-Language HTTP header field.
If none of the specified languages is accepted, returns false.

For more information, or if you have issues or concerns, see accepts.

###### Returns

`string`[]

###### Inherited from

```ts
Request.acceptsLanguages;
```

###### Call Signature

```ts
acceptsLanguages(lang): string | false;
```

Defined in: node_modules/@types/express-serve-static-core/index.d.ts:501

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

`lang`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

###### Returns

`string` \| `false`

###### Inherited from

```ts
Request.acceptsLanguages;
```

###### Call Signature

```ts
acceptsLanguages(lang): string | false;
```

Defined in: node_modules/@types/express-serve-static-core/index.d.ts:502

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

`lang`

</td>
<td>

`string`[]

</td>
</tr>
</tbody>
</table>

###### Returns

`string` \| `false`

###### Inherited from

```ts
Request.acceptsLanguages;
```

###### Call Signature

```ts
acceptsLanguages(...lang): string | false;
```

Defined in: node_modules/@types/express-serve-static-core/index.d.ts:503

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

...`lang`

</td>
<td>

`string`[]

</td>
</tr>
</tbody>
</table>

###### Returns

`string` \| `false`

###### Inherited from

```ts
Request.acceptsLanguages;
```

##### addListener()

###### Call Signature

```ts
addListener(event, listener): this;
```

Defined in: node_modules/@types/node/stream.d.ts:629

Event emitter
The defined events on documents including:

1. close
2. data
3. end
4. error
5. pause
6. readable
7. resume

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

`event`

</td>
<td>

`"close"`

</td>
</tr>
<tr>
<td>

`listener`

</td>
<td>

() => `void`

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

###### Inherited from

```ts
Request.addListener;
```

###### Call Signature

```ts
addListener(event, listener): this;
```

Defined in: node_modules/@types/node/stream.d.ts:630

Event emitter
The defined events on documents including:

1. close
2. data
3. end
4. error
5. pause
6. readable
7. resume

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

`event`

</td>
<td>

`"data"`

</td>
</tr>
<tr>
<td>

`listener`

</td>
<td>

(`chunk`) => `void`

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

###### Inherited from

```ts
Request.addListener;
```

###### Call Signature

```ts
addListener(event, listener): this;
```

Defined in: node_modules/@types/node/stream.d.ts:631

Event emitter
The defined events on documents including:

1. close
2. data
3. end
4. error
5. pause
6. readable
7. resume

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

`event`

</td>
<td>

`"end"`

</td>
</tr>
<tr>
<td>

`listener`

</td>
<td>

() => `void`

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

###### Inherited from

```ts
Request.addListener;
```

###### Call Signature

```ts
addListener(event, listener): this;
```

Defined in: node_modules/@types/node/stream.d.ts:632

Event emitter
The defined events on documents including:

1. close
2. data
3. end
4. error
5. pause
6. readable
7. resume

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

`event`

</td>
<td>

`"error"`

</td>
</tr>
<tr>
<td>

`listener`

</td>
<td>

(`err`) => `void`

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

###### Inherited from

```ts
Request.addListener;
```

###### Call Signature

```ts
addListener(event, listener): this;
```

Defined in: node_modules/@types/node/stream.d.ts:633

Event emitter
The defined events on documents including:

1. close
2. data
3. end
4. error
5. pause
6. readable
7. resume

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

`event`

</td>
<td>

`"pause"`

</td>
</tr>
<tr>
<td>

`listener`

</td>
<td>

() => `void`

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

###### Inherited from

```ts
Request.addListener;
```

###### Call Signature

```ts
addListener(event, listener): this;
```

Defined in: node_modules/@types/node/stream.d.ts:634

Event emitter
The defined events on documents including:

1. close
2. data
3. end
4. error
5. pause
6. readable
7. resume

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

`event`

</td>
<td>

`"readable"`

</td>
</tr>
<tr>
<td>

`listener`

</td>
<td>

() => `void`

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

###### Inherited from

```ts
Request.addListener;
```

###### Call Signature

```ts
addListener(event, listener): this;
```

Defined in: node_modules/@types/node/stream.d.ts:635

Event emitter
The defined events on documents including:

1. close
2. data
3. end
4. error
5. pause
6. readable
7. resume

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

`event`

</td>
<td>

`"resume"`

</td>
</tr>
<tr>
<td>

`listener`

</td>
<td>

() => `void`

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

###### Inherited from

```ts
Request.addListener;
```

###### Call Signature

```ts
addListener(event, listener): this;
```

Defined in: node_modules/@types/node/stream.d.ts:636

Event emitter
The defined events on documents including:

1. close
2. data
3. end
4. error
5. pause
6. readable
7. resume

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

`event`

</td>
<td>

`string` \| `symbol`

</td>
</tr>
<tr>
<td>

`listener`

</td>
<td>

(...`args`) => `void`

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

###### Inherited from

```ts
Request.addListener;
```

##### asIndexedPairs()

```ts
asIndexedPairs(options?): Readable;
```

Defined in: node_modules/@types/node/stream.d.ts:580

This method returns a new stream with chunks of the underlying stream paired with a counter
in the form `[index, chunk]`. The first index value is `0` and it increases by 1 for each chunk produced.

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

`Pick`\<`ArrayOptions`, `"signal"`\>

</td>
</tr>
</tbody>
</table>

###### Returns

`Readable`

a stream of indexed pairs.

###### Since

v17.5.0

###### Inherited from

```ts
Request.asIndexedPairs;
```

##### compose()

```ts
compose<T>(stream, options?): T;
```

Defined in: node_modules/@types/node/stream.d.ts:35

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

`T` _extends_ `ReadableStream`

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

`stream`

</td>
<td>

`ComposeFnParam` \| `T` \| `Iterable`\<`T`\> \| `AsyncIterable`\<`T`\>

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

\{ `signal`: `AbortSignal`; \}

</td>
</tr>
<tr>
<td>

`options.signal?`

</td>
<td>

`AbortSignal`

</td>
</tr>
</tbody>
</table>

###### Returns

`T`

###### Inherited from

```ts
Request.compose;
```

##### destroy()

```ts
destroy(error?): this;
```

Defined in: node_modules/@types/node/http.d.ts:1420

Calls `destroy()` on the socket that received the `IncomingMessage`. If `error` is provided, an `'error'` event is emitted on the socket and `error` is passed
as an argument to any listeners on the event.

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

`error?`

</td>
<td>

`Error`

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

###### Since

v0.3.0

###### Inherited from

```ts
Request.destroy;
```

##### drop()

```ts
drop(limit, options?): Readable;
```

Defined in: node_modules/@types/node/stream.d.ts:566

This method returns a new stream with the first _limit_ chunks dropped from the start.

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

`limit`

</td>
<td>

`number`

</td>
<td>

the number of chunks to drop from the readable.

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

`Pick`\<`ArrayOptions`, `"signal"`\>

</td>
<td>

&hyphen;

</td>
</tr>
</tbody>
</table>

###### Returns

`Readable`

a stream with _limit_ chunks dropped from the start.

###### Since

v17.5.0

###### Inherited from

```ts
Request.drop;
```

##### emit()

###### Call Signature

```ts
emit(event): boolean;
```

Defined in: node_modules/@types/node/stream.d.ts:637

Synchronously calls each of the listeners registered for the event named `eventName`, in the order they were registered, passing the supplied arguments
to each.

Returns `true` if the event had listeners, `false` otherwise.

```js
import { EventEmitter } from "node:events";
const myEmitter = new EventEmitter();

// First listener
myEmitter.on("event", function firstListener() {
  console.log("Helloooo! first listener");
});
// Second listener
myEmitter.on("event", function secondListener(arg1, arg2) {
  console.log(`event with parameters ${arg1}, ${arg2} in second listener`);
});
// Third listener
myEmitter.on("event", function thirdListener(...args) {
  const parameters = args.join(", ");
  console.log(`event with parameters ${parameters} in third listener`);
});

console.log(myEmitter.listeners("event"));

myEmitter.emit("event", 1, 2, 3, 4, 5);

// Prints:
// [
//   [Function: firstListener],
//   [Function: secondListener],
//   [Function: thirdListener]
// ]
// Helloooo! first listener
// event with parameters 1, 2 in second listener
// event with parameters 1, 2, 3, 4, 5 in third listener
```

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

`event`

</td>
<td>

`"close"`

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean`

###### Since

v0.1.26

###### Inherited from

```ts
Request.emit;
```

###### Call Signature

```ts
emit(event, chunk): boolean;
```

Defined in: node_modules/@types/node/stream.d.ts:638

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

`event`

</td>
<td>

`"data"`

</td>
</tr>
<tr>
<td>

`chunk`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean`

###### Inherited from

```ts
Request.emit;
```

###### Call Signature

```ts
emit(event): boolean;
```

Defined in: node_modules/@types/node/stream.d.ts:639

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

`event`

</td>
<td>

`"end"`

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean`

###### Inherited from

```ts
Request.emit;
```

###### Call Signature

```ts
emit(event, err): boolean;
```

Defined in: node_modules/@types/node/stream.d.ts:640

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

`event`

</td>
<td>

`"error"`

</td>
</tr>
<tr>
<td>

`err`

</td>
<td>

`Error`

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean`

###### Inherited from

```ts
Request.emit;
```

###### Call Signature

```ts
emit(event): boolean;
```

Defined in: node_modules/@types/node/stream.d.ts:641

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

`event`

</td>
<td>

`"pause"`

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean`

###### Inherited from

```ts
Request.emit;
```

###### Call Signature

```ts
emit(event): boolean;
```

Defined in: node_modules/@types/node/stream.d.ts:642

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

`event`

</td>
<td>

`"readable"`

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean`

###### Inherited from

```ts
Request.emit;
```

###### Call Signature

```ts
emit(event): boolean;
```

Defined in: node_modules/@types/node/stream.d.ts:643

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

`event`

</td>
<td>

`"resume"`

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean`

###### Inherited from

```ts
Request.emit;
```

###### Call Signature

```ts
emit(event, ...args): boolean;
```

Defined in: node_modules/@types/node/stream.d.ts:644

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

`event`

</td>
<td>

`string` \| `symbol`

</td>
</tr>
<tr>
<td>

...`args`

</td>
<td>

`any`[]

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean`

###### Inherited from

```ts
Request.emit;
```

##### eventNames()

```ts
eventNames(): (string | symbol)[];
```

Defined in: node_modules/@types/node/events.d.ts:921

Returns an array listing the events for which the emitter has registered
listeners. The values in the array are strings or `Symbol`s.

```js
import { EventEmitter } from "node:events";

const myEE = new EventEmitter();
myEE.on("foo", () => {});
myEE.on("bar", () => {});

const sym = Symbol("symbol");
myEE.on(sym, () => {});

console.log(myEE.eventNames());
// Prints: [ 'foo', 'bar', Symbol(symbol) ]
```

###### Returns

(`string` \| `symbol`)[]

###### Since

v6.0.0

###### Inherited from

```ts
Request.eventNames;
```

##### every()

```ts
every(fn, options?): Promise<boolean>;
```

Defined in: node_modules/@types/node/stream.d.ts:545

This method is similar to `Array.prototype.every` and calls _fn_ on each chunk in the stream
to check if all awaited return values are truthy value for _fn_. Once an _fn_ call on a chunk
`await`ed return value is falsy, the stream is destroyed and the promise is fulfilled with `false`.
If all of the _fn_ calls on the chunks return a truthy value, the promise is fulfilled with `true`.

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

(`data`, `options?`) => `boolean` \| `Promise`\<`boolean`\>

</td>
<td>

a function to call on each chunk of the stream. Async or not.

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

`ArrayOptions`

</td>
<td>

&hyphen;

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`boolean`\>

a promise evaluating to `true` if _fn_ returned a truthy value for every one of the chunks.

###### Since

v17.5.0

###### Inherited from

```ts
Request.every;
```

##### filter()

```ts
filter(fn, options?): Readable;
```

Defined in: node_modules/@types/node/stream.d.ts:473

This method allows filtering the stream. For each chunk in the stream the _fn_ function will be called
and if it returns a truthy value, the chunk will be passed to the result stream.
If the _fn_ function returns a promise - that promise will be `await`ed.

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

(`data`, `options?`) => `boolean` \| `Promise`\<`boolean`\>

</td>
<td>

a function to filter chunks from the stream. Async or not.

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

`ArrayOptions`

</td>
<td>

&hyphen;

</td>
</tr>
</tbody>
</table>

###### Returns

`Readable`

a stream filtered with the predicate _fn_.

###### Since

v17.4.0, v16.14.0

###### Inherited from

```ts
Request.filter;
```

##### find()

###### Call Signature

```ts
find<T>(fn, options?): Promise<undefined | T>;
```

Defined in: node_modules/@types/node/stream.d.ts:528

This method is similar to `Array.prototype.find` and calls _fn_ on each chunk in the stream
to find a chunk with a truthy value for _fn_. Once an _fn_ call's awaited return value is truthy,
the stream is destroyed and the promise is fulfilled with value for which _fn_ returned a truthy value.
If all of the _fn_ calls on the chunks return a falsy value, the promise is fulfilled with `undefined`.

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

`T`

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

(`data`, `options?`) => `data is T`

</td>
<td>

a function to call on each chunk of the stream. Async or not.

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

`ArrayOptions`

</td>
<td>

&hyphen;

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`undefined` \| `T`\>

a promise evaluating to the first chunk for which _fn_ evaluated with a truthy value,
or `undefined` if no element was found.

###### Since

v17.5.0

###### Inherited from

```ts
Request.find;
```

###### Call Signature

```ts
find(fn, options?): Promise<any>;
```

Defined in: node_modules/@types/node/stream.d.ts:532

This method is similar to `Array.prototype.find` and calls _fn_ on each chunk in the stream
to find a chunk with a truthy value for _fn_. Once an _fn_ call's awaited return value is truthy,
the stream is destroyed and the promise is fulfilled with value for which _fn_ returned a truthy value.
If all of the _fn_ calls on the chunks return a falsy value, the promise is fulfilled with `undefined`.

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

(`data`, `options?`) => `boolean` \| `Promise`\<`boolean`\>

</td>
<td>

a function to call on each chunk of the stream. Async or not.

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

`ArrayOptions`

</td>
<td>

&hyphen;

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`any`\>

a promise evaluating to the first chunk for which _fn_ evaluated with a truthy value,
or `undefined` if no element was found.

###### Since

v17.5.0

###### Inherited from

```ts
Request.find;
```

##### flatMap()

```ts
flatMap(fn, options?): Readable;
```

Defined in: node_modules/@types/node/stream.d.ts:559

This method returns a new stream by applying the given callback to each chunk of the stream
and then flattening the result.

It is possible to return a stream or another iterable or async iterable from _fn_ and the result streams
will be merged (flattened) into the returned stream.

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

(`data`, `options?`) => `any`

</td>
<td>

a function to map over every chunk in the stream. May be async. May be a stream or generator.

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

`ArrayOptions`

</td>
<td>

&hyphen;

</td>
</tr>
</tbody>
</table>

###### Returns

`Readable`

a stream flat-mapped with the function _fn_.

###### Since

v17.5.0

###### Inherited from

```ts
Request.flatMap;
```

##### forEach()

```ts
forEach(fn, options?): Promise<void>;
```

Defined in: node_modules/@types/node/stream.d.ts:492

This method allows iterating a stream. For each chunk in the stream the _fn_ function will be called.
If the _fn_ function returns a promise - that promise will be `await`ed.

This method is different from `for await...of` loops in that it can optionally process chunks concurrently.
In addition, a `forEach` iteration can only be stopped by having passed a `signal` option
and aborting the related AbortController while `for await...of` can be stopped with `break` or `return`.
In either case the stream will be destroyed.

This method is different from listening to the `'data'` event in that it uses the `readable` event
in the underlying machinary and can limit the number of concurrent _fn_ calls.

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

(`data`, `options?`) => `void` \| `Promise`\<`void`\>

</td>
<td>

a function to call on each chunk of the stream. Async or not.

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

`ArrayOptions`

</td>
<td>

&hyphen;

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`void`\>

a promise for when the stream has finished.

###### Since

v17.5.0

###### Inherited from

```ts
Request.forEach;
```

##### get()

###### Call Signature

```ts
get(name): undefined | string[];
```

Defined in: node_modules/@types/express-serve-static-core/index.d.ts:421

Return request header.

The `Referrer` header field is special-cased,
both `Referrer` and `Referer` are interchangeable.

Examples:

    req.get('Content-Type');
    // => "text/plain"

    req.get('content-type');
    // => "text/plain"

    req.get('Something');
    // => undefined

Aliased as `req.header()`.

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

`name`

</td>
<td>

`"set-cookie"`

</td>
</tr>
</tbody>
</table>

###### Returns

`undefined` \| `string`[]

###### Inherited from

```ts
Request.get;
```

###### Call Signature

```ts
get(name): undefined | string;
```

Defined in: node_modules/@types/express-serve-static-core/index.d.ts:422

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

`name`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

###### Returns

`undefined` \| `string`

###### Inherited from

```ts
Request.get;
```

##### getMaxListeners()

```ts
getMaxListeners(): number;
```

Defined in: node_modules/@types/node/events.d.ts:773

Returns the current max listener value for the `EventEmitter` which is either
set by `emitter.setMaxListeners(n)` or defaults to EventEmitter.defaultMaxListeners.

###### Returns

`number`

###### Since

v1.0.0

###### Inherited from

```ts
Request.getMaxListeners;
```

##### header()

###### Call Signature

```ts
header(name): undefined | string[];
```

Defined in: node_modules/@types/express-serve-static-core/index.d.ts:424

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

`name`

</td>
<td>

`"set-cookie"`

</td>
</tr>
</tbody>
</table>

###### Returns

`undefined` \| `string`[]

###### Inherited from

```ts
Request.header;
```

###### Call Signature

```ts
header(name): undefined | string;
```

Defined in: node_modules/@types/express-serve-static-core/index.d.ts:425

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

`name`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

###### Returns

`undefined` \| `string`

###### Inherited from

```ts
Request.header;
```

##### is()

```ts
is(type): null | string | false;
```

Defined in: node_modules/@types/express-serve-static-core/index.d.ts:546

Check if the incoming request contains the "Content-Type"
header field, and it contains the give mime `type`.

Examples:

     // With Content-Type: text/html; charset=utf-8
     req.is('html');
     req.is('text/html');
     req.is('text/*');
     // => true

     // When Content-Type is application/json
     req.is('json');
     req.is('application/json');
     req.is('application/*');
     // => true

     req.is('html');
     // => false

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

`type`

</td>
<td>

`string` \| `string`[]

</td>
</tr>
</tbody>
</table>

###### Returns

`null` \| `string` \| `false`

###### Inherited from

```ts
Request.is;
```

##### isPaused()

```ts
isPaused(): boolean;
```

Defined in: node_modules/@types/node/stream.d.ts:326

The `readable.isPaused()` method returns the current operating state of the `Readable`.
This is used primarily by the mechanism that underlies the `readable.pipe()` method.
In most typical cases, there will be no reason to use this method directly.

```js
const readable = new stream.Readable();

readable.isPaused(); // === false
readable.pause();
readable.isPaused(); // === true
readable.resume();
readable.isPaused(); // === false
```

###### Returns

`boolean`

###### Since

v0.11.14

###### Inherited from

```ts
Request.isPaused;
```

##### iterator()

```ts
iterator(options?): AsyncIterator<any>;
```

Defined in: node_modules/@types/node/stream.d.ts:456

The iterator created by this method gives users the option to cancel the destruction
of the stream if the `for await...of` loop is exited by `return`, `break`, or `throw`,
or if the iterator should destroy the stream if the stream emitted an error during iteration.

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

\{ `destroyOnReturn?`: `boolean`; \}

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`options.destroyOnReturn?`

</td>
<td>

`boolean`

</td>
<td>

When set to `false`, calling `return` on the async iterator,
or exiting a `for await...of` iteration using a `break`, `return`, or `throw` will not destroy the stream.
**Default: `true`**.

</td>
</tr>
</tbody>
</table>

###### Returns

`AsyncIterator`\<`any`\>

###### Since

v16.3.0

###### Inherited from

```ts
Request.iterator;
```

##### listenerCount()

```ts
listenerCount<K>(eventName, listener?): number;
```

Defined in: node_modules/@types/node/events.d.ts:867

Returns the number of listeners listening for the event named `eventName`.
If `listener` is provided, it will return how many times the listener is found
in the list of the listeners of the event.

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

`K`

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

`eventName`

</td>
<td>

`string` \| `symbol`

</td>
<td>

The name of the event being listened for

</td>
</tr>
<tr>
<td>

`listener?`

</td>
<td>

`Function`

</td>
<td>

The event handler function

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Since

v3.2.0

###### Inherited from

```ts
Request.listenerCount;
```

##### listeners()

```ts
listeners<K>(eventName): Function[];
```

Defined in: node_modules/@types/node/events.d.ts:786

Returns a copy of the array of listeners for the event named `eventName`.

```js
server.on("connection", (stream) => {
  console.log("someone connected!");
});
console.log(util.inspect(server.listeners("connection")));
// Prints: [ [Function] ]
```

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

`K`

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

`eventName`

</td>
<td>

`string` \| `symbol`

</td>
</tr>
</tbody>
</table>

###### Returns

`Function`[]

###### Since

v0.1.26

###### Inherited from

```ts
Request.listeners;
```

##### map()

```ts
map(fn, options?): Readable;
```

Defined in: node_modules/@types/node/stream.d.ts:464

This method allows mapping over the stream. The _fn_ function will be called for every chunk in the stream.
If the _fn_ function returns a promise - that promise will be `await`ed before being passed to the result stream.

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

(`data`, `options?`) => `any`

</td>
<td>

a function to map over every chunk in the stream. Async or not.

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

`ArrayOptions`

</td>
<td>

&hyphen;

</td>
</tr>
</tbody>
</table>

###### Returns

`Readable`

a stream mapped with the function _fn_.

###### Since

v17.4.0, v16.14.0

###### Inherited from

```ts
Request.map;
```

##### off()

```ts
off<K>(eventName, listener): this;
```

Defined in: node_modules/@types/node/events.d.ts:746

Alias for `emitter.removeListener()`.

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

`K`

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

`eventName`

</td>
<td>

`string` \| `symbol`

</td>
</tr>
<tr>
<td>

`listener`

</td>
<td>

(...`args`) => `void`

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

###### Since

v10.0.0

###### Inherited from

```ts
Request.off;
```

##### on()

###### Call Signature

```ts
on(event, listener): this;
```

Defined in: node_modules/@types/node/stream.d.ts:645

Adds the `listener` function to the end of the listeners array for the event
named `eventName`. No checks are made to see if the `listener` has already
been added. Multiple calls passing the same combination of `eventName` and
`listener` will result in the `listener` being added, and called, multiple times.

```js
server.on("connection", (stream) => {
  console.log("someone connected!");
});
```

Returns a reference to the `EventEmitter`, so that calls can be chained.

By default, event listeners are invoked in the order they are added. The `emitter.prependListener()` method can be used as an alternative to add the
event listener to the beginning of the listeners array.

```js
import { EventEmitter } from "node:events";
const myEE = new EventEmitter();
myEE.on("foo", () => console.log("a"));
myEE.prependListener("foo", () => console.log("b"));
myEE.emit("foo");
// Prints:
//   b
//   a
```

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

`event`

</td>
<td>

`"close"`

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`listener`

</td>
<td>

() => `void`

</td>
<td>

The callback function

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

###### Since

v0.1.101

###### Inherited from

```ts
Request.on;
```

###### Call Signature

```ts
on(event, listener): this;
```

Defined in: node_modules/@types/node/stream.d.ts:646

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

`event`

</td>
<td>

`"data"`

</td>
</tr>
<tr>
<td>

`listener`

</td>
<td>

(`chunk`) => `void`

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

###### Inherited from

```ts
Request.on;
```

###### Call Signature

```ts
on(event, listener): this;
```

Defined in: node_modules/@types/node/stream.d.ts:647

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

`event`

</td>
<td>

`"end"`

</td>
</tr>
<tr>
<td>

`listener`

</td>
<td>

() => `void`

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

###### Inherited from

```ts
Request.on;
```

###### Call Signature

```ts
on(event, listener): this;
```

Defined in: node_modules/@types/node/stream.d.ts:648

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

`event`

</td>
<td>

`"error"`

</td>
</tr>
<tr>
<td>

`listener`

</td>
<td>

(`err`) => `void`

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

###### Inherited from

```ts
Request.on;
```

###### Call Signature

```ts
on(event, listener): this;
```

Defined in: node_modules/@types/node/stream.d.ts:649

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

`event`

</td>
<td>

`"pause"`

</td>
</tr>
<tr>
<td>

`listener`

</td>
<td>

() => `void`

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

###### Inherited from

```ts
Request.on;
```

###### Call Signature

```ts
on(event, listener): this;
```

Defined in: node_modules/@types/node/stream.d.ts:650

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

`event`

</td>
<td>

`"readable"`

</td>
</tr>
<tr>
<td>

`listener`

</td>
<td>

() => `void`

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

###### Inherited from

```ts
Request.on;
```

###### Call Signature

```ts
on(event, listener): this;
```

Defined in: node_modules/@types/node/stream.d.ts:651

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

`event`

</td>
<td>

`"resume"`

</td>
</tr>
<tr>
<td>

`listener`

</td>
<td>

() => `void`

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

###### Inherited from

```ts
Request.on;
```

###### Call Signature

```ts
on(event, listener): this;
```

Defined in: node_modules/@types/node/stream.d.ts:652

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

`event`

</td>
<td>

`string` \| `symbol`

</td>
</tr>
<tr>
<td>

`listener`

</td>
<td>

(...`args`) => `void`

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

###### Inherited from

```ts
Request.on;
```

##### once()

###### Call Signature

```ts
once(event, listener): this;
```

Defined in: node_modules/@types/node/stream.d.ts:653

Adds a **one-time** `listener` function for the event named `eventName`. The
next time `eventName` is triggered, this listener is removed and then invoked.

```js
server.once("connection", (stream) => {
  console.log("Ah, we have our first user!");
});
```

Returns a reference to the `EventEmitter`, so that calls can be chained.

By default, event listeners are invoked in the order they are added. The `emitter.prependOnceListener()` method can be used as an alternative to add the
event listener to the beginning of the listeners array.

```js
import { EventEmitter } from "node:events";
const myEE = new EventEmitter();
myEE.once("foo", () => console.log("a"));
myEE.prependOnceListener("foo", () => console.log("b"));
myEE.emit("foo");
// Prints:
//   b
//   a
```

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

`event`

</td>
<td>

`"close"`

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`listener`

</td>
<td>

() => `void`

</td>
<td>

The callback function

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

###### Since

v0.3.0

###### Inherited from

```ts
Request.once;
```

###### Call Signature

```ts
once(event, listener): this;
```

Defined in: node_modules/@types/node/stream.d.ts:654

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

`event`

</td>
<td>

`"data"`

</td>
</tr>
<tr>
<td>

`listener`

</td>
<td>

(`chunk`) => `void`

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

###### Inherited from

```ts
Request.once;
```

###### Call Signature

```ts
once(event, listener): this;
```

Defined in: node_modules/@types/node/stream.d.ts:655

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

`event`

</td>
<td>

`"end"`

</td>
</tr>
<tr>
<td>

`listener`

</td>
<td>

() => `void`

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

###### Inherited from

```ts
Request.once;
```

###### Call Signature

```ts
once(event, listener): this;
```

Defined in: node_modules/@types/node/stream.d.ts:656

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

`event`

</td>
<td>

`"error"`

</td>
</tr>
<tr>
<td>

`listener`

</td>
<td>

(`err`) => `void`

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

###### Inherited from

```ts
Request.once;
```

###### Call Signature

```ts
once(event, listener): this;
```

Defined in: node_modules/@types/node/stream.d.ts:657

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

`event`

</td>
<td>

`"pause"`

</td>
</tr>
<tr>
<td>

`listener`

</td>
<td>

() => `void`

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

###### Inherited from

```ts
Request.once;
```

###### Call Signature

```ts
once(event, listener): this;
```

Defined in: node_modules/@types/node/stream.d.ts:658

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

`event`

</td>
<td>

`"readable"`

</td>
</tr>
<tr>
<td>

`listener`

</td>
<td>

() => `void`

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

###### Inherited from

```ts
Request.once;
```

###### Call Signature

```ts
once(event, listener): this;
```

Defined in: node_modules/@types/node/stream.d.ts:659

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

`event`

</td>
<td>

`"resume"`

</td>
</tr>
<tr>
<td>

`listener`

</td>
<td>

() => `void`

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

###### Inherited from

```ts
Request.once;
```

###### Call Signature

```ts
once(event, listener): this;
```

Defined in: node_modules/@types/node/stream.d.ts:660

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

`event`

</td>
<td>

`string` \| `symbol`

</td>
</tr>
<tr>
<td>

`listener`

</td>
<td>

(...`args`) => `void`

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

###### Inherited from

```ts
Request.once;
```

##### pause()

```ts
pause(): this;
```

Defined in: node_modules/@types/node/stream.d.ts:290

The `readable.pause()` method will cause a stream in flowing mode to stop
emitting `'data'` events, switching out of flowing mode. Any data that
becomes available will remain in the internal buffer.

```js
const readable = getReadableStreamSomehow();
readable.on("data", (chunk) => {
  console.log(`Received ${chunk.length} bytes of data.`);
  readable.pause();
  console.log("There will be no additional data for 1 second.");
  setTimeout(() => {
    console.log("Now data will start flowing again.");
    readable.resume();
  }, 1000);
});
```

The `readable.pause()` method has no effect if there is a `'readable'` event listener.

###### Returns

`this`

###### Since

v0.9.4

###### Inherited from

```ts
Request.pause;
```

##### pipe()

```ts
pipe<T>(destination, options?): T;
```

Defined in: node_modules/@types/node/stream.d.ts:29

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

`T` _extends_ `WritableStream`

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

`destination`

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

\{ `end?`: `boolean`; \}

</td>
</tr>
<tr>
<td>

`options.end?`

</td>
<td>

`boolean`

</td>
</tr>
</tbody>
</table>

###### Returns

`T`

###### Inherited from

```ts
Request.pipe;
```

##### prependListener()

###### Call Signature

```ts
prependListener(event, listener): this;
```

Defined in: node_modules/@types/node/stream.d.ts:661

Adds the `listener` function to the _beginning_ of the listeners array for the
event named `eventName`. No checks are made to see if the `listener` has
already been added. Multiple calls passing the same combination of `eventName`
and `listener` will result in the `listener` being added, and called, multiple times.

```js
server.prependListener("connection", (stream) => {
  console.log("someone connected!");
});
```

Returns a reference to the `EventEmitter`, so that calls can be chained.

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

`event`

</td>
<td>

`"close"`

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`listener`

</td>
<td>

() => `void`

</td>
<td>

The callback function

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

###### Since

v6.0.0

###### Inherited from

```ts
Request.prependListener;
```

###### Call Signature

```ts
prependListener(event, listener): this;
```

Defined in: node_modules/@types/node/stream.d.ts:662

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

`event`

</td>
<td>

`"data"`

</td>
</tr>
<tr>
<td>

`listener`

</td>
<td>

(`chunk`) => `void`

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

###### Inherited from

```ts
Request.prependListener;
```

###### Call Signature

```ts
prependListener(event, listener): this;
```

Defined in: node_modules/@types/node/stream.d.ts:663

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

`event`

</td>
<td>

`"end"`

</td>
</tr>
<tr>
<td>

`listener`

</td>
<td>

() => `void`

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

###### Inherited from

```ts
Request.prependListener;
```

###### Call Signature

```ts
prependListener(event, listener): this;
```

Defined in: node_modules/@types/node/stream.d.ts:664

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

`event`

</td>
<td>

`"error"`

</td>
</tr>
<tr>
<td>

`listener`

</td>
<td>

(`err`) => `void`

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

###### Inherited from

```ts
Request.prependListener;
```

###### Call Signature

```ts
prependListener(event, listener): this;
```

Defined in: node_modules/@types/node/stream.d.ts:665

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

`event`

</td>
<td>

`"pause"`

</td>
</tr>
<tr>
<td>

`listener`

</td>
<td>

() => `void`

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

###### Inherited from

```ts
Request.prependListener;
```

###### Call Signature

```ts
prependListener(event, listener): this;
```

Defined in: node_modules/@types/node/stream.d.ts:666

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

`event`

</td>
<td>

`"readable"`

</td>
</tr>
<tr>
<td>

`listener`

</td>
<td>

() => `void`

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

###### Inherited from

```ts
Request.prependListener;
```

###### Call Signature

```ts
prependListener(event, listener): this;
```

Defined in: node_modules/@types/node/stream.d.ts:667

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

`event`

</td>
<td>

`"resume"`

</td>
</tr>
<tr>
<td>

`listener`

</td>
<td>

() => `void`

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

###### Inherited from

```ts
Request.prependListener;
```

###### Call Signature

```ts
prependListener(event, listener): this;
```

Defined in: node_modules/@types/node/stream.d.ts:668

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

`event`

</td>
<td>

`string` \| `symbol`

</td>
</tr>
<tr>
<td>

`listener`

</td>
<td>

(...`args`) => `void`

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

###### Inherited from

```ts
Request.prependListener;
```

##### prependOnceListener()

###### Call Signature

```ts
prependOnceListener(event, listener): this;
```

Defined in: node_modules/@types/node/stream.d.ts:669

Adds a **one-time**`listener` function for the event named `eventName` to the _beginning_ of the listeners array. The next time `eventName` is triggered, this
listener is removed, and then invoked.

```js
server.prependOnceListener("connection", (stream) => {
  console.log("Ah, we have our first user!");
});
```

Returns a reference to the `EventEmitter`, so that calls can be chained.

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

`event`

</td>
<td>

`"close"`

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`listener`

</td>
<td>

() => `void`

</td>
<td>

The callback function

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

###### Since

v6.0.0

###### Inherited from

```ts
Request.prependOnceListener;
```

###### Call Signature

```ts
prependOnceListener(event, listener): this;
```

Defined in: node_modules/@types/node/stream.d.ts:670

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

`event`

</td>
<td>

`"data"`

</td>
</tr>
<tr>
<td>

`listener`

</td>
<td>

(`chunk`) => `void`

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

###### Inherited from

```ts
Request.prependOnceListener;
```

###### Call Signature

```ts
prependOnceListener(event, listener): this;
```

Defined in: node_modules/@types/node/stream.d.ts:671

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

`event`

</td>
<td>

`"end"`

</td>
</tr>
<tr>
<td>

`listener`

</td>
<td>

() => `void`

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

###### Inherited from

```ts
Request.prependOnceListener;
```

###### Call Signature

```ts
prependOnceListener(event, listener): this;
```

Defined in: node_modules/@types/node/stream.d.ts:672

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

`event`

</td>
<td>

`"error"`

</td>
</tr>
<tr>
<td>

`listener`

</td>
<td>

(`err`) => `void`

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

###### Inherited from

```ts
Request.prependOnceListener;
```

###### Call Signature

```ts
prependOnceListener(event, listener): this;
```

Defined in: node_modules/@types/node/stream.d.ts:673

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

`event`

</td>
<td>

`"pause"`

</td>
</tr>
<tr>
<td>

`listener`

</td>
<td>

() => `void`

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

###### Inherited from

```ts
Request.prependOnceListener;
```

###### Call Signature

```ts
prependOnceListener(event, listener): this;
```

Defined in: node_modules/@types/node/stream.d.ts:674

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

`event`

</td>
<td>

`"readable"`

</td>
</tr>
<tr>
<td>

`listener`

</td>
<td>

() => `void`

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

###### Inherited from

```ts
Request.prependOnceListener;
```

###### Call Signature

```ts
prependOnceListener(event, listener): this;
```

Defined in: node_modules/@types/node/stream.d.ts:675

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

`event`

</td>
<td>

`"resume"`

</td>
</tr>
<tr>
<td>

`listener`

</td>
<td>

() => `void`

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

###### Inherited from

```ts
Request.prependOnceListener;
```

###### Call Signature

```ts
prependOnceListener(event, listener): this;
```

Defined in: node_modules/@types/node/stream.d.ts:676

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

`event`

</td>
<td>

`string` \| `symbol`

</td>
</tr>
<tr>
<td>

`listener`

</td>
<td>

(...`args`) => `void`

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

###### Inherited from

```ts
Request.prependOnceListener;
```

##### push()

```ts
push(chunk, encoding?): boolean;
```

Defined in: node_modules/@types/node/stream.d.ts:446

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

`chunk`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`encoding?`

</td>
<td>

`BufferEncoding`

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean`

###### Inherited from

```ts
Request.push;
```

##### range()

```ts
range(size, options?): undefined | Ranges | Result;
```

Defined in: node_modules/@types/express-serve-static-core/index.d.ts:517

Parse Range header field, capping to the given `size`.

Unspecified ranges such as "0-" require knowledge of your resource length. In
the case of a byte range this is of course the total number of bytes.
If the Range header field is not given `undefined` is returned.
If the Range header field is given, return value is a result of range-parser.
See more ./types/range-parser/index.d.ts

NOTE: remember that ranges are inclusive, so for example "Range: users=0-3"
should respond with 4 users when available, not 3.

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

`size`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

`Options`

</td>
</tr>
</tbody>
</table>

###### Returns

`undefined` \| `Ranges` \| `Result`

###### Inherited from

```ts
Request.range;
```

##### rawListeners()

```ts
rawListeners<K>(eventName): Function[];
```

Defined in: node_modules/@types/node/events.d.ts:817

Returns a copy of the array of listeners for the event named `eventName`,
including any wrappers (such as those created by `.once()`).

```js
import { EventEmitter } from "node:events";
const emitter = new EventEmitter();
emitter.once("log", () => console.log("log once"));

// Returns a new Array with a function `onceWrapper` which has a property
// `listener` which contains the original listener bound above
const listeners = emitter.rawListeners("log");
const logFnWrapper = listeners[0];

// Logs "log once" to the console and does not unbind the `once` event
logFnWrapper.listener();

// Logs "log once" to the console and removes the listener
logFnWrapper();

emitter.on("log", () => console.log("log persistently"));
// Will return a new Array with a single function bound by `.on()` above
const newListeners = emitter.rawListeners("log");

// Logs "log persistently" twice
newListeners[0]();
emitter.emit("log");
```

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

`K`

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

`eventName`

</td>
<td>

`string` \| `symbol`

</td>
</tr>
</tbody>
</table>

###### Returns

`Function`[]

###### Since

v9.4.0

###### Inherited from

```ts
Request.rawListeners;
```

##### read()

```ts
read(size?): any;
```

Defined in: node_modules/@types/node/stream.d.ts:243

The `readable.read()` method reads data out of the internal buffer and
returns it. If no data is available to be read, `null` is returned. By default,
the data is returned as a `Buffer` object unless an encoding has been
specified using the `readable.setEncoding()` method or the stream is operating
in object mode.

The optional `size` argument specifies a specific number of bytes to read. If
`size` bytes are not available to be read, `null` will be returned _unless_ the
stream has ended, in which case all of the data remaining in the internal buffer
will be returned.

If the `size` argument is not specified, all of the data contained in the
internal buffer will be returned.

The `size` argument must be less than or equal to 1 GiB.

The `readable.read()` method should only be called on `Readable` streams
operating in paused mode. In flowing mode, `readable.read()` is called
automatically until the internal buffer is fully drained.

```js
const readable = getReadableStreamSomehow();

// 'readable' may be triggered multiple times as data is buffered in
readable.on("readable", () => {
  let chunk;
  console.log("Stream is readable (new data received in buffer)");
  // Use a loop to make sure we read all currently available data
  while (null !== (chunk = readable.read())) {
    console.log(`Read ${chunk.length} bytes of data...`);
  }
});

// 'end' will be triggered once when there is no more data available
readable.on("end", () => {
  console.log("Reached end of stream.");
});
```

Each call to `readable.read()` returns a chunk of data, or `null`. The chunks
are not concatenated. A `while` loop is necessary to consume all data
currently in the buffer. When reading a large file `.read()` may return `null`,
having consumed all buffered content so far, but there is still more data to
come not yet buffered. In this case a new `'readable'` event will be emitted
when there is more data in the buffer. Finally the `'end'` event will be
emitted when there is no more data to come.

Therefore to read a file's whole contents from a `readable`, it is necessary
to collect chunks across multiple `'readable'` events:

```js
const chunks = [];

readable.on("readable", () => {
  let chunk;
  while (null !== (chunk = readable.read())) {
    chunks.push(chunk);
  }
});

readable.on("end", () => {
  const content = chunks.join("");
});
```

A `Readable` stream in object mode will always return a single item from
a call to `readable.read(size)`, regardless of the value of the `size` argument.

If the `readable.read()` method returns a chunk of data, a `'data'` event will
also be emitted.

Calling [read](#read) after the `'end'` event has
been emitted will return `null`. No runtime error will be raised.

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

`size?`

</td>
<td>

`number`

</td>
<td>

Optional argument to specify how much data to read.

</td>
</tr>
</tbody>
</table>

###### Returns

`any`

###### Since

v0.9.4

###### Inherited from

```ts
Request.read;
```

##### reduce()

###### Call Signature

```ts
reduce<T>(
   fn,
   initial?,
options?): Promise<T>;
```

Defined in: node_modules/@types/node/stream.d.ts:595

This method calls _fn_ on each chunk of the stream in order, passing it the result from the calculation
on the previous element. It returns a promise for the final value of the reduction.

If no _initial_ value is supplied the first chunk of the stream is used as the initial value.
If the stream is empty, the promise is rejected with a `TypeError` with the `ERR_INVALID_ARGS` code property.

The reducer function iterates the stream element-by-element which means that there is no _concurrency_ parameter
or parallelism. To perform a reduce concurrently, you can extract the async function to `readable.map` method.

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
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`fn`

</td>
<td>

(`previous`, `data`, `options?`) => `T`

</td>
<td>

a reducer function to call over every chunk in the stream. Async or not.

</td>
</tr>
<tr>
<td>

`initial?`

</td>
<td>

`undefined`

</td>
<td>

the initial value to use in the reduction.

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

`Pick`\<`ArrayOptions`, `"signal"`\>

</td>
<td>

&hyphen;

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`T`\>

a promise for the final value of the reduction.

###### Since

v17.5.0

###### Inherited from

```ts
Request.reduce;
```

###### Call Signature

```ts
reduce<T>(
   fn,
   initial,
options?): Promise<T>;
```

Defined in: node_modules/@types/node/stream.d.ts:600

This method calls _fn_ on each chunk of the stream in order, passing it the result from the calculation
on the previous element. It returns a promise for the final value of the reduction.

If no _initial_ value is supplied the first chunk of the stream is used as the initial value.
If the stream is empty, the promise is rejected with a `TypeError` with the `ERR_INVALID_ARGS` code property.

The reducer function iterates the stream element-by-element which means that there is no _concurrency_ parameter
or parallelism. To perform a reduce concurrently, you can extract the async function to `readable.map` method.

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
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`fn`

</td>
<td>

(`previous`, `data`, `options?`) => `T`

</td>
<td>

a reducer function to call over every chunk in the stream. Async or not.

</td>
</tr>
<tr>
<td>

`initial`

</td>
<td>

`T`

</td>
<td>

the initial value to use in the reduction.

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

`Pick`\<`ArrayOptions`, `"signal"`\>

</td>
<td>

&hyphen;

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`T`\>

a promise for the final value of the reduction.

###### Since

v17.5.0

###### Inherited from

```ts
Request.reduce;
```

##### removeAllListeners()

```ts
removeAllListeners(eventName?): this;
```

Defined in: node_modules/@types/node/events.d.ts:757

Removes all listeners, or those of the specified `eventName`.

It is bad practice to remove listeners added elsewhere in the code,
particularly when the `EventEmitter` instance was created by some other
component or module (e.g. sockets or file streams).

Returns a reference to the `EventEmitter`, so that calls can be chained.

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

`eventName?`

</td>
<td>

`string` \| `symbol`

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

###### Since

v0.1.26

###### Inherited from

```ts
Request.removeAllListeners;
```

##### removeListener()

###### Call Signature

```ts
removeListener(event, listener): this;
```

Defined in: node_modules/@types/node/stream.d.ts:677

Removes the specified `listener` from the listener array for the event named `eventName`.

```js
const callback = (stream) => {
  console.log("someone connected!");
};
server.on("connection", callback);
// ...
server.removeListener("connection", callback);
```

`removeListener()` will remove, at most, one instance of a listener from the
listener array. If any single listener has been added multiple times to the
listener array for the specified `eventName`, then `removeListener()` must be
called multiple times to remove each instance.

Once an event is emitted, all listeners attached to it at the
time of emitting are called in order. This implies that any `removeListener()` or `removeAllListeners()` calls _after_ emitting and _before_ the last listener finishes execution
will not remove them from`emit()` in progress. Subsequent events behave as expected.

```js
import { EventEmitter } from "node:events";
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();

const callbackA = () => {
  console.log("A");
  myEmitter.removeListener("event", callbackB);
};

const callbackB = () => {
  console.log("B");
};

myEmitter.on("event", callbackA);

myEmitter.on("event", callbackB);

// callbackA removes listener callbackB but it will still be called.
// Internal listener array at time of emit [callbackA, callbackB]
myEmitter.emit("event");
// Prints:
//   A
//   B

// callbackB is now removed.
// Internal listener array [callbackA]
myEmitter.emit("event");
// Prints:
//   A
```

Because listeners are managed using an internal array, calling this will
change the position indices of any listener registered _after_ the listener
being removed. This will not impact the order in which listeners are called,
but it means that any copies of the listener array as returned by
the `emitter.listeners()` method will need to be recreated.

When a single function has been added as a handler multiple times for a single
event (as in the example below), `removeListener()` will remove the most
recently added instance. In the example the `once('ping')` listener is removed:

```js
import { EventEmitter } from "node:events";
const ee = new EventEmitter();

function pong() {
  console.log("pong");
}

ee.on("ping", pong);
ee.once("ping", pong);
ee.removeListener("ping", pong);

ee.emit("ping");
ee.emit("ping");
```

Returns a reference to the `EventEmitter`, so that calls can be chained.

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

`event`

</td>
<td>

`"close"`

</td>
</tr>
<tr>
<td>

`listener`

</td>
<td>

() => `void`

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

###### Since

v0.1.26

###### Inherited from

```ts
Request.removeListener;
```

###### Call Signature

```ts
removeListener(event, listener): this;
```

Defined in: node_modules/@types/node/stream.d.ts:678

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

`event`

</td>
<td>

`"data"`

</td>
</tr>
<tr>
<td>

`listener`

</td>
<td>

(`chunk`) => `void`

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

###### Inherited from

```ts
Request.removeListener;
```

###### Call Signature

```ts
removeListener(event, listener): this;
```

Defined in: node_modules/@types/node/stream.d.ts:679

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

`event`

</td>
<td>

`"end"`

</td>
</tr>
<tr>
<td>

`listener`

</td>
<td>

() => `void`

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

###### Inherited from

```ts
Request.removeListener;
```

###### Call Signature

```ts
removeListener(event, listener): this;
```

Defined in: node_modules/@types/node/stream.d.ts:680

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

`event`

</td>
<td>

`"error"`

</td>
</tr>
<tr>
<td>

`listener`

</td>
<td>

(`err`) => `void`

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

###### Inherited from

```ts
Request.removeListener;
```

###### Call Signature

```ts
removeListener(event, listener): this;
```

Defined in: node_modules/@types/node/stream.d.ts:681

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

`event`

</td>
<td>

`"pause"`

</td>
</tr>
<tr>
<td>

`listener`

</td>
<td>

() => `void`

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

###### Inherited from

```ts
Request.removeListener;
```

###### Call Signature

```ts
removeListener(event, listener): this;
```

Defined in: node_modules/@types/node/stream.d.ts:682

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

`event`

</td>
<td>

`"readable"`

</td>
</tr>
<tr>
<td>

`listener`

</td>
<td>

() => `void`

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

###### Inherited from

```ts
Request.removeListener;
```

###### Call Signature

```ts
removeListener(event, listener): this;
```

Defined in: node_modules/@types/node/stream.d.ts:683

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

`event`

</td>
<td>

`"resume"`

</td>
</tr>
<tr>
<td>

`listener`

</td>
<td>

() => `void`

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

###### Inherited from

```ts
Request.removeListener;
```

###### Call Signature

```ts
removeListener(event, listener): this;
```

Defined in: node_modules/@types/node/stream.d.ts:684

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

`event`

</td>
<td>

`string` \| `symbol`

</td>
</tr>
<tr>
<td>

`listener`

</td>
<td>

(...`args`) => `void`

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

###### Inherited from

```ts
Request.removeListener;
```

##### resume()

```ts
resume(): this;
```

Defined in: node_modules/@types/node/stream.d.ts:309

The `readable.resume()` method causes an explicitly paused `Readable` stream to
resume emitting `'data'` events, switching the stream into flowing mode.

The `readable.resume()` method can be used to fully consume the data from a
stream without actually processing any of that data:

```js
getReadableStreamSomehow()
  .resume()
  .on("end", () => {
    console.log("Reached the end, but did not read anything.");
  });
```

The `readable.resume()` method has no effect if there is a `'readable'` event listener.

###### Returns

`this`

###### Since

v0.9.4

###### Inherited from

```ts
Request.resume;
```

##### setEncoding()

```ts
setEncoding(encoding): this;
```

Defined in: node_modules/@types/node/stream.d.ts:268

The `readable.setEncoding()` method sets the character encoding for
data read from the `Readable` stream.

By default, no encoding is assigned and stream data will be returned as `Buffer` objects. Setting an encoding causes the stream data
to be returned as strings of the specified encoding rather than as `Buffer` objects. For instance, calling `readable.setEncoding('utf8')` will cause the
output data to be interpreted as UTF-8 data, and passed as strings. Calling `readable.setEncoding('hex')` will cause the data to be encoded in hexadecimal
string format.

The `Readable` stream will properly handle multi-byte characters delivered
through the stream that would otherwise become improperly decoded if simply
pulled from the stream as `Buffer` objects.

```js
const readable = getReadableStreamSomehow();
readable.setEncoding("utf8");
readable.on("data", (chunk) => {
  assert.equal(typeof chunk, "string");
  console.log("Got %d characters of string data:", chunk.length);
});
```

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

`encoding`

</td>
<td>

`BufferEncoding`

</td>
<td>

The encoding to use.

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

###### Since

v0.9.4

###### Inherited from

```ts
Request.setEncoding;
```

##### setMaxListeners()

```ts
setMaxListeners(n): this;
```

Defined in: node_modules/@types/node/events.d.ts:767

By default `EventEmitter`s will print a warning if more than `10` listeners are
added for a particular event. This is a useful default that helps finding
memory leaks. The `emitter.setMaxListeners()` method allows the limit to be
modified for this specific `EventEmitter` instance. The value can be set to `Infinity` (or `0`) to indicate an unlimited number of listeners.

Returns a reference to the `EventEmitter`, so that calls can be chained.

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

`n`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

###### Since

v0.3.5

###### Inherited from

```ts
Request.setMaxListeners;
```

##### setTimeout()

```ts
setTimeout(msecs, callback?): this;
```

Defined in: node_modules/@types/node/http.d.ts:1350

Calls `message.socket.setTimeout(msecs, callback)`.

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

`msecs`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`callback?`

</td>
<td>

() => `void`

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

###### Since

v0.5.9

###### Inherited from

```ts
Request.setTimeout;
```

##### some()

```ts
some(fn, options?): Promise<boolean>;
```

Defined in: node_modules/@types/node/stream.d.ts:514

This method is similar to `Array.prototype.some` and calls _fn_ on each chunk in the stream
until the awaited return value is `true` (or any truthy value). Once an _fn_ call on a chunk
`await`ed return value is truthy, the stream is destroyed and the promise is fulfilled with `true`.
If none of the _fn_ calls on the chunks return a truthy value, the promise is fulfilled with `false`.

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

(`data`, `options?`) => `boolean` \| `Promise`\<`boolean`\>

</td>
<td>

a function to call on each chunk of the stream. Async or not.

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

`ArrayOptions`

</td>
<td>

&hyphen;

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`boolean`\>

a promise evaluating to `true` if _fn_ returned a truthy value for at least one of the chunks.

###### Since

v17.5.0

###### Inherited from

```ts
Request.some;
```

##### take()

```ts
take(limit, options?): Readable;
```

Defined in: node_modules/@types/node/stream.d.ts:573

This method returns a new stream with the first _limit_ chunks.

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

`limit`

</td>
<td>

`number`

</td>
<td>

the number of chunks to take from the readable.

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

`Pick`\<`ArrayOptions`, `"signal"`\>

</td>
<td>

&hyphen;

</td>
</tr>
</tbody>
</table>

###### Returns

`Readable`

a stream with _limit_ chunks taken.

###### Since

v17.5.0

###### Inherited from

```ts
Request.take;
```

##### toArray()

```ts
toArray(options?): Promise<any[]>;
```

Defined in: node_modules/@types/node/stream.d.ts:504

This method allows easily obtaining the contents of a stream.

As this method reads the entire stream into memory, it negates the benefits of streams. It's intended
for interoperability and convenience, not as the primary way to consume streams.

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

`Pick`\<`ArrayOptions`, `"signal"`\>

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`any`[]\>

a promise containing an array with the contents of the stream.

###### Since

v17.5.0

###### Inherited from

```ts
Request.toArray;
```

##### unpipe()

```ts
unpipe(destination?): this;
```

Defined in: node_modules/@types/node/stream.d.ts:353

The `readable.unpipe()` method detaches a `Writable` stream previously attached
using the [pipe](#pipe) method.

If the `destination` is not specified, then _all_ pipes are detached.

If the `destination` is specified, but no pipe is set up for it, then
the method does nothing.

```js
import fs from "node:fs";
const readable = getReadableStreamSomehow();
const writable = fs.createWriteStream("file.txt");
// All the data from readable goes into 'file.txt',
// but only for the first second.
readable.pipe(writable);
setTimeout(() => {
  console.log("Stop writing to file.txt.");
  readable.unpipe(writable);
  console.log("Manually close the file stream.");
  writable.end();
}, 1000);
```

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

`destination?`

</td>
<td>

`WritableStream`

</td>
<td>

Optional specific stream to unpipe

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

###### Since

v0.9.4

###### Inherited from

```ts
Request.unpipe;
```

##### unshift()

```ts
unshift(chunk, encoding?): void;
```

Defined in: node_modules/@types/node/stream.d.ts:419

Passing `chunk` as `null` signals the end of the stream (EOF) and behaves the
same as `readable.push(null)`, after which no more data can be written. The EOF
signal is put at the end of the buffer and any buffered data will still be
flushed.

The `readable.unshift()` method pushes a chunk of data back into the internal
buffer. This is useful in certain situations where a stream is being consumed by
code that needs to "un-consume" some amount of data that it has optimistically
pulled out of the source, so that the data can be passed on to some other party.

The `stream.unshift(chunk)` method cannot be called after the `'end'` event
has been emitted or a runtime error will be thrown.

Developers using `stream.unshift()` often should consider switching to
use of a `Transform` stream instead. See the `API for stream implementers` section for more information.

```js
// Pull off a header delimited by \n\n.
// Use unshift() if we get too much.
// Call the callback with (error, header, stream).
import { StringDecoder } from "node:string_decoder";
function parseHeader(stream, callback) {
  stream.on("error", callback);
  stream.on("readable", onReadable);
  const decoder = new StringDecoder("utf8");
  let header = "";
  function onReadable() {
    let chunk;
    while (null !== (chunk = stream.read())) {
      const str = decoder.write(chunk);
      if (str.includes("\n\n")) {
        // Found the header boundary.
        const split = str.split(/\n\n/);
        header += split.shift();
        const remaining = split.join("\n\n");
        const buf = Buffer.from(remaining, "utf8");
        stream.removeListener("error", callback);
        // Remove the 'readable' listener before unshifting.
        stream.removeListener("readable", onReadable);
        if (buf.length) stream.unshift(buf);
        // Now the body of the message can be read from the stream.
        callback(null, header, stream);
        return;
      }
      // Still reading the header.
      header += str;
    }
  }
}
```

Unlike [push](#push), `stream.unshift(chunk)` will not
end the reading process by resetting the internal reading state of the stream.
This can cause unexpected results if `readable.unshift()` is called during a
read (i.e. from within a [\_read](#_read) implementation on a
custom stream). Following the call to `readable.unshift()` with an immediate [push](#push) will reset the reading state appropriately,
however it is best to simply avoid calling `readable.unshift()` while in the
process of performing a read.

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

`chunk`

</td>
<td>

`any`

</td>
<td>

Chunk of data to unshift onto the read queue. For streams not operating in object mode, `chunk` must
be a {string}, {Buffer}, {TypedArray}, {DataView} or `null`. For object mode streams, `chunk` may be any JavaScript value.

</td>
</tr>
<tr>
<td>

`encoding?`

</td>
<td>

`BufferEncoding`

</td>
<td>

Encoding of string chunks. Must be a valid `Buffer` encoding, such as `'utf8'` or `'ascii'`.

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### Since

v0.9.11

###### Inherited from

```ts
Request.unshift;
```

##### wrap()

```ts
wrap(stream): this;
```

Defined in: node_modules/@types/node/stream.d.ts:445

Prior to Node.js 0.10, streams did not implement the entire `node:stream` module API as it is currently defined. (See `Compatibility` for more
information.)

When using an older Node.js library that emits `'data'` events and has a [pause](#pause) method that is advisory only, the `readable.wrap()` method can be used to create a `Readable`
stream that uses
the old stream as its data source.

It will rarely be necessary to use `readable.wrap()` but the method has been
provided as a convenience for interacting with older Node.js applications and
libraries.

```js
import { OldReader } from "./old-api-module.js";
import { Readable } from "node:stream";
const oreader = new OldReader();
const myReader = new Readable().wrap(oreader);

myReader.on("readable", () => {
  myReader.read(); // etc.
});
```

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

`stream`

</td>
<td>

`ReadableStream`

</td>
<td>

An "old style" readable stream

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

###### Since

v0.9.4

###### Inherited from

```ts
Request.wrap;
```

## Type Aliases

### RedisOptions

```ts
type RedisOptions = RedisOptionsWithUrl | RedisOptionsWithHost;
```

Defined in: [libs/nest-core/src/lib/interfaces/redis-options.interface.ts:18](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-core/src/lib/interfaces/redis-options.interface.ts#L18)

## Variables

### CACHE_OPTIONS

```ts
const CACHE_OPTIONS: "cache_options" = "cache_options";
```

Defined in: [libs/nest-core/src/lib/tokens.ts:3](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-core/src/lib/tokens.ts#L3)

---

### DEFAULT_PORT

```ts
const DEFAULT_PORT: 8080 = 8080;
```

Defined in: [libs/nest-core/src/lib/constants.ts:1](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-core/src/lib/constants.ts#L1)

---

### IS_RANDOM_HEX_TOKEN

```ts
const IS_RANDOM_HEX_TOKEN: "IsRandomHexToken" = "IsRandomHexToken";
```

Defined in: [libs/nest-core/src/lib/validators/random-hex.validator.ts:4](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-core/src/lib/validators/random-hex.validator.ts#L4)

---

### IS_VERIFY_TOKEN

```ts
const IS_VERIFY_TOKEN: "isVerifyToken" = "isVerifyToken";
```

Defined in: [libs/nest-core/src/lib/validators/verify-token.validator.ts:4](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-core/src/lib/validators/verify-token.validator.ts#L4)

---

### LOG_FILE_NAME

```ts
const LOG_FILE_NAME: "errors.json" = "errors.json";
```

Defined in: [libs/nest-core/src/lib/services/logger.service.ts:8](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-core/src/lib/services/logger.service.ts#L8)

---

### SUBDOMAIN_KEY

```ts
const SUBDOMAIN_KEY: "subdomain" = "subdomain";
```

Defined in: [libs/nest-core/src/lib/tokens.ts:5](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-core/src/lib/tokens.ts#L5)

## Functions

### BooleanTransformer()

```ts
function BooleanTransformer(params): undefined | boolean;
```

Defined in: [libs/nest-core/src/lib/transformers/boolean.transformer.ts:51](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-core/src/lib/transformers/boolean.transformer.ts#L51)

Boolean transformer

A transformer to use in DTOs as a `TransformFn` for the `Transform` property decorator from the `class-transformer` package.

This transformer converts the property value to a `boolean` if it is the string `"true"` or `"false"`.
Otherwise, it returns `undefined`.

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

`params`

</td>
<td>

`TransformFnParams`

</td>
<td>

Parameters passed to the transformer

</td>
</tr>
</tbody>
</table>

#### Returns

`undefined` \| `boolean`

- Transformed `boolean` value or `undefined`

#### Example

```TypeScript
export class DTO {
   @Transform(BooleanTransformer)
   isActive: boolean | undefined;
}
```

---

### BooleanTransformerWithDefault()

```ts
function BooleanTransformerWithDefault(
  defaultValue,
): (params) => undefined | boolean;
```

Defined in: [libs/nest-core/src/lib/transformers/boolean.transformer.ts:24](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-core/src/lib/transformers/boolean.transformer.ts#L24)

Boolean transformer with default value

A transformer to use in DTOs as a `TransformFn` for the `Transform` property decorator from the `class-transformer` package.

This transformer converts the property value to a `boolean` if it is the string `"true"` or `"false"`.
Otherwise, it returns the default value passed to the transformer.

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

`defaultValue`

</td>
<td>

`undefined` \| `boolean`

</td>
<td>

Default value to return if the property value is not `"true"` or `"false"`

</td>
</tr>
</tbody>
</table>

#### Returns

Transformer function with default value added

```ts
(params): undefined | boolean;
```

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

`params`

</td>
<td>

`TransformFnParams`

</td>
</tr>
</tbody>
</table>

##### Returns

`undefined` \| `boolean`

#### Example

```TypeScript
export class DTO {
   @Transform(BooleanTransformerWithDefault(false))
   isActive: boolean;
}
```

---

### DateTransformer()

```ts
function DateTransformer(params): undefined | Date;
```

Defined in: [libs/nest-core/src/lib/transformers/date.transformer.ts:23](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-core/src/lib/transformers/date.transformer.ts#L23)

Date transformer

A transformer to use in DTOs as a `TransformFn` for the `Transform` property decorator from the `class-transformer` package.

This transformer converts the property value to a JavaScript `Date` object if the value is a valid date string

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

`params`

</td>
<td>

`TransformFnParams`

</td>
<td>

Parameters passed to the transformer

</td>
</tr>
</tbody>
</table>

#### Returns

`undefined` \| `Date`

- Transformed `Date` value or `undefined`

#### Example

```TypeScript
export class DTO {
   @Transform(DateTransformer)
   birthday: Date;
}
```

---

### Dto()

```ts
function Dto(name?): ClassDecorator;
```

Defined in: [libs/nest-core/src/lib/decorators/dto.decorator.ts:10](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-core/src/lib/decorators/dto.decorator.ts#L10)

Dto decorator

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

`name?`

</td>
<td>

`string`

</td>
<td>

The name of the DTO

</td>
</tr>
</tbody>
</table>

#### Returns

`ClassDecorator`

---

### extractSubdomain()

```ts
function extractSubdomain(
  splitDomain,
  origin?,
  ifLocalhost?,
): undefined | string;
```

Defined in: [libs/nest-core/src/lib/utils/utils.ts:41](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-core/src/lib/utils/utils.ts#L41)

Extract subdomain from the origin

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

`splitDomain`

</td>
<td>

`string`

</td>
<td>

Domain to split the url to get the subdomain

</td>
</tr>
<tr>
<td>

`origin?`

</td>
<td>

`string`

</td>
<td>

Origin to extract the subdomain from

</td>
</tr>
<tr>
<td>

`ifLocalhost?`

</td>
<td>

`string`

</td>
<td>

String to return as subdomain if the domain is localhost

</td>
</tr>
</tbody>
</table>

#### Returns

`undefined` \| `string`

the extracted subdomain or provided string if the domain is localhost, otherwise returns `undefined`

#### Examples

```TypeScript
extractSubdomain("example.com", "admin.example.com", "local")

// Returns "admin"
```

```TypeScript
extractSubdomain("example.com", "localhost:3000", "local")

// Returns "local"
```

---

### FileFormFieldTransformer()

```ts
function FileFormFieldTransformer(params): undefined | null;
```

Defined in: [libs/nest-core/src/lib/transformers/file-form-field.transformer.ts:23](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-core/src/lib/transformers/file-form-field.transformer.ts#L23)

File form field Transformer

A transformer to use in DTOs as a `TransformFn` for the `Transform` property decorator from the `class-transformer` package.

This transformer is used to transform a file form field value to `null` if the value is an empty string or `"null"`.

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

`params`

</td>
<td>

`TransformFnParams`

</td>
<td>

Parameters passed to the transformer

</td>
</tr>
</tbody>
</table>

#### Returns

`undefined` \| `null`

`null` if the value is an empty string or `"null"`, otherwise returns `undefined`

#### Example

```TypeScript
export class DTO {
   @Transform(FileFormFieldTransformer)
   image: null | undefined;
}
```

---

### FileOrTextFormFieldTransformer()

```ts
function FileOrTextFormFieldTransformer(params): null | string;
```

Defined in: [libs/nest-core/src/lib/transformers/file-or-text-form-field.transformer.ts:23](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-core/src/lib/transformers/file-or-text-form-field.transformer.ts#L23)

File or text form field transformer

A transformer to use in DTOs as a `TransformFn` for the `Transform` property decorator from the `class-transformer` package.

This transformer is used to transform a file or text form field value to a `string` or `null`.

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

`params`

</td>
<td>

`TransformFnParams`

</td>
<td>

Parameters passed to the transformer

</td>
</tr>
</tbody>
</table>

#### Returns

`null` \| `string`

`null` if the value is not a string or an empty string, otherwise returns the `string` value

#### Example

```TypeScript
export class DTO {
   @Transform(FileOrTextFormFieldTransformer)
   image: string | null;
}
```

---

### generateValidationErrorResponse()

```ts
function generateValidationErrorResponse(error): ErrorResponse;
```

Defined in: [libs/nest-core/src/lib/utils/validation.utils.ts:84](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-core/src/lib/utils/validation.utils.ts#L84)

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

`error`

</td>
<td>

`ValidationError`

</td>
</tr>
</tbody>
</table>

#### Returns

`ErrorResponse`

---

### getGlobal()

```ts
function getGlobal(): any;
```

Defined in: [libs/nest-core/src/lib/utils/get-global.ts:3](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-core/src/lib/utils/get-global.ts#L3)

#### Returns

`any`

---

### hichchiBootstrap()

#### Call Signature

```ts
function hichchiBootstrap(app, configuration): Promise<void>;
```

Defined in: [libs/nest-core/src/lib/bootstrap/app-bootstrapper.ts:30](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-core/src/lib/bootstrap/app-bootstrapper.ts#L30)

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

`app`

</td>
<td>

`NestApplication`

</td>
</tr>
<tr>
<td>

`configuration`

</td>
<td>

`AppConfiguration`

</td>
</tr>
</tbody>
</table>

##### Returns

`Promise`\<`void`\>

#### Call Signature

```ts
function hichchiBootstrap(module, configuration): Promise<void>;
```

Defined in: [libs/nest-core/src/lib/bootstrap/app-bootstrapper.ts:31](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-core/src/lib/bootstrap/app-bootstrapper.ts#L31)

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

`module`

</td>
<td>

`IEntryNestModule`

</td>
</tr>
<tr>
<td>

`configuration`

</td>
<td>

`AppConfiguration`

</td>
</tr>
</tbody>
</table>

##### Returns

`Promise`\<`void`\>

---

### hichchiMetadata()

```ts
function hichchiMetadata(): HichchiMetadata;
```

Defined in: [libs/nest-core/src/lib/metadata/metadata-storage.ts:88](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-core/src/lib/metadata/metadata-storage.ts#L88)

#### Returns

[`HichchiMetadata`](#hichchimetadata)

---

### httpExceptionFilter()

```ts
function httpExceptionFilter(exception, _request, logUnknown?): HttpException;
```

Defined in: [libs/nest-core/src/lib/utils/exception.utils.ts:14](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-core/src/lib/utils/exception.utils.ts#L14)

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

`exception`

</td>
<td>

`unknown`

</td>
</tr>
<tr>
<td>

`_request`

</td>
<td>

`Request`

</td>
</tr>
<tr>
<td>

`logUnknown?`

</td>
<td>

`boolean`

</td>
</tr>
</tbody>
</table>

#### Returns

`HttpException`

---

### isOriginAllowed()

```ts
function isOriginAllowed(origin, allowedOrigins): boolean;
```

Defined in: [libs/nest-core/src/lib/utils/utils.ts:9](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-core/src/lib/utils/utils.ts#L9)

Check if the provided origin is allowed by checking against the allowed origins

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

`origin`

</td>
<td>

`string`

</td>
<td>

Origin to check

</td>
</tr>
<tr>
<td>

`allowedOrigins`

</td>
<td>

`string`[]

</td>
<td>

Array of allowed origins

</td>
</tr>
</tbody>
</table>

#### Returns

`boolean`

`true` if the origin is allowed otherwise `false`

---

### isRandomHexToken()

```ts
function isRandomHexToken(value, lengthInBytes): boolean;
```

Defined in: [libs/nest-core/src/lib/validators/random-hex.validator.ts:6](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-core/src/lib/validators/random-hex.validator.ts#L6)

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

`value`

</td>
<td>

`unknown`

</td>
</tr>
<tr>
<td>

`lengthInBytes`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

#### Returns

`boolean`

---

### IsRandomHexToken()

```ts
function IsRandomHexToken(
  lengthInBytes,
  validationOptions?,
): (object, propertyName) => void;
```

Defined in: [libs/nest-core/src/lib/validators/random-hex.validator.ts:12](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-core/src/lib/validators/random-hex.validator.ts#L12)

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

`lengthInBytes`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`validationOptions?`

</td>
<td>

`ValidationOptions`

</td>
</tr>
</tbody>
</table>

#### Returns

```ts
(object, propertyName): void;
```

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

`object`

</td>
<td>

`object`

</td>
</tr>
<tr>
<td>

`propertyName`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

##### Returns

`void`

---

### IsVerifyToken()

```ts
function IsVerifyToken(validationOptions?): (object, propertyName) => void;
```

Defined in: [libs/nest-core/src/lib/validators/verify-token.validator.ts:7](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-core/src/lib/validators/verify-token.validator.ts#L7)

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

`validationOptions?`

</td>
<td>

`ValidationOptions`

</td>
</tr>
</tbody>
</table>

#### Returns

```ts
(object, propertyName): void;
```

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

`object`

</td>
<td>

`object`

</td>
</tr>
<tr>
<td>

`propertyName`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

##### Returns

`void`

---

### MultiValueFormFieldTransformer()

```ts
function MultiValueFormFieldTransformer(params): string[];
```

Defined in: [libs/nest-core/src/lib/transformers/multi-value-form-field.transformer.ts:25](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-core/src/lib/transformers/multi-value-form-field.transformer.ts#L25)

Multi value form field transformer

A transformer to use in DTOs as a `TransformFn` for the `Transform` property decorator from the `class-transformer` package.

This transformer will transform a multi-value form field into an array of values or a single value into an array
with that value.This is useful when you have a form field that can accept multiple values, like a multi-select
field, and you want to ensure that the value is always an array even if there is only one value.

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

`params`

</td>
<td>

`TransformFnParams`

</td>
<td>

Parameters passed to the transformer

</td>
</tr>
</tbody>
</table>

#### Returns

`string`[]

- An array of values

#### Example

```TypeScript
export class DTO {
   @Transform(MultiValueFormFieldTransformer)
   userIds: EntityId[];
}
```

---

### SubdomainMiddleware()

```ts
function SubdomainMiddleware(splitDomain, ifLocalhost?): Type;
```

Defined in: [libs/nest-core/src/lib/middlewares/subdomain.middleware.ts:42](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-core/src/lib/middlewares/subdomain.middleware.ts#L42)

Subdomain Middleware

This middleware is used to extract the subdomain from the request origin and attach it to the request object as subdomain

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

`splitDomain`

</td>
<td>

`string`

</td>
<td>

Domain to split the url to get the subdomain

</td>
</tr>
<tr>
<td>

`ifLocalhost?`

</td>
<td>

`string`

</td>
<td>

String to return as subdomain if the domain is localhost

</td>
</tr>
</tbody>
</table>

#### Returns

`Type`

- Middleware

#### Examples

```TypeScript
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer): any {
        consumer.apply(SubdomainMiddleware("example.com", "admin")).forRoutes("*");
    }
}

```

```TypeScript
// if the domain is admin.example.com
SubdomainMiddleware("example.com", "local")

// Attaches "admin"
```

```TypeScript
// if the domain is localhost or localhost:3000
SubdomainMiddleware("example.com", "local")

// Attaches "local"
```

---

### throwValidationErrors()

```ts
function throwValidationErrors(errors): never;
```

Defined in: [libs/nest-core/src/lib/utils/validation.utils.ts:33](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-core/src/lib/utils/validation.utils.ts#L33)

Throw a bad request exception with the given error messages or first error message in the array

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

`errors`

</td>
<td>

`ValidationError`[]

</td>
<td>

Error messages or array of error messages

</td>
</tr>
</tbody>
</table>

#### Returns

`never`

---

### toErrorObject()

```ts
function toErrorObject(str): ErrorResponse;
```

Defined in: [libs/nest-core/src/lib/converters/error-message.converter.ts:75](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-core/src/lib/converters/error-message.converter.ts#L75)

Convert error string to error object

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

JSON string

</td>
</tr>
</tbody>
</table>

#### Returns

`ErrorResponse`

Parsed object

#### Examples

```TypeScript
toErrorObject('{"message":"User exists!"}');

// Returns:
{
    statusCode: 500,
    code: "ERROR_500",
    message: "User exists"
}
```

```TypeScript
toErrorObject('{ "status": "409", "code": "USER_409_EXIST_EMAIL", "message": "User with email exists!" }');

// Returns:
{
    statusCode: 409,
    code: "USER_409_EXIST_EMAIL",
    message: "User with email exists!"
}
```

```TypeScript
toErrorObject('User with email exists!');

// Returns:
{
    statusCode: 500,
    code: "ERROR_500",
    message: "Internal Server Error!"
}
```

---

### toErrString()

```ts
function toErrString(errObj): object;
```

Defined in: [libs/nest-core/src/lib/converters/error-message.converter.ts:27](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-core/src/lib/converters/error-message.converter.ts#L27)

Convert the error object to a JSON string and return as the message

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

`errObj`

</td>
<td>

`ErrorResponse`

</td>
<td>

Error object

</td>
</tr>
</tbody>
</table>

#### Returns

`object`

Error message

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

`message`

</td>
<td>

`string`

</td>
<td>

[libs/nest-core/src/lib/converters/error-message.converter.ts:27](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-core/src/lib/converters/error-message.converter.ts#L27)

</td>
</tr>
</tbody>
</table>

#### Example

```TypeScript
toString({
    statusCode: 409,
    code: "USER_409_EXIST_EMAIL",
    message: "User exists!"
});

// Returns:
{
    message: '{"status":409,"code":"USER_409_EXIST_EMAIL","message":"User exists!"}'
}
```

---

### toJSON()

```ts
function toJSON<T>(string): T;
```

Defined in: [libs/nest-core/src/lib/converters/json.converter.ts:20](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-core/src/lib/converters/json.converter.ts#L20)

Convert JSON string to object

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

`string`

</td>
<td>

`string`

</td>
<td>

JSON string to convert

</td>
</tr>
</tbody>
</table>

#### Returns

`T`

parsed object or empty object

---

### toString()

```ts
function toString(object): string;
```

Defined in: [libs/nest-core/src/lib/converters/json.converter.ts:7](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-core/src/lib/converters/json.converter.ts#L7)

Convert object to JSON string

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

`object`

</td>
<td>

`unknown`

</td>
<td>

object to convert

</td>
</tr>
</tbody>
</table>

#### Returns

`string`

JSON string

---

### UseTransformInterceptor()

```ts
function UseTransformInterceptor(dto): MethodDecorator;
```

Defined in: [libs/nest-core/src/lib/decorators/use-transform-interceptor.decorator.ts:37](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-core/src/lib/decorators/use-transform-interceptor.decorator.ts#L37)

Method decorator that wraps the NestJS `UseInterceptors` decorator and applies the `TransformInterceptor` to the specified DTO.

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

`dto`

</td>
<td>

[`IViewDto`](#iviewdto)

</td>
<td>

The View DTO to transform the response to

</td>
</tr>
</tbody>
</table>

#### Returns

`MethodDecorator`

The method decorator

#### Example

```TypeScript
@Controller("user")
export class UserController {
    @Get()
    @UseTransformInterceptor(new ViewUserDto())
    async getUsers(): Promise<User[]> {
        // Implementation
    }
}

// Use above instead of using the following

@Controller("user")
export class UserController {
    @Get()
    @UseInterceptors(new TransformInterceptor(new ViewUserDto()))
    async getUsers(): Promise<User[]> {
        // Implementation
    }
}

```

---

### validateDto()

```ts
function validateDto<T, V, Thr>(
  dto,
  obj,
  throwErrors?,
): Promise<true extends Thr ? T : ValidationError[] | T>;
```

Defined in: [libs/nest-core/src/lib/utils/validation.utils.ts:63](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-core/src/lib/utils/validation.utils.ts#L63)

Validate a DTO object with class-validator

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

&hyphen;

</td>
<td>

DTO class type

</td>
</tr>
<tr>
<td>

`V`

</td>
<td>

`object`

</td>
<td>

Object type

</td>
</tr>
<tr>
<td>

`Thr`

</td>
<td>

`false`

</td>
<td>

&hyphen;

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

`dto`

</td>
<td>

`ClassConstructor`\<`T`\>

</td>
<td>

DTO class

</td>
</tr>
<tr>
<td>

`obj`

</td>
<td>

`V`

</td>
<td>

Object to validate

</td>
</tr>
<tr>
<td>

`throwErrors?`

</td>
<td>

`boolean` \| `Thr`

</td>
<td>

Weather to throw errors or return the errors

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`\<`true` _extends_ `Thr` ? `T` : `ValidationError`[] \| `T`\>

Validated object instance as a promise

#### Example

```TypeScript
@Controller("auth")
export class AuthController {
    @Post("register")
    async register(@Body() dto: any): Promise<User> {
        // Other implementation
        await validateDto(RegisterDto, dto)
        // Other implementation
    }
}

```

#### Throws

If the object is not valid

---

### validationPipeExceptionFactory()

```ts
function validationPipeExceptionFactory(errors): BadRequestException;
```

Defined in: [libs/nest-core/src/lib/utils/validation.utils.ts:131](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-core/src/lib/utils/validation.utils.ts#L131)

Validation pipe exception factory.
This function is used to create a custom exception for the validation pipe.

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

`errors`

</td>
<td>

`ValidationError`[]

</td>
<td>

The validation errors

</td>
</tr>
</tbody>
</table>

#### Returns

`BadRequestException`

The custom exception

#### Example

```TypeScript
async function bootstrap(): Promise<void> {
    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(
        new ValidationPipe({ exceptionFactory: validationPipeExceptionFactory }),
    );

    await app.listen(3000);
}

bootstrap();
```
