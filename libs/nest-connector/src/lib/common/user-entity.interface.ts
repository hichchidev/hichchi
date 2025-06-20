// noinspection JSUnusedGlobalSymbols

import { EntityId } from "../crud";

export interface User {
    id: EntityId;
    firstName: string;
    lastName: string;
    fullName: string;
}
