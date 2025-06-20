import { Inject, Injectable } from "@nestjs/common";
import { AuthOptions, IJwtPayload } from "../interfaces";
import { JwtService } from "@nestjs/jwt";
import { AUTH_OPTIONS } from "../tokens";
import { AccessToken, RefreshToken } from "@hichchi/nest-connector/auth";

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
    createToken(payload: IJwtPayload): AccessToken {
        return this.jwtService.sign(payload, {
            secret: this.options.jwt.secret,
            expiresIn: this.options.jwt.expiresIn,
        }) as AccessToken;
    }

    /**
     * Create a new refresh token
     * @param {IJwtPayload} payload Payload to be signed
     * @returns {string} JWT refresh token
     */
    createRefreshToken(payload: IJwtPayload): RefreshToken {
        return this.jwtService.sign(payload, {
            secret: this.options.jwt.refreshSecret,
            expiresIn: this.options.jwt.refreshExpiresIn,
        }) as RefreshToken;
    }

    /**
     * Verify the access token
     * @param {AccessToken} accessToken Access token to be verified
     * @returns {IJwtPayload} Verified payload
     */
    verifyAccessToken(accessToken: AccessToken): IJwtPayload {
        return this.jwtService.verify(accessToken, {
            secret: this.options.jwt.secret,
        });
    }

    /**
     * Verify the refresh token
     * @param {RefreshToken} refreshToken Refresh token to be verified
     * @returns {IJwtPayload} Verified payload
     */
    verifyRefreshToken(refreshToken: RefreshToken): IJwtPayload {
        return this.jwtService.verify(refreshToken, {
            secret: this.options.jwt.refreshSecret,
        });
    }

    getTokenExpiresOn(token: AccessToken | RefreshToken): Date {
        const { exp } = this.jwtService.decode(token);
        return new Date(exp * 1000);
    }
}
