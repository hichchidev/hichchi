// noinspection JSUnusedGlobalSymbols

import { IS_JWT, IS_NOT_EMPTY } from "class-validator";
import { breakToWords, toFirstCase, toLowerCaseBreak, toSnakeCase } from "@hichchi/utils";
import { ErrorResponse } from "@hichchi/nest-connector";
import { IS_VERIFY_TOKEN } from "../validators";

export const ERROR = "error";

const ValidationErrors = {
    [IS_NOT_EMPTY]: (entity: string, property: string, description?: string): ErrorResponse => ({
        statusCode: 400,
        code: `${toSnakeCase(entity, true)}_400_EMPTY_${toSnakeCase(property, true)}`,
        message: `${toFirstCase(breakToWords(entity).join(" "))} ${toLowerCaseBreak(property)} cannot be empty!`,
        description,
    }),
    [IS_JWT]: (entity: string, property: string, description?: string): ErrorResponse => ({
        statusCode: 400,
        code: `${toSnakeCase(entity, true)}_400_INVALID_${toSnakeCase(property, true)}`,
        message: `Invalid value provided for ${toLowerCaseBreak(entity)} ${toLowerCaseBreak(property)}!`,
        description,
    }),
    [IS_VERIFY_TOKEN]: (entity: string, property: string, description?: string): ErrorResponse => ({
        statusCode: 400,
        code: `${toSnakeCase(entity, true)}_400_INVALID_${toSnakeCase(property, true)}`,
        message: `${toFirstCase(breakToWords(entity).join(" "))} ${toLowerCaseBreak(property)} must be a 32-character hex string!`,
        description,
    }),
};

export { ValidationErrors };
