// noinspection JSUnusedGlobalSymbols

import { Entity, getMetadataArgsStorage, Unique } from "typeorm";
import { FK_CONSTRAINT_REGEX, UNIQUE_CONSTRAINT_REGEX } from "../constants";
import { BaseEntity, BaseEntityTemplateRelations, HichchiUserEntity } from "../base";
import { RelationMetadataArgs } from "typeorm/metadata-args/RelationMetadataArgs";
import { EntityOptionUnique } from "../types";
import { toCamelCase } from "@hichchi/utils";
import { USER_ENTITY_TABLE_NAME } from "../tokens";
import { hichchiMetadata, ImplementationException } from "@hichchi/nest-core";
import { Type } from "@nestjs/common";

/**
 * Decorator for creating a new entity
 *
 * This decorator is used to create a new entity in the database.
 * It takes the name of the database table, the unique constraints and the skip foreign key validation flag as arguments.
 *
 * The unique parameter accepts either an array of field names array (`string[][]`) or an object with the constraint name as the key (`EntityOptionUnique`)
 *
 * If `EntityOptionUnique` is provided, the unique constraint names must follow the format `UNIQUE_entityName_fieldName`.
 * Ex: `UNIQUE_user_email`, `UNIQUE_userProfile_phoneNumber`, `UNIQUE_user_emailAndPhoneNumber`.
 *
 * When creating relationships between entities, the `@HichchiJoinColumn` decorator must be used
 * instead of the `@JoinColumn` decorator to ensure consistent foreign key constraint validation.
 *
 * The entity options include the unique constraints.
 *
 * @example
 * ```typescript
 * @HichchiEntity("users", {
 *     UNIQUE_user_email: "email",
 *     UNIQUE_user_phone: "phone",
 * })
 * export class UserEntity extends BaseEntityTemplate {
 *     @Column()
 *     name: string;
 *
 *     @Column()
 *     email: string;
 *
 *     @Column()
 *     phone: string;
 *
 *     @ManyToOne(() => AddressEntity, homeAddress => homeAddress.user)
 *     @HichchiJoinColumn("FK_user_homeAddress")
 *     homeAddress: AddressEntity;
 * }
 * ```
 *
 * @param {string} tableName - The name of the database table
 * @param {EntityOptionUnique} unique - The unique constraints
 * @param {boolean} skipFkValidation - Skip foreign key validation
 */
export function HichchiEntity(
    tableName: string,
    unique?: EntityOptionUnique | string[] | string[][],
    skipFkValidation?: boolean,
) {
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
                    const uq = Array.isArray(unique) ? unique : [unique];
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
                            "hichchiForeignKey",
                            target.prototype,
                            joinColumn.propertyName,
                        );

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
