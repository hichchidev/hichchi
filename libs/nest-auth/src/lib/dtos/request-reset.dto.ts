import { IsNotEmpty } from "class-validator";
import { toErrString } from "@hichchi/nest-core";
import { RequestResetBody } from "@hichchi/nest-connector/auth";
import { AuthErrors } from "../responses";

export class RequestResetDto implements RequestResetBody {
    @IsNotEmpty(toErrString(AuthErrors.AUTH_400_EMPTY_EMAIL))
    email: string;
}
