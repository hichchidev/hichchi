import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Request } from "express";
import { TENANT_HEADER_KEY } from "@hichchi/nest-connector/auth";

/**
 * Tenant Decorator
 *
 * This decorator extracts the tenant identifier from the incoming request headers.
 * It reads the value of `TENANT_HEADER_KEY` and provides it directly to controller method parameters.
 *
 * Note: This decorator expects the tenant header to be present in the request.
 *
 * @example
 * ```TypeScript
 * @Controller("tenant")
 * export class TenantController {
 *     @Get()
 *     async getTenant(@Tenant() tenant: TenantSlug): Promise<string> {
 *         return tenant;
 *     }
 * }
 * ```
 *
 * @returns {ParameterDecorator} The parameter decorator
 */
export function Tenant(): ParameterDecorator {
    return createParamDecorator((_data: unknown, ctx: ExecutionContext): string | undefined => {
        const request = ctx.switchToHttp().getRequest<Request>();
        return request.header(TENANT_HEADER_KEY);
    })();
}
