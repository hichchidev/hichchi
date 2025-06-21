/* eslint-disable @typescript-eslint/no-explicit-any */
import { IUserService } from "../interfaces";
import { DynamicModule, ForwardReference, Type } from "@nestjs/common";

export interface UserServiceExistingProvider {
    imports?: Array<Type | DynamicModule | Promise<DynamicModule> | ForwardReference>;
    useExisting: new (...args: any[]) => IUserService;
}

export interface UserServiceFactoryProvider {
    imports?: Array<Type | DynamicModule | Promise<DynamicModule> | ForwardReference>;
    useFactory: (...args: any[]) => IUserService | Promise<IUserService>;
    inject?: any[];
}

export type UserServiceProvider = UserServiceExistingProvider | UserServiceFactoryProvider;
