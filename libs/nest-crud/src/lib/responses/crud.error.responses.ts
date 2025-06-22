import { toLowerCaseBreak, toSentenceCase, toSnakeCase } from "@hichchi/utils";
import { Operation } from "../enums";
import {
    ErrorResponse,
    HttpClientErrorStatus as ClientError,
    HttpServerErrorStatus as ServerError,
} from "@hichchi/nest-connector";

const CrudErrorResponses = {
    E_400_NO_DEFAULT: (entityName: string, field: string, description?: string): ErrorResponse => ({
        statusCode: ClientError.BAD_REQUEST,
        code: `${toSnakeCase(entityName, true)}_${ClientError.BAD_REQUEST}_NO_DEFAULT_${toSnakeCase(field, true)}`,
        message: `No default value for ${toLowerCaseBreak(entityName)} ${toLowerCaseBreak(field)}!`,
        description,
    }),
    E_400_INVALID_ID: (entityName: string, description?: string): ErrorResponse => ({
        statusCode: ClientError.BAD_REQUEST,
        code: `${toSnakeCase(entityName, true)}_${ClientError.BAD_REQUEST}_INVALID_ID`,
        message: `Invalid ${toLowerCaseBreak(entityName)} id!, Id must be a UUID!`,
        description,
    }),
    E_400_QUERY: (entityName: string, field?: string, description?: string): ErrorResponse => ({
        statusCode: ClientError.BAD_REQUEST,
        code: `${toSnakeCase(entityName, true)}_${ClientError.BAD_REQUEST}_QUERY`,
        message: `Cannot find ${field ? `field with name '${field}'` : "a field provided as a filter or search"} in ${toLowerCaseBreak(entityName)}!`,
        description,
    }),
    E_404_ID: (entityName: string, description?: string): ErrorResponse => ({
        statusCode: ClientError.NOT_FOUND,
        code: `${toSnakeCase(entityName, true)}_${ClientError.NOT_FOUND}_ID`,
        message: `Cannot find a ${toLowerCaseBreak(entityName)} with given id!`,
        description,
    }),
    E_404_RELATION: (entityName: string, relationName: string, description?: string): ErrorResponse => ({
        statusCode: ClientError.NOT_FOUND,
        code: `${toSnakeCase(entityName, true)}_${ClientError.NOT_FOUND}_${relationName.toUpperCase()}_ID`,
        description,
        message: `Cannot find a ${relationName.toLowerCase()} with given id!`,
    }),
    E_404_CONDITION: (entityName: string, description?: string): ErrorResponse => ({
        statusCode: ClientError.NOT_FOUND,
        code: `${toSnakeCase(entityName, true)}_${ClientError.NOT_FOUND}_CONDITION`,
        message: `Cannot find a ${toLowerCaseBreak(entityName)} with given condition!`,
        description,
    }),
    E_409_EXIST_U: (entityName: string, unique: string[], description?: string): ErrorResponse => ({
        statusCode: ClientError.CONFLICT,
        code: `${toSnakeCase(entityName, true)}_${ClientError.CONFLICT}_EXIST_${toSnakeCase(unique.join("_"), true)}`,
        message: `${toSentenceCase(entityName)} with given ${unique.map(u => toLowerCaseBreak(u, " ")).join(" or ")} already exists!`,
        description,
    }),
    E_500_OPERATION: (entityName: string, operation: Operation, description?: string): ErrorResponse => ({
        statusCode: ServerError.INTERNAL_SERVER_ERROR,
        code: `${toSnakeCase(entityName, true)}_${ServerError.INTERNAL_SERVER_ERROR}_${toSnakeCase(operation, true)}`,
        message: `Unexpected error occurred while ${toLowerCaseBreak(operation)} ${toLowerCaseBreak(entityName)}!`,
        description,
    }),
    E_500: (description?: string): ErrorResponse => ({
        statusCode: ServerError.INTERNAL_SERVER_ERROR,
        code: `E_${ServerError.INTERNAL_SERVER_ERROR}_ERROR`,
        message: "Unexpected error occurred!",
        description,
    }),
};

export { CrudErrorResponses };
