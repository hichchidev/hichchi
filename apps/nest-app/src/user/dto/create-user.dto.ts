import { IsEmail, IsNotEmpty } from "class-validator";
import { HichchiDto } from "@hichchi/nest-crud";
import { UserEntity } from "../entities";

@HichchiDto(UserEntity)
export class CreateUserDto {
    @IsNotEmpty()
    firstName: string;

    @IsNotEmpty()
    lastName: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;
}
