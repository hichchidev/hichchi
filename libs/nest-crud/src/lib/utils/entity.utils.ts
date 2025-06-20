import { BadRequestException, ConflictException, HttpException, InternalServerErrorException } from "@nestjs/common";
import { EntityErrors, EntityResponses } from "../responses";
import { Operation, TypeORMErrorType } from "../enums";
import { TypeORMErrorInstance } from "../interfaces";
import { EntityPropertyNotFoundError } from "typeorm";
import { LoggerService } from "@hichchi/nest-core";
import { EXTRACT_INVALID_COLUMN_REGEX, EXTRACT_INVALID_QUERY_FIELD_REGEX } from "../regex";
import { StatusResponse } from "@hichchi/nest-connector/crud";

export class EntityUtils {
    /**
     * Handle TypeORM errors
     *
     * This method handles TypeORM errors and throws appropriate exceptions
     *
     * @param {TypeORMErrorInstance|HttpException} e Error instance
     * @param {string} entityName Entity name
     * @param {string[]} uniqueFieldNames Unique field names
     * @throws {HttpException} HttpException
     */
    public static handleError(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        e: TypeORMErrorInstance | HttpException | any,
        entityName: string,
        uniqueFieldNames?: string[],
    ): never {
        if (e instanceof HttpException) {
            throw e;
        }

        if (e instanceof EntityPropertyNotFoundError) {
            const field = EXTRACT_INVALID_QUERY_FIELD_REGEX.exec(e.message)
                ? e.message.split(EXTRACT_INVALID_QUERY_FIELD_REGEX)[1]
                : undefined;
            throw new BadRequestException(
                EntityErrors.E_400_QUERY(entityName, field, (e as TypeORMErrorInstance).sqlMessage ?? e.message),
            );
        }

        switch (e.code) {
            case TypeORMErrorType.ER_NO_DEFAULT_FOR_FIELD: {
                const field = e.sqlMessage.split("'")[1];
                throw new BadRequestException(
                    EntityErrors.E_400_NO_DEFAULT(entityName, field, e.sqlMessage ?? e.message),
                );
            }
            case TypeORMErrorType.ER_DUP_ENTRY: {
                const unique: string = e.sqlMessage
                    .split(/(for key )/)?.[2]
                    ?.replace(/'/g, "")
                    ?.split(".")?.[1];

                if (unique) {
                    const [, entityName, uniqueFieldName] = unique.split("_");
                    if (entityName && uniqueFieldName) {
                        throw new ConflictException(
                            EntityErrors.E_409_EXIST_U(entityName, [uniqueFieldName], e.sqlMessage ?? e.message),
                        );
                    }
                }
                throw new ConflictException(
                    EntityErrors.E_409_EXIST_U(entityName, uniqueFieldNames || [], e.sqlMessage ?? e.message),
                );
            }
            case TypeORMErrorType.ER_NO_REFERENCED_ROW_2: {
                const fk = e.sqlMessage.split(/(CONSTRAINT `|` FOREIGN KEY)/)?.[2];
                if (fk) {
                    const [, entityName, relationName] = fk.split("_");
                    if (entityName && relationName) {
                        throw new BadRequestException(
                            EntityErrors.E_404_RELATION(entityName, relationName, e.sqlMessage ?? e.message),
                        );
                    }
                }
                throw new InternalServerErrorException(EntityErrors.E_500(e.sqlMessage ?? e.message));
            }
            case TypeORMErrorType.ER_BAD_FIELD_ERROR: {
                LoggerService.error(e);
                const field = EXTRACT_INVALID_COLUMN_REGEX.exec(e.message)
                    ? e.message.split(EXTRACT_INVALID_COLUMN_REGEX)[1]
                    : undefined;
                throw new BadRequestException(EntityErrors.E_400_QUERY(entityName, field, e.sqlMessage ?? e.message));
            }
            default:
                LoggerService.error(e);
                throw new InternalServerErrorException(EntityErrors.E_500(e.sqlMessage ?? e.message));
        }
    }

    /**
     * Handle success
     *
     * This method returns a success message based on the operation
     *
     * @param {Operation} operation Operation
     * @param {string} entityName Entity name
     * @returns {StatusResponse} Success message
     */
    public static handleSuccess(entityName: string, operation?: Operation): StatusResponse {
        switch (operation) {
            case Operation.CREATE:
                return EntityResponses.CREATED(entityName);
            case Operation.UPDATE:
                return EntityResponses.UPDATE(entityName);
            case Operation.SAVE:
                return EntityResponses.SAVE(entityName);
            case Operation.DELETE:
                return EntityResponses.DELETE(entityName);
            default:
                return EntityResponses.SUCCESS;
        }
    }
}
