import { Pagination } from "@hichchi/nest-core";

export class PaginatedResponse<T> {
    data: T[];

    page = 0;

    limit = 0;

    rowCount: number;

    constructor(data: T[], totalCount: number, pagination?: Pagination) {
        this.data = data;
        this.rowCount = totalCount;
        if (pagination?.take && pagination?.skip) {
            this.page = pagination.skip ? Math.floor(pagination.skip / pagination.take) + 1 : 1;
            this.limit = pagination.take;
        }
    }
}
