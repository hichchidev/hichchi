// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FilterValue<V> = V extends Date | Array<any> | null | undefined
    ? never
    : V extends object
      ? FilterOptions<NonNullable<V>>
      : NonNullable<V>;

export type FilterOptions<T> = {
    [P in keyof T]?: FilterValue<T[P]>;
};
