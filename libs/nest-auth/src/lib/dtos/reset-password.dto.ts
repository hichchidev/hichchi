import { IsNotEmpty } from "class-validator";
import { AuthErrors } from "../responses";
import { toErrString } from "@hichchi/nest-core";

export class ResetPasswordDto {
    @IsNotEmpty(toErrString(AuthErrors.AUTH_400_EMPTY_TOKEN))
    token: string;

    @IsNotEmpty(toErrString(AuthErrors.AUTH_400_EMPTY_PASSWORD))
    password: string;
}
