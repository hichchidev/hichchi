import { IsNotEmpty } from "class-validator";
import { toErrString } from "@hichchi/nest-core";
import { AuthErrors } from "../responses";

export class RefreshTokenDto {
    @IsNotEmpty(toErrString(AuthErrors.AUTH_400_EMPTY_REFRESH_TOKEN))
    refreshToken: string;
}
