/* eslint-disable @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access */
// noinspection ExceptionCaughtLocallyJS,ES6PreferShortImport,JSUnusedGlobalSymbols

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import Transport, { TransportStreamOptions } from "winston-transport";
import * as path from "path";
import { Format, TransformableInfo } from "logform";
import { MESSAGE } from "triple-beam";
import { LogLevel } from "../enums/log-level.enum";
import { InfoObject } from "../interfaces";

/**
 * Configuration options for the JsonArrayFileTransport
 *
 * This interface defines the configuration options for the JsonArrayFileTransport,
 * which writes log entries to a JSON array file.
 *
 * @example
 * ```typescript
 * // Create a transport with custom options
 * const transport = new JsonArrayFileTransport({
 *   filename: 'application-errors.json',
 *   logsDir: './custom-logs',
 *   logLevel: LogLevel.ERROR,
 *   format: format.combine(
 *     format.timestamp(),
 *     errorFileFormat()
 *   )
 * });
 * ```
 *
 * @see {@link JsonArrayFileTransport} The transport class that uses these options
 * @see {@link TransportStreamOptions} Base Winston transport options
 */
interface JsonArrayFileTransportOptions extends TransportStreamOptions {
    /**
     * Name of the log file to write to
     */
    filename: string;

    /**
     * Directory where log files will be stored
     * @default process.cwd() + "/logs"
     */
    logsDir?: string;

    /**
     * Winston format to apply to log entries
     */
    format?: Format;

    /**
     * Minimum log level to write to the file
     */
    logLevel?: LogLevel;
}

/**
 * Winston transport that writes logs to a JSON array file
 *
 * This transport writes log entries to a file as a JSON array. Each log entry
 * is added as a new element in the array. The file is read and written on each
 * log operation, making it suitable for low-volume logging scenarios.
 *
 * Features:
 * - Stores logs in a structured JSON array format
 * - Creates the logs directory if it doesn't exist
 * - Ensures the log file always contains a valid JSON array
 * - Supports filtering by log level
 * - Supports custom formatting
 *
 * @example
 * ```typescript
 * // Create a Winston logger with the JSON array transport
 * const logger = createLogger({
 *   transports: [
 *     new JsonArrayFileTransport({
 *       filename: 'errors.json',
 *       logLevel: LogLevel.ERROR
 *     })
 *   ]
 * });
 *
 * // Log an error that will be written to the JSON array file
 * logger.error('Database connection failed', {
 *   attempt: 3,
 *   reason: 'Connection timeout'
 * });
 * ```
 *
 * @see {@link JsonArrayFileTransportOptions} Configuration options for this transport
 * @see {@link Transport} Base Winston transport class
 * @see {@link LoggerService} Service that uses this transport
 */
export class JsonArrayFileTransport extends Transport {
    /**
     * Full path to the log file
     * @private
     */
    private readonly filePath: string;

    /**
     * Minimum log level to write to the file
     * @private
     */
    private readonly logLevel?: LogLevel;

    /**
     * Custom Winston format to apply to log entries
     * @private
     */
    private readonly customFormat?: Format;

    /**
     * Creates a new JsonArrayFileTransport instance
     *
     * @param {JsonArrayFileTransportOptions} options Configuration options for the transport
     *
     * @example
     * ```typescript
     * // Create a transport for error logs
     * const errorTransport = new JsonArrayFileTransport({
     *   filename: 'errors.json',
     *   logsDir: './logs',
     *   logLevel: LogLevel.ERROR
     * });
     * ```
     *
     * @see {@link JsonArrayFileTransportOptions} Available configuration options
     */
    constructor(options: JsonArrayFileTransportOptions) {
        super(options);

        this.logLevel = options.logLevel;

        const logsDir = options.logsDir || path.join(process.cwd(), "logs");
        if (!existsSync(logsDir)) {
            try {
                mkdirSync(logsDir, { recursive: true });
            } catch (error) {
                // eslint-disable-next-line no-console
                console.error("Failed to create logs directory:", error);
            }
        }

        this.filePath = path.join(logsDir, options.filename || "errors.json");
        this.customFormat = options.format;

        // Ensure log file is a valid array
        if (!existsSync(this.filePath)) {
            writeFileSync(this.filePath, "[]", "utf8");
        } else {
            try {
                const content = readFileSync(this.filePath, "utf8");
                const parsed = JSON.parse(content);
                if (!Array.isArray(parsed)) throw new Error();
            } catch {
                writeFileSync(this.filePath, "[]", "utf8");
            }
        }
    }

    /**
     * Process a log entry and write it to the JSON array file
     *
     * This method is called by Winston when a log message needs to be processed.
     * It checks if the log level meets the minimum threshold, applies any custom
     * formatting, and then appends the log entry to the JSON array file.
     *
     * The method:
     * 1. Checks if the log level meets the minimum threshold
     * 2. Applies any custom formatting to the log entry
     * 3. Reads the current content of the log file
     * 4. Parses it as a JSON array
     * 5. Adds the new log entry to the array
     * 6. Writes the updated array back to the file
     *
     * @param {TransformableInfo & InfoObject} info The log information to process
     * @param {() => void} callback Function to call when processing is complete
     *
     * @see {@link TransformableInfo} Winston interface for log information
     * @see {@link InfoObject} Interface for metadata attached to log entries
     */
    override log(info: TransformableInfo & InfoObject, callback: () => void): void {
        if (this.logLevel === undefined || info.logLevel >= this.logLevel) {
            setImmediate(() => this.emit("logged", info));

            try {
                const transformedInfo = this.customFormat
                    ? this.customFormat.transform(info, this.customFormat.options)
                    : info;

                if (transformedInfo && typeof transformedInfo === "object") {
                    const content = readFileSync(this.filePath, "utf8");
                    const logs = JSON.parse(content);
                    logs.push(JSON.parse(transformedInfo[MESSAGE] as string));
                    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
                    writeFileSync(this.filePath, JSON.stringify(logs, null, 2), "utf8");
                }
            } catch (err) {
                this.emit("error", err);
            }
        }

        callback();
    }
}
