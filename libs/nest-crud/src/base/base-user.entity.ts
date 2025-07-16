import { BeforeInsert, BeforeUpdate, Column } from "typeorm";
import { BaseEntity } from "./base-entity";
import { UserInfo } from "@hichchi/nest-connector";

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
 * @extends {BaseEntity} Inherits common entity fields and functionality
 * @implements {UserInfo} Provides the core user identification properties
 * @see {@link UserInfo} The interface that defines the required user properties
 * @see {@link BaseEntity} The base entity class that provides audit tracking
 */
export class HichchiUserEntity extends BaseEntity implements UserInfo {
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

    @Column({ type: "varchar", nullable: true })
    email: string | null;

    @Column({ type: "varchar", nullable: true })
    username: string | null;

    /**
     * Lifecycle hooks that run before an entity is inserted or updated
     *
     * This method is automatically called by TypeORM before an entity is inserted
     * or updated. It ensures that the fullName property is always up-to-date by
     * concatenating the firstName and lastName properties.
     */
    @BeforeInsert()
    @BeforeUpdate()
    beforeInsert?(): void {
        this.fullName = `${this.firstName} ${this.lastName}`;
    }
}
