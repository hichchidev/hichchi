import { IsNotEmpty } from "class-validator";
import { Dto, IsVerifyToken } from "@hichchi/nest-core";
import { ResetPasswordTokenVerifyBody, VerifyToken } from "@hichchi/nest-connector/auth";

/**
 * Data Transfer Object for verifying a password reset token.
 * This class is used to encapsulate the token provided in a password reset link
 * to verify that it's valid before allowing the user to set a new password.
 *
 * Implements the {@link ResetPasswordTokenVerifyBody} interface.
 */
@Dto()
export class ResetPasswordTokenVerifyDto implements ResetPasswordTokenVerifyBody {
    /**
     * The verification token for password reset.
     *
     * This token is sent to the user's email during the password reset process.
     * It must be a valid verification token and cannot be empty.
     * The system will verify this token before allowing the user to set a new password.
     */
    @IsVerifyToken()
    @IsNotEmpty()
    token: VerifyToken;
}
