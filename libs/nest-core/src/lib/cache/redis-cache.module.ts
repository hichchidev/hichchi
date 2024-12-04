import { DynamicModule, Global, Module } from "@nestjs/common";
import { RedisModule } from "@nestjs-modules/ioredis";
import { RedisCacheService } from "./services";
import { ICacheOptions } from "../interfaces";
import { RedisConfigException } from "../exceptions";

// noinspection JSUnusedGlobalSymbols
@Global()
@Module({})
export class RedisCacheModule {
    static register(options: ICacheOptions): DynamicModule {
        this.validateConfigs(options);

        return {
            module: RedisCacheModule,
            imports: [
                RedisModule.forRoot({
                    type: "single",
                    url: options.url,
                    options: {
                        host: options.host,
                        port: options.port,
                        password: options.password || undefined,
                        username: options.username || undefined,
                        keyPrefix: options.prefix || undefined,
                    },
                }),
            ],
            providers: [RedisCacheService],
            exports: [RedisCacheService],
        };
    }

    private static validateConfigs(options: ICacheOptions): boolean {
        if (!options.host && !options.url) {
            throw new RedisConfigException("Redis host or url is not provided while registering RedisCacheModule");
        }

        return true;
    }
}
