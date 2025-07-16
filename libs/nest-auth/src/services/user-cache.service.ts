import { Inject, Injectable } from "@nestjs/common";
import { AuthOptions, CacheUser } from "../interfaces";
import { CacheService, LoggerService } from "@hichchi/nest-core";
import { EncryptionService } from "./encryption.service";
import { AUTH_OPTIONS } from "../tokens";
import { EntityId } from "@hichchi/nest-connector/crud";

const USER_PREFIX = (userId: EntityId): string => `user:${userId}`;

/**
 * Service for caching user data and sessions
 *
 * This service provides methods for storing, retrieving, and clearing user data in the cache.
 * It supports optional encryption of user sessions for enhanced security.
 *
 * @example
 * ```typescript
 * // Inject the service
 * constructor(private readonly userCacheService: UserCacheService) {}
 * ```
 */
@Injectable()
export class UserCacheService {
    /**
     * Creates an instance of UserCacheService.
     *
     * @param {AuthOptions} options - The authentication options injected from AUTH_OPTIONS token
     * @param {CacheService} cacheService - The cache service for storing and retrieving user data
     * @param {EncryptionService} encryptionService - The encryption service for securing user sessions
     */
    constructor(
        @Inject(AUTH_OPTIONS) private readonly options: AuthOptions,
        private readonly cacheService: CacheService,
        private readonly encryptionService: EncryptionService,
    ) {}

    /**
     * Set user in cache
     *
     * This method stores a user object in the cache. If a session secret is configured,
     * it encrypts the user's sessions before storing them.
     *
     * @param {CacheUser} user - The user object to store in cache
     * @returns {Promise<boolean>} True if the operation was successful
     *
     * @example
     * ```TypeScript
     * const success = await userCacheService.setUser({
     *   id: '123e4567-e89b-12d3-a456-426614174000',
     *   firstName: 'John',
     *   lastName: 'Doe',
     *   email: 'john.doe@example.com',
     *   sessions: [{ sessionId: 'session-id', accessToken: 'token', refreshToken: 'refresh-token' }]
     * });
     * ```
     */
    setUser(user: CacheUser): Promise<boolean> {
        const sessionSecret = this.options.sessionSecret;
        const newCacheUser = { ...user };
        if (sessionSecret) {
            try {
                const sessionsString = JSON.stringify(newCacheUser.sessions);
                newCacheUser.encryptedSessions = this.encryptionService.encrypt(sessionsString, sessionSecret);
                newCacheUser.sessions = [];
            } catch (error) {
                LoggerService.error(error);
            }
        }

        return this.cacheService.set<CacheUser>(USER_PREFIX(user.id), newCacheUser);
    }

    /**
     * Get user from cache
     *
     * This method retrieves a user object from the cache by their ID.
     * If a session secret is configured and the user has encrypted sessions,
     * it decrypts the sessions before returning the user object.
     *
     * @param {string | number} userId - The ID of the user to retrieve
     * @returns {Promise<CacheUser | undefined>} The user object if found, undefined otherwise
     *
     * @example
     * ```TypeScript
     * const user = await userCacheService.getUser('123e4567-e89b-12d3-a456-426614174000');
     * if (user) {
     *   console.log(`Found user: ${user.firstName} ${user.lastName}`);
     *   console.log(`Active sessions: ${user.sessions.length}`);
     * }
     * ```
     */
    async getUser(userId: EntityId): Promise<CacheUser | undefined> {
        const cacheUser = await this.cacheService.get<CacheUser>(USER_PREFIX(userId));
        if (!cacheUser) {
            return undefined;
        }

        const sessionSecret = this.options.sessionSecret;
        if (sessionSecret && cacheUser.encryptedSessions) {
            try {
                const sessionsString = this.encryptionService.decrypt(cacheUser.encryptedSessions, sessionSecret);
                cacheUser.sessions = JSON.parse(sessionsString);
                delete cacheUser.encryptedSessions;
            } catch (error) {
                LoggerService.error(error);
                return undefined;
            }
        }

        return cacheUser;
    }

    /**
     * Clear user from the cache
     *
     * This method removes a user object from the cache by their ID.
     * It's typically used during sign out or when a user's session is invalidated.
     *
     * @param {EntityId} userId - The ID of the user to remove from cache
     * @returns {Promise<boolean>} True if the operation was successful
     *
     * @example
     * ```TypeScript
     * // When a user logs out
     * const success = await userCacheService.clearUser('123e4567-e89b-12d3-a456-426614174000');
     * if (success) {
     *   console.log('User session cleared from cache');
     * }
     * ```
     */
    clearUser(userId: EntityId): Promise<boolean> {
        return this.cacheService.delete(USER_PREFIX(userId));
    }
}
