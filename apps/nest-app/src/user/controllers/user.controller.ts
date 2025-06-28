import { Body, Controller, Get, Post } from "@nestjs/common";
import { GetAllOptions, Pager, PaginatedResponse, Sorter, SortOptions } from "@hichchi/nest-crud";
import { Pagination } from "@hichchi/nest-connector/crud";
import { UserInfo } from "@hichchi/nest-connector";
import { UserService } from "../services";
import { CreateUserDto } from "../dto";
import { UserEntity } from "../entities";
import { AppEndpoint } from "../../core/enums";

@Controller(AppEndpoint.USER)
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    create(@Body() dto: CreateUserDto): Promise<UserEntity | null> {
        return this.userService.save(dto);
    }

    @Get()
    findAll(
        @Pager() pagination?: Pagination,
        @Sorter() sort?: SortOptions<UserInfo>,
    ): Promise<PaginatedResponse<UserEntity> | UserEntity[]> {
        return this.userService.getAll<GetAllOptions<UserEntity>>({ pagination, sort });
    }
}
