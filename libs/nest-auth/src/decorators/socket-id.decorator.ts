// noinspection JSUnusedGlobalSymbols

import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { AuthUser } from "../interfaces";

/**
 * Request socket id decorator
 *
 * This decorator is used to extract the socket id from the current user's token data in the request.
 * It provides easy access to the socket id within controller methods without manually accessing the request object.
 *
 * Note: This decorator requires the `JwtAuthGuard` to be applied to the route using `@UseGuards(JwtAuthGuard)`
 * to ensure proper authentication and access to user information.
 *
 * @example
 * ```TypeScript
 * @Controller("user")
 * export class UserController {
 *     @Get()
 *     @UseGuards(JwtAuthGuard)
 *     async getUsers(@SocketId() socketId: string): Promise<User[]> {
 *         // Implementation
 *     }
 * }
 * ```
 *
 * @returns {ParameterDecorator} The parameter decorator
 */
export function SocketId(): ParameterDecorator {
    return createParamDecorator((_data: unknown, ctx: ExecutionContext): string | null => {
        const request = ctx.switchToHttp().getRequest<Express.Request & { user?: AuthUser }>();
        return request.user?.socketId || null;
    })();
}
