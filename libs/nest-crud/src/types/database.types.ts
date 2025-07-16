/**
 * Supported database types for application connections.
 *
 * This type defines the supported database engines that can be used with the
 * application's database connection configuration. Currently, the application
 * supports MySQL and MariaDB database systems.
 *
 * The type is used as a constraint for the `type` property in the `ConnectionOptions`
 * interface, ensuring that only supported database types can be specified
 * when configuring database connections.
 *
 * @remarks
 * - "mysql": Standard MySQL database server (typically versions 5.7+, 8.0+)
 * - "mariadb": MariaDB database server, a MySQL fork with additional features
 *
 * The application uses TypeORM as its ORM layer, which supports these database
 * types through specific drivers. The database type determines which driver
 * and connection strategy will be used when establishing database connections.
 *
 * If additional database support is needed in the future (such as PostgreSQL,
 * SQLite, or MongoDB), this type would be expanded to include those options,
 * and corresponding driver implementation would need to be added.
 *
 * @example
 * ```typescript
 * // Configuring a MySQL connection
 * const dbType: DatabaseTypes = "mysql";
 *
 * // Using in connection options
 * const connectionOptions: ConnectionOptions = {
 *   type: "mysql",
 *   host: "localhost",
 *   // other connection properties
 * };
 * ```
 */
export type DatabaseTypes = "mysql" | "mariadb";
