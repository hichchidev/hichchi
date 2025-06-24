// noinspection JSUnusedGlobalSymbols

import { UseInterceptors } from "@nestjs/common";
import { TransformInterceptor } from "../interceptors";
import { IViewDto } from "../interfaces";

/**
 * Method decorator that simplifies response transformation by applying the TransformInterceptor
 *
 * This decorator provides a convenient way to transform API response data using a view DTO.
 * It wraps the NestJS `UseInterceptors` decorator and applies the `TransformInterceptor` with
 * the specified DTO, reducing boilerplate code and improving readability.
 *
 * When applied to a controller method, this decorator will:
 * 1. Create a new TransformInterceptor with the provided view DTO
 * 2. Apply the interceptor to the method using NestJS's UseInterceptors
 * 3. Automatically transform the method's response data according to the DTO's formatDataSet method
 *
 * The decorator handles various response types including:
 * - Single objects
 * - Arrays of objects
 * - Paginated responses
 * - Null values
 *
 * @param {IViewDto} dto - The View DTO instance that defines how to transform the response data.
 *                         Must implement the IViewDto interface with a formatDataSet method.
 * @returns {MethodDecorator} A method decorator that applies the transformation logic to the decorated method
 *
 * @example
 * ```TypeScript
 * @Controller("user")
 * export class UserController {
 *     @Get()
 *     @UseTransformInterceptor(new ViewUserDto())
 *     async getUsers(): Promise<User[]> {
 *         // The raw User[] returned here will be automatically
 *         // transformed using ViewUserDto.formatDataSet()
 *         return this.userService.findAll();
 *     }
 *
 *     @Get(':id')
 *     @UseTransformInterceptor(new ViewUserDto())
 *     async getUser(@Param('id') id: string): Promise<User> {
 *         // The single User object will be transformed
 *         return this.userService.findById(id);
 *     }
 * }
 * ```
 *
 * @see {@link TransformInterceptor} The interceptor that performs the actual transformation
 * @see {@link IViewDto} The interface that view DTOs must implement
 */
export function UseTransformInterceptor(dto: IViewDto): MethodDecorator {
    return <T>(
        target: object,
        propertyKey: string | symbol,
        descriptor: PropertyDescriptor,
    ): TypedPropertyDescriptor<T> | void => {
        const interceptor = new TransformInterceptor(dto);
        return UseInterceptors(interceptor)(target, propertyKey, descriptor);
    };
}
