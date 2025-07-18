export interface RoleGuardOption {
    /** The required state of the role */
    state?: string;
    /** The route to redirect to if the role exist */
    redirect: string;
}
