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
export const TENANT_HEADER_KEY = "x-tenant";
