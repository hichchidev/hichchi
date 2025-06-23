**@hichchi/nest-crud**

---

# nest-crud

This library was generated with [Nx](https://nx.dev).

## Building

Run `nx build nest-crud` to build the library.

## Running unit tests

Run `nx test nest-crud` to execute the unit tests via [Jest](https://jestjs.io).
This library was generated with [Nx](https://nx.dev).

## Building

Run `nx build nest-crud` to build the library.

## Running unit tests

Run `nx test nest-crud` to execute the unit tests via [Jest](https://jestjs.io).

## Enumerations

### Operation

Defined in: [libs/nest-crud/src/lib/enums/crud.enums.ts:8](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/enums/crud.enums.ts#L8)

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

<a id="create"></a> `CREATE`

</td>
<td>

`"CREATE"`

</td>
<td>

[libs/nest-crud/src/lib/enums/crud.enums.ts:9](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/enums/crud.enums.ts#L9)

</td>
</tr>
<tr>
<td>

<a id="delete"></a> `DELETE`

</td>
<td>

`"DELETE"`

</td>
<td>

[libs/nest-crud/src/lib/enums/crud.enums.ts:12](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/enums/crud.enums.ts#L12)

</td>
</tr>
<tr>
<td>

<a id="save"></a> `SAVE`

</td>
<td>

`"SAVE"`

</td>
<td>

[libs/nest-crud/src/lib/enums/crud.enums.ts:11](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/enums/crud.enums.ts#L11)

</td>
</tr>
<tr>
<td>

<a id="update"></a> `UPDATE`

</td>
<td>

`"UPDATE"`

</td>
<td>

[libs/nest-crud/src/lib/enums/crud.enums.ts:10](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/enums/crud.enums.ts#L10)

</td>
</tr>
</tbody>
</table>

---

### TypeORMErrorType

Defined in: [libs/nest-crud/src/lib/enums/crud.enums.ts:1](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/enums/crud.enums.ts#L1)

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

<a id="er_bad_field_error"></a> `ER_BAD_FIELD_ERROR`

</td>
<td>

`"ER_BAD_FIELD_ERROR"`

</td>
<td>

[libs/nest-crud/src/lib/enums/crud.enums.ts:5](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/enums/crud.enums.ts#L5)

</td>
</tr>
<tr>
<td>

<a id="er_dup_entry"></a> `ER_DUP_ENTRY`

</td>
<td>

`"ER_DUP_ENTRY"`

</td>
<td>

[libs/nest-crud/src/lib/enums/crud.enums.ts:3](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/enums/crud.enums.ts#L3)

</td>
</tr>
<tr>
<td>

<a id="er_no_default_for_field"></a> `ER_NO_DEFAULT_FOR_FIELD`

</td>
<td>

`"ER_NO_DEFAULT_FOR_FIELD"`

</td>
<td>

[libs/nest-crud/src/lib/enums/crud.enums.ts:2](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/enums/crud.enums.ts#L2)

</td>
</tr>
<tr>
<td>

<a id="er_no_referenced_row_2"></a> `ER_NO_REFERENCED_ROW_2`

</td>
<td>

`"ER_NO_REFERENCED_ROW_2"`

</td>
<td>

[libs/nest-crud/src/lib/enums/crud.enums.ts:4](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/enums/crud.enums.ts#L4)

</td>
</tr>
</tbody>
</table>

## Classes

### BaseEntity

Defined in: [libs/nest-crud/src/lib/base/base-entity.ts:7](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/base/base-entity.ts#L7)

#### Extended by

- [`HichchiUserEntity`](#hichchiuserentity)

#### Implements

- `Model`

#### Constructors

##### Constructor

```ts
new BaseEntity(): BaseEntity;
```

###### Returns

[`BaseEntity`](#baseentity)

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

[libs/nest-crud/src/lib/base/base-entity.ts:12](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/base/base-entity.ts#L12)

</td>
</tr>
<tr>
<td>

<a id="createdby"></a> `createdBy?`

</td>
<td>

`UserInfo`

</td>
<td>

[libs/nest-crud/src/lib/base/base-entity.ts:25](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/base/base-entity.ts#L25)

</td>
</tr>
<tr>
<td>

<a id="createdbyid"></a> `createdById?`

</td>
<td>

`EntityId`

</td>
<td>

[libs/nest-crud/src/lib/base/base-entity.ts:21](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/base/base-entity.ts#L21)

</td>
</tr>
<tr>
<td>

<a id="deletedat"></a> `deletedAt?`

</td>
<td>

`Date`

</td>
<td>

[libs/nest-crud/src/lib/base/base-entity.ts:18](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/base/base-entity.ts#L18)

</td>
</tr>
<tr>
<td>

<a id="deletedby"></a> `deletedBy?`

</td>
<td>

`UserInfo`

</td>
<td>

[libs/nest-crud/src/lib/base/base-entity.ts:39](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/base/base-entity.ts#L39)

</td>
</tr>
<tr>
<td>

<a id="deletedbyid"></a> `deletedById?`

</td>
<td>

`EntityId`

</td>
<td>

[libs/nest-crud/src/lib/base/base-entity.ts:35](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/base/base-entity.ts#L35)

</td>
</tr>
<tr>
<td>

<a id="id"></a> `id`

</td>
<td>

`EntityId`

</td>
<td>

[libs/nest-crud/src/lib/base/base-entity.ts:9](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/base/base-entity.ts#L9)

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

[libs/nest-crud/src/lib/base/base-entity.ts:15](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/base/base-entity.ts#L15)

</td>
</tr>
<tr>
<td>

<a id="updatedby"></a> `updatedBy?`

</td>
<td>

`UserInfo`

</td>
<td>

[libs/nest-crud/src/lib/base/base-entity.ts:32](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/base/base-entity.ts#L32)

</td>
</tr>
<tr>
<td>

<a id="updatedbyid"></a> `updatedById?`

</td>
<td>

`EntityId`

</td>
<td>

[libs/nest-crud/src/lib/base/base-entity.ts:28](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/base/base-entity.ts#L28)

</td>
</tr>
</tbody>
</table>

#### Methods

##### afterLoad()?

```ts
optional afterLoad(): void;
```

Defined in: [libs/nest-crud/src/lib/base/base-entity.ts:42](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/base/base-entity.ts#L42)

###### Returns

`void`

---

### BaseEntityExtension

Defined in: [libs/nest-crud/src/lib/base/base-entity-extension.ts:6](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/base/base-entity-extension.ts#L6)

#### Implements

- `ModelExtension`

#### Constructors

##### Constructor

```ts
new BaseEntityExtension(): BaseEntityExtension;
```

###### Returns

[`BaseEntityExtension`](#baseentityextension)

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

`EntityId`

</td>
<td>

[libs/nest-crud/src/lib/base/base-entity-extension.ts:8](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/base/base-entity-extension.ts#L8)

</td>
</tr>
</tbody>
</table>

---

### BaseRepository\<BaseEntity\>

Defined in: [libs/nest-crud/src/lib/base/base-repository.ts:54](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/base/base-repository.ts#L54)

Base Repository Class

This class extends TypeORM's Repository class and provides additional functionality
for working with entities. It includes enhanced methods for CRUD operations,
transaction management, and query building.

All repositories in the application should extend this class to inherit the common
functionality and maintain consistency in data access patterns.

#### Example

```TypeScript
@EntityRepository(UserEntity)
export class UserRepository extends BaseRepository<UserEntity> {
  // Custom methods specific to UserEntity
  async findByEmail(email: string): Promise<UserEntity | null> {
    return this.getOne({ where: { email } });
  }
}
```

#### Extends

- [`Repository`](#repository-1)\<`BaseEntity`\>

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

`BaseEntity` _extends_ `Model` \| `ModelExtension`

</td>
<td>

The entity type this repository manages, must extend IBaseEntity

</td>
</tr>
</tbody>
</table>

#### Constructors

##### Constructor

```ts
new BaseRepository<BaseEntity>(repository): BaseRepository<BaseEntity>;
```

Defined in: [libs/nest-crud/src/lib/base/base-repository.ts:67](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/base/base-repository.ts#L67)

Constructor for the BaseRepository

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

`repository`

</td>
<td>

[`Repository`](#repository-1)\<`BaseEntity`\>

</td>
<td>

The TypeORM repository to extend

</td>
</tr>
</tbody>
</table>

###### Returns

[`BaseRepository`](#baserepository)\<`BaseEntity`\>

###### Overrides

[`Repository`](#repository-1).[`constructor`](#constructor-8)

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

<a id="manager"></a> `manager`

</td>
<td>

`readonly`

</td>
<td>

`EntityManager`

</td>
<td>

Entity Manager used by this repository.

</td>
<td>

[`Repository`](#repository-1).[`manager`](#manager-1)

</td>
<td>

node_modules/typeorm/repository/Repository.d.ts:32

</td>
</tr>
<tr>
<td>

<a id="queryrunner"></a> `queryRunner?`

</td>
<td>

`readonly`

</td>
<td>

`QueryRunner`

</td>
<td>

Query runner provider used for this repository.

</td>
<td>

[`Repository`](#repository-1).[`queryRunner`](#queryrunner-1)

</td>
<td>

node_modules/typeorm/repository/Repository.d.ts:36

</td>
</tr>
<tr>
<td>

<a id="target"></a> `target`

</td>
<td>

`readonly`

</td>
<td>

`EntityTarget`\<`BaseEntity`\>

</td>
<td>

Entity target that is managed by this repository.
If this repository manages entity from schema,
then it returns a name of that schema instead.

</td>
<td>

[`Repository`](#repository-1).[`target`](#target-1)

</td>
<td>

node_modules/typeorm/repository/Repository.d.ts:28

</td>
</tr>
</tbody>
</table>

#### Accessors

##### entityRepository

###### Get Signature

```ts
get entityRepository(): Repository<BaseEntity>;
```

Defined in: [libs/nest-crud/src/lib/base/base-repository.ts:80](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/base/base-repository.ts#L80)

Get the appropriate repository instance for the current context

This getter returns a repository that uses the transaction manager if one exists,
or the default manager otherwise. This ensures that all operations within a
transaction use the same manager.

###### Returns

[`Repository`](#repository-1)\<`BaseEntity`\>

The repository instance

##### metadata

###### Get Signature

```ts
get metadata(): EntityMetadata;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:40

Entity metadata of the entity current repository manages.

###### Returns

`EntityMetadata`

###### Inherited from

[`Repository`](#repository-1).[`metadata`](#metadata-1)

#### Methods

##### average()

```ts
average(columnName, where?): Promise<null | number>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:245

Return the AVG of a column

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

`columnName`

</td>
<td>

`PickKeysByType`\<`BaseEntity`, `number`\>

</td>
</tr>
<tr>
<td>

`where?`

</td>
<td>

`FindOptionsWhere`\<`BaseEntity`\> \| `FindOptionsWhere`\<`BaseEntity`\>[]

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`null` \| `number`\>

###### Inherited from

[`Repository`](#repository-1).[`average`](#average-2)

##### clear()

```ts
clear(): Promise<void>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:337

Clears all the data from the given table/collection (truncates/drops it).

Note: this method uses TRUNCATE and may not work as you expect in transactions on some platforms.

###### Returns

`Promise`\<`void`\>

###### See

https://stackoverflow.com/a/5972738/925151

###### Inherited from

[`Repository`](#repository-1).[`clear`](#clear-2)

##### count()

```ts
count(options?): Promise<number>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:232

Counts entities that match given options.
Useful for pagination.

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

`FindManyOptions`\<`BaseEntity`\>

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`number`\>

###### Inherited from

[`Repository`](#repository-1).[`count`](#count-4)

##### countBy()

```ts
countBy(where): Promise<number>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:237

Counts entities that match given conditions.
Useful for pagination.

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

`where`

</td>
<td>

`FindOptionsWhere`\<`BaseEntity`\> \| `FindOptionsWhere`\<`BaseEntity`\>[]

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`number`\>

###### Inherited from

[`Repository`](#repository-1).[`countBy`](#countby-2)

##### countMany()

```ts
countMany(options?): Promise<number>;
```

Defined in: [libs/nest-crud/src/lib/base/base-repository.ts:528](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/base/base-repository.ts#L528)

Count entities matching the specified criteria

This method counts the number of entities that match the provided criteria.

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

[`GetManyOptions`](#getmanyoptions-1)\<`BaseEntity`\>

</td>
<td>

Options for the query

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`number`\>

The count of matching entities

###### Example

```TypeScript
const count = await userRepository.countMany({
  where: { role: 'user', isActive: true }
});
```

##### create()

Implementation of the create method

This is the actual implementation that handles all the overloads.

###### Template

The type of the entity data

###### Param

The data to create entities with

###### Call Signature

```ts
create(): BaseEntity;
```

Defined in: [libs/nest-crud/src/lib/base/base-repository.ts:98](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/base/base-repository.ts#L98)

Create a new entity instance

This overload creates an empty entity instance with default values.

###### Returns

`BaseEntity`

A new entity instance

###### Example

```TypeScript
const user = userRepository.create();
user.firstName = 'John';
user.lastName = 'Doe';
```

###### Overrides

[`Repository`](#repository-1).[`create`](#create-7)

###### Call Signature

```ts
create<T>(entityLike): BaseEntity;
```

Defined in: [libs/nest-crud/src/lib/base/base-repository.ts:118](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/base/base-repository.ts#L118)

Create a new entity instance with the provided data

This overload creates an entity instance populated with the provided data.

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

`T` _extends_
\| `Model`
\| `ModelExtension`
\| \{
`createdAt?`: `DeepPartial`\<`Date`\>;
`createdBy?`: `DeepPartial`\<`undefined` \| `null` \| `UserInfo`\>;
`createdById?`: `DeepPartial`\<`undefined` \| `null` \| `string`\>;
`deletedAt?`: `DeepPartial`\<`undefined` \| `null` \| `Date`\>;
`deletedBy?`: `DeepPartial`\<`undefined` \| `null` \| `UserInfo`\>;
`deletedById?`: `DeepPartial`\<`undefined` \| `null` \| `string`\>;
`id?`: `DeepPartial`\<`EntityId`\>;
`updatedAt?`: `DeepPartial`\<`Date`\>;
`updatedBy?`: `DeepPartial`\<`undefined` \| `null` \| `UserInfo`\>;
`updatedById?`: `DeepPartial`\<`undefined` \| `null` \| `string`\>;
\}
\| \{
`id?`: `DeepPartial`\<`EntityId`\>;
\}

</td>
<td>

The type of the entity data

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

`entityLike`

</td>
<td>

`T`

</td>
<td>

The data to populate the entity with

</td>
</tr>
</tbody>
</table>

###### Returns

`BaseEntity`

A new entity instance

###### Example

```TypeScript
const user = userRepository.create({
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com'
});
```

###### Overrides

[`Repository`](#repository-1).[`create`](#create-7)

###### Call Signature

```ts
create<T>(entityLikeArray): BaseEntity[];
```

Defined in: [libs/nest-crud/src/lib/base/base-repository.ts:137](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/base/base-repository.ts#L137)

Create multiple entity instances

This overload creates multiple entity instances from an array of data.

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

`T` _extends_
\| `Model`
\| `ModelExtension`
\| \{
`createdAt?`: `DeepPartial`\<`Date`\>;
`createdBy?`: `DeepPartial`\<`undefined` \| `null` \| `UserInfo`\>;
`createdById?`: `DeepPartial`\<`undefined` \| `null` \| `string`\>;
`deletedAt?`: `DeepPartial`\<`undefined` \| `null` \| `Date`\>;
`deletedBy?`: `DeepPartial`\<`undefined` \| `null` \| `UserInfo`\>;
`deletedById?`: `DeepPartial`\<`undefined` \| `null` \| `string`\>;
`id?`: `DeepPartial`\<`EntityId`\>;
`updatedAt?`: `DeepPartial`\<`Date`\>;
`updatedBy?`: `DeepPartial`\<`undefined` \| `null` \| `UserInfo`\>;
`updatedById?`: `DeepPartial`\<`undefined` \| `null` \| `string`\>;
\}
\| \{
`id?`: `DeepPartial`\<`EntityId`\>;
\}

</td>
<td>

The type of the entity data

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

`entityLikeArray`

</td>
<td>

`T`[]

</td>
<td>

Array of data to create entities with

</td>
</tr>
</tbody>
</table>

###### Returns

`BaseEntity`[]

Array of new entity instances

###### Example

```TypeScript
const users = userRepository.create([
  { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' },
  { firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com' }
]);
```

###### Overrides

[`Repository`](#repository-1).[`create`](#create-7)

##### createQueryBuilder()

```ts
createQueryBuilder(alias?, queryRunner?): SelectQueryBuilder<BaseEntity>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:45

Creates a new query builder that can be used to build a SQL query.

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

`alias?`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`queryRunner?`

</td>
<td>

`QueryRunner`

</td>
</tr>
</tbody>
</table>

###### Returns

`SelectQueryBuilder`\<`BaseEntity`\>

###### Inherited from

[`Repository`](#repository-1).[`createQueryBuilder`](#createquerybuilder-2)

##### decrement()

```ts
decrement(
   conditions,
   propertyPath,
value): Promise<UpdateResult>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:345

Decrements some column by provided value of the entities matched given conditions.

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

`conditions`

</td>
<td>

`FindOptionsWhere`\<`Entity`\>

</td>
</tr>
<tr>
<td>

`propertyPath`

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

`string` \| `number`

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`UpdateResult`\>

###### Inherited from

[`Repository`](#repository-1).[`decrement`](#decrement-2)

##### delete()

```ts
delete(id): Promise<DeleteResult>;
```

Defined in: [libs/nest-crud/src/lib/base/base-repository.ts:455](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/base/base-repository.ts#L455)

Soft delete an entity by ID

This method marks an entity as deleted without actually removing it from the database.
It sets the deletedAt timestamp to the current time.

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

`id`

</td>
<td>

`EntityId`

</td>
<td>

The ID of the entity to delete

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`DeleteResult`\>

The result of the delete operation

###### Example

```TypeScript
const result = await userRepository.delete('user-id');
```

###### Overrides

[`Repository`](#repository-1).[`delete`](#delete-6)

##### deleteAll()

```ts
deleteAll(): Promise<DeleteResult>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:197

Deletes all entities of target type.
This is a primitive operation without cascades, relations or other operations included.
Executes fast and efficient DELETE query without WHERE clause.

WARNING! This method deletes ALL rows in the target table.

###### Returns

`Promise`\<`DeleteResult`\>

###### Inherited from

[`Repository`](#repository-1).[`deleteAll`](#deleteall-2)

##### deleteByIds()

```ts
deleteByIds(ids): Promise<DeleteResult>;
```

Defined in: [libs/nest-crud/src/lib/base/base-repository.ts:473](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/base/base-repository.ts#L473)

Soft delete multiple entities by their IDs

This method marks multiple entities as deleted without actually removing them from the database.
It sets the deletedAt timestamp to the current time for all entities with IDs in the provided array.

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

`ids`

</td>
<td>

`EntityId`[]

</td>
<td>

Array of entity IDs to delete

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`DeleteResult`\>

The result of the delete operation

###### Example

```TypeScript
const result = await userRepository.deleteByIds(['user-id-1', 'user-id-2']);
```

##### ~~exist()~~

```ts
exist(options?): Promise<boolean>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:219

Checks whether any entity exists that matches the given options.

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

`FindManyOptions`\<`BaseEntity`\>

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`boolean`\>

###### Deprecated

use `exists` method instead, for example:

.exists()

###### Inherited from

[`Repository`](#repository-1).[`exist`](#exist-2)

##### exists()

```ts
exists(options?): Promise<boolean>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:223

Checks whether any entity exists that matches the given options.

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

`FindManyOptions`\<`BaseEntity`\>

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`boolean`\>

###### Inherited from

[`Repository`](#repository-1).[`exists`](#exists-2)

##### existsBy()

```ts
existsBy(where): Promise<boolean>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:227

Checks whether any entity exists that matches the given conditions.

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

`where`

</td>
<td>

`FindOptionsWhere`\<`BaseEntity`\> \| `FindOptionsWhere`\<`BaseEntity`\>[]

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`boolean`\>

###### Inherited from

[`Repository`](#repository-1).[`existsBy`](#existsby-2)

##### extend()

```ts
extend<CustomRepository>(customs): BaseRepository<BaseEntity> & CustomRepository;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:349

Extends repository with provided functions.

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

`CustomRepository`

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

`customs`

</td>
<td>

`CustomRepository` & `ThisType`\<[`BaseRepository`](#baserepository)\<`BaseEntity`\> & `CustomRepository`\>

</td>
</tr>
</tbody>
</table>

###### Returns

[`BaseRepository`](#baserepository)\<`BaseEntity`\> & `CustomRepository`

###### Inherited from

[`Repository`](#repository-1).[`extend`](#extend-2)

##### find()

```ts
find(options?): Promise<BaseEntity[]>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:257

Finds entities that match given find options.

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

`FindManyOptions`\<`BaseEntity`\>

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`BaseEntity`[]\>

###### Inherited from

[`Repository`](#repository-1).[`find`](#find-2)

##### findAndCount()

```ts
findAndCount(options?): Promise<[BaseEntity[], number]>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:267

Finds entities that match given find options.
Also counts all entities that match given conditions,
but ignores pagination settings (from and take options).

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

`FindManyOptions`\<`BaseEntity`\>

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<\[`BaseEntity`[], `number`\]\>

###### Inherited from

[`Repository`](#repository-1).[`findAndCount`](#findandcount-2)

##### findAndCountBy()

```ts
findAndCountBy(where): Promise<[BaseEntity[], number]>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:273

Finds entities that match given WHERE conditions.
Also counts all entities that match given conditions,
but ignores pagination settings (from and take options).

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

`where`

</td>
<td>

`FindOptionsWhere`\<`BaseEntity`\> \| `FindOptionsWhere`\<`BaseEntity`\>[]

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<\[`BaseEntity`[], `number`\]\>

###### Inherited from

[`Repository`](#repository-1).[`findAndCountBy`](#findandcountby-2)

##### findBy()

```ts
findBy(where): Promise<BaseEntity[]>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:261

Finds entities that match given find options.

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

`where`

</td>
<td>

`FindOptionsWhere`\<`BaseEntity`\> \| `FindOptionsWhere`\<`BaseEntity`\>[]

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`BaseEntity`[]\>

###### Inherited from

[`Repository`](#repository-1).[`findBy`](#findby-2)

##### ~~findByIds()~~

```ts
findByIds(ids): Promise<BaseEntity[]>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:284

Finds entities with ids.
Optionally find options or conditions can be applied.

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

`ids`

</td>
<td>

`any`[]

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`BaseEntity`[]\>

###### Deprecated

use `findBy` method instead in conjunction with `In` operator, for example:

.findBy({
id: In([1, 2, 3])
})

###### Inherited from

[`Repository`](#repository-1).[`findByIds`](#findbyids-2)

##### findOne()

```ts
findOne(options): Promise<null | BaseEntity>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:289

Finds first entity by a given find options.
If entity was not found in the database - returns null.

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

`FindOneOptions`\<`BaseEntity`\>

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`null` \| `BaseEntity`\>

###### Inherited from

[`Repository`](#repository-1).[`findOne`](#findone-2)

##### findOneBy()

```ts
findOneBy(where): Promise<null | BaseEntity>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:294

Finds first entity that matches given where condition.
If entity was not found in the database - returns null.

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

`where`

</td>
<td>

`FindOptionsWhere`\<`BaseEntity`\> \| `FindOptionsWhere`\<`BaseEntity`\>[]

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`null` \| `BaseEntity`\>

###### Inherited from

[`Repository`](#repository-1).[`findOneBy`](#findoneby-2)

##### ~~findOneById()~~

```ts
findOneById(id): Promise<null | BaseEntity>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:305

Finds first entity that matches given id.
If entity was not found in the database - returns null.

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

`id`

</td>
<td>

`string` \| `number` \| `Date` \| `ObjectId`

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`null` \| `BaseEntity`\>

###### Deprecated

use `findOneBy` method instead in conjunction with `In` operator, for example:

.findOneBy({
id: 1 // where "id" is your primary column name
})

###### Inherited from

[`Repository`](#repository-1).[`findOneById`](#findonebyid-2)

##### findOneByOrFail()

```ts
findOneByOrFail(where): Promise<BaseEntity>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:315

Finds first entity that matches given where condition.
If entity was not found in the database - rejects with error.

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

`where`

</td>
<td>

`FindOptionsWhere`\<`BaseEntity`\> \| `FindOptionsWhere`\<`BaseEntity`\>[]

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`BaseEntity`\>

###### Inherited from

[`Repository`](#repository-1).[`findOneByOrFail`](#findonebyorfail-2)

##### findOneOrFail()

```ts
findOneOrFail(options): Promise<BaseEntity>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:310

Finds first entity by a given find options.
If entity was not found in the database - rejects with error.

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

`FindOneOptions`\<`BaseEntity`\>

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`BaseEntity`\>

###### Inherited from

[`Repository`](#repository-1).[`findOneOrFail`](#findoneorfail-2)

##### generateOptions()

```ts
generateOptions(getOptions): FindOneOptions<BaseEntity>;
```

Defined in: [libs/nest-crud/src/lib/base/base-repository.ts:574](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/base/base-repository.ts#L574)

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

`getOptions`

</td>
<td>

[`GetOptions`](#getoptions)\<`BaseEntity`\>

</td>
</tr>
</tbody>
</table>

###### Returns

`FindOneOptions`\<`BaseEntity`\>

##### get()

```ts
get(id, options?): Promise<null | BaseEntity>;
```

Defined in: [libs/nest-crud/src/lib/base/base-repository.ts:360](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/base/base-repository.ts#L360)

Get an entity by ID

This method retrieves an entity with the specified ID from the database.
It can include relations and other options for the query.

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

`id`

</td>
<td>

`EntityId`

</td>
<td>

The ID of the entity to retrieve

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

[`GetByIdOptions`](#getbyidoptions)\<`BaseEntity`\>

</td>
<td>

Options for the query

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`null` \| `BaseEntity`\>

The entity if found, null otherwise

###### Example

```TypeScript
const user = await userRepository.get('user-id', {
  relations: ['posts', 'profile']
});
```

##### getByIds()

```ts
getByIds(getByIds): Promise<BaseEntity[]>;
```

Defined in: [libs/nest-crud/src/lib/base/base-repository.ts:385](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/base/base-repository.ts#L385)

Get multiple entities by their IDs

This method retrieves entities with IDs in the provided array from the database.
It can include relations, pagination, sorting, and other options for the query.

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

`getByIds`

</td>
<td>

[`GetByIdsOptions`](#getbyidsoptions)\<`BaseEntity`\>

</td>
<td>

Options for the query including IDs

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`BaseEntity`[]\>

Array of entities matching the IDs

###### Example

```TypeScript
const users = await userRepository.getByIds({
  ids: ['user-id-1', 'user-id-2', 'user-id-3'],
  relations: ['profile'],
  sort: { firstName: 'ASC' }
});
```

##### getId()

```ts
getId(entity): any;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:54

Gets entity mixed id.

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

`BaseEntity`

</td>
</tr>
</tbody>
</table>

###### Returns

`any`

###### Inherited from

[`Repository`](#repository-1).[`getId`](#getid-2)

##### getMany()

```ts
getMany(getMany): Promise<[BaseEntity[], number]>;
```

Defined in: [libs/nest-crud/src/lib/base/base-repository.ts:437](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/base/base-repository.ts#L437)

Get multiple entities matching the specified criteria

This method retrieves all entities that match the provided criteria.
It returns both the entities and the total count.

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

`getMany`

</td>
<td>

[`GetManyOptions`](#getmanyoptions-1)\<`BaseEntity`\>

</td>
<td>

Options for the query

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<\[`BaseEntity`[], `number`\]\>

Array of entities and total count

###### Example

```TypeScript
const [users, count] = await userRepository.getMany({
  where: { role: 'user' },
  relations: ['profile'],
  pagination: { skip: 0, take: 10 },
  sort: { createdAt: 'DESC' }
});
```

##### getOne()

```ts
getOne(getOne): Promise<null | BaseEntity>;
```

Defined in: [libs/nest-crud/src/lib/base/base-repository.ts:414](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/base/base-repository.ts#L414)

Get a single entity matching the specified criteria

This method retrieves the first entity that matches the provided criteria.

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

`getOne`

</td>
<td>

[`GetOneOptions`](#getoneoptions)\<`BaseEntity`\>

</td>
<td>

Options for the query

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`null` \| `BaseEntity`\>

The entity if found, null otherwise

###### Example

```TypeScript
const user = await userRepository.getOne({
  where: { email: 'john.doe@example.com' },
  relations: ['profile']
});
```

##### hardDelete()

```ts
hardDelete(id): Promise<DeleteResult>;
```

Defined in: [libs/nest-crud/src/lib/base/base-repository.ts:491](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/base/base-repository.ts#L491)

Permanently delete an entity by ID

This method permanently removes an entity from the database.
Unlike the delete method, this cannot be undone.

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

`id`

</td>
<td>

`EntityId`

</td>
<td>

The ID of the entity to delete

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`DeleteResult`\>

The result of the delete operation

###### Example

```TypeScript
const result = await userRepository.hardDelete('user-id');
```

##### hardDeleteByIds()

```ts
hardDeleteByIds(ids): Promise<DeleteResult>;
```

Defined in: [libs/nest-crud/src/lib/base/base-repository.ts:509](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/base/base-repository.ts#L509)

Permanently delete multiple entities by their IDs

This method permanently removes multiple entities from the database.
Unlike the deleteByIds method, this cannot be undone.

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

`ids`

</td>
<td>

`EntityId`[]

</td>
<td>

Array of entity IDs to delete

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`DeleteResult`\>

The result of the delete operation

###### Example

```TypeScript
const result = await userRepository.hardDeleteByIds(['user-id-1', 'user-id-2']);
```

##### hasId()

```ts
hasId(entity): boolean;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:50

Checks if entity has an id.
If entity composite compose ids, it will check them all.

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

`BaseEntity`

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean`

###### Inherited from

[`Repository`](#repository-1).[`hasId`](#hasid-2)

##### increment()

```ts
increment(
   conditions,
   propertyPath,
value): Promise<UpdateResult>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:341

Increments some column by provided value of the entities matched given conditions.

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

`conditions`

</td>
<td>

`FindOptionsWhere`\<`Entity`\>

</td>
</tr>
<tr>
<td>

`propertyPath`

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

`string` \| `number`

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`UpdateResult`\>

###### Inherited from

[`Repository`](#repository-1).[`increment`](#increment-2)

##### insert()

```ts
insert(entity): Promise<InsertResult>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:161

Inserts a given entity into the database.
Unlike save method executes a primitive operation without cascades, relations and other operations included.
Executes fast and efficient INSERT query.
Does not check if entity exist in the database, so query will fail if duplicate entity is being inserted.

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

\| `_QueryDeepPartialEntity`\<`ObjectLiteral` _extends_ `BaseEntity` ? `unknown` : `BaseEntity`\> \| `_QueryDeepPartialEntity`\<`ObjectLiteral` _extends_ `BaseEntity` ? `unknown` : `BaseEntity`\>[]

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`InsertResult`\>

###### Inherited from

[`Repository`](#repository-1).[`insert`](#insert-2)

##### isFindOperator()

```ts
isFindOperator<T>(value): value is FindOperator<T>;
```

Defined in: [libs/nest-crud/src/lib/base/base-repository.ts:620](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/base/base-repository.ts#L620)

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

`value`

</td>
<td>

`unknown`

</td>
</tr>
</tbody>
</table>

###### Returns

`value is FindOperator<T>`

##### mapWhere()

```ts
mapWhere<Entity>(
   where,
   data,
   operator?,
wrap?): FindOptionsWhere<Entity>;
```

Defined in: [libs/nest-crud/src/lib/base/base-repository.ts:624](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/base/base-repository.ts#L624)

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

`Entity`

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

`where`

</td>
<td>

`FindOptionsWhere`\<`Entity`\>

</td>
</tr>
<tr>
<td>

`data`

</td>
<td>

`FindOptionsWhere`\<`Entity`\>

</td>
</tr>
<tr>
<td>

`operator?`

</td>
<td>

\<`T`\>(`value`) => `FindOperator`\<`T`\>

</td>
</tr>
<tr>
<td>

`wrap?`

</td>
<td>

`` `${string}{}${string}` ``

</td>
</tr>
</tbody>
</table>

###### Returns

`FindOptionsWhere`\<`Entity`\>

##### maximum()

```ts
maximum(columnName, where?): Promise<null | number>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:253

Return the MAX of a column

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

`columnName`

</td>
<td>

`PickKeysByType`\<`BaseEntity`, `number`\>

</td>
</tr>
<tr>
<td>

`where?`

</td>
<td>

`FindOptionsWhere`\<`BaseEntity`\> \| `FindOptionsWhere`\<`BaseEntity`\>[]

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`null` \| `number`\>

###### Inherited from

[`Repository`](#repository-1).[`maximum`](#maximum-2)

##### merge()

```ts
merge(mergeIntoEntity, ...entityLikes): BaseEntity;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:72

Merges multiple entities (or entity-like objects) into a given entity.

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

`mergeIntoEntity`

</td>
<td>

`BaseEntity`

</td>
</tr>
<tr>
<td>

...`entityLikes`

</td>
<td>

`DeepPartial`\<`BaseEntity`\>[]

</td>
</tr>
</tbody>
</table>

###### Returns

`BaseEntity`

###### Inherited from

[`Repository`](#repository-1).[`merge`](#merge-2)

##### minimum()

```ts
minimum(columnName, where?): Promise<null | number>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:249

Return the MIN of a column

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

`columnName`

</td>
<td>

`PickKeysByType`\<`BaseEntity`, `number`\>

</td>
</tr>
<tr>
<td>

`where?`

</td>
<td>

`FindOptionsWhere`\<`BaseEntity`\> \| `FindOptionsWhere`\<`BaseEntity`\>[]

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`null` \| `number`\>

###### Inherited from

[`Repository`](#repository-1).[`minimum`](#minimum-2)

##### orWhere()

```ts
orWhere(
   where,
   search,
   operator): FindOptionsWhere<BaseEntity> | FindOptionsWhere<BaseEntity>[];
```

Defined in: [libs/nest-crud/src/lib/base/base-repository.ts:604](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/base/base-repository.ts#L604)

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

`where`

</td>
<td>

`FindOptionsWhere`\<`BaseEntity`\>

</td>
</tr>
<tr>
<td>

`search`

</td>
<td>

`FindOptionsWhere`\<`BaseEntity`\>

</td>
</tr>
<tr>
<td>

`operator`

</td>
<td>

\<`T`\>(`value`) => `FindOperator`\<`T`\>

</td>
</tr>
</tbody>
</table>

###### Returns

`FindOptionsWhere`\<`BaseEntity`\> \| `FindOptionsWhere`\<`BaseEntity`\>[]

##### preload()

```ts
preload(entityLike): Promise<undefined | BaseEntity>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:82

Creates a new entity from the given plain javascript object. If entity already exist in the database, then
it loads it (and everything related to it), replaces all values with the new ones from the given object
and returns this new entity. This new entity is actually a loaded from the db entity with all properties
replaced from the new object.

Note that given entity-like object must have an entity id / primary key to find entity by.
Returns undefined if entity with given id was not found.

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

`entityLike`

</td>
<td>

`DeepPartial`\<`BaseEntity`\>

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`undefined` \| `BaseEntity`\>

###### Inherited from

[`Repository`](#repository-1).[`preload`](#preload-2)

##### query()

```ts
query<T>(query, parameters?): Promise<T>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:322

Executes a raw SQL query and returns a raw database results.
Raw query execution is supported only by relational databases (MongoDB is not supported).

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
</tr>
</thead>
<tbody>
<tr>
<td>

`query`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`parameters?`

</td>
<td>

`any`[]

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`T`\>

###### See

[Official docs](https://typeorm.io/repository-api) for examples.

###### Inherited from

[`Repository`](#repository-1).[`query`](#query-2)

##### recover()

###### Call Signature

```ts
recover<T>(entities, options): Promise<T[]>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:138

Recovers all given entities in the database.

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

`T` _extends_
\| `Model`
\| `ModelExtension`
\| \{
`createdAt?`: `DeepPartial`\<`Date`\>;
`createdBy?`: `DeepPartial`\<`undefined` \| `null` \| `UserInfo`\>;
`createdById?`: `DeepPartial`\<`undefined` \| `null` \| `string`\>;
`deletedAt?`: `DeepPartial`\<`undefined` \| `null` \| `Date`\>;
`deletedBy?`: `DeepPartial`\<`undefined` \| `null` \| `UserInfo`\>;
`deletedById?`: `DeepPartial`\<`undefined` \| `null` \| `string`\>;
`id?`: `DeepPartial`\<`EntityId`\>;
`updatedAt?`: `DeepPartial`\<`Date`\>;
`updatedBy?`: `DeepPartial`\<`undefined` \| `null` \| `UserInfo`\>;
`updatedById?`: `DeepPartial`\<`undefined` \| `null` \| `string`\>;
\}
\| \{
`id?`: `DeepPartial`\<`EntityId`\>;
\}

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

`entities`

</td>
<td>

`T`[]

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

`SaveOptions` & `object`

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`T`[]\>

###### Inherited from

[`Repository`](#repository-1).[`recover`](#recover-5)

###### Call Signature

```ts
recover<T>(entities, options?): Promise<T & BaseEntity[]>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:144

Recovers all given entities in the database.

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

`T` _extends_
\| `Model`
\| `ModelExtension`
\| \{
`createdAt?`: `DeepPartial`\<`Date`\>;
`createdBy?`: `DeepPartial`\<`undefined` \| `null` \| `UserInfo`\>;
`createdById?`: `DeepPartial`\<`undefined` \| `null` \| `string`\>;
`deletedAt?`: `DeepPartial`\<`undefined` \| `null` \| `Date`\>;
`deletedBy?`: `DeepPartial`\<`undefined` \| `null` \| `UserInfo`\>;
`deletedById?`: `DeepPartial`\<`undefined` \| `null` \| `string`\>;
`id?`: `DeepPartial`\<`EntityId`\>;
`updatedAt?`: `DeepPartial`\<`Date`\>;
`updatedBy?`: `DeepPartial`\<`undefined` \| `null` \| `UserInfo`\>;
`updatedById?`: `DeepPartial`\<`undefined` \| `null` \| `string`\>;
\}
\| \{
`id?`: `DeepPartial`\<`EntityId`\>;
\}

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

`entities`

</td>
<td>

`T`[]

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

`SaveOptions`

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`T` & `BaseEntity`[]\>

###### Inherited from

[`Repository`](#repository-1).[`recover`](#recover-5)

###### Call Signature

```ts
recover<T>(entity, options): Promise<T>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:148

Recovers a given entity in the database.

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

`T` _extends_
\| `Model`
\| `ModelExtension`
\| \{
`createdAt?`: `DeepPartial`\<`Date`\>;
`createdBy?`: `DeepPartial`\<`undefined` \| `null` \| `UserInfo`\>;
`createdById?`: `DeepPartial`\<`undefined` \| `null` \| `string`\>;
`deletedAt?`: `DeepPartial`\<`undefined` \| `null` \| `Date`\>;
`deletedBy?`: `DeepPartial`\<`undefined` \| `null` \| `UserInfo`\>;
`deletedById?`: `DeepPartial`\<`undefined` \| `null` \| `string`\>;
`id?`: `DeepPartial`\<`EntityId`\>;
`updatedAt?`: `DeepPartial`\<`Date`\>;
`updatedBy?`: `DeepPartial`\<`undefined` \| `null` \| `UserInfo`\>;
`updatedById?`: `DeepPartial`\<`undefined` \| `null` \| `string`\>;
\}
\| \{
`id?`: `DeepPartial`\<`EntityId`\>;
\}

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

`entity`

</td>
<td>

`T`

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

`SaveOptions` & `object`

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`T`\>

###### Inherited from

[`Repository`](#repository-1).[`recover`](#recover-5)

###### Call Signature

```ts
recover<T>(entity, options?): Promise<T & BaseEntity>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:154

Recovers a given entity in the database.

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

`T` _extends_
\| `Model`
\| `ModelExtension`
\| \{
`createdAt?`: `DeepPartial`\<`Date`\>;
`createdBy?`: `DeepPartial`\<`undefined` \| `null` \| `UserInfo`\>;
`createdById?`: `DeepPartial`\<`undefined` \| `null` \| `string`\>;
`deletedAt?`: `DeepPartial`\<`undefined` \| `null` \| `Date`\>;
`deletedBy?`: `DeepPartial`\<`undefined` \| `null` \| `UserInfo`\>;
`deletedById?`: `DeepPartial`\<`undefined` \| `null` \| `string`\>;
`id?`: `DeepPartial`\<`EntityId`\>;
`updatedAt?`: `DeepPartial`\<`Date`\>;
`updatedBy?`: `DeepPartial`\<`undefined` \| `null` \| `UserInfo`\>;
`updatedById?`: `DeepPartial`\<`undefined` \| `null` \| `string`\>;
\}
\| \{
`id?`: `DeepPartial`\<`EntityId`\>;
\}

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

`entity`

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

`SaveOptions`

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`T` & `BaseEntity`\>

###### Inherited from

[`Repository`](#repository-1).[`recover`](#recover-5)

##### remove()

###### Call Signature

```ts
remove(entities, options?): Promise<BaseEntity[]>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:110

Removes a given entities from the database.

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

`entities`

</td>
<td>

`BaseEntity`[]

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

`RemoveOptions`

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`BaseEntity`[]\>

###### Inherited from

[`Repository`](#repository-1).[`remove`](#remove-3)

###### Call Signature

```ts
remove(entity, options?): Promise<BaseEntity>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:114

Removes a given entity from the database.

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

`BaseEntity`

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

`RemoveOptions`

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`BaseEntity`\>

###### Inherited from

[`Repository`](#repository-1).[`remove`](#remove-3)

##### restore()

```ts
restore(criteria): Promise<UpdateResult>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:211

Restores entities by a given criteria.
Unlike save method executes a primitive operation without cascades, relations and other operations included.
Executes fast and efficient UPDATE query.
Does not check if entity exist in the database.

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

`criteria`

</td>
<td>

\| `string` \| `number` \| `Date` \| `string`[] \| `ObjectId` \| `number`[] \| `Date`[] \| `ObjectId`[] \| `FindOptionsWhere`\<`BaseEntity`\> \| `FindOptionsWhere`\<`BaseEntity`\>[]

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`UpdateResult`\>

###### Inherited from

[`Repository`](#repository-1).[`restore`](#restore-2)

##### save()

```ts
save<T>(entityLike, options?): Promise<T & BaseEntity>;
```

Defined in: [libs/nest-crud/src/lib/base/base-repository.ts:171](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/base/base-repository.ts#L171)

Save an entity to the database

This method creates an entity from the provided data and saves it to the database.

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

`T` _extends_
\| `Model`
\| `ModelExtension`
\| \{
`createdAt?`: `DeepPartial`\<`Date`\>;
`createdBy?`: `DeepPartial`\<`undefined` \| `null` \| `UserInfo`\>;
`createdById?`: `DeepPartial`\<`undefined` \| `null` \| `string`\>;
`deletedAt?`: `DeepPartial`\<`undefined` \| `null` \| `Date`\>;
`deletedBy?`: `DeepPartial`\<`undefined` \| `null` \| `UserInfo`\>;
`deletedById?`: `DeepPartial`\<`undefined` \| `null` \| `string`\>;
`id?`: `DeepPartial`\<`EntityId`\>;
`updatedAt?`: `DeepPartial`\<`Date`\>;
`updatedBy?`: `DeepPartial`\<`undefined` \| `null` \| `UserInfo`\>;
`updatedById?`: `DeepPartial`\<`undefined` \| `null` \| `string`\>;
\}
\| \{
`id?`: `DeepPartial`\<`EntityId`\>;
\}

</td>
<td>

The type of the entity data

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

`entityLike`

</td>
<td>

`T`

</td>
<td>

The entity data to save

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

`SaveOptions`

</td>
<td>

Options for the save operation

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`T` & `BaseEntity`\>

The saved entity

###### Example

```TypeScript
const user = await userRepository.save({
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com'
});
```

###### Overrides

[`Repository`](#repository-1).[`save`](#save-5)

##### saveAndGet()

```ts
saveAndGet<T>(entityLike, options?): Promise<null | BaseEntity>;
```

Defined in: [libs/nest-crud/src/lib/base/base-repository.ts:194](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/base/base-repository.ts#L194)

Save an entity and retrieve it with relations

This method saves an entity and then retrieves it from the database with the specified relations.
It's useful when you need to immediately access related entities after saving.

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

`T` _extends_
\| `Model`
\| `ModelExtension`
\| \{
`createdAt?`: `DeepPartial`\<`Date`\>;
`createdBy?`: `DeepPartial`\<`undefined` \| `null` \| `UserInfo`\>;
`createdById?`: `DeepPartial`\<`undefined` \| `null` \| `string`\>;
`deletedAt?`: `DeepPartial`\<`undefined` \| `null` \| `Date`\>;
`deletedBy?`: `DeepPartial`\<`undefined` \| `null` \| `UserInfo`\>;
`deletedById?`: `DeepPartial`\<`undefined` \| `null` \| `string`\>;
`id?`: `DeepPartial`\<`EntityId`\>;
`updatedAt?`: `DeepPartial`\<`Date`\>;
`updatedBy?`: `DeepPartial`\<`undefined` \| `null` \| `UserInfo`\>;
`updatedById?`: `DeepPartial`\<`undefined` \| `null` \| `string`\>;
\}
\| \{
`id?`: `DeepPartial`\<`EntityId`\>;
\}

</td>
<td>

The type of the entity data

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

`entityLike`

</td>
<td>

`T`

</td>
<td>

The entity data to save

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

`SaveOptions` & [`GetByIdOptions`](#getbyidoptions)\<`BaseEntity`\>

</td>
<td>

Options for the save and get operations

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`null` \| `BaseEntity`\>

The saved entity with relations

###### Example

```TypeScript
const user = await userRepository.saveAndGet(
  { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' },
  { relations: ['posts', 'profile'] }
);
```

##### saveMany()

```ts
saveMany<T>(entities, options?): Promise<T & BaseEntity[]>;
```

Defined in: [libs/nest-crud/src/lib/base/base-repository.ts:220](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/base/base-repository.ts#L220)

Save multiple entities to the database

This method creates entities from the provided data array and saves them to the database.

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

`T` _extends_
\| `Model`
\| `ModelExtension`
\| \{
`createdAt?`: `DeepPartial`\<`Date`\>;
`createdBy?`: `DeepPartial`\<`undefined` \| `null` \| `UserInfo`\>;
`createdById?`: `DeepPartial`\<`undefined` \| `null` \| `string`\>;
`deletedAt?`: `DeepPartial`\<`undefined` \| `null` \| `Date`\>;
`deletedBy?`: `DeepPartial`\<`undefined` \| `null` \| `UserInfo`\>;
`deletedById?`: `DeepPartial`\<`undefined` \| `null` \| `string`\>;
`id?`: `DeepPartial`\<`EntityId`\>;
`updatedAt?`: `DeepPartial`\<`Date`\>;
`updatedBy?`: `DeepPartial`\<`undefined` \| `null` \| `UserInfo`\>;
`updatedById?`: `DeepPartial`\<`undefined` \| `null` \| `string`\>;
\}
\| \{
`id?`: `DeepPartial`\<`EntityId`\>;
\}

</td>
<td>

The type of the entity data

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

`entities`

</td>
<td>

`T`[]

</td>
<td>

Array of entity data to save

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

`SaveOptions`

</td>
<td>

Options for the save operation

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`T` & `BaseEntity`[]\>

Array of saved entities

###### Example

```TypeScript
const users = await userRepository.saveMany([
  { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' },
  { firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com' }
]);
```

##### softDelete()

```ts
softDelete(criteria): Promise<UpdateResult>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:204

Records the delete date of entities by a given criteria.
Unlike save method executes a primitive operation without cascades, relations and other operations included.
Executes fast and efficient UPDATE query.
Does not check if entity exist in the database.

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

`criteria`

</td>
<td>

\| `string` \| `number` \| `Date` \| `string`[] \| `ObjectId` \| `number`[] \| `Date`[] \| `ObjectId`[] \| `FindOptionsWhere`\<`BaseEntity`\> \| `FindOptionsWhere`\<`BaseEntity`\>[]

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`UpdateResult`\>

###### Inherited from

[`Repository`](#repository-1).[`softDelete`](#softdelete-2)

##### softRemove()

###### Call Signature

```ts
softRemove<T>(entities, options): Promise<T[]>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:118

Records the delete date of all given entities.

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

`T` _extends_
\| `Model`
\| `ModelExtension`
\| \{
`createdAt?`: `DeepPartial`\<`Date`\>;
`createdBy?`: `DeepPartial`\<`undefined` \| `null` \| `UserInfo`\>;
`createdById?`: `DeepPartial`\<`undefined` \| `null` \| `string`\>;
`deletedAt?`: `DeepPartial`\<`undefined` \| `null` \| `Date`\>;
`deletedBy?`: `DeepPartial`\<`undefined` \| `null` \| `UserInfo`\>;
`deletedById?`: `DeepPartial`\<`undefined` \| `null` \| `string`\>;
`id?`: `DeepPartial`\<`EntityId`\>;
`updatedAt?`: `DeepPartial`\<`Date`\>;
`updatedBy?`: `DeepPartial`\<`undefined` \| `null` \| `UserInfo`\>;
`updatedById?`: `DeepPartial`\<`undefined` \| `null` \| `string`\>;
\}
\| \{
`id?`: `DeepPartial`\<`EntityId`\>;
\}

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

`entities`

</td>
<td>

`T`[]

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

`SaveOptions` & `object`

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`T`[]\>

###### Inherited from

[`Repository`](#repository-1).[`softRemove`](#softremove-5)

###### Call Signature

```ts
softRemove<T>(entities, options?): Promise<T & BaseEntity[]>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:124

Records the delete date of all given entities.

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

`T` _extends_
\| `Model`
\| `ModelExtension`
\| \{
`createdAt?`: `DeepPartial`\<`Date`\>;
`createdBy?`: `DeepPartial`\<`undefined` \| `null` \| `UserInfo`\>;
`createdById?`: `DeepPartial`\<`undefined` \| `null` \| `string`\>;
`deletedAt?`: `DeepPartial`\<`undefined` \| `null` \| `Date`\>;
`deletedBy?`: `DeepPartial`\<`undefined` \| `null` \| `UserInfo`\>;
`deletedById?`: `DeepPartial`\<`undefined` \| `null` \| `string`\>;
`id?`: `DeepPartial`\<`EntityId`\>;
`updatedAt?`: `DeepPartial`\<`Date`\>;
`updatedBy?`: `DeepPartial`\<`undefined` \| `null` \| `UserInfo`\>;
`updatedById?`: `DeepPartial`\<`undefined` \| `null` \| `string`\>;
\}
\| \{
`id?`: `DeepPartial`\<`EntityId`\>;
\}

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

`entities`

</td>
<td>

`T`[]

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

`SaveOptions`

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`T` & `BaseEntity`[]\>

###### Inherited from

[`Repository`](#repository-1).[`softRemove`](#softremove-5)

###### Call Signature

```ts
softRemove<T>(entity, options): Promise<T>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:128

Records the delete date of a given entity.

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

`T` _extends_
\| `Model`
\| `ModelExtension`
\| \{
`createdAt?`: `DeepPartial`\<`Date`\>;
`createdBy?`: `DeepPartial`\<`undefined` \| `null` \| `UserInfo`\>;
`createdById?`: `DeepPartial`\<`undefined` \| `null` \| `string`\>;
`deletedAt?`: `DeepPartial`\<`undefined` \| `null` \| `Date`\>;
`deletedBy?`: `DeepPartial`\<`undefined` \| `null` \| `UserInfo`\>;
`deletedById?`: `DeepPartial`\<`undefined` \| `null` \| `string`\>;
`id?`: `DeepPartial`\<`EntityId`\>;
`updatedAt?`: `DeepPartial`\<`Date`\>;
`updatedBy?`: `DeepPartial`\<`undefined` \| `null` \| `UserInfo`\>;
`updatedById?`: `DeepPartial`\<`undefined` \| `null` \| `string`\>;
\}
\| \{
`id?`: `DeepPartial`\<`EntityId`\>;
\}

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

`entity`

</td>
<td>

`T`

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

`SaveOptions` & `object`

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`T`\>

###### Inherited from

[`Repository`](#repository-1).[`softRemove`](#softremove-5)

###### Call Signature

```ts
softRemove<T>(entity, options?): Promise<T & BaseEntity>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:134

Records the delete date of a given entity.

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

`T` _extends_
\| `Model`
\| `ModelExtension`
\| \{
`createdAt?`: `DeepPartial`\<`Date`\>;
`createdBy?`: `DeepPartial`\<`undefined` \| `null` \| `UserInfo`\>;
`createdById?`: `DeepPartial`\<`undefined` \| `null` \| `string`\>;
`deletedAt?`: `DeepPartial`\<`undefined` \| `null` \| `Date`\>;
`deletedBy?`: `DeepPartial`\<`undefined` \| `null` \| `UserInfo`\>;
`deletedById?`: `DeepPartial`\<`undefined` \| `null` \| `string`\>;
`id?`: `DeepPartial`\<`EntityId`\>;
`updatedAt?`: `DeepPartial`\<`Date`\>;
`updatedBy?`: `DeepPartial`\<`undefined` \| `null` \| `UserInfo`\>;
`updatedById?`: `DeepPartial`\<`undefined` \| `null` \| `string`\>;
\}
\| \{
`id?`: `DeepPartial`\<`EntityId`\>;
\}

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

`entity`

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

`SaveOptions`

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`T` & `BaseEntity`\>

###### Inherited from

[`Repository`](#repository-1).[`softRemove`](#softremove-5)

##### sql()

```ts
sql<T>(strings, ...values): Promise<T>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:330

Tagged template function that executes raw SQL query and returns raw database results.
Template expressions are automatically transformed into database parameters.
Raw query execution is supported only by relational databases (MongoDB is not supported).
Note: Don't call this as a regular function, it is meant to be used with backticks to tag a template literal.
Example: repository.sql`SELECT * FROM table_name WHERE id = ${id}`

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
</tr>
</thead>
<tbody>
<tr>
<td>

`strings`

</td>
<td>

`TemplateStringsArray`

</td>
</tr>
<tr>
<td>

...`values`

</td>
<td>

`unknown`[]

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`T`\>

###### Inherited from

[`Repository`](#repository-1).[`sql`](#sql-2)

##### sum()

```ts
sum(columnName, where?): Promise<null | number>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:241

Return the SUM of a column

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

`columnName`

</td>
<td>

`PickKeysByType`\<`BaseEntity`, `number`\>

</td>
</tr>
<tr>
<td>

`where?`

</td>
<td>

`FindOptionsWhere`\<`BaseEntity`\> \| `FindOptionsWhere`\<`BaseEntity`\>[]

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`null` \| `number`\>

###### Inherited from

[`Repository`](#repository-1).[`sum`](#sum-2)

##### transaction()

```ts
transaction<T>(operation): Promise<T>;
```

Defined in: [libs/nest-crud/src/lib/base/base-repository.ts:560](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/base/base-repository.ts#L560)

Execute operations within a transaction

This method ensures that all database operations within the provided function
are executed in a single transaction. If any operation fails, all changes are rolled back.

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

The return type of the operation

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

`operation`

</td>
<td>

(`manager`) => `Promise`\<`T`\>

</td>
<td>

Function containing the operations to execute

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`T`\>

The result of the operation

###### Example

```TypeScript
const result = await userRepository.transaction(async (manager) => {
  const user = await manager.getRepository(UserEntity).save({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com'
  });

  const profile = await manager.getRepository(ProfileEntity).save({
    userId: user.id,
    bio: 'Software developer'
  });

  return { user, profile };
});
```

##### update()

```ts
update(id, partialEntity): Promise<UpdateResult>;
```

Defined in: [libs/nest-crud/src/lib/base/base-repository.ts:241](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/base/base-repository.ts#L241)

Update an entity by ID

This method updates an entity with the specified ID using the provided partial entity data.

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

`id`

</td>
<td>

`EntityId`

</td>
<td>

The ID of the entity to update

</td>
</tr>
<tr>
<td>

`partialEntity`

</td>
<td>

`QueryDeepPartialEntity`\<`BaseEntity`\>

</td>
<td>

The partial entity data to apply

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`UpdateResult`\>

The result of the update operation

###### Example

```TypeScript
const result = await userRepository.update('user-id', {
  firstName: 'Updated Name',
  email: 'updated.email@example.com'
});
```

###### Overrides

[`Repository`](#repository-1).[`update`](#update-5)

##### updateAll()

```ts
updateAll(partialEntity): Promise<UpdateResult>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:176

Updates all entities of target type, setting fields from supplied partial entity.
This is a primitive operation without cascades, relations or other operations included.
Executes fast and efficient UPDATE query without WHERE clause.

WARNING! This method updates ALL rows in the target table.

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

`partialEntity`

</td>
<td>

`QueryDeepPartialEntity`\<`Entity`\>

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`UpdateResult`\>

###### Inherited from

[`Repository`](#repository-1).[`updateAll`](#updateall-2)

##### updateAndGet()

```ts
updateAndGet(
   id,
   partialEntity,
options?): Promise<null | BaseEntity>;
```

Defined in: [libs/nest-crud/src/lib/base/base-repository.ts:265](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/base/base-repository.ts#L265)

Update an entity and retrieve it with relations

This method updates an entity and then retrieves it from the database with the specified relations.
It's useful when you need to immediately access the updated entity with its relations.

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

`id`

</td>
<td>

`EntityId`

</td>
<td>

The ID of the entity to update

</td>
</tr>
<tr>
<td>

`partialEntity`

</td>
<td>

`QueryDeepPartialEntity`\<`BaseEntity`\>

</td>
<td>

The partial entity data to apply

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

[`GetByIdOptions`](#getbyidoptions)\<`BaseEntity`\>

</td>
<td>

Options for the get operation

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`null` \| `BaseEntity`\>

The updated entity with relations

###### Example

```TypeScript
const user = await userRepository.updateAndGet(
  'user-id',
  { firstName: 'Updated Name' },
  { relations: ['posts', 'profile'] }
);
```

##### updateByIds()

```ts
updateByIds(ids, partialEntity): Promise<UpdateResult>;
```

Defined in: [libs/nest-crud/src/lib/base/base-repository.ts:339](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/base/base-repository.ts#L339)

Update multiple entities by their IDs

This method updates all entities with IDs in the provided array.

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

`ids`

</td>
<td>

`EntityId`[]

</td>
<td>

Array of entity IDs to update

</td>
</tr>
<tr>
<td>

`partialEntity`

</td>
<td>

`QueryDeepPartialEntity`\<`BaseEntity`\>

</td>
<td>

The partial entity data to apply

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`UpdateResult`\>

The result of the update operation

###### Example

```TypeScript
const result = await userRepository.updateByIds(
  ['user-id-1', 'user-id-2', 'user-id-3'],
  { isActive: true }
);
```

##### updateMany()

```ts
updateMany(where, partialEntity): Promise<UpdateResult>;
```

Defined in: [libs/nest-crud/src/lib/base/base-repository.ts:315](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/base/base-repository.ts#L315)

Update multiple entities matching the specified criteria

This method updates all entities that match the provided where condition.

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

`where`

</td>
<td>

[`FindConditions`](#findconditions)\<`BaseEntity`\>

</td>
<td>

The criteria to find the entities

</td>
</tr>
<tr>
<td>

`partialEntity`

</td>
<td>

`QueryDeepPartialEntity`\<`BaseEntity`\>

</td>
<td>

The partial entity data to apply

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`UpdateResult`\>

The result of the update operation

###### Example

```TypeScript
const result = await userRepository.updateMany(
  { role: 'user' },
  { isActive: true }
);
```

##### updateOne()

```ts
updateOne(where, partialEntity): Promise<UpdateResult>;
```

Defined in: [libs/nest-crud/src/lib/base/base-repository.ts:291](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/base/base-repository.ts#L291)

Update a single entity matching the specified criteria

This method updates the first entity that matches the provided where condition.

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

`where`

</td>
<td>

`FindOptionsWhere`\<`BaseEntity`\>

</td>
<td>

The criteria to find the entity

</td>
</tr>
<tr>
<td>

`partialEntity`

</td>
<td>

`QueryDeepPartialEntity`\<`BaseEntity`\>

</td>
<td>

The partial entity data to apply

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`UpdateResult`\>

The result of the update operation

###### Example

```TypeScript
const result = await userRepository.updateOne(
  { email: 'john.doe@example.com' },
  { firstName: 'Updated Name' }
);
```

##### upsert()

```ts
upsert(entityOrEntities, conflictPathsOrOptions): Promise<InsertResult>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:182

Inserts a given entity into the database, unless a unique constraint conflicts then updates the entity
Unlike save method executes a primitive operation without cascades, relations and other operations included.
Executes fast and efficient INSERT ... ON CONFLICT DO UPDATE/ON DUPLICATE KEY UPDATE query.

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

`entityOrEntities`

</td>
<td>

\| `_QueryDeepPartialEntity`\<`ObjectLiteral` _extends_ `BaseEntity` ? `unknown` : `BaseEntity`\> \| `_QueryDeepPartialEntity`\<`ObjectLiteral` _extends_ `BaseEntity` ? `unknown` : `BaseEntity`\>[]

</td>
</tr>
<tr>
<td>

`conflictPathsOrOptions`

</td>
<td>

`string`[] \| `UpsertOptions`\<`BaseEntity`\>

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`InsertResult`\>

###### Inherited from

[`Repository`](#repository-1).[`upsert`](#upsert-2)

---

### BulkDeleteDto

Defined in: [libs/nest-crud/src/lib/dtos/bulk-delete.dto.ts:10](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/dtos/bulk-delete.dto.ts#L10)

#### Implements

- `BulkDeleteBody`

#### Constructors

##### Constructor

```ts
new BulkDeleteDto(): BulkDeleteDto;
```

###### Returns

[`BulkDeleteDto`](#bulkdeletedto)

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

<a id="ids"></a> `ids`

</td>
<td>

`EntityId`[]

</td>
<td>

[libs/nest-crud/src/lib/dtos/bulk-delete.dto.ts:14](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/dtos/bulk-delete.dto.ts#L14)

</td>
</tr>
</tbody>
</table>

---

### `abstract` CrudService\<BaseEntity\>

Defined in: [libs/nest-crud/src/lib/crud.service.ts:18](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/crud.service.ts#L18)

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

`BaseEntity` _extends_ `Model`

</td>
</tr>
</tbody>
</table>

#### Constructors

##### Constructor

```ts
new CrudService<BaseEntity>(repository): CrudService<BaseEntity>;
```

Defined in: [libs/nest-crud/src/lib/crud.service.ts:24](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/crud.service.ts#L24)

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

`repository`

</td>
<td>

[`BaseRepository`](#baserepository)\<`BaseEntity`\>

</td>
</tr>
</tbody>
</table>

###### Returns

[`CrudService`](#crudservice)\<`BaseEntity`\>

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

<a id="repository"></a> `repository`

</td>
<td>

`readonly`

</td>
<td>

[`BaseRepository`](#baserepository)\<`BaseEntity`\>

</td>
<td>

[libs/nest-crud/src/lib/crud.service.ts:24](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/crud.service.ts#L24)

</td>
</tr>
</tbody>
</table>

#### Methods

##### count()

```ts
count(getMany?, eh?): Promise<number>;
```

Defined in: [libs/nest-crud/src/lib/crud.service.ts:397](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/crud.service.ts#L397)

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

`getMany?`

</td>
<td>

[`GetManyOptions`](#getmanyoptions-1)\<`BaseEntity`\>

</td>
</tr>
<tr>
<td>

`eh?`

</td>
<td>

[`TypeORMErrorHandler`](#typeormerrorhandler)

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`number`\>

##### create()

```ts
create<T>(createDto, eh?): BaseEntity;
```

Defined in: [libs/nest-crud/src/lib/crud.service.ts:37](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/crud.service.ts#L37)

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

`T` _extends_
\| `Model`
\| \{
`createdAt?`: `DeepPartial`\<`Date`\>;
`createdBy?`: `DeepPartial`\<`undefined` \| `null` \| `UserInfo`\>;
`createdById?`: `DeepPartial`\<`undefined` \| `null` \| `string`\>;
`deletedAt?`: `DeepPartial`\<`undefined` \| `null` \| `Date`\>;
`deletedBy?`: `DeepPartial`\<`undefined` \| `null` \| `UserInfo`\>;
`deletedById?`: `DeepPartial`\<`undefined` \| `null` \| `string`\>;
`id?`: `DeepPartial`\<`EntityId`\>;
`updatedAt?`: `DeepPartial`\<`Date`\>;
`updatedBy?`: `DeepPartial`\<`undefined` \| `null` \| `UserInfo`\>;
`updatedById?`: `DeepPartial`\<`undefined` \| `null` \| `string`\>;
\}

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

`createDto`

</td>
<td>

`T`

</td>
</tr>
<tr>
<td>

`eh?`

</td>
<td>

[`TypeORMErrorHandler`](#typeormerrorhandler)

</td>
</tr>
</tbody>
</table>

###### Returns

`BaseEntity`

##### delete()

###### Call Signature

```ts
delete(
   id,
   wipe?,
eh?): Promise<BaseEntity>;
```

Defined in: [libs/nest-crud/src/lib/crud.service.ts:255](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/crud.service.ts#L255)

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

`id`

</td>
<td>

`EntityId`

</td>
</tr>
<tr>
<td>

`wipe?`

</td>
<td>

`true`

</td>
</tr>
<tr>
<td>

`eh?`

</td>
<td>

[`TypeORMErrorHandler`](#typeormerrorhandler)

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`BaseEntity`\>

###### Call Signature

```ts
delete(
   id,
   deletedBy?,
eh?): Promise<BaseEntity>;
```

Defined in: [libs/nest-crud/src/lib/crud.service.ts:257](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/crud.service.ts#L257)

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

`id`

</td>
<td>

`EntityId`

</td>
</tr>
<tr>
<td>

`deletedBy?`

</td>
<td>

`UserInfo`

</td>
</tr>
<tr>
<td>

`eh?`

</td>
<td>

[`TypeORMErrorHandler`](#typeormerrorhandler)

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`BaseEntity`\>

##### deleteByIds()

###### Call Signature

```ts
deleteByIds(
   ids,
   wipe?,
eh?): Promise<SuccessResponse>;
```

Defined in: [libs/nest-crud/src/lib/crud.service.ts:367](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/crud.service.ts#L367)

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

`ids`

</td>
<td>

`EntityId`[]

</td>
</tr>
<tr>
<td>

`wipe?`

</td>
<td>

`true`

</td>
</tr>
<tr>
<td>

`eh?`

</td>
<td>

[`TypeORMErrorHandler`](#typeormerrorhandler)

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`SuccessResponse`\>

###### Call Signature

```ts
deleteByIds(
   ids,
   deletedBy?,
eh?): Promise<SuccessResponse>;
```

Defined in: [libs/nest-crud/src/lib/crud.service.ts:369](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/crud.service.ts#L369)

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

`ids`

</td>
<td>

`EntityId`[]

</td>
</tr>
<tr>
<td>

`deletedBy?`

</td>
<td>

`UserInfo`

</td>
</tr>
<tr>
<td>

`eh?`

</td>
<td>

[`TypeORMErrorHandler`](#typeormerrorhandler)

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`SuccessResponse`\>

##### deleteMany()

###### Call Signature

```ts
deleteMany(
   where,
   wipe?,
eh?): Promise<BaseEntity[]>;
```

Defined in: [libs/nest-crud/src/lib/crud.service.ts:330](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/crud.service.ts#L330)

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

`where`

</td>
<td>

`FindOptionsWhere`\<`BaseEntity`\>

</td>
</tr>
<tr>
<td>

`wipe?`

</td>
<td>

`true`

</td>
</tr>
<tr>
<td>

`eh?`

</td>
<td>

[`TypeORMErrorHandler`](#typeormerrorhandler)

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`BaseEntity`[]\>

###### Call Signature

```ts
deleteMany(
   where,
   deletedBy?,
eh?): Promise<BaseEntity[]>;
```

Defined in: [libs/nest-crud/src/lib/crud.service.ts:332](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/crud.service.ts#L332)

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

`where`

</td>
<td>

`FindOptionsWhere`\<`BaseEntity`\>

</td>
</tr>
<tr>
<td>

`deletedBy?`

</td>
<td>

`UserInfo`

</td>
</tr>
<tr>
<td>

`eh?`

</td>
<td>

[`TypeORMErrorHandler`](#typeormerrorhandler)

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`BaseEntity`[]\>

##### deleteOne()

###### Call Signature

```ts
deleteOne(
   where,
   wipe?,
eh?): Promise<BaseEntity>;
```

Defined in: [libs/nest-crud/src/lib/crud.service.ts:286](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/crud.service.ts#L286)

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

`where`

</td>
<td>

`FindOptionsWhere`\<`BaseEntity`\>

</td>
</tr>
<tr>
<td>

`wipe?`

</td>
<td>

`true`

</td>
</tr>
<tr>
<td>

`eh?`

</td>
<td>

[`TypeORMErrorHandler`](#typeormerrorhandler)

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`BaseEntity`\>

###### Call Signature

```ts
deleteOne(
   where,
   deletedBy?,
eh?): Promise<BaseEntity>;
```

Defined in: [libs/nest-crud/src/lib/crud.service.ts:288](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/crud.service.ts#L288)

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

`where`

</td>
<td>

`FindOptionsWhere`\<`BaseEntity`\>

</td>
</tr>
<tr>
<td>

`deletedBy?`

</td>
<td>

`UserInfo`

</td>
</tr>
<tr>
<td>

`eh?`

</td>
<td>

[`TypeORMErrorHandler`](#typeormerrorhandler)

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`BaseEntity`\>

##### get()

```ts
get(
   id,
   options?,
eh?): Promise<BaseEntity>;
```

Defined in: [libs/nest-crud/src/lib/crud.service.ts:177](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/crud.service.ts#L177)

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

`id`

</td>
<td>

`EntityId`

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

[`GetByIdOptions`](#getbyidoptions)\<`BaseEntity`\>

</td>
</tr>
<tr>
<td>

`eh?`

</td>
<td>

[`TypeORMErrorHandler`](#typeormerrorhandler)

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`BaseEntity`\>

##### getAll()

```ts
getAll<Options>(getAll?, eh?): Options extends object ? Promise<PaginatedResponse<BaseEntity>> : Promise<BaseEntity[]>;
```

Defined in: [libs/nest-crud/src/lib/crud.service.ts:237](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/crud.service.ts#L237)

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

`Options` _extends_ [`GetAllOptions`](#getalloptions-1)\<`BaseEntity`\>

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

`getAll?`

</td>
<td>

`Options`

</td>
</tr>
<tr>
<td>

`eh?`

</td>
<td>

[`TypeORMErrorHandler`](#typeormerrorhandler)

</td>
</tr>
</tbody>
</table>

###### Returns

`Options` _extends_ `object` ? `Promise`\<[`PaginatedResponse`](#paginatedresponse)\<`BaseEntity`\>\> : `Promise`\<`BaseEntity`[]\>

##### getByIds()

```ts
getByIds(getByIds, eh?): Promise<BaseEntity[]>;
```

Defined in: [libs/nest-crud/src/lib/crud.service.ts:194](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/crud.service.ts#L194)

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

`getByIds`

</td>
<td>

[`GetByIdsOptions`](#getbyidsoptions)\<`BaseEntity`\>

</td>
</tr>
<tr>
<td>

`eh?`

</td>
<td>

[`TypeORMErrorHandler`](#typeormerrorhandler)

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`BaseEntity`[]\>

##### getMany()

```ts
getMany<Options>(getMany, eh?): Options extends object ? Promise<PaginatedResponse<BaseEntity>> : Promise<BaseEntity[]>;
```

Defined in: [libs/nest-crud/src/lib/crud.service.ts:219](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/crud.service.ts#L219)

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

`Options` _extends_ [`GetManyOptions`](#getmanyoptions-1)\<`BaseEntity`\>

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

`getMany`

</td>
<td>

`Options`

</td>
</tr>
<tr>
<td>

`eh?`

</td>
<td>

[`TypeORMErrorHandler`](#typeormerrorhandler)

</td>
</tr>
</tbody>
</table>

###### Returns

`Options` _extends_ `object` ? `Promise`\<[`PaginatedResponse`](#paginatedresponse)\<`BaseEntity`\>\> : `Promise`\<`BaseEntity`[]\>

##### getOne()

```ts
getOne(getOne, eh?): Promise<BaseEntity>;
```

Defined in: [libs/nest-crud/src/lib/crud.service.ts:206](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/crud.service.ts#L206)

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

`getOne`

</td>
<td>

[`GetOneOptions`](#getoneoptions)\<`BaseEntity`\>

</td>
</tr>
<tr>
<td>

`eh?`

</td>
<td>

[`TypeORMErrorHandler`](#typeormerrorhandler)

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`BaseEntity`\>

##### handleError()

```ts
handleError(e, eh?): never;
```

Defined in: [libs/nest-crud/src/lib/crud.service.ts:417](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/crud.service.ts#L417)

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

`e`

</td>
<td>

`unknown`

</td>
</tr>
<tr>
<td>

`eh?`

</td>
<td>

[`TypeORMErrorHandler`](#typeormerrorhandler)

</td>
</tr>
</tbody>
</table>

###### Returns

`never`

##### save()

```ts
save<T>(
   createDto,
   options?,
   createdBy?,
eh?): Promise<null | BaseEntity>;
```

Defined in: [libs/nest-crud/src/lib/crud.service.ts:45](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/crud.service.ts#L45)

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

`T` _extends_
\| `Model`
\| \{
`createdAt?`: `DeepPartial`\<`Date`\>;
`createdBy?`: `DeepPartial`\<`undefined` \| `null` \| `UserInfo`\>;
`createdById?`: `DeepPartial`\<`undefined` \| `null` \| `string`\>;
`deletedAt?`: `DeepPartial`\<`undefined` \| `null` \| `Date`\>;
`deletedBy?`: `DeepPartial`\<`undefined` \| `null` \| `UserInfo`\>;
`deletedById?`: `DeepPartial`\<`undefined` \| `null` \| `string`\>;
`id?`: `DeepPartial`\<`EntityId`\>;
`updatedAt?`: `DeepPartial`\<`Date`\>;
`updatedBy?`: `DeepPartial`\<`undefined` \| `null` \| `UserInfo`\>;
`updatedById?`: `DeepPartial`\<`undefined` \| `null` \| `string`\>;
\}

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

`createDto`

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

`SaveOptions` & [`GetByIdOptions`](#getbyidoptions)\<`BaseEntity`\>

</td>
</tr>
<tr>
<td>

`createdBy?`

</td>
<td>

`UserInfo`

</td>
</tr>
<tr>
<td>

`eh?`

</td>
<td>

[`TypeORMErrorHandler`](#typeormerrorhandler)

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`null` \| `BaseEntity`\>

##### saveMany()

```ts
saveMany<T>(
   createDtos,
   options?,
   createdBy?,
eh?): Promise<BaseEntity[]>;
```

Defined in: [libs/nest-crud/src/lib/crud.service.ts:60](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/crud.service.ts#L60)

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

`T` _extends_
\| `Model`
\| \{
`createdAt?`: `DeepPartial`\<`Date`\>;
`createdBy?`: `DeepPartial`\<`undefined` \| `null` \| `UserInfo`\>;
`createdById?`: `DeepPartial`\<`undefined` \| `null` \| `string`\>;
`deletedAt?`: `DeepPartial`\<`undefined` \| `null` \| `Date`\>;
`deletedBy?`: `DeepPartial`\<`undefined` \| `null` \| `UserInfo`\>;
`deletedById?`: `DeepPartial`\<`undefined` \| `null` \| `string`\>;
`id?`: `DeepPartial`\<`EntityId`\>;
`updatedAt?`: `DeepPartial`\<`Date`\>;
`updatedBy?`: `DeepPartial`\<`undefined` \| `null` \| `UserInfo`\>;
`updatedById?`: `DeepPartial`\<`undefined` \| `null` \| `string`\>;
\}

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

`createDtos`

</td>
<td>

`T`[]

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

`SaveOptions`

</td>
</tr>
<tr>
<td>

`createdBy?`

</td>
<td>

`UserInfo`

</td>
</tr>
<tr>
<td>

`eh?`

</td>
<td>

[`TypeORMErrorHandler`](#typeormerrorhandler)

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`BaseEntity`[]\>

##### transaction()

```ts
transaction<T>(operation): Promise<T>;
```

Defined in: [libs/nest-crud/src/lib/crud.service.ts:405](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/crud.service.ts#L405)

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

`operation`

</td>
<td>

(`manager`) => `Promise`\<`T`\>

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`T`\>

##### try()

```ts
try<T>(fn): Promise<T>;
```

Defined in: [libs/nest-crud/src/lib/crud.service.ts:409](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/crud.service.ts#L409)

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

`fn`

</td>
<td>

() => `Promise`\<`T`\>

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`T`\>

##### update()

```ts
update<T>(
   id,
   updateDto,
   options?,
   updatedBy?,
eh?): Promise<BaseEntity>;
```

Defined in: [libs/nest-crud/src/lib/crud.service.ts:76](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/crud.service.ts#L76)

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

`T` _extends_ `_QueryDeepPartialEntity`\<`ObjectLiteral` _extends_ `BaseEntity` ? `unknown` : `BaseEntity`\>

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

`id`

</td>
<td>

`EntityId`

</td>
</tr>
<tr>
<td>

`updateDto`

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

[`GetByIdOptions`](#getbyidoptions)\<`BaseEntity`\>

</td>
</tr>
<tr>
<td>

`updatedBy?`

</td>
<td>

`UserInfo`

</td>
</tr>
<tr>
<td>

`eh?`

</td>
<td>

[`TypeORMErrorHandler`](#typeormerrorhandler)

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`BaseEntity`\>

##### updateByIds()

```ts
updateByIds<T>(
   ids,
   updateDto,
   updatedBy?,
eh?): Promise<SuccessResponse>;
```

Defined in: [libs/nest-crud/src/lib/crud.service.ts:150](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/crud.service.ts#L150)

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

`T` _extends_ `_QueryDeepPartialEntity`\<`ObjectLiteral` _extends_ `BaseEntity` ? `unknown` : `BaseEntity`\>

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

`ids`

</td>
<td>

`EntityId`[]

</td>
</tr>
<tr>
<td>

`updateDto`

</td>
<td>

`T`

</td>
</tr>
<tr>
<td>

`updatedBy?`

</td>
<td>

`UserInfo`

</td>
</tr>
<tr>
<td>

`eh?`

</td>
<td>

[`TypeORMErrorHandler`](#typeormerrorhandler)

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`SuccessResponse`\>

##### updateMany()

```ts
updateMany<T>(
   where,
   updateDto,
   updatedBy?,
eh?): Promise<SuccessResponse>;
```

Defined in: [libs/nest-crud/src/lib/crud.service.ts:127](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/crud.service.ts#L127)

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

`T` _extends_ `_QueryDeepPartialEntity`\<`ObjectLiteral` _extends_ `BaseEntity` ? `unknown` : `BaseEntity`\>

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

`where`

</td>
<td>

`FindOptionsWhere`\<`BaseEntity`\>

</td>
</tr>
<tr>
<td>

`updateDto`

</td>
<td>

`T`

</td>
</tr>
<tr>
<td>

`updatedBy?`

</td>
<td>

`UserInfo`

</td>
</tr>
<tr>
<td>

`eh?`

</td>
<td>

[`TypeORMErrorHandler`](#typeormerrorhandler)

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`SuccessResponse`\>

##### updateOne()

```ts
updateOne<T>(
   where,
   updateDto,
   updatedBy?,
eh?): Promise<BaseEntity>;
```

Defined in: [libs/nest-crud/src/lib/crud.service.ts:104](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/crud.service.ts#L104)

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

`T` _extends_ `_QueryDeepPartialEntity`\<`ObjectLiteral` _extends_ `BaseEntity` ? `unknown` : `BaseEntity`\>

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

`where`

</td>
<td>

`FindOptionsWhere`\<`BaseEntity`\>

</td>
</tr>
<tr>
<td>

`updateDto`

</td>
<td>

`T`

</td>
</tr>
<tr>
<td>

`updatedBy?`

</td>
<td>

`UserInfo`

</td>
</tr>
<tr>
<td>

`eh?`

</td>
<td>

[`TypeORMErrorHandler`](#typeormerrorhandler)

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`BaseEntity`\>

---

### HichchiCrudModule

Defined in: [libs/nest-crud/src/lib/crud.module.ts:13](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/crud.module.ts#L13)

#### Constructors

##### Constructor

```ts
new HichchiCrudModule(): HichchiCrudModule;
```

###### Returns

[`HichchiCrudModule`](#hichchicrudmodule)

#### Methods

##### forFeature()

```ts
static forFeature(entities): DynamicModule;
```

Defined in: [libs/nest-crud/src/lib/crud.module.ts:109](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/crud.module.ts#L109)

Register entities for the HichchiCrudModule

This method is used to register entities for the `HichchiCrudModule`.
It takes an array of entities as an argument and returns a dynamic module.
The entities should be custom entities that extends from `BaseEntity` provided by `@hichchi/nest-core`
and implement the (Not the BaseEntity from `typeorm`).

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

`entities`

</td>
<td>

_typeof_ [`BaseEntity`](#baseentity)[]

</td>
<td>

The entities to register

</td>
</tr>
</tbody>
</table>

###### Returns

`DynamicModule`

The dynamic module

###### Example

```TypeScript
@Module({
    imports: [
        HichchiCrudModule.forFeature([UserEntity]),
    ],
    controllers: [UserController],
    providers: [UserService, UserRepository],
    exports: [UserService, UserRepository],
})
export class UserModule {}
```

##### forRoot()

```ts
static forRoot(options): DynamicModule;
```

Defined in: [libs/nest-crud/src/lib/crud.module.ts:51](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/crud.module.ts#L51)

Register the HichchiCrudModule

This method is used to register the `HichchiCrudModule`.
It takes the connection options as an argument and returns a dynamic module.
The connection options include the type, host, port, username, password, database, entities, migrations,
charset, synchronize, legacySpatialSupport, keepConnectionAlive, and autoLoadEntities.

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

`options`

</td>
<td>

[`ConnectionOptions`](#connectionoptions)

</td>
<td>

The connection options

</td>
</tr>
</tbody>
</table>

###### Returns

`DynamicModule`

The dynamic module

###### Example

```TypeScript
const connectionOptions: IConnectionOptions = {
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "",
  database: "dbname",
  charset: "utf8mb4",
  synchronize: false,
  entities: ["dist/** /*.entity{.ts,.js}"],
  migrations: ["dist/database/migrations/*{.ts,.js}"],
  legacySpatialSupport: false,
  keepConnectionAlive: true,
  autoLoadEntities: true,
}

@Module({
    imports: [HichchiCrudModule.forRoot(connectionOptions)],
    controllers: [...],
    providers: [...],
})
export class AppModule {}
```

##### validateEntities()

```ts
static validateEntities(entities): void;
```

Defined in: [libs/nest-crud/src/lib/crud.module.ts:174](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/crud.module.ts#L174)

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

`entities`

</td>
<td>

_typeof_ [`BaseEntity`](#baseentity)[]

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

---

### HichchiUserEntity

Defined in: [libs/nest-crud/src/lib/base/base-user.entity.ts:5](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/base/base-user.entity.ts#L5)

#### Extends

- [`BaseEntity`](#baseentity)

#### Implements

- `UserInfo`

#### Constructors

##### Constructor

```ts
new HichchiUserEntity(): HichchiUserEntity;
```

###### Returns

[`HichchiUserEntity`](#hichchiuserentity)

###### Inherited from

[`BaseEntity`](#baseentity).[`constructor`](#constructor)

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

<a id="createdat-1"></a> `createdAt`

</td>
<td>

`Date`

</td>
<td>

[`BaseEntity`](#baseentity).[`createdAt`](#createdat)

</td>
<td>

[libs/nest-crud/src/lib/base/base-entity.ts:12](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/base/base-entity.ts#L12)

</td>
</tr>
<tr>
<td>

<a id="createdby-1"></a> `createdBy?`

</td>
<td>

`UserInfo`

</td>
<td>

[`BaseEntity`](#baseentity).[`createdBy`](#createdby)

</td>
<td>

[libs/nest-crud/src/lib/base/base-entity.ts:25](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/base/base-entity.ts#L25)

</td>
</tr>
<tr>
<td>

<a id="createdbyid-1"></a> `createdById?`

</td>
<td>

`EntityId`

</td>
<td>

[`BaseEntity`](#baseentity).[`createdById`](#createdbyid)

</td>
<td>

[libs/nest-crud/src/lib/base/base-entity.ts:21](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/base/base-entity.ts#L21)

</td>
</tr>
<tr>
<td>

<a id="deletedat-1"></a> `deletedAt?`

</td>
<td>

`Date`

</td>
<td>

[`BaseEntity`](#baseentity).[`deletedAt`](#deletedat)

</td>
<td>

[libs/nest-crud/src/lib/base/base-entity.ts:18](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/base/base-entity.ts#L18)

</td>
</tr>
<tr>
<td>

<a id="deletedby-1"></a> `deletedBy?`

</td>
<td>

`UserInfo`

</td>
<td>

[`BaseEntity`](#baseentity).[`deletedBy`](#deletedby)

</td>
<td>

[libs/nest-crud/src/lib/base/base-entity.ts:39](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/base/base-entity.ts#L39)

</td>
</tr>
<tr>
<td>

<a id="deletedbyid-1"></a> `deletedById?`

</td>
<td>

`EntityId`

</td>
<td>

[`BaseEntity`](#baseentity).[`deletedById`](#deletedbyid)

</td>
<td>

[libs/nest-crud/src/lib/base/base-entity.ts:35](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/base/base-entity.ts#L35)

</td>
</tr>
<tr>
<td>

<a id="firstname"></a> `firstName`

</td>
<td>

`string`

</td>
<td>

&hyphen;

</td>
<td>

[libs/nest-crud/src/lib/base/base-user.entity.ts:7](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/base/base-user.entity.ts#L7)

</td>
</tr>
<tr>
<td>

<a id="fullname"></a> `fullName`

</td>
<td>

`string`

</td>
<td>

&hyphen;

</td>
<td>

[libs/nest-crud/src/lib/base/base-user.entity.ts:13](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/base/base-user.entity.ts#L13)

</td>
</tr>
<tr>
<td>

<a id="id-2"></a> `id`

</td>
<td>

`EntityId`

</td>
<td>

```ts
UserInfo.id;
```

[`BaseEntity`](#baseentity).[`id`](#id)

</td>
<td>

[libs/nest-crud/src/lib/base/base-entity.ts:9](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/base/base-entity.ts#L9)

</td>
</tr>
<tr>
<td>

<a id="lastname"></a> `lastName`

</td>
<td>

`string`

</td>
<td>

&hyphen;

</td>
<td>

[libs/nest-crud/src/lib/base/base-user.entity.ts:10](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/base/base-user.entity.ts#L10)

</td>
</tr>
<tr>
<td>

<a id="updatedat-1"></a> `updatedAt`

</td>
<td>

`Date`

</td>
<td>

[`BaseEntity`](#baseentity).[`updatedAt`](#updatedat)

</td>
<td>

[libs/nest-crud/src/lib/base/base-entity.ts:15](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/base/base-entity.ts#L15)

</td>
</tr>
<tr>
<td>

<a id="updatedby-1"></a> `updatedBy?`

</td>
<td>

`UserInfo`

</td>
<td>

[`BaseEntity`](#baseentity).[`updatedBy`](#updatedby)

</td>
<td>

[libs/nest-crud/src/lib/base/base-entity.ts:32](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/base/base-entity.ts#L32)

</td>
</tr>
<tr>
<td>

<a id="updatedbyid-1"></a> `updatedById?`

</td>
<td>

`EntityId`

</td>
<td>

[`BaseEntity`](#baseentity).[`updatedById`](#updatedbyid)

</td>
<td>

[libs/nest-crud/src/lib/base/base-entity.ts:28](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/base/base-entity.ts#L28)

</td>
</tr>
</tbody>
</table>

#### Methods

##### afterLoad()?

```ts
optional afterLoad(): void;
```

Defined in: [libs/nest-crud/src/lib/base/base-entity.ts:42](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/base/base-entity.ts#L42)

###### Returns

`void`

###### Inherited from

[`BaseEntity`](#baseentity).[`afterLoad`](#afterload)

##### beforeInsert()?

```ts
optional beforeInsert(): void;
```

Defined in: [libs/nest-crud/src/lib/base/base-user.entity.ts:17](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/base/base-user.entity.ts#L17)

###### Returns

`void`

---

### PaginatedResponse\<T\>

Defined in: [libs/nest-crud/src/lib/classes/paginated-response.ts:3](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/classes/paginated-response.ts#L3)

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

#### Constructors

##### Constructor

```ts
new PaginatedResponse<T>(
   data,
   totalCount,
pagination?): PaginatedResponse<T>;
```

Defined in: [libs/nest-crud/src/lib/classes/paginated-response.ts:12](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/classes/paginated-response.ts#L12)

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

`data`

</td>
<td>

`T`[]

</td>
</tr>
<tr>
<td>

`totalCount`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`pagination?`

</td>
<td>

`Pagination`

</td>
</tr>
</tbody>
</table>

###### Returns

[`PaginatedResponse`](#paginatedresponse)\<`T`\>

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Default value</th>
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

`undefined`

</td>
<td>

[libs/nest-crud/src/lib/classes/paginated-response.ts:4](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/classes/paginated-response.ts#L4)

</td>
</tr>
<tr>
<td>

<a id="limit"></a> `limit`

</td>
<td>

`number`

</td>
<td>

`0`

</td>
<td>

[libs/nest-crud/src/lib/classes/paginated-response.ts:8](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/classes/paginated-response.ts#L8)

</td>
</tr>
<tr>
<td>

<a id="page"></a> `page`

</td>
<td>

`number`

</td>
<td>

`0`

</td>
<td>

[libs/nest-crud/src/lib/classes/paginated-response.ts:6](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/classes/paginated-response.ts#L6)

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

`undefined`

</td>
<td>

[libs/nest-crud/src/lib/classes/paginated-response.ts:10](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/classes/paginated-response.ts#L10)

</td>
</tr>
</tbody>
</table>

---

### Repository\<Entity\>

Defined in: node_modules/typeorm/repository/Repository.d.ts:22

Repository is supposed to work with your entity objects. Find entities, insert, update, delete, etc.

#### Extended by

- [`BaseRepository`](#baserepository)

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

`Entity` _extends_ `ObjectLiteral`

</td>
</tr>
</tbody>
</table>

#### Constructors

##### Constructor

```ts
new Repository<Entity>(
   target,
   manager,
queryRunner?): Repository<Entity>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:41

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

`EntityTarget`\<`Entity`\>

</td>
</tr>
<tr>
<td>

`manager`

</td>
<td>

`EntityManager`

</td>
</tr>
<tr>
<td>

`queryRunner?`

</td>
<td>

`QueryRunner`

</td>
</tr>
</tbody>
</table>

###### Returns

[`Repository`](#repository-1)\<`Entity`\>

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Modifier</th>
<th>Type</th>
<th>Description</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="manager-1"></a> `manager`

</td>
<td>

`readonly`

</td>
<td>

`EntityManager`

</td>
<td>

Entity Manager used by this repository.

</td>
<td>

node_modules/typeorm/repository/Repository.d.ts:32

</td>
</tr>
<tr>
<td>

<a id="queryrunner-1"></a> `queryRunner?`

</td>
<td>

`readonly`

</td>
<td>

`QueryRunner`

</td>
<td>

Query runner provider used for this repository.

</td>
<td>

node_modules/typeorm/repository/Repository.d.ts:36

</td>
</tr>
<tr>
<td>

<a id="target-1"></a> `target`

</td>
<td>

`readonly`

</td>
<td>

`EntityTarget`\<`Entity`\>

</td>
<td>

Entity target that is managed by this repository.
If this repository manages entity from schema,
then it returns a name of that schema instead.

</td>
<td>

node_modules/typeorm/repository/Repository.d.ts:28

</td>
</tr>
</tbody>
</table>

#### Accessors

##### metadata

###### Get Signature

```ts
get metadata(): EntityMetadata;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:40

Entity metadata of the entity current repository manages.

###### Returns

`EntityMetadata`

#### Methods

##### average()

```ts
average(columnName, where?): Promise<null | number>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:245

Return the AVG of a column

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

`columnName`

</td>
<td>

`PickKeysByType`\<`Entity`, `number`\>

</td>
</tr>
<tr>
<td>

`where?`

</td>
<td>

`FindOptionsWhere`\<`Entity`\> \| `FindOptionsWhere`\<`Entity`\>[]

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`null` \| `number`\>

##### clear()

```ts
clear(): Promise<void>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:337

Clears all the data from the given table/collection (truncates/drops it).

Note: this method uses TRUNCATE and may not work as you expect in transactions on some platforms.

###### Returns

`Promise`\<`void`\>

###### See

https://stackoverflow.com/a/5972738/925151

##### count()

```ts
count(options?): Promise<number>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:232

Counts entities that match given options.
Useful for pagination.

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

`FindManyOptions`\<`Entity`\>

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`number`\>

##### countBy()

```ts
countBy(where): Promise<number>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:237

Counts entities that match given conditions.
Useful for pagination.

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

`where`

</td>
<td>

`FindOptionsWhere`\<`Entity`\> \| `FindOptionsWhere`\<`Entity`\>[]

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`number`\>

##### create()

###### Call Signature

```ts
create(): Entity;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:58

Creates a new entity instance.

###### Returns

`Entity`

###### Call Signature

```ts
create(entityLikeArray): Entity[];
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:63

Creates new entities and copies all entity properties from given objects into their new entities.
Note that it copies only properties that are present in entity schema.

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

`entityLikeArray`

</td>
<td>

`DeepPartial`\<`Entity`\>[]

</td>
</tr>
</tbody>
</table>

###### Returns

`Entity`[]

###### Call Signature

```ts
create(entityLike): Entity;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:68

Creates a new entity instance and copies all entity properties from this object into a new entity.
Note that it copies only properties that are present in entity schema.

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

`entityLike`

</td>
<td>

`DeepPartial`\<`Entity`\>

</td>
</tr>
</tbody>
</table>

###### Returns

`Entity`

##### createQueryBuilder()

```ts
createQueryBuilder(alias?, queryRunner?): SelectQueryBuilder<Entity>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:45

Creates a new query builder that can be used to build a SQL query.

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

`alias?`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`queryRunner?`

</td>
<td>

`QueryRunner`

</td>
</tr>
</tbody>
</table>

###### Returns

`SelectQueryBuilder`\<`Entity`\>

##### decrement()

```ts
decrement(
   conditions,
   propertyPath,
value): Promise<UpdateResult>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:345

Decrements some column by provided value of the entities matched given conditions.

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

`conditions`

</td>
<td>

`FindOptionsWhere`\<`Entity`\>

</td>
</tr>
<tr>
<td>

`propertyPath`

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

`string` \| `number`

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`UpdateResult`\>

##### delete()

```ts
delete(criteria): Promise<DeleteResult>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:189

Deletes entities by a given criteria.
Unlike save method executes a primitive operation without cascades, relations and other operations included.
Executes fast and efficient DELETE query.
Does not check if entity exist in the database.

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

`criteria`

</td>
<td>

\| `string` \| `number` \| `Date` \| `string`[] \| `ObjectId` \| `number`[] \| `Date`[] \| `ObjectId`[] \| `FindOptionsWhere`\<`Entity`\> \| `FindOptionsWhere`\<`Entity`\>[]

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`DeleteResult`\>

##### deleteAll()

```ts
deleteAll(): Promise<DeleteResult>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:197

Deletes all entities of target type.
This is a primitive operation without cascades, relations or other operations included.
Executes fast and efficient DELETE query without WHERE clause.

WARNING! This method deletes ALL rows in the target table.

###### Returns

`Promise`\<`DeleteResult`\>

##### ~~exist()~~

```ts
exist(options?): Promise<boolean>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:219

Checks whether any entity exists that matches the given options.

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

`FindManyOptions`\<`Entity`\>

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`boolean`\>

###### Deprecated

use `exists` method instead, for example:

.exists()

##### exists()

```ts
exists(options?): Promise<boolean>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:223

Checks whether any entity exists that matches the given options.

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

`FindManyOptions`\<`Entity`\>

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`boolean`\>

##### existsBy()

```ts
existsBy(where): Promise<boolean>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:227

Checks whether any entity exists that matches the given conditions.

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

`where`

</td>
<td>

`FindOptionsWhere`\<`Entity`\> \| `FindOptionsWhere`\<`Entity`\>[]

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`boolean`\>

##### extend()

```ts
extend<CustomRepository>(customs): Repository<Entity> & CustomRepository;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:349

Extends repository with provided functions.

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

`CustomRepository`

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

`customs`

</td>
<td>

`CustomRepository` & `ThisType`\<[`Repository`](#repository-1)\<`Entity`\> & `CustomRepository`\>

</td>
</tr>
</tbody>
</table>

###### Returns

[`Repository`](#repository-1)\<`Entity`\> & `CustomRepository`

##### find()

```ts
find(options?): Promise<Entity[]>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:257

Finds entities that match given find options.

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

`FindManyOptions`\<`Entity`\>

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`Entity`[]\>

##### findAndCount()

```ts
findAndCount(options?): Promise<[Entity[], number]>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:267

Finds entities that match given find options.
Also counts all entities that match given conditions,
but ignores pagination settings (from and take options).

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

`FindManyOptions`\<`Entity`\>

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<\[`Entity`[], `number`\]\>

##### findAndCountBy()

```ts
findAndCountBy(where): Promise<[Entity[], number]>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:273

Finds entities that match given WHERE conditions.
Also counts all entities that match given conditions,
but ignores pagination settings (from and take options).

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

`where`

</td>
<td>

`FindOptionsWhere`\<`Entity`\> \| `FindOptionsWhere`\<`Entity`\>[]

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<\[`Entity`[], `number`\]\>

##### findBy()

```ts
findBy(where): Promise<Entity[]>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:261

Finds entities that match given find options.

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

`where`

</td>
<td>

`FindOptionsWhere`\<`Entity`\> \| `FindOptionsWhere`\<`Entity`\>[]

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`Entity`[]\>

##### ~~findByIds()~~

```ts
findByIds(ids): Promise<Entity[]>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:284

Finds entities with ids.
Optionally find options or conditions can be applied.

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

`ids`

</td>
<td>

`any`[]

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`Entity`[]\>

###### Deprecated

use `findBy` method instead in conjunction with `In` operator, for example:

.findBy({
id: In([1, 2, 3])
})

##### findOne()

```ts
findOne(options): Promise<null | Entity>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:289

Finds first entity by a given find options.
If entity was not found in the database - returns null.

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

`FindOneOptions`\<`Entity`\>

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`null` \| `Entity`\>

##### findOneBy()

```ts
findOneBy(where): Promise<null | Entity>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:294

Finds first entity that matches given where condition.
If entity was not found in the database - returns null.

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

`where`

</td>
<td>

`FindOptionsWhere`\<`Entity`\> \| `FindOptionsWhere`\<`Entity`\>[]

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`null` \| `Entity`\>

##### ~~findOneById()~~

```ts
findOneById(id): Promise<null | Entity>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:305

Finds first entity that matches given id.
If entity was not found in the database - returns null.

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

`id`

</td>
<td>

`string` \| `number` \| `Date` \| `ObjectId`

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`null` \| `Entity`\>

###### Deprecated

use `findOneBy` method instead in conjunction with `In` operator, for example:

.findOneBy({
id: 1 // where "id" is your primary column name
})

##### findOneByOrFail()

```ts
findOneByOrFail(where): Promise<Entity>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:315

Finds first entity that matches given where condition.
If entity was not found in the database - rejects with error.

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

`where`

</td>
<td>

`FindOptionsWhere`\<`Entity`\> \| `FindOptionsWhere`\<`Entity`\>[]

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`Entity`\>

##### findOneOrFail()

```ts
findOneOrFail(options): Promise<Entity>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:310

Finds first entity by a given find options.
If entity was not found in the database - rejects with error.

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

`FindOneOptions`\<`Entity`\>

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`Entity`\>

##### getId()

```ts
getId(entity): any;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:54

Gets entity mixed id.

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

`Entity`

</td>
</tr>
</tbody>
</table>

###### Returns

`any`

##### hasId()

```ts
hasId(entity): boolean;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:50

Checks if entity has an id.
If entity composite compose ids, it will check them all.

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

`Entity`

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean`

##### increment()

```ts
increment(
   conditions,
   propertyPath,
value): Promise<UpdateResult>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:341

Increments some column by provided value of the entities matched given conditions.

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

`conditions`

</td>
<td>

`FindOptionsWhere`\<`Entity`\>

</td>
</tr>
<tr>
<td>

`propertyPath`

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

`string` \| `number`

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`UpdateResult`\>

##### insert()

```ts
insert(entity): Promise<InsertResult>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:161

Inserts a given entity into the database.
Unlike save method executes a primitive operation without cascades, relations and other operations included.
Executes fast and efficient INSERT query.
Does not check if entity exist in the database, so query will fail if duplicate entity is being inserted.

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

\| `_QueryDeepPartialEntity`\<`ObjectLiteral` _extends_ `Entity` ? `unknown` : `Entity`\> \| `_QueryDeepPartialEntity`\<`ObjectLiteral` _extends_ `Entity` ? `unknown` : `Entity`\>[]

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`InsertResult`\>

##### maximum()

```ts
maximum(columnName, where?): Promise<null | number>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:253

Return the MAX of a column

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

`columnName`

</td>
<td>

`PickKeysByType`\<`Entity`, `number`\>

</td>
</tr>
<tr>
<td>

`where?`

</td>
<td>

`FindOptionsWhere`\<`Entity`\> \| `FindOptionsWhere`\<`Entity`\>[]

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`null` \| `number`\>

##### merge()

```ts
merge(mergeIntoEntity, ...entityLikes): Entity;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:72

Merges multiple entities (or entity-like objects) into a given entity.

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

`mergeIntoEntity`

</td>
<td>

`Entity`

</td>
</tr>
<tr>
<td>

...`entityLikes`

</td>
<td>

`DeepPartial`\<`Entity`\>[]

</td>
</tr>
</tbody>
</table>

###### Returns

`Entity`

##### minimum()

```ts
minimum(columnName, where?): Promise<null | number>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:249

Return the MIN of a column

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

`columnName`

</td>
<td>

`PickKeysByType`\<`Entity`, `number`\>

</td>
</tr>
<tr>
<td>

`where?`

</td>
<td>

`FindOptionsWhere`\<`Entity`\> \| `FindOptionsWhere`\<`Entity`\>[]

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`null` \| `number`\>

##### preload()

```ts
preload(entityLike): Promise<undefined | Entity>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:82

Creates a new entity from the given plain javascript object. If entity already exist in the database, then
it loads it (and everything related to it), replaces all values with the new ones from the given object
and returns this new entity. This new entity is actually a loaded from the db entity with all properties
replaced from the new object.

Note that given entity-like object must have an entity id / primary key to find entity by.
Returns undefined if entity with given id was not found.

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

`entityLike`

</td>
<td>

`DeepPartial`\<`Entity`\>

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`undefined` \| `Entity`\>

##### query()

```ts
query<T>(query, parameters?): Promise<T>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:322

Executes a raw SQL query and returns a raw database results.
Raw query execution is supported only by relational databases (MongoDB is not supported).

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
</tr>
</thead>
<tbody>
<tr>
<td>

`query`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`parameters?`

</td>
<td>

`any`[]

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`T`\>

###### See

[Official docs](https://typeorm.io/repository-api) for examples.

##### recover()

###### Call Signature

```ts
recover<T>(entities, options): Promise<T[]>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:138

Recovers all given entities in the database.

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

`T` _extends_
\| `ObjectLiteral`
\| `any`[]
\| `Map`\<`unknown`, `unknown`\>
\| `Set`\<`unknown`\>
\| \{
[`key`: `string`]: `any`;
\}

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

`entities`

</td>
<td>

`T`[]

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

`SaveOptions` & `object`

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`T`[]\>

###### Call Signature

```ts
recover<T>(entities, options?): Promise<T & Entity[]>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:144

Recovers all given entities in the database.

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

`T` _extends_
\| `ObjectLiteral`
\| `any`[]
\| `Map`\<`unknown`, `unknown`\>
\| `Set`\<`unknown`\>
\| \{
[`key`: `string`]: `any`;
\}

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

`entities`

</td>
<td>

`T`[]

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

`SaveOptions`

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`T` & `Entity`[]\>

###### Call Signature

```ts
recover<T>(entity, options): Promise<T>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:148

Recovers a given entity in the database.

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

`T` _extends_
\| `ObjectLiteral`
\| `any`[]
\| `Map`\<`unknown`, `unknown`\>
\| `Set`\<`unknown`\>
\| \{
[`key`: `string`]: `any`;
\}

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

`entity`

</td>
<td>

`T`

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

`SaveOptions` & `object`

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`T`\>

###### Call Signature

```ts
recover<T>(entity, options?): Promise<T & Entity>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:154

Recovers a given entity in the database.

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

`T` _extends_
\| `ObjectLiteral`
\| `any`[]
\| `Map`\<`unknown`, `unknown`\>
\| `Set`\<`unknown`\>
\| \{
[`key`: `string`]: `any`;
\}

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

`entity`

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

`SaveOptions`

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`T` & `Entity`\>

##### remove()

###### Call Signature

```ts
remove(entities, options?): Promise<Entity[]>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:110

Removes a given entities from the database.

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

`entities`

</td>
<td>

`Entity`[]

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

`RemoveOptions`

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`Entity`[]\>

###### Call Signature

```ts
remove(entity, options?): Promise<Entity>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:114

Removes a given entity from the database.

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

`Entity`

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

`RemoveOptions`

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`Entity`\>

##### restore()

```ts
restore(criteria): Promise<UpdateResult>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:211

Restores entities by a given criteria.
Unlike save method executes a primitive operation without cascades, relations and other operations included.
Executes fast and efficient UPDATE query.
Does not check if entity exist in the database.

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

`criteria`

</td>
<td>

\| `string` \| `number` \| `Date` \| `string`[] \| `ObjectId` \| `number`[] \| `Date`[] \| `ObjectId`[] \| `FindOptionsWhere`\<`Entity`\> \| `FindOptionsWhere`\<`Entity`\>[]

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`UpdateResult`\>

##### save()

###### Call Signature

```ts
save<T>(entities, options): Promise<T[]>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:87

Saves all given entities in the database.
If entities do not exist in the database then inserts, otherwise updates.

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

`T` _extends_
\| `ObjectLiteral`
\| `any`[]
\| `Map`\<`unknown`, `unknown`\>
\| `Set`\<`unknown`\>
\| \{
[`key`: `string`]: `any`;
\}

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

`entities`

</td>
<td>

`T`[]

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

`SaveOptions` & `object`

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`T`[]\>

###### Call Signature

```ts
save<T>(entities, options?): Promise<T & Entity[]>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:94

Saves all given entities in the database.
If entities do not exist in the database then inserts, otherwise updates.

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

`T` _extends_
\| `ObjectLiteral`
\| `any`[]
\| `Map`\<`unknown`, `unknown`\>
\| `Set`\<`unknown`\>
\| \{
[`key`: `string`]: `any`;
\}

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

`entities`

</td>
<td>

`T`[]

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

`SaveOptions`

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`T` & `Entity`[]\>

###### Call Signature

```ts
save<T>(entity, options): Promise<T>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:99

Saves a given entity in the database.
If entity does not exist in the database then inserts, otherwise updates.

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

`T` _extends_
\| `ObjectLiteral`
\| `any`[]
\| `Map`\<`unknown`, `unknown`\>
\| `Set`\<`unknown`\>
\| \{
[`key`: `string`]: `any`;
\}

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

`entity`

</td>
<td>

`T`

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

`SaveOptions` & `object`

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`T`\>

###### Call Signature

```ts
save<T>(entity, options?): Promise<T & Entity>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:106

Saves a given entity in the database.
If entity does not exist in the database then inserts, otherwise updates.

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

`T` _extends_
\| `ObjectLiteral`
\| `any`[]
\| `Map`\<`unknown`, `unknown`\>
\| `Set`\<`unknown`\>
\| \{
[`key`: `string`]: `any`;
\}

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

`entity`

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

`SaveOptions`

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`T` & `Entity`\>

##### softDelete()

```ts
softDelete(criteria): Promise<UpdateResult>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:204

Records the delete date of entities by a given criteria.
Unlike save method executes a primitive operation without cascades, relations and other operations included.
Executes fast and efficient UPDATE query.
Does not check if entity exist in the database.

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

`criteria`

</td>
<td>

\| `string` \| `number` \| `Date` \| `string`[] \| `ObjectId` \| `number`[] \| `Date`[] \| `ObjectId`[] \| `FindOptionsWhere`\<`Entity`\> \| `FindOptionsWhere`\<`Entity`\>[]

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`UpdateResult`\>

##### softRemove()

###### Call Signature

```ts
softRemove<T>(entities, options): Promise<T[]>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:118

Records the delete date of all given entities.

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

`T` _extends_
\| `ObjectLiteral`
\| `any`[]
\| `Map`\<`unknown`, `unknown`\>
\| `Set`\<`unknown`\>
\| \{
[`key`: `string`]: `any`;
\}

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

`entities`

</td>
<td>

`T`[]

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

`SaveOptions` & `object`

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`T`[]\>

###### Call Signature

```ts
softRemove<T>(entities, options?): Promise<T & Entity[]>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:124

Records the delete date of all given entities.

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

`T` _extends_
\| `ObjectLiteral`
\| `any`[]
\| `Map`\<`unknown`, `unknown`\>
\| `Set`\<`unknown`\>
\| \{
[`key`: `string`]: `any`;
\}

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

`entities`

</td>
<td>

`T`[]

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

`SaveOptions`

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`T` & `Entity`[]\>

###### Call Signature

```ts
softRemove<T>(entity, options): Promise<T>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:128

Records the delete date of a given entity.

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

`T` _extends_
\| `ObjectLiteral`
\| `any`[]
\| `Map`\<`unknown`, `unknown`\>
\| `Set`\<`unknown`\>
\| \{
[`key`: `string`]: `any`;
\}

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

`entity`

</td>
<td>

`T`

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

`SaveOptions` & `object`

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`T`\>

###### Call Signature

```ts
softRemove<T>(entity, options?): Promise<T & Entity>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:134

Records the delete date of a given entity.

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

`T` _extends_
\| `ObjectLiteral`
\| `any`[]
\| `Map`\<`unknown`, `unknown`\>
\| `Set`\<`unknown`\>
\| \{
[`key`: `string`]: `any`;
\}

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

`entity`

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

`SaveOptions`

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`T` & `Entity`\>

##### sql()

```ts
sql<T>(strings, ...values): Promise<T>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:330

Tagged template function that executes raw SQL query and returns raw database results.
Template expressions are automatically transformed into database parameters.
Raw query execution is supported only by relational databases (MongoDB is not supported).
Note: Don't call this as a regular function, it is meant to be used with backticks to tag a template literal.
Example: repository.sql`SELECT * FROM table_name WHERE id = ${id}`

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
</tr>
</thead>
<tbody>
<tr>
<td>

`strings`

</td>
<td>

`TemplateStringsArray`

</td>
</tr>
<tr>
<td>

...`values`

</td>
<td>

`unknown`[]

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`T`\>

##### sum()

```ts
sum(columnName, where?): Promise<null | number>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:241

Return the SUM of a column

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

`columnName`

</td>
<td>

`PickKeysByType`\<`Entity`, `number`\>

</td>
</tr>
<tr>
<td>

`where?`

</td>
<td>

`FindOptionsWhere`\<`Entity`\> \| `FindOptionsWhere`\<`Entity`\>[]

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`null` \| `number`\>

##### update()

```ts
update(criteria, partialEntity): Promise<UpdateResult>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:168

Updates entity partially. Entity can be found by a given conditions.
Unlike save method executes a primitive operation without cascades, relations and other operations included.
Executes fast and efficient UPDATE query.
Does not check if entity exist in the database.

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

`criteria`

</td>
<td>

\| `string` \| `number` \| `Date` \| `string`[] \| `ObjectId` \| `number`[] \| `Date`[] \| `ObjectId`[] \| `FindOptionsWhere`\<`Entity`\> \| `FindOptionsWhere`\<`Entity`\>[]

</td>
</tr>
<tr>
<td>

`partialEntity`

</td>
<td>

`QueryDeepPartialEntity`\<`Entity`\>

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`UpdateResult`\>

##### updateAll()

```ts
updateAll(partialEntity): Promise<UpdateResult>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:176

Updates all entities of target type, setting fields from supplied partial entity.
This is a primitive operation without cascades, relations or other operations included.
Executes fast and efficient UPDATE query without WHERE clause.

WARNING! This method updates ALL rows in the target table.

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

`partialEntity`

</td>
<td>

`QueryDeepPartialEntity`\<`Entity`\>

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`UpdateResult`\>

##### upsert()

```ts
upsert(entityOrEntities, conflictPathsOrOptions): Promise<InsertResult>;
```

Defined in: node_modules/typeorm/repository/Repository.d.ts:182

Inserts a given entity into the database, unless a unique constraint conflicts then updates the entity
Unlike save method executes a primitive operation without cascades, relations and other operations included.
Executes fast and efficient INSERT ... ON CONFLICT DO UPDATE/ON DUPLICATE KEY UPDATE query.

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

`entityOrEntities`

</td>
<td>

\| `_QueryDeepPartialEntity`\<`ObjectLiteral` _extends_ `Entity` ? `unknown` : `Entity`\> \| `_QueryDeepPartialEntity`\<`ObjectLiteral` _extends_ `Entity` ? `unknown` : `Entity`\>[]

</td>
</tr>
<tr>
<td>

`conflictPathsOrOptions`

</td>
<td>

`string`[] \| `UpsertOptions`\<`Entity`\>

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`InsertResult`\>

## Interfaces

### ConnectionOptions

Defined in: [libs/nest-crud/src/lib/interfaces/connection-options.interface.ts:3](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/interfaces/connection-options.interface.ts#L3)

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

<a id="autoloadentities"></a> `autoLoadEntities?`

</td>
<td>

`boolean`

</td>
<td>

[libs/nest-crud/src/lib/interfaces/connection-options.interface.ts:15](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/interfaces/connection-options.interface.ts#L15)

</td>
</tr>
<tr>
<td>

<a id="charset"></a> `charset?`

</td>
<td>

`string`

</td>
<td>

[libs/nest-crud/src/lib/interfaces/connection-options.interface.ts:12](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/interfaces/connection-options.interface.ts#L12)

</td>
</tr>
<tr>
<td>

<a id="database"></a> `database`

</td>
<td>

`string`

</td>
<td>

[libs/nest-crud/src/lib/interfaces/connection-options.interface.ts:9](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/interfaces/connection-options.interface.ts#L9)

</td>
</tr>
<tr>
<td>

<a id="entities"></a> `entities`

</td>
<td>

`string`[]

</td>
<td>

[libs/nest-crud/src/lib/interfaces/connection-options.interface.ts:10](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/interfaces/connection-options.interface.ts#L10)

</td>
</tr>
<tr>
<td>

<a id="host"></a> `host`

</td>
<td>

`string`

</td>
<td>

[libs/nest-crud/src/lib/interfaces/connection-options.interface.ts:5](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/interfaces/connection-options.interface.ts#L5)

</td>
</tr>
<tr>
<td>

<a id="legacyspatialsupport"></a> `legacySpatialSupport?`

</td>
<td>

`boolean`

</td>
<td>

[libs/nest-crud/src/lib/interfaces/connection-options.interface.ts:14](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/interfaces/connection-options.interface.ts#L14)

</td>
</tr>
<tr>
<td>

<a id="migrations"></a> `migrations`

</td>
<td>

`string`[]

</td>
<td>

[libs/nest-crud/src/lib/interfaces/connection-options.interface.ts:11](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/interfaces/connection-options.interface.ts#L11)

</td>
</tr>
<tr>
<td>

<a id="password"></a> `password`

</td>
<td>

`string`

</td>
<td>

[libs/nest-crud/src/lib/interfaces/connection-options.interface.ts:8](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/interfaces/connection-options.interface.ts#L8)

</td>
</tr>
<tr>
<td>

<a id="port"></a> `port`

</td>
<td>

`number`

</td>
<td>

[libs/nest-crud/src/lib/interfaces/connection-options.interface.ts:6](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/interfaces/connection-options.interface.ts#L6)

</td>
</tr>
<tr>
<td>

<a id="synchronize"></a> `synchronize?`

</td>
<td>

`boolean`

</td>
<td>

[libs/nest-crud/src/lib/interfaces/connection-options.interface.ts:13](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/interfaces/connection-options.interface.ts#L13)

</td>
</tr>
<tr>
<td>

<a id="type"></a> `type`

</td>
<td>

`DatabaseTypes`

</td>
<td>

[libs/nest-crud/src/lib/interfaces/connection-options.interface.ts:4](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/interfaces/connection-options.interface.ts#L4)

</td>
</tr>
<tr>
<td>

<a id="username"></a> `username`

</td>
<td>

`string`

</td>
<td>

[libs/nest-crud/src/lib/interfaces/connection-options.interface.ts:7](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/interfaces/connection-options.interface.ts#L7)

</td>
</tr>
</tbody>
</table>

---

### GetByIdsOptions\<Entity\>

Defined in: [libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts:37](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts#L37)

#### Extends

- [`PaginatedGetOptions`](#paginatedgetoptions)\<`Entity`\>

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

`Entity`

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

<a id="ids-1"></a> `ids`

</td>
<td>

`EntityId`[]

</td>
<td>

&hyphen;

</td>
<td>

[libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts:38](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts#L38)

</td>
</tr>
<tr>
<td>

<a id="manager-2"></a> `manager?`

</td>
<td>

`EntityManager`

</td>
<td>

[`PaginatedGetOptions`](#paginatedgetoptions).[`manager`](#manager-11)

</td>
<td>

[libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts:6](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts#L6)

</td>
</tr>
<tr>
<td>

<a id="options"></a> `options?`

</td>
<td>

`Omit`\<`FindOneOptions`\<`Entity`\>, `"where"` \| `"relations"`\>

</td>
<td>

[`PaginatedGetOptions`](#paginatedgetoptions).[`options`](#options-10)

</td>
<td>

[libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts:8](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts#L8)

</td>
</tr>
<tr>
<td>

<a id="pagination"></a> `pagination?`

</td>
<td>

`Pagination`

</td>
<td>

[`PaginatedGetOptions`](#paginatedgetoptions).[`pagination`](#pagination-4)

</td>
<td>

[libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts:34](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts#L34)

</td>
</tr>
<tr>
<td>

<a id="relations"></a> `relations?`

</td>
<td>

keyof `Entity`[]

</td>
<td>

[`PaginatedGetOptions`](#paginatedgetoptions).[`relations`](#relations-9)

</td>
<td>

[libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts:7](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts#L7)

</td>
</tr>
<tr>
<td>

<a id="sort"></a> `sort?`

</td>
<td>

`FindOptionsOrder`\<`Entity`\>

</td>
<td>

[`PaginatedGetOptions`](#paginatedgetoptions).[`sort`](#sort-9)

</td>
<td>

[libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts:9](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts#L9)

</td>
</tr>
</tbody>
</table>

---

### GetManyOptionsNot\<Entity\>

Defined in: [libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts:51](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts#L51)

#### Extends

- [`PaginatedGetOptions`](#paginatedgetoptions)\<`Entity`\>.[`GetOneOptionsNot`](#getoneoptionsnot)\<`Entity`\>

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

`Entity`

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

<a id="filters"></a> `filters?`

</td>
<td>

`FindOptionsWhere`\<`Entity`\>

</td>
<td>

[`GetOneOptionsNot`](#getoneoptionsnot).[`filters`](#filters-3)

</td>
<td>

[libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts:20](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts#L20)

</td>
</tr>
<tr>
<td>

<a id="manager-3"></a> `manager?`

</td>
<td>

`EntityManager`

</td>
<td>

[`GetOneOptionsNot`](#getoneoptionsnot).[`manager`](#manager-6)

</td>
<td>

[libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts:6](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts#L6)

</td>
</tr>
<tr>
<td>

<a id="not"></a> `not`

</td>
<td>

`FindOptionsWhere`\<`Entity`\>

</td>
<td>

[`GetOneOptionsNot`](#getoneoptionsnot).[`not`](#not-3)

</td>
<td>

[libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts:22](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts#L22)

</td>
</tr>
<tr>
<td>

<a id="options-1"></a> `options?`

</td>
<td>

`Omit`\<`FindOneOptions`\<`Entity`\>, `"where"` \| `"relations"`\>

</td>
<td>

[`GetOneOptionsNot`](#getoneoptionsnot).[`options`](#options-4)

</td>
<td>

[libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts:8](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts#L8)

</td>
</tr>
<tr>
<td>

<a id="pagination-1"></a> `pagination?`

</td>
<td>

`Pagination`

</td>
<td>

[`PaginatedGetOptions`](#paginatedgetoptions).[`pagination`](#pagination-4)

</td>
<td>

[libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts:34](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts#L34)

</td>
</tr>
<tr>
<td>

<a id="relations-1"></a> `relations?`

</td>
<td>

keyof `Entity`[]

</td>
<td>

[`GetOneOptionsNot`](#getoneoptionsnot).[`relations`](#relations-4)

</td>
<td>

[libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts:7](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts#L7)

</td>
</tr>
<tr>
<td>

<a id="search"></a> `search?`

</td>
<td>

`undefined`

</td>
<td>

[`GetOneOptionsNot`](#getoneoptionsnot).[`search`](#search-3)

</td>
<td>

[libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts:21](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts#L21)

</td>
</tr>
<tr>
<td>

<a id="sort-1"></a> `sort?`

</td>
<td>

`FindOptionsOrder`\<`Entity`\>

</td>
<td>

[`GetOneOptionsNot`](#getoneoptionsnot).[`sort`](#sort-4)

</td>
<td>

[libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts:9](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts#L9)

</td>
</tr>
<tr>
<td>

<a id="where"></a> `where?`

</td>
<td>

`undefined`

</td>
<td>

[`GetOneOptionsNot`](#getoneoptionsnot).[`where`](#where-3)

</td>
<td>

[libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts:23](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts#L23)

</td>
</tr>
</tbody>
</table>

---

### GetManyOptionsSearch\<Entity\>

Defined in: [libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts:49](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts#L49)

#### Extends

- [`PaginatedGetOptions`](#paginatedgetoptions)\<`Entity`\>.[`GetOneOptionsSearch`](#getoneoptionssearch)\<`Entity`\>

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

`Entity`

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

<a id="filters-1"></a> `filters?`

</td>
<td>

`FindOptionsWhere`\<`Entity`\>

</td>
<td>

[`GetOneOptionsSearch`](#getoneoptionssearch).[`filters`](#filters-4)

</td>
<td>

[libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts:13](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts#L13)

</td>
</tr>
<tr>
<td>

<a id="manager-4"></a> `manager?`

</td>
<td>

`EntityManager`

</td>
<td>

[`GetOneOptionsSearch`](#getoneoptionssearch).[`manager`](#manager-7)

</td>
<td>

[libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts:6](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts#L6)

</td>
</tr>
<tr>
<td>

<a id="not-1"></a> `not?`

</td>
<td>

`undefined`

</td>
<td>

[`GetOneOptionsSearch`](#getoneoptionssearch).[`not`](#not-4)

</td>
<td>

[libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts:16](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts#L16)

</td>
</tr>
<tr>
<td>

<a id="options-2"></a> `options?`

</td>
<td>

`Omit`\<`FindOneOptions`\<`Entity`\>, `"where"` \| `"relations"`\>

</td>
<td>

[`GetOneOptionsSearch`](#getoneoptionssearch).[`options`](#options-5)

</td>
<td>

[libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts:8](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts#L8)

</td>
</tr>
<tr>
<td>

<a id="pagination-2"></a> `pagination?`

</td>
<td>

`Pagination`

</td>
<td>

[`PaginatedGetOptions`](#paginatedgetoptions).[`pagination`](#pagination-4)

</td>
<td>

[libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts:34](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts#L34)

</td>
</tr>
<tr>
<td>

<a id="relations-2"></a> `relations?`

</td>
<td>

keyof `Entity`[]

</td>
<td>

[`GetOneOptionsSearch`](#getoneoptionssearch).[`relations`](#relations-5)

</td>
<td>

[libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts:7](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts#L7)

</td>
</tr>
<tr>
<td>

<a id="search-1"></a> `search?`

</td>
<td>

`FindOptionsWhere`\<`Entity`\>

</td>
<td>

[`GetOneOptionsSearch`](#getoneoptionssearch).[`search`](#search-4)

</td>
<td>

[libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts:14](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts#L14)

</td>
</tr>
<tr>
<td>

<a id="sort-2"></a> `sort?`

</td>
<td>

`FindOptionsOrder`\<`Entity`\>

</td>
<td>

[`GetOneOptionsSearch`](#getoneoptionssearch).[`sort`](#sort-5)

</td>
<td>

[libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts:9](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts#L9)

</td>
</tr>
<tr>
<td>

<a id="where-1"></a> `where?`

</td>
<td>

`undefined`

</td>
<td>

[`GetOneOptionsSearch`](#getoneoptionssearch).[`where`](#where-4)

</td>
<td>

[libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts:15](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts#L15)

</td>
</tr>
</tbody>
</table>

---

### GetManyOptionsWhere\<Entity\>

Defined in: [libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts:53](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts#L53)

#### Extends

- [`PaginatedGetOptions`](#paginatedgetoptions)\<`Entity`\>.[`GetOneOptionsWhere`](#getoneoptionswhere)\<`Entity`\>

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

`Entity`

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

<a id="filters-2"></a> `filters?`

</td>
<td>

`undefined`

</td>
<td>

[`GetOneOptionsWhere`](#getoneoptionswhere).[`filters`](#filters-5)

</td>
<td>

[libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts:27](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts#L27)

</td>
</tr>
<tr>
<td>

<a id="manager-5"></a> `manager?`

</td>
<td>

`EntityManager`

</td>
<td>

[`GetOneOptionsWhere`](#getoneoptionswhere).[`manager`](#manager-8)

</td>
<td>

[libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts:6](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts#L6)

</td>
</tr>
<tr>
<td>

<a id="not-2"></a> `not?`

</td>
<td>

`undefined`

</td>
<td>

[`GetOneOptionsWhere`](#getoneoptionswhere).[`not`](#not-5)

</td>
<td>

[libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts:29](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts#L29)

</td>
</tr>
<tr>
<td>

<a id="options-3"></a> `options?`

</td>
<td>

`Omit`\<`FindOneOptions`\<`Entity`\>, `"where"` \| `"relations"`\>

</td>
<td>

[`GetOneOptionsWhere`](#getoneoptionswhere).[`options`](#options-6)

</td>
<td>

[libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts:8](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts#L8)

</td>
</tr>
<tr>
<td>

<a id="pagination-3"></a> `pagination?`

</td>
<td>

`Pagination`

</td>
<td>

[`PaginatedGetOptions`](#paginatedgetoptions).[`pagination`](#pagination-4)

</td>
<td>

[libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts:34](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts#L34)

</td>
</tr>
<tr>
<td>

<a id="relations-3"></a> `relations?`

</td>
<td>

keyof `Entity`[]

</td>
<td>

[`GetOneOptionsWhere`](#getoneoptionswhere).[`relations`](#relations-6)

</td>
<td>

[libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts:7](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts#L7)

</td>
</tr>
<tr>
<td>

<a id="search-2"></a> `search?`

</td>
<td>

`undefined`

</td>
<td>

[`GetOneOptionsWhere`](#getoneoptionswhere).[`search`](#search-5)

</td>
<td>

[libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts:28](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts#L28)

</td>
</tr>
<tr>
<td>

<a id="sort-3"></a> `sort?`

</td>
<td>

`FindOptionsOrder`\<`Entity`\>

</td>
<td>

[`GetOneOptionsWhere`](#getoneoptionswhere).[`sort`](#sort-6)

</td>
<td>

[libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts:9](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts#L9)

</td>
</tr>
<tr>
<td>

<a id="where-2"></a> `where`

</td>
<td>

`FindOptionsWhere`\<`Entity`\> \| `FindOptionsWhere`\<`Entity`\>[]

</td>
<td>

[`GetOneOptionsWhere`](#getoneoptionswhere).[`where`](#where-5)

</td>
<td>

[libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts:30](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts#L30)

</td>
</tr>
</tbody>
</table>

---

### GetOneOptionsNot\<Entity\>

Defined in: [libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts:45](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts#L45)

#### Extends

- [`Options`](#options-8)\<`Entity`\>.[`NotOptions`](#notoptions)\<`Entity`\>

#### Extended by

- [`GetManyOptionsNot`](#getmanyoptionsnot)

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

`Entity`

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

<a id="filters-3"></a> `filters?`

</td>
<td>

`FindOptionsWhere`\<`Entity`\>

</td>
<td>

[`NotOptions`](#notoptions).[`filters`](#filters-6)

</td>
<td>

[libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts:20](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts#L20)

</td>
</tr>
<tr>
<td>

<a id="manager-6"></a> `manager?`

</td>
<td>

`EntityManager`

</td>
<td>

[`NotOptions`](#notoptions).[`manager`](#manager-9)

</td>
<td>

[libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts:6](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts#L6)

</td>
</tr>
<tr>
<td>

<a id="not-3"></a> `not`

</td>
<td>

`FindOptionsWhere`\<`Entity`\>

</td>
<td>

[`NotOptions`](#notoptions).[`not`](#not-6)

</td>
<td>

[libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts:22](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts#L22)

</td>
</tr>
<tr>
<td>

<a id="options-4"></a> `options?`

</td>
<td>

`Omit`\<`FindOneOptions`\<`Entity`\>, `"where"` \| `"relations"`\>

</td>
<td>

[`NotOptions`](#notoptions).[`options`](#options-7)

</td>
<td>

[libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts:8](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts#L8)

</td>
</tr>
<tr>
<td>

<a id="relations-4"></a> `relations?`

</td>
<td>

keyof `Entity`[]

</td>
<td>

[`NotOptions`](#notoptions).[`relations`](#relations-7)

</td>
<td>

[libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts:7](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts#L7)

</td>
</tr>
<tr>
<td>

<a id="search-3"></a> `search?`

</td>
<td>

`undefined`

</td>
<td>

[`NotOptions`](#notoptions).[`search`](#search-6)

</td>
<td>

[libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts:21](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts#L21)

</td>
</tr>
<tr>
<td>

<a id="sort-4"></a> `sort?`

</td>
<td>

`FindOptionsOrder`\<`Entity`\>

</td>
<td>

[`NotOptions`](#notoptions).[`sort`](#sort-7)

</td>
<td>

[libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts:9](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts#L9)

</td>
</tr>
<tr>
<td>

<a id="where-3"></a> `where?`

</td>
<td>

`undefined`

</td>
<td>

[`NotOptions`](#notoptions).[`where`](#where-6)

</td>
<td>

[libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts:23](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts#L23)

</td>
</tr>
</tbody>
</table>

---

### GetOneOptionsSearch\<Entity\>

Defined in: [libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts:43](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts#L43)

#### Extends

- [`Options`](#options-8)\<`Entity`\>.[`SearchOptions`](#searchoptions)\<`Entity`\>

#### Extended by

- [`GetManyOptionsSearch`](#getmanyoptionssearch)

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

`Entity`

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

<a id="filters-4"></a> `filters?`

</td>
<td>

`FindOptionsWhere`\<`Entity`\>

</td>
<td>

[`SearchOptions`](#searchoptions).[`filters`](#filters-7)

</td>
<td>

[libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts:13](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts#L13)

</td>
</tr>
<tr>
<td>

<a id="manager-7"></a> `manager?`

</td>
<td>

`EntityManager`

</td>
<td>

[`SearchOptions`](#searchoptions).[`manager`](#manager-12)

</td>
<td>

[libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts:6](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts#L6)

</td>
</tr>
<tr>
<td>

<a id="not-4"></a> `not?`

</td>
<td>

`undefined`

</td>
<td>

[`SearchOptions`](#searchoptions).[`not`](#not-7)

</td>
<td>

[libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts:16](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts#L16)

</td>
</tr>
<tr>
<td>

<a id="options-5"></a> `options?`

</td>
<td>

`Omit`\<`FindOneOptions`\<`Entity`\>, `"where"` \| `"relations"`\>

</td>
<td>

[`SearchOptions`](#searchoptions).[`options`](#options-11)

</td>
<td>

[libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts:8](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts#L8)

</td>
</tr>
<tr>
<td>

<a id="relations-5"></a> `relations?`

</td>
<td>

keyof `Entity`[]

</td>
<td>

[`SearchOptions`](#searchoptions).[`relations`](#relations-10)

</td>
<td>

[libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts:7](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts#L7)

</td>
</tr>
<tr>
<td>

<a id="search-4"></a> `search?`

</td>
<td>

`FindOptionsWhere`\<`Entity`\>

</td>
<td>

[`SearchOptions`](#searchoptions).[`search`](#search-7)

</td>
<td>

[libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts:14](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts#L14)

</td>
</tr>
<tr>
<td>

<a id="sort-5"></a> `sort?`

</td>
<td>

`FindOptionsOrder`\<`Entity`\>

</td>
<td>

[`SearchOptions`](#searchoptions).[`sort`](#sort-10)

</td>
<td>

[libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts:9](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts#L9)

</td>
</tr>
<tr>
<td>

<a id="where-4"></a> `where?`

</td>
<td>

`undefined`

</td>
<td>

[`SearchOptions`](#searchoptions).[`where`](#where-7)

</td>
<td>

[libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts:15](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts#L15)

</td>
</tr>
</tbody>
</table>

---

### GetOneOptionsWhere\<Entity\>

Defined in: [libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts:47](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts#L47)

#### Extends

- [`Options`](#options-8)\<`Entity`\>.[`WhereOptions`](#whereoptions)\<`Entity`\>

#### Extended by

- [`GetManyOptionsWhere`](#getmanyoptionswhere)

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

`Entity`

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

<a id="filters-5"></a> `filters?`

</td>
<td>

`undefined`

</td>
<td>

[`WhereOptions`](#whereoptions).[`filters`](#filters-8)

</td>
<td>

[libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts:27](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts#L27)

</td>
</tr>
<tr>
<td>

<a id="manager-8"></a> `manager?`

</td>
<td>

`EntityManager`

</td>
<td>

[`WhereOptions`](#whereoptions).[`manager`](#manager-13)

</td>
<td>

[libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts:6](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts#L6)

</td>
</tr>
<tr>
<td>

<a id="not-5"></a> `not?`

</td>
<td>

`undefined`

</td>
<td>

[`WhereOptions`](#whereoptions).[`not`](#not-8)

</td>
<td>

[libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts:29](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts#L29)

</td>
</tr>
<tr>
<td>

<a id="options-6"></a> `options?`

</td>
<td>

`Omit`\<`FindOneOptions`\<`Entity`\>, `"where"` \| `"relations"`\>

</td>
<td>

[`WhereOptions`](#whereoptions).[`options`](#options-12)

</td>
<td>

[libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts:8](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts#L8)

</td>
</tr>
<tr>
<td>

<a id="relations-6"></a> `relations?`

</td>
<td>

keyof `Entity`[]

</td>
<td>

[`WhereOptions`](#whereoptions).[`relations`](#relations-11)

</td>
<td>

[libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts:7](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts#L7)

</td>
</tr>
<tr>
<td>

<a id="search-5"></a> `search?`

</td>
<td>

`undefined`

</td>
<td>

[`WhereOptions`](#whereoptions).[`search`](#search-8)

</td>
<td>

[libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts:28](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts#L28)

</td>
</tr>
<tr>
<td>

<a id="sort-6"></a> `sort?`

</td>
<td>

`FindOptionsOrder`\<`Entity`\>

</td>
<td>

[`WhereOptions`](#whereoptions).[`sort`](#sort-11)

</td>
<td>

[libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts:9](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts#L9)

</td>
</tr>
<tr>
<td>

<a id="where-5"></a> `where`

</td>
<td>

`FindOptionsWhere`\<`Entity`\> \| `FindOptionsWhere`\<`Entity`\>[]

</td>
<td>

[`WhereOptions`](#whereoptions).[`where`](#where-8)

</td>
<td>

[libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts:30](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts#L30)

</td>
</tr>
</tbody>
</table>

---

### NotOptions\<Entity\>

Defined in: [libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts:19](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts#L19)

#### Extends

- [`Options`](#options-8)\<`Entity`\>

#### Extended by

- [`GetOneOptionsNot`](#getoneoptionsnot)

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

`Entity`

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

<a id="filters-6"></a> `filters?`

</td>
<td>

`FindOptionsWhere`\<`Entity`\>

</td>
<td>

&hyphen;

</td>
<td>

[libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts:20](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts#L20)

</td>
</tr>
<tr>
<td>

<a id="manager-9"></a> `manager?`

</td>
<td>

`EntityManager`

</td>
<td>

[`Options`](#options-8).[`manager`](#manager-10)

</td>
<td>

[libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts:6](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts#L6)

</td>
</tr>
<tr>
<td>

<a id="not-6"></a> `not`

</td>
<td>

`FindOptionsWhere`\<`Entity`\>

</td>
<td>

&hyphen;

</td>
<td>

[libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts:22](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts#L22)

</td>
</tr>
<tr>
<td>

<a id="options-7"></a> `options?`

</td>
<td>

`Omit`\<`FindOneOptions`\<`Entity`\>, `"where"` \| `"relations"`\>

</td>
<td>

[`Options`](#options-8).[`options`](#options-9)

</td>
<td>

[libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts:8](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts#L8)

</td>
</tr>
<tr>
<td>

<a id="relations-7"></a> `relations?`

</td>
<td>

keyof `Entity`[]

</td>
<td>

[`Options`](#options-8).[`relations`](#relations-8)

</td>
<td>

[libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts:7](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts#L7)

</td>
</tr>
<tr>
<td>

<a id="search-6"></a> `search?`

</td>
<td>

`undefined`

</td>
<td>

&hyphen;

</td>
<td>

[libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts:21](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts#L21)

</td>
</tr>
<tr>
<td>

<a id="sort-7"></a> `sort?`

</td>
<td>

`FindOptionsOrder`\<`Entity`\>

</td>
<td>

[`Options`](#options-8).[`sort`](#sort-8)

</td>
<td>

[libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts:9](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts#L9)

</td>
</tr>
<tr>
<td>

<a id="where-6"></a> `where?`

</td>
<td>

`undefined`

</td>
<td>

&hyphen;

</td>
<td>

[libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts:23](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts#L23)

</td>
</tr>
</tbody>
</table>

---

### Options\<Entity\>

Defined in: [libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts:5](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts#L5)

#### Extended by

- [`SearchOptions`](#searchoptions)
- [`NotOptions`](#notoptions)
- [`WhereOptions`](#whereoptions)
- [`PaginatedGetOptions`](#paginatedgetoptions)
- [`GetOneOptionsSearch`](#getoneoptionssearch)
- [`GetOneOptionsNot`](#getoneoptionsnot)
- [`GetOneOptionsWhere`](#getoneoptionswhere)

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

`Entity`

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
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="manager-10"></a> `manager?`

</td>
<td>

`EntityManager`

</td>
<td>

[libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts:6](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts#L6)

</td>
</tr>
<tr>
<td>

<a id="options-9"></a> `options?`

</td>
<td>

`Omit`\<`FindOneOptions`\<`Entity`\>, `"where"` \| `"relations"`\>

</td>
<td>

[libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts:8](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts#L8)

</td>
</tr>
<tr>
<td>

<a id="relations-8"></a> `relations?`

</td>
<td>

keyof `Entity`[]

</td>
<td>

[libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts:7](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts#L7)

</td>
</tr>
<tr>
<td>

<a id="sort-8"></a> `sort?`

</td>
<td>

`FindOptionsOrder`\<`Entity`\>

</td>
<td>

[libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts:9](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts#L9)

</td>
</tr>
</tbody>
</table>

---

### PaginatedGetOptions\<Entity\>

Defined in: [libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts:33](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts#L33)

#### Extends

- [`Options`](#options-8)\<`Entity`\>

#### Extended by

- [`GetByIdsOptions`](#getbyidsoptions)
- [`GetManyOptionsSearch`](#getmanyoptionssearch)
- [`GetManyOptionsNot`](#getmanyoptionsnot)
- [`GetManyOptionsWhere`](#getmanyoptionswhere)

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

`Entity`

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

<a id="manager-11"></a> `manager?`

</td>
<td>

`EntityManager`

</td>
<td>

[`Options`](#options-8).[`manager`](#manager-10)

</td>
<td>

[libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts:6](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts#L6)

</td>
</tr>
<tr>
<td>

<a id="options-10"></a> `options?`

</td>
<td>

`Omit`\<`FindOneOptions`\<`Entity`\>, `"where"` \| `"relations"`\>

</td>
<td>

[`Options`](#options-8).[`options`](#options-9)

</td>
<td>

[libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts:8](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts#L8)

</td>
</tr>
<tr>
<td>

<a id="pagination-4"></a> `pagination?`

</td>
<td>

`Pagination`

</td>
<td>

&hyphen;

</td>
<td>

[libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts:34](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts#L34)

</td>
</tr>
<tr>
<td>

<a id="relations-9"></a> `relations?`

</td>
<td>

keyof `Entity`[]

</td>
<td>

[`Options`](#options-8).[`relations`](#relations-8)

</td>
<td>

[libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts:7](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts#L7)

</td>
</tr>
<tr>
<td>

<a id="sort-9"></a> `sort?`

</td>
<td>

`FindOptionsOrder`\<`Entity`\>

</td>
<td>

[`Options`](#options-8).[`sort`](#sort-8)

</td>
<td>

[libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts:9](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts#L9)

</td>
</tr>
</tbody>
</table>

---

### SearchOptions\<Entity\>

Defined in: [libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts:12](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts#L12)

#### Extends

- [`Options`](#options-8)\<`Entity`\>

#### Extended by

- [`GetOneOptionsSearch`](#getoneoptionssearch)

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

`Entity`

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

<a id="filters-7"></a> `filters?`

</td>
<td>

`FindOptionsWhere`\<`Entity`\>

</td>
<td>

&hyphen;

</td>
<td>

[libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts:13](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts#L13)

</td>
</tr>
<tr>
<td>

<a id="manager-12"></a> `manager?`

</td>
<td>

`EntityManager`

</td>
<td>

[`Options`](#options-8).[`manager`](#manager-10)

</td>
<td>

[libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts:6](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts#L6)

</td>
</tr>
<tr>
<td>

<a id="not-7"></a> `not?`

</td>
<td>

`undefined`

</td>
<td>

&hyphen;

</td>
<td>

[libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts:16](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts#L16)

</td>
</tr>
<tr>
<td>

<a id="options-11"></a> `options?`

</td>
<td>

`Omit`\<`FindOneOptions`\<`Entity`\>, `"where"` \| `"relations"`\>

</td>
<td>

[`Options`](#options-8).[`options`](#options-9)

</td>
<td>

[libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts:8](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts#L8)

</td>
</tr>
<tr>
<td>

<a id="relations-10"></a> `relations?`

</td>
<td>

keyof `Entity`[]

</td>
<td>

[`Options`](#options-8).[`relations`](#relations-8)

</td>
<td>

[libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts:7](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts#L7)

</td>
</tr>
<tr>
<td>

<a id="search-7"></a> `search?`

</td>
<td>

`FindOptionsWhere`\<`Entity`\>

</td>
<td>

&hyphen;

</td>
<td>

[libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts:14](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts#L14)

</td>
</tr>
<tr>
<td>

<a id="sort-10"></a> `sort?`

</td>
<td>

`FindOptionsOrder`\<`Entity`\>

</td>
<td>

[`Options`](#options-8).[`sort`](#sort-8)

</td>
<td>

[libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts:9](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts#L9)

</td>
</tr>
<tr>
<td>

<a id="where-7"></a> `where?`

</td>
<td>

`undefined`

</td>
<td>

&hyphen;

</td>
<td>

[libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts:15](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts#L15)

</td>
</tr>
</tbody>
</table>

---

### WhereOptions\<Entity\>

Defined in: [libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts:26](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts#L26)

#### Extends

- [`Options`](#options-8)\<`Entity`\>

#### Extended by

- [`GetOneOptionsWhere`](#getoneoptionswhere)

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

`Entity`

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

<a id="filters-8"></a> `filters?`

</td>
<td>

`undefined`

</td>
<td>

&hyphen;

</td>
<td>

[libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts:27](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts#L27)

</td>
</tr>
<tr>
<td>

<a id="manager-13"></a> `manager?`

</td>
<td>

`EntityManager`

</td>
<td>

[`Options`](#options-8).[`manager`](#manager-10)

</td>
<td>

[libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts:6](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts#L6)

</td>
</tr>
<tr>
<td>

<a id="not-8"></a> `not?`

</td>
<td>

`undefined`

</td>
<td>

&hyphen;

</td>
<td>

[libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts:29](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts#L29)

</td>
</tr>
<tr>
<td>

<a id="options-12"></a> `options?`

</td>
<td>

`Omit`\<`FindOneOptions`\<`Entity`\>, `"where"` \| `"relations"`\>

</td>
<td>

[`Options`](#options-8).[`options`](#options-9)

</td>
<td>

[libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts:8](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts#L8)

</td>
</tr>
<tr>
<td>

<a id="relations-11"></a> `relations?`

</td>
<td>

keyof `Entity`[]

</td>
<td>

[`Options`](#options-8).[`relations`](#relations-8)

</td>
<td>

[libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts:7](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts#L7)

</td>
</tr>
<tr>
<td>

<a id="search-8"></a> `search?`

</td>
<td>

`undefined`

</td>
<td>

&hyphen;

</td>
<td>

[libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts:28](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts#L28)

</td>
</tr>
<tr>
<td>

<a id="sort-11"></a> `sort?`

</td>
<td>

`FindOptionsOrder`\<`Entity`\>

</td>
<td>

[`Options`](#options-8).[`sort`](#sort-8)

</td>
<td>

[libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts:9](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts#L9)

</td>
</tr>
<tr>
<td>

<a id="where-8"></a> `where`

</td>
<td>

`FindOptionsWhere`\<`Entity`\> \| `FindOptionsWhere`\<`Entity`\>[]

</td>
<td>

&hyphen;

</td>
<td>

[libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts:30](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts#L30)

</td>
</tr>
</tbody>
</table>

## Type Aliases

### EntityOptionUnique

```ts
type EntityOptionUnique = object;
```

Defined in: [libs/nest-crud/src/lib/types/entity-option-unique.ts:1](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/types/entity-option-unique.ts#L1)

#### Index Signature

```ts
[key: string]: string | string[]
```

---

### FilterOptions\<T\>

```ts
type FilterOptions<T> = { [P in keyof T]?: FilterValue | FilterOptions<T[P]> };
```

Defined in: [libs/nest-crud/src/lib/types/filter-options.type.ts:3](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/types/filter-options.type.ts#L3)

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

### FilterValue

```ts
type FilterValue = string | number | boolean | Date | null;
```

Defined in: [libs/nest-crud/src/lib/types/filter-options.type.ts:1](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/types/filter-options.type.ts#L1)

---

### FindConditions\<Entity\>

```ts
type FindConditions<Entity> =
  | string
  | string[]
  | number
  | number[]
  | Date
  | Date[]
  | ObjectId
  | ObjectId[]
  | FindOptionsWhere<Entity>;
```

Defined in: [libs/nest-crud/src/lib/types/find-conditions.type.ts:3](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/types/find-conditions.type.ts#L3)

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

`Entity`

</td>
</tr>
</tbody>
</table>

---

### GetAllOptions\<Entity\>

```ts
type GetAllOptions<Entity> = PaginatedGetOptions<Entity>;
```

Defined in: [libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts:60](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts#L60)

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

`Entity`

</td>
</tr>
</tbody>
</table>

---

### GetByIdOptions\<Entity\>

```ts
type GetByIdOptions<Entity> = Omit<Options<Entity>, "sort">;
```

Defined in: [libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts:41](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts#L41)

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

`Entity`

</td>
</tr>
</tbody>
</table>

---

### GetManyOptions\<Entity\>

```ts
type GetManyOptions<Entity> =
  | GetManyOptionsSearch<Entity>
  | GetManyOptionsNot<Entity>
  | GetManyOptionsWhere<Entity>;
```

Defined in: [libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts:62](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts#L62)

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

`Entity`

</td>
</tr>
</tbody>
</table>

---

### GetOneOptions\<Entity\>

```ts
type GetOneOptions<Entity> =
  | GetOneOptionsSearch<Entity>
  | GetOneOptionsNot<Entity>
  | GetOneOptionsWhere<Entity>;
```

Defined in: [libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts:58](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts#L58)

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

`Entity`

</td>
</tr>
</tbody>
</table>

---

### GetOptions\<Entity\>

```ts
type GetOptions<Entity> =
  | SearchOptions<Entity>
  | NotOptions<Entity>
  | (WhereOptions<Entity> & PaginatedGetOptions<Entity>);
```

Defined in: [libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts:55](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/interfaces/crud-options.interfaces.ts#L55)

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

`Entity`

</td>
</tr>
</tbody>
</table>

---

### RepositoryDecorator()

```ts
type RepositoryDecorator = <T>(target) => T | void;
```

Defined in: [libs/nest-crud/src/lib/types/repository-decorator.type.ts:4](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/types/repository-decorator.type.ts#L4)

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

`T` _extends_ (...`args`) => [`BaseRepository`](#baserepository)\<`any`\>

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

`target`

</td>
<td>

`T`

</td>
</tr>
</tbody>
</table>

#### Returns

`T` \| `void`

---

### SortOptions\<Entity\>

```ts
type SortOptions<Entity> = FindOptionsOrder<Entity>;
```

Defined in: [libs/nest-crud/src/lib/types/sort-options.type.ts:4](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/types/sort-options.type.ts#L4)

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

`Entity`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

---

### TypeORMErrorHandler()

```ts
type TypeORMErrorHandler = (err) => Error | void;
```

Defined in: [libs/nest-crud/src/lib/types/error-handler.type.ts:1](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/types/error-handler.type.ts#L1)

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

`err`

</td>
<td>

`TypeError` \| `unknown`

</td>
</tr>
</tbody>
</table>

#### Returns

`Error` \| `void`

## Variables

### BaseEntityTemplateRelations

```ts
const BaseEntityTemplateRelations: string[];
```

Defined in: [libs/nest-crud/src/lib/base/base-entity.ts:5](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/base/base-entity.ts#L5)

---

### FK_CONSTRAINT_REGEX

```ts
const FK_CONSTRAINT_REGEX: RegExp;
```

Defined in: [libs/nest-crud/src/lib/constants.ts:3](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/constants.ts#L3)

---

### InjectRepository()

```ts
const InjectRepository: (entity, dataSource?) => ReturnType<typeof Inject>;
```

Defined in: node_modules/@nestjs/typeorm/dist/common/typeorm.decorators.d.ts:4

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

`entity`

</td>
<td>

`EntityClassOrSchema`

</td>
</tr>
<tr>
<td>

`dataSource?`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

#### Returns

`ReturnType`\<_typeof_ `Inject`\>

---

### UNIQUE_CONSTRAINT_REGEX

```ts
const UNIQUE_CONSTRAINT_REGEX: RegExp;
```

Defined in: [libs/nest-crud/src/lib/constants.ts:1](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/constants.ts#L1)

---

### USER_ENTITY_TABLE_NAME

```ts
const USER_ENTITY_TABLE_NAME: "users" = "users";
```

Defined in: [libs/nest-crud/src/lib/tokens/tokens.ts:3](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/tokens/tokens.ts#L3)

## Functions

### EntityDto()

```ts
function EntityDto<Entity>(entityOrName): (target) => void;
```

Defined in: [libs/nest-crud/src/lib/decorators/entity-dto.decorator.ts:5](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/decorators/entity-dto.decorator.ts#L5)

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

`Entity` _extends_ _typeof_ [`BaseEntity`](#baseentity)

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

`entityOrName`

</td>
<td>

`Entity`

</td>
</tr>
</tbody>
</table>

#### Returns

```ts
(target): void;
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

`target`

</td>
<td>

`Type`

</td>
</tr>
</tbody>
</table>

##### Returns

`void`

---

### Filters()

```ts
function Filters(): ParameterDecorator;
```

Defined in: [libs/nest-crud/src/lib/decorators/filter.decorator.ts:29](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/decorators/filter.decorator.ts#L29)

Filter decorator

This decorator is used to get only the entity filters from the request without the page, limit, sort, and search.

#### Returns

`ParameterDecorator`

The parameter decorator

#### Example

```TypeScript
@Controller("user")
export class UserController {
    @Get()
    async getUsers(@Filters() filters?: QuerySafeDeepPartial<User>): Promise<User[]> {
        // Implementation
    }
}

```

---

### HichchiCrudService()

```ts
function HichchiCrudService<Entity>(entity): RepositoryDecorator;
```

Defined in: [libs/nest-crud/src/lib/decorators/service.decorator.ts:10](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/decorators/service.decorator.ts#L10)

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

`Entity` _extends_ _typeof_ [`BaseEntity`](#baseentity)

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

`entity`

</td>
<td>

`Entity`

</td>
</tr>
</tbody>
</table>

#### Returns

[`RepositoryDecorator`](#repositorydecorator)

---

### HichchiEntity()

```ts
function HichchiEntity(tableName, unique?, skipFkValidation?): (target) => void;
```

Defined in: [libs/nest-crud/src/lib/decorators/entity.decorator.ts:56](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/decorators/entity.decorator.ts#L56)

Decorator for creating a new entity

This decorator is used to create a new entity in the database.
It takes the name of the database table, the unique constraints and the skip foreign key validation flag as arguments.

The unique parameter accepts either an array of field names array (`string[][]`) or an object with the constraint name as the key (`EntityOptionUnique`)

If `EntityOptionUnique` is provided, the unique constraint names must follow the format `UNIQUE_entityName_fieldName`.
Ex: `UNIQUE_user_email`, `UNIQUE_userProfile_phoneNumber`, `UNIQUE_user_emailAndPhoneNumber`.

When creating relationships between entities, the `@HichchiJoinColumn` decorator must be used
instead of the `@JoinColumn` decorator to ensure consistent foreign key constraint validation.

The entity options include the unique constraints.

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

`tableName`

</td>
<td>

`string`

</td>
<td>

The name of the database table

</td>
</tr>
<tr>
<td>

`unique?`

</td>
<td>

`string`[] \| [`EntityOptionUnique`](#entityoptionunique) \| `string`[][]

</td>
<td>

The unique constraints

</td>
</tr>
<tr>
<td>

`skipFkValidation?`

</td>
<td>

`boolean`

</td>
<td>

Skip foreign key validation

</td>
</tr>
</tbody>
</table>

#### Returns

```ts
(target): void;
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

`target`

</td>
<td>

`Type`\<[`BaseEntity`](#baseentity)\>

</td>
</tr>
</tbody>
</table>

##### Returns

`void`

#### Example

```TypeScript
@HichchiEntity("users", {
    UNIQUE_user_email: "email",
    UNIQUE_user_phone: "phone",
})
export class UserEntity extends BaseEntityTemplate {
    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    phone: string;

    @ManyToOne(() => AddressEntity, homeAddress => homeAddress.user)
    @HichchiJoinColumn("FK_user_homeAddress")
    homeAddress: AddressEntity;
}
```

---

### HichchiEntityExtension()

```ts
function HichchiEntityExtension(tableName): (target) => void;
```

Defined in: [libs/nest-crud/src/lib/decorators/entity-extension.decorator.ts:10](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/decorators/entity-extension.decorator.ts#L10)

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

`tableName`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

#### Returns

```ts
(target): void;
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

`target`

</td>
<td>

`Type`\<`unknown`\>

</td>
</tr>
</tbody>
</table>

##### Returns

`void`

---

### HichchiJoinColumn()

```ts
function HichchiJoinColumn(options?): PropertyDecorator;
```

Defined in: [libs/nest-crud/src/lib/decorators/join-column.decorator.ts:30](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/decorators/join-column.decorator.ts#L30)

Decorator for creating a new join column

This decorator is used to create a new join column in the database.
It takes the constraint and the join column options as arguments.

join column options are the same as the `JoinColumnOptions` from the `typeorm` package.
property `foreignKeyConstraintName` of the join column options follow the format `FK_entityName_entityName`.
Ex: `FK_user_homeAddress`, `FK_userProfile_address`.

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

`options?`

</td>
<td>

`JoinColumnOptions`

</td>
<td>

The join column options

</td>
</tr>
</tbody>
</table>

#### Returns

`PropertyDecorator`

The property decorator

#### Example

```TypeScript
@HichchiEntity("users")
export class UserEntity extends BaseEntityTemplate {
    @ManyToOne(() => AddressEntity, homeAddress => homeAddress.user)
    @HichchiJoinColumn("FK_user_homeAddress")
    homeAddress: AddressEntity;
}
```

---

### HichchiRepository()

```ts
function HichchiRepository<Entity>(entity): RepositoryDecorator;
```

Defined in: [libs/nest-crud/src/lib/decorators/repository.decorator.ts:36](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/decorators/repository.decorator.ts#L36)

Decorator for creating a new repository

This decorator is used to create a new repository for the entity.
It takes the entity as an argument.

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

`Entity` _extends_ _typeof_ [`BaseEntity`](#baseentity)

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

`entity`

</td>
<td>

`Entity`

</td>
<td>

The entity class

</td>
</tr>
</tbody>
</table>

#### Returns

[`RepositoryDecorator`](#repositorydecorator)

The repository decorator

#### Examples

```TypeScript
@HichchiRepository(UserEntity)
export class UserRepository extends BaseRepository<UserEntity> {
    // custom methods and overrides
}
```

```TypeScript
@HichchiRepository(UserEntity)
export class UserRepository extends BaseRepository<UserEntity> {
    constructor(@InjectRepository(UserEntity) repository: Repository<UserEntity>) {
        super(repository);
    }
}
```

---

### Pager()

```ts
function Pager(): ParameterDecorator;
```

Defined in: [libs/nest-crud/src/lib/decorators/page.decorator.ts:24](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/decorators/page.decorator.ts#L24)

Page decorator

This decorator is used to get the page and limit from the request query.

#### Returns

`ParameterDecorator`

The parameter decorator

#### Example

```TypeScript
@Controller("user")
export class UserController {
    @Get()
    async getUsers(@Pager() pager?: IPagination): Promise<User[]> {
        // Implementation
    }
}
```

---

### Search()

```ts
function Search(): ParameterDecorator;
```

Defined in: [libs/nest-crud/src/lib/decorators/search.decorator.ts:25](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/decorators/search.decorator.ts#L25)

Search decorator

This decorator is used to parse the search query parameter and return the parsed object

#### Returns

`ParameterDecorator`

The parameter decorator

#### Example

```TypeScript
@Controller("user")
export class UserController {
    @Get()
    async getUsers(@Search() pager?: IPagination): Promise<User[]> {
        // Implementation
    }
}
```

---

### Sorter()

```ts
function Sorter(): ParameterDecorator;
```

Defined in: [libs/nest-crud/src/lib/decorators/sort.decorator.ts:25](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-crud/src/lib/decorators/sort.decorator.ts#L25)

Sort decorator

This decorator is used to parse the sort query parameter and return the parsed object

#### Returns

`ParameterDecorator`

The parameter decorator

#### Example

```TypeScript
@Controller("user")
export class UserController {
    @Get()
    async getUsers(@Sorter() sort?: SortOptions<IUserEntity>): Promise<User[]> {
        // Implementation
    }
}
```
