import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { RoleService } from "../services";
import { CreateRoleDto } from "../dto";
import { UpdateRoleDto } from "../dto/update-role.dto";
import { EntityId } from "@hichchi/nest-connector/crud";
import { Role } from "../types";
import { BulkDeleteDto } from "@hichchi/nest-crud";
import { SuccessResponse } from "@hichchi/nest-connector";
import { AppEndpoint, EndpointPath, RoleName, RolePermission } from "../../core/enums";
import { ID_PARAM } from "../../core/conmstants";
import { AuthUser, CurrentUser, JwtAuthGuard, Permission, PermissionGuard, RoleGuard, Roles } from "@hichchi/nest-auth";

@Controller(AppEndpoint.ROLE)
export class RoleController {
    constructor(private readonly roleService: RoleService) {}

    @Get(`:${ID_PARAM}`)
    get(@Param(ID_PARAM) id: EntityId): Promise<Role | null> {
        return this.roleService.get(id);
    }

    @Get()
    getAll(): Promise<Role[]> {
        return this.roleService.getAll();
    }

    @Post()
    @Permission(RolePermission.ROLE_CREATE)
    @UseGuards(JwtAuthGuard, PermissionGuard)
    create(@CurrentUser() createdBy: AuthUser, @Body() dto: CreateRoleDto): Promise<Role | null> {
        return this.roleService.save({ ...dto, createdBy });
    }

    @Patch(`:${ID_PARAM}`)
    @Roles(RoleName.ADMIN)
    @UseGuards(JwtAuthGuard, RoleGuard)
    update(
        @CurrentUser() updatedBy: AuthUser,
        @Param(ID_PARAM) id: EntityId,
        @Body() dto: UpdateRoleDto,
    ): Promise<Role> {
        return this.roleService.update(id, { ...dto, updatedBy });
    }

    @Delete(`:${ID_PARAM}`)
    @Roles(RoleName.ADMIN)
    @UseGuards(JwtAuthGuard)
    delete(@CurrentUser() deletedBy: AuthUser, @Param(ID_PARAM) id: EntityId): Promise<Role> {
        return this.roleService.delete(id, deletedBy);
    }

    @Post(EndpointPath.DELETE)
    @Roles(RoleName.ADMIN)
    @UseGuards(JwtAuthGuard)
    deleteMany(@CurrentUser() deletedBy: AuthUser, @Body() { ids }: BulkDeleteDto): Promise<SuccessResponse> {
        return this.roleService.deleteByIds(ids, deletedBy);
    }
}
