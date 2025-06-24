// noinspection JSUnusedGlobalSymbols

import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { SortOptions } from "../types";
import { parseSortOptions } from "../utils";

/**
 * Sort parameter decorator
 *
 * This decorator extracts and parses the sort query parameter from the request and
 * transforms it into a structured SortOptions object that can be used for ordering
 * query results. It simplifies implementing sorting functionality in API endpoints
 * by automatically parsing sort expressions.
 *
 * The decorator extracts the `sort` query parameter, which should be a string in the
 * format `field1.order1,field2.order2,...` where:
 * - `field` is the name of the entity property to sort by
 * - `order` is either 'asc' (ascending) or 'desc' (descending)
 *
 * When the sort parameter is present, the decorator:
 * 1. Extracts the sort string from the request query
 * 2. Parses the sort string into field-order pairs
 * 3. Creates a SortOptions object mapping each field to its sort direction
 * 4. Returns a structured SortOptions object that can be used in repository queries
 *
 * If the sort parameter is missing, the decorator returns undefined, allowing the
 * endpoint to handle unsorted requests appropriately.
 *
 * @example
 * ```TypeScript
 * // Basic usage example
 * @Controller("users")
 * export class UserController {
 *     constructor(private userService: UserService) {}
 *
 *     @Get()
 *     async getUsers(@Sorter() sort?: SortOptions<User>) {
 *         // If sort parameters are provided, use them to order results
 *         if (sort) {
 *             return this.userService.findMany({ order: sort });
 *         }
 *
 *         // Otherwise, use default sorting
 *         return this.userService.findMany({
 *             order: { createdAt: 'desc' }
 *         });
 *     }
 * }
 * ```
 *
 * @example
 * ```TypeScript
 * // Advanced usage with multiple query parameters
 * @Controller("products")
 * export class ProductController {
 *     constructor(private productService: ProductService) {}
 *
 *     @Get()
 *     async getProducts(
 *         @Search() search?: FilterOptions<Product>,
 *         @Filters() filters?: FilterOptions<Product>,
 *         @Sorter() sort?: SortOptions<Product>,
 *         @Pager() pagination?: Pagination
 *     ) {
 *         // Build query options with all parameters
 *         const options = {
 *             where: { ...filters, ...search },
 *             order: sort || { createdAt: 'desc' }
 *         };
 *
 *         // Add pagination if provided
 *         if (pagination) {
 *             options.skip = pagination.skip;
 *             options.take = pagination.take;
 *         }
 *
 *         return this.productService.findMany(options);
 *     }
 * }
 * ```
 *
 * @returns {ParameterDecorator} A parameter decorator that extracts and parses sort parameters
 *
 * @see {@link SortOptions} The sort options structure returned by this decorator
 * @see {@link parseSortOptions} The utility function used to parse sort parameters
 * @see {@link Search} Related decorator for extracting search parameters
 * @see {@link Filters} Related decorator for extracting filter parameters
 * @see {@link Pager} Related decorator for extracting pagination parameters
 */
export function Sorter(): ParameterDecorator {
    return createParamDecorator((_data: unknown, ctx: ExecutionContext): SortOptions | undefined => {
        const req: { query: { sort?: string } } = ctx.switchToHttp().getRequest();
        return typeof req.query?.sort === "string" ? parseSortOptions(req.query.sort) : undefined;
    })();
}
