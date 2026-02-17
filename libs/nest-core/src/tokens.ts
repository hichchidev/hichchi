// noinspection JSUnusedGlobalSymbols

/**
 * Token for cache configuration options
 *
 * This constant defines a token used for dependency injection of cache configuration
 * options in NestJS applications. It serves as a key for providing and retrieving
 * cache-related configuration throughout the application.
 *
 * The token is primarily used with NestJS's dependency injection system to provide
 * consistent access to cache configuration options across different modules and services.
 *
 * @example
 * ```typescript
 * // Providing cache options using the token
 * @Module({
 *   providers: [
 *     {
 *       provide: CACHE_OPTIONS,
 *       useValue: {
 *         ttl: 3600,
 *         max: 100
 *       }
 *     }
 *   ]
 * })
 * export class AppModule {}
 * ```
 *
 * @example
 * ```typescript
 * // Injecting cache options in a service
 * @Injectable()
 * export class SomeService {
 *   constructor(
 *     @Inject(CACHE_OPTIONS) private readonly cacheOptions: any
 *   ) {}
 *
 *   someMethod() {
 *     const ttl = this.cacheOptions.ttl;
 *     // Use the cache options...
 *   }
 * }
 * ```
 */
export const CACHE_OPTIONS = "cache_options";
