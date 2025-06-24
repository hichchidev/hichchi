import { Column } from "typeorm";
import { HichchiEntity, HichchiUserEntity, USER_ENTITY_TABLE_NAME } from "@hichchi/nest-crud";
import { AuthProvider, User } from "@hichchi/nest-connector/auth";

@HichchiEntity(USER_ENTITY_TABLE_NAME, ["email"])
export class UserEntity extends HichchiUserEntity implements User {
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

    @Column({ type: "enum", enum: AuthProvider, nullable: false })
    signUpType: AuthProvider;

    // TODO: Implement role both enum and entity
    // @Column({ nullable: true })
    // role?: IRoleEntity;
}
