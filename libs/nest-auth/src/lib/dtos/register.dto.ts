import { IsNotEmpty, ValidateIf } from "class-validator";
import { IRegisterDto } from "../interfaces";
import { Dto } from "@hichchi/nest-core";

@Dto("Auth")
export class RegisterDto implements IRegisterDto {
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
