/* eslint-disable @typescript-eslint/no-magic-numbers,@typescript-eslint/no-unused-vars */
// noinspection JSUnusedGlobalSymbols

import { Injectable, LoggerService as NestLoggerService, Scope } from "@nestjs/common";
import * as winston from "winston";
import { createLogger, format, Logger as WinstonLogger } from "winston";
import * as path from "path";
import { existsSync, mkdirSync } from "fs";
import { consoleFormat, errorFileFormat, formatMessage } from "../utils";
import { InfoObject, LoggerOptions } from "../interfaces";
import { LogParam } from "../types";
import * as Transport from "winston-transport";
import { JsonArrayFileTransport } from "../transports";
import { LogLevel } from "../enums/log-level.enum";

/**
 * Advanced logger service for NestJS applications
 *
 * This service provides enhanced logging capabilities beyond the standard NestJS logger.
 * It implements the NestJS LoggerService interface and adds additional features:
 *
 * - Winston integration for powerful logging
 * - File-based logging for errors
 * - Colorized console output
 * - Context-aware logging
 * - Metadata support
 * - Static logging methods
 * - Configurable formatting
 *
 * The service can be used both as an instance (injected into components)
 * and statically (for use in non-injectable contexts).
 *
 * @example
 * ```typescript
 * // Using as an injectable service
 * @Injectable()
 * export class UserService {
 *   constructor(private logger: LoggerService) {
 *     this.logger.log('UserService initialized');
 *   }
 *
 *   findUser(id: string) {
 *     this.logger.debug(`Finding user with ID: ${id}`, 'UserService.findUser');
 *     // ...
 *   }
 * }
 * ```
 *
 * @example
 * ```typescript
 * // Using static methods
 * LoggerService.info('Application starting');
 * LoggerService.error(new Error('Something went wrong'), { userId: '123' }, 'AuthService');
 * ```
 *
 * @see {@link NestLoggerService} The NestJS interface this service implements
 * @see {@link LoggerOptions} Configuration options for this service
 * @see {@link LogParam} Types of parameters that can be logged
 */
@Injectable({ scope: Scope.TRANSIENT })
export class LoggerService implements NestLoggerService {
    private readonly context?: string;

    private readonly logger: WinstonLogger;

    private static instance: WinstonLogger;

    /**
     * Default logger options
     */
    private static readonly defaultOptions: LoggerOptions = {
        appName: "HICHCHI",
        level: LogLevel.LOG,
        logsDir: path.join(process.cwd(), "logs"),
        errorLogFilename: "errors.json",
        colors: true,
        prettyPrint: true,
        processId: true,
        showAppName: true,
        stack: true,
        meta: true,
        timestampFormat: "YYYY-MM-DD hh:mm:ss A",
    };

    /**
     * Current logger options
     */
    private static options: LoggerOptions = { ...LoggerService.defaultOptions };

    /**
     * Creates a new logger service instance
     *
     * @param {string} [context] Optional context name for this logger instance.
     *                          The context will be displayed in square brackets in log messages.
     *
     * @example
     * ```typescript
     * // Create a logger with a specific context
     * const logger = new LoggerService('UserService');
     * logger.log('User created'); // Will show [UserService] in the log
     * ```
     */
    constructor(context?: string) {
        this.context = context;
        this.logger = LoggerService.createWinstonLogger();
    }

    configure(options?: LoggerOptions): void {
        LoggerService.configure(options);
    }

    /**
     * Configure the logger with custom options
     *
     * This static method allows customizing the logger's behavior by providing
     * configuration options. It merges the provided options with the default ones.
     *
     * @example
     * ```typescript
     * // Configure the logger with custom options
     * LoggerService.configure({
     *   appName: "MyApp",
     *   level: "debug",
     *   colors: true,
     *   logsDir: "./custom-logs"
     * });
     * ```
     *
     * @param {LoggerOptions} [options] Optional Logger configuration options
     *
     * @see {@link LoggerOptions} Available configuration options
     * @see {@link defaultOptions} Default values for these options
     * @see {@link resetConfiguration} Method to reset to default configuration
     */
    static configure(options?: LoggerOptions): void {
        this.options = { ...this.defaultOptions, ...options };

        // Recreate the static logger instance with the new options
        if (this.instance) {
            this.instance = this.createWinstonLogger();
        }
    }

