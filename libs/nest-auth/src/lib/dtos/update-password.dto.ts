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
    /**
     * The user's current password.
     *
     * This field is required and cannot be empty.
     * It will be verified against the stored hashed password.
     */
    @IsNotEmpty()
    oldPassword: string;

    /**
     * The new password to set for the user's account.
     *
     * This field is required and cannot be empty.
     * It will be hashed before storage for security.
     */
    @IsNotEmpty()
    newPassword: string;
}
