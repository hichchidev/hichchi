// noinspection ES6PreferShortImport
import { UserInfo } from "../../common/interfaces/user-info.interface";
import { EntityId } from "../types";

/**
 * Base model interface for all database entities in the application.
 *
 * The `Model` interface defines the standard properties that all entities
 * in the system should have. It provides a consistent structure for:
 *
 * - Unique identification via UUID
 * - Comprehensive audit tracking (creation, updates, soft deletion)
 * - User attribution for all data changes
 *
 * This interface serves as the foundation for the entity inheritance hierarchy
 * and ensures that all database records maintain proper audit trails for
 * compliance, debugging, and data governance purposes.
 *
 * By implementing this interface, entities automatically gain:
 * - Standard timestamps for lifecycle events
 * - Built-in soft delete capability
 * - Complete user attribution for all operations
 *
 * @see {@link EntityId} Type used for entity identifiers
 * @see {@link UserInfo} Interface for user reference information
 *
 * @example
 * ```typescript
 * // Example entity implementing the Model interface
 * export class Product implements Model {
 *   id: EntityId;
 *   name: string;
 *   price: number;
 *
 *   // Inherited from Model
 *   createdAt: Date;
 *   updatedAt: Date;
 *   deletedAt?: Date | null;
 *   createdById?: string | null;
 *   createdBy?: UserInfo | null;
 *   updatedById?: string | null;
 *   updatedBy?: UserInfo | null;
 *   deletedById?: string | null;
 *   deletedBy?: UserInfo | null;
 * }
 * ```
 */
export interface Model {
    /**
     * Unique identifier for the entity.
     *
     * This UUID serves as the primary key in the database and uniquely
     * identifies this record across the entire system.
     *
     * @see {@link EntityId} Type used for entity identifiers
     */
    id: EntityId;

    /**
     * Timestamp when the entity was created.
     *
     * This value is set automatically on entity creation and never changes
     * afterward, providing an immutable record of when the data was first added.
     */
    createdAt: Date;

    /**
     * Timestamp when the entity was last updated.
     *
     * This value is automatically updated whenever any property of the entity
     * changes, providing a way to track the recency of data and implement
     * optimistic concurrency control.
     */
    updatedAt: Date;

    /**
     * Timestamp when the entity was soft-deleted, if applicable.
     *
     * When present and not null, indicates that this entity has been deleted
     * logically but is still present in the database. This enables data recovery
     * and maintains referential integrity while hiding the record from normal queries.
     */
    deletedAt?: Date | null;

    /**
     * ID of the user who created this entity.
     *
     * Stores just the ID reference to the user for efficient database storage.
     * Use in conjunction with the `createdBy` property when user details are needed.
     */
    createdById?: string | null;

    /**
     * Detailed information about the user who created this entity.
     *
     * Contains essential identifying information about the creator without
     * including sensitive data. This property may be populated through a join or
     * separate query when needed for display purposes.
     *
     * @see {@link UserInfo} Interface for user reference information
     */
    createdBy?: UserInfo | null;

    /**
     * ID of the user who last updated this entity.
     *
     * Tracks which user most recently modified any property of this entity.
     * Essential for audit trails and accountability in multi-user systems.
     */
    updatedById?: string | null;

    /**
     * Detailed information about the user who last updated this entity.
     *
     * Contains essential identifying information about the last user to modify
     * the record. Used primarily for display in audit logs and history views.
     *
     * @see {@link UserInfo} Interface for user reference information
     */
    updatedBy?: UserInfo | null;

    /**
     * ID of the user who soft-deleted this entity, if applicable.
     *
     * When an entity is soft-deleted, this property stores the ID of the user
     * who performed the deletion action for accountability purposes.
     */
    deletedById?: string | null;

    /**
     * Detailed information about the user who soft-deleted this entity, if applicable.
     *
     * Contains identifying information about the user who performed the deletion,
     * used primarily in administrative interfaces for reviewing deletion history.
     *
     * @see {@link UserInfo} Interface for user reference information
     */
    deletedBy?: UserInfo | null;
}

export interface ModelExtension {
    id: EntityId;
}
