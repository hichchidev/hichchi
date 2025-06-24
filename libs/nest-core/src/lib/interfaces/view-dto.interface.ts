/**
 * Interface for Data Transfer Objects (DTOs) that transform data for presentation.
 *
 * The `IViewDto` interface defines a contract for DTOs that are responsible for
 * formatting and transforming data from internal models or entities into a structure
 * suitable for client presentation. This interface enables a clean separation between
 * internal data representations and the data exposed through APIs.
 *
 * This interface uses generic type parameters to provide type safety throughout the
 * transformation process:
 * - `T`: The input data type (typically an entity or internal model)
 * - `R`: The output data type (the transformed view representation)
 *
 * By implementing this interface, DTOs can standardize how data transformations
 * are performed across an application, ensuring consistency in API responses
 * and making the transformation logic explicit and testable.
 *
 * @template T The input data type to be transformed (defaults to unknown)
 * @template R The output data type after transformation (defaults to unknown)
 *
 * @example
 * ```typescript
 * // Entity from database
 * class User {
 *   id: number;
 *   firstName: string;
 *   lastName: string;
 *   email: string;
 *   password: string; // Sensitive field
 *   createdAt: Date;
 *   updatedAt: Date;
 * }
 *
 * // DTO for API responses
 * class UserViewDto implements IViewDto<User, UserView> {
 *   formatDataSet(user?: User): UserView | null {
 *     if (!user) return null;
 *
 *     return {
 *       id: user.id,
 *       fullName: `${user.firstName} ${user.lastName}`,
 *       email: user.email,
 *       joinedOn: user.createdAt.toISOString().split('T')[0]
 *       // Note: password and other sensitive fields are excluded
 *     };
 *   }
 * }
 *
 * // In a controller
 * @Get(':id')
 * async getUser(@Param('id') id: number) {
 *   const user = await this.userService.findById(id);
 *   const userViewDto = new UserViewDto();
 *   return userViewDto.formatDataSet(user);
 * }
 * ```
 */
export interface IViewDto<T = unknown, R = unknown> {
    /**
     * Transforms input data into a view-friendly format.
     *
     * This method is responsible for converting the internal data representation
     * (of type T) into a format suitable for client consumption (of type R).
     * The transformation can include:
     *
     * - Excluding sensitive or internal-only fields
     * - Renaming fields to be more user-friendly
     * - Combining multiple fields into more meaningful representations
     * - Formatting dates, numbers, or other values for presentation
     * - Adding computed properties derived from the input data
     *
     * If the input data is undefined or otherwise invalid, the method should
     * typically return null to indicate no data is available for formatting.
     *
     * @param data The input data to transform. May be undefined if no data is available.
     * @returns The transformed data object of type R, or null if input data is unavailable or invalid.
     *
     * @example
     * formatDataSet(user): UserView | null {
     *   if (!user) return null;
     *
     *   return {
     *     id: user.id,
     *     displayName: user.displayName || `${user.firstName} ${user.lastName}`,
     *     contactInfo: {
     *       email: user.email,
     *       phone: user.phoneFormatted
     *     },
     *     memberSince: formatDate(user.createdAt)
     *   };
     * }
     */
    formatDataSet(data?: T): R | null;
}
