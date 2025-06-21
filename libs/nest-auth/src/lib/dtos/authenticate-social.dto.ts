import { IsNotEmpty } from "class-validator";
import { AccessToken } from "@hichchi/nest-connector/auth";

export class AuthenticateSocialDto {
    @IsNotEmpty()
    accessToken: AccessToken;
}
