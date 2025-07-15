// noinspection JSUnusedGlobalSymbols

import { Entity, getMetadataArgsStorage, Unique } from "typeorm";
import { FK_CONSTRAINT_REGEX, UNIQUE_CONSTRAINT_REGEX } from "../constants";
import { BaseEntity, BaseEntityTemplateRelations, HichchiUserEntity } from "../base";
import { RelationMetadataArgs } from "typeorm/metadata-args/RelationMetadataArgs";
import { EntityDecorator, EntityOptionUnique } from "../types";
import { Type } from "@nestjs/common";
import { hichchiMetadata, ImplementationException } from "@hichchi/nest-core";
import { toCamelCase } from "@hichchi/utils";
import { USER_ENTITY_TABLE_NAME } from "../tokens";
import { MetadataKeys } from "../enums/metadata-keys.enum";

/**
 * Decorator for creating a new entity with enhanced validation and metadata registration
 *
 * This decorator extends TypeORM's Entity decorator with additional validation and metadata
 * registration capabilities. It ensures consistent naming conventions, proper relationship
 * definitions, and automatic metadata registration for the Hichchi framework.
 *
 * The decorator performs several validations:
 * - Ensures entity class names end with 'Entity'
 * - Validates table names for entities extending HichchiUserEntity
 * - Enforces proper unique constraint naming conventions
 * - Requires @HichchiJoinColumn for relationships to ensure consistent foreign key constraints
 * - Validates foreign key constraint naming conventions
 *
 * After validation, it registers the entity with TypeORM and the Hichchi metadata system,
 * making it available for various framework features like automatic DTO generation.
 *
 * The unique parameter accepts three formats:
 * 1. An object with constraint names as keys (`EntityOptionUnique`)
 * 2. An array of field names (`string[]`)
 * 3. An array of arrays of field names (`string[][]`)
 *
 * @example
 * ```typescript
 * // Basic usage with unique constraints as an object
 * @HichchiEntity("users", {
 *     UNIQUE_user_email: "email",
 *     UNIQUE_user_phone: "phone",
 * })
 * export class UserEntity extends BaseEntity {
 *     @Column()
 *     name: string;
 *
 *     @Column()
 *     email: string;
 *
 *     @Column()
 *     phone: string;
 *
 *     @ManyToOne(() => AddressEntity)
 *     @HichchiJoinColumn()
 *     homeAddress: AddressEntity;
 * }
 * ```
 *
 * @example
 * ```typescript
 * // Using array format for unique constraints
 * @HichchiEntity("products", [
 *     ["sku"],
 *     ["name", "category"] // Composite unique constraint
 * ])
 * export class ProductEntity extends BaseEntity {
 *     @Column()
 *     sku: string;
 *
 *     @Column()
 *     name: string;
 *
 *     @Column()
 *     category: string;
 *
 *     @Column("decimal")
 *     price: number;
 * }
 * ```
 *
 * @example
 * ```typescript
 * // Skipping foreign key validation (use with caution)
 * @HichchiEntity("temporary_data", null, true)
 * export class TemporaryDataEntity extends BaseEntity {
 *     @Column()
 *     data: string;
 *
 *     // This would normally require @HichchiJoinColumn,
 *     // but validation is skipped
 *     @ManyToOne(() => UserEntity)
 *     @JoinColumn()
 *     user: UserEntity;
 * }
 * ```
 *
 * @param {string} tableName - The name of the database table for this entity
 * @param {EntityOptionUnique | string[] | string[][]} [unique] - Unique constraints for the entity.
 *        When provided as an object, keys must follow the format 'UNIQUE_entityName_fieldName'.
 * @param {boolean} [skipFkValidation] - When true, skips validation of foreign key constraints.
 *        Use with caution as it bypasses important relationship validations.
 * @returns {EntityDecorator} A decorator function that configures and validates the entity class
 * @throws {ImplementationException} If entity naming conventions or relationship definitions are invalid
 *
 * @see {@link BaseEntity} The base class that all entities should extend
 * @see {@link HichchiJoinColumn} The decorator required for entity relationships
 * @see {@link EntityOptionUnique} The type definition for unique constraint configuration
 */
