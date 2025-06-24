import { AccessToken, RefreshToken } from "../types";
import { AuthProvider } from "../enums";

/**
 * Interface representing a user session in an application.
 *
 * A `UserSession` tracks the information related to the user's authentication
 * and session management. It contains identifiers for the session, tokens
 * necessary for maintaining authenticated interactions, and optional metadata
 * like socket and frontend connection details.
 *
 * Properties:
 * - `sessionId`: A unique identifier for the user's session.
 * - `accessToken`: The access token used for authenticated API requests.
 * - `refreshToken`: A token used to refresh the user's access token.
 * - `socketId`: Optional. The identifier for a websocket connection, if applicable.
 * - `frontendUrl`: Optional. The base URL for the frontend application associated with the session.
 * - `authProvider`: Optional. The authentication provider or strategy used for the session.
 * - `authProviderId`: Optional. The unique identifier representing the user in the context of the auth provider.
 */
export interface UserSession {
    /**
     * A unique identifier for this specific user session.
     * Used to distinguish between multiple active sessions for the same user.
     */
    sessionId: string;

    /**
     * The access token used for authenticated API requests.
     * This is a short-lived JWT token that contains the user's identity and permissions.
     *
     * @see {@link AccessToken} Branded type for access tokens
     */
    accessToken: AccessToken;

    /**
     * A token used to refresh the user's access token when it expires.
     * This is a long-lived token that should be kept secure.
     *
     * @see {@link RefreshToken} Branded type for refresh tokens
     */
    refreshToken: RefreshToken;

    /**
     * The identifier for a websocket connection associated with this session.
     * Used for real-time communication features if applicable.
     *
     * Optional: This may not be present if the session doesn't have an active socket connection.
     */
    socketId?: string;

    /**
     * The base URL for the frontend application associated with this session.
     * Used for generating correct redirect URLs for multi-frontend applications.
     *
     * Optional: May be omitted for API-only usage or when a default frontend URL is configured.
     */
    frontendUrl?: string;

    /**
     * The authentication provider used for this session.
     * Indicates how the user was authenticated (e.g., local, Google).
     *
     * Optional: Defaults to the application's primary authentication provider if not specified.
     *
     * @see {@link AuthProvider} Enum of supported authentication type
     */
    authProvider?: AuthProvider;

    /**
     * The unique identifier representing the user in the context of the auth provider.
     * For example, this could be a Google user ID for sessions authenticated via Google OAuth.
     *
     * Optional: Only relevant for third-party authentication providers.
     */
    authProviderId?: string;
}
