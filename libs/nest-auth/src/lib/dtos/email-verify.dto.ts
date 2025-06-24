import { IsNotEmpty, IsOptional, IsUrl } from "class-validator";
import { Dto, IsVerifyToken } from "@hichchi/nest-core";
import { EmailVerifyBody, VerifyToken } from "@hichchi/nest-connector/auth";

/**
 * Data Transfer Object for email verification.
 * This class is used to encapsulate the verification token sent to users
 * for confirming their email address after sign up.
 *
 * Implements the {@link EmailVerifyBody} interface.
 */
@Dto()
export class EmailVerifyDto implements EmailVerifyBody {
    /**
     * The verification token sent to the user's email.
     *
     * This token is used to verify the user's email address.
     * It must be a valid verification token and cannot be empty.
     */
    @IsVerifyToken()
    @IsNotEmpty()
    token: VerifyToken;

    /**
     * The URL to redirect the user to after successful verification.
     *
     * This field is optional but if provided, it must be a valid URL.
     * It's typically used to redirect users back to the application
     * after completing the email verification process.
     */
    @IsUrl()
    @IsOptional()
    redirectUrl?: string;
}
