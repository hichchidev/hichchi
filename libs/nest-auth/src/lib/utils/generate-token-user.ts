import { UnauthorizedException } from "@nestjs/common";
import { TokenUser } from "../types";
import { CacheUser } from "../interfaces";
import { AuthErrors } from "../responses";

/**
 * Generate token user
 * @param {CacheUser} cacheUser Cache user
 * @param {string} accessToken Access token
 * @returns {TokenUser} Token user
 */
export function generateTokenUser(cacheUser: CacheUser, accessToken: string): TokenUser {
    const { sessions, ...user } = cacheUser;

    const session = sessions.find(session => session.accessToken === accessToken);
    if (!session) {
        throw new UnauthorizedException(AuthErrors.AUTH_401_UNKNOWN);
    }

    return { ...user, fullName: `${user.firstName} ${user.lastName}`, ...session };
}
