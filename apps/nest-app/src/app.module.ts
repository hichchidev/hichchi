import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { RedisCacheModule } from "@hichchi/nest-core";
import { redisConfig } from "./core/config";
import { HichchiCrudModule } from "@hichchi/nest-crud";
import { UserModule } from "./user/user.module";

@Module({
    imports: [
        RedisCacheModule.register(redisConfig),
        HichchiCrudModule.forRoot({
            type: "mysql",
            host: "localhost",
            port: 3306,
            username: "root",
            password: "root",
            database: "dbname",
            charset: "utf8mb4",
            synchronize: true,
            entities: ["dist/**/entities/*.entity{.ts,.js}"],
            migrations: ["dist/database/migrations/*{.ts,.js}"],
            legacySpatialSupport: false,
            keepConnectionAlive: true,
            autoLoadEntities: true,
        }),
        UserModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
