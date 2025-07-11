// noinspection JSUnusedGlobalSymbols,ExceptionCaughtLocallyJS

import {
    BadRequestException,
    ForbiddenException,
    HttpException,
    Inject,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
    UnauthorizedException,
} from "@nestjs/common";
import { compareSync, hashSync } from "bcrypt";
import { JsonWebTokenError, TokenExpiredError } from "@nestjs/jwt";
import { LoggerService } from "@hichchi/nest-core";
import { Request, Response } from "express";
import { AUTH_OPTIONS, USER_SERVICE } from "../tokens";
import { UserCacheService } from "./user-cache.service";
import { JwtTokenService } from "./jwt-token.service";
import { v4 as uuid } from "uuid";
import { TokenVerifyService } from "./token-verify.service";
import { generateAuthUser } from "../utils";
import { AuthOptions, AuthUser, CacheUser, GoogleProfile, IJwtPayload, IUserService } from "../interfaces";
import {
    EmailVerifyDto,
    RequestResetDto,
    ResendEmailVerifyDto,
    ResetPasswordDto,
    ResetPasswordTokenVerifyDto,
    SignUpDto,
    UpdatePasswordDto,
} from "../dtos";
import { randomBytes, randomInt } from "crypto";
import {
    AccessToken,
    AuthErrors,
    AuthField,
    AuthMethod,
    AuthProvider,
    AuthResponse,
    AuthSuccessResponses,
    RefreshToken,
    TokenResponse,
    User,
    VerifyToken,
} from "@hichchi/nest-connector/auth";
import {
    DEFAULT_SALT_ROUNDS,
    DEFAULT_VERIFY_TOKEN_LENGTH,
    Errors,
    SECOND_IN_MS,
    SuccessResponse,
    SuccessResponseDto,
} from "@hichchi/nest-connector";
import { ACCESS_TOKEN_COOKIE_NAME, REFRESH_TOKEN_COOKIE_NAME } from "../constants";

/**
 * Core authentication service that provides comprehensive identity management functionality.
 *
 * This service is responsible for handling all authentication-related operations within the application.
 * It works alongside the AuthController to provide a complete authentication solution. The service
 * delegates many operations to specialized services like JwtTokenService for token management,
 * UserCacheService for session management, and TokenVerifyService for verification tokens.
 *
 * Key features include:
 * - User sign up and sign in with email/username and password
 * - JWT token generation, validation, and refresh
 * - Password management (change, reset, verify)
 * - Email verification workflow
 * - Social authentication (Google OAuth)
 * - Session management with multi-device support
 * - Token-based and cookie-based authentication modes
 *
 * The service is designed to be flexible and configurable through the AuthOptions injection token,
 * allowing applications to customize authentication behaviors. It also integrates with a user service
 * provided by the application through the USER_SERVICE injection token, which handles user data storage.
 *
 * Security features include:
 * - Secure password hashing with bcrypt
 * - Cryptographically secure token generation
 * - Token expiration and refresh mechanisms
 * - Protection against common authentication vulnerabilities
 *
 * @example
 * ```typescript
 * // In a controller
 * @Controller('auth')
 * export class AuthController {
 *   constructor(private readonly authService: AuthService) {}
 *
 *   @Post('sign-up')
 *   async signUp(@Req() request: Request, @Body() signUpDto: SignUpDto) {
 *     return this.authService.signUp(request, signUpDto);
 *   }
 * }
 * ```
 *
 * @see {@link AuthController} The controller that exposes authentication endpoints using this service
 * @see {@link JwtTokenService} Service responsible for JWT token operations
 * @see {@link UserCacheService} Service that manages user session caching
 * @see {@link TokenVerifyService} Service that handles verification tokens
 * @see {@link AuthOptions} Configuration options for authentication behavior
 * @see {@link IUserService} Interface that user services must implement
 */
@Injectable()
export class AuthService {
    /**
     * Creates an instance of AuthService.
     *
     * @param {AuthOptions} options - The authentication options injected from `AUTH_OPTIONS` token
     * @param {IUserService} userService - The user service injected from `USER_SERVICE` token
     * @param {JwtTokenService} jwtTokenService - The JWT token service for token operations
     * @param {UserCacheService} cacheService - The user cache service for storing user sessions
     * @param {TokenVerifyService} tokenVerifyService - The token verification service for email and password reset tokens
     */
    constructor(
        @Inject(AUTH_OPTIONS) private options: AuthOptions,
        @Inject(USER_SERVICE) private userService: IUserService,
        private readonly jwtTokenService: JwtTokenService,
        private readonly cacheService: UserCacheService,
        private readonly tokenVerifyService: TokenVerifyService,
    ) {}

    /**
     * Generates a cryptographically secure random verification token for email verification or password reset.
     *
     * This static method creates a random hexadecimal string using Node.js crypto module's
     * randomBytes function, ensuring high entropy and security for verification purposes.
     * The generated tokens are used for one-time verification operations such as confirming
     * email addresses or validating password reset requests.
     *
     * The token length is configurable, with a default value defined by DEFAULT_VERIFY_TOKEN_LENGTH.
     * The actual string length will be twice the byte length since each byte is represented
     * by two hexadecimal characters.
     *
     * @param {number} [length=DEFAULT_VERIFY_TOKEN_LENGTH] - The length of the token in bytes (resulting hex string will be twice this length)
     * @returns {VerifyToken} A cryptographically secure random hexadecimal string
     *
     * @example
     * ```typescript
     * // Generate a token with default length
     * const token = AuthService.generateVerifyToken();
     * // Result: "a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6"
     *
     * // Generate a shorter token
     * const shortToken = AuthService.generateVerifyToken(8);
     * // Result: "a1b2c3d4e5f6a1b2"
     * ```
     *
     * @see {@link randomBytes} Node.js crypto function used for generating random bytes
     * @see {@link DEFAULT_VERIFY_TOKEN_LENGTH} Default length constant for verification tokens
     * @see {@link VerifyToken} Type representing verification tokens
     */
    public static generateVerifyToken(length: number = DEFAULT_VERIFY_TOKEN_LENGTH): VerifyToken {
        return randomBytes(length).toString("hex") as VerifyToken;
    }

    /**
     * Generates a cryptographically secure random password with strong complexity requirements.
     *
     * This static method creates a random password that follows best practices for password security:
     * - Includes at least one uppercase letter (A-Z)
     * - Includes at least one lowercase letter (a-z)
     * - Includes at least one number (0-9)
     * - Includes at least one special character (!@#$%&*)
     * - Characters are randomly shuffled to ensure unpredictability
     *
     * The method uses the Node.js crypto module's randomInt function to ensure
     * cryptographic randomness. Each character category is guaranteed to be
     * represented in the password, and the final character ordering is randomized
     * to increase entropy.
     *
     * @param {number} length - The desired length of the password (minimum 4 to accommodate all required character types)
     * @returns {string} A cryptographically secure random password meeting complexity requirements
     * @throws {Error} Implicitly if length is less than 4, as the minimum requirements cannot be met
     *
     * @example
     * ```typescript
     * // Generate an 8-character password
     * const password = AuthService.generateRandomPassword(8);
     * // Example result: "a2B!x9Zk"
     *
     * // Generate a longer password for higher security
     * const securePassword = AuthService.generateRandomPassword(16);
     * // Example result: "X7@bKp3qR!sT9zLm"
     * ```
     *
     * @see {@link randomInt} Node.js crypto function used for generating secure random integers
     * @see {@link generateHash} Method used to hash passwords after generation
     * @see {@link Math.random} Used for shuffling the password characters
     */
    public static generateRandomPassword(length: number): string {
        const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const lowercase = "abcdefghijklmnopqrstuvwxyz";
        const numbers = "0123456789";
        const symbols = "!@#$%&*";

        const allCharacters = uppercase + lowercase + numbers + symbols;

        const getRandomSecureIndex = (max: number): number => {
            return randomInt(0, max);
        };

        let password = "";
        password += uppercase[getRandomSecureIndex(uppercase.length)];
        password += lowercase[getRandomSecureIndex(lowercase.length)];
        password += numbers[getRandomSecureIndex(numbers.length)];
        password += symbols[getRandomSecureIndex(symbols.length)];

        for (let i = password.length; i < length; i++) {
            password += allCharacters[getRandomSecureIndex(allCharacters.length)];
        }

        password = password
            .split("")
            // eslint-disable-next-line @typescript-eslint/no-magic-numbers
            .sort(() => 0.5 - Math.random())
            .join("");

        return password;
    }

