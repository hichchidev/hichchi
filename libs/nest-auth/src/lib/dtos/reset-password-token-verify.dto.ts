import { IsNotEmpty } from "class-validator";
import { toErrString } from "@hichchi/nest-core";
import { ResetPasswordTokenVerifyBody } from "@hichchi/nest-connector/auth";
import { AuthErrors } from "../responses";

export class ResetPasswordTokenVerifyDto implements ResetPasswordTokenVerifyBody {
    @IsNotEmpty(toErrString(AuthErrors.AUTH_400_EMPTY_TOKEN))
    token: string;
}
