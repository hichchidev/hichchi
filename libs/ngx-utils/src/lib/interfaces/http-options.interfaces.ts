import { HttpHeaders } from "@angular/common/http";
import { FilterOptions, PaginationOptions, SearchOptions, SortOptions } from "@hichchi/nest-connector/crud";

export interface HttpOptions {
    skipNotify?: boolean;
    promise?: false;
    headers?: HttpHeaders | Record<string, string | string[]>;
}

export interface HttpOptionsPromise {
    skipNotify?: boolean;
    promise: true;
    headers?: HttpHeaders | Record<string, string | string[]>;
}

export interface HttpGetOptions<Model> extends HttpOptions {
    search?: SearchOptions<Model>;
    filter?: FilterOptions<Model>;
    sort?: SortOptions<Model>;
    pagination?: PaginationOptions;
}

export interface HttpGetOptionsPromise<Model> extends Omit<HttpGetOptions<Model>, "promise"> {
    promise: true;
}
