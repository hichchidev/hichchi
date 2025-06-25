// noinspection JSUnusedGlobalSymbols

/**
 * Entity ID type
 *
 * This type represents a UUID used as an entity identifier in the database.
 * It is used for all entity IDs in the application.
 */
export type EntityId = string & { readonly __brand: unique symbol };

export type PartialWithId<T> = Partial<T> & { id: EntityId | number };

/**
 * A specialized deep partial type designed for safe usage in database queries.
 *
 * `QuerySafeDeepPartial<T>` is similar to `DeepPartial<T>` but adds additional
 * safety constraints specifically for ORM query operations. It explicitly excludes
 * arrays and Date objects, which can often cause issues in query conditions if not
 * properly handled.
 *
 * Key differences from standard `DeepPartial<T>`:
 *
 * 1. Arrays are completely excluded (converted to `never`)
 *    - Prevents complex array comparison issues in where clauses
 *    - Avoids performance problems with array-based filters
 *
 * 2. Date objects are completely excluded (converted to `never`)
 *    - Prevents timezone and format inconsistencies
 *    - Forces explicit date handling with appropriate conversions
 *
 * 3. Only handles plain objects and primitive values
 *    - No support for Maps or Sets (unlike DeepPartial)
 *    - Simpler structure maps directly to most query systems
 *
 * This type is particularly useful when working with ORM query builders, repository
 * patterns, and other database access layers where partial objects are used for
 * filtering or update operations.
 *
 * @template T The type to transform into a query-safe deep partial
 *
 * @example
 * ```typescript
 * interface Product {
 *   id: string;
 *   name: string;
 *   price: number;
 *   tags: string[];
 *   createdAt: Date;
 *   metadata: {
 *     featured: boolean;
 *     stock: number;
 *   };
 * }
 *
 * // These are valid QuerySafeDeepPartial<Product>
 * const filter1: QuerySafeDeepPartial<Product> = { name: 'Product' };
 * const filter2: QuerySafeDeepPartial<Product> = { metadata: { featured: true } };
 *
 * // These would NOT be allowed (would be type errors)
 * // const filter3: QuerySafeDeepPartial<Product> = { tags: ['tag1'] }; // Array - not allowed
 * // const filter4: QuerySafeDeepPartial<Product> = { createdAt: new Date() }; // Date - not allowed
 * ```
 *
 * @see Related to TypeORM's `QueryDeepPartialEntity` which has similar safety features
 */
export type QuerySafeDeepPartial<T> =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    T extends Array<any>
        ? never
        : T extends object
          ? {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                [P in keyof T]?: T[P] extends Array<infer _U>
                    ? never
                    : T[P] extends Date
                      ? never
                      : T[P] extends object
                        ? QuerySafeDeepPartial<T[P]>
                        : T[P];
            }
          : T;

// TODO: v2.0 See if we can make `any` into `unknown` or something
