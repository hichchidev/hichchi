// noinspection JSUnusedGlobalSymbols

import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Pagination } from "@hichchi/nest-connector/crud";

/**
 * Page decorator
 *
 * This decorator is used to get the page and limit from the request query.
 *
 * @example
 * ```TypeScript
 * @Controller("user")
 * export class UserController {
 *     @Get()
 *     async getUsers(@Pager() pager?: IPagination): Promise<User[]> {
 *         // Implementation
 *     }
 * }
 * ```
 * @returns {ParameterDecorator} The parameter decorator
 * */
export function Pager(): ParameterDecorator {
    return createParamDecorator((_data: unknown, ctx: ExecutionContext): Pagination | undefined => {
        const req: { query: { page?: string; limit?: string } } = ctx.switchToHttp().getRequest();

        if (req.query?.page && req.query?.limit) {
            const p = Number(req.query.page);
            const t = Number(req.query.limit);
            const page: number = p ? p : 1;
            const take: number = t ? t : 10;
            delete req.query.page;
            delete req.query.limit;
            return { take, skip: (page - 1) * take };
        }

        return undefined;
    })();
}
