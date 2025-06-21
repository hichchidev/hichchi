import { EntityId } from "@hichchi/nest-connector/crud";
import { Injectable } from "@nestjs/common";
import { VerifyToken } from "@hichchi/nest-connector/auth";
import { CacheService } from "@hichchi/nest-core";

const PASSWORD_RESET_USER_KEY = (userId: EntityId): string => `password-reset:userId:${userId}`;
const PASSWORD_RESET_TOKEN_KEY = (token: VerifyToken): string => `password-reset:token:${token}`;

const EMAIL_VERIFY_USER_KEY = (userId: EntityId): string => `email-verify:userId:${userId}`;
const EMAIL_VERIFY_TOKEN_KEY = (token: VerifyToken): string => `email-verify:token:${token}`;

/**
 * Service for managing verification tokens
 *
 * This service handles the storage and retrieval of password reset and email verification tokens.
 * It uses the cache service to store tokens with optional time-to-live (TTL) values.
 *
 * @example
 * ```TypeScript
 * // Store a password reset token
 * await tokenVerifyService.savePasswordResetToken('user-id', 'reset-token');
 *
 * // Verify a password reset token
 * const userId = await tokenVerifyService.getUserIdByPasswordResetToken('reset-token');
 * if (userId) {
 *   // Token is valid
 * }
 * ```
 */
@Injectable()
export class TokenVerifyService {
    constructor(private readonly cacheService: CacheService) {}

    /**
     * Save a password reset token for a user
     *
     * This method stores a password reset token in the cache, associating it with a user ID.
     * It first clears any existing token for the user.
     *
     * @param {EntityId} userId - The ID of the user
     * @param {VerifyToken} token - The password reset token
     * @param {number} [ttl] - Optional time-to-live in seconds
     * @returns {Promise<boolean>} True if the token was saved successfully
     *
     * @example
     * ```TypeScript
     * const success = await tokenVerifyService.savePasswordResetToken(
     *   '123e4567-e89b-12d3-a456-426614174000',
     *   'a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6',
     *   3600 // 1 hour
     * );
     * ```
     */
    async savePasswordResetToken(userId: EntityId, token: VerifyToken, ttl?: number): Promise<boolean> {
        const clear = await this.clearPasswordResetTokenByUserId(userId);
        const byId = await this.cacheService.set<string>(PASSWORD_RESET_USER_KEY(userId), token, ttl);
        const byToken = await this.cacheService.set<string>(PASSWORD_RESET_TOKEN_KEY(token), userId, ttl);
        return clear && byId && byToken;
    }

    /**
     * Get a password reset token for a user
     *
     * @param {EntityId} userId - The ID of the user
     * @returns {Promise<VerifyToken | undefined>} The password reset token or undefined if not found
     *
     * @example
     * ```TypeScript
     * const token = await tokenVerifyService.getPasswordResetTokenByUserId('123e4567-e89b-12d3-a456-426614174000');
     * ```
     */
    getPasswordResetTokenByUserId(userId: EntityId): Promise<VerifyToken | undefined> {
        return this.cacheService.get<VerifyToken>(PASSWORD_RESET_USER_KEY(userId));
    }

    /**
     * Get a user ID by password reset token
     *
     * This method is used to verify a password reset token by retrieving the associated user ID.
     *
     * @param {VerifyToken} token - The password reset token
     * @returns {Promise<EntityId | undefined>} The user ID or undefined if the token is invalid
     *
     * @example
     * ```TypeScript
     * const userId = await tokenVerifyService.getUserIdByPasswordResetToken('a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6');
     * if (userId) {
     *   // Token is valid
     * }
     * ```
     */
    getUserIdByPasswordResetToken(token: VerifyToken): Promise<EntityId | undefined> {
        return this.cacheService.get<EntityId>(PASSWORD_RESET_TOKEN_KEY(token));
    }

