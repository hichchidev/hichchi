// noinspection JSUnusedGlobalSymbols

import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
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

@Injectable({
    providedIn: "root",
})
export class AuthService {
    http = inject(HttpClient);

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

    authenticateSocial(accessToken: AccessToken): Observable<AuthResponse> {
        return this.http
            .post<AuthResponse>(`${Endpoint.AUTH}/${AuthEndpoint.AUTHENTICATE_SOCIAL}`, {
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
