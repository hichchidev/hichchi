import { IsNotEmpty } from "class-validator";
import { Dto } from "@hichchi/nest-core";
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
    @IsNotEmpty()
    token: VerifyToken;

    @IsNotEmpty()
    password: string;
}
