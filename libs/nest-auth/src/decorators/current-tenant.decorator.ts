import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Request } from "express";
import { HEADER_TENANT_KEY, User } from "@hichchi/nest-connector/auth";

/**
 * Current Tenant Decorator
 *
 * This decorator extracts the tenant identifier from the incoming request headers.
 * It reads the value of `TENANT_HEADER_KEY` and provides it directly to controller method parameters.
 *
 * Note: This decorator expects the `x-tenant` header to be present in the request.
 *
 * @example
 * ```TypeScript
 * @Controller("tenant")
 * export class TenantController {
 *     @Get()
 *     async getTenant(@CurrentTenant() tenant: TenantSlug): Promise<string> {
 *         return tenant;
 *     }
 * }
 * ```
 *
 * @returns {ParameterDecorator} The parameter decorator
 */
export function CurrentTenant(): ParameterDecorator {
    return createParamDecorator((_data: unknown, ctx: ExecutionContext): string | undefined => {
        const request = ctx.switchToHttp().getRequest<Request & { user: User }>();
        return request.user?.tenant
            ? typeof request.user?.tenant === "string"
                ? request.user?.tenant
                : request.user?.tenant.slug
            : request.header(HEADER_TENANT_KEY);
    })();
}
