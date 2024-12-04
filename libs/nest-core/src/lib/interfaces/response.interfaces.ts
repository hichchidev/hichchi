// noinspection JSUnusedGlobalSymbols

import { IPagination } from "./paginaton.interface";

// export interface IClassValidatorErrorResponse {
//     statusCode: number;
//     message: string[];
//     error: string;
// }

export interface IEntityErrorResponse {
    status: number;
    code: string;
    message: string;
    description?: string;
}

export interface IStatusResponse {
    status: boolean;
    message: string;
}

export interface IPaginatedResponse<T> extends IPagination {
    data: T[];
    rowCount: number;
}
