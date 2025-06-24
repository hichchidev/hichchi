import { ImplementationException, RedisOptions } from "@hichchi/nest-core";
import { AuthOptions, UserServiceActions, JwtOptions } from "../interfaces";
import { AuthField } from "../enums";

export function validateRedisOptions(options: RedisOptions): void {
    if (!("url" in options) && !("host" in options)) {
        throw new ImplementationException(
            "Invalid Redis options",
            "The Redis options must contain either a url or a host",
        );
    }
}

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

export function validateUserServiceProvider(userService: UserServiceActions, options: AuthOptions): void {
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
