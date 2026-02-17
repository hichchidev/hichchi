import { ParsedQs } from "qs";
import { TenantSlug } from "@hichchi/nest-connector/auth";

export interface GoogleAuthState {
    redirectUrl: string;
    tenant: TenantSlug;
}

export interface GoogleAuthRequestQuery extends GoogleAuthState {
    state: GoogleAuthState;
}

export interface GoogleAuthGuardQuery extends ParsedQs {
    state: string;
}
