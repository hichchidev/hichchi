import { EntityId } from "../../crud/types";
import { Model } from "../../crud";

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
 * @see {@link RoleModel} Extended interface with database model properties
 */
export interface Role {
    /**
     * Unique identifier for the role.
     *
     * This ID is used to reference the role throughout the system and serves
     * as the primary key in the database.
     */
    id: EntityId;

    /**
     * Human-readable name of the role.
     *
     * Used for display purposes and should be descriptive of the role's purpose
     * or level of access (e.g., "Admin", "Moderator", "User").
     */
    name: string;

    /**
     * Array of permission identifiers granted to this role.
     *
     * Each string in this array represents a specific permission or capability
     * within the system. The authorization system uses these permissions to determine
     * if a user with this role can perform specific actions.
     */
    permissions: string[];

    /**
     * Optional numeric value indicating the role's precedence.
     *
     * When a user has multiple roles, the role with the highest priority (higher number)
     * may take precedence in authorization decisions. This allows for implementing
     * hierarchical role structures.
     */
    priority?: number;
}

/**
 * Interface representing a Role entity with database model metadata.
 *
 * The `RoleModel` interface extends both the `Role` interface and the `Model` interface,
 * combining role authorization properties with database model functionality. This interface
 * is typically used for database operations and represents the complete role entity
 * as stored in the database.
 *
 * This combined interface provides all role properties along with database-specific
 * properties like creation timestamps and other model metadata needed for
 * database operations.
 *
 * @interface RoleModel
 * @extends Role Authorization role information
 * @extends Model Database model with metadata properties
 *
 * @see {@link Role} Base role interface with authorization properties
 * @see {@link Model} Database model interface with common entity properties
 * @see {@link UserModel} User model that may reference roles
 */
export interface RoleModel extends Role, Model {}
