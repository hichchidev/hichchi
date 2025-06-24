import { Injectable, NestMiddleware } from "@nestjs/common";
import { json } from "body-parser";
import { IncomingMessage, ServerResponse } from "http";
import { NextFunction } from "express";

/**
 * Middleware for parsing JSON request bodies
 *
 * This middleware uses the body-parser's json function to parse JSON request bodies
 * and make them available in the request.body property. It's a simple wrapper around
 * the body-parser middleware that makes it compatible with NestJS's middleware system.
 *
 * When applied to a route or globally, this middleware will automatically parse
 * incoming request bodies with Content-Type: application/json and populate the
 * request.body object with the parsed JSON data.
 *
 * @example
 * ```typescript
 * // Apply globally in your AppModule
 * @Module({
 *   // ...
 * })
 * export class AppModule implements NestModule {
 *   configure(consumer: MiddlewareConsumer) {
 *     consumer
 *       .apply(JsonBodyMiddleware)
 *       .forRoutes('*');
 *   }
 * }
 * ```
 *
 * @example
 * ```typescript
 * // Apply to specific routes
 * @Module({
 *   // ...
 * })
 * export class AppModule implements NestModule {
 *   configure(consumer: MiddlewareConsumer) {
 *     consumer
 *       .apply(JsonBodyMiddleware)
 *       .forRoutes(
 *         { path: 'users', method: RequestMethod.POST },
 *         { path: 'users', method: RequestMethod.PUT }
 *       );
 *   }
 * }
 * ```
 *
 * @see {@link https://github.com/expressjs/body-parser#bodyparserjsonoptions} body-parser json documentation
 */
@Injectable()
export class JsonBodyMiddleware implements NestMiddleware {
    /**
     * Applies the JSON body parser middleware to the request
     *
     * This method is called by NestJS for each request that matches the routes
     * where this middleware is applied. It invokes the body-parser's json middleware
     * with default options to parse the request body.
     *
     * After this middleware processes a request, the parsed JSON data will be
     * available in the request.body property for subsequent handlers.
     *
     * @param {IncomingMessage} req - The incoming HTTP request
     * @param {ServerResponse} res - The outgoing HTTP response
     * @param {NextFunction} next - Function to call the next middleware in the chain
     * @returns {void}
     */
    use(req: IncomingMessage, res: ServerResponse, next: NextFunction): void {
        json()(req, res, next);
    }
}