    /**
     * Generates a secure password hash using the bcrypt hashing algorithm.
     *
     * This static method creates a cryptographically secure hash of a password using bcrypt,
     * which is designed specifically for password hashing with built-in salt generation.
     * The bcrypt algorithm is resistant to brute-force attacks due to its computationally
     * intensive nature and automatic salt handling.
     *
     * Key security features:
     * - Automatically generates a random salt for each password
     * - Integrates the salt into the resulting hash string
     * - Uses a configurable number of rounds to adjust computational complexity
     * - Produces a self-contained hash string that includes algorithm information,
     *   cost factor, salt, and the actual hash
     *
     * The resulting hash follows the format: $2b$rounds$saltActualHash
     *
     * @param {string} password - The plain text password to hash
     * @returns {string} The complete bcrypt hash string (includes algorithm version, cost factor, salt, and hash)
     *
     * @example
     * ```typescript
     * // Hash a password
     * const hashedPassword = AuthService.generateHash('mySecurePassword123');
     * // Result: "$2b$10$X7Rw6.../K8fYtPO3Zg9O.zVSVu/n0MXFJSJPjYYkBCpIMT6s6Oy"
     *
     * // Store the hashed password in your database
     * await userRepository.update(userId, { password: hashedPassword });
     * ```
     *
     * @see {@link hashSync} The bcrypt function used for synchronous password hashing
     * @see {@link DEFAULT_SALT_ROUNDS} Configuration constant for bcrypt cost factor
     * @see {@link verifyHash} Companion method for verifying passwords against hashes
     */
    public static generateHash(password: string): string {
        return hashSync(password, DEFAULT_SALT_ROUNDS);
    }

    /**
     * Securely verifies a plain text password against a bcrypt hash.
     *
     * This static method determines whether a provided password matches a previously
     * generated bcrypt hash. It uses bcrypt's compareSync function, which:
     * 1. Extracts the salt from the hash string
     * 2. Applies the same hashing algorithm with the extracted salt to the input password
     * 3. Performs a time-constant comparison to prevent timing attacks
     *
     * The verification is performed in a way that protects against timing attacks,
     * where an attacker could potentially derive information based on how long the
     * comparison takes. Bcrypt's implementation ensures that comparisons take the
     * same amount of time regardless of whether they match or not.
     *
     * @param {string} password - The plain text password to verify
     * @param {string} hash - The bcrypt hash to compare against
     * @returns {boolean} True if the password matches the hash, false otherwise
     *
     * @example
     * ```typescript
     * // During sign in
     * const user = await userRepository.findByEmail(email);
     * if (user && AuthService.verifyHash(password, user.password)) {
     *   // Password is correct, proceed with authentication
     *   return generateAuthUser(user);
     * } else {
     *   // Invalid credentials
     *   throw new UnauthorizedException('Invalid email or password');
     * }
     * ```
     *
     * @see {@link compareSync} The bcrypt function used for synchronous password verification
     * @see {@link generateHash} Companion method for generating password hashes
     */
    public static verifyHash(password: string, hash: string): boolean {
        return compareSync(password, hash);
    }

    /**
     * Authenticate a user with username/email and password
     *
     * This method authenticates a user by verifying their credentials against the user service.
     * It supports authentication by either email or username, depending on the configured auth method.
     * If authentication is successful, it returns a authenticated user object that can be used to generate tokens.
     *
     * @param {Request} request - The Express request object
     * @param {string} username - The username or email to authenticate
     * @param {string} password - The password to verify
     * @param {string} [subdomain] - Optional subdomain for multi-tenant applications
     * @returns {Promise<AuthUser>} A authenticated user object if authentication is successful
     * @throws {UnauthorizedException} If the credentials are invalid
     * @throws {ForbiddenException} If the user is not verified and verification is required
     *
     * @example
     * ```typescript
     * // In a local strategy
     * async validate(request: Request, username: string, password: string): Promise<AuthUser> {
     *   try {
     *     return await this.authService
     *         .authenticate(request, username, password);
     *   } catch (error) {
     *     throw new UnauthorizedException('Invalid credentials');
     *   }
     * }
     * ```
     *
     * @see {@link authenticateJWT} Method for JWT-based authentication
     * @see {@link authenticateGoogle} Method for Google OAuth authentication
     * @see {@link signIn} Method that completes the authentication process after validation
     * @see {@link verifyHash} Static method used to verify password hash
     * @see {@link LocalStrategy} Strategy that uses this method to authenticate users
     */
    async authenticate(request: Request, username: string, password: string, subdomain?: string): Promise<AuthUser> {
        const INVALID_CREDS =
            this.options.authField === AuthField.EMAIL
                ? AuthErrors.AUTH_401_INVALID_EMAIL_PASSWORD
                : AuthErrors.AUTH_401_INVALID_USERNAME_PASSWORD;

        try {
            const user =
                this.options.authField === AuthField.USERNAME && this.userService.getUserByUsername
                    ? await this.userService.getUserByUsername(username, subdomain)
                    : this.options.authField === AuthField.EMAIL
                      ? await this.userService.getUserByEmail(username, subdomain)
                      : this.options.authField === AuthField.BOTH && this.userService.getUserByUsernameOrEmail
                        ? await this.userService.getUserByUsernameOrEmail(username, subdomain)
                        : Boolean(this.options.authField) && this.userService.getUserByAuthField
                          ? await this.userService.getUserByAuthField(username, subdomain)
                          : null;

            if (!user) {
                throw new UnauthorizedException(INVALID_CREDS);
            }

            if (!user.password) {
                throw new ForbiddenException(AuthErrors.AUTH_401_NOT_LOCAL);
            }

            if (!AuthService.verifyHash(password, user.password)) {
                throw new UnauthorizedException(INVALID_CREDS);
            }

            if (this.options.checkEmailVerified && !user.emailVerified) {
                throw new UnauthorizedException(AuthErrors.AUTH_401_EMAIL_NOT_VERIFIED);
            }

            // if (user.status === Status.PENDING) {
            //     return await Promise.reject(new ForbiddenException(AuthErrors.AUTH_403_PENDING));
            // }
            // if (user.status !== Status.ACTIVE) {
            //     return await Promise.reject(new UnauthorizedException(AuthErrors.AUTH_401_NOT_ACTIVE));
            // }

            const tokenResponse = this.generateTokens(user);

            const cacheUser = await this.updateCacheUser(user, tokenResponse);
            const authUser = generateAuthUser(cacheUser, tokenResponse.accessToken);

            await this.userService
                .onAuthenticate?.(request, authUser)
                .catch(callbackError =>
                    LoggerService.error("Error in onAuthenticate success callback:", callbackError),
                );

            return authUser;
        } catch (error) {
            await this.userService
                .onAuthenticate?.(request, undefined, error)
                .catch(callbackError => LoggerService.error("Error in onAuthenticate error callback:", callbackError));

            if (!(error instanceof HttpException)) {
                LoggerService.error(error);
            }

            throw new UnauthorizedException(INVALID_CREDS);
        }
    }

