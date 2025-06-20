// noinspection JSUnusedGlobalSymbols

import { RegType, User } from "@hichchi/nest-connector/auth";
import { EntityId } from "@hichchi/nest-connector/crud";

export class BaseUserEntity implements User {
    regType: RegType;

    id: EntityId;

    firstName: string;

    lastName: string;

    fullName: string;

    username?: string;

    email?: string;

    password: string;

    salt: string;

    role?: string;

    emailVerified?: boolean;

    avatar?: string;

    profileData?: object;
}
