import { UserSession } from "@hichchi/nest-connector/auth";
import { EntityId } from "@hichchi/nest-connector/crud";

export interface CacheUser {
    id: EntityId;
    firstName: string;
    lastName: string;
    email?: string;
    username?: string;
    authField?: string;
    authFieldValue?: string;
    sessions: UserSession[];
    encryptedSessions?: string;
}
