// noinspection JSUnusedGlobalSymbols,ExceptionCaughtLocallyJS

import { HttpException, InternalServerErrorException, NotFoundException, Type } from "@nestjs/common";
import { BaseRepository } from "./base";
import { DeepPartial, EntityManager, FindOptionsWhere, SaveOptions } from "typeorm";
import { GetAllOptions, GetByIdOptions, GetByIdsOptions, GetManyOptions, GetOneOptions } from "./interfaces";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
import { EntityUtils } from "./utils";
import { Operation } from "./enums";
import { CrudErrorResponses } from "./responses";
import { TypeORMErrorHandler } from "./types";
import { isUUID } from "class-validator";
import { PaginatedResponse } from "./classes";
import { hichchiMetadata, ImplementationException } from "@hichchi/nest-core";
import { SuccessResponse, UserInfo } from "@hichchi/nest-connector";
import { EntityId, Model, Pagination } from "@hichchi/nest-connector/crud";

export abstract class CrudService<BaseEntity extends Model> {
    private readonly entityName: string;

    private readonly uniqueFieldNames?: string[];

    // noinspection TypeScriptAbstractClassConstructorCanBeMadeProtected
    constructor(public readonly repository: BaseRepository<BaseEntity>) {
        if (!repository) {
            throw new ImplementationException(
                "Repository not provided",
                "A repository must be provided to the CrudService constructor.",
            );
        }
        this.entityName = hichchiMetadata().getEntityName(repository.target as Type) || "";
        this.uniqueFieldNames = hichchiMetadata().getEntityUnique(repository.target as Type) || [];
    }

    // abstract map(entity: Entity): Entity;

    create<T extends DeepPartial<BaseEntity>>(createDto: T, eh?: TypeORMErrorHandler): BaseEntity {
        try {
            return this.repository.create(createDto);
        } catch (e: unknown) {
            this.handleError(e, eh);
        }
    }

    async save<T extends DeepPartial<BaseEntity>>(
        createDto: T,
        options?: SaveOptions & GetByIdOptions<BaseEntity>,
        createdBy?: UserInfo,
        eh?: TypeORMErrorHandler,
    ): Promise<BaseEntity | null> {
        try {
            const entity = this.create({ ...createDto, createdBy });

            return await this.repository.saveAndGet(entity, { ...options });
        } catch (e: unknown) {
            this.handleError(e, eh);
        }
    }

    async saveMany<T extends DeepPartial<BaseEntity>>(
        createDtos: T[],
        options?: SaveOptions,
        createdBy?: UserInfo,
        eh?: TypeORMErrorHandler,
    ): Promise<BaseEntity[]> {
        try {
            return await this.repository.saveMany(
                createDtos.map(createDto => ({ ...createDto, createdBy: createdBy || null })),
                options,
            );
        } catch (e: unknown) {
            this.handleError(e, eh);
        }
    }

    async update<T extends QueryDeepPartialEntity<BaseEntity>>(
        id: EntityId,
        updateDto: T,
        options?: GetByIdOptions<BaseEntity>,
        updatedBy?: UserInfo,
        eh?: TypeORMErrorHandler,
    ): Promise<BaseEntity> {
        try {
            if (!isUUID(id, 4)) {
                throw new NotFoundException(CrudErrorResponses.E_400_ID(this.entityName));
            }

            const { affected } = await this.repository.update(id, { ...updateDto, updatedBy });
            if (affected === 0) {
                return EntityUtils.handleError(
                    new InternalServerErrorException(
                        CrudErrorResponses.E_500_OPERATION(this.entityName, Operation.UPDATE),
                    ),
                    this.entityName,
                );
            }

            return await this.get(id, options);
        } catch (e: unknown) {
            this.handleError(e, eh);
        }
    }

