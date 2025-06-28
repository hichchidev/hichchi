/**
 * Interface for authentication form data
 *
 * This interface defines the structure of data collected from authentication forms,
 * typically used for user registration or sign-in operations. It provides a standardized
 * format for form data that can be processed by authentication components and services.
 *
 * The interface is designed to be flexible and work with different authentication
 * field types (email, username, etc.) through the generic `authFieldValue` property.
 *
 * @example
 * ```typescript
 * // Example form data for email-based registration
 * const formData: AuthFormData = {
 *   firstName: 'John',
 *   lastName: 'Doe',
 *   authFieldValue: 'john.doe@example.com', // email
 *   password: 'securePassword123'
 * };
 * ```
 *
 * @example
 * ```typescript
 * // Example form data for username-based registration
 * const formData: AuthFormData = {
 *   firstName: 'Jane',
 *   lastName: 'Smith',
 *   authFieldValue: 'janesmith', // username
 *   password: 'mySecretPassword'
 * };
 * ```
 *
 * @example
 * ```typescript
 * // Using in a component
 * export class AuthFormComponent {
 *   onSubmit(formData: AuthFormData) {
 *     this.authService.signUp({
 *       firstName: formData.firstName,
 *       lastName: formData.lastName,
 *       email: formData.authFieldValue, // assuming email-based auth
 *       password: formData.password
 *     }).subscribe();
 *   }
 * }
 * ```
 *
 * @see {@link AuthFormComponent} Component that uses this interface
 * @see {@link AuthConfig} Configuration that determines the authentication field type
 * @see {@link AuthField} Enum defining authentication field types
 */
export interface AuthFormData {
    /** User's first name */
    firstName: string;
    /** User's last name */
    lastName: string;
    /** Authentication field value (email, username, etc.) */
    authFieldValue: string;
    /** User's password */
    password: string;
}
