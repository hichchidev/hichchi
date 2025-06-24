// noinspection JSUnusedGlobalSymbols

import { JoinColumn, JoinColumnOptions } from "typeorm";
import { toCamelCase } from "@hichchi/utils";
import { MetadataKeys } from "../enums/metadata-keys.enum";

/**
 * Decorator for creating a join column with automatic foreign key constraint naming
 *
 * This decorator extends TypeORM's JoinColumn decorator with automatic generation
 * of foreign key constraint names following a consistent naming convention.
 * It also registers metadata to mark the column as a Hichchi foreign key.
 *
 * The foreign key constraint name is automatically generated following the format
 * `FK_entityName_propertyName` and cannot be overridden. This is important for
 * entity error handling, which relies on these consistent foreign key names to
 * detect and report errors properly.
 *
 * The decorator accepts an optional JoinColumnOptions object (without the foreignKeyConstraintName
 * property) that can include other custom configuration for the join column.
 *
 * @example
 * ```typescript
 * @HichchiEntity("users")
 * export class UserEntity extends BaseEntity {
 *     @ManyToOne(() => AddressEntity)
 *     @HichchiJoinColumn()
 *     homeAddress: AddressEntity;
 *     // Generates constraint name: FK_user_homeAddress
 * }
 * ```
 *
 * @example
 * ```typescript
 * @HichchiEntity("users")
 * export class UserEntity extends BaseEntity {
 *     @ManyToOne(() => AddressEntity)
 *     @HichchiJoinColumn({
 *         referencedColumnName: "id"
 *     })
 *     homeAddress: AddressEntity;
 *     // Still generates constraint name: FK_user_homeAddress
 * }
 * ```
 *
 * @param {Omit<JoinColumnOptions, "foreignKeyConstraintName">} [options] - Optional join column configuration options (excluding foreignKeyConstraintName)
 * @returns {PropertyDecorator} A property decorator that configures the join column
 *
 * @see {@link JoinColumn} TypeORM's JoinColumn decorator that this extends
 */
export function HichchiJoinColumn(options?: Omit<JoinColumnOptions, "foreignKeyConstraintName">): PropertyDecorator {
    return function (target: object, propertyKey: string | symbol): void {
        // Get the constructor of the actual class, which may be a derived class

        const entityName = toCamelCase(target.constructor.name.split("Entity")[0]);
        const foreignKeyConstraintName = `FK_${entityName}_${toCamelCase(String(propertyKey))}`;

        JoinColumn({
            ...options,
            foreignKeyConstraintName,
        })(target, propertyKey);
        Reflect.defineMetadata(MetadataKeys.HICHCHI_FOREIGN_KEY, true, target, propertyKey);
    };
}
