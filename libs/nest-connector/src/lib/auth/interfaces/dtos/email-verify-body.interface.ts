import { VerifyToken } from "../../types";

export interface EmailVerifyBody {
    token: VerifyToken;
    redirectUrl?: string;
}
