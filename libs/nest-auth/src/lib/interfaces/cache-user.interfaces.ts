import { User, UserSession } from "@hichchi/nest-connector/auth";
import { UserExtra } from "./user-extra.interfaces";

export interface CacheUser extends User, UserExtra {
    sessions: UserSession[];
    encryptedSessions?: string;
}
