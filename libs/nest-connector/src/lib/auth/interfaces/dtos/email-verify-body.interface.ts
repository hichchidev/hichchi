import { VerifyToken } from "../../types";

/**
 * Interface defining the body structure for email verification requests.
 *
 * This interface specifies the required and optional properties for verifying
 * a user's email address using a verification token. Email verification is a
 * critical security measure to confirm user identity and prevent account abuse.
 *
 * The verification process typically involves sending a token to the user's email
 * address, which they then submit back to the system to confirm ownership of
 * the email account.
 *
 * @example
 * ```typescript
 * // Basic email verification
 * const verifyRequest: EmailVerifyBody = {
 *   token: 'a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6'
 * };
 * ```
 *
 * @example
 * ```typescript
 * // Email verification with redirect URL
 * const verifyWithRedirect: EmailVerifyBody = {
 *   token: 'a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6',
 *   redirectUrl: 'https://myapp.com/dashboard'
 * };
 * ```
 *
 * @example
 * ```typescript
 * // Using in a service
 * async verifyUserEmail(token: VerifyToken, redirectUrl?: string): Promise<void> {
 *   const body: EmailVerifyBody = { token, redirectUrl };
 *   return this.authService.verifyEmail(body);
 * }
 * ```
 *
 * @see {@link VerifyToken} Type representing verification token strings
 * @see {@link ResendEmailVerifyBody} Related interface for resending verification emails
 */
export interface EmailVerifyBody {
    /**
     * The verification token sent to the user's email address.
     *
     * This token is generated when a user registers or requests email verification
     * and is sent to their email address. It must be submitted to complete the
     * verification process and confirm ownership of the email account.
     */
    token: VerifyToken;

    /**
     * Optional URL to redirect the user to after successful verification.
     *
     * When provided, the user will be redirected to this URL after their email
     * is successfully verified. This is useful for directing users to a specific
     * page in the application, such as a welcome page or dashboard.
     */
    redirectUrl?: string;
}
