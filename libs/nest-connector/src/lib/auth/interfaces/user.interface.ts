import { UserInfo as BaseUser } from "../../common";
import { Role } from "./role.interface";
import { RegType } from "../enums";

export interface User extends BaseUser {
    email?: string;
    username?: string;
    password?: string;
    regType: RegType;
    role?: Role | string;
    emailVerified?: boolean;
    profileData?: object;
    avatar?: string;
}
