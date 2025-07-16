import { TokenResponse } from "./token-response.interface";
import { UserSession } from "./user-session.interface";
import { User } from "./user.interface";

/**
 * Interface representing the complete authentication response data.
 *
 * The `AuthResponse` interface combines token information, selected session data,
 * and the authenticated user details. This comprehensive structure is typically
 * returned to clients after successful authentication operations like sign-in,
 * token refresh, or social authentication.
 *
 * This interface is designed to provide clients with all necessary information
 * to maintain an authenticated session while excluding sensitive or internal
 * properties not needed by the client.
 *
 * @interface AuthResponse
 * @extends TokenResponse Provides access and refresh token data
 * @extends UserSession User session data
 *
 * @see {@link TokenResponse} Interface for token-related information
 * @see {@link UserSession} Interface for session-related information
 * @see {@link User} Interface for user profile information
 */
export interface AuthResponse extends TokenResponse, UserSession {
    /**
     * The authenticated user's profile information.
     *
     * This contains the core user data needed by client applications,
     * such as user ID, display name, and other profile details.
     * Sensitive data like password hashes are excluded.
     *
     * @see {@link User} Interface for user profile information
     */
    user: User;
}
