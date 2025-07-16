// noinspection JSUnusedGlobalSymbols

/**
 * Enum representing the different authentication strategies available.
 *
 * This enum is used to specify the type of authentication mechanism
 * employed within the application. Each strategy corresponds to a
 * distinct method of authenticating users.
 *
 * Enum Values:
 * - `LOCAL`: Authentication using local credentials (e.g., username and password).
 * - `JWT`: Authentication using JSON Web Tokens.
 * - `GOOGLE`: Authentication via Google OAuth.
 * - `FACEBOOK`: Authentication via Facebook OAuth.
 */
export enum AuthStrategy {
    /**
     * Local authentication strategy
     *
     * Authenticates users using username/email and password stored in the application's database.
     * This is the most basic form of authentication that doesn't rely on third-party services.
     */
    LOCAL = "local",

    /**
     * JWT authentication strategy
     *
     * Uses JSON Web Tokens for authentication and authorization. Tokens contain encoded user
     * information and are validated on the server side. Typically used for stateless authentication
     * in RESTful APIs.
     */
    JWT = "jwt",

    /**
     * Google OAuth authentication strategy
     *
     * Allows users to sign in using their Google accounts. This strategy delegates the authentication
     * process to Google's identity service and receives user information upon successful authentication.
     */
    GOOGLE = "google",

    /**
     * Facebook OAuth authentication strategy
     *
     * Enables authentication through Facebook accounts. Similar to Google OAuth, this strategy
     * relies on Facebook's identity provider to authenticate users and return their profile information.
     */
    FACEBOOK = "facebook",
}