    /**
     * Authenticate a user using JWT
     *
     * This method verifies a JWT access token and retrieves the associated user from the cache.
     * It checks that the token is valid and that the user has an active session with this token.
     * If successful, it returns a authenticated user object that can be used for authenticated operations.
     *
     * @param {Request} request - The Express request object
     * @param {IJwtPayload} payload - The decoded JWT payload containing the user ID
     * @param {AccessToken} accessToken - The JWT access token to verify
     * @param {string} [_subdomain] - Optional subdomain for multi-tenant applications (not used)
     * @returns {Promise<AuthUser>} A authenticated user object if authentication is successful
     * @throws {UnauthorizedException} If the token is invalid, expired, or the user session doesn't exist
     *
     * @example
     * ```typescript
     * // In a JWT strategy
     * async validate(request: Request, payload: IJwtPayload): Promise<AuthUser> {
     *   try {
     *     const accessToken = ExtractJwt.fromAuthHeaderAsBearerToken()(request);
     *     return await this.authService.authenticateJWT(
     *       request,
     *       payload,
     *       accessToken
     *     );
     *   } catch (error) {
     *     throw new UnauthorizedException('Invalid token');
     *   }
     * }
     * ```
     *
     * @see {@link IJwtPayload} Interface representing the payload structure of a JWT token
     * @see {@link AuthUser} Interface representing a fully authenticated user with tokens
     * @see {@link JwtStrategy} Strategy that uses this method to authenticate users
     * @see {@link JwtTokenService.verifyAccessToken} Method used to verify the access token
     * @see {@link AccessToken} Type representing JWT access tokens
     * @see {@link authenticate} Method for username/password authentication
     * @see {@link authenticateGoogle} Method for Google OAuth authentication
     * @see {@link refreshTokens} Method to renew expired tokens
     */
    async authenticateJWT(
        request: Request,
        payload: IJwtPayload,
        accessToken: AccessToken,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        _subdomain?: string | undefined,
    ): Promise<AuthUser> {
        try {
            this.jwtTokenService.verifyAccessToken(accessToken);

            const cacheUser = await this.cacheService.getUser(payload.sub);

            if (
                !cacheUser ||
                !cacheUser.sessions?.length ||
                !cacheUser.sessions?.find(session => session.accessToken === accessToken)
            ) {
                throw new UnauthorizedException(AuthErrors.AUTH_401_INVALID_TOKEN);
            }

            const authUser = generateAuthUser(cacheUser, accessToken);

            await this.userService
                .onAuthenticateJWT?.(request, authUser)
                .catch(callbackError =>
                    LoggerService.error("Error in onAuthenticateJWT success callback:", callbackError),
                );

            return authUser;
        } catch (error) {
            await this.userService
                .onAuthenticateJWT?.(request, undefined, error)
                .catch(callbackError =>
                    LoggerService.error("Error in onAuthenticateJWT error callback:", callbackError),
                );

            if (error instanceof TokenExpiredError) {
                throw new UnauthorizedException(AuthErrors.AUTH_401_EXPIRED_TOKEN);
            } else if (error instanceof JsonWebTokenError) {
                throw new UnauthorizedException(AuthErrors.AUTH_401_INVALID_TOKEN);
            } else if (error instanceof HttpException) {
                throw error;
            }
            throw new UnauthorizedException();
        }
    }

    /**
     * Authenticate a user using Google
     *
     * This method authenticates a user with their Google profile information.
     * If the user already exists (matched by email), it will authenticate them.
     * If the user doesn't exist, it will sign up a new user with the Google profile data.
     * In both cases, it generates authentication tokens and creates a user session.
     *
     * @param {Request} request - The Express request object
     * @param {GoogleProfile} profile - The Google profile information containing user details
     * @param {string} [redirectUrl] - Optional URL to redirect after authentication
     * @returns {Promise<AuthUser>} A authenticated user object if authentication is successful
     * @throws {InternalServerErrorException} If the user service doesn't implement required methods
     * @throws {UnauthorizedException} If sign up fails
     *
     * @example
     * ```typescript
     * // In a Google strategy
     * async validate(request: Request, accessToken: string, refreshToken: string, profile: GoogleProfile): Promise<AuthUser> {
     *   try {
     *     return await this.authService.authenticateGoogle(
     *       request,
     *       {
     *         email: profile.emails[0].value,
     *         given_name: profile.name.givenName,
     *         family_name: profile.name.familyName
     *       },
     *       request.query.redirectUrl as string
     *     );
     *   } catch (error) {
     *     throw new UnauthorizedException('Google authentication failed');
     *   }
     * }
     * ```
     *
     * @see {@link GoogleProfile} Interface representing Google user profile data
     * @see {@link GoogleStrategy} Strategy that uses this method for authentication
     * @see {@link AuthProvider.GOOGLE} Enum value indicating Google authentication
     * @see {@link authenticate} Method for username/password authentication
     * @see {@link authenticateJWT} Method for JWT authentication
     * @see {@link signUp} Method used to create new users during Google authentication
     * @see {@link generateTokens} Method used to create tokens for the authenticated user
     */
    async authenticateGoogle(request: Request, profile: GoogleProfile, redirectUrl?: string): Promise<AuthUser> {
        if (!("getUserByEmail" in this.userService)) {
            throw new InternalServerErrorException(AuthErrors.AUTH_501_NOT_IMPLEMENTED);
        }

        try {
            let user = await this.userService.getUserByEmail(profile.email);
            if (!user) {
                try {
                    user = (await this.userService.signUpUser(
                        {
                            firstName: profile.given_name,
                            lastName: profile.family_name,
                            email: profile.email,
                        },
                        AuthProvider.GOOGLE,
                        profile,
                    )) as User & { email: string };
                } catch (error) {
                    LoggerService.error(error);
                    throw new UnauthorizedException(AuthErrors.AUTH_500_SIGN_UP);
                }
            }

            const tokenResponse = this.generateTokens(user);
            const cacheUser = await this.updateCacheUser(user, tokenResponse, undefined, redirectUrl);
            const authUser = generateAuthUser(cacheUser, tokenResponse.accessToken);

            await this.userService
                .onAuthenticateGoogle?.(request, authUser)
                .catch(callbackError =>
                    LoggerService.error("Error in onAuthenticateGoogle success callback:", callbackError),
                );

            return authUser;
        } catch (error) {
            await this.userService
                .onAuthenticateGoogle?.(request, undefined, error)
                .catch(callbackError =>
                    LoggerService.error("Error in onAuthenticateGoogle error callback:", callbackError),
                );

            throw error;
        }
    }

    /**
     * Get authentication response using an existing token
     *
     * This method retrieves a complete authentication response using a previously issued JWT token.
     * It verifies the token, retrieves the user, generates new authentication tokens, and creates
     * a user session. It returns comprehensive authentication data including tokens and user information.
     *
     * This is useful for clients that need to exchange an existing token for a complete authentication response.
     *
     * @param {Request} request - The Express request object
     * @param {AccessToken} accessToken - A valid JWT access token previously issued by this system
     * @param {Response} res - The Express response object for setting cookies
     * @returns {Promise<AuthResponse>} Authentication response containing user info and tokens
     * @throws {UnauthorizedException} If the token is invalid or the user doesn't exist
     *
     * @example
     * ```typescript
     * // In a controller
     * @Post('get-auth-response')
     * async getAuthResponse(
     *   @Req() req: Request,
     *   @Res({ passthrough: true }) res: Response,
     *   @Body() body: { accessToken: string }
     * ): Promise<AuthResponse> {
     *   return this.authService.getAuthResponse(req, body.accessToken, res);
     * }
     * ```
     *
     * @see {@link AuthResponse} Interface representing complete authentication data
     * @see {@link JwtTokenService.verifyAccessToken} Method used to verify the token
     * @see {@link getUserByToken} Method to get user information from a token
     * @see {@link generateTokens} Method used to create new tokens
     * @see {@link signIn} Method called to complete the authentication process
     * @see {@link AuthController.getAuthResponse} Controller endpoint that uses this method
     */
    async getAuthResponse(request: Request, accessToken: AccessToken, res: Response): Promise<AuthResponse> {
        const jwtPayload = this.jwtTokenService.verifyAccessToken(accessToken);

        const user = await this.userService.getUserById(jwtPayload.sub);
        if (!user) {
            return Promise.reject(new UnauthorizedException(AuthErrors.AUTH_401_SOCIAL_SIGN_IN));
        }

        const tokenResponse = this.generateTokens(user);

        const cacheUser = await this.updateCacheUser(user, tokenResponse);

        const authUser = generateAuthUser(cacheUser, accessToken);

        return this.signIn(request, authUser, res);
    }

    /**
     * Get a user by access token
     *
     * This overload retrieves a user by their access token. It verifies the token,
     * extracts the user ID from the payload, and fetches the user from the database.
     *
     * @param {Request} request - The Express request object
     * @param {AccessToken} token - The JWT access token
     * @returns {Promise<User | null>} The user if found and token is valid, null otherwise
     *
     * @example
     * ```typescript
     * // Get user from an access token
     * const accessToken = req.headers.authorization?.split(' ')[1];
     * const user = await authService.getUserByToken(req, accessToken);
     * if (user) {
     *   // User is authenticated
     * }
     * ```
     *
     * @see {@link AccessToken} Type representing JWT access tokens
     * @see {@link JwtTokenService.verifyAccessToken} Method used to verify the token
     * @see {@link User} Interface representing user information
     * @see {@link refreshTokens} Method to refresh tokens when they expire
     * @see {@link authenticateJWT} Method for JWT-based authentication
     */
    public async getUserByToken(request: Request, token: AccessToken): Promise<User | null>;

