/**
 * Log levels for the logger service
 *
 * This enum defines the available log levels in order of increasing severity.
 * Each level represents a different category of log messages:
 *
 * - VERBOSE: Highly detailed information for debugging
 * - DEBUG: Debugging information useful during development
 * - INFO: Informational messages about application progress
 * - LOG: Standard log messages (similar to console.log)
 * - WARN: Warning messages about potential issues
 * - ERROR: Error messages for problems that allow continued execution
 * - FATAL: Critical errors that may cause application termination
 *
 * @example
 * ```typescript
 * // Configure logger to only show warnings and errors
 * LoggerService.setLogLevels([LogLevel.WARN.toString(), LogLevel.ERROR.toString()]);
 * ```
 *
 * @see {@link LoggerService} Service that uses these log levels
 * @see {@link LogLevel} String type version of these levels
 * @see {@link colorScheme} Color scheme that maps these levels to colors
 */
export enum LogLevel {
    VERBOSE,
    DEBUG,
    INFO,
    LOG,
    WARN,
    ERROR,
    FATAL,
}
