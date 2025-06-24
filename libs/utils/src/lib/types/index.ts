/**
 * Utility types for TypeScript development
 *
 * This module exports a collection of utility types that enhance TypeScript's
 * type system with additional functionality. These types help with common
 * type manipulation tasks and provide solutions for advanced typing scenarios.
 *
 * Key categories of types included:
 * - Object type utilities (DeepPartial, PartialWithNull, LiteralObject)
 * - Type predicates (IsEmpty, IsPrimitive, IsAlreadyInPath)
 * - Type transformation utilities (Prettify, LooseAutocomplete)
 * - Constructor and class utilities (Type)
 *
 * Import these types individually or from this barrel file to enhance
 * your TypeScript code with more expressive and precise type definitions.
 *
 * @example
 * ```typescript
 * // Import all types
 * import * as Types from '@hichchi/utils/types';
 *
 * // Or import specific types
 * import { DeepPartial, LiteralObject } from '@hichchi/utils/types';
 * ```
 */
export * from "./type.type";
export * from "./is-empty.type";
export * from "./prettify.type";
export * from "./deep-partial.type";
export * from "./is-primitive.type";
export * from "./literal-object.type";
export * from "./partial-with-null.type";
export * from "./is-already-in-path.type";
export * from "./loose-autocomplete.type";
