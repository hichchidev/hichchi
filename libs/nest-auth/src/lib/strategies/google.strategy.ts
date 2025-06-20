/* eslint-disable @typescript-eslint/no-unsafe-function-type */
// noinspection JSUnusedGlobalSymbols

import { Strategy } from "passport-google-oauth2";
import { PassportStrategy } from "@nestjs/passport";
import { Inject, Injectable } from "@nestjs/common";
import { AuthOptions, GoogleProfile } from "../interfaces";
import { AUTH_OPTIONS } from "../tokens";
import { AuthService } from "../services";
import { AccessToken, AuthStrategy, RefreshToken } from "@hichchi/nest-connector/auth";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, AuthStrategy.GOOGLE) {
    constructor(
        @Inject(AUTH_OPTIONS) readonly options: AuthOptions,
        private readonly authService: AuthService,
    ) {
        super({
            clientID: options.googleAuth?.clientId || "no-id",
            clientSecret: options.googleAuth?.clientSecret || "no-secret",
            callbackURL: `${options.googleAuth?.callbackUrl}`,
            scope: "profile email",
        });
    }

    async validate(
        _accessToken: AccessToken,
        _refreshToken: RefreshToken,
        profile: GoogleProfile,
        done: Function,
    ): Promise<void> {
        const tokenUser = await this.authService.authenticateGoogle(profile);
        if (!tokenUser) {
            done(null, false);
        }
        done(null, tokenUser);
    }
}
