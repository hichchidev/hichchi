// noinspection JSUnusedGlobalSymbols

import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { RequestWithSubdomain, SUBDOMAIN_KEY } from "@hichchi/nest-core";

/**
 * Request subdomain decorator
 *
 * This decorator is used to get the subdomain from the request.
 *
 * @example
 * ```TypeScript
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
export function Subdomain(): ParameterDecorator {
    return createParamDecorator((_data: unknown, ctx: ExecutionContext): string | undefined => {
        const request = ctx.switchToHttp().getRequest<RequestWithSubdomain>();
        return request[SUBDOMAIN_KEY];
    })();
}
