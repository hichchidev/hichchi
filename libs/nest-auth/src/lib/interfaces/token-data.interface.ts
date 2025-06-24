import { EntityId } from "@hichchi/nest-connector/crud";

/**
 * Interface representing the payload of a JWT token
 *
 * This interface defines the minimum structure for JWT payloads used in the authentication system.
 * It follows the JWT standard by using 'sub' (subject) to store the user identifier.
 *
 * The 'sub' claim in a JWT is intended to be a unique identifier for the subject of the token,
 * which in most authentication scenarios is the user ID.
 *
 * @see {@link JwtTokenService} Service that creates and verifies JWT tokens
 * @see {@link JwtOptions} Configuration options for JWT authentication
 * @see {@link AccessToken} Branded type for access tokens
 * @see {@link RefreshToken} Branded type for refresh tokens
 */
export interface IJwtPayload {
    /**
     * The subject of the token, typically the user's unique identifier
     *
     * Following JWT standards, the 'sub' (subject) claim identifies the principal
     * that is the subject of the JWT. In most authentication systems,
     * this will be the user's ID from the database.
     *
     * @see {@link EntityId} Type for entity identifiers from @hichchi/nest-connector/crud
     * @see {@link https://tools.ietf.org/html/rfc7519#section-4.1.2} JWT RFC - 'sub' claim
     */
    sub: EntityId;
}
