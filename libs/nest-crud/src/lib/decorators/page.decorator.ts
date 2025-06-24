// noinspection JSUnusedGlobalSymbols

import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Pagination } from "@hichchi/nest-connector/crud";
import { DEFAULT_ITEMS_PER_PAGE } from "@hichchi/nest-connector";

/**
 * Pagination parameter decorator
 *
 * This decorator extracts pagination parameters (page and limit) from the request query
 * and transforms them into a standardized Pagination object with `take` and `skip` properties.
 * It simplifies handling paginated API endpoints by automatically calculating the correct
 * offset based on the requested page number and items per page.
 *
 * When both page and limit query parameters are present, the decorator:
 * 1. Extracts and converts them to numbers
 * 2. Applies defaults if values are invalid (page defaults to 1, limit defaults to DEFAULT_ITEMS_PER_PAGE)
 * 3. Calculates the skip value as (page - 1) * take
 * 4. Removes the page and limit parameters from the query object to prevent conflicts
 * 5. Returns a Pagination object with take and skip properties
 *
 * If either page or limit is missing from the query, the decorator returns undefined,
 * allowing the endpoint to handle non-paginated requests differently if needed.
 *
 * @example
 * ```TypeScript
 * // Simple usage example
 * @Controller("products")
 * export class ProductController {
 *     constructor(private productService: ProductService) {}
 *
 *     @Get()
 *     async getProducts(@Pager() pagination?: Pagination) {
 *         // If pagination is provided, use it to fetch paginated results
 *         if (pagination) {
 *             return this.productService.findPaginated(pagination);
 *         }
 *
 *         // Otherwise, fetch all products
 *         return this.productService.findAll();
 *     }
 * }
 * ```
 *
 * @example
 * ```TypeScript
 * // Advanced usage with complete pagination handling
 * @Controller("users")
 * export class UserController {
 *     constructor(private userService: UserService) {}
 *
 *     @Get()
 *     async getUsers(
 *         @Pager() pagination?: Pagination
 *     ): Promise<User[] | PaginatedResponse<User>> {
 *         if (pagination) {
 *             // Handle paginated request
 *             const [users, total] = await this.userService.findAndCount({
 *                 skip: pagination.skip,
 *                 take: pagination.take
 *             });
 *
 *             return {
 *                 data: users,
 *                 meta: {
 *                     total,
 *                     page: Math.floor(pagination.skip / pagination.take) + 1,
 *                     lastPage: Math.ceil(total / pagination.take)
 *                 }
 *             };
 *         }
 *
 *         // Handle non-paginated request
 *         return this.userService.findAll();
 *     }
 * }
 * ```
 *
 * @returns {ParameterDecorator} A parameter decorator that extracts pagination information
 *
 * @see {@link Pagination} The pagination object structure returned by this decorator
 * @see {@link DEFAULT_ITEMS_PER_PAGE} The default number of items per page
 */
export function Pager(): ParameterDecorator {
    return createParamDecorator((_data: unknown, ctx: ExecutionContext): Pagination | undefined => {
        const req: { query: { page?: string; limit?: string } } = ctx.switchToHttp().getRequest();

        if (req.query?.page && req.query?.limit) {
            const p = Number(req.query.page);
            const t = Number(req.query.limit);
            const page: number = p ? p : 1;
            const take: number = t ? t : DEFAULT_ITEMS_PER_PAGE;
            delete req.query.page;
            delete req.query.limit;
            return { take, skip: (page - 1) * take };
        }

        return undefined;
    })();
}
