import { AuthStrategy } from "../enums";

export interface GoogleProfileName {
    givenName: string;
    familyName: string;
}

export interface GoogleProfilePhoto {
    value: string;
    type: "default";
}

export interface GoogleProfileEmail {
    value: string;
    type: "account";
}

export interface GoogleProfileJson {
    sub: string;
    name: string;
    given_name: string;
    family_name: string;
    picture: string;
    email: string;
    email_verified: boolean;
}

export interface GoogleProfile {
    provider: AuthStrategy.GOOGLE;
    sub: string;
    id: string;
    displayName: string;
    name: GoogleProfileName;
    given_name: string;
    family_name: string;
    email_verified: boolean;
    verified: boolean;
    email: string;
    emails: GoogleProfileEmail[];
    photos: GoogleProfilePhoto[];
    picture: string;
    _raw: string;
    _json: GoogleProfileJson;
}
