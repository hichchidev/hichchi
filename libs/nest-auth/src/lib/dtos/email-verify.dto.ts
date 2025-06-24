import { IsNotEmpty } from "class-validator";
import { Dto } from "@hichchi/nest-core";
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
    @IsNotEmpty()
    token: VerifyToken;
}
