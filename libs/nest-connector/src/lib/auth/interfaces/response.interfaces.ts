import { TokenResponse } from "./token-response.interface";
import { UserSession } from "./user-session.interface";
import { User } from "./user.interface";

export interface AuthResponse extends TokenResponse, Omit<UserSession, "socketId" | "frontendUrl" | "authProviderId"> {
    user: User;
}
