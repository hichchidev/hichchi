import { User, UserSession } from "@hichchi/nest-connector/auth";
import { UserExtra } from "./user-extra.interfaces";

/**
 * Interface representing a user with complete authentication information.
 *
 * The `AuthUser` interface combines three key aspects of user authentication:
 * 1. Core user identity properties (from `User`)
 * 2. Additional authentication-related properties (from `UserExtra`)
 * 3. Session-specific information including tokens (from `UserSession`)
 *
 * This comprehensive interface is used throughout the authentication process
 * to maintain a complete view of the authenticated user's state and capabilities.
 * It's especially useful in token-based authentication flows where user identity
 * and session information need to be accessible together.
 *
 * @interface AuthUser
 * @extends User Core user identity properties (id, email, etc.)
 * @extends UserExtra Additional auth-related properties (password hash, email verification, etc.)
 * @extends UserSession Session-specific information (tokens, session IDs, etc.)
 *
 * @see {@link User} Base user interface with core user properties
 * @see {@link UserExtra} Additional authentication-related user properties
 * @see {@link UserSession} Session information including access and refresh tokens
 * @see {@link CacheUser} Related interface for users stored in cache
 */
export interface AuthUser extends User, UserExtra, UserSession {}
