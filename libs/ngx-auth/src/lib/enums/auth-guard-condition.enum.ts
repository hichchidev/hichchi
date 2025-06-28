/**
 * Enumeration of authentication guard conditions
 *
 * This enum defines the different conditions that authentication guards can check
 * to determine whether a user should be allowed to access a route. Each condition
 * represents a different aspect of the user's authentication state.
 *
 * These conditions are used in conjunction with AuthGuardOption to create
 * flexible route protection rules that can handle various authentication scenarios.
 *
 * @example
 * ```typescript
 * // Check if user is signed in
 * const guardOption: AuthGuardOption = {
 *   condition: AuthGuardCondition.SIGNED_IN,
 *   state: true,
 *   redirect: '/login'
 * };
 * ```
 *
 * @example
 * ```typescript
 * // Check if user has a valid token
 * const tokenGuardOption: AuthGuardOption = {
 *   condition: AuthGuardCondition.HAS_TOKEN,
 *   state: true,
 *   redirect: '/unauthorized'
 * };
 * ```
 *
 * @see {@link AuthGuardOption} Interface that uses these conditions
 */
export enum AuthGuardCondition {
    /** Check if the user is signed in to the application */
    SIGNED_IN = "signed-in",
    /** Check if the user has a valid access token */
    HAS_TOKEN = "has-token",
}
