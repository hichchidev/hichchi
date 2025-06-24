// noinspection JSUnusedGlobalSymbols

import { DynamicModule, Global, Inject, Module, Type } from "@nestjs/common";
import { AuthService, JwtTokenService, UserCacheService } from "./services";
import { UserServiceExistingProvider, UserServiceFactoryProvider, UserServiceProvider } from "./providers";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { AuthOptions, UserServiceActions } from "./interfaces";
import { AUTH_OPTIONS, USER_SERVICE } from "./tokens";
import { AuthController } from "./controllers";
import { JwtStrategy, LocalStrategy } from "./strategies";
import { GoogleAuthGuard, JwtAuthGuard } from "./guards";
import { TokenVerifyService } from "./services/token-verify.service";
import { GoogleStrategy } from "./strategies/google.strategy";
import { CacheModule } from "@hichchi/nest-core";
import { ForwardReference } from "@nestjs/common/interfaces/modules/forward-reference.interface";
import { validateJwtOptions, validateRedisOptions, validateUserServiceProvider } from "./utils/config-validation";
import { EncryptionService } from "./services/encryption.service";

@Global()
@Module({})
export class HichchiAuthModule {
    constructor(@Inject(USER_SERVICE) userService: UserServiceActions, @Inject(AUTH_OPTIONS) options: AuthOptions) {
        validateUserServiceProvider(userService, options);
    }

    /**
     * Register the HichchiAuthModule asynchronously
     *
     * This method is used to register the `HichchiAuthModule` asynchronously.
     * It takes a user service provider and authentication options as arguments and returns a dynamic module.
     * The user service provider can be either `UserServiceFactoryProvider` or `UserServiceExistingProvider`.
     * The `UserService` used in the user service provider should implement the `UserServiceActions` interface provided by the `hichchi-nestjs-auth` package.
     *
     * The authentication options include the redis, jwt, cookies, socket, authMethod, authField, disableSignUp, signUpDto, and viewDto.
     *
     * @param {UserServiceProvider} userServiceProvider The user service provider
     * @param {AuthOptions} options The authentication options
     * @returns {DynamicModule} The dynamic module
     *
     * @example
     * ```TypeScript
     * @Module({
     *     imports: [
     *         HichchiAuthModule.registerAsync(
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
     *         HichchiAuthModule.registerAsync(
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

// TODO: mention throws properly
