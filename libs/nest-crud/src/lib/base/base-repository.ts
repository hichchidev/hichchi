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
    IBaseEntity,
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
import { FindConditions } from "../types";
import { FindOneOptions } from "typeorm/find-options/FindOneOptions";

export class BaseRepository<Entity extends IBaseEntity> extends Repository<Entity> {
    private static _transactionalManager?: EntityManager;

    constructor(repository: Repository<Entity>) {
        super(repository?.target, repository?.manager, repository?.queryRunner);
    }

    get entityRepository(): Repository<Entity> {
        return (BaseRepository._transactionalManager ?? this.manager).getRepository(this.target);
    }

    override create(): Entity;

    override create<T extends DeepPartial<Entity>>(entityLike: T): Entity;

    override create<T extends DeepPartial<Entity>>(entityLikeArray: T[]): Entity[];

    override create<T extends DeepPartial<Entity>>(entityLike?: T | T[]): Entity | Entity[] {
        return super.create(entityLike as T);
    }

    override save<T extends DeepPartial<Entity>>(entityLike: T, options?: SaveOptions): Promise<T & Entity> {
        return this.entityRepository.save(this.create(entityLike) as T, options);
    }

    async saveAndGet<T extends DeepPartial<Entity>>(
        entityLike: T,
        options?: SaveOptions & GetByIdOptions<Entity>,
    ): Promise<Entity | null> {
        const newEntity = await this.save(entityLike, options);
        return this.get(newEntity.id, options);
    }

    saveMany<T extends DeepPartial<Entity>>(entities: T[], options?: SaveOptions): Promise<(T & Entity)[]> {
        return this.entityRepository.save(this.create(entities) as T[], options);
    }

    override update(id: string, partialEntity: QueryDeepPartialEntity<Entity>): Promise<UpdateResult> {
        return this.entityRepository.update(id, partialEntity);
    }

    async updateAndGet(
        id: string,
        partialEntity: QueryDeepPartialEntity<Entity>,
        options?: GetByIdOptions<Entity>,
    ): Promise<Entity | null> {
        await this.update(id, partialEntity);
        return this.get(id, options);
    }

    updateOne(where: FindOptionsWhere<Entity>, partialEntity: QueryDeepPartialEntity<Entity>): Promise<UpdateResult> {
        return this.entityRepository.update(where, partialEntity);
    }

    updateMany(where: FindConditions<Entity>, partialEntity: QueryDeepPartialEntity<Entity>): Promise<UpdateResult> {
        return this.entityRepository.update(where, partialEntity);
    }

    updateByIds(ids: string[], partialEntity: QueryDeepPartialEntity<Entity>): Promise<UpdateResult> {
        return this.updateMany({ id: In(ids) } as FindConditions<Entity>, partialEntity);
    }

    get(id: string, options?: GetByIdOptions<Entity>): Promise<Entity | null> {
        return this.getOne({ ...options, where: { id } as FindOptionsWhere<Entity> });
    }

    async getByIds(getByIds: GetByIdsOptions<Entity>): Promise<Entity[]> {
        const { ids, relations, pagination, sort, options } = getByIds;
        const where = { id: In(ids) } as FindOptionsWhere<Entity>;
        const [entities] = await this.getMany({ relations, pagination, sort, options, where });
        return entities;
    }

    getOne(getOne: GetOneOptions<Entity>): Promise<Entity | null> {
        return this.entityRepository.findOne(this.generateOptions(getOne));
    }

    getMany(getMany: GetManyOptions<Entity>): Promise<[Entity[], number]> {
        return this.entityRepository.findAndCount(this.generateOptions(getMany));
    }

    override delete(id: string): Promise<DeleteResult> {
        return this.entityRepository.softDelete(id);
    }

    deleteByIds(ids: string[]): Promise<DeleteResult> {
        return this.entityRepository.softDelete(ids);
    }

    hardDelete(id: string): Promise<DeleteResult> {
        return this.entityRepository.delete(id);
    }

    hardDeleteByIds(ids: string[]): Promise<DeleteResult> {
        return this.entityRepository.delete(ids);
    }

    countMany(options?: GetManyOptions<Entity>): Promise<number> {
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

    generateOptions(getOptions: GetOptions<Entity>): FindOneOptions<Entity> {
        const { options, relations, pagination, sort } = getOptions ?? {};
        const opt = { ...(options || {}) } as FindManyOptions<Entity>;

        opt.where = getOptions.where || getOptions.filters;

        const { search, not } = getOptions as GetOneOptionsSearch<Entity> & GetOneOptionsNot<Entity>;

        if (not) {
            opt.where = this.orWhere(opt.where as FindOptionsWhere<Entity>, not, Not);
        } else if (search) {
            opt.where = this.orWhere(opt.where as FindOptionsWhere<Entity>, search, ILike);
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
        where: FindOptionsWhere<Entity>,
        search: FindOptionsWhere<Entity>,
        operator: <T>(value: FindOperator<T> | T) => FindOperator<T>,
    ): FindOptionsWhere<Entity> | FindOptionsWhere<Entity>[] {
        const entries = Object.entries(search);
        if (entries.length > 1) {
            const whr: FindOptionsWhere<Entity>[] = [];
            entries.forEach(([key, value]) => {
                whr.push(this.mapWhere(where, { [key]: value }, operator, "%{}%"));
            });
            return whr;
        }
        return this.mapWhere(where, search, operator, "%{}%");
    }

    mapWhere(
        where: FindOptionsWhere<Entity> | FindOptionsWhere<Entity>[],
        data: object,
        operator: <T>(value: FindOperator<T> | T) => FindOperator<T>,
        wrap?: `${string}{}${string}`,
    ): FindOptionsWhere<Entity> {
        const whr = where ? { ...where } : {};
        if ((data as FindOperator<Entity>) instanceof FindOperator) {
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
