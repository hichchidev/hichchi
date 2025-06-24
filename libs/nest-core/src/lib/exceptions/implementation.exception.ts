/**
 * Exception for reporting implementation-related errors with structured details
 *
 * This exception is designed for situations where there's an issue with how
 * a component is implemented or used. It provides a structured way to report
 * errors with a heading, message, and optional detailed description, making
 * it easier to understand and debug implementation problems.
 *
 * The exception formats the error stack trace in a more readable way, with
 * clear separation between the heading, message, and description.
 *
 * @example
 * ```typescript
 * // Basic usage with heading and message
 * throw new ImplementationException(
 *   'Database Connection Error',
 *   'Failed to connect to the database'
 * );
 * ```
 *
 * @example
 * ```typescript
 * // Usage with heading, message, and detailed description
 * throw new ImplementationException(
 *   'Configuration Error',
 *   'Invalid Redis configuration',
 *   'The Redis host or URL must be provided when registering the CacheModule'
 * );
 * ```
 */
export class ImplementationException extends Error {
    /**
     * Creates a new ImplementationException
     *
     * @param {string} heading - A short title or category for the error
     * @param {string} message - The main error message describing what went wrong
     * @param {string} [description] - Optional detailed description providing more context or troubleshooting information
     */
    constructor(
        public heading: string,
        public override message: string,
        public description?: string,
    ) {
        super(message);
        this.stack = `${this.heading}\n\n    ${this.message}\n\n${this.description ? `    ${this.description}` : ""}`;
    }
}
