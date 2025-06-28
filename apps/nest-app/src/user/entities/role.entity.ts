import { BaseEntity, HichchiEntity } from "@hichchi/nest-crud";
import { Column, OneToMany } from "typeorm";
import { UserEntity } from "./user.entity";
import { Role } from "@hichchi/nest-connector/auth";
import { AppEntity, RoleName, RolePermission } from "../../core/enums";

@HichchiEntity(AppEntity.ROLE, ["name"])
export class RoleEntity extends BaseEntity implements Role<RoleName | string, RolePermission> {
    @Column({ type: "varchar", nullable: false })
    name: RoleName | string;

    @Column({ type: "json", nullable: true })
    permissions: RolePermission[] | null;

    @Column({ type: "int", nullable: true })
    priority: number | null;

    @OneToMany(() => UserEntity, user => user.role)
    users: UserEntity[];
}
