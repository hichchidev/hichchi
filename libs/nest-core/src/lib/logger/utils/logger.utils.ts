/* eslint-disable @typescript-eslint/no-magic-numbers,@typescript-eslint/no-inferrable-types */
// noinspection JSUnusedGlobalSymbols

import { format } from "winston";
import { inspect } from "util";
import { Format, TransformableInfo } from "logform";
import { ColorScheme, InfoObject, LogEntry, NestLikeFormatOptions } from "../interfaces";
import safeStringify from "fast-safe-stringify";
import { LogLevel } from "../enums/log-level.enum";

/**
 * Collection of ANSI color functions for terminal output
 *
 * This object provides methods to colorize text for console output using ANSI color codes.
 * Each method takes a string and returns the same string wrapped with the appropriate color codes.
 *
 * @example
 * ```typescript
 * console.log(clc.red("This text will be red"));
 * console.log(clc.blue("This text will be blue"));
 * console.log(clc.bold(clc.green("This text will be bold and green")));
 * ```
 *
 * @see {@link Colorizer} Interface defining the function signature
 * @see {@link colorScheme} Color scheme that uses these functions
 */
export const clc = {
    bold: (text: string): string => `\x1B[1m${text}\x1B[39m`,
    white: (text: string): string => `\x1B[37m${text}\x1B[39m`,
    blue: (text: string): string => `\x1B[34m${text}\x1B[39m`,
    green: (text: string): string => `\x1B[32m${text}\x1B[39m`,
    yellow: (text: string): string => `\x1B[33m${text}\x1B[39m`,
    red: (text: string): string => `\x1B[31m${text}\x1B[39m`,
    redBright: (text: string): string => `\x1B[91m${text}\x1B[39m`,
    magentaBright: (text: string): string => `\x1B[95m${text}\x1B[39m`,
    cyan: (text: string): string => `\x1B[36m${text}\x1B[39m`,
    cyanBright: (text: string): string => `\x1B[96m${text}\x1B[39m`,
};

/**
 * Default color scheme for log levels
 *
 * This object maps each log level to a specific color function.
 * It's used to colorize log level indicators in the console output.
 *
 * @example
 * ```typescript
 * // Get the color function for a specific log level
 * const levelColor = colorScheme["info"];
 * console.log(levelColor("INFO"));  // Will be blue
 * ```
 *
 * @see {@link ColorScheme} Interface defining the structure
 * @see {@link LogLevel} Type defining the possible log levels
 * @see {@link clc} Object containing the color functions
 */
export const colorScheme: ColorScheme = {
    [LogLevel.VERBOSE]: clc.cyanBright,
    [LogLevel.DEBUG]: clc.magentaBright,
    [LogLevel.INFO]: clc.blue,
    [LogLevel.LOG]: clc.green,
    [LogLevel.WARN]: clc.yellow,
    [LogLevel.ERROR]: clc.red,
    [LogLevel.FATAL]: clc.redBright,
};

/**
 * Default options for NestJS-like console format
 *
 * This object defines the default formatting options for console output.
 * These options control which elements are displayed in log messages and how they're formatted.
 *
 * @example
 * ```typescript
 * // Use default options with one override
 * const options = { ...defaultOptions, colors: false };
 * ```
 *
 * @see {@link NestLikeFormatOptions} Interface defining these options
 * @see {@link consoleFormat} Function that uses these options
 * @see {@link LoggerOptions} Related logger configuration options
 */
export const defaultOptions: Required<NestLikeFormatOptions> = {
    colors: !process.env["NO_COLOR"],
    prettyPrint: true,
    processId: true,
    appName: true,
    stack: true,
    meta: true,
};

/**
 * Check if a string is valid JSON
 *
 * This function attempts to parse a string as JSON and checks if it contains
 * at least one property. It's used to determine if a string should be treated
 * as JSON for formatting purposes.
 *
 * @example
 * ```typescript
 * // Check if a string is valid JSON
 * if (isJson('{"name":"John","age":30}')) {
 *   console.log("Valid JSON");
 * }
 * ```
 *
 * @param {unknown} data The string to check
 * @returns {boolean} True if the string is valid JSON, false otherwise
 *
 * @see {@link consoleFormat} Function that uses this to format log output
 */
