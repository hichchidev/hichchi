import { IViewDto } from "@hichchi/nest-core";
import { User } from "@hichchi/nest-connector/auth";

/**
 * A Data Transfer Object (`DTO`) class used for viewing user data.
 * This class ensures that the user data is formatted and structured for output or display purposes.
 * Implements the {@link IViewDto} interface for standardized data formatting operations.
 */
export class ViewUserDto implements IViewDto {
    /**
     * Formats a user entity for output or display purposes.
     *
     * This method takes a User object and formats it for presentation.
     * In this implementation, it simply returns the user object as is,
     * but it could be extended to filter, transform, or enhance the user data.
     *
     * @param {User} user - The user entity to format
     * @returns {User} The formatted user data
     */
    formatDataSet(user: User): User {
        user.password = null;
        return user;
    }
}
