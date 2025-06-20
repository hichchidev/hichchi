import { IsNotEmpty, IsOptional } from "class-validator";
import { Dto } from "@hichchi/nest-core";
import { RegisterBody } from "@hichchi/nest-connector/auth";

@Dto("User")
export class RegisterUserDto implements RegisterBody {
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
