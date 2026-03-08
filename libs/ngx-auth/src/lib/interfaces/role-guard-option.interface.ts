export interface RoleGuardOption<T = string> {
    /** Role name that should be redirected when the required role check fails */
    state?: T;
    /** Route path to navigate to when `state` matches the current role */
    redirect: string;
}
