import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { User } from "@hichchi/nest-connector/auth";
import { AuthUser } from "../interfaces";

/**
 * Current User Decorator
 *
 * This decorator is used to extract the authenticated user information from the request context.
 * It removes sensitive information like password and provides access to user details in controller methods.
 * The decorator automatically retrieves the user object `AuthUser` that was attached to the request by the authentication process.
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
 *     async getUsers(@CurrentUser() user: AuthUser): Promise<User[]> {
 *         // Implementation
 *     }
 * }
 * ```
 *
 * @returns {ParameterDecorator} The parameter decorator
 */
export function CurrentUser(): ParameterDecorator {
    return createParamDecorator((_data: unknown, ctx: ExecutionContext): AuthUser => {
        const request = ctx.switchToHttp().getRequest<Express.Request & { user: User & AuthUser }>();
        const user = request.user;
        user.password = null;
        return user;
    })();
}