    /**
     * Get a user by refresh token
     *
     * This overload retrieves a user by their refresh token. It verifies the token,
     * extracts the user ID from the payload, and fetches the user from the database.
     *
     * @param {Request} request - The Express request object
     * @param {RefreshToken} token - The JWT refresh token
     * @param {true} refresh - Flag indicating this is a refresh token
     * @returns {Promise<User | null>} The user if found and token is valid, null otherwise
     *
     * @example
     * ```typescript
     * // Get user from a refresh token
     * const refreshToken = req.cookies.refreshToken;
     * const user = await authService.getUserByToken(req, refreshToken, true);
     * if (user) {
     *   // User's refresh token is valid
     * }
     * ```
     *
     * @see {@link RefreshToken} Type representing JWT refresh tokens
     * @see {@link JwtTokenService.verifyRefreshToken} Method used to verify the refresh token
     * @see {@link User} Interface representing user information
     * @see {@link refreshTokens} Method to create new tokens using a refresh token
     * @see {@link REFRESH_TOKEN_COOKIE_NAME} Constant for the refresh token cookie name
     */
    public async getUserByToken(request: Request, token: RefreshToken, refresh: true): Promise<User | null>;

    /**
     * Get a user by token
     *
     * This method retrieves a user by their JWT token (either access or refresh token).
     * It verifies the token, extracts the user ID from the payload, and fetches the user
     * from the database. It also triggers the onGetUserByToken callback if provided.
     *
     * @param {Request} request - The Express request object
     * @param {AccessToken | RefreshToken} token - The JWT token (access or refresh)
     * @param {boolean} [refresh] - Flag indicating if this is a refresh token
     * @returns {Promise<User | null>} The user if found and token is valid, null otherwise
     * @throws {Error} If token verification fails (caught internally and returns null)
     *
     * @see {@link verifyAccessToken} Method used to verify access tokens
     * @see {@link verifyRefreshToken} Method used to verify refresh tokens
     * @see {@link getUserById} Method used to retrieve the user
     * @see {@link onGetUserByToken} Optional callback for token retrieval
     * @see {@link AccessToken} Type representing JWT access tokens
     * @see {@link RefreshToken} Type representing JWT refresh tokens
     */
    public async getUserByToken(
        request: Request,
        token: AccessToken | RefreshToken,
        refresh?: boolean,
    ): Promise<User | null> {
        try {
            const payload = refresh
                ? this.jwtTokenService.verifyRefreshToken(token as RefreshToken)
                : this.jwtTokenService.verifyAccessToken(token as AccessToken);
            const user = await this.userService.getUserById(payload.sub);
            if (!user) {
                return null;
            }

            await this.userService
                .onGetUserByToken?.(request, user.id)
                .catch(callbackError =>
                    LoggerService.error("Error in onGetUserByToken success callback:", callbackError),
                );

            return user;
        } catch (error) {
            await this.userService
                .onGetUserByToken?.(request, undefined, error)
                .catch(callbackError =>
                    LoggerService.error("Error in onGetUserByToken error callback:", callbackError),
                );

            LoggerService.error(error);
            return null;
        }
    }

    /**
     * Generate access and refresh tokens for a user
     *
     * This method creates a new pair of JWT tokens (access token and refresh token)
     * for the specified user. It creates a payload containing the user ID,
     * signs it using the configured JWT secrets, and returns both tokens along
     * with their expiration dates.
     *
     * The access token is used for authenticating API requests, while the refresh token
     * is used to obtain a new access token when the current one expires.
     *
     * @param {User} user - The user to generate tokens for
     * @returns {TokenResponse} Object containing the access token, refresh token, and their expiration dates
     *
     * @example
     * ```typescript
     * // Generate tokens for a user
     * const user = await userService.getUserById('123e4567-e89b-12d3-a456-426614174000');
     * const tokens = authService.generateTokens(user);
     *
     * // tokens contains:
     * // {
     * //   accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
     * //   refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
     * //   accessTokenExpiresOn: Date,
     * //   refreshTokenExpiresOn: Date
     * // }
     * ```
     *
     * @see {@link TokenResponse} Interface that defines the structure of the token response
     * @see {@link JwtTokenService.createToken} Method used to create the access token
     * @see {@link JwtTokenService.createRefreshToken} Method used to create the refresh token
     * @see {@link JwtTokenService.getTokenExpiresOn} Method used to calculate token expiration
     * @see {@link IJwtPayload} Interface representing the payload structure of JWT tokens
     * @see {@link refreshTokens} Method to refresh tokens when they expire
     */
    generateTokens(user: User): TokenResponse {
        const payload: IJwtPayload = { sub: user.id };

        const accessToken = this.jwtTokenService.createToken(payload);

        const refreshToken = this.jwtTokenService.createRefreshToken(payload);

        return {
            accessToken,
            refreshToken,
            accessTokenExpiresOn: this.jwtTokenService.getTokenExpiresOn(accessToken),
            refreshTokenExpiresOn: this.jwtTokenService.getTokenExpiresOn(refreshToken),
        };
    }

    /**
     * Update the user session in cache
     *
     * This method updates or creates a user's session information in the cache.
     * It stores the user data along with their active sessions, which include
     * access tokens, refresh tokens, and optional frontend URLs.
     *
     * If an old refresh token is provided, it will remove the corresponding session
     * before adding the new one, effectively replacing the session.
     *
     * @param {User} user - The user to update in cache
     * @param {TokenResponse} tokenResponse - The token response containing access and refresh tokens
     * @param {string} [oldRefreshToken] - Optional old refresh token to replace
     * @param {string} [frontendUrl] - Optional frontend URL associated with the session
     * @returns {Promise<CacheUser>} The updated cache user object
     *
     * @example
     * ```typescript
     * // Update user session during sign in
     * const user = await userService.getUserById('123e4567-e89b-12d3-a456-426614174000');
     * const tokens = authService.generateTokens(user);
     * const cacheUser = await authService.updateCacheUser(user, tokens);
     *
     * // Replace an existing session during token refresh
     * const newTokens = authService.generateTokens(user);
     * const updatedCacheUser = await authService.updateCacheUser(
     *   user,
     *   newTokens,
     *   oldRefreshToken
     * );
     * ```
     *
     * @see {@link CacheUser} Interface representing a user in the cache
     * @see {@link UserCacheService.getUser} Method to retrieve the current cache state
     * @see {@link UserCacheService.setUser} Method to store the updated cache state
     * @see {@link TokenResponse} Interface containing access and refresh tokens
     * @see {@link generateAuthUser} Utility function to create auth user from cache user
     */
    async updateCacheUser(
        user: User,
        tokenResponse: TokenResponse,
        oldRefreshToken?: string,
        frontendUrl?: string,
    ): Promise<CacheUser> {
        const viewUser = this.options.viewDto ? new this.options.viewDto().formatDataSet(user) : user;

        const cacheUser: CacheUser = {
            ...viewUser,
            password: null,
            sessions: (await this.cacheService.getUser(user.id))?.sessions ?? [],
        };

        if (cacheUser.sessions.length) {
            if (oldRefreshToken) {
                cacheUser.sessions = cacheUser.sessions.filter(session => session.refreshToken !== oldRefreshToken);
            }
            cacheUser.sessions.push({
                sessionId: uuid(),
                accessToken: tokenResponse.accessToken,
                refreshToken: tokenResponse.refreshToken,
                frontendUrl,
            });
        } else {
            cacheUser.sessions = [
                {
                    sessionId: uuid(),
                    accessToken: tokenResponse.accessToken,
                    refreshToken: tokenResponse.refreshToken,
                    frontendUrl,
                },
            ];
        }

        await this.cacheService.setUser(cacheUser);

        return cacheUser;
    }

