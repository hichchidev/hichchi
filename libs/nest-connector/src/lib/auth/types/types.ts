// noinspection JSUnusedGlobalSymbols

/**
 * Represents a JSON Web Token (JWT) with a branded string type for type safety.
 *
 * This type is a string that is branded with a unique symbol to differentiate it
 * from plain strings, ensuring that it is explicitly treated as a JWT token within
 * the type system. This branding enforces stricter type checking to prevent
 * accidentally passing or assigning plain strings where a JWT token is required.
 */
export type JWT = string & { readonly __brand: unique symbol };

export type AccessToken = string & { readonly __brand: unique symbol };

export type RefreshToken = string & { readonly __brand: unique symbol };

/**
 * Represents a type that ensures a verified token string.
 * This type is a branded type combining a string value and a `unique symbol`.
 * It can only be created through specific logic that guarantees the validity of the token.
 *
 * The branding (`__brand`) ensures that this type is not interchangeable with ordinary strings,
 * providing additional type safety and preventing misuse in the application.
 */
export type VerifyToken = string & { readonly __brand: unique symbol };
