// noinspection JSUnusedGlobalSymbols

import { HttpClient } from "@angular/common/http";
import { Inject, inject, Injectable } from "@angular/core";
import { map, Observable, take } from "rxjs";
import {
    AccessToken,
    AuthEndpoint,
    AuthResponse,
    RefreshToken,
    SignInBody,
    SignUpBody,
    TokenResponse,
    User,
} from "@hichchi/nest-connector/auth";
import { Endpoint, SuccessResponse } from "@hichchi/nest-connector";
import { AUTH_CONFIG } from "../tokens";
import { AuthConfig } from "../interfaces";
import { GOOGLE_AUTH_POPUP_HEIGHT, GOOGLE_AUTH_POPUP_WIDTH, POPUP_POLLING_INTERVAL_MS } from "../constants";

@Injectable({
    providedIn: "root",
})
export class AuthService {
    http = inject(HttpClient);

    constructor(@Inject(AUTH_CONFIG) private readonly config: AuthConfig) {}

    signIn(dto: SignInBody): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${Endpoint.AUTH}/${AuthEndpoint.SIGN_IN}`, dto).pipe(
            take(1),
            map(res => ({
                ...res,
                accessTokenExpiresOn: new Date(res.accessTokenExpiresOn),
                refreshTokenExpiresOn: new Date(res.accessTokenExpiresOn),
            })),
        );
    }

    googleSignIn(): Promise<AccessToken> {
        return new Promise((resolve: (token: AccessToken) => void, reject: (error: Error | unknown) => void): void => {
            // eslint-disable-next-line @typescript-eslint/no-magic-numbers
            const left = (window.screen.width - GOOGLE_AUTH_POPUP_WIDTH) / 2;
            // eslint-disable-next-line @typescript-eslint/no-magic-numbers
            const top = (window.screen.height - GOOGLE_AUTH_POPUP_HEIGHT) / 2;

            const popup = window.open(
                `${this.config.apiBaseURL}/${Endpoint.AUTH}/${AuthEndpoint.GOOGLE_SIGN_IN}?redirectUrl=${window.location.origin}`,
                "google-login-popup",
                // eslint-disable-next-line prefer-template
                "resizable=no, location=no, toolbar=false, width=" +
                    GOOGLE_AUTH_POPUP_WIDTH +
                    ", height=" +
                    GOOGLE_AUTH_POPUP_HEIGHT +
                    ", top=" +
                    top +
                    ", left=" +
                    left,
            );

            const interval = setInterval(() => {
                if (popup?.closed) {
                    clearInterval(interval);
                }

                try {
                    if (popup?.location.href !== "about:blank" && popup?.location?.search?.includes("?token=e")) {
                        const token = popup.location.search.split("=")[1] as AccessToken;
                        clearInterval(interval);
                        popup.close();
                        resolve(token);
                    }
                } catch (err) {
                    if (!String(err).includes("SecurityError")) {
                        clearInterval(interval);
                        reject(err);
                    }
                }
            }, POPUP_POLLING_INTERVAL_MS);
        });
    }

    getAuthResponse(accessToken: AccessToken): Observable<AuthResponse> {
        return this.http
            .post<AuthResponse>(`${Endpoint.AUTH}/${AuthEndpoint.GET_AUTH_RESPONSE}`, {
                accessToken,
            })
            .pipe(
                take(1),
                map(res => ({
                    ...res,
                    accessTokenExpiresOn: new Date(res.accessTokenExpiresOn),
                    refreshTokenExpiresOn: new Date(res.accessTokenExpiresOn),
                })),
            );
    }

    signUp(dto: SignUpBody): Observable<User> {
        return this.http.post<User>(`${Endpoint.AUTH}/${AuthEndpoint.SIGN_UP}`, dto).pipe(take(1));
    }

    refreshToken(refreshToken: RefreshToken): Observable<TokenResponse> {
        return this.http
            .post<AuthResponse>(`${Endpoint.AUTH}/${AuthEndpoint.REFRESH_TOKEN}`, {
                refreshToken,
            })
            .pipe(take(1));
    }

    signOut(): Observable<SuccessResponse | null> {
        // this.app.startSpinner();
        return this.http.post<SuccessResponse>(`${Endpoint.AUTH}/${AuthEndpoint.SIGN_OUT}`, {}).pipe(take(1));
    }
}
