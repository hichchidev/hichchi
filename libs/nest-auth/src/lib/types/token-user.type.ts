import { UserSession } from "@hichchi/nest-connector/auth";
import { EntityId } from "@hichchi/nest-connector/crud";

export interface TokenUser extends UserSession {
    id: EntityId;
    firstName: string;
    lastName: string;
    fullName: string;
    email?: string;
    username?: string;
    authField?: string;
    authFieldValue?: string;
}
