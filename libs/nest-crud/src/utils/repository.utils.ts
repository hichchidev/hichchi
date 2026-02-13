// noinspection SuspiciousTypeOfGuard

import { FindOptionsWhere, In, IsNull, DeepPartial, QueryDeepPartialEntity } from "typeorm";
import { QueryDeepPartial, EntityDeepPartial } from "@hichchi/nest-connector/crud";
import { DEFAULT_MAX_RECURSION_DEPTH } from "../constants";

export function toFindOptionsWhere<T>(
    input?: QueryDeepPartial<T> | QueryDeepPartial<T>[],
): FindOptionsWhere<T> | FindOptionsWhere<T>[] {
    if (!input) return {};

    if (Array.isArray(input)) {
        if (!input.length) {
            return {};
        }

        return input.map(i => toFindOptionsWhere(i)) as FindOptionsWhere<T>[];
    }

    const output: FindOptionsWhere<T> = {};

    for (const key in input) {
        if (input[key] === undefined) continue;

        const val = input[key];

        if (val === null) {
            output[key] = IsNull() as FindOptionsWhere<T>[typeof key];
        } else if (
            Array.isArray(val) &&
            val.length > 0 &&
            val.every(
                v => typeof v === "string" || typeof v === "number" || typeof v === "boolean" || typeof v === "bigint",
            )
        ) {
            output[key] = In(val) as FindOptionsWhere<T>[typeof key];
        } else if (!(val instanceof Date) && typeof val === "object") {
            // TS can't guarantee this type matches exactly FindOptionsWhereProperty<...>,
            // so we cast it here safely
            output[key] = toFindOptionsWhere(val as QueryDeepPartial<T[typeof key]>) as FindOptionsWhere<T>[typeof key];
        } else {
            output[key] = val as FindOptionsWhere<T>[typeof key];
        }
    }

    return output;
}

/**
 * Safely converts EntityDeepPartial to TypeORM's QueryDeepPartialEntity
 *
 * This function transforms an EntityDeepPartial object into a QueryDeepPartialEntity
 * that can be safely used with TypeORM's update operations. It handles nested objects
 * recursively and ensures proper type conversion with protection against excessive recursion,
 * circular references, and prototype pollution.
 *
 * @template T - The entity type
 * @param {EntityDeepPartial<T>} [input] - The partial entity object to convert
 * @param {number} [depth=0] - Current recursion depth (for internal use)
 * @param {number} [maxDepth=10] - Maximum allowed recursion depth to prevent stack overflow
 * @param {WeakSet<object>} [visited=new WeakSet()] - WeakSet tracking visited objects to prevent circular references
 * @returns {QueryDeepPartialEntity<T>} The converted QueryDeepPartialEntity object
 * @throws {Error} Throws error if maximum recursion depth is exceeded
 *
 * @example
 * ```typescript
 * const entityPartial: EntityDeepPartial<User> = {
 *   profile: {
 *     firstName: 'John',
 *     settings: {
 *       theme: 'dark'
 *     }
 *   }
 * };
 *
 * const queryPartial = toQueryDeepPartialEntity(entityPartial);
 * await repository.update(id, queryPartial);
 *
 * // With custom recursion depth limit
 * const queryPartialCustomDepth = toQueryDeepPartialEntity(deeplyNested, 0, 20);
 * ```
 *
 * @see {@link EntityDeepPartial} Custom type for deep partial entities
 * @see {@link QueryDeepPartialEntity} TypeORM's type for query partial entities
 */
