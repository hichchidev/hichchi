import { Request } from "express";
import { SUBDOMAIN_KEY } from "../tokens";

export interface RequestWithSubdomain extends Request {
    [SUBDOMAIN_KEY]?: string;
}