    /**
     * Creates a Winston logger instance with the current configuration
     *
     * This method creates a new Winston logger configured with console and file transports.
     * It ensures the logs directory exists and sets up formatting according to the options.
     *
     * @private
     * @param {LoggerOptions} [loggerOptions] Optional custom options to override the default ones
     * @returns {WinstonLogger} A configured Winston logger instance
     *
     * @see {@link LoggerOptions} Configuration options for the logger
     * @see {@link consoleFormat} Function used to format console output
     */
    private static createWinstonLogger(loggerOptions?: LoggerOptions): WinstonLogger {
        const options = loggerOptions || this.options;

        // Ensure logs directory exists
        const logsDir = options.logsDir || path.join(process.cwd(), "logs");
        if (!existsSync(logsDir)) {
            try {
                mkdirSync(logsDir, { recursive: true });
            } catch (error) {
                // eslint-disable-next-line no-console
                console.error("Failed to create logs directory:", error);
            }
        }

        const transports: Transport[] = [
            // Console transport with NestJS-like formatting
            new winston.transports.Console({
                format: format.combine(
                    format.timestamp({ format: options.timestampFormat || "YYYY-MM-DD hh:mm:ss A" }),
                    consoleFormat(options.appName || "HICHCHI", {
                        colors: options.colors,
                        prettyPrint: options.prettyPrint,
                        processId: options.processId,
                        appName: options.showAppName,
                        stack: options.stack,
                        meta: options.meta,
                    }),
                ),
            }),
        ];

        if (options.errorLogFilename) {
            transports.push(
                new JsonArrayFileTransport({
                    logsDir: options.logsDir,
                    filename: "errors-logs.json",
                    logLevel: LogLevel.ERROR,
                    format: format.combine(
                        format.timestamp({ format: options.timestampFormat || "YYYY-MM-DD HH:mm:ss" }),
                        errorFileFormat(),
                    ),
                }),
            );
        }

        return createLogger({ transports });
    }

    /**
     * Reset logger configuration to defaults
     *
     * This static method resets all logger configuration options to their default values.
     * It's useful when you want to revert any custom configuration.
     *
     * @example
     * ```typescript
     * // Reset logger to default configuration
     * LoggerService.resetConfiguration();
     * ```
     *
     * @see {@link defaultOptions} The default options that will be restored
     * @see {@link configure} Method to set custom configuration
     */
    static resetConfiguration(): void {
        this.options = { ...this.defaultOptions };

        // Recreate the static logger instance with the default options
        if (this.instance) {
            this.instance = this.createWinstonLogger();
        }
    }

    /**
     * Initialize the static logger instance
     *
     * This method ensures that the static logger instance is created
     * and returns it. It's used by all static logging methods.
     *
     * @private
     * @returns {WinstonLogger} The static Winston logger instance
     *
     * @see {@link createWinstonLogger} Method used to create the logger instance
     */
    private static getStaticLogger(): WinstonLogger {
        if (!LoggerService.instance) {
            LoggerService.instance = this.createWinstonLogger();
        }
        return LoggerService.instance;
    }