export function HichchiEntity(
    tableName: string,
    unique?: EntityOptionUnique | string[] | string[][],
    skipFkValidation?: boolean,
): EntityDecorator {
    return function (target: Type<BaseEntity>): void {
        if (!target.name.endsWith("Entity")) {
            throw new ImplementationException(
                `Invalid entity class name: '${target.name}'`,
                `Invalid entity class name assigned the class decorated with @HichchiEntity("${tableName}").`,
                "Entity names must end with 'Entity'.",
            );
        }

        if (Object.getPrototypeOf(target) === HichchiUserEntity && tableName !== USER_ENTITY_TABLE_NAME) {
            throw new ImplementationException(
                `Invalid table name: '${tableName}'`,
                `The table name assigned to the class decorated with @HichchiEntity("${tableName}") is invalid.`,
                `The table name for an entity that extends HichchiUserEntity must be '${USER_ENTITY_TABLE_NAME}'.\n` +
                    "You can import the correct table name from the constant 'USER_ENTITY_TABLE_NAME' in the '@hichchi/nest-crud' package.",
            );
        }

        Entity(tableName)(target);

        const metadataArgs = getMetadataArgsStorage();
        const entityRelations = metadataArgs.relations.filter(relation => relation.target === target);
        const tableUnique: string[] = [];

        if (unique) {
            if (Array.isArray(unique)) {
                unique.forEach(unique => {
                    const uq = (Array.isArray(unique) ? unique : [unique]) as string[];
                    const entityName = toCamelCase(toCamelCase(target.name.split("Entity")[0]));
                    const fields = uq.map(field => toCamelCase(field)).join("And");
                    Unique(`UNIQUE_${entityName}_${fields}`, uq)(target);
                    tableUnique.push(...uq);
                });
            } else {
                Object.entries(unique).forEach(([constraintName, columns]) => {
                    if (!constraintName.match(UNIQUE_CONSTRAINT_REGEX)) {
                        throw new ImplementationException(
                            `Invalid unique constraint: '${constraintName}'`,
                            `Invalid unique constraint format provided to @HichchiEntity("${tableName}").`,
                            "Unique constraints must follow the format 'UNIQUE_entityName_fieldName'.",
                        );
                    }
                    Unique(constraintName, Array.isArray(columns) ? columns : [columns])(target);
                    tableUnique.push(...(Array.isArray(columns) ? columns : [columns]));
                });
            }
        }

        if (target !== HichchiUserEntity) {
            const uniques = metadataArgs.uniques.find(unique => unique.target === target);

            if (Array.isArray(uniques?.columns)) {
                tableUnique.push(...uniques.columns);
            } else if (typeof uniques?.columns === "function") {
                const columns = uniques.columns();
                tableUnique.push(...(typeof columns === "object" ? Object.keys(columns) : []));
            }

            hichchiMetadata().addEntity(target, tableName, tableUnique);
        }

        if (!skipFkValidation) {
            entityRelations.forEach(() => {
                const relevantRelations = metadataArgs.relations.filter(
                    relation =>
                        relation.target === target &&
                        (relation.relationType === "many-to-one" || relation.relationType === "one-to-one"),
                );

                relevantRelations.forEach((relation: RelationMetadataArgs) => {
                    const joinColumns = metadataArgs.joinColumns.filter(
                        joinColumn => joinColumn.target === target && joinColumn.propertyName === relation.propertyName,
                    );

                    // Validate ManyToOne and OneToOne relations for HichchiJoinColumn
                    if (
                        !BaseEntityTemplateRelations.includes(relation.propertyName) &&
                        (relation.relationType === "many-to-one" || relation.relationType === "one-to-one") &&
                        joinColumns.length === 0
                    ) {
                        throw new ImplementationException(
                            "Missing @HichchiJoinColumn",
                            `Missing @HichchiJoinColumn on @${relation.relationType} relation '${relation.propertyName}' in @HichchiEntity("${tableName}").`,
                            "Please use @HichchiJoinColumn to specify a foreign key constraint for this relation.",
                        );
                    }

                    // Validate HichchiJoinColumn usage
                    joinColumns.forEach(joinColumn => {
                        const isHichchiJoinColumn = Reflect.getMetadata(
                            MetadataKeys.HICHCHI_FOREIGN_KEY,
                            target.prototype as Type,
                            joinColumn.propertyName,
                        ) as string | symbol;

                        if (!isHichchiJoinColumn) {
                            throw new ImplementationException(
                                "Missing @HichchiJoinColumn",
                                `@JoinColumn detected on property '${joinColumn.propertyName}' in @HichchiEntity("${tableName}").`,
                                "Please use @HichchiJoinColumn instead of @JoinColumn for consistent foreign key constraint validation.",
                            );
                        }

                        // Validate foreignKeyConstraintName
                        const foreignKeyConstraintName = joinColumn.foreignKeyConstraintName;
                        if (foreignKeyConstraintName && !FK_CONSTRAINT_REGEX.test(foreignKeyConstraintName)) {
                            throw new ImplementationException(
                                `Invalid foreign key constraint: '${foreignKeyConstraintName}'`,
                                "Invalid foreign key constraint format provided to @HichchiJoinColumn()" +
                                    ` on property '${joinColumn.propertyName}' in @HichchiEntity("${tableName}").`,
                                "Foreign key constraints must follow the format 'FK_entityName_entityName'.",
                            );
                        }
                    });
                });
            });
        }
    };
}
