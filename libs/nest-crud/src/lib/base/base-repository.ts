/* eslint-disable @typescript-eslint/no-explicit-any */
// noinspection JSUnusedGlobalSymbols

import {
    GetByIdOptions,
    GetByIdsOptions,
    GetManyOptions,
    GetOneOptions,
    GetOneOptionsNot,
    GetOneOptionsSearch,
    GetOptions,
} from "../interfaces";
import {
    DeepPartial,
    DeleteResult,
    EntityManager,
    FindManyOptions,
    FindOperator,
    FindOptionsWhere,
    ILike,
    In,
    Not,
    Repository,
    SaveOptions,
    UpdateResult,
} from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
import { FindOneOptions } from "typeorm/find-options/FindOneOptions";
import { EntityId, Model } from "@hichchi/nest-connector/crud";
import { FindConditions } from "../types";

export class BaseRepository<BaseEntity extends Model> extends Repository<BaseEntity> {
    private static _transactionalManager?: EntityManager;

    constructor(repository: Repository<BaseEntity>) {
        super(repository?.target, repository?.manager, repository?.queryRunner);
    }

    get entityRepository(): Repository<BaseEntity> {
        return (BaseRepository._transactionalManager ?? this.manager).getRepository(this.target);
    }

    override create(): BaseEntity;

    override create<T extends DeepPartial<BaseEntity>>(entityLike: T): BaseEntity;

    override create<T extends DeepPartial<BaseEntity>>(entityLikeArray: T[]): BaseEntity[];

    override create<T extends DeepPartial<BaseEntity>>(entityLike?: T | T[]): BaseEntity | BaseEntity[] {
        return super.create(entityLike as T);
    }

    override save<T extends DeepPartial<BaseEntity>>(entityLike: T, options?: SaveOptions): Promise<T & BaseEntity> {
        return this.entityRepository.save(this.create(entityLike) as T, options);
    }

    async saveAndGet<T extends DeepPartial<BaseEntity>>(
        entityLike: T,
        options?: SaveOptions & GetByIdOptions<BaseEntity>,
    ): Promise<BaseEntity | null> {
        const newEntity = await this.save(entityLike, options);
        return this.get(newEntity.id, options);
    }

    saveMany<T extends DeepPartial<BaseEntity>>(entities: T[], options?: SaveOptions): Promise<(T & BaseEntity)[]> {
        return this.entityRepository.save(this.create(entities) as T[], options);
    }

    override update(id: EntityId, partialEntity: QueryDeepPartialEntity<BaseEntity>): Promise<UpdateResult> {
        return this.entityRepository.update(id, partialEntity);
    }

    async updateAndGet(
        id: EntityId,
        partialEntity: QueryDeepPartialEntity<BaseEntity>,
        options?: GetByIdOptions<BaseEntity>,
    ): Promise<BaseEntity | null> {
        await this.update(id, partialEntity);
        return this.get(id, options);
    }

    updateOne(
        where: FindOptionsWhere<BaseEntity>,
        partialEntity: QueryDeepPartialEntity<BaseEntity>,
    ): Promise<UpdateResult> {
        return this.entityRepository.update(where, partialEntity);
    }

    updateMany(
        where: FindConditions<BaseEntity>,
        partialEntity: QueryDeepPartialEntity<BaseEntity>,
    ): Promise<UpdateResult> {
        return this.entityRepository.update(where, partialEntity);
    }

    updateByIds(ids: EntityId[], partialEntity: QueryDeepPartialEntity<BaseEntity>): Promise<UpdateResult> {
        return this.updateMany({ id: In(ids) } as FindConditions<BaseEntity>, partialEntity);
    }

    get(id: EntityId, options?: GetByIdOptions<BaseEntity>): Promise<BaseEntity | null> {
        return this.getOne({ ...options, where: { id } as FindOptionsWhere<BaseEntity> });
    }

    async getByIds(getByIds: GetByIdsOptions<BaseEntity>): Promise<BaseEntity[]> {
        const { ids, relations, pagination, sort, options } = getByIds;
        const where = { id: In(ids) } as FindOptionsWhere<BaseEntity>;
        const [entities] = await this.getMany({ relations, pagination, sort, options, where });
        return entities;
    }