    /**
     * Get context from call stack if not provided
     *
     * This method attempts to extract a context name from the call stack
     * when no explicit context is provided. It helps identify the source
     * of log messages automatically.
     *
     * @private
     * @returns {string|undefined} The extracted context name or undefined if not found
     *
     * @see {@link prepareLogParams} Method that uses this to determine context
     */
    private static getContextFromStack(): string | undefined {
        const error = new Error();
        const stack = error.stack?.split("\n");
        if (stack && stack.length > 3) {
            // Get the calling function/class from the stack trace
            const callerLine = stack[3].trim();
            const match = /at\s+(.*)\s+\(/.exec(callerLine);
            if (match && match[1]) {
                return match[1].split(".").slice(-2)[0];
            }
        }
        return undefined;
    }

    /**
     * Extract context and metadata from optional parameters
     *
     * This method processes the optional parameters passed to logging methods
     * to extract context information and metadata. It handles the common pattern
     * where the last string parameter is treated as a context name.
     *
     * @private
     * @param {unknown[]} optionalParams Optional parameters passed to logging methods
     * @param {boolean} [explicitContext] Optional param for indicate weather explicit context is available
     * @returns {{ context?: string; infoObject: InfoObject }} Extracted context and metadata
     *
     * @see {@link prepareLogParams} Method that uses this to process log parameters
     * @see {@link InfoObject} Interface for the metadata structure
     */
    private static extractContextAndInfo(
        optionalParams: unknown[],
        explicitContext?: boolean,
    ): {
        context?: string;
        infoObject: InfoObject;
    } {
        let context: string | undefined;
        const infoObject: InfoObject = {
            logLevel: LogLevel.LOG,
        };

        // Process optional parameters
        if (optionalParams.length > 0) {
            // Check if the last parameter is a string (context)
            const lastParam = optionalParams[optionalParams.length - 1];
            if (!explicitContext && typeof lastParam === "string" && !lastParam.includes("\n")) {
                context = lastParam;
                optionalParams.pop();
            }

            // Add remaining parameters as metadata
            if (optionalParams.length > 0) {
                optionalParams.forEach((param, index) => {
                    if (typeof param === "object" && param !== null) {
                        Object.assign(infoObject, param);
                    } else {
                        infoObject[`param${index}`] = param;
                    }
                });
            }
        }

        return { context, infoObject };
    }

    /**
     * Helper method to process log parameters and prepare metadata
     *
     * This method processes the parameters passed to logging methods and
     * prepares them for logging. It handles various parameter types and formats:
     * - String messages
     * - Error objects
     * - Objects with a 'message' property
     * - Objects as metadata
     * - Context information
     *
     * @private
     * @param {unknown} message The message to log or an info object
     * @param {unknown[]} optionalParams Optional parameters (metadata and/or context)
     * @param {string} [defaultContext] Default context to use if none provided
     * @returns {{ message: string; infoObject: InfoObject }} Processed message and metadata
     *
     * @see {@link extractContextAndInfo} Method used to extract context and metadata
     * @see {@link formatMessage} Function used to convert messages to strings
     * @see {@link InfoObject} Interface for the metadata structure
     */
    private static prepareLogParams(
        message: unknown,
        optionalParams: unknown[],
        defaultContext?: string,
    ): { message: string; infoObject: InfoObject } {
        // Check for explicit context in optionalParams
        let explicitContext: string | undefined;
        if (optionalParams.length > 0) {
            const lastParam = optionalParams[optionalParams.length - 1];
            // If the last parameter is an object with a 'context' property, extract it
            if (
                typeof lastParam === "object" &&
                lastParam !== null &&
                !Array.isArray(lastParam) &&
                "context" in lastParam &&
                typeof lastParam.context === "string"
            ) {
                explicitContext = lastParam.context as string;
                // Remove the context property but keep the rest of the object
                const { context: _, ...rest } = lastParam as Record<string, unknown>;
                optionalParams[optionalParams.length - 1] = rest as LogParam;
                // If the object is now empty, remove it
                if (Object.keys(rest).length === 0) {
                    optionalParams.pop();
                }
            }
        }

        // Handle case where message is an object (infoObject case)
        if (typeof message === "object" && message !== null && !Array.isArray(message) && !(message instanceof Error)) {
            // If it's an info object, extract message and use the rest as metadata
            const { message: msg, ...restOfMessage } = message as Record<string, unknown>;

            // If there's a message property, use it as the message
            if (msg !== undefined) {
                // Process unknown additional optional parameters
                const { context, infoObject } = this.extractContextAndInfo(optionalParams, Boolean(explicitContext));
                // Convert the message to a string using formatMessage
                return {
                    message: formatMessage(msg),
                    infoObject: {
                        context: explicitContext || context || defaultContext,
                        ...restOfMessage, // Include the rest of the info object as metadata
                        ...infoObject, // Include unknown additional metadata from optional parameters
                    },
                };
            }

            // If there's no message property, use the entire object as metadata
            // and set an empty string as the message
            const { context, infoObject } = this.extractContextAndInfo(optionalParams, Boolean(explicitContext));

            return {
                message: "",
                infoObject: {
                    context: explicitContext || context || defaultContext,
                    ...(message as Record<string, unknown>), // Include the entire object as metadata
                    ...infoObject, // Include unknown additional metadata from optional parameters
                },
            };
        }

        // Handle Error objects specially
        if (message instanceof Error) {
            const { context, infoObject } = this.extractContextAndInfo(optionalParams, Boolean(explicitContext));

            return {
                message: formatMessage(message.message),
                infoObject: {
                    context: explicitContext || context || defaultContext,
                    ...infoObject,
                    error: message,
                },
            };
        }

        // Handle standard case (message with optional parameters)
        const { context, infoObject } = this.extractContextAndInfo(optionalParams, Boolean(explicitContext));

        // Convert the message to a string using formatMessage
        return {
            message: formatMessage(message),
            infoObject: {
                context: explicitContext || context || defaultContext,
                ...infoObject,
            },
        };
    }

    /**
     * Write a 'verbose' level log
     *
     * This method logs a message at the 'verbose' level, which is typically
     * used for highly detailed debugging information. It's the most verbose log level.
     *
     * @example
     * ```typescript
     * // Create a logger with context
     * const logger = new LoggerService('DatabaseService');
     *
     * // Simple verbose log
     * logger.verbose("Database connection established");
     *
     * // With additional context
     * logger.verbose("Query executed in 5ms", "QueryExecutor");
     *
     * // With metadata and context
     * logger.verbose("User action", { userId: "123", action: "view" }, "UserTracker");
     * ```
     *
     * @param {unknown} message The message to log
     * @param {string} context The context (category) of the message
     * @see {@link LogLevel} Type defining log levels
     * @see {@link LoggerService.verbose} Static version of this method
     */
    verbose?(message: unknown, context: string): void;

    /**
     * Write a 'verbose' level log
     *
     * @param {unknown} message The message to log
     * @param {unknown[]} optionalParams Optional parameters including metadata and context
     */
    verbose?(message: unknown, ...optionalParams: unknown[]): void {
        const { message: msg, infoObject } = LoggerService.prepareLogParams(message, optionalParams, this.context);
        infoObject.logLevel = LogLevel.VERBOSE;
        this.logger.info(msg, infoObject);
    }

    /**
     * Write a 'verbose' level log (static method)
     *
     * This static method logs a message at the 'verbose' level, which is typically
     * used for highly detailed debugging information. It's the most verbose log level.
     *
     * @example
     * ```typescript
     * // Simple verbose log
     * LoggerService.verbose("Database connection established");
     *
     * // With context
     * LoggerService.verbose("Query executed in 5ms", "DatabaseService");
     *
     * // With metadata and context
     * LoggerService.verbose("User action", { userId: "123", action: "view" }, "UserService");
     * ```
     *
     * @param {unknown} message The message to log
     * @param {string} context The context (category) of the message
     * @see {@link LogLevel} Type defining log levels
     * @see {@link prepareLogParams} Method that processes these parameters
     */
    static verbose(message: unknown, context: string): void;

    /**
     * Write a 'verbose' level log (static method)
     *
     * @param {unknown} message The message to log
     * @param {unknown[]} optionalParams Optional parameters including metadata and context
     */
    static verbose(message: unknown, ...optionalParams: unknown[]): void {
        const { message: msg, infoObject } = this.prepareLogParams(message, optionalParams, this.getContextFromStack());
        infoObject.logLevel = LogLevel.VERBOSE;
        this.getStaticLogger().info(msg, infoObject);
    }

    /**
     * Write a 'debug' level log
     *
     * This method logs a message at the 'debug' level, which is typically
     * used for debugging information that is useful during development.
     *
     * @example
     * ```typescript
     * // Create a logger with context
     * const logger = new LoggerService('UserService');
     *
     * // Simple debug log
     * logger.debug("Processing request");
     *
     * // With additional context
     * logger.debug("User data retrieved", "DataFetcher");
     *
     * // With metadata and context
     * logger.debug("Request details", { method: "GET", path: "/users" }, "RequestHandler");
     * ```
     *
     * @param {unknown} message The message to log
     * @param {string} context The context (category) of the message
     * @see {@link LogLevel} Type defining log levels
     * @see {@link LoggerService.debug} Static version of this method
     */
    debug?(message: unknown, context: string): void;

    /**
     * Write a 'debug' level log
     *
     * @param {unknown} message The message to log
     * @param {unknown[]} optionalParams Optional parameters including metadata and context
     */
    debug?(message: unknown, ...optionalParams: unknown[]): void {
        const { message: msg, infoObject } = LoggerService.prepareLogParams(message, optionalParams, this.context);
        infoObject.logLevel = LogLevel.DEBUG;
        this.logger.info(msg, infoObject);
    }

    /**
     * Write a 'debug' level log (static method)
     *
     * This static method logs a message at the 'debug' level, which is typically
     * used for debugging information that is useful during development.
     *
     * @example
     * ```typescript
     * // Simple debug log
     * LoggerService.debug("Processing request");
     *
     * // With context
     * LoggerService.debug("User data retrieved", "UserService");
     *
     * // With metadata and context
     * LoggerService.debug("Request details", { method: "GET", path: "/users" }, "RequestHandler");
     * ```
     *
     * @param {unknown} message The message to log
     * @param {string} context The context (category) of the message
     * @see {@link LogLevel} Type defining log levels
     * @see {@link prepareLogParams} Method that processes these parameters
     */
    static debug(message: unknown, context: string): void;

    /**
     * Write a 'debug' level log (static method)
     *
     * @param {unknown} message The message to log
     * @param {unknown[]} optionalParams Optional parameters including metadata and context
     */
    static debug(message: unknown, ...optionalParams: unknown[]): void {
        const { message: msg, infoObject } = this.prepareLogParams(message, optionalParams, this.getContextFromStack());
        infoObject.logLevel = LogLevel.DEBUG;
        this.getStaticLogger().info(msg, infoObject);
    }

    /**
     * Write a 'info' level log
     *
     * This method logs a message at the 'info' level, which is typically
     * used for informational messages that highlight the progress of the application.
     *
     * @example
     * ```typescript
     * // Create a logger with context
     * const logger = new LoggerService('AuthService');
     *
     * // Simple info log
     * logger.info("User authenticated");
     *
     * // With additional context
     * logger.info("Session created", "SessionManager");
     *
     * // With metadata and context
     * logger.info("Operation completed", { duration: "120ms", status: "success" }, "TaskProcessor");
     * ```
     *
     * @param {unknown} message The message to log
     * @param {string} context The context (category) of the message
     * @see {@link LogLevel} Type defining log levels
     * @see {@link LoggerService.info} Static version of this method
     */
    info(message: unknown, context: string): void;

    /**
     * Write a 'info' level log
     *
     * @param {unknown} message The message to log
     * @param {unknown[]} optionalParams Optional parameters including metadata and context
     */
    info(message: unknown, ...optionalParams: unknown[]): void;

    info(message: unknown, ...optionalParams: unknown[]): void {
        const { message: msg, infoObject } = LoggerService.prepareLogParams(message, optionalParams, this.context);
        infoObject.logLevel = LogLevel.INFO;
        this.logger.info(msg, infoObject);
    }

    /**
     * Write a 'info' level log (static method)
     *
     * This static method logs a message at the 'info' level, which is typically
     * used for informational messages that highlight the progress of the application.
     *
     * @example
     * ```typescript
     * // Simple info log
     * LoggerService.info("Application started");
     *
     * // With context
     * LoggerService.info("User registered", "AuthService");
     *
     * // With metadata and context
     * LoggerService.info("Operation completed", { duration: "120ms", status: "success" }, "TaskService");
     * ```
     *
     * @param {unknown} message The message to log
     * @param {string} context The context (category) of the message
     * @see {@link LogLevel} Type defining log levels
     * @see {@link prepareLogParams} Method that processes these parameters
     */
    static info(message: unknown, context: string): void;

    /**
     * Write a 'info' level log (static method)
     *
     * @param {unknown} message The message to log
     * @param {unknown[]} optionalParams Optional parameters including metadata and context
     */
    static info(message: unknown, ...optionalParams: unknown[]): void;

    static info(message: unknown, ...optionalParams: unknown[]): void {
        const { message: msg, infoObject } = this.prepareLogParams(message, optionalParams, this.getContextFromStack());
        infoObject.logLevel = LogLevel.INFO;
        this.getStaticLogger().info(msg, infoObject);
    }

    /**
     * Write a 'log' level log
     *
     * This method logs a message at the 'log' level, which is typically
     * used for standard output similar to console.log but with enhanced formatting.
     *
     * @example
     * ```typescript
     * // Create a logger with context
     * const logger = new LoggerService('ApiController');
     *
     * // Simple log
     * logger.log("Processing data");
     *
     * // With additional context
     * logger.log("Request received", "RequestHandler");
     *
     * // With metadata and context
     * logger.log("User activity", { userId: "123", action: "login" }, "ActivityTracker");
     * ```
     *
     * @param {unknown} message The message to log
     * @param {string} context The context (category) of the message
     * @see {@link LogLevel} Type defining log levels
     * @see {@link LoggerService.log} Static version of this method
     */
    log(message: unknown, context: string): void;

    /**
     * Write a 'log' level log
     *
     * @param {unknown} message The message to log
     * @param {unknown[]} optionalParams Optional parameters including metadata and context
     */
    log(message: unknown, ...optionalParams: unknown[]): void;

    log(message: unknown, ...optionalParams: unknown[]): void {
        const { message: msg, infoObject } = LoggerService.prepareLogParams(message, optionalParams, this.context);
        infoObject.logLevel = LogLevel.LOG;
        this.logger.info(msg, infoObject);
    }

    /**
     * Write a 'log' level log (static method)
     *
     * This static method logs a message at the 'log' level, which is typically
     * used for standard output similar to console.log but with enhanced formatting.
     *
     * @example
     * ```typescript
     * // Simple log
     * LoggerService.log("Processing data");
     *
     * // With context
     * LoggerService.log("Request received", "ApiController");
     *
     * // With metadata and context
     * LoggerService.log("User activity", { userId: "123", action: "login" }, "ActivityTracker");
     * ```
     *
     * @param {unknown} message The message to log
     * @param {string} context The context (category) of the message
     * @see {@link LogLevel} Type defining log levels
     * @see {@link prepareLogParams} Method that processes these parameters
     */
    static log(message: unknown, context: string): void;

    /**
     * Write a 'log' level log (static method)
     *
     * @param {unknown} message The message to log
     * @param {unknown[]} optionalParams Optional parameters including metadata and context
     */
    static log(message: unknown, ...optionalParams: unknown[]): void;

    static log(message: unknown, ...optionalParams: unknown[]): void {
        const { message: msg, infoObject } = this.prepareLogParams(message, optionalParams, this.getContextFromStack());
        infoObject.logLevel = LogLevel.LOG;
        this.getStaticLogger().info(msg, infoObject);
    }

    /**
     * Write an 'error' level log
     *
     * This method logs a message at the 'error' level, which is typically
     * used for error events that might still allow the application to continue running.
     * Error logs are also written to a separate error log file.
     *
     * @example
     * ```typescript
     * // Create a logger with context
     * const logger = new LoggerService('DatabaseService');
     *
     * // Simple error log
     * logger.error("Failed to connect to database");
     *
     * // With Error object
     * try {
     *   // Some code that might throw
     * } catch (error) {
     *   logger.error(error, "QueryExecutor");
     * }
     *
     * // With metadata and context
     * logger.error(
     *   "Authentication failed",
     *   { userId: "123", reason: "Invalid credentials" },
     *   "Authenticator"
     * );
     * ```
     *
     * @param {unknown} message The message or Error object to log
     * @param {string} context The context (category) of the message
     * @see {@link LogLevel} Type defining log levels
     * @see {@link LoggerService.error} Static version of this method
     */
    error(message: unknown, context: string): void;

    /**
     * Write an 'error' level log
     *
     * @param {unknown} message The message or Error object to log
     * @param {unknown[]} optionalParams Optional parameters including metadata and context
     */
    error(message: unknown, ...optionalParams: unknown[]): void;

    error(message: unknown, ...optionalParams: unknown[]): void {
        const { message: msg, infoObject } = LoggerService.prepareLogParams(message, optionalParams, this.context);
        infoObject.logLevel = LogLevel.ERROR;
        this.logger.error(msg, infoObject);
    }

    /**
     * Write an 'error' level log (static method)
     *
     * This static method logs a message at the 'error' level, which is typically
     * used for error events that might still allow the application to continue running.
     * Error logs are also written to a separate error log file.
     *
     * @example
     * ```typescript
     * // Simple error log
     * LoggerService.error("Failed to connect to database");
     *
     * // With Error object
     * try {
     *   // Some code that might throw
     * } catch (error) {
     *   LoggerService.error(error, "DatabaseService");
     * }
     *
     * // With metadata and context
     * LoggerService.error(
     *   "Authentication failed",
     *   { userId: "123", reason: "Invalid credentials" },
     *   "AuthService"
     * );
     * ```
     *
     * @param {unknown} message The message or Error object to log
     * @param {string} context The context (category) of the message
     * @see {@link LogLevel} Type defining log levels
     * @see {@link prepareLogParams} Method that processes these parameters
     */
    static error(message: unknown, context: string): void;

    /**
     * Write an 'error' level log (static method)
     *
     * @param {unknown} message The message or Error object to log
     * @param {unknown[]} optionalParams Optional parameters including metadata and context
     */
    static error(message: unknown, ...optionalParams: unknown[]): void;

    static error(message: unknown, ...optionalParams: unknown[]): void {
        const { message: msg, infoObject } = this.prepareLogParams(message, optionalParams, this.getContextFromStack());
        infoObject.logLevel = LogLevel.ERROR;
        this.getStaticLogger().error(msg, infoObject);
    }

    /**
     * Write a 'warn' level log
     *
     * This method logs a message at the 'warn' level, which is typically
     * used for warning events that might indicate potential issues.
     *
     * @example
     * ```typescript
     * // Create a logger with context
     * const logger = new LoggerService('SystemMonitor');
     *
     * // Simple warning log
     * logger.warn("Deprecated feature used");
     *
     * // With additional context
     * logger.warn("High memory usage detected", "MemoryMonitor");
     *
     * // With metadata and context
     * logger.warn(
     *   "Rate limit approaching",
     *   { current: 95, limit: 100, userId: "123" },
     *   "RateLimiter"
     * );
     * ```
     *
     * @param {unknown} message The message to log
     * @param {string} context The context (category) of the message
     * @see {@link LogLevel} Type defining log levels
     * @see {@link LoggerService.warn} Static version of this method
     */
    warn(message: unknown, context: string): void;

    /**
     * Write a 'warn' level log
     *
     * @param {unknown} message The message to log
     * @param {unknown[]} optionalParams Optional parameters including metadata and context
     */
    warn(message: unknown, ...optionalParams: unknown[]): void;

    warn(message: unknown, ...optionalParams: unknown[]): void {
        const { message: msg, infoObject } = LoggerService.prepareLogParams(message, optionalParams, this.context);
        infoObject.logLevel = LogLevel.WARN;
        this.logger.warn(msg, infoObject);
    }

    /**
     * Write a 'warn' level log (static method)
     *
     * This static method logs a message at the 'warn' level, which is typically
     * used for warning events that might indicate potential issues.
     *
     * @example
     * ```typescript
     * // Simple warning log
     * LoggerService.warn("Deprecated feature used");
     *
     * // With context
     * LoggerService.warn("High memory usage detected", "SystemMonitor");
     *
     * // With metadata and context
     * LoggerService.warn(
     *   "Rate limit approaching",
     *   { current: 95, limit: 100, userId: "123" },
     *   "RateLimiter"
     * );
     * ```
     *
     * @param {unknown} message The message to log
     * @param {string} context The context (category) of the message
     * @see {@link LogLevel} Type defining log levels
     * @see {@link prepareLogParams} Method that processes these parameters
     */
    static warn(message: unknown, context: string): void;

    /**
     * Write a 'warn' level log (static method)
     *
     * @param {unknown} message The message to log
     * @param {unknown[]} optionalParams Optional parameters including metadata and context
     */
    static warn(message: unknown, ...optionalParams: unknown[]): void;

    static warn(message: unknown, ...optionalParams: unknown[]): void {
        const { message: msg, infoObject } = this.prepareLogParams(message, optionalParams, this.getContextFromStack());
        infoObject.logLevel = LogLevel.WARN;
        this.getStaticLogger().warn(msg, infoObject);
    }

    /**
     * Write a 'fatal' level log (maps to 'error' in Winston)
     *
     * This method logs a message at the 'fatal' level, which is typically
     * used for severe error events that may cause the application to terminate.
     * In Winston, this maps to the 'error' level but is displayed with a different color.
     *
     * @example
     * ```typescript
     * // Create a logger with context
     * const logger = new LoggerService('SystemService');
     *
     * // Simple fatal log
     * logger.fatal("Unrecoverable system error");
     *
     * // With Error object
     * try {
     *   // Some critical operation
     * } catch (error) {
     *   logger.fatal(error, "CriticalOperation");
     *   process.exit(1);
     * }
     *
     * // With metadata and context
     * logger.fatal(
     *   "Critical resource unavailable",
     *   { resource: "database", attempts: 5 },
     *   "ResourceManager"
     * );
     * ```
     *
     * @param {unknown} message The message or Error object to log
     * @param {string} context The context (category) of the message
     * @see {@link LogLevel} Type defining log levels
     * @see {@link LoggerService.fatal} Static version of this method
     */
    fatal?(message: unknown, context: string): void;

    /**
     * Write a 'fatal' level log (maps to 'error' in Winston)
     *
     * @param {unknown} message The message or Error object to log
     * @param {unknown[]} optionalParams Optional parameters including metadata and context
     */
    fatal?(message: unknown, ...optionalParams: unknown[]): void;

    fatal?(message: unknown, ...optionalParams: unknown[]): void {
        const { message: msg, infoObject } = LoggerService.prepareLogParams(message, optionalParams, this.context);
        infoObject.logLevel = LogLevel.FATAL;
        this.logger.error(msg, infoObject);
    }

    /**
     * Write a 'fatal' level log (static method, maps to 'error' in Winston)
     *
     * This static method logs a message at the 'fatal' level, which is typically
     * used for severe error events that may cause the application to terminate.
     * In Winston, this maps to the 'error' level but is displayed with a different color.
     *
     * @example
     * ```typescript
     * // Simple fatal log
     * LoggerService.fatal("Unrecoverable system error");
     *
     * // With Error object
     * try {
     *   // Some critical operation
     * } catch (error) {
     *   LoggerService.fatal(error, "SystemService");
     *   process.exit(1);
     * }
     *
     * // With metadata and context
     * LoggerService.fatal(
     *   "Critical resource unavailable",
     *   { resource: "database", attempts: 5 },
     *   "StartupService"
     * );
     * ```
     *
     * @param {unknown} message The message or Error object to log
     * @param {string} context The context (category) of the message
     * @see {@link LogLevel} Type defining log levels
     * @see {@link prepareLogParams} Method that processes these parameters
     */
    static fatal(message: unknown, context: string): void;

    /**
     * Write a 'fatal' level log (static method, maps to 'error' in Winston)
     *
     * @param {unknown} message The message or Error object to log
     * @param {unknown[]} optionalParams Optional parameters including metadata and context
     */
    static fatal(message: unknown, ...optionalParams: unknown[]): void;

    static fatal(message: unknown, ...optionalParams: unknown[]): void {
        const { message: msg, infoObject } = this.prepareLogParams(message, optionalParams, this.getContextFromStack());
        infoObject.logLevel = LogLevel.FATAL;
        this.getStaticLogger().error(msg, infoObject);
    }

    /**
     * Set log levels
     *
     * This method configures which log levels are enabled for this logger instance.
     * In Winston, this typically sets the minimum level that will be logged.
     *
     * @example
     * ```typescript
     * // Create a logger
     * const logger = new LoggerService('AppService');
     *
     * // Set log level to only show warnings and errors
     * logger.setLogLevels(['warn']);
     *
     * // This won't be logged
     * logger.info('This message will be suppressed');
     *
     * // This will be logged
     * logger.warn('This warning will be shown');
     * ```
     *
     * @param {string[]} levels Log levels to enable
     *
     * @see {@link LogLevel} Type defining possible log levels
     * @see {@link LoggerService.setLogLevels} Static version of this method
     */
    setLogLevels?(levels: string[]): void {
        LoggerService.applyLogLevels(this.logger, levels);
    }

    /**
     * Set log levels (static method)
     *
     * This static method configures which log levels are enabled for the static logger.
     * In Winston, this typically sets the minimum level that will be logged.
     *
     * @example
     * ```typescript
     * // Set log level to only show warnings and errors
     * LoggerService.setLogLevels(['warn']);
     *
     * // This won't be logged
     * LoggerService.info('This message will be suppressed');
     *
     * // This will be logged
     * LoggerService.warn('This warning will be shown');
     * ```
     *
     * @param {string[]} levels Log levels to enable
     *
     * @see {@link LogLevel} Type defining possible log levels
     * @see {@link applyLogLevels} Private method that implements this functionality
     */
    static setLogLevels(levels: string[]): void {
        this.applyLogLevels(this.getStaticLogger(), levels);
    }

    /**
     * Apply log levels to a logger instance
     *
     * This private method applies the specified log levels to a Winston logger instance.
     * It's used by both the instance and static setLogLevels methods.
     *
     * @private
     * @param {WinstonLogger} logger The logger to apply levels to
     * @param {string[]} levels Log levels to enable
     *
     * @see {@link setLogLevels} Instance method that uses this
     * @see {@link LoggerService.setLogLevels} Static method that uses this
     */
    private static applyLogLevels(logger: WinstonLogger, levels: string[]): void {
        // Set the log level on the Winston logger
        if (levels.length > 0) {
            logger.level = levels[0];
        }
    }

    /**
     * Add a custom transport to the logger
     *
     * This method adds a custom Winston transport to this logger instance.
     * Transports define where log messages are sent (console, file, external service, etc.).
     *
     * @example
     * ```typescript
     * // Create a logger
     * const logger = new LoggerService('AppService');
     *
     * // Add a custom file transport
     * logger.addTransport(new winston.transports.File({
     *   filename: 'app-service.log',
     *   level: 'info'
     * }));
     * ```
     *
     * @param {transport} transport Winston transport to add
     *
     * @see {@link LoggerService.addTransport} Static version of this method
     */
    addTransport(transport: winston.transport): void {
        LoggerService.addTransportToLogger(this.logger, transport);
    }

    /**
     * Add a custom transport to the static logger
     *
     * This static method adds a custom Winston transport to the static logger.
     * Transports define where log messages are sent (console, file, external service, etc.).
     *
     * @example
     * ```typescript
     * // Add a custom file transport to the static logger
     * LoggerService.addTransport(new winston.transports.File({
     *   filename: 'application.log',
     *   level: 'info'
     * }));
     *
     * // Now static logging methods will also log to the file
     * LoggerService.info('This will be logged to the console and the file');
     * ```
     *
     * @param {transport} transport Winston transport to add
     *
     * @see {@link addTransportToLogger} Private method that implements this functionality
     */
    static addTransport(transport: winston.transport): void {
        this.addTransportToLogger(this.getStaticLogger(), transport);
    }

    /**
     * Add a transport to a logger instance
     *
     * This private method adds a Winston transport to a logger instance.
     * It's used by both the instance and static addTransport methods.
     *
     * @private
     * @param {WinstonLogger} logger The logger to add the transport to
     * @param {transport} transport The transport to add
     *
     * @see {@link addTransport} Instance method that uses this
     * @see {@link LoggerService.addTransport} Static method that uses this
     */
    private static addTransportToLogger(logger: WinstonLogger, transport: winston.transport): void {
        logger.add(transport);
    }
}
