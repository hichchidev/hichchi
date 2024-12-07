**@hichchi/utils**

---

# utils

This library was generated with [Nx](https://nx.dev).

## Building

Run `nx build utils` to build the library.

## Running unit tests

Run `nx test utils` to execute the unit tests via [Jest](https://jestjs.io).

## Interfaces

### InfiniteObject

#### Indexable

\[`key`: `string`\]: [`InfiniteObject`](README.md#infiniteobject)

---

### PathValueSet

#### Indexable

\[`path`: `string`\]: `string` \| `number` \| `boolean`

## Type Aliases

### LiteralObject\<T\>

```ts
type LiteralObject<T>: {};
```

#### Type Parameters

| Type Parameter | Default type |
| -------------- | ------------ |
| `T`            | `any`        |

#### Index Signature

\[`key`: `string`\]: `T`

#### Defined in

types.ts:3

## Variables

### mimeTypes

```ts
const mimeTypes: Map<string, string>;
```

Map of mime types to all file extensions.

#### Defined in

file.utils.ts:8

## Functions

### applyTemplate()

```ts
function applyTemplate(str: string, prefix: string): string;
```

Apply error message prefix to a valid template string

Acceptable template tags:

- `#{upperCase}`
- `#{snakeCase}`
- `#{upperSnakeCase}`
- `#{lowerCase}`
- `#{sentenceCase}`
- `#{firstCase}`

#### Parameters

| Parameter | Type     | Description                     |
| --------- | -------- | ------------------------------- |
| `str`     | `string` | Template string to apply prefix |
| `prefix`  | `string` | Prefix to apply                 |

#### Returns

`string`

Prefix applied string

#### Example

```typescript
applyTemplate(
  "Cannot create a #{lowerCase} with this email. #{sentenceCase} already exists.",
  "User",
);
// Output: Cannot create a user with this email. User exists.
```

#### Defined in

string-template.utils.ts:29

---

### breakToWords()

#### Call Signature

```ts
function breakToWords(str: string): string[];
```

Break a string into words array.<br>

This function will break any of below to words in examples into `['hello', 'world']`<br>

##### Parameters

| Parameter | Type     | Description                 |
| --------- | -------- | --------------------------- |
| `str`     | `string` | String to break into words. |

##### Returns

`string`[]

Array of words.

##### Examples

```typescript
breakToWords("helloWorld"); // ['hello', 'world']
```

```typescript
breakToWords("hello_world"); // ['hello', 'world']
```

```typescript
breakToWords("hello-world"); // ['hello', 'world']
```

```typescript
breakToWords("hello world"); // ['hello', 'world']
```

##### Defined in

string.utils.ts:31

#### Call Signature

```ts
function breakToWords(str: string, format: (str: string) => string): string;
```

Break a string into words array and format the string.<br>

This function will break string into words and format the string using the provided function.<br>

##### Parameters

| Parameter | Type                          | Description                 |
| --------- | ----------------------------- | --------------------------- |
| `str`     | `string`                      | String to break into words. |
| `format`  | (`str`: `string`) => `string` | Formatting function.        |

##### Returns

`string`

Formatted string.

##### Example

```typescript
breakToWords("helloWorld", toFirstCase); // Hello world
```

##### Defined in

string.utils.ts:47

---

### deepCopy()

```ts
function deepCopy<T>(obj: T): T;
```

Deep copy an object.

#### Type Parameters

| Type Parameter | Description         |
| -------------- | ------------------- |
| `T`            | Type of the object. |

#### Parameters

| Parameter | Type | Description     |
| --------- | ---- | --------------- |
| `obj`     | `T`  | Object to copy. |

#### Returns

`T`

Copied object.

#### Example

```typescript
// Example usage
const object = {
  name: "John Doe",
};

const copiedObject = deepCopy(object);
```

#### Defined in

object.utils.ts:23

---

### getFileExt()

```ts
function getFileExt(
  mimeType: string,
  allowedMimeTypes?: Map<string, string>,
): string;
```

Get the file extension of the given mime type.

#### Parameters

| Parameter           | Type                        | Description         |
| ------------------- | --------------------------- | ------------------- |
| `mimeType`          | `string`                    | Mime type.          |
| `allowedMimeTypes`? | `Map`\<`string`, `string`\> | Allowed mime types. |

#### Returns

`string`

File extension.

#### Defined in

file.utils.ts:1217

---

### getFileSize()

```ts
function getFileSize(size: number, round?: boolean): string;
```

Get file size in human-readable format.

#### Parameters

| Parameter | Type      | Description                |
| --------- | --------- | -------------------------- |
| `size`    | `number`  | File size in bytes.        |
| `round`?  | `boolean` | Whether to round the size. |

#### Returns

`string`

File size in human-readable format.

#### Defined in

file.utils.ts:1227

---

### getMapKey()

```ts
function getMapKey(
  map: Map<string, unknown>,
  value: unknown,
): string | undefined;
```

Get the key of a map by value.

#### Parameters

| Parameter | Type                         | Description           |
| --------- | ---------------------------- | --------------------- |
| `map`     | `Map`\<`string`, `unknown`\> | Map to get key from.  |
| `value`   | `unknown`                    | Value to get key for. |

#### Returns

`string` \| `undefined`

Key of the map.

#### Example

```typescript
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

#### Defined in

object.utils.ts:53

---

### getMapKeys()

```ts
function getMapKeys(map: Map<string, string>, partialValue: string): string[];
```

Get the keys of a map by partial value.

#### Parameters

| Parameter      | Type                        | Description                    |
| -------------- | --------------------------- | ------------------------------ |
| `map`          | `Map`\<`string`, `string`\> | Map to get keys from.          |
| `partialValue` | `string`                    | Partial value to get keys for. |

#### Returns

`string`[]

- Keys of the map.

#### Example

```typescript
// Example usage
const user = new Map<string, string>([
  ["firstName", "John"],
  ["lastName", "Doe"],
  ["preferredName", "John"],
  ["age", 30],
]);

const keys = getMapKeys(user, "Jo");

// Example output
["firstName", "preferredName"];
```

#### Defined in

object.utils.ts:79

---

### getValueByPath()

```ts
function getValueByPath<T>(obj: InfiniteObject, path: string): T;
```

Get value from an object by path.

#### Type Parameters

| Type Parameter | Description        |
| -------------- | ------------------ |
| `T`            | Type of the value. |

#### Parameters

| Parameter | Type                                         | Description               |
| --------- | -------------------------------------------- | ------------------------- |
| `obj`     | [`InfiniteObject`](README.md#infiniteobject) | Object to get value from. |
| `path`    | `string`                                     | Path to get value from.   |

#### Returns

`T`

Value from the object.

#### Example

```typescript
// Example usage
const object = {
  role: "user",
  profile: {
    name: "John Doe",
    age: 30,
    address: {
      city: "New York",
    },
  },
};

const value = getValueByPath<string>(object, "profile.address.city");

// Example output: "New York"
```

#### Defined in

object.utils.ts:196

---

### groupBy()

```ts
function groupBy<K, V>(list: V[], keyGetter: (input: V) => K): Map<K, V[]>;
```

Groups an array of objects by a key.

#### Type Parameters

| Type Parameter | Description         |
| -------------- | ------------------- |
| `K`            | Type of the key.    |
| `V`            | Type of the object. |

#### Parameters

| Parameter   | Type                  | Description                              |
| ----------- | --------------------- | ---------------------------------------- |
| `list`      | `V`[]                 | Array of objects to group.               |
| `keyGetter` | (`input`: `V`) => `K` | Function to get the key from the object. |

#### Returns

`Map`\<`K`, `V`[]\>

Grouped objects.

#### Example

```typescript
// Example usage
// group by age, all have unique names
const users = [
    { name: "John", age: 30 },
    { name: "Jane", age: 25 },
    { name: "Doe", age: 30 },
    { name: "Smith", age: 25 },
    { name: "Denis", age: 30 },
];

const groupedUsers = groupBy(users, user => user.age);

// Example output
Map {
    30 => [
        { name: "John", age: 30 },
        { name: "Doe", age: 30 },
        { name: "Denis", age: 30 },
    ],
    25 => [
        { name: "Jane", age: 25 },
        { name: "Smith", age: 25 },
    ],
}
```

#### Defined in

object.utils.ts:125

---

### htmlToText()

```ts
function htmlToText(str: string): string;
```

Remove HTML tags from a string and return plain text.

#### Parameters

| Parameter | Type     | Description                      |
| --------- | -------- | -------------------------------- |
| `str`     | `string` | String to remove HTML tags from. |

#### Returns

`string`

Plain text.

#### Example

```typescript
htmlToText("<h1>Hello World</h1>"); // "Hello World"
```

#### Defined in

string.utils.ts:305

---

### isArray()

```ts
function isArray<T>(value: T | T[]): value is T[];
```

Check if the value is an array while asserting it's an array of generic type T

#### Type Parameters

| Type Parameter | Description           |
| -------------- | --------------------- |
| `T`            | The type of the array |

#### Parameters

| Parameter | Type         | Description        |
| --------- | ------------ | ------------------ |
| `value`   | `T` \| `T`[] | The value to check |

#### Returns

`value is T[]`

True if the value is an array, false otherwise

#### Example

```typescript
async function createUser(userOrUsers: UserDto | UserDto[] | undefined): User {
  if (isArray<UserDto>(userOrUsers)) {
    return userOrUsers.map(async (user) => await userService.createUser(user));
  } else {
    return await userService.createUser(userOrUsers);
  }
}
```

#### Defined in

assertions.utils.ts:21

---

### isObject()

```ts
function isObject<T>(value?: T | T[]): value is T;
```

Check if the value is an object while asserting it's an object of generic type T

#### Type Parameters

| Type Parameter | Description            |
| -------------- | ---------------------- |
| `T`            | The type of the object |

#### Parameters

| Parameter | Type         | Description        |
| --------- | ------------ | ------------------ |
| `value`?  | `T` \| `T`[] | The value to check |

#### Returns

`value is T`

True if the value is an object, false otherwise

#### Example

```typescript
async function getUserInfo(userIdOrUser: string | User | undefined): UserInfo {
  if (isObject<User>(userIdOrUser)) {
    return await userService.getUserInfo(userIdOrUser.id);
  } else {
    return await userService.getUserInfo(userIdOrUser);
  }
}
```

#### Defined in

assertions.utils.ts:42

---

### isObjectWith()

```ts
function isObjectWith<T>(value: any, propertyName: keyof T): value is T;
```

Check if the value is an object with a given property name and asset it's an object of generic type T

#### Type Parameters

| Type Parameter         | Description            |
| ---------------------- | ---------------------- |
| `T` _extends_ `object` | The type of the object |

#### Parameters

| Parameter      | Type      | Description                |
| -------------- | --------- | -------------------------- |
| `value`        | `any`     | The value to check         |
| `propertyName` | keyof `T` | The property name to check |

#### Returns

`value is T`

True if the value is an object with the given property name, false otherwise

#### Example

```typescript
async function getUserInfo(userIdOrUser: string | User | undefined): UserInfo {
  if (isObjectWith<User>(userIdOrUser, "id")) {
    return await userService.getUserInfo(userIdOrUser.id);
  } else {
    return await userService.getUserInfo(userIdOrUser);
  }
}
```

#### Defined in

assertions.utils.ts:64

---

### objectToPathValueSet()

```ts
function objectToPathValueSet(obj: LiteralObject): PathValueSet;
```

Convert an object to a path value set

#### Parameters

| Parameter | Type                                        | Description |
| --------- | ------------------------------------------- | ----------- |
| `obj`     | [`LiteralObject`](README.md#literalobjectt) | The object  |

#### Returns

[`PathValueSet`](README.md#pathvalueset)

The path value set

#### Example

```typescript
// Example usage
const object = {
    role: "user",
    profile: {
        name: "John Doe",
        age: 30,
        address: {
            city: "New York",
        },
    },
};

const pathValueSet = objectToPathValueSet(object);

// Example output
{
    "role": "user",
    "profile.name": "John Doe",
    "profile.age": 30,
    "profile.address.city": "New York",
}
```

#### Defined in

object.utils.ts:255

---

### omit()

```ts
function omit<T>(obj: Partial<T>, keys?: keyof T[]): void;
```

Omits undefined properties and properties in the keys array from an object.

#### Type Parameters

| Type Parameter     |
| ------------------ |
| `T` _extends_ \{\} |

#### Parameters

| Parameter | Type             | Description                     |
| --------- | ---------------- | ------------------------------- |
| `obj`     | `Partial`\<`T`\> | Object to omit properties from. |
| `keys`?   | keyof `T`[]      | Array of keys to omit.          |

#### Returns

`void`

- Object with omitted properties.

#### Example

```typescript
// Example usage
const object = {
    role: "user",
    name: "John Doe",
    age: 30,
    address: undefined,
};

omit(object, ["role"]);

// Example output
{
    name: "John Doe",
    age: 30,
}
```

#### Defined in

object.utils.ts:370

---

### pathValueSetToObject()

```ts
function pathValueSetToObject<R>(pathValueSet: Record<string, any>): R;
```

Convert the path value set to an object

#### Type Parameters

| Type Parameter | Default type | Description     |
| -------------- | ------------ | --------------- |
| `R`            | `object`     | The return type |

#### Parameters

| Parameter      | Type                        | Description        |
| -------------- | --------------------------- | ------------------ |
| `pathValueSet` | `Record`\<`string`, `any`\> | The path value set |

#### Returns

`R`

The object with the path value set converted

#### Example

```typescript
// Example usage
const pathValueSet = {
    "role": "user",
    "profile.name": "John Doe",
    "profile.age": 30,
    "profile.address.city": "New York",
}

const object = pathValueSetToObject(pathValueSet);

// Example output
{
    role: "user",
    profile: {
        name: "John Doe",
        age: 30,
        address: {
            city: "New York",
        },
    },
}
```

#### Defined in

object.utils.ts:308

---

### prune()

```ts
function prune<T>(obj: any, omitPrototype?: boolean): T;
```

Prune an object by removing all empty, null, undefined, and prototype properties.

#### Type Parameters

| Type Parameter | Description         |
| -------------- | ------------------- |
| `T`            | Type of the object. |

#### Parameters

| Parameter        | Type      | Description                |
| ---------------- | --------- | -------------------------- |
| `obj`            | `any`     | Object to prune.           |
| `omitPrototype`? | `boolean` | Omit prototype properties. |

#### Returns

`T`

Pruned object.

#### Example

````typescript
// Example usage
const object = {
    role: "user",
    profile: {
        name: "John Doe",
        age: 30,
        address: undefined,
        city: "New York",
    },
};

#### Defined in

object.utils.ts:398

***

### saveAsFile()

```ts
function saveAsFile(blob: Blob, filename: string): void
````

Save a StreamableBlob as a file.

#### Parameters

| Parameter  | Type     | Description   |
| ---------- | -------- | ------------- |
| `blob`     | `Blob`   | Blob to save. |
| `filename` | `string` | File name.    |

#### Returns

`void`

#### Throws

- Throws an error if used in a Node.js environment.

#### Defined in

file.utils.ts:1246

---

### searchMapValues()

```ts
function searchMapValues(
  map: Map<string, string>,
  partialValue: string,
): string[];
```

Get the values of a map by partial value.

#### Parameters

| Parameter      | Type                        | Description                      |
| -------------- | --------------------------- | -------------------------------- |
| `map`          | `Map`\<`string`, `string`\> | Map to get values from.          |
| `partialValue` | `string`                    | Partial value to get values for. |

#### Returns

`string`[]

Values of the map.

#### Example

```typescript
// Example usage
const user = new Map<string, string>([
  ["name", "John Doe"],
  ["preferredName", "John"],
  ["age", 30],
]);

const values = getMapValues(user, "Jo");

// Example output
["John Doe", "John"];
```

#### Defined in

object.utils.ts:160

---

### singular()

```ts
function singular(str: string): string;
```

Handles converting plural words to their singular form.

#### Parameters

| Parameter | Type     | Description                    |
| --------- | -------- | ------------------------------ |
| `str`     | `string` | String to convert to singular. |

#### Returns

`string`

Singular form of the string.

#### Example

```typescript
singular("children"); // "child"
```

#### Defined in

string.utils.ts:319

---

### toCamelCase()

```ts
function toCamelCase(str?: string): string;
```

Convert a string to camel case.

#### Parameters

| Parameter | Type     | Description                      |
| --------- | -------- | -------------------------------- |
| `str`?    | `string` | String to convert to camel case. |

#### Returns

`string`

String in camel case.

#### Example

```typescript
toCamelCase("hello world"); // "helloWorld"
```

#### Defined in

string.utils.ts:188

---

### toFirstCase()

```ts
function toFirstCase(str?: string): string;
```

Convert a string to first case (Capitalize first letter of the string).

#### Parameters

| Parameter | Type     | Description                             |
| --------- | -------- | --------------------------------------- |
| `str`?    | `string` | Optional string to join the words with. |

#### Returns

`string`

String in first case.

#### Example

```typescript
toFirstCase("hello world"); // "Hello world"
```

#### Defined in

string.utils.ts:152

---

### toKebabCase()

```ts
function toKebabCase(str?: string, caps?: boolean): string;
```

Convert a string to kebab case.

#### Parameters

| Parameter | Type      | Description                       |
| --------- | --------- | --------------------------------- |
| `str`?    | `string`  | String to convert to kebab case.  |
| `caps`?   | `boolean` | Whether to convert to upper case. |

#### Returns

`string`

String in kebab case.

#### Examples

```typescript
toKebabCase("hello world"); // "hello-world"
```

```typescript
toKebabCase("hello world", true); // "HELLO-WORLD"
```

#### Defined in

string.utils.ts:273

---

### toLowerCase()

```ts
function toLowerCase(str?: string): string;
```

Convert a string to lower case.

#### Parameters

| Parameter | Type     | Description                      |
| --------- | -------- | -------------------------------- |
| `str`?    | `string` | String to convert to lower case. |

#### Returns

`string`

String in lower case.

#### Example

```typescript
toLowerCase("Hello World"); // "hello world"
```

#### Defined in

string.utils.ts:74

---

### toLowerCaseBreak()

```ts
function toLowerCaseBreak(str?: string, join?: string): string;
```

Convert a string to lower cases and break into words with optional join or space.

#### Parameters

| Parameter | Type     | Description                                            |
| --------- | -------- | ------------------------------------------------------ |
| `str`?    | `string` | String to convert to lower cases and break into words. |
| `join`?   | `string` | Optional string to join the words with.                |

#### Returns

`string`

String in lower cases and broken into words.

#### Example

```typescript
toLowerCaseBreak("HelloWorld"); // "hello world"
```

#### Defined in

string.utils.ts:92

---

### toNumber()

```ts
function toNumber(str: string | number): number | undefined;
```

Converts a string to a number.

#### Parameters

| Parameter | Type                 | Description                    |
| --------- | -------------------- | ------------------------------ |
| `str`     | `string` \| `number` | String to convert to a number. |

#### Returns

`number` \| `undefined`

Number or undefined.

#### Example

```typescript
toNumber("123"); // 123
```

#### Defined in

string.utils.ts:291

---

### toPascalCase()

```ts
function toPascalCase(str?: string): string;
```

Convert a string to pascal case.

#### Parameters

| Parameter | Type     | Description                       |
| --------- | -------- | --------------------------------- |
| `str`?    | `string` | String to convert to pascal case. |

#### Returns

`string`

String in pascal case.

#### Example

```typescript
toPascalCase("hello world"); // "HelloWorld"
```

#### Defined in

string.utils.ts:207

---

### toSentenceCase()

```ts
function toSentenceCase(str?: string): string;
```

Convert a string to sentence case. (Capitalize first letter of every sentence).

#### Parameters

| Parameter | Type     | Description                         |
| --------- | -------- | ----------------------------------- |
| `str`?    | `string` | String to convert to sentence case. |

#### Returns

`string`

String in sentence case.

#### Example

```typescript
toSentenceCase("hello world. how are you?"); // "Hello world. How are you?"
```

#### Defined in

string.utils.ts:226

---

### toSnakeCase()

```ts
function toSnakeCase(str?: string, caps?: boolean): string;
```

Convert a string to snake case.

#### Parameters

| Parameter | Type      | Description                       |
| --------- | --------- | --------------------------------- |
| `str`?    | `string`  | String to convert to snake case.  |
| `caps`?   | `boolean` | Whether to convert to upper case. |

#### Returns

`string`

String in snake case.

#### Examples

```typescript
toSnakeCase("hello world"); // "hello_world"
```

```typescript
toSnakeCase("hello world", true); // "HELLO_WORLD"
```

#### Defined in

string.utils.ts:249

---

### toTitleCase()

```ts
function toTitleCase(str?: string): string;
```

Convert a string to title case (Capitalize first letter of each word).

#### Parameters

| Parameter | Type     | Description                      |
| --------- | -------- | -------------------------------- |
| `str`?    | `string` | String to convert to title case. |

#### Returns

`string`

String in title case.

#### Example

```typescript
toTitleCase("hello world"); // "Hello World"
```

#### Defined in

string.utils.ts:169

---

### toUpperCase()

```ts
function toUpperCase(str?: string): string;
```

Convert a string to upper case.

#### Parameters

| Parameter | Type     | Description                      |
| --------- | -------- | -------------------------------- |
| `str`?    | `string` | String to convert to upper case. |

#### Returns

`string`

String in upper case.

#### Example

```typescript
toUpperCase("HelloWorld"); // "HELLO WORLD"
```

#### Defined in

string.utils.ts:111

---

### toUpperCaseBreak()

```ts
function toUpperCaseBreak(str?: string, join?: string): string;
```

Convert a string to upper cases and break into words with optional join or space.

#### Parameters

| Parameter | Type     | Description                                            |
| --------- | -------- | ------------------------------------------------------ |
| `str`?    | `string` | String to convert to upper cases and break into words. |
| `join`?   | `string` | Optional string to join the words with.                |

#### Returns

`string`

String in upper cases and broken into words.

#### Examples

```typescript
toUpperCaseBreak("HelloWorld"); // "HELLO WORLD"
```

```typescript
toUpperCaseBreak("HelloWorld", "! "); // "HELLO! WORLD"

#### Defined in

string.utils.ts:133
```
