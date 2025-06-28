import { Role as HcRole } from "@hichchi/nest-connector/auth";
import { RoleName, RolePermission } from "../../core/enums";

export type Role = HcRole<RoleName | string, RolePermission>;
