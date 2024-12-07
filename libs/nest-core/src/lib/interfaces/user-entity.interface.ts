// noinspection JSUnusedGlobalSymbols

import { IRoleEntity } from "./role-entity.interface";

export interface IByUser {
    id: string | number;
    firstName: string;
    lastName: string;
    email?: string;
    username?: string;
}

export interface IUserEntity extends IByUser {
    fullName: string;
    email?: string;
    password?: string;
    emailVerified?: boolean;
    avatar?: string;
    profileData?: object;
    salt?: string;
    role?: IRoleEntity | string;
}
