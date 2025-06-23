[**@hichchi/nest-connector**](../README.md)

---

[@hichchi/nest-connector](../README.md) / crud

# crud

## Interfaces

### Model

Defined in: [lib/crud/interfaces/entity.interface.ts:5](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-connector/src/lib/crud/interfaces/entity.interface.ts#L5)

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

<a id="createdat"></a> `createdAt`

</td>
<td>

`Date`

</td>
<td>

[lib/crud/interfaces/entity.interface.ts:7](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-connector/src/lib/crud/interfaces/entity.interface.ts#L7)

</td>
</tr>
<tr>
<td>

<a id="createdby"></a> `createdBy?`

</td>
<td>

`null` \| [`UserInfo`](../index/README.md#userinfo)

</td>
<td>

[lib/crud/interfaces/entity.interface.ts:11](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-connector/src/lib/crud/interfaces/entity.interface.ts#L11)

</td>
</tr>
<tr>
<td>

<a id="createdbyid"></a> `createdById?`

</td>
<td>

`null` \| `string`

</td>
<td>

[lib/crud/interfaces/entity.interface.ts:10](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-connector/src/lib/crud/interfaces/entity.interface.ts#L10)

</td>
</tr>
<tr>
<td>

<a id="deletedat"></a> `deletedAt?`

</td>
<td>

`null` \| `Date`

</td>
<td>

[lib/crud/interfaces/entity.interface.ts:9](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-connector/src/lib/crud/interfaces/entity.interface.ts#L9)

</td>
</tr>
<tr>
<td>

<a id="deletedby"></a> `deletedBy?`

</td>
<td>

`null` \| [`UserInfo`](../index/README.md#userinfo)

</td>
<td>

[lib/crud/interfaces/entity.interface.ts:15](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-connector/src/lib/crud/interfaces/entity.interface.ts#L15)

</td>
</tr>
<tr>
<td>

<a id="deletedbyid"></a> `deletedById?`

</td>
<td>

`null` \| `string`

</td>
<td>

[lib/crud/interfaces/entity.interface.ts:14](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-connector/src/lib/crud/interfaces/entity.interface.ts#L14)

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

[lib/crud/interfaces/entity.interface.ts:6](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-connector/src/lib/crud/interfaces/entity.interface.ts#L6)

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

[lib/crud/interfaces/entity.interface.ts:8](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-connector/src/lib/crud/interfaces/entity.interface.ts#L8)

</td>
</tr>
<tr>
<td>

<a id="updatedby"></a> `updatedBy?`

</td>
<td>

`null` \| [`UserInfo`](../index/README.md#userinfo)

</td>
<td>

[lib/crud/interfaces/entity.interface.ts:13](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-connector/src/lib/crud/interfaces/entity.interface.ts#L13)

</td>
</tr>
<tr>
<td>

<a id="updatedbyid"></a> `updatedById?`

</td>
<td>

`null` \| `string`

</td>
<td>

[lib/crud/interfaces/entity.interface.ts:12](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-connector/src/lib/crud/interfaces/entity.interface.ts#L12)

</td>
</tr>
</tbody>
</table>

---

### ModelExtension

Defined in: [lib/crud/interfaces/entity.interface.ts:18](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-connector/src/lib/crud/interfaces/entity.interface.ts#L18)

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

[lib/crud/interfaces/entity.interface.ts:19](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-connector/src/lib/crud/interfaces/entity.interface.ts#L19)

</td>
</tr>
</tbody>
</table>

---

### PaginatedResponse\<T\>

Defined in: [lib/crud/interfaces/response.interfaces.ts:3](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-connector/src/lib/crud/interfaces/response.interfaces.ts#L3)

#### Extends

- [`Pagination`](#pagination)

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

<a id="data"></a> `data`

</td>
<td>

`T`[]

</td>
<td>

&hyphen;

</td>
<td>

[lib/crud/interfaces/response.interfaces.ts:4](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-connector/src/lib/crud/interfaces/response.interfaces.ts#L4)

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

&hyphen;

</td>
<td>

[lib/crud/interfaces/response.interfaces.ts:5](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-connector/src/lib/crud/interfaces/response.interfaces.ts#L5)

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

[`Pagination`](#pagination).[`skip`](#skip-1)

</td>
<td>

[lib/crud/interfaces/pagination.interface.ts:2](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-connector/src/lib/crud/interfaces/pagination.interface.ts#L2)

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

[`Pagination`](#pagination).[`take`](#take-1)

</td>
<td>

[lib/crud/interfaces/pagination.interface.ts:3](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-connector/src/lib/crud/interfaces/pagination.interface.ts#L3)

</td>
</tr>
</tbody>
</table>

---

### Pagination

Defined in: [lib/crud/interfaces/pagination.interface.ts:1](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-connector/src/lib/crud/interfaces/pagination.interface.ts#L1)

#### Extended by

- [`PaginatedResponse`](#paginatedresponse)

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

<a id="skip-1"></a> `skip?`

</td>
<td>

`number`

</td>
<td>

[lib/crud/interfaces/pagination.interface.ts:2](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-connector/src/lib/crud/interfaces/pagination.interface.ts#L2)

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

[lib/crud/interfaces/pagination.interface.ts:3](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-connector/src/lib/crud/interfaces/pagination.interface.ts#L3)

</td>
</tr>
</tbody>
</table>

## Type Aliases

### EntityId

```ts
type EntityId = string & object;
```

Defined in: [lib/crud/types/types.ts:9](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-connector/src/lib/crud/types/types.ts#L9)

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

[lib/crud/types/types.ts:9](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-connector/src/lib/crud/types/types.ts#L9)

</td>
</tr>
</tbody>
</table>

---

### PartialWithId\<T\>

```ts
type PartialWithId<T> = Partial<T> & object;
```

Defined in: [lib/crud/types/types.ts:11](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-connector/src/lib/crud/types/types.ts#L11)

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

[`EntityId`](#entityid) \| `number`

</td>
<td>

[lib/crud/types/types.ts:11](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-connector/src/lib/crud/types/types.ts#L11)

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
