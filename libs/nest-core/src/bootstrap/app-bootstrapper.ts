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
import { ExceptionFilter, INestApplication } from "@nestjs/common/interfaces";
import { DEFAULT_PORT } from "../constants";
import { LoggerService } from "../logger";

/**
 * Type representing a valid NestJS module entry point
 *
 * This type represents any valid module type that can be passed to NestFactory.create()
 * or used as an entry point for a NestJS application. It includes standard module classes,
 * dynamic modules, forward references, or promises that resolve to any of these types.
 */
type IEntryNestModule = Type | DynamicModule | ForwardReference | Promise<IEntryNestModule>;

/**
 * Application configuration options for bootstrapping a NestJS application
 *
 * This interface defines the configuration options for bootstrapping a NestJS application
 * using the hichchiBootstrap function. It allows customization of various aspects of the
 * application, including port, global prefix, CORS settings, validation, filters, and interceptors.
 *
 * @example
 * ```typescript
 * // Basic configuration
 * const config: AppConfiguration = {
 *   port: 3000,
 *   globalPrefix: 'api',
 *   validation: true,
 *   globalFilters: true,
 *   globalInterceptors: true
 * };
 *
 * // Advanced configuration with custom validation options
 * const advancedConfig: AppConfiguration = {
 *   port: process.env.PORT ? parseInt(process.env.PORT) : 8080,
 *   globalPrefix: 'api/v1',
 *   allowedOrigins: ['example.com', 'localhost'],
 *   validation: {
 *     transform: true,
 *     whitelist: true,
 *     forbidNonWhitelisted: true
 *   },
 *   globalFilters: [new CustomExceptionFilter()],
 *   globalInterceptors: [new LoggingInterceptor(), new TimeoutInterceptor()]
 * };
 * ```
 */
export interface AppConfiguration {
    /**
     * Port number on which the application will listen
     *
     * If not provided, the application will use the PORT environment variable
     * or fall back to the DEFAULT_PORT constant.
     *
     * @default 8080
     */
    port?: number;

    /**
     * Global prefix for all routes in the application
     *
     * When set, all routes will be prefixed with this value.
     * For example, if set to 'api', a route '/users' will become '/api/users'.
     */
    globalPrefix?: string;

    /**
     * List of allowed origins for CORS
     *
     * When provided, CORS will be enabled with these origins.
     * If the array is empty or not provided, CORS will not be enabled.
     *
     * @example ['example.com', 'localhost:3000']
     */
    allowedOrigins?: string[];

    /**
     * Validation pipe configuration
     *
     * When set to true, enables validation with default options.
     * When set to an object, enables validation with the specified options.
     * When set to false, validation is disabled.
     *
     * @default true
     */
    validation?: boolean | ValidationPipeOptions;

    /**
     * Global exception filters configuration
     *
     * When set to true, enables the default AllExceptionsFilter.
     * When set to an array, uses the provided custom filters.
     * When set to false, no global filters are applied.
     *
     * @default true
     */
    globalFilters?: boolean | ExceptionFilter[];

    /**
     * Global interceptors configuration
     *
     * When set to true, enables the default ClassSerializerInterceptor.
     * When set to an array, uses the provided custom interceptors.
     * When set to false, no global interceptors are applied.
     *
     * @default true
     */
    globalInterceptors?: boolean | NestInterceptor[];

    /**
     * Logger configuration
     *
     * When set to true, enables the default LoggerService.
     * When set to a LoggerService instance, uses the provided logger.
     * When set to false, no logger is applied.
     *
     * @default true
     *
     * @see {@link LoggerService} The logger service used when set to true
     */
    logger?: boolean | LoggerService;
}