export function toQueryDeepPartialEntity<T>(
    input?: EntityDeepPartial<T>,
    depth: number = 0,
    maxDepth: number = DEFAULT_MAX_RECURSION_DEPTH,
    visited: WeakSet<object> = new WeakSet(),
): QueryDeepPartialEntity<T> {
    if (!input) return {} as QueryDeepPartialEntity<T>;

    // Prevent deep recursion
    if (depth > maxDepth) {
        throw new Error("Maximum recursion depth exceeded");
    }

    // Check for circular references
    if (visited.has(input as object)) {
        return {} as QueryDeepPartialEntity<T>;
    }

    // Add current object to visited set
    visited.add(input as object);

    const output: Record<keyof T, unknown> = {} as Record<keyof T, unknown>;

    for (const key in input) {
        // Optional: Add prototype pollution protection
        if (!Object.prototype.hasOwnProperty.call(input, key)) continue;

        if (input[key] === undefined || Array.isArray(input[key])) continue;

        const val = input[key] as EntityDeepPartial<T>[keyof EntityDeepPartial<T>];

        if (val === null) {
            output[key as keyof T] = null;
        } else if (typeof val === "object" && !(val instanceof Date)) {
            output[key as keyof T] = toQueryDeepPartialEntity(
                val as unknown as EntityDeepPartial<T>,
                depth + 1,
                maxDepth,
                visited,
            );
        } else {
            output[key as keyof T] = val;
        }
    }

    return output as QueryDeepPartialEntity<T>;
}

/**
 * Safely converts EntityDeepPartial to TypeORM's DeepPartial
 *
 * This function transforms an EntityDeepPartial object into a DeepPartial
 * that can be safely used with TypeORM's operations that expect DeepPartial types.
 * It handles nested objects recursively and ensures proper type conversion with
 * protection against excessive recursion and prototype pollution.
 *
 * @template T - The entity type
 * @param {EntityDeepPartial<T>} [input] - The partial entity object to convert
 * @param {number} [depth=0] - Current recursion depth (for internal use)
 * @param {number} [maxDepth=10] - Maximum allowed recursion depth to prevent stack overflow
 * @param {WeakSet<object>} [visited=new WeakSet()] - WeakSet tracking visited objects to prevent circular references
 * @returns {DeepPartial<T>} The converted DeepPartial object
 * @throws {Error} Throws error if maximum recursion depth is exceeded
 *
 * @example
 * ```typescript
 * const entityPartial: EntityDeepPartial<User> = {
 *   profile: {
 *     firstName: 'John',
 *     settings: {
 *       theme: 'dark'
 *     }
 *   }
 * };
 *
 * const deepPartial = toDeepPartial(entityPartial);
 * const user = repository.create(deepPartial);
 *
 * // With custom recursion depth limit
 * const deepPartialCustomDepth = toDeepPartial(deeplyNested, 0, 20);
 * ```
 *
 * @see {@link EntityDeepPartial} Custom type for deep partial entities
 * @see {@link DeepPartial} TypeORM's type for deep partial entities
 */
export function toDeepPartial<T>(
    input?: EntityDeepPartial<T>,
    depth: number = 0,
    maxDepth: number = DEFAULT_MAX_RECURSION_DEPTH,
    visited: WeakSet<object> = new WeakSet(),
): DeepPartial<T> {
    if (!input) return {} as DeepPartial<T>;

    // Prevent deep recursion
    if (depth > maxDepth) {
        throw new Error("Maximum recursion depth exceeded");
    }

    // Check for circular references
    if (visited.has(input as object)) {
        return {} as DeepPartial<T>;
    }

    // Add current object to visited set
    visited.add(input as object);

    const output: Record<keyof T, unknown> = {} as Record<keyof T, unknown>;

    for (const key in input) {
        // Prototype pollution protection
        if (!Object.prototype.hasOwnProperty.call(input, key)) continue;
        if (input[key] === undefined || Array.isArray(input[key])) continue;

        const val = input[key] as EntityDeepPartial<T>[keyof EntityDeepPartial<T>];

        if (val === null) {
            output[key as keyof T] = null;
        } else if (typeof val === "object" && !(val instanceof Date)) {
            output[key as keyof T] = toDeepPartial(
                val as unknown as EntityDeepPartial<T>,
                depth + 1,
                maxDepth,
                visited,
            );
        } else {
            output[key as keyof T] = val;
        }
    }

    return output as DeepPartial<T>;
}
