// noinspection JSUnusedGlobalSymbols

import { HttpSuccessStatus } from "../enums";
import { SuccessResponses } from "../responses";
import { SuccessResponse } from "../interfaces";
import { LooseAutocomplete } from "@hichchi/utils";
import { AuthSuccessResponseCode } from "../../auth";

/**
 * Data Transfer Object for standardized success responses
 *
 * This class provides a standardized way to create success response objects
 * for API endpoints. It implements the SuccessResponse interface and ensures
 * that all required properties are properly set with appropriate default values.
 *
 * Key features:
 * - Flexible constructor that accepts either individual parameters or a complete response object
 * - Default values for all properties if not explicitly provided
 * - Type-safe response code handling with autocomplete support
 * - Consistent structure for all success responses across the application
 *
 * The class is designed to be used in controllers and services to return
 * standardized success responses to API clients.
 *
 * @example
 * ```typescript
 * // Creating a success response with custom message
 * @Post()
 * createUser(@Body() createUserDto: CreateUserDto): SuccessResponseDto {
 *   this.userService.create(createUserDto);
 *   return new SuccessResponseDto("User created successfully");
 * }
 * ```
 *
 * @example
 * ```typescript
 * // Creating a success response from an existing response object
 * @Get()
 * getUsers(): SuccessResponseDto {
 *   const users = this.userService.findAll();
 *   const response = {
 *     statusCode: HttpSuccessStatus.OK,
 *     code: "USERS_RETRIEVED",
 *     message: "Users retrieved successfully",
 *     data: users
 *   };
 *   return new SuccessResponseDto(response);
 * }
 * ```
 *
 * @see {@link SuccessResponse} The interface this class implements
 * @see {@link HttpSuccessStatus} Enum of HTTP success status codes
 * @see {@link SuccessResponses} Predefined success response templates
 */
export class SuccessResponseDto implements SuccessResponse {
    /**
     * HTTP status code for the success response
     *
     * This property holds the HTTP status code that should be returned to the client.
     * It uses the HttpSuccessStatus enum to ensure only valid success status codes are used.
     *
     * @see {@link HttpSuccessStatus} For available status codes
     */
    statusCode: HttpSuccessStatus;

    /**
     * Unique code identifying the success response type
     *
     * This property holds a string code that identifies the specific type of success.
     * It uses LooseAutocomplete to provide type suggestions from AuthSuccessResponseCode
     * while still allowing custom string values.
     *
     * @see {@link AuthSuccessResponseCode} For predefined success codes
     */
    code: LooseAutocomplete<AuthSuccessResponseCode>;

    /**
     * Human-readable success message
     *
     * This property contains a user-friendly message describing the success result.
     * It should be clear, concise, and suitable for displaying to end users.
     */
    message: string;

    /**
     * Optional detailed description of the success result
     *
     * This property can contain additional information about the success result
     * that might be useful for debugging or providing more context to developers.
     */
    description?: string;

    /**
     * Creates a new success response with individual parameters
     *
     * This constructor overload allows creating a success response by specifying
     * individual properties. Any properties not provided will use default values
     * from SuccessResponses.SUCCESS.
     *
     * @param {string} [message] - Human-readable success message
     * @param {string} [code] - Unique code identifying the success type
     * @param {HttpSuccessStatus} [status] - HTTP status code for the response
     * @param {string} [description] - Optional detailed description
     *
     * @example
     * ```typescript
     * // Basic success response with just a message
     * const response = new SuccessResponseDto("Operation completed successfully");
     *
     * // Success response with custom code and status
     * const response = new SuccessResponseDto(
     *   "User created successfully",
     *   "USER_CREATED",
     *   HttpSuccessStatus.CREATED
     * );
     * ```
     */
    constructor(message?: string, code?: string, status?: HttpSuccessStatus, description?: string);

    /**
     * Creates a new success response from an existing response object
     *
     * This constructor overload allows creating a success response by providing
     * an existing SuccessResponse object. Any properties not provided in the
     * input object will use default values from SuccessResponses.SUCCESS.
     *
     * @param {SuccessResponse} response - Existing success response object
     *
     * @example
     * ```typescript
     * // Creating from an existing response object
     * const existingResponse = {
     *   statusCode: HttpSuccessStatus.OK,
     *   code: "DATA_RETRIEVED",
     *   message: "Data retrieved successfully"
     * };
     * const response = new SuccessResponseDto(existingResponse);
     * ```
     */
    constructor(response: SuccessResponse);

    /**
     * Implementation of the constructor
     *
     * This is the actual constructor implementation that handles both overloads.
     * It determines which overload was used based on the type of the first parameter
     * and sets the properties accordingly, using default values where needed.
     *
     * @param {string | SuccessResponse} [responseOrMessage] - Either a message string or a response object
     * @param {string} [code] - Unique code identifying the success type (used with message overload)
     * @param {HttpSuccessStatus} [status] - HTTP status code (used with message overload)
     * @param {string} [description] - Optional detailed description (used with message overload)
     */
    constructor(
        responseOrMessage?: string | SuccessResponse,
        code?: string,
        status?: HttpSuccessStatus,
        description?: string,
    ) {
        if (typeof responseOrMessage === "string") {
            this.code = code || "SUCCESS";
            this.message = responseOrMessage || SuccessResponses.SUCCESS.message;
            this.statusCode = status || SuccessResponses.SUCCESS.statusCode;
            this.description = description || SuccessResponses.SUCCESS.description;
        } else {
            this.code = responseOrMessage?.code || "SUCCESS";
            this.message = responseOrMessage?.message || SuccessResponses.SUCCESS.message;
            this.statusCode = responseOrMessage?.statusCode || SuccessResponses.SUCCESS.statusCode;
            this.description = responseOrMessage?.description || SuccessResponses.SUCCESS.description;
        }
    }
}
