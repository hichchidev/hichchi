import { Pagination, PaginatedResponse as IPaginatedResponse } from "@hichchi/nest-connector/crud";

/**
 * Class for standardized paginated responses with page-based navigation
 *
 * The `PaginatedResponse<T>` class provides a consistent structure for returning
 * paginated data from API endpoints. It transforms the offset-based pagination
 * parameters (skip/take) into page-based navigation (page/limit) that is more
 * intuitive for frontend implementations.
 *
 * This class is designed to be returned directly from controllers or services
 * that implement pagination. It automatically calculates the page number and
 * limit based on the provided pagination parameters.
 *
 * Key features:
 * - Contains the actual data items in the `data` array
 * - Includes the total row count for calculating total pages
 * - Provides page number and limit for intuitive pagination controls
 * - Automatically calculates page from skip/take parameters
 *
 * @template T The type of items contained in the response data array
 *
 * @example
 * ```typescript
 * // In a controller
 * @Get()
 * async getUsers(@Pager() pagination?: Pagination): Promise<PaginatedResponse<UserDto>> {
 *   const [users, totalCount] = await this.userService.findAndCount({
 *     skip: pagination?.skip,
 *     take: pagination?.take
 *   });
 *
 *   return new PaginatedResponse(users, totalCount, pagination);
 * }
 * ```
 *
 * @example
 * ```typescript
 * // Response structure:
 * // {
 * //   "data": [{...}, {...}],
 * //   "rowCount": 42,
 * //   "page": 3,
 * //   "limit": 10
 * // }
 * ```
 *
 * @see {@link Pagination} The interface for pagination parameters (skip/take)
 */
export class PaginatedResponse<T> implements IPaginatedResponse<T> {
    static isPaginatedResponse<T>(response: unknown): response is PaginatedResponse<T> {
        return (
            response instanceof PaginatedResponse ||
            (Object.prototype.hasOwnProperty.call(response, "data") &&
                Object.prototype.hasOwnProperty.call(response, "rowCount") &&
                Object.prototype.hasOwnProperty.call(response, "page") &&
                Object.prototype.hasOwnProperty.call(response, "limit"))
        );
    }

    /**
     * Array containing the paginated data items
     *
     * This property holds the actual data requested by the client, limited
     * by the pagination parameters. The type of items in this array is
     * determined by the generic type parameter `T`.
     */
    data: T[];

    /**
     * The current page number (1-based)
     *
     * This property represents the current page number, calculated from
     * the skip and take parameters. The first page is 1.
     *
     * @default 0
     */
    page = 0;

    /**
     * The maximum number of items per page
     *
     * This property represents the maximum number of items that can be
     * displayed on a single page. It corresponds to the `take` parameter
     * in the pagination interface.
     *
     * @default 0
     */
    limit = 0;

    skip: number;

    take: number;

    /**
     * The total number of records available across all pages
     *
     * This value represents the total count of records that match the query
     * criteria before pagination was applied. It's essential for calculating
     * the total number of pages and implementing pagination controls in user
     * interfaces.
     */
    rowCount: number;

    /**
     * Creates a new paginated response
     *
     * @template T The type of items in the data array
     * @param {T[]} data - The array of data items for the current page
     * @param {number} totalCount - The total number of records across all pages
     * @param {Pagination} [pagination] - Optional pagination parameters used to calculate page and limit
     */
    constructor(data: T[], totalCount: number, pagination: Pagination) {
        this.data = data;
        this.rowCount = totalCount;
        this.page = pagination.page;
        this.limit = pagination.limit;
        this.skip = pagination.skip;
        this.take = pagination.take;
    }
}
