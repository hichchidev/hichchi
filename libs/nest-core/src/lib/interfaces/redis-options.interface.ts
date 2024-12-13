export interface RedisOptionsWithUrl {
    url: string;
    prefix?: string;
    ttl?: number;
}

export interface RedisOptionsWithHost {
    host: string;
    port?: number;
    password?: string;
    username?: string;
    prefix?: string;
    ttl?: number;
}

export type RedisOptions = RedisOptionsWithUrl | RedisOptionsWithHost;
