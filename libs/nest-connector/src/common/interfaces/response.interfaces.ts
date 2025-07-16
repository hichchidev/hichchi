import { HttpClientErrorStatus, HttpServerErrorStatus, HttpSuccessStatus } from "../enums";
import { ErrorResponseCode, HttpStatus, ResponseCode, SuccessResponseCode } from "../types";

/**
 * Base interface for all HTTP responses in the application.
 *
 * The `HttpResponse` interface defines the standard structure for API responses
 * throughout the application. It ensures a consistent response format that includes
 * status information, a specific response code, and descriptive messages.
 *
 * This standardized format makes it easier for clients to process responses and
 * handle different scenarios (success, error, etc.) in a consistent manner.
 *
 * @interface HttpResponse
 *
 * @see {@link SuccessResponse} For successful operation responses
 * @see {@link ErrorResponse} For error operation responses
 * @see {@link ResponseCode} Type for response status codes
 * @see {@link HttpStatus} HTTP status codes enumeration
 */
export interface HttpResponse {
    /**
     * The HTTP status code for the response.
     *
     * This corresponds to standard HTTP status codes (200, 400, 500, etc.)
     * and provides a quick way for clients to determine the general category
     * of the response (success, client error, server error).
     *
     * @see {@link HttpStatus} Type for HTTP status codes
     * @see {@link HttpSuccessStatus} Enum for success status codes
     * @see {@link HttpClientErrorStatus} Enum for client error status codes
     * @see {@link HttpServerErrorStatus} Enum for server error status codes
     */
    statusCode: HttpStatus;

    /**
     * Application-specific response code.
     *
     * This code provides more detailed information about the specific result
     * of the operation beyond what the HTTP status code indicates. It allows
     * for fine-grained categorization of responses within each HTTP status category.
     *
     * @see {@link ResponseCode} Union type for all response codes
     * @see {@link SuccessResponseCode} Type for success response codes
     * @see {@link ErrorResponseCode} Type for error response codes
     */
    code: ResponseCode;

    /**
     * Human-readable message describing the response.
     *
     * This short message explains the result of the operation and is suitable
     * for displaying to end users. It should be clear, concise, and avoid
     * technical details that aren't relevant to users.
     */
    message: string;

    /**
     * Optional detailed description of the response.
     *
     * When provided, this field contains additional information about the response
     * that might be useful for debugging or logging purposes. Unlike the message field,
     * this can contain technical details and is primarily intended for developers
     * rather than end users.
     */
    description?: string;
}

/**
 * Interface for successful API responses that include data payload.
 *
 * The `SuccessResponse` interface extends the base `HttpResponse` interface to include
 * a data property containing the operation's result. This interface is used for all
 * successful API responses that need to return data to the client.
 *
 * The generic type parameter `T` allows for type-safe specification of the data structure
 * being returned, ensuring consistency between backend definitions and frontend expectations.
 *
 * @interface SuccessResponse
 * @extends HttpResponse Base response structure
 *
 * @see {@link HttpResponse} Base interface for all responses
 */
export interface SuccessResponse extends HttpResponse {
    /**
     * The HTTP status code, which will be a success code (2xx).
     *
     * For successful responses, this will typically be:
     * - 200 (OK) for general success
     * - 201 (Created) when a resource was successfully created
     * - 204 (No Content) when an operation succeeded but returns no data
     *
     * @see {@link HttpSuccessStatus} Enum of available success status codes
     */
    statusCode: HttpSuccessStatus;

    /**
     * Application-specific success code.
     *
     * This provides more granular information about the specific success case,
     * allowing clients to handle different success scenarios distinctly if needed.
     *
     * @see {@link SuccessResponseCode} Type for success response codes
     */
    code: SuccessResponseCode;
}

/**
 * Interface for error API responses that include error details.
 *
 * The `ErrorResponse` interface extends the base `HttpResponse` interface to standardize
 * error responses across the application. It includes properties for error identification,
 * detailed error information, and optionally the original error object for debugging.
 *
 * This structured approach to error responses makes it easier for clients to handle
 * errors in a consistent way and for developers to debug issues in the system.
 *
 * @interface ErrorResponse
 * @extends HttpResponse Base response structure
 *
 * @see {@link HttpResponse} Base interface for all responses
 * @see {@link HttpClientErrorStatus} Client error HTTP status codes
 * @see {@link HttpServerErrorStatus} Server error HTTP status codes
 * @see {@link ErrorResponseCode} Application-specific error codes
 */
export interface ErrorResponse extends HttpResponse {
    /**
     * The HTTP status code, which will be an error code (4xx or 5xx).
     *
     * For error responses, this will typically be:
     * - 4xx range for client errors (e.g., 400 Bad Request, 404 Not Found)
     * - 5xx range for server errors (e.g., 500 Internal Server Error)
     *
     * @see {@link HttpClientErrorStatus} Enum of client error status codes
     * @see {@link HttpServerErrorStatus} Enum of server error status codes
     */
    statusCode: HttpClientErrorStatus | HttpServerErrorStatus;

    /**
     * Application-specific error code.
     *
     * This provides more granular information about the specific error case,
     * allowing clients to handle different error scenarios distinctly.
     *
     * @see {@link ErrorResponseCode} Type for error response codes
     */
    code: ErrorResponseCode;
}
