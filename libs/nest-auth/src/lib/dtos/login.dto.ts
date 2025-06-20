import { IsNotEmpty, IsString, ValidateIf } from "class-validator";
import { LoginBody } from "@hichchi/nest-connector/auth";

export class LoginDto implements LoginBody {
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
