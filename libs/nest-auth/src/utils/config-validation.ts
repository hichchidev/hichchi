import { ImplementationException, RedisOptions } from "@hichchi/nest-core";
import { AuthOptions, IUserService, JwtOptions } from "../interfaces";
import { AuthField } from "@hichchi/nest-connector/auth";

/**
 * Validates Redis connection options
 *
 * This function checks if the Redis options contain either a URL or a host,
 * which are required for establishing a connection to Redis.
 *
 * @param {RedisOptions} options - The Redis connection options to validate
 * @throws {ImplementationException} If neither url nor host is provided
 *
 * @example
 * ```typescript
 * // Validate Redis options
 * validateRedisOptions({
 *   host: 'localhost',
 *   port: 6379
 * });
 * ```
 */
export function validateRedisOptions(options: RedisOptions): void {
    if (!("url" in options) && !("host" in options)) {
        throw new ImplementationException(
            "Invalid Redis options",
            "The Redis options must contain either a url or a host",
        );
    }
}

/**
 * Validates JWT configuration options
 *
 * This function ensures that all required JWT options are provided, including:
 * - secret: for signing access tokens
 * - expiresIn: expiration time for access tokens
 * - refreshSecret: for signing refresh tokens
 * - refreshExpiresIn: expiration time for refresh tokens
 *
 * @param {Partial<JwtOptions>} options - The JWT options to validate
 * @throws {ImplementationException} If any required JWT option is missing
 *
 * @example
 * ```typescript
 * // Validate JWT options
 * validateJwtOptions({
 *   secret: 'your-secret-key',
 *   expiresIn: '1h',
 *   refreshSecret: 'your-refresh-secret-key',
 *   refreshExpiresIn: '7d'
 * });
 * ```
 */
export function validateJwtOptions(options: Partial<JwtOptions>): void {
    if (!options) {
        throw new ImplementationException("Invalid auth options", "The JWT options must be provided (jwt)");
    }

    if (!options.secret) {
        throw new ImplementationException("Invalid JWT options", "The JWT secret must be provided (jwt.secret)");
    }

    if (!options.expiresIn) {
        throw new ImplementationException("Invalid JWT", "The JWT expiration time must be provided (jwt.expiresIn)");
    }

    if (!options.refreshSecret) {
        throw new ImplementationException(
            "Invalid JWT options",
            "The JWT refresh secret must be provided (jwt.refreshSecret)",
        );
    }

    if (!options.refreshExpiresIn) {
        throw new ImplementationException(
            "Invalid JWT",
            "The JWT refresh expiration time must be provided (jwt.refreshExpiresIn)",
        );
    }
}

/**
 * Helper function for throwing provider implementation errors
 *
 * This internal function generates appropriate error messages for missing
 * implementations in the user service provider based on the context.
 *
 * @param {string} method - The name of the method that should be implemented
 * @param {AuthField | string} [authField] - Optional authentication field that requires this method
 * @param {boolean} [social] - Whether this is related to social authentication
 * @throws {ImplementationException} Always throws with appropriate error message
 * @returns {never} This function never returns as it always throws an exception
 *
 * @internal
 */
function throwProviderError(method: string, authField?: AuthField | string, social?: boolean): never {
    const description = authField
        ? `    ${method} method should be implemented when authField is set to ${authField}${authField === AuthField.BOTH ? "" : " or BOTH\n"}`
        : social
          ? `    ${method} method should be implemented when using social sign in\n`
          : "";
    throw new ImplementationException(
        "The user service does not implement the UserServiceActions interface properly",
        `UserService provided to HichchiAuthModule.registerAsync() does not implements the ${method} method in UserServiceActions interface provided by '@hichchi/nest-auth'`,
        description,
    );
}

/**
 * Validates that the user service implements all required methods
 *
 * This function checks if the provided user service implements all the methods
 * required by the authentication module based on the configured options.
 * Different authentication strategies require different methods to be implemented.
 *
 * @param {IUserService} userService - The user service to validate
 * @param {AuthOptions} options - The authentication options that determine which methods are required
 * @throws {ImplementationException} If any required method is missing from the user service
 *
 * @example
 * ```typescript
 * // Validate a user service with email authentication
 * validateUserServiceProvider(myUserService, {
 *   authField: AuthField.EMAIL,
 *   // other options...
 * });
 * ```
 */
export function validateUserServiceProvider(userService: IUserService, options: AuthOptions): void {
    if (!userService.signUpUser) {
        throwProviderError("signUpUser");
    } else if (!userService.getUserById) {
        throwProviderError("getUserById");
    } else if (!userService.updateUserById) {
        throwProviderError("updateUserById");
    } else if (
        !("getUserByAuthField" in userService) &&
        options.authField &&
        !Object.values(AuthField).includes(options.authField as AuthField)
    ) {
        throwProviderError("getUserByAuthField", options.authField);
    } else if (
        (options.authField === AuthField.EMAIL || options.authField === AuthField.BOTH) &&
        !("getUserByEmail" in userService)
    ) {
        throwProviderError("getUserByEmail", "EMAIL");
    } else if (!("getUserByUsername" in userService)) {
        if (options.authField === AuthField.USERNAME || options.authField === AuthField.BOTH) {
            throwProviderError("getUserByUsername", "USERNAME");
        } else if (options.googleAuth) {
            throwProviderError("getUserByUsername", undefined, true);
        }
    } else if (options.authField === AuthField.BOTH && !("getUserByUsernameOrEmail" in userService)) {
        throwProviderError("getUserByUsernameOrEmail", "BOTH");
    }
}
