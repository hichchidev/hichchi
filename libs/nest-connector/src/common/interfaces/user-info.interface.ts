// noinspection JSUnusedGlobalSymbols

import { TenantSlug } from "../../auth";
import { EntityId } from "../../crud";

/**
 * Interface representing essential user information.
 *
 * The `UserInfo` interface defines the core identifying information for a user
 * that is commonly needed throughout the application. It contains only the essential
 * properties needed to identify and display basic user information, without including
 * sensitive or authentication-related data.
 *
 * This interface is designed to be embedded within other entities for tracking user
 * associations, such as who created or modified a record. It's a lightweight alternative
 * to embedding or referencing the complete user entity.
 *
 * Common use cases:
 * - Audit trails for entity creation and modification
 * - Activity logs showing which user performed an action
 * - User attribution in collaborative features
 * - Display of user information in UI components
 *
 * @see {@link Model} Uses this interface for tracking entity ownership and changes
 * @see {@link EntityId} Type used for the user identifier
 *
 * @example
 * ```typescript
 * // Example of a blog post entity using UserInfo
 * interface BlogPost {
 *   id: EntityId;
 *   title: string;
 *   content: string;
 *   author: UserInfo;  // The user who wrote the post
 *   lastEditedBy?: UserInfo;  // The user who last edited the post
 * }
 * ```
 */
export interface UserInfo {
    /**
     * The unique identifier for the user.
     *
     * This ID corresponds to the primary key in the users table
     * and uniquely identifies the user across the entire system.
     */
    id: EntityId;

    /**
     * Represents the tenant associated with the current context.
     * The value can either be a tenant-specific identifier (TenantSlug) or null if no tenant is assigned.
     *
     * A TenantSlug is typically a unique string or slug representing a tenant in multi-tenant applications.
     * Null indicates the absence of a tenant in the current context.
     *
     * This variable is often used to scope application logic and data to a specific tenant.
     */
    tenant: TenantSlug | null;

    /**
     * The user's first name or given name.
     *
     * Used for personalization and formal addressing throughout the application.
     */
    firstName: string;

    /**
     * The user's last name or family name.
     *
     * Used alongside the first name for formal addressing and identification.
     */
    lastName: string;

    /**
     * The user's complete name, typically a combination of first and last name.
     *
     * This property provides a convenience for displaying the user's full name
     * without having to concatenate the first and last names manually. The exact
     * format may vary based on locale and application requirements.
     */
    fullName: string;
}
