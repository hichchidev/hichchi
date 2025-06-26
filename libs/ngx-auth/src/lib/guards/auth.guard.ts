import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { AuthState } from "../state";
import { RouteCondition } from "../enums";
import { RouteOption } from "../interfaces";

export function authGuard(options: RouteOption[]): CanActivateFn;

export function authGuard(condition: RouteCondition, state: boolean, redirect: string): CanActivateFn;

export function authGuard(param: RouteCondition | RouteOption[], state?: boolean, redirect?: string): CanActivateFn {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return async (_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): Promise<boolean> => {
        const router = inject(Router);
        const authState = inject(AuthState);

        const conditionCheckers = {
            [RouteCondition.SIGNED_IN]: authState.signedIn,
            [RouteCondition.HAS_TOKEN]: authState.hasAccessToken,
        };

        const routeOptions = Array.isArray(param) ? param : [{ condition: param, state: state!, redirect: redirect! }];

        if (!routeOptions.length) {
            return true;
        }

        const conditionsMet = routeOptions.every(option => {
            return option.state === conditionCheckers[option.condition]();
        });

        if (!conditionsMet) {
            const option = routeOptions.pop()!;
            const redirectPath = option.redirect.startsWith("/") ? option.redirect : `/${option.redirect}`;
            await router.navigateByUrl(redirectPath);
            return false;
        }

        return true;
    };
}
