import { AuthStrategy } from "@hichchi/nest-connector/auth";

/**
 * Interface representing a user's name from Google OAuth profile data.
 *
 * This interface matches the structure of the name object returned by Google's
 * OAuth 2.0 API. It contains the user's given name (first name) and family name (last name).
 *
 * @see {@link GoogleProfile} The complete Google profile structure
 * @see {@link GoogleAuthOptions} Configuration for Google OAuth
 * @see {@link AuthStrategy} Authentication strategies enum including Google
 */
export interface GoogleProfileName {
    /**
     * The user's given (first) name
     *
     * @see {@link https://developers.google.com/identity/protocols/oauth2} Google OAuth 2.0 API
     */
    givenName: string;

    /**
     * The user's family (last) name
     *
     * @see {@link https://developers.google.com/identity/protocols/oauth2} Google OAuth 2.0 API
     */
    familyName: string;
}

/**
 * Interface representing a user's photo from Google OAuth profile data.
 *
 * This interface matches the structure of the photos array items returned by Google's
 * OAuth 2.0 API. It contains the URL of the user's profile photo and its type.
 *
 * @see {@link GoogleProfile} The complete Google profile structure
 * @see {@link GoogleAuthOptions} Configuration for Google OAuth
 * @see {@link AuthStrategy} Authentication strategies enum including Google
 */
export interface GoogleProfilePhoto {
    /**
     * The URL of the user's profile photo
     *
     * @see {@link https://developers.google.com/identity/protocols/oauth2} Google OAuth 2.0 API
     */
    value: string;

    /**
     * The type of the photo, always "default" for Google profile photos
     *
     * @see {@link https://developers.google.com/identity/protocols/oauth2} Google OAuth 2.0 API
     */
    type: "default";
}

/**
 * Interface representing a user's email from Google OAuth profile data.
 *
 * This interface matches the structure of the emails array items returned by Google's
 * OAuth 2.0 API. It contains the user's email address and its type.
 *
 * @see {@link GoogleProfile} The complete Google profile structure
 * @see {@link GoogleAuthOptions} Configuration for Google OAuth
 * @see {@link AuthStrategy} Authentication strategies enum including Google
 */
export interface GoogleProfileEmail {
    /**
     * The user's email address
     *
     * @see {@link https://developers.google.com/identity/protocols/oauth2} Google OAuth 2.0 API
     */
    value: string;

    /**
     * The type of the email, always "account" for Google profile emails
     *
     * @see {@link https://developers.google.com/identity/protocols/oauth2} Google OAuth 2.0 API
     */
    type: "account";
}

/**
 * Interface representing the raw JSON data from Google OAuth profile.
 *
 * This interface matches the structure of the _json property in the Google OAuth profile.
 * It contains the raw data returned by Google's OAuth 2.0 API.
 *
 * @see {@link GoogleProfile} The complete Google profile structure
 * @see {@link GoogleAuthOptions} Configuration for Google OAuth
 * @see {@link AuthStrategy} Authentication strategies enum including Google
 */
export interface GoogleProfileJson {
    /**
     * The unique identifier for the user's Google account
     */
    sub: string;

    /**
     * The user's full name
     */
    name: string;

    /**
     * The user's given (first) name
     */
    given_name: string;

    /**
     * The user's family (last) name
     */
    family_name: string;

    /**
     * The URL of the user's profile picture
     */
    picture: string;

    /**
     * The user's email address
     */
    email: string;

    /**
     * Whether the user's email address has been verified by Google
     */
    email_verified: boolean;
}

/**
 * Interface representing a complete Google OAuth profile.
 *
 * This interface represents the complete profile object returned by Google's
 * OAuth 2.0 API and processed by Passport.js. It contains all the user information
 * needed for authentication and user creation.
 *
 * This is the main interface used when processing Google OAuth authentication in the application.
 *
 * @see {@link GoogleAuthOptions} Configuration for Google OAuth
 * @see {@link AuthStrategy} Authentication strategies enum including Google
 */
export interface GoogleProfile {
    /**
     * The authentication provider, always set to AuthStrategy.GOOGLE for Google profiles
     */
    provider: AuthStrategy.GOOGLE;

    /**
     * The unique identifier for the user's Google account (same as id)
     */
    sub: string;

    /**
     * The unique identifier for the user's Google account (same as sub)
     */
    id: string;

    /**
     * The user's full display name
     */
    displayName: string;

    /**
     * The user's name object containing given and family names
     *
     * @see {@link GoogleProfileName} Structure of the name object
     */
    name: GoogleProfileName;

    /**
     * The user's given (first) name
     */
    given_name: string;

    /**
     * The user's family (last) name
     */
    family_name: string;

    /**
     * Whether the user's email address has been verified by Google
     */
    email_verified: boolean;

    /**
     * Alternative property for email verification status
     */
    verified: boolean;

    /**
     * The user's primary email address
     */
    email: string;

    /**
     * Array of the user's email addresses
     *
     * @see {@link GoogleProfileEmail} Structure of each email object
     */
    emails: GoogleProfileEmail[];

    /**
     * Array of the user's profile photos
     *
     * @see {@link GoogleProfilePhoto} Structure of each photo object
     */
    photos: GoogleProfilePhoto[];

    /**
     * The URL of the user's profile picture
     */
    picture: string;

    /**
     * The raw JSON string from Google OAuth response
     */
    _raw: string;

    /**
     * The parsed JSON object from Google OAuth response
     *
     * @see {@link GoogleProfileJson} Structure of the JSON object
     */
    _json: GoogleProfileJson;
}
