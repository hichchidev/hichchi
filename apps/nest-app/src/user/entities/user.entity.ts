import { Column, ManyToOne, OneToOne } from "typeorm";
import { HichchiEntity, HichchiJoinColumn, HichchiUserEntity } from "@hichchi/nest-crud";
import { AuthProvider } from "@hichchi/nest-connector/auth";
import { AppEntity } from "../../core/enums";
import { RoleEntity } from "./role.entity";
import { EntityId } from "@hichchi/nest-connector/crud";
import { AddressEntity } from "./address.entity";
import { User } from "../interfaces";

@HichchiEntity(AppEntity.USER, ["email"])
export class UserEntity extends HichchiUserEntity implements User {
    @Column({ nullable: false })
    declare email: string;

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
    role: RoleEntity | null;

    @Column({ nullable: true })
    roleId: EntityId | null;

    @OneToOne(() => AddressEntity, address => address.user, { nullable: true, eager: true })
    @HichchiJoinColumn()
    address: AddressEntity | null;

    @Column({ nullable: true })
    addressId: EntityId | null;
}
