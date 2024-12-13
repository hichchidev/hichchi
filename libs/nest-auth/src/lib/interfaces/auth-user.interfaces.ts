import { UserSession } from "./user-session.interface";
import { IRoleEntity, IUserEntity } from "@hichchi/nest-core";
import { RegType } from "../enums";

export interface IAuthUserEntity extends IUserEntity {
    email?: string;
    username?: string;
    password?: string;
    regType: RegType;
    role?: IRoleEntity | string;
    emailVerified?: boolean;
    profileData?: object;
    avatar?: string;
}

export interface CacheUser {
    id: string | number;
    firstName: string;
    lastName: string;
    email?: string;
    username?: string;
    authField?: string;
    authFieldValue?: string;
    sessions: UserSession[];
    encryptedSessions?: string;
}
