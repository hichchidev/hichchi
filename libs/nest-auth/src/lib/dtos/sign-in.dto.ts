import { IsNotEmpty, IsString, ValidateIf } from "class-validator";
import { SignInBody } from "@hichchi/nest-connector/auth";
import { Dto } from "@hichchi/nest-core";

/**
 * Data Transfer Object for user sign-in authentication.
 * This class is used to encapsulate the credentials needed for authenticating a user
 * via username/email and password combination.
 *
 * Implements the {@link SignInBody} interface.
 */
@Dto()
export class SignInDto implements SignInBody {
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
