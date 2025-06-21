import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { TokenUser } from "../interfaces";

/**
 * Request User Decorator
 *
 * This decorator is used to get the current user from the request.CurrentUser
 *
 * @example
 * ```TypeScript
 * @Controller("user")
 * export class UserController {
 *     @Get()
 *     async getUsers(@CurrentUser() user: TokenUser): Promise<User[]> {
 *         // Implementation
 *     }
 * }
 * ```
 *
 * @returns {ParameterDecorator} The parameter decorator
 */
export function AuthInfo(): ParameterDecorator {
    return createParamDecorator((_data: unknown, ctx: ExecutionContext): TokenUser | null => {
        const request = ctx.switchToHttp().getRequest<Express.Request & { authInfo: TokenUser }>();
        return request.authInfo || null;
    })();
}
