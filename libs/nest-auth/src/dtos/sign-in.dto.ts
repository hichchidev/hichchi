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
    /**
     * The user's username for authentication.
     *
     * This field is required if email is not provided.
     * Either username or email must be provided for authentication.
     */
    @IsNotEmpty()
    @ValidateIf(({ email }) => !email)
    username?: string;

    /**
     * The user's email address for authentication.
     *
     * This field is required if username is not provided.
     * Either email or username must be provided for authentication.
     */
    @IsNotEmpty()
    @ValidateIf(({ username }) => !username)
    email?: string;

    /**
     * The user's password for authentication.
     *
     * This field is required and must be a string.
     * It will be verified against the stored hashed password.
     */
    @IsString()
    @IsNotEmpty()
    password: string;
}
