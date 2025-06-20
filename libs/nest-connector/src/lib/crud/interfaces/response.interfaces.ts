import { Pagination } from "./pagination.interface";

export interface StatusResponse {
    statusCode: boolean;
    message: string;
}

export interface PaginatedResponse<T> extends Pagination {
    data: T[];
    rowCount: number;
}
