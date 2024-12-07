// noinspection JSUnusedLocalSymbols,JSUnusedGlobalSymbols

import { readFileSync, writeFileSync } from "fs";
import { LoggerService as NestLogger } from "@nestjs/common";
import { ILogObject, Logger } from "tslog";

export const LOG_FILE_NAME = "errors.json";

// import { WebhookService } from "../modules";

export class LoggerService implements NestLogger {
    private logger: Logger;

    private static logger: Logger;

    filename: string;

    static filename: string;

    constructor() {
        this.logger = new Logger({ displayTypes: false });
        this.filename = LOG_FILE_NAME;
        this.attachTransports();
    }

    /**
     * Initialize the logger service for static use
     */
    static staticInitialize(): void {
        this.logger = new Logger({ displayTypes: false });
        this.filename = LOG_FILE_NAME;
        this.attachTransports();
    }

    /**
     * Attach transports to the logger
     * @private
     */
    private static attachTransports(): void {
        this.logger.attachTransport(
            {
                silly: LoggerService.logToTransport,
                debug: LoggerService.logToTransport,
                trace: LoggerService.logToTransport,
                info: LoggerService.logToTransport,
                warn: LoggerService.logToTransport,
                error: LoggerService.logToTransport,
                fatal: LoggerService.logToTransport,
            },
            "debug",
        );
    }

    /**
     * Attach transports to the logger
     * @private
     */
    private attachTransports(): void {
        this.logger.attachTransport(
            {
                silly: LoggerService.logToTransport,
                debug: LoggerService.logToTransport,
                trace: LoggerService.logToTransport,
                info: LoggerService.logToTransport,
                warn: LoggerService.logToTransport,
                error: LoggerService.logToTransport,
                fatal: LoggerService.logToTransport,
            },
            "debug",
        );
    }

    /**
     * Log Transport
     * @param logObject
     * @private
     */
    private static logToTransport(logObject: ILogObject): void {
        if (logObject.logLevelId > 4) {
            let logFileArray: Array<unknown> = [];
            const filename = LOG_FILE_NAME;

            try {
                logFileArray = JSON.parse(readFileSync(`${filename}`).toString());
            } catch {
                try {
                    logFileArray = [];
                    writeFileSync(`${filename}`, JSON.stringify(logFileArray, null, 2));
                } catch {
                    /* empty */
                }
            }

            logFileArray.push({ time: new Date().toLocaleString(), logObject });

            if (logFileArray.length > 100) {
                logFileArray.splice(0, logFileArray.length - 100);
            }
            try {
                writeFileSync(`${filename}`, JSON.stringify(logFileArray, null, 2));
            } catch {
                /* empty */
            }
        }
    }

    /**
     * Silly log
     * @param {unknown} message Log message
     * @param {unknown[]} optionalParams Optional parameters
     */
    silly(message: unknown, ...optionalParams: unknown[]): void {
        this.logger.silly(message, ...optionalParams);
    }

    /**
     * Silly log for static use
     * @param {unknown} message Log message
     * @param {unknown[]} optionalParams Optional parameters
     */
    static silly(message: unknown, ...optionalParams: unknown[]): void {
        this.logger.silly(message, ...optionalParams);
    }

    /**
     * Debug log
     * @param {unknown} message Log message
     * @param {unknown[]} optionalParams Optional parameters
     */
    debug(message: unknown, ...optionalParams: unknown[]): void {
        this.logger.debug(message, ...optionalParams);
    }

    /**
     * Debug log for static use
     * @param {unknown} message Log message
     * @param {unknown[]} optionalParams Optional parameters
     */
    static debug(message: unknown, ...optionalParams: unknown[]): void {
        this.logger.debug(message, ...optionalParams);
    }

    /**
     * Trace log
     * @param {unknown} message Log message
     * @param {unknown[]} optionalParams Optional parameters
     */
    trace(message: unknown, ...optionalParams: unknown[]): void {
        this.logger.trace(message, ...optionalParams);
    }

    /**
     * Trace log for static use
     * @param {unknown} message Log message
     * @param {unknown[]} optionalParams Optional parameters
     */
    static trace(message: unknown, ...optionalParams: unknown[]): void {
        this.logger.trace(message, ...optionalParams);
    }

    /**
     * Log
     * @param {unknown} message Log message
     * @param {unknown[]} optionalParams Optional parameters
     */
    log(message: unknown, ...optionalParams: unknown[]): void {
        this.logger.info(message, ...optionalParams);
    }

    /**
     * Log for static use
     * @param {unknown} message Log message
     * @param {unknown[]} optionalParams Optional parameters
     */
    static log(message: unknown, ...optionalParams: unknown[]): void {
        this.logger.info(message, ...optionalParams);
    }

    /**
     * W#arn log
     * @param {unknown} message Log message
     * @param {unknown[]} optionalParams Optional parameters
     */
    warn(message: unknown, ...optionalParams: unknown[]): void {
        this.logger.warn(message, ...optionalParams);
    }

    /**
     * Warn log for static use
     * @param {unknown} message Log message
     * @param {unknown[]} optionalParams Optional parameters
     */
    static warn(message: unknown, ...optionalParams: unknown[]): void {
        this.logger.warn(message, ...optionalParams);
    }

    /**
     * Error log
     * @param {unknown} message Log message
     * @param {unknown[]} optionalParams Optional parameters
     */
    error(message: unknown, ...optionalParams: unknown[]): void {
        // WebhookService.sendError(message);
        this.logger.error(message, ...optionalParams);
    }

    /**
     * Error log for static use
     * @param {unknown} message Log message
     * @param {unknown[]} optionalParams Optional parameters
     */
    static error(message: unknown, ...optionalParams: unknown[]): void {
        // WebhookService.sendError(message);
        this.logger.error(message, ...optionalParams);
    }

    /**
     *Fatal log
     * @param {unknown} message Log message
     * @param {unknown[]} optionalParams Optional parameters
     */
    fatal(message: unknown, ...optionalParams: unknown[]): void {
        this.logger.fatal(message, ...optionalParams);
    }

    /**
     * Fatal log for static use
     * @param {unknown} message Log message
     * @param {unknown[]} optionalParams Optional parameters
     */
    static fatal(message: unknown, ...optionalParams: unknown[]): void {
        this.logger.fatal(message, ...optionalParams);
    }

    /**
     * Verbose log
     * @param {unknown} message Log message
     * @param {unknown[]} optionalParams Optional parameters
     */
    verbose?(message: unknown, ...optionalParams: unknown[]): void {
        this.debug(message, ...optionalParams);
    }

    /**
     * Verbose log for static use
     * @param {unknown} message Log message
     * @param {unknown[]} optionalParams Optional parameters
     */
    static verbose(message: unknown, ...optionalParams: unknown[]): void {
        this.debug(message, ...optionalParams);
    }
}

/**
 * Initialize the logger service
 */
LoggerService.staticInitialize();
