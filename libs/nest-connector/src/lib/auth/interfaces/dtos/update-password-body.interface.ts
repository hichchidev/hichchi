/**
 * Interface defining the body structure for password update requests.
 *
 * This interface specifies the required properties for updating a user's password
 * when they are already authenticated and know their current password. This is
 * different from password reset, which is used when a user has forgotten their
 * password and needs to reset it via email verification.
 *
 * The old password is required for security verification to ensure that only
 * the legitimate user can change their password. This prevents unauthorized
 * password changes if someone gains access to an authenticated session.
 *
 * @example
 * ```typescript
 * // Update user password
 * const updatePassword: UpdatePasswordBody = {
 *   oldPassword: 'currentPassword123',
 *   newPassword: 'newSecurePassword456'
 * };
 * ```
 *
 * @example
 * ```typescript
 * // Using in a service
 * async changeUserPassword(oldPass: string, newPass: string): Promise<void> {
 *   const body: UpdatePasswordBody = {
 *     oldPassword: oldPass,
 *     newPassword: newPass
 *   };
 *   return this.authService.updatePassword(body);
 * }
 * ```
 *
 * @see {@link ResetPasswordBody} Related interface for password reset (when password is forgotten)
 */
export interface UpdatePasswordBody {
    /**
     * The user's current password for verification.
     *
     * This field is required to verify that the request is coming from the
     * legitimate user. The current password will be validated against the
     * stored hash before allowing the password change to proceed.
     */
    oldPassword: string;

    /**
     * The new password to set for the user account.
     *
     * This should be the user's new plaintext password, which will be securely
     * hashed before storage. The password should meet the application's
     * complexity requirements for security.
     */
    newPassword: string;
}
