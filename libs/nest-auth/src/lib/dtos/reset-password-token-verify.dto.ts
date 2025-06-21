import { IsNotEmpty } from "class-validator";
import { Dto } from "@hichchi/nest-core";
import { ResetPasswordTokenVerifyBody, VerifyToken } from "@hichchi/nest-connector/auth";

@Dto()
export class ResetPasswordTokenVerifyDto implements ResetPasswordTokenVerifyBody {
    @IsNotEmpty()
    token: VerifyToken;
}
