/**
 * Generic constructor type for creating class instances.
 *
 * The `Type` type represents a constructor function that can create instances of a class.
 * It's particularly useful when working with dependency injection systems, factories,
 * or any code that needs to work with class constructors in a generic way.
 *
 * @template T The type of object that will be instantiated (defaults to unknown)
 *
 * @example
 * ```typescript
 * function createInstance<T>(ctor: Type<T>): T {
 *   return new ctor();
 * }
 *
 * // Usage
 * class MyService {}
 * const instance = createInstance(MyService);
 * ```
 */
export type Type<T = unknown> = new (...args: unknown[]) => T;
