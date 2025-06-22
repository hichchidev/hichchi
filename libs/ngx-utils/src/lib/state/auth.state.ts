/* eslint-disable */
// noinspection JSUnusedGlobalSymbols

import { computed, inject } from "@angular/core";
import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";
import { withStorageSync } from "@angular-architects/ngrx-toolkit";
import { catchError, EMPTY, Observable, tap } from "rxjs";
import { AccessToken, AuthResponse, RefreshToken, SignInBody, TokenResponse, User } from "@hichchi/nest-connector/auth";
import { SuccessResponse } from "@hichchi/nest-connector";
import { AuthService } from "../services";
import { Router } from "@angular/router";

export interface AuthStateModel {
    signedIn: boolean;
    sessionId: string | null;
    user: User | null;
    accessToken: AccessToken | null;
    refreshToken: RefreshToken | null;
    accessTokenExpiresOn: Date | null;
    refreshTokenExpiresOn: Date | null;
}

const initialState: AuthStateModel = {
    signedIn: false,
    sessionId: null,
    user: null,
    accessToken: null,
    refreshToken: null,
    accessTokenExpiresOn: null,
    refreshTokenExpiresOn: null,
};

export const AuthState = signalStore(
    { providedIn: "root" },
    withState<AuthStateModel>(initialState),
    withStorageSync({ key: "auth" }),
    withComputed(({ accessToken, user }) => ({
        hasAccessToken: computed(() => Boolean(accessToken())),
        role: computed(() => user()?.role),
        emailVerified: computed((): boolean => Boolean(user()?.emailVerified)),
    })),
    withMethods((store, router = inject(Router), authService = inject(AuthService)) => ({
        reset(): void {
            patchState(store, initialState);
        },
        setTokens(tokenResponse: TokenResponse): void {
            const { accessToken, refreshToken, accessTokenExpiresOn, refreshTokenExpiresOn } = tokenResponse;
            patchState(store, state => ({
                ...state,
                accessToken,
                refreshToken,
                accessTokenExpiresOn,
                refreshTokenExpiresOn,
            }));
        },
        signIn(signInBody: SignInBody, redirect: string | ((res: AuthResponse) => string)): Observable<AuthResponse> {
            return authService.signIn(signInBody).pipe(
                tap((res: AuthResponse): void => {
                    patchState(store, { ...res, signedIn: true });
                    void router.navigateByUrl(typeof redirect === "string" ? redirect: redirect(res));
                }),
            );
        },
        authenticateSocial: (
            accessToken: AccessToken,
            redirect: string | ((res: AuthResponse) => string),
        ): Observable<AuthResponse> => {
            return authService.authenticateSocial(accessToken).pipe(
                tap((res: AuthResponse): void => {
                    patchState(store, { ...res, signedIn: Boolean(res.user.role) });
                    void router.navigateByUrl(typeof redirect === "string" ? redirect: redirect(res));
                }),
                catchError(() => EMPTY),
            );
        },
        signOut: (redirect: string): Observable<SuccessResponse | null> => {
            return authService.signOut().pipe(
                tap({
                    next: (): void => {
                        patchState(store, initialState);
                        void router.navigateByUrl(redirect);
                    },
                }),
                catchError(() => EMPTY),
            );
        },
    })),
);
