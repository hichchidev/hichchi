import { IsNotEmpty } from "class-validator";
import { toErrString } from "@hichchi/nest-core";
import { EmailVerifyBody } from "@hichchi/nest-connector/auth";
import { AuthErrors } from "../responses";

export class EmailVerifyDto implements EmailVerifyBody {
    @IsNotEmpty(toErrString(AuthErrors.AUTH_400_EMPTY_TOKEN))
    token: string;
}