    async updateOne<T extends QueryDeepPartialEntity<BaseEntity>>(
        where: FindOptionsWhere<BaseEntity>,
        updateDto: T,
        updatedBy?: UserInfo,
        eh?: TypeORMErrorHandler,
    ): Promise<BaseEntity> {
        try {
            const { affected } = await this.repository.updateOne(where, { ...updateDto, updatedBy });
            if (affected === 0) {
                return EntityUtils.handleError(
                    new InternalServerErrorException(
                        CrudErrorResponses.E_500_OPERATION(this.entityName, Operation.UPDATE),
                    ),
                    this.entityName,
                );
            }

            return await this.getOne({ where });
        } catch (e: unknown) {
            this.handleError(e, eh);
        }
    }

    async updateMany<T extends QueryDeepPartialEntity<BaseEntity>>(
        where: FindOptionsWhere<BaseEntity>,
        updateDto: T,
        updatedBy?: UserInfo,
        eh?: TypeORMErrorHandler,
    ): Promise<SuccessResponse> {
        try {
            const { affected } = await this.repository.updateMany(where, { ...updateDto, updatedBy });
            if (affected === 0) {
                return EntityUtils.handleError(
                    new InternalServerErrorException(
                        CrudErrorResponses.E_500_OPERATION(this.entityName, Operation.UPDATE),
                    ),
                    this.entityName,
                );
            }

            return EntityUtils.handleSuccess(this.entityName, Operation.UPDATE);
        } catch (e: unknown) {
            this.handleError(e, eh);
        }
    }

    async updateByIds<T extends QueryDeepPartialEntity<BaseEntity>>(
        ids: EntityId[],
        updateDto: T,
        updatedBy?: UserInfo,
        eh?: TypeORMErrorHandler,
    ): Promise<SuccessResponse> {
        if (ids.some(id => !isUUID(id, 4))) {
            throw new NotFoundException(CrudErrorResponses.E_400_ID(this.entityName));
        }

        try {
            const { affected } = await this.repository.updateByIds(ids, { ...updateDto, updatedBy });
            if (affected === 0) {
                return EntityUtils.handleError(
                    new InternalServerErrorException(
                        CrudErrorResponses.E_500_OPERATION(this.entityName, Operation.UPDATE),
                    ),
                    this.entityName,
                );
            }

            return EntityUtils.handleSuccess(this.entityName, Operation.UPDATE);
        } catch (e: unknown) {
            this.handleError(e, eh);
        }
    }

    async get(id: EntityId, options?: GetByIdOptions<BaseEntity>, eh?: TypeORMErrorHandler): Promise<BaseEntity> {
        try {
            if (!isUUID(id, 4)) {
                throw new NotFoundException(CrudErrorResponses.E_400_ID(this.entityName));
            }

            const entity = await this.repository.get(id, options);
            if (entity) {
                return entity;
            }

            throw new NotFoundException(CrudErrorResponses.E_404_ID(this.entityName));
        } catch (e: unknown) {
            this.handleError(e, eh);
        }
    }

    async getByIds(getByIds: GetByIdsOptions<BaseEntity>, eh?: TypeORMErrorHandler): Promise<BaseEntity[]> {
        try {
            if (getByIds.ids.some(id => !isUUID(id, 4))) {
                throw new NotFoundException(CrudErrorResponses.E_400_ID(this.entityName));
            }

            return await this.repository.getByIds(getByIds);
        } catch (e: unknown) {
            this.handleError(e, eh);
        }
    }

    async getOne(getOne: GetOneOptions<BaseEntity>, eh?: TypeORMErrorHandler): Promise<BaseEntity> {
        try {
            const entity = await this.repository.getOne(getOne);
            if (entity) {
                return entity;
            }

            throw new NotFoundException(CrudErrorResponses.E_404_CONDITION(this.entityName));
        } catch (e: unknown) {
            this.handleError(e, eh);
        }
    }

