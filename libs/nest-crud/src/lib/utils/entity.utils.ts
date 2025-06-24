import {
    BadRequestException,
    ConflictException,
    HttpException,
    InternalServerErrorException,
    Logger,
} from "@nestjs/common";
import { Operation, TypeORMErrorType } from "../enums";
import { EXTRACT_INVALID_COLUMN_REGEX, EXTRACT_INVALID_QUERY_FIELD_REGEX } from "../regex";
import { CrudErrorResponses, CrudSuccessResponses } from "../responses";
import { SuccessResponse } from "@hichchi/nest-connector";
import { isTypeormException } from "../exceptions";
import { EntityPropertyNotFoundError } from "typeorm";

export class EntityUtils {
    /**
     * Handle TypeORM errors
     *
     * This method handles TypeORM errors and throws appropriate exceptions
     *
     * @param {unknown} e Error instance
     * @param {string} entityName Entity name
     * @param {string[]} uniqueFieldNames Unique field names
     * @throws {HttpException} HttpException
     */
    public static handleError(e: unknown, entityName: string, uniqueFieldNames?: string[]): never {
        if (e instanceof HttpException) {
            throw e;
        }

        if (e instanceof EntityPropertyNotFoundError) {
            const field = EXTRACT_INVALID_QUERY_FIELD_REGEX.exec(e.message)
                ? e.message.split(EXTRACT_INVALID_QUERY_FIELD_REGEX)[1]
                : undefined;
            throw new BadRequestException(CrudErrorResponses.E_400_QUERY(entityName, field, e.message));
        } else if (isTypeormException(e)) {
            switch (e.code) {
                case TypeORMErrorType.ER_NO_DEFAULT_FOR_FIELD: {
                    const field = e.sqlMessage.split("'")[1];
                    throw new BadRequestException(
                        CrudErrorResponses.E_400_NO_DEFAULT(entityName, field, e.sqlMessage ?? e.message),
                    );
                }
                case TypeORMErrorType.ER_DUP_ENTRY: {
                    const unique: string = e.sqlMessage
                        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
                        .split(/(for key )/)?.[2]
                        ?.replace(/'/g, "")
                        ?.split(".")?.[1];

                    if (unique) {
                        const [, entityName, uniqueFieldName] = unique.split("_");
                        if (entityName && uniqueFieldName) {
                            throw new ConflictException(
                                CrudErrorResponses.E_409_EXIST_U(
                                    entityName,
                                    [uniqueFieldName],
                                    e.sqlMessage ?? e.message,
                                ),
                            );
                        }
                    }
                    throw new ConflictException(
                        CrudErrorResponses.E_409_EXIST_U(entityName, uniqueFieldNames || [], e.sqlMessage ?? e.message),
                    );
                }
                case TypeORMErrorType.ER_NO_REFERENCED_ROW_2: {
                    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
                    const fk = e.sqlMessage.split(/(CONSTRAINT `|` FOREIGN KEY)/)?.[2];
                    if (fk) {
                        const [, entityName, relationName] = fk.split("_");
                        if (entityName && relationName) {
                            throw new BadRequestException(
                                CrudErrorResponses.E_404_RELATION(entityName, relationName, e.sqlMessage ?? e.message),
                            );
                        }
                    }
                    throw new InternalServerErrorException(CrudErrorResponses.E_500(e.sqlMessage ?? e.message));
                }
                case TypeORMErrorType.ER_BAD_FIELD_ERROR: {
                    Logger.error(e, null, EntityUtils.name);
                    const field = EXTRACT_INVALID_COLUMN_REGEX.exec(e.message)
                        ? e.message.split(EXTRACT_INVALID_COLUMN_REGEX)[1]
                        : undefined;
                    throw new BadRequestException(
                        CrudErrorResponses.E_400_QUERY(entityName, field, e.sqlMessage ?? e.message),
                    );
                }
                default:
                    Logger.error(e, null, EntityUtils.name);
                    throw new InternalServerErrorException(CrudErrorResponses.E_500(e.sqlMessage ?? e.message));
            }
        } else if (e instanceof Error) {
            Logger.error(e, null, EntityUtils.name);
            throw new InternalServerErrorException(CrudErrorResponses.E_500(e.message));
        }

        Logger.error(e, null, null, EntityUtils.name);
        throw new InternalServerErrorException(CrudErrorResponses.E_500());
    }

    /**
     * Handle success
     *
     * This method returns a success message based on the operation
     *
     * @param {Operation} operation Operation
     * @param {string} entityName Entity name
     * @returns {SuccessResponse} Success message
     */
    public static handleSuccess(entityName: string, operation?: Operation): SuccessResponse {
        switch (operation) {
            case Operation.CREATE:
                return CrudSuccessResponses.CREATED(entityName);
            case Operation.UPDATE:
                return CrudSuccessResponses.UPDATE(entityName);
            case Operation.SAVE:
                return CrudSuccessResponses.SAVE(entityName);
            case Operation.DELETE:
                return CrudSuccessResponses.DELETE(entityName);
            case undefined:
                return CrudSuccessResponses.SUCCESS();
        }
    }
}
