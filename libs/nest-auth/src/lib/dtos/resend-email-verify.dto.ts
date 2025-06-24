import { IsNotEmpty } from "class-validator";
import { Dto } from "@hichchi/nest-core";
import { ResendEmailVerifyBody } from "@hichchi/nest-connector/auth";

/**
 * Data Transfer Object for requesting a new email verification link.
 * This class is used to encapsulate the email address of the user
 * who needs a new verification email sent to them.
 *
 * Implements the {@link ResendEmailVerifyBody} interface.
 */
@Dto()
export class ResendEmailVerifyDto implements ResendEmailVerifyBody {
    @IsNotEmpty()
    email: string;
}
