/**
 * TypeORM Database Error Types
 *
 * This enum defines common error types that may occur during database operations
 * when using TypeORM. These error codes correspond to specific database errors,
 * particularly from MySQL/MariaDB, and can be used to identify and handle
 * different types of database exceptions in a structured way.
 *
 * Capturing these specific error types allows the application to implement
 * more precise error handling logic and provide more meaningful error messages
 * to clients, rather than exposing raw database errors.
 */
export enum TypeORMErrorType {
    /**
     * Error when trying to insert a row without providing a value for a field that
     * has no default value defined in the database schema.
     */
    ER_NO_DEFAULT_FOR_FIELD = "ER_NO_DEFAULT_FOR_FIELD",

    /**
     * Error when trying to insert a duplicate entry for a field that has a unique
     * constraint, such as primary keys or columns with unique indexes.
     */
    ER_DUP_ENTRY = "ER_DUP_ENTRY",

    /**
     * Error when a foreign key constraint fails because the referenced row doesn't exist,
     * typically occurring during insert or update operations with invalid foreign key values.
     */
    ER_NO_REFERENCED_ROW_2 = "ER_NO_REFERENCED_ROW_2",

    /**
     * Error when referencing a field or column that doesn't exist in the database schema,
     * often caused by typos in column names or outdated queries after schema changes.
     */
    ER_BAD_FIELD_ERROR = "ER_BAD_FIELD_ERROR",
}

/**
 * CRUD Operations Enum
 *
 * This enum defines the standard Create, Read, Update, Delete (CRUD) operations
 * that can be performed on database entities. These values are used throughout
 * the application to identify the type of database operation being performed.
 *
 * These operation types can be useful for logging, audit trails, or implementing
 * operation-specific behaviors such as validation rules or triggers that vary
 * depending on whether an entity is being created, updated, or deleted.
 */
export enum Operation {
    /**
     * Create operation
     *
     * Represents the creation of a new entity in the database.
     * This operation typically validates that the entity doesn't already exist
     * and performs any initialization logic required for new entities.
     */
    CREATE = "CREATE",

    /**
     * Update operation
     *
     * Represents updating an existing entity in the database.
     * This operation typically requires that the entity already exists
     * and may enforce different validation rules than creation.
     */
    UPDATE = "UPDATE",

    /**
     * Save operation
     *
     * Represents a general-purpose save operation that can either create
     * a new entity or update an existing one, depending on whether the
     * entity already exists in the database.
     */
    SAVE = "SAVE",

    /**
     * Delete operation
     *
     * Represents the removal of an existing entity from the database.
     * This operation may perform cascading deletes, soft deletes, or
     * enforce referential integrity constraints, depending on the configuration.
     */
    DELETE = "DELETE",
}
