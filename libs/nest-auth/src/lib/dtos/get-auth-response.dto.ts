import { IsJWT, IsNotEmpty } from "class-validator";
import { AccessToken, GetAuthResponseBody } from "@hichchi/nest-connector/auth";
import { Dto } from "@hichchi/nest-core";

/**
 * Data Transfer Object for getting a complete authentication response using an existing JWT token.
 *
 * This class encapsulates the required properties for retrieving authentication data
 * using a previously issued access token. It implements the {@link GetAuthResponseBody} interface.
 */
@Dto()
export class GetAuthResponseDto implements GetAuthResponseBody {
    /**
     * A valid JWT access token previously issued by this system.
     *
     * This token will be verified, and if valid, will be used to retrieve
     * the associated user information and generate a complete authentication response.
     */
    @IsJWT()
    @IsNotEmpty()
    accessToken: AccessToken;
}
