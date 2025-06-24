import { User, UserSession } from "@hichchi/nest-connector/auth";
import { UserExtra } from "./user-extra.interfaces";

/**
 * Interface representing a user with caching capabilities.
 *
 * A `CacheUser` extends the base User interface and UserExtra interface, adding
 * properties for tracking active sessions and optionally storing encrypted session data.
 * This interface is used for storing user information in the cache service.
 *
 * @interface CacheUser
 * @extends User
 * @extends UserExtra
 *
 * @see {@link User} Base user interface with core user properties
 * @see {@link UserExtra} Additional authentication-related user properties
 */
export interface CacheUser extends User, UserExtra {
    /**
     * An array of active user session objects.
     * Each session represents a distinct authenticated instance of this user
     * across different devices, browsers, or applications.
     *
     * When a user logs in, a new session is created and added to this array.
     * When they log out, the corresponding session is removed.
     *
     * @see {@link UserSession} The structure of each session object
     */
    sessions: UserSession[];

    /**
     * An optional encrypted string representation of the user's sessions.
     * This field is only populated when session encryption is enabled via sessionSecret in authOptions.
     *
     * When sessions are encrypted:
     * - The sessions array will be empty
     * - Session data is securely stored in this encrypted string
     * - Sessions are automatically decrypted when reading from persistent storage
     *
     * @see {@link AuthOptions.sessionSecret} Configuration option that enables session encryption
     * @see {@link UserSession} The structure of each session when decrypted
     */
    encryptedSessions?: string;
}
