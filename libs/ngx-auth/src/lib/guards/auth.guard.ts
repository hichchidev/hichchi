import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { AuthState } from "../state";
import { AuthGuardOption } from "../interfaces";
import { AuthGuardCondition } from "../enums";
import { getAllAuthGuardOptions } from "../utils";
import { AUTH_GUARD_OPTIONS_KEY } from "../constants";

export function authGuard(options: AuthGuardOption[]): CanActivateFn;

export function authGuard(condition: AuthGuardCondition, state: boolean, redirect: string): CanActivateFn;

export function authGuard(
    param: AuthGuardCondition | AuthGuardOption[],
    state?: boolean,
    redirect?: string,
): CanActivateFn {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return async (route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): Promise<boolean> => {
        const router = inject(Router);
        const authState = inject(AuthState);

        route.data = {
            ...route.data,
            [AUTH_GUARD_OPTIONS_KEY]: Array.isArray(param)
                ? param
                : [{ condition: param, state: state!, redirect: redirect! }],
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
