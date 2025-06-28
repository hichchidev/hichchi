import { IsEnum, IsNotEmpty } from "class-validator";
import { Dto } from "@hichchi/nest-core";
import { RoleBase } from "@hichchi/nest-connector/auth";
import { RoleName, RolePermission } from "../../core/enums";

@Dto()
export class CreateRoleDto implements RoleBase<RoleName | string, RolePermission> {
    @IsNotEmpty()
    name: RoleName;

    @IsEnum(RolePermission, { each: true })
    @IsNotEmpty()
    permissions: RolePermission[];

    @IsNotEmpty()
    priority: number;
}
