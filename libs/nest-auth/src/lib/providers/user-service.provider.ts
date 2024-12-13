/* eslint-disable @typescript-eslint/no-explicit-any */
import { IUserService } from "../interfaces";

export interface UserServiceExistingProvider {
    imports?: any[];
    useExisting: new (...args: any[]) => IUserService;
}

export interface UserServiceFactoryProvider {
    imports?: any[];
    useFactory: (...args: any[]) => IUserService | Promise<IUserService>;
    inject?: any[];
}

export type UserServiceProvider = UserServiceExistingProvider | UserServiceFactoryProvider;
