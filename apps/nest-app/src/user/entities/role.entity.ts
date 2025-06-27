import { BaseEntityExtension, HichchiEntityExtension, HichchiJoinColumn } from "@hichchi/nest-crud";
import { Column, OneToOne } from "typeorm";
import { UserEntity } from "./user.entity";
import { Role } from "@hichchi/nest-connector/auth";
import { RoleName } from "../enums/role-name.enum";
import { Permission } from "../enums/permission.enum";
import { EntityId } from "@hichchi/nest-connector/crud";

@HichchiEntityExtension("roles")
export class RoleEntity extends BaseEntityExtension implements Role<RoleName | string, Permission> {
    @Column({ type: "varchar", nullable: false })
    name: RoleName | string;

    @Column({ type: "json", nullable: true })
    permissions: Permission[] | null;

    @Column({ type: "int", nullable: true })
    priority: number | null;

    @OneToOne(() => UserEntity, { nullable: true })
    @HichchiJoinColumn()
    user: UserEntity | null;

    @Column({ nullable: true })
    userId: EntityId | null;
}
