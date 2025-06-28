import { Module } from "@nestjs/common";
import { HichchiCrudModule } from "@hichchi/nest-crud";
import { RoleEntity, UserEntity } from "./entities";
import { RoleService, UserService } from "./services";
import { RoleRepository, UserRepository } from "./repositories";
import { UserController } from "./controllers";
import { UserAuthController } from "./controllers/user-auth.controller";
import { RoleController } from "./controllers/role.controller";

@Module({
    imports: [HichchiCrudModule.forFeature([UserEntity, RoleEntity])],
    controllers: [RoleController, UserController, UserAuthController],
    providers: [RoleService, RoleRepository, UserService, UserRepository],
    exports: [RoleService, UserService],
})
export class UserModule {}
