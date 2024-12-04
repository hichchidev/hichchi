// noinspection JSUnusedGlobalSymbols

import { Injectable } from "@nestjs/common";
import { InjectRedis } from "@nestjs-modules/ioredis";
import Redis from "ioredis";

interface ICacheData<T> {
    value: T;
}

@Injectable()
export class RedisCacheService {
    constructor(@InjectRedis() private readonly redis: Redis) {}

    /**
     * Get Value from Cache
     * @template T Type of the Cache value
     * @param {string} key Key of the Cache value
     * @return {Promise<T | undefined>} Value from Cache
     */
    async get<T = unknown>(key: string): Promise<T | undefined> {
        try {
            const jsonString = await this.redis.get(key);

            if (!jsonString) {
                return undefined;
            }

            const { value }: ICacheData<T> = JSON.parse(jsonString);
            return value;
        } catch {
            return undefined;
        }
    }

    /**
     * Set Value in Cache
     * @template T Type of the Cache value
     * @param {string} key Key of the Cache value
     * @param {T} value Value to be set in Cache
     * @param {number} ttl Time to live in seconds
     * @return {Promise<boolean>} Status of the operation
     */
    async set<T = unknown>(key: string, value: T, ttl?: number): Promise<boolean> {
        try {
            const jsonString: string = JSON.stringify({ value });
            if (ttl) {
                await this.redis.set(key, jsonString, "PX", ttl);
            } else {
                await this.redis.set(key, jsonString);
            }
            return true;
        } catch {
            return false;
        }
    }

    /**
     * Delete Value from Cache
     * @param {string} key Key of the Cache value
     * @return {Promise<boolean>} Status of the operation
     */
    async delete(key: string): Promise<boolean> {
        try {
            await this.redis.del(key);
            return true;
        } catch {
            return false;
        }
    }
}
