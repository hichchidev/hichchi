/**
 * Represents a parameter that can be passed to a log method
 *
 * This type encompasses all possible parameter types that can be passed to
 * logging methods. It allows for flexible logging of various data types.
 *
 * @example
 * ```typescript
 * // Examples of valid LogParam values
 * logger.log("Simple string message");
 * logger.log(123);
 * logger.log(true);
 * logger.log({ userId: 123, action: "login" });
 * logger.log(new Error("Something went wrong"));
 * logger.log(null);
 * ```
 *
 * @see {@link LoggerService} Service that accepts these parameters in log methods
 * @see {@link formatMessage} Function that formats these parameters into strings
 */
export type LogParam = string | number | boolean | object | Error | null | undefined | unknown;
