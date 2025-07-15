import { Role as HcRole, User as HcUser } from "@hichchi/nest-connector/auth";
import { RoleName, RolePermission } from "../enums";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type,@typescript-eslint/no-empty-interface
export interface Role extends HcRole<RoleName | string, RolePermission> {}

export interface User extends HcUser<RoleName | string, RolePermission> {
    role: Role | null;
}
