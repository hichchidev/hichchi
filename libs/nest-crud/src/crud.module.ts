// noinspection JSUnusedGlobalSymbols

import { DynamicModule, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConnectionOptions } from "./interfaces";
import { CONNECTION_OPTIONS } from "./tokens";
import { EntityUtils } from "./utils";
import { BaseEntity, BaseEntityExtension, HichchiUserEntity } from "./base";
import { hichchiMetadata, ImplementationException } from "@hichchi/nest-core";
import { DEFAULT_MYSQL_PORT } from "@hichchi/nest-connector";

/**
 * Module for integrating TypeORM with NestJS and providing CRUD functionality
 *
 * This module provides a streamlined way to integrate TypeORM with NestJS applications
 * and offers enhanced CRUD functionality through specialized entities and repositories.
 * It handles database connection configuration, entity registration, and validation.
 *
 * Key features:
 * - Simplified database connection setup with sensible defaults
 * - Entity validation to ensure proper inheritance and decoration
 * - Integration with TypeORM's repository pattern
 * - Support for custom entities that extend base entity classes
 * - Automatic entity registration with TypeORM
 *
 * The module is designed to be used in the root module of your application (via `forRoot`)
 * and in feature modules (via `forFeature`) to register specific entities.
 *
 * @see {@link BaseEntity} The base entity class that custom entities should extend
 * @see {@link BaseEntityExtension} Alternative base entity with extended functionality
 * @see {@link HichchiUserEntity} Specialized entity for user management
 * @see {@link EntityUtils} Utility class for entity operations
 */
@Module({})
export class HichchiCrudModule {
    /**
     * Register the HichchiCrudModule
     *
     * This method is used to register the `HichchiCrudModule`.
     * It takes the connection options as an argument and returns a dynamic module.
     * The connection options include the type, host, port, username, password, database, entities, migrations,
     * charset, synchronize, legacySpatialSupport, keepConnectionAlive, and autoLoadEntities.
     *
     * @example
     * ```TypeScript
     * const connectionOptions: IConnectionOptions = {
     *   type: "mysql",
     *   host: "localhost",
     *   port: 3306,
     *   username: "root",
     *   password: "",
     *   database: "dbname",
     *   charset: "utf8mb4",
     *   synchronize: false,
     *   entities: ["dist/** /*.entity{.ts,.js}"],
     *   migrations: ["dist/database/migrations/*{.ts,.js}"],
     *   legacySpatialSupport: false,
     *   keepConnectionAlive: true,
     *   autoLoadEntities: true,
     * }
     *
     * @Module({
     *     imports: [HichchiCrudModule.forRoot(connectionOptions)],
     *     controllers: [...],
     *     providers: [...],
     * })
     * export class AppModule {}
     * ```
     *
     * @param {ConnectionOptions} options The connection options
     * @returns {DynamicModule} The dynamic module
     */
    public static forRoot(options: ConnectionOptions): DynamicModule {
        this.validateConnectionOptions(options);

        return {
            module: HichchiCrudModule,
            imports: [
                TypeOrmModule.forRoot({
                    type: options.type || "mysql",
                    host: options.host || "localhost",
                    port: options.port || DEFAULT_MYSQL_PORT,
                    username: options.username || "root",
                    password: options.password || "",
                    database: options.database,
                    entities: options.entities,
                    migrations: options.migrations,
                    charset: options.charset || "utf8mb4",
                    extra: {
                        charset: options.charset || "utf8mb4",
                    },
                    synchronize: Boolean(options.synchronize),
                    legacySpatialSupport: Boolean(options.legacySpatialSupport),
                    autoLoadEntities: options.autoLoadEntities === undefined ? true : options.autoLoadEntities,
                }),
            ],
            providers: [
                {
                    provide: CONNECTION_OPTIONS,
                    useValue: options,
                },
                EntityUtils,
            ],
        };
    }

