/**
 * Common Error Response Codes Enum
 *
 * This enum defines general-purpose error response codes that can be used across different
 * services and modules in the application. Each code represents a specific error condition
 * related to common operations such as data validation, resource access, and file operations.
 *
 * The naming convention includes HTTP status codes (e.g., 400, 404, 500) for clarity, with
 * the prefix "ERROR_" to distinguish them as error codes.
 *
 * Enum Values are organized by HTTP status categories:
 * - `400` series: Client errors (Bad Request, Unauthorized, Forbidden, Not Found)
 * - `500` series: Server errors (Internal Server Error)
 * - Generic errors without specific status codes
 */
export enum CommonErrorResponseCode {
    /**
     * Empty ID error (400 Bad Request)
     *
     * Occurs when an ID field is required but not provided or is empty.
     */
    ERROR_400_EMPTY_ID = "ERROR_400_EMPTY_ID",

    /**
     * Empty IDs array error (400 Bad Request)
     *
     * Occurs when an array of IDs is required but not provided or is empty.
     */
    ERROR_400_EMPTY_IDS = "ERROR_400_EMPTY_IDS",

    /**
     * Invalid ID format or value (400 Bad Request)
     *
     * Occurs when an ID is provided but has an invalid format or value.
     */
    ERROR_400_INVALID_ID = "ERROR_400_INVALID_ID",

    /**
     * Invalid IDs array (400 Bad Request)
     *
     * Occurs when an array of IDs contains one or more invalid entries.
     */
    ERROR_400_INVALID_IDS = "ERROR_400_INVALID_IDS",

    /**
     * Invalid UUID format (400 Bad Request)
     *
     * Occurs when a provided UUID doesn't conform to the required format.
     */
    ERROR_400_INVALID_UUID = "ERROR_400_INVALID_UUID",

    /**
     * Not an array of IDs (400 Bad Request)
     *
     * Occurs when a parameter expected to be an array of IDs is of the wrong type.
     */
    ERROR_400_NOT_ID_ARRAY = "ERROR_400_NOT_ID_ARRAY",

    /**
     * File not found (404 Not Found)
     *
     * Occurs when attempting to access a file that doesn't exist.
     */
    ERROR_404_FILE_NOT_EXIST = "ERROR_404_FILE_NOT_EXIST",

    /**
     * Feature not implemented (404 Not Found)
     *
     * Occurs when attempting to use a feature or endpoint that is not yet implemented.
     * Note: While HTTP 501 is traditionally used for this, this uses 404 for specific cases.
     */
    ERROR_404_NOT_IMPLEMENTED = "ERROR_404_NOT_IMPLEMENTED",

    /**
     * File upload error (500 Internal Server Error)
     *
     * Occurs when there is a server-side error during file upload processing.
     */
    ERROR_500_FILE_UPLOAD = "ERROR_500_FILE_UPLOAD",

    /**
     * File deletion error (500 Internal Server Error)
     *
     * Occurs when there is a server-side error during file deletion.
     */
    ERROR_500_FILE_DELETE = "ERROR_500_FILE_DELETE",

    /**
     * Generic bad request error (400 Bad Request)
     *
     * Generic error for bad requests when a more specific error code is not applicable.
     */
    ERROR_400 = "ERROR_400",

    /**
     * Generic unauthorized error (401 Unauthorized)
     *
     * Generic error for unauthorized access when a more specific error code is not applicable.
     */
    ERROR_401 = "ERROR_401",

    /**
     * Generic forbidden error (403 Forbidden)
     *
     * Generic error for forbidden access when a more specific error code is not applicable.
     */
    ERROR_403 = "ERROR_403",

    /**
     * Generic not found error (404 Not Found)
     *
     * Generic error for resource not found when a more specific error code is not applicable.
     */
    ERROR_404 = "ERROR_404",

    /**
     * Generic server error (500 Internal Server Error)
     *
     * Generic error for server-side issues when a more specific error code is not applicable.
     */
    ERROR_500 = "ERROR_500",

    /**
     * Generic unspecified error
     *
     * Most general error code for cases where the specific error type cannot be determined
     * or doesn't fit into any other category.
     */
    ERROR = "ERROR",
}
