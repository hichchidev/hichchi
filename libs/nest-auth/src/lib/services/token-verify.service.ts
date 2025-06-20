import { Injectable } from "@nestjs/common";
import { CacheService } from "@hichchi/nest-core";
import { VerifyToken } from "@hichchi/nest-connector/auth";
import { EntityId } from "@hichchi/nest-connector/crud";

const PASSWORD_RESET_USER_KEY = (userId: EntityId): string => `password-reset:userId:${userId}`;
const PASSWORD_RESET_TOKEN_KEY = (token: VerifyToken): string => `password-reset:token:${token}`;

const EMAIL_VERIFY_USER_KEY = (userId: EntityId): string => `email-verify:userId:${userId}`;
const EMAIL_VERIFY_TOKEN_KEY = (token: VerifyToken): string => `email-verify:token:${token}`;

@Injectable()
export class TokenVerifyService {
    constructor(private readonly cacheService: CacheService) {}

    async savePasswordResetToken(userId: EntityId, token: VerifyToken, ttl?: number): Promise<boolean> {
        const clear = await this.clearPasswordResetTokenByUserId(userId);
        const byId = await this.cacheService.set<VerifyToken>(PASSWORD_RESET_USER_KEY(userId), token, ttl);
        const byToken = await this.cacheService.set<EntityId>(PASSWORD_RESET_TOKEN_KEY(token), userId, ttl);
        return clear && byId && byToken;
    }

    async getPasswordResetTokenByUserId(userId: EntityId): Promise<VerifyToken | undefined> {
        return await this.cacheService.get<VerifyToken>(PASSWORD_RESET_USER_KEY(userId));
    }

    async getUserIdByPasswordResetToken(token: VerifyToken): Promise<EntityId | undefined> {
        return await this.cacheService.get<EntityId>(PASSWORD_RESET_TOKEN_KEY(token));
    }

    async clearPasswordResetTokenByUserId(userId: EntityId): Promise<boolean> {
        const token = await this.getPasswordResetTokenByUserId(userId);
        if (!token) {
            return true;
        }
        const byId = await this.cacheService.delete(PASSWORD_RESET_USER_KEY(userId));
        const byToken = await this.cacheService.delete(PASSWORD_RESET_TOKEN_KEY(token));
        return byId && byToken;
    }

    async saveEmailVerifyToken(userId: EntityId, token: VerifyToken, ttl?: number): Promise<boolean> {
        const clear = await this.clearEmailVerifyTokenByUserId(userId);
        const byId = await this.cacheService.set<string | number>(EMAIL_VERIFY_USER_KEY(userId), token, ttl);
        const byToken = await this.cacheService.set<string | number>(EMAIL_VERIFY_TOKEN_KEY(token), userId, ttl);
        return clear && byId && byToken;
    }

    async getEmailVerifyTokenByUserId(userId: EntityId): Promise<VerifyToken | undefined> {
        return await this.cacheService.get<VerifyToken>(EMAIL_VERIFY_USER_KEY(userId));
    }

    async getUserIdByEmailVerifyToken(token: VerifyToken): Promise<EntityId | undefined> {
        return await this.cacheService.get<EntityId>(EMAIL_VERIFY_TOKEN_KEY(token));
    }

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
