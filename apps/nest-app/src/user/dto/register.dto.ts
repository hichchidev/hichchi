import { IRegisterDto } from "@hichchi/nest-auth";
import { IsNotEmpty, IsOptional } from "class-validator";
import { Dto } from "@hichchi/nest-core";

@Dto("User")
export class RegisterUserDto implements IRegisterDto {
    @IsNotEmpty()
    firstName: string;

    @IsOptional()
    lastName: string;

    @IsNotEmpty()
    username?: string;

    @IsNotEmpty()
    email?: string;

    @IsNotEmpty()
    password: string;
}
