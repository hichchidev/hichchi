import { LooseAutocomplete } from "@hichchi/utils";
import { AuthErrorResponseCode, AuthSuccessResponseCode } from "../../auth/";
import { CommonSuccessResponseCode } from "../enums";

/**
 * Represents all possible response codes used throughout the application.
 *
 * The `ResponseCode` type is a union of all success and error response codes
 * from different modules in the system. It provides a centralized type for
 * all response codes, ensuring consistency and type safety when working with
 * API responses.
 *
 * The type uses `LooseAutocomplete` to provide IDE autocompletion while still
 * allowing for extensibility with string literals when needed (e.g., for module-specific
 * codes that may be added in the future).
 *
 * @type {LooseAutocomplete<CommonSuccessResponseCode | AuthSuccessResponseCode | AuthErrorResponseCode>}
 *
 * @see {@link SuccessResponseCode} Type for success response codes only
 * @see {@link ErrorResponseCode} Type for error response codes only
 * @see {@link HttpResponse} Base interface for HTTP responses
 */
export type ResponseCode = LooseAutocomplete<
    CommonSuccessResponseCode | AuthSuccessResponseCode | AuthErrorResponseCode
>;

/**
 * Represents all possible success response codes used throughout the application.
 *
 * The `SuccessResponseCode` type is a union of success response codes from different
 * modules in the system. It provides a centralized type for all success scenarios,
 * ensuring consistency and type safety when working with successful API responses.
 *
 * This type is used in the `SuccessResponse` interface to ensure that only valid
 * success codes are used when constructing responses.
 *
 * @type {LooseAutocomplete<CommonSuccessResponseCode | AuthSuccessResponseCode>}
 *
 * @see {@link ResponseCode} Type for all response codes
 * @see {@link CommonSuccessResponseCode} Common success response codes
 * @see {@link AuthSuccessResponseCode} Authentication-related success codes
 * @see {@link SuccessResponse} Interface for successful HTTP responses
 */
export type SuccessResponseCode = LooseAutocomplete<CommonSuccessResponseCode | AuthSuccessResponseCode>;

/**
 * Represents all possible error response codes used throughout the application.
 *
 * The `ErrorResponseCode` type is a union of error response codes from different
 * modules in the system. It provides a centralized type for all error scenarios,
 * ensuring consistency and type safety when working with error API responses.
 *
 * This type is used in the `ErrorResponse` interface to ensure that only valid
 * error codes are used when constructing error responses.
 *
 * @type {LooseAutocomplete<AuthErrorResponseCode>}
 *
 * @see {@link ResponseCode} Type for all response codes
 * @see {@link AuthErrorResponseCode} Authentication-related error codes
 * @see {@link ErrorResponse} Interface for error HTTP responses
 */
export type ErrorResponseCode = LooseAutocomplete<AuthErrorResponseCode>;
