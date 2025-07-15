import { Role as HcRole, User as HcUser } from "@hichchi/nest-connector/auth";
import { RoleName, RolePermission } from "../../core/enums";
import { EntityId, ModelExtension } from "@hichchi/nest-connector/crud";

export interface Address extends ModelExtension {
    street: string | null;
    city: string | null;
    state: string | null;
    zip: string | null;
    country: string | null;
    user: User | null;
    userId: EntityId | null;
}

export interface Role extends HcRole<RoleName | string, RolePermission> {
    users: User[] | null;
}

export interface User extends HcUser<RoleName | string, RolePermission> {
    email: string;
    role: Role | null;
    address: Address | null;
    addressId: EntityId | null;
}
