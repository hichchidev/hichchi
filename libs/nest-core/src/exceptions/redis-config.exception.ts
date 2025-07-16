import { RuntimeException } from "@nestjs/core/errors/exceptions";

/**
 * Exception for reporting Redis configuration errors
 *
 * This exception is thrown when there's an issue with Redis configuration,
 * specifically when required connection parameters are missing. It's primarily
 * used by the CacheModule when validating Redis connection options.
 *
 * The exception extends NestJS's RuntimeException and provides a clear error
 * message about what configuration parameter is missing or invalid.
 *
 * @example
 * ```typescript
 * // Thrown when neither host nor url is provided in Redis options
 * throw new RedisConfigException(
 *   'Redis host or url is not provided while registering RedisCacheModule'
 * );
 * ```
 *
 * @example
 * ```typescript
 * // Validating Redis configuration
 * function validateRedisConfig(options: RedisOptions): void {
 *   if (!('host' in options) && !('url' in options)) {
 *     throw new RedisConfigException('Missing required Redis connection parameters');
 *   }
 * }
 * ```
 *
 * @see {@link CacheModule} The module that uses this exception for Redis configuration validation
 */
export class RedisConfigException extends RuntimeException {
    /**
     * Creates a new RedisConfigException
     *
     * @param {string} message - The error message describing what configuration issue occurred
     */
    constructor(public override message: string) {
        super(message);
    }
}
