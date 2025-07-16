import { VerifyToken } from "../../types";

/**
 * Interface defining the body structure for completing password reset requests.
 *
 * This interface specifies the required properties for completing a password
 * reset process using a verification token. This is the second step in the
 * password recovery flow, where the user provides the token they received
 * via email along with their new password.
 *
 * The token must be valid and not expired for the password reset to succeed.
 * Once completed, the user's password will be updated and they can sign in
 * with their new credentials.
 *
 * @example
 * ```typescript
 * // Complete password reset
 * const resetPassword: ResetPasswordBody = {
 *   token: 'a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6',
 *   password: 'newSecurePassword123'
 * };
 * ```
 *
 * @example
 * ```typescript
 * // Using in a service
 * async resetUserPassword(token: VerifyToken, newPassword: string): Promise<void> {
 *   const body: ResetPasswordBody = { token, password: newPassword };
 *   return this.authService.resetPassword(body);
 * }
 * ```
 *
 * @see {@link RequestResetBody} Related interface for initiating password reset
 * @see {@link ResetPasswordTokenVerifyBody} Related interface for verifying reset tokens
 * @see {@link VerifyToken} Type representing verification token strings
 */
export interface ResetPasswordBody {
    /**
     * The password reset verification token received via email.
     *
     * This token is generated when a user requests a password reset and is sent
     * to their registered email address. It must be valid and not expired for
     * the password reset to succeed.
     */
    token: VerifyToken;

    /**
     * The new password to set for the user account.
     *
     * This should be the user's new plaintext password, which will be securely
     * hashed before storage. The password should meet the application's
     * complexity requirements for security.
     */
    password: string;
}