export const isJson = (data: unknown): boolean => {
    try {
        return Boolean(Object.values(JSON.parse(data as string) as object).length);
    } catch {
        return false;
    }
};

/**
 * Creates a Winston format that mimics NestJS's default logger format
 *
 * This function creates a custom Winston format that produces log output
 * similar to NestJS's default logger. It supports colorization, pretty-printing,
 * and various display options.
 *
 * @example
 * ```typescript
 * // Create a Winston logger with NestJS-like format
 * const logger = createLogger({
 *   transports: [
 *     new winston.transports.Console({
 *       format: format.combine(
 *         format.timestamp(),
 *         consoleFormat("MyApp", { colors: true, prettyPrint: true })
 *       )
 *     })
 *   ]
 * });
 * ```
 *
 * @param {string} [appName="HICHCHI"] The name of the application to display in logs
 * @param {NestLikeFormatOptions} options Formatting options to customize the output
 * @returns {Format} A Winston format function that can be used with format.combine()
 *
 * @see {@link NestLikeFormatOptions} Interface defining the formatting options
 * @see {@link defaultOptions} Default values for the formatting options
 * @see {@link LoggerService} Service that uses this format
 */
export function consoleFormat(appName: string = "HICHCHI", options: NestLikeFormatOptions = {}): Format {
    const formatOptions = { ...defaultOptions, ...options };

    return format.printf(info => {
        let {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            level,
            context,
            logLevel,
            timestamp,
            message,
            ms,
            error,
            ...meta
        } = info as TransformableInfo & LogEntry & InfoObject;

        const { message: errorMessage, stack, ...errorInfo } = error || {};

        if (typeof timestamp !== "undefined") {
            try {
                // Try to format the timestamp if it's an ISO string
                if (timestamp === new Date(timestamp).toISOString()) {
                    timestamp = new Date(timestamp).toLocaleString();
                }
            } catch {
                // ignore parsing errors
            }
        }

        const color =
            (formatOptions.colors && colorScheme[logLevel || LogLevel.LOG]) || ((text: string): string => text);
        const yellow = formatOptions.colors ? clc.yellow : (text: string): string => text;

        const stringifiedMeta = safeStringify({ ...(meta || {}), ...(errorInfo || {}) });
        let formattedMeta: string = formatOptions.prettyPrint
            ? inspect(JSON.parse(stringifiedMeta), {
                  colors: formatOptions.colors,
                  depth: null,
              })
            : stringifiedMeta;

        formattedMeta = stack
            ? /\n/.exec(formattedMeta)
                ? formattedMeta.replace(/^\{/, "    {").replace(/\n/g, "\n    ")
                : "    " + formattedMeta
            : "\n" + formattedMeta;

        const formattedStack = stack?.replace(
            /((at\s+)(\w+\s)?(\S+)(\s+\()([^)]+)(\)))|(at\s+)(\S+)/g,
            (
                _: string,
                __: string,
                at: string,
                modifier: string,
                ctx: string,
                obr: string,
                path: string,
                cbr: string,
                at2: string,
                path2: string,
            ) => {
                return (
                    `${clc.white(at || "")}` +
                    `${clc.yellow(modifier || "")}` +
                    `${clc.yellow(ctx || "")}` +
                    `${clc.white(obr || "")}` +
                    `${clc.white(path || "")}` +
                    `${clc.white(cbr || "")}` +
                    `${clc.white(at2 || "")}` +
                    `${clc.white(path2 || "")}`
                );
            },
        );

        if (errorMessage && message !== errorMessage) {
            message = message?.replace(errorMessage, "");
        }

        return (
            (formatOptions.appName ? color(`[${appName}]`) + " " : "") +
            (formatOptions.processId ? color(String(process.pid)).padEnd(6) + " " : "") +
            (typeof timestamp !== "undefined" ? `${timestamp} ` : "") +
            `${color(LogLevel[logLevel || LogLevel.LOG].toUpperCase().padStart(7))} ` +
            (typeof context !== "undefined" ? `${yellow("[" + context + "]")}` : "") +
            (typeof message !== "undefined" ? ` ${message?.includes("\x1B") ? message : color(message)}` : "") +
            (formattedStack ? `\n${formattedStack}\n` : "") +
            (formatOptions.meta && formattedMeta && !/\{}/.exec(formattedMeta) ? `${formattedMeta}` : "") +
            (typeof ms !== "undefined" ? ` ${yellow(ms)}` : "")
        );
    });
}

