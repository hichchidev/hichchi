// noinspection JSUnusedGlobalSymbols

export function getEnumValues<T extends object>(e: T): T[keyof T][] {
    const values = Object.values(e);

    // In numeric enums, values can appear as keys (reverse mapping)
    const isNumericEnum = values.some(v => typeof v === "number");

    return isNumericEnum ? (values.filter(v => typeof v !== "string") as T[keyof T][]) : (values as T[keyof T][]);
}

export function hasOwnAll(obj: object, props: PropertyKey[]): boolean {
    return props.every(prop => Object.hasOwn(obj, prop));
}
