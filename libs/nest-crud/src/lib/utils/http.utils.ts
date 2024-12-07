import { FilterOptions, SortOptions } from "../types";
import { FindOptionsOrderProperty } from "typeorm/find-options/FindOptionsOrder";
import { LiteralObject, pathValueSetToObject } from "@hichchi/utils";

/**
 * Parse the sort options from the query string
 *
 * @param {string} sortString The sort string
 * @returns {SortOptions} The sort options
 *
 * @example
 * ```typescript
 * // Example usage
 * const sortString = "name.asc,age.desc";
 * const sortOptions = parseSortOptions(sortString);
 *
 * // Example output
 * {
 *     name: "asc",
 *     age: "desc",
 * }
 * ```
 *
 * @example
 * ```typescript
 * // Realistic scenario
 * const sortOptions = parseSortOptions(req.query.sort);
 * ```
 */
export function parseSortOptions<T>(sortString: string): SortOptions<T> | undefined {
    const sortFields: SortOptions<T> = {};
    if (!sortString) {
        return undefined;
    }

    type SortOption =
        | (keyof T extends "toString" ? unknown : FindOptionsOrderProperty<NonNullable<T[keyof T]>>)
        | undefined;

    const sortEntries = sortString.split(",");

    sortEntries.forEach(entry => {
        const [field, order] = entry.split(".").map(i => i.trim()) as [keyof T, string];
        if (field) {
            sortFields[field] = /^(asc|desc)$/i.exec(order)
                ? (order.toLowerCase() as SortOption)
                : ("asc" as SortOption);
        }
    });

    return Object.values(sortFields).length ? sortFields : undefined;
}

/**
 * Parse the filter object from the query string
 *
 * @param {Record<string, string>} filterObject The filter object
 * @returns {FilterOptions} The filter options
 *
 * @example
 * ```typescript
 * // Example usage
 * const filters = { role: "user", ["address.city"]: "New York" }
 * const filterOptions = parseFilterObject(filters);
 *
 * // Example output
 * {
 *     role: "user",
 *     address: {
 *         city: "New York",
 *     }
 * }
 * ```
 *
 * @example
 * ```typescript
 *
 * // Realistic scenario
 * // remove non filter options from the query object and parse the filter options
 * const { page, limit, sort, ...filters } = req.query as Record<string, string>;
 * const filterOptions = parseFilterObject(filters);
 * ```
 */
export function parseFilterObject<T>(filterObject: LiteralObject<string>): FilterOptions<T> | undefined {
    return pathValueSetToObject<FilterOptions<T>>(filterObject);
}

/**
 * Parse the search string from the query string
 *
 * @template T The entity type
 * @param {string} value The search string
 * @param {string[]} pathsString The search fields
 * @returns {FilterOptions<T>} The filter options
 */
export function parseSearchString<T>(value?: string, pathsString?: string): FilterOptions<T> | undefined {
    if (!value || !pathsString) {
        return undefined;
    }

    const filterObject: LiteralObject<string> = pathsString
        .split(",")
        .map(path => path.trim())
        .filter(path => path.length)
        .reduce((acc, path) => {
            acc[path] = value;
            return acc;
        }, {} as LiteralObject<string>);

    return pathValueSetToObject<FilterOptions<T>>(filterObject);
}
