import { HttpClient } from "@angular/common/http";
import { Model } from "@hichchi/nest-connector/crud";
import { objectToDottedPathValueObject } from "@hichchi/utils";
import { firstValueFrom, Observable, take } from "rxjs";
import { skipNotify } from "../utils";
import { HttpGetOptions, HttpGetOptionsPromise, HttpOptions, HttpOptionsPromise } from "../interfaces";
import { HttpQuery } from "../types";
import { inject } from "@angular/core";

enum RequestType {
    GET = "get",
    POST = "post",
    PUT = "put",
    PATCH = "patch",
    DELETE = "delete",
}

export abstract class CrudHttpService<Mdl extends Model = Model> {
    protected http = inject(HttpClient);

    protected request<Res = unknown, Body = unknown>(
        type: RequestType,
        url: string | string[],
        body: Body,
        options?: HttpGetOptions<Mdl> | HttpGetOptionsPromise<Mdl>,
    ): Promise<Res> | Observable<Res> {
        if (options?.promise) {
            return firstValueFrom(
                this.http.request<Res>(type, Array.isArray(url) ? url.join("/") : url, {
                    body,
                    params: CrudHttpService.parseQuery<Mdl>(options),
                    context: skipNotify(options?.skipNotify),
                }),
            );
        }

        return this.http
            .request<Res>(type, Array.isArray(url) ? url.join("/") : url, {
                body,
                params: CrudHttpService.parseQuery(options),
                context: skipNotify(options?.skipNotify),
            })
            .pipe(take(1));
    }

    get<Res = unknown>(url: string | string[], options?: HttpGetOptions<Mdl>): Observable<Res>;

    get<Res = unknown>(url: string | string[], options?: HttpGetOptionsPromise<Mdl>): Promise<Res>;

    get<Res = unknown>(
        url: string | string[],
        options?: HttpGetOptions<Mdl> | HttpGetOptionsPromise<Mdl>,
    ): Promise<Res> | Observable<Res> {
        return this.request<Res>(RequestType.GET, url, undefined, options);
    }

    post<Res = unknown, B = unknown>(url: string | string[], body: B, options?: HttpOptions): Observable<Res>;

    post<Res = unknown, B = unknown>(url: string | string[], body: B, options?: HttpOptionsPromise): Promise<Res>;

    post<Res = unknown, B = unknown>(
        url: string | string[],
        body: B,
        options?: HttpOptions & HttpOptionsPromise,
    ): Promise<Res> | Observable<Res> {
        return this.request<Res>(RequestType.POST, url, body, options);
    }

    put<Res = unknown, B = unknown>(url: string | string[], body: B, options?: HttpOptions): Observable<Res>;

    put<Res = unknown, B = unknown>(url: string | string[], body: B, options?: HttpOptionsPromise): Promise<Res>;

    put<Res = unknown, B = unknown>(
        url: string | string[],
        body: B,
        options?: HttpOptions & HttpOptionsPromise,
    ): Promise<Res> | Observable<Res> {
        return this.request<Res>(RequestType.PUT, url, body, options);
    }

    patch<Res = unknown, B = unknown>(url: string | string[], body: B, options?: HttpOptions): Observable<Res>;

    patch<Res = unknown, B = unknown>(url: string | string[], body: B, options?: HttpOptionsPromise): Promise<Res>;

    patch<Res = unknown, B = unknown>(
        url: string | string[],
        body: B,
        options?: HttpOptions & HttpOptionsPromise,
    ): Promise<Res> | Observable<Res> {
        return this.request<Res>(RequestType.PATCH, url, body, options);
    }

    delete<Res = unknown>(url: string | string[], options?: HttpOptions): Observable<Res>;

    delete<Res = unknown>(url: string | string[], options?: HttpOptionsPromise): Promise<Res>;

    delete<Res = unknown>(
        url: string | string[],
        options?: HttpOptions & HttpOptionsPromise,
    ): Promise<Res> | Observable<Res> {
        return this.request<Res>(RequestType.DELETE, url, options);
    }

    static parseQuery<T>(options?: HttpGetOptions<T> | HttpGetOptionsPromise<T>): HttpQuery<Model> {
        if (!options) {
            return {};
        }

        const query: HttpQuery<Model> = {};

        // Pagination
        if (options.pagination?.page !== undefined || options.pagination?.limit !== undefined) {
            const { page, limit } = options.pagination;
            query.page = page;
            query.limit = limit;
        }

        // Sort: convert { field1: 'asc', field2: 'desc' } → "field1:asc,field2:desc"
        if (options.sort) {
            const sortEntries = Object.entries(options.sort)
                .filter(([, order]) => order === "asc" || order === "desc")
                .map(([field, order]) => `${field}.${order}`);
            if (sortEntries.length > 0) {
                query.sort = sortEntries.join(",");
            }
        }

        // Search: convert object → searchValue & searchFields
        if (options.search?.fields && options.search?.value) {
            const flatSearch = objectToDottedPathValueObject(options.search.fields);
            const paths = Object.keys(flatSearch);
            if (paths.length > 0) {
                query.searchValue = options.search.value;
                query.searchFields = paths.join(",");
            }
        }

        // Filters: everything else goes as individual keys
        if (options.filter) {
            const flatFilter = objectToDottedPathValueObject(options.filter);
            for (const [key, value] of Object.entries(flatFilter)) {
                if (value !== undefined && value !== null) {
                    query[key] = String(value);
                }
            }
        }

        return query;
    }
}
