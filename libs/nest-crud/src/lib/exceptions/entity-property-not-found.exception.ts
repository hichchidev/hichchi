// noinspection JSUnusedGlobalSymbols

import { EntityPropertyNotFoundError } from "typeorm";
import { TypeORMErrorType } from "../enums";

export class EntityPropertyNotFoundException extends EntityPropertyNotFoundError {
    query: string;

    parameters: string[];

    driverError: {
        code: string;
        errno: number;
        sqlState: string;
        sqlMessage: string;
        sql: string;
    };

    code: TypeORMErrorType;

    errno: number;

    sqlState: string;

    sqlMessage: string;

    sql: string;
}

export function isEntityPropertyNotFoundException(error: unknown): error is EntityPropertyNotFoundException {
    return error instanceof EntityPropertyNotFoundException && "sqlMessage" in error && "code" in error;
}