    /**
     * Register entities for the HichchiCrudModule
     *
     * This method is used to register entities for the `HichchiCrudModule`.
     * It takes an array of entities as an argument and returns a dynamic module.
     * The entities should be custom entities that extends from `BaseEntity` provided by `@hichchi/nest-core`
     * and implement the (Not the BaseEntity from `typeorm`).
     *
     * @example
     * ```TypeScript
     * @Module({
     *     imports: [
     *         HichchiCrudModule.forFeature([UserEntity]),
     *     ],
     *     controllers: [UserController],
     *     providers: [UserService, UserRepository],
     *     exports: [UserService, UserRepository],
     * })
     * export class UserModule {}
     * ```
     *
     * @param {typeof BaseEntity[]} entities The entities to register
     * @returns {DynamicModule} The dynamic module
     */
    public static forFeature(entities: (typeof BaseEntity | typeof BaseEntityExtension)[]): DynamicModule {
        this.validateEntities(entities);

        return {
            module: HichchiCrudModule,
            imports: [TypeOrmModule.forFeature(entities)],
            exports: [TypeOrmModule],
        };
    }

    /**
     * Validates connection options for the HichchiCrudModule
     *
     * This method ensures that all required connection options are provided when
     * registering the module. It checks for the presence of essential options like
     * database name, entities, and migrations.
     *
     * If any required option is missing, it throws an ImplementationException with
     * a descriptive error message indicating which option is missing and how to fix it.
     *
     * @param {ConnectionOptions} options - The connection options to validate
     * @returns {boolean} - Returns true if all required options are present
     * @throws {ImplementationException} - If any required option is missing
     *
     * @see {@link ConnectionOptions} For the structure of connection options
     * @see {@link forRoot} The method that uses this validation
     * @private
     */
    private static validateConnectionOptions(options: ConnectionOptions): boolean {
        let option = "";

        if (!options.database) {
            option = "database";
        }

        if (!options.entities) {
            option = "entities";
        }

        if (!options.migrations) {
            option = "migrations";
        }

        if (option) {
            throw new ImplementationException(
                "Missing connection option",
                `Connection option '${option}' cannot be empty in HichchiCrudModule.forRoot()'.`,
                `Please provide a valid value for the '${option}' connection option.`,
            );
        }

        return true;
    }

    /**
     * Validates entities for registration with the HichchiCrudModule
     *
     * This method ensures that all entities being registered with the module meet
     * the required criteria:
     * 1. Each entity must be decorated with the `@HichchiEntity()` decorator
     * 2. Each entity must extend one of the base entity classes: `BaseEntity`,
     *    `BaseEntityExtension`, or `HichchiUserEntity`
     *
     * These validations ensure that entities will work correctly with the CRUD
     * functionality provided by the module. If any entity fails validation,
     * an ImplementationException is thrown with a descriptive error message.
     *
     * @param {(typeof BaseEntity | typeof BaseEntityExtension)[]} entities - Array of entity classes to validate
     * @throws {ImplementationException} - If any entity fails validation
     *
     * @see {@link BaseEntity} The primary base entity class
     * @see {@link BaseEntityExtension} Alternative base entity with extended functionality
     * @see {@link HichchiUserEntity} Specialized entity for user management
     * @see {@link forFeature} The method that uses this validation
     */
    static validateEntities(entities: (typeof BaseEntity | typeof BaseEntityExtension)[]): void {
        for (const entity of entities) {
            if (!hichchiMetadata().isHichchiEntity(entity)) {
                throw new ImplementationException(
                    "Invalid entity",
                    `'${entity.name}' must be decorated with '@HichchiEntity()'.`,
                );
            }

            if (
                Object.getPrototypeOf(entity) !== BaseEntity &&
                Object.getPrototypeOf(entity) !== BaseEntityExtension &&
                Object.getPrototypeOf(entity) !== HichchiUserEntity
            ) {
                throw new ImplementationException(
                    "Invalid entity",
                    `'${entity.name}' must extend 'BaseEntity' or 'BaseEntityExtension' or 'HichchiUserEntity'.`,
                );
            }
        }
    }
}

// TODO: need to update doc to say install `@nestjs/cache-manager, @keyv/redis, cacheable` to use cache
// TODO: winston, @nestjs/axios, @nestjs/passport, passport-jwt, bcrypt, @nestjs/jwt, passport-local, passport-google-oauth2
