// noinspection JSUnusedGlobalSymbols

import { Strategy } from "passport-google-oauth2";
import { PassportStrategy } from "@nestjs/passport";
import { Inject, Injectable } from "@nestjs/common";
import { AuthOptions } from "../interfaces";
import { AUTH_OPTIONS } from "../tokens";
import { AuthService } from "../services";
import { AccessToken, AuthEndpoint, AuthStrategy, GoogleProfile, RefreshToken } from "@hichchi/nest-connector/auth";
import { Request } from "express";
import { DoneCallback } from "passport";
import { GoogleAuthGuardQuery, GoogleAuthState } from "../interfaces/google-auth-state.interface";
import * as core from "express-serve-static-core";
import { Endpoint } from "@hichchi/nest-connector";

/**
 * Google OAuth2 authentication strategy
 *
 * This strategy is used to authenticate users using their Google accounts.
 * It configures the OAuth2 client with the application's credentials.
 *
 * @example
 * ```TypeScript
 * // In your module
 * @Module({
 *   imports: [PassportModule],
 *   providers: [GoogleStrategy],
 * })
 *
 * // In your controller
 * @Get('google')
 * @UseGuards(AuthGuard(AuthStrategy.GOOGLE))
 * googleAuth() {
 *   // This route initiates the Google OAuth2 flow
 * }
 *
 * @Get('google/callback')
 * @UseGuards(AuthGuard(AuthStrategy.GOOGLE))
 * googleAuthCallback(@CurrentUser() user: AuthUser) {
 *   return user;
 * }
 * ```
 */
@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, AuthStrategy.GOOGLE) {
    constructor(
        @Inject(AUTH_OPTIONS) readonly options: AuthOptions,
        private readonly authService: AuthService,
    ) {
        super({
            clientID: options.googleAuth?.clientId || "no-id",
            clientSecret: options.googleAuth?.clientSecret || "no-secret",
            callbackURL: "",
            scope: "profile email",
            passReqToCallback: true,
        });
    }

    /**
     * Validate the Google profile
     *
     * This method is called by Passport after the user has authenticated with Google.
     * It delegates the authentication to the AuthService.
     *
     * @param {Request} request - Request object
     * @param {string} _accessToken - The access token provided by Google (unused)
     * @param {string} _refreshToken - The refresh token provided by Google (unused)
     * @param {GoogleProfile} profile - The user's Google profile
     * @param {DoneCallback} done - Passport callback to indicate success or failure
     * @returns {Promise<void>} Nothing
     *
     * @example
     * ```TypeScript
     * // This method is called automatically by Passport
     * await googleStrategy.validate(
     *   'access-token',
     *   'refresh-token',
     *   { email: 'user@example.com', given_name: 'John', family_name: 'Doe' },
     *   (error, user) => { console.log('Callback executed') }
     * );
     * ```
     */
    async validate(
        request: Request<core.ParamsDictionary, unknown, unknown, GoogleAuthGuardQuery>,
        _accessToken: AccessToken,
        _refreshToken: RefreshToken,
        profile: GoogleProfile,
        done: DoneCallback,
    ): Promise<void> {
        try {
            const state: GoogleAuthState = JSON.parse(request.query.state) || {};
            const callbackURL = `${request.protocol}://${request.get("host")}/${Endpoint.AUTH}/${AuthEndpoint.GOOGLE_CALLBACK}`;
            const authUser = await this.authService.authenticateGoogle(request, profile, callbackURL, state.tenant);

            if (!authUser) return done(null, false);

            return done(null, authUser);
        } catch (error) {
            return done(error, false);
        }
    }
}
