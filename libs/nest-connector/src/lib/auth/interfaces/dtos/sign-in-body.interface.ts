/**
 * Interface defining the body structure for user sign-in requests.
 *
 * This interface specifies the required and optional properties for authenticating
 * a user with their credentials. The interface supports both email and username-based
 * authentication, allowing flexibility in how users identify themselves.
 *
 * At least one of `username` or `email` must be provided along with the password
 * for successful authentication. The specific field used depends on the application's
 * authentication configuration.
 *
 * @example
 * ```typescript
 * // Email-based sign-in
 * const emailSignIn: SignInBody = {
 *   email: 'user@example.com',
 *   password: 'securePassword123'
 * };
 * ```
 *
 * @example
 * ```typescript
 * // Username-based sign-in
 * const usernameSignIn: SignInBody = {
 *   username: 'johndoe',
 *   password: 'securePassword123'
 * };
 * ```
 *
 * @see {@link SignUpBody} Related interface for user registration
 */
export interface SignInBody {
    /**
     * The user's username for authentication.
     *
     * Optional field that can be used as an alternative to email for user identification.
     * When provided, the authentication system will attempt to find a user with this username.
     */
    username?: string;

    /**
     * The user's email address for authentication.
     *
     * Optional field that serves as the primary means of user identification in most systems.
     * When provided, the authentication system will attempt to find a user with this email.
     */
    email?: string;

    /**
     * The user's password for authentication.
     *
     * Required field containing the user's plaintext password. This will be verified
     * against the stored hashed password during the authentication process.
     */
    password: string;
}
