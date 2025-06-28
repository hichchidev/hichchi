/**
 * Interface defining the body structure for password reset requests.
 *
 * This interface specifies the required properties for initiating a password
 * reset process. When a user forgets their password, they can provide their
 * email address to request a password reset token, which will be sent to
 * their registered email address.
 *
 * This is the first step in the password recovery flow, followed by the
 * actual password reset using the token received via email.
 *
 * @example
 * ```typescript
 * // Request password reset
 * const resetRequest: RequestResetBody = {
 *   email: 'user@example.com'
 * };
 * ```
 *
 * @example
 * ```typescript
 * // Using in a service
 * async requestPasswordReset(userEmail: string): Promise<void> {
 *   const body: RequestResetBody = { email: userEmail };
 *   return this.authService.requestPasswordReset(body);
 * }
 * ```
 *
 * @see {@link ResetPasswordBody} Related interface for completing the password reset
 * @see {@link ResetPasswordTokenVerifyBody} Related interface for verifying reset tokens
 */
export interface RequestResetBody {
    /**
     * The email address of the user requesting a password reset.
     *
     * This email must be associated with an existing user account. A password
     * reset token will be generated and sent to this email address, allowing
     * the user to complete the password reset process.
     */
    email: string;
}
