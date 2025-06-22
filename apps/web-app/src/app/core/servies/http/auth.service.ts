import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable, take } from "rxjs";
import { AuthEndpoint, AuthResponse, LoginBody, RegisterBody, User } from "@hichchi/nest-connector/auth";
import { Endpoint } from "@hichchi/nest-connector";
import { environment } from "../../../../environments/environment";

@Injectable({
    providedIn: "root",
})
export class AuthService {
    http = inject(HttpClient);

    signIn(dto: LoginBody): Observable<AuthResponse> {
        return this.http
            .post<AuthResponse>(`${environment.apiUrl}/${Endpoint.AUTH}/${AuthEndpoint.SIGN_IN}`, dto)
            .pipe(take(1));
    }

    signUp(dto: RegisterBody): Observable<User> {
        return this.http
            .post<User>(`${environment.apiUrl}/${Endpoint.AUTH}/${AuthEndpoint.SIGN_UP}`, dto)
            .pipe(take(1));
    }
}
