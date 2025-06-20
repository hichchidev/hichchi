import { IsNotEmpty } from "class-validator";
import { toErrString } from "@hichchi/nest-core";
import { UpdatePasswordBody } from "@hichchi/nest-connector/auth";
import { AuthErrors } from "../responses";

export class UpdatePasswordDto implements UpdatePasswordBody {
    @IsNotEmpty(toErrString(AuthErrors.AUTH_400_EMPTY_OLD_PASSWORD))
    oldPassword: string;

    @IsNotEmpty(toErrString(AuthErrors.AUTH_400_EMPTY_NEW_PASSWORD))
    newPassword: string;
}
