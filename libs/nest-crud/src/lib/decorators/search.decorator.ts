// noinspection JSUnusedGlobalSymbols

import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { parseSearchString } from "../utils";
import { QueryDeepPartial } from "@hichchi/nest-connector/crud";

/**
 * Search parameter decorator
 *
 * This decorator extracts search parameters from the request query and transforms them
 * into a structured filter object that can be used for searching entities. It simplifies
 * implementing search functionality in API endpoints by automatically parsing search
 * values and fields.
 *
 * The decorator extracts two query parameters:
 * 1. `searchValue`: The text or value to search for
 * 2. `searchFields`: Comma-separated list of fields to search in (e.g., "name,email,description")
 *
 * When both parameters are present, the decorator:
 * 1. Extracts the search value and fields from the request query
 * 2. Parses the search fields string into an array of field paths
 * 3. Creates a filter object where each field path is mapped to the search value
 * 4. Returns a structured FilterOptions object that can be used in repository queries
 *
 * If either parameter is missing, the decorator returns undefined, allowing the
 * endpoint to handle non-search requests appropriately.
 *
 * @example
 * ```TypeScript
 * // Basic usage example
 * @Controller("users")
 * export class UserController {
 *     constructor(private userService: UserService) {}
 *
 *     @Get()
 *     async getUsers(@Search() search?: FilterOptions<User>) {
 *         // If search parameters are provided, use them to filter results
 *         if (search) {
 *             return this.userService.findMany({ where: search });
 *         }
 *
 *         // Otherwise, return all users
 *         return this.userService.findAll();
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
 *         @Pager() pagination?: Pagination
 *     ) {
 *         // Combine search and filter conditions
 *         const where = { ...filters, ...search };
 *
 *         // Use combined conditions with pagination
 *         if (pagination) {
 *             return this.productService.findMany({
 *                 where,
 *                 skip: pagination.skip,
 *                 take: pagination.take
 *             });
 *         }
 *
 *         // Use just the combined conditions without pagination
 *         return this.productService.findMany({ where });
 *     }
 * }
 * ```
 *
 * @returns {ParameterDecorator} A parameter decorator that extracts search parameters
 *
 * @see {@link FilterOptions} The filter options structure returned by this decorator
 * @see {@link parseSearchString} The utility function used to parse search parameters
 * @see {@link Filters} Related decorator for extracting filter parameters
 */
export function Search(): ParameterDecorator {
    return createParamDecorator((_data: unknown, ctx: ExecutionContext): QueryDeepPartial | undefined => {
        const req: { query: { searchValue?: string; searchFields?: string } } = ctx.switchToHttp().getRequest();
        const { searchValue, searchFields } = req.query;
        return typeof searchValue === "string" ? parseSearchString(searchValue, searchFields) : undefined;
    })();
}
