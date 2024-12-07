/* eslint-disable @typescript-eslint/no-explicit-any */

export function getGlobal(): any {
    if (typeof globalThis !== "undefined") {
        return globalThis;
    }

    if (typeof global !== "undefined") {
        return global;
    }

    if (typeof window !== "undefined") {
        return window;
    }

    if (typeof self !== "undefined") {
        return self;
    }
}
