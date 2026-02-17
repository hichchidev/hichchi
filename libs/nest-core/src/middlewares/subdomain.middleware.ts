// noinspection JSUnusedGlobalSymbols

import { Injectable, NestMiddleware, Type } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { extractSubdomain } from "@hichchi/utils";

/**
 * Factory function that creates a middleware for extracting and attaching subdomain information
 *
 * This middleware extracts the subdomain from the request's origin header and attaches it
 * to the request object as a 'subdomain' property. It's particularly useful for multi-tenant
 * applications where different subdomains represent different tenants or environments.
 *
 * The middleware uses the extractSubdomain utility function to parse the origin header
 * and extract the subdomain portion. For localhost environments, it can use a fallback
 * subdomain value specified by the ifLocalhost parameter.
 *
 * @example
 * ```TypeScript
 * // Apply globally in your AppModule
 * @Module({})
 * export class AppModule implements NestModule {
 *     configure(consumer: MiddlewareConsumer): any {
 *         // Apply to all routes
 *         consumer.apply(SubdomainMiddleware("example.com", "admin"))
 *             .forRoutes("*");
 *     }
 * }
 * ```
 *
 * @example
 * ```TypeScript
 * // When the request origin is admin.example.com
 * SubdomainMiddleware("example.com", "local")
 *
 * // The middleware extracts "admin" and attaches it to req.subdomain
 * ```
 *
 * @example
 * ```TypeScript
 * // When the request origin is localhost or localhost:3000
 * SubdomainMiddleware("example.com", "local")
 *
 * // The middleware uses the fallback value "local" and attaches it to req.subdomain
 * ```
 *
 * @param {string} splitDomain - The domain to use as a reference for extracting the subdomain
 * @param {string} [devSubdomain] - Optional fallback value to use as the subdomain for localhost requests
 * @returns {Type} A NestJS middleware class that can be applied to routes
 *
 * @see {@link extractSubdomain} The utility function used to extract the subdomain
 * @see {@link RequestWithSubdomain} Interface for requests with subdomain information
 */
export function SubdomainMiddleware(splitDomain: string, devSubdomain?: string): Type {
    /**
     * Dynamically created middleware class that implements NestMiddleware
     *
     * This class is created by the SubdomainMiddleware factory function and
     * implements the NestJS middleware interface. It extracts the subdomain
     * from the request origin and attaches it to the request object.
     *
     * @internal This class is not meant to be used directly
     */
    @Injectable()
    class DynamicSubdomainMiddleware implements NestMiddleware {
        /**
         * Process the request to extract and attach subdomain information
         *
         * This method extracts the subdomain from the request's origin header,
         * attaches both the original origin URL and the extracted subdomain to
         * the request object, and then passes control to the next middleware.
         *
         * The extracted subdomain is stored in req.subdomain, making it accessible
         * to subsequent middleware and route handlers.
         *
         * @param {Request & { originUrl?: string; subdomain?: string }} req - The HTTP request object with extended properties
         * @param {Response} _res - The HTTP response object (unused)
         * @param {NextFunction} next - Function to call the next middleware
         * @returns {void}
         */
        use(req: Request & { originUrl?: string; subdomain?: string }, _res: Response, next: NextFunction): void {
            const origin = req.headers.origin || `${req.protocol}://${req.hostname}`;
            req.originUrl = origin;
            req.subdomain = extractSubdomain(origin, splitDomain, devSubdomain);
            next();
        }
    }

    return DynamicSubdomainMiddleware;
}
