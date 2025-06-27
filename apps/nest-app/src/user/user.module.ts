import { Module } from "@nestjs/common";
import { HichchiCrudModule } from "@hichchi/nest-crud";
import { RoleEntity, UserEntity } from "./entities";
import { UserService } from "./services";
import { UserRepository } from "./repositories";
import { UserController } from "./controllers";
import { UserAuthController } from "./controllers/user-auth.controller";

@Module({
    imports: [HichchiCrudModule.forFeature([UserEntity, RoleEntity])],
    controllers: [UserController, UserAuthController],
    providers: [UserService, UserRepository],
    exports: [UserService, UserRepository],
})
export class UserModule {}