    getMany<Options extends GetManyOptions<BaseEntity>>(
        getMany: Options,
        eh?: TypeORMErrorHandler,
    ): Options extends { pagination: Pagination } ? Promise<PaginatedResponse<BaseEntity>> : Promise<BaseEntity[]>;

    async getMany(
        getMany: GetManyOptions<BaseEntity>,
        eh?: TypeORMErrorHandler,
    ): Promise<PaginatedResponse<BaseEntity> | BaseEntity[]> {
        try {
            const [data, rowCount] = await this.repository.getMany({ ...getMany });

            return getMany.pagination ? new PaginatedResponse(data, rowCount, getMany.pagination) : data;
        } catch (e: unknown) {
            this.handleError(e, eh);
        }
    }

    getAll<Options extends GetAllOptions<BaseEntity>>(
        getAll?: Options,
        eh?: TypeORMErrorHandler,
    ): Options extends { pagination: Pagination } ? Promise<PaginatedResponse<BaseEntity>> : Promise<BaseEntity[]>;

    async getAll<Options extends GetAllOptions<BaseEntity>>(
        getAll?: Options,
        eh?: TypeORMErrorHandler,
    ): Promise<PaginatedResponse<BaseEntity> | BaseEntity[]> {
        try {
            const [data, rowCount] = await this.repository.getMany({ ...getAll });

            return getAll?.pagination ? new PaginatedResponse(data, rowCount, getAll.pagination) : data;
        } catch (e: unknown) {
            this.handleError(e, eh);
        }
    }

    async delete(id: EntityId, wipe?: true, eh?: TypeORMErrorHandler): Promise<BaseEntity>;

    async delete(id: EntityId, deletedBy?: UserInfo, eh?: TypeORMErrorHandler): Promise<BaseEntity>;

    async delete(id: EntityId, deletedByOrWipe?: UserInfo | boolean, eh?: TypeORMErrorHandler): Promise<BaseEntity> {
        try {
            if (!isUUID(id, 4)) {
                throw new NotFoundException(CrudErrorResponses.E_400_ID(this.entityName));
            }

            const wipe = typeof deletedByOrWipe === "boolean" ? deletedByOrWipe : false;
            const deletedBy = typeof deletedByOrWipe === "object" ? deletedByOrWipe : undefined;
            let deletedRecord = await this.get(id, undefined);
            const { affected } = wipe ? await this.repository.hardDelete(id) : await this.repository.delete(id);
            if (affected !== 0) {
                if (!wipe && deletedBy) {
                    try {
                        deletedRecord = await this.update(id, {}, undefined, deletedBy);
                    } catch {
                        /* empty */
                    }
                }
                return deletedRecord;
            }

            throw new NotFoundException(CrudErrorResponses.E_404_ID(this.entityName));
        } catch (e: unknown) {
            this.handleError(e, eh);
        }
    }

    async deleteOne(where: FindOptionsWhere<BaseEntity>, wipe?: true, eh?: TypeORMErrorHandler): Promise<BaseEntity>;

    async deleteOne(
        where: FindOptionsWhere<BaseEntity>,
        deletedBy?: UserInfo,
        eh?: TypeORMErrorHandler,
    ): Promise<BaseEntity>;

    async deleteOne(
        where: FindOptionsWhere<BaseEntity>,
        deletedByOrWipe?: UserInfo | boolean,
        eh?: TypeORMErrorHandler,
    ): Promise<BaseEntity> {
        try {
            const wipe = typeof deletedByOrWipe === "boolean" ? deletedByOrWipe : false;
            const deletedBy = typeof deletedByOrWipe === "object" ? deletedByOrWipe : undefined;
            let entity = await this.repository.getOne({ where });
            if (!entity) {
                throw new NotFoundException(CrudErrorResponses.E_404_CONDITION(this.entityName));
            }

            const { affected } = wipe
                ? await this.repository.hardDelete(entity.id)
                : await this.repository.delete(entity.id);

            if (affected !== 0) {
                if (!wipe && deletedBy) {
                    try {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        entity = await this.update(entity.id, { deletedBy } as any);
                    } catch {
                        /* empty */
                    }
                }

                return entity;
            }

            throw new NotFoundException(CrudErrorResponses.E_404_ID(this.entityName));
        } catch (e: unknown) {
            this.handleError(e, eh);
        }
    }

