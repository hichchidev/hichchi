// noinspection JSUnusedGlobalSymbols

/**
 * Entity ID type
 *
 * This type represents a UUID used as an entity identifier in the database.
 * It is used for all entity IDs in the application.
 */
export type EntityId = string & { readonly __brand: unique symbol };

export type PartialWithId<T> = Partial<T> & { id: EntityId | number };
