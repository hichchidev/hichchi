import { Column } from "typeorm";
import { HichchiEntity, HichchiUserEntity, USER_ENTITY_TABLE_NAME } from "@hichchi/nest-crud";
import { IAuthUserEntity, RegType } from "@hichchi/nest-auth";

@HichchiEntity(USER_ENTITY_TABLE_NAME, ["email"])
export class UserEntity extends HichchiUserEntity implements IAuthUserEntity {
    @Column({ nullable: false })
    email: string;

    @Column({ nullable: true })
    username: string;

    @Column({ nullable: true })
    password?: string;

    @Column({ default: false })
    emailVerified: boolean;

    @Column({ nullable: true })
    avatar?: string;

    @Column({ type: "json", nullable: true })
    profileData?: object;

    @Column({ type: "enum", enum: RegType, nullable: false })
    regType: RegType;

    // @Column({ nullable: true })
    // role?: IRoleEntity;
}
