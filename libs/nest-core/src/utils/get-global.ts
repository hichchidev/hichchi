/* eslint-disable @typescript-eslint/no-explicit-any,@typescript-eslint/ban-ts-comment */

/**
 * Retrieves the global object across different JavaScript environments
 *
 * This utility function provides a consistent way to access the global object
 * regardless of the JavaScript environment (browser, Node.js, Web Worker, etc.).
 * It checks for the availability of different global objects in the following order:
 *
 * 1. globalThis - The standard global object in modern JavaScript environments
 * 2. global - The global object in Node.js
 * 3. window - The global object in browser environments
 * 4. self - The global object in Web Workers
 *
 * This function is particularly useful for creating cross-environment utilities
 * that need to store or access global state, such as singletons or shared configuration.
 *
 * @returns {any} The global object for the current JavaScript environment
 *
 * @example
 * ```typescript
 * // Store a global variable
 * const global = getGlobal();
 * global.myAppConfig = { version: '1.0.0' };
 *
 * // Access a global variable from anywhere
 * const config = getGlobal().myAppConfig;
 * ```
 *
 * @example
 * ```typescript
 * // Create a singleton instance
 * function createSingleton() {
 *   const g = getGlobal();
 *   if (!g.myInstance) {
 *     g.myInstance = new MyClass();
 *   }
 *   return g.myInstance;
 * }
 * ```
 */
export function getGlobal(): any {
    if (typeof globalThis !== "undefined") {
        return globalThis;
    }

    if (typeof global !== "undefined") {
        return global;
    }

    // @ts-ignore
    if (typeof window !== "undefined") {
        // @ts-ignore
        return window;
    }

    // @ts-ignore
    if (typeof self !== "undefined") {
        // @ts-ignore
        return self;
    }
}
