export interface CommonRedisOptions {
    prefix?: string;
    ttl?: number;
    lruSize?: number;
}

export interface RedisOptionsWithUrl extends CommonRedisOptions {
    url: string;
}

export interface RedisOptionsWithHost extends CommonRedisOptions {
    host: string;
    port?: number;
    password?: string;
    username?: string;
}

export type RedisOptions = RedisOptionsWithUrl | RedisOptionsWithHost;
