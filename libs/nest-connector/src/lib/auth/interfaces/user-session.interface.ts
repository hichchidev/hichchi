import { AuthStrategy } from "../enums";

export interface UserSession {
    sessionId: string;
    accessToken: string;
    refreshToken: string;
    socketId?: string;
    frontendUrl?: string;
    authProvider?: AuthStrategy;
    authProviderId?: string;
}
