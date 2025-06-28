/**
 * Interface defining the body structure for resending email verification requests.
 *
 * This interface specifies the required properties for requesting a new email
 * verification token to be sent to a user's email address. This is useful when
 * the original verification email was not received, expired, or was accidentally
 * deleted by the user.
 *
 * The system will generate a new verification token and send it to the specified
 * email address, allowing the user to complete the email verification process.
 *
 * @example
 * ```typescript
 * // Resend email verification
 * const resendRequest: ResendEmailVerifyBody = {
 *   email: 'user@example.com'
 * };
 * ```
 *
 * @example
 * ```typescript
 * // Using in a service
 * async resendVerificationEmail(userEmail: string): Promise<void> {
 *   const body: ResendEmailVerifyBody = { email: userEmail };
 *   return this.authService.resendEmailVerification(body);
 * }
 * ```
 *
 * @see {@link EmailVerifyBody} Related interface for completing email verification
 */
export interface ResendEmailVerifyBody {
    /**
     * The email address to send the verification token to.
     *
     * This email must be associated with an existing user account that has not
     * yet been verified. A new verification token will be generated and sent
     * to this email address, replacing any previously issued tokens.
     */
    email: string;
}
