/**
 * Enumeration representing the supported authentication methods.
 *
 * This enum provides two authentication strategies:
 * - `COOKIE`: Utilizes cookies for storing and transmitting authentication tokens.
 * - `JWT`: Employs JSON Web Tokens for authentication, typically passed via headers.
 *
 * Use this enum to specify the desired authentication method in your application.
 */
export enum AuthMethod {
    /**
     * Cookie-based authentication
     *
     * Authentication tokens are stored in HTTP cookies and automatically included in requests.
     * This method provides better security against XSS attacks but requires proper cookie configuration.
     */
    COOKIE = "cookie",

    /**
     * JWT-based authentication
     *
     * Authentication tokens are typically stored client-side (localStorage/sessionStorage) and
     * manually included in request headers. This method provides more flexibility but requires
     * careful implementation to prevent token theft via XSS.
     */
    JWT = "jwt",
}
