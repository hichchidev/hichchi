import { IsNotEmpty } from "class-validator";
import { Dto, IsVerifyToken } from "@hichchi/nest-core";
import { ResetPasswordBody, VerifyToken } from "@hichchi/nest-connector/auth";

/**
 * Data Transfer Object for resetting a user's password.
 * This class is used to encapsulate the verification token and new password
 * required to complete the password reset process.
 *
 * Implements the {@link ResetPasswordBody} interface.
 */
@Dto()
export class ResetPasswordDto implements ResetPasswordBody {
    /**
     * The verification token for password reset.
     *
     * This token is sent to the user's email during the password reset process.
     * It must be a valid verification token and cannot be empty.
     */
    @IsVerifyToken()
    @IsNotEmpty()
    token: VerifyToken;

    /**
     * The new password to set for the user's account.
     *
     * This field is required and cannot be empty.
     * It will be hashed before storage for security.
     */
    @IsNotEmpty()
    password: string;
}
