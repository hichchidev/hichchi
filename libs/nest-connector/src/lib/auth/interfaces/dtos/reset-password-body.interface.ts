import { VerifyToken } from "../../types";

export interface ResetPasswordBody {
    token: VerifyToken;

    password: string;
}
