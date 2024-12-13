/* eslint-disable @typescript-eslint/no-explicit-any */
// noinspection JSUnusedGlobalSymbols

export type PartialWithId<T> = Partial<T> & { id: string | number };

export type DeepPartial<T> =
    | T
    | (T extends Array<infer U>
          ? DeepPartial<U>[]
          : T extends Map<infer K, infer V>
            ? Map<DeepPartial<K>, DeepPartial<V>>
            : T extends Set<infer M>
              ? Set<DeepPartial<M>>
              : T extends object
                ? {
                      [K in keyof T]?: DeepPartial<T[K]>;
                  }
                : T);

export type IsPrimitive<T> = T extends string | number | boolean | symbol | bigint | null | undefined ? true : false;

export type IsEmpty<T> = keyof T extends never ? true : false;

export type IsAlreadyInPath<T, U> = U extends object ? (T extends U ? true : false) : false;

export type QuerySafeDeepPartial<T> =
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

export type Type<T = any> = new (...args: any[]) => T;
