// noinspection JSUnusedGlobalSymbols

import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { SortOptions } from "../types";
import { parseSortOptions } from "../utils";

/**
 * Sort decorator
 *
 * This decorator is used to parse the sort query parameter and return the parsed object
 *
 * @example
 * ```TypeScript
 * @Controller("user")
 * export class UserController {
 *     @Get()
 *     async getUsers(@Sorter() sort?: SortOptions<IUserEntity>): Promise<User[]> {
 *         // Implementation
 *     }
 * }
 * ```
 *
 * @returns {ParameterDecorator} The parameter decorator
 */
export function Sorter(): ParameterDecorator {
    return createParamDecorator((_data: unknown, ctx: ExecutionContext): SortOptions | undefined => {
        const req: { query: { sort?: string } } = ctx.switchToHttp().getRequest();
        return typeof req.query?.sort === "string" ? parseSortOptions(req.query.sort) : undefined;
    })();
}
