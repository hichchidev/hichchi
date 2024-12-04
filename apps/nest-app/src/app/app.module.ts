import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { RedisCacheModule } from "@hichchi/nest-core";
import { redisConfig } from "./config";

@Module({
    imports: [RedisCacheModule.register(redisConfig)],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
