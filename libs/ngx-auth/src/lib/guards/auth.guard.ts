import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { AuthState } from "../state";
import { AuthGuardOption } from "../interfaces";
import { AuthGuardCondition } from "../enums";
import { getAllAuthGuardOptions } from "../utils";
import { AUTH_GUARD_OPTIONS_KEY } from "../constants";

/**
 * Creates an authentication guard function with multiple configuration options
 *
 * This overload accepts an array of AuthGuardOption objects, allowing for complex
 * authentication rules with multiple conditions. Each option can specify different
 * conditions, states, and redirect paths.
 *
 * @param options - Array of authentication guard options to evaluate
 * @returns A CanActivateFn that can be used in Angular route guards
 *
 * @example
 * ```typescript
 * // Multiple conditions guard
 * const routes: Routes = [
 *   {
 *     path: 'admin',
 *     component: AdminComponent,
 *     canActivate: [authGuard([
 *       { condition: AuthGuardCondition.SIGNED_IN, state: true, redirect: '/login' },
 *       { condition: AuthGuardCondition.HAS_TOKEN, state: true, redirect: '/unauthorized' }
 *     ])]
 *   }
 * ];
 * ```
 *
 * @see {@link AuthGuardOption} Interface defining guard configuration options
 * @see {@link AuthGuardCondition} Enum of available authentication conditions
 */
export function authGuard(options: AuthGuardOption[]): CanActivateFn;

/**
 * Creates an authentication guard function with a single condition
 *
 * This overload provides a simplified way to create guards with a single authentication
 * condition. It's more convenient when you only need to check one condition.
 *
 * @param condition - The authentication condition to check
 * @param state - The required state of the condition (true/false)
 * @param fallbackRedirect - The path to redirect to if the condition is not met
 * @returns A CanActivateFn that can be used in Angular route guards
 *
 * @example
 * ```typescript
 * // Simple signed-in guard
 * const routes: Routes = [
 *   {
 *     path: 'profile',
 *     component: ProfileComponent,
 *     canActivate: [authGuard(AuthGuardCondition.SIGNED_IN, true, '/login')]
 *   }
 * ];
 * ```
 *
 * @example
 * ```typescript
 * // Redirect signed-in users away from login page
 * const routes: Routes = [
 *   {
 *     path: 'login',
 *     component: LoginComponent,
 *     canActivate: [authGuard(AuthGuardCondition.SIGNED_IN, false, '/dashboard')]
 *   }
 * ];
 * ```
 *
 * @see {@link AuthGuardCondition} Enum of available authentication conditions
 * @see {@link AuthGuardOption} Interface for more complex guard configurations
 */
export function authGuard(condition: AuthGuardCondition, state: boolean, fallbackRedirect: string): CanActivateFn;

/**
 * Authentication guard factory function for Angular route protection
 *
 * This function creates a route guard that protects routes based on authentication state.
 * It supports both simple single-condition guards and complex multi-condition guards.
 * The guard evaluates authentication conditions and redirects users when conditions are not met.
 *
 * The guard integrates with the AuthState service to check the current authentication status
 * and uses the Angular Router for navigation when redirects are needed. It supports checking
 * whether users are signed in, have valid tokens, and other authentication-related conditions.
 *
 * Key features:
 * - Multiple authentication condition support
 * - Automatic redirection on failed conditions
 * - Integration with AuthState for reactive authentication checks
 * - Support for both simple and complex guard configurations
 * - Type-safe condition checking
 *
 * @param param - Either a single AuthGuardCondition or an array of AuthGuardOption objects
 * @param state - Required state for single condition (ignored when using options array)
 * @param fallbackRedirect - Redirect path for single condition (ignored when using options array)
 * @returns A CanActivateFn that evaluates authentication conditions and handles navigation
 *
 * @example
 * ```typescript
 * // Protecting a route that requires authentication
 * const routes: Routes = [
 *   {
 *     path: 'dashboard',
 *     component: DashboardComponent,
 *     canActivate: [authGuard(AuthGuardCondition.SIGNED_IN, true, '/login')]
 *   }
 * ];
 * ```
 *
 * @example
 * ```typescript
 * // Complex guard with multiple conditions
 * const routes: Routes = [
 *   {
 *     path: 'admin',
 *     component: AdminComponent,
 *     canActivate: [authGuard([
 *       { condition: AuthGuardCondition.SIGNED_IN, state: true, redirect: '/login' },
 *       { condition: AuthGuardCondition.HAS_TOKEN, state: true, redirect: '/unauthorized' }
 *     ])]
 *   }
 * ];
 * ```
 *
 * @example
 * ```typescript
 * // Preventing authenticated users from accessing login page
 * const routes: Routes = [
 *   {
 *     path: 'login',
 *     component: LoginComponent,
 *     canActivate: [authGuard(AuthGuardCondition.SIGNED_IN, false, '/dashboard')]
 *   }
 * ];
 * ```
 *
 * @see {@link AuthState} Service that provides authentication state information
 * @see {@link AuthGuardOption} Interface for configuring guard options
 * @see {@link AuthGuardCondition} Enum defining available authentication conditions
 * @see {@link getAllAuthGuardOptions} Utility function for extracting guard options from routes
 * @see {@link AUTH_GUARD_OPTIONS_KEY} Constant for storing guard options in route data
 */
export function authGuard(
    param: AuthGuardCondition | AuthGuardOption[],
    state?: boolean,
    fallbackRedirect?: string,
): CanActivateFn {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return async (route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): Promise<boolean> => {
        const router = inject(Router);
        const authState = inject(AuthState);

        route.data = {
            ...route.data,
            [AUTH_GUARD_OPTIONS_KEY]: Array.isArray(param)
                ? param
                : [{ condition: param, state: state!, redirect: fallbackRedirect! }],
        };

        const conditionCheckers = {
            [AuthGuardCondition.SIGNED_IN]: authState.signedIn,
            [AuthGuardCondition.HAS_TOKEN]: authState.hasAccessToken,
        };

        const authGuardOptions = getAllAuthGuardOptions(route);

        if (!authGuardOptions.length) {
            return true;
        }

        const conditionsMet = authGuardOptions.every(option => {
            return option.state === conditionCheckers[option.condition]();
        });

        if (!conditionsMet) {
            const option = authGuardOptions.pop()!;
            const redirectPath = option.redirect.startsWith("/") ? option.redirect : `/${option.redirect}`;
            await router.navigateByUrl(redirectPath);
            return false;
        }

        return true;
    };
}
