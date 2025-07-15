import { Body, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import {
    EntityDeepPartial,
    EntityId,
    Model,
    ModelExtension,
    PaginatedResponse,
    Pagination,
    QueryDeepPartial,
} from "@hichchi/nest-connector/crud";
import { CrudService } from "../services";
import { Filters, Pager, Search, Sorter } from "../decorators";
import { SortOptions } from "../types";
import { GetAllOptions } from "../interfaces";

export class BaseController<Entity extends Model | ModelExtension> {
    constructor(private readonly service: CrudService<Entity>) {}

    @Get(":id")
    get(@Param("id") id: EntityId): Promise<Entity> {
        return this.service.get(id);
    }

    @Get()
    getMany(
        @Pager() pagination?: Pagination,
        @Sorter() sort?: SortOptions<Entity>,
        @Search() search?: QueryDeepPartial<Entity>,
        @Filters() filters?: QueryDeepPartial<Entity>,
    ): Promise<PaginatedResponse<Entity> | Entity[]> {
        return this.service.getMany({ pagination, sort, search, filters });
    }

    @Get()
    getAll(
        @Pager() pagination?: Pagination,
        @Sorter() sort?: SortOptions<Entity>,
    ): Promise<PaginatedResponse<Entity> | Entity[]> {
        return this.service.getAll<GetAllOptions<Entity>>({ pagination, sort });
    }

    @Post()
    create<T extends EntityDeepPartial<Entity>>(@Body() dto: T): Promise<Entity | null> {
        return this.service.save(dto);
    }

    @Patch(":id")
    update<T extends EntityDeepPartial<Entity>>(@Param("id") id: EntityId, @Body() dto: T): Promise<Entity> {
        return this.service.update(id, dto);
    }

    @Delete()
    delete(@Param("id") id: EntityId): Promise<Entity> {
        return this.service.delete(id);
    }
}
