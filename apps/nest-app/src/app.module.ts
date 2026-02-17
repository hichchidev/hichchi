import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { CacheModule } from "@hichchi/nest-core";
import { redisConfig } from "./core/config";
import { ConnectionOptions, HichchiCrudModule } from "@hichchi/nest-crud";
import { UserModule } from "./user/user.module";
import { AuthOptions, HichchiAuthModule, UserServiceProvider } from "@hichchi/nest-auth";
import { UserService } from "./user/services";
import { SignUpUserDto } from "./user/dto";
import { AuthField, AuthMethod } from "@hichchi/nest-connector/auth";
import configuration from "./core/config/configuration";

const authOptions: AuthOptions = {
    redis: configuration().redis,
    jwt: configuration().jwt,
    googleAuth: configuration().googleAuth,
    authMethod: AuthMethod.JWT,
    authField: AuthField.EMAIL,
    signUpDto: SignUpUserDto,
    validationExceptionFactory: true,
    allowedRedirectDomains: ["localhost.com"],
};

const connectionOptions: ConnectionOptions = {
    type: "postgres",
    host: configuration().database.host,
    port: configuration().database.port,
    username: configuration().database.user,
    password: configuration().database.password,
    database: configuration().database.schema,
    entities: ["dist/**/entities/*.entity{.ts,.js}"],
    migrations: ["dist/database/migrations/*{.ts,.js}"],
    synchronize: true,
};

const userServiceProvider: UserServiceProvider = { imports: [UserModule], useExisting: UserService };

@Module({
    imports: [
        CacheModule.register(redisConfig),
        HichchiCrudModule.forRoot(connectionOptions),
        HichchiAuthModule.register(userServiceProvider, authOptions),
        UserModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
