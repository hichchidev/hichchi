import { VerifyToken } from "../../types";

/**
 * Interface defining the body structure for password reset token verification requests.
 *
 * This interface specifies the required properties for verifying a password reset
 * token before allowing the user to proceed with setting a new password. This is
 * an intermediate step in the password reset flow that validates the token without
 * actually changing the password.
 *
 * This verification step is useful for providing user feedback about token validity
 * before they enter their new password, improving the user experience by catching
 * invalid or expired tokens early in the process.
 *
 * @example
 * ```typescript
 * // Verify password reset token
 * const verifyToken: ResetPasswordTokenVerifyBody = {
 *   token: 'a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6'
 * };
 * ```
 *
 * @example
 * ```typescript
 * // Using in a service
 * async verifyResetToken(resetToken: VerifyToken): Promise<boolean> {
 *   const body: ResetPasswordTokenVerifyBody = { token: resetToken };
 *   return this.authService.verifyPasswordResetToken(body);
 * }
 * ```
 *
 * @see {@link ResetPasswordBody} Related interface for completing the password reset
 * @see {@link RequestResetBody} Related interface for initiating password reset
 * @see {@link VerifyToken} Type representing verification token strings
 */
export interface ResetPasswordTokenVerifyBody {
    /**
     * The password reset verification token to validate.
     *
     * This token is generated when a user requests a password reset and is sent
     * to their registered email address. This endpoint verifies that the token
     * is valid and not expired without actually performing the password reset.
     */
    token: VerifyToken;
}
