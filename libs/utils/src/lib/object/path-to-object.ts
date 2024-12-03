// noinspection JSUnusedGlobalSymbols

import { InfiniteObject } from "../interfaces";

/**
 * Converts a flat object with dot-separated keys to a nested object.
 * @param filters - Flat object with dot-separated keys.
 */
export const pathToObject = <T extends InfiniteObject>(filters: InfiniteObject): T => {
    const result: InfiniteObject = {};

    const setObject = (obj: InfiniteObject, keys: string[], value: InfiniteObject): void => {
        const [firstKey, ...remainingKeys] = keys;
        if (remainingKeys.length === 0) {
            obj[firstKey] = value;
            return;
        }

        obj[firstKey] = obj[firstKey] || {};
        setObject(obj[firstKey], remainingKeys, value);
    };

    const isValidPath = (path: string): boolean => {
        const regex = /^[a-zA-Z0-9_.-]+$/;
        return path.split(".").every(part => regex.test(part));
    };

    for (const key in filters) {
        if (Object.prototype.hasOwnProperty.call(filters, key)) {
            if (!isValidPath(key)) {
                throw new Error(`Invalid path: ${key}`);
            }
            setObject(result, key.split("."), filters[key]);
        }
    }

    return result as T;
};
