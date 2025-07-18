// noinspection JSUnusedGlobalSymbols

import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { AuthState } from "../state";
import { RoleGuardOption } from "../interfaces";

/**
 * Creates a role-based authorization guard function for Angular route protection
 *
 * This function creates a route guard that protects routes based on user roles.
 * It checks if the current user's role matches the required role, and if not,
 * it evaluates the provided options to determine the appropriate action (redirect
 * or sign out).
 *
 * The guard integrates with the AuthState service to check the current user's role
 * and uses the Angular Router for navigation when redirects are needed. If no
 * matching role or redirect option is found, the user is automatically signed out.
 *
 * Key features:
 * - Role-based route protection
 * - Configurable redirect options based on user roles
 * - Automatic sign-out for unauthorized access
 * - Integration with AuthState for reactive role checking
 * - Support for multiple role-based redirect scenarios
 *
 * @param role - The required role name that the user must have to access the route
 * @param options - Array of role guard options that define redirect behavior for different user roles
 * @returns A CanActivateFn that evaluates role-based authorization and handles navigation
 *
 * @example
 * ```typescript
 * // Protecting an admin route
 * const routes: Routes = [
 *   {
 *     path: 'admin',
 *     component: AdminComponent,
 *     canActivate: [roleGuard('admin', [
 *       { state: 'user', redirect: '/dashboard' },
 *       { state: 'moderator', redirect: '/moderator-panel' }
 *     ])]
 *   }
 * ];
 * ```
 *
 * @example
 * ```typescript
 * // Protecting a moderator route with fallback redirects
 * const routes: Routes = [
 *   {
 *     path: 'moderate',
 *     component: ModeratorComponent,
 *     canActivate: [roleGuard('moderator', [
 *       { state: 'user', redirect: '/unauthorized' },
 *       { state: 'guest', redirect: '/login' }
 *     ])]
 *   }
 * ];
 * ```
 *
 * @example
 * ```typescript
 * // Simple role guard without specific redirects (will sign out unauthorized users)
 * const routes: Routes = [
 *   {
 *     path: 'super-admin',
 *     component: SuperAdminComponent,
 *     canActivate: [roleGuard('super-admin', [])]
 *   }
 * ];
 * ```
 *
 * @see {@link AuthState} Service that provides authentication and role state information
 * @see {@link RoleGuardOption} Interface for configuring role-based redirect options
 */
export function roleGuard(role: string, options: RoleGuardOption[]): CanActivateFn {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return async (_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): Promise<boolean> => {
        const router = inject(Router);
        const authState = inject(AuthState);

        if (!options.length) {
            return true;
        }

        for await (const option of options) {
            if (role === authState.roleName()) {
                return true;
            } else if (option.state === authState.roleName()) {
                const redirectPath = option.redirect.startsWith("/") ? option.redirect : `/${option.redirect}`;
                await router.navigateByUrl(redirectPath);
                return false;
            }
        }

        await authState.signOut("/auth");

        return false;
    };
}
