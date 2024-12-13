// noinspection JSUnusedGlobalSymbols

import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { IViewDto, PaginatedResponse } from "../interfaces";

type Data<T> = T | T[] | PaginatedResponse<T> | null;
type Response<R> = R | R[] | PaginatedResponse<R> | null;

@Injectable()
export class TransformInterceptor<T, R> implements NestInterceptor<Data<T>, Response<R>> {
    constructor(private readonly viewDto: IViewDto<T, R>) {}

    intercept(_context: ExecutionContext, next: CallHandler): Observable<Response<R>> {
        return next.handle().pipe(
            map((data: Data<T>): Response<R> => {
                if (data === null) {
                    return null;
                }

                if (Array.isArray(data)) {
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    return data.map((item: T): R => this.viewDto.formatDataSet(item)!) as R[];
                }

                if (Object.prototype.hasOwnProperty.call(data, "data")) {
                    return {
                        ...data,
                        data: (data as PaginatedResponse<T>).data.map((item: T): R | null =>
                            this.viewDto.formatDataSet(item),
                        ),
                    } as PaginatedResponse<R>;
                }

                return this.viewDto.formatDataSet(data as T);
            }),
        );
    }
}
