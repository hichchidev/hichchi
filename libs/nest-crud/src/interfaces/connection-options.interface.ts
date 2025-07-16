import { DatabaseTypes } from "../types";

/**
 * Database connection configuration options.
 *
 * This interface defines the configuration parameters needed to establish a
 * database connection in a NestJS application. It provides type-safe access
 * to all required and optional database connection settings supported by the
 * application's database integration.
 *
 * These options are typically used when configuring the database module in a
 * NestJS application, either through direct configuration or through environment
 * variables processed into this structure.
 *
 * @remarks
 * The current implementation supports MySQL and MariaDB databases as defined in
 * the `DatabaseTypes` type. The options follow TypeORM connection configuration
 * patterns while providing a simplified and application-specific interface.
 *
 * @example
 * ```typescript
 * // In a module configuration
 * const dbOptions: ConnectionOptions = {
 *   type: 'mysql',
 *   host: process.env.DB_HOST || 'localhost',
 *   port: parseInt(process.env.DB_PORT || '3306', 10),
 *   username: process.env.DB_USERNAME || 'root',
 *   password: process.env.DB_PASSWORD || 'password',
 *   database: process.env.DB_NAME || 'myapp',
 *   entities: [__dirname + '/** /*.entity{.ts,.js}'],
 *   migrations: [__dirname + '/migrations/*{.ts,.js}'],
 *   synchronize: process.env.NODE_ENV !== 'production',
 *   charset: 'utf8mb4'
 * };
 *
 * @Module({
 *   imports: [
 *     TypeOrmModule.forRoot(dbOptions),
 *     // other imports
 *   ],
 * })
 * export class AppModule {}
 * ```
 */
export interface ConnectionOptions {
    /**
     * The database type to connect to.
     *
     * Currently supported values are "mysql" and "mariadb" as defined
     * in the DatabaseTypes type. This determines which database driver
     * and connection strategy will be used.
     *
     * @example
     * type: "mysql"
     */
    type: DatabaseTypes;

    /**
     * The hostname or IP address of the database server.
     *
     * This specifies where the database server is located. For local
     * development, this is often "localhost" or "127.0.0.1".
     *
     * @example
     * host: "database.example.com"
     * @example
     * host: "localhost"
     */
    host: string;

    /**
     * The port number on which the database server is listening.
     *
     * Standard ports are typically 3306 for MySQL and MariaDB, but
     * this can be configured differently in your database setup.
     *
     * @example
     * port: 3306
     */
    port: number;

    /**
     * The username for authenticating with the database server.
     *
     * This user should have appropriate permissions for the operations
     * your application needs to perform (create/read/update/delete).
     *
     * @example
     * username: "app_user"
     */
    username: string;

    /**
     * The password for authenticating with the database server.
     *
     * Should be used in conjunction with the username for authentication.
     * In production, this should always be a secure value stored in
     * environment variables or secrets management.
     *
     * @example
     * password: process.env.DB_PASSWORD
     */
    password: string;

    /**
     * The name of the database to connect to on the server.
     *
     * This is the specific database your application will use on
     * the database server. The user must have access to this database.
     *
     * @example
     * database: "my_application_db"
     */
    database: string;

    /**
     * Array of paths to entity files or directories containing entities.
     *
     * These paths specify where the ORM should look for entity definitions.
     * They can be glob patterns to match multiple files or explicit paths.
     *
     * @example
     * entities: [__dirname + '/** /*.entity{.ts,.js}']
     */
    entities: string[];

    /**
     * Array of paths to migration files or directories containing migrations.
     *
     * These paths specify where the ORM should look for database migration
     * definitions. They can be glob patterns to match multiple files.
     *
     * @example
     * migrations: [__dirname + '/migrations/*{.ts,.js}']
     */
    migrations: string[];

    /**
     * Optional character set for the database connection.
     *
     * Specifies the character encoding for the database connection.
     * Modern applications typically use "utf8mb4" to support the full
     * Unicode character set including emojis.
     *
     * @example
     * charset: "utf8mb4"
     */
    charset?: string;

    /**
     * Whether to synchronize database schema automatically on application start.
     *
     * When true, the ORM will attempt to automatically create or update
     * the database schema to match entity definitions. This should typically
     * be disabled in production environments and managed through migrations.
     *
     * @default false
     * @example
     * synchronize: false
     */
    synchronize?: boolean;

    /**
     * Whether to use legacy spatial support for MySQL/MariaDB.
     *
     * When true, enables support for older spatial features in MySQL/MariaDB.
     * This may be necessary for compatibility with certain geographic data
     * operations on older database versions.
     *
     * @default false
     */
    legacySpatialSupport?: boolean;

    /**
     * Whether to automatically load entity files from the TypeORM configuration.
     *
     * When true, TypeORM will automatically scan and load all entity files
     * based on its internal configuration, which can be useful for modules
     * that register their own entities.
     *
     * @default false
     * @example
     * autoLoadEntities: true
     */
    autoLoadEntities?: boolean;
}
