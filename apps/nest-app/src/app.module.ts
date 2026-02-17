import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { CacheModule, SubdomainMiddleware } from "@hichchi/nest-core";
import { redisConfig } from "./core/config";
import { ConnectionOptions, HichchiCrudModule } from "@hichchi/nest-crud";
import { UserModule } from "./user/user.module";
import { AuthOptions, HichchiAuthModule, UserServiceProvider } from "@hichchi/nest-auth";
import { UserService } from "./user/services";
import { SignUpUserDto } from "./user/dto";
import { DAY_IN_SECONDS, MONTH_IN_SECONDS } from "@hichchi/nest-connector";
import { AuthField, AuthMethod } from "@hichchi/nest-connector/auth";

const authOptions: AuthOptions = {
    redis: {
        host: "localhost",
        port: 6379,
        prefix: "nest-auth",
    },
    jwt: {
        secret: "3cGnEj4Kd1ENr8UcX8fBKrugman7lXmZyJetsam_fo-RcIk",
        expiresIn: DAY_IN_SECONDS,
        refreshSecret: "3cGnEj4Kd1EKIcX8fBKrugman7lXmZyJetsam_fo-RcIk",
        refreshExpiresIn: MONTH_IN_SECONDS,
    },
    googleAuth: {
        clientId: "1008373153437-l62ri4l19imc8qbqts5majia5s57808u.apps.googleusercontent.com",
        clientSecret: "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",
        callbackUrl: "http://localhost:3000/auth/google-callback",
    },
    authMethod: AuthMethod.JWT,
    authField: AuthField.EMAIL,
    signUpDto: SignUpUserDto,
    validationExceptionFactory: true,
};

const connectionOptions: ConnectionOptions = {
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "root",
    database: "dbname",
    charset: "utf8mb4",
    synchronize: true,
    entities: ["dist/**/entities/*.entity{.ts,.js}"],
    migrations: ["dist/database/migrations/*{.ts,.js}"],
    legacySpatialSupport: false,
    autoLoadEntities: true,
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
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer): void {
        consumer.apply(SubdomainMiddleware("google.com", "accounts")).forRoutes("*");
    }
}
