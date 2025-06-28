import { AuthGuardCondition } from "../enums";

/**
 * Interface for configuring authentication guard behavior
 *
 * This interface defines the configuration options for authentication guards,
 * allowing fine-grained control over route protection based on authentication
 * state. Guards can check different conditions and redirect users based on
 * whether the condition is met or not.
 *
 * The interface allows you to specify what condition to check, what state
 * that condition should be in, and where to redirect if the condition is not met.
 *
 * @example
 * ```typescript
 * // Protect route for signed-in users only
 * const protectedRouteOption: AuthGuardOption = {
 *   condition: AuthGuardCondition.SIGNED_IN,
 *   state: true, // User must be signed in
 *   redirect: '/login' // Redirect to login if not signed in
 * };
 * ```
 *
 * @example
 * ```typescript
 * // Redirect signed-in users away from login page
 * const loginPageOption: AuthGuardOption = {
 *   condition: AuthGuardCondition.SIGNED_IN,
 *   state: false, // User must NOT be signed in
 *   redirect: '/dashboard' // Redirect to dashboard if already signed in
 * };
 * ```
 *
 * @example
 * ```typescript
 * // Protect route based on token presence
 * const tokenBasedOption: AuthGuardOption = {
 *   condition: AuthGuardCondition.HAS_TOKEN,
 *   state: true, // User must have a valid token
 *   redirect: '/unauthorized' // Redirect if no token
 * };
 * ```
 *
 * @example
 * ```typescript
 * // Using in route configuration
 * const routes: Routes = [
 *   {
 *     path: 'admin',
 *     component: AdminComponent,
 *     canActivate: [AuthGuard],
 *     data: {
 *       [AUTH_GUARD_OPTIONS_KEY]: {
 *         condition: AuthGuardCondition.SIGNED_IN,
 *         state: true,
 *         redirect: '/login'
 *       } as AuthGuardOption
 *     }
 *   }
 * ];
 * ```
 *
 * @see {@link AuthGuardCondition} Enum defining available authentication conditions
 * @see {@link AUTH_GUARD_OPTIONS_KEY} Constant for storing options in route data
 */
export interface AuthGuardOption {
    /** The authentication condition to check */
    condition: AuthGuardCondition;
    /** The required state of the condition (true/false) */
    state: boolean;
    /** The route to redirect to if the condition is not met */
    redirect: string;
}
