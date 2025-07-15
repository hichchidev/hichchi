import { Model } from "../../crud";
import { User } from "./user.interface";

export interface RoleBase<R extends string = string, P extends string = string> {
    /**
     * Human-readable name of the role.
     *
     * Used for display purposes and should be descriptive of the role's purpose
     * or level of access (e.g., "Admin", "Moderator", "User").
     */
    name: R;

    /**
     * Array of permission identifiers granted to this role.
     *
     * Each string in this array represents a specific permission or capability
     * within the system. The authorization system uses these permissions to determine
     * if a user with this role can perform specific actions.
     */
    permissions: P[] | null;

    /**
     * Optional numeric value indicating the role's precedence.
     *
     * When a user has multiple roles, the role with the highest priority (higher number)
     * may take precedence in authorization decisions. This allows for implementing
     * hierarchical role structures.
     */
    priority: number | null;
}

/**
 * Interface representing a user role for authorization purposes.
 *
 * The `Role` interface defines the structure of authorization roles in the system.
 * Roles are used to group permissions and assign them to users, enabling a role-based
 * access control (RBAC) system. Each role contains a unique identifier, a descriptive name,
 * a list of permissions, and an optional priority level that can be used for role
 * precedence in authorization decisions.
 *
 * Roles are typically assigned to users and determine what actions they can perform
 * within the application.
 *
 * @interface Role
 *
 * @see {@link User} Interface for user information which references roles
 */
export interface Role<R extends string = string, P extends string = string> extends RoleBase<R, P>, Model {
    users: User<R, P>[] | null;
}
