import { DynamicModule, Global, Module } from "@nestjs/common";
import { CacheModule as NestCacheModule } from "@nestjs/cache-manager";
import { createKeyv, Keyv } from "@keyv/redis";
import { CacheableMemory } from "cacheable";
import { CacheService } from "./services";
import { RedisOptions } from "../interfaces";
import { RedisConfigException } from "../exceptions";

@Global()
@Module({})
export class CacheModule {
    static register(options: RedisOptions): DynamicModule {
        this.validateConfigs(options);

        return {
            module: CacheModule,
            imports: [
                NestCacheModule.registerAsync({
                    // eslint-disable-next-line
                    useFactory: async () => {
                        const url =
                            "url" in options
                                ? options.url
                                : `redis://${options.username ? `${options.username}${options.password ? `:${options.password}` : ""}@` : ""}${
                                      options.host
                                  }:${options.port || 6379}`;
                        return {
                            stores: [
                                new Keyv({
                                    store: new CacheableMemory({
                                        ttl: options.ttl,
                                        lruSize: options.lruSize,
                                    }),
                                }),
                                createKeyv(url, {
                                    namespace: options.prefix,
                                    keyPrefixSeparator: options.prefix ? ":" : undefined,
                                }),
                            ],
                        };
                    },
                }),
            ],
            providers: [CacheService],
            exports: [CacheService],
        };
    }

    private static validateConfigs(options: RedisOptions): boolean {
        if (!("host" in options) && !("url" in options)) {
            throw new RedisConfigException("Redis host or url is not provided while registering RedisCacheModule");
        }

        return true;
    }
}
