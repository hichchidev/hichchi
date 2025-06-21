// noinspection JSUnusedGlobalSymbols

import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { TokenUser } from "../interfaces";

/**
 * Request socket id decorator
 *
 * This decorator is used to get the socket id from the request.
 *
 * @example
 * ```TypeScript
 * @Controller("user")
 * export class UserController {
 *     @Get()
 *     async getUsers(@SocketId() socketId: string): Promise<User[]> {
 *         // Implementation
 *     }
 * }
 * ```
 *
 * @returns {ParameterDecorator} The parameter decorator
 */
export function SocketId(): ParameterDecorator {
    return createParamDecorator((_data: unknown, ctx: ExecutionContext): string | undefined => {
        const request = ctx.switchToHttp().getRequest<Express.Request & { user?: TokenUser }>();
        return request.user?.socketId;
    })();
}
