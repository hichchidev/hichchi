import { ActivatedRouteSnapshot } from "@angular/router";
import { AuthGuardOption } from "../interfaces";
import { AUTH_GUARD_OPTIONS_KEY } from "../constants";

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
