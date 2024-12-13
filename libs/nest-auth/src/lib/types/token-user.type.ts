import { UserSession } from "../interfaces";

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
