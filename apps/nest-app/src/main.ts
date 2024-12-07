// noinspection JSIgnoredPromiseFromCall

import { ClassSerializerInterceptor, Logger, ValidationPipe } from "@nestjs/common";
import { HttpAdapterHost, NestFactory, Reflector } from "@nestjs/core";
import { AllExceptionsFilter, validationPipeExceptionFactory } from "@hichchi/nest-core";
import { AppModule } from "./app.module";

async function bootstrap(): Promise<void> {
    const app = await NestFactory.create(AppModule);

    const { httpAdapter } = app.get(HttpAdapterHost);
    app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

    const validationOptions = { transform: true, whitelist: true, exceptionFactory: validationPipeExceptionFactory };
    app.useGlobalPipes(new ValidationPipe(validationOptions));

    app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

    const globalPrefix = "api";
    app.setGlobalPrefix(globalPrefix);

    const port = process.env.PORT || 3000;
    await app.listen(port);
    Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
}

bootstrap();
