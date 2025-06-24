import { DynamicModule, Global, Module } from "@nestjs/common";
import { CacheModule as NestCacheModule } from "@nestjs/cache-manager";
import { createKeyv, Keyv } from "@keyv/redis";
import { CacheableMemory } from "cacheable";
import { CacheService } from "./services";
import { RedisOptions } from "../interfaces";
import { RedisConfigException } from "../exceptions";
import { DEFAULT_REDIS_PORT } from "@hichchi/nest-connector";

/**
 * Global cache module that provides Redis-based caching with in-memory fallback
 *
 * This module integrates NestJS's cache manager with Redis and provides a two-layer
 * caching strategy: an in-memory LRU cache for frequently accessed items and a Redis
 * cache for distributed caching across multiple instances.
 *
 * The module is marked as @Global(), so it only needs to be imported once in your
 * application's root module.
 *
 * @example
 * ```typescript
 * // In your app module
 * @Module({
 *   imports: [
 *     CacheModule.register({
 *       host: 'localhost',
 *       port: 6379,
 *       ttl: 3600,
 *       prefix: 'myapp:'
 *     })
 *   ]
 * })
 * export class AppModule {}
 * ```
 *
 * @example
 * ```typescript
 * // Using with a Redis URL
 * @Module({
 *   imports: [
 *     CacheModule.register({
 *       url: 'redis://username:password@redis.example.com:6379',
 *       ttl: 86400, // 1 day
 *       lruSize: 1000
 *     })
 *   ]
 * })
 * export class AppModule {}
 * ```
 */
@Global()
@Module({})
export class CacheModule {
    /**
     * Register the cache module with Redis configuration
     *
     * This static method configures the cache module with the provided Redis options.
     * It sets up a two-layer caching strategy:
     * 1. An in-memory LRU cache for frequently accessed items
     * 2. A Redis cache for distributed caching across multiple instances
     *
     * The method validates the provided options and throws a RedisConfigException
     * if neither host nor url is provided.
     *
     * @param {RedisOptions} options - Redis connection and caching options
     * @returns {DynamicModule} A NestJS dynamic module configured for caching
     * @throws {RedisConfigException} If neither host nor url is provided in options
     *
     * @example
     * ```typescript
     * // Register with host-based configuration
     * CacheModule.register({
     *   host: 'localhost',
     *   port: 6379,
     *   ttl: 3600
     * });
     * ```
     *
     * @example
     * ```typescript
     * // Register with URL-based configuration
     * CacheModule.register({
     *   url: 'redis://redis.example.com:6379',
     *   prefix: 'api:',
     *   lruSize: 500
     * });
     * ```
     */
    static register(options: RedisOptions): DynamicModule {
        this.validateConfigs(options);

        return {
            module: CacheModule,
            imports: [
                NestCacheModule.registerAsync({
                    // eslint-disable-next-line
                    useFactory: async () => {
                        const url =
                            "url" in options
                                ? options.url
                                : `redis://${options.username ? `${options.username}${options.password ? `:${options.password}` : ""}@` : ""}${
                                      options.host
                                  }:${options.port || DEFAULT_REDIS_PORT}`;
                        return {
                            stores: [
                                new Keyv({
                                    store: new CacheableMemory({
                                        ttl: options.ttl,
                                        lruSize: options.lruSize,
                                    }),
                                }),
                                createKeyv(url, {
                                    namespace: options.prefix,
                                    keyPrefixSeparator: options.prefix ? ":" : undefined,
                                }),
                            ],
                        };
                    },
                }),
            ],
            providers: [CacheService],
            exports: [CacheService],
        };
    }

    /**
     * Validate Redis configuration options
     *
     * This private method validates that the provided Redis options contain
     * either a host or a URL. If neither is provided, it throws a RedisConfigException.
     *
     * @param {RedisOptions} options - Redis connection options to validate
     * @returns {boolean} True if the options are valid
     * @throws {RedisConfigException} If neither host nor url is provided in options
     * @private
     */
    private static validateConfigs(options: RedisOptions): boolean {
        if (!("host" in options) && !("url" in options)) {
            throw new RedisConfigException("Redis host or url is not provided while registering RedisCacheModule");
        }

        return true;
    }
}
