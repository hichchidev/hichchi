import { IsNotEmpty } from "class-validator";
import { Dto } from "@hichchi/nest-core";
import { EmailVerifyBody, VerifyToken } from "@hichchi/nest-connector/auth";

@Dto()
export class EmailVerifyDto implements EmailVerifyBody {
    @IsNotEmpty()
    token: VerifyToken;
}
