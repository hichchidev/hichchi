// noinspection JSUnusedGlobalSymbols

import { RegType, User } from "@hichchi/nest-connector/auth";

export class BaseUserEntity implements User {
    regType: RegType;

    id: string | number;

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
