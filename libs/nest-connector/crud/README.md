[**@hichchi/nest-connector**](../README.md)

---

[@hichchi/nest-connector](../README.md) / crud

# crud

## 📋 API Table of Contents

- [Interfaces](#interfaces)
  - [Model](#model)
  - [ModelExtension](#modelextension)
  - [PaginatedResponse\<T>](#paginatedresponset)
  - [Pagination](#pagination)
- [Type Aliases](#type-aliases)
  - [EntityDeepPartial\<T>](#entitydeeppartialt)
  - [EntityId](#entityid)
  - [EntityPropertyDeepPartial\<T>](#entitypropertydeeppartialt)
  - [PartialWithId\<T>](#partialwithidt)
  - [QueryDeepPartial\<T>](#querydeeppartialt)
  - [QuerySafeDeepPartial\<T>](#querysafedeeppartialt)

## Interfaces

### Model

Defined in: [lib/crud/interfaces/model.interface.ts:48](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/crud/interfaces/model.interface.ts#L48)

Base model interface for all database entities in the application.

The `Model` interface defines the standard properties that all entities
in the system should have. It provides a consistent structure for:

- Unique identification via UUID
- Comprehensive audit tracking (creation, updates, soft deletion)
- User attribution for all data changes

This interface serves as the foundation for the entity inheritance hierarchy
and ensures that all database records maintain proper audit trails for
compliance, debugging, and data governance purposes.

By implementing this interface, entities automatically gain:

- Standard timestamps for lifecycle events
- Built-in soft delete capability
- Complete user attribution for all operations

#### See

- [EntityId](#entityid) Type used for entity identifiers
- [UserInfo](../index/README.md#userinfo) Interface for user reference information

#### Example

```typescript
// Example entity implementing the Model interface
export class Product implements Model {
  id: EntityId;
  name: string;
  price: number;

  // Inherited from Model
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  createdById: string | null;
  createdBy: UserInfo | null;
  updatedById: string | null;
  updatedBy: UserInfo | null;
  deletedById: string | null;
  deletedBy: UserInfo | null;
}
```

#### Extended by

- [`Role`](../auth/README.md#role)
- [`User`](../auth/README.md#user-1)

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

<a id="createdat"></a> `createdAt`

</td>
<td>

`Date`

</td>
<td>

Timestamp when the entity was created.

This value is set automatically on entity creation and never changes
afterward, providing an immutable record of when the data was first added.

</td>
<td>

[lib/crud/interfaces/model.interface.ts:65](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/crud/interfaces/model.interface.ts#L65)

</td>
</tr>
<tr>
<td>

<a id="createdby"></a> `createdBy`

</td>
<td>

`null` | [`UserInfo`](../index/README.md#userinfo)

</td>
<td>

Detailed information about the user who created this entity.

Contains essential identifying information about the creator without
including sensitive data. This property may be populated through a join or
separate query when needed for display purposes.

**See**

[UserInfo](../index/README.md#userinfo) Interface for user reference information

</td>
<td>

[lib/crud/interfaces/model.interface.ts:102](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/crud/interfaces/model.interface.ts#L102)

</td>
</tr>
<tr>
<td>

<a id="createdbyid"></a> `createdById`

</td>
<td>

`null` | [`EntityId`](#entityid)

</td>
<td>

ID of the user who created this entity.

Stores just the ID reference to the user for efficient database storage.
Use in conjunction with the `createdBy` property when user details are needed.

</td>
<td>

[lib/crud/interfaces/model.interface.ts:91](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/crud/interfaces/model.interface.ts#L91)

</td>
</tr>
<tr>
<td>

<a id="deletedat"></a> `deletedAt`

</td>
<td>

`null` | `Date`

</td>
<td>

Timestamp when the entity was soft-deleted, if applicable.

When present and not null, indicates that this entity has been deleted
logically but is still present in the database. This enables data recovery
and maintains referential integrity while hiding the record from normal queries.

</td>
<td>

[lib/crud/interfaces/model.interface.ts:83](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/crud/interfaces/model.interface.ts#L83)

</td>
</tr>
<tr>
<td>

<a id="deletedby"></a> `deletedBy`

</td>
<td>

`null` | [`UserInfo`](../index/README.md#userinfo)

</td>
<td>

Detailed information about the user who soft-deleted this entity, if applicable.

Contains identifying information about the user who performed the deletion,
used primarily in administrative interfaces for reviewing deletion history.

**See**

[UserInfo](../index/README.md#userinfo) Interface for user reference information

</td>
<td>

[lib/crud/interfaces/model.interface.ts:138](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/crud/interfaces/model.interface.ts#L138)

</td>
</tr>
<tr>
<td>

<a id="deletedbyid"></a> `deletedById`

</td>
<td>

`null` | [`EntityId`](#entityid)

</td>
<td>

ID of the user who soft-deleted this entity, if applicable.

When an entity is soft-deleted, this property stores the ID of the user
who performed the deletion action for accountability purposes.

</td>
<td>

[lib/crud/interfaces/model.interface.ts:128](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/crud/interfaces/model.interface.ts#L128)

</td>
</tr>
<tr>
<td>

<a id="id"></a> `id`

</td>
<td>

[`EntityId`](#entityid)

</td>
<td>

Unique identifier for the entity.

This UUID serves as the primary key in the database and uniquely
identifies this record across the entire system.

**See**

[EntityId](#entityid) Type used for entity identifiers

</td>
<td>

[lib/crud/interfaces/model.interface.ts:57](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/crud/interfaces/model.interface.ts#L57)

</td>
</tr>
<tr>
<td>

<a id="updatedat"></a> `updatedAt`

</td>
<td>

`Date`

</td>
<td>

Timestamp when the entity was last updated.

This value is automatically updated whenever any property of the entity
changes, providing a way to track the recency of data and implement
optimistic concurrency control.

</td>
<td>

[lib/crud/interfaces/model.interface.ts:74](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/crud/interfaces/model.interface.ts#L74)

</td>
</tr>
<tr>
<td>

<a id="updatedby"></a> `updatedBy`

</td>
<td>

`null` | [`UserInfo`](../index/README.md#userinfo)

</td>
<td>

Detailed information about the user who last updated this entity.

Contains essential identifying information about the last user to modify
the record. Used primarily for display in audit logs and history views.

**See**

[UserInfo](../index/README.md#userinfo) Interface for user reference information

</td>
<td>

[lib/crud/interfaces/model.interface.ts:120](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/crud/interfaces/model.interface.ts#L120)

</td>
</tr>
<tr>
<td>

<a id="updatedbyid"></a> `updatedById`

</td>
<td>

`null` | [`EntityId`](#entityid)

</td>
<td>

ID of the user who last updated this entity.

Tracks which user most recently modified any property of this entity.
Essential for audit trails and accountability in multi-user systems.

</td>
<td>

[lib/crud/interfaces/model.interface.ts:110](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/crud/interfaces/model.interface.ts#L110)

</td>
</tr>
</tbody>
</table>

---

### ModelExtension

Defined in: [lib/crud/interfaces/model.interface.ts:141](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/crud/interfaces/model.interface.ts#L141)

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

<a id="id-1"></a> `id`

</td>
<td>

[`EntityId`](#entityid)

</td>
<td>

[lib/crud/interfaces/model.interface.ts:142](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/crud/interfaces/model.interface.ts#L142)

</td>
</tr>
</tbody>
</table>

---

### PaginatedResponse\<T>

Defined in: [lib/crud/interfaces/response.interfaces.ts:56](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/crud/interfaces/response.interfaces.ts#L56)

Interface for standardized paginated API responses.

The `PaginatedResponse<T>` interface defines a consistent structure for returning
paginated data from API endpoints. It extends the `Pagination` interface to include
the pagination parameters that were applied, along with the result data and metadata
about the total number of records.

This interface is generic, with the type parameter `T` representing the type of
items contained in the response. This allows for strong typing of the response
data while maintaining a consistent envelope structure.

Key features:

- Contains the actual data items in the `data` array
- Includes the total row count for calculating total pages
- Preserves the pagination parameters used in the request
- Enables consistent handling of paginated data across the frontend

#### Example

```typescript
// In a controller
@Get()
async getUsers(
   @Pager() pagination?: Pagination,
): Promise<PaginatedResponse<UserDto>> {
  const { skip = 0, take = 10 } = pagination;

  const [users, rowCount] = await this.userService.findAndCount({
    skip,
    take
  });

  return {
    data: users,
    rowCount,
    skip,
    take
  };
}

// Response structure:
// {
//   "data": [{...}, {...}],
//   "rowCount": 42,
//   "skip": 0,
//   "take": 10
// }
```

#### See

[Pagination](#pagination) The base interface for pagination parameters

#### Extends

- [`Pagination`](#pagination)

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

The type of items contained in the response data array

</td>
</tr>
</tbody>
</table>

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Description</th>
<th>Inherited from</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="data"></a> `data`

</td>
<td>

`T`\[]

</td>
<td>

Array containing the paginated data items.

This property holds the actual data requested by the client, limited
by the pagination parameters. The type of items in this array is
determined by the generic type parameter `T`.

**Example**

```ts
data: [
  { id: 1, name: "John" },
  { id: 2, name: "Jane" },
];
```

</td>
<td>

‐

</td>
<td>

[lib/crud/interfaces/response.interfaces.ts:67](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/crud/interfaces/response.interfaces.ts#L67)

</td>
</tr>
<tr>
<td>

<a id="rowcount"></a> `rowCount`

</td>
<td>

`number`

</td>
<td>

The total number of records available across all pages.

This value represents the total count of records that match the query
criteria before pagination was applied. It's essential for calculating
the total number of pages and implementing pagination controls in user
interfaces.

**Example**

```ts
rowCount: 42; // There are 42 total records matching the criteria
```

</td>
<td>

‐

</td>
<td>

[lib/crud/interfaces/response.interfaces.ts:80](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/crud/interfaces/response.interfaces.ts#L80)

</td>
</tr>
<tr>
<td>

<a id="skip"></a> `skip?`

</td>
<td>

`number`

</td>
<td>

Number of records to skip before beginning to return results.

This is equivalent to the SQL OFFSET parameter and determines
the starting point in the result set. The first record has an
offset of 0.

**Example**

```ts
skip: 10; // Skip the first 10 records
```

</td>
<td>

[`Pagination`](#pagination).[`skip`](#skip-1)

</td>
<td>

[lib/crud/interfaces/pagination.interface.ts:53](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/crud/interfaces/pagination.interface.ts#L53)

</td>
</tr>
<tr>
<td>

<a id="take"></a> `take?`

</td>
<td>

`number`

</td>
<td>

Maximum number of records to return in the result set.

This is equivalent to the SQL LIMIT parameter and controls
how many records will be included in the response. It's recommended
to set reasonable limits to prevent performance issues.

**Example**

```ts
take: 25; // Return at most 25 records
```

</td>
<td>

[`Pagination`](#pagination).[`take`](#take-1)

</td>
<td>

[lib/crud/interfaces/pagination.interface.ts:65](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/crud/interfaces/pagination.interface.ts#L65)

</td>
</tr>
</tbody>
</table>

---

### Pagination

Defined in: [lib/crud/interfaces/pagination.interface.ts:42](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/crud/interfaces/pagination.interface.ts#L42)

Interface for standardized pagination parameters across the application.

The `Pagination` interface provides a consistent way to handle pagination
throughout API endpoints and database queries. It follows the offset-based
pagination pattern with two primary parameters:

- `skip`: Number of records to skip (offset)
- `take`: Maximum number of records to return (limit)

This interface is designed to be simple yet flexible, allowing for easy
implementation in various contexts such as REST API controllers, GraphQL
resolvers, and database repository methods.

Both parameters are optional to allow for different pagination scenarios:

- Providing both `skip` and `take` enables standard pagination
- Providing only `take` returns the first N records
- Providing only `skip` skips N records but returns all remaining
- Providing neither returns all records (use with caution)

#### Remarks

When implementing pagination in endpoints, consider adding validation to prevent
excessive page sizes that could impact performance. A typical approach is to
cap the maximum `take` value and provide sensible defaults.

#### Example

```typescript
// In a controller or service
async getUsers(pagination: Pagination): Promise<User[]> {
  const { skip = 0, take = 10 } = pagination;
  return this.userRepository.find({
    skip,
    take,
    order: { createdAt: 'DESC' }
  });
}

// API usage
// GET /users?skip=20&take=10 - Returns records 21-30
```

#### Extended by

- [`PaginatedResponse`](#paginatedresponse)

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

<a id="skip-1"></a> `skip?`

</td>
<td>

`number`

</td>
<td>

Number of records to skip before beginning to return results.

This is equivalent to the SQL OFFSET parameter and determines
the starting point in the result set. The first record has an
offset of 0.

**Example**

```ts
skip: 10; // Skip the first 10 records
```

</td>
<td>

[lib/crud/interfaces/pagination.interface.ts:53](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/crud/interfaces/pagination.interface.ts#L53)

</td>
</tr>
<tr>
<td>

<a id="take-1"></a> `take?`

</td>
<td>

`number`

</td>
<td>

Maximum number of records to return in the result set.

This is equivalent to the SQL LIMIT parameter and controls
how many records will be included in the response. It's recommended
to set reasonable limits to prevent performance issues.

**Example**

```ts
take: 25; // Return at most 25 records
```

</td>
<td>

[lib/crud/interfaces/pagination.interface.ts:65](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/crud/interfaces/pagination.interface.ts#L65)

</td>
</tr>
</tbody>
</table>

## Type Aliases

### EntityDeepPartial\<T>

```ts
type EntityDeepPartial<T> = T extends infer _U[] ? never : T extends Date ? never : T extends object ? { [P in keyof T]?: EntityPropertyDeepPartial<T[P]> } : never;
```

Defined in: [lib/crud/types/types.ts:88](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/crud/types/types.ts#L88)

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

### EntityId

```ts
type EntityId = string & object;
```

Defined in: [lib/crud/types/types.ts:9](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/crud/types/types.ts#L9)

Entity ID type

This type represents a UUID used as an entity identifier in the database.
It is used for all entity IDs in the application.

#### Type declaration

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

[lib/crud/types/types.ts:9](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/crud/types/types.ts#L9)

</td>
</tr>
</tbody>
</table>

---

### EntityPropertyDeepPartial\<T>

```ts
type EntityPropertyDeepPartial<T> = {
  [P in keyof T]?:
    | EntityPropertyDeepPartial<T[P]>
    | EntityPropertyDeepPartial<T[P]>[];
};
```

Defined in: [lib/crud/types/types.ts:84](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/crud/types/types.ts#L84)

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

### PartialWithId\<T>

```ts
type PartialWithId<T> = Partial<T> & object;
```

Defined in: [lib/crud/types/types.ts:11](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/crud/types/types.ts#L11)

#### Type declaration

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

`id`

</td>
<td>

[`EntityId`](#entityid) | `number`

</td>
<td>

[lib/crud/types/types.ts:11](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/crud/types/types.ts#L11)

</td>
</tr>
</tbody>
</table>

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

### QueryDeepPartial\<T>

```ts
type QueryDeepPartial<T> = {
  [P in keyof T]?: T[P] extends Date
    ? never
    : T[P] extends (infer U)[]
      ? U extends object
        ? never
        : NonNullable<T[P]>
      : T[P] extends object
        ? QueryDeepPartial<T[P]>
        :
            | NonNullable<T[P]>
            | (T[P] extends object ? never : NonNullable<T[P]>[]);
};
```

Defined in: [lib/crud/types/types.ts:98](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/crud/types/types.ts#L98)

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
</tbody>
</table>

---

### QuerySafeDeepPartial\<T>

```ts
type QuerySafeDeepPartial<T> = T extends any[]
  ? never
  : T extends object
    ? {
        [P in keyof T]?: T[P] extends (infer _U)[]
          ? never
          : T[P] extends Date
            ? never
            : T[P] extends object
              ? QuerySafeDeepPartial<T[P]>
              : T[P];
      }
    : T;
```

Defined in: [lib/crud/types/types.ts:66](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/crud/types/types.ts#L66)

A specialized deep partial type designed for safe usage in database queries.

`QuerySafeDeepPartial<T>` is similar to `DeepPartial<T>` but adds additional
safety constraints specifically for ORM query operations. It explicitly excludes
arrays and Date objects, which can often cause issues in query conditions if not
properly handled.

Key differences from standard `DeepPartial<T>`:

1. Arrays are completely excluded (converted to `never`)
   - Prevents complex array comparison issues in where clauses
   - Avoids performance problems with array-based filters

2. Date objects are completely excluded (converted to `never`)
   - Prevents timezone and format inconsistencies
   - Forces explicit date handling with appropriate conversions

3. Only handles plain objects and primitive values
   - No support for Maps or Sets (unlike DeepPartial)
   - Simpler structure maps directly to most query systems

This type is particularly useful when working with ORM query builders, repository
patterns, and other database access layers where partial objects are used for
filtering or update operations.

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

The type to transform into a query-safe deep partial

</td>
</tr>
</tbody>
</table>

#### Example

```typescript
interface Product {
  id: string;
  name: string;
  price: number;
  tags: string[];
  createdAt: Date;
  metadata: {
    featured: boolean;
    stock: number;
  };
}

// These are valid QuerySafeDeepPartial<Product>
const filter1: QuerySafeDeepPartial<Product> = { name: "Product" };
const filter2: QuerySafeDeepPartial<Product> = { metadata: { featured: true } };

// These would NOT be allowed (would be type errors)
// const filter3: QuerySafeDeepPartial<Product> = { tags: ['tag1'] }; // Array - not allowed
// const filter4: QuerySafeDeepPartial<Product> = { createdAt: new Date() }; // Date - not allowed
```

#### See

Related to TypeORM's `QueryDeepPartialEntity` which has similar safety features
