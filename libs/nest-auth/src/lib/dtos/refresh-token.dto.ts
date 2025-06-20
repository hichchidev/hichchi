import { IsNotEmpty } from "class-validator";
import { toErrString } from "@hichchi/nest-core";
import { RefreshTokenBody } from "@hichchi/nest-connector/auth";
import { AuthErrors } from "../responses";

export class RefreshTokenDto implements RefreshTokenBody {
    @IsNotEmpty(toErrString(AuthErrors.AUTH_400_EMPTY_REFRESH_TOKEN))
    refreshToken: string;
}
