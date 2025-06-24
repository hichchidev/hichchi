import { IsNotEmpty, ValidateIf } from "class-validator";
import { Dto } from "@hichchi/nest-core";
import { SignUpBody } from "@hichchi/nest-connector/auth";

/**
 * Data Transfer Object for user sign up.
 * This class is used to encapsulate the required user information
 * for creating a new user account in the system.
 *
 * Implements the {@link SignUpBody} interface.
 */
@Dto()
export class SignUpDto implements SignUpBody {
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
