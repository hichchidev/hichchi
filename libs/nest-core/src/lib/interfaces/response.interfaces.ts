// noinspection JSUnusedGlobalSymbols

import { Pagination } from "./paginaton.interface";

// export interface IClassValidatorErrorResponse {
//     statusCode: number;
//     message: string[];
//     error: string;
// }

export interface EntityErrorResponse {
    status: number;
    code: string;
    message: string;
    description?: string;
}

export interface StatusResponse {
    status: boolean;
    message: string;
}

export interface PaginatedResponse<T> extends Pagination {
    data: T[];
    rowCount: number;
}