    /**
     * Set authentication cookies in the response
     *
     * This method sets HTTP cookies for both the access token and refresh token
     * in the response object. It only sets cookies if the authentication method
     * is configured to use cookies (AuthMethod.COOKIE).
     *
     * The cookies are configured with:
     * - Appropriate expiration times based on token lifetimes
     * - HTTP-only flag for security
     * - Same-site attribute as configured
     * - Secure flag as configured
     * - Signed flag to prevent tampering
     *
     * @param {Response} response - The Express response object to set cookies on
     * @param {TokenResponse} tokenResponse - The token response containing access and refresh tokens
     * @returns {void}
     *
     * @example
     * ```typescript
     * // In a controller or service
     * @Post('sign-in')
     * async signIn(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
     *   const user = await this.userService.validateUser(req.body.username, req.body.password);
     *   const tokens = this.authService.generateTokens(user);
     *
     *   // Set cookies in the response
     *   this.authService.setAuthCookies(res, tokens);
     *
     *   return { user, tokens };
     * }
     * ```
     *
     * @see {@link AuthMethod.COOKIE} Authentication method using cookies
     * @see {@link TokenResponse} Interface containing access and refresh tokens
     * @see {@link ACCESS_TOKEN_COOKIE_NAME} Constant for the access token cookie name
     * @see {@link REFRESH_TOKEN_COOKIE_NAME} Constant for the refresh token cookie name
     * @see {@link SECOND_IN_MS} Constant for converting seconds to milliseconds
     * @see {@link AuthOptions.cookies} Configuration for cookie settings
     */
    setAuthCookies(response: Response, tokenResponse: TokenResponse): void {
        if (this.options.authMethod === AuthMethod.COOKIE && this.options.cookies) {
            response.cookie(ACCESS_TOKEN_COOKIE_NAME, tokenResponse.accessToken, {
                maxAge: this.options.jwt.expiresIn * SECOND_IN_MS,
                httpOnly: true,
                sameSite: this.options.cookies.sameSite,
                secure: this.options.cookies.secure,
                signed: true,
            });
            response.cookie(REFRESH_TOKEN_COOKIE_NAME, tokenResponse.refreshToken, {
                maxAge: this.options.jwt.refreshExpiresIn * SECOND_IN_MS,
                httpOnly: true,
                sameSite: this.options.cookies.sameSite,
                secure: this.options.cookies.secure,
                signed: true,
            });
        }
    }

    /**
     * Sign up a new user
     *
     * This method handles the sign up of a new user. It hashes the user's password,
     * creates a new user record via the user service, and sends a verification email
     * if email verification is enabled. It also triggers the onSignUp callback if provided.
     *
     * Currently, this method only supports local sign up (SignUpType.LOCAL).
     *
     * @param {Request} request - The Express request object
     * @param {SignUpDto} signUpDto - The sign up data containing user information and password
     * @returns {Promise<User>} The newly signed up user (with password removed)
     * @throws {Error} If sign up fails or sending verification email fails
     *
     * @example
     * ```typescript
     * // In a controller
     * @Post('sign-up')
     * async signUp(@Req() req: Request, @Body() signUpDto: SignUpDto) {
     *   try {
     *     const user = await this.authService.signUp(req, signUpDto, SignUpType.LOCAL);
     *     return { success: true, user };
     *   } catch (error) {
     *     throw new BadRequestException('Sign up failed');
     *   }
     * }
     * ```
     */
    async signUp(request: Request, signUpDto: SignUpDto): Promise<User> {
        try {
            const { password: rawPass, ...rest } = signUpDto;
            const password = AuthService.generateHash(rawPass);
            const user = await this.userService.signUpUser({ ...rest, password }, AuthProvider.LOCAL);
            if (!user) {
                throw new InternalServerErrorException(AuthErrors.AUTH_500_SIGN_UP);
            }

            await this.sendVerificationEmail(user);
            user.password = null;

            await this.userService
                .onSignUp?.(request, user.id)
                .catch(callbackError => LoggerService.error("Error in onSignUp success callback:", callbackError));

            return user;
        } catch (error: unknown) {
            await this.userService
                .onSignUp?.(request, undefined, error)
                .catch(callbackError => LoggerService.error("Error in onSignUp error callback:", callbackError));

            throw error;
        }
    }

    /**
     * Sign in a user and create an authenticated session
     *
     * This method handles user sign in by creating an authenticated session for a authenticated user.
     * It verifies the user exists, sets authentication cookies if cookie-based authentication
     * is enabled, and triggers the onSignIn callback if provided.
     *
     * The authenticated user is typically created by the authenticate, authenticateJWT, or authenticateGoogle
     * methods and contains the user's ID and tokens.
     *
     * @param {Request} req - The Express request object
     * @param {AuthUser} authUser - The authenticated user object containing user ID and tokens
     * @param {Response} res - The Express response object for setting cookies
     * @returns {Promise<AuthResponse>} Authentication response containing user info and tokens
     * @throws {NotFoundException} If the user doesn't exist
     *
     * @example
     * ```typescript
     * // In a controller with LocalAuthGuard
     * @UseGuards(LocalAuthGuard)
     * @Post('sign-in')
     * async signIn(
     *   @Req() req: Request,
     *   @CurrentUser() authUser: AuthUser,
     *   @Res({ passthrough: true }) res: Response
     * ) {
     *   return this.authService.signIn(req, authUser, res);
     * }
     * ```
     */
    async signIn(req: Request, authUser: AuthUser, res: Response): Promise<AuthResponse> {
        try {
            const user = await this.userService.getUserById(authUser.id);
            if (!user) {
                throw new NotFoundException(AuthErrors.AUTH_401_UNKNOWN);
            }

            const { sessionId, accessToken, refreshToken } = authUser;

            const tokenResponse: TokenResponse = {
                accessToken,
                refreshToken,
                accessTokenExpiresOn: this.jwtTokenService.getTokenExpiresOn(accessToken),
                refreshTokenExpiresOn: this.jwtTokenService.getTokenExpiresOn(refreshToken),
            };

            this.setAuthCookies(res, tokenResponse);

            await this.userService
                .onSignIn?.(req, authUser)
                .catch(callbackError => LoggerService.error("Error in onSignIn success callback:", callbackError));

            return {
                ...tokenResponse,
                sessionId,
                user: { ...user, password: null },
            } as AuthResponse;
        } catch (error) {
            await this.userService
                .onSignIn?.(req, authUser, error)
                .catch(callbackError => LoggerService.error("Error in onSignIn error callback:", callbackError));
            throw error;
        }
    }

    /**
     * Get the current authenticated user's information
     *
     * This method retrieves the full user information for the currently authenticated user.
     * It uses the authenticated user's ID to fetch the complete user record from the database,
     * removes the password field for security, and triggers the onGetCurrentUser callback
     * if provided.
     *
     * This is typically used in endpoints that need to return the user's profile information.
     *
     * @param {Request} request - The Express request object
     * @param {AuthUser} authUser - The authenticated user object containing the user ID
     * @returns {Promise<User | null>} The user information with password removed
     * @throws {NotFoundException} If the user doesn't exist
     *
     * @example
     * ```typescript
     * // In a controller with JwtAuthGuard
     * @UseGuards(JwtAuthGuard)
     * @Get('me')
     * async getProfile(@Req() req: Request, @CurrentUser() authUser: AuthUser) {
     *   return this.authService.getCurrentUser(req, authUser);
     * }
     * ```
     */
    async getCurrentUser(request: Request, authUser: AuthUser): Promise<User | null> {
        try {
            const user = await this.userService.getUserById(authUser.id);
            if (!user) {
                throw new NotFoundException(AuthErrors.AUTH_401_UNKNOWN);
            }

            await this.userService
                .onGetCurrentUser?.(request, authUser)
                .catch(callbackError =>
                    LoggerService.error("Error in onGetCurrentUser success callback:", callbackError),
                );

            return { ...user, password: null };
        } catch (error) {
            await this.userService
                .onGetCurrentUser?.(request, authUser, error)
                .catch(callbackError =>
                    LoggerService.error("Error in onGetCurrentUser error callback:", callbackError),
                );
            throw error;
        }
    }

