/* eslint-disable @typescript-eslint/no-explicit-any */
// noinspection JSUnusedGlobalSymbols

import {
    HttpClientErrorStatus,
    HttpInfoStatus,
    HttpRedirectionStatus,
    HttpServerErrorStatus,
    HttpSuccessStatus,
} from "../enums";

/**
 * Represents a strongly-typed unique identifier for a file.
 *
 * This type is a branded string, ensuring that only valid `FileId`
 * values can be assigned or passed to functions expecting this type.
 *
 * The `__brand` property is used for type safety and does not exist
 * on the runtime value.
 */
export type FileId = string & { readonly __brand: unique symbol };

/**
 * Represents a type alias `WsRefId` which is either a branded string or the literal string "system".
 *
 * A branded string is a specific type of string that has been augmented with the `__brand` unique symbol.
 * This branding is used to provide stronger type safety and to differentiate the string from other generic strings.
 *
 * The literal string `"system"` is included as an alternative value.
 */
export type WsRefId = (string & { readonly __brand: unique symbol }) | "system";

export type SocketId = string & { readonly __brand: unique symbol };

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

export type Type<T = unknown> = new (...args: unknown[]) => T;

export type HttpStatus =
    | HttpInfoStatus
    | HttpSuccessStatus
    | HttpRedirectionStatus
    | HttpClientErrorStatus
    | HttpServerErrorStatus;

export type Prettify<T> = {
    [K in keyof T]: T[K];
} & {};
