// noinspection JSUnusedGlobalSymbols

import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Request } from "express";
import { parseFilterObject } from "../utils";
import { FilterOptions } from "../types";
import { LiteralObject } from "@hichchi/utils";

/**
 * Filter parameter decorator
 *
 * This decorator extracts filter parameters from the request query and transforms them
 * into a structured filter object that can be used for filtering entities. It simplifies
 * implementing filter functionality in API endpoints by automatically parsing query
 * parameters into a usable filter structure.
 *
 * The decorator:
 * 1. Extracts all query parameters from the request
 * 2. Removes special parameters (page, limit, sort, searchValue, searchFields) that are handled by other decorators
 * 3. Parses the remaining parameters into a structured filter object using dot notation for nested properties
 * 4. Returns a FilterOptions object that can be used directly in repository queries
 *
 * This approach allows clients to filter entities using simple query parameters like
 * `?status=active&user.role=admin` which get transformed into structured filter objects.
 *
 * @example
 * ```TypeScript
 * // Basic usage example
 * @Controller("users")
 * export class UserController {
 *     constructor(private userService: UserService) {}
 *
 *     @Get()
 *     async getUsers(@Filters() filters?: FilterOptions<User>) {
 *         // If filter parameters are provided, use them to filter results
 *         if (filters) {
 *             return this.userService.findMany({ where: filters });
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
 * @returns {ParameterDecorator} A parameter decorator that extracts filter parameters
 *
 * @see {@link FilterOptions} The filter options structure returned by this decorator
 * @see {@link parseFilterObject} The utility function used to parse filter parameters
 * @see {@link Search} Related decorator for extracting search parameters
 * @see {@link Sorter} Related decorator for extracting sort parameters
 * @see {@link Pager} Related decorator for extracting pagination parameters
 */
export function Filters(): ParameterDecorator {
    return createParamDecorator((_data: unknown, ctx: ExecutionContext): FilterOptions | undefined => {
        const req: Request = ctx.switchToHttp().getRequest();
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { page, limit, sort, searchValue, searchFields, ...filters } = req.query as LiteralObject<string>;
        return parseFilterObject(filters);
    })();
}
