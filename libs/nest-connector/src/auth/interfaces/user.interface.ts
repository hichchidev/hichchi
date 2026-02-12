import { UserInfo } from "../../common";
import { Role } from "./role.interface";
import { AuthProvider } from "../enums";
import { EntityId, Model } from "../../crud";
import { GoogleProfile } from "./google-profile.interface";

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
export interface User<R extends string = string, P extends string = string> extends UserInfo, Model {
    /**
     * The user's email address.
     *
     * May be optional for some authentication methods, but generally serves
     * as the primary means of communication and account recovery.
     * Often used as the primary identifier for authentication.
     */
    email: string | null;

    /**
     * The user's chosen username.
     *
     * Optional identifier that may be used as an alternative to email for
     * authentication. May be displayed publicly or used for personalization.
     */
    username: string | null;

    /**
     * The user's password (typically hashed).
     *
     * Optional as some authentication methods (e.g., OAuth) don't use passwords.
     * When present, this should always be a hashed version of the password,
     * never the plaintext value.
     *
     * Note: This field is typically excluded from responses sent to clients.
     */
    password: string | null;

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
    role: Role<R, P> | R | null;

    /**
     * The unique identifier of the user's role.
     *
     * Optional foreign key reference to the role entity. This property provides
     * a direct link to the role's identifier when the role is stored as a separate
     * entity in the database. May be null if the role is embedded directly or
     * if no role is assigned.
     *
     * @see {@link EntityId} Type definition for entity identifiers
     * @see {@link Role} Interface defining user authorization roles
     */
    roleId?: EntityId | null;

    /**
     * Indicates whether the user's email address has been verified.
     *
     * Email verification is an important security measure to confirm user identity
     * and prevent account abuse. Some features may be restricted until verification.
     */
    emailVerified: boolean;

    /**
     * Additional profile information for the user.
     *
     * This flexible object can contain various user-specific details not covered
     * by standard fields, such as preferences, settings, or application-specific data.
     */
    profileData: GoogleProfile | null;

    /**
     * URL or path to the user's profile picture/avatar.
     *
     * Provides a visual representation of the user throughout the application.
     * May be automatically populated from social login providers when available.
     */
    avatar: string | null;
}
