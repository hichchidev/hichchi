import { IsNotEmpty } from "class-validator";
import { Dto } from "@hichchi/nest-core";
import { UpdatePasswordBody } from "@hichchi/nest-connector/auth";

/**
 * Data Transfer Object for updating a user's password.
 * This class is used to encapsulate the old and new passwords
 * when an authenticated user wants to change their password.
 *
 * Implements the {@link UpdatePasswordBody} interface.
 */
@Dto()
export class UpdatePasswordDto implements UpdatePasswordBody {
    @IsNotEmpty()
    oldPassword: string;

    @IsNotEmpty()
    newPassword: string;
}
