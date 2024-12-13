import { Tokens } from "./tokens.interface";

export interface TokenResponse extends Tokens {
    accessTokenExpiresOn: Date;
    refreshTokenExpiresOn: Date;
}
