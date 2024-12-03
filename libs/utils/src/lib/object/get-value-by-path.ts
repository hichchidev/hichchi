// noinspection JSUnusedGlobalSymbols

import { InfiniteObject } from "../interfaces";

/**
 * Get value from an object by path.
 * @param obj - Object to get value from.
 * @param path - Path to get value from, ex: `user.names[0].firstName`.
 * @returns - Value from the object.
 */
export const getValueByPath = <T>(obj: InfiniteObject, path: string): T | undefined => {
    const keys = path.split("."); // Split the path into an array of keys

    let value = obj;
    for (const key of keys) {
        // noinspection RegExpRedundantEscape

        const regExp = /^(\w+)\[(\d+)\]$/;
        const isArrayIndex = regExp.exec(key); // Check if the key is an array index

        if (isArrayIndex) {
            const arrayKey = isArrayIndex[1];
            const index = Number(isArrayIndex[2]);
            if (arrayKey && Array.isArray(value[arrayKey]) && index >= 0 && index < value[arrayKey].length) {
                value = value[arrayKey][index]; // Update the value to the array element
            } else {
                return undefined; // Return undefined if the array index is invalid
            }
        } else if (value && typeof value === "object" && key in value) {
            value = value[key]; // Update the value to the nested property
        } else {
            return undefined; // Return undefined if any key is not found
        }
    }

    return value as T;
};
