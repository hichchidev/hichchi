// noinspection JSUnusedGlobalSymbols

import { DynamicModule, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConnectionOptions } from "./interfaces";
import { CONNECTION_OPTIONS } from "./tokens";
import { EntityUtils } from "./utils";
import { BaseEntity, HichchiUserEntity } from "./base";
import { hichchiMetadata, ImplementationException } from "@hichchi/nest-core";
import { DEFAULT_MYSQL_PORT } from "@hichchi/nest-connector";

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
    public static forFeature(entities: (typeof BaseEntity)[]): DynamicModule {
        this.validateEntities(entities);

        return {
            module: HichchiCrudModule,
            imports: [TypeOrmModule.forFeature(entities)],
            exports: [TypeOrmModule],
        };
    }

    // public static forCustomRepository<Entity extends IBaseEntity, T extends BaseRepository<Entity>>(
    //     repositories: CustomRepositoryConstructor<Entity, T>[],
    // ): DynamicModule {
    //     const providers: Provider[] = [];
    //
    //     for (const repository of repositories) {
    //         const entity = Reflect.getMetadata(CUSTOM_REPOSITORY, repository);
    //
    //         if (!entity) {
    //             continue;
    //         }
    //
    //         providers.push({
    //             inject: [getDataSourceToken()],
    //             provide: repository,
    //             useFactory: (dataSource: DataSource): BaseRepository<Entity> => {
    //                 const customRepository: Repository<Entity> = dataSource.getRepository<Entity>(entity);
    //                 return new repository(customRepository);
    //             },
    //         });
    //     }
    //
    //     return {
    //         module: HichchiCrudModule,
    //         providers,
    //         exports: providers,
    //     };
    // }

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

    static validateEntities(entities: (typeof BaseEntity)[]): void {
        for (const entity of entities) {
            if (!hichchiMetadata().isHichchiEntity(entity)) {
                throw new ImplementationException(
                    "Invalid entity",
                    `'${entity.name}' must be decorated with '@HichchiEntity()'.`,
                );
            }

            if (Object.getPrototypeOf(entity) !== BaseEntity && Object.getPrototypeOf(entity) !== HichchiUserEntity) {
                throw new ImplementationException(
                    "Invalid entity",
                    `'${entity.name}' must extend 'BaseEntity' or 'HichchiUserEntity'.`,
                );
            }
        }
    }
}
