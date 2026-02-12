import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { AuthUser } from "../interfaces";

/**
 * Auth Info Decorator
 *
 * This decorator extracts the authenticated user information from the request object.
 * It retrieves the authInfo property which contains the {@link AuthUser} data set by the authentication process.
 *
 * Note: This decorator requires the {@link GoogleAuthGuard} to be applied to the route using `@UseGuards(GoogleAuthGuard)`
 * to ensure proper authentication and access to user information.
 *
 * @type {import('@nestjs/common').UseGuards} UseGuards
 *
 * @example
 * ```TypeScript
 * @Controller("user")
 * export class UserController {
 *     constructor(private userService: UserService) {}
 *
 *     @Get()
 *     @UseGuards(GoogleAuthGuard)
 *     async getUsers(@AuthInfo() authInfo: AuthUser): Promise<User[]> {
 *         // Implementation
 *     }
 * }
 * ```
 *
 * @returns {ParameterDecorator} The parameter decorator
 */
export function AuthInfo(): ParameterDecorator {
    return createParamDecorator((_data: unknown, ctx: ExecutionContext): AuthUser | undefined => {
        const request = ctx.switchToHttp().getRequest<Express.Request & { authInfo?: AuthUser }>();
        return request.authInfo;
    })();
}
