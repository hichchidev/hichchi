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

/**
 * Token for subdomain information in request objects
 *
 * This constant defines a token used as a dynamic property key in the RequestWithSubdomain
 * interface. It provides a consistent way to store and access subdomain information
 * extracted from request hostnames.
 *
 * The token is particularly useful for multi-tenant applications where different
 * subdomains represent different tenants or environments. Using a constant token
 * ensures consistency across the application when accessing this property.
 *
 * @example
 * ```typescript
 * // In a middleware that extracts subdomains
 * export function subdomainMiddleware(req: Request, res: Response, next: NextFunction) {
 *   const hostname = req.hostname; // e.g., "tenant1.example.com"
 *   const subdomain = hostname.split('.')[0]; // e.g., "tenant1"
 *
 *   // Store the subdomain in the request object
 *   (req as RequestWithSubdomain)[SUBDOMAIN_KEY] = subdomain;
 *
 *   next();
 * }
 * ```
 *
 * @example
 * ```typescript
 * // In a controller accessing the subdomain
 * @Controller()
 * export class SomeController {
 *   @Get()
 *   findAll(@Req() request: RequestWithSubdomain) {
 *     const subdomain = request[SUBDOMAIN_KEY];
 *
 *     if (subdomain) {
 *       // Perform tenant-specific operations
 *       return this.service.findAllForTenant(subdomain);
 *     }
 *
 *     return this.service.findAll();
 *   }
 * }
 * ```
 *
 * @see {@link RequestWithSubdomain} Interface that uses this token as a property key
 */
export const SUBDOMAIN_KEY = "subdomain";