    async deleteMany(where: FindOptionsWhere<BaseEntity>, wipe?: true, eh?: TypeORMErrorHandler): Promise<BaseEntity[]>;

    async deleteMany(
        where: FindOptionsWhere<BaseEntity>,
        deletedBy?: UserInfo,
        eh?: TypeORMErrorHandler,
    ): Promise<BaseEntity[]>;

    async deleteMany(
        where: FindOptionsWhere<BaseEntity>,
        deletedByOrWipe?: UserInfo | boolean,
        eh?: TypeORMErrorHandler,
    ): Promise<BaseEntity[]> {
        try {
            const wipe = typeof deletedByOrWipe === "boolean" ? deletedByOrWipe : false;
            const deletedBy = typeof deletedByOrWipe === "object" ? deletedByOrWipe : undefined;
            const entities = await this.getMany({ where });

            const ids = entities.map(entity => entity.id);
            const { affected } = wipe
                ? await this.repository.hardDeleteByIds(ids)
                : await this.repository.deleteByIds(ids);

            if (affected !== 0) {
                if (!wipe && deletedBy) {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    await this.updateByIds(ids, { deletedBy } as any);
                }

                return entities;
            }
            throw new NotFoundException(CrudErrorResponses.E_404_ID(this.entityName));
        } catch (e: unknown) {
            this.handleError(e, eh);
        }
    }

    async deleteByIds(ids: EntityId[], wipe?: true, eh?: TypeORMErrorHandler): Promise<SuccessResponse>;

    async deleteByIds(ids: EntityId[], deletedBy?: UserInfo, eh?: TypeORMErrorHandler): Promise<SuccessResponse>;

    async deleteByIds(
        ids: EntityId[],
        deletedByOrWipe?: UserInfo | boolean,
        eh?: TypeORMErrorHandler,
    ): Promise<SuccessResponse> {
        try {
            const wipe = typeof deletedByOrWipe === "boolean" ? deletedByOrWipe : false;
            const deletedBy = typeof deletedByOrWipe === "object" ? deletedByOrWipe : undefined;
            const { affected } = wipe
                ? await this.repository.hardDeleteByIds(ids)
                : await this.repository.deleteByIds(ids);

            if (affected !== 0) {
                if (!wipe && deletedBy) {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    await this.updateByIds(ids, { deletedBy } as any);
                }
                return EntityUtils.handleSuccess(this.entityName, Operation.DELETE);
            }

            throw new NotFoundException(CrudErrorResponses.E_404_ID(this.entityName));
        } catch (e: unknown) {
            this.handleError(e, eh);
        }
    }

    async count(getMany?: GetManyOptions<BaseEntity>, eh?: TypeORMErrorHandler): Promise<number> {
        try {
            return await this.repository.countMany(getMany);
        } catch (e: unknown) {
            this.handleError(e, eh);
        }
    }

    transaction<T>(operation: (manager: EntityManager) => Promise<T>): Promise<T> {
        return this.repository.transaction(operation);
    }

    async try<T>(fn: () => Promise<T>): Promise<T> {
        try {
            return await fn();
        } catch (e: unknown) {
            this.handleError(e);
        }
    }

    handleError(e: unknown, eh?: TypeORMErrorHandler): never {
        if (e instanceof HttpException) {
            throw e;
        }

        if (eh) {
            const err = eh(e);
            if (err) {
                throw err;
            }
        }

        EntityUtils.handleError(e, this.entityName, this.uniqueFieldNames);
    }
}
