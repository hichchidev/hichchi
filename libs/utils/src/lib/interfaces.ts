export interface InfiniteObject {
    [key: string]: InfiniteObject;
}

export interface PathValueSet {
    [path: string]: string | number | boolean;
}
