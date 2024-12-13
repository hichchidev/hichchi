import { TokenResponse } from "./token-response.interface";
import { UserSession } from "./user-session.interface";
import { IAuthUserEntity } from "./auth-user.interfaces";

// noinspection JSUnusedGlobalSymbols
export interface AuthResponse extends TokenResponse, Omit<UserSession, "socketId" | "frontendUrl" | "authProviderId"> {
    user: IAuthUserEntity;
}