    getOne(getOne: GetOneOptions<BaseEntity>): Promise<BaseEntity | null> {
        return this.entityRepository.findOne(this.generateOptions(getOne));
    }

    getMany(getMany: GetManyOptions<BaseEntity>): Promise<[BaseEntity[], number]> {
        return this.entityRepository.findAndCount(this.generateOptions(getMany));
    }

    override delete(id: EntityId): Promise<DeleteResult> {
        return this.entityRepository.softDelete(id);
    }

    deleteByIds(ids: EntityId[]): Promise<DeleteResult> {
        return this.entityRepository.softDelete(ids);
    }

    hardDelete(id: EntityId): Promise<DeleteResult> {
        return this.entityRepository.delete(id);
    }

    hardDeleteByIds(ids: EntityId[]): Promise<DeleteResult> {
        return this.entityRepository.delete(ids);
    }

    countMany(options?: GetManyOptions<BaseEntity>): Promise<number> {
        return this.entityRepository.count(options ? this.generateOptions(options) : { withDeleted: false });
    }

    async transaction<T>(operation: (manager: EntityManager) => Promise<T>): Promise<T> {
        if (BaseRepository._transactionalManager) {
            return operation(BaseRepository._transactionalManager);
        }
        return await this.manager.transaction(async (manager: EntityManager): Promise<T> => {
            BaseRepository._transactionalManager = manager;
            return await operation(manager).finally(() => {
                BaseRepository._transactionalManager = undefined;
            });
        });
    }

    generateOptions(getOptions: GetOptions<BaseEntity>): FindOneOptions<BaseEntity> {
        const { options, relations, pagination, sort } = getOptions ?? {};
        const opt = { ...(options || {}) } as FindManyOptions<BaseEntity>;

        opt.where = getOptions.where || getOptions.filters;

        const { search, not } = getOptions as GetOneOptionsSearch<BaseEntity> & GetOneOptionsNot<BaseEntity>;

        if (not) {
            opt.where = this.orWhere(opt.where as FindOptionsWhere<BaseEntity>, not, Not);
        } else if (search) {
            opt.where = this.orWhere(opt.where as FindOptionsWhere<BaseEntity>, search, ILike);
        }

        if (relations) {
            opt.relations = relations as string[];
        }

        if (pagination) {
            opt.take = pagination.take;
            opt.skip = pagination.skip;
        }

        if (sort) {
            opt.order = sort;
        }

        return { ...opt, withDeleted: false };
    }

    orWhere(
        where: FindOptionsWhere<BaseEntity>,
        search: FindOptionsWhere<BaseEntity>,
        operator: <T>(value: FindOperator<T> | T) => FindOperator<T>,
    ): FindOptionsWhere<BaseEntity> | FindOptionsWhere<BaseEntity>[] {
        const entries = Object.entries(search);
        if (entries.length > 1) {
            const whr: FindOptionsWhere<BaseEntity>[] = [];
            entries.forEach(([key, value]) => {
                whr.push(this.mapWhere(where, { [key]: value }, operator, "%{}%"));
            });
            return whr;
        }
        return this.mapWhere(where, search, operator, "%{}%");
    }

    mapWhere(
        where: FindOptionsWhere<BaseEntity> | FindOptionsWhere<BaseEntity>[],
        data: object,
        operator: <T>(value: FindOperator<T> | T) => FindOperator<T>,
        wrap?: `${string}{}${string}`,
    ): FindOptionsWhere<BaseEntity> {
        const whr = where ? { ...where } : {};
        if ((data as FindOperator<BaseEntity>) instanceof FindOperator) {
            return data;
        }

        for (const key in data) {
            if (typeof (data as any)[key] === "object") {
                (whr as any)[key] = this.mapWhere((whr as any)[key], (data as any)[key], operator, wrap);
            } else if ((data as any)[key] !== undefined) {
                (whr as any)[key] =
                    Boolean(operator) && wrap
                        ? operator(wrap.replace("{}", (data as any)[key]))
                        : (operator?.((data as any)[key]) ?? (data as any)[key]);
            }
        }
        return whr;
    }
}
