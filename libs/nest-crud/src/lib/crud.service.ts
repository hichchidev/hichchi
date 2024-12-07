// noinspection JSUnusedGlobalSymbols

import { HttpException, InternalServerErrorException, NotFoundException, Type } from "@nestjs/common";
import { BaseRepository } from "./base";
import { DeepPartial, EntityManager, FindOptionsWhere, SaveOptions } from "typeorm";
import {
    GetAllOptions,
    GetByIdOptions,
    GetByIdsOptions,
    GetManyOptions,
    GetOneOptions,
    IBaseEntity,
} from "./interfaces";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
import { EntityUtils } from "./utils";
import { Operation } from "./enums";
import { EntityErrors } from "./responses";
import { TypeORMErrorHandler } from "./types";
import { isUUID } from "class-validator";
import { PaginatedResponse } from "./classes";
import {
    hichchiMetadata,
    ImplementationException,
    IPagination,
    IStatusResponse,
    IUserEntity,
} from "@hichchi/nest-core";

export abstract class CrudService<Entity extends IBaseEntity> {
    private readonly entityName: string;

    private readonly uniqueFieldNames?: string[];

    // noinspection TypeScriptAbstractClassConstructorCanBeMadeProtected
    constructor(public readonly repository: BaseRepository<Entity>) {
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

    create<T extends DeepPartial<Entity>>(createDto: T, eh?: TypeORMErrorHandler): Entity {
        try {
            return this.repository.create(createDto);
        } catch (e: unknown) {
            if (eh) {
                const err = eh(e);
                if (err) {
                    throw err;
                }
            }

            EntityUtils.handleError(e, this.entityName, this.uniqueFieldNames);
        }
    }

    async save<T extends DeepPartial<Entity>>(
        createDto: T,
        options?: SaveOptions & GetByIdOptions<Entity>,
        createdBy?: IUserEntity,
        eh?: TypeORMErrorHandler,
    ): Promise<Entity | null> {
        try {
            const entity = this.create({ ...createDto, createdBy });

            return await this.repository.saveAndGet(entity, { ...options });
        } catch (e: unknown) {
            if (eh) {
                const err = eh(e);
                if (err) {
                    throw err;
                }
            }

            EntityUtils.handleError(e, this.entityName, this.uniqueFieldNames);
        }
    }

    async saveMany<T extends DeepPartial<Entity>>(
        createDtos: T[],
        options?: SaveOptions,
        createdBy?: IUserEntity,
        eh?: TypeORMErrorHandler,
    ): Promise<Entity[]> {
        try {
            return await this.repository.saveMany(
                createDtos.map(createDto => ({ ...createDto, createdBy: createdBy || null })),
                options,
            );
        } catch (e: unknown) {
            if (eh) {
                const err = eh(e);
                if (e) {
                    throw err;
                }
            }

            EntityUtils.handleError(e, this.entityName, this.uniqueFieldNames);
        }
    }

    async update<T extends QueryDeepPartialEntity<Entity>>(
        id: string,
        updateDto: T,
        options?: GetByIdOptions<Entity>,
        updatedBy?: IUserEntity,
        eh?: TypeORMErrorHandler,
    ): Promise<Entity> {
        try {
            if (!isUUID(id, 4)) {
                return Promise.reject(new NotFoundException(EntityErrors.E_400_ID(this.entityName)));
            }

            const { affected } = await this.repository.update(id, { ...updateDto, updatedBy });
            if (affected === 0) {
                return EntityUtils.handleError(
                    new InternalServerErrorException(EntityErrors.E_500_OPERATION(this.entityName, Operation.UPDATE)),
                    this.entityName,
                );
            }

            return this.get(id, options);
        } catch (e: unknown) {
            if (eh) {
                const err = eh(e);
                if (e) {
                    throw err;
                }
            }

            EntityUtils.handleError(e, this.entityName, this.uniqueFieldNames);
        }
    }

    async updateOne<T extends QueryDeepPartialEntity<Entity>>(
        where: FindOptionsWhere<Entity>,
        updateDto: T,
        updatedBy?: IUserEntity,
        eh?: TypeORMErrorHandler,
    ): Promise<Entity> {
        try {
            const { affected } = await this.repository.updateOne(where, { ...updateDto, updatedBy });
            if (affected === 0) {
                return EntityUtils.handleError(
                    new InternalServerErrorException(EntityErrors.E_500_OPERATION(this.entityName, Operation.UPDATE)),
                    this.entityName,
                );
            }

            return this.getOne({ where });
        } catch (e: unknown) {
            if (eh) {
                const err = eh(e);
                if (e) {
                    throw err;
                }
            }

            EntityUtils.handleError(e, this.entityName, this.uniqueFieldNames);
        }
    }

    async updateMany<T extends QueryDeepPartialEntity<Entity>>(
        where: FindOptionsWhere<Entity>,
        updateDto: T,
        updatedBy?: IUserEntity,
        eh?: TypeORMErrorHandler,
    ): Promise<IStatusResponse> {
        try {
            const { affected } = await this.repository.updateMany(where, { ...updateDto, updatedBy });
            if (affected === 0) {
                return EntityUtils.handleError(
                    new InternalServerErrorException(EntityErrors.E_500_OPERATION(this.entityName, Operation.UPDATE)),
                    this.entityName,
                );
            }

            return EntityUtils.handleSuccess(this.entityName, Operation.UPDATE);
        } catch (e: unknown) {
            if (eh) {
                const err = eh(e);
                if (e) {
                    throw err;
                }
            }

            EntityUtils.handleError(e, this.entityName, this.uniqueFieldNames);
        }
    }

    async updateByIds<T extends QueryDeepPartialEntity<Entity>>(
        ids: string[],
        updateDto: T,
        updatedBy?: IUserEntity,
        eh?: TypeORMErrorHandler,
    ): Promise<IStatusResponse> {
        if (ids.some(id => !isUUID(id, 4))) {
            return Promise.reject(new NotFoundException(EntityErrors.E_400_ID(this.entityName)));
        }

        try {
            const { affected } = await this.repository.updateByIds(ids, { ...updateDto, updatedBy });
            if (affected === 0) {
                return EntityUtils.handleError(
                    new InternalServerErrorException(EntityErrors.E_500_OPERATION(this.entityName, Operation.UPDATE)),
                    this.entityName,
                );
            }

            return EntityUtils.handleSuccess(this.entityName, Operation.UPDATE);
        } catch (e: unknown) {
            if (eh) {
                const err = eh(e);
                if (e) {
                    throw err;
                }
            }

            EntityUtils.handleError(e, this.entityName, this.uniqueFieldNames);
        }
    }

    async get(id: string, options?: GetByIdOptions<Entity>, eh?: TypeORMErrorHandler): Promise<Entity> {
        try {
            if (!isUUID(id, 4)) {
                return Promise.reject(new NotFoundException(EntityErrors.E_400_ID(this.entityName)));
            }

            const entity = await this.repository.get(id, options);
            if (entity) {
                return entity;
            }

            return Promise.reject(new NotFoundException(EntityErrors.E_404_ID(this.entityName)));
        } catch (e: unknown) {
            if (eh) {
                const err = eh(e);
                if (e) {
                    throw err;
                }
            }

            EntityUtils.handleError(e, this.entityName, this.uniqueFieldNames);
        }
    }

    async getByIds(getByIds: GetByIdsOptions<Entity>, eh?: TypeORMErrorHandler): Promise<Entity[]> {
        try {
            if (getByIds.ids.some(id => !isUUID(id, 4))) {
                return Promise.reject(new NotFoundException(EntityErrors.E_400_ID(this.entityName)));
            }

            return await this.repository.getByIds(getByIds);
        } catch (e: unknown) {
            if (eh) {
                const err = eh(e);
                if (e) {
                    throw err;
                }
            }

            EntityUtils.handleError(e, this.entityName, this.uniqueFieldNames);
        }
    }

    async getOne(getOne: GetOneOptions<Entity>, eh?: TypeORMErrorHandler): Promise<Entity> {
        try {
            const entity = await this.repository.getOne(getOne);
            if (entity) {
                return entity;
            }

            return Promise.reject(new NotFoundException(EntityErrors.E_404_CONDITION(this.entityName)));
        } catch (e: unknown) {
            if (eh) {
                const err = eh(e);
                if (e) {
                    throw err;
                }
            }

            EntityUtils.handleError(e, this.entityName, this.uniqueFieldNames);
        }
    }

    getMany<Options extends GetManyOptions<Entity>>(
        getMany: Options,
        eh?: TypeORMErrorHandler,
    ): Options extends { pagination: IPagination } ? Promise<PaginatedResponse<Entity>> : Promise<Entity[]>;

    async getMany(
        getMany: GetManyOptions<Entity>,
        eh?: TypeORMErrorHandler,
    ): Promise<PaginatedResponse<Entity> | Entity[]> {
        try {
            const [data, rowCount] = await this.repository.getMany({ ...getMany });

            return getMany.pagination ? new PaginatedResponse(data, rowCount, getMany.pagination) : data;
        } catch (e: unknown) {
            if (eh) {
                const err = eh(e);
                if (e) {
                    throw err;
                }
            }

            EntityUtils.handleError(e, this.entityName, this.uniqueFieldNames);
        }
    }

    getAll<Options extends GetAllOptions<Entity>>(
        getAll?: Options,
        eh?: TypeORMErrorHandler,
    ): Options extends { pagination: IPagination } ? Promise<PaginatedResponse<Entity>> : Promise<Entity[]>;

    async getAll<Options extends GetAllOptions<Entity>>(
        getAll?: Options,
        eh?: TypeORMErrorHandler,
    ): Promise<PaginatedResponse<Entity> | Entity[]> {
        try {
            const [data, rowCount] = await this.repository.getMany({ ...getAll });

            return getAll?.pagination ? new PaginatedResponse(data, rowCount, getAll.pagination) : data;
        } catch (e: unknown) {
            if (eh) {
                const err = eh(e);
                if (e) {
                    throw err;
                }
            }

            EntityUtils.handleError(e, this.entityName, this.uniqueFieldNames);
        }
    }

    async delete(id: string, wipe?: true, eh?: TypeORMErrorHandler): Promise<Entity>;

    async delete(id: string, deletedBy?: IUserEntity, eh?: TypeORMErrorHandler): Promise<Entity>;

    async delete(id: string, deletedByOrWipe?: IUserEntity | boolean, eh?: TypeORMErrorHandler): Promise<Entity> {
        try {
            if (!isUUID(id, 4)) {
                return Promise.reject(new NotFoundException(EntityErrors.E_400_ID(this.entityName)));
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

            return Promise.reject(new NotFoundException(EntityErrors.E_404_ID(this.entityName)));
        } catch (e: unknown) {
            if (eh) {
                const err = eh(e);
                if (e) {
                    throw err;
                }
            }

            EntityUtils.handleError(e, this.entityName, this.uniqueFieldNames);
        }
    }

    async deleteOne(where: FindOptionsWhere<Entity>, wipe?: true, eh?: TypeORMErrorHandler): Promise<Entity>;

    async deleteOne(
        where: FindOptionsWhere<Entity>,
        deletedBy?: IUserEntity,
        eh?: TypeORMErrorHandler,
    ): Promise<Entity>;

    async deleteOne(
        where: FindOptionsWhere<Entity>,
        deletedByOrWipe?: IUserEntity | boolean,
        eh?: TypeORMErrorHandler,
    ): Promise<Entity> {
        try {
            const wipe = typeof deletedByOrWipe === "boolean" ? deletedByOrWipe : false;
            const deletedBy = typeof deletedByOrWipe === "object" ? deletedByOrWipe : undefined;
            let entity = await this.repository.getOne({ where });
            if (!entity) {
                return Promise.reject(new NotFoundException(EntityErrors.E_404_CONDITION(this.entityName)));
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

            return Promise.reject(new NotFoundException(EntityErrors.E_404_ID(this.entityName)));
        } catch (e: unknown) {
            if (eh) {
                const err = eh(e);
                if (e) {
                    throw err;
                }
            }

            EntityUtils.handleError(e, this.entityName, this.uniqueFieldNames);
        }
    }

    async deleteMany(where: FindOptionsWhere<Entity>, wipe?: true, eh?: TypeORMErrorHandler): Promise<Entity[]>;

    async deleteMany(
        where: FindOptionsWhere<Entity>,
        deletedBy?: IUserEntity,
        eh?: TypeORMErrorHandler,
    ): Promise<Entity[]>;

    async deleteMany(
        where: FindOptionsWhere<Entity>,
        deletedByOrWipe?: IUserEntity | boolean,
        eh?: TypeORMErrorHandler,
    ): Promise<Entity[]> {
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
            return Promise.reject(new NotFoundException(EntityErrors.E_404_ID(this.entityName)));
        } catch (e: unknown) {
            if (eh) {
                const err = eh(e);
                if (e) {
                    throw err;
                }
            }

            EntityUtils.handleError(e, this.entityName, this.uniqueFieldNames);
        }
    }

    async deleteByIds(ids: string[], wipe?: true, eh?: TypeORMErrorHandler): Promise<IStatusResponse>;

    async deleteByIds(ids: string[], deletedBy?: IUserEntity, eh?: TypeORMErrorHandler): Promise<IStatusResponse>;

    async deleteByIds(
        ids: string[],
        deletedByOrWipe?: IUserEntity | boolean,
        eh?: TypeORMErrorHandler,
    ): Promise<IStatusResponse> {
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

            return Promise.reject(new NotFoundException(EntityErrors.E_404_ID(this.entityName)));
        } catch (e: unknown) {
            if (eh) {
                const err = eh(e);
                if (e) {
                    throw err;
                }
            }

            EntityUtils.handleError(e, this.entityName, this.uniqueFieldNames);
        }
    }

    async count(getMany?: GetManyOptions<Entity>, eh?: TypeORMErrorHandler): Promise<number> {
        try {
            return await this.repository.countMany(getMany);
        } catch (e: unknown) {
            if (eh) {
                const err = eh(e);
                if (e) {
                    throw err;
                }
            }

            EntityUtils.handleError(e, this.entityName, this.uniqueFieldNames);
        }
    }

    async transaction<T>(operation: (manager: EntityManager) => Promise<T>): Promise<T> {
        return await this.repository.transaction(operation);
    }

    async try<T>(fn: () => Promise<T>): Promise<T> {
        try {
            return await fn();
        } catch (e: unknown) {
            if (e instanceof HttpException) {
                throw e;
            }
            EntityUtils.handleError(e, this.entityName, this.uniqueFieldNames);
        }
    }
}
