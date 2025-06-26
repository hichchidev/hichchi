import { RouteCondition } from "../enums";

export interface RouteOption {
    condition: RouteCondition;
    state: boolean;
    redirect: string;
}
