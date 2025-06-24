/**
 * Interface representing additional authentication-related user properties.
 *
 * The `UserExtra` interface extends the base user model with properties specifically
 * related to authentication mechanisms. It provides a flexible way to support
 * different authentication strategies (email, username, etc.) by storing the
 * authentication field name and its value separately.
 *
 * This interface is used in combination with the base User interface in various
 * authentication contexts throughout the application.
 *
 * @interface UserExtra
 *
 * @see {@link User} Base user interface with core user properties
 * @see {@link AuthUser} Combined interface for users with authentication tokens
 * @see {@link CacheUser} Interface for users stored in cache
 * @see {@link AuthField} Enum of standard authentication field options
 * @see {@link AuthOptions.authField} Configuration for the default authentication field
 */
export interface UserExtra {
    /**
     * The name of the field used for authentication
     *
     * This property stores which field is used as the identifier during authentication.
     * Common values would be 'email', 'username', or any other unique identifier field.
     *
     * This allows the authentication system to be flexible and support different
     * authentication strategies based on configuration.
     *
     * @see {@link AuthField} Enum of standard authentication field options
     * @see {@link AuthOptions.authField} Configuration for the default authentication field
     */
    authField?: string;

    /**
     * The value of the authentication field for this user
     *
     * This property stores the actual value of the field used for authentication.
     * For example, if authField is 'email', this would contain the user's email address.
     *
     * Storing this separately allows for optimized lookups during authentication
     * without having to determine which field to use at runtime.
     */
    authFieldValue?: string;
}
