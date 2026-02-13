import { SortOptions } from "../types";
import { LiteralObject, dottedPathObjectToNested } from "@hichchi/utils";
import { QueryDeepPartial } from "@hichchi/nest-connector/crud";
import { FindOptionsOrderProperty } from "typeorm";

/**
 * Parse the sort options from the query string
 *
 * This function converts a string-based sort parameter (commonly found in query strings)
 * into a structured object that can be used with TypeORM's order options. It supports
 * multiple sort fields and directions.
 *
 * The expected format is: "field1.direction,field2.direction"
 * Where direction is either "asc" or "desc" (case insensitive).
 * If no direction is specified, "asc" is used as the default.
 *
 * @template T - The entity type that provides the structure for the sort options
 * @param {string} sortString - The sort string from query parameters
 * @returns {SortOptions<T> | undefined} - The parsed sort options object or undefined if no valid sort options
 *
 * @example
 * ```typescript
 * // Basic usage
 * const sortString = "name.asc,age.desc";
 * const sortOptions = parseSortOptions(sortString);
 *
 * // Result:
 * // {
 * //     name: "asc",
 * //     age: "desc",
 * // }
 * ```
 *
 * @example
 * ```typescript
 * // In a controller with type safety
 * @Get()
 * async findAll(@Query('sort') sort?: string): Promise<UserEntity[]> {
 *   const sortOptions = parseSortOptions<UserEntity>(sort);
 *   return this.userService.findAll({ sort: sortOptions });
 * }
 * ```
 *
 * @see {@link SortOptions} For the structure of the returned object
 * @see {@link FindOptionsOrderProperty} For TypeORM's order property type
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
 * Parse the filter object from query parameters
 *
 * This function converts a flat object of query parameters with dot notation paths
 * into a nested object structure that can be used with TypeORM's where conditions.
 * It supports deep nesting of properties using dot notation in the keys.
 *
 * For example, a query parameter like `address.city=New York` will be transformed
 * into a nested object structure: `{ address: { city: "New York" } }`.
 *
 * @template T - The entity type for type-safe filtering
 * @param {LiteralObject<string>} filterObject - The flat filter object from query parameters
 * @returns {QueryDeepPartial<T> | undefined} - The nested filter options object or undefined if empty
 *
 * @example
 * ```typescript
 * // Basic usage with dot notation
 * const filters = {
 *   role: "user",
 *   "address.city": "New York",
 *   "address.zipCode": "10001"
 * };
 * const filterOptions = parseFilterObject(filters);
 *
 * // Result:
 * // {
 * //     role: "user",
 * //     address: {
 * //         city: "New York",
 * //         zipCode: "10001"
 * //     }
 * // }
 * ```
 *
 * @example
 * ```typescript
 * // In a controller with type safety
 * @Get()
 * async findAll(@Query() query: Record<string, string>): Promise<UserEntity[]> {
 *   // Extract pagination and sorting params, leaving only filter fields
 *   const { page, limit, sort, ...filters } = query;
 *
 *   // Parse the remaining query params as filters
 *   const filterOptions = parseFilterObject<UserEntity>(filters);
 *
 *   return this.userService.findAll({
 *     filter: filterOptions,
 *     // other options...
 *   });
 * }
 * ```
 *
 * @see {@link QueryDeepPartial} For the structure of the returned object
 * @see {@link dottedPathObjectToNested} For the underlying utility that converts dot notation to nested objects
 */
export function parseFilterObject<T>(filterObject: LiteralObject<string>): QueryDeepPartial<T> | undefined {
    return dottedPathObjectToNested<QueryDeepPartial<T>>(filterObject);
}

/**
 * Parse the search string and fields into filter options
 *
 * This function creates a filter object from a search value and a comma-separated list
 * of fields to search in. It's useful for implementing simple search functionality across
 * multiple entity fields.
 *
 * The function takes a search value and a comma-separated string of field paths, and creates
 * a filter object where each specified field is set to the search value. This can then be
 * transformed into appropriate database queries (often using LIKE operators) by the repository.
 *
 * @template T - The entity type for type-safe filtering
 * @param {string} [value] - The search value to look for
 * @param {string} [pathsString] - Comma-separated list of field paths to search in
 * @returns {QueryDeepPartial<T> | undefined} - The filter options object or undefined if no search parameters
 *
 * @example
 * ```typescript
 * // Basic usage
 * const searchValue = "John";
 * const searchFields = "firstName,lastName,email";
 * const searchFilter = parseSearchString(searchValue, searchFields);
 *
 * // Result:
 * // {
 * //   firstName: "John",
 * //   lastName: "John",
 * //   email: "John"
 * // }
 * ```
 *
 * @example
 * ```typescript
 * // In a controller with nested fields
 * @Get('search')
 * async search(
 *   @Query('q') searchTerm?: string,
 *   @Query('fields') fields?: string
 * ): Promise<UserEntity[]> {
 *   // Create search filter from query params
 *   const searchFilter = parseSearchString<UserEntity>(searchTerm, fields);
 *
 *   // Use the filter in a service method that handles the actual search logic
 *   return this.userService.search(searchFilter);
 * }
 * ```
 *
 * @see {@link QueryDeepPartial} For the structure of the returned object
 * @see {@link parseFilterObject} For a related function that handles general filtering
 * @see {@link dottedPathObjectToNested} For the underlying utility that converts dot notation to nested objects
 */
export function parseSearchString<T>(value?: string, pathsString?: string): QueryDeepPartial<T> | undefined {
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

    return dottedPathObjectToNested<QueryDeepPartial<T>>(filterObject);
}
