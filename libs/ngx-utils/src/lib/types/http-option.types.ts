export type HttpQuery<Model> = {
    page?: number;
    limit?: number;
    sort?: string;
    searchValue?: string;
    searchFields?: string;
} & {
    [K in keyof Model]?: string;
} & {
    [k: string]: string;
};
