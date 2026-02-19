import { BadRequestException, createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Request } from "express";
import { HEADER_TENANT_ID_KEY, User } from "@hichchi/nest-connector/auth";
import { HttpClientErrorStatus as ClientError } from "@hichchi/nest-connector";

export interface CurrentTenantIdOptions {
    optional?: boolean;
}

// noinspection JSUnusedGlobalSymbols
/**
 * Current Tenant ID Decorator
 *
 * This decorator extracts the tenant identifier from the incoming request headers.
 * It reads the value of `HEADER_TENANT_ID_KEY` and provides it directly to controller method parameters.
 *
 * Note: This decorator expects the `x-tenant-id` header to be present in the request unless
 * the `options.optional` argument is set to `true`.
 *
 * @example
 * ```TypeScript
 * @Controller("tenant")
 * export class TenantController {
 *     @Get()
 *     async getTenant(@CurrentTenantId() tenantId: EntityId): Promise<string> {
 *         return tenant;
 *     }
 * }
 * ```
 *
 * @example
 * ```TypeScript
 * @Controller("tenant")
 * export class TenantController {
 *     @Get("optional")
 *     async getTenantOptional(@CurrentTenantId({ optional: true }) tenantId?: EntityId): Promise<string | undefined> {
 *         return tenantId;
 *     }
 * }
 * ```
 *
 * @param {CurrentTenantIdOptions} [options] Decorator options.
 * @param {boolean} [options.optional=false] When `true`, the decorator does not throw if tenant id is missing
 * and returns `undefined` instead.
 *
 * @returns {ParameterDecorator} The parameter decorator
 */
export function CurrentTenantId(options?: CurrentTenantIdOptions): ParameterDecorator {
    return createParamDecorator((_data: unknown, ctx: ExecutionContext): string | undefined => {
        const request = ctx.switchToHttp().getRequest<Request & { user: User }>();
        const tenantId =
            request.user.tenantId ||
            (request.user?.tenant
                ? typeof request.user?.tenant === "string"
                    ? request.user.tenant
                    : request.user.tenant.id
                : request.header(HEADER_TENANT_ID_KEY));

        if (!options?.optional && !tenantId) {
            throw new BadRequestException({
                statusCode: ClientError.BAD_REQUEST,
                code: `TENANT_${ClientError.BAD_REQUEST}_EMPTY_ID`,
                message: "Tenant id should not be empty!",
            });
        }

        return tenantId;
    })();
}
