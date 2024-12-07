/* eslint-disable @typescript-eslint/no-explicit-any */

export type LiteralObject<T = any> = {
    [key: string]: T;
};
