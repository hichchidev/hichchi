/**
 * Token for user service implementation
 *
 * This constant defines a token used for dependency injection of the user service
 * implementation in NestJS applications. It serves as a key for providing and
 * retrieving the user service throughout the authentication module.
 *
 * The token is used to inject an implementation of the IUserService interface,
 * which provides methods for user management such as finding, creating, and updating
 * users. This allows the authentication module to work with any user data storage
 * implementation that conforms to the interface.
 *
 * @example
 * ```typescript
 * // Providing a user service implementation
 * @Module({
 *   imports: [
 *     AuthModule.register({
 *       // Auth configuration...
 *     })
 *   ],
 *   providers: [
 *     {
 *       provide: USER_SERVICE,
 *       useClass: UserService
 *     }
 *   ]
 * })
 * export class AppModule {}
 * ```
 *
 * @see {@link IUserService} The interface that user service implementations must implement
 * @see {@link HichchiAuthModule} Module that uses this token for dependency injection
 * @see {@link UserServiceProvider} Provider interface for the user service
 * @see {@link UserServiceFactoryProvider} Factory provider for the user service
 * @see {@link UserServiceExistingProvider} Existing provider for the user service
 * @see {@link validateUserServiceProvider} Function that validates the user service implementation
 */
export const USER_SERVICE = "USER_SERVICE";

/**
 * Token for authentication configuration options
 *
 * This constant defines a token used for dependency injection of authentication
 * configuration options in NestJS applications. It serves as a key for providing
 * and retrieving authentication-related configuration throughout the application.
 *
 * The token is used to inject an implementation of the AuthOptions interface,
 * which provides configuration for JWT tokens, authentication strategies, and
 * other authentication-related settings.
 *
 * @example
 * ```typescript
 * // Providing authentication options
 * @Module({
 *   imports: [
 *     AuthModule.register({
 *       jwtSecret: 'your-secret-key',
 *       jwtExpiresIn: '1h',
 *       refreshTokenExpiresIn: '7d',
 *       google: {
 *         clientID: 'your-client-id',
 *         clientSecret: 'your-client-secret',
 *         callbackURL: 'http://localhost:3000/auth/google/callback'
 *       }
 *     })
 *   ]
 * })
 * export class AppModule {}
 * ```
 *
 * @see {@link AuthOptions} The interface that defines the authentication options structure
 * @see {@link HichchiAuthModule} Module that uses this token for dependency injection
 * @see {@link AuthController} Controller that uses these options for authentication endpoints
 * @see {@link AuthService} Service that uses these options for authentication logic
 * @see {@link JwtAuthGuard} Guard that uses these options for JWT authentication
 * @see {@link validateJwtOptions} Function that validates JWT options
 * @see {@link validateRedisOptions} Function that validates Redis options
 */
export const AUTH_OPTIONS = "AUTH_OPTIONS";
