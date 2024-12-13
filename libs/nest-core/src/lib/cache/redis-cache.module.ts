import { DynamicModule, Global, Module } from "@nestjs/common";
import { RedisModule } from "@nestjs-modules/ioredis";
import { RedisCacheService } from "./services";
import { RedisOptions } from "../interfaces";
import { RedisConfigException } from "../exceptions";

// noinspection JSUnusedGlobalSymbols
@Global()
@Module({})
export class RedisCacheModule {
    static register(options: RedisOptions): DynamicModule {
        this.validateConfigs(options);

        return {
            module: RedisCacheModule,
            imports: [
                RedisModule.forRoot({
                    type: "single",
                    url: "url" in options ? options.url : undefined,
                    options: {
                        host: "host" in options ? options.host : undefined,
                        port: "port" in options ? options.port : undefined,
                        password: "password" in options ? options.password : undefined,
                        username: "username" in options ? options.username : undefined,
                        keyPrefix: options.prefix,
                    },
                }),
            ],
            providers: [RedisCacheService],
            exports: [RedisCacheService],
        };
    }

    private static validateConfigs(options: RedisOptions): boolean {
        if (!("host" in options) && !("url" in options)) {
            throw new RedisConfigException("Redis host or url is not provided while registering RedisCacheModule");
        }

        return true;
    }
}
