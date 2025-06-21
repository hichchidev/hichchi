import { IsNotEmpty } from "class-validator";
import { Dto } from "@hichchi/nest-core";
import { RefreshToken, RefreshTokenBody } from "@hichchi/nest-connector/auth";

@Dto()
export class RefreshTokenDto implements RefreshTokenBody {
    @IsNotEmpty()
    refreshToken: RefreshToken;
}
