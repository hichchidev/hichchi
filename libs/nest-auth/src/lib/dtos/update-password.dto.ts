import { IsNotEmpty } from "class-validator";
import { Dto } from "@hichchi/nest-core";
import { UpdatePasswordBody } from "@hichchi/nest-connector/auth";

@Dto()
export class UpdatePasswordDto implements UpdatePasswordBody {
    @IsNotEmpty()
    oldPassword: string;

    @IsNotEmpty()
    newPassword: string;
}