    /**
     * Refresh authentication tokens using a refresh token
     *
     * This method allows clients to obtain new access and refresh tokens when their
     * current access token expires, without requiring the user to log in again.
     * It verifies the refresh token, retrieves the user, generates new tokens,
     * updates the user's session in the cache, and sets new authentication cookies
     * if cookie-based authentication is enabled.
     *
     * @param {Request} request - The Express request object
     * @param {RefreshToken} token - The refresh token to use for generating new tokens
     * @param {Response} response - The Express response object for setting cookies
     * @returns {Promise<TokenResponse>} New access and refresh tokens with expiration dates
     * @throws {UnauthorizedException} If the refresh token is invalid, expired, or the user doesn't exist
     *
     * @example
     * ```typescript
     * // In a controller
     * @Post('refresh-token')
     * async refreshToken(
     *   @Req() req: Request,
     *   @Body() body: { refreshToken: string },
     *   @Res({ passthrough: true }) res: Response
     * ) {
     *   try {
     *     const tokens = await this.authService.refreshTokens(
     *       req,
     *       body.refreshToken,
     *       res
     *     );
     *     return tokens;
     *   } catch (error) {
     *     throw new UnauthorizedException('Invalid refresh token');
     *   }
     * }
     * ```
     */
    async refreshTokens(request: Request, token: RefreshToken, response: Response): Promise<TokenResponse> {
        try {
            const { sub } = this.jwtTokenService.verifyRefreshToken(token);

            const user = await this.userService.getUserById(sub);
            if (!user) {
                throw new UnauthorizedException(AuthErrors.AUTH_401_INVALID_REFRESH_TOKEN);
            }

            const tokenResponse: TokenResponse = this.generateTokens(user);

            const cacheUser = await this.updateCacheUser(user, tokenResponse, token);
            const authUser = generateAuthUser(cacheUser, tokenResponse.accessToken);
            this.setAuthCookies(response, tokenResponse);

            await this.userService
                .onRefreshTokens?.(request, authUser)
                .catch(callbackError => LoggerService.error("Error in onRefreshTokens callback:", callbackError));

            return tokenResponse;
        } catch (error) {
            if (error instanceof TokenExpiredError) {
                throw new UnauthorizedException(AuthErrors.AUTH_401_EXPIRED_REFRESH_TOKEN);
            } else if (error instanceof JsonWebTokenError) {
                throw new UnauthorizedException(AuthErrors.AUTH_401_INVALID_REFRESH_TOKEN);
            } else if (error instanceof HttpException) {
                throw error;
            }
            throw new UnauthorizedException();
        }
    }

    /**
     * Change the password for an authenticated user
     *
     * This method allows an authenticated user to change their password.
     * It verifies the user exists, checks that the old password is correct,
     * hashes the new password, updates the user record, and triggers the
     * onChangePassword callback if provided.
     *
     * This method only works for users with local authentication (users with a password).
     *
     * @param {Request} request - The Express request object
     * @param {AuthUser} authUser - The authenticated user object containing the user ID
     * @param {UpdatePasswordDto} updatePasswordDto - DTO containing the old and new passwords
     * @returns {Promise<User>} The updated user with password removed
     * @throws {UnauthorizedException} If the user doesn't exist
     * @throws {NotFoundException} If the old password is incorrect
     * @throws {ForbiddenException} If the user doesn't have local authentication
     *
     * @example
     * ```typescript
     * // In a controller with JwtAuthGuard
     * @UseGuards(JwtAuthGuard)
     * @Post('change-password')
     * async changePassword(
     *   @Req() req: Request,
     *   @CurrentUser() authUser: AuthUser,
     *   @Body() updatePasswordDto: UpdatePasswordDto
     * ) {
     *   return this.authService.changePassword(req, authUser, updatePasswordDto);
     * }
     * ```
     *
     * @see {@link verifyHash} Method used to verify the old password
     * @see {@link generateHash} Method used to hash the new password
     * @see {@link updateUserById} Method used to update the user record
     * @see {@link onChangePassword} Optional callback triggered after password change
     * @see {@link UpdatePasswordDto} DTO containing the old and new password fields
     */
    async changePassword(request: Request, authUser: AuthUser, updatePasswordDto: UpdatePasswordDto): Promise<User> {
        try {
            const user = await this.userService.getUserById(authUser.id);
            if (!user) {
                throw new UnauthorizedException(AuthErrors.AUTH_401_UNKNOWN);
            }

            if (user?.password) {
                const { oldPassword, newPassword } = updatePasswordDto;
                if (AuthService.verifyHash(oldPassword, user.password)) {
                    const password = AuthService.generateHash(newPassword);
                    const user = await this.userService.updateUserById(authUser.id, { password }, {
                        id: authUser.id,
                    } as User);
                    user.password = null;

                    // Success callback with error logging
                    await this.userService
                        .onChangePassword?.(request, authUser)
                        .catch(callbackError =>
                            LoggerService.error("Error in onChangePassword success callback:", callbackError),
                        );
                    return user;
                }

                throw new NotFoundException(AuthErrors.AUTH_401_INVALID_PASSWORD);
            }

            throw new ForbiddenException(AuthErrors.AUTH_401_NOT_LOCAL);
        } catch (error) {
            await this.userService
                .onChangePassword?.(request, authUser, error)
                .catch(callbackError =>
                    LoggerService.error("Error in onChangePassword error callback:", callbackError),
                );
            throw error;
        }
    }

    /**
     * Send an email verification link to a user
     *
     * This method generates a verification token, stores it in the cache,
     * and sends a verification email to the user. The token is used to verify
     * the user's email address when they click the link in the email.
     *
     * This method requires that the user service implements the sendVerificationEmail method.
     *
     * @param {User} user - The user to send the verification email to
     * @returns {Promise<void>}
     * @throws {NotFoundException} If the user service doesn't implement sendVerificationEmail
     * @throws {InternalServerErrorException} If there's an error generating the token or sending the email
     *
     * @example
     * ```typescript
     * // During user sign up
     * async signUp(signUpDto: SignUpDto) {
     *   const user = await this.userService.create(signUpDto);
     *   await this.authService.sendVerificationEmail(user);
     *   return { message: 'User signed up. Please check your email to verify your account.' };
     * }
     * ```
     *
     * @see {@link generateVerifyToken} Static method used to generate the verification token
     * @see {@link saveEmailVerifyToken} Method used to store the token in cache
     * @see {@link sendVerificationEmail} Method that sends the verification email
     * @see {@link verifyEmail} Method used to verify the email when user clicks the link
     * @see {@link Errors.ERROR_404_NOT_IMPLEMENTED} Error thrown when the service is not implemented
     */
    async sendVerificationEmail(user: User): Promise<void> {
        if (!this.userService.sendVerificationEmail) {
            throw new NotFoundException(Errors.ERROR_404_NOT_IMPLEMENTED);
        }

        try {
            const token = AuthService.generateVerifyToken();
            await this.tokenVerifyService.saveEmailVerifyToken(user.id, token);
            await this.userService.sendVerificationEmail(user.id, token);
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException(AuthErrors.AUTH_500_SEND_EMAIL_VERIFICATION);
        }
    }

    /**
     * Resend a verification email to a user
     *
     * This method allows users to request a new email verification link if they
     * didn't receive the original one or if it expired. It checks if the user exists,
     * verifies that their email is not already verified, generates a new verification token,
     * and sends a new verification email.
     *
     * This method requires that the user service implements getUserByEmail and sendVerificationEmail methods.
     *
     * @param {Request} request - The Express request object
     * @param {ResendEmailVerifyDto} resendEmailVerifyDto - DTO containing the email address
     * @returns {Promise<SuccessResponse>} Success response indicating the email was sent
     * @throws {NotFoundException} If the user service doesn't implement required methods or the email doesn't exist
     * @throws {BadRequestException} If the email is already verified
     * @throws {InternalServerErrorException} If there's an error sending the email
     *
     * @example
     * ```typescript
     * // In a controller
     * @Post('resend-verification')
     * async resendVerification(
     *   @Req() req: Request,
     *   @Body() resendDto: ResendEmailVerifyDto
     * ) {
     *   return this.authService.resendEmailVerification(req, resendDto);
     * }
     * ```
     *
     * @see {@link sendVerificationEmail} Method used to send the verification email
     * @see {@link getUserByEmail} Method used to get the user by email
     * @see {@link onResendVerificationEmail} Optional callback triggered after email is sent
     * @see {@link ResendEmailVerifyDto} DTO containing the email field
     * @see {@link SuccessResponseDto} Response object returned on success
     * @see {@link AuthErrors.AUTH_400_EMAIL_ALREADY_VERIFIED} Error thrown if email is already verified
     * @see {@link AuthErrors.AUTH_404_EMAIL} Error thrown if email doesn't exist
     */
    async resendEmailVerification(
        request: Request,
        resendEmailVerifyDto: ResendEmailVerifyDto,
    ): Promise<SuccessResponse> {
        if (!("getUserByEmail" in this.userService) || !this.userService.sendVerificationEmail) {
            throw new NotFoundException(Errors.ERROR_404_NOT_IMPLEMENTED);
        }

        const user = await this.userService.getUserByEmail(resendEmailVerifyDto.email);
        if (user) {
            if (user.emailVerified) {
                throw new BadRequestException(AuthErrors.AUTH_400_EMAIL_ALREADY_VERIFIED);
            }
            await this.sendVerificationEmail(user);

            await this.userService
                .onResendVerificationEmail?.(request, user.id)
                .catch(callbackError =>
                    LoggerService.error("Error in onResendVerificationEmail callback:", callbackError),
                );
            return new SuccessResponseDto(AuthSuccessResponses.AUTH_200_EMAIL_VERIFICATION_SENT);
        }

        throw new NotFoundException(AuthErrors.AUTH_404_EMAIL);
    }

