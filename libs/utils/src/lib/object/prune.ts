/* eslint-disable @typescript-eslint/no-explicit-any */

export const prune = <T>(obj: any, omitPrototype = false): T => {
    const objClone: any = {};
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
