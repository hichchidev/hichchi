import { EntityId, Model } from "../../crud";
import { Role, TenantSlug } from "../auth";
import { User } from "./user.interface";

/**
 * Base interface defining core tenant identity properties.
 *
 * This interface contains the minimum identifying information needed to
 * represent a tenant in a multi-tenant system.
 */
export interface TenantBase {
    /**
     * Human-readable tenant name.
     *
     * This value is typically displayed in administrative interfaces and
     * organization selectors.
     */
    name: string;

    /**
     * Unique slug used to identify the tenant in routes and context resolution.
     *
     * The slug should be stable and URL-friendly to support tenant-specific
     * API and frontend paths.
     */
    slug: TenantSlug;
}

/**
 * Interface representing a tenant entity in the authentication domain.
 *
 * Extends {@link TenantBase} with persistence fields from {@link Model} and
 * ownership/member relationships to users.
 *
 * @interface Tenant
 *
 * @see {@link User} Interface for user information linked to tenants
 */
export interface Tenant extends TenantBase, Model {
    /**
     * User who owns and manages the tenant.
     *
     * This value may be null when ownership has not been assigned yet.
     */
    owner: User | null;

    /**
     * ID of the user who owns and manages the tenant.
     */
    ownerId: EntityId | null;

    /**
     * Represents the roles associated with a user or entity.
     * This can either be an array of Role objects or null if no roles are assigned.
     *
     * @type {Role[] | null}
     */
    roles: Role[] | null;

    /**
     * Users associated with this tenant.
     *
     * Contains the members that belong to the tenant context.
     */
    users: User[] | null;
}
