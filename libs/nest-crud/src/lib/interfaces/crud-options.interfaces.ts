import { EntityManager, FindOneOptions, FindOptionsWhere } from "typeorm";
import { SortOptions } from "../types";
import { EntityId, Pagination } from "@hichchi/nest-connector/crud";

export interface Options<Entity> {
    manager?: EntityManager;
    relations?: (keyof Entity)[];
    options?: Omit<FindOneOptions<Entity>, "where" | "relations">;
    sort?: SortOptions<Entity>;
}

export interface SearchOptions<Entity> extends Options<Entity> {
    filters?: FindOptionsWhere<Entity>;
    search?: FindOptionsWhere<Entity>;
    where?: never;
    not?: never;
}

export interface NotOptions<Entity> extends Options<Entity> {
    filters?: FindOptionsWhere<Entity>;
    search?: never;
    not: FindOptionsWhere<Entity>;
    where?: never;
}

export interface WhereOptions<Entity> extends Options<Entity> {
    filters?: never;
    search?: never;
    not?: never;
    where: FindOptionsWhere<Entity> | FindOptionsWhere<Entity>[];
}

export interface PaginatedGetOptions<Entity> extends Options<Entity> {
    pagination?: Pagination;
}

export interface GetByIdsOptions<Entity> extends PaginatedGetOptions<Entity> {
    ids: EntityId[];
}

export type GetByIdOptions<Entity> = Omit<Options<Entity>, "sort">;

export interface GetOneOptionsSearch<Entity> extends Options<Entity>, SearchOptions<Entity> {}

export interface GetOneOptionsNot<Entity> extends Options<Entity>, NotOptions<Entity> {}

export interface GetOneOptionsWhere<Entity> extends Options<Entity>, WhereOptions<Entity> {}

export interface GetManyOptionsSearch<Entity> extends PaginatedGetOptions<Entity>, GetOneOptionsSearch<Entity> {}

export interface GetManyOptionsNot<Entity> extends PaginatedGetOptions<Entity>, GetOneOptionsNot<Entity> {}

export interface GetManyOptionsWhere<Entity> extends PaginatedGetOptions<Entity>, GetOneOptionsWhere<Entity> {}

export type GetOptions<Entity> = (SearchOptions<Entity> | NotOptions<Entity> | WhereOptions<Entity>) &
    PaginatedGetOptions<Entity>;

export type GetOneOptions<Entity> = GetOneOptionsSearch<Entity> | GetOneOptionsNot<Entity> | GetOneOptionsWhere<Entity>;

export type GetAllOptions<Entity> = PaginatedGetOptions<Entity>;

export type GetManyOptions<Entity> =
    | GetManyOptionsSearch<Entity>
    | GetManyOptionsNot<Entity>
    | GetManyOptionsWhere<Entity>;
