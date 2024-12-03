import { InfiniteObject } from "../interfaces";

export const prune = <T>(obj: InfiniteObject, omitPrototype = false): T => {
    const objClone: InfiniteObject = {};
    if (typeof obj !== "object") {
        return objClone as T;
    }

    for (const key in obj) {
        if (!omitPrototype || Object.prototype.hasOwnProperty.call(obj, key)) {
            if (obj[key] !== null && typeof obj[key] === "object") {
                objClone[key] = prune(obj[key], omitPrototype);
            } else if (obj[key] !== null && obj[key] !== undefined && obj[key] !== "") {
                objClone[key] = obj[key];
            }
        }
    }
    return objClone as T;
};
