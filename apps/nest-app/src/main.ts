// noinspection JSIgnoredPromiseFromCall

import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import configuration from "./core/config/configuration";
import { hichchiBootstrap } from "@hichchi/nest-core";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    await hichchiBootstrap(app, { allowedOrigins: configuration().app.allowedOrigins });
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
