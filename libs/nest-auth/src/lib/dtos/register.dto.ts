import { IsNotEmpty, ValidateIf } from "class-validator";
import { Dto } from "@hichchi/nest-core";
import { RegisterBody } from "@hichchi/nest-connector/auth";

@Dto("Auth")
export class RegisterDto implements RegisterBody {
    @IsNotEmpty()
    firstName: string;

    @IsNotEmpty()
    lastName: string;

    @IsNotEmpty()
    @ValidateIf(({ email }) => !email)
    username?: string;

    @IsNotEmpty()
    @ValidateIf(({ username }) => !username)
    email?: string;

    @IsNotEmpty()
    password: string;
}
