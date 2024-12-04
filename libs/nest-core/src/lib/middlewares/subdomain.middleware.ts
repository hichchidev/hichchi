// noinspection JSUnusedGlobalSymbols

import { Injectable, NestMiddleware, Type } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { extractSubdomain } from "../utils";

/**
 * Subdomain Middleware
 *
 * This middleware is used to extract the subdomain from the request origin and attach it to the request object as subdomain
 *
 * @example
 * ```typescript
 * export class AppModule implements NestModule {
 *     configure(consumer: MiddlewareConsumer): any {
 *         consumer.apply(SubdomainMiddleware("example.com", "admin")).forRoutes("*");
 *     }
 * }
 *
 * ```
 *
 * @example
 * ```typescript
 * // if the domain is admin.example.com
 * SubdomainMiddleware("example.com", "local")
 *
 * // Attaches "admin"
 * ```
 *
 * @example
 * ```typescript
 * // if the domain is localhost or localhost:3000
 * SubdomainMiddleware("example.com", "local")
 *
 * // Attaches "local"
 * ```
 *
 * @param {string} splitDomain - Domain to split the url to get the subdomain
 * @param {string} ifLocalhost - String to return as subdomain if the domain is localhost
 * @returns {Type} - Middleware
 */
export function SubdomainMiddleware(splitDomain: string, ifLocalhost?: string): Type {
    @Injectable()
    class DynamicSubdomainMiddleware implements NestMiddleware {
        use(req: Request & { originUrl?: string; subdomain?: string }, _res: Response, next: NextFunction): void {
            const origin = req.headers.origin;
            req.originUrl = origin;
            req.subdomain = extractSubdomain(splitDomain, origin, ifLocalhost);
            next();
        }
    }

    return DynamicSubdomainMiddleware;
}
