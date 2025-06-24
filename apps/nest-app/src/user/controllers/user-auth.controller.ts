import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { AuthController, CurrentUser, JwtAuthGuard, AuthUser } from "@hichchi/nest-auth";
import { Request } from "express";

@Controller("auth")
export class UserAuthController extends AuthController {
    @Get("email")
    @UseGuards(JwtAuthGuard)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async getEmail(@Req() req: Request, @CurrentUser() authUser: AuthUser): Promise<any> {
        const user = await this.authService.getCurrentUser(req, authUser);
        return Promise.resolve({ email: user.email });
    }

    // TODO: Continue
}
