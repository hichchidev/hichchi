import { AfterLoad, Column, DeleteDateColumn, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserInfo } from "@hichchi/nest-connector";
import { EntityId, Model } from "@hichchi/nest-connector/crud";
import { USER_ENTITY_TABLE_NAME } from "../tokens";

/**
 * List of standard relation properties in the BaseEntity
 *
 * This constant defines the names of the relation properties that are automatically
 * included in all entities that extend BaseEntity. These properties track the users
 * who created, updated, and deleted the entity.
 *
 * This constant is used internally by the HichchiEntity decorator to exclude these
 * standard relations from foreign key constraint validation.
 *
 * @see {@link BaseEntity} The base entity class that uses these relations
 * @see {@link HichchiEntity} The entity decorator that uses this constant
 */
export const BaseEntityTemplateRelations = ["createdBy", "updatedBy", "deletedBy"];

/**
 * Base entity class that provides common fields and functionality for all entities
 *
 * This class serves as the foundation for all entities in the application, providing:
 * - A UUID primary key
 * - Automatic timestamp tracking (creation, update, deletion)
 * - User tracking for all operations (who created, updated, or deleted the entity)
 * - Automatic mapping of user entities to a simplified format
 *
 * All entities in the application should extend this class to ensure consistent
 * structure and behavior across the data model.
 *
 * @example
 * ```typescript
 * @HichchiEntity("products")
 * export class ProductEntity extends BaseEntity {
 *   @Column()
 *   name: string;
 *
 *   @Column("text")
 *   description: string;
 *
 *   @Column("decimal")
 *   price: number;
 * }
 * ```
 *
 * @implements {Model} Interface from @hichchi/nest-connector/crud
 * @see {@link HichchiEntity} Decorator used to define entities
 */
export class BaseEntity implements Model {
    /**
     * Unique identifier for the entity
     *
     * This UUID is automatically generated when the entity is created.
     * It serves as the primary key for the entity in the database.
     */
    @PrimaryGeneratedColumn("uuid")
    id: EntityId;

    /**
     * Timestamp when the entity was created
     *
     * This field is automatically set to the current timestamp when the entity is created.
     * It is not nullable and cannot be changed after creation.
     */
    @Column({ nullable: false, default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;

    /**
     * Timestamp when the entity was last updated
     *
     * This field is automatically set to the current timestamp when the entity is created
     * and updated whenever the entity is modified.
     */
    @Column({ nullable: false, default: () => "CURRENT_TIMESTAMP" })
    updatedAt: Date;

    /**
     * Timestamp when the entity was soft-deleted
     *
     * This field is automatically set when the entity is soft-deleted using TypeORM's
     * soft delete functionality. When this field has a value, the entity is considered deleted.
     */
    @DeleteDateColumn({ type: "timestamp", nullable: true })
    deletedAt: Date | null;

    /**
     * ID of the user who created the entity
     *
     * This field stores the ID of the user who created the entity.
     * It is used for the foreign key relationship with the createdBy field.
     */
    @Column({ nullable: true })
    createdById: EntityId | null;

    /**
     * User who created the entity
     *
     * This field stores a reference to the user who created the entity.
     * It is automatically loaded when the entity is retrieved with relations.
     */
    @ManyToOne(USER_ENTITY_TABLE_NAME, { nullable: true, eager: true })
    @JoinColumn()
    createdBy: UserInfo | null;

    /**
     * ID of the user who last updated the entity
     *
     * This field stores the ID of the user who last updated the entity.
     * It is used for the foreign key relationship with the updatedBy field.
     */
    @Column({ nullable: true })
    updatedById: EntityId | null;

    /**
     * User who last updated the entity
     *
     * This field stores a reference to the user who last updated the entity.
     * It is automatically loaded when the entity is retrieved with relations.
     */
    @ManyToOne(USER_ENTITY_TABLE_NAME, { nullable: true, eager: true })
    @JoinColumn()
    updatedBy: UserInfo | null;

    /**
     * ID of the user who deleted the entity
     *
     * This field stores the ID of the user who deleted the entity.
     * It is used for the foreign key relationship with the deletedBy field.
     */
    @Column({ nullable: true })
    deletedById: EntityId | null;

    /**
     * User who deleted the entity
     *
     * This field stores a reference to the user who deleted the entity.
     * It is automatically loaded when the entity is retrieved with relations.
     */
    @ManyToOne(USER_ENTITY_TABLE_NAME, { nullable: true, eager: true })
    @JoinColumn()
    deletedBy: UserInfo | null;

    /**
     * Lifecycle hook that runs after an entity is loaded from the database
     *
     * This method is automatically called by TypeORM after an entity is loaded.
     * It maps the user entities (createdBy, updatedBy, deletedBy) to a simplified format
     * using the private _mapUserEntity method to ensure only essential user information
     * is included.
     *
     * @see {@link UserInfo} The interface that defines the user information structure
     */
    @AfterLoad()
    protected afterLoad?(): void {
        if (this.createdBy) {
            this.createdBy = this._mapUserEntity?.(this.createdBy) || null;
        }
        if (this.updatedBy) {
            this.updatedBy = this._mapUserEntity?.(this.updatedBy) || null;
        }
        if (this.deletedBy) {
            this.deletedBy = this._mapUserEntity?.(this.deletedBy) || null;
        }
    }

    /**
     * Maps a user entity to a simplified format
     *
     * This private method extracts only the essential information from a user entity:
     * id, firstName, lastName, and fullName. This ensures that sensitive user information
     * is not accidentally exposed when entities are serialized.
     *
     * @param {UserInfo} user - The user entity to map
     * @returns {UserInfo} A simplified user object with only essential information
     * @private
     */
    protected _mapUserEntity?(user: UserInfo): UserInfo {
        return {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            fullName: user.fullName,
        };
    }
}
