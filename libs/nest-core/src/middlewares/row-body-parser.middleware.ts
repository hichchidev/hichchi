import { Injectable, NestMiddleware, RawBodyRequest } from "@nestjs/common";
import { json } from "body-parser";
import { IncomingMessage, ServerResponse } from "http";
import { NextFunction, Request } from "express";

/**
 * Middleware for capturing and preserving the raw request body
 *
 * This middleware extends the functionality of body-parser's json middleware
 * by capturing the raw request body buffer before it's parsed. The raw body
 * is stored in the request object's `rawBody` property, making it available
 * for subsequent handlers.
 *
 * This is particularly useful for scenarios where you need access to the
 * unparsed request body, such as:
 * - Webhook signature verification
 * - Custom binary data processing
 * - Debugging request payloads
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
 *       .apply(RawBodyMiddleware)
 *       .forRoutes('webhooks');
 *   }
 * }
 * ```
 *
 * @example
 * ```typescript
 * // Using the raw body in a controller
 * @Post('webhook')
 * handleWebhook(@Req() request: RawBodyRequest<Request>) {
 *   const rawBody = request.rawBody;
 *   const signature = request.headers['x-signature'];
 *
 *   // Verify webhook signature using the raw body
 *   const isValid = this.webhookService.verifySignature(
 *     rawBody,
 *     signature
 *   );
 *
 *   if (!isValid) {
 *     throw new UnauthorizedException('Invalid webhook signature');
 *   }
 *
 *   // Process the parsed body normally
 *   return this.webhookService.processWebhook(request.body);
 * }
 * ```
 *
 * @see {@link https://github.com/expressjs/body-parser#bodyparserjsonoptions} body-parser json documentation
 * @see {@link RawBodyRequest} NestJS interface for requests with raw body
 *
 * @author {@link https://github.com/golevelup/nestjs/blob/master/packages/webhooks/src/webhooks.middleware.ts}
 */
@Injectable()
export class RawBodyMiddleware implements NestMiddleware {
    /**
     * Applies the middleware to capture the raw request body
     *
     * This method configures body-parser's json middleware with a verify callback
     * that captures the raw request body buffer before it's parsed. The raw body
     * is stored in the request object's `rawBody` property.
     *
     * @param {IncomingMessage} req - The incoming HTTP request
     * @param {ServerResponse} res - The outgoing HTTP response
     * @param {NextFunction} next - Function to call the next middleware in the chain
     * @returns {void}
     */
    public use(req: IncomingMessage, res: ServerResponse, next: NextFunction): void {
        json({
            verify: (req: RawBodyRequest<Request>, res: ServerResponse, buffer: Buffer) => {
                if (Buffer.isBuffer(buffer)) {
                    req.rawBody = Buffer.from(buffer);
                }
                return true;
            },
        })(req, res, next);
    }
}
