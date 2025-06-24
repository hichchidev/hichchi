// noinspection JSUnusedGlobalSymbols

import { Entity, getMetadataArgsStorage } from "typeorm";
import { Type } from "@nestjs/common";
import { FK_CONSTRAINT_REGEX } from "../constants";
import { BaseEntityExtension } from "../base";
import { hichchiMetadata, ImplementationException } from "@hichchi/nest-core";
import { MetadataKeys } from "../enums/metadata-keys.enum";
import { EntityExtensionDecorator } from "../types";

/**
 * Decorator for creating entity extensions with enhanced validation
 *
 * This decorator is specifically designed for entity extension classes that extend
 * BaseEntityExtension. It provides validation and metadata registration for lightweight
 * entity extensions that don't require the full audit tracking capabilities of BaseEntity.
 *
 * The decorator performs several validations:
 * - Ensures the target class extends BaseEntityExtension
 * - Validates that the entity has at least one @OneToOne relation
 * - Ensures that @HichchiJoinColumn is used instead of @JoinColumn
 * - Validates foreign key constraint naming conventions
 *
 * Entity extensions are typically used for:
 * - Adding additional properties to an entity without modifying its core structure
 * - Creating specialized versions of an entity for specific use cases
 * - Implementing one-to-one relationships with shared primary keys
 *
 * @example
 * ```typescript
 * // Basic usage for a user profile extension
 * @HichchiEntityExtension("user_profiles")
 * export class UserProfileEntity extends BaseEntityExtension {
 *   @Column()
 *   bio: string;
 *
 *   @Column()
 *   avatarUrl: string;
 *
 *   @OneToOne(() => UserEntity)
 *   @HichchiJoinColumn()
 *   user: UserEntity;
 * }
 * ```
 *
 * @param {string} tableName - The name of the database table for this entity extension
 * @returns {EntityExtensionDecorator} A decorator function that configures and validates the entity extension class
 * @throws {ImplementationException} If extension class doesn't extend BaseEntityExtension or has invalid relationships
 *
 * @see {@link BaseEntityExtension} The lightweight base class that entity extensions should extend
 * @see {@link HichchiJoinColumn} The decorator required for entity relationships
 * @see {@link HichchiEntity} The decorator for standard entities with full audit tracking
 */
export function HichchiEntityExtension(tableName: string): EntityExtensionDecorator {
    return function (target: Type<BaseEntityExtension>): void {
        if (!(target.prototype instanceof BaseEntityExtension)) {
            throw new ImplementationException(
                `Extension entities must extend BaseEntityExtension: '${target.name}'`,
                `@HichchiEntityExtension("${tableName}") was used on a class that does not extend BaseEntityExtension.`,
                "Add `extends BaseEntityExtension` to extension entities to ensure proper behavior.",
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

// TODO: Improve this when have better usage
// TODO: Also validate if parent entity has one to one relationship to extension
