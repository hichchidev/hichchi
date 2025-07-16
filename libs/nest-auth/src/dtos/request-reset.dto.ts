import { IsNotEmpty } from "class-validator";
import { Dto } from "@hichchi/nest-core";
import { RequestResetBody } from "@hichchi/nest-connector/auth";

/**
 * Data Transfer Object for requesting a password reset.
 * This class is used to encapsulate the email address of the user
 * who wants to reset their password.
 *
 * Implements the {@link RequestResetBody} interface.
 */
@Dto()
export class RequestResetDto implements RequestResetBody {
    /**
     * The email address of the user requesting a password reset.
     *
     * This field is required and cannot be empty.
     * A password reset token will be sent to this email address.
     */
    @IsNotEmpty()
    email: string;
}
