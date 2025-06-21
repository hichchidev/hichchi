// noinspection JSUnusedGlobalSymbols

import { JoinColumn, JoinColumnOptions } from "typeorm";
import { toCamelCase } from "@hichchi/utils";
import { MetadataKeys } from "../enums/metadata-keys.enum";

/**
 * Decorator for creating a new join column
 *
 * This decorator is used to create a new join column in the database.
 * It takes the constraint and the join column options as arguments.
 *
 * join column options are the same as the `JoinColumnOptions` from the `typeorm` package.
 * property `foreignKeyConstraintName` of the join column options follow the format `FK_entityName_entityName`.
 * Ex: `FK_user_homeAddress`, `FK_userProfile_address`.
 *
 * @example
 * ```TypeScript
 * @HichchiEntity("users")
 * export class UserEntity extends BaseEntityTemplate {
 *     @ManyToOne(() => AddressEntity, homeAddress => homeAddress.user)
 *     @HichchiJoinColumn("FK_user_homeAddress")
 *     homeAddress: AddressEntity;
 * }
 * ```
 *
 * @param {JoinColumnOptions} options - The join column options
 * @returns {PropertyDecorator} The property decorator
 */
export function HichchiJoinColumn(options?: JoinColumnOptions): PropertyDecorator {
    return function (target: object, propertyKey: string | symbol): void {
        // Get the constructor of the actual class, which may be a derived class

        const entityName = toCamelCase(target.constructor.name.split("Entity")[0]);
        const foreignKeyConstraintName = `FK_${entityName}_${toCamelCase(String(propertyKey))}`;

        JoinColumn({
            ...options,
            foreignKeyConstraintName: options?.foreignKeyConstraintName || foreignKeyConstraintName,
        })(target, propertyKey);
        Reflect.defineMetadata(MetadataKeys.HICHCHI_FOREIGN_KEY, true, target, propertyKey);
    };
}
