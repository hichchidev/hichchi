import { IsNotEmpty } from "class-validator";
import { Dto } from "@hichchi/nest-core";
import { ResetPasswordBody, VerifyToken } from "@hichchi/nest-connector/auth";

@Dto()
export class ResetPasswordDto implements ResetPasswordBody {
    @IsNotEmpty()
    token: VerifyToken;

    @IsNotEmpty()
    password: string;
}
