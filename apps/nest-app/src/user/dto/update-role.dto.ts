import { Dto } from "@hichchi/nest-core";
import { PartialType } from "@nestjs/mapped-types";
import { CreateRoleDto } from "./create-role.dtos";

@Dto("role")
export class UpdateRoleDto extends PartialType(CreateRoleDto) {}
