import { IsNotEmpty } from "class-validator";
import { AuthErrors } from "../responses";
import { toErrString } from "@hichchi/nest-core";

export class UpdatePasswordDto {
    @IsNotEmpty(toErrString(AuthErrors.AUTH_400_EMPTY_OLD_PASSWORD))
    oldPassword: string;

    @IsNotEmpty(toErrString(AuthErrors.AUTH_400_EMPTY_NEW_PASSWORD))
    newPassword: string;
}
