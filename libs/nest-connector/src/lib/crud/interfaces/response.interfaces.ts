import { Pagination } from "./pagination.interface";

export interface StatusResponse {
    status: boolean;
    message: string;
}

export interface PaginatedResponse<T> extends Pagination {
    data: T[];
    rowCount: number;
}
