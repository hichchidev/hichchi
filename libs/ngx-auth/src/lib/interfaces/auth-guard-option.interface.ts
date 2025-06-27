import { AuthGuardCondition } from "../enums";

export interface AuthGuardOption {
    condition: AuthGuardCondition;
    state: boolean;
    redirect: string;
}
