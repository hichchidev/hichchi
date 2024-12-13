import { IsEmail, IsNotEmpty } from "class-validator";
import { EntityDto } from "@hichchi/nest-crud";
import { UserEntity } from "../entities";

@EntityDto(UserEntity)
export class CreateUserDto {
    @IsNotEmpty()
    firstName: string;

    @IsNotEmpty()
    lastName: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;
}
