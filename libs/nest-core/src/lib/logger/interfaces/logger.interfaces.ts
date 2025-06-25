import { LogLevel } from "../enums/log-level.enum";

/**
 * Logger configuration options
 *
 * This interface defines the configuration options for the logger service.
 * It allows customization of log appearance, output format, and file paths.
 *
 * @example
 * ```typescript
 * // Configure the logger with custom options
 * LoggerService.configure({
 *   appName: "MyApp",
 *   level: "debug",
 *   logsDir: "custom/logs/path",
 *   colors: true,
 *   prettyPrint: true
 * });
 * ```
 *
 * @see {@link LoggerService} The service that uses these options
 * @see {@link LoggerService.configure} Method to set these options
 * @see {@link LoggerService.defaultOptions} Default values for these options
 */
export interface LoggerOptions {
    /**
     * Application name to display in logs
     */
    appName?: string;

    /**
     * Log level
     */
    level?: LogLevel;

    /**
     * Path to the logs directory
     */
    logsDir?: string;

    /**
     * Filename for error logs
     */
    errorLogFilename?: string;

    /**
     * Whether to use colors in console output
     */
    colors?: boolean;

    /**
     * Whether to pretty-print objects in logs
     */
    prettyPrint?: boolean;

    /**
     * Whether to display process ID in logs
     */
    processId?: boolean;

    /**
     * Whether to display application name in logs
     */
    showAppName?: boolean;

    /**
     * Whether to display stack traces in logs
     */
    stack?: boolean;

    /**
     * Whether to display metadata in logs
     */
    meta?: boolean;

    /**
     * Format for timestamps
     */
    timestampFormat?: string;
}

/**
 * Represents metadata that can be attached to a log entry
 *
 * This interface defines the structure of metadata objects that can be
 * attached to log entries. It includes optional error information and
 * custom log level, plus any additional key-value pairs.
 *
 * @example
 * ```typescript
 * // Create metadata for a log entry
 * const metadata: InfoObject = {
 *   customLogLevel: "debug",
 *   userId: "123",
 *   requestId: "abc-456",
 *   error: { name: "ValidationError", stack: "..." }
 * };
 * ```
 *
 * @see {@link LoggerService.prepareLogParams} Method that processes metadata
 * @see {@link LogLevel} Type defining possible log levels
 * @see {@link LogEntry} The log entry that this metadata is attached to
 */
export interface InfoObject {
    logLevel: LogLevel;
    error?: { message?: string; name?: string; stack?: string };
    [key: string]: unknown;
}

/**
 * Represents a log entry
 *
 * This interface defines the structure of a log entry in the system.
 * It includes the log level, message, context, timestamp, and duration,
 * plus any additional properties.
 *
 * @example
 * ```typescript
 * // A typical log entry
 * const entry: LogEntry = {
 *   level: "info",
 *   message: "User logged in",
 *   context: "AuthService",
 *   timestamp: "2023-05-15 14:30:45",
 *   ms: "25ms"
 * };
 * ```
 *
 * @see {@link LoggerService} Service that creates log entries
 * @see {@link InfoObject} Metadata that can be attached to log entries
 * @see {@link consoleFormat} Function that formats log entries for display
 */
export interface LogEntry {
    level: string;
    message?: string;
    context?: string;
    timestamp?: string;
    ms?: string;
    [key: string]: unknown;
}

/**
 * Function that colorizes text
 *
 * This interface defines a function type that applies ANSI color codes
 * to text strings for terminal output.
 *
 * @example
 * ```typescript
 * // Define a colorizer function
 * const redColorizer: Colorizer = (text) => `\x1B[31m${text}\x1B[39m`;
 *
 * // Use the colorizer
 * console.log(redColorizer("This text will be red"));
 * ```
 *
 * @see {@link ColorScheme} Collection of colorizers for different log levels
 * @see {@link clc} Object containing predefined colorizer functions
 */
export interface Colorizer {
    (text: string): string;
}

/**
 * Color scheme for different log levels
 *
 * This interface defines a mapping of log levels to colorizer functions,
 * allowing different log levels to be displayed in different colors.
 *
 * @example
 * ```typescript
 * // Define a custom color scheme
 * const myColorScheme: ColorScheme = {
 *   info: clc.blue,
 *   warn: clc.yellow,
 *   error: clc.red,
 *   debug: clc.magentaBright
 * };
 * ```
 *
 * @see {@link Colorizer} Function type for colorizing text
 * @see {@link colorScheme} Default color scheme used by the logger
 * @see {@link LogLevel} Type defining possible log levels
 */
export interface ColorScheme {
    [level: string]: Colorizer;
}

/**
 * Options for NestJS-like console format
 *
 * This interface defines options for formatting log output in a style
 * similar to NestJS's default logger.
 *
 * @example
 * ```typescript
 * // Configure console format options
 * const formatOptions: NestLikeFormatOptions = {
 *   colors: true,
 *   prettyPrint: true,
 *   processId: true,
 *   appName: true,
 *   stack: true,
 *   meta: false
 * };
 * ```
 *
 * @see {@link consoleFormat} Function that uses these options
 * @see {@link defaultOptions} Default values for these options
 * @see {@link LoggerOptions} Related logger configuration options
 */
export interface NestLikeFormatOptions {
    colors?: boolean;
    prettyPrint?: boolean;
    processId?: boolean;
    appName?: boolean;
    stack?: boolean;
    meta?: boolean;
}