/**
 * Creates a Winston format for error logs in JSON files
 *
 * This function creates a custom Winston format specifically designed for
 * error logs that will be written to JSON files. It processes error objects
 * to create a structured JSON representation with properly formatted stack traces
 * and error details.
 *
 * Features:
 * - Captures full error stack traces
 * - Formats error objects into a structured JSON format
 * - Separates error message from the main log message
 * - Splits stack traces into arrays for better readability
 *
 * @example
 * ```typescript
 * // Create a file transport with error file format
 * const fileTransport = new winston.transports.File({
 *   filename: 'errors.json',
 *   level: 'error',
 *   format: format.combine(
 *     format.timestamp(),
 *     errorFileFormat()
 *   )
 * });
 * ```
 *
 * @returns {Format} A Winston format function that can be used with format.combine()
 *
 * @see {@link JsonArrayFileTransport} Transport that uses this format
 * @see {@link LoggerService} Service that configures transports with this format
 * @see {@link consoleFormat} Related format function for console output
 */
export function errorFileFormat(): Format {
    return format.combine(
        format.errors({ stack: true }),
        format.json({
            // Add or modify fields in the JSON output
            replacer: (key, value: unknown) => {
                if (value) {
                    let { timestamp, message, context, logLevel, level, error } = value as LogEntry & InfoObject;

                    const { name, message: errorMessage, stack } = error || {};

                    if (errorMessage && message !== errorMessage) {
                        message = message?.replace(errorMessage, "");
                    }

                    if (key === "") {
                        return {
                            timestamp,
                            message,
                            context,
                            customLogLevel: logLevel,
                            level,
                            error: {
                                ...error,
                                name,
                                message: errorMessage,
                                stack: stack?.split(/\n\s+/),
                            },
                        };
                    }
                }
                return value;
            },
        }),
    );
}
/**
 * Colorize an object for console output
 *
 * This function uses Node.js's util.inspect to create a colorized string
 * representation of any object. It's useful for debugging complex objects.
 *
 * @example
 * ```typescript
 * // Colorize a complex object for console output
 * const user = { id: 123, name: "John", roles: ["admin", "user"] };
 * console.log(colorize(user));
 * ```
 *
 * @param {unknown} obj The object to colorize
 * @returns {string} A colorized string representation of the object
 *
 * @see {@link formatMessage} Related function for formatting log messages
 * @see {@link consoleFormat} Function that formats log output
 */
export function colorize(obj: unknown): string {
    return inspect(obj, { colors: true, breakLength: 150 });
}

/**
 * Convert any value to a string in a meaningful way
 *
 * This function converts any value to a string representation that is
 * suitable for logging. It handles different types appropriately:
 * - Primitives are converted to strings
 * - Errors have their message extracted
 * - Objects are JSON stringified
 * - Complex objects with circular references are inspected
 *
 * @example
 * ```typescript
 * // Format different types of values
 * console.log(formatMessage("Hello"));           // "Hello"
 * console.log(formatMessage(123));               // "123"
 * console.log(formatMessage(new Error("Oops"))); // "Oops"
 * console.log(formatMessage({ name: "John" }));  // "{"name":"John"}"
 * ```
 *
 * @param {unknown} value The value to convert to a string
 * @returns {string} A string representation of the value
 *
 * @see {@link LogParam} Type defining possible parameter types
 * @see {@link LoggerService} Service that uses this function
 */
export function formatMessage(value: unknown): string {
    if (value === undefined) {
        return "undefined";
    }

    if (value === null) {
        return "null";
    }

    if (typeof value === "string") {
        return value;
    }

    if (typeof value === "number" || typeof value === "boolean" || typeof value === "bigint") {
        return value.toString();
    }

    if (value instanceof Error) {
        return value.message;
    }

    if (typeof value === "object") {
        try {
            return JSON.stringify(value);
        } catch {
            // Handle circular references
            return inspect(value, { depth: 2, breakLength: Infinity });
        }
    }

    // Fallback for any other type
    return String(value);
}
