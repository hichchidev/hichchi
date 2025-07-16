// noinspection JSUnusedGlobalSymbols

import { Inject, Injectable } from "@nestjs/common";
import { CACHE_MANAGER, Cache } from "@nestjs/cache-manager";

/**
 * Cache Service
 *
 * This service provides a wrapper around the NestJS cache manager for storing and retrieving data.
 * It offers type-safe methods for getting, setting, and deleting cache entries with error handling.
 *
 * @example
 * ```TypeScript
 * // Inject the service
 * constructor(private readonly cacheService: CacheService) {}
 *
 * // Store a value in cache
 * await cacheService.set('user:123', { name: 'John Doe' }, 3600); // expires in 1 hour
 *
 * // Retrieve a value from cache
 * const user = await cacheService.get<{ name: string }>('user:123');
 *
 * // Delete a value from cache
 * await cacheService.delete('user:123');
 * ```
 *
 * @see {@link CacheModule} The module that provides this service
 */
@Injectable()
export class CacheService {
    constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

    /**
     * Get a value from cache
     *
     * This method retrieves a value from the cache by its key.
     * It returns undefined if the key doesn't exist or if there's an error during retrieval.
     *
     * @template T - The type of the cached value
     * @param {string} key - The unique key to identify the cached value
     * @returns {Promise<T | undefined>} The cached value if found, undefined otherwise
     *
     * @example
     * ```TypeScript
     * // Get a string value
     * const message = await cacheService.get<string>('greeting');
     *
     * // Get a complex object
     * const user = await cacheService.get<User>('user:123');
     * if (user) {
     *   console.log(`Found user: ${user.name}`);
     * } else {
     *   console.log('User not found in cache');
     * }
     * ```
     */
    async get<T = unknown>(key: string): Promise<T | undefined> {
        try {
            return await this.cacheManager.get<T>(key);
        } catch {
            return undefined;
        }
    }

    /**
     * Set a value in cache
     *
     * This method stores a value in the cache with the specified key.
     * An optional time-to-live (TTL) can be provided to automatically expire the cache entry.
     *
     * @template T - The type of the value to cache
     * @param {string} key - The unique key to identify the cached value
     * @param {T} value - The value to store in cache
     * @param {number} [ttl] - Optional time-to-live in seconds
     * @returns {Promise<boolean>} True if the operation was successful, false otherwise
     *
     * @example
     * ```TypeScript
     * // Store a simple value with no expiration
     * await cacheService.set('greeting', 'Hello, World!');
     *
     * // Store an object with a 1-hour expiration
     * await cacheService.set(
     *   'user:123',
     *   { id: 123, name: 'John Doe', email: 'john@example.com' },
     *   3600 // 1 hour in seconds
     * );
     * ```
     */
    async set<T = unknown>(key: string, value: T, ttl?: number): Promise<boolean> {
        try {
            await this.cacheManager.set(key, value, ttl);
            return true;
        } catch {
            return false;
        }
    }

    /**
     * Delete a value from cache
     *
     * This method removes a value from the cache by its key.
     * It returns true if the operation was successful, false if there was an error.
     *
     * @param {string} key - The unique key of the cached value to delete
     * @returns {Promise<boolean>} True if the operation was successful, false otherwise
     *
     * @example
     * ```TypeScript
     * // Delete a cached value
     * const success = await cacheService.delete('user:123');
     * if (success) {
     *   console.log('Cache entry successfully deleted');
     * } else {
     *   console.error('Failed to delete cache entry');
     * }
     * ```
     */
    async delete(key: string): Promise<boolean> {
        try {
            await this.cacheManager.del(key);
            return true;
        } catch {
            return false;
        }
    }
}
