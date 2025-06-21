// noinspection JSUnusedGlobalSymbols

import { TypeORMErrorType } from "../enums";
import { TypeORMError } from "typeorm";

export class TypeormException extends TypeORMError {
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
