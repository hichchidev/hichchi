import { UnauthorizedException } from "@nestjs/common";
import { CacheUser, TokenUser } from "../interfaces";
import { AccessToken, AuthErrors } from "@hichchi/nest-connector/auth";

/**
 * Generate a TokenUser object from a CacheUser and access token
 *
 * This utility function creates a TokenUser object by combining user information from the cache
 * with the session information associated with the provided access token. It also adds a fullName
 * field by concatenating firstName and lastName.
 *
 * @param {CacheUser} cacheUser - The user information from the cache
 * @param {JWT} accessToken - The JWT access token
 * @returns {TokenUser} A TokenUser object containing user and session information
 * @throws {UnauthorizedException} If no session is found for the provided access token
 *
 * @example
 * ```TypeScript
 * const cacheUser = {
 *   id: 'user-id',
 *   firstName: 'John',
 *   lastName: 'Doe',
 *   email: 'john.doe@example.com',
 *   sessions: [
 *     {
 *       sessionId: 'session-id',
 *       accessToken: 'jwt-access-token',
 *       refreshToken: 'jwt-refresh-token'
 *     }
 *   ]
 * };
 *
 * const tokenUser = generateTokenUser(cacheUser, 'jwt-access-token');
 * // Result: { id: 'user-id', firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com',
 * //           fullName: 'John Doe', sessionId: 'session-id', accessToken: 'jwt-access-token',
 * //           refreshToken: 'jwt-refresh-token' }
 * ```
 */
export function generateTokenUser(cacheUser: CacheUser, accessToken: AccessToken): TokenUser {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { sessions, encryptedSessions, ...user } = cacheUser;

    const session = sessions.find(session => session.accessToken === accessToken);
    if (!session) {
        throw new UnauthorizedException(AuthErrors.AUTH_401_UNKNOWN);
    }

    return { ...user, fullName: `${user.firstName} ${user.lastName}`, ...session };
}
