// noinspection JSIgnoredPromiseFromCall

import {
    ClassSerializerInterceptor,
    Logger,
    UnauthorizedException,
    ValidationPipe,
    ValidationPipeOptions,
} from "@nestjs/common";
import { NestFactory, Reflector } from "@nestjs/core";
import { AppModule } from "./app.module";
import { isOriginAllowed, validationPipeExceptionFactory } from "@hichchi/nest-core";
import configuration from "./core/config/configuration";

async function bootstrap(): Promise<void> {
    const app = await NestFactory.create(AppModule);

    // const { httpAdapter } = app.get(HttpAdapterHost);
    // app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

    app.enableCors({
        origin: (origin: string, callback: (ex: Error | null, allow?: boolean) => void) => {
            if (!origin || isOriginAllowed(origin, configuration().app.allowedOrigins)) {
                callback(null, true);
            } else {
                callback(new UnauthorizedException());
            }
        },
        credentials: true,
    });

    const validationOptions: ValidationPipeOptions = {
        transform: true,
        whitelist: true,
        exceptionFactory: validationPipeExceptionFactory,
    };
    app.useGlobalPipes(new ValidationPipe(validationOptions));

    app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

    const globalPrefix = "api";
    app.setGlobalPrefix(globalPrefix);

    const port = process.env.PORT || 3000;
    await app.listen(port);
    Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
}

bootstrap();
