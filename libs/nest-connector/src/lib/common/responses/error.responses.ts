import {
    CommonErrorResponseCode,
    HttpClientErrorStatus as ClientError,
    HttpServerErrorStatus as ServerError,
} from "../enums";
import { ErrorResponse } from "../interfaces";

/**
 * Collection of standardized common error responses
 *
 * This constant maps each common error response code to its corresponding
 * standardized error response object. The responses include HTTP status codes,
 * error codes, and human-readable messages.
 *
 * Key features:
 * - Standardized error response format following the ErrorResponse interface
 * - Comprehensive coverage of common error scenarios
 * - Organized by HTTP status code (400, 401, 403, 404, 500)
 * - Includes specialized errors for ID validation, file operations, and general errors
 * - Human-readable error messages suitable for end-users
 *
 * The error responses are organized into categories based on HTTP status codes:
 * - 400 Bad Request: Client errors related to invalid input or request format
 * - 401 Unauthorized: Authentication failures
 * - 403 Forbidden: Access denied due to insufficient permissions
 * - 404 Not Found: Resource not found errors
 * - 500 Internal Server Error: Server-side errors
 *
 * The object is organized by error code, with each code mapping to an ErrorResponse
 * object that follows the standardized format defined by the ErrorResponse interface.
 *
 * @example
 * ```typescript
 * // Using an error response in an exception
 * import { Errors } from '@hichchi/nest-connector';
 * import { BadRequestException } from '@nestjs/common';
 *
 * // In a service method
 * if (!id) {
 *   throw new BadRequestException(Errors.ERROR_400_EMPTY_ID);
 * }
 * ```
 *
 * @example
 * ```typescript
 * // Using an error response in a custom exception filter
 * import { Errors } from '@hichchi/nest-connector';
 * import { ExceptionFilter, Catch, ArgumentsHost, NotFoundException } from '@nestjs/common';
 *
 * @Catch(NotFoundException)
 * export class NotFoundExceptionFilter implements ExceptionFilter {
 *   catch(exception: NotFoundException, host: ArgumentsHost) {
 *     const response = host.switchToHttp().getResponse();
 *     const status = exception.getStatus();
 *
 *     // Use a standard error response
 *     response
 *       .status(status)
 *       .json(Errors.ERROR_404);
 *   }
 * }
 * ```
 *
 * @type {{ [key in CommonErrorResponseCode]: ErrorResponse }}
 *
 * @see {@link CommonErrorResponseCode} For all available error codes
 * @see {@link ErrorResponse} For the structure of error response objects
 * @see {@link HttpClientErrorStatus} For client error HTTP status codes
 * @see {@link HttpServerErrorStatus} For server error HTTP status codes
 */
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
