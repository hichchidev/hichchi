// noinspection JSUnusedGlobalSymbols

import { InjectRepository } from "@nestjs/typeorm";
import { ImplementationException } from "@hichchi/nest-core";
import { BaseEntity, BaseRepository } from "../base";
import { Injectable } from "@nestjs/common";
import { RepositoryDecorator } from "../types";

/**
 * Decorator for creating a new repository
 *
 * This decorator is used to create a new repository for the entity.
 * It takes the entity as an argument.
 *
 * @example
 * ```typescript
 * @HichchiRepository(UserEntity)
 * export class UserRepository extends BaseRepository<UserEntity> {
 *     // custom methods and overrides
 * }
 * ```
 * @example
 * ```typescript
 * @HichchiRepository(UserEntity)
 * export class UserRepository extends BaseRepository<UserEntity> {
 *     constructor(@InjectRepository(UserEntity) repository: Repository<UserEntity>) {
 *         super(repository);
 *     }
 * }
 * ```
 *
 * @param {typeof BaseEntity} entity - The entity class
 * @returns {RepositoryDecorator} The repository decorator
 */
export function HichchiRepository<Entity extends typeof BaseEntity>(entity: Entity): RepositoryDecorator {
    return function <T extends { new (...args: unknown[]): BaseRepository<BaseEntity> }>(target: T): T | void {
        if (Object.getPrototypeOf(target) !== BaseRepository) {
            throw new ImplementationException("Invalid repository", `'${target.name}' must extend BaseRepository`);
        }

        Injectable()(target);
        Reflect.defineMetadata("entity", entity, target);
        InjectRepository(entity)(target, undefined, 0);
    };
}
