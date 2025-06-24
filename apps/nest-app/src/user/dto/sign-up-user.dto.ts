import { IsNotEmpty, IsOptional } from "class-validator";
import { Dto } from "@hichchi/nest-core";
import { SignUpBody } from "@hichchi/nest-connector/auth";

@Dto("User")
export class SignUpUserDto implements SignUpBody {
    @IsNotEmpty()
    firstName: string;

    @IsOptional()
    lastName: string;

    @IsNotEmpty()
    email?: string;

    @IsNotEmpty()
    password: string;
}
