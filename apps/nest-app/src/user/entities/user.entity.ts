import { Column, OneToOne } from "typeorm";
import { HichchiEntity, HichchiJoinColumn, HichchiUserEntity, USER_ENTITY_TABLE_NAME } from "@hichchi/nest-crud";
import { AuthProvider, User } from "@hichchi/nest-connector/auth";
import { AddressEntity } from "./address.entity";
import { RoleName } from "../enums/role-name.enum";
import { Permission } from "../enums/permission.enum";
import { RoleEntity } from "./role.entity";
import { EntityId } from "@hichchi/nest-connector/crud";

@HichchiEntity(USER_ENTITY_TABLE_NAME, ["email"])
export class UserEntity extends HichchiUserEntity implements User<RoleName | string, Permission> {
    @Column({ nullable: false })
    email: string;

    @Column({ nullable: true })
    username: string;

    @Column({ type: "varchar", nullable: true })
    password: string | null;

    @Column({ default: false })
    emailVerified: boolean;

    @Column({ type: "varchar", nullable: true })
    avatar: string | null;

    @Column({ type: "json", nullable: true })
    profileData: object | null;

    @Column({ type: "enum", enum: AuthProvider, nullable: false })
    signUpType: AuthProvider;

    @OneToOne(() => AddressEntity, { nullable: true })
    @HichchiJoinColumn()
    address?: AddressEntity;

    @OneToOne(() => RoleEntity, { nullable: true, eager: true })
    @HichchiJoinColumn()
    role: RoleEntity;

    @Column({ nullable: true })
    roleId: EntityId | null;
}
