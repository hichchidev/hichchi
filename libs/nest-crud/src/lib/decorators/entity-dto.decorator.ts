// import { Type } from "@nestjs/common";
// import { hichchiMetadata, ImplementationException } from "@hichchi/nest-core";
// import { BaseEntity, HichchiUserEntity } from "../base";
//
// // noinspection JSUnusedGlobalSymbols
// export function HichchiDto<Entity extends typeof BaseEntity>(entityOrName: Entity) {
//     return function (target: Type): void {
//         if (
//             Object.getPrototypeOf(entityOrName) !== HichchiUserEntity &&
//             Object.getPrototypeOf(entityOrName) !== BaseEntity
//         ) {
//             throw new ImplementationException(
//                 "Invalid entity",
//                 `Invalid entity '${entityOrName.name}' provided to @HichchiDto()`,
//                 "Entity must extend BaseEntity or HichchiUserEntity to work with @HichchiDto()." +
//                     " if you want to use custom entity name for errors provide it as string",
//             );
//         }
//
//         hichchiMetadata().addValidationDto(target, entityOrName);
//     };
// }
