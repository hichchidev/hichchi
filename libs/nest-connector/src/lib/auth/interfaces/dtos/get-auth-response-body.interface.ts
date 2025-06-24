import { AccessToken } from "../../types";

/**
 * Interface defining the body structure for the Get Auth Response endpoint.
 *
 * This interface specifies the required properties for retrieving a complete
 * authentication response using a previously issued access token.
 */
export interface GetAuthResponseBody {
    /**
     * A valid JWT access token previously issued by this system.
     *
     * This token will be verified, and if valid, will be used to retrieve
     * the associated user information and generate a complete authentication response.
     */
    accessToken: AccessToken;
}
