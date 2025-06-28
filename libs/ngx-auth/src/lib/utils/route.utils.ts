import { ActivatedRouteSnapshot } from "@angular/router";
import { AuthGuardOption } from "../interfaces";
import { AUTH_GUARD_OPTIONS_KEY } from "../constants";

/**
 * Retrieves all authentication guard options from a route and its parent routes
 *
 * This utility function extracts authentication guard options from the current route
 * and recursively collects options from parent routes in the route hierarchy. It handles
 * the inheritance and merging of guard options, ensuring that parent route guards are
 * applied alongside child route guards.
 *
 * The function implements a hierarchical guard system where:
 * - Child route options take precedence over parent options for the same condition
 * - Parent options are inherited when no conflicting child option exists
 * - Options are collected recursively up the route tree
 * - The final array contains all applicable guard options for the route
 *
 * This enables complex authentication scenarios where different route levels can
 * specify different authentication requirements, with child routes able to override
 * or supplement parent route authentication rules.
 *
 * @param currentRoute - The activated route snapshot to extract guard options from
 * @returns Array of authentication guard options applicable to the route
 *
 * @example
 * ```typescript
 * // Route configuration with nested guards
 * const routes: Routes = [
 *   {
 *     path: 'admin',
 *     component: AdminLayoutComponent,
 *     canActivate: [authGuard(AuthGuardCondition.SIGNED_IN, true, '/login')],
 *     children: [
 *       {
 *         path: 'users',
 *         component: UsersComponent,
 *         canActivate: [authGuard(AuthGuardCondition.HAS_TOKEN, true, '/unauthorized')]
 *       }
 *     ]
 *   }
 * ];
 *
 * // In the guard, get all applicable options
 * const allOptions = getAllAuthGuardOptions(route);
 * // Result: [
 * //   { condition: 'signed-in', state: true, redirect: '/login' },
 * //   { condition: 'has-token', state: true, redirect: '/unauthorized' }
 * // ]
 * ```
 *
 * @example
 * ```typescript
 * // Using in a custom guard implementation
 * export const customAuthGuard: CanActivateFn = (route, state) => {
 *   const authState = inject(AuthState);
 *   const router = inject(Router);
 *
 *   const guardOptions = getAllAuthGuardOptions(route);
 *
 *   for (const option of guardOptions) {
 *     const conditionMet = checkAuthCondition(option.condition, authState);
 *     if (option.state !== conditionMet) {
 *       router.navigateByUrl(option.redirect);
 *       return false;
 *     }
 *   }
 *
 *   return true;
 * };
 * ```
 *
 * @example
 * ```typescript
 * // Route hierarchy with inherited guards
 * const routes: Routes = [
 *   {
 *     path: 'app',
 *     data: { [AUTH_GUARD_OPTIONS_KEY]: [
 *       { condition: AuthGuardCondition.SIGNED_IN, state: true, redirect: '/login' }
 *     ]},
 *     children: [
 *       {
 *         path: 'profile',
 *         component: ProfileComponent,
 *         data: { [AUTH_GUARD_OPTIONS_KEY]: [
 *           { condition: AuthGuardCondition.HAS_TOKEN, state: true, redirect: '/expired' }
 *         ]}
 *       }
 *     ]
 *   }
 * ];
 *
 * // When accessing /app/profile, both parent and child guards apply
 * ```
 *
 * @see {@link AuthGuardOption} Interface defining the structure of guard options
 * @see {@link AUTH_GUARD_OPTIONS_KEY} Constant for the route data key
 * @see {@link authGuard} Function that uses this utility to process guard options
 * @see {@link ActivatedRouteSnapshot} Angular router interface for route snapshots
 */
export const getAllAuthGuardOptions = (currentRoute: ActivatedRouteSnapshot): AuthGuardOption[] => {
    const options: AuthGuardOption[] = currentRoute.data?.[AUTH_GUARD_OPTIONS_KEY] || [];

    if (!currentRoute.parent?.data?.[AUTH_GUARD_OPTIONS_KEY]) {
        return options;
    }

    const parentOptions = getAllAuthGuardOptions(currentRoute.parent);
    for (const parentOption of parentOptions) {
        const currentConditionIndex = options.findIndex(option => option.condition === parentOption.condition);
        if (currentConditionIndex !== -1) {
            // options[currentConditionIndex] = parentOption;
        } else {
            options.unshift(parentOption);
        }
    }
    return options;
};
