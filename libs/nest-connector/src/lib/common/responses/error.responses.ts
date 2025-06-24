import {
    CommonErrorResponseCode,
    HttpClientErrorStatus as ClientError,
    HttpServerErrorStatus as ServerError,
} from "../enums";
import { ErrorResponse } from "../interfaces";

const Errors: { [key in CommonErrorResponseCode]: ErrorResponse } = {
    [CommonErrorResponseCode.ERROR_400_EMPTY_ID]: {
        statusCode: ClientError.BAD_REQUEST,
        code: CommonErrorResponseCode.ERROR_400_EMPTY_ID,
        message: "Id cannot be empty!",
    },
    [CommonErrorResponseCode.ERROR_400_EMPTY_IDS]: {
        statusCode: ClientError.BAD_REQUEST,
        code: CommonErrorResponseCode.ERROR_400_EMPTY_IDS,
        message: "Ids cannot be empty!",
    },
    [CommonErrorResponseCode.ERROR_400_INVALID_ID]: {
        statusCode: ClientError.BAD_REQUEST,
        code: CommonErrorResponseCode.ERROR_400_INVALID_ID,
        message: "Invalid value for ids!",
    },
    [CommonErrorResponseCode.ERROR_400_INVALID_IDS]: {
        statusCode: ClientError.BAD_REQUEST,
        code: CommonErrorResponseCode.ERROR_400_INVALID_IDS,
        message: "Invalid value for ids!",
    },
    [CommonErrorResponseCode.ERROR_400_INVALID_UUID]: {
        statusCode: ClientError.BAD_REQUEST,
        code: CommonErrorResponseCode.ERROR_400_INVALID_UUID,
        message: "Invalid value for id, Id must be a valid UUID!",
    },
    [CommonErrorResponseCode.ERROR_400_NOT_ID_ARRAY]: {
        statusCode: ClientError.BAD_REQUEST,
        code: CommonErrorResponseCode.ERROR_400_NOT_ID_ARRAY,
        message: "ids must be an array!",
    },
    [CommonErrorResponseCode.ERROR_404_FILE_NOT_EXIST]: {
        statusCode: ClientError.NOT_FOUND,
        code: CommonErrorResponseCode.ERROR_404_FILE_NOT_EXIST,
        message: "File does not exists!",
    },
    [CommonErrorResponseCode.ERROR_404_NOT_IMPLEMENTED]: {
        statusCode: ClientError.NOT_FOUND,
        code: CommonErrorResponseCode.ERROR_404_NOT_IMPLEMENTED,
        message: "API Not implemented!",
    },
    [CommonErrorResponseCode.ERROR_500_FILE_UPLOAD]: {
        statusCode: ServerError.INTERNAL_SERVER_ERROR,
        code: CommonErrorResponseCode.ERROR_500_FILE_UPLOAD,
        message: "Error occurred while uploading file!",
    },
    [CommonErrorResponseCode.ERROR_500_FILE_DELETE]: {
        statusCode: ServerError.INTERNAL_SERVER_ERROR,
        code: CommonErrorResponseCode.ERROR_500_FILE_DELETE,
        message: "Error occurred while deleting file!",
    },
    [CommonErrorResponseCode.ERROR_400]: {
        statusCode: ClientError.BAD_REQUEST,
        code: CommonErrorResponseCode.ERROR_400,
        message: "Something is wrong with the provided data!",
    },
    [CommonErrorResponseCode.ERROR_401]: {
        statusCode: ClientError.UNAUTHORIZED,
        code: CommonErrorResponseCode.ERROR_401,
        message: "You are not authorized to access this resource!",
    },
    [CommonErrorResponseCode.ERROR_403]: {
        statusCode: ClientError.FORBIDDEN,
        code: CommonErrorResponseCode.ERROR_403,
        message: "You are not allowed to access this resource!",
    },
    [CommonErrorResponseCode.ERROR_404]: {
        statusCode: ClientError.NOT_FOUND,
        code: CommonErrorResponseCode.ERROR_404,
        message: "The requested resource was not found!",
    },
    [CommonErrorResponseCode.ERROR_500]: {
        statusCode: ServerError.INTERNAL_SERVER_ERROR,
        code: CommonErrorResponseCode.ERROR_500,
        message: "Something went wrong!",
    },
    [CommonErrorResponseCode.ERROR]: {
        statusCode: ServerError.INTERNAL_SERVER_ERROR,
        code: CommonErrorResponseCode.ERROR,
        message: "Something went wrong!",
    },
};

export { Errors };
