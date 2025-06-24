import { UserInfo } from "../../common";
import { Role, RoleModel } from "./role.interface";
import { AuthProvider } from "../enums";
import { Model } from "../../crud";

/**
 * Interface representing a user account in the authentication system.
 *
 * The `User` interface extends the base `UserInfo` interface to define the
 * complete structure of a user account with authentication-specific properties.
 * This interface represents users throughout the authentication system and
 * serves as the primary user data structure for authentication operations.
 *
 * It includes properties for identification, authentication, authorization,
 * and profile information. Some properties are optional to accommodate different
 * authentication methods (e.g., social login vs. local authentication).
 *
 * @interface User
 * @extends UserInfo Base user information interface
 *
 * @see {@link UserInfo} Base interface with common user properties
 * @see {@link AuthProvider} Enumeration of registration methods
 * @see {@link Role} Interface defining user authorization roles
 * @see {@link AuthResponse} Authentication response containing user information
 */
export interface User extends UserInfo {
    /**
     * The user's email address.
     *
     * May be optional for some authentication methods, but generally serves
     * as the primary means of communication and account recovery.
     * Often used as the primary identifier for authentication.
     */
    email?: string;

    /**
     * The user's chosen username.
     *
     * Optional identifier that may be used as an alternative to email for
     * authentication. May be displayed publicly or used for personalization.
     */
    username?: string;

    /**
     * The user's password (typically hashed).
     *
     * Optional as some authentication methods (e.g., OAuth) don't use passwords.
     * When present, this should always be a hashed version of the password,
     * never the plaintext value.
     *
     * Note: This field is typically excluded from responses sent to clients.
     */
    password?: string;

    /**
     * The method used for account creation/registration.
     *
     * Indicates whether the user registered directly or via a third-party
     * authentication provider (Google, Facebook, etc.). This affects available
     * authentication methods and account management options.
     *
     * @see {@link AuthProvider} Enumeration of registration methods
     */
    signUpType: AuthProvider;

    /**
     * The authorization role assigned to the user.
     *
     * Determines the user's permissions and access levels within the system.
     * Can be a complex Role object or a simple string identifier.
     *
     * @see {@link Role} Interface defining user authorization roles
     */
    role?: Role | string;

    /**
     * Indicates whether the user's email address has been verified.
     *
     * Email verification is an important security measure to confirm user identity
     * and prevent account abuse. Some features may be restricted until verification.
     */
    emailVerified?: boolean;

    /**
     * Additional profile information for the user.
     *
     * This flexible object can contain various user-specific details not covered
     * by standard fields, such as preferences, settings, or application-specific data.
     */
    profileData?: object;

    /**
     * URL or path to the user's profile picture/avatar.
     *
     * Provides a visual representation of the user throughout the application.
     * May be automatically populated from social login providers when available.
     */
    avatar?: string;
}

/**
 * Interface representing a User entity with database model metadata.
 *
 * The `UserModel` interface extends both the `User` interface and the `Model` interface,
 * combining user account properties with database model functionality. This interface
 * is typically used for database operations and represents the complete user entity
 * as stored in the database.
 *
 * This combined interface provides all user properties along with database-specific
 * properties like ID, creation timestamps, and other model metadata needed for
 * database operations.
 *
 * @interface UserModel
 * @extends User Complete user account information
 * @extends Model Database model with metadata properties
 *
 * @see {@link User} Base user information interface
 * @see {@link Model} Database model interface with common entity properties
 * @see {@link RoleModel} Role model that is referenced by users
 */
export interface UserModel extends User, Model {
    /**
     * The user's role as a fully populated RoleModel entity.
     *
     * This property overrides the base `role` property from the `User` interface,
     * changing its type from the optional `Role | string` to a required `RoleModel`.
     * In the database model context, the role is always fully populated with all
     * role properties and database metadata.
     *
     * When retrieving a user from the database, this property will contain the
     * complete role information including permissions, which is essential for
     * authorization decisions.
     *
     * @see {@link RoleModel} Complete role entity with database metadata
     * @see {@link Role} Base role interface with authorization properties
     */
    role: RoleModel;
}
