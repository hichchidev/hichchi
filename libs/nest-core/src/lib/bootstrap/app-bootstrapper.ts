import { HttpAdapterHost, NestApplication, NestFactory, Reflector } from "@nestjs/core";
import {
    ClassSerializerInterceptor,
    DynamicModule,
    ForwardReference,
    Type,
    UnauthorizedException,
    ValidationPipe,
    ValidationPipeOptions,
} from "@nestjs/common";
import { AuthErrors } from "@hichchi/nest-connector/auth";
import { NestInterceptor } from "@nestjs/common/interfaces/features/nest-interceptor.interface";
import { AllExceptionsFilter } from "../filters";
import { isOriginAllowed, validationPipeExceptionFactory } from "../utils";
import { LoggerService } from "../services";
import { ExceptionFilter } from "@nestjs/common/interfaces";
import { DEFAULT_PORT } from "../constants";

type IEntryNestModule = Type | DynamicModule | ForwardReference | Promise<IEntryNestModule>;

export interface AppConfiguration {
    port?: number;
    globalPrefix?: string;
    allowedOrigins?: string[];
    validation?: boolean | ValidationPipeOptions;
    globalFilters?: boolean | ExceptionFilter[];
    globalInterceptors?: boolean | NestInterceptor[];
}

export async function hichchiBootstrap(app: NestApplication, configuration: AppConfiguration): Promise<void>;
export async function hichchiBootstrap(module: IEntryNestModule, configuration: AppConfiguration): Promise<void>;
export async function hichchiBootstrap(
    appOrModule: NestApplication | IEntryNestModule,
    configuration?: AppConfiguration,
): Promise<void> {
    const app = appOrModule instanceof NestApplication ? appOrModule : await NestFactory.create(appOrModule);

    const config: AppConfiguration = {
        port: 8080,
        globalPrefix: undefined,
        allowedOrigins: undefined,
        validation: true,
        globalFilters: true,
        globalInterceptors: true,
        ...configuration,
    };

    if (config.globalFilters) {
        if (config.globalFilters === true) {
            const { httpAdapter } = app.get(HttpAdapterHost);
            app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
        } else {
            app.useGlobalFilters(...config.globalFilters);
        }
    }

    if (config.allowedOrigins?.length) {
        app.enableCors({
            origin: (origin: string, callback: (ex: Error | null, allow?: boolean) => void) => {
                if (!origin || isOriginAllowed(origin, config.allowedOrigins!)) {
                    callback(null, true);
                } else {
                    callback(new UnauthorizedException(AuthErrors.AUTH_401_CORS));
                }
            },
            credentials: true,
        });
    }

    if (config.validation) {
        const validationOptions: ValidationPipeOptions =
            config.validation === true
                ? {
                      transform: true,
                      whitelist: true,
                      exceptionFactory: validationPipeExceptionFactory,
                  }
                : config.validation;

        app.useGlobalPipes(new ValidationPipe(validationOptions));
    }

    if (config.globalInterceptors) {
        const interceptors =
            config.globalInterceptors === true
                ? [new ClassSerializerInterceptor(app.get(Reflector))]
                : config.globalInterceptors;
        app.useGlobalInterceptors(...interceptors);
    }

    if (config.globalPrefix) {
        app.setGlobalPrefix(config.globalPrefix);
    }

    const port = config.port || process.env["PORT"] || DEFAULT_PORT;
    await app.listen(port);
    LoggerService.log(`🚀 Application is running on: http://localhost:${port}`);
}
