import { Inject, Injectable } from "@nestjs/common";
import { AuthOptions, IJwtPayload } from "../interfaces";
import { JwtService } from "@nestjs/jwt";
import { AccessToken, RefreshToken } from "@hichchi/nest-connector/auth";
import { AUTH_OPTIONS } from "../tokens";
import { SECOND_IN_MS } from "@hichchi/nest-connector";

/**
 * JWT Token Service
 *
 * This service handles the creation and verification of JWT tokens for authentication.
 * It provides methods to create access tokens, refresh tokens, verify tokens, and get token expiration dates.
 *
 * @example
 * ```TypeScript
 * // Inject the service
 * constructor(private readonly jwtTokenService: JwtTokenService) {}
 * ```
 */
@Injectable()
export class JwtTokenService {
    /**
     * Creates an instance of JwtTokenService.
     *
     * @param {AuthOptions} options - The authentication options injected from AUTH_OPTIONS token
     * @param {JwtService} jwtService - The NestJS JWT service for token operations
     */
    constructor(
        @Inject(AUTH_OPTIONS) private options: AuthOptions,
        private readonly jwtService: JwtService,
    ) {}

    /**
     * Create a new JWT access token
     *
     * This method creates a new JWT access token with the provided payload.
     * The token is signed using the application's JWT secret and configured expiration time.
     *
     * @param {IJwtPayload} payload - The payload to be signed, typically containing a user ID
     * @returns {JWT} A signed JWT access token
     *
     * @example
     * ```TypeScript
     * const accessToken = jwtTokenService.createToken({ sub: '123e4567-e89b-12d3-a456-426614174000' });
     * // Result: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
     * ```
     */
    createToken(payload: IJwtPayload): AccessToken {
        return this.jwtService.sign(payload, {
            secret: this.options.jwt.secret,
            expiresIn: this.options.jwt.expiresIn,
        }) as AccessToken;
    }

    /**
     * Create a new JWT refresh token
     *
     * This method creates a new JWT refresh token with the provided payload.
     * The token is signed using the application's refresh token secret and configured expiration time.
     * Refresh tokens typically have a longer lifetime than access tokens.
     *
     * @param {IJwtPayload} payload - The payload to be signed, typically containing a user ID
     * @returns {JWT} A signed JWT refresh token
     *
     * @example
     * ```TypeScript
     * const refreshToken = jwtTokenService.createRefreshToken({ sub: '123e4567-e89b-12d3-a456-426614174000' });
     * // Result: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
     * ```
     */
    createRefreshToken(payload: IJwtPayload): RefreshToken {
        return this.jwtService.sign(payload, {
            secret: this.options.jwt.refreshSecret,
            expiresIn: this.options.jwt.refreshExpiresIn,
        }) as RefreshToken;
    }

    /**
     * Verify a JWT access token
     *
     * This method verifies the signature and expiration of a JWT access token.
     * If the token is valid, it returns the decoded payload.
     *
     * @param {JWT} accessToken - The JWT access token to verify
     * @returns {IJwtPayload} The decoded payload if the token is valid
     * @throws {import("@nestjs/jwt").JsonWebTokenError} If the token signature is invalid
     * @throws {import("@nestjs/jwt").TokenExpiredError} If the token has expired
     *
     * @example
     * ```TypeScript
     * try {
     *   const payload = jwtTokenService.verifyAccessToken(accessToken);
     *   console.log(`Token is valid for user: ${payload.sub}`); // '123e4567-e89b-12d3-a456-426614174000'
     * } catch (error) {
     *   if (error instanceof TokenExpiredError) {
     *     console.error('Token has expired');
     *   } else {
     *     console.error('Token is invalid');
     *   }
     * }
     * ```
     */
    verifyAccessToken(accessToken: AccessToken): IJwtPayload {
        return this.jwtService.verify(accessToken, {
            secret: this.options.jwt.secret,
        });
    }

    /**
     * Verify a JWT refresh token
     *
     * This method verifies the signature and expiration of a JWT refresh token.
     * If the token is valid, it returns the decoded payload.
     *
     * @param {JWT} refreshToken - The JWT refresh token to verify
     * @returns {IJwtPayload} The decoded payload if the token is valid
     * @throws {import("@nestjs/jwt").JsonWebTokenError} If the token signature is invalid
     * @throws {import("@nestjs/jwt").TokenExpiredError} If the token has expired
     *
     * @example
     * ```TypeScript
     * try {
     *   const payload = jwtTokenService.verifyRefreshToken(refreshToken);
     *   // payload.sub contains the user ID: '123e4567-e89b-12d3-a456-426614174000'
     *   // Generate a new access token
     *   const newAccessToken = jwtTokenService.createToken(payload);
     * } catch (error) {
     *   console.error('Refresh token is invalid or expired');
     * }
     * ```
     */
    verifyRefreshToken(refreshToken: RefreshToken): IJwtPayload {
        return this.jwtService.verify(refreshToken, {
            secret: this.options.jwt.refreshSecret,
        });
    }

    /**
     * Get the expiration date of a JWT token
     *
     * This method decodes a JWT token and extracts its expiration timestamp.
     * It converts the Unix timestamp to a JavaScript Date object.
     *
     * @param {JWT} token - The JWT token to decode
     * @returns {Date} The expiration date of the token
     *
     * @example
     * ```TypeScript
     * const expiresOn = jwtTokenService.getTokenExpiresOn(accessToken);
     * console.log(`Token expires on: ${expiresOn.toISOString()}`);
     *
     * // Check if token is about to expire
     * const now = new Date();
     * const fiveMinutes = 5 * 60 * 1000;
     * if (expiresOn.getTime() - now.getTime() < fiveMinutes) {
     *   console.log('Token will expire soon, consider refreshing');
     * }
     * ```
     */
    getTokenExpiresOn(token: AccessToken | RefreshToken): Date {
        const { exp } = this.jwtService.decode<{ exp: number }>(token);
        return new Date(exp * SECOND_IN_MS);
    }
}