    /**
     * Verify a user's email address using a verification token
     *
     * This method verifies a user's email address by validating the provided token.
     * If the token is valid, it updates the user's emailVerified status to true,
     * clears the verification token from the cache, and triggers the onVerifyEmail
     * callback if provided.
     *
     * This method requires that the user service implements the sendVerificationEmail method.
     *
     * @param {Request} request - The Express request object
     * @param {EmailVerifyDto} emailVerifyDto - DTO containing the verification token
     * @returns {Promise<SuccessResponse>} Success response indicating the email was verified
     * @throws {NotFoundException} If the user service doesn't implement required methods or the token is invalid
     * @throws {InternalServerErrorException} If there's an error verifying the email
     *
     * @example
     * ```typescript
     * // In a controller
     * @Get('verify-email')
     * async verifyEmail(
     *   @Req() req: Request,
     *   @Query() emailVerifyDto: EmailVerifyDto
     * ) {
     *   return this.authService.verifyEmail(req, emailVerifyDto);
     * }
     * ```
     *
     * @see {@link getUserIdByEmailVerifyToken} Method used to validate the token
     * @see {@link clearEmailVerifyTokenByUserId} Method used to clear the token
     * @see {@link updateUserById} Method used to update the user's email verification status
     * @see {@link onVerifyEmail} Optional callback triggered after email is verified
     * @see {@link EmailVerifyDto} DTO containing the verification token
     * @see {@link sendVerificationEmail} Method used to send the verification email
     * @see {@link AuthErrors.AUTH_500_VERIFY_EMAIL} Error thrown if verification fails
     */
    async verifyEmail(request: Request, emailVerifyDto: EmailVerifyDto): Promise<boolean> {
        if (!this.userService.sendVerificationEmail) {
            throw new NotFoundException(Errors.ERROR_404_NOT_IMPLEMENTED);
        }

        try {
            const userId = await this.tokenVerifyService.getUserIdByEmailVerifyToken(emailVerifyDto.token);
            if (userId) {
                await this.userService.updateUserById(userId, { emailVerified: true }, {
                    id: userId,
                } as User);
                await this.tokenVerifyService.clearEmailVerifyTokenByUserId(userId);

                // Success callback with error logging
                await this.userService
                    .onVerifyEmail?.(request, userId, true)
                    .catch(callbackError =>
                        LoggerService.error("Error in onVerifyEmail success callback:", callbackError),
                    );

                return true;
            }
            return false;
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException(AuthErrors.AUTH_500_VERIFY_EMAIL);
        }
    }

    /**
     * Request a password reset email
     *
     * This method initiates the password reset process for a user. It checks if the user
     * exists, generates a password reset token, stores it in the cache, and sends a
     * password reset email to the user. The token is used to verify the user's identity
     * when they attempt to reset their password.
     *
     * This method requires that the user service implements getUserByEmail and sendPasswordResetEmail methods.
     *
     * @param {Request} request - The Express request object
     * @param {RequestResetDto} requestResetDto - DTO containing the email address
     * @returns {Promise<SuccessResponse>} Success response indicating the reset email was sent
     * @throws {NotFoundException} If the user service doesn't implement required methods or the email doesn't exist
     * @throws {InternalServerErrorException} If there's an error generating the token or sending the email
     *
     * @example
     * ```typescript
     * // In a controller
     * @Post('forgot-password')
     * async forgotPassword(
     *   @Req() req: Request,
     *   @Body() requestResetDto: RequestResetDto
     * ) {
     *   return this.authService.requestPasswordReset(req, requestResetDto);
     * }
     * ```
     *
     * @see {@link generateVerifyToken} Static method used to generate the reset token
     * @see {@link savePasswordResetToken} Method used to store the token in cache
     * @see {@link getUserByEmail} Method used to get user by email
     * @see {@link sendPasswordResetEmail} Method that sends the reset email
     * @see {@link onRequestPasswordReset} Optional callback triggered after request
     * @see {@link verifyResetPasswordToken} Method used to verify the token before password reset
     * @see {@link resetPassword} Method used to perform the actual password reset
     * @see {@link RequestResetDto} DTO containing the email field
     * @see {@link SuccessResponseDto} Response object returned on success
     */
    async requestPasswordReset(request: Request, requestResetDto: RequestResetDto): Promise<SuccessResponse> {
        if (!("getUserByEmail" in this.userService) || !this.userService.sendPasswordResetEmail) {
            throw new NotFoundException(Errors.ERROR_404_NOT_IMPLEMENTED);
        }

        try {
            const user = await this.userService.getUserByEmail(requestResetDto.email);
            if (!user) {
                throw new NotFoundException(AuthErrors.AUTH_404_EMAIL);
            }

            if (!user.email) {
                throw new InternalServerErrorException(AuthErrors.AUTH_500);
            }

            const token = AuthService.generateVerifyToken();
            const setToken = await this.tokenVerifyService.savePasswordResetToken(user.id, token);
            const emailSent = await this.userService.sendPasswordResetEmail(user.email, token);

            if (setToken && emailSent) {
                // Success callback with error logging
                await this.userService
                    .onRequestPasswordReset?.(request, user.id)
                    .catch(callbackError =>
                        LoggerService.error("Error in onRequestPasswordReset callback:", callbackError),
                    );
                return new SuccessResponseDto(AuthSuccessResponses.AUTH_200_PASSWORD_RESET_EMAIL_SENT);
            }

            throw new InternalServerErrorException(AuthErrors.AUTH_500_REQUEST_PASSWORD_RESET);
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException(AuthErrors.AUTH_500_REQUEST_PASSWORD_RESET);
        }
    }

    /**
     * Verify a password reset token
     *
     * This method verifies if a password reset token is valid. It checks if the token
     * exists in the cache and is associated with a user. If the token is valid, it
     * triggers the onVerifyResetPasswordToken callback if provided.
     *
     * This method is typically used before showing the password reset form to the user,
     * to ensure that the token is valid.
     *
     * This method requires that the user service implements getUserByEmail and sendPasswordResetEmail methods.
     *
     * @param {Request} request - The Express request object
     * @param {ResetPasswordTokenVerifyDto} verifyDto - DTO containing the reset token
     * @returns {Promise<SuccessResponse>} Success response indicating if the token is valid
     * @throws {NotFoundException} If the user service doesn't implement required methods or the token is invalid
     *
     * @example
     * ```typescript
     * // In a controller
     * @Post('verify-reset-token')
     * async verifyResetToken(
     *   @Req() req: Request,
     *   @Body() verifyDto: ResetPasswordTokenVerifyDto
     * ) {
     *   try {
     *     return await this.authService.verifyResetPasswordToken(req, verifyDto);
     *     // If successful, show the password reset form
     *   } catch (error) {
     *     // If token is invalid, show an error message
     *     throw new BadRequestException('Invalid or expired token');
     *   }
     * }
     * ```
     *
     * @see {@link getUserIdByPasswordResetToken} Method used to validate the token
     * @see {@link onVerifyResetPasswordToken} Optional callback triggered after token verification
     * @see {@link requestPasswordReset} Method used to generate and send the reset token
     * @see {@link resetPassword} Method used to perform the actual password reset
     * @see {@link ResetPasswordTokenVerifyDto} DTO containing the reset token
     * @see {@link AuthErrors.AUTH_401_EXPIRED_OR_INVALID_PASSWORD_RESET_TOKEN} Error thrown if token is invalid
     */
    async verifyResetPasswordToken(request: Request, verifyDto: ResetPasswordTokenVerifyDto): Promise<SuccessResponse> {
        if (!("getUserByEmail" in this.userService) || !this.userService.sendPasswordResetEmail) {
            throw new NotFoundException(Errors.ERROR_404_NOT_IMPLEMENTED);
        }

        const userId = await this.tokenVerifyService.getUserIdByPasswordResetToken(verifyDto.token);
        if (userId) {
            await this.userService
                .onVerifyResetPasswordToken?.(request, userId)
                .catch(callbackError =>
                    LoggerService.error("Error in onVerifyResetPasswordToken callback:", callbackError),
                );
            return new SuccessResponseDto(AuthSuccessResponses.AUTH_200_PASSWORD_RESET_TOKEN_VALID);
        }

        throw new UnauthorizedException(AuthErrors.AUTH_401_EXPIRED_OR_INVALID_PASSWORD_RESET_TOKEN);
    }

