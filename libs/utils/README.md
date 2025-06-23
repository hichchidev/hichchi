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

Defined in: [interfaces.ts:1](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/utils/src/lib/interfaces.ts#L1)

#### Indexable

```ts
[key: string]: InfiniteObject
```

---

### PathValueSet

Defined in: [interfaces.ts:5](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/utils/src/lib/interfaces.ts#L5)

#### Indexable

```ts
[path: string]: string | number | boolean
```

## Type Aliases

### LiteralObject\<T\>

```ts
type LiteralObject<T> = object;
```

Defined in: [types.ts:3](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/utils/src/lib/types.ts#L3)

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

`any`

</td>
</tr>
</tbody>
</table>

#### Index Signature

```ts
[key: string]: T
```

---

### LooseAutocomplete\<T\>

```ts
type LooseAutocomplete<T> = T | Omit<string, T>;
```

Defined in: [types.ts:24](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/utils/src/lib/types.ts#L24)

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

#### Author

Matt Pocock (https://www.totaltypescript.com/tips/create-autocomplete-helper-which-allows-for-arbitrary-values)

---

### PartialWithNull\<T\>

```ts
type PartialWithNull<T> = { [p in keyof T]?: T[p] | null };
```

Defined in: [types.ts:7](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/utils/src/lib/types.ts#L7)

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

## Variables

### mimeTypes

```ts
const mimeTypes: Map<string, string>;
```

Defined in: [file.utils.ts:8](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/utils/src/lib/file.utils.ts#L8)

Map of mime types to all file extensions.

## Functions

### applyTemplate()

```ts
function applyTemplate(str, prefix): string;
```

Defined in: [string-template.utils.ts:29](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/utils/src/lib/string-template.utils.ts#L29)

Apply error message prefix to a valid template string

Acceptable template tags:

- `#{upperCase}`
- `#{snakeCase}`
- `#{upperSnakeCase}`
- `#{lowerCase}`
- `#{sentenceCase}`
- `#{firstCase}`

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

Template string to apply prefix

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

Prefix to apply

</td>
</tr>
</tbody>
</table>

#### Returns

`string`

Prefix applied string

#### Example

```TypeScript
applyTemplate(
    'Cannot create a #{lowerCase} with this email. #{sentenceCase} already exists.',
    'User'
);
// Output: Cannot create a user with this email. User exists.
```

---

### breakToWords()

#### Call Signature

```ts
function breakToWords(str): string[];
```

Defined in: [string.utils.ts:31](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/utils/src/lib/string.utils.ts#L31)

Break a string into words array.<br>

This function will break any of below to words in examples into `['hello', 'world']`<br>

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

String to break into words.

</td>
</tr>
</tbody>
</table>

##### Returns

`string`[]

Array of words.

##### Examples

```TypeScript
breakToWords("helloWorld"); // ['hello', 'world']
```

```TypeScript
breakToWords("hello_world"); // ['hello', 'world']
```

```TypeScript
breakToWords("hello-world"); // ['hello', 'world']
```

```TypeScript
breakToWords("hello world"); // ['hello', 'world']
```

#### Call Signature

```ts
function breakToWords(str, format): string;
```

Defined in: [string.utils.ts:47](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/utils/src/lib/string.utils.ts#L47)

Break a string into words array and format the string.<br>

This function will break string into words and format the string using the provided function.<br>

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

String to break into words.

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

Formatting function.

</td>
</tr>
</tbody>
</table>

##### Returns

`string`

Formatted string.

##### Example

```TypeScript
breakToWords("helloWorld" , toFirstCase); // Hello world
```

---

### deepCopy()

```ts
function deepCopy<T>(obj): T;
```

Defined in: [object.utils.ts:23](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/utils/src/lib/object.utils.ts#L23)

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

### getFileExt()

```ts
function getFileExt(mimeType, allowedMimeTypes?): undefined | string;
```

Defined in: [file.utils.ts:1217](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/utils/src/lib/file.utils.ts#L1217)

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

`Map`\<`string`, `string`\>

</td>
<td>

Allowed mime types.

</td>
</tr>
</tbody>
</table>

#### Returns

`undefined` \| `string`

File extension.

---

### getFileSize()

```ts
function getFileSize(size, round?): string;
```

Defined in: [file.utils.ts:1227](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/utils/src/lib/file.utils.ts#L1227)

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

Whether to round the size.

</td>
</tr>
</tbody>
</table>

#### Returns

`string`

File size in human-readable format.

---

### getMapKey()

```ts
function getMapKey(map, value): undefined | string;
```

Defined in: [object.utils.ts:53](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/utils/src/lib/object.utils.ts#L53)

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

`Map`\<`string`, `unknown`\>

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

`undefined` \| `string`

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

Defined in: [object.utils.ts:79](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/utils/src/lib/object.utils.ts#L79)

Get the keys of a map by partial value.

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

`Map`\<`string`, `string`\>

</td>
<td>

Map to get keys from.

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

Partial value to get keys for.

</td>
</tr>
</tbody>
</table>

#### Returns

`string`[]

- Keys of the map.

#### Example

```TypeScript
// Example usage
const user = new Map<string, string>([
   ["firstName", "John"],
   ["lastName", "Doe"],
   ["preferredName", "John"],
   ["age", 30],
]);

const keys = getMapKeys(user, "Jo");

// Example output
["firstName", "preferredName"]
```

---

### getValueByPath()

```ts
function getValueByPath<T>(obj, path): undefined | T;
```

Defined in: [object.utils.ts:196](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/utils/src/lib/object.utils.ts#L196)

Get value from an object by path.

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

Type of the value.

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

Object to get value from.

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

Path to get value from.

</td>
</tr>
</tbody>
</table>

#### Returns

`undefined` \| `T`

Value from the object.

#### Example

```TypeScript
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

---

### groupBy()

```ts
function groupBy<K, V>(list, keyGetter): Map<null | K, V[]>;
```

Defined in: [object.utils.ts:125](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/utils/src/lib/object.utils.ts#L125)

Groups an array of objects by a key.

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

Type of the key.

</td>
</tr>
<tr>
<td>

`V`

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

`list`

</td>
<td>

`V`[]

</td>
<td>

Array of objects to group.

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

Function to get the key from the object.

</td>
</tr>
</tbody>
</table>

#### Returns

`Map`\<`null` \| `K`, `V`[]\>

Grouped objects.

#### Example

```TypeScript
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

---

### htmlToText()

```ts
function htmlToText(str): string;
```

Defined in: [string.utils.ts:314](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/utils/src/lib/string.utils.ts#L314)

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

### isArray()

```ts
function isArray<T>(value): value is T[];
```

Defined in: [assertions.utils.ts:20](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/utils/src/lib/assertions.utils.ts#L20)

Check if the value is an array while asserting it's an array of generic type T

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

The type of the array

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

`undefined` \| `T` \| `T`[]

</td>
<td>

The value to check

</td>
</tr>
</tbody>
</table>

#### Returns

`value is T[]`

True if the value is an array, false otherwise

#### Example

```TypeScript
async function createUser(userOrUsers: UserDto | UserDto[] | undefined): User {
    if (isArray<UserDto>(userOrUsers)) {
        return userOrUsers.map(async user => await userService.createUser(user));
    } else {
        return await userService.createUser(userOrUsers);
    }
}
```

---

### isObject()

```ts
function isObject<T>(value?): value is T;
```

Defined in: [assertions.utils.ts:41](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/utils/src/lib/assertions.utils.ts#L41)

Check if the value is an object while asserting it's an object of generic type T

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

The type of the object

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

`T` \| `T`[]

</td>
<td>

The value to check

</td>
</tr>
</tbody>
</table>

#### Returns

`value is T`

True if the value is an object, false otherwise

#### Example

```TypeScript
async function getUserInfo(userIdOrUser: EntityId | User | undefined): UserInfo {
    if (isObject<User>(userIdOrUser)) {
        return await userService.getUserInfo(userIdOrUser.id);
    } else {
        return await userService.getUserInfo(userIdOrUser);
    }
}
```

---

### isObjectWith()

```ts
function isObjectWith<T>(value, propertyName): value is T;
```

Defined in: [assertions.utils.ts:63](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/utils/src/lib/assertions.utils.ts#L63)

Check if the value is an object with a given property name and asset it's an object of generic type T

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

The type of the object

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

The value to check

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

The property name to check

</td>
</tr>
</tbody>
</table>

#### Returns

`value is T`

True if the value is an object with the given property name, false otherwise

#### Example

```TypeScript
async function getUserInfo(userIdOrUser: EntityId | User | undefined): UserInfo {
    if (isObjectWith<User>(userIdOrUser, "id")) {
        return await userService.getUserInfo(userIdOrUser.id);
    } else {
        return await userService.getUserInfo(userIdOrUser);
    }
}
```

---

### objectToPathValueSet()

```ts
function objectToPathValueSet(obj): PathValueSet;
```

Defined in: [object.utils.ts:256](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/utils/src/lib/object.utils.ts#L256)

Convert an object to a path value set

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

The object

</td>
</tr>
</tbody>
</table>

#### Returns

[`PathValueSet`](#pathvalueset)

The path value set

#### Example

```TypeScript
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

---

### omit()

```ts
function omit<T>(obj, keys?): Partial<T>;
```

Defined in: [object.utils.ts:374](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/utils/src/lib/object.utils.ts#L374)

Omits undefined properties and properties in the keys array from an object.

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

`Partial`\<`T`\>

</td>
<td>

Object to omit properties from.

</td>
</tr>
<tr>
<td>

`keys?`

</td>
<td>

keyof `T`[]

</td>
<td>

Array of keys to omit.

</td>
</tr>
</tbody>
</table>

#### Returns

`Partial`\<`T`\>

- Object with omitted properties.

#### Example

```TypeScript
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

---

### pathValueSetToObject()

```ts
function pathValueSetToObject<R>(pathValueSet): R;
```

Defined in: [object.utils.ts:309](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/utils/src/lib/object.utils.ts#L309)

Convert the path value set to an object

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

The return type

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

`Record`\<`string`, `any`\>

</td>
<td>

The path value set

</td>
</tr>
</tbody>
</table>

#### Returns

`R`

The object with the path value set converted

#### Example

```TypeScript
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

---

### prune()

```ts
function prune<T>(obj, omitPrototype?): T;
```

Defined in: [object.utils.ts:403](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/utils/src/lib/object.utils.ts#L403)

Prune an object by removing all empty, null, undefined, and prototype properties.

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

[`PartialWithNull`](#partialwithnull)\<`T`\>

</td>
<td>

Object to prune.

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

Omit prototype properties.

</td>
</tr>
</tbody>
</table>

#### Returns

`T`

Pruned object.

#### Example

````TypeScript
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

***

### saveAsFile()

```ts
function saveAsFile(blob, filename): void;
````

Defined in: [file.utils.ts:1252](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/utils/src/lib/file.utils.ts#L1252)

Save a StreamableBlob as a file.

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

`blob`

</td>
<td>

`Blob`

</td>
<td>

Blob to save.

</td>
</tr>
<tr>
<td>

`filename`

</td>
<td>

`string`

</td>
<td>

File name.

</td>
</tr>
</tbody>
</table>

#### Returns

`void`

#### Throws

- Throws an error if used in a Node.js environment.

---

### searchMapValues()

```ts
function searchMapValues(map, partialValue): string[];
```

Defined in: [object.utils.ts:160](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/utils/src/lib/object.utils.ts#L160)

Get the values of a map by partial value.

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

`Map`\<`string`, `string`\>

</td>
<td>

Map to get values from.

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

Partial value to get values for.

</td>
</tr>
</tbody>
</table>

#### Returns

`string`[]

Values of the map.

#### Example

```TypeScript
// Example usage
const user = new Map<string, string>([
    ["name", "John Doe"],
    ["preferredName", "John"],
    ["age", 30],
]);

const values = getMapValues(user, "Jo");

// Example output
["John Doe", "John"]
```

---

### singular()

```ts
function singular(str): string;
```

Defined in: [string.utils.ts:328](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/utils/src/lib/string.utils.ts#L328)

Handles converting plural words to their singular form.

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

String to convert to singular.

</td>
</tr>
</tbody>
</table>

#### Returns

`string`

Singular form of the string.

#### Example

```TypeScript
singular("children"); // "child"
```

---

### toCamelCase()

```ts
function toCamelCase(str?): string;
```

Defined in: [string.utils.ts:197](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/utils/src/lib/string.utils.ts#L197)

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

Defined in: [string.utils.ts:152](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/utils/src/lib/string.utils.ts#L152)

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

Defined in: [string.utils.ts:159](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/utils/src/lib/string.utils.ts#L159)

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

`str?`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`join?`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

#### Returns

`string`

---

### toKebabCase()

```ts
function toKebabCase(str?, caps?): string;
```

Defined in: [string.utils.ts:282](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/utils/src/lib/string.utils.ts#L282)

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

Defined in: [string.utils.ts:74](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/utils/src/lib/string.utils.ts#L74)

Convert a string to lower case.

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

String to convert to lower case.

</td>
</tr>
</tbody>
</table>

#### Returns

`string`

String in lower case.

#### Example

```TypeScript
toLowerCase("Hello World"); // "hello world"
```

---

### toLowerCaseBreak()

```ts
function toLowerCaseBreak(str?, join?): string;
```

Defined in: [string.utils.ts:92](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/utils/src/lib/string.utils.ts#L92)

Convert a string to lower cases and break into words with optional join or space.

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

String to convert to lower cases and break into words.

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

String in lower cases and broken into words.

#### Example

```TypeScript
toLowerCaseBreak("HelloWorld"); // "hello world"
```

---

### toNumber()

```ts
function toNumber(str): undefined | number;
```

Defined in: [string.utils.ts:300](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/utils/src/lib/string.utils.ts#L300)

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

`string` \| `number`

</td>
<td>

String to convert to a number.

</td>
</tr>
</tbody>
</table>

#### Returns

`undefined` \| `number`

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

Defined in: [string.utils.ts:216](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/utils/src/lib/string.utils.ts#L216)

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

### toSentenceCase()

```ts
function toSentenceCase(str?): string;
```

Defined in: [string.utils.ts:235](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/utils/src/lib/string.utils.ts#L235)

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

Defined in: [string.utils.ts:258](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/utils/src/lib/string.utils.ts#L258)

Convert a string to snake case.

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

String to convert to snake case.

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

String in snake case.

#### Examples

```TypeScript
toSnakeCase("hello world"); // "hello_world"
```

```TypeScript
toSnakeCase("hello world", true); // "HELLO_WORLD"
```

---

### toTitleCase()

```ts
function toTitleCase(str?): string;
```

Defined in: [string.utils.ts:178](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/utils/src/lib/string.utils.ts#L178)

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

Defined in: [string.utils.ts:111](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/utils/src/lib/string.utils.ts#L111)

Convert a string to upper case.

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

String to convert to upper case.

</td>
</tr>
</tbody>
</table>

#### Returns

`string`

String in upper case.

#### Example

```TypeScript
toUpperCase("HelloWorld"); // "HELLO WORLD"
```

---

### toUpperCaseBreak()

```ts
function toUpperCaseBreak(str?, join?): string;
```

Defined in: [string.utils.ts:133](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/utils/src/lib/string.utils.ts#L133)

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

```TypeScript
toUpperCaseBreak("HelloWorld", "! "); // "HELLO! WORLD"
```
