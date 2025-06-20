import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, take, tap } from "rxjs";
import { AuthResponse, LoginBody, RegisterBody, User } from "@hichchi/nest-connector/auth";

const AUTH_URL = "http://localhost:3000/api/auth";

@Injectable({
    providedIn: "root",
})
export class AuthService {
    constructor(private readonly http: HttpClient) {}

    login(dto: LoginBody): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${AUTH_URL}/login`, dto).pipe(
            take(1),
            tap(res => {
                return res;
            }),
        );
    }

    register(dto: RegisterBody): Observable<User> {
        return this.http.post<User>(`${AUTH_URL}/register`, dto).pipe(take(1));
    }
}
