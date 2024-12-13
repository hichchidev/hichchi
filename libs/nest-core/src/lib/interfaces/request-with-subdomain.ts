import { Request } from "express";

export interface RequestWithSubdomain extends Request {
    subdomain?: string;
}
