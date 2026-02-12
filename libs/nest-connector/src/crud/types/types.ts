// noinspection JSUnusedGlobalSymbols

/**
 * Entity ID type
 *
 * This type represents a UUID used as an entity identifier in the database.
 * It is used for all entity IDs in the application.
 */
export type EntityId = string & { readonly __brand: unique symbol };

export type PartialWithId<T> = Partial<T> & { id: EntityId | number };

export type EntityPropertyDeepPartial<T> = {
    [P in keyof T]?: EntityPropertyDeepPartial<T[P]> | EntityPropertyDeepPartial<T[P]>[];
};

export type EntityDeepPartial<T> =
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    T extends Array<infer _U>
        ? never
        : T extends Date
          ? never
          : T extends object
            ? { [P in keyof T]?: EntityPropertyDeepPartial<T[P]> }
            : never;

export type QueryDeepPartial<T extends { [P in keyof T]: unknown } = object> = {
    [P in keyof T]?: T[P] extends Date
        ? never
        : T[P] extends (infer U)[]
          ? U extends object
              ? never // Disallow arrays of objects
              : T[P] // Allow array of primitives
          : T[P] extends object
            ? T[P] | T[P][] // Allow primitive or primitive[]
            : QueryDeepPartial<T[P]>; // Allow Nested Obj or Partial nested Obj
};

interface Company {
    id: EntityId;
    name: string;
    subdomain: string;
    theme: string;
    address: string;
    logo: string;
    shippingAddress: string | null;
    homeImage: string | null;
}

interface Supplier {
    id: EntityId;
    name: string;
    address: string;
    contact: string | null;
    email: string;
    status: boolean;
    company: Company | null;
}

const x: { where: QueryDeepPartial<Supplier> | QueryDeepPartial<Supplier>[] } = {
    where: { id: "s" as EntityId, company: { subdomain: "subdomain" } as Company },
};

const y: { where: QueryDeepPartial<Supplier> | QueryDeepPartial<Supplier>[] } = {
    where: { id: ["s" as EntityId], company: { subdomain: "subdomain" } },
};

// eslint-disable-next-line no-console
console.log({ x, y });
