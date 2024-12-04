import { RuntimeException } from "@nestjs/core/errors/exceptions";

export class RedisConfigException extends RuntimeException {
    constructor(public override message: string) {
        super(message);
    }
}
