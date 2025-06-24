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
    /**
     * The user's first name.
     *
     * This field is required and cannot be empty.
     */
    @IsNotEmpty()
    firstName: string;

    /**
     * The user's last name.
     *
     * This field is required and cannot be empty.
     */
    @IsNotEmpty()
    lastName: string;

    /**
     * The user's username.
     *
     * This field is required if email is not provided.
     * Either username or email must be provided for authentication.
     */
    @IsNotEmpty()
    @ValidateIf(({ email }) => !email)
    username?: string;

    /**
     * The user's email address.
     *
     * This field is required if username is not provided.
     * Either email or username must be provided for authentication.
     */
    @IsNotEmpty()
    @ValidateIf(({ username }) => !username)
    email?: string;

    /**
     * The user's password.
     *
     * This field is required and cannot be empty.
     * It will be hashed before storage for security.
     */
    @IsNotEmpty()
    password: string;
}
