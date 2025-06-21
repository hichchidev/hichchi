// noinspection JSUnusedGlobalSymbols

import { ArgumentsHost, Catch } from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";
import { Request } from "express";
import { httpExceptionFilter } from "../utils";

/**
 * All exceptions filter
 *
 * This filter is used to catch all exceptions and handle them
 *
 * @example
 * ```TypeScript
 * async function bootstrap(): Promise<void> {
 *     const app = await NestFactory.create(AppModule);
 *
 *     const { httpAdapter } = app.get(HttpAdapterHost);
 *     app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
 *
 *     await app.listen(3000);
 * }
 * bootstrap();
 * ```
 */
@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
    override catch(exception: unknown, host: ArgumentsHost): void {
        super.catch(httpExceptionFilter(exception, host.switchToHttp().getRequest<Request>(), true), host);
    }
}
