/**
 * Common Redis configuration options shared across different connection methods.
 *
 * This interface defines the shared configuration properties used by all Redis
 * connection types in the application. These options control caching behavior
 * and key management regardless of how the Redis connection is established.
 */
export interface CommonRedisOptions {
    /**
     * Optional prefix to prepend to all keys stored in Redis.
     *
     * Using a prefix allows for namespace isolation, which is useful for:
     * - Separating keys from different applications using the same Redis instance
     * - Creating logical separation between different modules or features
     * - Simplifying key management and cleanup
     *
     * @example
     * prefix: 'app:user:' // Results in keys like 'app:user:123'
     */
    prefix?: string;

    /**
     * Default Time-To-Live (TTL) in seconds for cached items.
     *
     * Sets the default expiration time for keys. After this period,
     * Redis will automatically remove the key. This helps prevent
     * stale data and manages memory usage.
     *
     * @example
     * ttl: 3600 // Keys expire after 1 hour
     */
    ttl?: number;

    /**
     * Maximum size for Least Recently Used (LRU) cache in memory.
     *
     * Controls the maximum number of items to keep in the LRU cache
     * before evicting the least recently used items. This is useful
     * for limiting memory usage while keeping frequently accessed
     * items in cache.
     *
     * @example
     * lruSize: 1000 // Keep at most 1000 items in cache
     */
    lruSize?: number;
}

/**
 * Redis configuration using a connection URL string.
 *
 * This interface extends CommonRedisOptions to provide a simple way to
 * configure Redis using a connection URL, which is convenient for environments
 * where connection details are provided as a single connection string
 * (like in many cloud hosting platforms).
 *
 * @example
 * ```typescript
 * // In a module configuration
 * const redisOptions: RedisOptionsWithUrl = {
 *   url: 'redis://username:password@redis.example.com:6379',
 *   prefix: 'myapp:',
 *   ttl: 3600
 * };
 * ```
 */
export interface RedisOptionsWithUrl extends CommonRedisOptions {
    /**
     * Redis connection URL string.
     *
     * A fully qualified URL that includes all necessary connection parameters.
     * The URL should follow the format: redis://[username:password@]host[:port][/db-number]
     *
     * For Redis clusters, specialized URL formats may be required based on the client library.
     * For TLS/SSL connections, use the rediss:// protocol prefix.
     *
     * @example
     * url: 'redis://default:password123@redis-server.example.com:6379/0'
     * @example
     * url: 'rediss://redis.example.com:6379' // SSL/TLS connection
     */
    url: string;
}

/**
 * Redis configuration using individual connection parameters.
 *
 * This interface extends CommonRedisOptions to provide detailed control
 * over the Redis connection parameters. This approach is useful when
 * connection details are available as separate configuration values
 * or when more explicit control over the connection is needed.
 *
 * @example
 * ```typescript
 * // In a module configuration
 * const redisOptions: RedisOptionsWithHost = {
 *   host: 'redis.example.com',
 *   port: 6379,
 *   username: 'default',
 *   password: 'secret',
 *   prefix: 'myapp:',
 *   ttl: 3600
 * };
 * ```
 */
export interface RedisOptionsWithHost extends CommonRedisOptions {
    /**
     * Redis server hostname or IP address.
     *
     * The domain name or IP address of the Redis server to connect to.
     *
     * @example
     * host: 'redis.example.com'
     * @example
     * host: '10.0.0.12'
     */
    host: string;

    /**
     * Redis server port number.
     *
     * The TCP port on which the Redis server is listening.
     * If not specified, defaults to the standard Redis port (6379).
     *
     * @default 6379
     * @example
     * port: 6380
     */
    port?: number;

    /**
     * Redis server authentication password.
     *
     * The password to use when authenticating with the Redis server.
     * Required if the Redis server has password authentication enabled.
     *
     * @example
     * password: 'your-secure-password'
     */
    password?: string;

    /**
     * Redis server authentication username.
     *
     * The username to use when authenticating with the Redis server.
     * Required for Redis servers version 6.0+ that use ACL-based authentication.
     *
     * @example
     * username: 'admin'
     */
    username?: string;
}

/**
 * Union type representing all supported Redis configuration options.
 *
 * This type combines both URL-based and host-based configuration options,
 * allowing for flexible Redis configuration throughout the application.
 *
 * @example
 * ```typescript
 * // Function that accepts any valid Redis configuration
 * function configureRedisCache(options: RedisOptions) {
 *   // Implementation that handles both connection types
 *   if ('url' in options) {
 *     // Handle URL-based connection
 *   } else {
 *     // Handle host-based connection
 *   }
 * }
 * ```
 */
export type RedisOptions = RedisOptionsWithUrl | RedisOptionsWithHost;
