import { Inject, Injectable } from "@nestjs/common";
import { AuthOptions, IJwtPayload } from "../interfaces";
import { JwtService } from "@nestjs/jwt";
import { AUTH_OPTIONS } from "../tokens";

@Injectable()
export class JwtTokenService {
    constructor(
        @Inject(AUTH_OPTIONS) private options: AuthOptions,
        private readonly jwtService: JwtService,
    ) {}

    /**
     * Create a new JWT token
     * @param {IJwtPayload} payload Payload to be signed
     * @returns {string} JWT access token
     */
    createToken(payload: IJwtPayload): string {
        return this.jwtService.sign(payload, {
            secret: this.options.jwt.secret,
            expiresIn: this.options.jwt.expiresIn,
        });
    }

    /**
     * Create a new refresh token
     * @param {IJwtPayload} payload Payload to be signed
     * @returns {string} JWT refresh token
     */
    createRefreshToken(payload: IJwtPayload): string {
        return this.jwtService.sign(payload, {
            secret: this.options.jwt.refreshSecret,
            expiresIn: this.options.jwt.refreshExpiresIn,
        });
    }

    /**
     * Verify the access token
     * @param {string} accessToken Access token to be verified
     * @returns {IJwtPayload} Verified payload
     */
    verifyAccessToken(accessToken: string): IJwtPayload {
        return this.jwtService.verify(accessToken, {
            secret: this.options.jwt.secret,
        });
    }

    /**
     * Verify the refresh token
     * @param {string} refreshToken Refresh token to be verified
     * @returns {IJwtPayload} Verified payload
     */
    verifyRefreshToken(refreshToken: string): IJwtPayload {
        return this.jwtService.verify(refreshToken, {
            secret: this.options.jwt.refreshSecret,
        });
    }

    getTokenExpiresOn(accessToken: string): Date {
        const { exp } = this.jwtService.decode(accessToken);
        return new Date(exp * 1000);
    }
}
