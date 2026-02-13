// noinspection JSUnusedGlobalSymbols

import { createParamDecorator, ExecutionContext, ForbiddenException } from "@nestjs/common";
import { RequestWithSubdomain, SUBDOMAIN_KEY } from "@hichchi/nest-core";
import { AuthErrors } from "@hichchi/nest-connector/auth";

/**
 * Request subdomain decorator
 *
 * This decorator is used to extract the subdomain from the current request.
 * It provides easy access to the subdomain within controller methods without manually accessing the request object.
 * It returns the subdomain string from the current request or undefined if no subdomain is present.
 *
 * Note: The `SubdomainMiddleware` must be applied to your routes for this decorator to work.
 *
 *
 * @example
 * ```TypeScript
 * @Module({...})
 * export class AppModule implements NestModule {
 *     configure(consumer: MiddlewareConsumer): void {
 *         consumer
 *             .apply(SubdomainMiddleware("google.com", "accounts"))
 *             .forRoutes("*");
 *     }
 * }
 *
 * @Controller("user")
 * export class UserController {
 *     @Get()
 *     async getUsers(@Subdomain() subdomain: string): Promise<User[]> {
 *         // Implementation
 *     }
 * }
 * ```
 *
 * @returns {ParameterDecorator} The parameter decorator
 */
export function Subdomain(required?: boolean): ParameterDecorator {
    return createParamDecorator((_data: unknown, ctx: ExecutionContext): string | undefined => {
        const request = ctx.switchToHttp().getRequest<RequestWithSubdomain>();
        const subdomain = request[SUBDOMAIN_KEY];
        if (required && !subdomain) {
            throw new ForbiddenException(AuthErrors.AUTH_403_SUB_DOMAIN_NOT_ALLOWED);
        }

        return request[SUBDOMAIN_KEY];
    })();
}
