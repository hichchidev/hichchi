// noinspection JSUnusedGlobalSymbols

import { UseInterceptors } from "@nestjs/common";
import { TransformInterceptor } from "../interceptors";
import { IViewDto } from "../interfaces";

/**
 * Method decorator that wraps the NestJS `UseInterceptors` decorator and applies the `TransformInterceptor` to the specified DTO.
 *
 * @example
 * ```typescript
 * @Controller("user")
 * export class UserController {
 *     @Get()
 *     @UseTransformInterceptor(new ViewUserDto())
 *     async getUsers(): Promise<User[]> {
 *         // Implementation
 *     }
 * }
 *
 * // Use above instead of using the following
 *
 * @Controller("user")
 * export class UserController {
 *     @Get()
 *     @UseInterceptors(new TransformInterceptor(new ViewUserDto()))
 *     async getUsers(): Promise<User[]> {
 *         // Implementation
 *     }
 * }
 *
 * ```
 *
 * @param {IViewDto} dto The View DTO to transform the response to
 * @returns {MethodDecorator} The method decorator
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
