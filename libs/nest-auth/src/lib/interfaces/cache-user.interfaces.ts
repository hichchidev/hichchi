import { UserSession } from "@hichchi/nest-connector/auth";

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
