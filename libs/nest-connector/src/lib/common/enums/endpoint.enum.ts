/**
 * Base API Endpoints Enum
 *
 * This enum defines the root-level API endpoints used throughout the application.
 * Each value represents a top-level API route segment that serves as a namespace
 * for more specific endpoints within that domain.
 *
 * These root endpoints are typically combined with more specific sub-endpoints
 * (defined in domain-specific endpoint enums) to form complete API paths. For example,
 * the AUTH endpoint combined with an AuthEndpoint value would create a full authentication
 * API route.
 *
 * This approach allows for organized, hierarchical API routing and helps maintain
 * consistency across the application's API structure.
 */
export enum Endpoint {
    /**
     * Authentication API endpoint root
     *
     * Base path segment for all authentication-related operations.
     * This serves as the namespace for endpoints defined in AuthEndpoint enum.
     *
     * Complete authentication endpoints are formed by combining this root with
     * specific authentication operations, e.g., "/auth/sign-in" or "/auth/verify-email".
     *
     * @see {@link AuthEndpoint} For specific authentication operation endpoints
     */
    AUTH = "auth",
}
