import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { Inject, Injectable } from "@nestjs/common";
import { AuthService } from "../services";
import { AUTH_OPTIONS } from "../tokens";
import { AuthField, AuthStrategy } from "../enums";
import { AuthOptions } from "../interfaces";
import { TokenUser } from "../types";
import { RequestWithSubdomain } from "@hichchi/nest-core";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, AuthStrategy.LOCAL) {
    constructor(
        @Inject(AUTH_OPTIONS) private readonly options: AuthOptions,
        private readonly authService: AuthService,
    ) {
        super({
            usernameField: options.authField === AuthField.EMAIL ? "email" : "username",
            passReqToCallback: true,
        });
    }

    async validate(request: RequestWithSubdomain, username: string, password: string): Promise<TokenUser> {
        return await this.authService.authenticate(username, password, request.subdomain);
    }
}
