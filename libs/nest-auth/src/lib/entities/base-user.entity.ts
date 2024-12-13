// noinspection JSUnusedGlobalSymbols

import { RegType } from "../enums";
import { IAuthUserEntity } from "../interfaces";

export class BaseUserEntity implements IAuthUserEntity {
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
