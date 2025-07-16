/**
 * Default port number for the application server
 *
 * This constant defines the default port number that the application will listen on
 * when no port is specified in the configuration or environment variables. It serves
 * as a fallback value to ensure the application can start even without explicit port
 * configuration.
 *
 * The value is used in the hichchiBootstrap function as the last fallback in the
 * port resolution chain: config.port → process.env.PORT → DEFAULT_PORT
 *
 * @default 8080
 *
 * @example
 * ```typescript
 * // In app-bootstrapper.ts
 * const port = config.port || process.env["PORT"] || DEFAULT_PORT;
 * await app.listen(port);
 * ```
 *
 * @see {@link hichchiBootstrap} The bootstrap function that uses this constant
 */
export const DEFAULT_PORT = 8080;
