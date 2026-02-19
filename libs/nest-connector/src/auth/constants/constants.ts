/**
 * Header key for tenant identification
 *
 * This constant defines the HTTP header used to indicate the tenant in a request,
 * typically in multi-tenant applications. The value should be sent by the client
 * (or upstream gateway) in each request, for example as "x-tenant".
 *
 * Controllers and services can read this header directly from the request object
 * to perform tenant-specific logic.
 *
 * Using a constant prevents magic strings and ensures consistency across the app.
 *
 * @example
 * ```typescript
 * // Controller accessing the tenant directly from the header
 * @Controller()
 * export class SomeController {
 *   @Get()
 *   findAll(@Req() req: Request) {
 *     const tenant = req.header(TENANT_HEADER_KEY);
 *
 *     if (tenant) {
 *       // Perform tenant-specific operations
 *       return this.service.findAllForTenant(tenant);
 *     }
 *
 *     return this.service.findAll();
 *   }
 * }
 * ```
 */
export const HEADER_TENANT_KEY = "x-tenant";

/**
 * Header key for tenant identifier propagation.
 *
 * This constant defines the HTTP header used to pass a stable tenant identifier
 * (for example, an internal ID or UUID) in requests across services.
 *
 * Use this key when your auth/tenant resolution flow depends on tenant IDs
 * rather than tenant names or slugs.
 *
 * @example
 * ```typescript
 * // Extract tenant ID from request headers in a guard/controller
 * const tenantId = req.header(HEADER_TENANT_ID_KEY);
 *
 * if (!tenantId) {
 *   throw new UnauthorizedException("Missing tenant id header");
 * }
 * ```
 */
export const HEADER_TENANT_ID_KEY = "x-tenant-id";
