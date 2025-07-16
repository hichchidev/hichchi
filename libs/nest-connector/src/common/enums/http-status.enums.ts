// noinspection JSUnusedGlobalSymbols

/**
 * HTTP Informational Status Codes (1xx)
 *
 * This enum defines the standard HTTP status codes in the 1xx range (Informational).
 * These status codes indicate a provisional response and require the client
 * to continue with the request or ignore the response if the request is already finished.
 *
 * The 1xx class of status codes represents preliminary information, indicating that
 * the request was received and is continuing to be processed.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#information_responses
 */
export enum HttpInfoStatus {
    CONTINUE = 100,
    SWITCHING_PROTOCOLS = 101,
    PROCESSING = 102,
    EARLYHINTS = 103,
}

/**
 * HTTP Success Status Codes (2xx)
 *
 * This enum defines the standard HTTP status codes in the 2xx range (Success).
 * These status codes indicate that the client's request was successfully received,
 * understood, and accepted.
 *
 * The 2xx class of status codes represents successful completion of the HTTP request,
 * with different codes indicating specific types of success such as resource creation,
 * accepted but not yet processed requests, or successful responses with no content.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#successful_responses
 */
export enum HttpSuccessStatus {
    OK = 200,
    CREATED = 201,
    ACCEPTED = 202,
    NON_AUTHORITATIVE_INFORMATION = 203,
    NO_CONTENT = 204,
    RESET_CONTENT = 205,
    PARTIAL_CONTENT = 206,
    MULTI_STATUS = 207,
    ALREADY_REPORTED = 208,
    CONTENT_DIFFERENT = 210,
}

/**
 * HTTP Redirection Status Codes (3xx)
 *
 * This enum defines the standard HTTP status codes in the 3xx range (Redirection).
 * These status codes indicate that further action needs to be taken by the client
 * in order to complete the request, typically involving following a redirect.
 *
 * The 3xx class of status codes indicates the client must take additional action
 * to complete the request, such as following a new URL or using a cached version.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#redirection_messages
 */
export enum HttpRedirectionStatus {
    MULTIPLE_CHOICES = 300,
    MOVED_PERMANENTLY = 301,
    FOUND = 302,
    SEE_OTHER = 303,
    NOT_MODIFIED = 304,
    USE_PROXY = 305,
    TEMPORARY_REDIRECT = 307,
    PERMANENT_REDIRECT = 308,
}

/**
 * HTTP Client Error Status Codes (4xx)
 *
 * This enum defines the standard HTTP status codes in the 4xx range (Client Error).
 * These status codes indicate that the client seems to have made an error in the request.
 *
 * The 4xx class of status codes is intended for situations in which the client
 * appears to have erred, such as sending invalid authentication credentials,
 * requesting a resource that doesn't exist, or submitting malformed data.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#client_error_responses
 */
export enum HttpClientErrorStatus {
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    PAYMENT_REQUIRED = 402,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    METHOD_NOT_ALLOWED = 405,
    NOT_ACCEPTABLE = 406,
    PROXY_AUTHENTICATION_REQUIRED = 407,
    REQUEST_TIMEOUT = 408,
    CONFLICT = 409,
    GONE = 410,
    LENGTH_REQUIRED = 411,
    PRECONDITION_FAILED = 412,
    PAYLOAD_TOO_LARGE = 413,
    URI_TOO_LONG = 414,
    UNSUPPORTED_MEDIA_TYPE = 415,
    RANGE_NOT_SATISFIABLE = 416,
    EXPECTATION_FAILED = 417,
    IM_A_TEAPOT = 418,
    MISDIRECTED_REQUEST = 421,
    UNPROCESSABLE_ENTITY = 422,
    LOCKED = 423,
    FAILED_DEPENDENCY = 424,
    TOO_EARLY = 425,
    UPGRADE_REQUIRED = 426,
    PRECONDITION_REQUIRED = 428,
    TOO_MANY_REQUESTS = 429,
    REQUEST_HEADER_FIELDS_TOO_LARGE = 431,
    UNAVAILABLE_FOR_LEGAL_REASONS = 451,
}

/**
 * HTTP Server Error Status Codes (5xx)
 *
 * This enum defines the standard HTTP status codes in the 5xx range (Server Error).
 * These status codes indicate that the server failed to fulfill a valid request.
 *
 * The 5xx class of status codes is intended for cases in which the server is aware
 * that it has encountered an error or is otherwise incapable of performing the
 * request. These errors are typically related to server configuration issues,
 * unexpected conditions, or temporary overloading.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#server_error_responses
 */
export enum HttpServerErrorStatus {
    INTERNAL_SERVER_ERROR = 500,
    NOT_IMPLEMENTED = 501,
    BAD_GATEWAY = 502,
    SERVICE_UNAVAILABLE = 503,
    GATEWAY_TIMEOUT = 504,
    HTTP_VERSION_NOT_SUPPORTED = 505,
    VARIANT_ALSO_NEGOTIATES = 506,
    INSUFFICIENT_STORAGE = 507,
    LOOP_DETECTED = 508,
    NOT_EXTENDED = 510,
    NETWORK_AUTHENTICATION_REQUIRED = 511,
}
