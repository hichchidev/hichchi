// noinspection JSUnusedGlobalSymbols

import { Entity, getMetadataArgsStorage } from "typeorm";
import { Type } from "@nestjs/common";
import { FK_CONSTRAINT_REGEX } from "../constants";
import { BaseEntity } from "../base";
import { hichchiMetadata, ImplementationException } from "@hichchi/nest-core";
import { MetadataKeys } from "../enums/metadata-keys.enum";

export function HichchiEntityExtension(tableName: string) {
    return function (target: Type<unknown>): void {
        if (target.prototype instanceof BaseEntity) {
            throw new ImplementationException(
                `Extension entities cannot extend BaseEntity: '${target.name}'`,
                `@HichchiEntityExtension("${tableName}") was used on a class that extends BaseEntity.`,
                "Remove the `extends BaseEntity` from extension entities to avoid unintended behavior.",
            );
        }

        Entity(tableName)(target);
        const metadataArgs = getMetadataArgsStorage();

        // Validate OneToOne relation with an @HichchiEntity
        const oneToOneRelations = metadataArgs.relations.filter(
            relation => relation.target === target && relation.relationType === "one-to-one",
        );

        if (oneToOneRelations.length === 0) {
            throw new ImplementationException(
                "Missing @OneToOne relation",
                `No @OneToOne relation defined in @HichchiEntityExtension("${tableName}").`,
                "HichchiEntityExtension must have a OneToOne relation to an entity decorated with @HichchiEntity.",
            );
        }

        oneToOneRelations.forEach(relation => {
            const joinColumns = metadataArgs.joinColumns.filter(
                joinColumn => joinColumn.target === target && joinColumn.propertyName === relation.propertyName,
            );

            if (joinColumns.length === 0) {
                throw new ImplementationException(
                    "Missing @HichchiJoinColumn",
                    `Missing @HichchiJoinColumn on OneToOne property '${relation.propertyName}' in @HichchiEntityExtension("${tableName}").`,
                    "Please use @HichchiJoinColumn instead of @JoinColumn for consistent foreign key validation.",
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
                        "Invalid JoinColumn",
                        `@JoinColumn used instead of @HichchiJoinColumn on '${joinColumn.propertyName}' in @HichchiEntityExtension("${tableName}").`,
                        "Use @HichchiJoinColumn to maintain naming and validation consistency.",
                    );
                }

                if (
                    joinColumn.foreignKeyConstraintName &&
                    !FK_CONSTRAINT_REGEX.test(joinColumn.foreignKeyConstraintName)
                ) {
                    throw new ImplementationException(
                        `Invalid foreign key constraint: '${joinColumn.foreignKeyConstraintName}'`,
                        "Foreign key name must follow 'FK_entity_entity' format.",
                        "Ensure constraint names are valid according to the FK naming pattern.",
                    );
                }
            });
        });

        // Register in app metadata
        hichchiMetadata().addEntity(target, tableName, []);
    };
}
