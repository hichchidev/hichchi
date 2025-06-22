import { IsNotEmpty, IsString, ValidateIf } from "class-validator";
import { SignInBody } from "@hichchi/nest-connector/auth";
import { Dto } from "@hichchi/nest-core";

@Dto()
export class LoginDto implements SignInBody {
    @IsNotEmpty()
    @ValidateIf(({ email }) => !email)
    username?: string;

    @IsNotEmpty()
    @ValidateIf(({ username }) => !username)
    email?: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}
