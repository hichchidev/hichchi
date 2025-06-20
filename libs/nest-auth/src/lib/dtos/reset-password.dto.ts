import { IsNotEmpty } from "class-validator";
import { toErrString } from "@hichchi/nest-core";
import { ResetPasswordBody } from "@hichchi/nest-connector/auth";
import { AuthErrors } from "../responses";

export class ResetPasswordDto implements ResetPasswordBody {
    @IsNotEmpty(toErrString(AuthErrors.AUTH_400_EMPTY_TOKEN))
    token: string;

    @IsNotEmpty(toErrString(AuthErrors.AUTH_400_EMPTY_PASSWORD))
    password: string;
}