    /**
     * Reset a user's password using a reset token
     *
     * This method allows users to set a new password after verifying their identity
     * with a password reset token. It verifies the token, updates the user's password
     * with the new hashed password, clears the reset token from the cache, and triggers
     * the onResetPassword callback if provided.
     *
     * This method should be called after the token has been verified using the
     * verifyResetPasswordToken method.
     *
     * This method requires that the user service implements getUserByEmail and sendPasswordResetEmail methods.
     *
     * @param {Request} request - The Express request object
     * @param {ResetPasswordDto} resetPasswordDto - DTO containing the reset token and new password
     * @returns {Promise<SuccessResponse>} Success response indicating the password was reset
     * @throws {NotFoundException} If the user service doesn't implement required methods, the token is invalid, or the user doesn't exist
     * @throws {InternalServerErrorException} If there's an error resetting the password
     *
     * @example
     * ```typescript
     * // In a controller
     * @Post('reset-password')
     * async resetPassword(
     *   @Req() req: Request,
     *   @Body() resetPasswordDto: ResetPasswordDto
     * ) {
     *   try {
     *     return await this.authService.resetPassword(req, resetPasswordDto);
     *     // If successful, redirect to sign in page
     *   } catch (error) {
     *     // If token is invalid or expired, show an error message
     *     throw new BadRequestException('Password reset failed');
     *   }
     * }
     * ```
     *
     * @see {@link getUserIdByPasswordResetToken} Method used to validate the token
     * @see {@link clearPasswordResetTokenByUserId} Method used to clear the token
     * @see {@link generateHash} Static method used to hash the new password
     * @see {@link updateUserById} Method used to update the user's password
     * @see {@link onResetPassword} Optional callback triggered after password reset
     * @see {@link verifyResetPasswordToken} Method used to verify the token before password reset
     * @see {@link requestPasswordReset} Method used to generate and send the reset token
     * @see {@link ResetPasswordDto} DTO containing the reset token and new password
     * @see {@link AuthErrors.AUTH_401_EXPIRED_OR_INVALID_PASSWORD_RESET_TOKEN} Error thrown if token is invalid
     * @see {@link AuthErrors.AUTH_500_PASSWORD_RESET} Error thrown if password reset fails
     */
    async resetPassword(request: Request, resetPasswordDto: ResetPasswordDto): Promise<SuccessResponse> {
        if (!("getUserByEmail" in this.userService) || !this.userService.sendPasswordResetEmail) {
            throw new NotFoundException(Errors.ERROR_404_NOT_IMPLEMENTED);
        }

        try {
            const { token, password } = resetPasswordDto;
            const userId = await this.tokenVerifyService.getUserIdByPasswordResetToken(token);
            if (!userId) {
                throw new NotFoundException(AuthErrors.AUTH_401_EXPIRED_OR_INVALID_PASSWORD_RESET_TOKEN);
            }

            const hash = AuthService.generateHash(password);
            const user = await this.userService.updateUserById(userId, { password: hash }, {
                id: userId,
            } as User);

            if (!user) {
                throw new NotFoundException(AuthErrors.AUTH_500_PASSWORD_RESET);
            }

            await this.tokenVerifyService.clearPasswordResetTokenByUserId(userId);

            await this.userService
                .onResetPassword?.(request, userId)
                .catch(callbackError => LoggerService.error("Error in onResetPassword callback:", callbackError));

            return new SuccessResponseDto(AuthSuccessResponses.AUTH_200_PASSWORD_RESET_SUCCESS);
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }

            throw new NotFoundException(AuthErrors.AUTH_500_PASSWORD_RESET);
        }
    }

    /**
     * Sign out a user and invalidate their session
     *
     * This method handles user sign out by invalidating their authentication tokens and
     * clearing authentication cookies. It removes the user's current session from the cache,
     * or all sessions if this is the last active session. If cookie-based authentication is
     * enabled, it also clears the authentication cookies from the response.
     *
     * The method also triggers the onSignOut callback if provided.
     *
     * @param {Request} request - The Express request object
     * @param {AuthUser} authUser - The authenticated user object containing the user ID and tokens
     * @param {Response} response - The Express response object for clearing cookies
     * @returns {Promise<SuccessResponse>} Success response indicating the user was signed out
     * @throws {Error} If there's an error during the sign-out process
     *
     * @example
     * ```typescript
     * // In a controller with JwtAuthGuard
     * @UseGuards(JwtAuthGuard)
     * @Post('sign-out')
     * async signOut(
     *   @Req() req: Request,
     *   @CurrentUser() authUser: AuthUser,
     *   @Res({ passthrough: true }) res: Response
     * ) {
     *   return this.authService.signOut(req, authUser, res);
     * }
     * ```
     *
     * @see {@link onSignOut} Optional callback triggered after sign out
     * @see {@link ACCESS_TOKEN_COOKIE_NAME} Constant for the access token cookie name
     * @see {@link REFRESH_TOKEN_COOKIE_NAME} Constant for the refresh token cookie name
     * @see {@link AuthMethod.COOKIE} Authentication method that uses cookies
     * @see {@link JwtAuthGuard} Guard that protects routes requiring authentication
     */
    async signOut(request: Request, authUser: AuthUser, response: Response): Promise<SuccessResponse> {
        try {
            if (this.options.authMethod === AuthMethod.COOKIE && this.options.cookies) {
                response.cookie(ACCESS_TOKEN_COOKIE_NAME, "", {
                    maxAge: 0,
                    httpOnly: true,
                    sameSite: this.options.cookies.sameSite,
                    secure: this.options.cookies.secure,
                    signed: true,
                });
                response.cookie(REFRESH_TOKEN_COOKIE_NAME, "", {
                    maxAge: 0,
                    httpOnly: true,
                    sameSite: this.options.cookies.sameSite,
                    secure: this.options.cookies.secure,
                    signed: true,
                });
            }

            const cacheUser = await this.cacheService.getUser(authUser.id);
            if (cacheUser && (cacheUser?.sessions?.length || 0) > 1) {
                cacheUser.sessions = cacheUser.sessions.filter(session => session.accessToken !== authUser.accessToken);
                if (cacheUser.sessions.length) {
                    cacheUser.sessions = cacheUser.sessions.filter(session => {
                        try {
                            this.jwtTokenService.verifyRefreshToken(session.refreshToken);
                            return true;
                        } catch {
                            return false;
                        }
                    });
                }
                await this.cacheService.setUser(cacheUser);
            } else {
                await this.cacheService.clearUser(authUser.id);
            }

            await this.userService
                .onSignOut?.(request, authUser)
                .catch(callbackError => LoggerService.error("Error in onSignOut success callback:", callbackError));

            return new SuccessResponseDto(AuthSuccessResponses.AUTH_200_SIGNED_OUT);
        } catch (error) {
            await this.userService
                .onSignOut?.(request, authUser, error)
                .catch(callbackError => LoggerService.error("Error in onSignOut error callback:", callbackError));
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException(AuthErrors.AUTH_500_SIGN_UP);
        }
    }
}
