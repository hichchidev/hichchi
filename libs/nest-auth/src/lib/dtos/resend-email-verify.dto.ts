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
    /**
     * The email address of the user requesting a new verification email.
     *
     * This field is required and cannot be empty.
     * A new verification token will be sent to this email address.
     */
    @IsNotEmpty()
    email: string;
}
