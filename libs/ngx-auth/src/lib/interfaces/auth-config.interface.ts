import { AuthField, TenantSlug } from "@hichchi/nest-connector/auth";

export interface AuthConfig {
    authField?: AuthField;
    apiBaseURL: string;
    splitDomain?: string;
    tenant?: TenantSlug;
}
