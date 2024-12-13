import { IsNotEmpty } from "class-validator";
import { toErrString } from "@hichchi/nest-core";
import { AuthErrors } from "../responses";

export class ResendEmailVerifyDto {
    @IsNotEmpty(toErrString(AuthErrors.AUTH_400_EMPTY_EMAIL))
    email: string;
}
