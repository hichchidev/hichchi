import { AuthField } from "@hichchi/nest-connector/auth";

export interface AuthConfig {
    authField?: AuthField;
    apiBaseURL: string;
}
