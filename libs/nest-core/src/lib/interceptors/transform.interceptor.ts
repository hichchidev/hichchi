// noinspection JSUnusedGlobalSymbols

import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { IViewDto } from "../interfaces";
import { PaginatedResponse } from "@hichchi/nest-connector/crud";

/**
 * Response data types handled by the TransformInterceptor
 *
 * This type represents the possible input data structures that the interceptor can transform:
 * - Single objects of type T
 * - Arrays of objects of type T
 * - Paginated responses containing arrays of type T
 * - Null values
 */
type Data<T> = T | T[] | PaginatedResponse<T> | null;

/**
 * Transformed response data types returned by the TransformInterceptor
 *
 * This type represents the possible output data structures after transformation:
 * - Single objects of type R
 * - Arrays of objects of type R
 * - Paginated responses containing arrays of type R
 * - Null values
 */
type Response<R> = R | R[] | PaginatedResponse<R> | null;

/**
 * Interceptor that transforms response data using a view DTO
 *
 * This interceptor automatically transforms response data from controllers
 * using the provided view DTO's formatDataSet method. It handles various
 * response types including single objects, arrays, paginated responses,
 * and null values.
 *
 * The interceptor uses generic type parameters to provide type safety:
 * - T: The input data type (typically an entity or internal model)
 * - R: The output data type (the transformed view representation)
 *
 * This interceptor is typically applied using the @UseTransformInterceptor decorator,
 * which provides a more convenient way to use it in controllers.
 *
 * @template T The input data type to be transformed
 * @template R The output data type after transformation
 *
 * @example
 * ```typescript
 * // Manual usage in a controller
 * @Controller('users')
 * @UseInterceptors(new TransformInterceptor(new UserViewDto()))
 * export class UserController {
 *   // All endpoints in this controller will have their responses transformed
 *   // using the UserViewDto.formatDataSet method
 * }
 *
 * // Usage with specific endpoints
 * @Controller('products')
 * export class ProductController {
 *   @Get()
 *   @UseInterceptors(new TransformInterceptor(new ProductViewDto()))
 *   findAll(): Promise<Product[]> {
 *     // The Product[] returned here will be transformed to ProductView[]
 *     return this.productService.findAll();
 *   }
 * }
 * ```
 *
 * @see {@link UseTransformInterceptor} A decorator that simplifies using this interceptor
 * @see {@link IViewDto} The interface that view DTOs must implement
 */
@Injectable()
export class TransformInterceptor<T, R> implements NestInterceptor<Data<T>, Response<R>> {
    /**
     * Creates a new TransformInterceptor
     *
     * @param {IViewDto<T, R>} viewDto - The view DTO that defines how to transform the response data.
     *                                   Must implement the IViewDto interface with a formatDataSet method.
     */
    constructor(private readonly viewDto: IViewDto<T, R>) {}

    /**
     * Intercepts the response and transforms the data
     *
     * This method is called automatically by NestJS when processing responses.
     * It transforms the response data using the view DTO's formatDataSet method,
     * handling different response types appropriately:
     *
     * - For null values: Returns null
     * - For arrays: Transforms each item in the array
     * - For paginated responses: Transforms each item in the data array while preserving pagination metadata
     * - For single objects: Transforms the object directly
     *
     * @param {ExecutionContext} _context - The execution context (unused in this implementation)
     * @param {CallHandler} next - The next handler in the chain
     * @returns {Observable<Response<R>>} An observable of the transformed response
     */
    intercept(_context: ExecutionContext, next: CallHandler): Observable<Response<R>> {
        return next.handle().pipe(
            map((data: Data<T>): Response<R> => {
                if (data === null) {
                    return null;
                }

                if (Array.isArray(data)) {
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
