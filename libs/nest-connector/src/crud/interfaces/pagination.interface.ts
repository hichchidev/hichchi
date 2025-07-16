/**
 * Interface for standardized pagination parameters across the application.
 *
 * The `Pagination` interface provides a consistent way to handle pagination
 * throughout API endpoints and database queries. It follows the offset-based
 * pagination pattern with two primary parameters:
 *
 * - `skip`: Number of records to skip (offset)
 * - `take`: Maximum number of records to return (limit)
 *
 * This interface is designed to be simple yet flexible, allowing for easy
 * implementation in various contexts such as REST API controllers, GraphQL
 * resolvers, and database repository methods.
 *
 * Both parameters are optional to allow for different pagination scenarios:
 * - Providing both `skip` and `take` enables standard pagination
 * - Providing only `take` returns the first N records
 * - Providing only `skip` skips N records but returns all remaining
 * - Providing neither returns all records (use with caution)
 *
 * @remarks
 * When implementing pagination in endpoints, consider adding validation to prevent
 * excessive page sizes that could impact performance. A typical approach is to
 * cap the maximum `take` value and provide sensible defaults.
 *
 * @example
 * ```typescript
 * // In a controller or service
 * async getUsers(pagination: Pagination): Promise<User[]> {
 *   const { skip = 0, take = 10 } = pagination;
 *   return this.userRepository.find({
 *     skip,
 *     take,
 *     order: { createdAt: 'DESC' }
 *   });
 * }
 *
 * // API usage
 * // GET /users?skip=20&take=10 - Returns records 21-30
 * ```
 */
export interface Pagination {
    /**
     * Number of records to skip before beginning to return results.
     *
     * This is equivalent to the SQL OFFSET parameter and determines
     * the starting point in the result set. The first record has an
     * offset of 0.
     *
     * @example
     * skip: 10 // Skip the first 10 records
     */
    skip?: number;

    /**
     * Maximum number of records to return in the result set.
     *
     * This is equivalent to the SQL LIMIT parameter and controls
     * how many records will be included in the response. It's recommended
     * to set reasonable limits to prevent performance issues.
     *
     * @example
     * take: 25 // Return at most 25 records
     */
    take?: number;
}
