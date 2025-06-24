import { IsEmail, IsNotEmpty } from "class-validator";
import { Dto } from "@hichchi/nest-core";

@Dto()
export class CreateUserDto {
    @IsNotEmpty()
    firstName: string;

    @IsNotEmpty()
    lastName: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;
}
