import { RegisterDto, ViewDto } from "../dtos";
import { AuthField, AuthMethod } from "../enums";
import { HttpException, Type } from "@nestjs/common";
import { RedisOptions } from "@hichchi/nest-core";
import { ValidationError } from "@nestjs/common/interfaces/external/validation-error.interface";

export interface JwtOptions {
    secret: string;
    expiresIn: number;
    refreshSecret: string;
    refreshExpiresIn: number;
}

// export interface OAuthOptions {
//     domain?: string;
//     clientId?: string;
//     clientSecret?: string;
//     callbackUrl?: string;
// }

export interface GoogleAuthOptions {
    clientId: string;
    clientSecret: string;
    callbackUrl: string;
}

export interface CookiesOptions {
    secret?: string;
    sameSite?: boolean | "lax" | "strict" | "none";
    secure?: boolean;
}

export interface SocketOptions {
    idKey: string;
}

export interface AuthOptions {
    redis?: RedisOptions;
    sessionSecret?: string;
    jwt: JwtOptions;
    oAuth?: AuthOptions;
    googleAuth?: GoogleAuthOptions;
    cookies?: CookiesOptions;
    socket?: SocketOptions;
    checkEmailVerified?: boolean;
    emailVerifyRedirect?: string;
    passwordResetExp?: number;
    authMethod?: AuthMethod;
    authField?: AuthField | string;
    registerDto?: typeof RegisterDto;
    viewDto?: Type<ViewDto>;
    validationExceptionFactory?: boolean | ((errors: ValidationError[]) => HttpException);
    disableRegistration?: boolean;
}
