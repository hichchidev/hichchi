import { Request } from "express";
import { SUBDOMAIN_KEY } from "../tokens";

/**
 * Extended Express Request interface that includes subdomain information.
 *
 * The `RequestWithSubdomain` interface extends the standard Express `Request`
 * interface to include subdomain information extracted from the incoming request's
 * hostname. This is particularly useful for multi-tenant applications where
 * different subdomains might represent different tenants or environments.
 *
 * This interface uses the `SUBDOMAIN_KEY` token (defined as "subdomain") as a
 * dynamic property key to store the subdomain value. The use of a token constant
 * ensures consistency across the application when accessing this property.
 *
 * @remarks
 * This interface is typically used in conjunction with a middleware that extracts
 * the subdomain from the request's hostname and attaches it to the request object.
 * The subdomain property is optional since not all requests may have or need subdomain
 * information.
 *
 * @example
 * ```typescript
 * // In a subdomain extraction middleware
 * export function subdomainMiddleware(
 *   req: Request,
 *   res: Response,
 *   next: NextFunction
 * ) {
 *   const hostname = req.hostname; // e.g., "tenant1.example.com"
 *   const subdomain = hostname.split('.')[0]; // e.g., "tenant1"
 *
 *   // Cast to RequestWithSubdomain and set the subdomain
 *   (req as RequestWithSubdomain)[SUBDOMAIN_KEY] = subdomain;
 *
 *   next();
 * }
 *
 * // In a controller
 * @Get()
 * findAll(@Req() request: RequestWithSubdomain) {
 *   const subdomain = request[SUBDOMAIN_KEY];
 *
 *   if (subdomain) {
 *     // Perform tenant-specific operations based on subdomain
 *     return this.service.findAllForTenant(subdomain);
 *   }
 *
 *   return this.service.findAll();
 * }
 * ```
 *
 * @see {@link SUBDOMAIN_KEY} The token used as the property key
 */
export interface RequestWithSubdomain extends Request {
    /**
     * The subdomain extracted from the request's hostname.
     *
     * This property uses the `SUBDOMAIN_KEY` token ("subdomain") as its key,
     * allowing for dynamic access. The value represents the subdomain portion
     * of the hostname from which the request originated.
     *
     * For example, if the request came from "tenant1.example.com", this property
     * would typically contain "tenant1".
     *
     * The property is optional since not all requests will necessarily have
     * a subdomain (e.g., requests to the root domain).
     *
     * @example
     * const subdomain = request[SUBDOMAIN_KEY]; // e.g., "tenant1"
     */
    [SUBDOMAIN_KEY]?: string;
    originUrl: string;
}
