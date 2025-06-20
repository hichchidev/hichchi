import { IsNotEmpty } from "class-validator";
import { toErrString } from "@hichchi/nest-core";
import { ResendEmailVerifyBody } from "@hichchi/nest-connector/auth";
import { AuthErrors } from "../responses";

export class ResendEmailVerifyDto implements ResendEmailVerifyBody {
    @IsNotEmpty(toErrString(AuthErrors.AUTH_400_EMPTY_EMAIL))
    email: string;
}
