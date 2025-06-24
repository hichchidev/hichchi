// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface LiteralObject<T = any> {
    [key: string]: T;
}

// TODO: try to replace any with unknow or something
