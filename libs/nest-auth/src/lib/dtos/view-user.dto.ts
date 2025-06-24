import { IViewDto } from "@hichchi/nest-core";
import { User } from "@hichchi/nest-connector/auth";

/**
 * A Data Transfer Object (`DTO`) class used for viewing user data.
 * This class ensures that the user data is formatted and structured for output or display purposes.
 * Implements the {@link IViewDto} interface for standardized data formatting operations.
 */
export class ViewUserDto implements IViewDto {
    formatDataSet(user: User): User {
        return user;
    }
}
