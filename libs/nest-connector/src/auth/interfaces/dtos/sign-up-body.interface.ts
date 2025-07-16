/**
 * Interface defining the body structure for user registration requests.
 *
 * This interface specifies the required and optional properties for creating
 * a new user account. It includes personal information, authentication credentials,
 * and supports both email and username-based registration depending on the
 * application's authentication configuration.
 *
 * The interface requires basic personal information (first and last name) and
 * a password, while allowing flexibility in the choice of primary identifier
 * (email or username) based on the system's authentication strategy.
 *
 * @example
 * ```typescript
 * // Email-based registration
 * const emailSignUp: SignUpBody = {
 *   firstName: 'John',
 *   lastName: 'Doe',
 *   email: 'john.doe@example.com',
 *   password: 'securePassword123'
 * };
 * ```
 *
 * @example
 * ```typescript
 * // Username-based registration
 * const usernameSignUp: SignUpBody = {
 *   firstName: 'Jane',
 *   lastName: 'Smith',
 *   username: 'janesmith',
 *   password: 'securePassword123'
 * };
 * ```
 *
 * @example
 * ```typescript
 * // Registration with both email and username
 * const fullSignUp: SignUpBody = {
 *   firstName: 'Alice',
 *   lastName: 'Johnson',
 *   email: 'alice.johnson@example.com',
 *   username: 'alicejohnson',
 *   password: 'securePassword123'
 * };
 * ```
 *
 * @see {@link SignInBody} Related interface for user authentication
 * @see {@link User} Interface representing the created user account
 */
export interface SignUpBody {
    /**
     * The user's first name.
     *
     * Required field for personal identification and profile information.
     * Used for display purposes and personalization throughout the application.
     */
    firstName: string;

    /**
     * The user's last name.
     *
     * Required field for personal identification and profile information.
     * Used for display purposes and personalization throughout the application.
     */
    lastName: string;

    /**
     * The user's chosen username.
     *
     * Optional field that can serve as a unique identifier for the user account.
     * When provided, it may be used as an alternative to email for authentication
     * and may be displayed publicly or used for personalization.
     */
    username?: string;

    /**
     * The user's email address.
     *
     * Optional field that typically serves as the primary means of user identification
     * and communication. When provided, it's often used for account verification,
     * password recovery, and notifications.
     */
    email?: string;

    /**
     * The user's chosen password.
     *
     * Required field containing the user's plaintext password. This will be securely
     * hashed before storage and used for subsequent authentication attempts.
     * Should meet the application's password complexity requirements.
     */
    password: string;
}
