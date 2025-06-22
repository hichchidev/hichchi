/* eslint-disable @typescript-eslint/no-explicit-any */

export type LiteralObject<T = any> = {
    [key: string]: T;
};

export type PartialWithNull<T> = {
    [p in keyof T]?: T[p] | null;
};
