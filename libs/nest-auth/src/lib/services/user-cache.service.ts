import { Inject, Injectable } from "@nestjs/common";
import { AuthOptions, CacheUser } from "../interfaces";
import { RedisCacheService } from "@hichchi/nest-core";
import { EncryptionService } from "./encryption.service";
import { AUTH_OPTIONS } from "../tokens";

const USER_PREFIX = (userId: string | number): string => `user:${userId}`;

@Injectable()
export class UserCacheService {
    constructor(
        @Inject(AUTH_OPTIONS) private readonly options: AuthOptions,
        private readonly cacheService: RedisCacheService,
        private readonly encryptionService: EncryptionService,
    ) {}

    /**
     * Set user in cache
     * @param {CacheUser} user
     * @returns {Promise<boolean>}
     */
    setUser(user: CacheUser): Promise<boolean> {
        if (this.options.sessionSecret) {
            const sessionsString = JSON.stringify(user.sessions);
            user.encryptedSessions = this.encryptionService.encrypt(sessionsString, this.options.sessionSecret);
            user.sessions = [];
        }

        return this.cacheService.setRaw(USER_PREFIX(user.id), JSON.stringify(user));
    }

    /**
     * Get user from cache
     * @param {string | number} userId
     * @returns {Promise<CacheUser | null>}
     */
    async getUser(userId: string | number): Promise<CacheUser | null> {
        const userString = await this.cacheService.getRaw(USER_PREFIX(userId));
        if (!userString) {
            return null;
        }

        const user: CacheUser = JSON.parse(userString);
        if (this.options.sessionSecret && user.encryptedSessions) {
            try {
                const sessionsString = this.encryptionService.decrypt(
                    user.encryptedSessions,
                    this.options.sessionSecret,
                );
                user.sessions = JSON.parse(sessionsString);
                delete user.encryptedSessions;
            } catch {
                user.sessions = [];
            }
        }

        return user;
    }

    /**
     * Clear user from cache
     * @param {string | number} userId
     * @returns {Promise<boolean>}
     */
    clearUser(userId: string | number): Promise<boolean> {
        return this.cacheService.delete(USER_PREFIX(userId));
    }
}
