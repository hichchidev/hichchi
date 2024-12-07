import { Type } from "@nestjs/common";
import { hichchiMetadata, ImplementationException } from "@hichchi/nest-core";
import { BaseEntity, HichchiUserEntity } from "../base";

export function HichchiDto<Entity extends typeof BaseEntity>(entityOrName: Entity | string) {
    return function (target: Type): void {
        if (
            typeof entityOrName !== "string" &&
            Object.getPrototypeOf(entityOrName) !== HichchiUserEntity &&
            Object.getPrototypeOf(entityOrName) !== BaseEntity
        ) {
            throw new ImplementationException(
                "Invalid entity",
                `Invalid entity '${entityOrName.name}' provided to @HichchiDto()`,
                "Entity must extend BaseEntity or HichchiUserEntity to work with @HichchiDto()." +
                    " if you want to use custom entity name for errors provide it as string",
            );
        }

        hichchiMetadata().addValidationDto(target, entityOrName);
    };
}
