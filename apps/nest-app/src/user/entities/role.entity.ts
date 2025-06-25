import { BaseEntityExtension, HichchiEntityExtension, HichchiJoinColumn } from "@hichchi/nest-crud";
import { Column, OneToOne } from "typeorm";
import { UserEntity } from "./user.entity";
import { Role } from "@hichchi/nest-connector/auth";
import { RoleName } from "../enums/role-name.enum";
import { Permission } from "../enums/permission.enum";

@HichchiEntityExtension("roles")
export class RoleEntity extends BaseEntityExtension implements Role<RoleName | string, Permission> {
    @Column({ type: "varchar" })
    name: RoleName | string;

    @Column({ type: "varchar" })
    permissions: Permission[];

    @Column()
    priority: number;

    @OneToOne(() => UserEntity)
    @HichchiJoinColumn()
    user: UserEntity;
}
