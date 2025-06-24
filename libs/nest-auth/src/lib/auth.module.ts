// noinspection JSUnusedGlobalSymbols

/**
 * Global authentication module for NestJS applications
 *
 * This module provides a complete authentication system for NestJS applications,
 * including JWT authentication, local authentication, Google OAuth, and more.
 * It's designed to be flexible and configurable to meet various authentication needs.
 *
 * The module is marked as @Global(), so it only needs to be imported once in your application.
 * It exports various services and guards that can be used throughout your application.
 *
 * @example
 * ```typescript
 * // In your app module
 * @Module({
 *   imports: [
 *     HichchiAuthModule.register(
 *       {
 *         imports: [UserModule],
 *         useExisting: UserService,
 *       },
 *       {
 *         jwt: {
 *           secret: 'your-secret',
 *           expiresIn: '1h',
 *           refreshSecret: 'your-refresh-secret',
 *           refreshExpiresIn: '7d'
 *         },
 *         // other options
 *       }
 *     )
 *   ],
 *   // other module configuration
 * })
 * export class AppModule {}
 * ```
 *
 * @see {@link AuthService} Main service handling authentication logic
 * @see {@link JwtAuthGuard} Guard for JWT authentication
 * @see {@link GoogleAuthGuard} Guard for Google OAuth authentication
 * @see {@link AuthController} Controller exposing authentication endpoints
 * @see {@link UserServiceActions} Interface that user service implementations must implement
 * @see {@link AuthOptions} Configuration options for the authentication module
 */
import { DynamicModule, Global, Inject, Module, Type } from "@nestjs/common";
import { AuthService, JwtTokenService, UserCacheService } from "./services";
import { UserServiceExistingProvider, UserServiceFactoryProvider, UserServiceProvider } from "./providers";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { AuthOptions, UserServiceActions } from "./interfaces";
import { AUTH_OPTIONS, USER_SERVICE } from "./tokens";
import { AuthController } from "./controllers";
import { GoogleStrategy, JwtStrategy, LocalStrategy } from "./strategies";
import { GoogleAuthGuard, JwtAuthGuard } from "./guards";
import { TokenVerifyService } from "./services/token-verify.service";
import { CacheModule } from "@hichchi/nest-core";
import { ForwardReference } from "@nestjs/common/interfaces/modules/forward-reference.interface";
import { validateJwtOptions, validateRedisOptions, validateUserServiceProvider } from "./utils";
import { EncryptionService } from "./services/encryption.service";

@Global()
@Module({})
export class HichchiAuthModule {
    /**
     * Creates an instance of HichchiAuthModule
     *
     * The constructor validates that the provided user service implements all required methods
     * based on the authentication options.
     *
     * @param {UserServiceActions} userService - The user service injected from USER_SERVICE token
     * @param {AuthOptions} options - The authentication options injected from AUTH_OPTIONS token
     * @throws {ImplementationException} If the user service doesn't implement required methods
     *
     * @see {@link USER_SERVICE} Token for injecting user service
     * @see {@link AUTH_OPTIONS} Token for injecting authentication options
     * @see {@link validateUserServiceProvider} Function that validates the user service implementation
     * @see {@link UserServiceActions} Interface that user service implementations must implement
     */
    constructor(@Inject(USER_SERVICE) userService: UserServiceActions, @Inject(AUTH_OPTIONS) options: AuthOptions) {
        validateUserServiceProvider(userService, options);
    }

    /**
     * Register the HichchiAuthModule
     *
     * This method is used to register the `HichchiAuthModule` in your application.
     * It takes a user service provider and authentication options as arguments and returns a dynamic module.
     * The user service provider can be either `UserServiceFactoryProvider` or `UserServiceExistingProvider`.
     * The `UserService` used in the user service provider should implement the `UserServiceActions` interface provided by the `@hichchi/nest-auth` package.
     *
     * The authentication options include the redis, jwt, cookies, socket, authMethod, authField, disableSignUp, signUpDto, and viewDto.
     *
     * @param {UserServiceProvider} userServiceProvider The user service provider
     * @param {AuthOptions} options The authentication options
     * @returns {DynamicModule} The dynamic module
     * @throws {ImplementationException} If JWT options are missing or invalid
     * @throws {ImplementationException} If Redis options are provided but invalid
     *
     * @example
     * ```TypeScript
     * @Module({
     *     imports: [
     *         HichchiAuthModule.register(
     *             // Using UserServiceFactoryProvider
     *             {
     *                 imports: [UserModule],
     *                 useFactory: (userService: UserService) => userService,
     *                 inject: [UserService],
     *             },
     *             { ... },
     *         ),
     *     ],
     *     controllers: [...],
     *     providers: [...],
     * })
     * export class AppModule {}
     * ```
     *
     * @example
     * ```TypeScript
     * @Module({
     *     imports: [
     *         HichchiAuthModule.register(
     *             // Using UserServiceExistingProvider
     *             {
     *                 imports: [UserModule],
     *                 useExisting: UserService,
     *             },
     *             { ... },
     *         ),
     *     ],
     *     controllers: [...],
     *     providers: [...],
     * })
     * export class AppModule {}
     *
     * ```
     *
     * @see {@link UserServiceProvider} Interface for providing user service
     * @see {@link UserServiceFactoryProvider} Provider using factory function
     * @see {@link UserServiceExistingProvider} Provider using existing service
     * @see {@link validateJwtOptions} Function that validates JWT options
     * @see {@link validateRedisOptions} Function that validates Redis options
     * @see {@link validateUserServiceProvider} Function that validates user service provider
     */
    public static register(userServiceProvider: UserServiceProvider, options: AuthOptions): DynamicModule {
        validateJwtOptions(options.jwt);

        const imports: Array<Type | DynamicModule | Promise<DynamicModule> | ForwardReference> = [
            JwtModule.register(options.jwt),
            PassportModule,
        ];

        if (options.redis) {
            validateRedisOptions(options.redis);
            imports.push(CacheModule.register(options.redis));
        }

        if (userServiceProvider.imports) {
            imports.push(...userServiceProvider.imports);
        }

        return {
            module: HichchiAuthModule,
            imports,
            providers: [
                {
                    provide: USER_SERVICE,
                    useFactory: (userServiceProvider as UserServiceFactoryProvider).useFactory,
                    useExisting: (userServiceProvider as UserServiceExistingProvider).useExisting,
                    inject: (userServiceProvider as UserServiceFactoryProvider).inject,
                },
                {
                    provide: AUTH_OPTIONS,
                    useValue: options,
                },
                AuthService,
                UserCacheService,
                EncryptionService,
                JwtTokenService,
                LocalStrategy,
                JwtStrategy,
                JwtAuthGuard,
                GoogleStrategy,
                GoogleAuthGuard,
                TokenVerifyService,
                ...((userServiceProvider as UserServiceFactoryProvider).inject ?? []),
            ],
            controllers: [AuthController],
            exports: [
                AuthService,
                JwtStrategy,
                JwtAuthGuard,
                GoogleStrategy,
                GoogleAuthGuard,
                UserCacheService,
                TokenVerifyService,
                {
                    provide: AUTH_OPTIONS,
                    useValue: options,
                },
            ],
        };
    }
}
