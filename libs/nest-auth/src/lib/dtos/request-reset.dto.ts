import { IsNotEmpty } from "class-validator";
import { Dto } from "@hichchi/nest-core";
import { RequestResetBody } from "@hichchi/nest-connector/auth";

@Dto()
export class RequestResetDto implements RequestResetBody {
    @IsNotEmpty()
    email: string;
}
