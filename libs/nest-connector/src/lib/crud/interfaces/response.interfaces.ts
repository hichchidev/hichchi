import { Pagination } from "./pagination.interface";

/**
 * Interface for standardized paginated API responses.
 *
 * The `PaginatedResponse<T>` interface defines a consistent structure for returning
 * paginated data from API endpoints. It extends the `Pagination` interface to include
 * the pagination parameters that were applied, along with the result data and metadata
 * about the total number of records.
 *
 * This interface is generic, with the type parameter `T` representing the type of
 * items contained in the response. This allows for strong typing of the response
 * data while maintaining a consistent envelope structure.
 *
 * Key features:
 * - Contains the actual data items in the `data` array
 * - Includes the total row count for calculating total pages
 * - Preserves the pagination parameters used in the request
 * - Enables consistent handling of paginated data across the frontend
 *
 * @template T The type of items contained in the response data array
 *
 * @example
 * ```typescript
 * // In a controller
 * @Get()
 * async getUsers(
 *    @Pager() pagination?: Pagination,
 * ): Promise<PaginatedResponse<UserDto>> {
 *   const { skip = 0, take = 10 } = pagination;
 *
 *   const [users, rowCount] = await this.userService.findAndCount({
 *     skip,
 *     take
 *   });
 *
 *   return {
 *     data: users,
 *     rowCount,
 *     skip,
 *     take
 *   };
 * }
 *
 * // Response structure:
 * // {
 * //   "data": [{...}, {...}],
 * //   "rowCount": 42,
 * //   "skip": 0,
 * //   "take": 10
 * // }
 * ```
 *
 * @see {@link Pagination} The base interface for pagination parameters
 */
export interface PaginatedResponse<T> extends Pagination {
    /**
     * Array containing the paginated data items.
     *
     * This property holds the actual data requested by the client, limited
     * by the pagination parameters. The type of items in this array is
     * determined by the generic type parameter `T`.
     *
     * @example
     * data: [{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }]
     */
    data: T[];

    /**
     * The total number of records available across all pages.
     *
     * This value represents the total count of records that match the query
     * criteria before pagination was applied. It's essential for calculating
     * the total number of pages and implementing pagination controls in user
     * interfaces.
     *
     * @example
     * rowCount: 42 // There are 42 total records matching the criteria
     */
    rowCount: number;
}