    /**
     * Clear a password reset token for a user
     *
     * This method removes both the user-to-token and token-to-user mappings from the cache.
     *
     * @param {EntityId} userId - The ID of the user
     * @returns {Promise<boolean>} True if the token was cleared successfully
     *
     * @example
     * ```TypeScript
     * const success = await tokenVerifyService.clearPasswordResetTokenByUserId('123e4567-e89b-12d3-a456-426614174000');
     * ```
     */
    async clearPasswordResetTokenByUserId(userId: EntityId): Promise<boolean> {
        const token = await this.getPasswordResetTokenByUserId(userId);
        if (!token) {
            return true;
        }
        const byId = await this.cacheService.delete(PASSWORD_RESET_USER_KEY(userId));
        const byToken = await this.cacheService.delete(PASSWORD_RESET_TOKEN_KEY(token));
        return byId && byToken;
    }

    /**
     * Save an email verification token for a user
     *
     * This method stores an email verification token in the cache, associating it with a user ID.
     * It first clears any existing token for the user.
     *
     * @param {EntityId} userId - The ID of the user
     * @param {VerifyToken} token - The email verification token
     * @param {number} [ttl] - Optional time-to-live in seconds
     * @returns {Promise<boolean>} True if the token was saved successfully
     *
     * @example
     * ```TypeScript
     * const success = await tokenVerifyService.saveEmailVerifyToken(
     *   '123e4567-e89b-12d3-a456-426614174000',
     *   'a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6',
     *   86400 // 24 hours
     * );
     * ```
     */
    async saveEmailVerifyToken(userId: EntityId, token: VerifyToken, ttl?: number): Promise<boolean> {
        const clear = await this.clearEmailVerifyTokenByUserId(userId);
        const byId = await this.cacheService.set<string>(EMAIL_VERIFY_USER_KEY(userId), token, ttl);
        const byToken = await this.cacheService.set<string>(EMAIL_VERIFY_TOKEN_KEY(token), userId, ttl);
        return clear && byId && byToken;
    }

    /**
     * Get an email verification token for a user
     *
     * @param {EntityId} userId - The ID of the user
     * @returns {Promise<VerifyToken | undefined>} The email verification token or undefined if not found
     *
     * @example
     * ```TypeScript
     * const token = await tokenVerifyService.getEmailVerifyTokenByUserId('123e4567-e89b-12d3-a456-426614174000');
     * ```
     */
    getEmailVerifyTokenByUserId(userId: EntityId): Promise<VerifyToken | undefined> {
        return this.cacheService.get<VerifyToken>(EMAIL_VERIFY_USER_KEY(userId));
    }

    /**
     * Get a user ID by email verification token
     *
     * This method is used to verify an email verification token by retrieving the associated user ID.
     *
     * @param {VerifyToken} token - The email verification token
     * @returns {Promise<EntityId | undefined>} The user ID or undefined if the token is invalid
     *
     * @example
     * ```TypeScript
     * const userId = await tokenVerifyService.getUserIdByEmailVerifyToken('a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6');
     * if (userId) {
     *   // Token is valid
     * }
     * ```
     */
    getUserIdByEmailVerifyToken(token: VerifyToken): Promise<EntityId | undefined> {
        return this.cacheService.get<EntityId>(EMAIL_VERIFY_TOKEN_KEY(token));
    }

    /**
     * Clear an email verification token for a user
     *
     * This method removes both the user-to-token and token-to-user mappings from the cache.
     *
     * @param {EntityId} userId - The ID of the user
     * @returns {Promise<boolean>} True if the token was cleared successfully
     *
     * @example
     * ```TypeScript
     * const success = await tokenVerifyService.clearEmailVerifyTokenByUserId('123e4567-e89b-12d3-a456-426614174000');
     * ```
     */
    async clearEmailVerifyTokenByUserId(userId: EntityId): Promise<boolean> {
        const token = await this.getEmailVerifyTokenByUserId(userId);
        if (!token) {
            return true;
        }
        const byId = await this.cacheService.delete(EMAIL_VERIFY_USER_KEY(userId));
        const byToken = await this.cacheService.delete(EMAIL_VERIFY_TOKEN_KEY(token));
        return byId && byToken;
    }
}
