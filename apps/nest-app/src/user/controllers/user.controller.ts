import { Body, Controller, Get, Post } from "@nestjs/common";
import { Filters, Pager, PaginatedResponse, Search, Sorter, SortOptions } from "@hichchi/nest-crud";
import { QuerySafeDeepPartial, User } from "@hichchi/nest-connector";
import { Pagination } from "@hichchi/nest-connector/crud";
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
        @Pager() pagination?: Pagination,
        @Sorter() sort?: SortOptions<User>,
        @Search() search?: QuerySafeDeepPartial<User>,
        @Filters() filters: QuerySafeDeepPartial<User> = {},
    ): Promise<PaginatedResponse<UserEntity>> {
        return await this.userService.getAll({ pagination, sort, search, filters });
    }
}
