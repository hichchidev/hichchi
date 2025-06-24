import { IsNotEmpty } from "class-validator";
import { Dto } from "@hichchi/nest-core";
import { RefreshToken, RefreshTokenBody } from "@hichchi/nest-connector/auth";

/**
 * Data Transfer Object for token refresh operations.
 * This class is used to encapsulate the refresh token needed to obtain
 * a new access token when the current one expires.
 *
 * Implements the {@link RefreshTokenBody} interface.
 */
@Dto()
export class RefreshTokenDto implements RefreshTokenBody {
    @IsNotEmpty()
    refreshToken: RefreshToken;
}
