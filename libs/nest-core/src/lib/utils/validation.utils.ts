// noinspection JSUnusedGlobalSymbols

import { MetadataScanner } from "@nestjs/core";
import { BadRequestException, INestApplication, Logger, Type } from "@nestjs/common";
import { ROUTE_ARGS_METADATA } from "@nestjs/common/constants";
import { toFirstCase, toLowerCaseBreak, toPascalCase, toSnakeCase } from "@hichchi/utils";
import { getMetadataStorage, MetadataStorage, ValidationError } from "class-validator";
import { ValidationMetadata } from "class-validator/types/metadata/ValidationMetadata";
import { IEntityErrorResponse, INestApp, RouteArgsMetadata, RouteArgsMetadataKey } from "../interfaces";
import { NestParamDecorator } from "../enums";
import { exit } from "process";
import { hichchiMetadata } from "../metadata";

/**
 * Validation pipe exception factory.
 * This function is used to create a custom exception for the validation pipe.
 *
 * @param {ValidationError[]} errors The validation errors
 * @returns {BadRequestException} The custom exception
 *
 * @example
 * ```typescript
 * async function bootstrap(): Promise<void> {
 *     const app = await NestFactory.create(AppModule);
 *
 *     app.useGlobalPipes(
 *         new ValidationPipe({ exceptionFactory: validationPipeExceptionFactory }),
 *     );
 *
 *     await app.listen(3000);
 * }
 *
 * bootstrap();
 * ```
 */
export function validationPipeExceptionFactory(errors: ValidationError[]): BadRequestException {
    const error = errors[0];

    let [constraint, message] = Object.entries(error.constraints || {})[0];

    let formattedConstraint = /not|is/i.exec(constraint)
        ? constraint.replace(/not|isNot/i, "").replace(/is/i, "not")
        : `not${toPascalCase(constraint)}`;

    let code = `ERROR_400_${toSnakeCase(error.property, true)}_${toSnakeCase(formattedConstraint, true)}`;

    try {
        const metadata = hichchiMetadata();
        const dto = metadata.getDtoMetaOfInstance(error.target);
        if (dto) {
            const entity = dto.entity ? metadata.getEntityName(dto.entity) : dto.name;
            if (entity) {
                code = `${toSnakeCase(entity, true)}_400_${toSnakeCase(error.property, true)}_${toSnakeCase(formattedConstraint, true)}`;
                const replacement = `${toLowerCaseBreak(entity)} ${toLowerCaseBreak(error.property)}`;
                message = toFirstCase(message.replace(error.property, replacement)) + "!";
            }
        }
    } catch {
        /* empty */
    }

    return new BadRequestException({ status: 400, code, message });
}

function isClass(value: Type): boolean {
    return value.toString().split(" ")[0] === "class";
}

function logAndExit(error: string): void {
    Logger.error(error);
    exit(1);
}

function getControllers(app: INestApplication): Type[] {
    return Array.from((app as INestApp)?.container?.modules || [])?.flatMap(([, module]) => {
        return Array.from(module._controllers || [])?.map(([, ctrl]) => {
            return app.get(ctrl.token) as Type;
        });
    });
}

function getErrorTitle(validationMetadata: ValidationMetadata, dto: Type): string {
    return (
        `\x1b[31mError: Invalid validation message for the property \x1b[97m${validationMetadata.propertyName} ` +
        `\x1b[31min \x1b[97m${dto.name}\x1b[31m!`
    );
}

function getErrorInfo(validationMetadata: ValidationMetadata, dto: Type): string {
    const errorLocation =
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        `has been provided as the message for the \x1b[97m@${toFirstCase(validationMetadata.name!)}()\x1b[31m decorator ` +
        `on the \x1b[97m${validationMetadata.propertyName}\x1b[31m property in \x1b[97m${dto.name}\x1b[31m.`;

    const formatInfo =
        "Message property of ValidationOptions should be a JSON string of type \x1b[97mIEntityErrorResponse\x1b[31m.";

    const format =
        "\x1b[97mIEntityErrorResponse { \x1b[35mstatus\x1b[97m: \x1b[34mnumber\x1b[97m, \x1b[35mcode\x1b[97m: \x1b[32mstring\x1b[97m, " +
        "\x1b[35mmessage\x1b[97m: \x1b[32mstring\x1b[97m, \x1b[35mdescription\x1b[97m?: \x1b[32mstring\x1b[97m }\x1b[31m";

    const suggestion =
        "You can use the \x1b[97mtoErrString()\x1b[31m method from \x1b[97mhichchi-nestjs-common/converters\x1b[31m to convert the error object to a string with fallback values.";

    return `${errorLocation}\n    ${formatInfo}\n\n    ${format}\n\n    ${suggestion}`;
}

function getError(validationMetadata: ValidationMetadata, dto: Type, start?: string): string {
    return (
        `${getErrorTitle(validationMetadata, dto)}\n\n` +
        `    ${start ? start : "An invalid string"} ${getErrorInfo(validationMetadata, dto)}`
    );
}

/**
 * Use strict class validation error formatting.
 *
 * This function is used to validate the error message provided in the class-validator decorators.
 * It ensures that the error message provided to the class-validator decorators is a valid JSON string of type `IEntityErrorResponse`.
 *
 * @example
 * ```typescript
 * async function bootstrap(): Promise<void> {
 *     const app = await NestFactory.create(AppModule);
 *
 *     await app.listen(configuration().app.port);
 *
 *     useStrictClassValidationErrorFormatting(app);
 * }
 * bootstrap();
 * ```
 *
 * @param app The Nest application instance
 */
export function useStrictClassValidationErrorFormatting(app: INestApplication): void {
    const metadataStorage: MetadataStorage = getMetadataStorage();

    const metadataScanner = new MetadataScanner();

    getControllers(app).forEach((controller: Type): void => {
        metadataScanner.getAllMethodNames(controller).forEach((methodName: string): void => {
            const routeArgsMetadata: RouteArgsMetadata = Reflect.getMetadata(
                ROUTE_ARGS_METADATA,
                controller.constructor,
                methodName,
            ) as RouteArgsMetadata;

            // eslint-disable-next-line guard-for-in
            for (const key in routeArgsMetadata) {
                const metadata = routeArgsMetadata[key as RouteArgsMetadataKey];

                if (key === `${NestParamDecorator.Body}:${metadata.index}`) {
                    const dto: Type = Reflect.getMetadata("design:paramtypes", controller, methodName)[
                        metadata.index
                    ] as Type;

                    if (isClass(dto) && dto.name === "CreateVendorDto") {
                        const validationMetadatas: ValidationMetadata[] = metadataStorage.getTargetValidationMetadatas(
                            dto,
                            dto.name,
                            true,
                            true,
                        );

                        for (const validationMetadata of validationMetadatas) {
                            if (validationMetadata.name) {
                                if (typeof validationMetadata.message !== "string") {
                                    logAndExit(getError(validationMetadata, dto, "Non string value"));
                                } else {
                                    try {
                                        const error: IEntityErrorResponse = JSON.parse(validationMetadata.message);
                                        if (!error.status || !error.code || !error.message) {
                                            logAndExit(getError(validationMetadata, dto));
                                        }
                                    } catch {
                                        logAndExit(getError(validationMetadata, dto));
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });
    });
}
