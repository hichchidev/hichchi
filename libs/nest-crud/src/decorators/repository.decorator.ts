// noinspection JSUnusedGlobalSymbols

import { InjectRepository } from "@nestjs/typeorm";
import { ImplementationException } from "@hichchi/nest-core";
import { BaseEntity, BaseEntityExtension, BaseRepository } from "../base";
import { Injectable } from "@nestjs/common";
import { RepositoryDecorator } from "../types";
import { MetadataKeys } from "../enums/metadata-keys.enum";

/**
 * Decorator for creating a repository with automatic dependency injection
 *
 * This decorator simplifies the creation of TypeORM repositories by automating
 * dependency injection and entity association. It performs several tasks:
 *
 * 1. Validates that the target class extends BaseRepository
 * 2. Makes the repository injectable in NestJS's dependency injection system
 * 3. Associates the repository with the specified entity class
 * 4. Automatically injects the TypeORM repository for the entity
 *
 * Using this decorator eliminates the need to manually inject the TypeORM repository
 * in the constructor and ensures consistent repository setup across the application.
 *
 * @example
 * ```typescript
 * // Basic repository with default functionality
 * @HichchiRepository(UserEntity)
 * export class UserRepository extends BaseRepository<UserEntity> {
 *     // The decorator automatically:
 *     // - Makes this class injectable
 *     // - Injects the TypeORM repository for UserEntity
 *     // - Associates this repository with UserEntity
 *
 *     // You can add custom methods specific to UserEntity
 *     async findByEmail(email: string): Promise<UserEntity | null> {
 *         return this.getOne({ where: { email } });
 *     }
 * }
 * ```
 *
 * @example
 * ```typescript
 * // The decorator eliminates the need for this boilerplate:
 * @Injectable()
 * export class UserRepository extends BaseRepository<UserEntity> {
 *     constructor(@InjectRepository(UserEntity) repository: Repository<UserEntity>) {
 *         super(repository);
 *     }
 *
 *     // Custom methods...
 * }
 * ```
 *
 * @param {typeof BaseEntity} entity - The entity class this repository will manage
 * @returns {RepositoryDecorator} A decorator function that configures the repository class
 * @throws {ImplementationException} If the target class doesn't extend BaseRepository
 *
 * @see {@link BaseRepository} The base repository class that provides enhanced functionality
 * @see {@link BaseEntity} The base entity class that all entities should extend
 * @see {@link Injectable} NestJS decorator that marks a class as injectable
 * @see {@link InjectRepository} TypeORM decorator that injects a repository
 */
export function HichchiRepository<Entity extends typeof BaseEntity | typeof BaseEntityExtension>(
    entity: Entity,
): RepositoryDecorator {
    return function <T extends { new (...args: unknown[]): BaseRepository<BaseEntity> }>(target: T): T | void {
        if (Object.getPrototypeOf(target) !== BaseRepository) {
            throw new ImplementationException("Invalid repository", `'${target.name}' must extend BaseRepository`);
        }

        Injectable()(target);
        Reflect.defineMetadata(MetadataKeys.HICHCHI_ENTITY, entity, target);
        InjectRepository(entity)(target, undefined, 0);
    };
}
