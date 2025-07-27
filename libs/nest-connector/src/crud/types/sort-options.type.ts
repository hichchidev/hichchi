/**
 * Value of order by in find options.
 */
export type SortOptionsOrder = "asc" | "desc";

/**
 * Order by find options.
 */
export type SortOptions<Model> = {
    [P in keyof Model]?: SortOptionsOrder;
};
