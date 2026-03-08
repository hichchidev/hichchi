// noinspection JSUnusedGlobalSymbols

/**
 * Primitive type
 */
export type Primitive = string | number | boolean | bigint | symbol | null | undefined;

/**
 * Entity ID type
 *
 * This type represents a UUID used as an entity identifier in the database.
 * It is used for all entity IDs in the application.
 */
export type EntityId = string & { readonly __brand: unique symbol };

/**
 * Utility type for partial entities that still require an identifier.
 */
export type PartialWithId<T> = Partial<T> & { id: EntityId | number };

/**
 * Recursive partial type for nested entity properties.
 */
export type EntityPropertyDeepPartial<T> = {
    [P in keyof T]?: EntityPropertyDeepPartial<T[P]> | EntityPropertyDeepPartial<T[P]>[];
};

/**
 * Deep-partial entity type used for create/update payloads.
 */
export type EntityDeepPartial<T> =
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    T extends Array<infer _U>
        ? never
        : T extends Date
          ? never
          : T extends object
            ? { [P in keyof T]?: EntityPropertyDeepPartial<T[P]> }
            : never;
