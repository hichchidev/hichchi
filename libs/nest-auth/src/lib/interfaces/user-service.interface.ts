import { Request } from "express";
import { TokenUser } from "../types";
import { RegType } from "../enums";
import { GoogleProfile } from "./google-profile.interface";
import { IAuthUserEntity } from "./auth-user.interfaces";

export interface UserServiceEvents {
    onRegister?(request: Request, userId: string | number): Promise<void>;
    onResendVerificationEmail?(request: Request, userId: string | number): Promise<void>;
    onVerifyEmail?(request: Request, userId: string | number, status: boolean): Promise<void>;
    onLogin?(request: Request, tokenUser?: TokenUser, error?: Error): Promise<void>;
    onRefreshTokens?(request: Request, tokenUser?: TokenUser): Promise<void>;
    onGetCurrentUser?(request: Request, tokenUser?: TokenUser, error?: Error): Promise<void>;
    onChangePassword?(request: Request, tokenUser?: TokenUser, error?: Error): Promise<void>;
    onRequestPasswordReset?(request: Request, userId?: string | number): Promise<void>;
    onVerifyResetPasswordToken?(request: Request, userId?: string | number): Promise<void>;
    onResetPassword?(request: Request, userId?: string | number): Promise<void>;
    onLogout?(request: Request, tokenUser?: TokenUser, error?: Error): Promise<void>;
}

export interface IUserService extends UserServiceEvents {
    getUserById(id: string | number, subdomain?: string): Promise<IAuthUserEntity | null>;
    getUserByEmail(email: string, subdomain?: string): Promise<(IAuthUserEntity & { email: string }) | null>;
    getUserByUsername?(username: string, subdomain?: string): Promise<(IAuthUserEntity & { username: string }) | null>;
    getUserByUsernameOrEmail?(
        username: string,
        subdomain?: string,
    ): Promise<(IAuthUserEntity & { email: string; username: string }) | null>;
    getUserByAuthField?(authFieldValue: string | number, subdomain?: string): Promise<IAuthUserEntity | null>;
    registerUser(
        userDto: Partial<IAuthUserEntity>,
        regType: RegType,
        profile?: GoogleProfile,
    ): Promise<IAuthUserEntity>;
    updateUserById(
        id: string | number,
        userDto: Partial<IAuthUserEntity>,
        updatedBy: IAuthUserEntity,
    ): Promise<IAuthUserEntity>;
    sendPasswordResetEmail?(email: string, token: string | number, subdomain?: string): Promise<boolean>;
    sendVerificationEmail?(userId: string | number, token: string | number, subdomain?: string): Promise<boolean>;
}
