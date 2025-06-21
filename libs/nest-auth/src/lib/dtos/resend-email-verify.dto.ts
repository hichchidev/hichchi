import { IsNotEmpty } from "class-validator";
import { Dto } from "@hichchi/nest-core";
import { ResendEmailVerifyBody } from "@hichchi/nest-connector/auth";

@Dto()
export class ResendEmailVerifyDto implements ResendEmailVerifyBody {
    @IsNotEmpty()
    email: string;
}
