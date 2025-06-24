/**
 * Common Success Response Codes Enum
 *
 * This enum defines general-purpose success response codes that can be used across different
 * services and modules in the application. Each code represents a specific success condition
 * for operations and requests.
 *
 * While HTTP status codes in the 2xx range (like 200 OK, 201 Created) provide a standardized
 * way to indicate success at the protocol level, these application-specific success codes
 * offer more granular information about the exact nature of the successful operation.
 *
 * Currently, this enum contains a single generic success code, but it can be extended
 * with more specific success codes as the application grows and more detailed success
 * states need to be communicated.
 */
export enum CommonSuccessResponseCode {
    /**
     * Generic success response
     *
     * Indicates that the requested operation completed successfully without any issues.
     * This is the most general success code and can be used when a more specific
     * success code is not necessary or has not been defined.
     */
    SUCCESS = "SUCCESS",
}
