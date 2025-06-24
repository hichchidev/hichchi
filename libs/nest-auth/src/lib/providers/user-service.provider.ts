/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserServiceActions } from "../interfaces";
import { DynamicModule, ForwardReference, Type } from "@nestjs/common";

/**
 * Interface for providing an existing user service implementation.
 *
 * This provider type is used when you have an existing service class that implements
 * the UserServiceActions interface and you want to use it as the user service for authentication.
 *
 * @example
 * ```typescript
 * // In your app module
 * @Module({
 *   imports: [
 *     UserModule,
 *     HichchiAuthModule.register(
 *       {
 *         imports: [UserModule],
 *         useExisting: UserService,
 *       },
 *       {
 *         jwt: { secret: 'your-secret' },
 *         // other options
 *       }
 *     )
 *   ],
 *   // other module configuration
 * })
 * export class AppModule {}
 * ```
 */
export interface UserServiceExistingProvider {
    /**
     * Optional array of modules to import.
     *
     * These modules will be imported into the dynamic module created by the auth module.
     * This is useful when your user service depends on other modules.
     */
    imports?: Array<Type | DynamicModule | Promise<DynamicModule> | ForwardReference>;

    /**
     * The existing service class that implements UserServiceActions.
     *
     * This should be a class reference (not an instance) that implements the UserServiceActions interface.
     * The auth module will use this class to resolve the user service.
     */
    useExisting: new (...args: any[]) => UserServiceActions;
}

/**
 * Interface for providing a factory function that creates a user service.
 *
 * This provider type is used when you want to create the user service instance
 * using a factory function, which gives you more control over how the service
 * is created and configured.
 *
 * @example
 * ```typescript
 * // In your app module
 * @Module({
 *   imports: [
 *     UserModule,
 *     HichchiAuthModule.register(
 *       {
 *         imports: [UserModule],
 *         useFactory: (userService: UserService) => userService,
 *         inject: [UserService],
 *       },
 *       {
 *         jwt: { secret: 'your-secret' },
 *         // other options
 *       }
 *     )
 *   ],
 *   // other module configuration
 * })
 * export class AppModule {}
 * ```
 */
export interface UserServiceFactoryProvider {
    /**
     * Optional array of modules to import.
     *
     * These modules will be imported into the dynamic module created by the auth module.
     * This is useful when your factory function depends on services from other modules.
     */
    imports?: Array<Type | DynamicModule | Promise<DynamicModule> | ForwardReference>;

    /**
     * Factory function that creates an instance of UserServiceActions.
     *
     * This function will be called to create the user service instance.
     * It can be synchronous (returning UserServiceActions) or asynchronous (returning Promise<UserServiceActions>).
     * The function can accept dependencies that are specified in the inject array.
     */
    useFactory: (...args: any[]) => UserServiceActions | Promise<UserServiceActions>;

    /**
     * Optional array of providers to inject into the factory function.
     *
     * These providers will be resolved and passed as arguments to the factory function
     * in the same order they are specified in this array.
     */
    inject?: any[];
}

/**
 * Union type representing either an existing provider or a factory provider for the user service.
 *
 * This type is used in the HichchiAuthModule.register method to allow either provider type
 * to be used when configuring the auth module.
 *
 * @example
 * ```typescript
 * // Using UserServiceExistingProvider
 * const provider: UserServiceProvider = {
 *   imports: [UserModule],
 *   useExisting: UserService,
 * };
 *
 * // Using UserServiceFactoryProvider
 * const provider: UserServiceProvider = {
 *   imports: [UserModule],
 *   useFactory: (userService: UserService) => userService,
 *   inject: [UserService],
 * };
 * ```
 */
export type UserServiceProvider = UserServiceExistingProvider | UserServiceFactoryProvider;
