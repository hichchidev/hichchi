import { UserSession } from "@hichchi/nest-connector/auth";

export interface TokenUser extends UserSession {
    id: string | number;
    firstName: string;
    lastName: string;
    fullName: string;
    email?: string;
    username?: string;
    authField?: string;
    authFieldValue?: string;
}
