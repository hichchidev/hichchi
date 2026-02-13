import {
    AfterLoad,
    BeforeInsert,
    BeforeUpdate,
    Column,
    DeleteDateColumn,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
import { UserInfo } from "@hichchi/nest-connector";
import { EntityId, Model } from "@hichchi/nest-connector/crud";
import { USER_ENTITY_TABLE_NAME } from "../tokens";
import { AuthProvider, GoogleProfile } from "@hichchi/nest-connector/auth";
import { Exclude } from "class-transformer";

/**
 * Base user entity class that provides common user fields and functionality
 *
 * This class extends BaseEntity and implements the UserInfo interface, providing
 * the core user properties required for user identification and display. It serves
 * as the foundation for all user-related entities in the application, ensuring
 * consistent structure and behavior across different user types.
 *
 * Key features:
 * - Provides firstName, lastName, and fullName properties required by UserInfo
 * - Automatically maintains the fullName property based on firstName and lastName
 * - Inherits all audit tracking capabilities from BaseEntity
 *
 * Application-specific user entities should extend this class and add additional
 * properties as needed, such as email, password, roles, etc.
 *
 * @example
 * ```typescript
 * @HichchiEntity("users", ["email"])
 * export class UserEntity extends HichchiUserEntity implements User {
 *   @Column({ nullable: false })
 *   email: string;
 *
 *   @Column({ nullable: true })
 *   password?: string;
 *
 *   @Column({ default: false })
 *   emailVerified: boolean;
 * }
 * ```
 *
 * @implements {UserInfo} Provides the core user identification properties
 * @see {@link UserInfo} The interface that defines the required user properties
 */
export class HichchiUserEntity implements UserInfo, Model {
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
    @ManyToOne(USER_ENTITY_TABLE_NAME, { nullable: true })
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
    @ManyToOne(USER_ENTITY_TABLE_NAME, { nullable: true })
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
    @ManyToOne(USER_ENTITY_TABLE_NAME, { nullable: true })
    @JoinColumn()
    deletedBy: UserInfo | null;

    /**
     * The user's first name or given name
     *
     * This property stores the user's first name and is used for personalization
     * and formal addressing throughout the application. It is required and cannot
     * be null.
     */
    @Column({ nullable: false })
    firstName: string;

    /**
     * The user's last name or family name
     *
     * This property stores the user's last name and is used alongside the first name
     * for formal addressing and identification. It is required and cannot be null.
     */
    @Column({ nullable: false })
    lastName: string;

    /**
     * The user's complete name, automatically generated from firstName and lastName
     *
     * This property provides a convenience for displaying the user's full name
     * without having to concatenate the first and last names manually. It is
     * automatically maintained by the beforeInsert and beforeUpdate hooks.
     */
    @Column({ nullable: false })
    fullName: string;

    /**
     * The user's email address
     *
     * This property stores the user's email address for authentication and communication
     * purposes. It is optional and can be null if the user doesn't have an email address
     * or uses alternative authentication methods.
     */
    @Column("varchar", { nullable: true })
    email: string | null;

    /**
     * The user's unique username for authentication
     *
     * This property stores a unique username that can be used for authentication
     * and user identification. It is optional and can be null if the user uses
     * alternative authentication methods like email-only authentication.
     */
    @Column("varchar", { nullable: true })
    username: string | null;

    @Exclude()
    @Column("varchar", { nullable: true })
    password: string | null;

    @Column({ default: false })
    emailVerified: boolean;

    @Column("varchar", { nullable: true })
    avatar: string | null;

    @Column("json", { nullable: true })
    profileData: GoogleProfile | null;

    @Column("enum", { enum: AuthProvider, nullable: false })
    signUpType: AuthProvider;

    /**
     * Lifecycle hooks that run before an entity is inserted or updated
     *
     * This method is automatically called by TypeORM before an entity is inserted
     * or updated. It ensures that the fullName property is always up-to-date by
     * concatenating the firstName and lastName properties.
     */
    @BeforeInsert()
    @BeforeUpdate()
    protected beforeInsert?(): void {
        this.fullName = `${this.firstName} ${this.lastName}`;
    }

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
