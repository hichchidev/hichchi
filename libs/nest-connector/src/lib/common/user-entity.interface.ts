// noinspection JSUnusedGlobalSymbols

import { EntityId } from "../crud";

export interface UserInfo {
    id: EntityId;
    firstName: string;
    lastName: string;
    fullName: string;
}
