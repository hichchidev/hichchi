import { AuthStrategy } from "../enums";
import { AccessToken, RefreshToken } from "../types";

export interface UserSession {
    sessionId: string;
    accessToken: AccessToken;
    refreshToken: RefreshToken;
    socketId?: string;
    frontendUrl?: string;
    authProvider?: AuthStrategy;
    authProviderId?: string;
}
