// noinspection JSUnusedGlobalSymbols

import {
    HttpClientErrorStatus,
    HttpInfoStatus,
    HttpRedirectionStatus,
    HttpServerErrorStatus,
    HttpSuccessStatus,
} from "../enums";

/**
 * Represents a strongly-typed unique identifier for a file.
 *
 * This type is a branded string, ensuring that only valid `FileId`
 * values can be assigned or passed to functions expecting this type.
 * This provides additional type safety by preventing ordinary strings
 * from being used where FileId values are expected.
 *
 * The `__brand` property is used for type checking only and does not exist
 * on the runtime value - it's just a TypeScript type system feature.
 *
 * @example
 * ```typescript
 * // Creating a FileId (typically done inside a validated factory function)
 * function validateAndCreateFileId(id: string): FileId {
 *   // Validation logic here
 *   return id as FileId;
 * }
 *
 * // Using the type in a function signature
 * function getFileDetails(fileId: FileId) {
 *   // Function can trust that fileId is valid
 * }
 * ```
 *
 * @see {@link EntityId} Generic entity identifier type
 */
export type FileId = string & { readonly __brand: unique symbol };

/**
 * Represents a type alias `WsRefId` which is either a branded string or the literal string "system".
 *
 * A branded string is a specific type of string that has been augmented with the `__brand` unique symbol.
 * This branding is used to provide stronger type safety and to differentiate the string from other generic strings.
 *
 * The literal string `"system"` is included as an alternative value.
 */
export type WsRefId = (string & { readonly __brand: unique symbol }) | "system";

/**
 * Represents a strongly-typed socket identifier for WebSocket connections.
 *
 * The `SocketId` type is a branded string type that ensures socket identifiers
 * are treated as a distinct type from regular strings. This provides type safety
 * by preventing arbitrary strings from being used where socket IDs are expected.
 *
 * This type is typically used in WebSocket services and connection management
 * to uniquely identify and track active socket connections.
 *
 * @example
 * ```typescript
 * // Creating a SocketId (typically done by a socket manager)
 * function createSocketId(rawId: string): SocketId {
 *   return rawId as SocketId;
 * }
 *
 * // Using in a connection manager
 * class SocketConnectionManager {
 *   private connections = new Map<SocketId, WebSocket>();
 *
 *   addConnection(socketId: SocketId, socket: WebSocket) {
 *     this.connections.set(socketId, socket);
 *   }
 * }
 * ```
 */
export type SocketId = string & { readonly __brand: unique symbol };

/**
 * Comprehensive HTTP status code type.
 *
 * The `HttpStatus` type is a union of all HTTP status code categories defined in the HTTP
 * specification. It provides a complete and type-safe representation of all possible
 * HTTP status codes that can be used in API responses.
 *
 * This type is used throughout the application to ensure consistency and type safety
 * when working with HTTP status codes in controllers, interceptors, and response handlers.
 *
 * @see {@link HttpInfoStatus} Informational status codes (1xx)
 * @see {@link HttpSuccessStatus} Success status codes (2xx)
 * @see {@link HttpRedirectionStatus} Redirection status codes (3xx)
 * @see {@link HttpClientErrorStatus} Client error status codes (4xx)
 * @see {@link HttpServerErrorStatus} Server error status codes (5xx)
 * @see {@link HttpResponse} Base interface for HTTP responses
 */
export type HttpStatus =
    | HttpInfoStatus
    | HttpSuccessStatus
    | HttpRedirectionStatus
    | HttpClientErrorStatus
    | HttpServerErrorStatus;
