/**
 * Token for database connection options
 *
 * This constant defines a token used for dependency injection of database connection
 * configuration options in NestJS applications. It serves as a key for providing and
 * retrieving database-related configuration throughout the application.
 *
 * The token is primarily used with NestJS's dependency injection system to provide
 * consistent access to database connection options across different modules and services.
 *
 * @example
 * ```typescript
 * // Providing connection options using the token
 * @Module({
 *   imports: [HichchiCrudModule.forRoot(connectionOptions)],
 *   providers: [
 *     {
 *       provide: CONNECTION_OPTIONS,
 *       useValue: connectionOptions
 *     }
 *   ]
 * })
 * export class AppModule {}
 * ```
 *
 * @see {@link HichchiCrudModule} The module that uses this token for database configuration
 * @see {@link ConnectionOptions} The interface that defines the connection options structure
 */
export const CONNECTION_OPTIONS = "CONNECTION_OPTIONS";

/**
 * Standard table name for user entities
 *
 * This constant defines the standard table name that must be used for all user entities
 * in the application. It ensures consistency across the application by providing a
 * single source of truth for the user table name.
 *
 * The constant is enforced by the HichchiEntity decorator, which requires that any
 * entity extending HichchiUserEntity must use this table name.
 *
 * @example
 * ```typescript
 * // In a user entity definition
 * @HichchiEntity(USER_ENTITY_TABLE_NAME, ["email"])
 * export class UserEntity extends HichchiUserEntity implements User {
 *   @Column({ nullable: false })
 *   email: string;
 *
 *   // Other user properties...
 * }
 * ```
 *
 * @see {@link HichchiEntity} The decorator that enforces this table name for user entities
 * @see {@link HichchiUserEntity} The base entity class for user entities
 */
export const USER_ENTITY_TABLE_NAME = "users";
