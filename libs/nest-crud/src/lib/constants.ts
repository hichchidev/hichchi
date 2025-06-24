/**
 * Regular expression for validating unique constraint naming convention
 *
 * This constant defines the expected format for unique constraint names in the database.
 * The format is: UNIQUE_entityName_fieldName
 *
 * - UNIQUE_: Prefix indicating a unique constraint
 * - entityName: The name of the entity (must start with a letter, can contain letters, numbers, and underscores)
 * - fieldName: The name of the field with the unique constraint (must start with a letter, can contain letters, numbers, and underscores)
 *
 * @example
 * ```typescript
 * // Valid unique constraint names
 * 'UNIQUE_user_email'
 * 'UNIQUE_product_sku'
 * 'UNIQUE_orderItem_productId'
 * ```
 *
 * @see {@link HichchiEntity} Decorator that validates unique constraint names
 */
export const UNIQUE_CONSTRAINT_REGEX = /^UNIQUE_[a-zA-Z]\w+_[a-zA-Z]\w+$/;

/**
 * Regular expression for validating foreign key constraint naming convention
 *
 * This constant defines the expected format for foreign key constraint names in the database.
 * The format is: FK_entityName_relatedEntityName
 *
 * - FK_: Prefix indicating a foreign key constraint
 * - entityName: The name of the entity containing the foreign key (must start with a letter, can contain letters, numbers, and underscores)
 * - relatedEntityName: The name of the related entity (must start with a letter, can contain letters, numbers, and underscores)
 *
 * @example
 * ```typescript
 * // Valid foreign key constraint names
 * 'FK_user_profile'
 * 'FK_order_customer'
 * 'FK_orderItem_product'
 * ```
 *
 * @see {@link HichchiEntity} Decorator that validates foreign key constraint names
 * @see {@link HichchiJoinColumn} Decorator that uses this pattern for foreign key constraints
 */
export const FK_CONSTRAINT_REGEX = /^FK_[a-zA-Z]\w+_[a-zA-Z]\w+$/;

/**
 * Regular expression for extracting field names from TypeORM property not found errors
 *
 * This constant is used to parse error messages from TypeORM's EntityPropertyNotFoundError
 * to extract the name of the property that caused the error. The pattern matches the format
 * of TypeORM's error messages for property not found errors.
 *
 * @example
 * ```typescript
 * // Example error message: 'Property "invalidField" was not found in "UserEntity".'
 * const field = EXTRACT_INVALID_QUERY_FIELD_REGEX.exec(errorMessage)
 *   ? errorMessage.split(EXTRACT_INVALID_QUERY_FIELD_REGEX)[1]
 *   : undefined;
 * // field = 'invalidField'
 * ```
 *
 * @see {@link EntityUtils.handleError} Method that uses this pattern to extract field names from errors
 */
export const EXTRACT_INVALID_QUERY_FIELD_REGEX = /Property "|" was/;

/**
 * Regular expression for extracting column names from database column not found errors
 *
 * This constant is used to parse error messages from database errors about unknown columns
 * to extract the name of the column that caused the error. The pattern matches the format
 * of MySQL/MariaDB error messages for unknown column errors.
 *
 * @example
 * ```typescript
 * // Example error message: 'Unknown column 'invalidColumn' in 'where clause''
 * const field = EXTRACT_INVALID_COLUMN_REGEX.exec(errorMessage)
 *   ? errorMessage.split(EXTRACT_INVALID_COLUMN_REGEX)[1]
 *   : undefined;
 * // field = 'invalidColumn'
 * ```
 *
 * @see {@link EntityUtils.handleError} Method that uses this pattern to extract column names from errors
 */
export const EXTRACT_INVALID_COLUMN_REGEX = /Unknown column '|' in 'where clause'/;
