type SearchableField<T> = T extends string
    ? true
    : // eslint-disable-next-line @typescript-eslint/no-explicit-any
      T extends Date | Array<any> | null | undefined
      ? never
      : T extends object
        ? SearchFields<NonNullable<T>>
        : never;

export type SearchFields<T> = {
    [P in keyof T]?: SearchableField<T[P]>;
};

export type SearchOptions<Model> = {
    value: string;
    fields?: SearchFields<Model>;
};