/**
 * Bootstrap a NestJS application with common configurations and best practices
 *
 * This function sets up a NestJS application with common configurations and best practices,
 * including global filters, CORS, validation, interceptors, and global prefix.
 * It accepts a pre-created `NestApplication` instance and applies the specified configuration.
 *
 * The function applies sensible defaults for all configuration options, making it easy to
 * quickly bootstrap a production-ready NestJS application with minimal configuration.
 *
 * @param {INestApplication} app - A pre-created `NestApplication` instance
 * @param {AppConfiguration} configuration - Configuration options for the application
 * @returns {Promise<void>} A promise that resolves when the application is successfully started
 *
 * @example
 * ```typescript
 * // Bootstrap with a pre-created `NestApplication`
 * import { NestFactory } from '@nestjs/core';
 * import { AppModule } from './app.module';
 *
 * async function bootstrap() {
 *   const app = await NestFactory.create(AppModule);
 *   // Perform custom setup on the app instance
 *   app.enableShutdownHooks();
 *
 *   // Then bootstrap with hichchiBootstrap
 *   await hichchiBootstrap(app, {
 *     port: 3000,
 *     globalPrefix: 'api/v1'
 *   });
 * }
 * bootstrap();
 * ```
 *
 * @see {@link AppConfiguration} Configuration options for the bootstrap function
 */
export async function hichchiBootstrap(app: INestApplication, configuration?: AppConfiguration): Promise<void>;

/**
 * Bootstrap a NestJS application with common configurations and best practices
 *
 * This function sets up a NestJS application with common configurations and best practices,
 * including global filters, CORS, validation, interceptors, and global prefix.
 * It accepts a NestJS module and creates a new `NestApplication` instance from it.
 *
 * The function applies sensible defaults for all configuration options, making it easy to
 * quickly bootstrap a production-ready NestJS application with minimal configuration.
 *
 * @param {IEntryNestModule} module - A module to bootstrap
 * @param {AppConfiguration} configuration - Configuration options for the application
 * @returns {Promise<void>} A promise that resolves when the application is successfully started
 *
 * @example
 * ```typescript
 * // Bootstrap with a module
 * import { AppModule } from './app.module';
 *
 * async function bootstrap() {
 *   await hichchiBootstrap(AppModule, {
 *     port: 3000,
 *     globalPrefix: 'api',
 *     allowedOrigins: ['example.com']
 *   });
 * }
 * bootstrap();
 * ```
 *
 * @see {@link AppConfiguration} Configuration options for the bootstrap function
 */
export async function hichchiBootstrap(module: IEntryNestModule, configuration?: AppConfiguration): Promise<void>;

/**
 * Implementation of the hichchiBootstrap function
 *
 * This is the actual implementation of the hichchiBootstrap function that handles
 * both overload signatures. It accepts either a pre-created `NestApplication` instance
 * or a NestJS module, and applies the specified configuration.
 *
 * The function performs the following steps:
 * 1. Merges the provided configuration with default values
 * 2. Creates a NestApplication instance if a module was provided
 * 3. Configures global exception filters if enabled
 * 4. Sets up CORS if allowed origins are provided
 * 5. Configures validation pipe if enabled
 * 6. Sets up global interceptors if enabled
 * 7. Sets the global prefix if provided
 * 8. Starts the application on the specified port
 *
 * @param {INestApplication | IEntryNestModule} appOrModule - Either a pre-created `NestApplication` instance or a NestJS module
 * @param {AppConfiguration} [configuration] - Configuration options for the application
 * @returns {Promise<void>} A promise that resolves when the application is successfully started
 *
 * @see {@link INestApplication} NestJS application interface
 * @see {@link NestApplication} NestJS application instance
 * @see {@link IEntryNestModule} Type representing a valid NestJS module
 * @see {@link AppConfiguration} Configuration options for the bootstrap function
 * @see {@link LoggerService} Logger service used by the application
 * @see {@link AllExceptionsFilter} Default exception filter
 * @see {@link ValidationPipe} NestJS validation pipe
 */
export async function hichchiBootstrap(
    appOrModule: INestApplication | IEntryNestModule,
    configuration?: AppConfiguration,
): Promise<void> {
    const config: AppConfiguration = {
        port: 8080,
        globalPrefix: undefined,
        allowedOrigins: undefined,
        validation: true,
        globalFilters: true,
        globalInterceptors: true,
        logger: true,
        ...configuration,
    };

    let app: INestApplication;

    if (appOrModule instanceof NestApplication) {
        app = appOrModule;
        if (config?.logger) {
            app.useLogger(config.logger === true ? new LoggerService() : config.logger);
        }
    } else {
        app = await NestFactory.create(appOrModule as IEntryNestModule, {
            logger: config.logger === true ? new LoggerService() : config.logger,
        });
    }

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
            origin: (origin: string, callback: (ex: unknown, allow?: boolean) => void) => {
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
