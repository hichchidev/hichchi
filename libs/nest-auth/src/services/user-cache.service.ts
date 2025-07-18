/* eslint-disable no-console */
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
    async setUser(user: CacheUser): Promise<boolean> {
        console.log(`UserCacheService.setUser: Storing user with ID ${user.id}`);
        console.log(`UserCacheService.setUser: User has ${user.sessions.length} sessions`);

        const sessionSecret = this.options.sessionSecret;
        const newCacheUser = { ...user };

        if (sessionSecret) {
            console.log("UserCacheService.setUser: Session encryption is enabled");
            try {
                console.log("UserCacheService.setUser: Starting session encryption");
                const sessionsString = JSON.stringify(newCacheUser.sessions);
                console.log(`UserCacheService.setUser: Sessions stringified, length: ${sessionsString.length}`);

                newCacheUser.encryptedSessions = this.encryptionService.encrypt(sessionsString, sessionSecret);
                console.log("UserCacheService.setUser: Sessions encrypted successfully");

                newCacheUser.sessions = [];
                console.log("UserCacheService.setUser: Cleared unencrypted sessions");
            } catch (error) {
                console.error("UserCacheService.setUser: Encryption error:", error);
                LoggerService.error(error);
            }
        } else {
            console.log("UserCacheService.setUser: Session encryption is disabled");
        }

        console.log(`UserCacheService.setUser: Calling cache service to store user ${user.id}`);
        try {
            console.log(`UserCacheService.setUser: Preparing cache key: ${USER_PREFIX(user.id)}`);

            // Log object structure and size to identify potential issues
            const userKeys = Object.keys(newCacheUser);
            console.log(`UserCacheService.setUser: Object properties: ${userKeys.join(", ")}`);

            // Check for circular references or unusually large properties
            for (const key of userKeys) {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-explicit-any
                if (typeof (newCacheUser as any)[key] === "object" && (newCacheUser as any)[key] !== null) {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/no-unsafe-member-access
                    const propertySize = JSON.stringify((newCacheUser as any)[key]).length;
                    console.log(`UserCacheService.setUser: Property '${key}' size: ${propertySize} characters`);

                    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
                    if (propertySize > 100000) {
                        console.warn(
                            `UserCacheService.setUser: WARNING - Large property detected: '${key}' (${propertySize} characters)`,
                        );
                    }
                }
            }

            console.log("UserCacheService.setUser: About to call cacheService.set");
            return await this.cacheService.set<CacheUser>(USER_PREFIX(user.id), newCacheUser);
        } catch (error) {
            console.error("UserCacheService.setUser: Error preparing to set cache:", error);
            throw error;
        }
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
        console.log(`UserCacheService.getUser: Fetching user with ID ${userId}`);

        const cacheUser = await this.cacheService.get<CacheUser>(USER_PREFIX(userId));
        console.log(`UserCacheService.getUser: Cache lookup result: ${cacheUser ? "found" : "not found"}`);

        if (!cacheUser) {
            console.log("UserCacheService.getUser: User not found in cache, returning undefined");
            return undefined;
        }

        const sessionSecret = this.options.sessionSecret;
        if (sessionSecret && cacheUser.encryptedSessions) {
            console.log("UserCacheService.getUser: Found encrypted sessions, attempting to decrypt");
            try {
                console.log("UserCacheService.getUser: Starting session decryption");
                const sessionsString = this.encryptionService.decrypt(cacheUser.encryptedSessions, sessionSecret);
                console.log(`UserCacheService.getUser: Sessions decrypted, length: ${sessionsString.length}`);

                cacheUser.sessions = JSON.parse(sessionsString);
                console.log(`UserCacheService.getUser: Sessions parsed, found ${cacheUser.sessions.length} sessions`);

                delete cacheUser.encryptedSessions;
                console.log("UserCacheService.getUser: Removed encrypted sessions property");
            } catch (error) {
                console.error("UserCacheService.getUser: Decryption error:", error);
                LoggerService.error(error);
                console.log("UserCacheService.getUser: Returning undefined due to decryption error");
                return undefined;
            }
        } else if (sessionSecret) {
            console.log("UserCacheService.getUser: Session encryption is enabled but no encrypted sessions found");
        } else {
            console.log("UserCacheService.getUser: Session encryption is disabled");
        }

        console.log(`UserCacheService.getUser: Returning user with ${cacheUser.sessions?.length || 0} sessions`);
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
