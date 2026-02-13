import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { Filters, GetAllOptions, Pager, Search, Sorter, SortOptions } from "@hichchi/nest-crud";
import { EntityId, PaginatedResponse, Pagination, QueryDeepPartial } from "@hichchi/nest-connector/crud";
import { UserService } from "../services";
import { CreateUserDto } from "../dto";
import { AppEndpoint } from "../../core/enums";
import { User } from "../interfaces";
import { UpdateUserDto } from "../dto/update-user.dto";

@Controller(AppEndpoint.USER)
/**
 * Exposes CRUD endpoints for users.
 */
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get(":id")
    getUser(@Param("id") id: EntityId): Promise<User> {
        return this.userService.get(id);
    }

    @Get()
    getUsers(
        @Pager() pagination?: Pagination,
        @Sorter() sort?: SortOptions<User>,
        @Search() search?: QueryDeepPartial<User>,
        @Filters() filters?: QueryDeepPartial<User>,
    ): Promise<PaginatedResponse<User> | User[]> {
        return this.userService.getMany({ pagination, sort, search, filters });
    }

    @Get()
    getAllUsers(
        @Pager() pagination?: Pagination,
        @Sorter() sort?: SortOptions<User>,
    ): Promise<PaginatedResponse<User> | User[]> {
        return this.userService.getAll<GetAllOptions<User>>({ pagination, sort });
    }

    @Post()
    create(@Body() dto: CreateUserDto): Promise<User | null> {
        return this.userService.save(dto);
    }

    @Patch(":id")
    update(@Param("id") id: EntityId, @Body() dto: UpdateUserDto): Promise<User> {
        return this.userService.update(id, dto);
    }

    @Delete()
    delete(@Param("id") id: EntityId): Promise<User> {
        return this.userService.delete(id);
    }
}
