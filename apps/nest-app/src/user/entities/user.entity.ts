import { Column, ManyToOne } from "typeorm";
import { HichchiEntity, HichchiJoinColumn, HichchiUserEntity } from "@hichchi/nest-crud";
import { AuthProvider, User } from "@hichchi/nest-connector/auth";
import { AppEntity, RoleName, RolePermission } from "../../core/enums";
import { RoleEntity } from "./role.entity";
import { EntityId } from "@hichchi/nest-connector/crud";

@HichchiEntity(AppEntity.USER, ["email"])
export class UserEntity extends HichchiUserEntity implements User<RoleName | string, RolePermission> {
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

    @ManyToOne(() => RoleEntity, role => role.users, { nullable: true, eager: true })
    @HichchiJoinColumn()
    role: RoleEntity;

    @Column({ nullable: true })
    roleId: EntityId | null;
}
