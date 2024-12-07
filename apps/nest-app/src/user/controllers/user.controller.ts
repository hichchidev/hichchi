import { Body, Controller, Get, Post } from "@nestjs/common";
import { Filters, Pager, PaginatedResponse, Search, Sorter, SortOptions } from "@hichchi/nest-crud";
import { IPagination, IUserEntity, QuerySafeDeepPartial } from "@hichchi/nest-core";
import { UserService } from "../services";
import { CreateUserDto } from "../dto";
import { UserEntity } from "../entities";

@Controller("user")
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    async create(@Body() dto: CreateUserDto): Promise<UserEntity> {
        return await this.userService.save(dto);
    }

    @Get()
    async findAll(
        @Pager() pagination?: IPagination,
        @Sorter() sort?: SortOptions<IUserEntity>,
        @Search() search?: QuerySafeDeepPartial<IUserEntity>,
        @Filters() filters: QuerySafeDeepPartial<IUserEntity> = {},
    ): Promise<PaginatedResponse<UserEntity>> {
        return await this.userService.getAll({ pagination, sort, search, filters });
    }
}
